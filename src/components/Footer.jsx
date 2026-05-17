import React, { useState } from 'react';
import { Music, Instagram, MessageCircle, Mail, Phone, ArrowRight, Shield, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { addSubscriber, validateEmail, IMAGES } from '../data/products';

const Footer = ({ showToast, onOpenAdmin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('error', 'Missing Field', 'Please enter your email.');
      return;
    }
    if (!validateEmail(email)) {
      showToast('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = addSubscriber(name, email);
      setLoading(false);

      if (result === 'success') {
        setStatus('success');
        setName('');
        setEmail('');
        showToast('success', 'Subscribed!', 'Welcome to the LORAH family.');
      } else if (result === 'duplicate') {
        setStatus('duplicate');
        showToast('warning', 'Already Subscribed', 'This email is already on our list.');
      } else {
        setStatus('error');
        showToast('error', 'Failed', 'Something went wrong. Please try again.');
      }

      setTimeout(() => setStatus(null), 4000);
    }, 600);
  };

  return (
    <footer className="bg-matte-900 text-white pt-16 sm:pt-20 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="premium-divider mb-12 sm:mb-16"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="fade-up">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <img
                src={IMAGES.logo}
                alt="LORAH Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
              />
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide">LORAH</span>
                <p className="text-[10px] sm:text-xs text-champagne-300 tracking-widest">Exquisite Trends</p>
              </div>
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Uganda's premier destination for luxury handbags. Affordable elegance for the modern woman.
            </p>
            <div className="flex gap-3">
              <a href="https://www.tiktok.com/@lorah.exquisitetrends" target="_blank" rel="noopener noreferrer" className="social-icon-hover w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-brand-red transition-all">
                <Music className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.instagram.com/lorah.exquisitetrends" target="_blank" rel="noopener noreferrer" className="social-icon-hover w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-brand-red transition-all">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="fade-up stagger-1">
            <h4 className="font-serif font-bold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Shop', href: '#shop' },
                { name: 'Collections', href: '#collections' },
                { name: 'About', href: '#about' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/50 hover:text-champagne-300 text-xs sm:text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="fade-up stagger-2">
            <h4 className="font-serif font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a href="https://wa.me/256752103529" className="flex items-center gap-3 text-white/50 hover:text-green-400 text-xs sm:text-sm transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </li>
              <li>
                <a href="tel:0752103529" className="flex items-center gap-3 text-white/50 hover:text-champagne-300 text-xs sm:text-sm transition-colors">
                  <Phone className="w-4 h-4" /> 0752 103 529
                </a>
              </li>
              <li>
                <a href="tel:0701186261" className="flex items-center gap-3 text-white/50 hover:text-champagne-300 text-xs sm:text-sm transition-colors">
                  <Phone className="w-4 h-4" /> 0701 186 261
                </a>
              </li>
              <li>
                <a href="mailto:info@lorah.com" className="flex items-center gap-3 text-white/50 hover:text-champagne-300 text-xs sm:text-sm transition-colors">
                  <Mail className="w-4 h-4" /> info@lorah.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="fade-up stagger-3">
            <h4 className="font-serif font-bold text-base sm:text-lg mb-4 sm:mb-6">Stay Updated</h4>
            <p className="text-white/50 text-xs sm:text-sm mb-4">
              Get notified about new arrivals, exclusive deals, and style tips.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-premium w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-premium w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="magnetic-btn w-full flex items-center justify-center gap-2 bg-brand-red text-white px-4 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>Subscribe <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="premium-divider mb-6 sm:mb-8"></div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/30 pr-20 sm:pr-24">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne-300" />
            <span>&copy; 2025 LORAH Exquisite Trends. All rights reserved.</span>
          </div>
          <button
            onClick={onOpenAdmin}
            className="hover:text-champagne-300 transition-colors"
            title="Admin"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
