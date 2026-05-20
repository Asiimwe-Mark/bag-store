import React from 'react';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import { formatPrice } from '../data/products';

const ProductCard = ({ product, onOrderClick, onDetailsClick }) => {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [justFavorited, setJustFavorited] = React.useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      setJustFavorited(true);
      setTimeout(() => setJustFavorited(false), 400);
    }
  };

  return (
    <div className="product-card product-card-3d card-shimmer group bg-white rounded-2xl overflow-hidden shadow-card product-enter">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-champagne-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative overflow-hidden aspect-[4/5] bg-beige-50 img-zoom-container">
        <img
          src={Array.isArray(product.images) ? product.images[0] : product.image}
          alt={product.name}
          className="product-img w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23F5EDE0' width='400' height='400'/%3E%3Ctext x='50%25' y='45%25' text-anchor='middle' font-family='serif' font-size='16' fill='%23D4AF37'%3E${encodeURIComponent(product.name)}%3C/text%3E%3Ctext x='50%25' y='60%25' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%23999'%3ELORAH%3C/text%3E%3C/svg%3E`;
          }}
        />
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className="bg-brand-red text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full badge-pulse">
            {product.badge}
          </span>
        </div>
        <button
          onClick={toggleFavorite}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm ${
            isFavorited ? 'text-brand-red' : 'text-matte-400'
          }`}
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${
              isFavorited ? 'fill-current' : ''
            } ${justFavorited ? 'heart-bounce' : ''}`}
          />
        </button>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
        <p className="text-[10px] sm:text-xs font-medium text-champagne-300 tracking-widest uppercase">{product.brand}</p>
        <h3 className="font-serif font-bold text-matte-900 text-xs sm:text-sm leading-tight line-clamp-2">{product.name}</h3>
        <p className="text-matte-500 text-[10px] sm:text-xs leading-relaxed line-clamp-2">{product.description}</p>
        <p className="font-bold text-brand-red text-sm sm:text-base">{formatPrice(product.price)}</p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onOrderClick(product)}
            className="magnetic-btn flex-1 flex items-center justify-center gap-1.5 bg-brand-red text-white py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Order
          </button>
          <button
            onClick={() => onDetailsClick(product)}
            className="flex items-center justify-center w-10 sm:w-11 bg-beige-50 text-matte-700 py-2 sm:py-2.5 rounded-xl hover:bg-champagne-100 transition-colors"
            aria-label="View details"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
