import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { PRODUCTS } from './data/products';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Collections from './components/Collections';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import SocialGallery from './components/SocialGallery';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ProductModal from './components/ProductModal';
import AdminPanel from './components/AdminPanel';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // UI State
  const [waOpen, setWaOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Toast State
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });
  const showToast = useCallback((type, title, message) => {
    setToast({ show: true, type, title, message });
  }, []);
  const hideToast = useCallback(() => setToast(prev => ({ ...prev, show: false })), []);

  // Shop State
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const PRODUCTS_PER_PAGE = 12;

  // Filter Logic
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleProducts = filteredProducts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredProducts.length;
  const remainingCount = filteredProducts.length - displayedCount;

  // Handlers
  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + PRODUCTS_PER_PAGE, filteredProducts.length));
      setIsLoading(false);
    }, 300);
  };

  const handleCategoryChange = (cat) => {
    setCurrentCategory(cat);
    setDisplayedCount(PRODUCTS_PER_PAGE);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeProductModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setWaOpen(true);
  };

  // Scroll Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const animateElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleProducts, currentCategory]);

  // Navbar Scroll Effect + Parallax + Scroll-to-Top
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('glass', 'shadow-lg');
          navbar.style.background = 'rgba(255,255,255,0.85)';
        } else {
          navbar.classList.remove('glass', 'shadow-lg');
          navbar.style.background = 'transparent';
        }
      }
      // Hero parallax
      const heroBg = document.getElementById('heroBg');
      if (heroBg) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body overflow lock for modals
  useEffect(() => {
    if (modalOpen || adminOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen, adminOpen]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (modalOpen) closeProductModal();
        if (adminOpen) setAdminOpen(false);
        if (waOpen) setWaOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, adminOpen, waOpen]);

  return (
    <div className="bg-beige-50 text-matte-900 antialiased min-h-screen">
      <Navbar 
        onMenuToggle={() => setMobileMenuOpen(true)} 
        onChatClick={() => setWaOpen(true)} 
      />
      
      <Hero 
        onShopClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
        onChatClick={() => setWaOpen(true)}
      />

      {/* Shop Section */}
      <section id="shop" className="py-16 sm:py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4 fade-up">Our Collection</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 fade-up stagger-1 section-title">
              50+ Premium Handbags
            </h2>
            <p className="text-matte-600 max-w-2xl mx-auto fade-up stagger-2 text-sm sm:text-base">
              Curated selection of premium handbags for every occasion. Discover your perfect bag from our extensive collection.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12 fade-up">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search 50+ handbags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full pl-12 pr-4 py-3 rounded-xl border border-beige-200 bg-beige-50 focus:outline-none focus:border-brand-red transition-all text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
              {['all', 'luxury', 'tote', 'shoulder', 'mini', 'office', 'travel'].map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`cat-tab px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                    currentCategory === cat 
                      ? 'active bg-brand-red text-white border-brand-red' 
                      : 'border-beige-200 bg-white hover:border-brand-red'
                  }`}
                >
                  {cat === 'all' ? `All (${PRODUCTS.length})` : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid 
            products={visibleProducts} 
            onOrderClick={handleOrderClick}
            onDetailsClick={openProductModal}
          />

          {/* Load More */}
          <div className="text-center mt-10 sm:mt-12 fade-up">
            {hasMore ? (
              <button 
                onClick={loadMore}
                disabled={isLoading}
                className={`load-more-btn inline-flex items-center gap-2 sm:gap-3 bg-matte-900 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-brand-red transition-all text-sm sm:text-base ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? 'Loading...' : `Load More Bags (${remainingCount} remaining)`}
              </button>
            ) : (
              <p className="text-matte-600 mt-4 text-sm"><Sparkles className="w-4 h-4 inline text-champagne-300 mr-1" /> You've seen all our beautiful bags! Contact us for custom orders.</p>
            )}
          </div>
        </div>
      </section>

      <Collections onCollectionClick={(col) => handleOrderClick({ name: col.name, price: col.price, image: col.image })} />

      <div className="section-divider max-w-4xl mx-auto"></div>

      <About />

      <div className="section-divider max-w-4xl mx-auto"></div>

      <WhyChooseUs />
      <Testimonials />
      
      {/* WhatsApp CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 sm:w-48 sm:h-48 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-up">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 sm:px-5 py-2 mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-white rounded-full wa-status-online"></span>
            <span className="text-white/90 text-xs sm:text-sm font-medium">We respond in minutes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">Found a Bag You Love?</h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
            Contact us instantly and we'll help you find your perfect handbag from our 50+ collection.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button onClick={() => setWaOpen(true)} className="btn-glow inline-flex items-center gap-2 sm:gap-3 bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:shadow-2xl transition-all text-sm sm:text-lg">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </button>
            <a href="tel:+256752103529" className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white/30 transition-all text-sm sm:text-lg border border-white/30">
              <Phone className="w-5 h-5" /> 0752 103 529
            </a>
            <a href="tel:+256765066209" className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white/30 transition-all text-sm sm:text-lg border border-white/30">
              <Phone className="w-5 h-5" /> 0765 066 209
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      <SocialGallery />
      <FAQ />
      
      <Footer showToast={showToast} onOpenAdmin={() => setAdminOpen(true)} />
      
      {/* Overlays & Modals */}
      <WhatsAppWidget 
        isOpen={waOpen} 
        onClose={() => setWaOpen(false)} 
        onToggle={() => setWaOpen(prev => !prev)}
        product={selectedProduct}
      />
      
      <ProductModal 
        product={selectedProduct} 
        isOpen={modalOpen} 
        onClose={closeProductModal} 
        onOrderClick={handleOrderClick}
      />
      
      <AdminPanel 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)} 
        showToast={showToast}
      />
      
      <Toast toast={toast} onClose={hideToast} />
      <ScrollToTop />
    </div>
  );
}

export default App;