'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, VolumeX, Volume2, Instagram, Twitter, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { config } from '@/lib/config';
import GlitchText from './GlitchText';
import NeonBorder from './NeonBorder';

interface NavigationProps {
  isPlayerActive?: boolean;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/exclusive', label: 'Exclusive' },
  { href: '/tour', label: 'Tour' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/epk', label: 'EPK' }
];

export default function Navigation({ isPlayerActive, isMuted, onToggleMute }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || isOpen
            ? 'bg-black/95 backdrop-blur-md border-b border-red-500/20'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-black text-xl relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">DJ</span>
                <motion.div
                  className="absolute inset-0 bg-red-500 mix-blend-screen opacity-0"
                  whileHover={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                <GlitchText text="JOEL" intensity="low" trigger="hover" />
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 relative',
                        isActive
                          ? 'text-cyan-400'
                          : 'text-gray-300 hover:text-white'
                      )}
                    >
                      {isActive ? (
                        <NeonBorder color="cyan" intensity="low" animated={false} className="px-3 py-2">
                          <GlitchText text={item.label} intensity="low" trigger="none" />
                        </NeonBorder>
                      ) : (
                        <span className="hover:text-cyan-400 transition-colors">{item.label}</span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Global Mute Button */}
              {isPlayerActive && onToggleMute && (
                <motion.button
                  onClick={onToggleMute}
                  className="p-2 text-white hover:text-red-500 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </motion.button>
              )}

              {/* Social Links */}
              <div className="flex items-center space-x-2">
                <a
                  href={config.socialLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white hover:text-red-500 transition-colors duration-300"
                  title="Spotify"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </a>
                <a
                  href={config.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white hover:text-red-500 transition-colors duration-300"
                  title="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors relative overflow-hidden"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-cyan-500/20 opacity-0"
                whileHover={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.3 }}
              />
              {isOpen ? <X className="w-6 h-6 relative z-10" /> : <Menu className="w-6 h-6 relative z-10" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-cyan-500/30"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="px-4 py-6 space-y-4">
                {navigationItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg relative',
                          isActive
                            ? 'text-cyan-400'
                            : 'text-white hover:text-cyan-400'
                        )}
                        onClick={handleLinkClick}
                      >
                        {isActive ? (
                          <NeonBorder color="cyan" intensity="low" animated={false} className="px-3 py-2">
                            <GlitchText text={item.label} intensity="low" trigger="none" />
                          </NeonBorder>
                        ) : (
                          <span className="hover:text-cyan-400 transition-colors">{item.label}</span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Controls */}
                <div className="pt-6 border-t border-cyan-500/30">
                  {/* Global Mute Button */}
                  {isPlayerActive && onToggleMute && (
                    <motion.button
                      onClick={onToggleMute}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-white hover:text-cyan-400 transition-colors duration-300 rounded-lg hover:bg-cyan-500/10 relative overflow-hidden"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: navigationItems.length * 0.1, duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/20 opacity-0"
                        whileHover={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.3 }}
                      />
                      {isMuted ? <VolumeX size={20} className="relative z-10" /> : <Volume2 size={20} className="relative z-10" />}
                      <span className="relative z-10">{isMuted ? 'Unmute' : 'Mute'}</span>
                    </motion.button>
                  )}

                  {/* Social Links */}
                  <div className="flex items-center justify-center space-x-6 pt-4">
                    <motion.a
                      href={config.socialLinks.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-white hover:text-cyan-400 transition-colors duration-300 relative overflow-hidden rounded-md"
                      title="Spotify"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/20 opacity-0"
                        whileHover={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.3 }}
                      />
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </motion.a>
                    <motion.a
                      href={config.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-white hover:text-cyan-400 transition-colors duration-300 relative overflow-hidden rounded-md"
                      title="Instagram"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/20 opacity-0"
                        whileHover={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.3 }}
                      />
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}