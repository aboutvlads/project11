import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { updateUserPreferences } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface HomeAirportProps {
  onNext: () => void;
  onBack: () => void;
}

export default function HomeAirport({ onNext, onBack }: HomeAirportProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAirport, setSelectedAirport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleAirportSelect = async (airport: string) => {
    if (!user) return;
    setSelectedAirport(airport);
    setIsLoading(true);
    try {
      await updateUserPreferences(user.id, {
        home_airport: airport
      });
      onNext();
    } catch (error) {
      console.error('Failed to save home airport:', error);
      alert('Failed to save your home airport. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card>
        <h1 className="text-3xl font-bold text-[#1B1B1B] text-center mb-8">
          Choose your home airport
        </h1>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#757575] w-5 h-5" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search airports..."
            className="pl-12"
          />
        </div>

        <div className="space-y-4 mb-8">
          <button 
            className={`w-full p-4 rounded-xl border-2 ${
              selectedAirport === 'JFK' ? 'border-[#1B1B1B]' : 'border-[#E5E5E5]'
            } hover:border-[#1B1B1B] transition-colors text-left`}
            onClick={() => handleAirportSelect('JFK')}
          >
            <p className="font-medium text-[#1B1B1B]">New York (JFK)</p>
            <p className="text-sm text-[#757575]">John F. Kennedy International</p>
          </button>
          <button 
            className={`w-full p-4 rounded-xl border-2 ${
              selectedAirport === 'LAX' ? 'border-[#1B1B1B]' : 'border-[#E5E5E5]'
            } hover:border-[#1B1B1B] transition-colors text-left`}
            onClick={() => handleAirportSelect('LAX')}
          >
            <p className="font-medium text-[#1B1B1B]">Los Angeles (LAX)</p>
            <p className="text-sm text-[#757575]">Los Angeles International</p>
          </button>
        </div>

        <Button onClick={onNext} variant="secondary" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Continue'} <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  );
}