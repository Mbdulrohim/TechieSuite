import React from 'react';
import { ChevronRight } from 'lucide-react';

export const TopUtilityBar: React.FC = () => {
  const content = (
    <span className="inline-flex items-center gap-1.5 px-4">
      <span>Shop online and get free express delivery, Specialist help, and instant savings.</span>
      <a href="#" className="text-[#0066cc] hover:underline inline-flex items-center font-medium">
        Learn more <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
      </a>
    </span>
  );

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] border-b border-[#E5E5E7] overflow-hidden py-2 md:py-3">
      {/* Mobile Ticker (Slow Continuous Gliding) */}
      <div className="block md:hidden overflow-hidden w-full text-[11px]">
        <div className="animate-marquee-slow">
          {content}
          {content}
        </div>
      </div>

      {/* Desktop Centered Banner */}
      <div className="hidden md:flex justify-center items-center text-[14px]">
        {content}
      </div>
    </div>
  );
};
