import React from 'react';
import { Heart, Gem, Award, Sparkles, Users } from 'lucide-react';
import { IMAGES } from '../data/products';

const About = () => {
  const features = [
    { icon: Gem, title: "Premium Materials", desc: "Only the finest quality" },
    { icon: Award, title: "Quality Assured", desc: "Every bag inspected" },
    { icon: Sparkles, title: "Trend-Forward", desc: "Latest styles weekly" },
    { icon: Users, title: "Customer First", desc: "Personal service" }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="relative fade-left">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-champagne-300/20">
              <img 
                src={IMAGES.about} 
                alt="About LORAH"
                className="w-full h-[350px] sm:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-32 h-32 sm:w-48 sm:h-48 bg-champagne-100 rounded-2xl sm:rounded-3xl -z-10"></div>
            <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 bg-rose-100 rounded-2xl sm:rounded-3xl -z-10"></div>
            
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 glass-premium rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-red rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-matte-900">2,000+</p>
                  <p className="text-xs text-matte-500">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 fade-right">
            <p className="text-sm font-semibold text-brand-red tracking-widest uppercase">
              Our Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight section-title">
              Redefining <span className="brand-red">Luxury</span> for the Modern Woman
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-champagne-300 to-transparent"></div>
            <p className="text-matte-600 leading-relaxed text-base sm:text-lg">
              LORAH was born from a passion for making premium fashion accessible to every woman in Uganda and East Africa. We believe that elegance should never be a privilege — it's a right.
            </p>

            <div className="border-l-4 border-brand-red pl-4 sm:pl-6 py-3 sm:py-4 my-4 bg-brand-red/5 rounded-r-xl">
              <p className="motto-font text-xl sm:text-2xl text-matte-800">"feel the elegance"</p>
              <p className="text-sm text-matte-500 mt-1">— LORAH Exquisite Trends</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-champagne-50 transition-colors group/feature">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-champagne-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/feature:bg-champagne-200 transition-colors">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-champagne-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-matte-900 text-sm sm:text-base">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-matte-500 mt-1">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;