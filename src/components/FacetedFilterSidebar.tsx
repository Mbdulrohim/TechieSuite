import React from 'react';
import { X, RotateCcw, Filter, Check, Star, HardDrive } from 'lucide-react';
import { FilterState } from '../types';
import { formatNaira } from '../utils';

interface FacetedFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChangeFilter: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FacetedFilterSidebar: React.FC<FacetedFilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onChangeFilter,
  onResetFilters,
  totalResults,
}) => {
  if (!isOpen) return null;

  const storageOptions = ['128GB', '256GB', '512GB', '1TB'];

  const toggleStorage = (storage: string) => {
    const exists = filters.selectedStorage.includes(storage);
    const updated = exists
      ? filters.selectedStorage.filter((s) => s !== storage)
      : [...filters.selectedStorage, storage];
    onChangeFilter({ selectedStorage: updated });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-hairline-soft flex items-center justify-between">
          <div className="flex items-center gap-3 font-semibold text-body text-ink">
            <Filter className="w-5 h-5 text-link" />
            <span>Filters</span>
            <span className="text-footnote bg-canvas text-ink-secondary px-2.5 py-0.5 rounded-full font-semibold">
              {totalResults} products
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetFilters}
              className="text-footnote text-link font-medium hover:underline flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="p-2 rounded-full text-ink-tertiary hover:text-ink hover:bg-canvas transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Body */}
        <div className="p-6 space-y-7 overflow-y-auto flex-1">

          {/* Sorting */}
          <div>
            <label className="block text-footnote font-semibold text-ink mb-3">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onChangeFilter({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="w-full bg-white text-ink text-body md:text-footnote font-medium border border-hairline-soft rounded-control px-3.5 h-11 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            >
              <option value="featured">Featured & Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="pt-5 border-t border-hairline-soft">
            <div className="flex items-center justify-between mb-3">
              <span className="text-footnote font-semibold text-ink">Max Price</span>
              <span className="text-body font-semibold text-link">
                {formatNaira(filters.priceRange[1])}
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={2500}
              step={50}
              value={filters.priceRange[1]}
              onChange={(e) =>
                onChangeFilter({ priceRange: [filters.priceRange[0], Number(e.target.value)] })
              }
              className="w-full"
            />
            <div className="flex justify-between text-caption text-ink-tertiary mt-2">
              <span>{formatNaira(50)}</span>
              <span>{formatNaira(1250)}</span>
              <span>{formatNaira(2500)}+</span>
            </div>
          </div>

          {/* Storage */}
          <div className="pt-5 border-t border-hairline-soft">
            <label className="block text-footnote font-semibold text-ink mb-3 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-link" />
              Storage
            </label>
            <div className="grid grid-cols-2 gap-2">
              {storageOptions.map((st) => {
                const isSelected = filters.selectedStorage.includes(st);
                return (
                  <button
                    key={st}
                    onClick={() => toggleStorage(st)}
                    className={`py-3 px-4 rounded-control border text-footnote font-medium flex items-center justify-between transition-all ${isSelected
                        ? 'bg-accent text-white border-accent'
                        : 'bg-canvas text-ink border-hairline-soft hover:border-ink-tertiary'
                      }`}
                  >
                    <span>{st}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div className="pt-5 border-t border-hairline-soft">
            <label className="block text-footnote font-semibold text-ink mb-3">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 4.0, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onChangeFilter({ minRating: rating })}
                  className={`flex-1 py-3 rounded-control text-footnote font-medium border flex items-center justify-center gap-1.5 transition-all ${filters.minRating === rating
                      ? 'bg-ink text-white border-ink'
                      : 'bg-white text-ink border-hairline-soft hover:bg-canvas'
                    }`}
                >
                  {rating === 0 ? (
                    'All'
                  ) : (
                    <>
                      <span>{rating}+</span>
                      <Star className="w-3.5 h-3.5 text-star fill-current" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-5 border-t border-hairline-soft space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-3 rounded-control hover:bg-canvas transition-colors">
              <span className="text-footnote font-medium text-ink">In Stock Only</span>
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => onChangeFilter({ inStockOnly: e.target.checked })}
                className="w-5 h-5"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-3 rounded-control hover:bg-canvas transition-colors">
              <span className="text-footnote font-medium text-ink">On Sale Only</span>
              <input
                type="checkbox"
                checked={filters.onSaleOnly}
                onChange={(e) => onChangeFilter({ onSaleOnly: e.target.checked })}
                className="w-5 h-5"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-hairline-soft bg-canvas">
          <button
            onClick={onClose}
            className="w-full bg-accent hover:bg-accent-hover active:scale-[0.98] active:opacity-80 text-white font-semibold text-body h-11 min-h-[44px] rounded-full transition-all flex items-center justify-center"
          >
            Show {totalResults} Products
          </button>
        </div>
      </div>
    </div>
  );
};
