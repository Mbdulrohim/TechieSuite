import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, CheckCircle2 } from 'lucide-react';
import { StoreLocation } from '../../types';

interface TopUtilityBarProps {
  currentStore: StoreLocation;
  onOpenStoreModal: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  currentStore,
  onOpenStoreModal,
}) => {
  const [promoIndex, setPromoIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const promos = [
    'FREE 2-Day Express Shipping on orders over $50',
    'Trade in your current iPhone & get up to $650 instant credit',
    'Back to School: Get a $150 Gift Card with eligible Mac or iPad',
    '3% Daily Cash back when you pay with Apple Card',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPromoIndex((prev) => (prev + 1) % promos.length);
        setIsFading(false);
      }, 300);
    }, 4500);
    return () => clearInterval(timer);
  }, [promos.length]);

  return (
    <div className="bg-[#1D1D1F] text-[#F5F5F7] text-[13px] py-2.5 px-6 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Auto-rotating Promo */}
        <div className="flex items-center gap-2 min-h-[20px]">
          <span
            className={`font-medium text-gray-300 transition-opacity duration-300 ${
              isFading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {promos[promoIndex]}
          </span>
        </div>

        {/* Right: Store Selector */}
        <div className="hidden md:flex items-center gap-5 text-gray-400">
          <button
            onClick={onOpenStoreModal}
            className="flex items-center gap-1.5 hover:text-white transition-colors text-[13px]"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0066CC]" />
            <span className="font-medium text-white">{currentStore.name}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          <div className="flex items-center gap-1.5 text-emerald-400 text-[13px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-medium">Ready for Pickup</span>
          </div>
        </div>
      </div>
    </div>
  );
};
