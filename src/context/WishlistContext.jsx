import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Context
const WishlistContext = createContext();

// Storage helper key
const STORAGE_KEY = 'app_wishlist';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // 1. Initial hydration and listener for cross-tab sync
  useEffect(() => {
    const loadWishlist = () => {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        setWishlist(JSON.parse(savedItems));
      } else {
        // Fallback placeholder mock items if storage is empty
        const initialMock = Array.from({ length: 4 }, (_, i) => ({
          id: i + 1,
          name: 'T-shirt',
          originalPrice: 160,
          currentPrice: 120,
          discount: 40,
          rating: 5,
          reviews: 88,
          image: 'https://i.ibb.co/6wXG56q/tshirt.png',
        }));
        setWishlist(initialMock);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMock));
      }
    };

    loadWishlist();

    // Sync with changes made in other tabs/windows
    window.addEventListener('storage', loadWishlist);
    return () => window.removeEventListener('storage', loadWishlist);
  }, []);

  // Helper function to update state and storage simultaneously
  const updateWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newWishlist));
  };

  // 2. Feature Action: Add item to wishlist
  const addToWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (!exists) {
      const updated = [...wishlist, product];
      updateWishlist(updated);
    }
  };

  // 3. Feature Action: Remove item from wishlist
  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    updateWishlist(updated);
  };

  // 4. Feature Action: Clear whole wishlist
  const clearWishlist = () => {
    updateWishlist([]);
  };

  // 5. Utility: Check if a specific item is already wishlisted (Great for your product detail pages!)
  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom Hook for seamless consumption in your components
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};