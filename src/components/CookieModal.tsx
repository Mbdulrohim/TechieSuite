import React, { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { storageKey } from '../config/storefront';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONSENT_KEY = storageKey('cookie-consent');

export const CookieModal: React.FC<CookieModalProps> = ({ isOpen, onClose }) => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [personalisation, setPersonalisation] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const saveConsent = (next: { analytics: boolean; personalisation: boolean }) => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ essential: true, ...next, updatedAt: new Date().toISOString() }),
      );
    } catch {
      // The choice still applies for this visit when storage is unavailable.
    }
    onClose();
  };

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className="fixed inset-x-4 bottom-4 z-[100] ml-auto w-auto max-w-md sm:bottom-6 sm:right-6"
    >
      <div className="relative rounded-2xl border border-hairline-soft/80 bg-white p-6 shadow-2xl animate-scale-in">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close cookie settings"
          className="absolute right-4 top-4 rounded-full p-1.5 text-ink-tertiary transition-colors hover:bg-canvas hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3.5 pr-6">
          <div className="mt-0.5 shrink-0 rounded-xl bg-accent/10 p-2.5 text-accent">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="cookie-title" className="text-body font-semibold text-ink">Your privacy, your choice.</h2>
            <p className="mt-1.5 text-footnote leading-relaxed text-ink-secondary">
              Essential storage keeps your bag and preferences working. Optional cookies help us
              understand visits and tailor recommendations.
            </p>

            {showPreferences && (
              <div className="mt-5 space-y-3 border-y border-hairline-soft py-4 text-footnote">
                <PreferenceRow label="Essential" detail="Always on" checked disabled />
                <PreferenceRow
                  label="Analytics"
                  detail="Helps improve the store"
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <PreferenceRow
                  label="Personalisation"
                  detail="More relevant recommendations"
                  checked={personalisation}
                  onChange={setPersonalisation}
                />
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              {showPreferences ? (
                <button
                  type="button"
                  onClick={() => saveConsent({ analytics, personalisation })}
                  className="min-h-10 flex-1 rounded-full border border-hairline px-4 text-footnote font-medium text-ink hover:bg-canvas"
                >
                  Save choices
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="min-h-10 flex-1 rounded-full border border-hairline px-4 text-footnote font-medium text-ink hover:bg-canvas"
                >
                  Customise
                </button>
              )}
              <button
                type="button"
                onClick={() => saveConsent({ analytics: true, personalisation: true })}
                className="min-h-10 flex-1 rounded-full bg-ink px-4 text-footnote font-semibold text-white hover:bg-black"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PreferenceRowProps {
  label: string;
  detail: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const PreferenceRow: React.FC<PreferenceRowProps> = ({ label, detail, checked, disabled, onChange }) => (
  <label className="flex items-center justify-between gap-4">
    <span>
      <span className="block font-medium text-ink">{label}</span>
      <span className="text-caption text-ink-tertiary">{detail}</span>
    </span>
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange?.(event.target.checked)}
      className="h-5 w-5 accent-ink"
    />
  </label>
);
