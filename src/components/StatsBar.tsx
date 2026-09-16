import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';

interface StatsBarProps {
  onSecretTrigger?: () => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({ onSecretTrigger }) => {
  const [clickCount, setClickCount] = useState(0);
  const lastClickTimeRef = useRef<number>(0);

  const handleBridalStatClick = () => {
    const now = Date.now();
    // Reset click count if gap between clicks is more than 3 seconds
    let newCount = 1;
    if (now - lastClickTimeRef.current < 3000) {
      newCount = clickCount + 1;
    }
    lastClickTimeRef.current = now;
    setClickCount(newCount);

    if (newCount >= 5) {
      setClickCount(0);
      if (onSecretTrigger) {
        onSecretTrigger();
      }
    }
  };

  return (
    <section className="w-full bg-[#f7f3ee] py-10 border-y border-[#2b211f]/5">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center text-center">
          <div className="flex flex-col items-center justify-center p-3">
            <span className="font-serif text-3xl sm:text-4xl text-[#140c0a] tracking-tight font-medium">
              5+
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#775a25] mt-1.5">
              Years Experience
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3">
            <span className="font-serif text-3xl sm:text-4xl text-[#140c0a] tracking-tight font-medium">
              1,000+
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#775a25] mt-1.5">
              Happy Clients
            </span>
          </div>

          {/* Secret 5-click trigger on 50+ Bespoke Bridal Looks */}
          <div
            onClick={handleBridalStatClick}
            className="flex flex-col items-center justify-center p-3 cursor-pointer select-none transition-transform active:scale-95"
            title=""
          >
            <span className="font-serif text-3xl sm:text-4xl text-[#140c0a] tracking-tight font-medium">
              50+
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#775a25] mt-1.5">
              Bespoke Bridal Looks
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-3xl sm:text-4xl text-[#140c0a] tracking-tight font-medium">
                5.0
              </span>
              <Star className="w-6 h-6 text-[#775a25] fill-[#775a25]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#775a25] mt-1.5">
              Client Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
