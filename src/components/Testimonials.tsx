import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TESTIMONIALS } from '../data';
import { useBusiness } from '../context/BusinessContext';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const { business } = useBusiness();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 35, scale: 0.96 });
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
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
        );
      }

      if (cards) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          '-=0.3'
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-20 lg:py-28 bg-[#f7f3ee] border-y border-[#2b211f]/5 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
            CLIENT LOVE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight mt-2 mb-4 font-normal">
            Words from our beautiful clients
          </h2>
          <p className="text-base sm:text-lg text-[#4e4543] font-light leading-relaxed">
            Real stories from brides and celebratory guests who trusted {business.shortName || business.businessName} with their cherished moments.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="testimonial-card bg-[#ffffff] p-8 rounded-2xl shadow-xs flex flex-col justify-between border border-[#2b211f]/5 hover:shadow-md transition-shadow will-change-transform"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#775a25] mb-5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#775a25] text-[#775a25]" />
                  ))}
                </div>

                <p className="text-base sm:text-[17px] text-[#140c0a] italic font-serif leading-relaxed mb-6 font-normal">
                  &ldquo;{review.quote.replace(/LUMÉRA/g, business.shortName || business.businessName)}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#2b211f]/5">
                <h4 className="text-[16px] font-semibold text-[#140c0a] tracking-wide">
                  {review.name}
                </h4>
                <span className="text-[10px] uppercase tracking-widest text-[#775a25] font-medium block mt-0.5">
                  {review.role} • {review.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
