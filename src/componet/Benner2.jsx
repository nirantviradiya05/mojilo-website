import React from 'react';
import Benner2img1 from '../assets/benner2img1.png';
import Benner2img2 from '../assets/benner2img2.png';
import Benner2img3 from '../assets/benner2img3.png'; // Replace with your T-shirt illustration

export default function Banner2() {
  const steps = [
    {
      number: '01',
      title: 'Pick A Product',
      image: Benner2img1, // Replace with your T-shirt illustration
      numberBg: 'bg-black text-white',
    },
    {
      number: '02',
      title: 'Custom Artwork',
      image: Benner2img2, // Replace with your artwork design illustration
      numberBg: 'bg-[#29B29B] text-white',
    },
    {
      number: '03',
      title: 'Ship It For You',
      image: Benner2img3, // Replace with your delivery box illustration
      numberBg: 'bg-[#29B29B] text-white',
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* HEADER BLOCK */}
        <div className="text-center max-w-2xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            T-shirt Printing Made Easy
          </h2>
        </div>

        {/* STEPS GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 lg:gap-12">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center group ${
                idx === 1 ? 'md:translate-y-6' : ''
              }`}
            >
              {/* Graphic Illustration Wrapper */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="max-w-[150px] max-h-[150px] object-contain"
                />
              </div>

              {/* Step Sequence Badge */}
              <div className={`w-8 h-8 rounded-full ${step.numberBg} flex items-center justify-center text-xs font-bold shadow-md mt-4 mb-3 tracking-wider`}>
                {step.number}
              </div>

              {/* Step Heading Label */}
              <h4 className="text-base sm:text-lg font-black text-black tracking-wide uppercase">
                {step.title}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}