import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Star, ShoppingBag, Menu, X, ArrowRight, LogOut } from 'lucide-react';
import logo from '../assets/logo.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const { wishlist } = useWishlist(); 
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'New Offers', href: '/new-offers' },
    { name: 'Man', href: '/collection?Category=Man' },
    { name: 'Woman', href: '/collection?Category=Woman' },
    { name: 'Sports', href: '/collection?Category=Sports' },
    { name: 'Custom', href: '/custom' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  const categories = [
    { name: 'Man', href: '/collection?Category=Man' },
    { name: 'Woman', href: '/collection?Category=Woman' },
    { name: 'Sports', href: '/collection?Category=Sports' }
  ];

  const subCategories = ['T-Shirts', 'Oversized T-Shirts', 'Hoodies', 'Sweatshirts', 'Jerseys', 'Long Sleeve T-Shirts'];

  // Auto-focus input field when search modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Sync active tab state with pathnames AND query parameters
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    const searchParams = new URLSearchParams(window.location.search);
    const categoryValue = searchParams.get('Category');

    const matchingLink = navLinks.find((link) => {
      if (link.href.startsWith('#')) {
        return link.href === currentHash;
      }

      if (link.href.includes('Category=')) {
        const linkUrl = new URL(link.href, window.location.origin);
        return (
          linkUrl.pathname === currentPath &&
          linkUrl.searchParams.get('Category') === categoryValue
        );
      }

      return link.href === currentPath;
    });

    if (matchingLink) {
      setActiveTab(matchingLink.name);
    } else if (currentPath === '/') {
      setActiveTab('Home');
    }
  }, [window.location.search, window.location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearchOpen(false);
    navigate(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  };

  const handleCategoryClick = (href) => {
    setIsSearchOpen(false);
    navigate(href);
    setSearchQuery('');
  };

  const handleSubCategoryClick = (subCategory) => {
    setIsSearchOpen(false);
    navigate(`/collection?SubCategory=${encodeURIComponent(subCategory)}`);
    setSearchQuery('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full font-sans select-none relative z-50 bg-white">
      {/* Top Banner */}
      <div className="bg-[#A47A46] text-white text-center py-2 text-[10px] sm:text-[11px] font-medium tracking-widest uppercase px-4 truncate">
        Express Yourself in Every Outfit
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between lg:grid lg:grid-cols-3 relative">
        
        {/* LEFT: Menu Toggle & Desktop Nav Links */}
        <div className="flex items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-gray-700 hover:text-[#A47A46] p-1 -ml-1 cursor-pointer transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[14px] font-semibold text-gray-900">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => {
                  setActiveTab(link.name);
                  setIsMenuOpen(false);
                }}
                className={`transition-all pb-0.5 whitespace-nowrap border-b-2 ${
                  activeTab === link.name
                    ? 'text-[#A47A46] border-[#A47A46]'
                    : 'text-gray-900 border-transparent hover:text-[#A47A46]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER: Logo */}
        <Link to="/" className="flex justify-center lg:justify-center">
          <img src={logo} alt="Mojilo Logo" className="h-7 sm:h-8 w-auto cursor-pointer" />
        </Link>

        {/* RIGHT: System Action Icons */}
        <div className="flex items-center justify-end gap-3 sm:gap-5">
          <button 
            onClick={() => setIsSearchOpen(true)} 
            className="text-gray-700 hover:text-[#A47A46] transition-colors cursor-pointer"
            aria-label="Search items"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          {isAuthenticated ? (
            <button 
              onClick={() => navigate('/my-profile')} 
              className="text-gray-700 hover:text-[#A47A46] transition-colors cursor-pointer"
            >
              <User size={20} strokeWidth={1.5} />
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-[#A47A46] transition-colors cursor-pointer"
            >
              <User size={20} strokeWidth={1.5} />
              <span className="text-sm font-semibold">Login</span>
            </button>
          )}

          {/* Dynamic Wishlist Badge Counter */}
          <button onClick={() => navigate('/my-wishlist')} className="text-gray-700 hover:text-[#A47A46] transition-colors relative cursor-pointer">
            <Star size={20} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#A47A46] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Dynamic Shopping Bag Badge Counter */}
          <button onClick={() => navigate('/my-cart')} className="text-gray-700 hover:text-[#A47A46] transition-colors relative cursor-pointer">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#A47A46] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {isAuthenticated && (
            <button 
              onClick={handleLogout} 
              className="hidden lg:flex items-center gap-2 border border-gray-300 hover:border-[#A47A46] rounded-xl px-5 py-2 text-[14px] font-bold text-gray-900 shadow-sm transition-all duration-200 whitespace-nowrap cursor-pointer hover:text-[#A47A46]"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}

          {!isAuthenticated && (
            <button 
              onClick={() => navigate('/login')} 
              className="hidden lg:block border border-gray-300 hover:border-[#A47A46] rounded-xl px-5 py-2 text-[14px] font-bold text-gray-900 shadow-sm transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Let's Talk
            </button>
          )}
        </div>
      </div>

      {/* Modern Search Bar Popup Overlay Panel */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 flex items-start justify-center pt-20 px-4 ${
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSearchOpen(false)}
      >
        <div 
          className={`bg-white w-full max-w-2xl rounded-2xl p-5 sm:p-6 shadow-2xl transform transition-transform duration-300 ${
            isSearchOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSearchSubmit} className="flex items-center justify-between gap-4 border-b border-gray-200 pb-3.5">
            <div className="flex items-center gap-3 flex-1">
              <Search size={22} className="text-[#A47A46] shrink-0" />
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search products..." 
                className="w-full text-[15px] font-medium text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
              />
            </div>
            <button 
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-gray-400 hover:text-gray-900 p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X size={22} />
            </button>
          </form>

          {/* Quick Categories Navigation */}
          <div className="pt-5 border-b border-gray-100 pb-4">
            <p className="text-[11px] font-bold tracking-wider uppercase text-gray-400 mb-2.5">Shop By Category</p>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.href)}
                  className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-amber-50/60 rounded-xl text-[14px] font-bold text-gray-800 hover:text-[#A47A46] border border-gray-100 transition-all cursor-pointer group"
                >
                  <span>{cat.name}</span>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-[#A47A46] transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Explicit Subcategory Quick Filtering */}
          <div className="pt-4">
            <p className="text-[11px] font-bold tracking-wider uppercase text-gray-400 mb-3">Shop By Subcategory</p>
            <div className="flex flex-wrap gap-2">
              {subCategories.map((subcat) => (
                <button 
                  key={subcat}
                  onClick={() => handleSubCategoryClick(subcat)}
                  className="text-[13px] font-semibold bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-[#A47A46] px-3.5 py-2 rounded-xl transition-colors border border-gray-100 cursor-pointer"
                >
                  {subcat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 lg:hidden z-50 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[280px] max-w-[85vw] bg-white z-50 p-6 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <img src={logo} alt="Mojilo Logo" className="h-6 w-auto" />
          <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-gray-900 cursor-pointer p-1">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 py-6 text-[16px] font-medium text-gray-900 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => {
                setActiveTab(link.name);
                setIsMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg transition-colors ${
                activeTab === link.name
                  ? 'text-[#A47A46] bg-amber-50/50 font-bold border-l-4 border-[#A47A46]'
                  : 'hover:text-[#A47A46] hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-gray-100 space-y-4">
          {!isAuthenticated ? (
            <Link to="/login" className="flex items-center gap-3 text-gray-700 py-2 text-[15px] font-semibold">
              <User size={20} strokeWidth={1.5} />
              <span>Login / Signup</span>
            </Link>
          ) : (
            <>
              <Link to="/my-profile" className="flex items-center gap-3 text-gray-700 py-2 text-[15px] font-semibold">
                <User size={20} strokeWidth={1.5} />
                <span>My Profile</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-3 text-rose-600 py-2 text-[15px] font-semibold w-full text-left"
              >
                <LogOut size={20} strokeWidth={1.5} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
