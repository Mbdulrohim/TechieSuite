import React from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { formatNaira } from '../utils';

interface FooterProps {
  onOpenCookieModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCookieModal }) => {
  return (
    <footer className="bg-canvas border-t border-hairline-soft text-ink mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Trust Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-hairline-soft">
          {[
            {
              icon: Truck,
              title: 'Free Express Shipping',
              desc: `On all orders over ${formatNaira(50)} or free store pickup.`,
            },
            {
              icon: RotateCcw,
              title: 'Free & Easy Returns',
              desc: '14-day hassle-free returns with prepaid kit.',
            },
            {
              icon: CreditCard,
              title: 'Flexible Financing',
              desc: 'Pay securely by card, transfer, or flexible installments.',
            },
            {
              icon: ShieldCheck,
              title: 'TechieBase Warranty',
              desc: 'Full repair coverage and 24/7 specialist support.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-card shadow-sm text-link shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-body text-ink">
                    {item.title}
                  </h4>
                  <p className="text-footnote text-ink-secondary mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Column Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-14 border-b border-hairline-soft">

          {/* Column 1: Brand Logo & Tagline */}
          <div className="flex flex-col items-start space-y-3">
            <svg className="w-14 h-16 shrink-0" viewBox="0 0 247 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M170.06 0.543366C211.433 -3.50614 236.19 15.0004 225.777 58.7006C219.822 83.6759 197.521 97.0917 177.019 109.248C202.895 128.074 240.615 133.768 245.737 174.945C253.304 228.401 158.951 268.373 130.476 220.383C109.715 185.398 107.262 130.7 104.03 90.9305C110.203 87.7638 117.471 84.5483 123.813 81.5593C132.049 77.8651 137.511 75.9054 146.175 73.3062C146.449 79.2815 146.175 83.1095 145.731 89.116C163.371 73.5985 182.968 56.9004 200.005 40.9441C191.923 40.0734 182.612 38.3982 174.453 37.2143L123.188 29.5633C129.077 35.8709 132.236 39.4949 136.853 46.7363C133.256 48.009 129.198 49.3672 125.524 50.3789C81.6609 62.4589 43.0633 89.6682 1.77713 107.681C0.905266 97.5528 -0.234185 82.0687 0.0421786 72.0297C4.47551 66.5018 15.1687 58.6589 20.9833 54.4602C61.8768 24.9276 119.449 3.86687 170.06 0.543366Z" fill="url(#footer_logo_gradient_clean)" />
              <path d="M69.3843 104.332C70.2243 104.237 69.8076 104.242 70.7452 104.75C72.3815 109.08 72.4012 117.39 72.8251 122.091C77.3736 172.495 84.2936 229.866 123.539 266.163C127.668 269.987 135.597 273.825 140.598 277.026C124.493 283.182 101.35 277.767 85.9162 271.323C79.9453 268.545 74.2502 265.211 68.9061 261.362C38.4491 239.421 20.2864 200.135 11.2739 164.666C8.90839 155.356 7.37249 145.404 5.82617 135.893C18.9249 126.569 53.7972 110.883 69.3843 104.332Z" fill="#033B66" />
              <defs>
                <linearGradient id="footer_logo_gradient_clean" x1="184" y1="36.5" x2="18" y2="180.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F47B09" />
                  <stop offset="1" stopColor="#FBAC09" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex flex-col items-start gap-0.5">
              <h3 className="font-quicksand text-title-sm text-brand-deep">
                Techie<span className="text-brand">Base</span>
              </h3>
              <p className="font-quicksand text-caption md:text-footnote text-ink">
                Technology &amp; You
              </p>
            </div>

            {/* 4 Social Icons placed directly under TechieBase logo on the left */}
            <div className="flex items-center gap-4 text-ink-secondary pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-link hover:scale-110 transition-all" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-link hover:scale-110 transition-all" title="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-link hover:scale-110 transition-all" title="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-link hover:scale-110 transition-all" title="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Account & Orders */}
          <div>
            <h5 className="eyebrow text-ink mb-4">
              Account &amp; Bag
            </h5>
            <ul className="space-y-2.5 text-footnote text-ink-secondary">
              <li><a href="#" className="hover:text-link transition-colors">Manage TechieBase ID</a></li>
              <li><a href="#" className="hover:text-link transition-colors">TechieBase Account</a></li>
              <li><a href="#" className="hover:text-link transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-link transition-colors">Saved Items</a></li>
            </ul>
          </div>

          {/* Column 3: TechieBase Store */}
          <div>
            <h5 className="eyebrow text-ink mb-4">
              TechieBase Store
            </h5>
            <ul className="space-y-2.5 text-footnote text-ink-secondary">
              <li><a href="#" className="hover:text-link transition-colors">Find a Store</a></li>
              <li><a href="#" className="hover:text-link transition-colors">Genius Bar</a></li>
              <li><a href="#" className="hover:text-link transition-colors">Today at TechieBase</a></li>
              <li><a href="#" className="hover:text-link transition-colors">Trade-In &amp; Offers</a></li>
            </ul>
          </div>

          {/* Column 4: Location & Contact (Aligned Stack Height) */}
          <div className="space-y-3">
            <h5 className="eyebrow text-ink mb-4">
              Location &amp; Contact
            </h5>

            {/* Clickable Location with MapPin Icon before Address */}
            <a
              href="https://maps.google.com/?q=Taiyelolu+Tower+2A+Olaide+Tomori+St+Ikeja+Lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-footnote text-ink-secondary hover:text-link transition-colors group"
              title="Open location in Google Maps"
            >
              <MapPin className="w-4 h-4 text-link shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span>1st Floor, Taiyelolu Tower, 2A Olaide Tomori St, off Medical Road, Ikeja, 101233, Lagos</span>
            </a>

            {/* Single Phone Number (No Repetition) */}
            <div className="pt-1">
              <a href="tel:08143270982" className="inline-flex items-center gap-2 text-footnote font-semibold text-link hover:underline">
                <Phone className="w-4 h-4" />
                0814 327 0982
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="py-8 text-ink-tertiary text-footnote flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            Copyright © {new Date().getFullYear()} TechieBase Inc. All rights reserved.
          </div>
          <div className="flex gap-6 items-center flex-wrap">
            <a href="#" className="hover:underline hover:text-ink-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:underline hover:text-ink-secondary transition-colors">Terms of Sale</a>
            <a href="#" className="hover:underline hover:text-ink-secondary transition-colors">Legal</a>
            {onOpenCookieModal && (
              <button
                type="button"
                onClick={onOpenCookieModal}
                className="hover:underline hover:text-accent transition-colors font-medium text-ink-secondary"
              >
                Cookie Settings
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
