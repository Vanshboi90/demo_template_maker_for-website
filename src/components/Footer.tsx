import React, { useState } from 'react';
import { Sparkles, Scissors, Mail, ArrowRight } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

interface FooterProps {
  onNavClick: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const { business } = useBusiness();
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'charter' | null>(null);

  return (
    <>
      <footer className="w-full bg-[#f7f3ee] mt-16 border-t border-[#2b211f]/5">
        <div className="max-w-[1360px] mx-auto px-5 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            
            {/* 1. Brand Monogram */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 aspect-square rounded-full overflow-hidden bg-white border border-[#2b211f]/10 shrink-0 flex items-center justify-center shadow-xs">
                  <img
                    src={business.logoUrl}
                    alt={business.businessName}
                    className="w-full h-full aspect-square object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl text-[#140c0a] uppercase tracking-wider font-medium leading-tight">
                    {business.shortName || business.businessName}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[#775a25] uppercase font-semibold mt-0.5">
                    {business.tagline}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#4e4543] font-light max-w-xs leading-relaxed">
                {business.description}
              </p>
            </div>

            {/* 2. The Studio Links */}
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold text-[#140c0a] uppercase tracking-widest mb-1">
                The Studio
              </span>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick('#services');
                }}
                className="text-sm text-[#4e4543] font-light hover:text-[#140c0a] transition-colors"
              >
                Artisanal Services
              </a>
              <a
                href="#bridal-packages"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick('#bridal-packages');
                }}
                className="text-sm text-[#4e4543] font-light hover:text-[#140c0a] transition-colors"
              >
                Bridal Suites &amp; Trousseau
              </a>
              <a
                href="#our-work"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick('#our-work');
                }}
                className="text-sm text-[#4e4543] font-light hover:text-[#140c0a] transition-colors"
              >
                Editorial Lookbook
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick('#about');
                }}
                className="text-sm text-[#4e4543] font-light hover:text-[#140c0a] transition-colors"
              >
                Our Philosophy
              </a>
              <a
                href="/courses"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#775a25] font-medium hover:text-[#140c0a] transition-colors flex items-center gap-1.5 pt-1 border-t border-[#2b211f]/5"
              >
                <span>Academy &amp; Masterclasses</span>
                <span className="text-[9px] bg-[#775a25] text-white px-1.5 py-0.2 rounded font-bold">NEW</span>
              </a>
              <a
                href="/products"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#775a25] font-medium hover:text-[#140c0a] transition-colors"
              >
                Curated Boutique &amp; Kits
              </a>
            </div>

            {/* 3. Hours & Atelier */}
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold text-[#140c0a] uppercase tracking-widest mb-1">
                Hours &amp; Atelier
              </span>
              <div className="text-sm text-[#4e4543] font-light flex flex-col gap-1.5 leading-relaxed">
                <span>{business.hours.weekdays}</span>
                <span>{business.hours.weekends}</span>
                {business.hours.note && <span>{business.hours.note}</span>}
              </div>
              <span className="text-sm text-[#775a25] mt-1 font-medium">
                {business.address.street}, {business.address.city}
              </span>
            </div>

            {/* 4. Private Concierge */}
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold text-[#140c0a] uppercase tracking-widest mb-1">
                Private Concierge
              </span>
              <p className="text-sm text-[#4e4543] font-light leading-relaxed">
                Direct reservations, bridal trunk visits, and bespoke travel inquiries.
              </p>
              <a
                href="#book-appointment"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick('#book-appointment');
                }}
                className="text-[12px] uppercase tracking-wider font-semibold text-[#775a25] hover:text-[#140c0a] transition-colors flex items-center gap-1.5 mt-1"
              >
                <span>Inquire with Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-4 mt-2 text-[#775a25]">
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#services');
                  }}
                  className="hover:text-[#140c0a] transition-colors"
                  title="Artisanal Rituals"
                >
                  <Sparkles className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('#services');
                  }}
                  className="hover:text-[#140c0a] transition-colors"
                  title="Hair Artistry"
                >
                  <Scissors className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="hover:text-[#140c0a] transition-colors"
                  title="Email Us"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Legal Bar */}
          <div className="pt-8 border-t border-[#2b211f]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4e4543] font-light">
            <p>© {new Date().getFullYear()} {business.businessName}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setModalType('privacy')}
                className="hover:text-[#140c0a] transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setModalType('terms')}
                className="hover:text-[#140c0a] transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setModalType('charter')}
                className="hover:text-[#140c0a] transition-colors"
              >
                Client Charter
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Info Modal for Privacy / Terms / Charter */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140c0a]/60 backdrop-blur-xs">
          <div className="bg-[#fdf9f4] max-w-md w-full rounded-2xl p-6 shadow-2xl border border-[#2b211f]/10 relative">
            <h3 className="font-serif text-2xl text-[#140c0a] mb-2 font-medium capitalize">
              {modalType === 'privacy' && 'Privacy Policy'}
              {modalType === 'terms' && 'Terms of Service'}
              {modalType === 'charter' && 'Client Charter'}
            </h3>
            <p className="text-sm text-[#4e4543] leading-relaxed mb-6 font-light">
              {modalType === 'privacy' &&
                'At LUMÉRA, we prioritize your personal privacy. We never share your phone number, email, or bridal photography without your explicit written authorization.'}
              {modalType === 'terms' &&
                'Bridal appointments and large party glam bookings require a 20% advance retainer to secure date exclusivity with your lead senior artist. Free reschedule is available up to 7 days prior.'}
              {modalType === 'charter' &&
                'We pledge strict hygiene standards, zero compromise on sanitized brushes, authentic certified luxury cosmetics (Dior, Charlotte Tilbury, Estée Lauder), and a serene sanctuary.'}
            </p>
            <button
              onClick={() => setModalType(null)}
              className="w-full py-2.5 bg-[#2b211f] text-[#fdf9f4] text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#140c0a]"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </>
  );
};
