import bridalThumb from '../assets/images/bridal_makeup_thumb.webp';
import partyThumb from '../assets/images/party_makeup_thumb.webp';
import hairThumb from '../assets/images/hair_styling_thumb.webp';
import beautyThumb from '../assets/images/beauty_rituals_thumb.webp';
import portCrimsonBride from '../assets/images/port_crimson_bride.webp';
import portChampagneDusk from '../assets/images/port_champagne_dusk.webp';
import portDewyPastels from '../assets/images/port_dewy_pastels.webp';
import portCoutureBun from '../assets/images/port_couture_bun.webp';
import portBronzeShimmer from '../assets/images/port_bronze_shimmer.webp';
import portRoseRadiance from '../assets/images/port_rose_radiance.webp';
import aboutPortrait from '../assets/images/about_portrait.webp';

export interface CourseItem {
  id: string;
  type: 'course';
  title: string;
  tag: string;
  price: string;
  numericPrice: number;
  originalPrice?: string;
  duration: string;
  batches: string;
  level: string;
  rating: number;
  studentsCount: string;
  image: string;
  imagePosition?: string;
  description: string;
  syllabus: string[];
  features: string[];
  certification: string;
}

export interface ProductItem {
  id: string;
  type: 'product';
  title: string;
  tag: string;
  category: string;
  price: string;
  numericPrice: number;
  originalPrice?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  imagePosition?: string;
  inStock: boolean;
  badge?: string;
  description: string;
  details: string[];
  volumeOrWeight?: string;
}

export const ACADEMY_COURSES: CourseItem[] = [
  {
    id: 'course-self-makeup',
    type: 'course',
    title: 'Self Makeup & Vanity Masterclass',
    tag: 'Personal Grooming',
    price: '₹20,000',
    numericPrice: 20000,
    originalPrice: '₹25,000',
    duration: '10 Days (2 Hours/Day)',
    batches: 'Weekday & Weekend Batches Available',
    level: 'Beginner to Intermediate',
    rating: 4.9,
    studentsCount: '450+ Graduates',
    image: portRoseRadiance,
    imagePosition: 'center 15%',
    description: 'Transform your daily makeup routine and master show-stopping party glam tailored precisely to your facial anatomy, skin undertone, and lifestyle.',
    syllabus: [
      'Skin prep, hydration rituals & perfect foundation color matching',
      'Flawless lightweight dewy skin without cakiness or oxidation',
      'Daytime soft neutrals, winged liner & feathery brow sculpting',
      'Bollywood evening smokey eyes & duo-chrome shimmer lids',
      'Personal vanity audit: keeping only what works for your face'
    ],
    features: [
      '1-on-1 personalized instructor feedback daily',
      'Practice on your own facial canvas with premium studio products',
      'Lifetime access to product recommendation cheat sheets',
      'Atelier Certificate of Completion'
    ],
    certification: 'Certified Self-Grooming & Vanity Artistry Diploma'
  },
  {
    id: 'course-airbrush-bridal',
    type: 'course',
    title: 'Haute Bridal Artistry & Airbrush Mastery',
    tag: 'Bestseller Certification',
    price: '₹30,000',
    numericPrice: 30000,
    originalPrice: '₹40,000',
    duration: '3 Weeks Intensive',
    batches: 'Upcoming Batch: 1st & 15th Every Month',
    level: 'Intermediate to Aspiring Pro',
    rating: 5.0,
    studentsCount: '280+ Artists',
    image: bridalThumb,
    imagePosition: 'center 15%',
    description: 'Become a highly sought-after bridal artist. Master high-definition camera-ready bridal makeup, waterproof airbrush guns, and regal traditional draping.',
    syllabus: [
      'HD skin buffing & waterproof bridal base formulas for 16+ hours',
      'Airbrush compressor setup, nozzle control & micro-layering',
      'Smokey kohl eyes, cut-crease bridal pigment & lash placement',
      'Traditional South Indian Muhurtham & North Indian royal bride styles',
      'Architectural dupatta pleating, mathapatti & jewelry stabilization'
    ],
    features: [
      'Live model hands-on practice sessions in every class',
      'Airbrush kit provided during training hours',
      'Bridal vanity emergency kit formulation guide',
      'Master Bridal Certificate with international accreditation'
    ],
    certification: 'Master Certified Bridal & Airbrush Specialist'
  },
  {
    id: 'course-advance-makeup',
    type: 'course',
    title: 'Advanced Professional Makeup & Hair Academy',
    tag: 'Comprehensive Career Course',
    price: '₹90,000',
    numericPrice: 90000,
    originalPrice: '₹1,10,000',
    duration: '6 Weeks (Full Time / Hybrid)',
    batches: 'Limited to 8 Students per Cohort',
    level: 'Advanced / Career Launch',
    rating: 5.0,
    studentsCount: '190+ Working Pros',
    image: aboutPortrait,
    imagePosition: 'center 15%',
    description: 'The definitive curriculum for artists aspiring to open their own bridal studio, work on destination weddings, and command premium booking rates.',
    syllabus: [
      'Advanced color theory, undertone neutralization & skin anatomy',
      'Nauvari Marathi, Sabyasachi Royal, Punjabi, and Western Cocktail looks',
      'Editorial, red-carpet, and high-fashion photographic contouring',
      'Hollywood glamour waves, structured textured buns & floral coiffure',
      'Social media personal branding, pricing psychology & client contracts'
    ],
    features: [
      'High-end professional bridal kit guidance & trade discounts',
      'Professional photography shoot for student graduation portfolio',
      'Hands-on live wedding backstage shadowing opportunity',
      'Internationally recognized Atelier Artist Diploma'
    ],
    certification: 'Diploma in Advanced Professional Makeup & Hair Styling'
  },
  {
    id: 'course-master-pro',
    type: 'course',
    title: 'Master Professional Makeup Diploma (Full Career Launch)',
    tag: 'All-Inclusive Diploma',
    price: '₹1,50,000',
    numericPrice: 150000,
    originalPrice: '₹1,80,000',
    duration: '3 Months Immersion',
    batches: 'Quarterly Intake (Next: Next Month)',
    level: 'Master Class',
    rating: 5.0,
    studentsCount: '120+ Studio Owners',
    image: portCrimsonBride,
    imagePosition: 'center 18%',
    description: 'Our most comprehensive flagship diploma. From basic fundamentals to international fashion week runway techniques with a luxury professional kit included.',
    syllabus: [
      'Complete skincare biology, dermal preps & lymphatic sculpting',
      'Ultra-HD, Airbrush, Silicone, and Glass Skin finishing methodologies',
      '15 Distinct Regional & International Bridal & Reception Aesthetics',
      'Master Coiffure: Intricate braid structures, extensions & real floral craft',
      'Studio setup blueprint, wedding agency partnerships & marketing'
    ],
    features: [
      'Full Professional Student Makeup & Hair Kit Included to take home',
      '3 Dedicated model portfolio shoots with professional fashion photographers',
      'Guaranteed backstage placement on 2 real wedding projects',
      '1-on-1 business mentorship with Creative Director for 6 months post-grad'
    ],
    certification: 'Master Atelier International Artistry & Coiffure Diploma'
  },
  {
    id: 'course-bridal-hair',
    type: 'course',
    title: 'Couture Bridal Hair & Coiffure Masterclass',
    tag: 'Hair Specialization',
    price: '₹15,000',
    numericPrice: 15000,
    originalPrice: '₹22,000',
    duration: '1 Week Intensive (Monday – Saturday)',
    batches: 'Bi-Weekly Batches',
    level: 'All Experience Levels',
    rating: 4.8,
    studentsCount: '320+ Stylists',
    image: hairThumb,
    imagePosition: 'center 15%',
    description: 'Elevate your hair game. Learn to sculpt red-carpet Hollywood waves, modern textured chignons, and intricate bridal updos that withstand hours of celebration.',
    syllabus: [
      'Thermal styling science, heat shields & all-day curl longevity locks',
      'Sculpting high-gloss Hollywood waves with seamless volume',
      'Messy textured low bridal chignons & custom pearl pin anchoring',
      'Authentic fresh mogra / gajra weaving & heavy veil weight distribution',
      'Clip-in & tape-in human hair extensions blending & texturizing'
    ],
    features: [
      'Practice on professional mannequin heads and live models',
      'Hair accessories, thermal tools & styling sprays provided in studio',
      'Step-by-step video recap guides for lifetime reference',
      'Certificate in Haute Bridal Hair Styling'
    ],
    certification: 'Certified Haute Bridal Hair & Coiffure Specialist'
  }
];

export const BOUTIQUE_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-touchup-hamper',
    type: 'product',
    title: 'The Royal Bridal Touch-Up Hamper',
    tag: 'Bestseller',
    category: 'Bridal Essentials',
    price: '₹2,499',
    numericPrice: 2499,
    originalPrice: '₹3,200',
    rating: 4.9,
    reviewsCount: 185,
    image: portChampagneDusk,
    imagePosition: 'center 20%',
    inStock: true,
    badge: 'Must Have for Brides',
    description: 'A velvet keepsake clutch curated with every essential needed to keep your bridal glam pristine from morning pheras through late-night reception dances.',
    details: [
      '1x Transfer-proof velvet matte lip glaze (Custom shade selection)',
      '1x Mini 24-hour ultra-HD locking setting mist (50ml travel friendly)',
      '1x Bamboo charcoal oil-blotting papers (100 sheets)',
      '1x Premium ultra-soft teardrop velvet powder puff',
      '1x Emergency bindi, safety pin & dual-ended lash glue touch-up'
    ],
    volumeOrWeight: '5-Piece Luxury Set in Velvet Pouch'
  },
  {
    id: 'prod-gold-elixir',
    type: 'product',
    title: '24K Gold Leaf Radiance Elixir & Primer',
    tag: 'Studio Signature',
    category: 'Skincare & Primer',
    price: '₹1,850',
    numericPrice: 1850,
    originalPrice: '₹2,400',
    rating: 5.0,
    reviewsCount: 240,
    image: beautyThumb,
    imagePosition: 'center 20%',
    inStock: true,
    badge: 'Secret to Glass Skin',
    description: 'Suspended pure 24-karat gold flakes blended with cold-pressed rosehip and squalane oil. Imparts a lit-from-within glow without greasiness under foundation.',
    details: [
      'Infused with authentic 24k gold leaf and hyaluronic acid',
      'Primes skin texture for 12+ hour cake-free foundation wear',
      'Suitable for all Indian skin types (non-comedogenic formula)',
      'Can be mixed with foundation for extra luminous radiance'
    ],
    volumeOrWeight: '30ml Luxury Glass Dropper Bottle'
  },
  {
    id: 'prod-mink-lashes',
    type: 'product',
    title: 'Silk Mink Flutter Lashes (5-Pair Collector Set)',
    tag: 'Best Value',
    category: 'Eye Artistry',
    price: '₹1,299',
    numericPrice: 1299,
    originalPrice: '₹1,800',
    rating: 4.9,
    reviewsCount: 310,
    image: portRoseRadiance,
    imagePosition: 'center 15%',
    inStock: true,
    description: 'Feather-light reusable silk mink lash set with invisible cotton bands. Ranges from delicate daytime wisps to opulent high-drama bridal flutters.',
    details: [
      '5 versatile pairs: Everyday Flutter, Cat-Eye Bloom, Sangeet Glam, Royal Bride, Reception Doll',
      'Ultra-comfortable lightweight flexible cotton band',
      'Reusable up to 25 wears per pair with proper care',
      'Includes 1x latex-free waterproof clear lash adhesive (5ml)'
    ],
    volumeOrWeight: '5 Pairs + Adhesive Wand'
  },
  {
    id: 'prod-lip-glaze-trio',
    type: 'product',
    title: 'Transfer-Proof Velvet Matte Lip Glaze Trio',
    tag: 'Limited Edition',
    category: 'Lip Artistry',
    price: '₹1,650',
    numericPrice: 1650,
    originalPrice: '₹2,250',
    rating: 4.8,
    reviewsCount: 142,
    image: portBronzeShimmer,
    imagePosition: 'center 20%',
    inStock: true,
    description: 'Three universally flattering shades specifically formulated for warm South Asian undertones. Kiss-proof, food-proof, and comfortable velvet matte texture.',
    details: [
      'Shade 01: "Crimson Heirloom" (Deep royal bridal red)',
      'Shade 02: "Rose Quartz" (Romantic everyday mauve-rose)',
      'Shade 03: "Warm Chai" (Sculpted 90s nude-caramel)',
      'Infused with vitamin E and jojoba oil to prevent drying or cracking'
    ],
    volumeOrWeight: '3 x 4.5ml Tubes'
  },
  {
    id: 'prod-hair-accessories',
    type: 'product',
    title: 'Handcrafted Bridal Jasmine & Pearl Passa Set',
    tag: 'Artisan Craft',
    category: 'Hair Adornments',
    price: '₹999',
    numericPrice: 999,
    originalPrice: '₹1,400',
    rating: 4.9,
    reviewsCount: 98,
    image: portCoutureBun,
    imagePosition: 'center 18%',
    inStock: true,
    description: 'Bespoke hand-wired fresh-look jasmine buds and freshwater pearl hairpins crafted for opulent bridal chignons and sangeet braids.',
    details: [
      '1x Flexible architectural floral garland wrap',
      '6x Handcrafted pearl & crystal U-pins for bun detailing',
      'Tarnish-resistant gold wire with secure grip hooks',
      'Lightweight and comfortable for all-day ceremony wear'
    ],
    volumeOrWeight: '7-Piece Handcrafted Set in Gift Box'
  },
  {
    id: 'prod-locking-mist',
    type: 'product',
    title: 'Ultra-HD 24-Hour Shield Setting Mist',
    tag: 'Waterproof Shield',
    category: 'Setting Sprays',
    price: '₹1,450',
    numericPrice: 1450,
    originalPrice: '₹1,950',
    rating: 5.0,
    reviewsCount: 215,
    image: partyThumb,
    imagePosition: 'center 18%',
    inStock: true,
    description: 'Designed specifically for Indian weddings, sangeet dancefloors, and tropical heat. Creates an invisible, weightless shield that locks makeup in place.',
    details: [
      'Ultra-fine micro-aerosol spray nozzle prevents droplet marks',
      'Waterproof, sweat-proof, and cry-proof formula',
      'Alcohol-safe, infused with calming cucumber & green tea extract',
      'Translucent natural skin finish with zero sticky residue'
    ],
    volumeOrWeight: '120ml Spray Bottle'
  }
];
