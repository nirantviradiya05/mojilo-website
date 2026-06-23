import React from 'react';
import { ArrowRight } from 'lucide-react';
import categoryimg1 from '../assets/categoryimg1.png'; 
import categoryimg2 from '../assets/categoryimg2.png'; 
import { useNavigate } from 'react-router-dom';

export default function Category() {
  const navigate = useNavigate();

  return (
    <section className="w-full py-16 px-4 md:px-12 lg:px-24 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-3xl flex flex-col md:flex-row gap-8 md:gap-[100px] items-center justify-center">
        
        {/* MEN'S COLLECTION CARD */}
        <div 
          data-aos="fade-right"
          data-aos-delay="100"
          className="relative w-full md:w-1/2 aspect-[4/3] sm:aspect-square md:aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden group"
        >
          <img 
            src={categoryimg1}
            alt="Men's Collection" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Bottom Floating Badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] max-w-[240px]">
            {/* ADDED: w-full to make the button fill the centered badge area */}
            <button 
              onClick={() => navigate('/collection?Category=man')} 
              className="w-full bg-white text-black font-bold text-center py-3 px-4 rounded-xl shadow-lg text-sm sm:text-base tracking-wide transition-all duration-300 group-hover:bg-gray-100 cursor-pointer"
            >
              Men's Collection
            </button>
          </div>
        </div>

        {/* CENTRAL "VIEW ALL" BUTTON */}
        <div 
          data-aos="zoom-in"
          data-aos-delay="200"
          className="z-30 pointer-events-none my-4 md:my-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col items-center"
        >
          <button 
            onClick={() => navigate('/collection')} 
            className="pointer-events-auto flex items-center gap-2 bg-[#BC7628] hover:bg-[#A0611F] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl tracking-wide text-base whitespace-nowrap cursor-pointer"
          >
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* WOMEN'S COLLECTION CARD */}
        <div 
          data-aos="fade-left"
          data-aos-delay="300"
          className="relative w-full md:w-1/2 aspect-[4/3] sm:aspect-square md:aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden group"
        >
          <img 
            src={categoryimg2}
            alt="Women's Collection" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Bottom Floating Badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] max-w-[240px]">
            {/* ADDED: w-full to make the button fill the centered badge area */}
            <button 
              onClick={() => navigate('/collection?Category=woman')} 
              className="w-full bg-white text-black font-bold text-center py-3 px-4 rounded-xl shadow-lg text-sm sm:text-base tracking-wide transition-all duration-300 group-hover:bg-gray-100 cursor-pointer"
            >
              Women's Collection
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}