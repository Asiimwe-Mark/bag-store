import React, { useState, useEffect, useRef } from 'react';
import { Music, Instagram, Heart, Eye, ZoomIn, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { SOCIAL_POSTS, SOCIAL_STATS } from '../data/products';

const isVideoUrl = (url) => /\.(mp4|webm|mov|ogg)(\?|$)/i.test(url);

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  const formatNumber = (n) => {
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
    return n.toString();
  };

  return (
    <span ref={ref} className={`counter-animate ${isVisible ? 'count-visible' : ''}`}>
      {formatNumber(count)}{suffix}
    </span>
  );
};

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
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title section-heading-underline">
              Social Style Gallery
            </h2>
          </div>

          {/* Social Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-16">
            {SOCIAL_STATS.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              return (
                <div
                  key={stat.label}
                  className="fade-up text-center p-4 sm:p-6 rounded-2xl bg-beige-50 hover:bg-champagne-50 border border-transparent hover:border-champagne-200 transition-all duration-300 group"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-red" />}
                  </div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-matte-900">
                    <AnimatedCounter target={stat.value} />
                  </p>
                  <p className="text-xs sm:text-sm text-matte-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {SOCIAL_POSTS.map((post, index) => (
              <div
                key={post.id}
                className="fade-up relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group img-zoom-container"
                style={{ transitionDelay: `${index * 0.06}s` }}
                onClick={() => openLightbox(index)}
              >
                {isVideoUrl(post.image) ? (
                  <video
                    src={post.image}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={post.image}
                    alt={`Social post ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                {isVideoUrl(post.image) && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-matte-900 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 flex items-center justify-center">
                      {isVideoUrl(post.image) ? (
                        <Play className="w-5 h-5 text-matte-900 ml-0.5" fill="currentColor" />
                      ) : (
                        <ZoomIn className="w-5 h-5 text-matte-900" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox open fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeLightbox}></div>

          <div className="lightbox-content relative max-w-4xl w-full max-h-[85vh]">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {isVideoUrl(SOCIAL_POSTS[currentImageIndex].image) ? (
              <video
                src={SOCIAL_POSTS[currentImageIndex].image}
                controls
                autoPlay
                playsInline
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl sm:rounded-2xl"
              />
            ) : (
              <img
                src={SOCIAL_POSTS[currentImageIndex].image}
                alt={`Social post ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl sm:rounded-2xl"
              />
            )}

            <button
              onClick={() => navigateLightbox(-1)}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => navigateLightbox(1)}
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center justify-center gap-2 mt-4">
              {SOCIAL_POSTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialGallery;
