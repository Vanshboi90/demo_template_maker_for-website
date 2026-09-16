import React, { useState } from 'react';
import { BusinessProfile } from '../../types/business';
import {
  saveBusiness,
  validateBusinessJSON,
  getSampleBusinessJSON
} from '../../services/businessService';
import {
  X,
  Upload,
  FileJson,
  CheckCircle2,
  AlertCircle,
  Download,
  Image as ImageIcon,
  Sparkles,
  Palette
} from 'lucide-react';

interface CreateDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemoCreated: (created: BusinessProfile) => void;
  initialData?: BusinessProfile | null;
}

const COLOR_PRESETS = [
  { name: 'Royal Gold', hex: '#775a25' },
  { name: 'Terracotta Glam', hex: '#96482e' },
  { name: 'Velvet Mocha', hex: '#6d4c41' },
  { name: 'Rose Gold', hex: '#b56d78' },
  { name: 'Noir Luxe', hex: '#262626' }
];

export const CreateDemoModal: React.FC<CreateDemoModalProps> = ({
  isOpen,
  onClose,
  onDemoCreated,
  initialData
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'json'>('form');

  // Form State
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [businessName, setBusinessName] = useState(initialData?.businessName || '');
  const [shortName, setShortName] = useState(initialData?.shortName || '');
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [heroSubtitle, setHeroSubtitle] = useState(initialData?.heroSubtitle || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [street, setStreet] = useState(initialData?.address.street || '');
  const [city, setCity] = useState(initialData?.address.city || '');
  const [state, setState] = useState(initialData?.address.state || '');
  const [pincode, setPincode] = useState(initialData?.address.pincode || '');
  const [landmark, setLandmark] = useState(initialData?.address.landmark || '');
  const [weekdays, setWeekdays] = useState(initialData?.hours.weekdays || 'Monday – Saturday: 10:00 AM – 8:00 PM');
  const [weekends, setWeekends] = useState(initialData?.hours.weekends || 'Sunday: Bridal Consultations By Appointment');
  const [hoursNote, setHoursNote] = useState(initialData?.hours.note || 'Valet Parking Available for Clients');
  const [instagram, setInstagram] = useState(initialData?.socials.instagram || '');
  const [googleMapsUrl, setGoogleMapsUrl] = useState(initialData?.socials.googleMapsUrl || '');
  const [accentColor, setAccentColor] = useState(initialData?.theme?.accentColor || '#775a25');

  // JSON Tab State
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSuccess, setJsonSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle local image file upload (converts to base64 data URL)
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError('Image size exceeds 2MB limit. Please provide a smaller image or an image URL.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoUrl(event.target.result as string);
          setFormError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle JSON file upload
  const handleJsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setJsonInput(text);
        validateJson(text);
      };
      reader.readAsText(file);
    }
  };

  const validateJson = (text: string) => {
    if (!text.trim()) {
      setJsonError(null);
      setJsonSuccess(false);
      return;
    }
    const result = validateBusinessJSON(text);
    if (result.valid) {
      setJsonError(null);
      setJsonSuccess(true);
    } else {
      setJsonError(result.error || 'Invalid JSON format');
      setJsonSuccess(false);
    }
  };

  const handleDownloadSample = () => {
    const sample = getSampleBusinessJSON();
    const blob = new Blob([sample], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-studio-template.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // Form Submit / Push
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    if (!cleanSlug) {
      setFormError('Please enter a valid demo link slug (e.g. demo01, aura-studio)');
      return;
    }

    if (!businessName.trim()) {
      setFormError('Business name is required');
      return;
    }

    if (!logoUrl.trim()) {
      setFormError('Please upload a logo image or enter a valid logo URL');
      return;
    }

    const profile: BusinessProfile = {
      slug: cleanSlug,
      businessName: businessName.trim(),
      shortName: shortName.trim() || businessName.trim().split(' ')[0],
      tagline: tagline.trim() || 'Atelier of Bespoke Beauty',
      heroSubtitle: heroSubtitle.trim() || 'Couture Bridal Artistry & Luxury Hair Styling',
      description: description.trim() || `Welcome to ${businessName}. We provide bespoke bridal and celebration beauty services.`,
      logoUrl: logoUrl.trim(),
      phone: phone.trim() || '+91 98765 43210',
      whatsapp: whatsapp.trim() || phone.trim() || '+91 98765 43210',
      email: email.trim() || 'contact@studiomakeup.com',
      address: {
        street: street.trim() || 'Main Studio Road',
        city: city.trim() || 'City Center',
        state: state.trim() || 'State',
        pincode: pincode.trim() || '400001',
        landmark: landmark.trim() || ''
      },
      hours: {
        weekdays: weekdays.trim() || 'Mon – Sat: 10:00 AM – 8:00 PM',
        weekends: weekends.trim() || 'Sunday: By Prior Appointment',
        note: hoursNote.trim() || ''
      },
      socials: {
        instagram: instagram.trim().replace('@', ''),
        whatsapp: (whatsapp || phone).trim().replace(/[^0-9+]/g, ''),
        googleMapsUrl: googleMapsUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(street + ' ' + city)}`
      },
      theme: {
        accentColor: accentColor || '#775a25',
        currencySymbol: '₹'
      },
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = saveBusiness(profile);
    onDemoCreated(saved);
  };

  // JSON Submit / Push
  const handleJsonSubmit = () => {
    const result = validateBusinessJSON(jsonInput);
    if (!result.valid || !result.data) {
      setJsonError(result.error || 'Please provide valid JSON matching the schema.');
      return;
    }

    const d = result.data;
    const cleanSlug = d.slug!.toLowerCase().replace(/[^a-z0-9-_]/g, '-');

    const profile: BusinessProfile = {
      slug: cleanSlug,
      businessName: d.businessName!,
      shortName: d.shortName || d.businessName!.split(' ')[0],
      tagline: d.tagline || 'Atelier of Bespoke Beauty',
      heroSubtitle: d.heroSubtitle || 'Couture Bridal Artistry & Luxury Hair Styling',
      description: d.description || `Welcome to ${d.businessName}. Bespoke beauty services tailored for you.`,
      logoUrl: d.logoUrl!,
      phone: d.phone || '+91 98765 43210',
      whatsapp: d.whatsapp || d.phone || '+91 98765 43210',
      email: d.email || 'hello@clientstudio.com',
      address: {
        street: d.address?.street || '123 Atelier Way',
        city: d.address?.city || 'Mumbai',
        state: d.address?.state || 'Maharashtra',
        pincode: d.address?.pincode || '400001',
        landmark: d.address?.landmark || ''
      },
      hours: {
        weekdays: d.hours?.weekdays || 'Mon – Sat: 10:00 AM – 8:00 PM',
        weekends: d.hours?.weekends || 'Sunday: Dedicated Consultations',
        note: d.hours?.note || 'Valet Available'
      },
      socials: {
        instagram: d.socials?.instagram || '',
        facebook: d.socials?.facebook || '',
        whatsapp: d.socials?.whatsapp || d.whatsapp || '',
        googleMapsUrl: d.socials?.googleMapsUrl || ''
      },
      theme: {
        accentColor: d.theme?.accentColor || '#775a25',
        secondaryAccent: d.theme?.secondaryAccent || '#ffd796',
        currencySymbol: d.theme?.currencySymbol || '₹'
      },
      createdAt: d.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = saveBusiness(profile);
    onDemoCreated(saved);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#140c0a]/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fdf9f4] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#2b211f]/10 overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#2b211f]/10 flex items-center justify-between bg-[#f8f4ee]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#775a25]/10 text-[#775a25] flex items-center justify-center font-serif font-bold text-lg">
              ✨
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#140c0a] font-medium">
                {initialData ? 'Edit Client Demo' : 'Create New Client Demo'}
              </h3>
              <p className="text-xs text-[#736a67] mt-0.5">
                Separate database entry for business details &amp; logo only (images remain template)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-[#736a67] hover:text-[#140c0a] hover:bg-[#ece6de] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-4 border-b border-[#2b211f]/10 flex gap-4 bg-[#fdf9f4]">
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`pb-3 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors relative ${
              activeTab === 'form'
                ? 'text-[#775a25] border-b-2 border-[#775a25]'
                : 'text-[#736a67] hover:text-[#140c0a]'
            }`}
          >
            Manual Text Fields
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`pb-3 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'json'
                ? 'text-[#775a25] border-b-2 border-[#775a25]'
                : 'text-[#736a67] hover:text-[#140c0a]'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>Upload / Paste JSON</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {formError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* TAB 1: FORM INPUTS */}
          {activeTab === 'form' && (
            <form id="create-demo-form" onSubmit={handleFormSubmit} className="space-y-6">
              {/* Demo Slug & Link Preview */}
              <div className="p-4 rounded-xl bg-[#f5ede2]/50 border border-[#775a25]/20">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#775a25] mb-1.5">
                  Demo Slug / Unique ID *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#736a67] font-mono hidden sm:inline">
                    /makeup/
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="demo01 or client-name"
                    className="flex-1 px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/20 text-sm focus:outline-none focus:border-[#775a25] font-mono"
                  />
                </div>
                <p className="text-[11px] text-[#736a67] mt-1.5">
                  This will generate your client's personalized link: <span className="font-mono text-[#775a25]">.../makeup/{slug || 'demo01'}</span>
                </p>
              </div>

              {/* Logo (Only Image Requirement) */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a]">
                  Studio Logo * (URL or Upload Image)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-8 space-y-2">
                    <input
                      type="text"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/client-logo.png"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                    />
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eee7dd] hover:bg-[#e4dbce] text-xs font-medium text-[#140c0a] transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#775a25]" />
                        <span>Upload Logo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-[#736a67]">PNG, SVG, JPG (Max 2MB)</span>
                    </div>
                  </div>

                  {/* Logo Live Preview */}
                  <div className="sm:col-span-4 h-20 rounded-xl bg-white border border-[#2b211f]/15 flex items-center justify-center p-2 overflow-hidden">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Logo preview"
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-[#a89f9b] text-[10px]">
                        <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                        <span>Logo Preview</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                      if (!shortName) setShortName(e.target.value.split(' ')[0]);
                    }}
                    placeholder="e.g. Aura Bridal Artistry"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    Short Name / Monogram
                  </label>
                  <input
                    type="text"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    placeholder="e.g. AURA"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
              </div>

              {/* Taglines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    Tagline / Slogan
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Atelier of Bespoke Beauty"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    Hero Subtitle
                  </label>
                  <input
                    type="text"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    placeholder="e.g. Couture Bridal Artistry & Luxury Hair Styling"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                  About the Studio / Brand Philosophy
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your artists, bespoke technique, skin philosophy, and styling approach..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                />
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@studio.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a]">
                  Studio Address &amp; Location
                </span>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street / Suite / Building Address"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City (e.g. Pune)"
                    className="px-3.5 py-2 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="px-3.5 py-2 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode"
                    className="px-3.5 py-2 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Landmark (Optional)"
                    className="px-3.5 py-2 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
              </div>

              {/* Timings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    Weekday Hours
                  </label>
                  <input
                    type="text"
                    value={weekdays}
                    onChange={(e) => setWeekdays(e.target.value)}
                    placeholder="Mon – Sat: 10:00 AM – 8:00 PM"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    Weekend / Sunday Hours
                  </label>
                  <input
                    type="text"
                    value={weekends}
                    onChange={(e) => setWeekends(e.target.value)}
                    placeholder="Sunday: Dedicated Bridal Consultations"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                  />
                </div>
              </div>

              {/* Socials & Theme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1">
                    Instagram Handle
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-[#eee7dd] text-sm text-[#736a67] rounded-l-lg border border-r-0 border-[#2b211f]/15">
                      @
                    </span>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value.replace('@', ''))}
                      placeholder="studioinstagram"
                      className="w-full px-3.5 py-2.5 rounded-r-lg bg-white border border-[#2b211f]/15 text-sm focus:outline-none focus:border-[#775a25]"
                    />
                  </div>
                </div>

                {/* Color Scheme */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#775a25]" />
                    <span>Brand Accent Color</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {COLOR_PRESETS.map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setAccentColor(col.hex)}
                        title={col.name}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          accentColor === col.hex ? 'scale-110 border-[#140c0a] shadow' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      />
                    ))}
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                      title="Custom color"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: JSON INPUT / UPLOAD */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              {/* File Drag & Drop / Upload & Sample Download */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[#f5ede2]/60 border border-[#775a25]/20">
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2b211f] text-[#fdf9f4] text-xs font-semibold uppercase tracking-wider hover:bg-[#140c0a] transition-colors shadow-sm">
                    <Upload className="w-4 h-4" />
                    <span>Upload JSON File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleJsonFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-[#736a67]">Or paste raw JSON below</span>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#2b211f]/15 text-xs text-[#140c0a] font-medium hover:bg-[#eee7dd] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#775a25]" />
                  <span>Download Sample JSON Template</span>
                </button>
              </div>

              {/* Status Banner */}
              {jsonSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Valid business JSON detected! Ready to push and create link.</span>
                </div>
              )}
              {jsonError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{jsonError}</span>
                </div>
              )}

              {/* Textarea */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#140c0a] mb-1.5">
                  Raw JSON Definition
                </label>
                <textarea
                  rows={14}
                  value={jsonInput}
                  onChange={(e) => {
                    setJsonInput(e.target.value);
                    validateJson(e.target.value);
                  }}
                  placeholder={`{\n  "slug": "demo01",\n  "businessName": "Studio Name",\n  "logoUrl": "https://...",\n  "phone": "+91 ..."\n}`}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#2b211f]/20 font-mono text-xs text-[#140c0a] focus:outline-none focus:border-[#775a25] leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Action Bar */}
        <div className="px-6 py-4 border-t border-[#2b211f]/10 bg-[#f8f4ee] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#736a67]">
            Creates personalized link: <span className="font-mono font-medium text-[#140c0a]">/makeup/{slug || 'slug'}</span>
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border border-[#2b211f]/20 text-xs uppercase font-semibold text-[#140c0a] hover:bg-[#ece6de] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={activeTab === 'form' ? () => {
                const form = document.getElementById('create-demo-form') as HTMLFormElement;
                if (form) form.requestSubmit();
              } : handleJsonSubmit}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#2b211f] text-[#fdf9f4] text-xs uppercase font-semibold tracking-wider hover:bg-[#140c0a] shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#ffd796]" />
              <span>{initialData ? 'Update & Save' : 'Push & Create Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
