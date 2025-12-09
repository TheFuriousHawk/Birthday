import React, { useEffect, useState, useRef } from 'react';
import { Season } from './types';
import { COLORS, STORY_CHAPTERS } from './constants';
import Hero from './components/Hero';
import Chapter from './components/Chapter';
import FinalGarden from './components/FinalGarden';
import ParticleCanvas from './components/ParticleCanvas';
import BackgroundMusic from './components/BackgroundMusic';

const App: React.FC = () => {
  const [season, setSeason] = useState<Season>(Season.WINTER);
  const [triggerExplosion, setTriggerExplosion] = useState(false);
  
  // 0.0 = Full Winter, 1.0 = Full Spring
  const [transitionProgress, setTransitionProgress] = useState(0);
  const requestRef = useRef<number>(0);
  const transitionStartTime = useRef<number>(0);
  const startTransitionValue = useRef<number>(0);

  // Ref for the transition point element
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger transition when the marker moves upwards past the viewport top area
        if (entry.boundingClientRect.top < window.innerHeight * 0.5) {
            setSeason(Season.SPRING);
        } else {
            setSeason(Season.WINTER);
        }
      },
      { 
        threshold: 0,
        // Trigger slightly earlier to allow smooth fade before full reveal
        rootMargin: "0px 0px -20% 0px" 
      }
    );

    if (transitionRef.current) {
      observer.observe(transitionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth interpolation loop for theme transition
  useEffect(() => {
    const targetValue = season === Season.SPRING ? 1 : 0;
    const duration = 1000; // 1 second smooth transition
    
    transitionStartTime.current = performance.now();
    startTransitionValue.current = transitionProgress;

    const animate = (time: number) => {
      const elapsed = time - transitionStartTime.current;
      const t = Math.min(1, elapsed / duration);
      
      // Linear interpolation for predictable color mixing
      const current = startTransitionValue.current + (targetValue - startTransitionValue.current) * t;
      
      setTransitionProgress(current);

      if (t < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        setTransitionProgress(targetValue);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [season]);

  const handleMakeWish = () => {
    setTriggerExplosion(true);
    setTimeout(() => setTriggerExplosion(false), 3000);
  };

  const themeColors = season === Season.WINTER ? COLORS.winter : COLORS.spring;

  return (
    <div 
      className="relative min-h-screen font-sans overflow-x-hidden"
      style={{ 
        // Use a blended background color for the root to avoid white flashes
        backgroundColor: transitionProgress > 0.5 ? COLORS.spring.bg : COLORS.winter.bg,
        color: themeColors.text
      }}
    >
      {/* 
        Fixed Background Layers with smooth opacity control 
        z-0 ensures they are at the very back.
      */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[#0B1120] will-change-transform" 
        style={{ opacity: 1 - transitionProgress }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[#FFF0F5] will-change-transform" 
        style={{ opacity: transitionProgress }}
      />

      {/* Global Music Controller */}
      <BackgroundMusic />

      {/* 
        Canvas Layer 
        z-50 places it above all background images (Hero, FinalGarden) so particles are always visible.
        pointer-events-none ensures it doesn't block scrolling or clicking.
      */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <ParticleCanvas transitionProgress={transitionProgress} triggerExplosion={triggerExplosion} />
      </div>

      {/* Main Content - z-10 ensures it sits above the base color layers */}
      <main className="relative z-10">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 md:px-0 relative">
          {/* Winter Chapters */}
          <Chapter data={STORY_CHAPTERS[0]} index={0} />
          <Chapter data={STORY_CHAPTERS[1]} index={1} />

          {/* 
            Transition Trigger Point 
            Logical marker for the intersection observer
          */}
          <div ref={transitionRef} className="h-1 w-full pointer-events-none opacity-0" aria-hidden="true" />

          {/* Spring Chapters */}
          <Chapter data={STORY_CHAPTERS[2]} index={2} />
          <Chapter data={STORY_CHAPTERS[3]} index={3} />
        </div>

        <FinalGarden onMakeWish={handleMakeWish} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-10 text-sm transition-colors duration-1000" style={{ color: transitionProgress > 0.5 ? 'rgba(136, 19, 55, 0.6)' : '#075985' }}>
        <p className="font-serif italic">&copy; {new Date().getFullYear()} Made with ❤️ for Manyu</p>
      </footer>
    </div>
  );
};

export default App;