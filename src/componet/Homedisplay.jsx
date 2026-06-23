import React from 'react';
import { Eye, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import local assets and contexts
import { products } from '../assets/Data.js'; 
import { useWishlist } from '../context/WishlistContext'; 
import { useCart } from '../context/CartContext'; 

export default function HomeDisplay() {
  const navigate = useNavigate();

  // Hook global contexts
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); 

  // Helper function to handle routing
  const handleNavigate = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <section className="w-full bg-white py-16 px-4 md:px-12 lg:px-24">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
          Featured products
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 font-medium">
          What's more, we do it right!
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D4A362] tracking-wide uppercase pt-2">
          High Quality Offset Printing
        </h2>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => {
          // Check if this item is actively favorited
          const isFavorited = isInWishlist(product.id);

          return (
            <div key={product.id} className="flex flex-col group">
              
              {/* Image Container (Clickable on Mobile) */}
              <div 
                onClick={() => handleNavigate(product.id)}
                className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 shadow-sm cursor-pointer"
              >
                
                {/* Product T-Shirt Image */}
                <img 
                  src={product.images?.[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges Layout Layer (Top Left Stack) */}
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.badges.map((badge, idx) => (
                      <span 
                        key={idx} 
                        className={`${badge.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm text-center tracking-wider`}
                      >
                        {badge.text}
                      </span>
                    ))}
                  </div>
                )}

                {/* Interactive Smooth Hover Actions Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3 z-10">
                  
                  {/* Quick Add to Cart Button Implementation (FIXED VARIANT INJECTION) */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Stops main card link redirection

                      // Safe extraction of variant properties defined in Data.js or sensible fallbacks
                      const selectedSize = product.sizes?.[0] || 'S';
                      const selectedColor = product.colors?.[0] || 'olive';

                      // Pass product properties bundled explicitly with chosen variants
                      addToCart({
                        ...product,
                        size: selectedSize,
                        color: selectedColor
                      }, 1); 
                    }}
                    className="p-3 bg-white hover:bg-[#D4A362] text-black hover:text-white rounded-full shadow-md transition-colors duration-200"
                  >
                    <ShoppingCart size={18} />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(product.id);
                    }} 
                    className="p-3 bg-white hover:bg-[#D4A362] text-black hover:text-white rounded-full shadow-md transition-colors duration-200"
                  >
                    <Eye size={18} />
                  </button>
                  
                  {/* Dynamic Toggle Wishlist Action Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      if (isFavorited) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                    className="p-3 bg-white hover:bg-[#D4A362] text-black rounded-full shadow-md transition-all duration-200"
                  >
                    <Heart 
                      size={18} 
                      className={isFavorited ? "fill-red-500 stroke-red-500 text-red-500" : "text-black hover:text-white"} 
                    />
                  </button>
                </div>

              </div>

              {/* Product Meta Title & Price Info */}
              <div className="mt-4 text-center px-2 space-y-1">
                <h4 
                  onClick={() => handleNavigate(product.id)}
                  className="text-xs sm:text-sm font-extrabold text-black uppercase tracking-wide line-clamp-2 min-h-[2.5rem] flex items-center justify-center cursor-pointer hover:text-[#D4A362] transition-colors"
                >
                  {product.title}
                </h4>
                
                <p className="text-sm font-bold text-gray-700">
                  {product.currency || "₹"}{product.price}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
