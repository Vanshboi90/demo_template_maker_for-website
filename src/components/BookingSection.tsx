import React, { useState, useEffect } from 'react';
import { SERVICES, BRIDAL_PACKAGES, STYLISTS, TIME_SLOTS } from '../data';
import { Appointment } from '../types';
import { Check, Calendar, Clock, Sparkles, MessageCircle, User } from 'lucide-react';

interface BookingSectionProps {
  selectedServicePreset?: string;
  onBookingConfirmed: (appointment: Appointment) => void;
  onViewAppointments: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedServicePreset,
  onBookingConfirmed,
  onViewAppointments
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [stylist, setStylist] = useState('Any Senior Stylist');
  const [occasion, setOccasion] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);

  // Sync when user clicks "Book X" from cards
  useEffect(() => {
    if (selectedServicePreset) {
      setService(selectedServicePreset);
      setSubmittedAppointment(null);
    }
  }, [selectedServicePreset]);

  // Set minimum date to today
  const todayStr = new Date().toISOString().split('T')[0];

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
      occasion: occasion.trim() || undefined,
      stylist: stylist !== 'Any Senior Stylist' ? stylist : undefined,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setSubmittedAppointment(newAppointment);
    onBookingConfirmed(newAppointment);
  };

  const resetForm = () => {
    setSubmittedAppointment(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setService('');
    setDate('');
    setTime('10:00 AM');
    setStylist('Any Senior Stylist');
    setOccasion('');
    setNotes('');
  };

  return (
    <section id="book-appointment" className="w-full py-20 lg:py-28 bg-[#fdf9f4]">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12">
        <div className="max-w-3xl mx-auto bg-[#ffffff] p-8 sm:p-12 lg:p-14 rounded-3xl shadow-xl border border-[#2b211f]/5">
          
          {submittedAppointment ? (
            /* Success Card */
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-[#ffd796]/40 text-[#775a25] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
                CONFIRMATION #{submittedAppointment.id}
              </span>
              <h3 className="font-serif text-3xl text-[#140c0a] mt-1 mb-2 font-normal">
                Thank you, gorgeous!
              </h3>
              <p className="text-base text-[#4e4543] max-w-md mx-auto mb-8 font-light">
                Your appointment request for <strong className="text-[#140c0a] font-semibold">{submittedAppointment.service}</strong> has been received. Our studio concierge will contact you shortly to finalize your schedule.
              </p>

              {/* Summary Details */}
              <div className="bg-[#f7f3ee] rounded-2xl p-6 mb-8 text-left max-w-md mx-auto border border-[#2b211f]/5">
                <div className="flex items-center justify-between border-b border-[#2b211f]/10 pb-3 mb-3">
                  <span className="text-xs text-[#4e4543]">Guest:</span>
                  <span className="text-sm font-semibold text-[#140c0a]">{submittedAppointment.fullName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#2b211f]/10 pb-3 mb-3">
                  <span className="text-xs text-[#4e4543]">Service:</span>
                  <span className="text-sm font-semibold text-[#775a25]">{submittedAppointment.service}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#2b211f]/10 pb-3 mb-3">
                  <span className="text-xs text-[#4e4543]">Date &amp; Time:</span>
                  <span className="text-sm font-medium text-[#140c0a] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#775a25]" />
                    {submittedAppointment.date} at {submittedAppointment.time}
                  </span>
                </div>
                {submittedAppointment.stylist && (
                  <div className="flex items-center justify-between border-b border-[#2b211f]/10 pb-3 mb-3">
                    <span className="text-xs text-[#4e4543]">Requested Stylist:</span>
                    <span className="text-sm font-medium text-[#140c0a]">{submittedAppointment.stylist}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#4e4543]">Status:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#25D366]/20 text-[#128C7E]">
                    Confirmed
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 bg-[#f1ede8] text-[#140c0a] rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#e6e2dd] transition-colors"
                >
                  Book Another Service
                </button>
                <button
                  onClick={onViewAppointments}
                  className="w-full sm:w-auto px-6 py-3 bg-[#2b211f] text-[#fdf9f4] rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#140c0a] transition-colors shadow-sm"
                >
                  View My Appointments
                </button>
                <a
                  href={`https://wa.me/919876543210?text=Hi%20Lumera,%20I%20just%20booked%20an%20appointment%20(#${submittedAppointment.id})%20for%20${encodeURIComponent(submittedAppointment.service)}%20on%20${submittedAppointment.date}%20at%20${submittedAppointment.time}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 bg-[#25D366] text-white rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Concierge</span>
                </a>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <>
              <div className="text-center mb-10">
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
                  RESERVATION
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight mt-2 mb-3 font-normal">
                  Book Your Appointment
                </h2>
                <p className="text-sm sm:text-base text-[#4e4543] font-light">
                  Fill in your preferred details below. Our studio coordinator will review availability and confirm your reservation within 2 business hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-4 py-3.5 rounded-lg bg-[#f7f3ee] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-sm border border-[#2b211f]/5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3.5 rounded-lg bg-[#f7f3ee] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-sm border border-[#2b211f]/5"
                    />
                  </div>
                </div>

                {/* Email & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="radhika@example.com"
                      className="w-full px-4 py-3.5 rounded-lg bg-[#f7f3ee] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-sm border border-[#2b211f]/5"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-2">
                      Select Service or Package *
                    </label>
                    <select
                      required
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#f7f3ee] text-[#140c0a] focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-sm border border-[#2b211f]/5 cursor-pointer"
                    >
                      <option value="" disabled>Select a Service or Package</option>
                      <optgroup label="Occasion Services">
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title} ({s.price})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Bridal Packages">
                        {BRIDAL_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={`${pkg.title} Bridal (${pkg.price})`}>
                            {pkg.title} Bridal Package ({pkg.price})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Stylist & Occasion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-2">
                      Preferred Senior Artist
                    </label>
                    <div className="relative">
                      <select
                        value={stylist}
                        onChange={(e) => setStylist(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-lg bg-[#f7f3ee] text-[#140c0a] focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-sm border border-[#2b211f]/5 cursor-pointer"
                      >
                        <option value="Any Senior Stylist">Any Available Senior Artist</option>
                        {STYLISTS.map((st) => (
                          <option key={st.id} value={`${st.name} (${st.role})`}>
                            {st.name} — {st.specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-2">
                      Occasion / Celebration Type
                    </label>
                    <input
                      type="text"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      placeholder="e.g. Primary Wedding / Reception / Cocktail"
                      className="w-full px-4 py-3.5 rounded-lg bg-[#f7f3ee] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-sm border border-[#2b211f]/5"
                    />
                  </div>
                </div>

                {/* Date & Time Slot selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#f7f3ee] text-[#140c0a] focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-sm border border-[#2b211f]/5 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#f7f3ee] text-[#140c0a] focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-sm border border-[#2b211f]/5 cursor-pointer"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#4e4543] mb-2">
                    Additional Notes or Outfit Details
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about your outfit palette, veil placement, jewelry, skin sensitivity, or specific timing requirements..."
                    className="w-full px-4 py-3.5 rounded-lg bg-[#f7f3ee] text-[#140c0a] placeholder:text-[#807572]/60 focus:outline-none focus:ring-2 focus:ring-[#775a25]/40 text-sm resize-none border border-[#2b211f]/5 font-light"
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#2b211f] text-[#fdf9f4] rounded-lg text-[12px] font-semibold uppercase tracking-[0.18em] hover:bg-[#140c0a] transition-all shadow-md cursor-pointer"
                  >
                    Request Appointment
                  </button>
                  <p className="text-[11px] text-center text-[#4e4543] mt-3 font-light">
                    We will contact you via WhatsApp or phone to confirm date availability.
                  </p>
                </div>
              </form>
            </>
          )}

        </div>
      </div>
    </section>
  );
};
