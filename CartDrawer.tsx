import React, { useState } from 'react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { formatWhatsAppOrderUrl } from '../utils/hoursHelper';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dinein'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
  const packagingFee = orderType === 'delivery' ? 30 : 0;
  const total = subtotal + packagingFee;

  const handleSendWhatsAppOrder = () => {
    let orderListText = cartItems
      .map((ci) => `• ${ci.quantity}x ${ci.item.name} - ₹${ci.item.price * ci.quantity}`)
      .join('\n');

    const message = `Namaste Nala Bheema Kitchen!\n\n*New Food Order via Website*\n*Type:* ${orderType.toUpperCase()}\n${
      customerName ? `*Customer:* ${customerName}\n` : ''
    }${orderType === 'delivery' && customerAddress ? `*Delivery Address:* ${customerAddress}\n` : ''}\n*Items Ordered:*\n${orderListText}\n\n*Subtotal:* ₹${subtotal}\n${
      packagingFee > 0 ? `*Packaging:* ₹${packagingFee}\n` : ''
    }*Estimated Total:* ₹${total}\n${notes ? `*Special Notes:* ${notes}\n` : ''}\nPlease confirm order acceptance and preparation time.`;

    const url = formatWhatsAppOrderUrl(RESTAURANT_INFO.whatsappNumber, message);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#16130f] border-l border-[#2e261e] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#29221b] flex items-center justify-between bg-[#191511]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#d97706]/15 flex items-center justify-center text-[#f59e0b]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-royal text-base font-bold text-white">Your Order Basket</h3>
                <span className="text-xs text-[#8e8373]">{cartItems.length} dish types selected</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8e8373] hover:text-white hover:bg-[#251f18] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 px-4">
                <ShoppingBag className="w-12 h-12 text-[#4a3e2e] mx-auto mb-3" />
                <h4 className="text-base font-bold text-white">Your basket is empty</h4>
                <p className="text-xs text-[#8e8373] mt-1 max-w-xs mx-auto">
                  Browse our celebrated menu and add royal biryanis, curries, or starters to create your WhatsApp order.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 rounded-full bg-[#d97706] text-white text-xs font-bold hover:bg-[#f59e0b]"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#261f18] text-xs text-[#8e8373]">
                  <span>Items</span>
                  <button
                    onClick={onClearCart}
                    className="text-[#ef4444] hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map((ci) => (
                    <div
                      key={ci.item.id}
                      className="p-3.5 rounded-xl bg-[#1d1914] border border-[#2b241b] flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{ci.item.name}</h4>
                        <div className="text-[11px] text-[#f59e0b] font-medium mt-0.5">
                          ₹{ci.item.price} each
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#12100d] px-2 py-1 rounded-lg border border-[#332b21]">
                        <button
                          onClick={() => onUpdateQuantity(ci.item.id, -1)}
                          className="text-[#8e8373] hover:text-white p-0.5"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(ci.item.id, 1)}
                          className="text-[#8e8373] hover:text-white p-0.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-white font-mono w-14 text-right">
                        ₹{ci.item.price * ci.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Type Selector */}
                <div className="pt-3">
                  <label className="block text-xs font-semibold text-[#cfc5b4] mb-2">
                    Order Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['delivery', 'takeaway', 'dinein'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all uppercase tracking-wider ${
                          orderType === type
                            ? 'bg-[#d97706] text-white border-[#d97706]'
                            : 'bg-[#1b1713] text-[#8e8373] border-[#2e261d]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Customer info for WhatsApp message */}
                <div className="space-y-2 pt-2">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1d1914] border border-[#2e261d] text-xs text-white placeholder-[#70675a] focus:outline-none focus:border-[#d97706]"
                  />
                  {orderType === 'delivery' && (
                    <input
                      type="text"
                      placeholder="Delivery Address / Landmark"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#1d1914] border border-[#2e261d] text-xs text-white placeholder-[#70675a] focus:outline-none focus:border-[#d97706]"
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Kitchen instructions (e.g. less spicy, extra raita)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1d1914] border border-[#2e261d] text-xs text-white placeholder-[#70675a] focus:outline-none focus:border-[#d97706]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer & WhatsApp Order CTA */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#29221b] bg-[#191511] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#a19685]">
                  <span>Dishes Subtotal</span>
                  <span className="font-mono">₹{subtotal}</span>
                </div>
                {packagingFee > 0 && (
                  <div className="flex justify-between text-[#a19685]">
                    <span>Eco Earthen Handi Packaging</span>
                    <span className="font-mono">₹{packagingFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#29221b]">
                  <span>Total Amount</span>
                  <span className="text-[#f59e0b] font-royal">₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm shadow-xl shadow-[#22c55e]/20 transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Send Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#73695c]">
                Opens WhatsApp with pre-formatted items. No prepayment required online.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
