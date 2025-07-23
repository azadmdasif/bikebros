import React from 'react';
import type { BikeRates, AdditionalCharge } from '../types';

interface RateTableProps {
  title: string;
  subtitle?: string;
  rates: BikeRates;
}

const RateTable: React.FC<RateTableProps> = ({ title, subtitle, rates }) => (
  <div>
    <h3 className="text-3xl font-heading text-brand-yellow mb-1 text-center">{title}
      {subtitle && <span className="text-lg text-brand-gray-light ml-2 font-sans">{subtitle}</span>}
    </h3>
    <div className="max-w-4xl mx-auto bg-brand-black p-8 rounded-xl shadow-lg mt-4">
      <div className="grid grid-cols-4 gap-4 text-center font-bold text-brand-teal border-b border-brand-gray-dark pb-4 mb-4">
        <h4 className="text-left text-xl">Model</h4>
        <h4 className="text-xl">6 Hours</h4>
        <h4 className="text-xl">12 Hours</h4>
        <h4 className="text-xl">24 Hours</h4>
      </div>
      <div className="space-y-2">
        {Object.entries(rates).map(([bikeName, prices]) => (
          <div key={bikeName} className="grid grid-cols-4 gap-4 items-center text-center p-3 rounded-lg hover:bg-brand-gray-dark transition-colors duration-200">
            <p className="font-semibold text-lg text-left text-white">{bikeName}</p>
            <p className="text-xl font-semibold text-brand-gray-light">₹{prices['6']}</p>
            <p className="text-xl font-semibold text-brand-gray-light">₹{prices['12']}</p>
            <p className="text-xl font-semibold text-brand-gray-light">₹{prices['24']}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface AdditionalChargesTableProps {
  charges: AdditionalCharge[];
}

const AdditionalChargesTable: React.FC<AdditionalChargesTableProps> = ({ charges }) => (
    <div>
        <h3 className="text-3xl font-heading text-brand-yellow mb-1 text-center">Additional Charges</h3>
        <div className="max-w-4xl mx-auto bg-brand-black p-8 rounded-xl shadow-lg mt-4">
            <div className="space-y-2">
                {charges.map((charge) => (
                    <div key={charge.name} className="grid grid-cols-2 gap-4 items-center p-3 rounded-lg hover:bg-brand-gray-dark transition-colors duration-200">
                        <p className="font-semibold text-lg text-left text-white">{charge.name}</p>
                        <p className="text-xl font-semibold text-brand-gray-light text-right">
                          {charge.name !== 'Late Fee' && '₹'}
                          {charge.cost}
                          <span className="text-base font-normal ml-1">{charge.description}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


interface RatesProps {
  scooterRates: BikeRates;
  commuterRates: BikeRates;
  sportsBikeRates: BikeRates;
  additionalCharges: AdditionalCharge[];
}

export const Rates: React.FC<RatesProps> = ({ scooterRates, commuterRates, sportsBikeRates, additionalCharges }) => {
  return (
    <section className="py-20 bg-brand-gray-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-heading text-center mb-4 uppercase text-brand-teal">Rental Pricing</h2>
        <p className="text-center max-w-2xl mx-auto mb-16 text-brand-gray-light font-sans">
          Affordable and transparent pricing. Choose your bike and your adventure duration.
        </p>
        <div className="space-y-16">
          <RateTable title="Scooters" rates={scooterRates} />
          <RateTable title="Commuter Bikes" rates={commuterRates} />
          <RateTable title="Sports Bikes" subtitle="(20% Discounted)" rates={sportsBikeRates} />
          <AdditionalChargesTable charges={additionalCharges} />
        </div>
      </div>
    </section>
  );
};