import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Sparkles, Award, HeartHandshake, Flame, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#110f0d] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#d97706]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-48 w-96 h-96 bg-[#f59e0b]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1913] border border-[#3d3121] text-[#f59e0b] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Royal Heritage</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdfbf7] tracking-tight">
            The Legend of <span className="text-[#f59e0b]">Nala & Bheema</span>
          </h2>
          <p className="mt-4 text-[#c7bcab] text-base sm:text-lg leading-relaxed">
            In ancient Indian history and epic lore, two figures stand supreme above all culinary masters: King Nala, author of the world’s first culinary treatise, and the mighty Bheema, whose royal feasts were celebrated across empires.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Storytelling & Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#3a2e20] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
                alt="Clay Pot Dum Cooking at Nala Bheema"
                className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-transparent opacity-80" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#171410]/95 backdrop-blur-md border border-[#3e3223] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#d97706] font-semibold tracking-wider uppercase">Legacy of Craft</div>
                  <div className="text-xl font-bold text-white font-royal">30+ Years of Royal Feasts</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#d97706]/20 border border-[#d97706]/50 flex items-center justify-center text-[#f59e0b] font-bold text-sm">
                  1994
                </div>
              </div>
            </div>

            {/* Accent Small Overlay Card */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 p-4 rounded-xl bg-[#1e1913] border border-[#4a3b2a] shadow-2xl items-center gap-3.5 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-[#d97706]/20 flex items-center justify-center text-[#f59e0b] flex-shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Handcrafted Earthen Pots</span>
                <span className="text-[#a89e8e]">Slow-cooked on low flame for deep aroma</span>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Philosophy & Pillars */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#f5f1ea]">
              Preserving Authentic Spices, Slow-Cooking, and Generous Hospitality
            </h3>

            <p className="text-[#b8ad9c] leading-relaxed text-sm sm:text-base">
              Founded with the vision to resurrect the authentic culinary grandeur of royal Deccan and South Indian royal durbars, <strong className="text-white font-semibold">Nala Bheema Restaurant</strong> honors ancient cooking traditions. We strictly ban artificial flavorings and processed colorants. Every dish is seasoned with whole spices sun-dried and pounded fresh in our kitchen each morning.
            </p>

            {/* 4 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#171410] border border-[#2b2217] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#f59e0b]">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
                  <span className="font-semibold text-sm text-white">Stone-Ground Spices</span>
                </div>
                <p className="text-xs text-[#9f9483]">
                  Granite mortar pounded masalas guaranteeing distinct, multi-layered aromas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171410] border border-[#2b2217] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#f59e0b]">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
                  <span className="font-semibold text-sm text-white">Clay Pot Dum Technique</span>
                </div>
                <p className="text-xs text-[#9f9483]">
                  Dough-sealed handis trapping natural juices and essence of aged basmati.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171410] border border-[#2b2217] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#f59e0b]">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
                  <span className="font-semibold text-sm text-white">Pure Desi Ghee & Freshness</span>
                </div>
                <p className="text-xs text-[#9f9483]">
                  Traditional cow ghee and farm-sourced meats prepared fresh every service.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171410] border border-[#2b2217] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#f59e0b]">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
                  <span className="font-semibold text-sm text-white">Warm Royal Hospitality</span>
                </div>
                <p className="text-xs text-[#9f9483]">
                  Attentive table captains dedicated to making every family meal memorable.
                </p>
              </div>
            </div>

            {/* Quick Legacy Metrics Bar */}
            <div className="pt-4 border-t border-[#262017] grid grid-cols-3 gap-2 text-center">
              {RESTAURANT_INFO.stats.slice(0, 3).map((stat, i) => (
                <div key={i} className="p-2">
                  <div className="font-royal text-xl sm:text-2xl font-bold text-[#f59e0b]">{stat.value}</div>
                  <div className="text-[11px] text-[#8e8474] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
