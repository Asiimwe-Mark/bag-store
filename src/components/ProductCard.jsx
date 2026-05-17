import React from 'react';
import { Heart, MessageCircle, Eye } from 'lucide-react';

const ProductCard = ({ product, onOrderClick, onDetailsClick }) => {
  const [isFavorited, setIsFavorited] = React.useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden shadow-md product-enter">
      <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64 bg-beige-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23F5EDE0' width='400' height='400'/%3E%3Ctext x='50%25' y='45%25' text-anchor='middle' font-family='serif' font-size='16' fill='%23D4AF37'%3E${encodeURIComponent(product.name)}%3C/text%3E%3Ctext x='50%25' y='60%25' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%23999'%3ELORAH%3C/text%3E%3C/svg%3E`;
          }}
        />
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className="bg-brand-red text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
            {product.badge}
          </span>
        </div>
        <button 
          onClick={toggleFavorite}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm ${
            isFavorited ? 'favorited' : ''
          }`}
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'text-brand-red fill-current' : 'text-matte-400'}`} />
        </button>
      </div>

      <div className="p-3 sm:p-4 lg:p-5">
        <p className="text-[10px] sm:text-xs font-semibold text-brand-red tracking-widest uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-sm sm:text-base lg:text-lg font-semibold text-matte-900 mb-1 sm:mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-matte-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
          {product.desc}
        </p>
        <span className="text-base sm:text-lg lg:text-xl font-bold text-matte-900">
          {product.price}
        </span>
        
        <div className="flex gap-2 mt-3 sm:mt-4">
          <button 
            onClick={() => onOrderClick(product)}
            className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-green-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Order
          </button>
          <button 
            onClick={() => onDetailsClick(product)}
            className="flex items-center justify-center gap-1.5 sm:gap-2 border-2 border-beige-200 text-matte-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:border-brand-red hover:text-brand-red transition-colors"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;