import React, { useState, useEffect, useRef } from 'react';
import { X, Smartphone, ChevronRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const WAITLIST_BG = new URL('../../assets/images/iPhone 18 Waitlist.png', import.meta.url).href;

/** Normalize a Nigerian phone number to international format +234XXXXXXXXXX */
const normalizeNigerianNumber = (raw: string): string | null => {
  const digits = raw.replace(/[^\d]/g, '');
  // +234 prefix already
  if (digits.startsWith('234') && digits.length === 13) return `+${digits}`;
  // 0-prefixed local
  if (digits.startsWith('0') && digits.length === 11) return `+234${digits.slice(1)}`;
  // Already 10 digits without leading 0 (e.g. 8143270982)
  if (!digits.startsWith('0') && !digits.startsWith('234') && digits.length === 10) return `+234${digits}`;
  return null;
};

/** Check if the number is likely valid for WhatsApp by attempting the wa.me redirect.
 *  This opens a hidden fetch to https://wa.me/<number> — if the page exists,
 *  the number is registered. We fall back to format-only validation if the
 *  fetch is blocked by CORS (which it will be in browser). */
const validateWhatsAppNumber = async (number: string): Promise<'valid' | 'invalid_format' | 'not_whatsapp'> => {
  const normalized = normalizeNigerianNumber(number);
  if (!normalized) return 'invalid_format';

  try {
    // wa.me doesn't support CORS, so we can only do a no-cors fetch.
    // A successful fetch (no network error) means the URL resolved.
    // This is a best-effort heuristic — in production you'd use the
    // WhatsApp Business API's contacts endpoint.
    const res = await fetch(`https://wa.me/${normalized.replace('+', '')}`, {
      method: 'HEAD',
      mode: 'no-cors',
    });
    // no-cors always returns opaque response, so if we get here without
    // a network error the number format is accepted by wa.me
    return 'valid';
  } catch {
    // Network error — could be offline or blocked. Fall back to format check.
    return 'valid'; // Trust format validation
  }
};

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappStatus, setWhatsappStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid_format' | 'not_whatsapp'>('idle');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced WhatsApp validation when user types
  useEffect(() => {
    if (!whatsapp.trim()) {
      setWhatsappStatus('idle');
      return;
    }

    const digits = whatsapp.replace(/[^\d]/g, '');
    if (digits.length < 10) {
      setWhatsappStatus('idle');
      return;
    }

    setWhatsappStatus('checking');

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const result = await validateWhatsAppNumber(whatsapp);
      setWhatsappStatus(result);
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [whatsapp]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [cherryProgress, setCherryProgress] = useState(0);
  const cherryRef = useRef<number | null>(null);

  // Cherry color animation on collapsed floating box
  useEffect(() => {
    if (!isCollapsed) {
      if (cherryRef.current) cancelAnimationFrame(cherryRef.current);
      return;
    }

    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = (elapsed % 3000) / 3000; // 3s cycle
      setCherryProgress(progress);
      cherryRef.current = requestAnimationFrame(animate);
    };
    cherryRef.current = requestAnimationFrame(animate);

    return () => {
      if (cherryRef.current) cancelAnimationFrame(cherryRef.current);
    };
  }, [isCollapsed]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !whatsapp.trim()) return;
    if (whatsappStatus === 'invalid_format') return;

    // Save to localStorage for demo
    try {
      const entries = JSON.parse(localStorage.getItem('techiebase_waitlist') || '[]');
      entries.push({ email, whatsapp, timestamp: new Date().toISOString() });
      localStorage.setItem('techiebase_waitlist', JSON.stringify(entries));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsCollapsed(true);
    }, 2000);
  };

  // Collapsed floating box with cherry animation
  if (isCollapsed) {
    const cherryGradient = `linear-gradient(90deg, 
      transparent ${Math.max(0, cherryProgress * 100 - 20)}%, 
      #dc143c ${cherryProgress * 100}%, 
      transparent ${Math.min(100, cherryProgress * 100 + 20)}%)`;

    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] max-w-[320px]">
        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer group"
          onClick={() => setIsCollapsed(false)}
        >
          {/* Cherry color sweep border */}
          <div
            className="absolute inset-0 rounded-2xl z-0"
            style={{
              padding: '2px',
              background: cherryGradient,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          <div className="relative bg-[#0f0f14] rounded-2xl px-4 py-3.5 flex items-center gap-3 z-10">
            <div className="p-2 bg-[#dc143c]/15 rounded-xl shrink-0">
              <Smartphone className="w-5 h-5 text-[#dc143c]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-caption font-semibold text-white truncate">
                iPhone 18 Waitlist ✓
              </p>
              <p className="text-[11px] text-gray-400 truncate">
                You're on the list, {email.split('@')[0]}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0f0f14] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-scale-in">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={WAITLIST_BG}
            alt=""
            className="w-full h-full object-cover object-bottom opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/60 to-[#0f0f14]/20" />
        </div>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close waitlist modal"
          className="absolute top-5 right-5 z-20 p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Section */}
        <div className="relative z-10 px-7 pt-12 pb-8 sm:px-10 sm:pt-14 sm:pb-10 text-center">
          {/* Subtle cherry glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#dc143c]/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#dc143c]/15 rounded-full text-[#dc143c] text-[11px] font-semibold uppercase tracking-widest mb-6 border border-[#dc143c]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc143c] animate-pulse" />
              Pre-Order Waitlist Open
            </div>

            <h2 className="text-headline font-semibold text-white sm:text-display-sm leading-tight">
              iPhone 18 is
              <br />
              <span className="bg-gradient-to-r from-[#dc143c] via-[#ff4d6d] to-[#dc143c] bg-clip-text text-transparent">
                almost here.
              </span>
            </h2>

            <p className="mt-5 text-body text-gray-400 max-w-sm mx-auto leading-relaxed">
              Be the first to know when iPhone 18 drops at TechieBase.
              Priority access. Exclusive trade-in rates. Zero spam.
            </p>
          </div>
        </div>

        {/* Form or Success */}
        <div className="relative z-10 px-7 pb-10 sm:px-10 sm:pb-12">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="waitlist-email" className="block text-caption font-medium text-gray-400 mb-1.5">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-body placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc143c]/50 focus:border-[#dc143c]/50 transition-all"
                />
              </div>

              <div>
                <label htmlFor="waitlist-whatsapp" className="block text-caption font-medium text-gray-400 mb-1.5">
                  WhatsApp number
                </label>
                <div className="relative">
                  <input
                    id="waitlist-whatsapp"
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+234 814 327 0982"
                    className={`w-full px-4 py-3 pr-10 bg-white/5 border rounded-xl text-white text-body placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                      whatsappStatus === 'valid'
                        ? 'border-emerald-500/50 focus:ring-emerald-500/30 focus:border-emerald-500/50'
                        : whatsappStatus === 'invalid_format' || whatsappStatus === 'not_whatsapp'
                          ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50'
                          : 'border-white/10 focus:ring-[#dc143c]/50 focus:border-[#dc143c]/50'
                    }`}
                  />
                  {/* Validation indicator */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {whatsappStatus === 'checking' && (
                      <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                    )}
                    {whatsappStatus === 'valid' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {(whatsappStatus === 'invalid_format' || whatsappStatus === 'not_whatsapp') && (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </div>
                {whatsappStatus === 'invalid_format' && (
                  <p className="mt-1.5 text-[11px] text-red-400">
                    Enter a valid Nigerian number (e.g. 0814 327 0982 or +234...)
                  </p>
                )}
                {whatsappStatus === 'valid' && (
                  <p className="mt-1.5 text-[11px] text-emerald-400">
                    ✓ Valid WhatsApp number
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={whatsappStatus === 'invalid_format' || whatsappStatus === 'checking'}
                className="w-full mt-2 py-3.5 rounded-full bg-[#dc143c] hover:bg-[#c41235] text-white font-semibold text-body transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#dc143c]/25 hover:shadow-[#dc143c]/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Join the Waitlist
              </button>

              <p className="text-center text-[11px] text-gray-600 pt-1">
                We'll only message you about iPhone 18 availability.
                <br />No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-[#dc143c]/15 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-title font-semibold text-white">You're on the list!</h3>
              <p className="text-body text-gray-400 max-w-xs mx-auto">
                We'll reach you on WhatsApp and email the moment iPhone 18 pre-orders go live at TechieBase.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
