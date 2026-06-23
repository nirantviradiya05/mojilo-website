import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 
import ConfirmationModal from '../componet/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // States to manage your custom popup modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleQuantityChange = (cartItemId, delta, currentQty) => {
    const targetQty = currentQty + delta;
    if (targetQty <= 0) {
      handleRemoveClick(cartItemId); 
    } else {
      updateQuantity(cartItemId, targetQty);
    }
  };

  const handleRemoveClick = (cartItemId) => {
    setSelectedProductId(cartItemId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductId) {
      removeFromCart(selectedProductId);
      setSelectedProductId(null);
      setIsModalOpen(false);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const total = subtotal - discount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SAVE10') {
      setDiscount(100); 
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid coupon code. Try entering "SAVE10"');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 px-4 py-12 md:px-12 lg:px-16 max-w-7xl mx-auto antialiased">
      <div className="text-slate-400 flex items-center gap-2 text-xs uppercase tracking-wider mb-10 border-b border-slate-100 pb-5">
        <span onClick={() => navigate('/')} className="hover:text-slate-600 cursor-pointer transition-colors">Home</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-semibold">Shopping Cart</span>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center shadow-xs">
          <p className="text-slate-400 text-base mb-6">Your shopping cart looks empty.</p>
          <button onClick={() => navigate('/')} className="bg-[#a47a4c] hover:bg-[#8e673e] text-white font-medium text-sm px-8 py-3 rounded-xl transition-all shadow-md cursor-pointer">
            Return To Shop
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1fr] bg-white border border-slate-100 rounded-xl px-8 py-4 shadow-xs text-xs font-bold uppercase tracking-wider text-slate-400">
              <div>Product Details</div>
              <div>Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Subtotal</div>
            </div>

            <div className="space-y-3">
              {cart.map((item) => {
                const uniqueItemId = item.cartItemId || item.id;

                const displaySize = item.selectedSize || item.size;
                const colorObj = item.selectedColor || item.color;
                const displayColorName = typeof colorObj === 'object' ? colorObj.name : colorObj;

                return (
                  <div key={uniqueItemId} className="grid grid-cols-1 md:grid-cols-[2.5fr_1fr_1fr_1fr] items-center bg-white border border-slate-100 hover:border-slate-200/80 rounded-xl p-5 md:px-8 shadow-xs hover:shadow-sm transition-all gap-4 md:gap-0 relative group">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 flex-shrink-0 relative">
                        <img src={item.image || (item.images && item.images[0])} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-slate-900 text-base leading-tight">{item.title}</h4>
                        
                        <div className="flex flex-wrap gap-2 pt-0.5">
                          {displaySize && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase border border-slate-200/30">
                              Size: {displaySize}
                            </span>
                          )}
                          
                          {displayColorName && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold capitalize border border-slate-200/30">
                              Color: {displayColorName}
                            </span>
                          )}
                        </div>
                        
                        <button onClick={() => handleRemoveClick(uniqueItemId)} className="text-xs text-rose-500 hover:text-rose-600 font-medium md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pt-1 cursor-pointer">
                          Remove item
                        </button>
                      </div>
                    </div>

                    <div className="text-sm font-medium text-slate-600 flex md:block justify-between items-center">
                      <span className="md:hidden text-xs text-slate-400 font-bold uppercase tracking-wider">Price</span>
                      <span className="text-slate-900">₹{item.price}</span>
                    </div>

                    <div className="flex md:block justify-between items-center">
                      <span className="md:hidden text-xs text-slate-400 font-bold uppercase tracking-wider">Quantity</span>
                      <div className="flex items-center justify-between border border-slate-200 rounded-xl bg-white w-28 px-1.5 py-1 mx-auto md:mx-0">
                        <button type="button" onClick={() => handleQuantityChange(uniqueItemId, -1, item.quantity)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-base cursor-pointer">
                          −
                        </button>
                        <span className="text-sm font-bold text-slate-800 tabular-nums">
                          {String(item.quantity).padStart(2, '0')}
                        </span>
                        <button type="button" onClick={() => handleQuantityChange(uniqueItemId, 1, item.quantity)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-base cursor-pointer">
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-sm font-bold text-slate-900 text-left md:text-right flex md:block justify-between items-center border-t border-slate-50 md:border-none pt-3 md:pt-0">
                      <span className="md:hidden text-xs text-slate-400 font-bold uppercase tracking-wider">Subtotal</span>
                      <span className="text-slate-900 font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button onClick={() => navigate('/')} className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm px-8 py-3.5 rounded-xl transition-all shadow-xs cursor-pointer">
              Return To Shop
            </button>
            <button onClick={() => alert('Cart metrics synchronized.')} className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm px-8 py-3.5 rounded-xl transition-all shadow-xs cursor-pointer">
              Update Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 pt-8 items-start">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
              <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Have a coupon code?</h5>
              <p className="text-xs text-slate-400 mb-4">Apply code during this step to claim deals.</p>
              <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row items-stretch gap-2">
                <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-grow bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all" />
                <button type="submit" className="bg-[#a47a4c] hover:bg-[#8e673e] text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors shadow-sm whitespace-nowrap cursor-pointer">
                  Apply Coupon
                </button>
              </form>
            </div>

            <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl p-6 md:p-8">
              <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-4 mb-5">Cart Total</h3>
              
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Subtotal:</span>
                  <span className="text-slate-900 font-semibold">₹{subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/40">
                    <span className="text-xs uppercase tracking-wider font-bold">Coupon Savings:</span>
                    <span className="font-bold">-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-slate-500">
                  <span>Shipping:</span>
                  <span className="text-slate-900 text-[10px] bg-slate-100 font-bold uppercase tracking-widest px-3 py-1 rounded-full">Free</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-lg font-bold text-slate-900">
                  <span>Order Total:</span>
                  <span className="text-xl font-bold tracking-tight">₹{total}</span>
                </div>
              </div>

              <button onClick={() => navigate('/checkout')} className="w-full mt-8 bg-[#a47a4c] hover:bg-[#8e673e] text-white font-semibold text-sm py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDelete} 
        title="Are you sure you want to remove this item?" 
        confirmText="Yes, Remove" 
        cancelText="Keep Item" 
      />
    </div>
  );
};

export default CartPage;