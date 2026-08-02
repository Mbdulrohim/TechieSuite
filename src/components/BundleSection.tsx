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
      <div className="bg-white border border-[#E5E5E7] rounded-3xl p-8 md:p-10 shadow-sm">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 mb-8 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0066CC] mb-2 font-inter">
              <Sparkles className="w-4 h-4" />
              Frequently Bought Together
            </div>
            <h2 className="text-3xl font-national-park font-medium text-[#333333]">
              {bundle.title}
            </h2>
          </div>

          <span className="text-[13px] font-semibold bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200 self-start font-inter">
            Save {formatNaira(bundleSavings)} with Bundle Pricing
          </span>
        </div>

        {/* Bundle Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Products Row */}
          <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-5 overflow-x-auto pb-2">
            {/* Main Product */}
            <div className="flex-1 bg-[#F5F5F7] p-5 rounded-2xl border border-gray-200 w-full min-w-[220px]">
              <span className="text-[11px] font-bold bg-[#1D1D1F] text-white px-2.5 py-1 rounded-full uppercase">
                Main Product
              </span>
              <img
                src={selectedMainColor.image || bundle.mainProduct.imageUrl}
                alt={bundle.mainProduct.name}
                className="w-28 h-28 object-contain mx-auto my-4"
              />
              <div className="font-bold text-[15px] text-[#1D1D1F] line-clamp-1">
                {bundle.mainProduct.name}
              </div>
              <div className="text-[15px] text-[#0066CC] font-bold mt-1 font-inter">
                {formatNaira(bundle.mainProduct.price)}
              </div>

              {/* Color Selector */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                {bundle.mainProduct.colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMainColor(c)}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      selectedMainColor.name === c.name
                        ? 'ring-2 ring-[#0066CC] ring-offset-2 border-transparent'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Plus Divider */}
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-400 shrink-0">
              <Plus className="w-5 h-5" />
            </div>

            {/* Accessories */}
            {bundle.accessories.map((acc) => {
              const isChecked = selectedAccessories.includes(acc.id);
              return (
                <React.Fragment key={acc.id}>
                  <div
                    onClick={() => toggleAccessory(acc.id)}
                    className={`flex-1 p-5 rounded-2xl border cursor-pointer transition-all w-full min-w-[220px] ${
                      isChecked
                        ? 'bg-blue-50/50 border-[#0066CC] shadow-sm'
                        : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full uppercase">
                        Accessory
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4.5 h-4.5 rounded text-[#0066CC] focus:ring-[#0066CC]"
                      />
                    </div>

                    <img
                      src={acc.imageUrl}
                      alt={acc.name}
                      className="w-24 h-24 object-contain mx-auto my-4"
                    />

                    <div className="font-bold text-[15px] text-[#1D1D1F] line-clamp-1">
                      {acc.name}
                    </div>
                    <div className="text-[15px] text-[#0066CC] font-bold mt-1 font-inter">
                      {formatNaira(acc.price)}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-4 bg-[#F5F5F7] p-6 rounded-2xl border border-gray-200 space-y-4">
            <div className="text-[13px] text-gray-500 font-medium">
              Bundle Total ({1 + selectedAccessories.length} items)
            </div>

            <div className="flex items-baseline justify-between font-inter">
              <div>
                <span className="text-3xl font-bold text-[#1D1D1F]">
                  {formatNaira(finalBundlePrice)}
                </span>
                {bundleSavings > 0 && (
                  <span className="text-[14px] text-gray-400 line-through ml-2">
                    {formatNaira(regularTotal)}
                  </span>
                )}
              </div>

              {bundleSavings > 0 && (
                <span className="text-[13px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg">
                  Save {formatNaira(bundleSavings)}
                </span>
              )}
            </div>

            <p className="text-[13px] text-gray-500 leading-relaxed">
              Includes free express shipping, 14-day returns, and full
              manufacturer warranty.
            </p>

            <button
              onClick={handleAdd}
              className={`w-full py-3.5 px-4 rounded-full font-semibold text-[14px] transition-all flex items-center justify-center gap-2 shadow-md ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0066CC] hover:bg-[#0055B3] text-white active:scale-[0.98]'
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
