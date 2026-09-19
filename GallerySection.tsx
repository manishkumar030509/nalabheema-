import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'dishes' | 'ambience' | 'tradition' | 'events'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'dishes', label: 'Signature Dishes' },
    { id: 'ambience', label: 'Royal Ambience' },
    { id: 'tradition', label: 'Culinary Traditions' },
    { id: 'events', label: 'Private Banquets' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  const activeItem: GalleryItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#110f0d] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1813] border border-[#3b3022] text-[#f59e0b] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Glimpses</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdfbf7]">
            The <span className="text-[#f59e0b]">Nala Bheema</span> Gallery
          </h2>
          <p className="mt-3 text-[#b5aa99] text-base">
            Take a visual journey through our clay-pot tandoor kitchens, opulent family dining cabanas, and lavish royal banquet feasts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id as any);
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                filter === cat.id
                  ? 'bg-[#d97706] text-white border-[#d97706] shadow-md shadow-[#d97706]/20'
                  : 'bg-[#181511] text-[#b8ae9f] border-[#2f271e] hover:border-[#4d3f31] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-[#2e261d] bg-[#1a1713] shadow-lg hover:border-[#f59e0b]/50 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="w-9 h-9 rounded-full bg-[#d97706] text-white flex items-center justify-center mb-3 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <h3 className="font-royal text-base font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#cfc5b4] mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom Subtle Bar when not hovered */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#0c0a08]/90 to-transparent group-hover:opacity-0 transition-opacity">
                <span className="text-xs font-medium text-white truncate block">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-[#1e1913] text-white hover:bg-[#d97706] transition-colors border border-[#3e3223]"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#1e1913]/90 text-white hover:bg-[#d97706] transition-colors border border-[#3e3223]"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#1e1913]/90 text-white hover:bg-[#d97706] transition-colors border border-[#3e3223]"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content Container */}
          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-[#171410] border border-[#382d20] shadow-2xl">
            <div className="relative flex-1 max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-5 sm:p-6 bg-[#171410] border-t border-[#2d2419] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#f59e0b] uppercase tracking-wider block mb-1">
                  Photo {(activeLightboxIndex ?? 0) + 1} of {filteredItems.length}
                </span>
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#b5aa99] mt-1 max-w-xl">
                  {activeItem.description}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#241e17] border border-[#3a3023] text-xs text-[#d97706] font-semibold">
                  Nala Bheema Kitchen
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
