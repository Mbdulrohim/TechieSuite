import React, { useState } from 'react';
import { Smartphone, ChevronRight } from 'lucide-react';
import { TRADE_IN_DEVICES } from '../data/products';
import { TradeInQuote } from '../types';
import { formatNaira } from '../utils';

interface TradeInBannerProps {
  onApplyTradeIn: (quote: TradeInQuote) => void;
  appliedTradeIn: TradeInQuote | null;
}

export const TradeInBanner: React.FC<TradeInBannerProps> = ({
  onApplyTradeIn,
  appliedTradeIn,
}) => {
  const [selectedDevice, setSelectedDevice] = useState(TRADE_IN_DEVICES[0].device);

  const matchedDevice =
    TRADE_IN_DEVICES.find((d) => d.device === selectedDevice) || TRADE_IN_DEVICES[0];

  const handleApply = () => {
    onApplyTradeIn({
      device: selectedDevice,
      storage: 'Standard',
      condition: 'good',
      value: matchedDevice.maxValue,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-canvas rounded-panel p-8 md:p-12 text-center max-w-4xl mx-auto">

        <div className="flex justify-center mb-4">
          <Smartphone className="w-10 h-10 text-ink" />
        </div>

        <h2 className="text-title md:text-headline font-semibold text-ink mb-3">
          Techiebase Trade In
        </h2>

        <p className="text-body text-ink mb-8">
          Get {formatNaira(180)}–{formatNaira(650)} in credit toward a new device when you trade in your eligible smartphone.*
        </p>

        <div className="w-full max-w-sm mx-auto space-y-4">
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="w-full bg-white text-ink text-body md:text-body border border-hairline rounded-lg px-4 h-11 focus:outline-none focus:border-accent"
          >
            {TRADE_IN_DEVICES.map((d) => (
              <option key={d.device} value={d.device}>
                {d.device} (Up to {formatNaira(d.maxValue)})
              </option>
            ))}
          </select>

          <button
            onClick={handleApply}
            className="w-full bg-accent hover:bg-accent-hover active:scale-[0.98] active:opacity-80 text-white font-medium text-body px-6 h-11 min-h-[44px] rounded-full transition-all flex items-center justify-center gap-1"
          >
            {appliedTradeIn && appliedTradeIn.device === selectedDevice
              ? 'Credit Applied'
              : `Trade in ${selectedDevice}`}
          </button>
        </div>

        <div className="mt-8 text-caption text-ink-secondary">
          <a href="#" className="text-link hover:underline inline-flex items-center">
            Learn more about Techiebase Trade In <ChevronRight className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
