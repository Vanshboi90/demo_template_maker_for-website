import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BusinessProfile } from '../types/business';
import { getAllBusinesses, getBusinessBySlug, saveBusiness } from '../services/businessService';
import { DEFAULT_BUSINESS_PROFILES } from '../data/defaultBusinesses';

interface BusinessContextType {
  business: BusinessProfile;
  slug: string;
  allBusinesses: BusinessProfile[];
  isLoading: boolean;
  setSlug: (slug: string) => void;
  reloadBusinesses: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{
  currentSlug?: string;
  children: React.ReactNode;
}> = ({ currentSlug, children }) => {
  const [allBusinesses, setAllBusinesses] = useState<BusinessProfile[]>(() => getAllBusinesses());
  const [activeSlug, setActiveSlug] = useState<string>(() => {
    return currentSlug || 'demo01';
  });

  const reloadBusinesses = () => {
    const list = getAllBusinesses();
    setAllBusinesses(list);
  };

  useEffect(() => {
    if (currentSlug && currentSlug !== activeSlug) {
      setActiveSlug(currentSlug);
    }
  }, [currentSlug]);

  // Sync with cloud database on load
  useEffect(() => {
    fetch('/api/demos')
      .then((res) => (res.ok ? res.json() : null))
      .then((list) => {
        if (Array.isArray(list) && list.length > 0) {
          list.forEach((item) => {
            if (item && item.slug && item.businessName) {
              saveBusiness(item);
            }
          });
          setAllBusinesses(getAllBusinesses());
        }
      })
      .catch(() => {
        // Offline / static fallback
      });
  }, []);

  // Async API fallback: If specific demo is not in local storage, fetch from /api/demos (Upstash / Cloud DB)
  useEffect(() => {
    const local = getBusinessBySlug(activeSlug);
    if (!local) {
      fetch(`/api/demos?slug=${encodeURIComponent(activeSlug)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.businessName && data.slug) {
            saveBusiness(data);
            const updated = getAllBusinesses();
            setAllBusinesses(updated);
          }
        })
        .catch(() => {
          // Ignore offline / static
        });
    }
  }, [activeSlug]);

  const business = useMemo(() => {
    const found = getBusinessBySlug(activeSlug) || allBusinesses.find((b) => b.slug.toLowerCase() === activeSlug.toLowerCase());
    if (found) return found;
    return allBusinesses[0] || DEFAULT_BUSINESS_PROFILES[0];
  }, [activeSlug, allBusinesses]);

  // Dynamically update document title and brand styles
  useEffect(() => {
    if (business) {
      document.title = `${business.businessName} — ${business.tagline}`;
      
      // Update theme accent if provided
      if (business.theme?.accentColor) {
        document.documentElement.style.setProperty('--brand-accent', business.theme.accentColor);
      }
    }
  }, [business]);

  return (
    <BusinessContext.Provider
      value={{
        business,
        slug: activeSlug,
        allBusinesses,
        isLoading: false,
        setSlug: setActiveSlug,
        reloadBusinesses
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
