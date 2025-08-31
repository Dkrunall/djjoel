'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import Image from 'next/image';
import { Video } from '@/lib/types';
import NeonBorder from './NeonBorder';
import GlitchText from './GlitchText';
import CyberpunkButton from './CyberpunkButton';

interface VideoModalProps {
  isOpen: boolean;
  video: Video | null;
  onClose: () => void;
}

export default function VideoModal({ isOpen, video, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'm':
        case 'M':
          setIsMuted(!isMuted);
          break;
        case 'f':
        case 'F':
          setIsFullscreen(!isFullscreen);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, isMuted, isFullscreen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset state when video changes
  useEffect(() => {
    if (video) {
      setIsPlaying(false);
      setCurrentTime(0);
      setIsLoading(true);
    }
  }, [video]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(newTime);
  };

  const handleShare = async () => {
    if (!video) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: video.url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      if (video.url) {
        navigator.clipboard.writeText(video.url);
      }
    }
  };

  if (!isOpen || !video) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
          isFullscreen ? 'p-0' : ''
        }`}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={`relative w-full max-w-6xl ${
            isFullscreen ? 'max-w-none h-full' : 'max-h-[90vh]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          {!isFullscreen && (
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors z-10"
            >
              <X size={24} />
            </button>
          )}

          <NeonBorder color="pink" intensity="medium" animated className="rounded-lg overflow-hidden">
            <div className="relative bg-black rounded-lg overflow-hidden">
              {/* Video Player */}
              <div className="relative aspect-video bg-gray-900">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                  </div>
                )}
                
                {/* Placeholder for actual video element */}
                <div 
                  className="w-full h-full bg-gray-800 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Image 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={450}
                    onLoad={() => setIsLoading(false)}
                  />
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-pink-500/80 rounded-full p-4"
                      >
                        <Play size={32} className="text-white ml-1" />
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <NeonBorder color="cyan" intensity="low" className="rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-gray-800 cursor-pointer rounded-full"
                        onClick={handleProgressClick}
                      >
                        <motion.div 
                          className="h-full bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full"
                          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                          animate={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>
                    </NeonBorder>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Play/Pause */}
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-pink-400 transition-colors"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>

                      {/* Volume */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="text-white hover:text-pink-400 transition-colors"
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <div className="w-20">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>

                      {/* Time */}
                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Share */}
                      <CyberpunkButton
                        variant="secondary"
                        size="sm"
                        onClick={handleShare}
                      >
                        Share
                      </CyberpunkButton>

                      {/* Fullscreen */}
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-white hover:text-pink-400 transition-colors"
                      >
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              {!isFullscreen && (
                <div className="p-6 bg-gray-900/50">
                  <h3 className="text-xl font-bold text-white mb-2">
                    <GlitchText text={video.title} intensity="medium" trigger="auto" />
                  </h3>
                  <p className="text-gray-300 mb-4">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{video.date}</span>
                      <span>{video.views} views</span>
                      <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full">
                        {video.category}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </NeonBorder>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}