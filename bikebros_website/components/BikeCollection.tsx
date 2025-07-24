import React from 'react';
import type { Bike, BikeCategory } from '../types';

interface BikeCollectionProps {
  bikes: Bike[];
  onBookBike: (bikeId: number) => void;
}

interface BikeCardProps {
  bike: Bike;
  onBookBike: (bikeId: number) => void;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike, onBookBike }) => {
  const colorClasses = {
    orange: 'border-brand-orange hover:shadow-brand-orange/30',
    yellow: 'border-brand-yellow hover:shadow-brand-yellow/30',
    black: 'border-brand-gray-dark hover:shadow-brand-gray-light/20',
    teal: 'border-brand-teal hover:shadow-brand-teal/30',
  };

  return (
    <div className={`bg-brand-gray-dark rounded-lg overflow-hidden border-b-4 ${colorClasses[bike.color]} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col`}>
      <img src={bike.imageUrl} alt={bike.name} className="w-full h-60 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2">{bike.name}</h3>
        <p className="text-brand-gray-light font-sans flex-grow mb-4">{bike.description}</p>
        <button 
          onClick={() => onBookBike(bike.id)}
          className="mt-auto bg-brand-orange text-white font-bold py-2 px-4 rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all duration-300 w-full"
        >
          Book This Bike
        </button>
      </div>
    </div>
  );
};

export const BikeCollection: React.FC<BikeCollectionProps> = ({ bikes, onBookBike }) => {
  const categories: BikeCategory[] = ['Commuter', 'Sports', 'Scooter'];
  
  const bikesByCategory = (category: BikeCategory) => {
    return bikes.filter(bike => bike.category === category);
  }

  return (
    <section className="py-20 bg-brand-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-heading text-center mb-4 uppercase text-brand-yellow">Our Fleet</h2>
        <p className="text-center max-w-2xl mx-auto mb-16 text-brand-gray-light font-sans">
          Hand-picked beasts for every terrain and every adventure. Find your perfect match.
        </p>

        {categories.map(category => (
          <div key={category} className="mb-20">
            <h3 className="text-4xl font-heading text-center mb-10 text-brand-teal tracking-widest">{category}S</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bikesByCategory(category).map(bike => (
                <BikeCard key={bike.id} bike={bike} onBookBike={onBookBike} />
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </section>
  );
};
