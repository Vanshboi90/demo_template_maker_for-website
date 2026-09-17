import React, { useState } from 'react';
import { BusinessProfile } from '../../types/business';
import { createShareableUrl, getBusinessCodeSnippet } from '../../services/businessService';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Code,
  Sparkles,
  Globe
} from 'lucide-react';

interface ShareDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: BusinessProfile | null;
}

export const ShareDemoModal: React.FC<ShareDemoModalProps> = ({
  isOpen,
  onClose,
  business
}) => {
  const [copiedClean, setCopiedClean] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCode, setShowCode] = useState(false);

  if (!isOpen || !business) return null;

  // Clean normal link to share with clients: /makeup/{slug}
  const normalUrl = createShareableUrl(business.slug);
  const codeSnippet = getBusinessCodeSnippet(business);

  const handleCopy = (text: string, type: 'normal' | 'code') => {
    navigator.clipboard.writeText(text);
    if (type === 'normal') {
      setCopiedClean(true);
      setTimeout(() => setCopiedClean(false), 2500);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! Here is the personalized beauty studio & bridal demo created exclusively for you: ${normalUrl}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#140c0a]/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fdf9f4] w-full max-w-xl rounded-2xl shadow-2xl border border-[#2b211f]/10 overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#f8f4ee] border-b border-[#2b211f]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#140c0a] font-medium">
                Client Demo Link Ready!
              </h3>
              <p className="text-xs text-[#736a67]">
                Personalized template link for <strong className="text-[#140c0a]">{business.businessName}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-[#736a67] hover:text-[#140c0a] hover:bg-[#ece6de] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Business Preview Card */}
          <div className="p-4 rounded-xl bg-white border border-[#2b211f]/10 flex items-center gap-4 shadow-xs">
            <div className="w-14 h-14 rounded-lg bg-[#f8f4ee] p-1.5 border border-[#2b211f]/10 shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src={business.logoUrl}
                alt={business.businessName}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-serif text-base font-semibold text-[#140c0a] truncate">
                {business.businessName}
              </h4>
              <p className="text-xs text-[#775a25] font-medium truncate">
                {business.tagline}
              </p>
              <p className="text-[11px] text-[#736a67] truncate mt-0.5">
                {business.address.city}, {business.address.state} • {business.phone}
              </p>
            </div>
          </div>

          {/* PRIMARY: Clean Normal Client Link */}
          <div className="p-4 rounded-xl bg-[#f5ede2]/70 border border-[#775a25]/25 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#775a25] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Client Demo Link</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Ready to Share
              </span>
            </div>
            <p className="text-[11px] text-[#736a67] leading-relaxed">
              Send this clean link to your client on WhatsApp, Instagram, or email. They can view the personalized studio website directly.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={normalUrl}
                className="flex-1 px-3 py-2 rounded-lg bg-white border border-[#2b211f]/20 font-mono text-xs text-[#140c0a] select-all focus:outline-none truncate"
              />
              <button
                type="button"
                onClick={() => handleCopy(normalUrl, 'normal')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 ${
                  copiedClean
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2b211f] text-[#fdf9f4] hover:bg-[#140c0a]'
                }`}
              >
                {copiedClean ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons: Open & WhatsApp */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={normalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#2b211f]/15 text-xs font-semibold uppercase tracking-wider text-[#140c0a] hover:bg-[#eee7dd] transition-colors shadow-xs"
            >
              <ExternalLink className="w-4 h-4 text-[#775a25]" />
              <span>Test Live Demo</span>
            </a>

            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20bd5a] transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send on WhatsApp</span>
            </a>
          </div>

          {/* SECONDARY: Add Permanently to Code Snippet */}
          <div className="pt-3 border-t border-[#2b211f]/10">
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="text-xs text-[#775a25] font-semibold hover:underline flex items-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showCode ? 'Hide Code' : 'Want to add this demo directly into defaultBusinesses.ts code?'}</span>
            </button>

            {showCode && (
              <div className="mt-3 p-4 rounded-xl bg-white border border-[#2b211f]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[#736a67]">
                    Copy this snippet and paste it into <strong className="text-[#140c0a] font-mono">src/data/defaultBusinesses.ts</strong> to permanently bake it into the website code:
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(codeSnippet, 'code')}
                    className="px-3 py-1 rounded bg-[#775a25] text-white text-xs font-medium hover:bg-[#634b1e] shrink-0"
                  >
                    {copiedCode ? 'Copied Code' : 'Copy Snippet'}
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={8}
                  value={codeSnippet}
                  className="w-full p-2.5 rounded bg-[#f7f3ee] border border-[#2b211f]/15 font-mono text-[10px] text-[#140c0a] select-all leading-relaxed"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#f8f4ee] border-t border-[#2b211f]/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#2b211f] text-[#fdf9f4] text-xs uppercase font-semibold tracking-wider hover:bg-[#140c0a]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
