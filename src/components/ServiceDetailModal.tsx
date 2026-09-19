import React from 'react';
import { ServiceItem } from '../types';
import { X, Clock, Check, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#140c0a]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-[#fdf9f4] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-[#2b211f]/10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#140c0a]/60 text-white hover:bg-[#140c0a] flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image header if available */}
        {service.image && (
          <div className="relative h-56 w-full overflow-hidden bg-[#f1ede8]">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: service.imagePosition || 'center 15%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a]/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-6">
              <span className="bg-[#775a25] text-white px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                {service.tag}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#140c0a] font-medium">
                {service.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#775a25] font-medium mt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{service.duration}</span>
              </div>
            </div>
            <span className="text-xl font-bold text-[#775a25] shrink-0 font-sans">
              {service.price}
            </span>
          </div>

          <p className="text-sm text-[#4e4543] font-light leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="mb-8">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#140c0a] mb-3">
              What&apos;s Included In This Session
            </h4>
            <ul className="space-y-2.5">
              {service.includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4e4543]">
                  <Check className="w-4 h-4 text-[#775a25] shrink-0 mt-0.5" />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Book Action */}
          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="w-full py-4 bg-[#2b211f] text-[#fdf9f4] rounded-lg text-[12px] font-semibold uppercase tracking-[0.16em] hover:bg-[#140c0a] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Book {service.title}</span>
            <ArrowRight className="w-4 h-4 text-[#ffd796]" />
          </button>
        </div>
      </div>
    </div>
  );
};
