import { useEffect, useState } from 'react';
import { CheckCircle2, Clock3, XCircle } from 'lucide-react';
import { fetchSuiteOrderStatus } from '../lib/suiteStorefront';
import { STOREFRONT_CONFIG } from '../config/storefront';
import { storageKey } from '../config/storefront';

type Status = 'loading' | 'pending' | 'paid' | 'failed' | 'cancelled' | 'expired' | 'refunded' | 'error';

export const PaymentResultPage = ({ cancelled = false }: { cancelled?: boolean }) => {
  const params = new URLSearchParams(window.location.search);
  const reference = params.get('order') ?? '';
  const token = params.get('token') ?? '';
  const [status, setStatus] = useState<Status>(cancelled ? 'cancelled' : 'loading');

  useEffect(() => {
    if (!reference || !token) { setStatus('error'); return; }
    let live = true;
    let timer: number | undefined;
    const check = async () => {
      try {
        const order = await fetchSuiteOrderStatus(reference, token);
        if (!live) return;
        setStatus(cancelled && order.status === 'pending' ? 'cancelled' : order.status);
        if (order.status === 'paid') localStorage.removeItem(storageKey('cart.v2'));
        if (!cancelled && order.status === 'pending') timer = window.setTimeout(check, 2500);
      } catch { if (live) setStatus('error'); }
    };
    void check();
    return () => { live = false; if (timer !== undefined) window.clearTimeout(timer); };
  }, [cancelled, reference, token]);

  const paid = status === 'paid';
  const waiting = status === 'loading' || status === 'pending';
  const title = paid ? 'Payment confirmed' : waiting ? 'Confirming your payment' : status === 'cancelled' ? 'Checkout cancelled' : status === 'refunded' ? 'Payment refunded' : 'Payment not completed';
  const detail = paid ? `Your order ${reference} is confirmed.` : waiting ? 'OPay is still confirming the transaction. You can leave this page open.' : 'No successful payment has been recorded for this order.';
  return <main className="min-h-screen bg-canvas px-6 py-16 flex items-center justify-center"><section className="w-full max-w-lg rounded-panel border border-hairline-soft bg-white p-8 text-center shadow-panel md:p-12">
    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${paid ? 'bg-success-surface text-success' : waiting ? 'bg-accent-surface text-link' : 'bg-red-50 text-red-600'}`}>{paid ? <CheckCircle2 className="h-8 w-8" /> : waiting ? <Clock3 className="h-8 w-8 animate-pulse" /> : <XCircle className="h-8 w-8" />}</div>
    <p className="eyebrow text-ink-tertiary mt-6">{STOREFRONT_CONFIG.name}</p><h1 className="mt-2 text-title-sm font-semibold text-ink">{title}</h1><p className="mt-3 text-body text-ink-secondary">{detail}</p>
    {reference && <p className="mt-5 rounded-control bg-canvas px-3 py-2 font-mono text-footnote text-ink-secondary break-all">{reference}</p>}
    <a href="/" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-7 text-footnote font-semibold text-white">Back to shop</a>
  </section></main>;
};
