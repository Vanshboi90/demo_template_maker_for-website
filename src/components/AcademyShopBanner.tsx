import React from 'react';
import { GraduationCap, ShoppingBag, ArrowRight, Sparkles, Award } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import bridalThumb from '../assets/images/bridal_makeup_thumb.webp';
import beautyThumb from '../assets/images/beauty_rituals_thumb.webp';

interface AcademyShopBannerProps {
  onOpenStore?: () => void;
}

export const AcademyShopBanner: React.FC<AcademyShopBannerProps> = ({ onOpenStore }) => {
  const { business } = useBusiness();

  const handleOpen = (e: React.MouseEvent) => {
    if (onOpenStore) {
      e.preventDefault();
      onOpenStore();
    }
  };

  return (
    <section className="w-full py-16 bg-[#ffffff] border-y border-[#2b211f]/6 relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1c1412] via-[#241a17] to-[#140c0a] text-white p-8 sm:p-12 lg:p-16 border border-[#ffd796]/20 shadow-2xl">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffd796]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b56d78]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd796]/10 border border-[#ffd796]/25 text-[#ffd796] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Education &amp; Boutique</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight mb-4">
                Masterclasses, Certified Diplomas &amp; Studio Formulations.
              </h2>

              <p className="text-sm sm:text-base text-[#d1c7bd] font-light leading-relaxed max-w-xl mb-8">
                Whether you want to master personal grooming in 10 days, launch an international bridal career with certified diplomas, or shop salon-tested 24K gold elixirs and bridal touch-up hampers — explore our dedicated store.
              </p>

              {/* 3 Pill Highlights */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#e8dfd8]">
                  <GraduationCap className="w-4 h-4 text-[#ffd796]" />
                  <span>5 Certified Courses</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#e8dfd8]">
                  <ShoppingBag className="w-4 h-4 text-[#ffd796]" />
                  <span>Curated Bridal Formulations</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#e8dfd8]">
                  <Award className="w-4 h-4 text-[#ffd796]" />
                  <span>PFW / DFW Accreditation</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOpen}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#ffd796] hover:bg-[#ffe3b3] text-[#140c0a] rounded-xl text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Courses &amp; Products</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <span className="text-xs text-[#9c8e84] font-light">
                  Opens dedicated academy catalog in a new window
                </span>
              </div>
            </div>

            {/* Right Mini Visual Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                
                {/* Visual Card 1: Course */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
                  <img
                    src={bridalThumb}
                    alt="Master Bridal Course"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: 'center 15%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#ffd796] block">
                      Academy Course
                    </span>
                    <span className="font-serif text-sm font-medium leading-tight block mt-0.5">
                      Airbrush Mastery
                    </span>
                    <span className="text-[11px] text-[#ffd796] font-semibold mt-0.5 block">
                      From ₹20,000
                    </span>
                  </div>
                </div>

                {/* Visual Card 2: Product */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-lg group mt-6">
                  <img
                    src={beautyThumb}
                    alt="24K Gold Elixir"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#ffd796] block">
                      Boutique Item
                    </span>
                    <span className="font-serif text-sm font-medium leading-tight block mt-0.5">
                      24K Gold Elixir
                    </span>
                    <span className="text-[11px] text-[#ffd796] font-semibold mt-0.5 block">
                      ₹1,850
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
