import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { Sparkles, LayoutDashboard, ChevronDown, Check, X, Share2, Lock } from 'lucide-react';
import { createShareableUrl } from '../../services/businessService';

interface DemoSwitcherBarProps {
  onOpenDashboard: () => void;
  onSwitchDemo: (slug: string) => void;
  onHide: () => void;
}

export const DemoSwitcherBar: React.FC<DemoSwitcherBarProps> = ({
  onOpenDashboard,
  onSwitchDemo,
  onHide
}) => {
  const { business, slug, allBusinesses } = useBusiness();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = createShareableUrl(slug);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside aria-label="Demo controls" className="fixed top-0 inset-x-0 z-50 bg-[#1c1412] text-[#fdf9f4] text-xs py-2 px-4 border-b border-[#ffd796]/20 shadow-md animate-in slide-in-from-top duration-300">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-3">
        {/* Left: Active Demo indicator */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffd796]/15 text-[#ffd796] text-[10px] font-semibold uppercase tracking-wider shrink-0">
            <Sparkles className="w-3 h-3 text-[#ffd796]" />
            <span className="hidden xs:inline">Template Demo:</span> {slug}
          </span>

          <span className="text-[#d8ceca] truncate text-[11px] sm:text-xs">
            Client: <strong className="text-white font-medium">{business.businessName}</strong>
          </span>
        </div>

        {/* Right: Switcher, Copy Link, Dashboard CTA, Lock/Hide */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Demo Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-2.5 py-1 rounded bg-[#2e2321] hover:bg-[#3d302d] text-[#e0d6d2] text-[11px] font-medium flex items-center gap-1 border border-[#ffd796]/10 transition-colors"
            >
              <span className="hidden sm:inline">Switch Demo</span>
              <ChevronDown className="w-3 h-3 text-[#ffd796]" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-60 bg-[#2b211f] border border-[#ffd796]/20 rounded-xl shadow-2xl py-1 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#a89f9b] font-semibold border-b border-white/5">
                  Select Active Demo
                </div>
                {allBusinesses.map((b) => (
                  <button
                    key={b.slug}
                    onClick={() => {
                      onSwitchDemo(b.slug);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                      b.slug === slug ? 'text-[#ffd796] font-semibold' : 'text-[#fdf9f4]'
                    }`}
                  >
                    <div className="truncate">
                      <div className="truncate">{b.businessName}</div>
                      <div className="text-[10px] text-[#a89f9b] font-mono">/makeup/{b.slug}</div>
                    </div>
                    {b.slug === slug && <Check className="w-3.5 h-3.5 text-[#ffd796] shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            title="Copy Client Link"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2e2321] hover:bg-[#3d302d] text-[#e0d6d2] text-[11px] font-medium border border-[#ffd796]/10 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3 text-[#ffd796]" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Open Dashboard CTA */}
          <button
            onClick={onOpenDashboard}
            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#ffd796] text-[#1c1412] text-[11px] font-bold uppercase tracking-wider hover:bg-[#ffe3b3] transition-colors shadow-xs"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Dashboard</span>
          </button>

          {/* Lock / Hide Bar */}
          <button
            onClick={onHide}
            title="Hide Demo Bar (Keep hidden from client)"
            className="flex items-center gap-1 p-1 px-1.5 rounded text-[#a89f9b] hover:text-white hover:bg-white/10 transition-colors text-[10px]"
          >
            <Lock className="w-3 h-3" />
            <span className="hidden md:inline">Hide</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
