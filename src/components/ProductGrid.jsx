import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onOrderClick, onDetailsClick }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-12 sm:w-16 sm:h-16 text-beige-200 mx-auto mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-matte-600 text-base sm:text-lg">No handbags found.</p>
        <p className="text-matte-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div 
      id="productGrid" 
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onOrderClick={onOrderClick}
          onDetailsClick={onDetailsClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;