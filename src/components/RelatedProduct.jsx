import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../assets/Data';

export function RelatedProducts({ currentProductId, category }) {
  
  const related = products
    .filter((item) => {
      const itemId = item.id || item._id;
      return String(itemId) !== String(currentProductId) && item.category === category;
    })
    .slice(0, 4);

  const displayProducts = related.length > 0 
    ? related 
    : products.filter(item => String(item.id || item._id) !== String(currentProductId)).slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 font-sans">
      <div className="flex items-center gap-3 mb-5 sm:mb-8">
        <div className="w-4 h-8 bg-[#936A3B] rounded-sm"></div>
        <h2 className="text-lg font-bold tracking-tight text-[#936A3B]">
          Related Item
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {displayProducts.map((product) => {
          const adaptedProduct = {
            ...product,
            image: product.image || (product.images && product.images[0]),
            // Pass the price exactly as it is from the data source
            price: product.price 
          };

          return (
            <ProductCard key={product.id || product._id} product={adaptedProduct} />
          );
        })}
      </div>
    </section>
  );
}

export default RelatedProducts;