import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Home, ShoppingBag, BookOpen, Heart, Star, HelpCircle } from 'lucide-react';
import { IMAGES } from '../data/products';

const Navbar = ({ onMenuToggle, onChatClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#shop' },
    { name: 'Collections', href: '#collections' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav 
        id="navbar" 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          scrolled ? 'glass shadow-lg' : ''
        }`}
        style={{ background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="#home" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <img 
                src={IMAGES.logo} 
                alt="LORAH Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                loading="eager"
              />
              <div className="leading-tight hidden sm:block">
                <span className="font-serif text-xl sm:text-2xl font-bold text-matte-900 tracking-wider">
                  LORAH
                </span>
                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-matte-500 uppercase">
                  Exquisite Trends
                </p>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="nav-link text-sm font-medium text-matte-800 hover:text-brand-red transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={onChatClick}
                className="hidden sm:inline-flex items-center gap-2 btn-glow bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all flex-shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden md:inline">Chat Now</span>
              </button>
              
              <button 
                id="menuToggle"
                onClick={() => {
                  setMobileMenuOpen(true);
                  onMenuToggle?.();
                }}
                className="lg:hidden p-2 rounded-lg hover:bg-beige-100 transition-colors flex-shrink-0"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="menuOverlay"
        className={`fixed inset-0 bg-black/50 z-[99] transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu */}
      <div 
        id="mobileMenu"
        className={`mobile-menu glass shadow-2xl ${mobileMenuOpen ? 'open' : ''}`}
      >
        <div className="p-5 sm:p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-beige-200">
            <div className="flex items-center gap-2">
              <img src={IMAGES.logo} alt="LORAH" className="w-9 h-9 rounded-lg" />
              <span className="font-serif text-lg font-bold">LORAH</span>
            </div>
            <button 
              id="menuClose"
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-beige-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map(link => {
              const mobileIcons = {
                'Home': Home,
                'Shop': ShoppingBag,
                'Collections': BookOpen,
                'About': Heart,
                'Testimonials': Star,
                'FAQ': HelpCircle,
              };
              const Icon = mobileIcons[link.name];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  aria-label={`Go to ${link.name}`}
                  className="mobile-link flex items-center gap-3 px-4 py-3 rounded-xl text-matte-800 font-medium hover:bg-champagne-100 transition-colors"
                >
                  <span className="text-brand-red">
                    {Icon && <Icon className="w-5 h-5" />}
                  </span>
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-beige-200 space-y-3">
            <a 
              href="https://wa.me/256752103529?text=Hi%20LORAH!%20I'm%20interested%20in%20your%20handbags"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a 
              href="tel:+256752103529"
              className="flex items-center justify-center gap-2 text-matte-700 px-5 py-2.5 text-sm font-medium hover:text-brand-red transition-colors border border-beige-200 rounded-xl"
            >
              📞 0752 103 529
            </a>
            <a 
              href="tel:+256765066209"
              className="flex items-center justify-center gap-2 text-matte-700 px-5 py-2.5 text-sm font-medium hover:text-brand-red transition-colors border border-beige-200 rounded-xl"
            >
              📞 0765 066 209
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;