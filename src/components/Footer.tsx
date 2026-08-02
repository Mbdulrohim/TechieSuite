import React from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard, Phone, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F5F7] border-t border-[#E5E5E7] text-[#1D1D1F] mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Trust Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-14 border-b border-[#E5E5E7]">
          {[
            {
              icon: Truck,
              title: 'Free 2-Day Shipping',
              desc: 'On all orders over $50 or free store pickup.',
            },
            {
              icon: RotateCcw,
              title: 'Free & Easy Returns',
              desc: '14-day hassle-free returns with prepaid kit.',
            },
            {
              icon: CreditCard,
              title: 'Apple Card Monthly',
              desc: '0% APR for 24 months + 3% Daily Cash back.',
            },
            {
              icon: ShieldCheck,
              title: 'AppleCare Protection',
              desc: 'Unlimited repair and 24/7 tech support.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-[#0066CC] shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[15px] text-[#1D1D1F]">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 py-14 border-b border-[#E5E5E7]">
          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-4 text-[13px] uppercase tracking-wider">
              Shop & Learn
            </h5>
            <ul className="space-y-2.5 text-[14px] text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">iPhone 16 Pro</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">MacBook Air M3</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">iPad Pro M4</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Apple Watch Ultra 2</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">AirPods Pro 2</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-4 text-[13px] uppercase tracking-wider">
              Account & Bag
            </h5>
            <ul className="space-y-2.5 text-[14px] text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Manage Apple ID</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Apple Store Account</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Saved Items</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-4 text-[13px] uppercase tracking-wider">
              Special Offers
            </h5>
            <ul className="space-y-2.5 text-[14px] text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Apple Trade-In</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Education Store</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Certified Refurbished</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Apple Card Financing</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-4 text-[13px] uppercase tracking-wider">
              Apple Store
            </h5>
            <ul className="space-y-2.5 text-[14px] text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Find a Store</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Genius Bar</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Today at Apple</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Events</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-4 text-[13px] uppercase tracking-wider">
              Need Help?
            </h5>
            <p className="text-[14px] text-gray-500 mb-3 leading-relaxed">
              Speak to an Apple Specialist.
            </p>
            <div className="space-y-3">
              <a href="#" className="inline-flex items-center gap-2 font-semibold text-[14px] text-[#0066CC] hover:underline">
                <Phone className="w-4 h-4" /> 1-800-MY-APPLE
              </a>
              <div className="text-[13px] text-emerald-600 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                256-bit Encrypted Checkout
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-8 text-gray-400 text-[13px] flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Terms of Sale</a>
            <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
