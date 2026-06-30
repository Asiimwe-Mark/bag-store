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
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'navbar-glass shadow-lg' : ''
        }`}
        style={{ background: scrolled ? undefined : 'transparent' }}
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
                <span className="font-serif text-xl sm:text-2xl font-bold text-matte-900 tracking-wide">LORAH</span>
                <p className="text-[9px] sm:text-[10px] text-champagne-300 tracking-[0.2em] font-medium -mt-0.5">Bence Trends</p>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link px-3 xl:px-4 py-2 text-sm font-medium text-matte-700 hover:text-brand-red transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://wa.me/256752103529"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn hidden sm:flex items-center gap-2 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-green-600 transition-colors shadow-green-500/20 shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-beige-50 flex items-center justify-center hover:bg-champagne-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0 w-72 sm:w-80 h-full z-50 glass shadow-2xl lg:hidden ${
          mobileMenuOpen ? 'open' : ''
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-serif text-xl font-bold text-matte-900">Menu</span>
            <button onClick={closeMenu} className="w-10 h-10 rounded-xl bg-beige-50 flex items-center justify-center" aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="mobile-link-reveal flex items-center gap-3 px-4 py-3 rounded-xl text-matte-700 hover:bg-champagne-50 hover:text-brand-red transition-all text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-beige-200">
            <a
              href="https://wa.me/256752103529"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-link-reveal flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;
