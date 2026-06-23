import React, { useEffect } from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddToCartSuccessModal = ({ isOpen, onClose, product, quantity = 1 }) => {
  const navigate = useNavigate();

  // Auto-close modal after 3 seconds if not manually closed
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Get product image
  const productImage = Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0] 
    : product.image || '';

  // Get color display
  const getColorDisplay = () => {
    if (typeof product.selectedColor === 'object') {
      return product.selectedColor.name || product.selectedColor.id;
    }
    return product.selectedColor || '';
  };

  // Get size display
  const getSizeDisplay = () => {
    return product.selectedSize || '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
      {/* Main Success Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Success Icon */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6">
          <div className="w-16 h-16 bg-[#A47A46]/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-[#A47A46]" />
          </div>
          
          <h3 className="text-xl font-extrabold text-black mb-2">Added to Cart!</h3>
          <p className="text-gray-500 text-sm text-center">
            {quantity} {quantity === 1 ? 'item' : 'items'} successfully added
          </p>
        </div>

        {/* Product Preview */}
        <div className="flex items-center gap-4 px-6 pb-6 border-b border-gray-100">
          {productImage && (
            <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
              <img 
                src={productImage} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-black line-clamp-2">{product.title}</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {getSizeDisplay() && (
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-bold uppercase">
                  Size: {getSizeDisplay()}
                </span>
              )}
              {getColorDisplay() && (
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-bold capitalize">
                  Color: {getColorDisplay()}
                </span>
              )}
              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-bold">
                Qty: {quantity}
              </span>
            </div>
            <p className="text-base font-extrabold text-black mt-2">
              {product.currency || '₹'}{product.price}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-6 py-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm py-3.5 rounded-full transition-all cursor-pointer"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/my-cart');
            }}
            className="flex-1 bg-[#A47A46] hover:bg-[#8e673e] text-white font-bold text-sm py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={16} />
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSuccessModal;
