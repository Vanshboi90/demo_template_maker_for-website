export type ServiceCategory = 'all' | 'bridal' | 'party' | 'engagement' | 'hair' | 'skin' | 'nails';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  price: string;
  numericPrice: number;
  duration: string;
  tag: string;
  image?: string;
  imagePosition?: string;
  description: string;
  includes: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'bridal' | 'party' | 'engagement' | 'hair';
  categoryLabel: string;
  event: string;
  image: string;
  description?: string;
}

export interface BridalPackage {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  numericPrice: number;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location?: string;
  rating: number;
  quote: string;
  avatar?: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
}

export interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  fullName: string;
  phone: string;
  email?: string;
  occasion?: string;
  stylist?: string;
  notes?: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}
