import fs from 'fs';
import path from 'path';

export interface VercelRequest {
  method?: string;
  query: Record<string, any>;
  body: any;
  headers: Record<string, any>;
}

export interface VercelResponse {
  setHeader(name: string, value: string): this;
  status(code: number): this;
  send(data: string): void;
  json(data: any): void;
  end(): void;
}

// Default in-memory business profiles
const fallbackDemos: Record<string, any> = {
  makeupshekupkolhapur: {
    slug: 'makeupshekupkolhapur',
    businessName: 'Makeup.shekup',
    shortName: 'MASH',
    tagline: 'Atelier of Bespoke Beauty',
    heroSubtitle: 'Couture Bridal Artistry & Luxury Hair Styling',
    description: 'Internationally Certified frm UK 🇬🇧 | PFW🇫🇷 DFW🇦🇪 LFW🇬🇧 | Backstage | Bridal | Educator 📍 Kolhapur UK Paris Dubai',
    logoUrl: '/logos/makeupshekup_logo.jpg'
  },
  demo01: {
    slug: 'demo01',
    businessName: 'LUMÉRA Beauty Studio',
    shortName: 'LUMÉRA',
    tagline: 'Atelier of Bespoke Beauty',
    heroSubtitle: 'Couture Bridal Artistry & Luxury Hair Styling',
    description: 'Bespoke bridal couture makeup, hairstyling, and restorative aesthetic rituals curated around timeless elegance in Pune.',
    logoUrl: '/logos/makeupshekup_logo.jpg'
  },
  demo02: {
    slug: 'demo02',
    businessName: 'AURA Bridal Couture',
    shortName: 'AURA',
    tagline: 'Timeless Elegance & Bridal Glow',
    heroSubtitle: 'Celebrity Makeup Artistry & Royal Draping Specialist',
    description: 'AURA is an award-winning luxury bridal atelier dedicated to crafting ethereal looks for discerning brides in Mumbai.',
    logoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80'
  }
};

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

async function kvGet(key: string): Promise<any> {
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
      body: JSON.stringify(['GET', key])
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
    console.error(`Redis GET error for key ${key}:`, err);
  }
  return null;
}

function escapeHtml(text?: string): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse target slug
  const rawSlug = (req.query.slug as string) || '';
  const cleanSlug = rawSlug.replace(/^\/+|\/+$/g, '').split('/')[0].toLowerCase().trim() || 'demo01';

  // 1. Fetch business profile from cloud KV or local cache
  let business: any = null;
  try {
    business = await kvGet(`demo:${cleanSlug}`);
  } catch {
    // Ignore KV error
  }

  if (!business) {
    business = fallbackDemos[cleanSlug];
  }

  // Fallback to default LUMÉRA profile if slug not recognized
  if (!business) {
    business = fallbackDemos['demo01'];
  }

  // Determine host and full URL
  const host =
    req.headers['x-forwarded-host'] ||
    req.headers['host'] ||
    'sanwal-tech-studio.vercel.app';
  const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
  const canonicalUrl = `${proto}://${host}/makeup/${cleanSlug}`;

  // Format meta fields
  const title = `${business.businessName} — ${business.tagline || 'Atelier of Bespoke Beauty'}`;
  const rawDesc = business.description || business.heroSubtitle || 'Bespoke bridal couture makeup, luxury hairstyling & aesthetic rituals.';
  const description = rawDesc.replace(/[\r\n]+/g, ' • ').trim();

  // Determine absolute image URL (WhatsApp requires absolute URL + under 300KB)
  let imageUrl = business.logoUrl || '/logos/makeupshekup_logo.jpg';
  if (imageUrl.startsWith('/')) {
    imageUrl = `${proto}://${host}${imageUrl}`;
  }

  // Try reading dist/index.html to inject into full SPA build
  let htmlTemplate = '';
  try {
    const distIndex = path.join(process.cwd(), 'dist', 'index.html');
    if (fs.existsSync(distIndex)) {
      htmlTemplate = fs.readFileSync(distIndex, 'utf-8');
    }
  } catch {
    // Ignore error
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  if (htmlTemplate) {
    // Inject dynamic meta tags into the real compiled SPA template
    let html = htmlTemplate;

    // Replace Title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

    // Replace or update description
    html = html.replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(description)}" />`
    );

    // Replace or update og:title
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(title)}" />`
    );

    // Replace or update og:description
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(description)}" />`
    );

    // Remove any existing tags that we are overriding to prevent duplicates
    html = html.replace(/<meta\s+property="og:image(?::secure_url|:alt|:width|:height)?"\s+content="[\s\S]*?"\s*\/?>/gi, '');
    html = html.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/gi, '');
    html = html.replace(/<meta\s+property="og:site_name"\s+content="[\s\S]*?"\s*\/?>/gi, '');
    html = html.replace(/<meta\s+name="twitter:(?:title|description|image|url)"\s+content="[\s\S]*?"\s*\/?>/gi, '');
    html = html.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/gi, '');

    // Inject full Open Graph and Twitter Card tags
    const dynamicTags = `
    <!-- Dynamic Social Share Metadata for ${escapeHtml(business.businessName)} -->
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:site_name" content="${escapeHtml(business.businessName)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:alt" content="${escapeHtml(business.businessName)}" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="600" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${escapeHtml(canonicalUrl)}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    `;

    html = html.replace('</head>', `${dynamicTags}\n  </head>`);
    return res.status(200).send(html);
  }

  // Standalone HTML fallback with full Open Graph tags and instant redirect
  const standaloneHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

    <!-- Open Graph / WhatsApp / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:site_name" content="${escapeHtml(business.businessName)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:alt" content="${escapeHtml(business.businessName)}" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="600" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${escapeHtml(canonicalUrl)}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />

    <!-- Client-side navigation if opened in browser -->
    <meta http-equiv="refresh" content="0;url=${escapeHtml(canonicalUrl)}" />
    <script>
      if (window.location.pathname.startsWith('/api/')) {
        window.location.replace('${escapeHtml(canonicalUrl)}');
      }
    </script>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #fdf9f4; color: #1c1c19; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; box-sizing: border-box;">
    <div style="max-width: 460px; width: 100%; text-align: center; background: #ffffff; border: 1px solid #eadecb; border-radius: 24px; padding: 40px 28px; box-shadow: 0 16px 40px rgba(0,0,0,0.06);">
      <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(business.businessName)}" style="width: 88px; height: 88px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 3px solid #f3e5d3; box-shadow: 0 6px 16px rgba(0,0,0,0.08);" />
      <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px 0; color: #140c0a;">${escapeHtml(business.businessName)}</h1>
      <p style="font-size: 14px; color: #775a25; font-weight: 600; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(business.tagline || 'Atelier of Bespoke Beauty')}</p>
      <p style="font-size: 13px; color: #6b6360; line-height: 1.6; margin: 0 0 28px 0;">${escapeHtml(description)}</p>
      <a href="${escapeHtml(canonicalUrl)}" style="display: inline-block; background: #2b211f; color: #fdf9f4; text-decoration: none; padding: 14px 32px; border-radius: 999px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; transition: background 0.2s;">Open ${escapeHtml(business.businessName)} Studio &rarr;</a>
    </div>
  </body>
</html>`;

  return res.status(200).send(standaloneHtml);
}
