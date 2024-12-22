import React from 'react';
import { ArrowRight, Plane, Zap, Timer, MousePointerClick } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface HowItWorksProps {
  onNext: () => void;
  onBack: () => void;
}

export default function HowItWorks({ onNext, onBack }: HowItWorksProps) {
  const features = [
    {
      icon: Plane,
      title: 'Cheapest flight deals',
      description: 'We find flight deals that are up to 70% - 80% off their usual prices'
    },
    {
      icon: Zap,
      title: 'Only the best airlines',
      description: 'We thoroughly analyze the airline ratings, service and prices before sending the deals to you'
    },
    {
      icon: Timer,
      title: 'Save time & money',
      description: 'Plan your itinerary and pack your bags, while we find the best flight deal for you'
    },
    {
      icon: MousePointerClick,
      title: 'Easy booking',
      description: "You're just one click away from your dream vacation"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-[1200px]">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1B1B1B] mb-4">
            How Tripwingz Works
          </h1>
          <p className="text-sm sm:text-base text-[#1B1B1B] max-w-2xl mx-auto leading-relaxed">
            We keep a close eye on prices from your airport to destinations all over the world.
            <br className="hidden sm:block" />
            When the price drops, you know.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-x-12 sm:gap-y-8 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center group"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 bg-[#F8F8F8] rounded-xl flex items-center justify-center group-hover:bg-[#FFE978] transition-all duration-300">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#1B1B1B]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1B1B1B] mb-1 sm:mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#757575] text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="secondary" onClick={onNext} className="max-w-[200px]">
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}