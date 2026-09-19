/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense } from 'react';
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
import { AcademyShopBanner } from './components/AcademyShopBanner';
import { PredictiveSection } from './components/common/PredictiveSection';
import { Appointment, ServiceItem, PortfolioItem } from './types';
import { BusinessProvider } from './context/BusinessContext';
import { DemoSwitcherBar } from './components/common/DemoSwitcherBar';
import { Sparkles } from 'lucide-react';

// Code-split heavy routes & popups to keep initial load featherweight
const Dashboard = React.lazy(() =>
  import('./components/dashboard/Dashboard').then((m) => ({ default: m.Dashboard }))
);
const CoursesAndProductsPage = React.lazy(() =>
  import('./components/store/CoursesAndProductsPage').then((m) => ({ default: m.CoursesAndProductsPage }))
);
const BookingModal = React.lazy(() =>
  import('./components/BookingModal').then((m) => ({ default: m.BookingModal }))
);
const AppointmentsDrawer = React.lazy(() =>
  import('./components/AppointmentsDrawer').then((m) => ({ default: m.AppointmentsDrawer }))
);
const ServiceDetailModal = React.lazy(() =>
  import('./components/ServiceDetailModal').then((m) => ({ default: m.ServiceDetailModal }))
);
const LightboxModal = React.lazy(() =>
  import('./components/LightboxModal').then((m) => ({ default: m.LightboxModal }))
);

function parseCurrentLocation(): { route: 'landing' | 'dashboard' | 'store'; slug: string } {
  if (typeof window === 'undefined') {
    return { route: 'landing', slug: 'demo01' };
  }

  const pathname = window.location.pathname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  // Check if store / courses / products / academy
  if (
    pathname === '/store' ||
    pathname.startsWith('/store/') ||
    pathname === '/courses' ||
    pathname.startsWith('/courses/') ||
    pathname === '/products' ||
    pathname.startsWith('/products/') ||
    pathname === '/academy' ||
    pathname.startsWith('/academy/') ||
    searchParams.get('view') === 'store' ||
    searchParams.get('page') === 'courses' ||
    searchParams.get('page') === 'products'
  ) {
    return { route: 'store', slug: 'demo01' };
  }

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

  // Proactively warm up upcoming component chunks during browser idle time
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
    const handle = idleCallback(() => {
      // Warm up modals and external views in background
      import('./components/BookingModal');
      import('./components/AppointmentsDrawer');
      import('./components/ServiceDetailModal');
      import('./components/LightboxModal');
      import('./components/store/CoursesAndProductsPage');
    });
    return () => {
      if (window.cancelIdleCallback && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      }
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
        {/* 2. Hero Section - Loaded immediately for zero LCP latency */}
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

        {/* 6. Featured Bridal Experience - Anticipated 1000px before scroll */}
        <PredictiveSection id="bridal-spotlight" minHeight="500px" anticipationPx={1000}>
          <BridalSpotlight
            onExplorePackages={() => scrollToSection('#bridal-packages')}
            onBookBridal={() => openBookingModal('Bridal Makeup')}
          />
        </PredictiveSection>

        {/* 7. Portfolio Lookbook */}
        <PredictiveSection id="our-work" minHeight="600px" anticipationPx={1000}>
          <PortfolioSection
            onOpenLightbox={(item) => setLightboxItem(item)}
          />
        </PredictiveSection>

        {/* 8. Before & After Transformation Slider */}
        <PredictiveSection minHeight="450px" anticipationPx={1000}>
          <BeforeAfterSlider
            onSeeMore={scrollToWork}
          />
        </PredictiveSection>

        {/* 9. Bridal Packages */}
        <PredictiveSection id="bridal-packages" minHeight="600px" anticipationPx={1000}>
          <BridalPackages
            onSelectPackage={(pkgTitle) => openBookingModal(pkgTitle)}
          />
        </PredictiveSection>

        {/* 9.5 Academy & Boutique Showcase Banner */}
        <PredictiveSection minHeight="300px" anticipationPx={1000}>
          <AcademyShopBanner onOpenStore={() => window.open('/courses', '_blank')} />
        </PredictiveSection>

        {/* 10. Client Testimonials */}
        <PredictiveSection minHeight="450px" anticipationPx={1000}>
          <Testimonials />
        </PredictiveSection>

        {/* 11. Why Choose Us / Standard */}
        <PredictiveSection minHeight="400px" anticipationPx={1000}>
          <WhyChooseUs />
        </PredictiveSection>

        {/* 12. Instagram Lookbook Feed */}
        <PredictiveSection minHeight="500px" anticipationPx={1000}>
          <InstagramFeed />
        </PredictiveSection>

        {/* 13. Concierge Booking CTA Banner */}
        <PredictiveSection minHeight="250px" anticipationPx={1000}>
          <BeautyConciergeCTA
            onBookClick={() => openBookingModal('Bridal Makeup')}
          />
        </PredictiveSection>

        {/* 14. Interactive Appointment Reservation Engine */}
        <PredictiveSection id="booking" minHeight="600px" anticipationPx={1000}>
          <BookingSection
            selectedServicePreset={selectedServicePreset}
            onBookingConfirmed={handleBookingConfirmed}
            onViewAppointments={() => setIsDrawerOpen(true)}
          />
        </PredictiveSection>

        {/* 15. Visit Studio / Contact & Map */}
        <PredictiveSection id="contact" minHeight="500px" anticipationPx={1000}>
          <ContactSection />
        </PredictiveSection>
      </main>

      {/* 16. Atelier Footer */}
      <PredictiveSection minHeight="250px" anticipationPx={800}>
        <Footer onNavClick={(href) => scrollToSection(href)} />
      </PredictiveSection>

      {/* 17. Mobile Floating Sticky Quick Bar */}
      <FloatingMobileBar onBookClick={() => openBookingModal('Bridal Makeup')} />

      {/* 18. Modals & Drawers - Loaded lazily on demand */}
      <Suspense fallback={null}>
        {isDrawerOpen && (
          <AppointmentsDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            appointments={appointments}
            onCancelAppointment={handleCancelAppointment}
            onNewBooking={() => openBookingModal('Bridal Makeup')}
          />
        )}

        {detailService && (
          <ServiceDetailModal
            service={detailService}
            onClose={() => setDetailService(null)}
            onBookService={(name) => openBookingModal(name)}
          />
        )}

        {lightboxItem && (
          <LightboxModal
            item={lightboxItem}
            onClose={() => setLightboxItem(null)}
            onRequestLook={(lookTitle) => openBookingModal(lookTitle)}
          />
        )}

        {bookingModalState.isOpen && (
          <BookingModal
            isOpen={bookingModalState.isOpen}
            onClose={closeBookingModal}
            servicePreset={bookingModalState.servicePreset}
            onBookingConfirmed={handleBookingConfirmed}
            onViewAppointments={() => setIsDrawerOpen(true)}
          />
        )}
      </Suspense>
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
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#fdf9f4] flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#775a25] border-t-transparent animate-spin" />
            <span className="font-serif text-sm tracking-widest uppercase text-[#775a25]">Loading Atelier...</span>
          </div>
        }
      >
        {navState.route === 'dashboard' ? (
          <Dashboard
            onNavigateHome={() => navigateTo('/')}
            onSelectDemo={(slug) => navigateTo(`/makeup/${slug}`)}
          />
        ) : navState.route === 'store' ? (
          <CoursesAndProductsPage
            onBackToStudio={() => navigateTo('/')}
          />
        ) : (
          <StudioLandingPage
            onOpenDashboard={() => navigateTo('/dashboard')}
            onSwitchDemo={(slug) => navigateTo(`/makeup/${slug}`)}
          />
        )}
      </Suspense>
    </BusinessProvider>
  );
}
