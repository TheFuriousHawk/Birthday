import React, { useEffect, useRef, useState } from 'react';
import { StoryChapterData } from '../types';
import VoiceNote from './VoiceNote';

interface ChapterProps {
  data: StoryChapterData;
  index: number;
}

const Chapter: React.FC<ChapterProps> = ({ data, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Theme logic: Chapters 1 & 2 are Winter, 3 & 4 are Spring
  const isWinter = index < 2;

  // Icons for visual interest
  const getIcon = () => {
    if (index === 0) return (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ); 
    if (index === 1) return (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ); 
    if (index === 2) return (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ); 
    return (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    ); 
  };

  return (
    <section 
      ref={ref}
      className={`min-h-[80vh] flex items-center justify-center p-6 relative transition-all duration-1000 ease-out`}
    >
      <div 
        className={`max-w-4xl w-full flex flex-col items-center justify-center will-change-transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} transition-all duration-1000`}
      >
        
        <div 
          className={`
            relative w-full p-10 md:p-20 rounded-[4rem] shadow-2xl text-center
            transition-all duration-700 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]
            ${isWinter 
              ? 'card-winter text-sky-50' 
              : 'card-spring text-rose-950'}
          `}
        >
          {/* Animated Icon Header */}
          <div className={`
             absolute -top-10 left-1/2 transform -translate-x-1/2
             w-20 h-20 rounded-full flex items-center justify-center
             shadow-lg animate-[float_4s_ease-in-out_infinite]
             ${isWinter ? 'bg-sky-950 border border-sky-400 text-sky-200' : 'bg-rose-50 border border-rose-300 text-rose-500'}
          `}>
             {getIcon()}
          </div>

          <div className="mt-8 mb-6 flex flex-col items-center gap-4">
            <span className={`text-sm tracking-[0.5em] uppercase font-bold opacity-70 ${isWinter ? 'text-sky-300' : 'text-rose-500'}`}>
              Chapter 0{data.id}
            </span>
            <h2 className={`text-4xl md:text-6xl font-serif font-medium leading-tight drop-shadow-sm ${isWinter ? 'text-white' : 'text-rose-900'}`}>
              {data.title}
            </h2>
          </div>
          
          <div className={`w-24 h-[1px] mx-auto mb-8 ${isWinter ? 'bg-sky-500/50' : 'bg-rose-400/50'}`}></div>

          <p className={`text-xl md:text-3xl leading-relaxed font-light italic max-w-2xl mx-auto ${isWinter ? 'text-sky-100/90' : 'text-rose-900/80'}`}>
            "{data.text}"
          </p>

          {/* Voice Clips */}
          {data.voiceClips && data.voiceClips.length > 0 && (
            <div className={`mt-12 pt-8 border-t max-w-md mx-auto ${isWinter ? 'border-sky-500/20' : 'border-rose-900/10'}`}>
              <p className={`text-xs font-bold mb-6 uppercase tracking-widest flex items-center justify-center gap-2 ${isWinter ? 'text-sky-300' : 'text-rose-500'}`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                Audio Memories
              </p>
              <div className="space-y-4">
                {data.voiceClips.map(clip => (
                  <VoiceNote key={clip.id} clip={clip} />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, 0px); }
          50% { transform: translate(-50%, -10px); }
        }
      `}</style>
    </section>
  );
};

export default Chapter;