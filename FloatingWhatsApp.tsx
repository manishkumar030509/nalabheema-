import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickMessages = [
    '🍛 What are today\'s chef specials?',
    '📅 I want to reserve a table for tonight',
    '🛵 I would like to order food for delivery',
    '🎉 Inquiring about party hall / catering',
  ];

  const handleSend = (textToSend?: string) => {
    const finalMsg = textToSend || customMsg || 'Namaste Nala Bheema! I would like to inquire about dining / order.';
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex flex-col items-end">
      {/* WhatsApp Mini Popup Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-2xl bg-[#14120e] border border-[#2e261d] shadow-2xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-[#1f3824] border-b border-[#2d5234] flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold">
                  <MessageCircle className="w-6 h-6 fill-black text-black" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1f3824]"></span>
              </div>
              <div>
                <h4 className="font-royal text-sm font-bold text-white">Nala Bheema Kitchen</h4>
                <div className="text-[11px] text-[#86efac]">Online • Fast Replies (2-5 mins)</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#c4d8c7] hover:text-white hover:bg-black/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#0f0e0c] space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#1a1713] border border-[#2b2319] text-[#ded6c9] leading-relaxed">
              Namaste! 🙏 Welcome to <strong className="text-[#f59e0b]">Nala Bheema Restaurant</strong>. How can we serve you today?
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] uppercase font-semibold text-[#807667]">Quick Inquiries</div>
              {quickMessages.map((qm, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qm)}
                  className="w-full text-left p-2 rounded-lg bg-[#191511] hover:bg-[#251f18] text-[#c9bfb1] hover:text-white border border-[#2d251d] text-[11px] transition-colors flex items-center justify-between"
                >
                  <span>{qm}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 rounded-xl bg-[#1a1612] border border-[#31281e] text-xs text-white placeholder-[#6e6558] focus:outline-none focus:border-[#22c55e]"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-[#22c55e] text-black hover:bg-[#16a34a] transition-colors"
                title="Send to WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#22c55e] text-black shadow-2xl hover:bg-[#16a34a] transition-transform duration-200 active:scale-95 flex items-center justify-center focus:outline-none"
        aria-label="Open WhatsApp Chat"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>

        <MessageCircle className="w-7 h-7 fill-black text-black" />

        {/* Hover Tooltip for Desktop */}
        <span className="hidden md:group-hover:flex absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#14120e] text-white text-xs whitespace-nowrap border border-[#332b21] shadow-xl items-center gap-1.5 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Chat on WhatsApp</span>
        </span>
      </button>
    </div>
  );
};
