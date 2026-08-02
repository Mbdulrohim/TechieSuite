import React from 'react';
import { X, MapPin, CheckCircle2, Clock, Phone } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#E5E5E7] p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0066CC]" />
            <h2 className="text-lg font-bold text-[#1D1D1F]">
              Select Your Local Apple Store
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          Choose a store to check real-time stock availability and reserve items for same-day Express Pickup.
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
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                  isSelected
                    ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1D1D1F]">
                    <span>{store.name}</span>
                    <span className="text-xs text-gray-400 font-normal">({store.distance})</span>
                  </div>
                  <div className="text-xs text-gray-600">{store.address}</div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{store.status}</span>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-xs font-bold bg-[#0066CC] text-white px-2.5 py-1 rounded-full shrink-0">
                    Active Store
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={onClose}
            className="w-full bg-[#1D1D1F] text-white text-xs font-bold py-2.5 rounded-full hover:bg-black transition-colors"
          >
            Confirm Selected Store
          </button>
        </div>

      </div>
    </div>
  );
};
