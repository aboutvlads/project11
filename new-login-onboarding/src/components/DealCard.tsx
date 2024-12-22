import React from 'react';
import { Clock } from 'lucide-react';

interface DealCardProps {
  image: string;
  city: string;
  country: string;
  price: number;
  originalPrice: number;
  from: string;
  tripType: string;
  isPastDeal?: boolean;
  isBusinessClass?: boolean;
}

export default function DealCard({
  image,
  city,
  country,
  price,
  originalPrice,
  from,
  tripType,
  isPastDeal,
  isBusinessClass
}: DealCardProps) {
  const discount = Math.round((1 - price / originalPrice) * 100);

  return (
    <div className="bg-white rounded-xl overflow-hidden border-2 border-[#E5E5E5] hover:border-[#1B1B1B] transition-all group hover:shadow-lg">
      <div className="relative">
        <img
          src={image}
          alt={`${city}, ${country}`}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {isPastDeal && (
            <div className="px-2 py-1 sm:px-3 bg-[#1B1B1B] text-white text-xs sm:text-sm rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Past Deal</span>
            </div>
          )}
          {isBusinessClass && (
            <span className="px-2 py-1 sm:px-3 bg-[#FFE978] text-[#1B1B1B] text-xs sm:text-sm rounded-full">
              Business
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-[#FFE978] text-[#1B1B1B] px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium">
          {discount}% OFF
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1B1B1B]">
              {city}, {country}
            </h3>
            <p className="text-xs sm:text-sm text-[#757575]">{from}</p>
          </div>
          <div className="text-right">
            <p className="text-lg sm:text-xl font-bold text-[#1B1B1B]">${price}</p>
            <p className="text-xs sm:text-sm text-[#757575] line-through">${originalPrice}</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-[#757575] border-t border-[#E5E5E5] pt-2 mt-2">
          {tripType}
        </p>
      </div>
    </div>
  );
}