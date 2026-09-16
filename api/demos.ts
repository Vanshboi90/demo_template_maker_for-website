// Vercel Serverless Function: /api/demos
export interface VercelRequest {
  method?: string;
  query: Record<string, any>;
  body: any;
  headers: Record<string, any>;
}

export interface VercelResponse {
  setHeader(name: string, value: string): this;
  status(code: number): this;
  json(data: any): void;
  end(): void;
}

// In-memory fallback
let memoryDemos: any[] = [
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
    description: 'AURA is an award-winning luxury bridal atelier dedicated to crafting ethereal looks for discerning brides.',
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
      whatsapp: '+919823456789'
    },
    theme: {
      accentColor: '#96482e',
      currencySymbol: '₹'
    },
    createdAt: '2025-02-15T00:00:00.000Z'
  }
];

// Optional Vercel KV / Upstash Redis helper
function getRedisCredentials(): { url?: string; token?: string } {
  const url =
    process.env.STORAGE_REST_API_URL ||
    process.env.STORAGE_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;

  const token =
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.STORAGE_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;

  return { url, token };
}

// Upstash Redis universal command caller
async function redisCommand(command: string, ...args: any[]): Promise<any> {
  const { url, token } = getRedisCredentials();
  if (!url || !token) return null;

  try {
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    const res = await fetch(cleanUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([command, ...args])
    });
    const data = await res.json();
    if (data && data.result) {
      if (typeof data.result === 'string') {
        try {
          return JSON.parse(data.result);
        } catch {
          return data.result;
        }
      }
      return data.result;
    }
  } catch (err) {
    console.error(`Redis ${command} error:`, err);
  }
  return null;
}

async function kvGet(key: string): Promise<any> {
  return await redisCommand('GET', key);
}

async function kvSet(key: string, value: any): Promise<boolean> {
  const str = typeof value === 'string' ? value : JSON.stringify(value);
  const result = await redisCommand('SET', key, str);
  return result === 'OK';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/demos
  if (req.method === 'GET') {
    const slug = req.query.slug as string;

    // Check Cloud Database if connected
    if (slug) {
      const kvResult = await kvGet(`demo:${slug.toLowerCase()}`);
      if (kvResult) {
        return res.status(200).json(kvResult);
      }

      const found = memoryDemos.find((d) => d.slug.toLowerCase() === slug.toLowerCase());
      if (found) {
        return res.status(200).json(found);
      }
      return res.status(404).json({ error: 'Demo not found' });
    }

    // Return list of all demos
    const cloudIndex = await kvGet('demos:index');
    if (cloudIndex && Array.isArray(cloudIndex) && cloudIndex.length > 0) {
      return res.status(200).json(cloudIndex);
    }

    return res.status(200).json(memoryDemos);
  }

  // POST /api/demos (Save or create demo)
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body || !body.slug || !body.businessName) {
        return res.status(400).json({ error: 'Invalid demo payload' });
      }

      const cleanSlug = body.slug.toLowerCase().trim();
      const updatedProfile = {
        ...body,
        slug: cleanSlug,
        updatedAt: new Date().toISOString()
      };

      // Save to Cloud KV if available
      await kvSet(`demo:${cleanSlug}`, updatedProfile);

      // Update memory cache
      const existingIndex = memoryDemos.findIndex(
        (d) => d.slug.toLowerCase() === cleanSlug
      );

      if (existingIndex >= 0) {
        memoryDemos[existingIndex] = updatedProfile;
      } else {
        memoryDemos.unshift(updatedProfile);
      }

      // Update cloud index
      await kvSet('demos:index', memoryDemos);

      return res.status(200).json({ success: true, demo: updatedProfile });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
