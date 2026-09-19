import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item to WhatsApp Cart
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  // Update quantity in cart
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartItemIds = cartItems.reduce((acc, ci) => {
    acc[ci.item.id] = ci.quantity;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#f5f1ea] selection:bg-[#d97706] selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenReservation={() => setIsReservationOpen(true)} />

        {/* About Section */}
        <About />

        {/* Menu Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
        />

        {/* Gallery Section */}
        <GallerySection />

        {/* Location & Opening Hours Section */}
        <LocationHoursSection />

        {/* Customer Reviews & FAQs */}
        <ReviewsSection />

        {/* Contact & Reservation Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Quick Navigation Bar */}
      <MobileBottomNav
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Cart & WhatsApp Order Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}

