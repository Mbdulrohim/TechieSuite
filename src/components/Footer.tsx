import React from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard, Phone, Lock } from 'lucide-react';
import { formatNaira } from '../utils';

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
              desc: `On all orders over ${formatNaira(50)} or free store pickup.`,
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
          {/* Brand Column (Replaces Shop & Learn) */}
          <div className="flex flex-col items-start space-y-2">
            <svg className="w-12 h-14 shrink-0" viewBox="0 0 247 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M170.06 0.543366C211.433 -3.50614 236.19 15.0004 225.777 58.7006C219.822 83.6759 197.521 97.0917 177.019 109.248C202.895 128.074 240.615 133.768 245.737 174.945C253.304 228.401 158.951 268.373 130.476 220.383C109.715 185.398 107.262 130.7 104.03 90.9305C110.203 87.7638 117.471 84.5483 123.813 81.5593C132.049 77.8651 137.511 75.9054 146.175 73.3062C146.449 79.2815 146.175 83.1095 145.731 89.116C163.371 73.5985 182.968 56.9004 200.005 40.9441C191.923 40.0734 182.612 38.3982 174.453 37.2143L123.188 29.5633C129.077 35.8709 132.236 39.4949 136.853 46.7363C133.256 48.009 129.198 49.3672 125.524 50.3789C81.6609 62.4589 43.0633 89.6682 1.77713 107.681C0.905266 97.5528 -0.234185 82.0687 0.0421786 72.0297C4.47551 66.5018 15.1687 58.6589 20.9833 54.4602C61.8768 24.9276 119.449 3.86687 170.06 0.543366Z" fill="url(#footer_logo_gradient)"/>
              <path d="M69.3843 104.332C70.2243 104.237 69.8076 104.242 70.7452 104.75C72.3815 109.08 72.4012 117.39 72.8251 122.091C77.3736 172.495 84.2936 229.866 123.539 266.163C127.668 269.987 135.597 273.825 140.598 277.026C124.493 283.182 101.35 277.767 85.9162 271.323C79.9453 268.545 74.2502 265.211 68.9061 261.362C38.4491 239.421 20.2864 200.135 11.2739 164.666C8.90839 155.356 7.37249 145.404 5.82617 135.893C18.9249 126.569 53.7972 110.883 69.3843 104.332Z" fill="#033B66"/>
              <defs>
                <linearGradient id="footer_logo_gradient" x1="184" y1="36.5" x2="18" y2="180.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#F47B09"/>
                  <stop offset="1" stop-color="#FBAC09"/>
                </linearGradient>
              </defs>
            </svg>
            
            <div className="flex flex-col items-start gap-0.5">
              <h3 className="font-quicksand font-bold text-2xl text-[#033B66] tracking-[-0.03em] leading-tight">
                TechieBase
              </h3>
              <p className="font-quicksand font-bold text-xs md:text-sm text-[#191919] tracking-[-0.03em]">
                Technology &amp; You
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-4 text-[13px] uppercase tracking-wider">
              Account & Bag
            </h5>
            <ul className="space-y-2.5 text-[14px] text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Manage Techiebase ID</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Techiebase Account</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Saved Items</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-4 text-[13px] uppercase tracking-wider">
              Special Offers
            </h5>
            <ul className="space-y-2.5 text-[14px] text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Techiebase Trade-In</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Education Store</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Certified Refurbished</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Techiebase Card Financing</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-4 text-[13px] uppercase tracking-wider">
              Techiebase Store
            </h5>
            <ul className="space-y-2.5 text-[14px] text-gray-600">
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Find a Store</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Genius Bar</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Today at Techiebase</a></li>
              <li><a href="#" className="hover:text-[#0066CC] transition-colors">Events</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1D1D1F] mb-4 text-[13px] uppercase tracking-wider">
              Need Help?
            </h5>
            <p className="text-[14px] text-gray-500 mb-3 leading-relaxed">
              Speak to a Techiebase Specialist.
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
            Copyright © {new Date().getFullYear()} Techiebase Inc. All rights reserved.
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
