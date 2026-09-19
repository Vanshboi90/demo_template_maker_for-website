import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ASSETS, CORE_OFFERINGS } from '../data';
import { useBusiness } from '../context/BusinessContext';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreWorkClick: () => void;
  onSelectOffering: (serviceName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookClick,
  onExploreWorkClick,
  onSelectOffering
}) => {
  const { business } = useBusiness();
  const heroRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const offeringsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Left Column elements stagger
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out'
          }
        );
      }

      // Right Column showcase scale & fade in
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, scale: 0.94, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: 0.15,
            ease: 'power3.out'
          }
        );
      }

      // Circular offerings stagger
      if (offeringsRef.current) {
        const items = offeringsRef.current.querySelectorAll('button');
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            delay: 0.35,
            ease: 'power2.out'
          }
        );
      }
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} id="home" className="relative w-full overflow-hidden bg-[#fdf9f4] pt-4 sm:pt-6 lg:pt-8 pb-8 lg:pb-10">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div ref={leftColRef} className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Top Monogram Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#ebe8e3] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#775a25] animate-pulse"></span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
                {business.businessName.toUpperCase()}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#140c0a] tracking-tight leading-[1.12] mb-4 font-normal">
              Enhance Your Beauty,{' '}
              <span className="italic font-normal text-[#775a25] block lg:inline">
                Your Way
              </span>
            </h1>

            {/* Editorial Lead Copy */}
            <p className="text-sm sm:text-base text-[#4e4543] font-light max-w-xl mb-6 leading-relaxed">
              {business.heroSubtitle || business.tagline || 'Professional makeup, bespoke hairstyling, and restorative aesthetic rituals curated around your individuality, timeless celebrations, and quiet inner radiance.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => onBookClick()}
                className="inline-flex items-center justify-center bg-[#2b211f] text-[#fdf9f4] px-7 py-3.5 rounded-lg text-[12px] font-semibold uppercase tracking-[0.16em] hover:bg-[#140c0a] hover:shadow-lg transition-all group cursor-pointer"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 ml-2 text-[#ffd796] group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onExploreWorkClick}
                className="inline-flex items-center justify-center bg-[#f7f3ee] text-[#140c0a] px-7 py-3.5 rounded-lg text-[12px] font-semibold uppercase tracking-[0.16em] hover:bg-[#e6e2dd] transition-all border border-[#2b211f]/5 cursor-pointer"
              >
                Explore Our Work
              </button>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div ref={rightColRef} className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] lg:aspect-[1.35] max-h-[360px] lg:max-h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-[#f1ede8] group">
              <img
                src={ASSETS.heroMain}
                alt={`${business.businessName} Signature Soft Glam Artistry`}
                className="w-full h-full object-cover object-[center_20%] transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a]/65 via-transparent to-transparent"></div>

              {/* Floating Overlay Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#fdf9f4]/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between border border-[#2b211f]/5">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#775a25]/10 flex items-center justify-center text-[#775a25] shrink-0">
                    <Sparkles className="w-5 h-5 text-[#775a25]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest text-[#775a25] uppercase">
                      Signature Aesthetic
                    </p>
                    <p className="font-serif text-lg sm:text-xl text-[#140c0a] font-medium">
                      Dewy Glow &amp; Soft Glam
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 bg-[#f1ede8] rounded-full text-[10px] font-semibold tracking-wider text-[#140c0a] uppercase border border-[#2b211f]/5">
                  Pune Atelier
                </span>
              </div>
            </div>

            {/* Decorative Background Ambient Element */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-[#ffd796]/35 rounded-full blur-3xl pointer-events-none -z-10"></div>
          </div>

        </div>

        {/* Offerings Highlights with Circular Images - Under Hero Section, Visible Without Scrolling */}
        <div ref={offeringsRef} className="mt-8 lg:mt-10 pt-6 border-t border-[#2b211f]/10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#775a25]"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#775a25]">
                Atelier Specialties
              </span>
            </div>
            <a
              href="#services"
              className="text-[11px] font-medium text-[#4e4543] hover:text-[#775a25] transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {CORE_OFFERINGS.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectOffering ? onSelectOffering(item.serviceKey) : onBookClick(item.serviceKey)}
                className="group flex items-center gap-3.5 p-2.5 sm:p-3 rounded-xl bg-[#f7f3ee]/80 hover:bg-[#f3ede5] border border-[#2b211f]/6 hover:border-[#775a25]/35 transition-all text-left shadow-xs hover:shadow-sm cursor-pointer"
              >
                {/* Circular image */}
                <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full p-0.5 border-2 border-[#775a25]/30 group-hover:border-[#775a25] transition-all shrink-0 bg-[#fdf9f4] shadow-xs group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-[13px] font-medium text-[#140c0a] group-hover:text-[#775a25] transition-colors truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#775a25] font-semibold mt-0.5">
                    {item.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
