import React from 'react';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-react';
import { IMAGES } from '../data/products';
import heroBg from '../assets/images/hero.jpeg';

const Hero = ({ heroImage, onShopClick, onChatClick }) => {
  return (
    <section id="home" className="relative min-h-screen min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage || heroBg}
          alt="Luxury Handbags"
          className="w-full h-full object-cover hero-parallax"
          id="heroBg"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-beige-50/95 via-beige-50/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-beige-50 via-transparent to-transparent"></div>
      </div>

      <div className="absolute top-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-champagne-200/30 rounded-full blur-3xl float-anim"></div>
      <div className="absolute bottom-1/3 right-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-rose-200/20 rounded-full blur-3xl float-anim-reverse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 glass rounded-full border border-green-200/50 hero-reveal hero-reveal-1">
              <span className="w-2 h-2 bg-green-500 rounded-full wa-status-online"></span>
              <span className="text-xs sm:text-sm font-medium text-green-700">Online — Chat With Us</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight hero-reveal hero-reveal-2 hero-title">
              Luxury Handbags<br />for <span className="brand-red">Elegant</span><br />Women
            </h1>

            <p className="text-base sm:text-lg text-matte-700 max-w-lg leading-relaxed hero-reveal hero-reveal-3 hero-subtitle">
              Premium fashion. Affordable luxury. Discover 50+ handcrafted bags designed for the modern woman in Uganda & East Africa.
            </p>

            <div className="hero-reveal hero-reveal-3 border-l-4 border-brand-red pl-4 sm:pl-6">
              <p className="hero-motto text-2xl sm:text-3xl text-matte-800/80">"feel the elegance"</p>
              <p className="text-xs sm:text-sm text-matte-500 mt-2 tracking-widest uppercase">— LORAH Exquisite Trends</p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 hero-reveal hero-reveal-4">
              <button
                onClick={onShopClick}
                className="magnetic-btn btn-premium btn-glow inline-flex items-center gap-2 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all text-sm sm:text-base"
              >
                Browse Collection <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={onChatClick}
                className="magnetic-btn inline-flex items-center gap-2 bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-600 hover:shadow-xl shadow-green-500/20 transition-all text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Chat
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 hero-reveal hero-reveal-5">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-champagne-300" />
                <span className="text-xs sm:text-sm font-medium text-matte-600">Kampala Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-champagne-300" />
                <span className="text-xs sm:text-sm font-medium text-matte-600">Authentic Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-champagne-300" />
                <span className="text-xs sm:text-sm font-medium text-matte-600">New Weekly</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-80 sm:w-96 h-[400px] sm:h-[500px]">
              <div className="absolute inset-4 bg-gradient-to-br from-champagne-200 to-rose-200 rounded-3xl rotate-6 opacity-50"></div>
              <div className="glow-ring rounded-2xl">
                <img
                  src="images/IMG-20260511-WA0012.png"
                  alt="Chrisbella Premium Shoulder Bag"
                  className="relative w-full h-full object-cover float-anim rounded-2xl shadow-2xl"
                  loading="eager"
                />
              </div>
              <div className="absolute -top-3 -right-3 glass-premium rounded-xl px-3 py-2 float-anim-reverse gold-border-anim">
                <p className="text-xs text-matte-500 font-medium">Price</p>
                <p className="text-base font-bold text-matte-900">UGX 95,000</p>
              </div>
              <div className="absolute -bottom-3 -left-3 glass-premium rounded-xl px-3 py-2 float-anim gold-border-anim">
                <div className="flex items-center gap-1">
                  <span className="text-champagne-300">&#9733;</span>
                  <span className="text-sm font-bold">4.9</span>
                  <span className="text-xs text-matte-500">(500+)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-reveal hero-reveal-5">
        <span className="text-xs font-medium text-matte-500 tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-champagne-300/50 rounded-full flex justify-center pt-1.5">
          <div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-champagne-300 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
