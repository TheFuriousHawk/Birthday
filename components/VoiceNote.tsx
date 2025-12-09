import React, { useState, useRef, useEffect } from 'react';
import { VoiceClip } from '../types';

interface VoiceNoteProps {
  clip: VoiceClip;
}

const VoiceNote: React.FC<VoiceNoteProps> = ({ clip }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(clip.url);
    
    audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [clip.url]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.error("Audio play failed", e);
        // Optional: Show UI feedback for missing file
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group flex items-center gap-3 bg-white/50 hover:bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/60 shadow-sm transition-all duration-300">
      <button
        onClick={togglePlay}
        className={`
          w-10 h-10 flex items-center justify-center rounded-full text-white shadow-md transition-all duration-300
          ${isPlaying ? 'bg-indigo-500 scale-105' : 'bg-indigo-400 group-hover:bg-indigo-500'}
        `}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
           <span className="text-xs font-bold text-gray-700 uppercase tracking-wide truncate">{clip.label}</span>
           <span className="text-[10px] font-mono text-gray-500">{clip.duration}</span>
        </div>
        
        {/* Fake Waveform / Progress Bar */}
        <div className="h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-indigo-500 rounded-full transition-all duration-[200ms] ${isPlaying ? 'animate-[pulse_1s_infinite] w-full opacity-80' : 'w-0'}`}
            style={{ width: isPlaying ? '100%' : '0%' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default VoiceNote;