import React from 'react';

interface HeaderProps {
  onNavigate: {
    about: () => void;
    bikes: () => void;
    rates: () => void;
    contact: () => void;
    booking: () => void;
  };
}

const NavLink: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => (
  <button onClick={onClick} className="text-white hover:text-brand-yellow transition-colors duration-300 font-semibold tracking-wider text-lg">
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-brand-black bg-opacity-80 backdrop-blur-md sticky top-0 z-40 py-4 px-4 md:px-8 shadow-lg shadow-brand-teal/10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" aria-label="BikeBros homepage">
          <img src="images/logo.png" alt="BikeBros Logo" className="h-20" />
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink onClick={onNavigate.about}>About</NavLink>
          <NavLink onClick={onNavigate.bikes}>Our Bikes</NavLink>
          <NavLink onClick={onNavigate.rates}>Rates</NavLink>
          <NavLink onClick={onNavigate.contact}>Contact</NavLink>
          <button 
            onClick={onNavigate.booking}
            className="bg-brand-orange text-white font-bold py-2 px-6 rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all duration-300 transform hover:scale-105 shadow-md text-lg"
          >
            Book Now
          </button>
        </nav>
        <div className="md:hidden">
            <button 
                onClick={onNavigate.booking}
                className="bg-brand-orange text-white font-bold py-2 px-4 rounded-full text-sm"
            >
                Book
            </button>
        </div>
      </div>
    </header>
  );
};
