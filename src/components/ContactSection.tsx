import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { business } = useBusiness();

  const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.pincode}`;
  const mapsLink = business.socials.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;

  const getEmbedMapUrl = () => {
    if (business.socials.googleMapsUrl) {
      try {
        const urlObj = new URL(business.socials.googleMapsUrl);
        const q = urlObj.searchParams.get('q');
        if (q && q.trim()) {
          return `https://maps.google.com/maps?q=${encodeURIComponent(q.trim())}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
        }
      } catch {
        // Fall through
      }
    }
    const query = [business.address.street, business.address.city, business.address.state]
      .filter(Boolean)
      .join(', ');
    return `https://maps.google.com/maps?q=${encodeURIComponent(query || business.address.city || 'India')}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <section id="contact" className="w-full py-20 lg:py-28 bg-[#f7f3ee] border-t border-[#2b211f]/5">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Contact Info Details */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
              FIND US
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight mt-2 mb-8 font-normal">
              Visit the Studio
            </h2>

            <div className="space-y-4 w-full mb-8">
              {/* Location Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#ffffff] border border-[#2b211f]/5 shadow-xs">
                <div className="p-2 rounded-xl bg-[#775a25]/10 text-[#775a25] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#140c0a]">Studio Location</h4>
                  <p className="text-sm text-[#4e4543] font-light mt-0.5 leading-relaxed">
                    {fullAddress}
                  </p>
                </div>
              </div>

              {/* Timings Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#ffffff] border border-[#2b211f]/5 shadow-xs">
                <div className="p-2 rounded-xl bg-[#775a25]/10 text-[#775a25] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#140c0a]">Studio Timings</h4>
                  <p className="text-sm text-[#4e4543] font-light mt-0.5">
                    {business.hours.weekdays}
                  </p>
                  <p className="text-sm text-[#4e4543] font-light">
                    {business.hours.weekends}
                  </p>
                </div>
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#ffffff] border border-[#2b211f]/5 shadow-xs">
                  <div className="p-2 rounded-xl bg-[#775a25]/10 text-[#775a25] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#140c0a]">Direct Line</h4>
                    <a
                      href={`tel:${business.phone.replace(/\s+/g, '')}`}
                      className="text-sm text-[#775a25] hover:underline mt-0.5 block font-medium"
                    >
                      {business.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#ffffff] border border-[#2b211f]/5 shadow-xs">
                  <div className="p-2 rounded-xl bg-[#775a25]/10 text-[#775a25] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#140c0a]">Email Atelier</h4>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-sm text-[#775a25] hover:underline mt-0.5 block font-medium"
                    >
                      {business.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Get Directions CTA */}
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#140c0a] text-[#fdf9f4] rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#2b211f] transition-colors shadow-sm"
            >
              <Navigation className="w-4 h-4 text-[#ffd796]" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Right Embedded Google Map */}
          <div className="lg:col-span-6 w-full">
            <div className="w-full h-96 lg:h-[480px] rounded-2xl shadow-xl relative overflow-hidden border border-[#2b211f]/10 group bg-[#f1ede8]">
              <iframe
                src={getEmbedMapUrl()}
                title={`${business.businessName} Studio Google Map`}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Landmark / Studio Card */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-[#fdf9f4]/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 border border-[#2b211f]/10 pointer-events-auto">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#775a25] font-semibold">
                    {business.address.city} Landmark
                  </p>
                  <p className="text-[15px] font-semibold text-[#140c0a] mt-0.5">
                    {business.shortName || business.businessName}
                  </p>
                  <p className="text-xs text-[#4e4543] font-light mt-0.5">
                    {business.address.landmark || business.hours.note || `${business.address.street}, ${business.address.city}`}
                  </p>
                </div>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#775a25] text-white flex items-center justify-center shadow hover:bg-[#140c0a] transition-colors shrink-0"
                  title="Open in Google Maps"
                  aria-label="Open in Google Maps"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
