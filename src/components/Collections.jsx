import React from 'react';
import { COLLECTIONS } from '../data/products';

const Collections = ({ onCollectionClick }) => {
  return (
    <section id="collections" className="py-16 sm:py-20 lg:py-32 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4 fade-up">
            Curated For You
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title section-heading-underline">
            Shop by Collection
          </h2>
        </div>

        {/* New Arrivals Horizontal Scroll */}
        <div className="mb-10 sm:mb-16 fade-up stagger-2">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold">New Arrivals</h3>
            <a href="#shop" className="text-brand-red font-medium text-sm hover:underline">
              View All &rarr;
            </a>
          </div>

          <div className="collection-scroll flex gap-4 sm:gap-6 overflow-x-auto pb-4">
            {COLLECTIONS.map((collection, index) => (
              <div
                key={collection.id}
                onClick={() => onCollectionClick(collection)}
                className="fade-up min-w-[240px] sm:min-w-[280px] snap-center rounded-2xl overflow-hidden shadow-lg group cursor-pointer card-shimmer gold-border-anim"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-60 sm:h-72 overflow-hidden img-zoom-container">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover collection-card-img"
                    loading="lazy"
                  />
                  <div className="collection-overlay absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                    <span className="text-xs font-bold text-champagne-300 tracking-widest uppercase mb-1">{collection.badge}</span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-white">{collection.name}</h4>
                    <p className="text-white/80 text-xs sm:text-sm mt-1">{collection.price}</p>
                    <button className="mt-3 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-brand-red/80 hover:bg-brand-red px-4 py-2 rounded-full transition-all w-fit">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
