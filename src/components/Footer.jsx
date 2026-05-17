import React, { useState } from 'react';
import { Music, Instagram, MessageCircle, Mail, Phone, ArrowRight, Shield, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { addSubscriber, validateEmail, IMAGES } from '../data/products';

const Footer = ({ showToast, onOpenAdmin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'duplicate' | 'error'

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
        <div className="h-0.5 bg-gradient-to-r from-transparent via-champagne-300/30 to-transparent mb-12 sm:mb-16"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <img src={IMAGES.logo} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain" alt="LORAH" />
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider">LORAH</span>
                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-white/50 uppercase">Exquisite Trends</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3 sm:mb-4">
              Premium handbags for the modern woman. Affordable luxury delivered across Uganda & East Africa.
            </p>
            <p className="motto-font text-lg text-white/80 mb-4 sm:mb-6">"feel the elegance"</p>
            <div className="flex gap-3">
              <a href="https://tiktok.com/@lorah_exquisite_trends" target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-brand-red hover:scale-110 transition-all">
                <Music className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/lorah_exquisite_trends" target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-brand-red hover:scale-110 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/256752103529" target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Home', 'Shop All Bags', 'Collections', 'About Us', 'Testimonials', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' all bags', '').replace(' us', '').replace(' ', '')}`} className="text-white/60 hover:text-brand-red text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 sm:mb-6">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Phone 1</p>
                  <a href="tel:+256752103529" className="text-sm text-white hover:text-brand-red transition-colors">0752 103 529</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Phone 2</p>
                  <a href="tel:+256765066209" className="text-sm text-white hover:text-brand-red transition-colors">0765 066 209</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">WhatsApp</p>
                  <a href="https://wa.me/256752103529" target="_blank" rel="noopener" className="text-sm text-white hover:text-green-400 transition-colors">0752 103 529</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/60">Email</p>
                  <a href="mailto:hello@lorahbag.com" className="text-sm text-white hover:text-brand-red transition-colors">hello@lorahbag.com</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 sm:mb-6">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-3 sm:mb-4">Get notified about new arrivals and exclusive offers.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                aria-label="Your name"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-champagne-300 focus:ring-2 focus:ring-champagne-300/20 transition-all text-sm"
              />
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address"
                  required
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-champagne-300 focus:ring-2 focus:ring-champagne-300/20 transition-all text-sm"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-red to-rose-400 text-white px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all btn-glow disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="nl-spinner" />
                ) : (
                  <>Subscribe <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {status === 'success' && (
              <div className="nl-success mt-3 p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm font-semibold">Subscribed successfully!</p>
              </div>
            )}
            {status === 'duplicate' && (
              <div className="nl-error mt-3 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-yellow-400 text-sm font-semibold">Already subscribed!</p>
              </div>
            )}
            {status === 'error' && (
              <div className="nl-error mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm font-semibold">Something went wrong.</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-champagne-300/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} LORAH Exquisite Trends. All rights reserved. "feel the elegance"
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-xs sm:text-sm transition-colors">Privacy</a>
            <a href="#" className="text-white/40 hover:text-white/60 text-xs sm:text-sm transition-colors">Terms</a>
            <button onClick={onOpenAdmin} className="text-white/20 hover:text-white/40 text-xs transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3" /> Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;