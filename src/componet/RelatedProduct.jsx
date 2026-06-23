import React from 'react';
import ProductCard from '../componet/ProductCard'; // Adjust path if it's '../componet/ProductCard'
import { products } from '../assets/Data'; // Adjust path if it's '../assets/Data'

export function RelatedProducts({ currentProductId, category }) {
  
  // 1. Filter data.js to find items in the same category, excluding the current active product
  const related = products
    .filter((item) => {
      const itemId = item.id || item._id;
      // Match by main category (e.g., Man, Woman, Sports) or subCategory if you prefer tighter relations
      return String(itemId) !== String(currentProductId) && item.category === category;
    })
    .slice(0, 4); // Limit display to a clean row of 4 items

  // Fallback: If there aren't enough items in the specific category, pull general items instead
  const displayProducts = related.length > 0 
    ? related 
    : products.filter(item => String(item.id || item._id) !== String(currentProductId)).slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 font-sans">
      {/* Visual Header matching your design */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-4 h-8 bg-[#936A3B] rounded-sm"></div>
        <h2 className="text-lg font-bold tracking-tight text-[#936A3B]">
          Related Item
        </h2>
      </div>

      {/* Grid Container matching a clean 4-column desktop layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => {
          // Re-map structural fields safely so ProductCard remains happy
          const adaptedProduct = {
            ...product,
            image: product.image || (product.images && product.images[0]),
            price: typeof product.price === 'number' ? `₹ ${product.price.toFixed(2)}` : product.price
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