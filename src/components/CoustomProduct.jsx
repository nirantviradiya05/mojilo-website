import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard'; 

// Import dynamic data from your asset file
import { products } from '../assets/Data'; 

export function ProductGrid() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 font-sans">
      {/* Header Layout */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-8">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Explore Our Designs
        </h2>
        <button 
          onClick={() => navigate('/collection')} 
          className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        >
          View All 
          <span>&rarr;</span>
        </button>
      </div>

      {/* Grid Container matching your core responsive structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => {
          // Flatten standard image structures cleanly
          const adaptedProduct = {
            ...product,
            image: product.image || (product.images && product.images[0]),
            
            /* BUG FIX: Pass raw text/numbers without appending '₹' here.
              If product.price is already a string like "₹192.00" inside Data.js, 
              we pass it directly. If it's a number, we pass the clean numeric format string.
            */
            price: typeof product.price === 'number' ? product.price.toFixed(2) : product.price
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