import React from 'react';
import { X, MessageCircle, Phone, Star, Truck, ShieldCheck } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose, onOrderClick }) => {
  if (!isOpen || !product) return null;

  return (
    <div className={`modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? 'open' : ''}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="modal-content relative bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-beige-50 rounded-full flex items-center justify-center hover:bg-beige-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="h-56 sm:h-64 md:h-auto">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover rounded-t-2xl sm:rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            />
          </div>
          
          <div className="p-6 sm:p-8">
            <span className="text-xs font-bold text-brand-red tracking-widest uppercase">
              {product.category}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-2 mb-3 sm:mb-4">
              {product.name}
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-matte-900 mb-3 sm:mb-4">
              {product.price}
            </p>
            <p className="text-matte-600 text-sm leading-relaxed mb-4 sm:mb-6">
              {product.desc}
            </p>
            
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Star className="w-5 h-5 text-champagne-300 fill-current" />
              <span className="font-semibold text-matte-900">4.9</span>
              <span className="text-matte-500 text-sm">(120+ reviews)</span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <button 
                onClick={() => onOrderClick(product)}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm sm:text-base"
              >
                <MessageCircle className="w-5 h-5" /> Order on WhatsApp
              </button>
              <a 
                href="tel:+256752103529"
                className="flex items-center justify-center gap-2 border-2 border-matte-900 text-matte-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-matte-900 hover:text-white transition-all text-sm sm:text-base"
              >
                <Phone className="w-5 h-5" /> Call to Order
              </a>
            </div>

            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-beige-200 space-y-2">
              <div className="flex items-center gap-2 text-sm text-matte-600">
                <Truck className="w-4 h-4 text-champagne-300" />
                Same-day delivery in Kampala
              </div>
              <div className="flex items-center gap-2 text-sm text-matte-600">
                <ShieldCheck className="w-4 h-4 text-champagne-300" />
                Quality guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;