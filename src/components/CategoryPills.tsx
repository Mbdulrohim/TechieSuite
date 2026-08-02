import React from 'react';
import { Smartphone, Laptop, Tablet, Watch, Headphones, Cable, Flame, Grid } from 'lucide-react';

interface CategoryPillsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const items = [
    { id: 'all', label: 'All', icon: Grid },
    { id: 'mac', label: 'Mac', icon: Laptop },
    { id: 'ipad', label: 'iPad', icon: Tablet },
    { id: 'iphone', label: 'iPhone', icon: Smartphone },
    { id: 'watch', label: 'Watch', icon: Watch },
    { id: 'airpods', label: 'AirPods', icon: Headphones },
    { id: 'accessories', label: 'Accessories', icon: Cable },
    { id: 'deals', label: 'Deals', icon: Flame },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-start md:justify-center items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-2">
        {items.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center gap-2 group transition-opacity ${
                isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Icon
                strokeWidth={isActive ? 2 : 1.5}
                className="w-8 h-8 text-[#1d1d1f] mb-1"
              />
              <span className={`text-[12px] ${isActive ? 'font-medium' : 'font-normal'} text-[#1d1d1f]`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
