import React, { useState } from 'react';
import { MapPin, Truck, Tag, ChevronDown, CheckCircle2 } from 'lucide-react';
import { StoreLocation } from '../../types';

interface TopUtilityBarProps {
  currentStore: StoreLocation;
  onOpenStoreModal: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  currentStore,
  onOpenStoreModal
}) => {
  const [promoIndex, setPromoIndex] = useState(0);

  const promos = [
    '⚡ FREE 2-Day Express Shipping on orders over $50',
    '📲 Trade in your current iPhone & get up to $650 instant credit',
    '🎓 Back to School: Get a $150 Gift Card with eligible Mac or iPad',
    '💳 3% Daily Cash back when you pay with Apple Card'
  ];

  const handleNextPromo = () => {
    setPromoIndex((prev) => (prev + 1) % promos.length);
  };

  return (
    <div className="bg-[#1D1D1F] text-[#F5F5F7] text-xs py-2 px-4 border-b border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Ticker Promo */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors" onClick={handleNextPromo}>
          <Tag className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
          <span className="font-medium tracking-tight text-gray-200">
            {promos[promoIndex]}
          </span>
          <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded font-mono ml-1">
            {promoIndex + 1}/{promos.length}
          </span>
        </div>

        {/* Right: Store Pickup Selector & Location */}
        <div className="flex items-center gap-4 text-gray-300">
          <button
            onClick={onOpenStoreModal}
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-gray-800/80 px-2.5 py-1 rounded-full text-[11px]"
            title="Change preferred Apple Store for local pickup"
          >
            <MapPin className="w-3 h-3 text-[#0066CC]" />
            <span className="font-medium text-white">{currentStore.name}</span>
            <span className="text-gray-400">({currentStore.distance})</span>
            <ChevronDown className="w-3 h-3 text-gray-400 ml-0.5" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready for Today's Pickup</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-gray-400 text-[11px]">
            <Truck className="w-3 h-3" />
            <span>US Store (USD $)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
