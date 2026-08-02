import React from 'react';
import { ChevronRight } from 'lucide-react';

export const TopUtilityBar: React.FC = () => {
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] text-[14px] py-3 text-center border-b border-[#E5E5E7]">
      <p className="inline-flex flex-wrap items-center justify-center gap-1">
        <span>Shop online and get free express delivery, Specialist help, and more.</span>
        <a href="#" className="text-[#0066cc] hover:underline flex items-center">
          Learn more <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </p>
    </div>
  );
};
