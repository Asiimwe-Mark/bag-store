import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/products';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-32 bg-beige-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4 fade-up">
            Got Questions?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title section-heading-underline">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 fade-up">
          <div className="w-12 h-0.5 bg-champagne-300"></div>
          <div className="w-2 h-2 bg-champagne-300 rounded-full"></div>
          <div className="w-12 h-0.5 bg-champagne-300"></div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={faq.id}
              className="fade-up bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md"
              style={{
                transitionDelay: `${index * 0.06}s`,
                borderLeftColor: openIndex === index ? '#D4AF37' : 'transparent',
              }}
            >
              <button
                className="faq-question w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-champagne-50 transition-colors"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-matte-900 text-sm sm:text-base pr-4">{faq.question}</span>
                <ChevronDown
                  className={`faq-chevron w-5 h-5 flex-shrink-0 text-champagne-300 transition-transform duration-300 ${
                    openIndex === index ? 'rotated' : ''
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`accordion-body ${openIndex === index ? 'open' : ''}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="w-8 h-0.5 bg-champagne-300 mb-3"></div>
                    <p className="text-matte-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
