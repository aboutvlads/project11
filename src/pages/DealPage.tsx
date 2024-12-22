import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Calendar, Clock } from 'lucide-react';
import { useDeal } from '../hooks/useDeal';

export function DealPage() {
  const { id } = useParams();
  const { deal, loading, error } = useDeal(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-red-500">Error: Deal not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[40vh] sm:h-[50vh]">
        <img
          src={deal.image_url}
          alt={deal.destination}
          className="w-full h-full object-cover"
        />
        <Link
          to="/deals"
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      <div className="max-w-3xl mx-auto -mt-8 relative">
        <div className="bg-white rounded-t-3xl shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">{deal.destination}, {deal.country} {deal.flag}</h1>
              <p className="text-gray-600">{deal.stops}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">€{deal.price}</p>
              <p className="text-gray-400 line-through">€{deal.original_price}</p>
              <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {deal.discount}
              </span>
            </div>
          </div>

          <div className="border-t border-b py-4 my-4">
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
              <div>
                <p className="text-lg font-bold">{deal.departure_time}</p>
                <p className="text-sm text-gray-500">{deal.departure}</p>
              </div>
              <div className="flex flex-col items-center min-w-[100px]">
                <Clock className="w-4 h-4 text-gray-400 mb-1" />
                <div className="w-full h-[2px] bg-gray-200 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                    <p className="text-xs text-gray-500">{deal.flight_duration}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{deal.arrival_time}</p>
                <p className="text-sm text-gray-500">{deal.destination}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {deal.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
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

          {deal.posted_by && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Posted by</h2>
              <div className="flex items-center gap-3">
                <img
                  src={deal.posted_by_avatar}
                  alt={deal.posted_by}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{deal.posted_by}</p>
                  <p className="text-sm text-gray-500">{deal.posted_by_description}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <a
              href={deal.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white py-3 rounded-xl text-center font-semibold hover:bg-gray-800 transition-colors"
            >
              Book Now
            </a>
            <button className="w-full border border-gray-200 py-3 rounded-xl text-center font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}