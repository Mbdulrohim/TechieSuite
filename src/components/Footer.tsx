import React from 'react';
import { formatNaira } from '../utils';

/** Directory columns. Plain text links only — no icons, no chips. The footer is
 *  a reference index, so it is set at caption size and stays monochrome; the
 *  page above it does the selling. */
const DIRECTORY: {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    heading: 'Account & Bag',
    links: [
      { label: 'Manage TechieBase ID', href: '#' },
      { label: 'TechieBase Account', href: '#' },
      { label: 'Order Status', href: '#' },
      { label: 'Saved Items', href: '#' },
    ],
  },
  {
    heading: 'TechieBase Store',
    links: [
      { label: 'Find a Store', href: '#' },
      // Renamed from "Genius Bar" — that is Apple's trademarked in-store
      // service. TechieBase runs its own repair counter and says so.
      { label: 'Repairs & Support', href: '#' },
      // Renamed from "Today at TechieBase", which echoed Apple's
      // "Today at Apple" sessions programme.
      { label: 'Workshops & Events', href: '#' },
      { label: 'Trade-In & Offers', href: '#' },
    ],
  },
  {
    heading: 'Visit Us',
    links: [
      {
        label: '1st Floor, Taiyelolu Tower, 2A Olaide Tomori St, off Medical Road, Ikeja, 101233, Lagos',
        href: 'https://maps.google.com/?q=Taiyelolu+Tower+2A+Olaide+Tomori+St+Ikeja+Lagos',
        external: true,
      },
      { label: '0814 327 0982', href: 'tel:08143270982' },
    ],
  },
  {
    heading: 'Follow TechieBase',
    links: [
      { label: 'Instagram', href: 'https://instagram.com', external: true },
      { label: 'Twitter', href: 'https://twitter.com', external: true },
      { label: 'Facebook', href: 'https://facebook.com', external: true },
      { label: 'YouTube', href: 'https://youtube.com', external: true },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Sale', href: '#' },
  { label: 'Legal', href: '#' },
];

const linkClass = 'hover:text-ink hover:underline transition-colors';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-hairline-soft bg-canvas text-ink">
      <div className="mx-auto max-w-7xl px-6">

        {/* Small print. Everything the old trust bar promised, minus the icons
            and the headline type — service terms belong in footnotes. */}
        <div className="space-y-2 border-b border-hairline-soft py-8 text-caption text-ink-tertiary">
          <p>
            TechieBase is an independent retailer. We are not an authorised service provider for,
            and are not affiliated with or endorsed by, Apple Inc., Samsung or any other
            manufacturer whose products appear on this site. All product names, logos and brands
            are the property of their respective owners.
          </p>
          <p>
            Free express shipping on all orders over {formatNaira(50)}, or free pickup from a
            TechieBase store.
          </p>
          <p>Free and easy returns: 14 days, hassle-free, with a prepaid return kit.</p>
          <p>Flexible financing: pay securely by card, bank transfer or in instalments.</p>
          <p>
            TechieBase Warranty: full repair coverage and 24/7 specialist support, provided by
            TechieBase.
          </p>
        </div>

        {/* Directory */}
        <nav
          aria-label="TechieBase directory"
          className="grid grid-cols-1 gap-8 border-b border-hairline-soft py-8 sm:grid-cols-2 md:grid-cols-4"
        >
          {DIRECTORY.map((column) => (
            <div key={column.heading}>
              <h3 className="text-caption font-semibold text-ink">{column.heading}</h3>
              <ul className="mt-3 space-y-2.5 text-caption text-ink-secondary">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={linkClass}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-8 text-caption text-ink-tertiary md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {/* Kept, but shrunk to caption scale — Apple's own footer carries no
                mark at all. Say the word and it comes out entirely. */}
            <svg
              className="h-4 w-3.5 shrink-0"
              viewBox="0 0 247 280"
              fill="none"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M170.06 0.543366C211.433 -3.50614 236.19 15.0004 225.777 58.7006C219.822 83.6759 197.521 97.0917 177.019 109.248C202.895 128.074 240.615 133.768 245.737 174.945C253.304 228.401 158.951 268.373 130.476 220.383C109.715 185.398 107.262 130.7 104.03 90.9305C110.203 87.7638 117.471 84.5483 123.813 81.5593C132.049 77.8651 137.511 75.9054 146.175 73.3062C146.449 79.2815 146.175 83.1095 145.731 89.116C163.371 73.5985 182.968 56.9004 200.005 40.9441C191.923 40.0734 182.612 38.3982 174.453 37.2143L123.188 29.5633C129.077 35.8709 132.236 39.4949 136.853 46.7363C133.256 48.009 129.198 49.3672 125.524 50.3789C81.6609 62.4589 43.0633 89.6682 1.77713 107.681C0.905266 97.5528 -0.234185 82.0687 0.0421786 72.0297C4.47551 66.5018 15.1687 58.6589 20.9833 54.4602C61.8768 24.9276 119.449 3.86687 170.06 0.543366Z" fill="url(#footer_logo_gradient_clean)" />
              <path d="M69.3843 104.332C70.2243 104.237 69.8076 104.242 70.7452 104.75C72.3815 109.08 72.4012 117.39 72.8251 122.091C77.3736 172.495 84.2936 229.866 123.539 266.163C127.668 269.987 135.597 273.825 140.598 277.026C124.493 283.182 101.35 277.767 85.9162 271.323C79.9453 268.545 74.2502 265.211 68.9061 261.362C38.4491 239.421 20.2864 200.135 11.2739 164.666C8.90839 155.356 7.37249 145.404 5.82617 135.893C18.9249 126.569 53.7972 110.883 69.3843 104.332Z" fill="#033B66" />
              <defs>
                <linearGradient id="footer_logo_gradient_clean" x1="184" y1="36.5" x2="18" y2="180.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F47B09" />
                  <stop offset="1" stopColor="#FBAC09" />
                </linearGradient>
              </defs>
            </svg>

            <span className="font-quicksand text-footnote text-brand-deep">
              Techie<span className="text-brand">Base</span>
            </span>
            <span className="text-ink-tertiary">Technology &amp; You</span>
            <span aria-hidden="true" className="text-hairline">|</span>
            <span>
              Copyright © {new Date().getFullYear()} TechieBase Inc. All rights reserved.
            </span>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
