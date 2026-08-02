import React from 'react';
import { X, Scale, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveFromCompare,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-[#E5E5E7] p-8 md:p-10 overflow-hidden animate-scale-in my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-200 mb-8">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-[#0066CC]" />
            <h2 className="text-2xl font-bold text-[#1D1D1F]">
              Compare Models
            </h2>
            <span className="text-[13px] bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold">
              {comparedProducts.length} selected
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-4">
            <Scale className="w-14 h-14 text-gray-200 mx-auto" />
            <div className="font-bold text-xl text-[#1D1D1F]">
              No products selected
            </div>
            <p className="text-[15px] max-w-sm mx-auto">
              Click the compare icon on any product to compare specs side-by-side.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 bg-gray-50 font-semibold text-[14px] text-gray-500 w-40 rounded-l-xl">
                    Product
                  </th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-4 border-l border-gray-200 min-w-[220px]">
                      <div className="relative flex flex-col items-center text-center space-y-3">
                        <button
                          onClick={() => onRemoveFromCompare(p.id)}
                          className="absolute -top-1 -right-1 p-1.5 text-gray-400 hover:text-red-500 bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img src={p.imageUrl} alt={p.name} className="w-24 h-24 object-contain mx-auto" />
                        <div className="font-bold text-[15px] text-[#1D1D1F]">{p.name}</div>
                        <div className="text-[17px] font-bold text-[#0066CC]">${p.price}</div>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white py-2.5 px-4 rounded-full font-semibold text-[13px] transition-colors"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 font-medium text-[14px] text-gray-500 bg-gray-50">Rating</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-gray-200 font-semibold text-[14px] text-[#1D1D1F]">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                        {p.rating} ({p.reviewCount.toLocaleString()})
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-[14px] text-gray-500 bg-gray-50">Financing</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-gray-200 text-[14px] text-emerald-600 font-medium">
                      ${p.monthlyPrice}/mo for 24 mo.
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-[14px] text-gray-500 bg-gray-50">Colors</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-gray-200">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.colors.map((c, idx) => (
                          <span
                            key={idx}
                            className="w-5 h-5 rounded-full border-2 border-gray-200"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                {['Display', 'Chip', 'Processor', 'Camera', 'Battery', 'Weight'].map((specKey) => (
                  <tr key={specKey}>
                    <td className="p-4 font-medium text-[14px] text-gray-500 bg-gray-50">{specKey}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 border-l border-gray-200 text-[14px] text-gray-700">
                        {p.specs[specKey] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
