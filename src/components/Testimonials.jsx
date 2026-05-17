import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const nextTestimonial = useCallback(() => {
    goTo((currentIndex + 1) % TESTIMONIALS.length);
  }, [currentIndex, goTo]);

  const prevTestimonial = useCallback(() => {
    goTo((currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, [currentIndex, goTo]);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextTestimonial();
      else prevTestimonial();
    }
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-32 bg-beige-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4 fade-up">
            Customer Love
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title section-heading-underline">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative fade-up stagger-2">
          <div
            className="overflow-hidden rounded-2xl sm:rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className="testimonial-track flex"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-1 sm:px-2">
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl ring-1 ring-beige-100">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="avatar-ring">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 bg-brand-red rounded-full flex items-center justify-center shadow-lg quote-fade-in visible">
                          <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-champagne-300 text-champagne-300" />
                        ))}
                      </div>
                      <p className="text-matte-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="font-serif font-bold text-matte-900 text-base sm:text-lg">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-matte-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-champagne-50 hover:shadow-xl transition-all group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-matte-600 group-hover:text-brand-red transition-colors" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-champagne-50 hover:shadow-xl transition-all group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-matte-600 group-hover:text-brand-red transition-colors" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-brand-red'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-champagne-200 hover:bg-champagne-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
