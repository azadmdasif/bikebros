import React from 'react';
import type { LegalContent } from '../types';
import { PRIVACY_POLICY, REFUND_POLICY, TERMS_AND_CONDITIONS } from '../legal';


interface FooterProps {
  onShowPolicy: (policy: LegalContent) => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowPolicy }) => {
  return (
    <footer className="bg-brand-gray-dark py-8">
      <div className="container mx-auto px-4 text-center text-brand-gray-light">
        <div className="flex justify-center items-center mb-4">
          <img src="logo.png" alt="BikeBros Logo" className="h-24" />
        </div>
        <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-4 font-sans">
            <button onClick={() => onShowPolicy(PRIVACY_POLICY)} className="hover:text-brand-yellow transition-colors">Privacy Policy</button>
            <button onClick={() => onShowPolicy(REFUND_POLICY)} className="hover:text-brand-yellow transition-colors">Refund Policy</button>
            <button onClick={() => onShowPolicy(TERMS_AND_CONDITIONS)} className="hover:text-brand-yellow transition-colors">Terms & Conditions</button>
        </div>
        <p>© {new Date().getFullYear()} BikeBros. All rights reserved.</p>
        <p className="text-sm font-sans">Ride The Wild. Live Free.</p>
      </div>
    </footer>
  );
};