export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface BusinessHours {
  weekdays: string;
  weekends: string;
  note?: string;
}

export interface BusinessSocials {
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  googleMapsUrl?: string;
}

export interface BusinessTheme {
  accentColor?: string;
  secondaryAccent?: string;
  currencySymbol?: string;
}

export interface BusinessProfile {
  slug: string; // e.g. "demo01", "radhika-bridal"
  businessName: string; // e.g. "LUMÉRA Beauty Studio"
  shortName: string; // e.g. "LUMÉRA"
  tagline: string; // e.g. "Atelier of Bespoke Beauty"
  heroSubtitle?: string; // e.g. "Couture Bridal Artistry & Luxury Hair Styling"
  description: string; // e.g. "Curated bridal couture hair, luxury editorial makeup artistry..."
  logoUrl: string; // URL or Base64 data URL
  phone: string; // e.g. "+91 98765 43210"
  whatsapp?: string; // e.g. "+91 98765 43210"
  email: string; // e.g. "hello@lumerabeauty.com"
  address: BusinessAddress;
  hours: BusinessHours;
  socials: BusinessSocials;
  theme?: BusinessTheme;
  createdAt: string;
  updatedAt?: string;
}
