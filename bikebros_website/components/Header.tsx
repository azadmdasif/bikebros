import React, { useState, useEffect } from 'react';

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

const menuItems = [
    { label: 'About', key: 'about' as const },
    { label: 'Our Bikes', key: 'bikes' as const },
    { label: 'Rates', key: 'rates' as const },
    { label: 'Contact', key: 'contact' as const },
];

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleMobileLinkClick = (navFunc: () => void) => {
    setIsMenuOpen(false);
    navFunc();
  };

  return (
    <>
      <header className="bg-brand-black bg-opacity-80 backdrop-blur-md sticky top-0 z-40 py-4 px-4 md:px-8 shadow-lg shadow-brand-teal/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 mr-2 rounded-md text-white hover:text-brand-yellow focus:outline-none bg-brand-gray-dark hover:bg-brand-gray-dark/80"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <a href="/" aria-label="BikeBros homepage">
              <img src="images/logo.png" alt="BikeBros Logo" className="h-20" />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
                <NavLink key={item.key} onClick={onNavigate[item.key]}>{item.label}</NavLink>
            ))}
            <button
              onClick={onNavigate.booking}
              className="bg-brand-orange text-white font-bold py-2 px-6 rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all duration-300 transform hover:scale-105 shadow-md text-lg"
            >
              Book Now
            </button>
          </nav>
          
          {/* Mobile Book button on right */}
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
      
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-brand-black bg-opacity-80" onClick={() => setIsMenuOpen(false)}></div>
        <div className="relative w-4/5 max-w-sm h-full bg-brand-gray-dark p-6 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-heading text-brand-yellow">Menu</h2>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-md text-white hover:text-brand-yellow"
                    aria-label="Close menu"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <nav className="flex flex-col space-y-6">
                {menuItems.map(item => (
                    <button key={item.key} onClick={() => handleMobileLinkClick(onNavigate[item.key])} className="text-left text-xl text-white hover:text-brand-yellow transition-colors font-semibold">
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-auto">
                <button
                    onClick={() => handleMobileLinkClick(onNavigate.booking)}
                    className="w-full bg-brand-orange text-white font-bold py-3 px-6 rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all duration-300 shadow-md text-lg"
                >
                    Book Now
                </button>
            </div>
        </div>
      </div>
    </>
  );
};
