import React from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onOrderClick, onDetailsClick, isLoading }) => {
  if (isLoading && products.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card">
            <div className="skeleton aspect-[4/5]"></div>
            <div className="p-4 space-y-3">
              <div className="skeleton h-3 w-16 rounded"></div>
              <div className="skeleton h-4 w-3/4 rounded"></div>
              <div className="skeleton h-3 w-full rounded"></div>
              <div className="skeleton h-5 w-20 rounded"></div>
              <div className="flex gap-2">
                <div className="skeleton h-9 flex-1 rounded-xl"></div>
                <div className="skeleton h-9 w-12 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 sm:py-24">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 sm:w-10 sm:h-10 text-champagne-300" />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-matte-900 mb-2">No handbags found</h3>
        <p className="text-matte-500 text-sm sm:text-base max-w-md mx-auto">
          Try adjusting your search or browse a different category. We have 50+ bags waiting for you!
        </p>
      </div>
    );
  }

  return (
    <div
      id="productGrid"
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
    >
      {products.map((product, index) => (
        <div key={product.id} style={{ animationDelay: `${(index % 8) * 0.06}s` }}>
          <ProductCard
            product={product}
            onOrderClick={onOrderClick}
            onDetailsClick={onDetailsClick}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;