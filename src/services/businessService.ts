import { BusinessProfile } from '../types/business';
import { DEFAULT_BUSINESS_PROFILES } from '../data/defaultBusinesses';

const STORAGE_KEY = 'lumera_businesses_db';

/**
 * Encode an object to URL-safe base64 for portable standalone links
 */
export function encodeProfileToPayload(profile: BusinessProfile): string {
  try {
    const jsonStr = JSON.stringify(profile);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(jsonStr))));
  } catch (err) {
    console.error('Failed to encode profile payload', err);
    return '';
  }
}

/**
 * Decode a URL payload back into a BusinessProfile
 */
export function decodeProfileFromPayload(payload: string): BusinessProfile | null {
  try {
    const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(payload))));
    const parsed = JSON.parse(jsonStr);
    if (parsed && parsed.businessName && parsed.slug) {
      return parsed as BusinessProfile;
    }
  } catch (err) {
    console.warn('Could not decode URL payload', err);
  }
  return null;
}

/**
 * Load all stored profiles from localStorage with seed defaults fallback
 */
export function getAllBusinesses(): BusinessProfile[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge with defaults if any default is missing
        const slugs = new Set(parsed.map((p) => p.slug));
        const merged = [...parsed];
        for (const defaultProfile of DEFAULT_BUSINESS_PROFILES) {
          if (!slugs.has(defaultProfile.slug)) {
            merged.push(defaultProfile);
          }
        }
        return merged;
      }
    }
  } catch (err) {
    console.error('Failed to load businesses from storage', err);
  }

  // Initialize storage with defaults
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BUSINESS_PROFILES));
  } catch {
    // Ignore
  }
  return DEFAULT_BUSINESS_PROFILES;
}

/**
 * Retrieve a specific business by slug
 */
export function getBusinessBySlug(slug: string): BusinessProfile | null {
  // Check URL query parameters first (for portable links across devices)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const payload = urlParams.get('d');
    if (payload) {
      const decoded = decodeProfileFromPayload(payload);
      if (decoded && decoded.slug.toLowerCase() === slug.toLowerCase()) {
        // Cache to local storage so future visits remember it
        saveBusiness(decoded);
        // Clean URL in the browser bar so the user only sees /makeup/slug
        try {
          const cleanUrl = `${window.location.origin}/makeup/${slug}`;
          window.history.replaceState({}, '', cleanUrl);
        } catch {
          // Ignore
        }
        return decoded;
      }
    }
  }

  const all = getAllBusinesses();
  const found = all.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
  return found || null;
}

/**
 * Save or update a business profile
 */
export function saveBusiness(profile: BusinessProfile): BusinessProfile {
  const all = getAllBusinesses();
  const cleanSlug = profile.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
  const sanitized: BusinessProfile = {
    ...profile,
    slug: cleanSlug,
    updatedAt: new Date().toISOString()
  };

  const existingIndex = all.findIndex((b) => b.slug.toLowerCase() === cleanSlug);
  let updatedList: BusinessProfile[];

  if (existingIndex >= 0) {
    updatedList = [...all];
    updatedList[existingIndex] = sanitized;
  } else {
    updatedList = [sanitized, ...all];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }

  // Also notify background serverless API if available
  try {
    fetch('/api/demos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitized)
    }).catch(() => {
      // API endpoint is optional for static fallback
    });
  } catch {
    // Ignore fetch error
  }

  return sanitized;
}

/**
 * Delete a business profile
 */
export function deleteBusiness(slug: string): boolean {
  const all = getAllBusinesses();
  const filtered = all.filter((b) => b.slug.toLowerCase() !== slug.toLowerCase());

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to delete business', err);
    return false;
  }
}

/**
 * Validate and parse a raw JSON string for business profile structure
 */
export function validateBusinessJSON(jsonString: string): {
  valid: boolean;
  data?: Partial<BusinessProfile>;
  error?: string;
} {
  try {
    const data = JSON.parse(jsonString);

    if (!data || typeof data !== 'object') {
      return { valid: false, error: 'Input must be a valid JSON object.' };
    }

    if (!data.businessName || typeof data.businessName !== 'string') {
      return { valid: false, error: 'Missing or invalid required field: "businessName".' };
    }

    if (!data.slug || typeof data.slug !== 'string') {
      return { valid: false, error: 'Missing or invalid required field: "slug".' };
    }

    // Sanitize slug
    data.slug = data.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');

    if (!data.logoUrl || typeof data.logoUrl !== 'string') {
      return { valid: false, error: 'Missing or invalid required field: "logoUrl".' };
    }

    return { valid: true, data };
  } catch (err: any) {
    return { valid: false, error: `Invalid JSON syntax: ${err.message}` };
  }
}

/**
 * Generate shareable link
 * Defaults to clean, normal link: /makeup/{slug}
 * (Optional includePayload=true can be passed if a standalone offline link is ever needed)
 */
export function createShareableUrl(slug: string, profile?: BusinessProfile, includePayload: boolean = false): string {
  if (typeof window === 'undefined') return `/makeup/${slug}`;
  const origin = window.location.origin;

  // Only include portable payload if explicitly requested
  if (includePayload && profile) {
    const payload = encodeProfileToPayload(profile);
    if (payload) {
      return `${origin}/makeup/${slug}?d=${payload}`;
    }
  }

  return `${origin}/makeup/${slug}`;
}

/**
 * Generate TypeScript code snippet to paste into src/data/defaultBusinesses.ts
 */
export function getBusinessCodeSnippet(profile: BusinessProfile): string {
  return JSON.stringify(profile, null, 2) + ',';
}

/**
 * Export business profile as a downloadable JSON file
 */
export function exportBusinessJSON(profile: BusinessProfile) {
  const jsonStr = JSON.stringify(profile, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${profile.slug}-business-details.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get sample JSON template for users to copy or download
 */
export function getSampleBusinessJSON(): string {
  const sample: BusinessProfile = {
    slug: 'demo-client-name',
    businessName: 'Bellezza Luxury Bridal Studio',
    shortName: 'BELLEZZA',
    tagline: 'Sculpted Glamour for the Modern Bride',
    heroSubtitle: 'Master Bridal Makeup, Luxury Extensions & Hair Artistry',
    description: 'Bellezza Studio crafts signature high-definition bridal styling and radiant celebration looks designed to withstand tears, hugs, and 12-hour festivities with timeless poise.',
    logoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80',
    phone: '+91 98765 00000',
    whatsapp: '+91 98765 00000',
    email: 'contact@bellezzastudio.com',
    address: {
      street: 'Suite 204, Royal Palms Galleria, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
      landmark: 'Next to Grand Heritage Hotel'
    },
    hours: {
      weekdays: 'Tuesday – Saturday: 10:00 AM – 7:30 PM',
      weekends: 'Sunday: Prior Reservations & Bridal Trials',
      note: 'Complimentary Valet Parking Available'
    },
    socials: {
      instagram: 'bellezzabridal',
      facebook: 'bellezzabridal',
      whatsapp: '+919876500000',
      googleMapsUrl: 'https://maps.google.com'
    },
    theme: {
      accentColor: '#775a25',
      secondaryAccent: '#ffd796',
      currencySymbol: '₹'
    },
    createdAt: new Date().toISOString()
  };

  return JSON.stringify(sample, null, 2);
}
