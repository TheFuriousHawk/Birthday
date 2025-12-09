import React, { useState, useRef, useEffect } from 'react';
import { CONFIG } from '../constants';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(CONFIG.backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Set initial volume to 40%

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.error("Autoplay prevented:", e);
        alert("Please interact with the page first to play audio!");
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={toggleMusic}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-lg border border-white/30 shadow-lg transition-all duration-300
          ${isPlaying ? 'bg-white/80 text-gray-800' : 'bg-black/30 text-white hover:bg-black/50'}
        `}
      >
        {isPlaying ? (
           <svg className="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
           </svg>
        ) : (
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
           </svg>
        )}
        <span className="text-xs font-bold uppercase tracking-wider hidden md:block">
          {isPlaying ? "Music On" : "Music Off"}
        </span>
      </button>
    </div>
  );
};

export default BackgroundMusic;