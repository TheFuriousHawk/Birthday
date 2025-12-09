export interface VoiceClip {
  id: string;
  url: string;
  label: string;
  duration?: string; // e.g., "0:15"
}

export interface StoryChapterData {
  id: number;
  title: string;
  text: string;
  image: string;
  voiceClips?: VoiceClip[];
}

export enum Season {
  WINTER = 'WINTER',
  SPRING = 'SPRING'
}

export interface ParticleConfig {
  count: number;
  speedMin: number;
  speedMax: number;
  sizeMin: number;
  sizeMax: number;
  wind: number;
}
