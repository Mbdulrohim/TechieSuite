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
      <div className="relative bg-white rounded-panel max-w-lg w-full shadow-2xl border border-hairline-soft p-6 md:p-8 overflow-hidden animate-scale-in pb-[calc(1.5rem+env(safe-area-inset-bottom))] my-auto">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-hairline-soft mb-6">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-link" />
            <h2 className="text-lead font-semibold text-ink">
              Choose a pickup location
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close pickup locations"
            className="p-2 rounded-full text-ink-tertiary hover:text-ink hover:bg-canvas transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-footnote text-ink-secondary mb-5">
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
                className={`p-5 rounded-card border cursor-pointer transition-all flex items-start justify-between ${isSelected
                    ? 'border-accent bg-accent-surface/50 ring-1 ring-accent'
                    : 'border-hairline-soft hover:border-hairline bg-white'
                  }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-body text-ink">
                    <span>{store.name}</span>
                    <span className="text-footnote text-ink-tertiary font-normal">
                      ({store.distance})
                    </span>
                  </div>
                  <div className="text-footnote text-ink-secondary">{store.address}</div>
                  <div className="text-footnote text-success font-semibold flex items-center gap-1.5 pt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{store.status}</span>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-caption font-semibold bg-accent text-white px-3 py-1.5 rounded-full shrink-0">
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
            className="w-full bg-ink hover:bg-black active:scale-[0.98] active:opacity-80 text-white text-footnote font-semibold h-11 min-h-[44px] rounded-full transition-all flex items-center justify-center"
          >
            Confirm Store
          </button>
        </div>
      </div>
    </div>
  );
};
