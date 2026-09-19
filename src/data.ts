import { ServiceItem, PortfolioItem, BridalPackage, TestimonialItem, Stylist } from './types';
import heroPortrait from './assets/images/hero_glam_portrait.webp';
import bridalThumb from './assets/images/bridal_makeup_thumb.webp';
import partyThumb from './assets/images/party_makeup_thumb.webp';
import hairThumb from './assets/images/hair_styling_thumb.webp';
import beautyThumb from './assets/images/beauty_rituals_thumb.webp';

// Dedicated, individual portfolio imagery
import portCrimsonBride from './assets/images/port_crimson_bride.webp';
import portChampagneDusk from './assets/images/port_champagne_dusk.webp';
import portDewyPastels from './assets/images/port_dewy_pastels.webp';
import portCoutureBun from './assets/images/port_couture_bun.webp';
import portTradGold from './assets/images/port_trad_gold.webp';
import portBronzeShimmer from './assets/images/port_bronze_shimmer.webp';
import portRoseRadiance from './assets/images/port_rose_radiance.webp';
import portHollywoodWaves from './assets/images/port_hollywood_waves.webp';
import bridalSpotlightMain from './assets/images/bridal_spotlight_main.webp';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1Vp3uD1YFay-Qf-khJr0Rr7SWTWSwDOAA-pBbop2o-jaM3EKB0Lce85jRrRgAcQ3uKjlILcE2OxnR56lDEfpOBAzd7PHqaXCP2Sk2Y9TmI7V3M1kM1UTNmZgMJg4LcnVR-DhqZusnTcgVFiaHrkgADOLbcsE7OycuHQ2_Bjth7DGdgmMbv4V2DJvBQPfxF5xTrTokutb4u0JCCBzT_j5sRyOwdM3-s3VhJYNWqbRsZPizyd9lvTdVJsnO2g',
  heroMain: heroPortrait,
  bridalMain: bridalSpotlightMain,
  engagementMain: portDewyPastels,
  thumbs: {
    bridal: bridalThumb,
    party: partyThumb,
    hair: hairThumb,
    beauty: beautyThumb,
  }
};

export interface CoreOffering {
  id: string;
  name: string;
  tag: string;
  image: string;
  serviceKey: string;
}

export const CORE_OFFERINGS: CoreOffering[] = [
  {
    id: 'bridal',
    name: 'Bridal Makeup',
    tag: 'Signature HD',
    image: bridalThumb,
    serviceKey: 'Bridal Makeup'
  },
  {
    id: 'party',
    name: 'Party Makeup',
    tag: 'Evening Glam',
    image: partyThumb,
    serviceKey: 'Party Makeup'
  },
  {
    id: 'hair',
    name: 'Hair Styling',
    tag: 'Couture Updos',
    image: hairThumb,
    serviceKey: 'Hair Styling'
  },
  {
    id: 'rituals',
    name: 'Beauty Rituals',
    tag: 'Skin & Care',
    image: beautyThumb,
    serviceKey: 'Facials & Skin Care'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'bridal-makeup',
    title: 'Bridal Makeup',
    category: 'bridal',
    price: 'From ₹8,000',
    numericPrice: 8000,
    duration: '2.5 - 3 Hours',
    tag: 'Couture Ritual',
    image: ASSETS.thumbs.bridal,
    imagePosition: 'center 15%',
    description: 'Timeless, high-definition camera-ready makeup tailored for your wedding rituals, lehenga hues, and enduring comfort.',
    includes: [
      'High-Definition (HD) waterproof foundation blend',
      'Customized silk mink lash placement',
      'Dupatta pleating, pinning & head veil setting',
      'Jewelry, mathapatti, and waistbelt stabilization',
      'Mini bridal touch-up kit for ceremony transitions'
    ]
  },
  {
    id: 'party-makeup',
    title: 'Party Makeup',
    category: 'party',
    price: 'From ₹2,500',
    numericPrice: 2500,
    duration: '1.5 Hours',
    tag: 'Evening Glam',
    image: ASSETS.thumbs.party,
    imagePosition: 'center 15%',
    description: 'Polished, luminous looks styled for receptions, galas, cocktails, and milestone celebrations.',
    includes: [
      'Luminous dewy skin preparation',
      'Smokey or soft shimmer eye artistry',
      'Feathered brow sculpting & natural lash lift',
      'Transfer-proof luxury lip styling',
      'Setting spray lock for 12+ hour wear'
    ]
  },
  {
    id: 'engagement-makeup',
    title: 'Engagement Makeup',
    category: 'engagement',
    price: 'From ₹4,000',
    numericPrice: 4000,
    duration: '2 Hours',
    tag: 'Pre-Wedding',
    image: portRoseRadiance,
    imagePosition: 'center 12%',
    description: 'Soft, sophisticated and dewy beauty designed for rings, daytime ceremonies, and intimate banquets.',
    includes: [
      'Micro-buffed natural skin finish',
      'Romantic pastel or neutral warm shimmer tones',
      'Premium lightweight flutter lashes',
      'Saree or gown draping assistance',
      'Delicate glow highlighting for photography'
    ]
  },
  {
    id: 'hair-styling',
    title: 'Hair Styling',
    category: 'hair',
    price: 'From ₹1,500',
    numericPrice: 1500,
    duration: '1 Hour',
    tag: 'Bespoke Coiffure',
    image: ASSETS.thumbs.hair,
    imagePosition: 'center 15%',
    description: 'From ethereal soft waves and Hollywood curls to intricate traditional floral updos, sculpted to stay intact all celebration long.',
    includes: [
      'Texture prep & heat-protective shield',
      'Hollywood waves, mermaid textures, or classic buns',
      'Fresh flower (gajra) & hairpin positioning',
      'Extensions matching & blending support',
      'All-day humidity resistance lock'
    ]
  },
  {
    id: 'facials-skin-care',
    title: 'Facials & Skin Care',
    category: 'skin',
    price: 'From ₹1,000',
    numericPrice: 1000,
    duration: '1 Hour',
    tag: 'Dermal Glow',
    image: ASSETS.thumbs.beauty,
    imagePosition: 'center 20%',
    description: 'Deep hydration, lymphatic sculpting, and radiance facials to prep, soothe, and recharge your natural skin canvas.',
    includes: [
      'Double enzyme botanical cleanse',
      'Gentle ultrasonic micro-exfoliation',
      'Rose quartz lymphatic drainage massage',
      'Hyaluronic & gold peptide sheet mask',
      'Antioxidant moisture seal & barrier balm'
    ]
  },
  {
    id: 'nails-beauty',
    title: 'Nails & Beauty',
    category: 'nails',
    price: 'From ₹800',
    numericPrice: 800,
    duration: '45 - 60 Mins',
    tag: 'Finishing Touch',
    image: portCrimsonBride,
    imagePosition: 'center 25%',
    description: 'Gel enhancements, French tips, bridal nail extensions, and flawless finishing touches for head-to-toe finesse.',
    includes: [
      'Cuticle conditioning and shaping',
      'Long-wear salon gel polish or chrome glaze',
      'Bridal extension art (matte, nude, or glitter accents)',
      'Nourishing almond oil massage',
      'Chip-free 3-week durability guarantee'
    ]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The Crimson Heirloom',
    category: 'bridal',
    categoryLabel: 'Bridal Artistry',
    event: 'Pune Wedding',
    image: portCrimsonBride,
    description: 'Traditional royal red lehenga look with architectural kohl eyes and pure 24k gold leaf skin radiance.'
  },
  {
    id: 'port-2',
    title: 'Champagne Dusk',
    category: 'party',
    categoryLabel: 'Party Glam',
    event: 'Reception Night',
    image: portChampagneDusk,
    description: 'High-impact editorial cocktail look with bronze lids, sculpted cheekbones, and velvet nude lips.'
  },
  {
    id: 'port-3',
    title: 'Dewy Pastels',
    category: 'engagement',
    categoryLabel: 'Engagement',
    event: 'Garden Ring Ceremony',
    image: portDewyPastels,
    description: 'Soft peach undertones, brushed brows, and fresh coral sheen perfectly balanced for daytime sunlight.'
  },
  {
    id: 'port-4',
    title: 'Couture Chignon',
    category: 'hair',
    categoryLabel: 'Hair Styling',
    event: 'Mogra & Pearls',
    image: portCoutureBun,
    description: 'Intricately coiled textured bun finished with fresh baby jasmine florets and custom pearl hairpins.'
  },
  {
    id: 'port-5',
    title: 'Traditional Gold Glow',
    category: 'bridal',
    categoryLabel: 'Bridal Artistry',
    event: 'Morning Mandap',
    image: portTradGold,
    description: 'Subtle South Indian Muhurtham styling with temple jewelry balance and waterproof matte HD skin.'
  },
  {
    id: 'port-6',
    title: 'Bronze Shimmer',
    category: 'party',
    categoryLabel: 'Party Glam',
    event: 'Sangeet Extravaganza',
    image: portBronzeShimmer,
    description: 'Sweat-resistant dance-ready glam with sparkling duo-chrome pigment and feathered winged liner.'
  },
  {
    id: 'port-7',
    title: 'Rose Quartz Radiance',
    category: 'engagement',
    categoryLabel: 'Engagement',
    event: 'Intimate Soiree',
    image: portRoseRadiance,
    description: 'Luminous glass-skin aesthetic paired with brushed soap brows and monochromatic rose lip stain.'
  },
  {
    id: 'port-8',
    title: 'Cascading Hollywood Waves',
    category: 'hair',
    categoryLabel: 'Hair Styling',
    event: 'Evening Gala',
    image: portHollywoodWaves,
    description: 'Flawlessly sculpted high-shine S-waves with voluminous roots that maintain body all evening.'
  }
];

export const BRIDAL_PACKAGES: BridalPackage[] = [
  {
    id: 'pkg-essential',
    title: 'Essential',
    subtitle: 'Classic Elegance',
    price: '₹12,000',
    numericPrice: 12000,
    description: 'Ideal for intimate celebrations, haldi ceremonies, or registered weddings seeking pristine elegance.',
    features: [
      'Bridal Makeup Artistry (Studio/HD)',
      'Tailored Hair Styling & Fresh Pinning',
      'Basic Saree / Dupatta Draping',
      'Premium Lashes Included',
      'Single Event Coordination'
    ]
  },
  {
    id: 'pkg-premium',
    title: 'Premium',
    subtitle: 'Signature Standard',
    price: '₹18,000',
    numericPrice: 18000,
    isPopular: true,
    description: 'Our most-requested look for the primary wedding ceremony or opulent sangeet evening.',
    features: [
      'Couture Bridal Makeup (HD Finish)',
      'Complex Bridal Hair & Floral Setting',
      'Designer Dupatta & Jewelry Pinning',
      'Silk Mink Lashes & Lens Assistance',
      'Bespoke Bridal Touch-Up Kit',
      'Virtual Pre-Event Consultation'
    ]
  },
  {
    id: 'pkg-luxury',
    title: 'Luxury',
    subtitle: 'Royal Masterpiece',
    price: '₹25,000',
    numericPrice: 25000,
    description: 'Uncompromising editorial perfection with airbrush artistry and complete styling trial session.',
    features: [
      'Ultra HD / Airbrush Bridal Finish',
      'Master Stylist & Hair Extensions Setting',
      'Premium Multi-Dupatta Draping',
      'Full In-Studio Pre-Wedding Trial Session',
      'Luxury Aftercare & Touch-Up Hamper',
      'On-site Touch-up Support Available'
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Priya S.',
    role: 'Bridal Client',
    location: 'Pune Wedding',
    rating: 5,
    quote: 'LUMÉRA made me look like the most radiant version of myself! My makeup held up flawlessly through emotional tears, endless photographs, and 8 hours under the lights. Truly an unforgettable experience.'
  },
  {
    id: 't-2',
    name: 'Ananya R.',
    role: 'Party Makeup Client',
    location: 'Reception Night',
    rating: 5,
    quote: 'I wanted glamorous cocktail party makeup that didn\'t feel heavy or cakey. The artist matched my skin undertone seamlessly and the eye makeup was pure magic. I got compliments all night!'
  },
  {
    id: 't-3',
    name: 'Meera K.',
    role: 'Engagement Client',
    location: 'Garden Ring Ceremony',
    rating: 5,
    quote: 'The consultation before my engagement look gave me so much peace of mind. They listened attentively to what I wanted and the hair styling was so romantic. Worth every single rupee.'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'stylist-maya',
    name: 'Maya Sen',
    role: 'Creative Director & Lead Haute Bridal',
    experience: '8+ Years Experience',
    specialty: 'Ultra-HD Bridal, Royal Dupatta Draping'
  },
  {
    id: 'stylist-rhea',
    name: 'Rhea Kapoor',
    role: 'Senior Hair & Couture Stylist',
    experience: '6+ Years Experience',
    specialty: 'Hollywood Waves, Intricate Floral Buns'
  },
  {
    id: 'stylist-aanya',
    name: 'Aanya Patel',
    role: 'Lead Aesthetic & Evening Glam Artist',
    experience: '5+ Years Experience',
    specialty: 'Glass Skin, Duo-chrome Cocktail Glam'
  }
];

export const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '07:00 PM'
];
