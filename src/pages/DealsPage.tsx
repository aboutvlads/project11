import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DealCard } from '../components/DealCard';
import { useDeals } from '../hooks/useDeals';
import { formatRelativeTime } from '../utils/dateUtils';

export function DealsPage() {
  const [sortBy, setSortBy] = useState('Latest');
  const navigate = useNavigate();
  const { deals, loading, error } = useDeals();

  const handleDealSelect = (id: string) => {
    navigate(`/deals/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
        <p className="text-gray-500">Loading deals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg sm:text-xl font-bold">Latest Deals</h1>
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm">
              Sort by {sortBy}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              id={deal.id}
              destination={deal.destination}
              country={deal.country}
              flag={deal.flag}
              image={deal.image_url}
              price={deal.price}
              originalPrice={deal.original_price}
              discount={deal.discount}
              date={formatRelativeTime(deal.created_at)}
              departure={deal.departure}
              stops={deal.stops}
              tags={deal.tags}
              likes={deal.likes}
              isHot={deal.is_hot}
              type={deal.type}
              onSelect={handleDealSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}