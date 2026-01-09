
export enum AppView {
  LANDING = 'LANDING',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  DASHBOARD = 'DASHBOARD',
  EDU_SYNC = 'EDU_SYNC',
  TRAVEL_OTA = 'TRAVEL_OTA',
  AI_CHAT = 'AI_CHAT',
  HEALTH_HUB = 'HEALTH_HUB',
  AGRI_CLIMATE = 'AGRI_CLIMATE'
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'SUV' | 'Bike' | 'EV' | 'Van';
  price: number;
  specs: string;
  image: string;
}

export interface HotelReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  image: string;
  description?: string;
}

export interface TravelBooking {
  destination: string;
  altitude: 'High' | 'Mid' | 'Low';
  duration: string;
}

export interface Seed {
  symbol: string;
  name: string;
  category: 'Cereal' | 'Legume' | 'Vegetable' | 'Cash Crop';
  region: string;
  yield: string;
  temp: string;
  water: 'Low' | 'Medium' | 'High';
  ph: string;
  cycle: string;
  altitude: string;
  nutrients: { n: number; p: number; k: number };
}

export interface SymptomResult {
  diagnosis: string;
  specialist: string;
  hospitals: string[];
  urgency: 'Routine' | 'Urgent' | 'Emergency';
}
