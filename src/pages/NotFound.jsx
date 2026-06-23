import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RotateCcw, Paintbrush, Scissors } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden select-none font-sans antialiased">
      
      {/* Custom Styles Injection for Precision Custom Animations */}
      <style>{`
        @keyframes surrealFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1.5deg); }
        }
        @keyframes laserScan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-surreal-float {
          animation: surrealFloat 6s ease-in-out infinite;
        }
        .animate-laser-scan {
          animation: laserScan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-slow-spin {
          animation: slowSpin 25s linear infinite;
        }
      `}</style>

      {/* Ambient background studio design grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating printing registration alignment nodes */}
      <div className="absolute top-12 left-12 text-white/10 text-xs font-mono hidden md:block">
        <p>REG_MARK // 01</p>
        <div className="w-6 h-[1px] bg-white/20 mt-1" />
        <div className="h-6 w-[1px] bg-white/20 -mt-1" />
      </div>
      <div className="absolute bottom-12 right-12 text-white/10 text-xs font-mono hidden md:block text-right">
        <p>PLOT_SCALE // 404</p>
        <div className="w-6 h-[1px] bg-white/20 mt-1 ml-auto" />
      </div>

      {/* Atmospheric lighting drops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#a47a4c]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Core Layout Shell */}
      <div className="w-full max-w-xl text-center z-10 flex flex-col items-center space-y-10">
        
        {/* --- Surreal Animated Apparel Matrix --- */}
        <div className="relative group w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          
          {/* Background Rotating Blueprint Circles */}
          <div className="absolute w-full h-full border border-dashed border-white/[0.04] rounded-full animate-slow-spin pointer-events-none" />
          <div className="absolute w-[80%] h-[80%] border border-[#a47a4c]/10 rounded-full animate-slow-spin pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />

          {/* Huge soft back text layer */}
          <div className="absolute text-[9rem] sm:text-[11rem] font-serif font-light text-white/[0.02] tracking-widest pointer-events-none select-none group-hover:text-[#a47a4c]/5 transition-colors duration-700">
            404
          </div>

          {/* Levitating T-Shirt Frame */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 relative animate-surreal-float mix-blend-screen">
            
            {/* The Laser Scanner Laser Beam Bar */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#a47a4c] to-transparent z-20 shadow-[0_0_12px_#a47a4c] animate-laser-scan" />

            {/* Premium Custom SVG T-Shirt vector with internal blueprint line elements */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full text-slate-800 fill-neutral-900/90 stroke-[#a47a4c]/40 stroke-[0.5] transition-all duration-500 group-hover:stroke-[#a47a4c]/80"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main Silhouette Path */}
              <path d="M 32,12 L 42,12 C 45,16 55,16 58,12 L 68,12 L 86,24 L 74,34 L 69,31 L 69,88 L 31,88 L 31,31 L 26,34 L 14,24 Z" />
              
              {/* Wireframe Internal Matrix Styling */}
              <path d="M 31,45 L 69,45 M 31,60 L 69,60 M 31,75 L 69,75 M 50,16 L 50,88" className="stroke-white/[0.05] stroke-[0.25]" />
            </svg>

            {/* Center Badging Text Label Element */}
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono pointer-events-none">
              <span className="text-[10px] tracking-[0.3em] text-[#a47a4c] font-bold uppercase translate-y-1">
                ERROR
              </span>
              <span className="text-[2.5rem] font-serif font-light text-white opacity-90 tracking-normal">
                404
              </span>
              <span className="text-[8px] tracking-widest text-slate-500 uppercase -translate-y-1">
                OUT OF BOUNDS
              </span>
            </div>

            {/* Orbiting particles overlay */}
            <div className="absolute -top-2 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-6 right-4 w-1.5 h-1.5 bg-[#a47a4c] rounded-full animate-pulse" />
          </div>

        </div>

        {/* --- Creative Message Content Layout --- */}
        <div className="space-y-3 px-4 max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-white uppercase">
            Misprinted Coordinates
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed tracking-wide">
            The stylistic layer configuration you are trying to register doesn't exist in our active print files. Let's redirect you back to the main design desk.
          </p>
        </div>

        {/* --- Navigation Action Buttons Matrix --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm pt-2 px-4">
          
          <button
            onClick={() => navigate('/')}
            className="w-full sm:flex-1 bg-[#a47a4c] hover:bg-[#8e673e] text-white font-bold text-[11px] uppercase tracking-[0.18em] py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#a47a4c]/10 active:scale-[0.99]"
          >
            <Home size={13} />
            <span>Studio Desk</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:flex-1 bg-white/[0.03] border border-white/10 hover:bg-white/10 text-slate-300 font-bold text-[11px] uppercase tracking-[0.18em] py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <RotateCcw size={13} />
            <span>Step Back</span>
          </button>

        </div>

        {/* Studio Branding Accent */}
        <div className="pt-4 flex items-center gap-4 text-[10px] uppercase font-mono tracking-[0.3em] text-slate-600">
          <span className="flex items-center gap-1"><Paintbrush size={10} /> PRINT</span>
          <span className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
          <span className="flex items-center gap-1"><Scissors size={10} /> FIT</span>
        </div>

      </div>
    </div>
  );
};

export default NotFound;