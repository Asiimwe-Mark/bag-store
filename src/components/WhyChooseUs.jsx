import React from 'react';
import { Gem, Truck, Tag, Headphones, Sparkles, Shield } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/products';

const WhyChooseUs = () => {
  const iconMap = { Gem, Truck, Tag, Headphones, Sparkles, Shield };

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-matte-900 to-matte-800 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-red/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-rose-400/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-sm font-semibold text-champagne-300 tracking-widest uppercase mb-4 fade-up">
            Why LORAH
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title text-white">
            Why Choose Us
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4 sm:mt-6 fade-up stagger-2 text-sm sm:text-base">
            We deliver an experience of elegance, trust, and affordable luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div 
                key={index}
                className="group glass-dark rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 fade-up"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-red to-rose-400 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;