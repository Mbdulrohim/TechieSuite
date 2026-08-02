import React from 'react';
import { X, Scale, ShoppingBag, Trash2, Check, Star } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-[#E5E5E7] p-6 md:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#0066CC]" />
            <h2 className="text-xl font-bold text-[#1D1D1F]">
              Compare Apple Models Side-by-Side
            </h2>
            <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full font-bold">
              {comparedProducts.length} selected
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="py-12 text-center text-gray-500 space-y-3">
            <Scale className="w-12 h-12 text-gray-300 mx-auto" />
            <div className="font-bold text-base text-[#1D1D1F]">
              No products selected for comparison
            </div>
            <p className="text-xs max-w-sm mx-auto">
              Click the scale icon on any product tile to compare specs side-by-side.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-gray-50 font-bold text-gray-500 w-36">
                    Product
                  </th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-3 border-l border-gray-200 min-w-[200px]">
                      <div className="relative flex flex-col items-center text-center space-y-2">
                        <button
                          onClick={() => onRemoveFromCompare(p.id)}
                          className="absolute -top-2 -right-2 p-1 text-gray-400 hover:text-red-500 bg-gray-100 rounded-full"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-20 h-20 object-contain mx-auto"
                        />
                        <div className="font-bold text-sm text-[#1D1D1F]">{p.name}</div>
                        <div className="text-sm font-extrabold text-[#0066CC]">${p.price}</div>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white py-1.5 px-3 rounded-full font-bold text-[11px] shadow-xs"
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
                  <td className="p-3 font-semibold text-gray-500 bg-gray-50">Rating</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 border-l border-gray-200 font-bold text-[#1D1D1F]">
                      ★ {p.rating} ({p.reviewCount} reviews)
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-500 bg-gray-50">Financing</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 border-l border-gray-200 text-emerald-600 font-medium">
                      ${p.monthlyPrice}/mo for 24 mo.
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-500 bg-gray-50">Colors Available</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 border-l border-gray-200">
                      <div className="flex gap-1 flex-wrap">
                        {p.colors.map((c, idx) => (
                          <span
                            key={idx}
                            className="w-3.5 h-3.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Dynamically compare specs */}
                {['Display', 'Chip', 'Processor', 'Camera', 'Battery', 'Weight'].map((specKey) => (
                  <tr key={specKey}>
                    <td className="p-3 font-semibold text-gray-500 bg-gray-50">{specKey}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3 border-l border-gray-200 text-gray-800">
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
