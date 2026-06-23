import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import your different asset images here
import heroimg1 from '../assets/heroimg.png'; 
import heroimg2 from '../assets/heroimg2.png'; 
import heroimg3 from '../assets/heroimg3.png'; 

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState('teal');
  const navigate = useNavigate();

  // 1. Unified Dataset Array for Your Slider Content
  const slides = [
    {
      badge: "Create your own",
      heading: <>Dream Big <br /> Work Hard <br /> Stay Focused</>,
      description: "A True Masterpiece of Creativity and Comfort! The DREAM BIG WORK HARD STAY FOCUSED is not just another T-shirt; it's a bold expression of individuality and style.",
      image: heroimg1,
      stats: { collections: "4k+", trusted: "9k+" }
    },
    {
      badge: "New Release",
      heading: <>Elevate <br /> Your Daily <br /> Aesthetics</>,
      description: "Premium materials engineered for absolute lifestyle execution. Discover tailored minimalism matching your relentless daily drive.",
      image: heroimg2, // Replace with your next slide image (e.g., heroimg2)
      stats: { collections: "6k+", trusted: "14k+" }
    },
    {
      badge: "Limited Drop",
      heading: <>Bold Intentions <br /> Timeless <br /> Execution</>,
      description: "Exclusively tailored silhouettes dropping for a brief moment window. Define your streetwear look before it vanishes permanently.",
      image: heroimg3, // Replace with your next slide image (e.g., heroimg3)
      stats: { collections: "2k+", trusted: "5k+" }
    }
  ];

  const colors = [
    { id: 'purple', class: 'bg-purple-400' },
    { id: 'peach', class: 'bg-orange-200' },
    { id: 'pink', class: 'bg-gradient-to-r from-pink-400 to-purple-400' },
    { id: 'teal', class: 'bg-teal-400' },
  ];

  // 2. Automate Sliding Mechanism Using a React Interval Hook
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5000ms = 5 Seconds interval loop time

    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full min-h-[650px] bg-white px-6 py-12 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between overflow-hidden max-w-[1420px] mx-auto">
      
      {/* LEFT CONTENT BLOCK */}
      {/* We use an explicit key bound to currentSlide so Framer Motion reruns text transitions cleanly */}
      <motion.div 
        key={`text-${currentSlide}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col items-start z-10 space-y-6"
      >
        {/* Decorative Badge */}
        <div className="relative">
          <span className="bg-[#D1923D]/20 text-[#B37622] text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
            {slide.badge}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black uppercase leading-none min-h-[160px] md:min-h-[200px]">
          {slide.heading}
        </h1>

        {/* Description Paragraph */}
        <p className="text-gray-600 text-sm sm:text-base max-w-md font-light leading-relaxed min-h-[80px]">
          {slide.description}
        </p>

        {/* CTA Button */}
        <button onClick={() => navigate('/collection')} className="flex items-center gap-2 bg-[#BC7628] hover:bg-[#A0611F] text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-md transform active:scale-95 cursor-pointer">
          Shop Now
          <ArrowRight size={16} />
        </button>

        {/* Stats Section */}
        <div className="flex gap-12 pt-8 border-t border-gray-100 w-full">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-black">{slide.stats.collections}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Collections</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-black">{slide.stats.trusted}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">items trusted to deliver</p>
          </div>
        </div>
      </motion.div>

      {/* RIGHT GRAPHICS & IMAGE BLOCK */}
      <div className="w-full md:w-1/2 relative flex flex-col justify-center items-center mt-12 md:mt-0">
        
        {/* Color Swatch Picker Overlay (Maintained design style placement) */}
        <div className="absolute top-12 left-4 sm:left-12 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg flex gap-2 z-20 border border-white/40">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`w-6 h-6 rounded-md relative flex items-center justify-center transition-transform hover:scale-115 ${color.class}`}
            >
              {selectedColor === color.id && (
                <svg className="w-4 h-4 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Main Composite Image Container with Crossfade Layer Transitions */}
        <div className="relative z-10 max-w-[450px] w-full aspect-square flex items-end justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              key={`img-${currentSlide}`}
              src={slide.image}
              alt="Hero Showcase Display" 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="object-contain w-full h-full drop-shadow-2xl absolute bottom-0"
            />
          </AnimatePresence>
        </div>

        {/* 3. Visual Inline Progress Indicators (Tiny dots replacing navigation buttons) */}
        <div className="flex gap-2 mt-4 z-20">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === i ? 'w-6 bg-[#BC7628]' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}