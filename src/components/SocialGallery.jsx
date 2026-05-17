import React, { useState, useEffect } from 'react';
import { Music, Instagram, Heart, Eye, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SOCIAL_POSTS, SOCIAL_STATS } from '../data/products';

const SocialGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction) => {
    const newIndex = (currentImageIndex + direction + SOCIAL_POSTS.length) % SOCIAL_POSTS.length;
    setCurrentImageIndex(newIndex);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, currentImageIndex]);

  const iconMap = { music: Music, instagram: Instagram, heart: Heart, eye: Eye };

  return (
    <>
      <section id="social" className="py-16 sm:py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4 fade-up">
              Follow Our Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title">
              Social Style Gallery
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 fade-up">
            {SOCIAL_STATS.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              return (
                <div key={index} className="text-center p-4 sm:p-6 bg-beige-50 rounded-2xl hover:bg-champagne-50 transition-colors group">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-matte-900 mx-auto mb-2 sm:mb-3 group-hover:text-champagne-300 transition-colors" />
                  <p className="font-serif text-2xl sm:text-3xl font-bold" data-counter={stat.value}>
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-matte-500">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 fade-up">
            {SOCIAL_POSTS.map((post, index) => (
              <div 
                key={post.id}
                className="social-card relative group rounded-xl sm:rounded-2xl overflow-hidden aspect-square cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={post.image} 
                  alt={`Social Post ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 fade-up">
            <a 
              href="https://tiktok.com/@lorah_exquisite_trends"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-matte-900 font-semibold hover:text-brand-red transition-colors text-sm sm:text-base"
            >
              Follow @lorah_exquisite_trends on TikTok 
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className={`lightbox fixed inset-0 z-50 flex items-center justify-center p-4 ${lightboxOpen ? 'open' : ''}`}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeLightbox}></div>
          
          <div className="relative max-w-3xl sm:max-w-4xl w-full">
            <button 
              onClick={closeLightbox}
              className="absolute -top-10 sm:-top-12 right-0 w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <img 
              src={SOCIAL_POSTS[currentImageIndex].image} 
              alt="Lightbox"
              className="w-full rounded-2xl shadow-2xl"
            />
            
            <div className="flex justify-between items-center mt-3 sm:mt-4">
              <button
                onClick={() => navigateLightbox(-1)}
                className="flex items-center gap-1 sm:gap-2 text-white/80 hover:text-white transition-colors text-sm sm:text-base"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Previous
              </button>
              <p className="text-white/60 text-sm">
                {currentImageIndex + 1} / {SOCIAL_POSTS.length}
              </p>
              <button
                onClick={() => navigateLightbox(1)}
                className="flex items-center gap-1 sm:gap-2 text-white/80 hover:text-white transition-colors text-sm sm:text-base"
              >
                Next <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialGallery;