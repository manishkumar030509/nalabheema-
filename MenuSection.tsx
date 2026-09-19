import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem, MenuCategory, DietaryType } from '../types';
import { formatWhatsAppOrderUrl } from '../utils/hoursHelper';
import { Search, Flame, Sparkles, Plus, Check, MessageCircle, Info, X, Filter } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Record<string, number>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, cartItemIds }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const categories: { id: MenuCategory; label: string; count?: number }[] = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'specials', label: "Chef's Specials ⭐" },
    { id: 'biryani', label: 'Royal Biryanis' },
    { id: 'starters', label: 'Starters & Tandoori' },
    { id: 'curries', label: 'Royal Curries' },
    { id: 'thalis', label: 'Grand Thalis' },
    { id: 'breads', label: 'Tandoori Breads' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Kaapi & Drinks' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory === 'specials') {
        if (!item.isChefSpecial) return false;
      } else if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Dietary match
      if (dietaryFilter === 'veg' && !item.isVeg) return false;
      if (dietaryFilter === 'non-veg' && item.isVeg) return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTelugu = item.teluguName?.toLowerCase().includes(query);
        const matchesTag = item.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTelugu && !matchesTag) return false;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const renderSpiceIndicator = (level: number) => {
    const labels = ['Mild', 'Medium', 'Spicy', 'Fiery Royal Spice'];
    return (
      <div className="flex items-center gap-1 text-[11px] text-[#e5a93c]" title={`Spice: ${labels[level - 1]}`}>
        <div className="flex">
          {[1, 2, 3, 4].map((idx) => (
            <Flame
              key={idx}
              className={`w-3 h-3 ${
                idx <= level ? 'text-red-500 fill-red-500' : 'text-[#383025]'
              }`}
            />
          ))}
        </div>
        <span className="text-[#8c8273] ml-1">{labels[level - 1]}</span>
      </div>
    );
  };

  const handleDirectWhatsAppOrder = (item: MenuItem) => {
    const msg = `Namaste Nala Bheema! I would like to order: \n*1x ${item.name}* (₹${item.price})\nPlease confirm preparation time and delivery/takeaway options.`;
    const url = formatWhatsAppOrderUrl(RESTAURANT_INFO.whatsappNumber, msg);
    window.open(url, '_blank');
  };

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0a08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1813] border border-[#3b3022] text-[#f59e0b] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Royal Culinary Selection</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdfbf7]">
            Our Celebrated <span className="text-[#f59e0b]">Menu</span>
          </h2>
          <p className="mt-3 text-[#b5aa99] text-base">
            Crafted from ancient palace recipes, stone-ground masalas, and slow clay pot dum cooking. Add dishes to your order list or chat with our chef on WhatsApp.
          </p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#14120e] border border-[#2d251c]">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8c8273] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search biryani, starters, curries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#1d1914] border border-[#382f23] text-sm text-[#f5f1ea] placeholder-[#7d7568] focus:outline-none focus:border-[#d97706] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d7568] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Veg / Non-Veg Toggles */}
          <div className="flex items-center gap-1.5 bg-[#1b1713] p-1 rounded-xl border border-[#382f23] w-full md:w-auto justify-center">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-[#d97706] text-white shadow-sm'
                  : 'text-[#a3998b] hover:text-white'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                dietaryFilter === 'veg'
                  ? 'bg-[#15803d] text-white shadow-sm'
                  : 'text-[#86efac] hover:bg-[#15803d]/20'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-sm border border-[#22c55e] flex items-center justify-center p-0.5">
                <span className="w-1 h-1 rounded-full bg-[#22c55e]"></span>
              </span>
              <span>Pure Veg</span>
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                dietaryFilter === 'non-veg'
                  ? 'bg-[#b91c1c] text-white shadow-sm'
                  : 'text-[#fca5a5] hover:bg-[#b91c1c]/20'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-sm border border-[#ef4444] flex items-center justify-center p-0.5">
                <span className="w-1 h-1 rounded-full bg-[#ef4444]"></span>
              </span>
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="mb-10 overflow-x-auto pb-2 scrollbar-none flex items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#f59e0b] text-[#12100d] border-[#f59e0b] shadow-md shadow-[#f59e0b]/20 font-bold'
                    : 'bg-[#151310] text-[#c5bcad] border-[#2e261e] hover:border-[#4d3f31] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#14120e] rounded-2xl border border-[#292218]">
            <Filter className="w-8 h-8 text-[#8c8273] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-semibold text-white">No dishes match your filter</h3>
            <p className="text-sm text-[#8c8273] mt-1">Try switching categories or clearing search keywords.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#d97706] text-white text-xs font-semibold hover:bg-[#f59e0b]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qtyInCart = cartItemIds[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#14120e] border border-[#2b241b] overflow-hidden flex flex-col justify-between hover:border-[#f59e0b]/40 hover:shadow-xl hover:shadow-black/60 transition-all duration-300 group"
                >
                  {/* Card Top: Image & Badges */}
                  <div className="relative h-52 overflow-hidden bg-[#1f1a14]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14120e] via-transparent to-transparent opacity-90" />

                    {/* Veg / Non-Veg Indicator Icon */}
                    <div className="absolute top-3 left-3 bg-[#0c0a08]/90 backdrop-blur-sm p-1.5 rounded-md border border-[#382f23]">
                      <span
                        className={`w-3 h-3 rounded-sm border flex items-center justify-center p-0.5 ${
                          item.isVeg ? 'border-[#22c55e]' : 'border-[#ef4444]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isVeg ? 'bg-[#22c55e]' : 'bg-[#ef4444]'
                          }`}
                        />
                      </span>
                    </div>

                    {/* Special Badges (Chef Special / Bestseller) */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                      {item.isChefSpecial && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#d97706] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                          Chef Special
                        </span>
                      )}
                      {item.isBestseller && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1b1712]/90 border border-[#f59e0b]/40 text-[#f59e0b] text-[10px] font-semibold">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Portion Size Badge */}
                    {item.portionSize && (
                      <div className="absolute bottom-3 left-3 text-[11px] text-[#cfc5b4] bg-[#14120e]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                        {item.portionSize}
                      </div>
                    )}

                    {/* Quick Info Button */}
                    <button
                      onClick={() => setSelectedDish(item)}
                      className="absolute bottom-3 right-3 p-1.5 rounded-full bg-[#14120e]/90 text-[#c5bcad] hover:text-white hover:bg-[#d97706] transition-colors"
                      title="View details & recipe story"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Telugu local script subtitle if available */}
                      {item.teluguName && (
                        <div className="text-[11px] text-[#f59e0b] font-medium tracking-wide mb-1 opacity-90">
                          {item.teluguName}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-royal text-lg font-bold text-[#f5f1ea] group-hover:text-[#f59e0b] transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      {/* Spice indicator */}
                      <div className="mt-1.5">{renderSpiceIndicator(item.spicyLevel)}</div>

                      {/* Description */}
                      <p className="mt-2.5 text-xs text-[#a89d8d] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-[#1f1a14] text-[10px] text-[#8e8374] border border-[#2e261d]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price & Action Footer */}
                    <div className="mt-5 pt-4 border-t border-[#241e17] flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-[#807667] uppercase font-semibold">Price</div>
                        <div className="text-xl font-bold text-white font-royal">
                          ₹{item.price}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Direct WhatsApp Order Icon */}
                        <button
                          onClick={() => handleDirectWhatsAppOrder(item)}
                          className="p-2.5 rounded-xl bg-[#16291a] text-[#4ade80] hover:bg-[#1f3a25] border border-[#22c55e]/30 transition-colors"
                          title="Instant order via WhatsApp"
                          aria-label={`Order ${item.name} on WhatsApp`}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        {/* Add to Order Cart Button */}
                        <button
                          onClick={() => onAddToCart(item)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                            qtyInCart > 0
                              ? 'bg-[#f59e0b] text-[#12100d] shadow-md shadow-[#f59e0b]/30'
                              : 'bg-[#292219] hover:bg-[#d97706] text-white border border-[#403425] hover:border-[#d97706]'
                          }`}
                        >
                          {qtyInCart > 0 ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added ({qtyInCart})</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* WhatsApp Food Ordering Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#17261a] to-[#12100d] border border-[#22c55e]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e] flex-shrink-0">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
                Craving Royal Clay Pot Biryani at Home?
              </h3>
              <p className="text-xs sm:text-sm text-[#c4d8c7] mt-1">
                Order directly on WhatsApp for prompt takeaway & door delivery. Hot earthen handis delivered fresh.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
              'Namaste! I would like to order food for home delivery / takeaway from Nala Bheema.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm shadow-xl shadow-[#22c55e]/20 transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Chat & Order on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#171410] border border-[#3e3223] overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-[#d97706] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 w-full relative overflow-hidden">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171410] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs text-[#f59e0b] font-semibold">{selectedDish.teluguName}</span>
                <h3 className="font-royal text-2xl font-bold text-white">{selectedDish.name}</h3>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-[#f59e0b] font-royal">
                  ₹{selectedDish.price}
                </span>
                {renderSpiceIndicator(selectedDish.spicyLevel)}
              </div>

              <p className="text-sm text-[#cfc4b4] leading-relaxed mb-6">
                {selectedDish.description}
              </p>

              <div className="bg-[#1e1913] p-4 rounded-xl border border-[#2d251d] mb-6">
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Master Chef’s Heritage Note
                </div>
                <p className="text-xs text-[#9d9282]">
                  Cooked using traditional earthen cookware and cold-pressed oils. Best enjoyed fresh and piping hot.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handleDirectWhatsAppOrder(selectedDish);
                    setSelectedDish(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#162d1c] border border-[#22c55e]/50 text-[#4ade80] font-bold text-sm hover:bg-[#1e4027] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#22c55e]" />
                  <span>Order via WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    onAddToCart(selectedDish);
                    setSelectedDish(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#d97706] hover:bg-[#f59e0b] text-white font-bold text-sm shadow-md transition-colors"
                >
                  Add to Order Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
