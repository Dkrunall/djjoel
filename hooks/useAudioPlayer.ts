'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Track } from '@/lib/types';
import { getPlayerState, savePlayerState } from '@/lib/utils/storage';

interface UseAudioPlayerReturn {
  currentTrack: Track | null;
  currentTrackIndex: number;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  loopMode: 'none' | 'track' | 'playlist';
  progress: number;
  playTrack: (track: Track, index?: number) => void;
  pauseTrack: () => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  setTracks: (tracks: Track[]) => void;
}

export function useAudioPlayer(initialTracks: Track[] = []): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tracks, setTracksState] = useState<Track[]>(initialTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [loopMode, setLoopMode] = useState<'none' | 'track' | 'playlist'>('none');

  const currentTrack = tracks[currentTrackIndex] || null;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      
      // Load saved state
      const savedState = getPlayerState();
      if (savedState) {
        setCurrentTrackIndex(savedState.currentTrack || 0);
        setVolumeState(savedState.volume || 1);
        setIsShuffled(savedState.shuffle || false);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      if (loopMode === 'track') {
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
      } else if (loopMode === 'playlist' || currentTrackIndex < tracks.length - 1) {
        nextTrack();
      }
    };
    const handleError = () => {
      setIsLoading(false);
      console.error('Audio playback error');
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrackIndex, tracks.length, loopMode]);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.src;
    audio.volume = isMuted ? 0 : volume;
    
    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [currentTrack, volume, isMuted]);

  // Save state changes
  useEffect(() => {
    savePlayerState({
      currentTrack: currentTrackIndex,
      playlist: tracks,
      volume,
      shuffle: isShuffled,
      loop: loopMode,
      isPlaying: false // Don't auto-play on reload
    });
  }, [currentTrackIndex, volume, isShuffled, loopMode, currentTime]);

  const playTrack = useCallback(async (track: Track, index?: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const trackIndex = index !== undefined ? index : tracks.findIndex(t => t.id === track.id);
    if (trackIndex === -1) {
      // Track not in current playlist, add it
      setTracksState(prev => [...prev, track]);
      setCurrentTrackIndex(tracks.length);
    } else {
      setCurrentTrackIndex(trackIndex);
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Playback error:', error);
    }
  }, [tracks]);

  const pauseTrack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  }, [isPlaying, currentTrack]);

  const nextTrack = useCallback(() => {
    if (tracks.length === 0) return;
    
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentTrackIndex + 1) % tracks.length;
    }
    
    setCurrentTrackIndex(nextIndex);
  }, [currentTrackIndex, tracks.length, isShuffled]);

  const previousTrack = useCallback(() => {
    if (tracks.length === 0) return;
    
    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * tracks.length);
    } else {
      prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    }
    
    setCurrentTrackIndex(prevIndex);
  }, [currentTrackIndex, tracks.length, isShuffled]);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(audio.currentTime);
  }, [duration]);

  const setVolume = useCallback((newVolume: number) => {
    const audio = audioRef.current;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    
    setVolumeState(clampedVolume);
    if (audio && !isMuted) {
      audio.volume = clampedVolume;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.volume = newMuted ? 0 : volume;
  }, [isMuted, volume]);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(prev => !prev);
  }, []);

  const toggleLoop = useCallback(() => {
    setLoopMode(prev => {
      switch (prev) {
        case 'none': return 'playlist';
        case 'playlist': return 'track';
        case 'track': return 'none';
        default: return 'none';
      }
    });
  }, []);

  const setTracks = useCallback((newTracks: Track[]) => {
    setTracksState(newTracks);
    if (currentTrackIndex >= newTracks.length) {
      setCurrentTrackIndex(0);
    }
  }, [currentTrackIndex]);

  return {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    loopMode,
    progress,
    playTrack,
    pauseTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleLoop,
    setTracks
  };
}