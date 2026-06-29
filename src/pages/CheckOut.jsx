import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { ChevronRight, CheckCircle } from 'lucide-react';

const inputClass =
  'w-full bg-slate-50/60 border border-slate-200 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all placeholder-slate-300';

const labelClass = 'block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2';

const Checkout = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addOrder } = useOrders();

  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  React.useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: false }));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!isAuthenticated) { navigate('/login'); return; }

    // Inline validation
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = true;
    if (!formData.streetAddress.trim()) errors.streetAddress = true;
    if (!formData.townCity.trim()) errors.townCity = true;
    if (Object.keys(errors).length) { setFieldErrors(errors); return; }
    if (cart.length === 0) return;

    try {
      setIsProcessing(true);
      addOrder(cart, formData, paymentMethod, subtotal);
      setCart([]);
      setModalMessage(
        `Your order has been placed successfully using ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}.`
      );
      setShowSuccessModal(true);
    } catch {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/my-profile');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-slate-800 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">

        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-8 sm:mb-10 border-b border-slate-100 pb-4 sm:pb-5">
          {[
            { label: 'My Account', path: '/' },
            { label: 'Products', path: '/collection' },
            { label: 'View Cart', path: '/cart' },
          ].map(({ label, path }) => (
            <React.Fragment key={path}>
              <span onClick={() => navigate(path)} className="hover:text-slate-700 cursor-pointer transition-colors">{label}</span>
              <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
            </React.Fragment>
          ))}
          <span className="text-slate-900">Checkout</span>
        </nav>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10 items-start">

          {/* ── LEFT: Billing details ─────────────────────────────────── */}
          <div className="bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Billing Details</h2>

            {/* First Name */}
            <div>
              <label className={labelClass}>
                First Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={`${inputClass} ${fieldErrors.firstName ? 'border-rose-300 focus:border-rose-400' : ''}`}
              />
              {fieldErrors.firstName && (
                <p className="text-xs text-rose-500 mt-1.5 font-medium">First name is required.</p>
              )}
            </div>

            {/* Company (optional) */}
            <div>
              <label className={labelClass}>Company Name <span className="text-slate-300 normal-case tracking-normal font-normal">(optional)</span></label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>

            {/* Street Address */}
            <div className="space-y-2.5">
              <label className={labelClass}>
                Street Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                placeholder="House number and street name"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
                className={`${inputClass} ${fieldErrors.streetAddress ? 'border-rose-300 focus:border-rose-400' : ''}`}
              />
              {fieldErrors.streetAddress && (
                <p className="text-xs text-rose-500 font-medium">Street address is required.</p>
              )}
              <input
                type="text"
                name="apartment"
                placeholder="Apartment, suite, unit, etc. (optional)"
                value={formData.apartment}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>

            {/* Town / City */}
            <div>
              <label className={labelClass}>
                Town / City <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                required
                className={`${inputClass} ${fieldErrors.townCity ? 'border-rose-300 focus:border-rose-400' : ''}`}
              />
              {fieldErrors.townCity && (
                <p className="text-xs text-rose-500 mt-1.5 font-medium">Town / City is required.</p>
              )}
            </div>

            {/* Place order button — shown inside form on mobile only */}
            <div className="lg:hidden pt-2">
              <PlaceOrderBtn isProcessing={isProcessing} disabled={cart.length === 0} />
            </div>
          </div>

          {/* ── RIGHT: Order summary ──────────────────────────────────── */}
          <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-sm space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide">Order Summary</h3>

            {/* Item list */}
            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto -mx-1 px-1">
              {cart.length === 0 ? (
                <p className="text-sm text-slate-400 py-4">No items in cart.</p>
              ) : (
                cart.map((item) => {
                  const uid = item.cartItemId || item.id;
                  const displaySize = item.size || item.selectedSize;
                  const displayColor = item.color || item.selectedColor;
                  const colorName = typeof displayColor === 'object' ? displayColor?.name : displayColor;

                  return (
                    <div key={uid} className="flex items-center gap-3 sm:gap-4 py-3.5 first:pt-0 last:pb-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || item.images?.[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-800 truncate">{item.title}</h4>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="text-xs text-slate-400">Qty: {item.quantity}</span>
                          {displaySize && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200/40 font-bold px-1.5 py-0.5 rounded uppercase">
                              {displaySize}
                            </span>
                          )}
                          {colorName && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200/40 font-bold px-1.5 py-0.5 rounded capitalize">
                              {colorName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-sm font-bold text-slate-900 whitespace-nowrap flex-shrink-0">
                        ₹{item.price * (item.quantity || 1)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pricing rows */}
            <div className="border-t border-slate-100 pt-4 space-y-3 text-sm font-medium">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900 font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="text-emerald-600 text-[10px] bg-emerald-50 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md">Free</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-base font-bold text-slate-900">
                <span>Total</span>
                <span className="text-xl font-black tracking-tight text-[#a47a4c]">₹{subtotal}</span>
              </div>
            </div>

            {/* Payment methods */}
            <div className="space-y-2.5 pt-1">
              {[
                {
                  value: 'bank',
                  label: 'Bank Transfer',
                  badges: [
                    { text: 'VISA', bg: 'bg-blue-600' },
                    { text: 'MC', bg: 'bg-red-500' },
                  ],
                },
                { value: 'cod', label: 'Cash on Delivery', badges: [] },
              ].map(({ value, label, badges }) => (
                <label
                  key={value}
                  className={`flex items-center justify-between border p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all
                    ${paymentMethod === value
                      ? 'border-[#a47a4c] bg-amber-50/30'
                      : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={paymentMethod === value}
                      onChange={() => setPaymentMethod(value)}
                      className="accent-[#a47a4c] w-4 h-4"
                    />
                    <span className="text-sm font-semibold text-slate-800">{label}</span>
                  </div>
                  {badges.length > 0 && (
                    <div className="flex gap-1">
                      {badges.map(b => (
                        <span key={b.text} className={`text-[9px] ${b.bg} text-white px-1.5 py-0.5 rounded font-black tracking-tight`}>
                          {b.text}
                        </span>
                      ))}
                    </div>
                  )}
                </label>
              ))}
            </div>

            {/* Place order — desktop only */}
            <div className="hidden lg:block">
              <PlaceOrderBtn isProcessing={isProcessing} disabled={cart.length === 0} />
            </div>
          </div>

        </form>
      </div>

      {/* ── Success modal ───────────────────────────────────────────────── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative z-10 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 w-full max-w-sm sm:max-w-md p-7 sm:p-10 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 mb-5">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Order Confirmed!</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-7 px-2">{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className="w-full bg-[#a47a4c] hover:bg-[#8e673e] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Go to My Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Shared Place Order button ─────────────────────────────────────────────── */
const PlaceOrderBtn = ({ isProcessing, disabled }) => (
  <button
    type="submit"
    disabled={disabled || isProcessing}
    className="w-full bg-[#a47a4c] hover:bg-[#8e673e] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-xl transition-all shadow-md active:scale-[0.99] cursor-pointer"
  >
    {isProcessing ? 'Processing…' : 'Place Order'}
  </button>
);

export default Checkout;