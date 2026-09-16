import React from 'react';
import { ASSETS } from '../data';
import { useBusiness } from '../context/BusinessContext';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { business } = useBusiness();

  const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.pincode}`;
  const mapsLink = business.socials.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;

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

          {/* Right Map Card Visual */}
          <div className="lg:col-span-6 w-full">
            <div
              className="w-full h-96 lg:h-[450px] bg-cover bg-center rounded-2xl shadow-xl relative overflow-hidden border border-[#2b211f]/5 group"
              style={{ backgroundImage: `url('${ASSETS.mapCover}')` }}
            >
              <div className="absolute inset-0 bg-[#140c0a]/20 backdrop-blur-[0.5px]"></div>

              {/* Floating Landmark Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#fdf9f4]/95 backdrop-blur-md p-5 rounded-2xl shadow-lg flex items-center justify-between border border-[#2b211f]/5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#775a25] font-semibold">
                    {business.address.city} Landmark
                  </p>
                  <p className="text-[16px] font-semibold text-[#140c0a] mt-0.5">
                    {business.shortName || business.businessName} Atelier {business.address.city}
                  </p>
                  <p className="text-xs text-[#4e4543] font-light mt-0.5">
                    {business.hours.note || `${business.address.landmark || 'Valet Parking Available for Clients'}`}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#775a25]/15 flex items-center justify-center text-[#775a25]">
                  <MapPin className="w-5 h-5 text-[#775a25]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
