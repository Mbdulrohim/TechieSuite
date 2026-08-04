import { Article } from '../types';

/* Editorial imagery reuses the verified stock set from products.ts. Swap for
   original photography when the storefront gets its real shoot. */
const ARTICLE_IMAGES = {
  genuine: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1600&q=85',
  tradeIn: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=85',
  laptops: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1600&q=85',
  consoles: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1600&q=85',
  power: 'https://images.unsplash.com/photo-1619489646924-b4fce76b1db5?auto=format&fit=crop&w=1600&q=85',
  galaxy: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=1600&q=85',
};

export const ARTICLES: Article[] = [
  {
    slug: 'how-to-spot-a-genuine-iphone',
    title: 'How to tell a genuine iPhone from a clone.',
    dek: 'Six checks you can run in under five minutes, before any money changes hands.',
    category: 'Buying guide',
    date: '28 July 2026',
    readMinutes: 6,
    image: ARTICLE_IMAGES.genuine,
    featured: true,
    body: [
      {
        type: 'paragraph',
        text: 'Nigeria has one of the busiest secondary phone markets in the world, and most of it is honest. But the clones have got good — good enough that a convincing fake will boot to something that looks like iOS, show an Apple logo, and pass a casual glance in a shop with bad lighting. The checks below take about five minutes and will catch almost all of them.',
      },
      { type: 'heading', text: '1. Read the serial number back to Apple' },
      {
        type: 'paragraph',
        text: 'Settings, General, About. Note the serial number, then type it into Apple\'s own coverage checker on a separate device. A genuine handset returns a model name, a purchase date, and a warranty status. A clone returns nothing, or returns a model that does not match the phone in your hand — a "16 Pro" that reports back as an iPhone 11 is the single most common tell.',
      },
      { type: 'heading', text: '2. Check the IMEI in two places' },
      {
        type: 'paragraph',
        text: 'Dial *#06# to display the IMEI, then compare it against the number printed on the SIM tray and the one in Settings. All three must match exactly. While you are there, run the IMEI through a blacklist checker: a genuine phone that was reported stolen abroad is a different problem from a clone, but it is just as unusable once the carrier catches up.',
      },
      { type: 'heading', text: '3. Open the App Store, not just the home screen' },
      {
        type: 'paragraph',
        text: 'Clones run Android skinned to look like iOS. The illusion holds on the home screen and breaks the moment you go one level deeper. Open the App Store and search for something specific. Then open Settings and scroll to the very bottom. Android underneath will show itself in a font that shifts, a settings list in the wrong order, or a keyboard that does not match.',
      },
      { type: 'heading', text: '4. Test Face ID and the cameras properly' },
      {
        type: 'paragraph',
        text: 'Enrol a face rather than accepting that the feature "works". Then open the camera and cycle every lens, including the ultra wide and the telephoto if the model has one. Fakes commonly ship with fewer real sensors than the lens cluster suggests, so switching to 3x produces a digital crop rather than a genuine optical change.',
      },
      { type: 'heading', text: '5. Look at the battery health screen' },
      {
        type: 'paragraph',
        text: 'Settings, Battery, Battery Health & Charging. A genuine device shows a maximum capacity percentage and a peak performance message. If the menu is missing entirely, or reports exactly 100% on a phone that is visibly a few years old, treat both as warnings. On a used handset, anything above 85% is reasonable; below 80% you should be negotiating on price or planning a replacement.',
      },
      { type: 'heading', text: '6. Ask for the box, and then ignore it' },
      {
        type: 'paragraph',
        text: 'Boxes, cables and even printed receipts are trivially reproduced, so packaging proves very little on its own. What it is useful for is cross-checking: the model and storage printed on the box should match what the phone reports in Settings. A mismatch means someone has swapped something, and you should walk away.',
      },
      {
        type: 'callout',
        text: 'Every device TechieBase sells goes through this checklist before it reaches the shelf, and we will run it with you again at the counter. Bring a phone you bought elsewhere and we will check it for free.',
      },
      { type: 'heading', text: 'If you are buying privately' },
      {
        type: 'list',
        items: [
          'Meet in daylight, somewhere with reliable network coverage — you cannot verify an IMEI without data.',
          'Insist on inserting your own SIM and making a call before paying.',
          'Confirm Find My is switched off and the previous owner has signed out of iCloud. An activation-locked phone is a brick.',
          'Pay on delivery of the device, not before. No genuine seller needs the money first.',
        ],
      },
    ],
  },
  {
    slug: 'what-your-old-iphone-is-worth',
    title: 'Trade in, step up: what your old iPhone is really worth.',
    dek: 'How trade-in valuations actually work, and the three things that move the number most.',
    category: 'Trade-in',
    date: '19 July 2026',
    readMinutes: 5,
    image: ARTICLE_IMAGES.tradeIn,
    body: [
      {
        type: 'paragraph',
        text: 'Most people underestimate what their current phone is worth and overestimate how much condition matters. Both errors cost money. Here is what a valuation is actually built from.',
      },
      { type: 'heading', text: 'Model and storage set the ceiling' },
      {
        type: 'paragraph',
        text: 'Roughly seventy per cent of a trade-in figure comes from the model line alone. Pro and Pro Max models hold value considerably better than the base models, and the gap widens with age rather than closing. Storage matters less than people expect on newer devices and more than they expect on older ones, where a 64GB unit is close to unsellable.',
      },
      { type: 'heading', text: 'Battery health is the biggest swing factor you control' },
      {
        type: 'paragraph',
        text: 'A phone above 85% maximum capacity is sold as-is. Below 80%, the buyer is pricing in a battery replacement, and that cost comes straight off your offer. If your battery is sitting at 81% and you are not in a hurry, replacing it before trading in occasionally nets you more than it costs — ask us to check the maths on your specific model.',
      },
      { type: 'heading', text: 'Cosmetic damage matters less than function' },
      {
        type: 'paragraph',
        text: 'Scuffs on the frame and light scratches on the back barely register. A cracked screen, a camera lens with visible damage, or a Face ID array that has stopped working move the number sharply, because each is a component-level repair. The honest rule: if it affects how the phone is used, it affects the price. If it only affects how it looks, it mostly does not.',
      },
      {
        type: 'callout',
        text: 'Trade-in value applies directly against whatever you are buying that day, so it comes off the price before financing is calculated. On an instalment plan that lowers every monthly payment, not just the deposit.',
      },
      { type: 'heading', text: 'Before you bring it in' },
      {
        type: 'list',
        items: [
          'Back up to iCloud or a computer, and confirm the backup finished.',
          'Sign out of iCloud and turn off Find My — we cannot accept an activation-locked device.',
          'Erase all content and settings.',
          'Bring the charger if you still have it. It rarely changes the offer, but it occasionally does.',
        ],
      },
    ],
  },
  {
    slug: 'buying-a-laptop-in-nigeria',
    title: 'Buying a laptop in Nigeria: what actually matters.',
    dek: 'Ignore the sticker specs. These four things decide whether you still like the machine in two years.',
    category: 'Buying guide',
    date: '11 July 2026',
    readMinutes: 7,
    image: ARTICLE_IMAGES.laptops,
    body: [
      {
        type: 'paragraph',
        text: 'Laptop listings are written to make comparison hard. Processor generations, cache sizes and marketing names crowd out the handful of specifications that genuinely change how a machine feels to use. Here is the short list we work through with customers at the counter.',
      },
      { type: 'heading', text: 'RAM, then storage type, then everything else' },
      {
        type: 'paragraph',
        text: 'Eight gigabytes of RAM is the current floor and it will feel tight within two years; sixteen is the sensible target for anything you intend to keep. Storage type matters more than storage size: an SSD makes a modest processor feel quick, while a mechanical drive makes a fast processor feel broken. If a listing does not say SSD, assume it is not one.',
      },
      { type: 'heading', text: 'Screen quality is the specification you look at all day' },
      {
        type: 'paragraph',
        text: 'A full HD IPS panel should be the minimum. The cheap TN panels still shipping on budget machines wash out the moment you move your head, which matters more than it sounds when you are working near a window. Brightness is worth checking too — anything under 250 nits struggles in a bright room.',
      },
      { type: 'heading', text: 'Build quality decides how long it lasts here' },
      {
        type: 'paragraph',
        text: 'Heat, dust and mains instability are harder on a laptop than most usage patterns are. A metal chassis dissipates heat better and survives being carried daily. Hinges are the most common mechanical failure we see, and they fail earlier on thin plastic bodies. This is where paying more genuinely buys you more time.',
      },
      { type: 'heading', text: 'Serviceability, because something will need fixing' },
      {
        type: 'paragraph',
        text: 'Ask two questions before buying: can the RAM be upgraded, and is there a second drive bay? A machine with soldered memory and a full drive is a machine you replace rather than improve. Ask us about parts availability for the specific model too — some brands are considerably easier to service locally than others.',
      },
      {
        type: 'callout',
        text: 'Every laptop we sell is set up in-store before you take it: Windows updated, drivers current, and your accounts signed in. Bring a flash drive if you want your old files moved across.',
      },
    ],
  },
  {
    slug: 'ps5-vs-xbox-series-x',
    title: 'PS5 or Xbox Series X: which one, honestly.',
    dek: 'The hardware is close enough that it comes down to three questions about how you play.',
    category: 'Gaming',
    date: '3 July 2026',
    readMinutes: 6,
    image: ARTICLE_IMAGES.consoles,
    body: [
      {
        type: 'paragraph',
        text: 'On raw specification these two consoles are far closer than the marketing suggests, and in practice almost every multi-platform game runs near-identically on both. So the specification sheet is the wrong place to decide. Three other questions matter more.',
      },
      { type: 'heading', text: 'What do your friends already own?' },
      {
        type: 'paragraph',
        text: 'This is genuinely the most important factor and the one people weigh least. Cross-platform play has improved but is still inconsistent, and party chat does not cross between the two systems at all. If the people you play with are on PlayStation, buy a PlayStation. That single consideration outweighs every hardware difference below.',
      },
      { type: 'heading', text: 'Do you buy games, or subscribe to them?' },
      {
        type: 'paragraph',
        text: 'Game Pass is the strongest argument for Xbox by a wide margin: a large rotating library including Microsoft\'s own titles on release day. PlayStation\'s equivalent has improved but its major exclusives generally arrive later. If you play many different games and would rather not buy each one, Xbox costs less over time. If you play a few titles deeply, the difference narrows considerably.',
      },
      { type: 'heading', text: 'Do the exclusives matter to you?' },
      {
        type: 'paragraph',
        text: 'PlayStation retains the stronger exclusive line-up for single-player, story-driven games. If those are the titles you remember from previous generations, that pull is real and worth paying for. Xbox\'s answer is breadth through Game Pass rather than a comparable set of headline exclusives.',
      },
      { type: 'heading', text: 'The practical differences' },
      {
        type: 'list',
        items: [
          'The DualSense controller\'s haptics and adaptive triggers are a genuine step up, and games use them well.',
          'Xbox Quick Resume holds several games suspended at once and switches between them in seconds.',
          'PS5 storage expands with a standard NVMe drive; Xbox needs a proprietary card, which costs more.',
          'The disc versions of both let you buy and resell physical games — worth more in Nigeria than in markets with cheap digital pricing.',
        ],
      },
      {
        type: 'callout',
        text: 'Both consoles are in stock at Ikeja and Lekki, set up and tested before handover. Come and try the controllers before deciding — it settles the argument faster than any spec sheet.',
      },
    ],
  },
  {
    slug: 'keeping-gear-alive-through-outages',
    title: 'Keeping your gear alive through the outages.',
    dek: 'Surge damage kills more devices in Nigeria than drops do. What actually protects them.',
    category: 'Power',
    date: '24 June 2026',
    readMinutes: 5,
    image: ARTICLE_IMAGES.power,
    body: [
      {
        type: 'paragraph',
        text: 'Most of the dead laptops and chargers that reach our repair bench were not dropped or soaked. They were plugged in when the power came back. The spike as mains returns is short, invisible, and cumulative — devices often survive several before failing on one that looks no different from the rest.',
      },
      { type: 'heading', text: 'Surge protection is not the same as an extension block' },
      {
        type: 'paragraph',
        text: 'A standard multi-socket splits current and nothing more. A surge-protected block contains components that clamp voltage spikes and divert them to earth. They look nearly identical on a shelf and cost very differently, which is exactly why the cheap ones sell. Check for a stated joule rating and a status indicator; if neither is printed on the unit, it almost certainly has no protection inside.',
      },
      { type: 'heading', text: 'Unplug during an outage, not just during a storm' },
      {
        type: 'paragraph',
        text: 'The most effective protection costs nothing. If power goes and you are not using the equipment, unplug it at the wall. Surge protectors degrade every time they absorb a spike — they are consumable, not permanent — so removing the device from the circuit entirely is always safer than trusting the block.',
      },
      { type: 'heading', text: 'Charge devices from a battery, not the wall' },
      {
        type: 'paragraph',
        text: 'A good power bank is a buffer as well as a backup. Charging a laptop from a battery means the laptop is never directly exposed to mains, and modern high-wattage banks will run one for most of a working day. For a desk that needs to stay up — router, laptop, a light — a portable power station does the same job for the whole setup and runs silently.',
      },
      {
        type: 'list',
        items: [
          'Look for a joule rating above 1,000 on any surge-protected block you buy.',
          'Replace surge protectors every few years, sooner if the indicator light has gone out.',
          'Keep a power bank charged rather than charged-and-forgotten; lithium cells self-discharge.',
          'Avoid charging phones from a generator directly at start-up, when output is least stable.',
        ],
      },
      {
        type: 'callout',
        text: 'Not sure what your setup needs? Bring a list of what you want to keep running and for how long, and we will size a power bank or station against it rather than selling you the biggest one.',
      },
    ],
  },
  {
    slug: 'galaxy-or-iphone',
    title: 'Galaxy or iPhone? An honest comparison.',
    dek: 'We sell both, so here is the version without a side to take.',
    category: 'Buying guide',
    date: '15 June 2026',
    readMinutes: 6,
    image: ARTICLE_IMAGES.galaxy,
    body: [
      {
        type: 'paragraph',
        text: 'Both platforms are excellent and have been for years. The differences that remain are mostly about how you already live rather than which is better, so the useful comparison is not feature-by-feature.',
      },
      { type: 'heading', text: 'Where iPhone still leads' },
      {
        type: 'paragraph',
        text: 'Software support is the clearest advantage: five to six years of full iOS updates is the practical standard, which matters enormously for resale value here. The ecosystem is the other — if you own or plan to own AirPods, a Mac, an Apple Watch or an iPad, the handover between them is genuinely seamless in a way no cross-brand setup matches. Resale value is also consistently stronger, which narrows the real cost gap more than the sticker price suggests.',
      },
      { type: 'heading', text: 'Where Galaxy still leads' },
      {
        type: 'paragraph',
        text: 'Hardware variety, first: nothing in Apple\'s line-up folds, and the S Pen has no equivalent. Charging is faster across the range. The camera systems reach further, with higher-resolution sensors and longer telephoto ranges on the Ultra models. And Android remains considerably more flexible — default apps, file management, and split-screen multitasking are all less constrained.',
      },
      { type: 'heading', text: 'The things that no longer differ' },
      {
        type: 'paragraph',
        text: 'Build quality, water resistance, display quality and everyday camera output are close enough at the flagship tier that you would struggle to pick a winner blind. Anyone telling you one platform is clearly ahead on those is describing 2017.',
      },
      { type: 'heading', text: 'The question that usually settles it' },
      {
        type: 'paragraph',
        text: 'Where are your photos, your messages and your subscriptions right now? Moving between platforms is easier than it was and still not painless — iMessage threads do not come with you, and some purchases do not transfer. If you are happy on one side, the burden of proof sits with switching. If you are starting fresh, buy the hardware you prefer holding.',
      },
      {
        type: 'callout',
        text: 'Both are on the shelf at every TechieBase store. We will move your data across for free either way, whichever direction you are going.',
      },
    ],
  },
];

export const FEATURED_ARTICLE = ARTICLES.find((article) => article.featured) ?? ARTICLES[0];

export const articleBySlug = (slug: string) => ARTICLES.find((article) => article.slug === slug);
