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
    { id: 'deals', label: 'Flash Deals', icon: Flame },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-[#E5E5E7]">
        {items.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const count = productCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-md scale-105'
                  : 'bg-white text-[#1D1D1F] border-[#E5E5E7] hover:bg-[#F5F5F7] hover:border-gray-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#0066CC]' : 'text-gray-500'}`} />
              <span>{cat.label}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-600'
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
