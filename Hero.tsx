import React from 'react';
import { Logo } from './Logo';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getRestaurantCurrentStatus } from '../utils/hoursHelper';
import { ArrowRight, Calendar, MessageCircle, Utensils, Star, ShieldCheck, Flame, Clock } from 'lucide-react';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const status = getRestaurantCurrentStatus();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappHref = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Namaste! I would like to book a table / place a food order with Nala Bheema Restaurant.'
  )}`;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0c0a08]"
    >
      {/* Background Hero Image with Dark Luxury Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="Nala Bheema Restaurant Dining Ambience"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.28] contrast-125 transition-transform duration-1000 ease-out"
        />
        {/* Radial dark gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/80 to-[#0c0a08]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Decorative Traditional Border Motifs */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none opacity-20">
        <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-[#d97706]" />
        <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-[#d97706]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Pill & Heritage Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1b1712]/90 border border-[#3b3022] shadow-xl backdrop-blur-md mb-6">
          <div className="flex items-center gap-1.5 text-xs text-[#f59e0b] font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{status.statusText}</span>
          </div>
          <span className="text-[#4a3e2f] hidden sm:inline">•</span>
          <div className="flex items-center gap-1 text-xs text-[#e6ded1] font-medium">
            <Flame className="w-3.5 h-3.5 text-[#d97706]" />
            <span>Royal Clay Pot Dum Kitchen</span>
          </div>
          <span className="text-[#4a3e2f] hidden sm:inline">•</span>
          <span className="text-xs text-[#d97706] font-semibold tracking-wider uppercase">Est. 1994</span>
        </div>

        {/* Hero Logo Crest */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <Logo size="xl" showText={false} />
        </div>

        {/* Main Royal Heading */}
        <h1 className="font-royal text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fdfbf7] leading-[1.15] max-w-4xl">
          Where <span className="text-[#f59e0b]">Royal Heritage</span> Meets Culinary Mastery
        </h1>

        {/* Subtitle / Narrative */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#cfc5b4] max-w-2xl font-normal leading-relaxed">
          Inspired by ancient epic cooks <strong className="text-[#f59e0b] font-semibold">Nala and Bheema</strong>. Hand-roasted spices, pure churned ghee, and legendary dum biryanis cooked to timeless perfection.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-lg">
          {/* Primary View Menu CTA */}
          <button
            onClick={() => handleScrollTo('menu')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#f59e0b] hover:to-[#d97706] text-white font-semibold text-base shadow-xl shadow-[#d97706]/25 transition-all duration-200 active:scale-95 group"
          >
            <Utensils className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span>Explore Royal Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Book Table CTA */}
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1e1913] hover:bg-[#2a231b] border border-[#423525] hover:border-[#f59e0b]/60 text-[#f5f1ea] font-semibold text-base transition-all duration-200 active:scale-95"
          >
            <Calendar className="w-5 h-5 text-[#d97706]" />
            <span>Reserve Table</span>
          </button>

          {/* Direct WhatsApp Ordering */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#142618] hover:bg-[#1a3821] border border-[#22c55e]/50 text-[#4ade80] font-semibold text-base transition-all duration-200 shadow-md"
          >
            <MessageCircle className="w-5 h-5 text-[#22c55e]" />
            <span>WhatsApp Order</span>
          </a>
        </div>

        {/* Trust Badges & Highlights Grid */}
        <div className="mt-12 pt-8 border-t border-[#2a2319] w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14120e]/60 border border-[#262017]">
            <div className="w-10 h-10 rounded-lg bg-[#d97706]/15 flex items-center justify-center flex-shrink-0 text-[#f59e0b]">
              <Star className="w-5 h-5 fill-[#f59e0b]" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-[#f5f1ea]">4.9 / 5.0 Rating</div>
              <div className="text-xs text-[#8c8273]">Google & Zomato</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14120e]/60 border border-[#262017]">
            <div className="w-10 h-10 rounded-lg bg-[#d97706]/15 flex items-center justify-center flex-shrink-0 text-[#f59e0b]">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-[#f5f1ea]">Clay Pot Dum</div>
              <div className="text-xs text-[#8c8273]">Slow-fired over coals</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14120e]/60 border border-[#262017]">
            <div className="w-10 h-10 rounded-lg bg-[#d97706]/15 flex items-center justify-center flex-shrink-0 text-[#f59e0b]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-[#f5f1ea]">100% Pure Ghee</div>
              <div className="text-xs text-[#8c8273]">Halal & Fresh Daily</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14120e]/60 border border-[#262017]">
            <div className="w-10 h-10 rounded-lg bg-[#d97706]/15 flex items-center justify-center flex-shrink-0 text-[#f59e0b]">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-[#f5f1ea]">Lunch & Dinner</div>
              <div className="text-xs text-[#8c8273]">Open 7 Days a Week</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
