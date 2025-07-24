import React, { useState, useMemo, useEffect } from 'react';
import type { Bike, BikeRates, AdditionalCharge } from '../types';
import { WEB3FORMS_ACCESS_KEY } from '../constants';

interface BookingFormProps {
  bikes: Bike[];
  scooterRates: BikeRates;
  commuterRates: BikeRates;
  sportsBikeRates: BikeRates;
  additionalCharges: AdditionalCharge[];
  initialBikeId: string | null;
}

const Section: React.FC<{ num: number; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
    <div className="border-t border-brand-gray-dark/50 pt-6 mt-6">
        <h3 className="text-xl font-bold text-brand-teal mb-4"><span className="bg-brand-teal text-brand-black rounded-full w-6 h-6 inline-flex items-center justify-center mr-3 font-heading">{num}</span>{title}</h3>
        {children}
    </div>
);

const inputStyle = "bg-brand-black border border-brand-gray-dark/50 rounded-lg p-3 text-white w-full focus:outline-none focus:ring-2 focus:ring-brand-orange";

export const BookingForm: React.FC<BookingFormProps> = ({ bikes, scooterRates, commuterRates, sportsBikeRates, additionalCharges, initialBikeId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bikeId: bikes[0]?.id.toString() || '',
    duration: '24',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '10:00',
    pickupType: 'self',
    earlyPickup: false,
    termsAccepted: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialBikeId) {
      setFormData(prev => ({ ...prev, bikeId: initialBikeId }));
    }
  }, [initialBikeId]);

  const bikeRateMap = useMemo(() => {
    const map = new Map<string, { '6': number; '12': number; '24': number; }>();
    const allRates = { ...scooterRates, ...commuterRates, ...sportsBikeRates };
    for (const bike of bikes) {
      for (const rateKey in allRates) {
        const keyParts = rateKey.replace(' (Electric)', '').split(' / ');
        if (keyParts.some(part => bike.name.includes(part))) {
          map.set(bike.id.toString(), allRates[rateKey]);
          break;
        }
      }
    }
    return map;
  }, [bikes, scooterRates, commuterRates, sportsBikeRates]);

  const selectedBike = useMemo(() => bikes.find(b => b.id.toString() === formData.bikeId), [formData.bikeId, bikes]);

  const charges = useMemo(() => {
    const bikeRate = bikeRateMap.get(formData.bikeId);
    const duration = formData.duration as '6' | '12' | '24';
    
    const baseFare = bikeRate ? bikeRate[duration] : 0;
    const deliveryCharge = formData.pickupType === 'delivery' ? additionalCharges.find(c => c.name.includes('Delivery'))?.cost || 0 : 0;
    const earlyPickupCharge = formData.earlyPickup ? additionalCharges.find(c => c.name.includes('Early Pickup'))?.cost || 0 : 0;
    const securityDeposit = additionalCharges.find(c => c.name.includes('Security Deposit'))?.cost || 0;
    
    const total = baseFare + deliveryCharge + earlyPickupCharge;

    return { baseFare, deliveryCharge, earlyPickupCharge, total, securityDeposit };
  }, [formData.bikeId, formData.duration, formData.pickupType, formData.earlyPickup, bikeRateMap, additionalCharges]);

  const dropOffDateTime = useMemo(() => {
    if (!formData.pickupDate || !formData.pickupTime) return '...';
    const pickup = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
    pickup.setHours(pickup.getHours() + parseInt(formData.duration));
    return pickup.toLocaleString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
    });
  }, [formData.pickupDate, formData.pickupTime, formData.duration]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setStatus('error');
      setMessage('You must agree to the terms and conditions.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setMessage('');
    
    const submissionData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Bike Booking from ${formData.name} for a ${selectedBike?.name}`,
        from_name: "BikeBros Website",
        replyto: formData.email,

        // Form Data for Admin
        "Customer Name": formData.name,
        "Email": formData.email,
        "Phone": formData.phone,
        "Delivery Address": formData.pickupType === 'delivery' ? formData.address : 'N/A',
        "Bike": selectedBike?.name || 'N/A',
        "Duration": `${formData.duration} Hours`,
        "Pickup Date": formData.pickupDate,
        "Pickup Time": formData.pickupTime,
        "Calculated Drop-off": dropOffDateTime,
        "Pickup Type": formData.pickupType,
        "Early Pickup (<8am)": formData.earlyPickup ? 'Yes' : 'No',

        // Charges for Admin
        "Base Fare": `₹${charges.baseFare}`,
        "Delivery Charge": `₹${charges.deliveryCharge}`,
        "Early Pickup Charge": `₹${charges.earlyPickupCharge}`,
        "Total Bill": `₹${charges.total}`,
        "Security Deposit": `₹${charges.securityDeposit}`,
    };

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(submissionData),
        });
        const result = await response.json();
        if (result.success) {
            setStatus('success');
            setMessage("Booking request sent! We'll contact you shortly to finalize.");
        } else {
            setStatus('error');
            setMessage(result.message || 'Something went wrong. Please try again.');
        }
    } catch (error) {
        setStatus('error');
        setMessage('Network error. Please check your connection and try again.');
    } finally {
        setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-20 bg-brand-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-heading text-center mb-4 uppercase text-brand-orange">Book Your Ride</h2>
        <p className="text-center max-w-2xl mx-auto mb-12 text-brand-gray-light font-sans">
          Fill out the form below to reserve your ride. Adventure is just a few clicks away!
        </p>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-brand-gray-dark p-8 md:p-12 rounded-xl shadow-2xl shadow-brand-orange/20 font-sans">
            
            {/* --- Section 1: Bike Selection --- */}
            <Section num={1} title="Bike Selection">
                <label htmlFor="bikeId" className="block text-brand-gray-light font-semibold mb-2">Select Your Bike</label>
                <select id="bikeId" name="bikeId" value={formData.bikeId} onChange={handleChange} required className={inputStyle}>
                    {bikes.map(bike => <option key={bike.id} value={bike.id}>{bike.name}</option>)}
                </select>
                {selectedBike && (
                    <div className="mt-4 p-4 bg-brand-black rounded-lg flex items-center gap-4">
                        <img src={selectedBike.imageUrl} alt={selectedBike.name} className="w-24 h-24 object-cover rounded-md"/>
                        <div>
                            <h4 className="text-xl font-bold text-white">{selectedBike.name}</h4>
                            <p className="text-brand-gray-light">{selectedBike.description}</p>
                        </div>
                    </div>
                )}
            </Section>

            {/* --- Section 2: Duration & Date-Time --- */}
            <Section num={2} title="Duration & Date-Time">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="duration" className="block text-brand-gray-light font-semibold mb-2">Ride Duration</label>
                        <select id="duration" name="duration" value={formData.duration} onChange={handleChange} required className={inputStyle}>
                            <option value="6">6 Hours</option>
                            <option value="12">12 Hours</option>
                            <option value="24">24 Hours</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pickupDate" className="block text-brand-gray-light font-semibold mb-2">Pickup Date</label>
                        <input type="date" id="pickupDate" name="pickupDate" value={formData.pickupDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className={inputStyle} style={{colorScheme: 'dark'}}/>
                    </div>
                    <div>
                        <label htmlFor="pickupTime" className="block text-brand-gray-light font-semibold mb-2">Pickup Time</label>
                        <input type="time" id="pickupTime" name="pickupTime" value={formData.pickupTime} onChange={handleChange} required className={inputStyle} style={{colorScheme: 'dark'}}/>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-brand-black rounded-lg text-center">
                    <p className="text-brand-gray-light">
                        <strong>Drop-off:</strong> <span className="font-bold text-brand-yellow">{dropOffDateTime}</span>
                    </p>
                </div>
            </Section>

            {/* --- Section 3: Pickup & Drop Location --- */}
            <Section num={3} title="Pickup & Drop Location">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-brand-gray-light font-semibold mb-2">Pickup Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center"><input type="radio" name="pickupType" value="self" checked={formData.pickupType === 'self'} onChange={handleChange} className="mr-2"/>Self Pickup</label>
                            <label className="flex items-center"><input type="radio" name="pickupType" value="delivery" checked={formData.pickupType === 'delivery'} onChange={handleChange} className="mr-2"/>Home Delivery (+₹300)</label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-brand-gray-light font-semibold mb-2">Delivery Address</label>
                        <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={2} className={`${inputStyle} disabled:bg-brand-black/50 disabled:cursor-not-allowed`} placeholder="Enter full address for delivery" disabled={formData.pickupType !== 'delivery'} required={formData.pickupType === 'delivery'}></textarea>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="flex items-center">
                        <input type="checkbox" name="earlyPickup" checked={formData.earlyPickup} onChange={handleChange} className="mr-2" />
                        Early Pickup Before 8AM? (+₹100)
                    </label>
                </div>
            </Section>

            {/* --- Section 4: Customer Info --- */}
            <Section num={4} title="Customer Info">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-brand-gray-light font-semibold mb-2">Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputStyle} placeholder="e.g. Rohan Sharma" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-brand-gray-light font-semibold mb-2">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} placeholder="you@adventure.com" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-brand-gray-light font-semibold mb-2">Mobile Number</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={inputStyle} placeholder="10-digit number" />
                    </div>
                </div>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                {/* --- Section 5: Charges Summary --- */}
                <div>
                    <h3 className="text-2xl font-bold text-brand-yellow mb-4">💰 Charges Summary</h3>
                    <div className="space-y-2 p-4 bg-brand-black rounded-lg">
                        <div className="flex justify-between"><p>Base Fare ({formData.duration} hrs)</p><p className="font-bold">₹{charges.baseFare}</p></div>
                        {formData.pickupType === 'delivery' && <div className="flex justify-between"><p>Delivery</p><p className="font-bold">₹{charges.deliveryCharge}</p></div>}
                        {formData.earlyPickup && <div className="flex justify-between"><p>Early Pickup</p><p className="font-bold">₹{charges.earlyPickupCharge}</p></div>}
                        <div className="border-t border-brand-gray-dark/50 my-2"></div>
                        <div className="flex justify-between text-lg font-bold text-brand-yellow"><p>Total</p><p>₹{charges.total}</p></div>
                        <div className="flex justify-between text-sm pt-2"><p>🛡️ Security Deposit</p><p className="font-bold">₹{charges.securityDeposit} <span className="font-normal text-brand-gray-light">(Fully refundable)</span></p></div>
                    </div>
                </div>
                
                {/* --- Section 6: Confirm Booking --- */}
                <div className="h-full flex flex-col justify-end">
                    <div className="space-y-4 p-4 bg-brand-black rounded-lg">
                        <label htmlFor="termsAccepted" className="flex items-start cursor-pointer">
                            <input id="termsAccepted" type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mt-1 mr-3 flex-shrink-0" />
                            <span className="text-sm">I agree to the terms (late return, damages, deposit). I confirm I have a valid Driver's License.</span>
                        </label>
                        <button 
                            type="submit" 
                            disabled={isSubmitting || !formData.termsAccepted} 
                            className="w-full bg-brand-orange text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-md text-lg hover:bg-brand-yellow hover:text-brand-black transform hover:scale-105 disabled:bg-brand-gray-dark disabled:text-brand-gray-light/50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? 'Submitting...' : 'Send Booking Request'}
                        </button>
                    </div>
                </div>
            </div>

            {message && (
                <div className={`text-center p-4 rounded-lg mt-6 ${status === 'success' ? 'bg-teal-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                    {message}
                </div>
            )}
        </form>
      </div>
    </section>
  );
};
