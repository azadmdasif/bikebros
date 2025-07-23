export type BikeCategory = 'Commuter' | 'Sports' | 'Scooter';

export interface Bike {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  color: 'orange' | 'yellow' | 'black' | 'teal';
  category: BikeCategory;
}

export interface BikeRates {
  [key: string]: {
    '6': number;
    '12': number;
    '24': number;
  };
}

export interface AdditionalCharge {
  name: string;
  cost: number;
  description: string;
}

export interface LegalContent {
  title: string;
  content: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  location: string;
  avatarUrl: string;
}