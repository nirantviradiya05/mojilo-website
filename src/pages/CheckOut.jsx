import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';

const Checkout = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addOrder } = useOrders();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'bank'
  const [isProcessing, setIsProcessing] = useState(false);
  
  // NEW: State for Custom Popup Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const total = subtotal; 

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!formData.firstName || !formData.streetAddress || !formData.townCity) {
      alert('Please fill out all required fields (*)'); // Can also be converted to custom popups later
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Add order
      addOrder(cart, formData, paymentMethod, total);
      
      // Clear cart
      setCart([]);
      
      // NEW: Set the message and trigger the custom popup modal instead of alert()
      setModalMessage(`Your order has been placed successfully using ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}.`);
      setShowSuccessModal(true);
      
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // NEW: Handles redirecting after the user closes the custom success modal
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/my-profile');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-slate-800 px-4 py-12 md:px-12 lg:px-16 max-w-7xl mx-auto antialiased">
      <div className="text-slate-400 flex items-center gap-2 text-xs uppercase tracking-wider mb-10 border-b border-slate-100 pb-5">
        <span onClick={() => navigate('/')} className="hover:text-slate-600 cursor-pointer transition-colors">MY ACCOUNT</span>
        <span className="text-slate-300">/</span>
        <span onClick={() => navigate('/collection')} className="hover:text-slate-600 cursor-pointer transition-colors">PRODUCT</span>
        <span className="text-slate-300">/</span>
        <span onClick={() => navigate('/cart')} className="hover:text-slate-600 cursor-pointer transition-colors">VIEW CART</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-semibold">CHECKOUT</span>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
        
        {/* LEFT COLUMN: Billing Details */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Billing Details</h2>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">First Name <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-50/60 border border-slate-200 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Company Name (Optional)</label>
            <input 
              type="text" 
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full bg-slate-50/60 border border-slate-200 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Street Address <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="streetAddress"
              placeholder="House number and street name"
              value={formData.streetAddress}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-50/60 border border-slate-200 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all" 
            />
            <input 
              type="text" 
              name="apartment"
              placeholder="Apartment, suite, unit, etc. (optional)"
              value={formData.apartment}
              onChange={handleInputChange}
              className="w-full bg-slate-50/60 border border-slate-200 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Town / City <span className="text-rose-500">*</span></label>
            <input 
              type="text" 
              name="townCity"
              value={formData.townCity}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-50/60 border border-slate-200 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all" 
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 tracking-wide">Order Summary</h3>
          
          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <p className="text-sm text-slate-400 py-4">No items configuration loaded.</p>
            ) : (
              cart.map((item) => {
                const uniqueItemId = item.cartItemId || item.id;
                
                const displaySize = item.size || item.selectedSize;
                const displayColor = item.color || item.selectedColor;

                return (
                  <div key={uniqueItemId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 flex-shrink-0">
                      <img 
                        src={item.image || (item.images && item.images[0])} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-800 truncate mb-0.5">{item.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400 mr-1">Quantity: {item.quantity}</span>
                        
                        {displaySize && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200/40 font-bold px-1.5 py-0.5 rounded uppercase">
                            Size: {displaySize}
                          </span>
                        )}

                        {displayColor && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200/40 font-bold px-1.5 py-0.5 rounded capitalize">
                            Color: {typeof displayColor === 'object' ? displayColor.name : displayColor}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm font-bold text-slate-900 whitespace-nowrap">
                      ₹{item.price * (item.quantity || 1)}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pricing Subtotals Layout */}
          <div className="border-t border-slate-100 pt-4 space-y-3 font-medium text-sm">
            <div className="flex justify-between items-center text-slate-500">
              <span>Subtotal:</span>
              <span className="text-slate-900 font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Shipping:</span>
              <span className="text-emerald-600 text-[10px] bg-emerald-50 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md">Free</span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-base font-bold text-slate-900">
              <span>Total Amount:</span>
              <span className="text-xl font-black tracking-tight text-[#a47a4c]">₹{total}</span>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="space-y-3 pt-2">
            <label className={`flex items-center justify-between border p-4 rounded-xl cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-[#a47a4c] bg-amber-50/10' : 'border-slate-200 hover:border-slate-300'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="payment" 
                  value="bank" 
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="accent-[#a47a4c]"
                />
                <span className="text-sm font-semibold text-slate-800">Bank Transfer</span>
              </div>
              <div className="flex gap-1">
                <span className="text-[9px] bg-orange-500 text-white px-1.5 py-0.5 rounded font-black tracking-tighter">BKASH</span>
                <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-black tracking-tighter">VISA</span>
                <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded font-black tracking-tighter">MC</span>
              </div>
            </label>

            <label className={`flex items-center justify-between border p-4 rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#a47a4c] bg-amber-50/10' : 'border-slate-200 hover:border-slate-300'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-[#a47a4c]"
                />
                <span className="text-sm font-semibold text-slate-800">Cash on delivery</span>
              </div>
            </label>
          </div>

          {/* Place Order Trigger */}
          <button 
            type="submit" 
            disabled={cart.length === 0 || isProcessing}
            className="w-full bg-[#a47a46] hover:bg-[#8e673e] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-xl transition-all shadow-md active:scale-[0.99]"
          >
            {isProcessing ? 'Processing Order...' : 'Place Order'}
          </button>
        </div>

      </form>

      {/* NEW: Custom Success Popup Modal Design */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Animated Backdrop Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn" />
          
          {/* Modal Content Container */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-8 relative z-10 text-center transform scale-100 transition-all duration-300 animate-scaleUp">
            
            {/* Animated Checkmark Circle */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-6 border border-emerald-100">
              <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Typography Headers */}
            <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Order Confirmed!</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 px-2">
              {modalMessage}
            </p>

            {/* View Profile/Orders Redirect Trigger */}
            <button
              onClick={handleCloseModal}
              className="w-full bg-[#a47a46] hover:bg-[#8e673e] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Go to My Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;