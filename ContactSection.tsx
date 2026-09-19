import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { formatWhatsAppOrderUrl } from '../utils/hoursHelper';
import { Calendar, Phone, Mail, MapPin, MessageCircle, CheckCircle2, Clock, Users, Sparkles, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    guests: '4',
    seating: 'ac-family',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'NB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `Namaste Nala Bheema!\n\n*Table Reservation Request*\n*Booking Ref:* ${bookingRef || 'NEW'}\n*Guest Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Guests:* ${formData.guests} People\n*Seating:* ${formData.seating}\n*Special Notes:* ${formData.specialRequests || 'None'}\n\nPlease confirm my reservation.`;
    const url = formatWhatsAppOrderUrl(RESTAURANT_INFO.whatsappNumber, text);
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#110f0d] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1813] border border-[#3b3022] text-[#f59e0b] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Booking & Enquiries</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdfbf7]">
            Reserve Your <span className="text-[#f59e0b]">Royal Table</span>
          </h2>
          <p className="mt-3 text-[#b5aa99] text-base">
            Book in advance to ensure preferred seating in our heritage dining suites, or connect directly with our hospitality desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards & Quick Connect */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-7 rounded-2xl bg-[#171410] border border-[#2e251b] shadow-xl">
              <h3 className="font-royal text-xl font-bold text-white mb-6">
                Direct Contact & Support
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#d97706]/15 flex items-center justify-center text-[#f59e0b] flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8e8474] font-semibold uppercase tracking-wider">Phone Reservation</div>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-base font-bold text-white hover:text-[#f59e0b] transition-colors block mt-0.5">
                      {RESTAURANT_INFO.phone}
                    </a>
                    <div className="text-xs text-[#8e8474]">{RESTAURANT_INFO.altPhone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#22c55e]/15 flex items-center justify-center text-[#4ade80] flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#82b88b] font-semibold uppercase tracking-wider">WhatsApp Support</div>
                    <a
                      href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#4ade80] hover:underline block mt-0.5"
                    >
                      {RESTAURANT_INFO.whatsappDisplay}
                    </a>
                    <div className="text-xs text-[#82b88b]">Instant replies for orders & bookings</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#d97706]/15 flex items-center justify-center text-[#f59e0b] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8e8474] font-semibold uppercase tracking-wider">Email Hospitality</div>
                    <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-base font-bold text-white hover:text-[#f59e0b] transition-colors block mt-0.5">
                      {RESTAURANT_INFO.email}
                    </a>
                    <div className="text-xs text-[#8e8474]">Corporate & banquet events</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#d97706]/15 flex items-center justify-center text-[#f59e0b] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8e8474] font-semibold uppercase tracking-wider">Restaurant Address</div>
                    <p className="text-sm font-medium text-[#ded6c9] mt-0.5 leading-relaxed">
                      {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city} - {RESTAURANT_INFO.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Royal Guarantee Banner */}
              <div className="mt-8 p-4 rounded-xl bg-[#1f1a14] border border-[#352c20] flex items-center gap-3 text-xs text-[#ad9f8d]">
                <Clock className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
                <span>We hold reserved tables up to 20 minutes past your booking time.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Reservation Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-[#171410] border border-[#2e251b] shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-10 px-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="font-royal text-2xl font-bold text-white">
                    Reservation Request Received!
                  </h3>
                  
                  <div className="mt-2 text-xs font-mono text-[#f59e0b] bg-[#221c15] px-3 py-1 rounded-full border border-[#3a3022]">
                    Booking Reference: {bookingRef}
                  </div>

                  <p className="mt-4 text-sm text-[#b8ad9c] max-w-md leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. We have reserved a table for <strong className="text-white">{formData.guests} guests</strong> on <strong className="text-white">{formData.date} at {formData.time}</strong>.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <button
                      onClick={handleSendToWhatsApp}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs shadow-lg transition-transform active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-black" />
                      <span>Confirm via WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#241e17] hover:bg-[#312920] text-[#ded6c9] font-semibold text-xs border border-[#3d3325] transition-colors"
                    >
                      Book Another Table
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#282117]">
                    <h3 className="font-royal text-xl font-bold text-white">
                      Table Reservation Details
                    </h3>
                    <span className="text-xs text-[#d97706] font-medium">Instant Confirmation</span>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#cfc5b4] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Varma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1f1a14] border border-[#382f23] text-sm text-white placeholder-[#7d7568] focus:outline-none focus:border-[#d97706]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#cfc5b4] mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1f1a14] border border-[#382f23] text-sm text-white placeholder-[#7d7568] focus:outline-none focus:border-[#d97706]"
                      />
                    </div>
                  </div>

                  {/* Date, Time, Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#cfc5b4] mb-1.5">
                        Date of Visit *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#1f1a14] border border-[#382f23] text-sm text-white focus:outline-none focus:border-[#d97706]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#cfc5b4] mb-1.5">
                        Preferred Time *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#1f1a14] border border-[#382f23] text-sm text-white focus:outline-none focus:border-[#d97706]"
                      >
                        <optgroup label="Lunch Service">
                          <option value="12:00">12:00 PM</option>
                          <option value="12:30">12:30 PM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="13:30">01:30 PM</option>
                          <option value="14:00">02:00 PM</option>
                        </optgroup>
                        <optgroup label="Dinner Service">
                          <option value="19:00">07:00 PM</option>
                          <option value="19:30">07:30 PM</option>
                          <option value="20:00">08:00 PM</option>
                          <option value="20:30">08:30 PM</option>
                          <option value="21:00">09:00 PM</option>
                          <option value="21:30">09:30 PM</option>
                          <option value="22:00">10:00 PM</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#cfc5b4] mb-1.5">
                        Number of Guests *
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#1f1a14] border border-[#382f23] text-sm text-white focus:outline-none focus:border-[#d97706]"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People (Couple)</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People (Family)</option>
                        <option value="6">6 People</option>
                        <option value="8">8 People (Party)</option>
                        <option value="10+">10+ Guests (Large Group)</option>
                      </select>
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cfc5b4] mb-1.5">
                      Seating Preference
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'ac-family', label: 'AC Family Hall' },
                        { id: 'royal-majlis', label: 'Royal Majlis' },
                        { id: 'outdoor-patio', label: 'Courtyard Patio' },
                        { id: 'vip-cabana', label: 'VIP Cabana' },
                      ].map((seat) => (
                        <button
                          key={seat.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, seating: seat.id })}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                            formData.seating === seat.id
                              ? 'bg-[#d97706] text-white border-[#d97706]'
                              : 'bg-[#1a1612] text-[#9f9483] border-[#31291f] hover:border-[#4d3f31]'
                          }`}
                        >
                          {seat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold text-[#cfc5b4] mb-1.5">
                      Special Requests / Occasion (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Anniversary celebration, high chair needed, less spicy..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1f1a14] border border-[#382f23] text-sm text-white placeholder-[#7d7568] focus:outline-none focus:border-[#d97706]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#f59e0b] hover:to-[#d97706] text-white font-bold text-sm shadow-xl shadow-[#d97706]/20 transition-all active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm Table Reservation</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
