import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
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

import CoustomProduct from '../components/CoustomProduct';

const apparelDatabase = {
  'half-sleeve': { id: 'half-sleeve', name: 'Half Sleeve', modelImage: CoustomImg1, flatImage: CoustomTshirt1 },
  'long-sleeve': { id: 'long-sleeve', name: 'Long Sleeve', modelImage: CoustomImg2, flatImage: CoustomTshirt2 },
  'hoodie': { id: 'hoodie', name: 'Hoodie', modelImage: CoustomImg3, flatImage: CoustomTshirt3 },
  'oversized': { id: 'oversized', name: 'Oversized', modelImage: CoustomImg4, flatImage: CoustomTshirt4 },
};

const collectionsData = [
  { id: 1, title: 'Astronauts', count: '85 resources', images: ['https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80', 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&q=80'] },
  { id: 2, title: 'Quote Collections', count: '6 resources', images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80'] },
  { id: 3, title: 'Art Styles', count: '68 resources', images: ['https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80', 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400&q=80', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80'] },
];

/* ── Fade-in-up hook ── */
function useFadeInUp(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        io.disconnect();
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
const Coustom = () => {
  const [activeTab, setActiveTab] = useState('half-sleeve');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleApparelSwitch = (id) => {
    if (id === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => { setActiveTab(id); setIsAnimating(false); }, 280);
  };

  const activeProduct = apparelDatabase[activeTab];

  const refHeading = useFadeInUp(0);
  const refSub = useFadeInUp(80);
  const refBody = useFadeInUp(160);
  const refBtn = useFadeInUp(240);
  const refModel = useFadeInUp(120);
  const refRack = useFadeInUp(200);

  return (
    <div className="w-full min-h-screen bg-stone-50 font-sans text-stone-800 antialiased selection:bg-amber-100 flex flex-col items-center overflow-x-hidden">

      {/* ── Hero ── */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-10 lg:pb-20
                       grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

        {/* LEFT: copy */}
        <div className="order-1 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5">
          <div ref={refHeading} className="space-y-1">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-amber-700 uppercase flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles className="w-3 h-3" /> Print. Wear. Inspire.
            </p>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-stone-900 leading-[1.08]">
              Choose Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-950">
                Own Design.
              </span>
            </h2>
          </div>

          <p ref={refBody} className="hidden lg:block text-stone-500 text-sm sm:text-base leading-relaxed max-w-sm lg:max-w-xs">
            Turn your ideas into reality with high-quality garments and professional printing. Create custom pieces that reflect your vision.
          </p>

          <div ref={refBtn} className="w-full sm:w-auto">
            <button
              onClick={() => navigate('/collection')}
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5
                         bg-stone-900 hover:bg-amber-800 text-white
                         text-xs font-bold tracking-[0.14em] uppercase
                         px-6 py-3.5 sm:py-4 rounded-xl shadow-lg
                         transition-all duration-300 ease-out
                         hover:shadow-amber-900/30 hover:shadow-xl
                         active:scale-95"
            >
              <span>View Collections</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
            </button>
          </div>
        </div>

        {/* MIDDLE: model preview */}
        <div
          ref={refModel}
          onClick={() => navigate(`/coustom-product-tshirt/${activeTab}`)}
          className="order-2 lg:col-span-5 w-full cursor-pointer
                     relative overflow-hidden rounded-2xl sm:rounded-3xl
                     bg-stone-100/70 border border-stone-200/60
                     shadow-sm hover:shadow-xl hover:shadow-amber-900/10
                     transition-all duration-500 ease-out
                     hover:border-amber-400/40 hover:-translate-y-1
                     aspect-[4/5] sm:aspect-[3/4] lg:h-[540px] lg:aspect-auto
                     flex justify-center items-center group"
        >
          {/* ambient glow blob */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
          </div>

          <div
            className={`w-full h-full flex items-center justify-center p-6 sm:p-10 lg:p-12
                        transition-all duration-300 ease-out
                        ${isAnimating
                ? 'opacity-0 scale-90 translate-y-6 blur-sm'
                : 'opacity-100 scale-100 translate-y-0 blur-none'}`}
          >
            <img
              src={activeProduct.modelImage}
              alt={activeProduct.name}
              className="max-h-full max-w-full object-contain mix-blend-darken
                         select-none pointer-events-none drop-shadow-lg
                         transition-all duration-300"
            />
          </div>

          {/* hover CTA pill */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-stone-900/90 backdrop-blur-sm text-white
                            text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase
                            px-4 py-2.5 rounded-xl shadow-xl
                            opacity-0 group-hover:opacity-100
                            translate-y-3 group-hover:translate-y-0
                            transition-all duration-300 flex items-center gap-2">
              Customize This Item
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>

          {/* name badge */}
          <div className={`absolute bottom-3 left-3 sm:bottom-5 sm:left-5
                           bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2
                           rounded-lg border border-stone-200/40 shadow-sm z-10
                           transition-all duration-300
                           ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <span className="text-[9px] sm:text-[11px] font-bold tracking-wider text-amber-900 uppercase">
              {activeProduct.name}
            </span>
          </div>
        </div>

        {/* RIGHT: selection rack */}
        <div
          ref={refRack}
          className="order-3 lg:col-span-3 w-full
                     flex flex-row lg:flex-col gap-3
                     overflow-x-auto lg:overflow-y-auto
                     lg:h-[540px]
                     pb-2 lg:pb-0 px-0.5 lg:px-0
                     snap-x snap-mandatory lg:snap-none
                     scrollbar-none"
        >
          {Object.values(apparelDatabase).map((item, i) => {
            const selected = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => handleApparelSwitch(item.id)}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`flex-row items-center justify-between
                             p-3 sm:p-3.5 rounded-xl cursor-pointer
                             transition-all duration-300 ease-out
                             border text-left shrink-0
                             w-[200px] xs:w-[230px] sm:w-[260px] lg:w-full
                             snap-start
                             outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50
                             active:scale-95
                             flex
                             ${selected
                    ? 'bg-[#1e1410] border-[#1e1410] shadow-xl text-white scale-[1.02]'
                    : 'bg-white hover:bg-stone-50 border-stone-200/70 text-stone-800 hover:border-amber-200 hover:shadow-md hover:scale-[1.015]'
                  }`}
              >
                <div className="flex-1 min-w-0 pr-2 space-y-0.5">
                  <p className={`text-[8px] sm:text-[9px] font-semibold tracking-widest uppercase truncate
                                 ${selected ? 'text-amber-400' : 'text-stone-400'}`}>
                    Apparel
                  </p>
                  <h4 className="text-xs sm:text-sm font-bold tracking-wide truncate leading-snug">
                    {item.name}
                  </h4>
                </div>

                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden
                                 flex items-center justify-center shrink-0
                                 border transition-all duration-300
                                 ${selected ? 'bg-white border-white/20' : 'bg-stone-50 border-stone-200/30 shadow-inner'}`}>
                  <img
                    src={item.flatImage}
                    alt={item.name}
                    className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-300
                                ${selected ? 'mix-blend-normal' : 'mix-blend-darken'}`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* ── Divider ── */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <hr className="border-stone-200/60" />
      </div>

      <CustomShowcase />

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <hr className="border-stone-200/60" />
      </div>

      <CustomBanner />
    </div>
  );
};

/* ══════════════════════════════════════════
   TEMPLATE SHOWCASE
══════════════════════════════════════════ */
const CustomShowcase = () => {
  const titleRef = useFadeInUp(0);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      <div ref={titleRef} className="flex items-end justify-between mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-2xl font-black text-stone-900 tracking-tight">
          Free design templates
        </h2>
      </div>

      {/* Mobile: horizontal scroll; sm+: 2-col; lg: 4-col */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-3
                      sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0
                      lg:grid-cols-4">

        {collectionsData.map((item, i) => (
          <CollectionCard key={item.id} item={item} delay={i * 80} />
        ))}

        {/* +28 card */}
        <div className="group cursor-pointer shrink-0 w-[220px] snap-start
                        sm:w-auto sm:flex sm:flex-col">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden
                          grid grid-cols-2 gap-2 p-2 bg-[#1e1410]
                          shadow-md border border-stone-900
                          transition-transform duration-300 group-hover:scale-[1.015]">
            <div className="grid grid-rows-2 gap-2 opacity-20">
              <div className="bg-stone-400 rounded-lg" />
              <div className="bg-stone-400 rounded-lg" />
            </div>
            <div className="bg-stone-400 rounded-lg opacity-20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
              <span className="text-3xl sm:text-4xl font-black tracking-tight
                               text-amber-400 group-hover:scale-110 transition-transform duration-300">
                +28
              </span>
              <span className="text-[9px] sm:text-xs font-bold tracking-widest uppercase mt-1 text-stone-300">
                Collections
              </span>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 h-[38px] hidden sm:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

const CollectionCard = ({ item, delay }) => {
  const ref = useFadeInUp(delay);
  return (
    <div ref={ref} className="group cursor-pointer shrink-0 w-[220px] snap-start sm:w-auto">
      <div className="aspect-[4/3] w-full bg-stone-100 rounded-2xl overflow-hidden p-2
                      grid grid-cols-2 gap-2
                      border border-stone-200/30 shadow-sm
                      transition-all duration-300 ease-out
                      group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-stone-200">
        <div className="grid grid-rows-2 gap-2">
          {[0, 1].map(n => (
            <div key={n} className="bg-stone-200 rounded-lg overflow-hidden">
              <img src={item.images[n]} alt="" className="w-full h-full object-cover mix-blend-darken
                                                           transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
        <div className="bg-stone-200 rounded-lg overflow-hidden">
          <img src={item.images[2]} alt="" className="w-full h-full object-cover mix-blend-darken
                                                       transition-transform duration-500 group-hover:scale-105" />
        </div>
      </div>
      <div className="mt-3 sm:mt-4 px-0.5">
        <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-tight
                       group-hover:text-amber-800 transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-stone-400 mt-0.5 font-semibold tracking-wide">
          {item.count}
        </p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   HERO BANNER
══════════════════════════════════════════ */
const CustomBanner = () => {
  const imgRef = useFadeInUp(0);
  const copyRef = useFadeInUp(100);

  return (
    <div className="w-full">
      <section className="w-full bg-[#F4F4F4] py-10 sm:py-14 lg:py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* image */}
          <div ref={imgRef} className="flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none
                            transition-all duration-700 hover:-translate-y-2 hover:drop-shadow-2xl">
              <img
                src={BannerImage}
                alt="Customize your jersey"
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* copy */}
          <div ref={copyRef} className="flex flex-col gap-4 sm:gap-5 order-1 md:order-2
                                         text-center md:text-left items-center md:items-start
                                         max-w-lg mx-auto md:mx-0">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold
                            tracking-[0.18em] text-amber-700 uppercase
                            bg-amber-50 border border-amber-200/60 px-3 py-1.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5" /> Custom Jerseys
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold
                            text-[#111111] leading-[1.12] tracking-tight">
              Customize Your Own<br className="hidden sm:block" />
              <span className="text-amber-700"> Jersey</span> In Every Sport
            </h1>

            <p className="text-sm sm:text-base text-[#666] leading-relaxed font-light max-w-sm md:max-w-none">
              Legends wear their own design. Customize your team's jersey with your
              own colors and logos for a powerhouse look that rules the field.
            </p>

            <button className="group mt-1 flex items-center gap-2.5
                               bg-[#936A3A] hover:bg-[#6D4F2B] text-white
                               font-semibold text-sm sm:text-base
                               px-7 py-3 sm:py-3.5 rounded-lg
                               shadow-md hover:shadow-xl hover:shadow-amber-900/20
                               transition-all duration-300 active:scale-95">
              Let's Do It
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <CoustomProduct />
    </div>
  );
};

export default Coustom;