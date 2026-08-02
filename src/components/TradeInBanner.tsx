import React, { useState } from 'react';
import { Smartphone, ChevronRight } from 'lucide-react';
import { TRADE_IN_DEVICES } from '../data/products';
import { TradeInQuote } from '../types';

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
      <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
        
        <div className="flex justify-center mb-4">
          <Smartphone className="w-10 h-10 text-[#1d1d1f]" />
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
          Apple Trade In
        </h2>

        <p className="text-[17px] text-[#1d1d1f] mb-8">
          Get $180–$650 in credit toward a new device when you trade in your current one.
        </p>

        <div className="max-w-sm mx-auto space-y-4">
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="w-full bg-white text-[#1d1d1f] text-[15px] border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0066cc]"
          >
            {TRADE_IN_DEVICES.map((d) => (
              <option key={d.device} value={d.device}>
                {d.device} (Up to ${d.maxValue})
              </option>
            ))}
          </select>

          <button
            onClick={handleApply}
            className="w-full bg-[#0071e3] hover:bg-[#0077ED] text-white font-medium text-[15px] px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-1"
          >
            {appliedTradeIn && appliedTradeIn.device === selectedDevice
              ? 'Credit Applied'
              : `Trade in ${selectedDevice}`}
          </button>
        </div>

        <div className="mt-8 text-[12px] text-gray-500">
          <a href="#" className="text-[#0066cc] hover:underline inline-flex items-center">
            Learn more about Apple Trade In <ChevronRight className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
