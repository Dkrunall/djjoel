'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';
import Image from 'next/image';
import { GalleryImage } from '@/lib/types';
import NeonBorder from './NeonBorder';
import CyberpunkButton from './CyberpunkButton';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious
}: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

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

  const handleDownload = () => {
    if (!currentImage.url || !currentImage.title) return;
    const link = document.createElement('a');
    link.href = currentImage.url;
    link.download = `dj-joel-${currentImage.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `DJ JOEL - ${currentImage.title}`,
          text: currentImage.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white hover:text-cyan-400 transition-colors"
        >
          <X className="w-8 h-8" />
        </motion.button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-cyan-400 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-cyan-400 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>
          </>
        )}

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen p-4" onClick={(e) => e.stopPropagation()}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="max-w-7xl w-full"
          >
            <NeonBorder color="cyan" intensity="high" animated={true} className="rounded-lg">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden">
                {/* Image */}
                <div className="relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    src={currentImage.url || ''}
                    alt={currentImage.title || 'Gallery image'}
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                  />
                </div>

                {/* Image Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {currentImage.title}
                      </h3>
                      {currentImage.description && (
                        <p className="text-gray-300 mb-2">
                          {currentImage.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{currentImage.category}</span>
                        <span>•</span>
                        <span>{currentImage.date}</span>
                        {currentImage.location && (
                          <>
                            <span>•</span>
                            <span>{currentImage.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      <CyberpunkButton
                        variant="secondary"
                        size="sm"
                        onClick={handleDownload}
                      >
                        <Download className="w-4 h-4" />
                      </CyberpunkButton>
                      <CyberpunkButton
                        variant="secondary"
                        size="sm"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4" />
                      </CyberpunkButton>
                    </div>
                  </div>

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-gray-400">
                        {currentIndex + 1} of {images.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </NeonBorder>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}