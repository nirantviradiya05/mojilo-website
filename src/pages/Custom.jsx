import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Image asset imports
import CoustomImg1 from '../assets/CoustomImg1.png';
import CoustomImg2 from '../assets/CoustomImg2.png';
import CoustomImg3 from '../assets/CoustomImg3.png';
import CoustomImg4 from '../assets/CoustomImg4.png';
import CoustomTshirt1 from '../assets/CoustomTshirt1.png';
import CoustomTshirt2 from '../assets/CoustomTshirt2.png';
import CoustomTshirt3 from '../assets/CoustomTshirt3.png';
import CoustomTshirt4 from '../assets/CoustomTshirt4.png';
import BannerImage from '../assets/CoustomBennerImg1.png';

import CoustomProduct from '../componet/CoustomProduct';

const apparelDatabase = {
  'half-sleeve': {
    id: 'half-sleeve',
    name: 'Half Sleeve T-Shirt',
    modelImage: CoustomImg1,
    flatImage: CoustomTshirt1,
  },
  'long-sleeve': {
    id: 'long-sleeve',
    name: 'Long Sleeve T-Shirt',
    modelImage: CoustomImg2,
    flatImage: CoustomTshirt2,
  },
  'hoodie': {
    id: 'hoodie',
    name: 'Hoodie',
    modelImage: CoustomImg3,
    flatImage: CoustomTshirt3,
  },
  'oversized': {
    id: 'oversized',
    name: 'Oversized T-Shirt',
    modelImage: CoustomImg4,
    flatImage: CoustomTshirt4,
  }
};

const collectionsData = [
  {
    id: 1,
    title: 'Astronauts',
    count: '85 resources',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&q=80'
    ]
  },
  {
    id: 2,
    title: 'Quote that collection',
    count: '6 resources',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80'
    ]
  },
  {
    id: 3,
    title: 'Art Styles',
    count: '68 resources',
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80'
    ]
  }
];

/* --- MAIN PAGE COMPONENT --- */
const Coustom = () => {
  const [activeTab, setActiveTab] = useState('half-sleeve');
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();

  const handleApparelSwitch = (id) => {
    if (id === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(id);
      setIsAnimating(false);
    }, 250);
  };

  const activeProduct = apparelDatabase[activeTab];

  return (
    <div className="w-full min-h-screen bg-stone-50/40 font-sans text-stone-800 antialiased selection:bg-amber-100 flex flex-col items-center">

      {/* 1. Interactive Apparel Switcher Hero */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* LEFT COLUMN: Content Text Details */}
        <div className="order-1 lg:col-span-4 space-y-4 md:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-stone-900 leading-tight">
              Choose Your <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950">Own Design.</span>
            </h2>
            <p className="text-xs md:text-sm font-bold tracking-widest text-amber-700 uppercase">
              Print. Wear. Inspire.
            </p>
          </div>

          <p className="text-stone-500 text-sm leading-relaxed max-w-md lg:max-w-sm">
            Turn your ideas into reality with high quality clothing items and professional printing services. Create custom garments that perfectly reflect your unique personality and vision.
          </p>

          <div className="pt-2 w-full sm:w-auto">
            <button onClick={() => navigate('/collection')} className="cursor-pointer group w-full sm:w-auto flex items-center justify-center space-x-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-widest uppercase px-6 py-4 rounded-lg shadow-md transition-all border border-stone-800">
              <span>View Collections</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-500" />
            </button>
          </div>
        </div>

        {/* MIDDLE COLUMN: Dynamic Animated Model View Screen */}
        <div 
          onClick={() => navigate(`/coustom-product-tshirt/${activeTab}`)}
          className="order-2 lg:col-span-5 w-full flex justify-center items-center aspect-[4/5] sm:aspect-square lg:h-[540px] bg-stone-100/40 rounded-2xl relative overflow-hidden group border border-stone-200/40 shadow-sm cursor-pointer transition-all duration-300 hover:border-amber-500/30 hover:shadow-md"
        >
          <div
            className={`w-full h-full flex items-center justify-center p-6 md:p-12 transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-95 translate-y-4 filter blur-sm' : 'opacity-100 scale-100 translate-y-0 filter blur-none'
              }`}
          >
            <img
              src={activeProduct.modelImage}
              alt={activeProduct.name}
              className="max-h-full max-w-full object-contain mix-blend-darken select-none pointer-events-none drop-shadow-md"
            />
          </div>

          {/* Hover Overlay Message Indicator */}
          <div className="absolute inset-0 bg-stone-950/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="bg-[#221916] text-white text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-lg shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Customize This Item
            </div>
          </div>

          {/* Subtle Dynamic Title Tag Badge Overlay */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-stone-200/30 shadow-sm z-10">
            <span className="text-[10px] md:text-xs font-bold tracking-wider text-amber-900 uppercase">{activeProduct.name}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Selection Rack */}
        <div className="order-3 lg:col-span-3 w-full flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:h-[540px] py-2 lg:py-0 px-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent">
          {Object.values(apparelDatabase).map((item) => {
            const isSelected = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => handleApparelSwitch(item.id)}
                className={`flex flex-row items-center justify-between p-3 sm:p-4 rounded-xl cursor-pointer transition-all border text-left shrink-0 w-[240px] sm:w-[280px] lg:w-full snap-center outline-none focus:ring-2 focus:ring-amber-500/40 ${isSelected
                    ? 'bg-[#221916] border-[#221916] shadow-xl text-white scale-[1.01]'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200/60 text-stone-800 hover:scale-[1.005]'
                  }`}
              >
                {/* Product Meta Text Context */}
                <div className="space-y-0.5 md:space-y-1 pr-2 min-w-0 flex-1">
                  <p className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase truncate ${isSelected ? 'text-amber-500' : 'text-stone-400'}`}>
                    Apparel Category
                  </p>
                  <h4 className="text-xs sm:text-sm font-bold tracking-wide truncate">
                    {item.name}
                  </h4>
                </div>

                {/* Flat-lay Thumbnail View Box */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-stone-50 rounded-lg overflow-hidden flex items-center justify-center shadow-inner shrink-0 border border-stone-200/20">
                  <img
                    src={item.flatImage}
                    alt={item.name}
                    className="w-full h-full object-cover mix-blend-darken select-none pointer-events-none"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* --- SEPARATOR RULE --- */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <hr className="border-stone-200/60" />
      </div>

      {/* 2. Free design templates showcase section */}
      <CustomShowcase />

      {/* --- SEPARATOR RULE --- */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <hr className="border-stone-200/60" />
      </div>

      {/* 3. CustomBanner section moved directly under the showcase templates */}
      <CustomBanner />
    </div>
  );
};

/* --- SUB-COMPONENT: TEMPLATE SHOWCASE COMPONENT --- */
const CustomShowcase = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-transparent font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
          Free design templates
        </h2>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Dynamic Template Cards */}
        {collectionsData.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            {/* Image Composite Grid Layout */}
            <div className="aspect-[4/3] w-full bg-stone-100 rounded-2xl overflow-hidden p-2 grid grid-cols-2 gap-2 transition-transform duration-300 ease-out group-hover:scale-[1.015] border border-stone-200/30 shadow-sm">

              {/* Left Row Grid */}
              <div className="grid grid-rows-2 gap-2">
                <div className="bg-stone-200 rounded-lg overflow-hidden">
                  <img src={item.images[0]} alt="" className="w-full h-full object-cover mix-blend-darken" />
                </div>
                <div className="bg-stone-200 rounded-lg overflow-hidden">
                  <img src={item.images[1]} alt="" className="w-full h-full object-cover mix-blend-darken" />
                </div>
              </div>

              {/* Right Hero Image Column */}
              <div className="bg-stone-200 rounded-lg overflow-hidden">
                <img src={item.images[2]} alt="" className="w-full h-full object-cover mix-blend-darken" />
              </div>

            </div>

            {/* Meta Typography */}
            <div className="mt-4 px-1">
              <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-tight group-hover:text-amber-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-stone-400 mt-1 font-semibold tracking-wide">
                {item.count}
              </p>
            </div>
          </div>
        ))}

        {/* Final "+28 Collections" Mask Card */}
        <div className="group cursor-pointer flex flex-col justify-between">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden grid grid-cols-2 gap-2 p-2 bg-[#221916] shadow-md border border-stone-950">
            {/* Faux Background Layers */}
            <div className="grid grid-rows-2 gap-2 opacity-25">
              <div className="bg-stone-500 rounded-lg"></div>
              <div className="bg-stone-500 rounded-lg"></div>
            </div>
            <div className="bg-stone-500 rounded-lg opacity-25"></div>

            {/* Centered Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
              <span className="text-3xl font-black tracking-tight group-hover:scale-110 transition-transform duration-300 text-amber-400">
                +28
              </span>
              <span className="text-xs font-bold tracking-widest uppercase mt-1 text-stone-300">
                Collections
              </span>
            </div>
          </div>

          {/* Alignment spacer matching metadata heights below other tiles */}
          <div className="mt-4 h-[38px] invisible hidden sm:block" aria-hidden="true" />
        </div>

      </div>
    </section>
  );
};

/* --- SUB-COMPONENT: HERO BANNER --- */
const CustomBanner = () => {
  return (
    <div>
      <section className="w-full bg-[#F4F4F4] min-h-[500px] flex items-center justify-center py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left Side: Dynamic Image Stack Graphic */}
          <div className="flex justify-center items-center w-full order-2 md:order-1">
            <div className="relative max-w-[550px] w-full h-auto">
              <img
                src={BannerImage}
                alt="Customize your jersey layout preview"
                className="w-full h-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>

          {/* Right Side: Copywriting & CTA */}
          <div className="flex flex-col justify-center space-y-5 text-left order-1 md:order-2 max-w-[500px] mx-auto md:mx-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] leading-[1.15] tracking-tight">
              Customize Your Own <br />
              Jersey In Every Sports
            </h1>

            <p className="text-sm md:text-base text-[#666666] leading-relaxed font-light">
              "Legends wear their own design. Customize your team's jersey with your
              own colors and logos for a powerhouse look that rules the field."
            </p>

            <div className="pt-2">
              <button className="bg-[#936A3A] hover:bg-[#6D4F2B] text-white font-medium px-8 py-3 rounded-md transition-all duration-200 shadow-sm text-sm md:text-base cursor-pointer">
                Let's Do It
              </button>
            </div>
          </div>

        </div>
      </section>
      <CoustomProduct />
    </div>
  );
};

export default Coustom;