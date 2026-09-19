import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { formatWhatsAppOrderUrl } from '../utils/hoursHelper';
import { X, Calendar, MessageCircle, CheckCircle2, Clock, Users, Send } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: '4',
    seating: 'ac-family',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'NB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `Namaste Nala Bheema!\n\n*Table Reservation Request*\n*Ref:* ${bookingRef || 'NEW'}\n*Guest:* ${formData.name}\n*Phone:* ${formData.phone}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Guests:* ${formData.guests} People\n*Seating:* ${formData.seating}\n*Notes:* ${formData.specialRequests || 'None'}\n\nPlease confirm availability.`;
    const url = formatWhatsAppOrderUrl(RESTAURANT_INFO.whatsappNumber, text);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#171410] border border-[#382d20] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#29221b] flex items-center justify-between bg-[#1a1612]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#d97706]/15 flex items-center justify-center text-[#f59e0b]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-royal text-lg font-bold text-white">Book a Royal Table</h3>
              <p className="text-xs text-[#8e8373]">Nala Bheema Restaurant & Kitchen</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8e8373] hover:text-white hover:bg-[#261f18] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-royal text-xl font-bold text-white">Booking Confirmed!</h4>
              <p className="text-xs text-[#f59e0b] font-mono mt-1">Ref ID: {bookingRef}</p>
              <p className="text-xs text-[#b8ad9c] mt-3 max-w-sm">
                We have reserved your table for {formData.guests} guests on {formData.date} at {formData.time}.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleSendToWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#22c55e] text-black font-bold text-xs shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Notify via WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#241e17] text-white text-xs font-semibold border border-[#3d3325]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#cfc5b4] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Rao"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#1f1a14] border border-[#382f23] text-xs text-white placeholder-[#7d7568] focus:outline-none focus:border-[#d97706]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#cfc5b4] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#1f1a14] border border-[#382f23] text-xs text-white placeholder-[#7d7568] focus:outline-none focus:border-[#d97706]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#cfc5b4] mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#1f1a14] border border-[#382f23] text-xs text-white focus:outline-none focus:border-[#d97706]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#cfc5b4] mb-1">Time *</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#1f1a14] border border-[#382f23] text-xs text-white focus:outline-none focus:border-[#d97706]"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Dinner)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#cfc5b4] mb-1">Guests *</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#1f1a14] border border-[#382f23] text-xs text-white focus:outline-none focus:border-[#d97706]"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="4">4 People</option>
                    <option value="6">6 People</option>
                    <option value="8">8 People</option>
                    <option value="10+">10+ Group</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cfc5b4] mb-1">Seating Area</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'ac-family', label: 'AC Family Hall' },
                    { id: 'royal-majlis', label: 'Royal Majlis' },
                    { id: 'outdoor-patio', label: 'Courtyard Patio' },
                    { id: 'vip-cabana', label: 'VIP Cabana' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, seating: s.id })}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                        formData.seating === s.id
                          ? 'bg-[#d97706] text-white border-[#d97706]'
                          : 'bg-[#1b1713] text-[#8e8373] border-[#2e261d]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#cfc5b4] mb-1">Special Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Anniversary celebration, baby high chair, etc."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#1f1a14] border border-[#382f23] text-xs text-white placeholder-[#7d7568] focus:outline-none focus:border-[#d97706]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#d97706] hover:bg-[#f59e0b] text-white font-bold text-xs shadow-lg transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Reservation</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
