import React from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard, Sparkles, Phone, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F5F7] border-t border-[#E5E5E7] text-[#1D1D1F] text-xs mt-16 pt-10 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Trust Value Props Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-[#E5E5E7]">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-white rounded-2xl shadow-xs text-[#0066CC]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1D1D1F]">Free 2-Day Shipping</h4>
              <p className="text-gray-500 mt-0.5">On all orders over $50 or free store pickup today.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-white rounded-2xl shadow-xs text-[#0066CC]">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1D1D1F]">Free & Easy Returns</h4>
              <p className="text-gray-500 mt-0.5">14-day hassle-free returns with prepaid shipping box.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-white rounded-2xl shadow-xs text-[#0066CC]">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1D1D1F]">Apple Card Monthly</h4>
              <p className="text-gray-500 mt-0.5">Pay 0% APR over 24 months + 3% Daily Cash back.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-white rounded-2xl shadow-xs text-[#0066CC]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1D1D1F]">AppleCare Protection</h4>
              <p className="text-gray-500 mt-0.5">Unlimited accidental damage repair and 24/7 tech support.</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-10 border-b border-[#E5E5E7]">
          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-3 uppercase tracking-wider text-[11px]">Shop & Learn</h5>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC]">iPhone 16 Pro</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">MacBook Air M3</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">iPad Pro M4</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Apple Watch Ultra 2</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">AirPods Pro 2</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-3 uppercase tracking-wider text-[11px]">Account & Bag</h5>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC]">Manage Your Apple ID</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Apple Store Account</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Order Status & Tracking</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Shopping Bag & Saved Items</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-3 uppercase tracking-wider text-[11px]">Special Offers</h5>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC]">Apple Trade-In Program</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Education Discount Store</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Certified Refurbished</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Apple Card Financing</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-3 uppercase tracking-wider text-[11px]">Apple Store</h5>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC]">Find an Apple Store</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Genius Bar Reservation</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Today at Apple Sessions</a></li>
              <li><a href="#" className="hover:text-[#0066CC]">Apple Camp & Events</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-3 uppercase tracking-wider text-[11px]">Need Buying Help?</h5>
            <p className="text-gray-500 mb-2">Speak to an Apple Specialist in real time.</p>
            <div className="space-y-2">
              <a href="#" className="inline-flex items-center gap-1.5 font-bold text-[#0066CC] hover:underline">
                <Phone className="w-3.5 h-3.5" /> 1-800-MY-APPLE
              </a>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>256-bit Encrypted Express Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Copyright */}
        <div className="pt-6 text-gray-400 text-[11px] flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved. Direct Response E-Commerce Storefront.
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Sale</a>
            <a href="#" className="hover:underline">Sales Policy</a>
            <a href="#" className="hover:underline">Legal Notices</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
