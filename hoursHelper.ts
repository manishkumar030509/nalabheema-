export interface CurrentStatus {
  isOpen: boolean;
  statusText: string;
  nextEvent: string;
  badgeClass: string;
}

export function getRestaurantCurrentStatus(): CurrentStatus {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 6 = Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentMinutes = hour * 60 + minute;

  const isWeekend = day === 0 || day === 6 || day === 5; // Fri, Sat, Sun special dinner

  // Lunch: 11:30 (690 min) to 15:30 (930 min) / Weekend 16:00 (960 min)
  const lunchOpen = 11 * 60 + 30; // 11:30 AM = 690
  const lunchClose = (day === 0 || day === 6) ? 16 * 60 : 15 * 60 + 30; // 3:30 PM or 4:00 PM

  // Dinner: 19:00 (1140 min) to 23:00 (1380 min) / Weekend 23:30 (1410 min)
  const dinnerOpen = 19 * 60; // 7:00 PM = 1140
  const dinnerClose = isWeekend ? 23 * 60 + 30 : 23 * 60; // 11:00 PM or 11:30 PM

  if (currentMinutes >= lunchOpen && currentMinutes < lunchClose) {
    const closeTimeStr = (day === 0 || day === 6) ? '4:00 PM' : '3:30 PM';
    return {
      isOpen: true,
      statusText: 'Open Now (Lunch Service)',
      nextEvent: `Closes at ${closeTimeStr} for dinner prep`,
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    };
  }

  if (currentMinutes >= dinnerOpen && currentMinutes < dinnerClose) {
    const closeTimeStr = isWeekend ? '11:30 PM' : '11:00 PM';
    return {
      isOpen: true,
      statusText: 'Open Now (Dinner Service)',
      nextEvent: `Kitchen closes at ${closeTimeStr}`,
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    };
  }

  if (currentMinutes < lunchOpen) {
    return {
      isOpen: false,
      statusText: 'Closed Now',
      nextEvent: 'Opens today at 11:30 AM for Lunch',
      badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    };
  }

  if (currentMinutes >= lunchClose && currentMinutes < dinnerOpen) {
    return {
      isOpen: false,
      statusText: 'Kitchen Break',
      nextEvent: 'Evening Dinner opens at 7:00 PM',
      badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    };
  }

  return {
    isOpen: false,
    statusText: 'Closed for the Night',
    nextEvent: 'Opens tomorrow at 11:30 AM',
    badgeClass: 'bg-stone-500/20 text-stone-400 border-stone-500/30',
  };
}

export function formatWhatsAppOrderUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
