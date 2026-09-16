import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ASSETS } from '../data';
import { CheckCircle2, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BridalSpotlightProps {
  onExplorePackages: () => void;
  onBookBridal?: () => void;
}

export const BridalSpotlight: React.FC<BridalSpotlightProps> = ({ onExplorePackages, onBookBridal }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const bridalChecklist = [
    'Personalized 1-on-1 Look Consultation',
    'Couture HD Makeup & Structural Hair Art',
    'Ultra-Luxury International Skincare & Cosmetics',
    'Mink Lashes, Dupatta Draping & Jewelry Setting',
    'Emergency Touch-Up Kit & Bridal Guidance'
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      });

      if (leftColRef.current) {
        tl.fromTo(
          leftColRef.current,
          { opacity: 0, x: -35, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: 'power3.out' }
        );
      }

      if (rightColRef.current) {
        tl.fromTo(
          rightColRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
          '-=0.5'
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-20 lg:py-28 bg-[#ffdad9]/25 relative border-y border-[#2b211f]/5 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Bridal Portrait Frame */}
          <div ref={leftColRef} className="lg:col-span-6 relative">
            <div className="aspect-[3/4] max-h-[640px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#f1ede8] border border-[#2b211f]/5">
              <img
                src={ASSETS.bridalMain}
                alt="Indian Bride in Heritage Finery"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Corner Luxury Accent Badge */}
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-[#fdf9f4] px-6 py-4 rounded-xl shadow-xl border border-[#2b211f]/5">
              <span className="font-serif text-xl sm:text-2xl text-[#140c0a] font-medium block">
                Haute Bridal Atelier
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#775a25] font-semibold block mt-0.5">
                Pune • Destination
              </span>
            </div>
          </div>

          {/* Right Bridal Information */}
          <div ref={rightColRef} className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-px w-8 bg-[#775a25]"></span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#775a25] uppercase">
                THE BRIDAL EXPERIENCE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight leading-tight mb-6 font-normal">
              Your wedding look, thoughtfully created.
            </h2>

            <p className="text-base sm:text-lg text-[#4e4543] mb-8 leading-relaxed font-light">
              Your wedding day deserves more than a mere cosmetic appointment. We take the time to deeply understand your heirloom jewelry, embroidery details, lighting schedule, and aesthetic dreams to craft a look that feels genuinely royal and entirely you.
            </p>

            {/* Checklist */}
            <div className="space-y-3 mb-10 w-full">
              {bridalChecklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-[#ffffff]/80 backdrop-blur-xs px-4 py-3 rounded-xl border border-[#2b211f]/5 shadow-2xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#775a25] shrink-0" />
                  <span className="text-sm sm:text-[15px] text-[#140c0a] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onBookBridal || onExplorePackages}
                className="inline-flex items-center justify-center gap-3 bg-[#2b211f] text-[#fdf9f4] px-8 py-4 rounded-lg text-[12px] font-semibold uppercase tracking-widest hover:bg-[#140c0a] transition-all shadow-md cursor-pointer"
              >
                <span>Book Bridal Makeup</span>
                <span className="text-[#ffd796] font-bold">•</span>
                <span className="text-xs text-[#ffd796] capitalize font-normal font-sans">From ₹8,000</span>
              </button>
              <button
                onClick={onExplorePackages}
                className="inline-flex items-center justify-center gap-2 bg-[#ffffff] text-[#140c0a] px-6 py-4 rounded-lg text-[12px] font-semibold uppercase tracking-widest hover:bg-[#f7f3ee] transition-all border border-[#2b211f]/10 cursor-pointer"
              >
                <span>Explore Packages</span>
                <ArrowDown className="w-4 h-4 text-[#775a25]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
