import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PORTFOLIO_ITEMS } from '../data';
import { PortfolioItem } from '../types';
import { Eye, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioSectionProps {
  onOpenLightbox: (item: PortfolioItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenLightbox }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bridal' | 'party' | 'engagement' | 'hair'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'party', label: 'Party' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'hair', label: 'Hair' }
  ] as const;

  const filteredItems = activeTab === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeTab);

  const hasSectionEntered = useRef(false);

  // GSAP ScrollTrigger: ONLY trigger when user scrolls and reaches this section!
  useGSAP(
    () => {
      // Set initial states so cards don't flash or animate before reaching the section
      const cards = gridRef.current?.querySelectorAll('.portfolio-card');
      if (cards && !hasSectionEntered.current) {
        gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            hasSectionEntered.current = true;
          }
        }
      });

      // 1. Header elements stagger in
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out'
          }
        );
      }

      // 2. Filter tabs stagger in
      if (tabsRef.current) {
        tl.fromTo(
          tabsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out'
          },
          '-=0.4'
        );
      }

      // 3. Portfolio cards stagger in smoothly
      if (cards) {
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: {
              amount: 0.35,
              from: 'start'
            },
            ease: 'power3.out'
          },
          '-=0.3'
        );
      }
    },
    { scope: sectionRef }
  );

  // When user clicks a different filter tab AFTER reaching the section
  useGSAP(
    () => {
      if (hasSectionEntered.current && gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.portfolio-card');
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 25,
            scale: 0.96
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out',
            overwrite: 'auto'
          }
        );
      }
    },
    { dependencies: [activeTab], scope: sectionRef }
  );

  // Interactive 3D tilt effect on hover using GSAP
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 800,
      scale: 1.02,
      duration: 0.35,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out'
    });
  };

  return (
    <section ref={sectionRef} id="our-work" className="w-full py-20 lg:py-28 bg-[#fdf9f4] overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div ref={headerRef}>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
                OUR WORK
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffd796]/30 text-[10px] font-medium text-[#775a25]">
                <Sparkles className="w-3 h-3" />
                <span>Atelier Portfolio</span>
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight mt-2 font-normal">
              Looks we&apos;ve created
            </h2>
            <p className="text-base sm:text-lg text-[#4e4543] max-w-xl mt-2 font-light">
              Explore a curated selection of our bridal, party, and bespoke occasion transformations.
            </p>
          </div>

          {/* Filter Tabs */}
          <div ref={tabsRef} className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-[12px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#140c0a] text-[#fdf9f4] shadow-sm'
                      : 'bg-[#f1ede8] text-[#4e4543] hover:text-[#140c0a] hover:bg-[#e6e2dd]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid with GSAP animations */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 [perspective:1000px]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d' }}
              className="portfolio-card relative group overflow-hidden rounded-2xl bg-[#f1ede8] aspect-[3/4] shadow-sm hover:shadow-2xl cursor-pointer border border-[#2b211f]/8 will-change-transform"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* View detail quick button badge */}
              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#fdf9f4]/90 backdrop-blur-xs flex items-center justify-center text-[#140c0a] opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow">
                <Eye className="w-4 h-4 text-[#775a25]" />
              </div>

              {/* Permanent Gradient Scrim & Captions - ALWAYS VISIBLE */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a]/95 via-[#140c0a]/45 to-transparent p-5 sm:p-6 flex flex-col justify-end transition-all duration-300 group-hover:from-[#140c0a]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffd796]"></span>
                  <span className="text-[10px] uppercase tracking-widest text-[#ffd796] font-semibold">
                    {item.categoryLabel}
                  </span>
                </div>
                
                {/* Look Title */}
                <h4 className="font-serif text-lg sm:text-xl text-[#ffffff] font-normal leading-snug drop-shadow-xs group-hover:text-[#ffd796] transition-colors">
                  {item.title}
                </h4>

                {/* Event Location & Subtitle */}
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="text-xs text-[#e8e4e0] font-light">
                    {item.event}
                  </span>
                  <span className="text-[10px] text-[#ffd796]/90 uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>View Look</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
