import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, MapPin, CreditCard, Apple, ArrowRight, Package, Sparkles } from 'lucide-react';
import { CartItem, StoreLocation, TradeInQuote } from '../types';
import { formatNaira } from '../utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  tradeInQuote: TradeInQuote | null;
  currentStore: StoreLocation;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  tradeInQuote,
  currentStore,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'apple_card' | 'credit_card'>('apple_pay');
  const [orderId, setOrderId] = useState('');

  const [address, setAddress] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    street: '767 Fifth Avenue',
    city: 'New York',
    state: 'NY',
    zip: '10153',
  });

  const rawSubtotal = cart.reduce((sum, item) => {
    const base = item.product.price + (item.selectedStorage?.priceDelta || 0);
    const appleCare = item.appleCare ? 199 : 0;
    return sum + (base + appleCare) * item.quantity;
  }, 0);

  const tradeInCredit = tradeInQuote ? tradeInQuote.value : 0;
  const netSubtotal = Math.max(0, rawSubtotal - tradeInCredit);
  const tax = Math.round(netSubtotal * 0.0875);
  const total = netSubtotal + tax;

  const handlePlaceOrder = () => {
    const generatedId = 'W' + Math.floor(100000000 + Math.random() * 900000000);
    setOrderId(generatedId);
    setStep('confirmation');
    onClearCart();
  };

  const inputClasses = "bg-white p-3 rounded-xl border border-gray-200 font-medium text-[14px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 focus:border-[#0066CC]/40 transition-all";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="relative bg-[#F5F5F7] rounded-t-[28px] md:rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5E5E7] overflow-y-auto animate-slide-in-up md:animate-scale-in max-h-[90vh] md:max-h-[90vh] my-0 md:my-8 p-6 md:p-8">
        
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto -mt-2 mb-4 md:hidden" />
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step !== 'confirmation' && (
          <div className="space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0066CC] mb-2">
                <ShieldCheck className="w-4 h-4" />
                Secure Express Checkout
              </div>
              <h2 className="text-2xl font-bold text-[#1D1D1F]">
                {step === 'details' ? 'Fulfillment & Address' : 'Payment & Review'}
              </h2>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between text-[14px] font-semibold border-b border-gray-200 pb-4">
              <span className={step === 'details' ? 'text-[#0066CC]' : 'text-gray-400'}>
                1. Delivery
              </span>
              <span className="text-gray-300">→</span>
              <span className={step === 'payment' ? 'text-[#0066CC]' : 'text-gray-400'}>
                2. Payment
              </span>
            </div>

            {step === 'details' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[14px] font-semibold text-[#1D1D1F] mb-3">
                    How would you like your order?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFulfillment('delivery')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        fulfillment === 'delivery'
                          ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-[14px] text-[#1D1D1F] mb-1">
                        <span className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#0066CC]" />
                          Free Shipping
                        </span>
                        {fulfillment === 'delivery' && <CheckCircle2 className="w-4 h-4 text-[#0066CC]" />}
                      </div>
                      <div className="text-[13px] text-gray-500">2 business days</div>
                    </button>

                    <button
                      onClick={() => setFulfillment('pickup')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        fulfillment === 'pickup'
                          ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-[14px] text-[#1D1D1F] mb-1">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#0066CC]" />
                          Store Pickup
                        </span>
                        {fulfillment === 'pickup' && <CheckCircle2 className="w-4 h-4 text-[#0066CC]" />}
                      </div>
                      <div className="text-[13px] text-emerald-600 font-semibold">
                        Ready Today
                      </div>
                    </button>
                  </div>
                </div>

                {fulfillment === 'delivery' ? (
                  <div className="space-y-3 bg-[#F5F5F7] p-5 rounded-2xl border border-gray-200">
                    <h4 className="font-semibold text-[15px] text-[#1D1D1F]">Shipping Address</h4>
                    <div className="grid grid-cols-2 gap-3">
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
                    <div className="grid grid-cols-3 gap-3">
                      <input type="text" placeholder="City" value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className={inputClasses} />
                      <input type="text" placeholder="State" value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className={inputClasses} />
                      <input type="text" placeholder="ZIP" value={address.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        className={inputClasses} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
                    <div className="font-semibold text-[15px] text-emerald-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      {currentStore.name}
                    </div>
                    <div className="text-[14px] text-emerald-700">{currentStore.address}</div>
                    <div className="text-[13px] text-emerald-600 pt-1 font-medium">
                      Bring photo ID and order barcode. Items reserved 7 days.
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep('payment')}
                  className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-semibold text-[15px] py-3.5 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[14px] font-semibold text-[#1D1D1F] mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        paymentMethod === 'apple_pay'
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 bg-gray-50 text-[#1D1D1F]'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-[14px]">
                        <Apple className="w-5 h-5" />
                        Apple Pay
                      </div>
                      <span className="text-[13px] opacity-80">Fastest</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('apple_card')}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        paymentMethod === 'apple_card'
                          ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                          : 'border-gray-200 bg-gray-50 text-[#1D1D1F]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-[14px]">Apple Card Installments</div>
                        <div className="text-[13px] text-emerald-700 font-medium">
                          0% APR · 3% Daily Cash
                        </div>
                      </div>
                      <span className="font-semibold text-[14px]">{formatNaira(total / 24)}/mo</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        paymentMethod === 'credit_card'
                          ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                          : 'border-gray-200 bg-gray-50 text-[#1D1D1F]'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-semibold text-[14px]">
                        <CreditCard className="w-4 h-4 text-[#0066CC]" />
                        Credit / Debit Card
                      </div>
                      <span className="text-[13px] text-gray-500">Visa, MC, Amex</span>
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-[#F5F5F7] p-5 rounded-2xl space-y-2 border border-gray-200">
                  <h4 className="font-semibold text-[15px] text-[#1D1D1F] mb-1">Order Summary</h4>
                  <div className="flex justify-between text-[14px] text-gray-600">
                    <span>Items</span><span>{formatNaira(rawSubtotal)}</span>
                  </div>
                  {tradeInCredit > 0 && (
                    <div className="flex justify-between text-[14px] text-emerald-600 font-medium">
                      <span>Trade-In Credit</span><span>-{formatNaira(tradeInCredit)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[14px] text-gray-600">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-gray-600">
                    <span>Tax</span><span>{formatNaira(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[17px] text-[#1D1D1F] pt-3 border-t border-gray-300">
                    <span>Total</span><span>{formatNaira(total)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('details')}
                    className="w-1/3 py-3.5 border border-gray-200 rounded-full font-semibold text-[14px] hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-2/3 bg-black hover:bg-gray-900 text-white font-semibold text-[15px] py-3.5 rounded-full transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <Apple className="w-5 h-5 fill-current" />
                    Place Order — {formatNaira(total)}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'confirmation' && (
          <div className="text-center py-8 space-y-5">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <p className="text-[13px] font-semibold text-emerald-600 uppercase tracking-wide">
                Order Confirmed
              </p>
              <h2 className="text-3xl font-bold text-[#1D1D1F] mt-2">
                Thank You!
              </h2>
              <p className="text-[15px] text-gray-500 mt-2">
                Order <span className="font-mono font-bold text-[#1D1D1F]">{orderId}</span>
              </p>
            </div>

            <div className="bg-[#F5F5F7] p-5 rounded-2xl max-w-md mx-auto text-left space-y-3 border border-gray-200">
              <div className="flex items-center gap-2 font-semibold text-[15px] text-[#1D1D1F]">
                <Package className="w-4 h-4 text-[#0066CC]" />
                Processing at Apple Fulfillment
              </div>
              <p className="text-[14px] text-gray-600">
                Confirmation email sent to{' '}
                <span className="font-semibold text-[#1D1D1F]">{address.email}</span>
              </p>
              <div className="pt-2 border-t border-gray-200 text-[13px] text-emerald-700 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                3% Daily Cash credited to Apple Wallet
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-[#0066CC] hover:bg-[#0055B3] text-white font-semibold text-[14px] px-10 py-3.5 rounded-full shadow-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
