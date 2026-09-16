import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface BeautyConciergeCTAProps {
  onBookClick: () => void;
}

export const BeautyConciergeCTA: React.FC<BeautyConciergeCTAProps> = ({ onBookClick }) => {
  return (
    <section className="w-full py-16 lg:py-20 bg-[#2b211f] text-[#fdf9f4] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ffd796]">
              BEAUTY CONCIERGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#ffffff] tracking-tight mt-2 mb-3 font-normal">
              Ready for your glam?
            </h2>
            <p className="text-base sm:text-lg text-[#ddd9d5] font-light leading-relaxed">
              Tell us what you&apos;re looking for and we&apos;ll curate the perfect service sequence tailored to your upcoming celebration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#fdf9f4] text-[#140c0a] px-8 py-4 rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#ffffff] transition-all shadow-lg group"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4 ml-2 text-[#775a25] group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://wa.me/919876543210?text=Hi%20Lumera%20Beauty%20Studio,%20I'd%20like%20to%20inquire%20about%20booking%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#25D366] text-white px-7 py-4 rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#20ba5a] transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </div>
      </div>

      {/* Ambient gold background flare */}
      <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[#775a25]/20 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};
