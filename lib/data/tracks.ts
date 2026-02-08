import { Track } from '../types';

export const singles: Track[] = [
  {
    id: 1,
    title: 'Neon Nights (Intro)',
    cover: '/hero/j15.JPG.jpeg',
    src: '/audio/neon-nights-intro.mp3',
    duration: 148,
    artist: 'DJ JOEL'
  },
  {
    id: 2,
    title: 'Midnight Pulse',
    cover: '/hero/j16.JPG.jpeg',
    src: '/audio/midnight-pulse.mp3',
    duration: 203,
    artist: 'DJ JOEL'
  },
  {
    id: 3,
    title: 'Red Room',
    cover: '/hero/j17.JPG.jpeg',
    src: '/audio/red-room.mp3',
    duration: 187,
    artist: 'DJ JOEL'
  }
];

export const exclusiveTracks: Track[] = [
  {
    id: 'exclusive-1',
    title: 'Midnight Pulse (VIP Mix)',
    cover: '/hero/j18.JPG.jpeg',
    src: '/audio/midnight-pulse.mp3',
    duration: 267,
    artist: 'DJ JOEL',
    isExclusive: true
  },
  {
    id: 'exclusive-2',
    title: 'Red Room (Unreleased)',
    cover: '/hero/j19.JPG.jpeg',
    src: '/audio/red-room.mp3',
    duration: 198,
    artist: 'DJ JOEL',
    isExclusive: true
  },
  {
    id: 'exclusive-3',
    title: 'Neon Nights (Extended)',
    cover: '/hero/j20.JPG.jpeg',
    src: '/audio/neon-nights-intro.mp3',
    duration: 312,
    artist: 'DJ JOEL',
    isExclusive: true
  }
];

export const allTracks: Track[] = [...singles, ...exclusiveTracks];