// Core data type definitions for DJ JOEL website

export interface Track {
  id: string | number;
  title: string;
  cover: string;
  src: string;
  duration: number;
  artist?: string;
  album?: string;
  isExclusive?: boolean;
  downloadUrl?: string;
  year?: number;
}

export interface Album {
  id: string;
  title: string;
  art: string;
  tracks: Track[];
  year: number;
  type: 'album' | 'ep' | 'single';
  streamingLinks?: {
    spotify?: string;
    apple?: string;
    youtube?: string;
    soundcloud?: string;
  };
}

export interface TourShow {
  id: string;
  date: string;
  city: string;
  venue: string;
  country: string;
  ticketUrl?: string;
  status: 'upcoming' | 'past' | 'cancelled' | 'sold-out';
  time?: string;
  description?: string;
  supportingActs?: string[];
  price?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: 'performance' | 'lifestyle' | 'studio';
  description?: string;
  date?: string;
  location?: string;
  title?: string;
  url?: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
  platform: 'youtube' | 'vimeo';
  duration?: number;
  category?: 'music-video' | 'live-performance' | 'behind-the-scenes' | 'interview';
  description?: string;
  views?: number;
  publishedAt?: string;
  youtubeUrl?: string;
  date?: string;
  url?: string;
}

// Local storage interfaces
export interface ExclusiveAccess {
  hasAccess: boolean;
  timestamp: number;
  deviceId: string;
}

export interface PlayerState {
  currentTrack: number;
  playlist: Track[];
  isPlaying: boolean;
  volume: number;
  shuffle: boolean;
  loop: 'none' | 'track' | 'playlist';
}