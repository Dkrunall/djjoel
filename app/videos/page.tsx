'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Clock, Eye } from 'lucide-react';
import Image from 'next/image';
import { videos } from '@/lib/data/videos';
import { Video } from '@/lib/types';
import { formatDuration } from '@/lib/utils/audio';
import { cn } from '@/lib/utils';
import GlitchText from '@/components/GlitchText';
import NeonBorder from '@/components/NeonBorder';
import MatrixRain from '@/components/MatrixRain';
import GlitchBackground from '@/components/GlitchBackground';
import VideoModal from '@/components/VideoModal';

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState<'all' | 'music-video' | 'live-performance' | 'interview' | 'behind-the-scenes'>('all');
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const filteredVideos = videos.filter(video => 
    filter === 'all' || video.category === filter
  );

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const categories = [
    { id: 'all', label: 'All Videos', count: videos.length },
    { id: 'music-video', label: 'Music Videos', count: videos.filter(v => v.category === 'music-video').length },
    { id: 'live-performance', label: 'Live Shows', count: videos.filter(v => v.category === 'live-performance').length },
    { id: 'interview', label: 'Interviews', count: videos.filter(v => v.category === 'interview').length },
    { id: 'behind-the-scenes', label: 'Behind the Scenes', count: videos.filter(v => v.category === 'behind-the-scenes').length },
  ];

  const VideoCard = ({ video }: { video: Video }) => {
    const isHovered = hoveredVideo === video.id;

    return (
      <motion.div
        className="group cursor-pointer"
        onHoverStart={() => setHoveredVideo(video.id)}
        onHoverEnd={() => setHoveredVideo(null)}
        onClick={() => openVideoModal(video)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <NeonBorder 
          color={isHovered ? "red" : "cyan"} 
          intensity={isHovered ? "medium" : "low"} 
          animated={isHovered}
          className="rounded-lg"
        >
          <div className="relative overflow-hidden rounded-lg bg-gray-900/50 backdrop-blur-sm transition-all duration-300">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={400}
                height={225}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </motion.div>
              </div>

              {/* Duration */}
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  video.category === 'music-video' && "bg-red-500/80 text-white",
                  video.category === 'live-performance' && "bg-purple-500/80 text-white",
                  video.category === 'interview' && "bg-blue-500/80 text-white",
                  video.category === 'behind-the-scenes' && "bg-green-500/80 text-white"
                )}>
                  {categories.find(c => c.id === video.category)?.label}
                </span>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                <GlitchText 
                  text={video.title} 
                  intensity="low" 
                  trigger={isHovered ? "hover" : "none"}
                />
              </h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {video.description}
              </p>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{(video.views || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{video.publishedAt}</span>
                  </div>
                </div>
                
                {video.youtubeUrl && (
                  <motion.a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>YouTube</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </NeonBorder>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <MatrixRain intensity="low" className="absolute inset-0" />
        <GlitchBackground intensity="low" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-cyan-500/10" />
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <GlitchText 
              text="VIDEOS" 
              intensity="medium" 
              trigger="auto" 
              className="bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            <GlitchText 
              text="Music videos, live performances, interviews, and behind-the-scenes content." 
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
            <NeonBorder color="red" intensity="medium" animated={false} className="rounded-lg">
              <div className="flex flex-wrap justify-center gap-2 bg-gray-900/50 backdrop-blur-sm rounded-lg p-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id as any)}
                    className={cn(
                      "px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 relative overflow-hidden",
                      filter === category.id
                        ? "text-red-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    {filter === category.id && (
                      <motion.div
                        className="absolute inset-0 bg-red-500/20"
                        layoutId="activeVideoTab"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      <GlitchText text={category.label} intensity="low" trigger={filter === category.id ? 'auto' : 'none'} />
                    </span>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full relative z-10",
                      filter === category.id ? "bg-red-500/30 text-red-300" : "bg-gray-700 text-gray-400"
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

      {/* Videos Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {filteredVideos.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                <Play className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Videos Found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                No videos match the selected filter. Try selecting a different category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={closeVideoModal}
        video={selectedVideo}
      />
    </div>
  );
}