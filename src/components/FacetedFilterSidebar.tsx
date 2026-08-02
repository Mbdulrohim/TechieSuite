import React from 'react';
import { X, RotateCcw, Filter, Check, Star, DollarSign, HardDrive } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E5E5E7] flex items-center justify-between bg-[#F5F5F7]">
          <div className="flex items-center gap-2 font-bold text-sm text-[#1D1D1F]">
            <Filter className="w-4 h-4 text-[#0066CC]" />
            <span>Faceted Store Filters</span>
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-mono">
              {totalResults} products
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetFilters}
              className="text-xs text-[#0066CC] font-medium hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Body Options */}
        <div className="p-5 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {/* Sorting */}
          <div>
            <label className="block font-bold text-[#1D1D1F] mb-2 uppercase tracking-wider text-[11px]">
              Sort Catalog By:
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onChangeFilter({ sortBy: e.target.value as any })}
              className="w-full bg-[#F5F5F7] text-[#1D1D1F] font-medium border border-[#E5E5E7] rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
            >
              <option value="featured">Featured & Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between font-bold text-[#1D1D1F] mb-2">
              <span className="uppercase tracking-wider text-[11px]">Max Price Limit</span>
              <span className="text-[#0066CC] font-extrabold text-sm">${filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min={50}
              max={2500}
              step={50}
              value={filters.priceRange[1]}
              onChange={(e) => onChangeFilter({ priceRange: [filters.priceRange[0], Number(e.target.value)] })}
              className="w-full accent-[#0066CC]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
              <span>$50</span>
              <span>$1,250</span>
              <span>$2,500+</span>
            </div>
          </div>

          {/* Storage Capacity Selector */}
          <div className="pt-3 border-t border-gray-100">
            <label className="block font-bold text-[#1D1D1F] mb-2 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-[#0066CC]" />
              Storage Capacity Tiers
            </label>
            <div className="grid grid-cols-2 gap-2">
              {storageOptions.map((st) => {
                const isSelected = filters.selectedStorage.includes(st);
                return (
                  <button
                    key={st}
                    onClick={() => toggleStorage(st)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#0066CC] text-white border-[#0066CC]'
                        : 'bg-[#F5F5F7] text-gray-700 border-[#E5E5E7] hover:border-gray-400'
                    }`}
                  >
                    <span>{st}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="pt-3 border-t border-gray-100">
            <label className="block font-bold text-[#1D1D1F] mb-2 uppercase tracking-wider text-[11px]">
              Customer Rating
            </label>
            <div className="flex gap-2">
              {[0, 4.0, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onChangeFilter({ minRating: rating })}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-all ${
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
                      <Star className="w-3 h-3 text-[#FFB800] fill-current" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Switches: In Stock & On Sale */}
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-gray-50">
              <span className="font-semibold text-gray-800">In-Stock at Apple Store Only</span>
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => onChangeFilter({ inStockOnly: e.target.checked })}
                className="w-4 h-4 text-[#0066CC] rounded focus:ring-[#0066CC]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-gray-50">
              <span className="font-semibold text-gray-800">Products with Instant Savings</span>
              <input
                type="checkbox"
                checked={filters.onSaleOnly}
                onChange={(e) => onChangeFilter({ onSaleOnly: e.target.checked })}
                className="w-4 h-4 text-[#D70015] rounded focus:ring-[#D70015]"
              />
            </label>
          </div>

        </div>

        {/* Footer Apply CTA */}
        <div className="p-4 border-t border-[#E5E5E7] bg-[#F5F5F7]">
          <button
            onClick={onClose}
            className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-bold text-xs py-3 rounded-full transition-colors shadow-md"
          >
            Show {totalResults} Matching Products
          </button>
        </div>

      </div>
    </div>
  );
};
