import React from 'react';
import { Camera, Smartphone, Laptop, Tablet, Watch, Headphones, Cable, Flame, Grid, Gamepad2, Monitor, Speaker, BatteryCharging, RefreshCw, Zap } from 'lucide-react';
import { CATEGORY_LABELS } from '../data/categoryLabels';

interface CategoryPillsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const items = [
    { id: 'all', icon: Grid },
    { id: 'iphone', icon: Smartphone },
    { id: 'mac', icon: Laptop },
    { id: 'ipad', icon: Tablet },
    { id: 'watch', icon: Watch },
    { id: 'airpods', icon: Headphones },
    { id: 'samsung', icon: Smartphone },
    { id: 'gaming', icon: Gamepad2 },
    { id: 'laptops', icon: Monitor },
    { id: 'audio', icon: Speaker },
    { id: 'power', icon: BatteryCharging },
    { id: 'accessories', icon: Cable },
    { id: 'gear', icon: Camera },
    { id: 'pre-owned', icon: RefreshCw },
    { id: 'anker', icon: Zap },
    { id: 'deals', icon: Flame },
  ] as const;

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
                {CATEGORY_LABELS[cat.id]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
