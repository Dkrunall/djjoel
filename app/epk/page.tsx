'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Image, Music, FileText, Video, Award, Calendar, Users, Play, ExternalLink } from 'lucide-react';
import GlitchText from '@/components/GlitchText';
import NeonBorder from '@/components/NeonBorder';
import MatrixRain from '@/components/MatrixRain';
import GlitchBackground from '@/components/GlitchBackground';
import CyberpunkButton from '@/components/CyberpunkButton';
const config = {
  pressEmail: 'press@djjoel.com'
};

export default function EPKPage() {
  const [downloadingItem, setDownloadingItem] = useState<string | null>(null);

  const handleDownload = async (item: string, url: string) => {
    setDownloadingItem(item);
    
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would trigger the actual download here
    const link = document.createElement('a');
    link.href = url;
    link.download = `DJ_JOEL_${item}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDownloadingItem(null);
  };

  const pressAssets = [
    {
      id: 'photos',
      title: 'High-Resolution Photos',
      description: 'Professional photos for press and promotional use',
      icon: Image,
      size: '25.4 MB',
      count: '12 images',
      url: '#'
    },
    {
      id: 'biography',
      title: 'Artist Biography',
      description: 'Complete biography in multiple formats (PDF, DOC, TXT)',
      icon: FileText,
      size: '2.1 MB',
      count: '3 formats',
      url: '#'
    },
    {
      id: 'music',
      title: 'Music Samples',
      description: 'Latest tracks and exclusive previews',
      icon: Music,
      size: '45.8 MB',
      count: '8 tracks',
      url: '#'
    },
    {
      id: 'videos',
      title: 'Video Content',
      description: 'Music videos, live performances, and interviews',
      icon: Video,
      size: '156.2 MB',
      count: '5 videos',
      url: '#'
    }
  ];

  const achievements = [
    {
      year: '2024',
      title: 'International Music Awards Nomination',
      category: 'Best Electronic Artist'
    },
    {
      year: '2023',
      title: 'Beatport #1 Chart Position',
      category: 'Progressive House'
    },
    {
      year: '2023',
      title: 'Tomorrowland Main Stage',
      category: 'Festival Performance'
    },
    {
      year: '2022',
      title: 'Ultra Music Festival',
      category: 'Worldwide Stage'
    },
    {
      year: '2022',
      title: 'Spotify Editorial Playlist',
      category: 'Electronic Rising'
    }
  ];

  const stats = [
    { label: 'Monthly Listeners', value: '2.5M+', icon: Users },
    { label: 'Total Streams', value: '50M+', icon: Play },
    { label: 'Countries Reached', value: '85+', icon: Award },
    { label: 'Years Active', value: '8+', icon: Calendar }
  ];

  const socialStats = [
    { platform: 'Spotify', followers: '1.2M', growth: '+15%' },
    { platform: 'Instagram', followers: '850K', growth: '+22%' },
    { platform: 'YouTube', followers: '420K', growth: '+18%' },
    { platform: 'SoundCloud', followers: '680K', growth: '+12%' }
  ];

  const upcomingShows = [
    {
      date: '2024-03-15',
      venue: 'Ultra Music Festival',
      city: 'Miami, FL',
      stage: 'Main Stage'
    },
    {
      date: '2024-04-20',
      venue: 'Coachella',
      city: 'Indio, CA',
      stage: 'Sahara Tent'
    },
    {
      date: '2024-05-25',
      venue: 'EDC Las Vegas',
      city: 'Las Vegas, NV',
      stage: 'Circuit Grounds'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />
      <GlitchBackground />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlitchText
                text="PRESS KIT"
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
                intensity="high"
                trigger="auto"
              />
              <GlitchText
                text="Complete electronic press kit with high-resolution assets, biography, music samples, and everything you need for press coverage."
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                intensity="low"
              />
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Download Assets */}
        <section className="mb-16">
          <GlitchText
            text="Download Assets"
            className="text-3xl font-bold text-white mb-8"
            intensity="medium"
            trigger="auto"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pressAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NeonBorder color="cyan" intensity="low" animated>
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <asset.icon className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{asset.title}</h3>
                          <p className="text-gray-400 text-sm">{asset.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        <span>{asset.size}</span> • <span>{asset.count}</span>
                      </div>
                      <CyberpunkButton
                        onClick={() => handleDownload(asset.id, asset.url)}
                        disabled={downloadingItem === asset.id}
                        variant="primary"
                        size="sm"
                      >
                        {downloadingItem === asset.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>Downloading...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </>
                        )}
                      </CyberpunkButton>
                    </div>
                  </div>
                </NeonBorder>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Artist Information */}
          <div className="space-y-8">
            {/* Biography */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <NeonBorder color="purple" intensity="medium" animated>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
                  <GlitchText
                    text="Artist Biography"
                    className="text-2xl font-bold text-white mb-6"
                    intensity="medium"
                    trigger="auto"
                  />
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      DJ JOEL is a visionary electronic music producer and performer who has been 
                      pushing the boundaries of sound for over a decade. Known for his innovative 
                      approach to blending genres and creating immersive sonic experiences, JOEL 
                      has become a defining voice in the modern electronic music scene.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      His journey began in underground clubs where he developed his signature style 
                      that seamlessly weaves together elements of techno, house, ambient, and 
                      experimental electronic music. Each performance is a carefully crafted 
                      narrative that takes listeners on an emotional and sonic journey.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      With releases on major electronic labels and performances at renowned festivals 
                      worldwide, DJ JOEL continues to evolve his sound while staying true to his 
                      artistic vision. His music is not just heard—it&apos;s experienced.
                    </p>
                  </div>
                </div>
              </NeonBorder>
            </motion.div>

            {/* Social Media Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <NeonBorder color="cyan" intensity="medium" animated>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
                  <GlitchText
                    text="Social Media Reach"
                    className="text-2xl font-bold text-white mb-6"
                    intensity="medium"
                    trigger="auto"
                  />
                  <div className="space-y-4">
                    {socialStats.map((social, index) => (
                      <div key={social.platform} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-sm">{social.platform[0]}</span>
                          </div>
                          <span className="text-white font-medium">{social.platform}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{social.followers}</div>
                          <div className="text-green-400 text-sm">{social.growth}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NeonBorder>
            </motion.div>
          </div>

          {/* Achievements & Shows */}
          <div className="space-y-8">
            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <NeonBorder color="purple" intensity="medium" animated>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
                  <GlitchText
                    text="Recent Achievements"
                    className="text-2xl font-bold text-white mb-6"
                    intensity="medium"
                    trigger="auto"
                  />
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-bold text-sm">{achievement.year}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{achievement.title}</h4>
                          <p className="text-gray-400 text-sm">{achievement.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NeonBorder>
            </motion.div>

            {/* Upcoming Shows */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <NeonBorder color="cyan" intensity="medium" animated>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
                  <GlitchText
                    text="Upcoming Performances"
                    className="text-2xl font-bold text-white mb-6"
                    intensity="medium"
                    trigger="auto"
                  />
                  <div className="space-y-4">
                    {upcomingShows.map((show, index) => (
                      <div key={index} className="border-l-4 border-gradient-to-b from-purple-500 to-cyan-500 pl-4">
                        <div className="text-white font-semibold">{show.venue}</div>
                        <div className="text-gray-400 text-sm">{show.city} • {show.stage}</div>
                        <div className="text-cyan-400 text-sm">
                          {new Date(show.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NeonBorder>
            </motion.div>
          </div>
        </div>

        {/* Contact Information */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <NeonBorder color="purple" intensity="high" animated>
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-center">
                <GlitchText
                  text="Press Contact"
                  className="text-3xl font-bold text-white mb-4"
                  intensity="high"
                  trigger="auto"
                />
                <GlitchText
                  text="For press inquiries, interview requests, or additional assets, please contact:"
                  className="text-gray-300 mb-8"
                  intensity="low"
                />
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                  <a
                    href={`mailto:${config.pressEmail}`}
                    className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>{config.pressEmail}</span>
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>+1 (555) 123-4567</span>
                  </a>
                </div>
              </div>
            </div>
          </NeonBorder>
        </motion.section>
      </div>
    </div>
  );
}