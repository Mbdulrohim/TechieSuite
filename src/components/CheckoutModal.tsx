import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, MapPin, CreditCard, ArrowRight, Package, MessageCircle, Landmark } from 'lucide-react';
import { CartItem, StoreLocation, TradeInQuote } from '../types';
import { configuredUnitPrice, formatNaira } from '../utils';
import { monthlyInstalment } from '../data/financing';
import { PROTECTION, protectionPrice } from '../data/protection';

interface CheckoutModalProps {
  storeName: string;
  supportWhatsApp: string;
  allowPickup?: boolean;
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  tradeInQuote: TradeInQuote | null;
  currentStore: StoreLocation;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  storeName,
  supportWhatsApp,
  allowPickup = true,
  isOpen,
  onClose,
  cart,
  tradeInQuote,
  currentStore,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'installment' | 'credit_card'>('credit_card');

  const [address, setAddress] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const rawSubtotal = cart.reduce((sum, item) => {
    const base = configuredUnitPrice(item);
    const protection = protectionPrice(item.product, item.protection);
    return sum + (base + protection) * item.quantity;
  }, 0);

  const tradeInCredit = tradeInQuote ? tradeInQuote.value : 0;
  const netSubtotal = Math.max(0, rawSubtotal - tradeInCredit);
  const shipping = netSubtotal >= 50 ? 0 : 10;
  const tax = Math.round(netSubtotal * 0.075);
  const total = netSubtotal + tax + shipping;

  const handlePlaceOrder = () => {
    const lines = cart.map((item) => `${item.quantity}× ${item.product.name}`).join('\n');
    const message = [
      `Hello ${storeName}, I would like to complete this order:`, lines,
      `Fulfilment: ${fulfillment}`, `Preferred payment: ${paymentMethod}`,
      `Customer: ${address.name || 'Not supplied'}`, `Email: ${address.email || 'Not supplied'}`,
      `Displayed total: ${formatNaira(total)}`,
    ].join('\n');
    if (supportWhatsApp) {
      window.open(`https://wa.me/${supportWhatsApp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    }
    setStep('confirmation');
  };

  const handleClose = () => {
    setStep('details');
    setFulfillment('delivery');
    setPaymentMethod('credit_card');
    onClose();
  };

  const inputClasses = "bg-white px-3.5 h-11 rounded-control border border-hairline-soft font-medium text-body md:text-footnote text-ink focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-panel max-w-2xl w-full shadow-2xl border border-hairline-soft p-6 md:p-10 overflow-hidden animate-scale-in my-auto pb-[calc(2rem+env(safe-area-inset-bottom))]">

        <button
          onClick={handleClose}
          aria-label="Close checkout"
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-canvas hover:bg-hairline-soft text-ink-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step !== 'confirmation' && (
          <div className="space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 text-footnote font-semibold text-link mb-2">
                <ShieldCheck className="w-4 h-4" />
                Order request
              </div>
              <h2 className="text-title-sm font-semibold text-ink">
                {step === 'details' ? 'Fulfillment & Address' : 'Payment & Review'}
              </h2>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between text-footnote font-semibold border-b border-hairline-soft pb-4">
              <span className={step === 'details' ? 'text-link' : 'text-ink-tertiary'}>
                1. Delivery
              </span>
              <span className="text-ink-tertiary">→</span>
              <span className={step === 'payment' ? 'text-link' : 'text-ink-tertiary'}>
                2. Payment
              </span>
            </div>

            {step === 'details' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-footnote font-semibold text-ink mb-3">
                    How would you like your order?
                  </label>
                  <div className={`grid gap-3 ${allowPickup ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {allowPickup && <button
                      onClick={() => setFulfillment('delivery')}
                      className={`p-4 rounded-card border text-left transition-all ${fulfillment === 'delivery'
                          ? 'border-accent bg-accent-surface/50 ring-1 ring-accent'
                          : 'border-hairline-soft hover:border-hairline'
                        }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-footnote text-ink mb-1">
                        <span className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-link" />
                          Free Shipping
                        </span>
                        {fulfillment === 'delivery' && <CheckCircle2 className="w-4 h-4 text-link" />}
                      </div>
                      <div className="text-footnote text-ink-secondary">2 business days</div>
                    </button>}

                    <button
                      onClick={() => setFulfillment('pickup')}
                      className={`p-4 rounded-card border text-left transition-all ${fulfillment === 'pickup'
                          ? 'border-accent bg-accent-surface/50 ring-1 ring-accent'
                          : 'border-hairline-soft hover:border-hairline'
                        }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-footnote text-ink mb-1">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-link" />
                          Store Pickup
                        </span>
                        {fulfillment === 'pickup' && <CheckCircle2 className="w-4 h-4 text-link" />}
                      </div>
                      <div className="text-footnote text-success font-semibold">
                        Ready Today
                      </div>
                    </button>
                  </div>
                </div>

                {fulfillment === 'delivery' ? (
                  <div className="space-y-3 bg-canvas p-5 rounded-card border border-hairline-soft">
                    <h4 className="font-semibold text-body text-ink">Shipping Address</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="Full Name" value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        className={inputClasses} />
                      <input type="email" placeholder="Email" value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className={inputClasses} />
                    </div>
                    <input type="text" placeholder="Street Address" value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className={`w-full ${inputClasses}`} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input type="text" placeholder="City" value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className={inputClasses} />
                      <input type="text" placeholder="State" value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className={inputClasses} />
                      <input type="text" placeholder="Postal code" value={address.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        className={inputClasses} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-success-surface border border-success-border p-5 rounded-card space-y-2">
                    <div className="font-semibold text-body text-success flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-success" />
                      {currentStore.name}
                    </div>
                    <div className="text-footnote text-success">{currentStore.address}</div>
                    <div className="text-footnote text-success pt-1 font-medium">
                      Bring photo ID and order barcode. Items reserved 7 days.
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep('payment')}
                  className="w-full bg-accent hover:bg-accent-hover active:scale-[0.98] active:opacity-80 text-white font-semibold text-body h-11 min-h-[44px] rounded-full transition-all flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-footnote font-semibold text-ink mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`w-full p-4 rounded-card border text-left flex items-center justify-between transition-all ${paymentMethod === 'bank_transfer'
                          ? 'border-black bg-black text-white'
                          : 'border-hairline-soft bg-canvas text-ink'
                        }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-footnote">
                        <Landmark className="w-5 h-5" />
                        Bank Transfer
                      </div>
                      <span className="text-footnote opacity-80">Confirm with our team</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('installment')}
                      className={`w-full p-4 rounded-card border text-left flex items-center justify-between transition-all ${paymentMethod === 'installment'
                          ? 'border-accent bg-accent-surface/50 ring-1 ring-accent'
                          : 'border-hairline-soft bg-canvas text-ink'
                        }`}
                    >
                      <div>
                        <div className="font-semibold text-footnote">Flexible Installments</div>
                        <div className="text-footnote text-success font-medium">
                          Subject to provider approval
                        </div>
                      </div>
                      <span className="font-semibold text-footnote">{formatNaira(monthlyInstalment(total, 24))}/mo</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`w-full p-4 rounded-card border text-left flex items-center justify-between transition-all ${paymentMethod === 'credit_card'
                          ? 'border-accent bg-accent-surface/50 ring-1 ring-accent'
                          : 'border-hairline-soft bg-canvas text-ink'
                        }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-footnote">
                        <CreditCard className="w-4 h-4 text-link" />
                        Credit / Debit Card
                      </div>
                      <span className="text-footnote text-ink-secondary">Visa, Mastercard, Verve</span>
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-canvas p-5 rounded-card space-y-2 border border-hairline-soft">
                  <h4 className="font-semibold text-body text-ink mb-1">Order Summary</h4>
                  <div className="flex justify-between text-footnote text-ink-secondary">
                    <span>Items</span><span>{formatNaira(rawSubtotal)}</span>
                  </div>
                  {tradeInCredit > 0 && (
                    <div className="flex justify-between text-footnote text-success font-medium">
                      <span>Trade-In Credit</span><span>-{formatNaira(tradeInCredit)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-footnote text-ink-secondary">
                    <span>Shipping</span>
                    <span className="text-success font-semibold">{shipping === 0 ? 'FREE' : formatNaira(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-footnote text-ink-secondary">
                    <span>VAT (7.5%)</span><span>{formatNaira(tax)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-body text-ink pt-3 border-t border-hairline">
                    <span>Total</span><span>{formatNaira(total)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('details')}
                    className="w-1/3 h-11 min-h-[44px] border border-hairline-soft rounded-full font-semibold text-footnote hover:bg-canvas active:opacity-80 transition-all flex items-center justify-center"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-2/3 bg-black hover:bg-ink active:scale-[0.98] active:opacity-80 text-white font-semibold text-body h-11 min-h-[44px] rounded-full transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Continue on WhatsApp — {formatNaira(total)}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'confirmation' && (
          <div className="text-center py-8 space-y-5">
            <div className="w-20 h-20 bg-success-surface text-success rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <p className="eyebrow text-success">
                Request opened in WhatsApp
              </p>
              <h2 className="text-title font-semibold text-ink mt-2">
                Complete it with our team
              </h2>
              <p className="text-body text-ink-secondary mt-2">No payment has been taken yet.</p>
            </div>

            <div className="bg-canvas p-5 rounded-card max-w-md mx-auto text-left space-y-3 border border-hairline-soft">
              <div className="flex items-center gap-2 font-semibold text-body text-ink">
                <Package className="w-4 h-4 text-link" />
                Processing at TechieBase
              </div>
              <p className="text-footnote text-ink-secondary">
                Review availability, delivery and payment with our team before paying.
              </p>
              <div className="pt-2 border-t border-hairline-soft text-footnote text-success font-semibold flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                Your bag stays here until the order is agreed
              </div>
            </div>

            <button
              onClick={handleClose}
              className="bg-accent hover:bg-accent-hover text-white font-semibold text-footnote px-10 py-3.5 rounded-full shadow-lg transition-colors"
            >
              Back to shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
