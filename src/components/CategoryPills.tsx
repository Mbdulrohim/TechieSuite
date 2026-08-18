import React from 'react';
import { Camera, Smartphone, Laptop, Tablet, Watch, Headphones, Cable, Flame, Grid, Gamepad2, Monitor, Speaker, BatteryCharging, RefreshCw, Zap } from 'lucide-react';

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
    { id: 'iphone', label: 'iPhone', icon: Smartphone },
    { id: 'mac', label: 'Mac', icon: Laptop },
    { id: 'ipad', label: 'iPad', icon: Tablet },
    { id: 'watch', label: 'Watch', icon: Watch },
    { id: 'airpods', label: 'AirPods', icon: Headphones },
    { id: 'samsung', label: 'Samsung', icon: Smartphone },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'laptops', label: 'Laptops', icon: Monitor },
    { id: 'audio', label: 'Audio', icon: Speaker },
    { id: 'power', label: 'Power', icon: BatteryCharging },
    { id: 'accessories', label: 'Accessories', icon: Cable },
    { id: 'gear', label: 'Creator Gear', icon: Camera },
    { id: 'pre-owned', label: 'Pre-Owned', icon: RefreshCw },
    { id: 'anker', label: 'Anker', icon: Zap },
    { id: 'deals', label: 'Deals', icon: Flame },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Scrolls on narrow viewports; centres once all categories fit. */}
      <div className="flex justify-start xl:justify-center items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-2">
        {items.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center gap-2 group transition-opacity ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
            >
              <Icon
                strokeWidth={isActive ? 2 : 1.5}
                className="w-8 h-8 text-ink mb-1"
              />
              <span className={`text-caption ${isActive ? 'font-medium' : 'font-normal'} text-ink`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
