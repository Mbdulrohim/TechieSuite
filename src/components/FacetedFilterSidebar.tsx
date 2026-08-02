import React from 'react';
import { X, RotateCcw, Filter, Check, Star, HardDrive } from 'lucide-react';
import { FilterState } from '../types';

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
        <div className="p-6 border-b border-[#E5E5E7] flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-[17px] text-[#1D1D1F]">
            <Filter className="w-5 h-5 text-[#0066CC]" />
            <span>Filters</span>
            <span className="text-[13px] bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-semibold">
              {totalResults} products
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetFilters}
              className="text-[13px] text-[#0066CC] font-medium hover:underline flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Body */}
        <div className="p-6 space-y-7 overflow-y-auto flex-1">
          
          {/* Sorting */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1D1D1F] mb-3">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onChangeFilter({ sortBy: e.target.value as any })}
              className="w-full bg-[#F5F5F7] text-[#1D1D1F] text-[14px] font-medium border border-[#E5E5E7] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 transition-all"
            >
              <option value="featured">Featured & Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-semibold text-[#1D1D1F]">Max Price</span>
              <span className="text-[16px] font-bold text-[#0066CC]">
                ${filters.priceRange[1]}
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
            <div className="flex justify-between text-[12px] text-gray-400 mt-2">
              <span>$50</span>
              <span>$1,250</span>
              <span>$2,500+</span>
            </div>
          </div>

          {/* Storage */}
          <div className="pt-5 border-t border-gray-100">
            <label className="block text-[14px] font-semibold text-[#1D1D1F] mb-3 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#0066CC]" />
              Storage
            </label>
            <div className="grid grid-cols-2 gap-2">
              {storageOptions.map((st) => {
                const isSelected = filters.selectedStorage.includes(st);
                return (
                  <button
                    key={st}
                    onClick={() => toggleStorage(st)}
                    className={`py-3 px-4 rounded-xl border text-[14px] font-medium flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#0066CC] text-white border-[#0066CC]'
                        : 'bg-[#F5F5F7] text-gray-700 border-[#E5E5E7] hover:border-gray-400'
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
          <div className="pt-5 border-t border-gray-100">
            <label className="block text-[14px] font-semibold text-[#1D1D1F] mb-3">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 4.0, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onChangeFilter({ minRating: rating })}
                  className={`flex-1 py-3 rounded-xl text-[14px] font-medium border flex items-center justify-center gap-1.5 transition-all ${
                    filters.minRating === rating
                      ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {rating === 0 ? (
                    'All'
                  ) : (
                    <>
                      <span>{rating}+</span>
                      <Star className="w-3.5 h-3.5 text-[#FFB800] fill-current" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-5 border-t border-gray-100 space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-[14px] font-medium text-gray-700">In Stock Only</span>
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => onChangeFilter({ inStockOnly: e.target.checked })}
                className="w-5 h-5"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-[14px] font-medium text-gray-700">On Sale Only</span>
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
        <div className="p-6 border-t border-[#E5E5E7] bg-[#F5F5F7]">
          <button
            onClick={onClose}
            className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-semibold text-[15px] py-3.5 rounded-full transition-colors"
          >
            Show {totalResults} Products
          </button>
        </div>
      </div>
    </div>
  );
};
