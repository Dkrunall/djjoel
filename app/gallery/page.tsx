'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { galleryImages } from '@/lib/data/gallery';
import GlitchText from '@/components/GlitchText';
import NeonBorder from '@/components/NeonBorder';
import MatrixRain from '@/components/MatrixRain';
import GlitchBackground from '@/components/GlitchBackground';
import Lightbox from '@/components/Lightbox';
import Image from 'next/image';

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'performance' | 'lifestyle' | 'studio'>('all');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredImages = galleryImages.filter(image => 
    filter === 'all' || image.category === filter
  );

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0);
  };

  const categories = [
    { id: 'all', label: 'All Photos', count: galleryImages.length },
    { id: 'performance', label: 'Live Shows', count: galleryImages.filter(img => img.category === 'performance').length },
    { id: 'lifestyle', label: 'Lifestyle', count: galleryImages.filter(img => img.category === 'lifestyle').length },
    { id: 'studio', label: 'Studio', count: galleryImages.filter(img => img.category === 'studio').length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <MatrixRain intensity="low" className="absolute inset-0" />
        <GlitchBackground intensity="low" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-500/10" />
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <GlitchText 
              text="GALLERY" 
              intensity="medium" 
              trigger="auto" 
              className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            <GlitchText 
              text="Behind the scenes, on stage, and in the studio. Capturing the moments that define the journey." 
              intensity="low" 
              trigger="none"
            />
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <NeonBorder color="pink" intensity="medium" animated={false} className="rounded-lg">
              <div className="flex flex-wrap justify-center gap-2 bg-gray-900/50 backdrop-blur-sm rounded-lg p-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id as any)}
                    className={cn(
                      "px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 relative overflow-hidden",
                      filter === category.id
                        ? "text-pink-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    {filter === category.id && (
                      <motion.div
                        className="absolute inset-0 bg-pink-500/20"
                        layoutId="activeGalleryTab"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      <GlitchText text={category.label} intensity="low" trigger={filter === category.id ? 'auto' : 'none'} />
                    </span>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full relative z-10",
                      filter === category.id ? "bg-pink-500/30 text-pink-300" : "bg-gray-700 text-gray-400"
                    )}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </NeonBorder>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLightbox(index)}
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <NeonBorder 
                    color={hoveredImage === image.id ? "pink" : "cyan"} 
                    intensity={hoveredImage === image.id ? "high" : "low"} 
                    animated={hoveredImage === image.id}
                    className="rounded-lg overflow-hidden"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-semibold mb-1">
                          <GlitchText text={image.alt} intensity="low" trigger={hoveredImage === image.id ? 'hover' : 'none'} />
                        </h3>
                        {image.category && (
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full">
                              {image.category}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </NeonBorder>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                <Share2 className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Images Found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                No images match the selected filter. Try selecting a different category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        images={filteredImages}
        currentIndex={currentIndex}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
}