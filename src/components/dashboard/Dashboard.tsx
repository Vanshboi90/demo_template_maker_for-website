import React, { useState } from 'react';
import { BusinessProfile } from '../../types/business';
import {
  getAllBusinesses,
  deleteBusiness,
  exportBusinessJSON,
  createShareableUrl
} from '../../services/businessService';
import { CreateDemoModal } from './CreateDemoModal';
import { ShareDemoModal } from './ShareDemoModal';
import { ASSETS } from '../../data';
import {
  Plus,
  Copy,
  Check,
  ExternalLink,
  Share2,
  Trash2,
  Edit,
  Download,
  Search,
  Sparkles,
  Layers,
  ArrowLeft,
  Calendar,
  Phone,
  MapPin,
  CheckCircle,
  Code,
  RefreshCw
} from 'lucide-react';

interface DashboardProps {
  onNavigateHome: () => void;
  onSelectDemo: (slug: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigateHome,
  onSelectDemo
}) => {
  const [businesses, setBusinesses] = useState<BusinessProfile[]>(() => getAllBusinesses());
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<BusinessProfile | null>(null);
  const [shareBusiness, setShareBusiness] = useState<BusinessProfile | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const reloadData = () => {
    setBusinesses(getAllBusinesses());
  };

  const handleSyncToCloud = async () => {
    setSyncing(true);
    try {
      for (const b of businesses) {
        await fetch('/api/demos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(b)
        });
      }
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } catch {
      // Ignore
    } finally {
      setSyncing(false);
    }
  };

  const handleDemoCreated = (created: BusinessProfile) => {
    setIsCreateOpen(false);
    setEditingBusiness(null);
    reloadData();
    setShareBusiness(created);
  };

  const handleDelete = (slug: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete demo "${name}" (${slug})?`)) {
      deleteBusiness(slug);
      reloadData();
    }
  };

  const handleCopyLink = (slug: string) => {
    const url = createShareableUrl(slug);
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const filtered = businesses.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.businessName.toLowerCase().includes(q) ||
      b.slug.toLowerCase().includes(q) ||
      b.address.city.toLowerCase().includes(q) ||
      b.phone.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#140c0a] font-sans flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#fdf9f4]/95 backdrop-blur-md border-b border-[#2b211f]/10 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-5 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#736a67] hover:text-[#140c0a] transition-colors p-2 rounded-lg hover:bg-[#ece6de]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Template</span>
            </button>
            <div className="h-5 w-px bg-[#2b211f]/15" />
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#140c0a]">
                Client Demo Hub
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#775a25]/10 text-[#775a25]">
                Vercel Ready
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSyncToCloud}
              disabled={syncing}
              title="Sync all demos to Upstash Cloud Database"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#2b211f]/15 text-[#140c0a] text-xs font-semibold uppercase tracking-wider hover:bg-[#eee7dd] shadow-xs transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#775a25] ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncSuccess ? 'Synced!' : syncing ? 'Syncing...' : 'Sync Cloud'}</span>
            </button>

            {/* Create Demo CTA */}
            <button
              onClick={() => {
                setEditingBusiness(null);
                setIsCreateOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2b211f] text-[#fdf9f4] text-xs font-semibold uppercase tracking-wider hover:bg-[#140c0a] shadow-md transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 text-[#ffd796]" />
              <span>Create Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-5 lg:px-12 py-10">
        
        {/* Banner Explainer */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#2b211f] to-[#3a2e2b] text-[#fdf9f4] shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd796]/15 text-[#ffd796] text-[11px] font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How Client Demos Work</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight mb-2">
              Send personalized landing page demos to prospective clients
            </h2>
            <p className="text-sm text-[#ddd4cc] font-light leading-relaxed mb-4">
              Click <strong>"Create Demo"</strong> to upload a JSON file or enter their business details and logo. Then click <strong>"Push"</strong> to instantly generate a custom link (e.g. <code className="bg-black/30 px-2 py-0.5 rounded text-[#ffd796]">/makeup/demo01</code>) that you can send directly to your client.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#eedfd5]">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#ffd796]" /> Dedicated business database
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#ffd796]" /> Custom logo per client
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#ffd796]" /> Shareable via WhatsApp or Link
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#736a67]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by studio name, slug or city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#2b211f]/10 text-xs text-[#140c0a] focus:outline-none focus:border-[#775a25] shadow-xs"
            />
          </div>

          <div className="text-xs text-[#736a67] font-medium self-end sm:self-center">
            Showing <strong className="text-[#140c0a]">{filtered.length}</strong> active client demo{filtered.length === 1 ? '' : 's'}
          </div>
        </div>

        {/* Demos Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#2b211f]/10 shadow-xs">
            <Layers className="w-12 h-12 text-[#a89f9b] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-medium text-[#140c0a] mb-1">
              No demos match your search
            </h3>
            <p className="text-xs text-[#736a67] max-w-sm mx-auto mb-4">
              Try a different keyword or create a new client demo right now.
            </p>
            <button
              onClick={() => {
                setEditingBusiness(null);
                setIsCreateOpen(true);
              }}
              className="px-4 py-2 rounded-lg bg-[#2b211f] text-[#fdf9f4] text-xs uppercase font-semibold"
            >
              Create New Demo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const clientUrl = createShareableUrl(item.slug);

              return (
                <div
                  key={item.slug}
                  className="bg-white rounded-2xl border border-[#2b211f]/10 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  {/* Card Header: Logo & Identity */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-[#f8f4ee] p-2 border border-[#2b211f]/10 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={item.logoUrl}
                          alt={item.businessName}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            if (target.src !== ASSETS.logo) {
                              target.src = ASSETS.logo;
                            }
                          }}
                        />
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#775a25]/10 text-[#775a25] font-semibold">
                          /makeup/{item.slug}
                        </span>
                        <span className="text-[10px] text-[#a89f9b]">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-[#140c0a] mb-1 line-clamp-1">
                      {item.businessName}
                    </h3>
                    <p className="text-xs text-[#775a25] font-medium mb-3 line-clamp-1">
                      {item.tagline}
                    </p>
                    <p className="text-xs text-[#736a67] font-light line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Metadata chips */}
                    <div className="space-y-1.5 text-xs text-[#524946] border-t border-[#2b211f]/5 pt-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#775a25] shrink-0" />
                        <span className="truncate">
                          {item.address.city}, {item.address.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#775a25] shrink-0" />
                        <span>{item.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-6 py-3.5 bg-[#fbf9f6] border-t border-[#2b211f]/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {/* Copy Link Button */}
                      <button
                        onClick={() => handleCopyLink(item.slug)}
                        title="Copy Client Link"
                        className="p-2 rounded-lg text-[#736a67] hover:text-[#140c0a] hover:bg-[#eee7dd] transition-colors"
                      >
                        {copiedSlug === item.slug ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Share Modal Button */}
                      <button
                        onClick={() => setShareBusiness(item)}
                        title="Share on WhatsApp / View Link"
                        className="p-2 rounded-lg text-[#736a67] hover:text-[#140c0a] hover:bg-[#eee7dd] transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      {/* Export JSON Button */}
                      <button
                        onClick={() => exportBusinessJSON(item)}
                        title="Download JSON Config"
                        className="p-2 rounded-lg text-[#736a67] hover:text-[#140c0a] hover:bg-[#eee7dd] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {/* Get Code Snippet for defaultBusinesses.ts */}
                      <button
                        onClick={() => setShareBusiness(item)}
                        title="View Code Snippet for defaultBusinesses.ts"
                        className="p-2 rounded-lg text-[#736a67] hover:text-[#775a25] hover:bg-[#eee7dd] transition-colors"
                      >
                        <Code className="w-4 h-4" />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          setEditingBusiness(item);
                          setIsCreateOpen(true);
                        }}
                        title="Edit Demo Details"
                        className="p-2 rounded-lg text-[#736a67] hover:text-[#140c0a] hover:bg-[#eee7dd] transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* Delete Button (keep demo01 protected) */}
                      {item.slug !== 'demo01' && (
                        <button
                          onClick={() => handleDelete(item.slug, item.businessName)}
                          title="Delete Demo"
                          className="p-2 rounded-lg text-[#736a67] hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Open Live Demo CTA */}
                    <button
                      onClick={() => onSelectDemo(item.slug)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2b211f] text-[#fdf9f4] text-xs font-semibold uppercase tracking-wider hover:bg-[#140c0a] transition-all shadow-xs"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#ffd796]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Modals */}
      <CreateDemoModal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingBusiness(null);
        }}
        onDemoCreated={handleDemoCreated}
        initialData={editingBusiness}
      />

      <ShareDemoModal
        isOpen={!!shareBusiness}
        onClose={() => setShareBusiness(null)}
        business={shareBusiness}
      />
    </div>
  );
};
