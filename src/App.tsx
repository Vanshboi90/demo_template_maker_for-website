/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';

gsap.registerPlugin(ScrollTrigger);
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BridalSpotlight } from './components/BridalSpotlight';
import { PortfolioSection } from './components/PortfolioSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { BridalPackages } from './components/BridalPackages';
import { Testimonials } from './components/Testimonials';
import { WhyChooseUs } from './components/WhyChooseUs';
import { InstagramFeed } from './components/InstagramFeed';
import { BeautyConciergeCTA } from './components/BeautyConciergeCTA';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { AppointmentsDrawer } from './components/AppointmentsDrawer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { LightboxModal } from './components/LightboxModal';
import { BookingModal } from './components/BookingModal';
import { Appointment, ServiceItem, PortfolioItem } from './types';
import { BusinessProvider } from './context/BusinessContext';
import { Dashboard } from './components/dashboard/Dashboard';
import { DemoSwitcherBar } from './components/common/DemoSwitcherBar';
import { Sparkles } from 'lucide-react';

function parseCurrentLocation(): { route: 'landing' | 'dashboard'; slug: string } {
  if (typeof window === 'undefined') {
    return { route: 'landing', slug: 'demo01' };
  }

  const pathname = window.location.pathname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  // Check if dashboard
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/') || searchParams.get('view') === 'dashboard') {
    return { route: 'dashboard', slug: 'demo01' };
  }

  // Check if /makeup/:slug
  if (pathname.startsWith('/makeup/')) {
    const parts = pathname.split('/').filter(Boolean);
    const slugFromPath = parts[1];
    if (slugFromPath) {
      return { route: 'landing', slug: slugFromPath };
    }
  }

  // Query parameter fallback (?demo=demo01)
  const slugFromQuery = searchParams.get('demo');
  if (slugFromQuery) {
    return { route: 'landing', slug: slugFromQuery };
  }

  return { route: 'landing', slug: 'demo01' };
}

function StudioLandingPage({
  onOpenDashboard,
  onSwitchDemo
}: {
  onOpenDashboard: () => void;
  onSwitchDemo: (slug: string) => void;
}) {
  // Demo Mode is completely HIDDEN by default as requested.
  // It unlocks ONLY after clicking 5 times on "50+ Bespoke Bridal Looks" in StatsBar.
  const [isDemoModeUnlocked, setIsDemoModeUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('lumera_demo_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSecretTrigger = () => {
    setIsDemoModeUnlocked(true);
    try {
      sessionStorage.setItem('lumera_demo_unlocked', 'true');
    } catch {
      // Ignore
    }
    setToastMessage('✨ Demo Mode Unlocked! Demo switcher & dashboard are now active.');
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleHideDemoMode = () => {
    setIsDemoModeUnlocked(false);
    try {
      sessionStorage.removeItem('lumera_demo_unlocked');
    } catch {
      // Ignore
    }
  };

  // Appointments state with local persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_appointments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [
      {
        id: 'LUM-5214',
        service: 'Bridal Makeup',
        date: '2025-10-24',
        time: '10:00 AM',
        fullName: 'Ananya Sharma',
        phone: '+91 98765 43210',
        stylist: 'Maya Sen',
        occasion: 'Wedding Day',
        notes: 'Red lehenga with antique gold jewelry',
        createdAt: new Date().toISOString(),
        status: 'Confirmed'
      }
    ];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  // Popup Booking Modal state
  const [bookingModalState, setBookingModalState] = useState<{
    isOpen: boolean;
    servicePreset: string;
  }>({
    isOpen: false,
    servicePreset: 'Bridal Makeup'
  });

  // Open the pop-up booking form with a pre-selected service
  const openBookingModal = (serviceName: string = 'Bridal Makeup') => {
    setBookingModalState({
      isOpen: true,
      servicePreset: serviceName
    });
  };

  const closeBookingModal = () => {
    setBookingModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumera_appointments', JSON.stringify(appointments));
    } catch {
      // ignore
    }
  }, [appointments]);

  // Recalculate ScrollTrigger offsets once images and DOM have hydrated
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    window.addEventListener('load', () => ScrollTrigger.refresh());
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', () => ScrollTrigger.refresh());
    };
  }, []);

  const scrollToWork = () => {
    const section = document.getElementById('our-work');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingConfirmed = (newApp: Appointment) => {
    setAppointments((prev) => [newApp, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className={`min-h-screen bg-[#fdf9f4] text-[#1c1c19] flex flex-col relative font-sans ${isDemoModeUnlocked ? 'pt-8' : ''}`}>
      {/* Toast Notification when unlocked */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#1c1412] text-[#ffd796] text-xs font-semibold shadow-2xl border border-[#ffd796]/30 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Sparkles className="w-4 h-4 text-[#ffd796]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Client Demo Switcher & Hub Bar - ONLY SHOWN WHEN UNLOCKED VIA 5 CLICKS */}
      {isDemoModeUnlocked && (
        <DemoSwitcherBar
          onOpenDashboard={onOpenDashboard}
          onSwitchDemo={onSwitchDemo}
          onHide={handleHideDemoMode}
        />
      )}

      {/* 1. Header Navigation */}
      <Navbar
        onBookClick={() => openBookingModal('Bridal Makeup')}
        onOpenAppointments={() => setIsDrawerOpen(true)}
        appointmentCount={appointments.length}
        onOpenDashboard={isDemoModeUnlocked ? onOpenDashboard : undefined}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-20">
        {/* 2. Hero Section */}
        <Hero
          onBookClick={() => openBookingModal('Bridal Makeup')}
          onExploreWorkClick={scrollToWork}
          onSelectOffering={(serviceName) => openBookingModal(serviceName)}
        />

        {/* 3. Trust & Stats Strip with 5-click secret trigger on 50+ Bespoke Bridal Looks */}
        <StatsBar onSecretTrigger={handleSecretTrigger} />

        {/* 4. About the Atelier */}
        <AboutSection
          onExploreServices={() => scrollToSection('#services')}
        />

        {/* 5. Services Menu */}
        <ServicesSection
          onSelectService={(serviceName) => openBookingModal(serviceName)}
          onOpenDetails={(service) => setDetailService(service)}
        />

        {/* 6. Featured Bridal Experience */}
        <BridalSpotlight
          onExplorePackages={() => scrollToSection('#bridal-packages')}
          onBookBridal={() => openBookingModal('Bridal Makeup')}
        />

        {/* 7. Portfolio Lookbook */}
        <PortfolioSection
          onOpenLightbox={(item) => setLightboxItem(item)}
        />

        {/* 8. Before & After Transformation Slider */}
        <BeforeAfterSlider
          onSeeMore={scrollToWork}
        />

        {/* 9. Bridal Packages */}
        <BridalPackages
          onSelectPackage={(pkgTitle) => openBookingModal(pkgTitle)}
        />

        {/* 10. Client Testimonials */}
        <Testimonials />

        {/* 11. Why Choose Us / Standard */}
        <WhyChooseUs />

        {/* 12. Instagram Lookbook Feed */}
        <InstagramFeed />

        {/* 13. Concierge Booking CTA Banner */}
        <BeautyConciergeCTA
          onBookClick={() => openBookingModal('Bridal Makeup')}
        />

        {/* 14. Interactive Appointment Reservation Engine */}
        <BookingSection
          selectedServicePreset={selectedServicePreset}
          onBookingConfirmed={handleBookingConfirmed}
          onViewAppointments={() => setIsDrawerOpen(true)}
        />

        {/* 15. Visit Studio / Contact & Map */}
        <ContactSection />
      </main>

      {/* 16. Atelier Footer */}
      <Footer onNavClick={(href) => scrollToSection(href)} />

      {/* 17. Mobile Floating Sticky Quick Bar */}
      <FloatingMobileBar onBookClick={() => openBookingModal('Bridal Makeup')} />

      {/* 18. Modals & Drawers */}
      <AppointmentsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onNewBooking={() => openBookingModal('Bridal Makeup')}
      />

      <ServiceDetailModal
        service={detailService}
        onClose={() => setDetailService(null)}
        onBookService={(name) => openBookingModal(name)}
      />

      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onRequestLook={(lookTitle) => openBookingModal(lookTitle)}
      />

      {/* 19. Pop-up Booking Modal with pre-selected service */}
      <BookingModal
        isOpen={bookingModalState.isOpen}
        onClose={closeBookingModal}
        servicePreset={bookingModalState.servicePreset}
        onBookingConfirmed={handleBookingConfirmed}
        onViewAppointments={() => setIsDrawerOpen(true)}
      />
    </div>
  );
}

export default function App() {
  const [navState, setNavState] = useState(parseCurrentLocation);

  // Sync with browser URL changes (e.g. forward/back buttons)
  useEffect(() => {
    const handlePopState = () => {
      setNavState(parseCurrentLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setNavState(parseCurrentLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <BusinessProvider currentSlug={navState.slug}>
      {navState.route === 'dashboard' ? (
        <Dashboard
          onNavigateHome={() => navigateTo('/')}
          onSelectDemo={(slug) => navigateTo(`/makeup/${slug}`)}
        />
      ) : (
        <StudioLandingPage
          onOpenDashboard={() => navigateTo('/dashboard')}
          onSwitchDemo={(slug) => navigateTo(`/makeup/${slug}`)}
        />
      )}
    </BusinessProvider>
  );
}
