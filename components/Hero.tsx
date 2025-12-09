import React from 'react';
import { IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B1120]">
      {/* Background with Ken Burns effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 animate-[kenburns_25s_ease-out_infinite_alternate]"
        style={{ 
          backgroundImage: `url(${IMAGES.heroWinter})`,
          filter: 'brightness(0.6) contrast(1.1)' 
        }}
      />
      
      {/* Internal Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-[#0B1120]/50 z-0" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0B1120_100%)] opacity-60" />

      {/* Seamless Transition Fader (Bottom) - Blends image into the dark body background */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/80 to-transparent z-10 pointer-events-none" />

      {/* Glass Panel Content */}
      <div className="relative z-10 px-4 w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="glass-panel p-10 md:p-20 rounded-[3rem] text-center transform transition-all duration-700 animate-[fadeInUp_1.5s_ease-out] border border-white/20 shadow-[0_0_50px_rgba(56,189,248,0.2)]">
          
          <div className="mb-6">
             <span className="inline-block py-2 px-6 rounded-full bg-white/10 border border-white/30 text-sky-200 text-sm font-bold tracking-[0.3em] uppercase backdrop-blur-md shadow-lg">
               Let the Magic Begin
             </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-lg mb-4 leading-tight tracking-wide">
            HAPPY BIRTHDAY
          </h1>
          
          <div className="relative inline-block my-2">
            <span className="font-handwriting text-6xl md:text-[8rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-purple-300 relative z-10 block animate-[pulse_3s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              MANYAAAAAAAA
            </span>
          </div>

          <p className="text-lg md:text-2xl text-sky-100/90 font-light italic mt-8 max-w-2xl mx-auto leading-relaxed">
            "From the silent chill of winter snow<br className="hidden md:block"/> to the wild laughter of spring bloom."
          </p>
        </div>
      </div>
        
      {/* Scroll Indicator - Fixed Centering */}
      <div className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-center gap-3 opacity-80 animate-bounce z-20 pointer-events-none">
        <span className="text-xs font-bold text-sky-200 uppercase tracking-[0.3em] shadow-black drop-shadow-md whitespace-nowrap">
          Please scroll birthday girl
        </span>
        <div className="w-[2px] h-16 bg-gradient-to-b from-sky-400 to-transparent shadow-[0_0_10px_#38BDF8]"></div>
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;