import React, { useState } from 'react';
import { Plus, Check, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { ProductBundle, ProductColor } from '../types';

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

  // Calculate dynamic bundle total
  const selectedAccObjs = bundle.accessories.filter((a) =>
    selectedAccessories.includes(a.id)
  );
  const regularTotal =
    bundle.mainProduct.price +
    selectedAccObjs.reduce((sum, item) => sum + item.price, 0);

  // Apply 10% discount if all accessories selected, or 5% if partial
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
    <section className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-white border border-[#E5E5E7] rounded-3xl p-6 md:p-8 shadow-sm">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 mb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Frequently Bought Together • Save Extra
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1F]">
              {bundle.title}
            </h2>
          </div>

          <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 self-start md:self-auto">
            ⚡ Save ${bundleSavings} with Instant Bundle Pricing
          </span>
        </div>

        {/* Bundle Product Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Main Items Display with Plus icons */}
          <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-4 overflow-x-auto pb-2">
            
            {/* Main Product Tile */}
            <div className="flex-1 bg-[#F5F5F7] p-4 rounded-2xl border border-gray-200 w-full min-w-[200px]">
              <span className="text-[10px] font-bold bg-[#1D1D1F] text-white px-2 py-0.5 rounded uppercase">
                Primary Product
              </span>
              <img
                src={selectedMainColor.image || bundle.mainProduct.imageUrl}
                alt={bundle.mainProduct.name}
                className="w-24 h-24 object-contain mx-auto my-2"
              />
              <div className="font-bold text-xs text-[#1D1D1F] line-clamp-1">
                {bundle.mainProduct.name}
              </div>
              <div className="text-xs text-[#0066CC] font-bold">
                ${bundle.mainProduct.price}
              </div>

              {/* Main Product Color Selector */}
              <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-200">
                {bundle.mainProduct.colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMainColor(c)}
                    className={`w-3.5 h-3.5 rounded-full border ${
                      selectedMainColor.name === c.name
                        ? 'ring-2 ring-[#0066CC] ring-offset-1'
                        : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Plus Divider */}
            <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 shrink-0 font-bold">
              <Plus className="w-4 h-4" />
            </div>

            {/* Accessory Items */}
            {bundle.accessories.map((acc) => {
              const isChecked = selectedAccessories.includes(acc.id);
              return (
                <React.Fragment key={acc.id}>
                  <div
                    onClick={() => toggleAccessory(acc.id)}
                    className={`flex-1 p-4 rounded-2xl border cursor-pointer transition-all w-full min-w-[200px] ${
                      isChecked
                        ? 'bg-blue-50/50 border-[#0066CC] shadow-xs'
                        : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded uppercase">
                        Accessory
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-[#0066CC] focus:ring-[#0066CC]"
                      />
                    </div>

                    <img
                      src={acc.imageUrl}
                      alt={acc.name}
                      className="w-20 h-20 object-contain mx-auto my-2"
                    />

                    <div className="font-bold text-xs text-[#1D1D1F] line-clamp-1">
                      {acc.name}
                    </div>
                    <div className="text-xs text-[#0066CC] font-bold">
                      ${acc.price}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Right Bundle Summary & CTA Box */}
          <div className="lg:col-span-4 bg-[#F5F5F7] p-5 rounded-2xl border border-gray-200 space-y-3">
            <div className="text-xs text-gray-500 font-medium">Bundle Total ({1 + selectedAccessories.length} items):</div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-[#1D1D1F]">
                  ${finalBundlePrice}
                </span>
                {bundleSavings > 0 && (
                  <span className="text-xs text-gray-400 line-through ml-2">
                    ${regularTotal}
                  </span>
                )}
              </div>

              {bundleSavings > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">
                  Save ${bundleSavings}
                </span>
              )}
            </div>

            <p className="text-[11px] text-gray-500">
              Includes free express shipping, 14-day hassle-free returns, and full manufacturer warranty.
            </p>

            <button
              onClick={handleAdd}
              className={`w-full py-3 px-4 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0066CC] hover:bg-[#0055B3] text-white active:scale-95'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {isAdded ? '✓ Bundle Added to Bag' : `Add All ${1 + selectedAccessories.length} Items to Bag`}
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
