import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import RegionFilter from '../components/RegionFilter';
import DealCard from '../components/DealCard';
import { dealsByRegion } from '../data/deals';

interface AirportSelectionProps {
  onNext: () => void;
  onBack: () => void;
}

export default function AirportSelection({ onNext, onBack }: AirportSelectionProps) {
  const [selectedRegion, setSelectedRegion] = useState('Europe');
  const deals = dealsByRegion[selectedRegion] || dealsByRegion.Europe;

  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-6 sm:py-12">
        <Card className="max-w-none">
          <div className="max-w-2xl mx-auto text-center mb-6 sm:mb-12">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#1B1B1B] mb-2 sm:mb-4">
              Past deals members loved
            </h1>
            <p className="text-sm sm:text-base text-[#757575]">
              These deals won't be the last. And you can be the first to know.
            </p>
          </div>

          <div className="mb-6 sm:mb-10">
            <RegionFilter
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 sm:mb-10">
            {deals.map((deal, index) => (
              <DealCard key={index} {...deal} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button onClick={onNext} variant="secondary" className="max-w-[200px]">
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}