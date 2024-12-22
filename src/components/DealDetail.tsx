import React from 'react';
import { Wifi, Coffee, Tv, Share2, Calendar, Clock } from 'lucide-react';
import { useDeal } from '../hooks/useDeal';

interface DealDetailProps {
  id: string;
}

export function DealDetail({ id }: DealDetailProps) {
  const { deal, loading, error } = useDeal(id);

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="p-4 flex items-center justify-center">
        <p className="text-red-500">Error: Deal not found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <img
        src={deal.image_url}
        alt={`${deal.destination}`}
        className="w-full h-40 sm:h-48 object-cover"
      />
      
      <div className="p-4 sm:p-6">
        {/* Travel Period and Price */}
        <div className="flex justify-between items-start mb-4 sm:mb-6 pb-4 border-b">
          <div className="flex items-start gap-2 sm:gap-3">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Travel Period</p>
              <p className="text-base sm:text-lg font-semibold">May-Jun</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-500">Price per person</p>
            <p className="text-xl sm:text-2xl font-bold">€{deal.price}</p>
            <p className="text-xs sm:text-sm text-gray-400 line-through">€{deal.original_price}</p>
          </div>
        </div>

        {/* Flight Details */}
        <div className="mb-4 sm:mb-6 pb-4 border-b">
          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3 sm:gap-4">
            <div>
              <p className="text-base sm:text-lg font-bold">{deal.departure_time || "10:30 AM"}</p>
              <p className="text-xs sm:text-sm text-gray-500">{deal.departure}</p>
            </div>
            <div className="flex flex-col items-center min-w-[80px] sm:min-w-[100px]">
              <Clock className="w-4 h-4 text-gray-400 mb-1" />
              <div className="w-full h-[2px] bg-gray-200 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                  <p className="text-xs text-gray-500">
                    {deal.flight_duration || "4h 15m"}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base sm:text-lg font-bold">{deal.arrival_time || "2:45 PM"}</p>
              <p className="text-xs sm:text-sm text-gray-500">{deal.destination}, {deal.country} {deal.flag}</p>
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 pb-4 border-b">
          {deal.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                tag.startsWith('#date')
                  ? 'bg-pink-100 text-pink-800'
                  : tag.startsWith('#foodie')
                  ? 'bg-orange-100 text-orange-800'
                  : tag.startsWith('#friends')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Posted By */}
        {deal.posted_by && (
          <div className="mb-4 sm:mb-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <img
                src={deal.posted_by_avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"}
                alt={deal.posted_by}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm sm:text-base font-semibold">{deal.posted_by}</p>
                <p className="text-xs sm:text-sm text-gray-500">{deal.posted_by_description || "Travel enthusiast"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="mb-4 sm:mb-6 pb-4 border-b">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Wifi className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <span>Wi-Fi</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <span>Meals</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Tv className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <span>TV</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <a
            href={deal.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white py-2 sm:py-2.5 rounded-xl text-center text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Book Now
          </a>
          <button className="w-full border border-gray-200 py-2 sm:py-2.5 rounded-xl text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-gray-50 transition-colors">
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
            Share
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-500">
          <span className="font-medium">Note:</span> Prices and availability subject to change.
        </p>
      </div>
    </div>
  );
}