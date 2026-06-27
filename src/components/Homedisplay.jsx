import React, { useRef, useEffect, useState } from 'react';
import { Eye, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../assets/Data.js';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

// Helper hook for scroll animations
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function ProductCard({ product, index }) {
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [ref, visible] = useReveal();
  const [wishlistPop, setWishlistPop] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const handleNavigate = () => navigate(`/product-details/${product.id}`);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      setWishlistPop(true);
      setTimeout(() => setWishlistPop(false), 600);
    }
  };

  return (
    <div
      ref={ref}
      className="flex flex-col group w-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`,
      }}
    >
      {/* Image Container: Aspect ratio adjusted for larger screens */}
      <div
        onClick={handleNavigate}
        className="relative w-full aspect-[4/5] xl:aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer
                   shadow-sm hover:shadow-xl transition-all duration-500"
      >
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        {product.badges?.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.badges.map((badge, idx) => (
              <span key={idx} className={`${badge.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider`}>
                {badge.text}
              </span>
            ))}
          </div>
        )}

        {/* Desktop Hover Actions */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center gap-3 z-10 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[
            { icon: <ShoppingCart size={20} />, label: 'Cart', onClick: () => addToCart({ ...product, size: 'S', color: 'olive' }, 1) },
            { icon: <Eye size={20} />, label: 'View', onClick: handleNavigate },
            { icon: <Heart size={20} className={isFavorited ? 'fill-red-500 stroke-red-500' : ''} />, label: 'Wish', onClick: handleWishlist },
          ].map((action, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); action.onClick(e); }}
              className="p-3 bg-white hover:bg-[#D4A362] text-black hover:text-white rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {action.icon}
            </button>
          ))}
        </div>

        {/* Mobile Quick Actions */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 md:hidden z-10">
          <button onClick={(e) => { e.stopPropagation(); addToCart({ ...product, size: 'S', color: 'olive' }, 1); }} className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow"><ShoppingCart size={16} /></button>
          <button onClick={handleWishlist} className="p-2.5 bg-white/90 backdrop-blur rounded-full shadow"><Heart size={16} className={isFavorited ? 'fill-red-500 stroke-red-500' : ''} /></button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 text-center px-2 space-y-1">
        <h4 onClick={handleNavigate} className="text-xs md:text-sm font-bold text-black uppercase tracking-wide cursor-pointer hover:text-[#D4A362] transition-colors line-clamp-2">
          {product.title}
        </h4>
        <p className="text-sm md:text-base font-extrabold text-gray-700">
          {product.currency || '₹'}{product.price}
        </p>
      </div>
    </div>
  );
}

export default function HomeDisplay() {
  const [headerRef, headerVisible] = useReveal();

  return (
    <section className="w-full bg-white py-16 px-4 md:px-10 lg:px-20 xl:px-32">
      <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 space-y-2" style={{ opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s' }}>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">What's more, we do it right!</p>
        <h3 className="text-xl font-bold text-black">Featured products</h3>
        <h2 className="text-3xl md:text-5xl font-black text-[#D4A362] uppercase tracking-wide">High Quality Printing</h2>
      </div>

      {/* Responsive Grid: Changes columns based on screen size */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}