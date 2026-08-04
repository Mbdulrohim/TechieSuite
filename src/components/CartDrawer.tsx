import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, ArrowRight, Tag, CreditCard } from 'lucide-react';
import { CartItem, TradeInQuote } from '../types';
import { formatNaira } from '../utils';
import { PROTECTION, protectionPrice } from '../data/protection';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onToggleProtection: (cartItemId: string) => void;
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
  onToggleProtection,
  tradeInQuote,
  onRemoveTradeIn,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => {
    const basePrice = item.product.price + (item.selectedStorage?.priceDelta || 0);
    const protectionAmount = protectionPrice(item.product, item.protection);
    return sum + (basePrice + protectionAmount) * item.quantity;
  }, 0);

  const tradeInCredit = tradeInQuote ? tradeInQuote.value : 0;
  const netSubtotal = Math.max(0, rawSubtotal - tradeInCredit);
  const freeShippingThreshold = 50;
  const shipping = netSubtotal >= freeShippingThreshold ? 0 : 10;
  const estimatedTax = Math.round(netSubtotal * 0.075);
  const total = netSubtotal + estimatedTax + shipping;
  const progressToFreeShipping = Math.min(100, (netSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-in-right">

        {/* Header */}
        <div className="p-6 border-b border-hairline-soft flex items-center justify-between">
          <div className="flex items-center gap-3 font-semibold text-body text-ink">
            <ShoppingBag className="w-5 h-5 text-link" />
            <span>Your Bag</span>
            <span className="text-footnote bg-accent text-white px-2.5 py-0.5 rounded-full font-semibold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close bag"
            className="p-2 rounded-full text-ink-tertiary hover:text-ink hover:bg-canvas transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shipping Progress */}
        <div className="bg-accent/5 border-b border-accent/10 px-6 py-3">
          <div className="flex items-center justify-between text-link font-medium text-footnote mb-2">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              {netSubtotal >= freeShippingThreshold
                ? 'You qualify for FREE Express Shipping!'
                : `Add ${formatNaira(freeShippingThreshold - netSubtotal)} more for free shipping`}
            </span>
          </div>
          <div className="w-full bg-hairline-soft h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-canvas flex items-center justify-center text-ink-tertiary">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-semibold text-lead text-ink">Your Bag is empty</h3>
              <p className="text-footnote text-ink-secondary max-w-xs">
                Browse our products and add something you love.
              </p>
              <button
                onClick={onClose}
                className="bg-accent text-white text-footnote font-semibold px-8 py-3 rounded-full hover:bg-accent-hover transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => {
                const baseUnitPrice = item.product.price + (item.selectedStorage?.priceDelta || 0);
                const lineTotal = (baseUnitPrice + protectionPrice(item.product, item.protection)) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-hairline-soft p-5 rounded-card space-y-4 hover:border-hairline transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.selectedColor.image || item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-contain rounded-control bg-canvas p-2 shrink-0"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-body text-ink">
                              {item.product.name}
                            </h4>
                            <div className="text-footnote text-ink-secondary mt-0.5">
                              {item.selectedColor.name}
                              {item.selectedStorage && ` · ${item.selectedStorage.capacity}`}
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            aria-label={`Remove ${item.product.name} from bag`}
                            className="text-ink-tertiary hover:text-critical p-1.5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-hairline-soft">
                          <div className="flex items-center border border-hairline-soft rounded-full bg-canvas">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease ${item.product.name} quantity`}
                              className="p-2 hover:bg-hairline-soft rounded-l-full text-ink-secondary transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-4 text-footnote font-semibold text-ink">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase ${item.product.name} quantity`}
                              className="p-2 hover:bg-hairline-soft rounded-r-full text-ink-secondary transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-body font-semibold text-ink">
                              {formatNaira(lineTotal)}
                            </div>
                            <div className="text-caption text-success font-medium">
                              {formatNaira(lineTotal / 24)}/mo
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Insurance offered on brand-new devices only. */}
                    {PROTECTION.isEligible(item.product) ? (
                      <div className="bg-canvas p-3.5 rounded-control flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer font-medium text-footnote text-ink">
                          <input
                            type="checkbox"
                            checked={item.protection}
                            onChange={() => onToggleProtection(item.id)}
                            className="w-4 h-4"
                          />
                          <ShieldCheck className="w-4 h-4 text-link" />
                          <span>{PROTECTION.name}</span>
                        </label>
                        <span className="text-footnote font-semibold text-ink-secondary">+{formatNaira(PROTECTION.quote(item.product))}</span>
                      </div>
                    ) : (
                      <div className="bg-canvas p-3.5 rounded-control flex items-center gap-2.5 font-medium text-footnote text-ink-secondary">
                        <ShieldCheck className="w-4 h-4 text-success" />
                        <span>{item.product.preOwned?.warrantyMonths ?? 6}-month TechieBase warranty included</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Trade-In Credit */}
              {tradeInQuote && (
                <div className="bg-success-surface border border-success-border p-4 rounded-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Tag className="w-4 h-4 text-success" />
                    <div>
                      <div className="font-semibold text-footnote text-success">
                        Trade-In: {tradeInQuote.device}
                      </div>
                      <div className="text-caption text-success">
                        Credit applied to order
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-success text-body">
                      -{formatNaira(tradeInQuote.value)}
                    </span>
                    <button
                      onClick={onRemoveTradeIn}
                      className="text-footnote text-ink-tertiary hover:text-critical underline"
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
          <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-hairline-soft bg-canvas space-y-4">
            <div className="space-y-2 text-footnote text-ink-secondary">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatNaira(rawSubtotal)}</span>
              </div>

              {tradeInCredit > 0 && (
                <div className="flex justify-between text-success font-medium">
                  <span>Trade-In Discount</span>
                  <span>-{formatNaira(tradeInCredit)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-success font-semibold">
                  {shipping === 0 ? 'FREE' : formatNaira(shipping)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>VAT (7.5%)</span>
                <span>{formatNaira(estimatedTax)}</span>
              </div>

              <div className="flex justify-between font-semibold text-body text-ink pt-3 border-t border-hairline-soft">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>
            </div>

            {/* Payment reassurance */}
            <div className="bg-ink text-white p-3.5 rounded-control text-footnote flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-link" />
                <span>Secure card, transfer, or installment payment</span>
              </div>
              <ShieldCheck className="h-4 w-4 text-success-bright" />
            </div>

            {/* Checkout CTA */}
            <button
              onClick={onOpenCheckout}
              className="w-full bg-accent hover:bg-accent-hover active:scale-[0.98] active:opacity-80 text-white font-semibold text-body h-11 min-h-[44px] rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
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
