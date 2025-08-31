'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Clock, Ticket } from 'lucide-react';
import { upcomingShows, pastShows } from '@/lib/data/tours';
import { TourShow } from '@/lib/types';
import { formatTourDate, isFutureDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import GlitchText from '@/components/GlitchText';
import NeonBorder from '@/components/NeonBorder';
import MatrixRain from '@/components/MatrixRain';
import GlitchBackground from '@/components/GlitchBackground';
import CyberpunkButton from '@/components/CyberpunkButton';

export default function TourPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [hoveredShow, setHoveredShow] = useState<string | null>(null);

  const ShowCard = ({ show, index }: { show: TourShow; index: number }) => {
    const isUpcoming = isFutureDate(show.date);
    const isHovered = hoveredShow === show.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onHoverStart={() => setHoveredShow(show.id)}
        onHoverEnd={() => setHoveredShow(null)}
        className="group relative"
      >
        <NeonBorder 
          color={isUpcoming ? "purple" : "cyan"} 
          intensity={isHovered ? "high" : "medium"} 
          animated={isHovered}
          className="rounded-lg"
        >
          <div className={cn(
            "bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 transition-all duration-300",
            isUpcoming
              ? "hover:bg-purple-500/5"
              : "hover:bg-gray-800/30"
          )}
          >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className={cn(
                  "w-16 h-16 rounded-lg flex flex-col items-center justify-center text-xs font-bold",
                  isUpcoming 
                    ? "bg-gradient-to-br from-cyan-500 to-purple-500 text-black" 
                    : "bg-gray-800 text-gray-400"
                )}>
                  <span>{new Date(show.date).toLocaleDateString('en', { month: 'short' }).toUpperCase()}</span>
                  <span className="text-lg">{new Date(show.date).getDate()}</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-bold text-white truncate">
                    <GlitchText 
                      text={show.venue} 
                      intensity="medium" 
                      trigger={isHovered ? "hover" : "none"}
                    />
                  </h3>
                  {show.status === 'sold-out' && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
                      SOLD OUT
                    </span>
                  )}
                  {show.status === 'cancelled' && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs font-medium rounded-full">
                      CANCELLED
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{show.city}, {show.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatTourDate(show.date)}</span>
                  </div>
                  {show.time && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{show.time}</span>
                    </div>
                  )}
                </div>
                
                {show.description && (
                  <p className="text-gray-300 text-sm mb-4">{show.description}</p>
                )}
                
                {show.supportingActs && show.supportingActs.length > 0 && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-xs mb-1">Supporting:</p>
                    <p className="text-gray-300 text-sm">{show.supportingActs.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
            {isUpcoming && show.ticketUrl && show.status !== 'sold-out' && show.status !== 'cancelled' && (
              <CyberpunkButton
                variant="primary"
                size="md"
                onClick={() => window.open(show.ticketUrl, '_blank')}
                className="inline-flex items-center space-x-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Get Tickets</span>
                <ExternalLink className="w-4 h-4" />
              </CyberpunkButton>
            )}
            
            {!isUpcoming && (
              <div className="text-gray-500 text-sm font-medium">
                Show Completed
              </div>
            )}
            
            {show.price && isUpcoming && (
              <div className="text-right mt-2">
                <p className="text-gray-400 text-xs">From</p>
                <p className="text-white font-semibold">{show.price}</p>
              </div>
            )}
          </div>
        </div>
        
        {show.venue && hoveredShow === show.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Venue</p>
                <p className="text-white">{show.venue}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Location</p>
                <p className="text-white">{show.city}, {show.country}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Date & Time</p>
                <p className="text-white">{formatTourDate(show.date)} {show.time && `at ${show.time}`}</p>
              </div>
            </div>
          </motion.div>
        )}
          </div>
        </NeonBorder>
      </motion.div>
    );
  };

  const currentShows = activeTab === 'upcoming' ? upcomingShows : pastShows;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <MatrixRain intensity="low" className="absolute inset-0" />
        <GlitchBackground intensity="low" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <GlitchText 
              text="TOUR" 
              intensity="medium" 
              trigger="auto" 
              className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            <GlitchText 
              text="Experience the energy live. Catch DJ JOEL at venues around the world." 
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
            <NeonBorder color="purple" intensity="medium" animated={false} className="rounded-lg">
              <div className="flex space-x-1 bg-gray-900/50 backdrop-blur-sm rounded-lg p-1">
                {(['upcoming', 'past'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-6 py-2 rounded-md font-medium transition-all duration-200 capitalize relative overflow-hidden",
                      activeTab === tab
                        ? "text-purple-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    {activeTab === tab && (
                      <motion.div
                        className="absolute inset-0 bg-purple-500/20"
                        layoutId="activeTourTab"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      <GlitchText text={`${tab} Shows`} intensity="low" trigger={activeTab === tab ? 'auto' : 'none'} />
                    </span>
                  </button>
                ))}
              </div>
            </NeonBorder>
          </div>
        </div>
      </section>

      {/* Shows List */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {currentShows.length > 0 ? (
            <div className="space-y-4">
              {currentShows.map((show, index) => (
                <ShowCard key={show.id} show={show} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {activeTab === 'upcoming' ? 'No Upcoming Shows' : 'No Past Shows'}
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {activeTab === 'upcoming' 
                  ? 'Stay tuned for upcoming tour dates. Follow our social media for the latest announcements.'
                  : 'Check back later for past show information and memories.'
                }
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      {activeTab === 'upcoming' && (
        <section className="px-4 pb-20">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <NeonBorder color="purple" intensity="medium" animated={true} className="rounded-lg">
                <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    <GlitchText 
                      text="Never Miss a Show" 
                      intensity="medium" 
                      trigger="auto"
                    />
                  </h3>
                  <p className="text-gray-300 mb-6">
                    <GlitchText 
                      text="Get notified about new tour dates, exclusive presales, and VIP packages." 
                      intensity="low" 
                      trigger="none"
                    />
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <NeonBorder color="cyan" intensity="low" className="flex-1 rounded-lg">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-gray-900/50 rounded-lg text-white placeholder-gray-400 focus:outline-none border-0"
                      />
                    </NeonBorder>
                    <CyberpunkButton variant="primary" size="md">
                      Subscribe
                    </CyberpunkButton>
                  </div>
                </div>
              </NeonBorder>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}