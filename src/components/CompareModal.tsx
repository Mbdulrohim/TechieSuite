import React from 'react';
import { X, Scale, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { formatNaira } from '../utils';

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
      <div className="relative bg-white rounded-panel max-w-5xl w-full shadow-2xl border border-hairline-soft p-8 md:p-10 overflow-hidden animate-scale-in my-8">

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-hairline-soft mb-8">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-link" />
            <h2 className="text-title-sm font-semibold text-ink">
              Compare Models
            </h2>
            <span className="text-footnote bg-canvas text-ink px-3 py-1 rounded-full font-semibold">
              {comparedProducts.length} selected
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-ink-tertiary hover:text-ink hover:bg-canvas transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="py-16 text-center text-ink-tertiary space-y-4">
            <Scale className="w-14 h-14 text-hairline-soft mx-auto" />
            <div className="font-semibold text-lead text-ink">
              No products selected
            </div>
            <p className="text-body max-w-sm mx-auto">
              Click the compare icon on any product to compare specs side-by-side.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 bg-canvas font-semibold text-footnote text-ink-secondary w-40 rounded-l-control">
                    Product
                  </th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-4 border-l border-hairline-soft min-w-[220px]">
                      <div className="relative flex flex-col items-center text-center space-y-3">
                        <button
                          onClick={() => onRemoveFromCompare(p.id)}
                          className="absolute -top-1 -right-1 p-1.5 text-ink-tertiary hover:text-critical bg-canvas rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img src={p.imageUrl} alt={p.name} className="w-24 h-24 object-contain mx-auto" />
                        <div className="font-semibold text-body text-ink">{p.name}</div>
                        <div className="text-body font-semibold text-link">{formatNaira(p.price)}</div>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="w-full bg-accent hover:bg-accent-hover text-white py-2.5 px-4 rounded-full font-semibold text-footnote transition-colors"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline-soft">
                <tr>
                  <td className="p-4 font-medium text-footnote text-ink-secondary bg-canvas">Rating</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-hairline-soft font-semibold text-footnote text-ink">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-star text-star" />
                        {p.rating} ({p.reviewCount.toLocaleString()})
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-footnote text-ink-secondary bg-canvas">Financing</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-hairline-soft text-footnote text-success font-medium">
                      {formatNaira(p.monthlyPrice)}/mo for 24 mo.
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-footnote text-ink-secondary bg-canvas">Colors</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-hairline-soft">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.colors.map((c, idx) => (
                          <span
                            key={idx}
                            className="w-5 h-5 rounded-full border-2 border-hairline-soft"
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
                    <td className="p-4 font-medium text-footnote text-ink-secondary bg-canvas">{specKey}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 border-l border-hairline-soft text-footnote text-ink">
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
