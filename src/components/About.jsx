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
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-champagne-300/20 img-zoom-container">
              <img
                src={IMAGES.about}
                alt="About LORAH"
                className="w-full h-[350px] sm:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-32 h-32 sm:w-48 sm:h-48 bg-champagne-100 rounded-2xl sm:rounded-3xl -z-10"></div>
            <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 bg-rose-100 rounded-2xl sm:rounded-3xl -z-10"></div>

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 glass-premium rounded-xl sm:rounded-2xl p-3 sm:p-4 gold-border-anim">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-red rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-matte-900 text-sm sm:text-base">2,500+</p>
                  <p className="text-xs text-matte-500">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="fade-right">
            <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 section-title section-heading-underline">
              About LORAH
            </h2>
            <p className="text-matte-700 leading-relaxed mb-4 text-sm sm:text-base">
              LORAH Exquisite Trends is Uganda's premier destination for luxury handbags. We curate the finest
              collection of designer-inspired and authentic brand bags, bringing affordable elegance to the
              modern East African woman.
            </p>
            <p className="text-matte-700 leading-relaxed mb-8 text-sm sm:text-base">
              Every bag in our collection is handpicked for quality, style, and durability. From chic tote bags
              to statement shoulder bags, we believe every woman deserves to feel extraordinary.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="fade-up group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-beige-50 hover:bg-champagne-50 border border-transparent hover:border-champagne-200 transition-all duration-300"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-champagne-300 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-matte-900 text-xs sm:text-sm">{feature.title}</p>
                  <p className="text-xs text-matte-500">{feature.desc}</p>
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
