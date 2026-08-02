import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, MapPin, CreditCard, Apple, ArrowRight, Package, Sparkles } from 'lucide-react';
import { CartItem, StoreLocation, TradeInQuote } from '../types';

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

  // Address form
  const [address, setAddress] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    street: '767 Fifth Avenue',
    city: 'New York',
    state: 'NY',
    zip: '10153'
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5E5E7] p-6 md:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1 & 2: Details & Payment */}
        {step !== 'confirmation' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                Apple Store Direct Express Checkout
              </div>
              <h2 className="text-2xl font-extrabold text-[#1D1D1F]">
                {step === 'details' ? 'Fulfillment & Address' : 'Payment & Review'}
              </h2>
            </div>

            {/* Steps Progress */}
            <div className="flex items-center justify-between text-xs font-bold border-b border-gray-200 pb-3">
              <span className={step === 'details' ? 'text-[#0066CC]' : 'text-gray-400'}>
                1. Delivery & Pickup
              </span>
              <span className="text-gray-300">➔</span>
              <span className={step === 'payment' ? 'text-[#0066CC]' : 'text-gray-400'}>
                2. Payment Method
              </span>
            </div>

            {step === 'details' && (
              <div className="space-y-4 text-xs">
                {/* Fulfillment Options */}
                <div>
                  <label className="block font-bold text-[#1D1D1F] mb-2 uppercase tracking-wider text-[11px]">
                    Choose How You Want Your Order:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFulfillment('delivery')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        fulfillment === 'delivery'
                          ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[#1D1D1F] mb-1">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-[#0066CC]" />
                          Free 2-Day Shipping
                        </span>
                        {fulfillment === 'delivery' && <CheckCircle2 className="w-4 h-4 text-[#0066CC]" />}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Delivers to your doorstep in 2 business days.
                      </div>
                    </button>

                    <button
                      onClick={() => setFulfillment('pickup')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        fulfillment === 'pickup'
                          ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[#1D1D1F] mb-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#0066CC]" />
                          Apple Store Pickup
                        </span>
                        {fulfillment === 'pickup' && <CheckCircle2 className="w-4 h-4 text-[#0066CC]" />}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold">
                        Ready Today at {currentStore.name}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Shipping Address Inputs */}
                {fulfillment === 'delivery' ? (
                  <div className="space-y-3 bg-[#F5F5F7] p-4 rounded-2xl border border-gray-200">
                    <h4 className="font-bold text-[#1D1D1F]">Shipping Address</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        className="bg-white p-2.5 rounded-xl border border-gray-300 font-medium"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="bg-white p-2.5 rounded-xl border border-gray-300 font-medium"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full bg-white p-2.5 rounded-xl border border-gray-300 font-medium"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="bg-white p-2.5 rounded-xl border border-gray-300 font-medium"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="bg-white p-2.5 rounded-xl border border-gray-300 font-medium"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={address.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        className="bg-white p-2.5 rounded-xl border border-gray-300 font-medium"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs space-y-1">
                    <div className="font-bold text-emerald-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Pickup Location: {currentStore.name}
                    </div>
                    <div className="text-emerald-700">{currentStore.address}</div>
                    <div className="text-[11px] text-emerald-600 pt-1 font-medium">
                      Bring a photo ID and your order barcode. Items reserved for 7 days.
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep('payment')}
                  className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-4 text-xs">
                {/* Payment Selection */}
                <div>
                  <label className="block font-bold text-[#1D1D1F] mb-2 uppercase tracking-wider text-[11px]">
                    Select Payment Method:
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        paymentMethod === 'apple_pay'
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 bg-gray-50 text-[#1D1D1F]'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold">
                        <Apple className="w-5 h-5" />
                        <span>Apple Pay (Instant 1-Touch)</span>
                      </div>
                      <span className="text-[11px] opacity-80">Fastest</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('apple_card')}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        paymentMethod === 'apple_card'
                          ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                          : 'border-gray-200 bg-gray-50 text-[#1D1D1F]'
                      }`}
                    >
                      <div>
                        <div className="font-bold">Apple Card Monthly Installments</div>
                        <div className="text-[11px] text-emerald-700 font-medium">
                          0% APR • Earn 3% Daily Cash (${(total * 0.03).toFixed(2)})
                        </div>
                      </div>
                      <span className="font-bold">${(total / 24).toFixed(2)}/mo</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        paymentMethod === 'credit_card'
                          ? 'border-[#0066CC] bg-blue-50/50 ring-1 ring-[#0066CC]'
                          : 'border-gray-200 bg-gray-50 text-[#1D1D1F]'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold">
                        <CreditCard className="w-4 h-4 text-[#0066CC]" />
                        <span>Credit / Debit Card</span>
                      </div>
                      <span className="text-[11px] text-gray-500">Visa, Mastercard, Amex</span>
                    </button>
                  </div>
                </div>

                {/* Final Order Review Breakdown */}
                <div className="bg-[#F5F5F7] p-4 rounded-2xl space-y-1.5 border border-gray-200">
                  <h4 className="font-bold text-[#1D1D1F]">Order Summary Breakdown</h4>
                  <div className="flex justify-between text-gray-600">
                    <span>Items Total:</span>
                    <span>${rawSubtotal}</span>
                  </div>
                  {tradeInCredit > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Trade-In Credit Deduction:</span>
                      <span>-${tradeInCredit}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Sales Tax:</span>
                    <span>${tax}</span>
                  </div>
                  <div className="flex justify-between font-black text-sm text-[#1D1D1F] pt-2 border-t border-gray-300">
                    <span>Final Amount:</span>
                    <span>${total}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setStep('details')}
                    className="w-1/3 py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-100"
                  >
                    Back
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-2/3 bg-black hover:bg-gray-900 text-white font-bold py-3.5 rounded-full transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <Apple className="w-5 h-5 fill-current" />
                    <span>Place Order — ${total}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 'confirmation' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Order Placed Successfully!
              </div>
              <h2 className="text-2xl font-black text-[#1D1D1F] mt-1">
                Thank You for Shopping at Apple!
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Order Number: <span className="font-mono font-bold text-[#1D1D1F]">{orderId}</span>
              </p>
            </div>

            <div className="bg-[#F5F5F7] p-4 rounded-2xl max-w-md mx-auto text-xs text-left space-y-2 border border-gray-200">
              <div className="flex items-center gap-2 font-bold text-[#1D1D1F]">
                <Package className="w-4 h-4 text-[#0066CC]" />
                Live Status: Processing at Apple Fulfillment Center
              </div>
              <p className="text-gray-600">
                A confirmation email with real-time shipment tracking has been sent to{' '}
                <span className="font-semibold text-[#1D1D1F]">{address.email}</span>.
              </p>
              <div className="pt-2 border-t border-gray-200 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                3% Daily Cash (${(total * 0.03).toFixed(2)}) credited to your Apple Wallet!
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-[#0066CC] hover:bg-[#0055B3] text-white font-bold text-xs px-8 py-3 rounded-full shadow-lg"
            >
              Return to Apple Store Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
