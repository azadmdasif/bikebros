import React from 'react';

export const Contact: React.FC = () => {
    return (
        <section className="py-20 bg-brand-black">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-heading text-center mb-12 uppercase text-brand-orange">Get In Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="bg-brand-gray-dark p-8 rounded-lg shadow-lg h-full">
                        <h3 className="text-3xl font-heading text-brand-yellow mb-6">Our Location</h3>
                        <div className="space-y-4 font-sans text-lg text-brand-gray-light">
                            <p><strong>Address:</strong><br />39 Mominpore Road, Ekbalpur<br/>Kolkata, West Bengal 700023<br/>India</p>
                            <p><strong>Phone:</strong> <a href="tel:+917686022245" className="hover:text-brand-yellow transition-colors">+91 7686022245</a></p>
                            <p><strong>Email:</strong> <a href="mailto:bikebrosrental@gmail.com" className="hover:text-brand-yellow transition-colors">bikebrosrental@gmail.com</a></p>
                        </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden shadow-lg h-full min-h-[400px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d460.6506368970309!2d88.322306712041!3d22.533988643585637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279e1f4a65131%3A0x56574beb8ce399a7!2s39%2C%20Mominpore%20Rd%2C%20Ekbalpur%2C%20Mominpore%2C%20Kolkata%2C%20West%20Bengal%20700023!5e0!3m2!1sen!2sin!4v1753185580113!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="BikeBros Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}