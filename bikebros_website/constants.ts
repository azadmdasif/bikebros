import type { Bike, BikeRates, Testimonial, AdditionalCharge } from './types';

// IMPORTANT: Go to https://web3forms.com/, create a new form, and replace this key with your own.
export const WEB3FORMS_ACCESS_KEY = 'b9f95d5b-8f90-477b-a068-55293c654708';

const COMMUTER_BIKES: Bike[] = [
  { id: 1, name: 'Hero Splendor Plus', description: 'Reliable 97cc commuter (~70 kmpl)', imageUrl: '/images/hero-splendor-plus.jpg', color: 'black', category: 'Commuter' },
  { id: 2, name: 'Hero HF Deluxe', description: 'Ultra-budget, high mileage (~65 kmpl)', imageUrl: '/images/hero-hf-deluxe.jpg', color: 'teal', category: 'Commuter' },
  { id: 3, name: 'Honda Shine 125', description: 'Smooth 125cc, refined and reliable (~55 kmpl)', imageUrl: '/images/honda-shine-125.jpg', color: 'orange', category: 'Commuter' },
  { id: 4, name: 'Bajaj Platina 110', description: 'Comfort-focused, excellent mileage (~70 kmpl)', imageUrl: '/images/bajaj-platina-110.jpg', color: 'yellow', category: 'Commuter' },
  { id: 5, name: 'Bajaj Pulsar 150', description: 'Sport-commuter staple', imageUrl: '/images/bajaj-pulsar-150.jpg', color: 'black', category: 'Commuter' },
  { id: 6, name: 'TVS Apache RTR 160 4V', description: 'Sharp handling, performance streetfighter', imageUrl: '/images/tvs-apache-rtr-160-4v.jpg', color: 'orange', category: 'Commuter' },
  { id: 7, name: 'TVS Raider 125', description: 'Youth-style commuter, digital console (~65 kmpl)', imageUrl: '/images/tvs-raider-125.jpg', color: 'yellow', category: 'Commuter' },
  { id: 8, name: 'Royal Enfield Hunter 350', description: 'Compact urban cruiser (349cc)', imageUrl: '/images/royal-enfield-hunter-350.jpg', color: 'teal', category: 'Commuter' },
];

const SPORTS_BIKES: Bike[] = [
  { id: 9, name: 'Bajaj Pulsar NS200', description: 'Fiery naked sport-commuter', imageUrl: '/images/bajaj-pulsar-ns200.jpg', color: 'orange', category: 'Sports' },
  { id: 10, name: 'Yamaha R15 V4', description: 'Supersport mini-bike, track DNA', imageUrl: '/images/yamaha-r15-v4.jpg', color: 'teal', category: 'Sports' },
  { id: 11, name: 'KTM Duke 390', description: 'High-performance naked streetfighter', imageUrl: '/images/ktm-duke-390.jpg', color: 'orange', category: 'Sports' },
  { id: 12, name: 'Royal Enfield Classic 350', description: 'Retro-styled cruiser with cult status', imageUrl: '/images/royal-enfield-classic-350.jpg', color: 'black', category: 'Sports' },
  { id: 13, name: 'Royal Enfield Interceptor 650', description: 'Twin-cylinder roadster', imageUrl: '/images/royal-enfield-interceptor-650.jpg', color: 'yellow', category: 'Sports' },
  { id: 14, name: 'Kawasaki Ninja 300', description: 'Beginner-friendly full-fairing sports bike', imageUrl: '/images/kawasaki-ninja-300.jpg', color: 'teal', category: 'Sports' },
];

const SCOOTERS: Bike[] = [
  { id: 15, name: 'Suzuki Access 125', description: 'Powerful, premium 125cc scooter', imageUrl: '/images/suzuki-access-125.jpg', color: 'yellow', category: 'Scooter' },
  { id: 16, name: 'Honda Activa 125', description: 'India’s most-sold 125cc scooter', imageUrl: '/images/honda-activa-125.jpg', color: 'black', category: 'Scooter' },
  { id: 17, name: 'TVS Jupiter 125', description: 'Comfortable, full-features family scooter', imageUrl: '/images/tvs-jupiter-125.jpg', color: 'orange', category: 'Scooter' },
  { id: 18, name: 'Honda Dio 125', description: 'Sporty 125cc youth scooter', imageUrl: '/images/honda-dio-125.jpg', color: 'teal', category: 'Scooter' },
  { id: 19, name: 'Ather 450X', description: 'Tech-packed premium electric scooter', imageUrl: '/images/ather-450x.jpg', color: 'teal', category: 'Scooter' },
];

export const BIKES: Bike[] = [...COMMUTER_BIKES, ...SPORTS_BIKES, ...SCOOTERS];

export const SCOOTER_RATES: BikeRates = {
  'Suzuki Access 125':     { '6': 599, '12': 799,  '24': 1199 },
  'Honda Activa 125':      { '6': 599, '12': 799,  '24': 1199 },
  'TVS Jupiter 125':       { '6': 599, '12': 799,  '24': 1199 },
  'Honda Dio 125':         { '6': 599, '12': 799,  '24': 1199 },
  'Ather 450X (Electric)': { '6': 649, '12': 849,  '24': 1299 },
};

export const COMMUTER_RATES: BikeRates = {
  'Hero Splendor Plus / HF Deluxe': { '6': 699, '12': 899,  '24': 1399 },
  'Honda Shine / Bajaj Platina':    { '6': 749, '12': 999,  '24': 1499 },
  'Pulsar 150 / TVS Raider 125':  { '6': 849, '12': 1099, '24': 1699 },
  'TVS Apache RTR 160 4V':        { '6': 899, '12': 1199, '24': 1799 },
  'Royal Enfield Hunter 350':                { '6': 999, '12': 1299, '24': 1999 },
};

export const SPORTS_BIKE_RATES: BikeRates = {
  'Pulsar NS200 / Yamaha R15': { '6': 799,  '12': 899,  '24': 1499 },
  'Royal Enfield Classic 350':            { '6': 799,  '12': 1099, '24': 1599 },
  'KTM Duke 390':              { '6': 899,  '12': 1199, '24': 1799 },
  'Royal Enfield Interceptor 650':        { '6': 1099, '12': 1299, '24': 2099 },
  'Kawasaki Ninja 300':        { '6': 1199, '12': 1399, '24': 2299 },
};

export const ADDITIONAL_CHARGES: AdditionalCharge[] = [
    { name: 'Security Deposit', cost: 2500, description: '(Refundable)' },
    { name: 'Late Fee', cost: 200, description: '/hour (after 30 min grace)' },
    { name: 'Delivery to Your Location', cost: 300, description: '' },
    { name: 'Early Pickup (<8am)', cost: 100, description: '' },
];


export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "The best bike rental experience I've had in India. The Hunter 350 was in pristine condition, and the team was super helpful. Made my trip to the mountains unforgettable.",
    name: 'Aarav Sharma',
    location: 'Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    quote: "Rented a Yamaha R15 for a weekend coastal ride. The bike was a dream, and the booking process was seamless. BikeBros is my go-to for adventures now!",
    name: 'Priya Patel',
    location: 'Mumbai',
    avatarUrl: 'https://images.unsplash.com/photo-1598137203923-421cb85042bd?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    quote: "Effortless city exploration on their Honda Activa. The rates are super affordable and the staff is friendly. Highly recommend for anyone looking to navigate the city with ease.",
    name: 'Rohan Kumar',
    location: 'Kolkata',
    avatarUrl: 'https://images.unsplash.com/photo-1628191138290-719114334d6f?q=80&w=400&auto=format&fit=crop',
  },
];
