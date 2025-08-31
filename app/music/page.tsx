'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Download, ExternalLink, Calendar, Clock } from 'lucide-react';
import { albums } from '@/lib/data/albums';
import { singles } from '@/lib/data/tracks';
import { Track, Album } from '@/lib/types';
import { formatDuration } from '@/lib/utils/audio';
import { cn } from '@/lib/utils';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import GlitchText from '@/components/GlitchText';
import NeonBorder from '@/components/NeonBorder';
import MatrixRain from '@/components/MatrixRain';
import GlitchBackground from '@/components/GlitchBackground';
import Image from 'next/image';

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState<'albums' | 'singles'>('albums');
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  const handleTrackPlay = (track: Track, index: number) => {
    // Handle track play logic here
    console.log('Playing track:', track.title);
  };

  const AlbumCard = ({ album }: { album: Album }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={album.art}
          alt={album.title}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{album.title}</h3>
          <p className="text-gray-300 text-sm">{album.year} • {album.tracks.length} tracks</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          {album.tracks.map((track, index) => (
            <motion.div
              key={track.id}
              className={cn(
                "flex items-center justify-between p-2 rounded-md transition-all duration-200 cursor-pointer",
                hoveredTrack === String(track.id) ? "bg-cyan-500/10 border border-cyan-500/30" : "hover:bg-gray-800/50"
              )}
              onMouseEnter={() => setHoveredTrack(String(track.id))}
              onMouseLeave={() => setHoveredTrack(null)}
              onClick={() => handleTrackPlay(track, index)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-xs font-medium">
                  {hoveredTrack === String(track.id) ? (
                    <Play className="w-3 h-3" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{track.title}</p>
                  <p className="text-gray-400 text-xs">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-xs">{formatDuration(track.duration)}</span>
                {track.downloadUrl && (
                  <button className="p-1 hover:text-cyan-400 transition-colors">
                    <Download className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {album.streamingLinks && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-400 text-xs mb-2">Listen on:</p>
            <div className="flex space-x-2">
              {Object.entries(album.streamingLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-gray-800 hover:bg-cyan-500/20 rounded text-xs text-gray-300 hover:text-cyan-400 transition-all duration-200 flex items-center space-x-1"
                >
                  <span className="capitalize">{platform}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const SingleCard = ({ track, index }: { track: Track; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer",
        hoveredTrack === String(track.id) ? "border-cyan-500/50 bg-cyan-500/5" : ""
      )}
      onMouseEnter={() => setHoveredTrack(String(track.id))}
      onMouseLeave={() => setHoveredTrack(null)}
      onClick={() => handleTrackPlay(track, index)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 relative overflow-hidden rounded-md">
          <Image
            src={track.cover}
            alt={track.title}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <Play className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1">{track.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{track.artist}</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs">{formatDuration(track.duration)}</span>
            <div className="flex items-center space-x-2">
              {track.downloadUrl && (
                <button className="p-1 hover:text-cyan-400 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              )}
              <button className="p-1 hover:text-cyan-400 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <MatrixRain intensity="low" className="absolute inset-0" />
        <GlitchBackground intensity="low" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <GlitchText 
              text="MUSIC" 
              intensity="medium" 
              trigger="auto" 
              className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            <GlitchText 
              text="Explore the sonic journey through albums, EPs, and exclusive singles" 
              intensity="low" 
              trigger="none"
            />
          </motion.p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <NeonBorder color="cyan" intensity="medium" animated={false} className="rounded-lg">
              <div className="flex space-x-1 bg-gray-900/50 backdrop-blur-sm rounded-lg p-1">
                {(['albums', 'singles'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-6 py-2 rounded-md font-medium transition-all duration-200 capitalize relative overflow-hidden",
                      activeTab === tab
                        ? "text-cyan-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    {activeTab === tab && (
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/20"
                        layoutId="activeTab"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      <GlitchText text={tab} intensity="low" trigger={activeTab === tab ? 'auto' : 'none'} />
                    </span>
                  </button>
                ))}
              </div>
            </NeonBorder>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'albums' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <NeonBorder color="cyan" intensity="low" animated={true} className="rounded-lg">
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={album.art}
                          alt={album.title}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <NeonBorder color="cyan" intensity="medium" animated={false} className="rounded-full">
                                <button className="bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-400 p-2 rounded-full transition-colors border border-cyan-500/50">
                                  <Play className="w-4 h-4" />
                                </button>
                              </NeonBorder>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-300">{album.tracks.length} tracks</p>
                              <p className="text-xs text-gray-400">{album.year}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-cyan-400 transition-colors">
                          <GlitchText text={album.title} intensity="low" trigger="hover" />
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">{album.year}</p>
                        <p className="text-gray-500 text-xs">{album.tracks.length} tracks</p>
                      </div>
                    </div>
                  </NeonBorder>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {singles.map((single, index) => (
                <motion.div
                  key={single.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <NeonBorder color="purple" intensity="low" animated={true} className="rounded-lg">
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={single.cover}
                          alt={single.title}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <NeonBorder color="purple" intensity="medium" animated={false} className="rounded-full">
                                <button className="bg-purple-500/20 hover:bg-purple-400/30 text-purple-400 p-2 rounded-full transition-colors border border-purple-500/50">
                                  <Play className="w-4 h-4" />
                                </button>
                              </NeonBorder>
                              <NeonBorder color="cyan" intensity="low" animated={false} className="rounded-full">
                                <button className="bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 p-2 rounded-full transition-colors border border-cyan-500/30">
                                  <Download className="w-4 h-4" />
                                </button>
                              </NeonBorder>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-300">{formatDuration(single.duration)}</p>
                              <p className="text-xs text-gray-400">{single.year}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors">
                          <GlitchText text={single.title} intensity="low" trigger="hover" />
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">{single.year}</p>
                        <p className="text-gray-500 text-xs">{formatDuration(single.duration)}</p>
                      </div>
                    </div>
                  </NeonBorder>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}