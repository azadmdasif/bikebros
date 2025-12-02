import React, { useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { BikeCollection } from './components/BikeCollection';
import { Rates } from './components/Rates';
import { Contact } from './components/Contact';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Modal } from './components/Modal';
import { BIKES, SCOOTER_RATES, COMMUTER_RATES, SPORTS_BIKE_RATES, ADDITIONAL_CHARGES, TESTIMONIALS } from './constants';
import type { LegalContent } from './types';
import { Testimonials } from './components/Testimonials';

const App: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const bikeCollectionRef = useRef<HTMLDivElement>(null);
  const ratesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const [modalContent, setModalContent] = useState<LegalContent | null>(null);
  const [selectedBikeForBooking, setSelectedBikeForBooking] = useState<string | null>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleShowPolicy = (policy: LegalContent) => {
    setModalContent(policy);
  };

  const handleCloseModal = () => {
    setModalContent(null);
  }

  const handleBookBike = (bikeId: number) => {
    setSelectedBikeForBooking(bikeId.toString());
    // Give state a moment to update before scrolling
    setTimeout(() => {
        scrollTo(bookingRef);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-brand-black overflow-x-hidden">
      <Header 
        onNavigate={{
          about: () => scrollTo(aboutRef),
          bikes: () => scrollTo(bikeCollectionRef),
          rates: () => scrollTo(ratesRef),
          contact: () => scrollTo(contactRef),
          booking: () => scrollTo(bookingRef),
        }}
      />
      <main>
        <Hero onBookNow={() => scrollTo(bookingRef)} />
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={bikeCollectionRef}>
          <BikeCollection bikes={BIKES} onBookBike={handleBookBike} />
        </div>
        <div ref={ratesRef}>
          <Rates 
            scooterRates={SCOOTER_RATES}
            commuterRates={COMMUTER_RATES}
            sportsBikeRates={SPORTS_BIKE_RATES}
            additionalCharges={ADDITIONAL_CHARGES}
          />
        </div>
        <div ref={testimonialsRef}>
          <Testimonials testimonials={TESTIMONIALS} />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
        <div ref={bookingRef}>
           <BookingForm
            bikes={BIKES}
            scooterRates={SCOOTER_RATES}
            commuterRates={COMMUTER_RATES}
            sportsBikeRates={SPORTS_BIKE_RATES}
            additionalCharges={ADDITIONAL_CHARGES}
            initialBikeId={selectedBikeForBooking}
          />
        </div>
      </main>
      <Footer onShowPolicy={handleShowPolicy} />
      <WhatsAppButton />
      {modalContent && (
        <Modal 
          isOpen={!!modalContent}
          onClose={handleCloseModal}
          title={modalContent.title}
        >
          <div dangerouslySetInnerHTML={{ __html: modalContent.content }} />
        </Modal>
      )}
    </div>
  );
};

export default App;
