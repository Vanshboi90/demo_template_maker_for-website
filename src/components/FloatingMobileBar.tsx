import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

interface FloatingMobileBarProps {
  onBookClick: () => void;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({ onBookClick }) => {
  const { business } = useBusiness();

  const cleanWhatsapp = (business.whatsapp || business.phone).replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(`Hi ${business.businessName}, I'd like to inquire about booking an appointment.`);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden flex items-center gap-3 bg-[#fdf9f4]/95 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-[#2b211f]/10">
      <button
        onClick={onBookClick}
        className="flex-1 py-3 bg-[#2b211f] text-[#fdf9f4] rounded-xl text-[12px] font-semibold uppercase tracking-wider text-center shadow-md active:scale-98 transition-transform"
      >
        Book Appointment
      </button>
      <a
        href={`https://wa.me/${cleanWhatsapp}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-3 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-md active:scale-98 transition-transform"
        aria-label="Chat with studio on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
};
