import React, { useState } from 'react';
import { Plus, ShoppingBag, Sparkles, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { ProductBundle, ProductColor } from '../types';
import { formatNaira } from '../utils';

interface BundleSectionProps {
  bundle: ProductBundle;
  onAddBundleToCart: (
    bundle: ProductBundle,
    selectedAccessories: string[],
    selectedColor: ProductColor
  ) => void;
}

export const BundleSection: React.FC<BundleSectionProps> = ({
  bundle,
  onAddBundleToCart,
}) => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(
    bundle.accessories.map((a) => a.id)
  );
  const [selectedMainColor, setSelectedMainColor] = useState<ProductColor>(
    bundle.mainProduct.colors[0]
  );
  const [isAdded, setIsAdded] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const toggleAccessory = (accId: string) => {
    if (selectedAccessories.includes(accId)) {
      setSelectedAccessories(selectedAccessories.filter((id) => id !== accId));
    } else {
      setSelectedAccessories([...selectedAccessories, accId]);
    }
  };

  const selectedAccObjs = bundle.accessories.filter((a) =>
    selectedAccessories.includes(a.id)
  );
  const regularTotal =
    bundle.mainProduct.price +
    selectedAccObjs.reduce((sum, item) => sum + item.price, 0);

  const isFullBundle = selectedAccessories.length === bundle.accessories.length;
  const discountRate = isFullBundle ? 0.08 : 0.04;
  const bundleSavings = Math.round(regularTotal * discountRate);
  const finalBundlePrice = regularTotal - bundleSavings;

  const handleAdd = () => {
    onAddBundleToCart(bundle, selectedAccessories, selectedMainColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const isCreatorBundle =
    bundle.id === 'bundle-iphone-creator' ||
    bundle.title.toLowerCase().includes('creator') ||
    bundle.title.toLowerCase().includes('iphone 16');

  const isPs5Bundle =
    bundle.id === 'bundle-ps5-starter' ||
    bundle.title.toLowerCase().includes('ps5') ||
    bundle.title.toLowerCase().includes('playstation');

  // 1. Creator Studio Bundle (iPhone 16) Banner Layout
  if (isCreatorBundle) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white border border-hairline-soft rounded-panel overflow-hidden shadow-sm flex flex-col">
          {/* Top-Quality Clear Banner Image Header */}
          <div className="relative w-full overflow-hidden bg-[#e8e2d5] group">
            <img
              src="/i6-pro-banner.png"
              alt="Creator Studio Bundle - A Curated Experience with the New iPhone 16 Pro"
              className="w-full h-auto object-cover max-h-[650px] transition-transform duration-700 ease-out group-hover:scale-[1.008]"
              style={{
                imageRendering: 'high-quality',
                WebkitBackfaceVisibility: 'hidden',
              }}
              loading="eager"
            />

            {/* Gradient Overlay for CTA Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:from-black/60 flex items-end">
              <div className="w-full p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="text-white space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-caption font-medium tracking-wide text-white border border-white/30">
                    <Sparkles className="w-3.5 h-3.5 text-brand" />
                    <span>Curated iPhone 16 Pro Bundle</span>
                  </div>
                  <h3 className="text-title font-semibold text-white md:text-headline">
                    Creator Studio Bundle
                  </h3>
                  <p className="text-footnote text-white/90 max-w-xl hidden sm:block">
                    Includes New iPhone 16 Pro, 25W MagSafe Charger &amp; Silicone Case with free express delivery.
                  </p>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`w-full sm:w-auto min-h-[52px] px-8 rounded-full font-semibold text-footnote transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] shrink-0 border border-white/20 ${
                    isAdded
                      ? 'bg-success text-white'
                      : 'bg-accent hover:bg-accent-hover text-white hover:scale-[1.02]'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="whitespace-nowrap">
                    {isAdded
                      ? '✓ Creator Bundle Added to Bag'
                      : `Add Bundle to Bag • ₦1,513,500`}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Toggle & Summary Bar */}
          <div className="px-6 py-4 bg-canvas-subtle border-t border-hairline-soft flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-footnote text-ink">
              <span className="px-3 py-1 bg-success-surface text-success font-semibold rounded-full border border-success-border text-caption">
                Save ₦132,000 with Bundle Pricing
              </span>
              <span className="hidden sm:inline text-ink-secondary text-caption">
                3 Essential Items Included
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="inline-flex items-center gap-1.5 text-footnote font-semibold text-link hover:underline ml-auto"
            >
              <span>{showCustomizer ? 'Hide Customizer' : 'Customize Color & Accessories'}</span>
              {showCustomizer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Customizer View */}
          {showCustomizer && (
            <div className="p-6 md:p-8 bg-white border-t border-hairline-soft space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Products Row */}
                <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-5 overflow-x-auto pb-2">
                  {/* Main Product */}
                  <div className="flex-1 bg-canvas p-5 rounded-card border border-hairline-soft w-full md:min-w-[220px]">
                    <span className="text-micro font-semibold bg-ink text-white px-2.5 py-1 rounded-full uppercase">
                      Main Product
                    </span>
                    <img
                      src={selectedMainColor.image || bundle.mainProduct.imageUrl}
                      alt={bundle.mainProduct.name}
                      className="w-28 h-28 object-contain mx-auto my-4"
                    />
                    <div className="font-semibold text-body text-ink line-clamp-1">
                      {bundle.mainProduct.name}
                    </div>
                    <div className="text-body text-link font-semibold mt-1">
                      {formatNaira(bundle.mainProduct.price)}
                    </div>

                    {/* Color Selector */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-hairline-soft">
                      {bundle.mainProduct.colors.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedMainColor(c)}
                          className={`w-5 h-5 rounded-full border-2 transition-all ${
                            selectedMainColor.name === c.name
                              ? 'ring-2 ring-accent ring-offset-2 border-transparent'
                              : 'border-hairline'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Plus Divider */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-canvas text-ink-tertiary shrink-0">
                    <Plus className="w-5 h-5" />
                  </div>

                  {/* Accessories */}
                  {bundle.accessories.map((acc) => {
                    const isChecked = selectedAccessories.includes(acc.id);
                    return (
                      <React.Fragment key={acc.id}>
                        <div
                          onClick={() => toggleAccessory(acc.id)}
                          className={`flex-1 p-5 rounded-card border cursor-pointer transition-all w-full md:min-w-[220px] ${
                            isChecked
                              ? 'bg-accent-surface/50 border-accent shadow-sm'
                              : 'bg-canvas border-hairline-soft opacity-60 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-micro font-semibold bg-hairline-soft text-ink px-2.5 py-1 rounded-full uppercase">
                              Accessory
                            </span>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4.5 h-4.5 rounded text-link focus:ring-accent"
                            />
                          </div>

                          <img
                            src={acc.imageUrl}
                            alt={acc.name}
                            className="w-24 h-24 object-contain mx-auto my-4"
                          />

                          <div className="font-semibold text-body text-ink line-clamp-1">
                            {acc.name}
                          </div>
                          <div className="text-body text-link font-semibold mt-1">
                            {formatNaira(acc.price)}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Customizer Summary Box */}
                <div className="lg:col-span-4 bg-canvas p-6 rounded-card border border-hairline-soft space-y-4">
                  <div className="text-footnote text-ink-secondary font-medium">
                    Customized Total ({1 + selectedAccessories.length} items)
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-title-sm font-semibold text-ink">
                      {formatNaira(finalBundlePrice)}
                    </span>
                    {bundleSavings > 0 && (
                      <span className="text-footnote font-semibold text-success bg-success-surface px-2.5 py-1 rounded-md">
                        Save {formatNaira(bundleSavings)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full h-11 px-4 rounded-full font-semibold text-footnote bg-accent hover:bg-accent-hover text-white transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply Custom Bundle</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // 2. PlayStation 5 Day-One Bundle Banner Layout
  if (isPs5Bundle) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-[#101422] border border-white/10 rounded-panel overflow-hidden shadow-2xl flex flex-col">
          {/* Top-Quality Clear Banner Image Header */}
          <div className="relative w-full overflow-hidden bg-[#0a0d17] group">
            <img
              src="/ps5-banner.png"
              alt="PlayStation 5 Day-One Bundle — Save ₦87,000"
              className="w-full h-auto object-cover max-h-[650px] transition-transform duration-700 ease-out group-hover:scale-[1.008]"
              style={{
                imageRendering: 'high-quality',
                WebkitBackfaceVisibility: 'hidden',
              }}
              loading="eager"
            />

            {/* Gradient Overlay for CTA Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d17]/90 via-[#0a0d17]/20 to-transparent sm:from-[#0a0d17]/70 flex items-end">
              <div className="w-full p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="text-white space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full text-caption font-medium tracking-wide text-blue-300 border border-blue-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Frequently Bought Together</span>
                  </div>
                  <h3 className="text-title font-semibold text-white md:text-headline">
                    PlayStation 5 Day-One Bundle
                  </h3>
                  <p className="text-footnote text-gray-300 max-w-xl hidden sm:block">
                    Includes PS5 Console, DualSense Controller &amp; Pulse 3D Headset with free express delivery.
                  </p>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`w-full sm:w-auto min-h-[52px] px-8 rounded-full font-semibold text-footnote transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] shrink-0 border border-blue-400/30 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02]'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="whitespace-nowrap">
                    {isAdded
                      ? '✓ PS5 Bundle Added to Bag'
                      : `Add All 3 Items to Bag • ₦1,000,500`}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Toggle & Summary Bar */}
          <div className="px-6 py-4 bg-[#161b2e] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3 text-footnote">
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 font-semibold rounded-full border border-emerald-500/30 text-caption">
                Save ₦87,000 with Bundle Pricing
              </span>
              <span className="hidden sm:inline text-gray-300 text-caption">
                Includes PS5 Console, 2 DualSense Controllers &amp; Headset
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="inline-flex items-center gap-1.5 text-footnote font-semibold text-blue-400 hover:underline ml-auto"
            >
              <span>{showCustomizer ? 'Hide Customizer' : 'Customize PS5 Accessories'}</span>
              {showCustomizer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Customizer View */}
          {showCustomizer && (
            <div className="p-6 md:p-8 bg-[#101422] border-t border-white/10 space-y-6 animate-fade-in text-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Products Row */}
                <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-5 overflow-x-auto pb-2">
                  {/* Main Product */}
                  <div className="flex-1 bg-[#1a2035] p-5 rounded-card border border-white/10 w-full md:min-w-[220px]">
                    <span className="text-micro font-semibold bg-blue-600 text-white px-2.5 py-1 rounded-full uppercase">
                      Console
                    </span>
                    <img
                      src={selectedMainColor.image || bundle.mainProduct.imageUrl}
                      alt={bundle.mainProduct.name}
                      className="w-28 h-28 object-contain mx-auto my-4"
                    />
                    <div className="font-semibold text-body text-white line-clamp-1">
                      {bundle.mainProduct.name}
                    </div>
                    <div className="text-body text-blue-400 font-semibold mt-1">
                      {formatNaira(bundle.mainProduct.price)}
                    </div>
                  </div>

                  {/* Plus Divider */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#1a2035] text-gray-400 shrink-0 border border-white/10">
                    <Plus className="w-5 h-5" />
                  </div>

                  {/* Accessories */}
                  {bundle.accessories.map((acc) => {
                    const isChecked = selectedAccessories.includes(acc.id);
                    return (
                      <React.Fragment key={acc.id}>
                        <div
                          onClick={() => toggleAccessory(acc.id)}
                          className={`flex-1 p-5 rounded-card border cursor-pointer transition-all w-full md:min-w-[220px] ${
                            isChecked
                              ? 'bg-blue-600/20 border-blue-500 shadow-sm'
                              : 'bg-[#1a2035] border-white/10 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-micro font-semibold bg-white/10 text-gray-200 px-2.5 py-1 rounded-full uppercase">
                              Accessory
                            </span>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4.5 h-4.5 rounded text-blue-600 focus:ring-blue-500"
                            />
                          </div>

                          <img
                            src={acc.imageUrl}
                            alt={acc.name}
                            className="w-24 h-24 object-contain mx-auto my-4"
                          />

                          <div className="font-semibold text-body text-white line-clamp-1">
                            {acc.name}
                          </div>
                          <div className="text-body text-blue-400 font-semibold mt-1">
                            {formatNaira(acc.price)}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Customizer Summary Box */}
                <div className="lg:col-span-4 bg-[#161b2e] p-6 rounded-card border border-white/10 space-y-4">
                  <div className="text-footnote text-gray-300 font-medium">
                    Customized Total ({1 + selectedAccessories.length} items)
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-title-sm font-semibold text-white">
                      {formatNaira(finalBundlePrice)}
                    </span>
                    {bundleSavings > 0 && (
                      <span className="text-footnote font-semibold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-500/30">
                        Save {formatNaira(bundleSavings)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full h-11 px-4 rounded-full font-semibold text-footnote bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply Custom PS5 Bundle</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Standard Bundle layout for other bundles
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-white border border-hairline-soft rounded-panel p-8 md:p-10 shadow-sm">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 mb-8 border-b border-hairline-soft">
          <div>
            <div className="inline-flex items-center gap-2 text-footnote font-semibold text-link mb-2">
              <Sparkles className="w-4 h-4" />
              Frequently Bought Together
            </div>
            <h2 className="text-title font-semibold text-ink">
              {bundle.title}
            </h2>
          </div>

          <span className="text-footnote font-semibold bg-success-surface text-success px-4 py-2 rounded-full border border-success-border self-start">
            Save {formatNaira(bundleSavings)} with Bundle Pricing
          </span>
        </div>

        {/* Bundle Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Products Row */}
          <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-5 overflow-x-auto pb-2">
            {/* Main Product */}
            <div className="flex-1 bg-canvas p-5 rounded-card border border-hairline-soft w-full md:min-w-[220px]">
              <span className="text-micro font-semibold bg-ink text-white px-2.5 py-1 rounded-full uppercase">
                Main Product
              </span>
              <img
                src={selectedMainColor.image || bundle.mainProduct.imageUrl}
                alt={bundle.mainProduct.name}
                className="w-28 h-28 object-contain mx-auto my-4"
              />
              <div className="font-semibold text-body text-ink line-clamp-1">
                {bundle.mainProduct.name}
              </div>
              <div className="text-body text-link font-semibold mt-1">
                {formatNaira(bundle.mainProduct.price)}
              </div>

              {/* Color Selector */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-hairline-soft">
                {bundle.mainProduct.colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMainColor(c)}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      selectedMainColor.name === c.name
                        ? 'ring-2 ring-accent ring-offset-2 border-transparent'
                        : 'border-hairline'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Plus Divider */}
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-canvas text-ink-tertiary shrink-0">
              <Plus className="w-5 h-5" />
            </div>

            {/* Accessories */}
            {bundle.accessories.map((acc) => {
              const isChecked = selectedAccessories.includes(acc.id);
              return (
                <React.Fragment key={acc.id}>
                  <div
                    onClick={() => toggleAccessory(acc.id)}
                    className={`flex-1 p-5 rounded-card border cursor-pointer transition-all w-full md:min-w-[220px] ${
                      isChecked
                        ? 'bg-accent-surface/50 border-accent shadow-sm'
                        : 'bg-canvas border-hairline-soft opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-micro font-semibold bg-hairline-soft text-ink px-2.5 py-1 rounded-full uppercase">
                        Accessory
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4.5 h-4.5 rounded text-link focus:ring-accent"
                      />
                    </div>

                    <img
                      src={acc.imageUrl}
                      alt={acc.name}
                      className="w-24 h-24 object-contain mx-auto my-4"
                    />

                    <div className="font-semibold text-body text-ink line-clamp-1">
                      {acc.name}
                    </div>
                    <div className="text-body text-link font-semibold mt-1">
                      {formatNaira(acc.price)}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-4 bg-canvas p-6 rounded-card border border-hairline-soft space-y-4">
            <div className="text-footnote text-ink-secondary font-medium">
              Bundle Total ({1 + selectedAccessories.length} items)
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-title-sm font-semibold text-ink md:text-title">
                  {formatNaira(finalBundlePrice)}
                </span>
                {bundleSavings > 0 && (
                  <span className="text-footnote text-ink-tertiary line-through">
                    {formatNaira(regularTotal)}
                  </span>
                )}
              </div>

              {bundleSavings > 0 && (
                <span className="shrink-0 rounded-lg bg-success-surface px-3 py-1.5 text-footnote font-semibold text-success">
                  Save {formatNaira(bundleSavings)}
                </span>
              )}
            </div>

            <p className="text-footnote text-ink-secondary">
              Includes free express shipping, 14-day returns, and full
              manufacturer warranty.
            </p>

            <button
              onClick={handleAdd}
              className={`w-full h-11 min-h-[44px] px-4 rounded-full font-semibold text-footnote transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98] active:opacity-80 ${
                isAdded
                  ? 'bg-success text-white'
                  : 'bg-accent hover:bg-accent-hover text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {isAdded
                  ? '✓ Bundle Added to Bag'
                  : `Add All ${1 + selectedAccessories.length} Items to Bag`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
