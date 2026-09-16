import React, { useState, useRef, useCallback } from 'react';
import { ASSETS } from '../data';
import { ArrowRight, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  onSeeMore: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onSeeMore }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="w-full py-20 lg:py-28 bg-[#f7f3ee] overflow-hidden border-y border-[#2b211f]/5">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
            THE TRANSFORMATION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight mt-2 mb-4 font-normal">
            Subtle changes. Beautiful results.
          </h2>
          <p className="text-base sm:text-lg text-[#4e4543] font-light">
            Every look is designed to enhance natural features while keeping you feeling entirely like yourself.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto relative select-none">
          <div
            ref={containerRef}
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[4/3] lg:aspect-[1.34] rounded-2xl overflow-hidden shadow-2xl bg-[#f1ede8] cursor-ew-resize border border-[#2b211f]/5 touch-none"
          >
            {/* "After" Image (Background) */}
            <img
              src={ASSETS.engagementMain}
              alt="Subtle occasion transformation - Finished Glam"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* "Before" Image (Clipped Foreground) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={ASSETS.engagementMain}
                alt="Natural clean skin prep - Before"
                className="absolute top-0 left-0 max-w-none w-full h-full object-cover filter saturate-40 brightness-95 contrast-95"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
                }}
              />
            </div>

            {/* Badges */}
            <div className="absolute top-6 left-6 bg-[#140c0a]/80 backdrop-blur-md text-[#fdf9f4] px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider z-20 pointer-events-none">
              Before
            </div>
            <div className="absolute top-6 right-6 bg-[#775a25]/90 backdrop-blur-md text-[#ffffff] px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider z-20 pointer-events-none">
              After
            </div>

            {/* Divider Line & Circular Drag Handle */}
            <div
              className="absolute top-0 bottom-0 -ml-0.5 w-1 bg-[#ffffff] z-30 pointer-events-none flex items-center justify-center shadow-lg"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-[#ffffff] shadow-2xl flex items-center justify-center text-[#140c0a] border border-[#2b211f]/10">
                <MoveHorizontal className="w-5 h-5 text-[#775a25]" />
              </div>
            </div>

            {/* Range input for instant keyboard/accessibility/direct slider control */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Before and After transformation slider"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
            />
          </div>

          {/* Helper caption & link */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-sm text-[#4e4543] max-w-md font-light">
              Drag the slider horizontally to experience the seamless transition from skin preparation to finished signature glam.
            </p>
            <button
              onClick={onSeeMore}
              className="inline-flex items-center gap-2 text-[#140c0a] text-[12px] font-semibold uppercase tracking-wider hover:text-[#775a25] transition-colors"
            >
              <span>See More Transformations</span>
              <ArrowRight className="w-4 h-4 text-[#775a25]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
