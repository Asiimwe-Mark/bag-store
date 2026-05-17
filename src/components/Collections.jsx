import React from 'react';
import { COLLECTIONS, IMAGES } from '../data/products';

const Collections = ({ onCollectionClick }) => {
  return (
    <section id="collections" className="py-16 sm:py-20 lg:py-32 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4 fade-up">
            Curated For You
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title">
            Shop by Collection
          </h2>
        </div>

        {/* New Arrivals Horizontal Scroll */}
        <div className="mb-10 sm:mb-16 fade-up">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold">New Arrivals</h3>
            <a href="#shop" className="text-brand-red font-medium text-sm hover:underline">
              View All →
            </a>
          </div>
          
          <div className="collection-scroll flex gap-4 sm:gap-6 overflow-x-auto pb-4">
            {COLLECTIONS.map((collection) => (
              <div 
                key={collection.id}
                onClick={() => onCollectionClick(collection)}
                className="min-w-[240px] sm:min-w-[280px] snap-center rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <div className="relative h-60 sm:h-72 overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 collection-overlay"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <span className="bg-brand-red text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                      {collection.badge}
                    </span>
                    <h4 className="text-white font-serif text-base sm:text-lg mt-2">
                      {collection.name}
                    </h4>
                    <p className="text-white/80 text-xs sm:text-sm">
                      {collection.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Collections Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 fade-up">
          <div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-64 sm:h-80 group cursor-pointer"
            onClick={() => onCollectionClick({ name: 'Luxury Collection' })}
          >
            <img 
              src={IMAGES.luxury} 
              alt="Luxury Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <span className="text-champagne-300 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Premium Line
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1 sm:mt-2">
                Luxury Collection
              </h3>
              <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2">
                Handcrafted with the finest materials
              </p>
            </div>
          </div>

          <div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-64 sm:h-80 group cursor-pointer"
            onClick={() => onCollectionClick({ name: 'Affordable Picks' })}
          >
            <img 
              src={IMAGES.affordable} 
              alt="Affordable Luxury"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <span className="text-rose-300 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Smart Choice
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1 sm:mt-2">
                Affordable Luxury
              </h3>
              <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2">
                Style that doesn't break the bank
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;