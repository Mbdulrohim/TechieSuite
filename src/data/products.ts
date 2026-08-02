import { Product, ProductBundle, StoreLocation, TradeInQuote } from '../types';

export const STORE_LOCATIONS: StoreLocation[] = [
  { id: 'fifth-ave', name: 'Apple Fifth Avenue', address: '767 5th Ave, New York, NY', status: 'In Stock for Today\'s Pickup', distance: '0.8 miles' },
  { id: 'union-sq', name: 'Apple Union Square', address: '300 Post St, San Francisco, CA', status: 'In Stock for Today\'s Pickup', distance: '1.2 miles' },
  { id: 'grand-central', name: 'Apple Grand Central', address: '89 E 42nd St, New York, NY', status: 'In Stock for Today\'s Pickup', distance: '1.5 miles' },
  { id: 'lincoln-park', name: 'Apple Lincoln Park', address: '801 W North Ave, Chicago, IL', status: 'Order now for Pickup Tomorrow', distance: '2.4 miles' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    tagline: 'Hello, Apple Intelligence. Titanium powerhouse.',
    category: 'iphone',
    price: 999,
    originalPrice: 1099,
    monthlyPrice: 41.62,
    rating: 4.9,
    reviewCount: 14820,
    badge: 'BEST SELLER',
    stockUrgency: 'Only 3 left at Apple Fifth Avenue',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C2A385' },
      { name: 'Natural Titanium', hex: '#BAA392' },
      { name: 'White Titanium', hex: '#F0ECE8' },
      { name: 'Black Titanium', hex: '#2E2F32' }
    ],
    storageOptions: [
      { capacity: '128GB', priceDelta: 0 },
      { capacity: '256GB', priceDelta: 100 },
      { capacity: '512GB', priceDelta: 300 },
      { capacity: '1TB', priceDelta: 500 }
    ],
    specs: {
      'Display': '6.3" Super Retina XDR with ProMotion (120Hz)',
      'Chip': 'A18 Pro chip with 6-core GPU & Apple Intelligence',
      'Camera': '48MP Fusion, 48MP Ultra Wide, 5x Telephoto',
      'Battery': 'Up to 27 hours video playback',
      'Finish': 'Grade 5 Titanium with textured matte glass'
    },
    description: 'iPhone 16 Pro. Featuring a stunning Grade 5 titanium design, Camera Control for instant photo capture, 4K 120 fps Dolby Vision recording, and the powerhouse A18 Pro chip designed from the ground up for Apple Intelligence.',
    reviews: [
      {
        id: 'r1',
        author: 'Marcus Vance',
        rating: 5,
        date: '2 days ago',
        title: 'The Camera Control button is a game-changer!',
        comment: 'Upgraded from the 13 Pro. The 5x optical zoom and new Camera Control button make taking pro-level photos effortless. The Desert Titanium finish is gorgeous.',
        verified: true,
        helpfulCount: 142
      },
      {
        id: 'r2',
        author: 'Elena Rostova',
        rating: 5,
        date: '1 week ago',
        title: 'Battery life lasts well over 24 hours',
        comment: 'Sleek, lightweight, super responsive screen. Apple Intelligence features like photo clean-up and smart email summaries are immensely useful.',
        verified: true,
        helpfulCount: 89
      }
    ]
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    tagline: 'The ultimate iPhone. Largest display, longest battery life.',
    category: 'iphone',
    price: 1199,
    originalPrice: 1299,
    monthlyPrice: 49.95,
    rating: 4.9,
    reviewCount: 9410,
    badge: 'HOT DEAL',
    stockUrgency: 'High Demand — Order within 1 hr for Free Express Delivery',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C2A385' },
      { name: 'Natural Titanium', hex: '#BAA392' },
      { name: 'Black Titanium', hex: '#2E2F32' },
      { name: 'White Titanium', hex: '#F0ECE8' }
    ],
    storageOptions: [
      { capacity: '256GB', priceDelta: 0 },
      { capacity: '512GB', priceDelta: 200 },
      { capacity: '1TB', priceDelta: 400 }
    ],
    specs: {
      'Display': '6.9" Super Retina XDR — Largest iPhone screen ever',
      'Chip': 'A18 Pro chip with 6-core Neural Engine',
      'Camera': '48MP Fusion Camera, 5x Optical Zoom, 4K 120 fps',
      'Battery': 'Up to 33 hours video playback — Longest battery ever',
      'Durability': 'Latest-generation Ceramic Shield front'
    },
    description: 'The giant 6.9-inch display on iPhone 16 Pro Max gives you the most expansive canvas for video editing, gaming, and multitasking, powered by titanium durability and unmatched battery stamina.',
    reviews: [
      {
        id: 'r3',
        author: 'David K.',
        rating: 5,
        date: '3 days ago',
        title: 'Unbelievable 6.9" screen and battery beast',
        comment: 'I easily get 2 full days of battery on moderate usage. The display brightness under direct sunlight is incredible.',
        verified: true,
        helpfulCount: 76
      }
    ]
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air 13" (M3)',
    tagline: 'Lean. Mean. M3 machine.',
    category: 'mac',
    price: 999,
    originalPrice: 1099,
    monthlyPrice: 83.25,
    rating: 4.8,
    reviewCount: 8230,
    badge: 'BEST SELLER',
    stockUrgency: 'Includes Free $150 Apple Gift Card for Back to School',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Midnight', hex: '#2C3641' },
      { name: 'Starlight', hex: '#E2D8C3' },
      { name: 'Space Gray', hex: '#7D7E80' },
      { name: 'Silver', hex: '#E3E4E5' }
    ],
    storageOptions: [
      { capacity: '256GB SSD / 16GB RAM', priceDelta: 0 },
      { capacity: '512GB SSD / 16GB RAM', priceDelta: 200 },
      { capacity: '1TB SSD / 24GB RAM', priceDelta: 600 }
    ],
    specs: {
      'Processor': 'Apple M3 chip (8-core CPU, 10-core GPU)',
      'Memory': '16GB Unified Memory standard',
      'Display': '13.6" Liquid Retina display with 500 nits brightness',
      'Battery': 'Up to 18 hours battery life with MagSafe charging',
      'Weight': '2.7 pounds ultra-portable aluminum body'
    },
    description: 'Strikingly thin and fast, MacBook Air with the M3 chip leverages built-in Apple Intelligence, AV1 decode, and dual external display support in a silent fanless design.',
    reviews: [
      {
        id: 'r4',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '5 days ago',
        title: 'Perfect student laptop!',
        comment: 'Lightweight, lightning fast for coding and photo editing, and Midnight looks phenomenal with the fingerprint resistant seal.',
        verified: true,
        helpfulCount: 210
      }
    ]
  },
  {
    id: 'macbook-pro-14-m3',
    name: 'MacBook Pro 14" (M3 Pro)',
    tagline: 'Mind-blowing. Head-turning.',
    category: 'mac',
    price: 1899,
    originalPrice: 1999,
    monthlyPrice: 158.25,
    rating: 4.9,
    reviewCount: 6150,
    badge: 'SAVE $100',
    stockUrgency: 'In Stock for Today\'s Pickup at Apple Grand Central',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Space Black', hex: '#1F2022' },
      { name: 'Silver', hex: '#E3E4E5' }
    ],
    storageOptions: [
      { capacity: '512GB SSD / 18GB RAM', priceDelta: 0 },
      { capacity: '1TB SSD / 36GB RAM', priceDelta: 400 },
      { capacity: '2TB SSD / 48GB RAM', priceDelta: 1000 }
    ],
    specs: {
      'Processor': 'M3 Pro (12-core CPU, 18-core GPU)',
      'Display': '14.2" Liquid Retina XDR with 1600 nits peak HDR',
      'Ports': '3x Thunderbolt 4, HDMI, SDXC slot, MagSafe 3',
      'Battery': 'Up to 22 hours video playback'
    },
    description: 'Built for demanding workflows like 8K video timeline scrub, 3D render loops, and large LLM compilation. Featuring hardware-accelerated ray tracing and Space Black anodized aluminum finish.',
    reviews: [
      {
        id: 'r5',
        author: 'Alex Rivera',
        rating: 5,
        date: '1 week ago',
        title: 'Space Black finish is incredible',
        comment: 'Runs Xcode and Final Cut Pro simultaneously without the fans even kicking on. Display quality is unmatched.',
        verified: true,
        helpfulCount: 114
      }
    ]
  },
  {
    id: 'ipad-pro-m4',
    name: 'iPad Pro 13" (M4)',
    tagline: 'Thinpossible. Ultra Retina XDR OLED display.',
    category: 'ipad',
    price: 1299,
    originalPrice: 1399,
    monthlyPrice: 108.25,
    rating: 4.8,
    reviewCount: 4320,
    badge: 'NEW',
    stockUrgency: 'Ships Free in 2 Days',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Space Black', hex: '#212224' },
      { name: 'Silver', hex: '#E2E3E5' }
    ],
    storageOptions: [
      { capacity: '256GB / Tandem OLED', priceDelta: 0 },
      { capacity: '512GB / Tandem OLED', priceDelta: 200 },
      { capacity: '1TB / Nano-texture glass', priceDelta: 600 }
    ],
    specs: {
      'Thickness': '5.1mm — Thinnest Apple product ever',
      'Display': 'Ultra Retina XDR Tandem OLED (2000 nits peak)',
      'Chip': 'M4 chip with 38 TOPS Neural Engine',
      'Accessories': 'Supports Apple Pencil Pro and Magic Keyboard'
    },
    description: 'The world’s most advanced display in an impossibly thin and light design. M4 chip delivers groundbreaking AI performance for creative artists, video editors, and digital painters.',
    reviews: [
      {
        id: 'r6',
        author: 'Chloe Bennett',
        rating: 5,
        date: '4 days ago',
        title: 'Tandem OLED panel is jaw-dropping',
        comment: 'Deep blacks, vibrant colors, and pencil responsiveness for illustration is second to none.',
        verified: true,
        helpfulCount: 93
      }
    ]
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    tagline: 'Next-level adventure. Black Titanium edition.',
    category: 'watch',
    price: 799,
    monthlyPrice: 66.58,
    rating: 4.9,
    reviewCount: 5120,
    badge: 'POPULAR',
    stockUrgency: 'Order in next 2 hours for Same-Day Store Pickup',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Satin Black Titanium', hex: '#1C1D1F' },
      { name: 'Natural Titanium', hex: '#A8A9AB' }
    ],
    specs: {
      'Case': '49mm aerospace Grade 5 Titanium case with sapphire front crystal',
      'Display': '3000 nits Always-On Retina display',
      'GPS': 'Precision dual-frequency GPS (L1 and L5)',
      'Water Resistance': '100m water resistance, EN13319 scuba dive rated',
      'Battery': 'Up to 36 hours normal use (72 hours Low Power Mode)'
    },
    description: 'The ultimate sports and adventure watch. Packed with customizable Action button, dual-frequency GPS, siren, depth gauge, and S9 SiP with Double Tap gesture.',
    reviews: [
      {
        id: 'r7',
        author: 'Tyler Olsen',
        rating: 5,
        date: '2 weeks ago',
        title: 'Built like a tank for trail running',
        comment: 'Satin Black looks tough and elegant. Battery easily lasts 3 full days with GPS workout logging every morning.',
        verified: true,
        helpfulCount: 168
      }
    ]
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2 (USB-C)',
    tagline: 'Active Noise Cancellation. Hearing Health clinical features.',
    category: 'airpods',
    price: 199,
    originalPrice: 249,
    monthlyPrice: 16.58,
    rating: 4.9,
    reviewCount: 22100,
    badge: 'BEST SELLER',
    stockUrgency: 'Save $50 Instant Discount — Free Engraving Available',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'White', hex: '#FFFFFF' }
    ],
    specs: {
      'Audio': 'H2 chip, Personalized Spatial Audio with dynamic head tracking',
      'Cancellation': '2x more Active Noise Cancellation than predecessor',
      'Features': 'Adaptive Audio, Conversation Awareness, FDA-cleared Hearing Aid capabilities',
      'Charging Case': 'MagSafe Case (USB-C) with Precision Finding speaker and lanyard loop'
    },
    description: 'AirPods Pro 2 deliver 2x more Active Noise Cancellation, Transparency mode, Adaptive Audio, plus revolutionary software features including a scientifically validated Hearing Test and clinical-grade Hearing Aid feature.',
    reviews: [
      {
        id: 'r8',
        author: 'Dr. Samual Thorne',
        rating: 5,
        date: 'Yesterday',
        title: 'Noise cancellation is frighteningly good',
        comment: 'Silences plane engines completely. USB-C case charging and precision speaker make finding lost keys easy.',
        verified: true,
        helpfulCount: 310
      }
    ]
  },
  {
    id: 'airpods-max',
    name: 'AirPods Max (USB-C)',
    tagline: 'High-fidelity audio. Five fresh colors.',
    category: 'airpods',
    price: 549,
    monthlyPrice: 45.75,
    rating: 4.7,
    reviewCount: 3890,
    badge: 'NEW',
    stockUrgency: 'In Stock in Midnight and Starlight',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Midnight', hex: '#212B35' },
      { name: 'Starlight', hex: '#E4DDD2' },
      { name: 'Blue', hex: '#4B6B82' },
      { name: 'Purple', hex: '#776E8A' },
      { name: 'Orange', hex: '#CC5E3B' }
    ],
    specs: {
      'Audio': 'Apple-designed dynamic driver, computational audio with H1 chip',
      'Design': 'Anodized aluminum earcups, breathable knit mesh canopy',
      'Connector': 'USB-C for lossless listening and fast charging'
    },
    description: 'Over-ear headphones reinvented. Apple-designed dynamic driver provides immersive high-fidelity audio. Every detail, from canopy to cushions, designed for exceptional fit.',
    reviews: []
  },
  {
    id: 'airtag-4pack',
    name: 'AirTag (4-Pack)',
    tagline: 'Keep track of your keys, wallet, luggage, and bike.',
    category: 'accessories',
    price: 99,
    originalPrice: 119,
    monthlyPrice: 8.25,
    rating: 4.9,
    reviewCount: 18900,
    badge: 'SAVE $100',
    stockUrgency: 'Top Seller — Over 5,000 bought this week',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Silver / White', hex: '#EDEDED' }
    ],
    specs: {
      'Tracking': 'Ultra Wideband Precision Finding technology',
      'Battery': 'User-replaceable CR2032 battery (lasts over 1 year)',
      'Water Rating': 'IP67 dust and water resistant'
    },
    description: 'AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another in your backpack. And just like that, they’re on your radar in the Find My app.',
    reviews: []
  },
  {
    id: 'magsafe-charger-2m',
    name: '25W MagSafe Charger (2m)',
    tagline: 'Up to 25W fast wireless charging for iPhone 16.',
    category: 'accessories',
    price: 49,
    monthlyPrice: 4.08,
    rating: 4.8,
    reviewCount: 4120,
    badge: 'POPULAR',
    stockUrgency: 'Frequently Bought with iPhone 16 Pro',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1622445268465-84288591e1d3?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Woven Braided White', hex: '#F0ECE8' }
    ],
    specs: {
      'Speed': 'Up to 25W fast charging when paired with 30W adapter',
      'Cable': '2-meter durable braided cable',
      'Compatibility': 'MagSafe iPhones, AirPods with wireless case, Qi2 devices'
    },
    description: 'The MagSafe Charger makes wireless charging a snap. The perfectly aligned magnets attach to your iPhone 16 or iPhone 15 for faster wireless charging up to 25W.',
    reviews: []
  },
  {
    id: 'magsafe-silicone-case-16pro',
    name: 'iPhone 16 Pro Silicone Case',
    tagline: 'Designed by Apple with Camera Control sapphire cap.',
    category: 'accessories',
    price: 49,
    monthlyPrice: 4.08,
    rating: 4.6,
    reviewCount: 2840,
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Star Fruit', hex: '#E9E47A' },
      { name: 'Ultramarine', hex: '#3C4983' },
      { name: 'Plum', hex: '#583647' },
      { name: 'Stone Gray', hex: '#A3A29E' },
      { name: 'Black', hex: '#1C1D1F' }
    ],
    specs: {
      'Material': 'Soft-touch silicone exterior with microfiber lining',
      'Feature': 'Conductive sapphire crystal cap for Camera Control button',
      'Charging': 'Built-in MagSafe alignment magnets'
    },
    description: 'Designed by Apple to complement iPhone 16 Pro, the Silicone Case with MagSafe is a delightful way to protect your iPhone while maintaining seamless access to Camera Control.',
    reviews: []
  },
  {
    id: 'apple-watch-series-10',
    name: 'Apple Watch Series 10',
    tagline: 'Thinnest watch ever. Biggest display screen.',
    category: 'watch',
    price: 399,
    originalPrice: 429,
    monthlyPrice: 33.25,
    rating: 4.8,
    reviewCount: 6810,
    badge: 'BEST SELLER',
    stockUrgency: 'Save $30 Instant Savings Today',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Jet Black', hex: '#0D0E10' },
      { name: 'Rose Gold', hex: '#E0B5A6' },
      { name: 'Silver Aluminum', hex: '#E3E4E5' },
      { name: 'Polished Titanium Slate', hex: '#3A3B3E' }
    ],
    specs: {
      'Display': 'Wide-angle OLED display, 40% brighter off-angle',
      'Thickness': '9.7mm thin — 10% thinner than Series 9',
      'Sensors': 'Sleep Apnea notifications, ECG, Depth gauge, Water temp sensor',
      'Fast Charge': '80% battery charge in just 30 minutes'
    },
    description: 'Series 10 is a landmark milestone for Apple Watch. Featuring our largest and most advanced display yet in our thinnest design ever, plus fast charging and sleep apnea notifications.',
    reviews: []
  }
];

export const FEATURED_BUNDLES: ProductBundle[] = [
  {
    id: 'bundle-iphone-creator',
    title: 'iPhone 16 Pro Pro-Creator Studio Bundle',
    tagline: 'Complete 4K Dolby Vision content setup in one click',
    mainProduct: PRODUCTS[0], // iPhone 16 Pro
    accessories: [
      PRODUCTS[9], // MagSafe Charger
      PRODUCTS[10] // Silicone Case
    ],
    regularTotal: 1097,
    bundlePrice: 1049,
    savings: 48
  },
  {
    id: 'bundle-mac-powerhouse',
    title: 'MacBook Air M3 Student & Nomad Bundle',
    tagline: 'Everything you need for campus or remote work productivity',
    mainProduct: PRODUCTS[2], // MacBook Air M3
    accessories: [
      PRODUCTS[6], // AirPods Pro 2
      PRODUCTS[8]  // AirTag 4-pack
    ],
    regularTotal: 1297,
    bundlePrice: 1199,
    savings: 98
  }
];

export const TRADE_IN_DEVICES = [
  { device: 'iPhone 15 Pro Max', maxValue: 650 },
  { device: 'iPhone 15 Pro', maxValue: 550 },
  { device: 'iPhone 15', maxValue: 420 },
  { device: 'iPhone 14 Pro Max', maxValue: 480 },
  { device: 'iPhone 14 Pro', maxValue: 400 },
  { device: 'iPhone 14', maxValue: 330 },
  { device: 'iPhone 13 Pro Max', maxValue: 380 },
  { device: 'iPhone 13 Pro', maxValue: 320 },
  { device: 'iPhone 13', maxValue: 260 },
  { device: 'iPhone 12 Pro', maxValue: 230 },
  { device: 'iPhone 12 / 11', maxValue: 180 }
];
