'use client';

import { motion } from 'framer-motion';
import { Play, Music, Calendar, Users, ArrowRight, Headphones, Zap, ExternalLink } from 'lucide-react';
import { singles } from '@/lib/data/tracks';
import { upcomingShows } from '@/lib/data/tours';
import { formatDuration } from '@/lib/utils/audio';
import { formatTourDate } from '@/lib/utils';
import GlitchText from '@/components/GlitchText';
import GlitchBackground from '@/components/GlitchBackground';
import CyberpunkButton from '@/components/CyberpunkButton';
import NeonBorder from '@/components/NeonBorder';
import MatrixRain from '@/components/MatrixRain';
import Image from 'next/image';

export default function Home() {
  const featuredTracks = singles.slice(0, 3);
  const nextShows = upcomingShows.slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20" />
          <MatrixRain className="opacity-10" intensity="medium" />
          <GlitchBackground intensity="low" color="cyan" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                <GlitchText text="DJ JOEL" intensity="high" trigger="auto" duration={3000} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Electronic music producer crafting immersive soundscapes that transcend boundaries. 
              Experience the future of electronic dance music.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <a href="/music">
              <CyberpunkButton variant="primary" size="lg">
                <Play className="w-6 h-6" />
                <span>Listen Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CyberpunkButton>
            </a>
            <a href="/tour">
              <CyberpunkButton variant="secondary" size="lg">
                <Calendar className="w-6 h-6" />
                <span>Tour Dates</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CyberpunkButton>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2.5M+</div>
              <div className="text-gray-400 text-sm">Monthly Listeners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50M+</div>
              <div className="text-gray-400 text-sm">Total Streams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">85+</div>
              <div className="text-gray-400 text-sm">Countries</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Featured Tracks */}
      <section className="py-20 px-4 relative">
        <GlitchBackground intensity="low" color="purple" className="opacity-30" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"><GlitchText text="Releases" intensity="medium" trigger="hover" /></span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the newest tracks that are defining the sound of tomorrow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <NeonBorder color="cyan" intensity="medium" className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={track.cover}
                    alt={track.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      <GlitchText text={track.title} intensity="low" trigger="hover" />
                    </h3>
                    <p className="text-gray-300 text-sm">{formatDuration(track.duration)}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CyberpunkButton variant="primary" size="sm">
                        <Play className="w-4 h-4" />
                      </CyberpunkButton>
                    </div>
                  </div>
                </div>
                </NeonBorder>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <a
              href="/music"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-semibold rounded-lg hover:from-purple-400 hover:to-cyan-400 transition-all duration-200"
            >
              <Music className="w-5 h-5" />
              <span>Explore All Music</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Shows */}
      {nextShows.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 relative">
          <MatrixRain className="opacity-5" intensity="low" color="#00ffff" />
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <GlitchText text="Upcoming Shows" intensity="medium" trigger="hover" /> <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"></span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Experience the energy live at these upcoming performances
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {nextShows.map((show, index) => (
                <motion.div
                  key={`${show.date}-${show.venue}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <NeonBorder color="purple" intensity="medium" className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          <GlitchText text={show.venue} intensity="low" trigger="hover" />
                        </h3>
                        <p className="text-gray-300">{show.city}, {show.country}</p>
                        <p className="text-cyan-400 font-semibold">{formatTourDate(show.date)}</p>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-black" />
                      </div>
                    </div>
                  
                    {show.ticketUrl && (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CyberpunkButton variant="secondary" size="md">
                          <span>Get Tickets</span>
                          <ExternalLink className="w-4 h-4" />
                        </CyberpunkButton>
                      </a>
                    )}
                  </NeonBorder>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12"
            >
              <a
                href="/tour"
                className="inline-flex items-center space-x-2 px-8 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                <span>View All Tour Dates</span>
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl p-12 border border-gray-800 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Headphones className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience the <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Future</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of listeners worldwide and discover why DJ JOEL is defining the sound of tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/exclusive"
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-bold rounded-lg hover:from-purple-400 hover:to-cyan-400 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Access Exclusive Content</span>
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Get In Touch</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}