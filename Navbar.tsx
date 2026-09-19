import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getRestaurantCurrentStatus } from '../utils/hoursHelper';
import { Phone, Calendar, MessageCircle, Menu as MenuIcon, X, Clock, MapPin, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation, cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const status = getRestaurantCurrentStatus();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'menu', 'gallery', 'hours', 'reviews', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Hours & Location', href: '#hours', id: 'hours' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappHref = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Namaste Nala Bheema! I would like to inquire about table booking / today\'s special menu.'
  )}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro-banner */}
      <div className="bg-[#171410] border-b border-[#2d251d] text-xs text-[#c5bcad] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#f59e0b]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-medium tracking-wide uppercase">{status.statusText}</span>
              <span className="text-[#8c8273] font-normal">({status.nextEvent})</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#f59e0b] transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Hitec City Road, Hyderabad</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-[#f59e0b] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Call: {RESTAURANT_INFO.phone}</span>
            </a>
            <span className="text-[#41392f]">|</span>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#4ade80] hover:text-[#86efac] font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Quick WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0e0cd9] backdrop-blur-md py-3 shadow-xl border-b border-[#2a241b]'
            : 'bg-gradient-to-b from-[#0f0e0ce6] to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="cursor-pointer group focus:outline-none"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-[#1a1612]/70 px-4 py-1.5 rounded-full border border-[#332b21] shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#d97706] text-white shadow-md shadow-[#d97706]/30'
                      : 'text-[#d3cbbe] hover:text-white hover:bg-[#252019]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp Order / Inquire Button */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#162d1c] border border-[#22c55e]/40 text-[#4ade80] hover:bg-[#1f3f27] hover:border-[#22c55e] transition-all duration-200"
              title="Chat with Nala Bheema on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#22c55e]" />
              <span>WhatsApp Us</span>
            </a>

            {/* Cart / WhatsApp Order Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#1e1914] border border-[#382f23] text-[#e8ded0] hover:text-[#f59e0b] hover:border-[#d97706] transition-colors focus:outline-none"
              title="View WhatsApp Order List"
              aria-label="Order Cart"
            >
              <UtensilsCrossed className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d97706] text-white text-[10px] font-bold flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Reservation Button */}
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#d97706] to-[#b45309] text-white hover:from-[#f59e0b] hover:to-[#d97706] shadow-lg shadow-[#d97706]/25 transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table</span>
            </button>
          </div>

          {/* Mobile hamburger & cart button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full bg-[#1e1914] border border-[#382f23] text-[#e8ded0] hover:text-[#f59e0b]"
              aria-label="View Order"
            >
              <UtensilsCrossed className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d97706] text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#1a1612] border border-[#332b21] text-[#e8ded0] hover:text-[#f59e0b] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12100d]/98 backdrop-blur-xl border-b border-[#2d251d] px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#d97706]/20 text-[#f59e0b] font-semibold border-l-2 border-[#f59e0b]'
                    : 'text-[#d3cbbe] hover:bg-[#1c1813]'
                }`}
              >
                {link.name}
              </a>
            ))}

            <div className="h-px bg-[#262018] my-3" />

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] text-white font-semibold text-sm shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Table</span>
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#162d1c] border border-[#22c55e]/50 text-[#4ade80] font-semibold text-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#22c55e]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-[#262018] text-xs text-[#8e8576] flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#f59e0b]">
                <Clock className="w-3.5 h-3.5" />
                <span>{status.statusText} • {status.nextEvent}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Plot 42, Hitec City Road, Jubilee Enclave, Hyderabad</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
