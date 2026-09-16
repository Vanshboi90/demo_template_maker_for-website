import React from 'react';
import { PortfolioItem } from '../types';
import { X, ArrowRight } from 'lucide-react';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onRequestLook: (lookTitle: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onRequestLook
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#140c0a]/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative bg-[#fdf9f4] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-[#2b211f]/10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#140c0a]/70 text-white hover:bg-[#140c0a] flex items-center justify-center transition-colors"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#140c0a]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#775a25] font-semibold">
              {item.categoryLabel} • {item.event}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#140c0a] font-medium mt-0.5">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm text-[#4e4543] font-light mt-1.5 max-w-md">
                {item.description}
              </p>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onRequestLook(`Look: ${item.title}`);
            }}
            className="shrink-0 px-6 py-3.5 bg-[#2b211f] text-[#fdf9f4] rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#140c0a] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Request This Look</span>
            <ArrowRight className="w-4 h-4 text-[#ffd796]" />
          </button>
        </div>
      </div>
    </div>
  );
};
