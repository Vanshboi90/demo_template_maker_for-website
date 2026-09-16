import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Diamond, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseUs: React.FC = () => {
  const { business } = useBusiness();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#775a25]" />,
      title: 'Personalized',
      description: 'No cookie-cutter templates. Every look is custom-formulated to complement your distinctive skin tone, bone structure, and attire.'
    },
    {
      icon: <Diamond className="w-6 h-6 text-[#775a25]" />,
      title: 'Premium Kit',
      description: 'Exclusively curated luxury brands: Charlotte Tilbury, Dior, Estée Lauder, NARS, MAC, and Huda Beauty for radiant longevity.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#775a25]" />,
      title: 'Seasoned Hands',
      description: 'Over half a decade of haute bridal mastery, runway experience, and continuous refinement in contemporary beauty trends.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#775a25]" />,
      title: 'Serene Space',
      description: 'A tranquil studio ambience intentionally created to alleviate event jitters, with herbal refreshments and private bridal dressing suites.'
    }
  ];

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll('.pillar-card');
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 35, scale: 0.96 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
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
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-20 lg:py-24 bg-[#fdf9f4] overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
            THE {business.shortName?.toUpperCase() || business.businessName.toUpperCase()} STANDARD
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight mt-2 mb-4 font-normal">
            Why discerning clients choose us
          </h2>
        </div>

        {/* 4 Cards */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="pillar-card bg-[#f7f3ee] p-8 rounded-2xl flex flex-col items-start border border-[#2b211f]/5 hover:-translate-y-1 transition-transform duration-300 will-change-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ffffff] flex items-center justify-center mb-6 shadow-xs border border-[#2b211f]/5">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-2xl text-[#140c0a] mb-2 font-medium">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#4e4543] font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
