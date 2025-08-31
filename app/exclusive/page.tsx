'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye, EyeOff, Music, Play, Pause, Download, Clock, Calendar } from 'lucide-react';
import { exclusiveTracks } from '@/lib/data/tracks.js';
import { getExclusiveAccess, setExclusiveAccess, clearExclusiveAccess } from '@/lib/utils/storage';
import { formatDuration } from '@/lib/utils/audio';
import Image from 'next/image';

const DEMO_PASSWORD = 'JOEL2025!';

export default function ExclusivePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if user already has access
    const access = getExclusiveAccess();
    if (access) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === DEMO_PASSWORD) {
      setExclusiveAccess(true);
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const handleLogout = () => {
    clearExclusiveAccess();
    setIsAuthenticated(false);
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  const handlePlayTrack = (trackId: string) => {
    if (currentTrack === trackId && isPlaying) {
      setIsPlaying(false);
      setCurrentTrack(null);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  const handleDownload = (trackId: string, title: string) => {
    // In a real app, this would trigger an actual download
    const link = document.createElement('a');
    link.href = '#'; // Would be the actual file URL
    link.download = `DJ_JOEL_${title.replace(/\s+/g, '_')}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="max-w-md w-full">
              {/* Lock Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-center mb-8"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Lock className="w-12 h-12 text-black" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  EXCLUSIVE
                </h1>
                <p className="text-gray-400">
                  Enter the password to access exclusive tracks
                </p>
              </motion.div>

              {/* Login Form */}
              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
              >
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      placeholder="Enter exclusive access password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-semibold rounded-lg hover:from-purple-400 hover:to-cyan-400 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Unlock className="w-5 h-5" />
                  <span>Access Exclusive Content</span>
                </button>

                {/* Demo Hint */}
                <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-purple-300 text-sm text-center">
                    <strong>Demo Password:</strong> JOEL2025!
                  </p>
                </div>
              </motion.form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <section className="relative py-20 px-4">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />
              <div className="relative max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    >
                      EXCLUSIVE
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl text-gray-300"
                    >
                      Unreleased tracks, VIP mixes, and exclusive content
                    </motion.p>
                  </div>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={handleLogout}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Logout</span>
                  </motion.button>
                </div>

                {/* Access Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Unlock className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-green-300 font-medium">Exclusive Access Granted</p>
                      <p className="text-green-400 text-sm">Access expires in 30 days</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Exclusive Tracks */}
            <section className="px-4 pb-20">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exclusiveTracks.map((track, index) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-200 group"
                    >
                      {/* Track Cover */}
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={track.cover}
                          alt={track.title}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handlePlayTrack(String(track.id))}
                            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            {currentTrack === String(track.id) && isPlaying ? (
                              <Pause className="w-8 h-8 text-black" />
                            ) : (
                              <Play className="w-8 h-8 text-black ml-1" />
                            )}
                          </button>
                        </div>

                        {/* Exclusive Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-black text-xs font-bold rounded-full">
                            EXCLUSIVE
                          </div>
                        </div>
                      </div>

                      {/* Track Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-gray-400 mb-4">{track.artist}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{formatDuration(track.duration)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Unreleased</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handlePlayTrack(String(track.id))}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-semibold rounded-lg hover:from-purple-400 hover:to-cyan-400 transition-all duration-200 flex items-center justify-center space-x-2"
                          >
                            {currentTrack === String(track.id) && isPlaying ? (
                              <>
                                <Pause className="w-4 h-4" />
                                <span>Pause</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                <span>Play</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleDownload(String(track.id), track.title)}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                            title="Download Track"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-16 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 text-center"
                >
                  <Music className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white mb-4">More Exclusive Content Coming Soon</h3>
                  <p className="text-gray-300 mb-6">
                    Stay tuned for more unreleased tracks, behind-the-scenes content, 
                    and exclusive remixes available only to VIP members.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-semibold rounded-lg hover:from-purple-400 hover:to-cyan-400 transition-all duration-200"
                    >
                      Request Custom Content
                    </a>
                    <a
                      href="/music"
                      className="px-6 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all duration-200"
                    >
                      Browse Public Releases
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}