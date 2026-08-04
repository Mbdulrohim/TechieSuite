import React, { useState } from 'react';
import { Plus, ShoppingBag, Sparkles } from 'lucide-react';
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
                    className={`w-5 h-5 rounded-full border-2 transition-all ${selectedMainColor.name === c.name
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
                    className={`flex-1 p-5 rounded-card border cursor-pointer transition-all w-full md:min-w-[220px] ${isChecked
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
                        onChange={() => { }}
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
              className={`w-full h-11 min-h-[44px] px-4 rounded-full font-semibold text-footnote transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98] active:opacity-80 ${isAdded
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
