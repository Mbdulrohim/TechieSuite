import React, { useRef, useState } from 'react';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { UPCOMING_RELEASE } from '../data/upcoming';

const IPHONE_HERO = new URL('../../assets/images/iphone-18-hero.png', import.meta.url).href;

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
 * A full-bleed announcement tile for the next launch, with a waitlist signup.
 *
 * Built as a product tile rather than a signup widget: name in display type,
 * one line of copy, and a text link. The field stays hidden until asked for,
 * because a form sitting open on the page turns an announcement into an ad.
 *
 * NO BACKEND YET. The signup is remembered in localStorage so the shopper sees
 * a confirmed state, and the WhatsApp hand-off actually delivers the lead to
 * the shop. Replace the body of `handleSubmit` with the POST when the API is
 * up — nothing else here needs to change.
 */
export const WaitlistTeaser: React.FC = () => {
  const [contact, setContact] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [joined, setJoined] = useState(readJoined);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

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
    <section className="mx-auto max-w-[1400px] px-6">
      <div className="relative overflow-hidden rounded-panel bg-black">
        <div className="relative z-10 flex flex-col items-center gap-0 md:flex-row md:items-end md:gap-0">
          {/* Left: Text content */}
          <div className="flex-1 px-8 py-14 text-center md:px-12 md:py-16 md:text-left lg:px-16">
            <p className="eyebrow text-ink-tertiary">{UPCOMING_RELEASE.eyebrow}</p>

            <h2 className="mt-3 text-headline font-semibold text-white md:text-display">
              {UPCOMING_RELEASE.name}
            </h2>

            <p className="mt-4 text-lead text-ink-tertiary">{UPCOMING_RELEASE.tagline}</p>

            {/* One control at a time: a link, then the field, then the receipt. */}
            <div className="mt-8 flex min-h-11 items-start justify-center md:justify-start">
              {joined ? (
                <div className="animate-fade-in">
                  <p className="flex items-center justify-center gap-2 text-body text-white md:justify-start">
                    <Check className="h-4 w-4 text-success-bright" />
                    You&rsquo;re on the list.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center text-body text-link-bright hover:underline"
                  >
                    Confirm on WhatsApp <ChevronRight className="ml-0.5 h-4 w-4" />
                  </a>
                </div>
              ) : isFormOpen ? (
                <form onSubmit={handleSubmit} noValidate className="animate-fade-in w-full max-w-md">
                  <label htmlFor="waitlist-contact" className="sr-only">
                    Email or phone number for the {UPCOMING_RELEASE.name} waitlist
                  </label>

                  <div className="flex gap-2">
                    <input
                      id="waitlist-contact"
                      ref={inputRef}
                      type="text"
                      inputMode="email"
                      autoComplete="email"
                      value={contact}
                      onChange={(event) => {
                        setContact(event.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Email or phone number"
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? 'waitlist-error' : undefined}
                      className="min-h-11 flex-1 rounded-full bg-white px-5 text-body text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-4 focus:ring-white/25"
                    />

                    <button
                      type="submit"
                      aria-label="Join the waitlist"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover active:scale-[0.98]"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  {error && (
                    <p id="waitlist-error" className="mt-3 text-footnote text-critical-bright">
                      {error}
                    </p>
                  )}
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(true);
                    // Runs after the field mounts, so the link and the caret feel
                    // like one interaction.
                    requestAnimationFrame(() => inputRef.current?.focus());
                  }}
                  className="inline-flex min-h-11 items-center text-body text-link-bright hover:underline"
                >
                  Notify me when it arrives <ChevronRight className="ml-0.5 h-4 w-4" />
                </button>
              )}
            </div>

          </div>

          {/* Right: iPhone hero image — bottom-aligned to sit flush on the banner base */}
          <div className="relative flex w-full shrink-0 items-end justify-center self-end md:w-auto">
            {/* Subtle glow behind the device */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[80%] w-[70%] rounded-full bg-[#dc143c]/10 blur-[80px]"
            />
            <img
              src={IPHONE_HERO}
              alt="iPhone 18 — coming soon"
              className="relative z-10 w-[420px] max-w-none drop-shadow-2xl md:w-[480px] lg:w-[540px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
