import React, { useState } from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import AddToCartSuccessModal from './AddToCartSuccessModal';

export function ProductCard({ product, isWishlistItem }) {
  const navigate = useNavigate();
  
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isFavorited = isInWishlist(product.id);
  const [isAddSuccessModalOpen, setIsAddSuccessModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const displayImage = Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0] 
    : product.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600';

  const displayTitle = product.title || product.name || 'Untitled Product';
  const displayPrice = product.price ? `${product.currency || '₹'}${product.price}` : 'Price N/A';

  const handleNavigateToDetails = () => {
    navigate(`/product-details/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isWishlistItem || isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    const defaultColorObj = product.colors && product.colors.length > 0 
      ? (typeof product.colors[0] === 'object' ? product.colors[0] : { id: product.colors[0], name: product.colors[0] })
      : '';
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : '';
    
    const colorId = typeof defaultColorObj === 'object' ? defaultColorObj.id : defaultColorObj;
    const cartItemId = `${product.id}-${colorId}-${defaultSize}`;
    
    const itemToAdd = {
      ...product,
      cartItemId,
      selectedColor: defaultColorObj,
      selectedSize: defaultSize
    };
    
    addToCart(itemToAdd, 1);
    
    // Show success modal
    setAddedProduct(itemToAdd);
    setIsAddSuccessModalOpen(true);
  };

  return (
    <div 
      onClick={handleNavigateToDetails} 
      className="w-full bg-white font-sans select-none group cursor-pointer"
    >
      <div className="relative aspect-[3/4] w-full bg-[#F9F9FA] overflow-hidden rounded-xl">
        
        {(product.tag || product.subCategory) && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#A47A46] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
              {product.tag || product.subCategory}
            </span>
          </div>
        )}

        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform"
        >
          {isWishlistItem ? (
            <Trash2 size={15} className="text-gray-700 hover:text-red-500 transition-colors" />
          ) : (
            <Heart
              size={15}
              className={
                isFavorited
                  ? 'fill-red-500 stroke-red-500 transition-all duration-20'
                  : 'text-gray-700 hover:text-red-500 transition-colors'
              }
            />
          )}
        </button>

        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black hover:bg-[#A47A46] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      <div className="pt-3.5 pb-1 px-0.5 flex items-start justify-between">
        <div className="flex flex-col space-y-1 max-w-[80%]">
          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
            {product.brand || 'MOJILO'}
          </span>

          <h3 className="text-gray-900 font-medium text-[15px] tracking-tight group-hover:text-[#A47A46] transition-colors duration-200 line-clamp-1">
            {displayTitle}
          </h3>

          <p className="text-black font-extrabold text-[16px] tracking-tight pt-0.5">
            {displayPrice}
          </p>
        </div>

        <button 
          onClick={handleAddToCart}
          className="md:hidden w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center transition-transform active:scale-90"
        >
          <ShoppingBag size={14} />
        </button>
      </div>
      
      {/* Add to Cart Success Modal */}
      {addedProduct && (
        <AddToCartSuccessModal 
          isOpen={isAddSuccessModalOpen}
          onClose={() => {
            setIsAddSuccessModalOpen(false);
            setTimeout(() => setAddedProduct(null), 300);
          }}
          product={addedProduct}
          quantity={1}
        />
      )}
    </div>
  );
}

export default ProductCard;
