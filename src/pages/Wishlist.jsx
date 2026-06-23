import React, { useState } from 'react';
import ProductCard from '../componet/ProductCard'; 
import { useWishlist } from '../context/WishlistContext'; 
import { useCart } from '../context/CartContext'; 
import { products } from '../assets/Data'; 
import ConfirmationModal from '../componet/ConfirmationModal'; // Adjust path if needed

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Modal State Management Variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState({ type: null, id: null });

  const justForYouProducts = products.slice(-4);

  // Trigger Modal Configuration for Single Item Deletion
  const handleRequestRemoveItem = (id) => {
    setModalTarget({ type: 'SINGLE_REMOVE', id });
    setIsModalOpen(true);
  };

  // Move everything from Wishlist over to Cart Context Global Storage
  const handleMoveAllToBag = () => {
    if (wishlist.length === 0) return;
    
    wishlist.forEach((product) => {
      const defaultSize = product.sizes?.[0] || 'S';
      const defaultColorObj = product.colors?.[0] || 'olive';
      
      // Normalize color to object format
      const colorObj = typeof defaultColorObj === 'object' 
        ? defaultColorObj 
        : { id: defaultColorObj, name: defaultColorObj };
      
      // Generate consistent cartItemId
      const colorId = typeof colorObj === 'object' ? colorObj.id : colorObj;
      const cartItemId = `${product.id}-${colorId}-${defaultSize}`;
      
      addToCart({
        ...product,
        cartItemId,
        selectedSize: defaultSize,
        selectedColor: colorObj
      }, 1);
    });
    
    clearWishlist();
  };

  // Single card explicit click configuration routing handler
  const handleAddToCartSingle = (product) => {
    addToCart(product, 1);
  };

  // Central Router Core Execution Handler inside the confirmation block
  const handleConfirmAction = () => {
    if (modalTarget.type === 'SINGLE_REMOVE' && modalTarget.id) {
      removeFromWishlist(modalTarget.id);
    }
    // Reset target context parameters safely
    setModalTarget({ type: null, id: null });
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 py-10 md:px-16 max-w-7xl mx-auto font-sans">
      
      {/* ================= WISHLIST SECTION ================= */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-normal tracking-wide text-black">
            Wishlist ({wishlist.length})
          </h2>
          {wishlist.length > 0 && (
            <button 
              onClick={handleMoveAllToBag}
              className="border border-gray-300 hover:border-black text-sm px-6 py-3 rounded-sm transition font-medium text-black cursor-pointer"
            >
              Move All To Bag
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center text-gray-400 py-16 border border-dashed rounded-md">
            Your wishlist is currently empty. Like items on the shop to see them here!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {wishlist.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isWishlistItem={true}
                onRemove={handleRequestRemoveItem} // Intercepting layout routing with our modal process
                onAddToCart={handleAddToCartSingle} 
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= JUST FOR YOU SECTION ================= */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <span className="w-5 h-9 bg-[#8b5a2b] rounded-sm block"></span>
            <h2 className="text-lg font-medium tracking-wide text-black">
              Just For You
            </h2>
          </div>
          <button className="border border-gray-300 hover:border-black text-sm px-8 py-3 rounded-sm transition font-medium text-black cursor-pointer">
            See All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {justForYouProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isWishlistItem={false}
              onAddToCart={handleAddToCartSingle} 
            />
          ))}
        </div>
      </section>

      {/* RENDER MODAL ROOT INTERACTIVE FRAMEWORK */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        title="Are you sure you want to remove this item from your wishlist?"
        confirmText="Yes, Remove"
        cancelText="Keep Item"
      />

    </div>
  );
};

export default WishlistPage;