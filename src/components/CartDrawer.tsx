import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, ArrowRight, Tag, CreditCard } from 'lucide-react';
import { CartItem, TradeInQuote } from '../types';
import { formatNaira } from '../utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onToggleAppleCare: (cartItemId: string) => void;
  tradeInQuote: TradeInQuote | null;
  onRemoveTradeIn: () => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onToggleAppleCare,
  tradeInQuote,
  onRemoveTradeIn,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => {
    const basePrice = item.product.price + (item.selectedStorage?.priceDelta || 0);
    const appleCarePrice = item.appleCare ? 199 : 0;
    return sum + (basePrice + appleCarePrice) * item.quantity;
  }, 0);

  const tradeInCredit = tradeInQuote ? tradeInQuote.value : 0;
  const netSubtotal = Math.max(0, rawSubtotal - tradeInCredit);
  const estimatedTax = Math.round(netSubtotal * 0.0875);
  const total = netSubtotal + estimatedTax;

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (netSubtotal / freeShippingThreshold) * 100);
  const dailyCashEarned = (total * 0.03).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-in-right">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E5E5E7] flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-[17px] text-[#1D1D1F]">
            <ShoppingBag className="w-5 h-5 text-[#0066CC]" />
            <span>Your Bag</span>
            <span className="text-[13px] bg-[#0066CC] text-white px-2.5 py-0.5 rounded-full font-semibold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shipping Progress */}
        <div className="bg-[#0066CC]/5 border-b border-[#0066CC]/10 px-6 py-3">
          <div className="flex items-center justify-between text-[#0066CC] font-medium text-[13px] mb-2">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              {netSubtotal >= freeShippingThreshold
                ? 'You qualify for FREE Express Shipping!'
                : `Add ${formatNaira(freeShippingThreshold - netSubtotal)} more for free shipping`}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0066CC] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl text-[#1D1D1F]">Your Bag is empty</h3>
              <p className="text-[14px] text-gray-500 max-w-xs">
                Browse our products and add something you love.
              </p>
              <button
                onClick={onClose}
                className="bg-[#0066CC] text-white text-[14px] font-semibold px-8 py-3 rounded-full hover:bg-[#0055B3] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => {
                const baseUnitPrice = item.product.price + (item.selectedStorage?.priceDelta || 0);
                const lineTotal = (baseUnitPrice + (item.appleCare ? 199 : 0)) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-[#E5E5E7] p-5 rounded-2xl space-y-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.selectedColor.image || item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-contain rounded-xl bg-gray-50 p-2 shrink-0"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-[15px] text-[#1D1D1F]">
                              {item.product.name}
                            </h4>
                            <div className="text-[13px] text-gray-500 mt-0.5">
                              {item.selectedColor.name}
                              {item.selectedStorage && ` · ${item.selectedStorage.capacity}`}
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-400 hover:text-[#D70015] p-1.5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-200 rounded-l-full text-gray-600 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-4 text-[14px] font-bold text-[#1D1D1F]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-200 rounded-r-full text-gray-600 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-[15px] font-bold text-[#1D1D1F]">
                              {formatNaira(lineTotal)}
                            </div>
                            <div className="text-[12px] text-emerald-600 font-medium">
                              {formatNaira(lineTotal / 24)}/mo
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AppleCare+ */}
                    <div className="bg-[#F5F5F7] p-3.5 rounded-xl flex items-center justify-between">
                      <label className="flex items-center gap-2.5 cursor-pointer font-medium text-[13px] text-gray-700">
                        <input
                          type="checkbox"
                          checked={item.appleCare}
                          onChange={() => onToggleAppleCare(item.id)}
                          className="w-4 h-4"
                        />
                        <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                        <span>AppleCare+ Protection</span>
                      </label>
                      <span className="text-[13px] font-semibold text-gray-500">+{formatNaira(199)}</span>
                    </div>
                  </div>
                );
              })}

              {/* Trade-In Credit */}
              {tradeInQuote && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-[14px] text-emerald-800">
                        Trade-In: {tradeInQuote.device}
                      </div>
                      <div className="text-[12px] text-emerald-600">
                        Credit applied to order
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-emerald-700 text-[16px]">
                      -{formatNaira(tradeInQuote.value)}
                    </span>
                    <button
                      onClick={onRemoveTradeIn}
                      className="text-[13px] text-gray-400 hover:text-red-500 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Order Summary Footer */}
        {cart.length > 0 && (
          <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-[#E5E5E7] bg-[#F5F5F7] space-y-4">
            <div className="space-y-2 text-[14px] text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatNaira(rawSubtotal)}</span>
              </div>

              {tradeInCredit > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Trade-In Discount</span>
                  <span>-{formatNaira(tradeInCredit)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600 font-semibold">
                  {netSubtotal >= freeShippingThreshold ? 'FREE' : formatNaira(10)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>{formatNaira(estimatedTax)}</span>
              </div>

              <div className="flex justify-between font-bold text-[17px] text-[#1D1D1F] pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>
            </div>

            {/* Apple Card callout */}
            <div className="bg-[#1D1D1F] text-white p-3.5 rounded-xl text-[13px] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0066CC]" />
                <span>3% Daily Cash with Apple Card</span>
              </div>
              <span className="font-bold text-emerald-400">+{formatNaira(Number(dailyCashEarned))}</span>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={onOpenCheckout}
              className="w-full bg-[#0066CC] hover:bg-[#0055B3] active:scale-[0.98] active:opacity-80 text-white font-semibold text-[15px] h-11 min-h-[44px] rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
