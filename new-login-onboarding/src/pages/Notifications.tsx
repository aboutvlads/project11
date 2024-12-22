import React, { useState } from 'react';
import { ArrowRight, Bell, Mail, Phone } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { updateUserPreferences } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface NotificationsProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Notifications({ onNext, onBack }: NotificationsProps) {
  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
    sms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleContinue = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await updateUserPreferences(user.id, {
        notification_preferences: preferences
      });
      onNext();
    } catch (error) {
      console.error('Failed to save notification preferences:', error);
      alert('Failed to save your notification preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card>
        <h1 className="text-3xl font-bold text-[#1B1B1B] text-center mb-4">
          How should we notify you?
        </h1>
        <p className="text-[#757575] text-center mb-8">
          Choose how you want to receive deal alerts
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              id: 'email',
              icon: Mail,
              title: 'Email Notifications',
              description: 'Get detailed deal alerts straight to your inbox'
            },
            {
              id: 'push',
              icon: Bell,
              title: 'Push Notifications',
              description: 'Instant alerts when new deals match your preferences'
            },
            {
              id: 'sms',
              icon: Phone,
              title: 'SMS Alerts',
              description: 'Get text messages for time-sensitive deals'
            }
          ].map(({ id, icon: Icon, title, description }) => (
            <button
              key={id}
              onClick={() => setPreferences(prev => ({
                ...prev,
                [id]: !prev[id as keyof typeof prev]
              }))}
              className={`w-full p-4 rounded-xl border-2 ${
                preferences[id as keyof typeof preferences]
                  ? 'border-[#1B1B1B] bg-[#F5F5F5]'
                  : 'border-[#E5E5E5]'
              } hover:border-[#1B1B1B] transition-colors flex items-center gap-4`}
            >
              <div className={`p-2 rounded-lg ${
                preferences[id as keyof typeof preferences]
                  ? 'bg-[#1B1B1B] text-white'
                  : 'bg-[#F5F5F5] text-[#757575]'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left flex-1">
                <p className="font-medium text-[#1B1B1B]">{title}</p>
                <p className="text-sm text-[#757575]">{description}</p>
              </div>
            </button>
          ))}
        </div>

        <Button onClick={handleContinue} variant="secondary" disabled={isLoading || !Object.values(preferences).some(Boolean)}>
          {isLoading ? 'Saving...' : 'Continue'} <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  );
}