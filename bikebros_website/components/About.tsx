import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-20 bg-brand-gray-dark">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
            <h2 className="text-5xl font-heading mb-6 uppercase text-brand-teal">About BikeBros</h2>
            <p className="text-lg text-brand-gray-light font-sans mb-4 leading-relaxed">
                Founded by a band of rebels with a love for two wheels and open roads, BikeBros isn't just a rental service—it's a launchpad for your next great adventure. We believe that the best stories are found on the roads less traveled, whether that's a winding mountain pass, a bustling city street, or a serene coastal highway.
            </p>
            <p className="text-lg text-brand-gray-light font-sans leading-relaxed">
                Our fleet is a curated collection of India's most-loved bikes, meticulously maintained and ready for anything. We handle the mechanics so you can focus on the memories. Join the brotherhood of riders. Your journey awaits.
            </p>
        </div>
        <div className="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1599819097435-a63e4cb459c3?q=80&w=1974&auto=format&fit=crop" alt="Group of friends with motorcycles" className="rounded-lg shadow-2xl shadow-brand-teal/20 w-full" />
        </div>
      </div>
    </section>
  );
};