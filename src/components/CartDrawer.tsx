import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, ArrowRight, Tag, CreditCard } from 'lucide-react';
import { CartItem, TradeInQuote } from '../types';

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

  // Compute subtotal
  const rawSubtotal = cart.reduce((sum, item) => {
    const basePrice = item.product.price + (item.selectedStorage?.priceDelta || 0);
    const appleCarePrice = item.appleCare ? 199 : 0;
    return sum + (basePrice + appleCarePrice) * item.quantity;
  }, 0);

  const tradeInCredit = tradeInQuote ? tradeInQuote.value : 0;
  const netSubtotal = Math.max(0, rawSubtotal - tradeInCredit);
  const estimatedTax = Math.round(netSubtotal * 0.0875);
  const total = netSubtotal + estimatedTax;

  // Free shipping threshold ($50)
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (netSubtotal / freeShippingThreshold) * 100);

  // Daily Cash 3% back
  const dailyCashEarned = (total * 0.03).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-[#E5E5E7] bg-[#F5F5F7] flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-[#1D1D1F] text-base">
            <ShoppingBag className="w-5 h-5 text-[#0066CC]" />
            <span>Your Apple Shopping Bag</span>
            <span className="text-xs bg-[#0066CC] text-white px-2 py-0.5 rounded-full">
              {cart.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#0066CC]/5 border-b border-[#0066CC]/10 p-3 text-xs">
          <div className="flex items-center justify-between text-[#0066CC] font-semibold mb-1">
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              {netSubtotal >= freeShippingThreshold
                ? '⚡ You qualify for FREE 2-Day Express Shipping!'
                : `Add $${(freeShippingThreshold - netSubtotal).toFixed(2)} more for FREE Express Shipping`}
            </span>
            <span>{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0066CC] h-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#1D1D1F]">Your Bag is empty</h3>
              <p className="text-xs text-gray-500 max-w-xs">
                Explore our best-selling iPhone 16 Pro, MacBook Air M3, or AirPods Pro to start building your order.
              </p>
              <button
                onClick={onClose}
                className="bg-[#0066CC] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md hover:bg-[#0055B3]"
              >
                Shop Popular Apple Products
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
                    className="bg-white border border-[#E5E5E7] p-3.5 rounded-2xl space-y-3 shadow-xs hover:border-gray-300 transition-all"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.selectedColor.image || item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain rounded-xl bg-gray-50 p-1 shrink-0"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-xs text-[#1D1D1F]">
                              {item.product.name}
                            </h4>
                            <div className="text-[11px] text-gray-500 mt-0.5">
                              {item.selectedColor.name}
                              {item.selectedStorage && ` • ${item.selectedStorage.capacity}`}
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-400 hover:text-[#D70015] p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                          <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded-l-full text-gray-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-[#1D1D1F]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded-r-full text-gray-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-extrabold text-[#1D1D1F]">
                              ${lineTotal}
                            </div>
                            <div className="text-[10px] text-emerald-600 font-medium">
                              Or ${(lineTotal / 24).toFixed(2)}/mo
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AppleCare+ Protection Checkbox Addon */}
                    <div className="bg-[#F5F5F7] p-2.5 rounded-xl flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-800">
                        <input
                          type="checkbox"
                          checked={item.appleCare}
                          onChange={() => onToggleAppleCare(item.id)}
                          className="w-4 h-4 text-[#0066CC] rounded focus:ring-[#0066CC]"
                        />
                        <div className="flex items-center gap-1 text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0066CC]" />
                          <span>Add AppleCare+ Protection (+$199)</span>
                        </div>
                      </label>
                    </div>
                  </div>
                );
              })}

              {/* Applied Trade-In Discount Banner inside Cart */}
              {tradeInQuote && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold">
                        Trade-In Credit Applied: {tradeInQuote.device}
                      </div>
                      <div className="text-[10px] text-emerald-600">
                        Estimated Credit Value Deduction
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-emerald-700 text-sm">
                      -${tradeInQuote.value}.00
                    </span>
                    <button
                      onClick={onRemoveTradeIn}
                      className="text-xs text-gray-400 hover:text-red-500 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Cart Order Summary & Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-[#E5E5E7] bg-[#F5F5F7] space-y-3">
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>${rawSubtotal}</span>
              </div>

              {tradeInCredit > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Trade-In Instant Discount</span>
                  <span>-${tradeInCredit}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600 font-bold">
                  {netSubtotal >= freeShippingThreshold ? 'FREE 2-Day' : '$10.00'}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span>${estimatedTax}</span>
              </div>

              <div className="flex justify-between font-extrabold text-sm text-[#1D1D1F] pt-2 border-t border-gray-200">
                <span>Total Due Today</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Apple Card cashback callout */}
            <div className="bg-[#1D1D1F] text-white p-2.5 rounded-xl text-[11px] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0066CC]" />
                <span>Earn 3% Daily Cash with Apple Card:</span>
              </div>
              <span className="font-extrabold text-emerald-400">+${dailyCashEarned}</span>
            </div>

            {/* Checkout CTA Trigger */}
            <button
              onClick={onOpenCheckout}
              className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-bold text-sm py-3.5 px-4 rounded-full transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>Proceed to Express Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
