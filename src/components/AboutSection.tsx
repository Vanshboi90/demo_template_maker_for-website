import React from 'react';
import { Palette, Award, Diamond, ArrowRight } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

interface AboutSectionProps {
  onExploreServices: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreServices }) => {
  const { business } = useBusiness();

  return (
    <section id="about" className="w-full py-20 lg:py-28 bg-[#ffffff] border-t border-[#2b211f]/5">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Dual Visual Montage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#f1ede8] border border-[#2b211f]/5">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80"
                alt={`${business.businessName} Editorial Portrait Craft`}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -left-2 sm:left-4 bg-[#fdf9f4] p-5 rounded-2xl shadow-xl border border-[#2b211f]/5 max-w-[220px]">
              <span className="font-serif text-3xl font-semibold text-[#775a25] block">
                8+
              </span>
              <span className="text-[12px] font-semibold text-[#140c0a] uppercase tracking-wider block mt-0.5">
                Years of Artistry
              </span>
              <p className="text-[11px] text-[#4e4543] font-light mt-1">
                Refining bespoke celebrations and bridal poise.
              </p>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-px w-8 bg-[#775a25]"></span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#775a25] uppercase">
                ABOUT {business.shortName?.toUpperCase() || business.businessName.toUpperCase()}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight leading-tight mb-6 font-normal">
              Beauty that feels uniquely yours.
            </h2>

            <p className="text-base sm:text-lg text-[#4e4543] leading-relaxed mb-4 font-light">
              {business.description || `At ${business.businessName}, we believe makeup should enhance who you are, not conceal it. Our artists create personalized beauty looks that harmoniously complement your facial anatomy, distinct personality, and special occasion.`}
            </p>

            <p className="text-sm sm:text-base text-[#4e4543] leading-relaxed mb-8 font-light">
              From intimate private celebrations to your most sacred bridal vows, every appointment is intentionally crafted to feel serene, conversational, and beautifully considered.
            </p>

            {/* 3 Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-9">
              <div className="bg-[#f7f3ee] p-4 rounded-xl flex flex-col items-start border border-[#2b211f]/5">
                <Palette className="w-6 h-6 text-[#775a25] mb-2" />
                <span className="text-[15px] font-semibold text-[#140c0a] mb-0.5">Tailored</span>
                <span className="text-[11px] text-[#4e4543] uppercase tracking-wider">Personalized Looks</span>
              </div>

              <div className="bg-[#f7f3ee] p-4 rounded-xl flex flex-col items-start border border-[#2b211f]/5">
                <Award className="w-6 h-6 text-[#775a25] mb-2" />
                <span className="text-[15px] font-semibold text-[#140c0a] mb-0.5">Couture</span>
                <span className="text-[11px] text-[#4e4543] uppercase tracking-wider">Pro Luxury Brands</span>
              </div>

              <div className="bg-[#f7f3ee] p-4 rounded-xl flex flex-col items-start border border-[#2b211f]/5">
                <Diamond className="w-6 h-6 text-[#775a25] mb-2" />
                <span className="text-[15px] font-semibold text-[#140c0a] mb-0.5">Artistry</span>
                <span className="text-[11px] text-[#4e4543] uppercase tracking-wider">Senior Stylists</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onExploreServices}
              className="inline-flex items-center gap-3 bg-[#2b211f] text-[#fdf9f4] px-7 py-3.5 rounded-lg text-[12px] font-semibold uppercase tracking-[0.16em] hover:bg-[#140c0a] transition-colors shadow-sm"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-[#ffd796]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
