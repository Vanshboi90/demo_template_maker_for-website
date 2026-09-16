import React from 'react';
import { Appointment } from '../types';
import { X, Calendar, Clock, Trash2, MessageCircle, Plus } from 'lucide-react';

interface AppointmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onNewBooking: () => void;
}

export const AppointmentsDrawer: React.FC<AppointmentsDrawerProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onNewBooking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#140c0a]/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdf9f4] shadow-2xl flex flex-col justify-between border-l border-[#2b211f]/10">
          
          {/* Header */}
          <div className="p-6 border-b border-[#2b211f]/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#775a25]">
                MY RESERVATIONS
              </span>
              <h3 className="font-serif text-2xl text-[#140c0a] font-medium">
                Your Appointments
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#4e4543] hover:text-[#140c0a] rounded-full hover:bg-[#f1ede8] transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body content */}
          <div className="p-6 overflow-y-auto flex-grow space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#f1ede8] flex items-center justify-center mx-auto mb-4 text-[#775a25]">
                  <Calendar className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl text-[#140c0a] font-normal mb-1">
                  No appointments yet
                </h4>
                <p className="text-sm text-[#4e4543] font-light max-w-xs mx-auto mb-6">
                  Reserve your bridal consultation, hair styling, or occasion glam in just a few clicks.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNewBooking();
                  }}
                  className="px-6 py-3 bg-[#2b211f] text-[#fdf9f4] rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#140c0a] transition-colors"
                >
                  Book Your First Ritual
                </button>
              </div>
            ) : (
              appointments.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#ffffff] rounded-2xl p-5 border border-[#2b211f]/5 shadow-xs flex flex-col gap-3 relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#775a25] bg-[#ffd796]/30 px-2 py-0.5 rounded">
                        #{app.id}
                      </span>
                      <h4 className="font-serif text-lg text-[#140c0a] font-medium mt-1">
                        {app.service}
                      </h4>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#25D366]/15 text-[#128C7E]">
                      {app.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#4e4543] font-light pt-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#775a25]" />
                      <span>{app.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#775a25]" />
                      <span>{app.time}</span>
                    </div>
                    {app.stylist && (
                      <div className="text-[11px] text-[#775a25] font-medium">
                        Artist: {app.stylist}
                      </div>
                    )}
                    {app.occasion && (
                      <div className="text-[11px] text-[#4e4543]">
                        Occasion: {app.occasion}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#2b211f]/5 mt-1">
                    <a
                      href={`https://wa.me/919876543210?text=Hi%20Lumera,%20inquiring%20about%20my%20booking%20#${app.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-wider text-[#25D366] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Concierge</span>
                    </a>

                    <button
                      onClick={() => onCancelAppointment(app.id)}
                      className="text-xs text-[#ba1a1a] hover:text-[#93000a] flex items-center gap-1 p-1 hover:bg-[#ffdad6]/40 rounded transition-colors"
                      title="Cancel appointment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          {appointments.length > 0 && (
            <div className="p-6 border-t border-[#2b211f]/10 bg-[#f7f3ee]">
              <button
                onClick={() => {
                  onClose();
                  onNewBooking();
                }}
                className="w-full py-3.5 bg-[#2b211f] text-[#fdf9f4] rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#140c0a] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#ffd796]" />
                <span>Book Another Service</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
