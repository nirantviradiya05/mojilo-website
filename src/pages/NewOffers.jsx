import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

// 1. IMPORT DYNAMIC DATA FROM data.js
import { products } from '../assets/Data.js'; 

import ProductCard from "../componet/ProductCard";
import OffersSlideImg1 from '../assets/OffersSlideImg1.png';
import OffersSlideImg2 from '../assets/OffersSlideImg2.png';
import OffersSlideImg3 from '../assets/OffersSlideImg3.png';
import OffersSlideImg4 from '../assets/OffersSlideImg4.png';

// ==========================================
// 1. MAIN HERO SLIDER COMPONENT
// ==========================================
const NewOffers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      titleLine1: "T-Shirt",
      titleHighlight: "Printing",
      titleLine2: "Made Simple",
      titleLine3: "For Everyone",
      description: "A True Masterpiece of Creativity and Comfort! The OLD WAYS DON'T OPEN NEW DOORS is not just another T-shirt; it's a bold expression of individuality and style.",
      tshirtBgImage: OffersSlideImg2,
      manImage: OffersSlideImg1,
      satisfactionRate: "90%"
    },
    {
      titleLine1: "Custom",
      titleHighlight: "Hoodies",
      titleLine2: "Crafted Daily",
      titleLine3: "For Creators",
      description: "Step up your premium streetwear game. Our heavy-blend customized hoodies offer maximum insulation without compromising on vibrant graphic precision.",
      tshirtBgImage: OffersSlideImg4,
      manImage: OffersSlideImg3,
      satisfactionRate: "95%"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-[#E5D5C5] relative overflow-hidden font-sans flex items-center justify-center p-6 sm:p-12 md:p-20 group/slider">
      
      {/* Abstract Background Line Vector Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,200 C300,100 500,600 900,400 C1200,250 1300,700 1600,600" stroke="#8C5A23" strokeWidth="1.5" />
          <path d="M-120,230 C280,130 480,630 880,430 C1180,280 1280,730 1580,630" stroke="#8C5A23" strokeWidth="1.5" />
          <path d="M-140,260 C260,160 460,660 860,460 C1160,310 1260,760 1560,660" stroke="#8C5A23" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Slider Viewport Window */}
      <div className="max-w-7xl w-full relative z-10 overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content Column */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-[#1A1A1A]">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
                  {slide.titleLine1} <span className="text-[#C58228] relative inline-block">
                    {slide.titleHighlight}
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 5C50 15 150 15 195 5" stroke="#C58228" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <br />
                  {slide.titleLine2}
                  <br />
                  {slide.titleLine3}
                </h1>
                
                <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed max-w-xl">
                  {slide.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <button onClick={() => navigate('/custom')} className="bg-[#BD7A22] hover:bg-[#A3661B] text-white font-bold py-3 px-8 rounded-md transition shadow-md text-sm sm:text-base cursor-pointer">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Right Graphics/Mockup Column */}
              <div className="lg:col-span-6 relative flex justify-center items-center h-[450px] sm:h-[550px]">
                <div className="absolute left-0 top-10 w-48 sm:w-95 transform z-10 filter drop-shadow-2xl">
                  <img 
                    src={slide.tshirtBgImage} 
                    alt="Product Mockup" 
                    className="w-full object-contain rounded-xl"
                    style={{ mixBlendMode: 'multiply' }} 
                  />
                </div>

                <div className="absolute right-4 bottom-0 h-[90%] w-[70%] sm:w-[65%] z-20 overflow-hidden rounded-b-2xl flex items-end">
                  <img 
                    src={slide.manImage} 
                    alt="Model Showcase" 
                    className="w-full h-full object-cover object-top filter drop-shadow-2xl"
                  />
                </div>

                {/* UI Badges */}
                <div className="absolute right-[32%] top-16 bg-[#BD7A22] p-2.5 rounded-lg shadow-lg transform rotate-12 z-10 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="absolute left-[20%] bottom-16 bg-[#BD7A22] p-3 rounded-lg shadow-lg transform -rotate-12 z-30 text-white font-serif text-lg sm:text-2xl font-bold leading-none w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                </div>

                {/* Customer Satisfaction Analytics Box */}
                <div className="absolute right-0 top-20 bg-white rounded-xl p-3 sm:p-4 shadow-xl z-30 flex flex-col items-center space-y-2 text-center w-24 sm:w-28 border border-gray-100">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-amber-500" strokeDasharray="90, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-[10px] sm:text-xs font-black text-gray-800">{slide.satisfactionRate}</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-700 leading-tight">Customer Satisfaction</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-6 z-40 p-2 bg-[#BD7A22]/80 hover:bg-[#BD7A22] text-white rounded-full shadow-lg transition opacity-0 group-hover/slider:opacity-100 focus:opacity-100 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-6 z-40 p-2 bg-[#BD7A22]/80 hover:bg-[#BD7A22] text-white rounded-full shadow-lg transition opacity-0 group-hover/slider:opacity-100 focus:opacity-100 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 flex gap-2 z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-6 bg-[#BD7A22]' : 'w-2 bg-[#1A1A1A]/30'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};


// ==========================================
// 2. CATEGORY FILTER SECTION COMPONENT
// ==========================================
const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = ['Man', 'Woman', 'Sports'];

  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 px-6 sm:px-12 md:px-20">

        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A]">
            New Offers For
          </h2>

          <div className="flex items-center gap-1 bg-[#E7E3DF] p-1 rounded-md">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-bold rounded-md transition cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#BD7A22] text-white'
                    : 'text-black hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <Link to="/collection">
          <button className="px-4 py-2 rounded-lg bg-[#F5F5F5] font-semibold hover:bg-gray-200 transition cursor-pointer">
            View All
          </button>
        </Link>
      </div>
    </section>
  );
};


// ==========================================
// 3. MASTER WRAPPER
// ==========================================
const FeaturedSectionWrapper = () => {
  const [activeCategory, setActiveCategory] = useState('Man');

  // Filters items dynamically from the imported products array
  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div className="w-full bg-white">

      {/* Hero Slider */}
      <NewOffers />

      {/* Gap */}
      <div className="h-6 bg-white"></div>

      {/* Category Filter */}
      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Product Grid */}
      <section className="w-full bg-white pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredProducts.map((product) => {
              // Quick structural adapter: if your ProductCard expects "image" (string) 
              // but data.js passes "images" (array), map it gracefully here
              const adaptedProduct = {
                ...product,
                image: product.image || (product.images && product.images[0])
              };

              return (
                <ProductCard
                  key={product.id}
                  product={adaptedProduct}
                />
              );
            })}

          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400 font-medium">
              No products found in this category.
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default FeaturedSectionWrapper;