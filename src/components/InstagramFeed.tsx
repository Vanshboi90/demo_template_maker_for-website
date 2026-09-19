import React, { useState } from 'react';
import { ExternalLink, Play, Heart, MessageCircle, Music2, Eye, Share2, X, Sparkles, Volume2 } from 'lucide-react';

import reelBridalReveal from '../assets/images/reel_bridal_reveal.webp';
import reelGlassSkin from '../assets/images/reel_glass_skin.webp';
import reelHairChignon from '../assets/images/reel_hair_chignon.webp';
import reelSangeetGlam from '../assets/images/reel_sangeet_glam.webp';
import reelTempleBride from '../assets/images/reel_temple_bride.webp';
import reelCocktailWaves from '../assets/images/reel_cocktail_waves.webp';
import portCrimsonBride from '../assets/images/port_crimson_bride.webp';
import portRoseRadiance from '../assets/images/port_rose_radiance.webp';

export interface ReelItem {
  id: string;
  title: string;
  category: string;
  views: string;
  duration: string;
  audioTrack: string;
  likes: string;
  comments: string;
  image: string;
  description: string;
}

const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Behind The Veil • Royal Bridal Reveal',
    category: 'Bridal Couture',
    views: '148K',
    duration: '0:38',
    audioTrack: 'Original Audio • Indian Classical Fusion',
    likes: '14.2K',
    comments: '428',
    image: reelBridalReveal,
    description: 'Final touches on the maang tikka and veil draping for Ananya’s royal palace wedding in Pune.'
  },
  {
    id: 'reel-2',
    title: 'Glass Skin Radiance in 4 Precision Steps',
    category: 'Masterclass',
    views: '219K',
    duration: '0:45',
    audioTrack: 'Lumera Atelier • Soft Chill Beats',
    likes: '26.8K',
    comments: '890',
    image: reelGlassSkin,
    description: 'Layering hydraulic serum, micro-buffing cream base, and 24k liquid highlight for true non-greasy glow.'
  },
  {
    id: 'reel-3',
    title: 'Fresh Mogra & Pearl Chignon Hair Sculpting',
    category: 'Hair Artistry',
    views: '94K',
    duration: '0:32',
    audioTrack: 'Sitar & Lo-Fi Waves • Pune Sessions',
    likes: '9.4K',
    comments: '215',
    image: reelHairChignon,
    description: 'Hand-woven fresh jasmine buds wrapped around an architectural textured low bridal chignon.'
  },
  {
    id: 'reel-4',
    title: 'Sparkling Sangeet Eyes Under Golden Spotlights',
    category: 'Party Glam',
    views: '182K',
    duration: '0:29',
    audioTrack: 'Trending Remix • Dhol & Synth',
    likes: '18.1K',
    comments: '530',
    image: reelSangeetGlam,
    description: 'Waterproof duo-chrome rose gold glitter pigment crafted to withstand hours on the sangeet dancefloor.'
  },
  {
    id: 'reel-5',
    title: 'Muhurtham Saree Draping & Temple Choker Glow',
    category: 'Heritage Bride',
    views: '167K',
    duration: '0:52',
    audioTrack: 'Nadaswaram Melodies • Wedding Morning',
    likes: '15.6K',
    comments: '380',
    image: reelTempleBride,
    description: 'Crisp Kanjivaram pleating and sacred temple jewelry harmonization with matte terracotta blush.'
  },
  {
    id: 'reel-6',
    title: 'Sculpted Red Carpet Hollywood Waves Transformation',
    category: 'Cocktail Gala',
    views: '112K',
    duration: '0:36',
    audioTrack: 'Midnight Glamour • Studio Acoustic',
    likes: '11.3K',
    comments: '290',
    image: reelCocktailWaves,
    description: 'Thermal set S-waves brushed out with marula oil for liquid glass shine and all-night bounce.'
  },
  {
    id: 'reel-7',
    title: 'Crimson Heirloom Lehenga & 24K Leaf Radiance',
    category: 'Royal Wedding',
    views: '204K',
    duration: '0:41',
    audioTrack: 'Kudmai Shenai • Royal Procession',
    likes: '22.5K',
    comments: '710',
    image: portCrimsonBride,
    description: 'Rich kohl smoked wing paired with hand-applied 24k gold leaf skin luminosity.'
  },
  {
    id: 'reel-8',
    title: 'Monochromatic Rose Quartz Dewy Finish',
    category: 'Daytime Soirée',
    views: '88K',
    duration: '0:30',
    audioTrack: 'Acoustic Morning • Soft Glow',
    likes: '8.7K',
    comments: '184',
    image: portRoseRadiance,
    description: 'Effortless daytime skin with brushed feathery brows and monochromatic velvet rose lip stain.'
  }
];

export const InstagramFeed: React.FC = () => {
  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);

  // Duplicated reel array for a seamless infinite loop
  const loopReels = [...REELS, ...REELS];

  return (
    <section className="w-full py-20 lg:py-28 bg-[#f7f3ee] border-y border-[#2b211f]/5 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-12 mb-10 sm:mb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25]">
                BEHIND THE SCENES
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#140c0a] text-[#ffd796] text-[10px] font-medium tracking-wide">
                <Play className="w-2.5 h-2.5 fill-[#ffd796]" />
                <span>Reels Lookbook</span>
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#140c0a] tracking-tight mt-2 font-normal">
              Trending Atelier Transformations
            </h2>
            <p className="text-sm sm:text-base text-[#4e4543] font-light max-w-xl mt-1">
              Watch real brides, backstage rituals, and step-by-step masterclasses. Hover any reel to pause and spotlight.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ffffff] text-[#140c0a] hover:bg-[#140c0a] hover:text-[#fdf9f4] text-[12px] font-semibold uppercase tracking-wider border border-[#2b211f]/10 shadow-xs hover:shadow-md transition-all self-start sm:self-auto"
          >
            <span>Follow @lumerabeautystudio</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#775a25]" />
          </a>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Track */}
      <div
        className="w-full relative py-6 select-none"
        onMouseLeave={() => setHoveredReelId(null)}
      >
        {/* Left & Right subtle edge gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#f7f3ee] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#f7f3ee] to-transparent z-20 pointer-events-none"></div>

        <div
          className={`animate-reel-marquee gap-5 sm:gap-6 px-4 ${hoveredReelId ? 'pause-marquee' : ''}`}
          style={{ animationPlayState: hoveredReelId ? 'paused' : 'running' }}
        >
          {loopReels.map((reel, index) => {
            const uniqueKey = `${reel.id}-${index}`;
            const isHovered = hoveredReelId === uniqueKey;
            const hasAnyHover = hoveredReelId !== null;

            return (
              <div
                key={uniqueKey}
                onMouseEnter={() => setHoveredReelId(uniqueKey)}
                onClick={() => setSelectedReel(reel)}
                className={`group relative w-[200px] sm:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform-gpu bg-[#140c0a] shrink-0 border ${
                  isHovered
                    ? 'scale-[1.08] z-30 shadow-2xl ring-2 ring-[#ffd796] border-[#ffd796]'
                    : hasAnyHover
                    ? 'opacity-40 scale-[0.95] blur-[0.4px] border-[#2b211f]/10'
                    : 'scale-100 shadow-md hover:shadow-xl border-[#2b211f]/10'
                }`}
              >
                {/* Reel Cover Image (9:16 vertical) */}
                <img
                  src={reel.image}
                  alt={reel.title}
                  className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Permanent Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a]/95 via-[#140c0a]/35 to-[#140c0a]/40 p-4 flex flex-col justify-between">
                  
                  {/* Top Bar: Category Pill & Views Pill */}
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#140c0a]/70 backdrop-blur-md text-[9px] font-semibold uppercase tracking-wider text-[#ffd796] border border-[#ffd796]/30">
                      {reel.category}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffffff]/20 backdrop-blur-md text-[10px] font-medium text-[#ffffff]">
                      <Eye className="w-3 h-3 text-[#ffd796]" />
                      <span>{reel.views}</span>
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="self-center my-auto">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#ffd796] text-[#140c0a] scale-110 shadow-lg'
                          : 'bg-[#ffffff]/30 text-[#ffffff] group-hover:scale-105'
                      }`}
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Caption, Soundwave & Actions */}
                  <div className="space-y-1.5">
                    {/* Audio track tag */}
                    <div className="flex items-center gap-1.5 text-[10px] text-[#ffd796] font-medium truncate">
                      <Music2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{reel.audioTrack}</span>
                    </div>

                    {/* Reel Title */}
                    <h4 className="text-[13px] sm:text-[14px] font-medium text-[#ffffff] leading-snug line-clamp-2">
                      {reel.title}
                    </h4>

                    {/* Likes & Comments Counters */}
                    <div className="flex items-center justify-between text-[11px] text-[#e8e4e0] pt-1 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-[#ff8f8f] fill-[#ff8f8f]/30" />
                          <span>{reel.likes}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-[#ffd796]" />
                          <span>{reel.comments}</span>
                        </span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-[#ffd796] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Watch →
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Reel Detail / Watch Modal */}
      {selectedReel && (
        <div
          className="fixed inset-0 z-50 bg-[#140c0a]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedReel(null)}
        >
          <div
            className="relative bg-[#140c0a] rounded-3xl overflow-hidden max-w-sm w-full border border-[#ffd796]/30 shadow-2xl flex flex-col aspect-[9/16] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background 9:16 Video Poster */}
            <img
              src={selectedReel.image}
              alt={selectedReel.title}
              className="w-full h-full object-cover object-[center_15%]"
            />

            {/* Modal Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a] via-[#140c0a]/30 to-[#140c0a]/60 p-6 flex flex-col justify-between text-white">
              {/* Top Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#775a25] flex items-center justify-center text-[11px] font-bold text-[#ffd796]">
                    L
                  </div>
                  <div>
                    <span className="text-xs font-semibold block text-white">@lumerabeautystudio</span>
                    <span className="text-[10px] text-[#ffd796] block uppercase tracking-wider">Pune Atelier</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedReel(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Center Play Pulse */}
              <div className="self-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#ffd796] text-[#140c0a] flex items-center justify-center shadow-xl mb-2 mx-auto animate-pulse">
                  <Play className="w-7 h-7 fill-[#140c0a] ml-1" />
                </div>
                <span className="text-xs bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white/90">
                  {selectedReel.duration} • HD Reel Preview
                </span>
              </div>

              {/* Bottom Reel Data */}
              <div className="space-y-3">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#ffd796]/20 text-[#ffd796] text-[10px] font-semibold uppercase tracking-wider mb-1.5 border border-[#ffd796]/30">
                    {selectedReel.category}
                  </span>
                  <h3 className="font-serif text-lg text-white font-medium leading-snug">
                    {selectedReel.title}
                  </h3>
                  <p className="text-xs text-white/80 font-light mt-1 leading-relaxed">
                    {selectedReel.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#ffd796] bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                  <Volume2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{selectedReel.audioTrack}</span>
                </div>

                {/* Social Stats & Direct Action Button */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-white/90">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-[#ff8f8f] fill-[#ff8f8f]" />
                      <span>{selectedReel.likes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-[#ffd796]" />
                      <span>{selectedReel.comments}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-4 h-4 text-white" />
                    </span>
                  </div>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#ffd796] text-[#140c0a] px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    <span>Watch on Insta</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
