import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('mojilo_orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Failed to parse orders from localStorage:', error);
      return [];
    }
  });

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('mojilo_orders', JSON.stringify(orders));
  }, [orders]);

  // Get orders for the current user
  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter(order => order.userId === user.id);
  };

  // Add new order
  const addOrder = (orderItems, shippingDetails, paymentMethod, total) => {
    if (!user) {
      throw new Error('User must be logged in to place an order');
    }

    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `#${Math.floor(10000 + Math.random() * 90000)}`,
      userId: user.id,
      items: orderItems,
      shippingDetails,
      paymentMethod,
      total,
      status: 'Processing',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <OrdersContext.Provider value={{ orders, getUserOrders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
