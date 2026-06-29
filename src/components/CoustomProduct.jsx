import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

import { products } from '../assets/Data';

export function ProductGrid() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 font-sans">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6 sm:mb-8">
        <h2 className="text-base sm:text-xl font-bold tracking-tight text-gray-900">
          Explore Our Designs
        </h2>
        <button
          onClick={() => navigate('/collection')}
          className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold
                     text-gray-700 bg-gray-50 border border-gray-200
                     px-3 py-1.5 sm:px-4 sm:py-2 rounded-md
                     hover:bg-gray-100 active:scale-95
                     transition-all cursor-pointer"
        >
          View All <span>&rarr;</span>
        </button>
      </div>

      {/* Grid: 2 cols on mobile → 3 on md → 4 on lg */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                      gap-x-3 gap-y-6
                      sm:gap-x-5 sm:gap-y-8
                      lg:gap-x-6 lg:gap-y-10">
        {products.map((product) => {
          const adaptedProduct = {
            ...product,
            image: product.image || (product.images && product.images[0]),
            price: typeof product.price === 'number'
              ? product.price.toFixed(2)
              : product.price,
          };

          return (
            <ProductCard key={product.id} product={adaptedProduct} />
          );
        })}
      </div>
    </section>
  );
}

export default ProductGrid;