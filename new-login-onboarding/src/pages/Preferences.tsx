import React, { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { updateUserPreferences } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface PreferencesProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Preferences({ onNext, onBack }: PreferencesProps) {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const destinations = [
    {
      id: 'paris',
      name: 'Paris',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a'
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
    },
    {
      id: 'london',
      name: 'London',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'
    }
  ];

  const handleContinue = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await updateUserPreferences(user.id, {
        bucket_list_destinations: selectedDestinations
      });
      onNext();
    } catch (error) {
      console.error('Failed to save bucket list:', error);
      alert('Failed to save your bucket list. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="max-w-2xl">
        <h1 className="text-3xl font-bold text-[#1B1B1B] text-center mb-4">
          What's on your bucket list?
        </h1>
        <p className="text-[#757575] text-center mb-8">
          Select destinations you'd like to visit
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {destinations.map((destination) => (
            <button
              key={destination.id}
              onClick={() => {
                setSelectedDestinations(prev =>
                  prev.includes(destination.id)
                    ? prev.filter(id => id !== destination.id)
                    : [...prev, destination.id]
                );
              }}
              className={`relative aspect-video rounded-lg overflow-hidden group ${
                selectedDestinations.includes(destination.id) 
                  ? 'ring-2 ring-[#1B1B1B]' 
                  : ''
              }`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="text-white text-lg font-medium">
                  {destination.name}
                </span>
                {selectedDestinations.includes(destination.id) && (
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <Plus className="w-4 h-4 text-[#1B1B1B] transform rotate-45" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <Button onClick={handleContinue} variant="secondary" disabled={isLoading || selectedDestinations.length === 0}>
          {isLoading ? 'Saving...' : 'Continue'} <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  );
}