import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import heroimg1 from '../assets/heroimg.png';
import heroimg2 from '../assets/heroimg2.png';
import heroimg3 from '../assets/heroimg3.png';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState('teal');
  const navigate = useNavigate();

  const slides = [
    {
      badge: "Create your own",
      heading: <>Dream Big <br /> Work Hard <br /> Stay Focused</>,
      description: "A True Masterpiece of Creativity and Comfort! Not just another T-shirt — it's a bold expression of individuality and style.",
      image: heroimg1,
      stats: { collections: "4k+", trusted: "9k+" }
    },
    {
      badge: "New Release",
      heading: <>Elevate <br /> Your Daily <br /> Aesthetics</>,
      description: "Premium materials engineered for absolute lifestyle execution. Tailored minimalism matching your relentless daily drive.",
      image: heroimg2,
      stats: { collections: "6k+", trusted: "14k+" }
    },
    {
      badge: "Limited Drop",
      heading: <>Bold Intentions <br /> Timeless <br /> Execution</>,
      description: "Exclusively tailored silhouettes dropping for a brief window. Define your streetwear look before it vanishes.",
      image: heroimg3,
      stats: { collections: "2k+", trusted: "5k+" }
    }
  ];

  const colors = [
    { id: 'purple', class: 'bg-purple-400' },
    { id: 'peach',  class: 'bg-orange-200' },
    { id: 'pink',   class: 'bg-gradient-to-r from-pink-400 to-purple-400' },
    { id: 'teal',   class: 'bg-teal-400' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full bg-white overflow-hidden max-w-[1420px] mx-auto">

      {/* ═══════════════════════════════════════
          MOBILE LAYOUT  (< md)
          Image top → content bottom, full bleed
      ════════════════════════════════════════ */}
      <div className="flex flex-col md:hidden">

        {/* ── Mobile Image Block ── */}
        <div className="relative w-full bg-[#FAF7F4] overflow-hidden" style={{ height: '62vw', minHeight: 220, maxHeight: 360 }}>

          {/* Subtle warm wash behind image */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDF4EB]/60 to-transparent z-0" />

          {/* Badge — top-left floating */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-badge-${currentSlide}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-3.5 left-4 z-20"
            >
              <span className="bg-[#D1923D]/20 text-[#B37622] text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {slide.badge}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Color swatch — top-right */}
          <div className="absolute top-3.5 right-4 z-20 bg-white/85 backdrop-blur-md p-2 rounded-xl shadow-md border border-white/50 flex gap-1.5">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-transform active:scale-90 ${color.class}`}
              >
                {selectedColor === color.id && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Hero image — SLIDER UNCHANGED */}
          <AnimatePresence mode="wait">
            <motion.img
              key={`mob-img-${currentSlide}`}
              src={slide.image}
              alt="Hero Showcase"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full object-contain drop-shadow-xl z-10"
            />
          </AnimatePresence>

          {/* Dots — bottom center over image */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === i ? 'w-6 bg-[#BC7628]' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile Content Block ── */}
        <motion.div
          key={`mob-text-${currentSlide}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="px-5 pt-6 pb-8 flex flex-col gap-4"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[2.1rem] leading-[1.05] font-black text-black uppercase tracking-tight"
          >
            {slide.heading}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="text-gray-500 text-sm font-light leading-relaxed"
          >
            {slide.description}
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/collection')}
            className="self-start flex items-center gap-2 bg-[#BC7628] hover:bg-[#A0611F] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md text-sm transition-colors duration-300 cursor-pointer"
          >
            Shop Now <ArrowRight size={14} />
          </motion.button>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.45 }}
            className="flex gap-8 pt-4 border-t border-gray-100"
          >
            <div>
              <p className="text-2xl font-black text-black">{slide.stats.collections}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Collections</p>
            </div>
            <div>
              <p className="text-2xl font-black text-black">{slide.stats.trusted}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Items trusted to deliver</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════
          DESKTOP LAYOUT  (md+)
          Side by side — content left, image right
          COMPLETELY UNCHANGED from working version
      ════════════════════════════════════════ */}
      <div className="hidden md:flex flex-row items-center justify-between px-12 py-14 lg:px-24 lg:py-16 min-h-[620px] lg:min-h-[680px]">

        {/* Left content */}
        <motion.div
          key={`desk-text-${currentSlide}`}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-1/2 flex flex-col items-start gap-6 z-10"
        >
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <span className="bg-[#D1923D]/20 text-[#B37622] text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
              {slide.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="text-5xl lg:text-6xl font-black tracking-tight text-black uppercase leading-none min-h-[180px] lg:min-h-[200px]"
          >
            {slide.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.55 }}
            className="text-gray-500 text-sm font-light leading-relaxed max-w-md min-h-[80px]"
          >
            {slide.description}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/collection')}
            className="flex items-center gap-2 bg-[#BC7628] hover:bg-[#A0611F] text-white font-medium px-6 py-3 rounded-xl shadow-md transition-colors duration-300 cursor-pointer"
          >
            Shop Now <ArrowRight size={16} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5 }}
            className="flex gap-12 pt-8 border-t border-gray-100 w-full"
          >
            <div>
              <p className="text-3xl lg:text-4xl font-black text-black">{slide.stats.collections}</p>
              <p className="text-xs text-gray-500 mt-1">Collections</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-black">{slide.stats.trusted}</p>
              <p className="text-xs text-gray-500 mt-1">Items trusted to deliver</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right image — SLIDER UNCHANGED */}
        <div className="w-1/2 relative flex flex-col justify-center items-center">
          <div className="absolute top-10 left-4 lg:left-12 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg flex gap-2 z-20 border border-white/40">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`w-6 h-6 rounded-md flex items-center justify-center transition-transform hover:scale-110 ${color.class}`}
              >
                {selectedColor === color.id && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          <div className="relative z-10 max-w-[400px] lg:max-w-[450px] w-full aspect-square flex items-end justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={`desk-img-${currentSlide}`}
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

          <div className="flex gap-2 mt-4 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === i ? 'w-6 bg-[#BC7628]' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}