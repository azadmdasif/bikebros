import type { LegalContent } from './types';

export const PRIVACY_POLICY: LegalContent = {
  title: 'Privacy Policy',
  content: `
    <h3 class="text-xl font-bold mb-2 text-brand-yellow">1. Information We Collect</h3>
    <p class="mb-4">We collect information you provide directly to us when you submit a booking request through our website. This includes your name, email address, selected bike, rental duration, and preferred date. This information is transmitted directly to our business email to facilitate your booking and is not stored on our website's servers.</p>
    <h3 class="text-xl font-bold mb-2 text-brand-yellow">2. How We Use Your Information</h3>
    <p class="mb-4">We use the information we collect solely to process your booking request, contact you to confirm your rental, and respond to your inquiries. We may use your email or phone number to communicate important details about your rental.</p>
    <h3 class="text-xl font-bold mb-2 text-brand-yellow">3. Information Sharing</h3>
    <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. Your information is confidential and used exclusively for the purpose of your rental with BikeBros.</p>
  `
};

export const REFUND_POLICY: LegalContent = {
    title: 'Refund & Cancellation Policy',
    content: `
      <h3 class="text-xl font-bold mb-2 text-brand-yellow">1. Cancellation by Customer</h3>
      <p class="mb-4">To cancel a booking, please contact us directly via WhatsApp or email. Cancellations made more than 48 hours before the pickup time will receive a full refund of any advance payment. Cancellations made between 24 and 48 hours before pickup will receive a 50% refund. Cancellations made less than 24 hours before the scheduled pickup time are not eligible for a refund.</p>
      <h3 class="text-xl font-bold mb-2 text-brand-yellow">2. No-Show</h3>
      <p class="mb-4">If you do not arrive to pick up your bike at the specified time without prior notification, it will be considered a no-show, and no refund will be provided for any advance paid.</p>
      <h3 class="text-xl font-bold mb-2 text-brand-yellow">3. Early Returns</h3>
      <p>There are no refunds or credits for returning a bike earlier than the specified drop-off time.</p>
    `
};

export const TERMS_AND_CONDITIONS: LegalContent = {
    title: 'Terms & Conditions',
    content: `
      <h3 class="text-xl font-bold mb-2 text-brand-yellow">1. Renter Requirements</h3>
      <p class="mb-4">All renters must be at least 18 years of age and possess a valid driver's license (Motorcycle with Gear) and a valid government-issued ID (Aadhaar Card, Passport, or Voter ID).</p>
      <h3 class="text-xl font-bold mb-2 text-brand-yellow">2. Vehicle Use</h3>
      <p class="mb-4">The rented vehicle must be operated safely and in accordance with all applicable traffic laws in India. The renter is solely responsible for any fines, penalties, or legal issues arising from traffic violations during the rental period. Helmets are mandatory for both rider and pillion.</p>
      <h3 class="text-xl font-bold mb-2 text-brand-yellow">3. Security Deposit & Damage</h3>
      <p>A refundable security deposit is required for all rentals, payable at the time of pickup. The deposit amount varies by bike model. The renter is responsible for any damage, loss, or theft of the vehicle and its accessories. The cost of repairs or replacement will be deducted from the security deposit.</p>
    `
};
