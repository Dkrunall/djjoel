import { Track } from '../types';

export const singles: Track[] = [
  {
    id: 1,
    title: 'Neon Nights (Intro)',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop',
    src: '/audio/neon-nights-intro.mp3',
    duration: 148,
    artist: 'DJ JOEL'
  },
  {
    id: 2,
    title: 'Midnight Pulse',
    cover: 'https://images.unsplash.com/photo-1520975922215-230f3c1f5d2e?w=400&h=400&fit=crop',
    src: '/audio/midnight-pulse.mp3',
    duration: 203,
    artist: 'DJ JOEL'
  },
  {
    id: 3,
    title: 'Red Room',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    src: '/audio/red-room.mp3',
    duration: 187,
    artist: 'DJ JOEL'
  }
];

export const exclusiveTracks: Track[] = [
  {
    id: 'exclusive-1',
    title: 'Midnight Pulse (VIP Mix)',
    cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    src: '/audio/midnight-pulse.mp3',
    duration: 267,
    artist: 'DJ JOEL',
    isExclusive: true
  },
  {
    id: 'exclusive-2',
    title: 'Red Room (Unreleased)',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    src: '/audio/red-room.mp3',
    duration: 198,
    artist: 'DJ JOEL',
    isExclusive: true
  },
  {
    id: 'exclusive-3',
    title: 'Neon Nights (Extended)',
    cover: 'https://images.unsplash.com/photo-1526481280698-8fcc13fd6ae0?w=400&h=400&fit=crop',
    src: '/audio/neon-nights-intro.mp3',
    duration: 312,
    artist: 'DJ JOEL',
    isExclusive: true
  }
];

export const allTracks: Track[] = [...singles, ...exclusiveTracks];