import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-32 bg-beige-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4 fade-up">
            Customer Love
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative fade-up">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <div 
              className="testimonial-track flex"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-1 sm:px-2">
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl ring-1 ring-beige-100">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-48 h-56 sm:w-56 sm:h-64 lg:w-64 lg:h-80 rounded-2xl overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-brand-red to-rose-400 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg shadow-brand-red/30">
                          <Quote className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex gap-1 mb-3 sm:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-champagne-300 fill-current" />
                        ))}
                      </div>
                      <div className="w-10 h-0.5 bg-champagne-300 mb-3 sm:mb-4"></div>
                      <p className="text-matte-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="font-serif text-lg sm:text-xl font-semibold text-matte-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-matte-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-beige-200 flex items-center justify-center hover:border-champagne-300 hover:bg-champagne-300 hover:text-white transition-all"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-2.5 sm:h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-brand-red w-6 sm:w-8' : 'bg-beige-200 w-2.5 sm:w-3'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-beige-200 flex items-center justify-center hover:border-champagne-300 hover:bg-champagne-300 hover:text-white transition-all"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;