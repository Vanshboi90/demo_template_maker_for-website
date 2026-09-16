import React, { useState, useEffect } from 'react';
import { SERVICES, BRIDAL_PACKAGES, STYLISTS, TIME_SLOTS } from '../data';
import { Appointment } from '../types';
import { useBusiness } from '../context/BusinessContext';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  Check,
  FileText,
  X,
  ChevronRight,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  servicePreset?: string;
  onBookingConfirmed: (appointment: Appointment) => void;
  onViewAppointments: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  servicePreset = 'Bridal Makeup',
  onBookingConfirmed,
  onViewAppointments
}) => {
  const { business } = useBusiness();
  const [service, setService] = useState(servicePreset || 'Bridal Makeup');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [stylist, setStylist] = useState('Any Senior Stylist');
  const [occasion, setOccasion] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Set service preset when modal opens or preset changes
  useEffect(() => {
    if (servicePreset) {
      setService(servicePreset);
    }
  }, [servicePreset, isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setConfirmedBooking(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  // Find info about selected service
  const matchedService = SERVICES.find((s) => s.title.toLowerCase() === service.toLowerCase());
  const matchedPackage = BRIDAL_PACKAGES.find((p) => p.title.toLowerCase() === service.toLowerCase());

  const displayPrice = matchedService?.price || matchedPackage?.price || 'Custom Quote';
  const displayDuration = matchedService?.duration || matchedPackage?.subtitle || 'Tailored Session';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !service || !date) {
      return;
    }

    const newAppointment: Appointment = {
      id: `LUM-${Math.floor(1000 + Math.random() * 9000)}`,
      service,
      date,
      time,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      occasion: occasion.trim() || (service.toLowerCase().includes('bridal') ? 'Wedding Ceremony' : undefined),
      stylist: stylist !== 'Any Senior Stylist' ? stylist : undefined,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setConfirmedBooking(newAppointment);
    onBookingConfirmed(newAppointment);
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Dark backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#140c0a]/65 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog Content */}
      <div className="relative bg-[#ffffff] w-full max-w-xl rounded-3xl shadow-2xl z-10 border border-[#2b211f]/10 overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header Strip */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-[#2b211f]/5 flex items-center justify-between shrink-0 bg-[#fdf9f4]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#775a25] animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
              {business.shortName?.toUpperCase() || business.businessName.toUpperCase()} ATELIER RESERVATION
            </span>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#f1ede8] text-[#140c0a] hover:bg-[#140c0a] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close booking popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {confirmedBooking ? (
            /* Success confirmation screen inside popup */
            <div className="text-center py-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#ffd796]/40 text-[#775a25] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
                RESERVATION CONFIRMED
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#140c0a] mt-1 mb-2 font-normal">
                You&apos;re Scheduled!
              </h3>
              <p className="text-sm text-[#4e4543] max-w-md mx-auto mb-6 font-light">
                Your appointment for <strong className="text-[#140c0a] font-semibold">{confirmedBooking.service}</strong> has been logged in our atelier system.
              </p>

              {/* Summary Card */}
              <div className="bg-[#f7f3ee] rounded-2xl p-5 mb-6 text-left border border-[#2b211f]/5 space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#2b211f]/10 pb-2">
                  <span className="text-xs text-[#4e4543]">Booking ID</span>
                  <span className="text-xs font-mono font-bold text-[#140c0a]">#{confirmedBooking.id}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#2b211f]/10 pb-2">
                  <span className="text-xs text-[#4e4543]">Guest</span>
                  <span className="text-sm font-semibold text-[#140c0a]">{confirmedBooking.fullName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#2b211f]/10 pb-2">
                  <span className="text-xs text-[#4e4543]">Selected Service</span>
                  <span className="text-sm font-semibold text-[#775a25]">{confirmedBooking.service}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#2b211f]/10 pb-2">
                  <span className="text-xs text-[#4e4543]">Date &amp; Time</span>
                  <span className="text-sm font-medium text-[#140c0a] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#775a25]" />
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </span>
                </div>
                {confirmedBooking.stylist && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#4e4543]">Artist</span>
                    <span className="text-sm font-medium text-[#140c0a]">{confirmedBooking.stylist}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/919876543210?text=Hi%20Lumera,%20I%20just%20booked%20an%20appointment%20(#${confirmedBooking.id})%20for%20${encodeURIComponent(confirmedBooking.service)}%20on%20${confirmedBooking.date}%20at%20${confirmedBooking.time}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 bg-[#25D366] text-white rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    handleClose();
                    onViewAppointments();
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-[#2b211f] text-[#fdf9f4] rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#140c0a] transition-colors shadow-xs"
                >
                  View My Bookings
                </button>
              </div>
            </div>
          ) : (
            /* Pop-up Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Pre-selected Service Banner */}
              <div className="p-4 rounded-2xl bg-[#f7f3ee] border border-[#775a25]/20 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#775a25]/10 text-[#775a25] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-[#775a25]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#775a25] block">
                      Selected Service
                    </span>
                    <h4 className="font-serif text-lg text-[#140c0a] font-medium truncate">
                      {service}
                    </h4>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-[#775a25] block">
                    {displayPrice}
                  </span>
                  <span className="text-[10px] text-[#4e4543] font-light">
                    {displayDuration}
                  </span>
                </div>
              </div>

              {/* Quick switch service if user wants another option */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-1.5">
                  Change Service (Optional)
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#ffffff] text-[#140c0a] text-xs border border-[#2b211f]/10 focus:outline-none focus:ring-2 focus:ring-[#775a25]/30 cursor-pointer"
                >
                  <optgroup label="Signature Services">
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.price})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Bridal Packages">
                    {BRIDAL_PACKAGES.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.price})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Guest Details: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-1.5 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#775a25]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#fdf9f4] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-xs border border-[#2b211f]/10"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-1.5 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#775a25]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#fdf9f4] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-xs border border-[#2b211f]/10"
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-1.5 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#775a25]" />
                  <span>Email Address (Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="radhika@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#fdf9f4] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-xs border border-[#2b211f]/10"
                />
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#775a25]" />
                    <span>Preferred Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#fdf9f4] text-[#140c0a] focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-xs border border-[#2b211f]/10 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#775a25]" />
                    <span>Time Slot *</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#fdf9f4] text-[#140c0a] focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-xs border border-[#2b211f]/10 cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stylist & Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-1.5">
                    Artist Preference
                  </label>
                  <select
                    value={stylist}
                    onChange={(e) => setStylist(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#fdf9f4] text-[#140c0a] focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-xs border border-[#2b211f]/10 cursor-pointer"
                  >
                    <option value="Any Senior Stylist">Any Senior Artist</option>
                    {STYLISTS.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-1.5">
                    Occasion / Event
                  </label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="e.g. Wedding Reception, Sangeet"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#fdf9f4] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-xs border border-[#2b211f]/10"
                  />
                </div>
              </div>

              {/* Special Requests or Notes */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-1.5 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-[#775a25]" />
                  <span>Outfit Details / Special Notes</span>
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your outfit palette, jewelry style, or skin preferences..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#fdf9f4] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-xs border border-[#2b211f]/10 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2b211f] text-[#fdf9f4] rounded-xl text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#140c0a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4 text-[#ffd796]" />
                  <span>Confirm Reservation ({service})</span>
                </button>
                <p className="text-[10px] text-center text-[#807572] mt-2">
                  No advance payment required online. Concierge will confirm your appointment via call/WhatsApp.
                </p>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
