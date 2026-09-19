import React, { useState } from 'react';
import { ASSETS } from '../data';
import { useBusiness } from '../context/BusinessContext';
import { CalendarCheck, Menu, X, Phone, LayoutDashboard, Sparkles, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
  onOpenAppointments: () => void;
  appointmentCount: number;
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookClick,
  onOpenAppointments,
  appointmentCount,
  onOpenDashboard
}) => {
  const { business } = useBusiness();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#our-work' },
    { label: 'About', href: '#about' },
    { label: 'Packages', href: '#bridal-packages' },
    { label: 'Contact', href: '#contact' },
    { label: 'Courses & Shop', href: '/courses', isNewPage: true }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-[#fdf9f4]/95 backdrop-blur-xl border-b border-[#2b211f]/5 shadow-[0_4px_20px_-2px_rgba(43,33,31,0.04)]">
        <div className="h-20 max-w-[1360px] mx-auto px-5 lg:px-12 flex items-center justify-between">
          {/* 1:1 Logo & Business Name */}
          <a href="#home" className="flex items-center gap-3 sm:gap-3.5 group min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 aspect-square rounded-full overflow-hidden bg-[#f8f4ee] border border-[#2b211f]/15 shrink-0 flex items-center justify-center shadow-xs group-hover:border-[#775a25]/60 transition-all">
              <img
                src={business.logoUrl || ASSETS.logo}
                alt={business.businessName}
                className="w-full h-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null; // Prevent infinite error retry loops
                  if (target.src !== ASSETS.logo) {
                    target.src = ASSETS.logo;
                  }
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-lg font-bold text-[#140c0a] tracking-tight truncate leading-tight group-hover:text-[#775a25] transition-colors">
                {business.businessName}
              </span>
              {business.tagline && (
                <span className="text-[10px] tracking-[0.16em] uppercase font-semibold text-[#775a25] truncate max-w-[140px] xs:max-w-[200px] sm:max-w-[280px]">
                  {business.tagline}
                </span>
              )}
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link, idx) => (
              link.isNewPage ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#775a25] hover:text-[#140c0a] transition-all py-1.5 px-3 rounded-full bg-[#775a25]/10 hover:bg-[#775a25]/20 border border-[#775a25]/25 flex items-center gap-1.5 shadow-2xs hover:scale-105"
                  title="Explore Courses & Beauty Products"
                >
                  <Sparkles className="w-3 h-3 text-[#775a25]" />
                  <span>{link.label}</span>
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-[12px] uppercase tracking-[0.15em] font-medium transition-colors py-1 ${
                    idx === 0
                      ? 'text-[#140c0a] font-semibold border-b border-[#775a25]'
                      : 'text-[#4e4543] hover:text-[#140c0a]'
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* Actions: Book Appointment & My Bookings */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* My Bookings Trigger */}
            <button
              onClick={onOpenAppointments}
              aria-label="View Appointments"
              className="relative p-2.5 rounded-full bg-[#f1ede8] text-[#140c0a] hover:bg-[#ebe8e3] transition-colors flex items-center justify-center"
              title="My Appointments"
            >
              <CalendarCheck className="w-4 h-4 text-[#775a25]" />
              {appointmentCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#775a25] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {appointmentCount}
                </span>
              )}
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={onBookClick}
              className="hidden sm:inline-flex items-center justify-center bg-[#2b211f] text-[#fdf9f4] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[#140c0a] hover:shadow-md transition-all"
            >
              Book Appointment
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-lg text-[#140c0a] hover:bg-[#f1ede8] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fdf9f4] border-b border-[#2b211f]/10 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isNewPage ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[13px] uppercase tracking-[0.16em] font-semibold text-[#775a25] py-2.5 border-b border-[#2b211f]/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#775a25]" />
                      <span>{link.label}</span>
                    </div>
                    <span className="text-[10px] bg-[#775a25] text-white px-2 py-0.5 rounded-full font-bold">
                      NEW
                    </span>
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-[13px] uppercase tracking-[0.16em] font-medium text-[#140c0a] py-2 border-b border-[#2b211f]/5"
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full py-3.5 bg-[#2b211f] text-[#fdf9f4] text-center rounded-lg text-[12px] font-semibold uppercase tracking-widest shadow"
                >
                  Book Appointment
                </button>
                <a
                  href={`tel:${business.phone.replace(/\s+/g, '')}`}
                  className="w-full py-3 bg-[#f1ede8] text-[#140c0a] text-center rounded-lg text-[12px] font-medium uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#775a25]" />
                  Call Studio ({business.phone})
                </a>
                {onOpenDashboard && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDashboard();
                    }}
                    className="w-full py-2.5 bg-[#f5ede2] text-[#775a25] text-center rounded-lg text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#775a25]/20"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Demo Hub Dashboard</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
