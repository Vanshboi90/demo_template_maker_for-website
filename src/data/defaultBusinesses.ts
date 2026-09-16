import { BusinessProfile } from '../types/business';

export const DEFAULT_BUSINESS_PROFILES: BusinessProfile[] = [
  {
    slug: 'demo01',
    businessName: 'LUMÉRA Beauty Studio',
    shortName: 'LUMÉRA',
    tagline: 'Atelier of Bespoke Beauty',
    heroSubtitle: 'Couture Bridal Artistry & Luxury Hair Styling',
    description: 'At LUMÉRA, we believe makeup should enhance who you are, not conceal it. Our artists create personalized beauty looks that harmoniously complement your facial anatomy, distinct personality, and special occasion.',
    logoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1Vp3uD1YFay-Qf-khJr0Rr7SWTWSwDOAA-pBbop2o-jaM3EKB0Lce85jRrRgAcQ3uKjlILcE2OxnR56lDEfpOBAzd7PHqaXCP2Sk2Y9TmI7V3M1kM1UTNmZgMJg4LcnVR-DhqZusnTcgVFiaHrkgADOLbcsE7OycuHQ2_Bjth7DGdgmMbv4V2DJvBQPfxF5xTrTokutb4u0JCCBzT_j5sRyOwdM3-s3VhJYNWqbRsZPizyd9lvTdVJsnO2g',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'hello@lumerabeauty.com',
    address: {
      street: '123 Fashion Street, Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      landmark: 'Near Westin Hotel'
    },
    hours: {
      weekdays: 'Monday – Saturday: 10:00 AM – 8:00 PM',
      weekends: 'Sunday: Dedicated Bridal Consultations (By Appointment)',
      note: 'Valet Parking Available for Clients'
    },
    socials: {
      instagram: 'lumerabeautystudio',
      facebook: 'lumerabeautystudio',
      whatsapp: '+919876543210',
      googleMapsUrl: 'https://maps.google.com/?q=123+Fashion+Street+Koregaon+Park+Pune'
    },
    theme: {
      accentColor: '#775a25',
      secondaryAccent: '#ffd796',
      currencySymbol: '₹'
    },
    createdAt: '2025-01-01T00:00:00.000Z'
  },
  {
    slug: 'demo02',
    businessName: 'AURA Bridal Couture',
    shortName: 'AURA',
    tagline: 'Timeless Elegance & Bridal Glow',
    heroSubtitle: 'Celebrity Makeup Artistry & Royal Draping Specialist',
    description: 'AURA is an award-winning luxury bridal atelier dedicated to crafting ethereal looks for discerning brides. With an editorial eye and master-certified techniques, we bring royal grace to your wedding rituals.',
    logoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80',
    phone: '+91 98234 56789',
    whatsapp: '+91 98234 56789',
    email: 'appointments@aurabridal.com',
    address: {
      street: '45 Altamount Road, Cumballa Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400026',
      landmark: 'Opposite Royal Palace'
    },
    hours: {
      weekdays: 'Tuesday – Saturday: 10:30 AM – 8:30 PM',
      weekends: 'Sunday: Bridal Bookings & Masterclasses',
      note: 'Private VIP Bridal Suites'
    },
    socials: {
      instagram: 'aurabridalcouture',
      facebook: 'aurabridalcouture',
      whatsapp: '+919823456789',
      googleMapsUrl: 'https://maps.google.com/?q=Altamount+Road+Mumbai'
    },
    theme: {
      accentColor: '#96482e',
      secondaryAccent: '#ffb5a0',
      currencySymbol: '₹'
    },
    createdAt: '2025-02-15T00:00:00.000Z'
  },
  {
    slug: 'demo03',
    businessName: 'Velvet Rose Studio',
    shortName: 'VELVET ROSE',
    tagline: 'Modern Glamour & High-Definition Artistry',
    heroSubtitle: 'Editorial Red Carpet Makeup & International Haircraft',
    description: 'Velvet Rose Studio redefines modern luxury styling. Designed for brides who crave runway-ready perfection, long-lasting dewy skin, and bespoke coiffure.',
    logoUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&auto=format&fit=crop&q=80',
    phone: '+91 99100 11223',
    whatsapp: '+91 99100 11223',
    email: 'concierge@velvetrosestudio.in',
    address: {
      street: '18 Meherchand Market, Lodhi Colony',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110003',
      landmark: 'Near Lodhi Gardens'
    },
    hours: {
      weekdays: 'Monday – Saturday: 11:00 AM – 8:00 PM',
      weekends: 'Sunday: Prior Reservations Only',
      note: 'Destination Wedding Styling on Request'
    },
    socials: {
      instagram: 'velvetrosestudio',
      facebook: 'velvetrosestudio',
      whatsapp: '+919910011223',
      googleMapsUrl: 'https://maps.google.com/?q=Meherchand+Market+New+Delhi'
    },
    theme: {
      accentColor: '#6d4c41',
      secondaryAccent: '#e0b5a8',
      currencySymbol: '₹'
    },
    createdAt: '2025-03-01T00:00:00.000Z'
  }
];
