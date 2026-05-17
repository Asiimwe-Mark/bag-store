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
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 fade-up">
          <div className="w-12 h-0.5 bg-champagne-300"></div>
          <div className="w-2 h-2 bg-champagne-300 rounded-full"></div>
          <div className="w-12 h-0.5 bg-champagne-300"></div>
        </div>

        <div className="space-y-3 sm:space-y-4 fade-up">
          {FAQS.map((faq, index) => (
            <div
              key={faq.id}
              className={`faq-item bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden border-l-4 transition-colors ${
                openIndex === index ? 'border-champagne-300' : 'border-transparent'
              }`}
            >
              <button
                className="faq-question w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-champagne-50 transition-colors"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-matte-900 pr-4 text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`faq-chevron w-5 h-5 text-brand-red flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotated' : ''
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                className={`faq-answer px-4 sm:px-6 pb-4 sm:pb-6 ${
                  openIndex === index ? 'open' : ''
                }`}
              >
                <p className="text-matte-600 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;