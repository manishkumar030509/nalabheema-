import React from 'react';
import { RESTAURANT_INFO, RESTAURANT_HOURS } from '../data/restaurantData';
import { getRestaurantCurrentStatus } from '../utils/hoursHelper';
import { Clock, MapPin, Phone, MessageCircle, Navigation, Car, Shield, Sparkles } from 'lucide-react';

export const LocationHoursSection: React.FC = () => {
  const currentStatus = getRestaurantCurrentStatus();
  const currentDayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][new Date().getDay()];

  return (
    <section id="hours" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0a08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1813] border border-[#3b3022] text-[#f59e0b] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visit Our Heritage Kitchen</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdfbf7]">
            Opening Hours & <span className="text-[#f59e0b]">Location</span>
          </h2>
          <p className="mt-3 text-[#b5aa99] text-base">
            Conveniently situated in the heart of Hyderabad. Drop in for authentic handi biryani or reserve an exclusive dining suite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Opening Hours & Live Status Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Status Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#171410] to-[#12100d] border border-[#382d20] shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#f59e0b]" />
                  <span className="font-royal text-lg font-bold text-white">Current Kitchen Status</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentStatus.badgeClass}`}>
                  {currentStatus.isOpen ? '● Serving Now' : '○ Closed'}
                </span>
              </div>

              <div className="text-2xl font-bold text-white font-royal">
                {currentStatus.statusText}
              </div>
              <div className="text-xs text-[#d97706] mt-1 font-medium">
                {currentStatus.nextEvent}
              </div>

              <div className="mt-6 pt-5 border-t border-[#2d2419] grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-xl bg-[#1d1914] border border-[#332b21]">
                  <div className="text-[10px] uppercase tracking-wider text-[#8e8373] font-semibold">Lunch Service</div>
                  <div className="text-sm font-bold text-white mt-1">11:30 AM – 03:30 PM</div>
                </div>
                <div className="p-3 rounded-xl bg-[#1d1914] border border-[#332b21]">
                  <div className="text-[10px] uppercase tracking-wider text-[#8e8373] font-semibold">Dinner Service</div>
                  <div className="text-sm font-bold text-white mt-1">07:00 PM – 11:00 PM</div>
                </div>
              </div>
            </div>

            {/* Weekly Schedule Table */}
            <div className="p-6 rounded-2xl bg-[#14120e] border border-[#2b241b] shadow-lg">
              <h3 className="text-base font-bold text-white font-royal mb-4 flex items-center justify-between">
                <span>Weekly Dining Schedule</span>
                <span className="text-xs font-normal text-[#8e8373]">7 Days a Week</span>
              </h3>

              <div className="space-y-2.5">
                {RESTAURANT_HOURS.map((schedule) => {
                  const isToday = schedule.day === currentDayName;
                  return (
                    <div
                      key={schedule.day}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${
                        isToday
                          ? 'bg-[#d97706]/15 border border-[#f59e0b]/40 text-white font-semibold'
                          : 'text-[#a89e8e] hover:bg-[#1a1713]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>}
                        <span className={isToday ? 'text-[#f59e0b]' : ''}>{schedule.day}</span>
                        {isToday && (
                          <span className="text-[10px] bg-[#d97706] text-white px-1.5 py-0.2 rounded font-bold">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-white font-mono">{schedule.lunch}</div>
                        <div className="text-[#8e8474] font-mono text-[11px]">{schedule.dinner}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Special notice */}
              <div className="mt-5 p-3 rounded-xl bg-[#1c1813] border border-[#30281e] text-[11px] text-[#9c9181] flex items-center gap-2">
                <Car className="w-4 h-4 text-[#d97706] flex-shrink-0" />
                <span>Complimentary valet parking & banquet hall reservations available.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Address, Map & Directions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Address Details Card */}
            <div className="p-6 rounded-2xl bg-[#14120e] border border-[#2b241b] shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#f59e0b] font-semibold uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Restaurant Location</span>
                  </div>
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
                    {RESTAURANT_INFO.name}
                  </h3>
                  <p className="text-sm text-[#cfc5b5] mt-1.5 leading-relaxed max-w-lg">
                    {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city} – {RESTAURANT_INFO.pincode}
                  </p>
                  <p className="text-xs text-[#8e8373] mt-1">
                    <strong>Landmark:</strong> {RESTAURANT_INFO.landmark}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d97706] hover:bg-[#f59e0b] text-white font-semibold text-xs transition-colors shadow-md active:scale-95"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Interactive Google Map Frame */}
              <div className="w-full h-80 rounded-xl overflow-hidden border border-[#382d20] relative bg-[#1c1813]">
                <iframe
                  title="Nala Bheema Restaurant Location Map"
                  src={RESTAURANT_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(120%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Floating Map Pin Badge */}
                <div className="absolute top-3 left-3 bg-[#0c0a08]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#382d20] text-xs text-[#f5f1ea] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>Jubilee Enclave / Hitec City</span>
                </div>
              </div>

              {/* Quick Contact & WhatsApp Bar */}
              <div className="mt-6 pt-5 border-t border-[#262017] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#1b1712] border border-[#332b21] hover:border-[#f59e0b]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#d97706]/15 flex items-center justify-center text-[#f59e0b]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8e8474] uppercase font-semibold">Direct Call & Booking</div>
                    <div className="text-sm font-bold text-white">{RESTAURANT_INFO.phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                    'Namaste Nala Bheema! I need driving directions / inquiry for dining today.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#142317] border border-[#22c55e]/30 hover:border-[#22c55e] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#22c55e]/15 flex items-center justify-center text-[#4ade80]">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#82b88b] uppercase font-semibold">WhatsApp Assistant</div>
                    <div className="text-sm font-bold text-[#4ade80]">{RESTAURANT_INFO.whatsappDisplay}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
