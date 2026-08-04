import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TopUtilityBarProps {
  /** Opens the buying guide behind the banner's "genuine devices" promise. */
  onLearnMore: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({ onLearnMore }) => {
  const content = (
    <span className="inline-flex items-center gap-1.5 px-4">
      <span>Shop genuine devices with nationwide delivery, expert help, and secure payment.</span>
      <button
        type="button"
        onClick={onLearnMore}
        className="text-link hover:underline inline-flex items-center font-medium"
      >
        Learn more <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
      </button>
    </span>
  );

  return (
    <div className="bg-canvas text-ink border-b border-hairline-soft overflow-hidden py-2 md:py-3">
      {/* Mobile Ticker (Slow Continuous Gliding) */}
      <div className="block md:hidden overflow-hidden w-full text-micro">
        <div className="animate-marquee-slow">
          {content}
          {content}
        </div>
      </div>

      {/* Desktop Centered Banner */}
      <div className="hidden md:flex justify-center items-center text-footnote">
        {content}
      </div>
    </div>
  );
};
