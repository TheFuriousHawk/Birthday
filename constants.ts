import { ParticleConfig, StoryChapterData } from './types';

export const COLORS = {
  winter: {
    bg: '#0B1120', // Deep midnight blue for contrast
    secondary: '#1E293B', 
    accent: '#38BDF8', // Bright ice blue
    text: '#E2E8F0', // Light text for dark background
  },
  spring: {
    bg: '#FFF0F5', // Lavender Blush
    secondary: '#FFE4E1', // Misty Rose
    accent: '#FF69B4', // Hot Pink for accents
    text: '#4A0404', // Deep warm brown/red
  }
};

export const CONFIG = {
  backgroundMusic: '/assets/background_music.mp3', // Place your music file in public/assets/
  youtubeLink: 'https://www.youtube.com/watch?v=5u4xTa3LR2U&list=RD5u4xTa3LR2U&start_radio=1'
};

export const IMAGES = {
  heroWinter: "https://images.unsplash.com/photo-1483664852095-d6cc68707056?q=80&w=1920&auto=format&fit=crop",
  chapter1: "https://images.unsplash.com/photo-1516728778615-2d590ea1855e?q=80&w=800&auto=format&fit=crop",
  chapter2: "https://images.unsplash.com/photo-1486328228599-85db4443971f?q=80&w=800&auto=format&fit=crop",
  chapter3: "https://images.unsplash.com/photo-1462275646964-a0e338679c1e?q=80&w=800&auto=format&fit=crop",
  chapter4: "https://images.unsplash.com/photo-1490750967868-58cb75065ed2?q=80&w=800&auto=format&fit=crop",
  // New grander spring image (Cherry Blossom Avenue)
  finalGarden: "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1920&auto=format&fit=crop",
};

export const STORY_CHAPTERS: StoryChapterData[] = [
  {
    id: 1,
    title: "Chapter 1: The First Snowflake",
    text: "Remembering the quiet mornings when the world felt huge and full of wonder. A single snowflake started it all, drifting silently from the grey sky to rest upon your mitten.",
    image: IMAGES.chapter1
  },
  {
    id: 2,
    title: "Chapter 2: Through the Frost",
    text: "Even in the coldest moments, there was a beauty in resilience. The intricate frost patterns on the window pane told stories of strength, of enduring the chill to protect the warmth inside.",
    image: IMAGES.chapter2
  },
  {
    id: 3,
    title: "Chapter 3: The Gentle Thaw",
    text: "Something changed in the air. The ice began to melt, revealing the promise of green returning to the earth. Listen closely, can you hear the change?",
    image: IMAGES.chapter3,
    voiceClips: [
      {
        id: 'msg1',
        label: 'A memory from winter',
        url: '/assets/voice_note_1.mp3', // Place file in public/assets/
        duration: '0:12'
      },
      {
        id: 'msg2',
        label: 'The sound of spring',
        url: '/assets/voice_note_2.mp3', // Place file in public/assets/
        duration: '0:08'
      }
    ]
  },
  {
    id: 4,
    title: "Chapter 4: In Full Bloom",
    text: "Color burst forth, painting the world in warmth. It was no longer just survival; it was a celebration of life, laughter, and the beautiful journey ahead.",
    image: IMAGES.chapter4
  }
];

export const WINTER_PARTICLES: ParticleConfig = {
  count: 200, 
  speedMin: 1,
  speedMax: 4,
  sizeMin: 2,
  sizeMax: 5,
  wind: 0.5
};

export const SPRING_PARTICLES: ParticleConfig = {
  count: 120,
  speedMin: 1.5,
  speedMax: 5,
  sizeMin: 8,
  sizeMax: 15,
  wind: 1.5
};