import React from 'react';
import { X, MapPin, CheckCircle2 } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/products';
import { StoreLocation } from '../types';

interface StoreSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStore: StoreLocation;
  onSelectStore: (store: StoreLocation) => void;
}

export const StoreSelectorModal: React.FC<StoreSelectorModalProps> = ({
  isOpen,
  onClose,
  currentStore,
  onSelectStore,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#E5E5E7] p-8 overflow-hidden animate-scale-in">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-[#0066CC]" />
            <h2 className="text-xl font-bold text-[#1D1D1F]">
              Select Your Apple Store
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[14px] text-gray-500 mb-5">
          Choose a store for stock availability and same-day pickup.
        </p>

        {/* Store List */}
        <div className="space-y-3">
          {STORE_LOCATIONS.map((store) => {
            const isSelected = currentStore.id === store.id;
            return (
              <div
                key={store.id}
                onClick={() => {
                  onSelectStore(store);
                  onClose();
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                  isSelected
                    ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-[15px] text-[#1D1D1F]">
                    <span>{store.name}</span>
                    <span className="text-[13px] text-gray-400 font-normal">
                      ({store.distance})
                    </span>
                  </div>
                  <div className="text-[14px] text-gray-600">{store.address}</div>
                  <div className="text-[13px] text-emerald-600 font-semibold flex items-center gap-1.5 pt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{store.status}</span>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-[12px] font-semibold bg-[#0066CC] text-white px-3 py-1.5 rounded-full shrink-0">
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-[#1D1D1F] text-white text-[14px] font-semibold py-3 rounded-full hover:bg-black transition-colors"
          >
            Confirm Store
          </button>
        </div>
      </div>
    </div>
  );
};
