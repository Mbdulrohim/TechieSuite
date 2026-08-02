import React, { useState } from 'react';
import { Smartphone, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { TRADE_IN_DEVICES } from '../data/products';
import { TradeInQuote } from '../types';

interface TradeInBannerProps {
  onApplyTradeIn: (quote: TradeInQuote) => void;
  appliedTradeIn: TradeInQuote | null;
}

export const TradeInBanner: React.FC<TradeInBannerProps> = ({
  onApplyTradeIn,
  appliedTradeIn
}) => {
  const [selectedDevice, setSelectedDevice] = useState(TRADE_IN_DEVICES[0].device);
  const [condition, setCondition] = useState<'excellent' | 'good' | 'fair'>('good');
  const [isApplied, setIsApplied] = useState(false);

  const matchedDevice = TRADE_IN_DEVICES.find((d) => d.device === selectedDevice) || TRADE_IN_DEVICES[0];

  // Condition multiplier
  const conditionMultiplier = condition === 'excellent' ? 1.0 : condition === 'good' ? 0.85 : 0.65;
  const estimatedValue = Math.round(matchedDevice.maxValue * conditionMultiplier);

  const handleApply = () => {
    onApplyTradeIn({
      device: selectedDevice,
      storage: 'Standard',
      condition,
      value: estimatedValue
    });
    setIsApplied(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-gradient-to-r from-[#1D1D1F] via-black to-[#2C2C2E] text-white rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border border-gray-800">
        
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066CC]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0066CC]/20 text-[#0066CC] border border-[#0066CC]/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Instant Trade-In Calculator</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Get $180–$650 in credit when you trade in iPhone 11 or higher.
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed max-w-xl">
              Turn your old device into instant savings toward your new iPhone 16 Pro or Mac.
              We ship your new device first, then give you 14 days to return your trade-in with a prepaid box.
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-gray-300 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Instant Cart Credit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Free Prepaid Shipping Kit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero Data Risk
              </span>
            </div>
          </div>

          {/* Right Interactive Trade-In Estimator Tool */}
          <div className="lg:col-span-6 bg-white/10 backdrop-blur-xl border border-white/20 p-5 md:p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#0066CC]" />
                Calculate Your Trade-In Value
              </span>
              {appliedTradeIn && (
                <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  ✓ Active Credit Applied
                </span>
              )}
            </div>

            {/* Select Device Dropdown */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Select your current device:
              </label>
              <select
                value={selectedDevice}
                onChange={(e) => {
                  setSelectedDevice(e.target.value);
                  setIsApplied(false);
                }}
                className="w-full bg-gray-900 text-white text-sm border border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              >
                {TRADE_IN_DEVICES.map((d) => (
                  <option key={d.device} value={d.device}>
                    {d.device} (Up to ${d.maxValue})
                  </option>
                ))}
              </select>
            </div>

            {/* Select Condition */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Device Condition:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'excellent', label: 'Like New', desc: 'No scratches' },
                  { id: 'good', label: 'Good', desc: 'Minor wear' },
                  { id: 'fair', label: 'Fair', desc: 'Functional' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCondition(c.id as any);
                      setIsApplied(false);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                      condition === c.id
                        ? 'bg-[#0066CC] text-white border-[#0066CC] shadow-md'
                        : 'bg-gray-900/60 text-gray-300 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div>{c.label}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Output & Apply CTA */}
            <div className="bg-black/40 rounded-xl p-4 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-400 font-medium block">
                  Estimated Trade-In Credit
                </span>
                <span className="text-2xl font-black text-emerald-400">
                  ${estimatedValue}.00
                </span>
              </div>

              <button
                onClick={handleApply}
                className={`font-bold text-xs px-5 py-3 rounded-full transition-all flex items-center gap-1.5 shadow-lg ${
                  isApplied || (appliedTradeIn && appliedTradeIn.device === selectedDevice)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0066CC] hover:bg-[#0055B3] text-white'
                }`}
              >
                <span>
                  {isApplied || (appliedTradeIn && appliedTradeIn.device === selectedDevice)
                    ? '✓ Credit Applied to Bag'
                    : `Apply $${estimatedValue} to Cart`}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
