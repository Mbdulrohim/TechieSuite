import React from 'react';
import { Cookie, X } from 'lucide-react';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem('techiesuite_cookie_consent', 'accepted');
    } catch {
      // ignore storage errors
    }
    onClose();
  };

  const handlePreferences = () => {
    try {
      localStorage.setItem('techiesuite_cookie_consent', 'preferences');
    } catch {
      // ignore storage errors
    }
    onClose();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[100] max-w-md w-full">
      <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-hairline-soft/80 animate-scale-in">
        {/* Clickaway cancel at top right corner */}
        <button
          onClick={onClose}
          aria-label="Close cookie message"
          className="absolute top-4 right-4 p-1.5 text-ink-tertiary hover:text-ink hover:bg-canvas rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content & Layout */}
        <div className="flex items-start gap-3.5 pr-6">
          <div className="p-2.5 bg-accent/10 text-accent rounded-xl shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-body font-semibold text-ink">
                We value your privacy
              </h3>
              <p className="text-footnote text-ink-secondary mt-1.5 leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized recommendations, remember your saved items, and analyze site traffic.
              </p>
            </div>

            {/* 2 Buttons aligned directly with the text area */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handlePreferences}
                className="flex-1 py-2 px-3.5 rounded-full border border-hairline text-footnote font-medium text-ink-secondary hover:text-ink hover:bg-canvas transition-colors text-center whitespace-nowrap"
              >
                Cookies Preference
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 py-2 px-3.5 rounded-full bg-ink text-white text-footnote font-semibold hover:bg-black transition-colors text-center shadow-sm whitespace-nowrap"
              >
                Accept Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
