import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import { Sparkles, Scissors, Droplets, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onOpenDetails: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenDetails
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out'
          }
        );
      }

      if (cards) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out'
          },
          '-=0.3'
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="services" className="w-full py-20 lg:py-28 bg-[#f7f3ee] overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
            WHAT WE DO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight mt-2 mb-4 font-normal">
            Beauty services for every occasion
          </h2>
          <p className="text-base sm:text-lg text-[#4e4543] font-light leading-relaxed">
            From your grand wedding festivities to a special evening out, choose an artistry ritual orchestrated for the moment.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const hasImage = Boolean(service.image);

            return (
              <div
                key={service.id}
                className="service-card bg-[#ffffff] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group border border-[#2b211f]/5 will-change-transform"
              >
                {/* Visual Header or Icon Top */}
                {hasImage ? (
                  <div className="relative h-72 overflow-hidden bg-[#f1ede8]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: service.imagePosition || 'center 15%' }}
                    />
                    <span className="absolute top-4 left-4 bg-[#140c0a]/80 backdrop-blur-md text-[#fdf9f4] px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                      {service.tag}
                    </span>
                    <button
                      onClick={() => onOpenDetails(service)}
                      className="absolute top-4 right-4 bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#140c0a] p-2 rounded-full shadow transition-transform hover:scale-110"
                      title="View full service details"
                      aria-label={`View details for ${service.title}`}
                    >
                      <Info className="w-3.5 h-3.5 text-[#775a25]" />
                    </button>
                  </div>
                ) : (
                  <div className="p-6 sm:p-8 pb-0 flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#775a25]/10 flex items-center justify-center text-[#775a25]">
                      {index === 3 ? (
                        <Scissors className="w-6 h-6" />
                      ) : index === 4 ? (
                        <Droplets className="w-6 h-6" />
                      ) : (
                        <Sparkles className="w-6 h-6" />
                      )}
                    </div>
                    <button
                      onClick={() => onOpenDetails(service)}
                      className="text-[#775a25] hover:text-[#140c0a] p-2 rounded-full bg-[#f7f3ee] transition-colors"
                      title="View service details"
                      aria-label={`View details for ${service.title}`}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-2xl text-[#140c0a] font-medium leading-tight">
                        {service.title}
                      </h3>
                      <span className="text-[15px] font-semibold text-[#775a25] shrink-0 font-sans">
                        {service.price}
                      </span>
                    </div>
                    
                    <p className="text-sm text-[#4e4543] font-light leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Booking Trigger Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectService(service.title)}
                      className="w-full py-3 bg-[#f1ede8] text-[#140c0a] text-[12px] font-semibold uppercase tracking-wider rounded-lg hover:bg-[#140c0a] hover:text-[#fdf9f4] transition-colors duration-200"
                    >
                      Book {service.title}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
