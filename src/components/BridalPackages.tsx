import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BRIDAL_PACKAGES } from '../data';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BridalPackagesProps {
  onSelectPackage: (packageTitle: string) => void;
}

export const BridalPackages: React.FC<BridalPackagesProps> = ({ onSelectPackage }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll('.package-card');
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 45, scale: 0.96 });
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
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out'
          },
          '-=0.3'
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="bridal-packages" className="w-full py-20 lg:py-28 bg-[#fdf9f4] overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
            BRIDAL PACKAGES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight mt-2 mb-4 font-normal">
            Choose your bridal experience
          </h2>
          <p className="text-base sm:text-lg text-[#4e4543] font-light leading-relaxed">
            Thoughtfully structured packages for every ceremony milestone, created to bring calm and grandeur to your wedding week.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {BRIDAL_PACKAGES.map((pkg) => {
            const isPopular = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`package-card rounded-2xl p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 relative will-change-transform ${
                  isPopular
                    ? 'bg-[#ffffff] shadow-2xl lg:-translate-y-2 ring-1 ring-[#775a25]/30 border-0'
                    : 'bg-[#f7f3ee] shadow-sm hover:shadow-md border border-[#2b211f]/5'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#775a25] text-[#ffffff] px-4 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] shadow-md">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className={`mb-4 ${isPopular ? 'pt-2' : ''}`}>
                    <span className="text-[10px] uppercase tracking-widest text-[#775a25] font-semibold">
                      {pkg.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#140c0a] mt-1 font-medium">
                      {pkg.title}
                    </h3>
                  </div>

                  <div className="mb-6 flex items-baseline">
                    <span className="font-serif text-3xl sm:text-4xl text-[#140c0a] font-normal">
                      {pkg.price}
                    </span>
                    <span className="text-sm text-[#4e4543] ml-2 font-light">
                      / event
                    </span>
                  </div>

                  <p className="text-sm text-[#4e4543] font-light leading-relaxed mb-6 pb-6 border-b border-[#2b211f]/10">
                    {pkg.description}
                  </p>

                  <ul className="space-y-3.5 text-sm text-[#140c0a] mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#775a25] shrink-0 mt-0.5" />
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPackage(`${pkg.title} Bridal (${pkg.price})`)}
                  className={`w-full py-4 text-[12px] font-semibold uppercase tracking-wider rounded-lg transition-all shadow-sm ${
                    isPopular
                      ? 'bg-[#2b211f] text-[#fdf9f4] hover:bg-[#140c0a] hover:shadow-md'
                      : 'bg-[#fdf9f4] text-[#140c0a] hover:bg-[#140c0a] hover:text-[#fdf9f4] border border-[#2b211f]/10'
                  }`}
                >
                  Choose Package
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Multi-day note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#4e4543] font-light">
            Planning multiple ceremonies or destination festivities?{' '}
            <span className="text-[#140c0a] font-medium underline underline-offset-4 decoration-[#775a25]">
              Custom multi-day packages are available on request.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};
