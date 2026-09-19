export type DietaryType = 'all' | 'veg' | 'non-veg';

export type MenuCategory = 
  | 'all'
  | 'specials'
  | 'biryani'
  | 'starters'
  | 'curries'
  | 'thalis'
  | 'breads'
  | 'desserts'
  | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  teluguName?: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVeg: boolean;
  isChefSpecial?: boolean;
  isBestseller?: boolean;
  spicyLevel: 1 | 2 | 3 | 4; // 1: Mild, 2: Medium, 3: Spicy, 4: Fiery
  portionSize?: string;
  image: string;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'ambience' | 'dishes' | 'tradition' | 'events';
  image: string;
  description: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seating: 'main' | 'ac-family' | 'royal-majlis' | 'outdoor-patio';
  specialRequests?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  recommendedDish: string;
  date: string;
  avatar?: string;
}

export interface RestaurantHours {
  day: string;
  lunch: string;
  dinner: string;
  isSpecial?: boolean;
}
