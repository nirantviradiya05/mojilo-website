import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state cleanly from localStorage on application layout boot
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('mojilo_shopping_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart data from localStorage:", error);
      return [];
    }
  });

  // Calculate cart count automatically
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Sync state modifications to localStorage continuously
    localStorage.setItem('mojilo_shopping_cart', JSON.stringify(cart));
    
    // Update cart count
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(count);
  }, [cart]);

  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      // Find existing item using cartItemId
      const existingItemIndex = prevCart.findIndex(
        (item) => {
          // If both items have cartItemId, use that for comparison
          if (item.cartItemId && product.cartItemId) {
            return item.cartItemId === product.cartItemId;
          }
          // Fallback to product.id if cartItemId is not available
          return item.id === product.id;
        }
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        return prevCart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: (item.quantity || 0) + quantityToAdd
            };
          }
          return item;
        });
      }

      // Ensure the product has a cartItemId if it doesn't already
      const productToAdd = product.cartItemId 
        ? { ...product, quantity: quantityToAdd }
        : { ...product, cartItemId: product.id, quantity: quantityToAdd };

      return [...prevCart, productToAdd];
    });
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        return prevCart.filter((item) => (item.cartItemId || item.id) !== cartItemId);
      }
      
      return prevCart.map((item) =>
        (item.cartItemId || item.id) === cartItemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Explicitly looks for item.cartItemId and filters out the matching structural variant line
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => (item.cartItemId || item.id) !== cartItemId));
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, updateQuantity, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
