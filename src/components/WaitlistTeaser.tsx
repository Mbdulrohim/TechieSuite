import React, { useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { UPCOMING_RELEASE } from '../data/upcoming';

/**
 * Accepts an email or a phone number in any of the shapes people actually type
 * (0814…, +234 814…, 234 814…). Deliberately loose — turning away a real
 * customer costs more than accepting a typo.
 */
const isValidContact = (value: string) => {
  const trimmed = value.trim();
  if (trimmed.includes('@')) return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
  return trimmed.replace(/\D/g, '').length >= 10;
};

const readJoined = () => {
  if (typeof window === 'undefined') return false;
  try {
    return Boolean(window.localStorage.getItem(UPCOMING_RELEASE.storageKey));
  } catch {
    // Private browsing can throw on access — treat it as "not joined".
    return false;
  }
};

/**
 * A one-line mention that the next iPhone is coming, with a waitlist signup.
 *
 * NO BACKEND YET. The signup is remembered in localStorage so the shopper sees
 * a confirmed state, and the WhatsApp hand-off below actually delivers the lead
 * to the shop. Replace the body of `handleSubmit` with the POST when the API is
 * up — nothing else here needs to change.
 */
export const WaitlistTeaser: React.FC = () => {
  const [contact, setContact] = useState('');
  const [joined, setJoined] = useState(readJoined);
  const [error, setError] = useState('');

  if (!UPCOMING_RELEASE.active) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidContact(contact)) {
      setError('Enter a valid email or phone number.');
      return;
    }

    try {
      window.localStorage.setItem(UPCOMING_RELEASE.storageKey, contact.trim());
    } catch {
      // Storage is a nicety here, not the point — carry on either way.
    }

    setError('');
    setJoined(true);
  };

  const whatsappHref = `https://wa.me/${UPCOMING_RELEASE.whatsappNumber}?text=${encodeURIComponent(
    `Hello TechieBase! Please add me to the ${UPCOMING_RELEASE.name} waitlist. My contact: ${contact.trim()}`
  )}`;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-8">
      <div className="rounded-panel bg-ink px-8 py-10 text-ink-inverse md:px-12 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-14">

          {/* The mention */}
          <div className="md:max-w-md">
            <p className="eyebrow flex items-center gap-2 text-ink-inverse/70">
              <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-brand-amber" />
              {UPCOMING_RELEASE.eyebrow}
            </p>

            <h2 className="mt-3 text-title font-semibold tracking-tight text-white md:text-title-lg">
              {UPCOMING_RELEASE.name} is on the way.
            </h2>

            <p className="mt-3 text-footnote text-ink-inverse/70">
              {UPCOMING_RELEASE.blurb}
            </p>

            <p className="mt-3 text-caption text-ink-inverse/50">
              {UPCOMING_RELEASE.window}
            </p>
          </div>

          {/* The signup */}
          <div className="w-full md:max-w-sm">
            {joined ? (
              <div className="rounded-card bg-white/10 p-5">
                <p className="flex items-center gap-2 text-footnote font-semibold text-white">
                  <Check className="h-4 w-4 text-success-bright" />
                  You are on the list.
                </p>
                <p className="mt-2 text-caption text-ink-inverse/70">
                  We will reach out before the {UPCOMING_RELEASE.name} goes on general sale.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-footnote font-medium text-white underline-offset-4 hover:underline"
                >
                  <MessageCircle className="h-4 w-4 text-whatsapp" />
                  Confirm it on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="waitlist-contact" className="sr-only">
                  Email or phone number for the {UPCOMING_RELEASE.name} waitlist
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="waitlist-contact"
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    value={contact}
                    onChange={(event) => {
                      setContact(event.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Email or WhatsApp number"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'waitlist-error' : undefined}
                    className="min-h-11 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-footnote text-white placeholder:text-ink-inverse/50 focus:border-white/50 focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-footnote font-semibold text-ink transition-colors hover:bg-ink-inverse"
                  >
                    Notify me <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {error ? (
                  <p id="waitlist-error" className="mt-3 text-caption text-brand-amber">
                    {error}
                  </p>
                ) : (
                  <p className="mt-3 text-caption text-ink-inverse/50">
                    No spam. One message when stock lands.
                  </p>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
