import React from 'react';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import ContactUsImg1 from '../assets/ContactUsImg1.png';
import LogoForContactUs from '../assets/LogoForContactUs.png';

const ContactUs = () => {
  return (
    <div className="w-full bg-white font-sans antialiased selection:bg-amber-200">
      
      {/* --- HERO SECTION --- */}
      <div 
        className="relative h-[420px] w-full bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `url('${ContactUsImg1}')` 
        }}
      >
        <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-sm">
          Contact Us
        </h1>
      </div>

      {/* --- FLOATING CARD CONTAINER --- */}
      <div className="max-w-5xl mx-auto px-4 -mt-24 relative z-10 mb-16">
        <div className="bg-white rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
          
          {/* Left Column: Info Side */}
          <div className="md:w-[45%] bg-gradient-to-b from-[#5c3a1a] to-[#b8732a] p-8 md:p-10 flex flex-col justify-between text-white">
            <div>
              {/* Logo / Brand Name */}
              <div className="mb-6">
                <img src={LogoForContactUs} alt="Mojilo Mart Logo" className="w-32 h-auto" />
              </div>
              
              <p className="text-xs md:text-sm text-amber-100/80 leading-relaxed mb-10 font-light max-w-sm">
                We are committed to processing the information in order to contact you and talk about your order.
              </p>
              
              {/* Contact Information Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-amber-200/90 shrink-0 mt-0.5" />
                  <a href="mailto:mojilomart@gmail.com" className="text-sm tracking-wide hover:underline text-amber-50">
                    mojilomart@gmail.com
                  </a>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-amber-200/90 shrink-0 mt-0.5" />
                  <p className="text-sm tracking-wide text-amber-50 leading-snug">
                    149, First Floor, Avadh Viceroy, Near D-Mart,<br />
                    Sarthana Jakatnaka, Surat, Gujarat<br />
                    395006
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-amber-200/90 shrink-0 mt-0.5" />
                  <a href="tel:+91" className="text-sm tracking-wide hover:underline text-amber-50">
                    +91
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Side */}
          <div className="md:w-[55%] bg-white p-8 md:p-12 flex flex-col justify-center">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <input 
                  type="text" 
                  placeholder="Name*" 
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:outline-none focus:border-amber-700 transition-colors placeholder-gray-400"
                />
              </div>
              
              <div>
                <input 
                  type="email" 
                  placeholder="Email*" 
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:outline-none focus:border-amber-700 transition-colors placeholder-gray-400"
                />
              </div>
              
              <div>
                <input 
                  type="url" 
                  placeholder="Website*" 
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:outline-none focus:border-amber-700 transition-colors placeholder-gray-400"
                />
              </div>
              
              <div>
                <textarea 
                  rows="4" 
                  placeholder="Message"
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:outline-none focus:border-amber-700 transition-colors placeholder-gray-400 resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="cursor-pointer w-full py-3 bg-gradient-to-r from-[#965a1d] to-[#63390f] hover:from-[#824e19] hover:to-[#54300c] text-white text-sm font-medium rounded shadow transition-all duration-200 active:scale-[0.99]"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* --- MAP EMBED SECTION --- */}
      <div className="w-full h-[450px] bg-gray-100 relative border-t border-gray-200 overflow-hidden">
        {/* Dynamic Interactive Google Map pointing precisely to Avadh Viceroy, Surat */}
        <iframe 
          title="Avadh Viceroy Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20441.669612023707!2d72.8872438192831!3d21.2121057605617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be045f4b61ead47%3A0x8b235392ebd116f4!2sAvadh%20Viceroy!5e0!3m2!1sen!2sin!4v1781328884856!5m2!1sen!2sin" 
          className="w-full h-full border-0 grayscale-[10%] contrast-[110%]"
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
};

export default ContactUs;
