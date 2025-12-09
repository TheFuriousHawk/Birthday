import React, { useState } from 'react';
import { IMAGES, CONFIG } from '../constants';

interface FinalGardenProps {
  onMakeWish: () => void;
}

const FinalGarden: React.FC<FinalGardenProps> = ({ onMakeWish }) => {
  const [wished, setWished] = useState(false);

  const handleWish = () => {
    setWished(true);
    onMakeWish();
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#FFF0F5]">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 z-0"
        style={{ backgroundImage: `url(${IMAGES.finalGarden})` }}
      />
      
      {/* Smooth Entry Transition (Top) - Blends from the Pink Spring Background */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#FFF0F5] via-[#FFF0F5]/80 to-transparent z-10 pointer-events-none" />

      {/* Internal overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-white/10 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center p-6 w-full max-w-4xl flex flex-col items-center justify-center">
        
        <div className={`transition-all duration-1000 ease-out transform ${wished ? '-translate-y-8' : 'translate-y-0'}`}>
          <h2 className="font-handwriting text-7xl md:text-9xl text-[#d45d79] mb-4 drop-shadow-sm animate-[float_6s_ease-in-out_infinite]">
            Bloom & Grow
          </h2>
          <p className="text-xl md:text-3xl text-[#5d4037] mb-10 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm bg-white/30 backdrop-blur-sm p-4 rounded-xl">
            Wishing you a year filled with sunlight, laughter, and endless beautiful moments.
          </p>
          
          <button
            onClick={handleWish}
            disabled={wished}
            className={`
              relative group px-12 py-5 rounded-full text-xl font-bold tracking-widest uppercase transition-all duration-500 shadow-xl
              ${wished 
                ? 'bg-[#C6E7C5] text-[#3e2723] cursor-default ring-4 ring-[#C6E7C5]/50 scale-110' 
                : 'bg-gradient-to-r from-[#ff9a9e] to-[#fecfef] text-white hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95'}
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {wished ? (
                <>✨ Wish Granted ✨</>
              ) : (
                <>Make a Wish <span className="group-hover:rotate-12 transition-transform duration-300">🌸</span></>
              )}
            </span>
          </button>
        </div>

        {/* Surprise Reveal */}
        <div 
          className={`
            mt-8 w-full max-w-md transition-all duration-1000 ease-in-out overflow-hidden
            ${wished ? 'opacity-100 max-h-80 translate-y-0' : 'opacity-0 max-h-0 translate-y-20'}
          `}
        >
          <div className="glass-panel p-6 rounded-2xl mx-auto transform transition-transform hover:scale-105 duration-300 cursor-pointer bg-white/60">
            <a 
              href={CONFIG.youtubeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-5 group"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg flex-shrink-0 bg-black">
                <img 
                  src={`https://img.youtube.com/vi/${CONFIG.youtubeLink.split('v=')[1]?.split('&')[0]}/0.jpg`} 
                  alt="Song Thumbnail" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                     <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
              
              <div className="text-left flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Your Birthday Song</p>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#d45d79] transition-colors leading-tight">
                  Play Special Video
                </h3>
                <p className="text-xs text-gray-400 mt-1">Click to listen on YouTube</p>
              </div>
            </a>
          </div>
        </div>

      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default FinalGarden;