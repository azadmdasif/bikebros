import React from 'react';

interface HeroProps {
  onBookNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')"}}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading tracking-wide mb-4">
          <span className="text-brand-orange">Ride</span> The <span className="text-brand-teal">Wild</span>.
        </h1>
        <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto mb-8 text-brand-gray-light">
          From the Himalayas to the coast, your untamed journey starts here. Dare to explore.
        </p>
        <button 
          onClick={onBookNow}
          className="bg-brand-yellow text-brand-black font-bold text-lg py-4 px-10 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300 transform hover:scale-110 shadow-xl shadow-brand-yellow/30"
        >
          GRAB YOUR RIDE
        </button>
      </div>
    </section>
  );
};