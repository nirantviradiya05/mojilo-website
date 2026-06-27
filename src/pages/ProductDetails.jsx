import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Plus, Minus, Truck, RotateCcw } from 'lucide-react';

import { products } from '../assets/Data'; 
import RelatedProducts from '../components/RelatedProduct'; 
import { useWishlist } from '../context/WishlistContext'; 
import { useCart } from '../context/CartContext';
import AddToCartSuccessModal from '../components/AddToCartSuccessModal'; 

export default function ProductDetails() {
  const { id } = useParams();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); 

  const product = products.find(p => String(p.id || p._id) === String(id));

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddSuccessModalOpen, setIsAddSuccessModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const isFavorited = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (product) {
      const initialImage = product.image || (product.images && product.images[0]) || '';
      setSelectedImage(initialImage);
      
      const initialColor = product.colors && product.colors[0] 
        ? (typeof product.colors[0] === 'object' ? product.colors[0].id : product.colors[0])
        : '';
      setSelectedColor(initialColor);
      
      setSelectedSize(product.sizes && product.sizes[0] ? product.sizes[0] : '');
      setQuantity(1); 
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold mb-4">Product Not Found</h2>
        <Link to="/collection" className="text-[#936A3B] underline text-sm">
          Return to Collections
        </Link>
      </div>
    );
  }

  const formattedColors = (product.colors || []).map((color) => {
    if (typeof color === 'object') return color;
    return { id: color, name: color, hex: color.toLowerCase() === 'black' ? '#111111' : '#CAB02A' };
  });

  const productImages = product.images || (product.image ? [product.image] : []);

  const handleQuantityChange = (type) => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleWishlistToggle = () => {
    if (isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if ((product.colors && product.colors.length > 0) && !selectedColor) {
      alert('Please select a color variant.');
      return;
    }
    if ((product.sizes && product.sizes.length > 0) && !selectedSize) {
      alert('Please select a size variant.');
      return;
    }

    let colorData = selectedColor;
    if (product.colors && product.colors.length > 0) {
      const foundColor = product.colors.find(c => 
        (typeof c === 'object' && c.id === selectedColor) || c === selectedColor
      );
      if (foundColor) {
        colorData = typeof foundColor === 'object' ? foundColor : { id: foundColor, name: foundColor };
      }
    }

    const colorId = typeof colorData === 'object' ? colorData.id : colorData;
    const variantId = `${product.id}-${colorId}-${selectedSize}`;

    const itemWithVariants = {
      ...product,
      cartItemId: variantId, 
      selectedColor: colorData,
      selectedSize,
      price: product.price 
    };

    addToCart(itemWithVariants, quantity);
    
    setAddedProduct(itemWithVariants);
    setIsAddSuccessModalOpen(true);
  };

  return (
    // FIX: reduced px on mobile (px-3), tighter top padding (py-5)
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8 font-sans text-[#1a1a1a]">

      {/* FIX: smaller breadcrumb text on mobile, tighter mb */}
      <nav className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 mb-4 sm:mb-8">
        <Link to="/collection"><span className="underline cursor-pointer hover:text-black">Our Collections</span></Link>
        <span className="mx-2">/</span>
        {/* FIX: truncate long product titles on mobile */}
        <span className="text-gray-800 font-medium truncate max-w-[160px] inline-block align-bottom">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">

        {/* IMAGE GALLERY */}
        {/* FIX: on mobile use row layout (flex-col-reverse keeps thumbnails below), 
            height auto on mobile, fixed on lg */}
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-3 sm:gap-4 h-auto lg:h-[550px]">

          {/* Thumbnails: horizontal scroll on mobile, vertical on lg */}
          {/* FIX: smaller thumbnail size on mobile (w-16 h-20) */}
          <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 w-full lg:w-24 overflow-x-auto lg:overflow-y-auto py-1 lg:py-0 scrollbar-none">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-20 sm:w-20 sm:h-24 lg:w-full aspect-[3/4] flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                  selectedImage === img ? 'border-black scale-95' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          {/* FIX: on mobile aspect-[3/4] gives a natural tall frame without fixed height */}
          <div className="flex-1 bg-[#d6bc9a] relative overflow-hidden flex items-end justify-center rounded-sm aspect-[3/4] lg:aspect-auto lg:h-full">
            {selectedImage && (
              <img src={selectedImage} alt={product.title} className="w-full h-[90%] object-contain object-bottom mix-blend-multiply drop-shadow-xl" />
            )}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl font-black tracking-widest text-black/20 font-serif">
              {product.brand || "MOJILO"}
            </div>
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="lg:col-span-5 flex flex-col">

          {/* FIX: slightly smaller title on mobile */}
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-black mb-2">{product.title}</h1>

          {/* FIX: wrap stars and meta on small screens */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 sm:mb-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < (product.rating || 5) ? "text-amber-400" : "text-gray-300"}>★</span>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewsCount || 120} Reviews)</span>
            <span className="text-gray-300 mx-1">|</span>
            <span className="text-emerald-500 text-xs font-semibold">In Stock</span>
          </div>

          <div className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            {product.currency || "₹"}{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
          </div>

          <p className="text-xs leading-relaxed text-gray-600 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
            {product.description || "Premium styling composition featuring dynamic alignments built to survive seasonal wardrobe cycles."}
          </p>

          {/* COLOURS */}
          {formattedColors.length > 0 && (
            // FIX: stack label + swatches vertically on very small screens
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <span className="text-sm font-medium min-w-[70px]">Colours:</span>
              <div className="flex gap-3 flex-wrap">
                {formattedColors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColor(color.id)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-5 h-5 rounded-full relative transition-transform cursor-pointer ${
                      selectedColor === color.id ? 'scale-110 ring-1 ring-offset-2 ring-black' : 'hover:scale-105'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SIZES */}
          {product.sizes && product.sizes.length > 0 && (
            // FIX: allow size buttons to wrap on mobile
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <span className="text-sm font-medium min-w-[70px]">Size:</span>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-xs font-medium border rounded transition-all min-w-[32px] cursor-pointer ${
                      selectedSize === size ? 'bg-[#936A3B] border-[#936A3B] text-white' : 'border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY + ADD TO CART + WISHLIST */}
          {/* FIX: on mobile, stack quantity on its own row, then full-width buttons below */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 sm:mb-8">

            {/* Quantity stepper */}
            <div className="flex items-center border border-gray-400 rounded overflow-hidden h-11 w-fit">
              <button type="button" onClick={() => handleQuantityChange('dec')} className="px-3 cursor-pointer h-full hover:bg-gray-100 border-r border-gray-300 transition-colors">
                <Minus size={14} />
              </button>
              <span className="px-5 font-medium text-sm text-center min-w-[45px]">{quantity}</span>
              <button type="button" onClick={() => handleQuantityChange('inc')} className="px-3 cursor-pointer h-full bg-[#936A3B] text-white hover:bg-[#7d5931] transition-colors">
                <Plus size={14} />
              </button>
            </div>

            {/* Add to Cart + Wishlist — full width on mobile */}
            <div className="flex items-center gap-3 flex-1">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 cursor-pointer bg-[#936A3B] text-white font-medium text-sm h-11 rounded hover:bg-[#7d5931] transition-colors tracking-wide"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleWishlistToggle}
                className={`p-3 border rounded h-11 w-11 flex items-center cursor-pointer justify-center transition-colors flex-shrink-0 ${isFavorited ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-400 text-gray-700 hover:border-black'}`}
              >
                <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* DELIVERY INFO */}
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <div className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4 border-b border-gray-300">
              <Truck className="text-gray-800 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-0.5">Free Delivery</h4>
                <p className="text-[11px] underline text-gray-800 font-medium cursor-pointer hover:text-black">Enter postal code for Availability</p>
              </div>
            </div>
            <div className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
              <RotateCcw className="text-gray-800 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-0.5">Return Delivery</h4>
                <p className="text-[11px] text-gray-600">Free 30 Days Returns. <span className="underline font-medium text-gray-800 cursor-pointer hover:text-black">Details</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts currentProductId={id} category={product.category} subCategory={product.subCategory} />
      
      {addedProduct && (
        <AddToCartSuccessModal 
          isOpen={isAddSuccessModalOpen}
          onClose={() => {
            setIsAddSuccessModalOpen(false);
            setTimeout(() => setAddedProduct(null), 300);
          }}
          product={addedProduct}
          quantity={quantity}
        />
      )}
    </div>
  );
}