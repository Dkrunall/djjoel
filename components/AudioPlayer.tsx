'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  ChevronUp,
  ChevronDown,
  List,
  X
} from 'lucide-react';
import Image from 'next/image';
import { Track } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  formatDuration,
  calculateProgress,
  shuffleArray,
  getNextTrackIndex,
  getPreviousTrackIndex
} from '@/lib/utils/audio';
import { savePlayerState, getPlayerState, saveVolume, getVolume } from '@/lib/utils/storage';
import { config } from '@/lib/config';
import { usePlayer } from '@/context/PlayerContext';
import GlitchText from './GlitchText';
import NeonBorder from './NeonBorder';

type LoopMode = 'none' | 'track' | 'playlist';

interface AudioPlayerProps {
  tracks: Track[];
  initialTrackIndex?: number;
  onTrackChange?: (track: Track, index: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onMuteChange?: (isMuted: boolean) => void;
  className?: string;
}

export default function AudioPlayer({
  tracks,
  initialTrackIndex = 0,
  onTrackChange,
  onPlayStateChange,
  onMuteChange,
  className
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(config.player.defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [loopMode, setLoopMode] = useState<LoopMode>('none');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  const currentTrack = tracks[currentTrackIndex];

  // Initialize player state
  useEffect(() => {
    const savedState = getPlayerState();
    const savedVolume = getVolume();

    if (savedState) {
      setCurrentTrackIndex(savedState.currentTrack || 0);
      setVolume(savedState.volume || config.player.defaultVolume);
      setIsShuffled(savedState.shuffle || false);
      setLoopMode(savedState.loop || 'none');
    }

    setVolume(savedVolume);
  }, []);

  // Sync with PlayerContext
  const { currentTrack: contextTrack, isPlaying: contextIsPlaying, playTrack } = usePlayer();

  // Update internal player when context track changes (e.g. from FloatingMenu)
  useEffect(() => {
    if (contextTrack && contextTrack.title !== currentTrack?.title) {
      // Find index of new track
      const index = tracks.findIndex(t => t.title === contextTrack.title);
      if (index !== -1) {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
      }
    } else if (contextTrack && contextTrack.title === currentTrack?.title && contextIsPlaying !== isPlaying) {
      // Sync play/pause state
      setIsPlaying(contextIsPlaying);
    }
  }, [contextTrack, contextIsPlaying, tracks, currentTrack, isPlaying]);

  // Logic to update Context when AudioPlayer changes track (e.g. Shuffle/Next)
  useEffect(() => {
    // This might cause a loop if not careful.
    // We only want to update context if context is out of sync.
    if (currentTrack && (!contextTrack || contextTrack.title !== currentTrack.title)) {
      // playTrack(currentTrack); // This might re-trigger the above effect
    }
  }, [currentTrack, contextTrack, playTrack]);

  // Save player state
  useEffect(() => {
    savePlayerState({
      currentTrack: currentTrackIndex,
      playlist: tracks,
      volume,
      shuffle: isShuffled,
      loop: loopMode,
      isPlaying: false // Don't auto-play on reload
    });
  }, [currentTrackIndex, volume, isShuffled, loopMode, currentTime, tracks]);

  // Initialize shuffled indices
  useEffect(() => {
    if (isShuffled) {
      const indices = Array.from({ length: tracks.length }, (_, i) => i);
      setShuffledIndices(shuffleArray([...indices]));
    }
  }, [isShuffled, tracks]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      const nextIndex = getNextTrackIndex(
        currentTrackIndex,
        tracks.length,
        loopMode,
        isShuffled
      );

      if (nextIndex !== null) {
        setCurrentTrackIndex(nextIndex);
      } else if (loopMode === 'none') {
        setIsPlaying(false);
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
  }, [currentTrackIndex, tracks.length, loopMode, isShuffled, setIsPlaying, setCurrentTrackIndex]);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.src;
    audio.volume = isMuted ? 0 : volume;

    onTrackChange?.(currentTrack, currentTrackIndex);
  }, [currentTrackIndex, currentTrack, volume, isMuted, onTrackChange]);

  // Update volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
    saveVolume(volume);
  }, [volume, isMuted]);

  // Notify parent of play state changes
  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  // Notify parent of mute changes
  useEffect(() => {
    onMuteChange?.(isMuted);
  }, [isMuted, onMuteChange]);

  const handlePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

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
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    const nextIndex = getNextTrackIndex(
      currentTrackIndex,
      tracks.length,
      loopMode,
      isShuffled
    );

    if (nextIndex !== null) {
      setCurrentTrackIndex(nextIndex);
    } else if (loopMode === 'none') {
      setIsPlaying(false);
    }
  }, [currentTrackIndex, tracks.length, loopMode, isShuffled]);

  const handlePrevious = useCallback(() => {
    const prevIndex = getPreviousTrackIndex(
      currentTrackIndex,
      tracks.length,
      loopMode
    );

    if (prevIndex !== null) {
      setCurrentTrackIndex(prevIndex);
    }
  }, [currentTrackIndex, tracks.length, loopMode]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(!isShuffled);
  }, [isShuffled]);

  const toggleLoop = useCallback(() => {
    const modes: LoopMode[] = ['none', 'track', 'playlist'];
    const currentIndex = modes.indexOf(loopMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setLoopMode(nextMode);
  }, [loopMode]);

  const selectTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setShowPlaylist(false);
  }, []);

  const progress = calculateProgress(currentTime, duration);

  if (!currentTrack) return null;

  return (
    <>
      <audio ref={audioRef} preload="metadata" />

      <motion.div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-cyan-500/30 relative overflow-hidden',
          className
        )}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Glitch background effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 opacity-0"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
        {/* Expanded Player */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="px-4 py-6 border-b border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Album Art */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-32 h-32 lg:w-48 lg:h-48 rounded-lg overflow-hidden bg-gradient-to-br from-red-500/20 to-purple-500/20"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={currentTrack.cover}
                        alt={currentTrack.title}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* Track Info & Controls */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {currentTrack.title}
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                      {currentTrack.artist}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div
                        ref={progressRef}
                        className="w-full h-2 bg-white/20 rounded-full cursor-pointer group"
                        onClick={handleSeek}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-150 group-hover:from-red-400 group-hover:to-red-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>{formatDuration(currentTime)}</span>
                        <span>{formatDuration(duration)}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center space-x-6">
                      <motion.button
                        onClick={toggleShuffle}
                        className={cn(
                          'p-2 rounded-full transition-colors duration-300',
                          isShuffled
                            ? 'text-red-500 bg-red-500/20'
                            : 'text-white hover:text-red-400'
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Shuffle"
                      >
                        <Shuffle size={20} />
                      </motion.button>

                      <motion.button
                        onClick={handlePrevious}
                        className="p-3 text-white hover:text-red-400 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Previous"
                      >
                        <SkipBack size={24} />
                      </motion.button>

                      <motion.button
                        onClick={handlePlayPause}
                        className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isLoading ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : isPlaying ? (
                          <Pause size={24} />
                        ) : (
                          <Play size={24} className="ml-1" />
                        )}
                      </motion.button>

                      <motion.button
                        onClick={handleNext}
                        className="p-3 text-white hover:text-red-400 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Next"
                      >
                        <SkipForward size={24} />
                      </motion.button>

                      <motion.button
                        onClick={toggleLoop}
                        className={cn(
                          'p-2 rounded-full transition-colors duration-300',
                          loopMode !== 'none'
                            ? 'text-red-500 bg-red-500/20'
                            : 'text-white hover:text-red-400'
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={`Loop: ${loopMode}`}
                      >
                        {loopMode === 'track' ? <Repeat1 size={20} /> : <Repeat size={20} />}
                      </motion.button>
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-3 relative z-10">
                    <NeonBorder color="cyan" intensity="low" animated={false} className="rounded-full">
                      <motion.button
                        onClick={toggleMute}
                        className="p-2 text-white hover:text-cyan-400 transition-colors duration-300 relative overflow-hidden rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        <motion.div
                          className="absolute inset-0 bg-cyan-500/20 opacity-0"
                          whileHover={{ opacity: [0, 0.5, 0] }}
                          transition={{ duration: 0.3 }}
                        />
                        {isMuted ? <VolumeX size={20} className="relative z-10" /> : <Volume2 size={20} className="relative z-10" />}
                      </motion.button>
                    </NeonBorder>
                    <div className="w-24 h-2 bg-white/20 rounded-full relative">
                      <NeonBorder color="cyan" intensity="low" animated={false} className="h-2 rounded-full">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-full h-full opacity-0 cursor-pointer relative z-10"
                        />
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full pointer-events-none -mt-2 relative z-10"
                          style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                        />
                      </NeonBorder>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Player */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Track Info */}
            <div className="flex items-center space-x-4 flex-1 min-w-0 relative z-10">
              <NeonBorder color="cyan" intensity="low" animated={true} className="w-12 h-12">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-600 to-purple-600 flex-shrink-0 relative overflow-hidden">
                  <Image
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover relative z-10"
                  />
                  <motion.div
                    className="absolute inset-0 bg-red-500 mix-blend-screen opacity-0"
                    animate={{ opacity: [0, 0.2, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </NeonBorder>
              <div className="min-w-0 flex-1">
                <h4 className="text-white font-medium truncate">
                  <GlitchText text={currentTrack.title} intensity="low" trigger="none" />
                </h4>
                <p className="text-gray-400 text-sm truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 lg:space-x-4 relative z-10">
              <motion.button
                onClick={handlePrevious}
                className="p-2 text-white hover:text-cyan-400 transition-colors duration-300 hidden sm:block relative overflow-hidden rounded-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Previous"
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-500/20 opacity-0"
                  whileHover={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.3 }}
                />
                <SkipBack size={18} className="relative z-10" />
              </motion.button>

              <NeonBorder color="cyan" intensity="medium" animated={isPlaying} className="rounded-full">
                <motion.button
                  onClick={handlePlayPause}
                  className="p-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white rounded-full transition-colors duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  <motion.div
                    className="absolute inset-0 bg-red-500 mix-blend-screen opacity-0"
                    animate={{ opacity: isPlaying ? [0, 0.3, 0] : 0 }}
                    transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                  />
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" />
                  ) : isPlaying ? (
                    <Pause size={16} className="relative z-10" />
                  ) : (
                    <Play size={16} className="ml-0.5 relative z-10" />
                  )}
                </motion.button>
              </NeonBorder>

              <motion.button
                onClick={handleNext}
                className="p-2 text-white hover:text-cyan-400 transition-colors duration-300 hidden sm:block relative overflow-hidden rounded-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Next"
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-500/20 opacity-0"
                  whileHover={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.3 }}
                />
                <SkipForward size={18} className="relative z-10" />
              </motion.button>

              <motion.button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="p-2 text-white hover:text-cyan-400 transition-colors duration-300 hidden lg:block relative overflow-hidden rounded-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Playlist"
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-500/20 opacity-0"
                  whileHover={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.3 }}
                />
                <List size={18} className="relative z-10" />
              </motion.button>

              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-white hover:text-cyan-400 transition-colors duration-300 relative overflow-hidden rounded-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-500/20 opacity-0"
                  whileHover={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.3 }}
                />
                {isExpanded ? <ChevronDown size={18} className="relative z-10" /> : <ChevronUp size={18} className="relative z-10" />}
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 relative z-10">
            <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
              <span className="text-cyan-400">{formatDuration(currentTime)}</span>
              <div className="flex-1"></div>
              <span className="text-cyan-400">{formatDuration(duration)}</span>
            </div>
            <div
              ref={progressRef}
              className="w-full h-1 bg-white/20 rounded-full cursor-pointer group relative"
              onClick={handleSeek}
            >
              <NeonBorder color="cyan" intensity="low" animated={false} className="h-1 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-150 relative z-10"
                  style={{ width: `${progress}%` }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30 opacity-0"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </NeonBorder>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Playlist Modal */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowPlaylist(false)}
            />
            <motion.div
              className="relative w-full max-w-md h-96 bg-black/95 backdrop-blur-md rounded-lg border border-red-500/20 overflow-hidden"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-semibold">Playlist</h3>
                <motion.button
                  onClick={() => setShowPlaylist(false)}
                  className="p-1 text-white hover:text-red-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
              <div className="overflow-y-auto h-full pb-16">
                {tracks.map((track, index) => (
                  <motion.button
                    key={track.id}
                    onClick={() => selectTrack(index)}
                    className={cn(
                      'w-full p-3 text-left hover:bg-white/5 transition-colors duration-300 border-b border-white/5',
                      index === currentTrackIndex && 'bg-red-500/10 text-red-400'
                    )}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-red-500/20 to-purple-500/20 flex-shrink-0">
                        <Image
                          src={track.cover}
                          alt={track.title}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium truncate">
                          {track.title}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                          {track.artist}
                        </p>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {formatDuration(track.duration)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}