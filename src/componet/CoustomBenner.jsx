import React from 'react';
import CoustomBenner from '../assets/CoustomBenner.png';
import { useNavigate } from 'react-router-dom';

const CustomBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl mx-auto p-4 mt-10">
      <div className="bg-[#f3f0fa] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 space-y-6 text-center md:text-left max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Create your unique style
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-normal leading-relaxed">
            Free and easy way to bring your ideas to life
          </p>
          <div>
            <button onClick={() => navigate('/custom')} className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-8 rounded-xl transition duration-200 shadow-sm border border-gray-100 cursor-pointer">
              Explore More
            </button>
          </div>
        </div>

        {/* Right Side: Mockup Image */}
        <div className="flex-1 w-full max-w-md md:max-w-none">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner">
            <img
              src= {CoustomBenner}
              alt="T-shirt Mockups"
              className="w-full h-full object-cover"
            />
            {/* Optional Overlay to mimic the warm pinkish/peach tone of your image */}
            <div className="absolute inset-0 bg-pink-500/10 mix-blend-multiply pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomBanner;