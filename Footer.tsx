import React from 'react';
import { Logo } from './Logo';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, Mail, MapPin, MessageCircle, Heart, ArrowUp, ShieldCheck, Clock } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About the Legend', href: '#about' },
    { name: 'Royal Menu', href: '#menu' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Hours & Location', href: '#hours' },
    { name: 'Guest Reviews', href: '#reviews' },
    { name: 'Table Booking', href: '#contact' },
  ];

  return (
    <footer className="bg-[#0a0907] border-t border-[#241e17] text-[#c7beaf] pt-16 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#211b15]">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Logo size="lg" />
            <p className="text-xs sm:text-sm text-[#9e9383] leading-relaxed mt-2 max-w-sm">
              {RESTAURANT_INFO.subheading}
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-[#d97706] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#f59e0b]" />
              <span>100% Halal Certified Meats • Pure Desi Ghee</span>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#172b1c] border border-[#22c55e]/40 text-[#4ade80] text-xs font-bold hover:bg-[#1f3f27] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#22c55e]" />
                <span>WhatsApp Hospitality Desk</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-royal text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-[#f59e0b] transition-colors flex items-center gap-1.5"
                  >
                    <span>›</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Hours */}
          <div className="lg:col-span-3">
            <h4 className="font-royal text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f59e0b]" />
              <span>Dining Timings</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#14120e] border border-[#262017]">
                <div className="font-bold text-white">Lunch Service</div>
                <div className="text-[#8e8373] mt-0.5">Monday – Sunday</div>
                <div className="text-[#f59e0b] font-mono font-semibold mt-1">11:30 AM – 03:30 PM</div>
              </div>

              <div className="p-3 rounded-xl bg-[#14120e] border border-[#262017]">
                <div className="font-bold text-white">Dinner Service</div>
                <div className="text-[#8e8373] mt-0.5">Mon – Thu: Till 11:00 PM</div>
                <div className="text-[#f59e0b] font-mono font-semibold mt-1">07:00 PM – 11:30 PM (Fri–Sun)</div>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-royal text-sm font-bold text-white uppercase tracking-wider mb-4">
              Visit Us
            </h4>
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d97706] flex-shrink-0 mt-0.5" />
                <span>
                  {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city} – {RESTAURANT_INFO.pincode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d97706] flex-shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white font-medium">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d97706] flex-shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white">
                  {RESTAURANT_INFO.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#d97706] hover:bg-[#f59e0b] text-white font-bold text-xs text-center shadow transition-colors"
                >
                  Book a Table Online
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7e7465]">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved. Crafting authentic heritage recipes with pride.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/nalabheema-restaurant-project.zip"
              download="nalabheema-restaurant-project.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f1a14] hover:bg-[#2b241c] text-[#f59e0b] border border-[#382f23] transition-colors"
              title="Download full project code as ZIP"
            >
              <span>Download Project ZIP</span>
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#f59e0b] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
