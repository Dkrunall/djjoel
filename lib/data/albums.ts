import { Album, Track } from '../types';

export const albums: Album[] = [
  {
    id: 'midnight-sessions',
    title: 'Midnight Sessions',
    art: 'https://images.unsplash.com/photo-1520975922215-230f3c1f5d2e?w=600&h=600&fit=crop',
    year: 2024,
    type: 'ep',
    tracks: [
      {
        id: 'ms-1',
        title: 'Midnight Protocol',
        cover: 'https://images.unsplash.com/photo-1520975922215-230f3c1f5d2e?w=400&h=400&fit=crop',
        src: '/audio/albums/midnight-sessions/midnight-protocol.mp3',
        duration: 245,
        artist: 'DJ JOEL',
        album: 'Midnight Sessions'
      },
      {
        id: 'ms-2',
        title: 'Shadow Dance',
        cover: 'https://images.unsplash.com/photo-1520975922215-230f3c1f5d2e?w=400&h=400&fit=crop',
        src: '/audio/albums/midnight-sessions/shadow-dance.mp3',
        duration: 198,
        artist: 'DJ JOEL',
        album: 'Midnight Sessions'
      },
      {
        id: 'ms-3',
        title: 'Digital Dreams',
        cover: 'https://images.unsplash.com/photo-1520975922215-230f3c1f5d2e?w=400&h=400&fit=crop',
        src: '/audio/albums/midnight-sessions/digital-dreams.mp3',
        duration: 223,
        artist: 'DJ JOEL',
        album: 'Midnight Sessions'
      },
      {
        id: 'ms-4',
        title: 'Neon Afterglow',
        cover: 'https://images.unsplash.com/photo-1520975922215-230f3c1f5d2e?w=400&h=400&fit=crop',
        src: '/audio/albums/midnight-sessions/neon-afterglow.mp3',
        duration: 267,
        artist: 'DJ JOEL',
        album: 'Midnight Sessions'
      }
    ]
  },
  {
    id: 'electric-nights',
    title: 'Electric Nights',
    art: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop',
    year: 2023,
    type: 'album',
    tracks: [
      {
        id: 'en-1',
        title: 'Electric Pulse (Album Version)',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        src: '/audio/albums/electric-nights/electric-pulse-album.mp3',
        duration: 201,
        artist: 'DJ JOEL',
        album: 'Electric Nights'
      },
      {
        id: 'en-2',
        title: 'Voltage',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        src: '/audio/albums/electric-nights/voltage.mp3',
        duration: 189,
        artist: 'DJ JOEL',
        album: 'Electric Nights'
      },
      {
        id: 'en-3',
        title: 'Circuit Breaker',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        src: '/audio/albums/electric-nights/circuit-breaker.mp3',
        duration: 234,
        artist: 'DJ JOEL',
        album: 'Electric Nights'
      },
      {
        id: 'en-4',
        title: 'Power Grid',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        src: '/audio/albums/electric-nights/power-grid.mp3',
        duration: 278,
        artist: 'DJ JOEL',
        album: 'Electric Nights'
      },
      {
        id: 'en-5',
        title: 'Static Storm',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        src: '/audio/albums/electric-nights/static-storm.mp3',
        duration: 256,
        artist: 'DJ JOEL',
        album: 'Electric Nights'
      },
      {
        id: 'en-6',
        title: 'Blackout',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        src: '/audio/albums/electric-nights/blackout.mp3',
        duration: 312,
        artist: 'DJ JOEL',
        album: 'Electric Nights'
      }
    ]
  },
  {
    id: 'synthwave-collection',
    title: 'Synthwave Collection',
    art: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop',
    year: 2024,
    type: 'ep',
    tracks: [
      {
        id: 'sw-1',
        title: 'Retro Future',
        cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
        src: '/audio/albums/synthwave-collection/retro-future.mp3',
        duration: 213,
        artist: 'DJ JOEL',
        album: 'Synthwave Collection'
      },
      {
        id: 'sw-2',
        title: 'Neon Highway',
        cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
        src: '/audio/albums/synthwave-collection/neon-highway.mp3',
        duration: 187,
        artist: 'DJ JOEL',
        album: 'Synthwave Collection'
      },
      {
        id: 'sw-3',
        title: 'Chrome Dreams',
        cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
        src: '/audio/albums/synthwave-collection/chrome-dreams.mp3',
        duration: 245,
        artist: 'DJ JOEL',
        album: 'Synthwave Collection'
      }
    ]
  }
];