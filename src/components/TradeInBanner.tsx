import React, { useState } from 'react';
import { Smartphone, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
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
  const [condition, setCondition] = useState<'excellent' | 'good' | 'fair'>('good');
  const [isApplied, setIsApplied] = useState(false);

  const matchedDevice =
    TRADE_IN_DEVICES.find((d) => d.device === selectedDevice) || TRADE_IN_DEVICES[0];

  const conditionMultiplier =
    condition === 'excellent' ? 1.0 : condition === 'good' ? 0.85 : 0.65;
  const estimatedValue = Math.round(matchedDevice.maxValue * conditionMultiplier);

  const handleApply = () => {
    onApplyTradeIn({
      device: selectedDevice,
      storage: 'Standard',
      condition,
      value: estimatedValue,
    });
    setIsApplied(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gradient-to-br from-[#1D1D1F] via-[#1D1D1F] to-[#2C2C2E] text-white rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden border border-gray-800">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066CC]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Info */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#0066CC]/15 text-[#0066CC] border border-[#0066CC]/25 text-[13px] font-semibold px-4 py-2 rounded-full">
              <RefreshCw className="w-4 h-4" />
              <span>Instant Trade-In Calculator</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Get $180–$650 in credit when you trade in iPhone 11 or higher.
            </h2>

            <p className="text-[16px] text-gray-300 leading-relaxed max-w-lg">
              Turn your old device into instant savings toward your new iPhone
              16 Pro or Mac. We ship your new device first, then give you 14
              days to return your trade-in.
            </p>

            <div className="flex flex-wrap gap-5 text-[14px] text-gray-300 pt-1">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Instant Cart Credit
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Free Prepaid Shipping
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero Data Risk
              </span>
            </div>
          </div>

          {/* Right Estimator Tool */}
          <div className="bg-white/8 backdrop-blur-xl border border-white/15 p-6 md:p-8 rounded-2xl shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[14px] font-semibold text-gray-200 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#0066CC]" />
                Calculate Your Trade-In Value
              </span>
              {appliedTradeIn && (
                <span className="text-[12px] font-semibold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                  ✓ Credit Applied
                </span>
              )}
            </div>

            {/* Device Selector */}
            <div>
              <label className="block text-[13px] font-medium text-gray-300 mb-2">
                Select your current device
              </label>
              <select
                value={selectedDevice}
                onChange={(e) => {
                  setSelectedDevice(e.target.value);
                  setIsApplied(false);
                }}
                className="w-full bg-white/5 text-white text-[15px] border border-white/15 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0066CC] appearance-none"
              >
                {TRADE_IN_DEVICES.map((d) => (
                  <option key={d.device} value={d.device} className="bg-[#1D1D1F]">
                    {d.device} (Up to ${d.maxValue})
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Selector */}
            <div>
              <label className="block text-[13px] font-medium text-gray-300 mb-2">
                Device condition
              </label>
              <div className="grid grid-cols-3 gap-3">
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
                    className={`py-3 px-3 rounded-xl text-[13px] font-semibold text-center border transition-all ${
                      condition === c.id
                        ? 'bg-[#0066CC] text-white border-[#0066CC]'
                        : 'bg-white/5 text-gray-300 border-white/15 hover:border-white/30'
                    }`}
                  >
                    <div>{c.label}</div>
                    <div className="text-[11px] text-gray-400 font-normal mt-0.5">
                      {c.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Result & Apply */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[13px] text-gray-400 font-medium block">
                  Estimated Trade-In Credit
                </span>
                <span className="text-3xl font-bold text-emerald-400">
                  ${estimatedValue}
                </span>
              </div>

              <button
                onClick={handleApply}
                className={`font-semibold text-[14px] px-6 py-3 rounded-full transition-all flex items-center gap-2 ${
                  isApplied ||
                  (appliedTradeIn && appliedTradeIn.device === selectedDevice)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0066CC] hover:bg-[#0055B3] text-white'
                }`}
              >
                <span>
                  {isApplied ||
                  (appliedTradeIn && appliedTradeIn.device === selectedDevice)
                    ? '✓ Applied to Bag'
                    : `Apply $${estimatedValue}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
