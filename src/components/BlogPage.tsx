import React from 'react';
import { Clock, ArrowLeft, TrendingUp, Smartphone, ChevronRight } from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  readMinutes: number;
  image: string;
  body: string[];
}

export const IPHONE_18_BLOGS: BlogPost[] = [
  {
    slug: 'iphone-18-pro-max-everything-we-know',
    title: 'iPhone 18 Pro Max: Everything We Know So Far — Specs, Price & Release Date in Nigeria',
    dek: 'From the A20 Pro chip to a rumored under-display Face ID, here is every credible leak about the most anticipated iPhone ever — and what it means for Nigerian buyers.',
    category: 'iPhone 18',
    date: 'August 2026',
    readMinutes: 8,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=85',
    body: [
      'Apple is expected to unveil the iPhone 18 lineup in September 2026, and the leaks have been relentless. The flagship iPhone 18 Pro Max is rumored to feature a 6.9-inch ProMotion LTPO OLED display with an under-display Face ID sensor — finally removing the Dynamic Island notch entirely for a true all-screen experience.',
      'Under the hood, the A20 Pro chip built on TSMC\'s 2nm process is expected to deliver a 30% jump in CPU performance and 40% better GPU throughput compared to the A19 Pro. For content creators in Lagos and across Nigeria, this means 8K ProRes video recording and real-time AI-powered editing directly on the device.',
      'Camera upgrades are the headline story. A new 48MP periscope telephoto with 10x optical zoom joins the 48MP main sensor and ultra-wide, while a dedicated LiDAR scanner has been enhanced for spatial video capture optimized for Apple Vision Pro.',
      'Pricing in Nigeria is projected to start at ₦1,850,000 for the 256GB model through authorized retailers like TechieBase. Pre-orders typically open one week after announcement, with first deliveries landing in Lagos and Abuja within 2-3 weeks of global launch.',
      'Battery life is another area of improvement — Apple is expected to include a larger 4,800mAh cell combined with the 2nm chip\'s efficiency gains, targeting over 30 hours of video playback. Wi-Fi 7 and Bluetooth 6.0 round out the connectivity upgrades.',
    ],
  },
  {
    slug: 'should-you-wait-for-iphone-18-or-buy-iphone-17-now',
    title: 'Should You Wait for iPhone 18 or Buy iPhone 17 Pro Now? A Nigerian Buyer\'s Guide',
    dek: 'The iPhone 17 Pro is already excellent. We break down exactly who should wait for the 18 and who should buy today — with real Naira pricing math.',
    category: 'Buying Guide',
    date: 'August 2026',
    readMinutes: 6,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=85',
    body: [
      'Every year the same question comes up: should I wait? With the iPhone 18 just weeks away from announcement, the temptation to hold off is real. But for many Nigerian buyers, the iPhone 17 Pro at its current TechieBase price of ₦1,099,000 represents exceptional value.',
      'If you\'re upgrading from an iPhone 14 or older, the jump to iPhone 17 Pro is already massive — ProMotion display, A19 Pro chip, and the 48MP camera system. The iPhone 18 improvements, while exciting, will be incremental for most daily users.',
      'However, if you\'re a content creator, photographer, or simply want the latest and greatest, the iPhone 18 Pro\'s rumored 10x optical zoom and under-display Face ID are worth the wait. TechieBase will offer day-one pre-orders with trade-in credit for your current device.',
      'The financial math matters too. iPhone 17 Pro prices typically drop ₦50,000-100,000 once the new model launches. If you\'re budget-conscious, waiting until October to buy the 17 Pro at a discount is the smartest play.',
      'Our recommendation: Join the TechieBase iPhone 18 waitlist now to lock in priority access and trade-in pricing, then make your final decision when Apple reveals the actual specs and Nigerian pricing.',
    ],
  },
  {
    slug: 'iphone-18-vs-samsung-galaxy-s27-ultra',
    title: 'iPhone 18 Pro Max vs Samsung Galaxy S27 Ultra: The 2026 Flagship War in Nigeria',
    dek: 'Two titans, one budget. We compare every rumored spec, feature and expected Nigerian price to help you choose the right flagship for your lifestyle.',
    category: 'Comparison',
    date: 'August 2026',
    readMinutes: 10,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=85',
    body: [
      'The Samsung Galaxy S27 Ultra is already dominating the Android flagship market in Nigeria with its 200MP camera and S Pen. But the iPhone 18 Pro Max is coming for the crown. Let\'s break down the battle.',
      'Display: Both devices offer stunning LTPO OLED panels. The S27 Ultra\'s 6.8-inch QHD+ display is slightly smaller than the iPhone 18 Pro Max\'s rumored 6.9-inch panel, but Samsung\'s peak brightness of 3,000 nits may edge out Apple\'s 2,500 nits.',
      'Camera systems tell a different story. While Samsung leads in raw megapixel count (200MP vs 48MP), Apple\'s computational photography and ProRes video capabilities make the iPhone the preferred choice for professional content creators across Lagos and the broader Nigerian creative industry.',
      'Performance is where Apple traditionally dominates. The A20 Pro chip on 2nm is expected to outperform the Snapdragon 8 Gen 5 in both single-core and sustained performance benchmarks. For gaming and video editing on the go, this matters.',
      'Pricing in Nigeria positions them similarly: the Galaxy S27 Ultra at roughly ₦1,750,000 versus the iPhone 18 Pro Max\'s expected ₦1,850,000. Both are available with TechieBase\'s installment plans and trade-in options, making the premium more manageable.',
    ],
  },
  {
    slug: 'best-iphone-18-accessories-to-buy-in-nigeria',
    title: '7 Best iPhone 18 Accessories to Pre-Order in Nigeria Right Now',
    dek: 'From MagSafe power banks to the new AirPods Pro 3, these are the must-have accessories ready for day one — all available at TechieBase.',
    category: 'Accessories',
    date: 'August 2026',
    readMinutes: 5,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=85',
    body: [
      'The iPhone 18 is coming, and the accessory ecosystem is already heating up. Whether you\'re upgrading your charging setup or protecting your investment, here are the 7 accessories every Nigerian iPhone 18 buyer needs.',
      '1. Anker MagGo 3-in-1 Charging Station (₦110,000 at TechieBase) — Qi2 certified, foldable, charges iPhone, Apple Watch and AirPods simultaneously. The essential desk companion.',
      '2. Apple MagSafe Silicone Case — Expected at ₦45,000, the new silicone cases will feature improved grip texturing and color-matched internals. Pre-order opens with the iPhone itself.',
      '3. Anker 737 Power Bank 24K (₦150,000 at TechieBase) — At 24,000mAh with 140W output, this beast charges MacBooks too. Essential for Lagos commuters and travelers dealing with NEPA situations.',
      '4. AirPods Pro 3 — Rumored alongside iPhone 18 with improved ANC, hearing health features, and USB-C case with built-in speaker. Expected at ₦280,000 in Nigeria.',
      '5. Spigen Ultra Hybrid MagFit Case — Crystal clear protection with MagSafe ring. Available day one at TechieBase for roughly ₦25,000.',
      '6. Apple 45W USB-C Charger — The fastest iPhone charger yet, expected to be sold separately. Budget ₦35,000.',
      '7. Belkin Screen Protector with Auto-Align — Ceramic shield is tough, but a screen protector is still insurance. ₦15,000 at TechieBase.',
    ],
  },
  {
    slug: 'how-to-trade-in-your-old-iphone-for-iphone-18-nigeria',
    title: 'How to Trade In Your Old iPhone for Maximum Value Before iPhone 18 Launches in Nigeria',
    dek: 'Your old iPhone is worth more than you think — but only if you trade it in before prices drop. Here is the complete TechieBase trade-in guide with current valuations.',
    category: 'Trade-In',
    date: 'August 2026',
    readMinutes: 7,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=85',
    body: [
      'Every year like clockwork, the moment Apple announces a new iPhone, trade-in values for older models drop by 15-25%. If you\'re planning to upgrade to the iPhone 18, the time to lock in your trade-in value is right now — before the announcement.',
      'Current TechieBase trade-in values (August 2026): iPhone 17 Pro Max: up to ₦650,000 | iPhone 17 Pro: up to ₦580,000 | iPhone 16 Pro Max: up to ₦480,000 | iPhone 16 Pro: up to ₦400,000 | iPhone 15 Pro Max: up to ₦320,000 | iPhone 15: up to ₦200,000.',
      'How the TechieBase trade-in works: 1) Visit any TechieBase store in Lagos (Ikeja or Lekki) or start online. 2) Our technicians run a 30-point inspection covering screen, battery health, camera, and body condition. 3) You receive an instant quote. 4) Accept and the credit applies directly to your iPhone 18 pre-order.',
      'Pro tips to maximize your trade-in: Factory reset your device but don\'t erase it yet — bring it to us with your data so we can verify everything works. Remove your case and screen protector for inspection. Bring the original box and charger if you have them — it adds ₦5,000-10,000 to the valuation.',
      'The smartest move: Join the TechieBase iPhone 18 waitlist today. When you pre-order, your trade-in value is locked at today\'s rate, even if you don\'t hand in the old phone until your iPhone 18 arrives. That\'s money in your pocket.',
    ],
  },
];

interface BlogPageProps {
  onBack: () => void;
  onOpenWaitlist: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBack, onOpenWaitlist }) => {
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="pb-24">
        {/* Article Hero */}
        <section className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]">
          <div className="mx-auto max-w-[900px] px-5 py-14 md:px-8 md:py-20">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-1.5 text-footnote font-medium text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </button>
            <p className="eyebrow text-brand">{selectedPost.category} · {selectedPost.readMinutes} min read</p>
            <h1 className="mt-3 text-title text-white font-semibold sm:text-headline md:text-display-sm leading-tight">
              {selectedPost.title}
            </h1>
            <p className="mt-5 text-body text-white/70 max-w-2xl">{selectedPost.dek}</p>
            <div className="mt-6 flex items-center gap-3 text-caption text-white/50">
              <Clock className="w-4 h-4" />
              <span>{selectedPost.date} · {selectedPost.readMinutes} min read</span>
            </div>
          </div>
        </section>

        {/* Article Image */}
        <div className="mx-auto max-w-[900px] px-5 md:px-8 -mt-2">
          <img
            src={selectedPost.image}
            alt=""
            className="w-full rounded-2xl aspect-[16/9] object-cover shadow-xl"
          />
        </div>

        {/* Article Body */}
        <article className="mx-auto max-w-[720px] px-5 md:px-8 pt-12 space-y-6">
          {selectedPost.body.map((paragraph, idx) => (
            <p key={idx} className="text-body text-ink-secondary leading-[1.85]">
              {paragraph}
            </p>
          ))}
        </article>

        {/* CTA Banner */}
        <div className="mx-auto max-w-[720px] px-5 md:px-8 pt-12">
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 md:p-10 text-center">
            <p className="text-caption font-semibold text-brand uppercase tracking-wider">Don't miss out</p>
            <h3 className="mt-2 text-title text-white font-semibold">
              Be first in line for iPhone 18 at TechieBase
            </h3>
            <p className="mt-3 text-footnote text-white/70 max-w-lg mx-auto">
              Join the waitlist now and lock in priority access, trade-in pricing, and exclusive launch-day offers.
            </p>
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="mt-6 px-8 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-footnote transition-all hover:scale-[1.02] shadow-lg"
            >
              Join the iPhone 18 Waitlist
            </button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mx-auto max-w-[900px] px-5 md:px-8 pt-16">
          <h3 className="text-title font-semibold text-ink mb-6">More from the Blog</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {IPHONE_18_BLOGS.filter((p) => p.slug !== selectedPost.slug)
              .slice(0, 2)
              .map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => {
                    setSelectedPost(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex flex-col overflow-hidden rounded-card bg-white text-left shadow-card ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-canvas">
                    <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <p className="eyebrow text-ink-secondary">{post.category} · {post.readMinutes} min</p>
                    <h4 className="mt-1.5 text-lead font-semibold text-ink line-clamp-2">{post.title}</h4>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Blog Header */}
      <section className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-8 md:py-24">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-footnote font-medium text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand/20 rounded-xl">
              <TrendingUp className="w-5 h-5 text-brand" />
            </div>
            <span className="eyebrow text-brand">TechieBase Blog</span>
          </div>
          <h1 className="max-w-4xl text-display-sm text-white font-semibold sm:text-display md:text-display-lg">
            iPhone 18: The Complete Guide
          </h1>
          <p className="mt-6 max-w-2xl text-body text-white/70 md:text-lead">
            Leaks, buying guides, trade-in strategies and everything you need to know before Apple's biggest launch yet.
          </p>
        </div>
      </section>

      {/* Waitlist CTA Strip */}
      <div className="bg-gradient-to-r from-accent to-accent-hover">
        <div className="mx-auto max-w-[1400px] px-6 py-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white">
            <Smartphone className="w-5 h-5" />
            <span className="text-footnote font-semibold">iPhone 18 Pre-Order Waitlist is now open at TechieBase</span>
          </div>
          <button
            type="button"
            onClick={onOpenWaitlist}
            className="px-5 py-2 rounded-full bg-white text-accent font-semibold text-caption hover:bg-white/90 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            Join Waitlist <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Blog Grid */}
      <section className="mx-auto max-w-[1400px] px-4 pt-12 md:px-8 md:pt-16">
        {/* Featured / Lead Post */}
        <button
          type="button"
          onClick={() => {
            setSelectedPost(IPHONE_18_BLOGS[0]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group block w-full overflow-hidden rounded-panel bg-surface text-left shadow-card ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover"
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-[16/10] overflow-hidden bg-canvas md:aspect-auto md:min-h-[380px]">
              <img
                src={IPHONE_18_BLOGS[0].image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-12">
              <p className="eyebrow text-sale">{IPHONE_18_BLOGS[0].category} · {IPHONE_18_BLOGS[0].readMinutes} min read</p>
              <h2 className="mt-3 text-title text-ink font-semibold md:text-headline">{IPHONE_18_BLOGS[0].title}</h2>
              <p className="mt-4 text-body text-ink-secondary">{IPHONE_18_BLOGS[0].dek}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-footnote font-semibold text-link">
                Read the guide <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </button>

        {/* Remaining Posts */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {IPHONE_18_BLOGS.slice(1).map((post) => (
            <button
              key={post.slug}
              type="button"
              onClick={() => {
                setSelectedPost(post);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex min-w-0 flex-col overflow-hidden rounded-card bg-surface text-left shadow-card ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="aspect-[16/10] overflow-hidden bg-canvas">
                <img
                  src={post.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="eyebrow text-ink-secondary">{post.category} · {post.readMinutes} min</p>
                <h3 className="mt-2 text-lead text-ink font-semibold line-clamp-2">{post.title}</h3>
                <p className="mt-2 text-caption text-ink-secondary line-clamp-2">{post.dek}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
