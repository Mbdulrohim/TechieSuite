import React from 'react';
import { Smartphone, Laptop, Tablet, Watch, Headphones, Cable, Flame, Grid } from 'lucide-react';

interface CategoryPillsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  productCounts: Record<string, number>;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory,
  productCounts,
}) => {
  const items = [
    { id: 'all', label: 'All Models', icon: Grid },
    { id: 'iphone', label: 'iPhone', icon: Smartphone },
    { id: 'mac', label: 'Mac', icon: Laptop },
    { id: 'ipad', label: 'iPad', icon: Tablet },
    { id: 'watch', label: 'Apple Watch', icon: Watch },
    { id: 'airpods', label: 'AirPods', icon: Headphones },
    { id: 'accessories', label: 'Chargers & Cases', icon: Cable },
    { id: 'deals', label: 'Deals', icon: Flame },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {items.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const count = productCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-lg'
                  : 'bg-white text-[#1D1D1F] border-[#E5E5E7] hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] ${
                  isActive ? 'text-[#0066CC]' : 'text-gray-400'
                }`}
              />
              <span>{cat.label}</span>
              {count > 0 && (
                <span
                  className={`text-[12px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white/80'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
