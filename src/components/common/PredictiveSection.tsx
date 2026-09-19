import React, { useState, useEffect, useRef } from 'react';

interface PredictiveSectionProps {
  children: React.ReactNode;
  minHeight?: string;
  anticipationPx?: number;
  id?: string;
}

/**
 * PredictiveSection anticipates user scroll.
 * Using a wide rootMargin (default 1000px), it mounts and renders the upcoming section
 * well before the user's viewport reaches it, guaranteeing seamless 60fps scrolling
 * without popping or waiting.
 */
export const PredictiveSection: React.FC<PredictiveSectionProps> = ({
  children,
  minHeight = '320px',
  anticipationPx = 1000,
  id
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    // Predictive observer with large rootMargin
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight + anticipationPx)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: `${anticipationPx}px 0px`,
        threshold: 0
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Safety fallback: if user stays on page, render during idle time anyway
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 2500));
    const handle = idleCallback(() => {
      setShouldRender(true);
      observer.disconnect();
    });

    return () => {
      observer.disconnect();
      if (window.cancelIdleCallback && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      }
    };
  }, [anticipationPx]);

  return (
    <div
      id={id}
      ref={containerRef}
      style={{ minHeight: shouldRender ? 'auto' : minHeight }}
      className="w-full transition-opacity duration-300"
    >
      {shouldRender ? children : null}
    </div>
  );
};
