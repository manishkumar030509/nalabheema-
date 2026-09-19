import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Phone, UtensilsCrossed, Calendar, MessageCircle, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenReservation,
  onOpenCart,
  cartCount,
}) => {
  const handleScrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappHref = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Namaste! I would like to book a table / order food from Nala Bheema.'
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#12100d]/95 backdrop-blur-lg border-t border-[#29221a] py-2 px-3 shadow-2xl">
      <div className="grid grid-cols-5 gap-1 items-center text-center">
        {/* Call */}
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex flex-col items-center justify-center p-1 text-[#a3998b] hover:text-[#f59e0b]"
        >
          <Phone className="w-4 h-4 text-[#d97706]" />
          <span className="text-[10px] mt-1 font-medium">Call</span>
        </a>

        {/* Menu */}
        <button
          onClick={handleScrollToMenu}
          className="flex flex-col items-center justify-center p-1 text-[#a3998b] hover:text-[#f59e0b]"
        >
          <UtensilsCrossed className="w-4 h-4 text-[#d97706]" />
          <span className="text-[10px] mt-1 font-medium">Menu</span>
        </button>

        {/* Book Table (Prominent Center Button) */}
        <button
          onClick={onOpenReservation}
          className="flex flex-col items-center justify-center -mt-4"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#d97706] to-[#f59e0b] flex items-center justify-center text-white shadow-lg shadow-[#d97706]/40 active:scale-95 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-1 font-semibold text-[#f59e0b]">Book</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center p-1 text-[#a3998b] hover:text-[#f59e0b]"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#d97706]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#d97706] text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-medium">Order ({cartCount})</span>
        </button>

        {/* WhatsApp */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 text-[#4ade80] hover:text-[#86efac]"
        >
          <MessageCircle className="w-4 h-4 fill-[#22c55e] text-black" />
          <span className="text-[10px] mt-1 font-medium">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
