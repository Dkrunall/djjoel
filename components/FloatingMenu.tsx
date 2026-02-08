'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Play, Pause, X, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlayer } from '@/context/PlayerContext';
import { useLoader } from '@/context/LoaderContext';

export default function FloatingMenu() {
    const { currentTrack, isPlaying, isPlayerOpen, playTrack, togglePlay, togglePlayer, closePlayer } = usePlayer();
    const { isLoading } = useLoader();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // If player is open, we show player controls. Otherwise, standard menu.
    const showPlayer = isPlayerOpen && currentTrack;

    if (isLoading) return null;

    return (
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4">
            <motion.div
                layout
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                    mass: 0.8
                }}
                className="relative overflow-hidden shadow-2xl w-fit mx-auto"
                style={{
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(90deg, rgba(80,60,60,0.95) 0%, rgba(30,40,50,0.95) 100%)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    maxWidth: '34rem', // Static constraint
                }}
                animate={{
                    width: isMenuOpen || showPlayer ? '100%' : 'auto', // Smooth width transition
                }}
            >
                <motion.div layout className="flex flex-col">

                    {/* Expanded Menu Content (Only if Menu is Open AND Player is NOT Open) */}
                    <AnimatePresence>
                        {isMenuOpen && !showPlayer && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pb-0 grid grid-cols-2 gap-8 text-white">
                                    {/* Explore Column */}
                                    <div className="flex flex-col gap-4">
                                        <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Explore</span>
                                        <nav className="flex flex-col gap-3">
                                            {['Home', 'Careers', 'Artists', 'Sync Licensing'].map((item) => (
                                                <Link
                                                    key={item}
                                                    href="#"
                                                    className="text-lg font-medium hover:text-white/70 transition-colors"
                                                >
                                                    {item}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* Follow Column */}
                                    <div className="flex flex-col gap-4">
                                        <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Follow</span>
                                        <nav className="flex flex-col gap-3">
                                            {['Twitter', 'Instagram', 'Facebook'].map((item) => (
                                                <Link
                                                    key={item}
                                                    href="#"
                                                    className="text-base text-white/80 hover:text-white transition-colors"
                                                >
                                                    {item}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bar Content */}
                    <motion.div layout className={`flex items-center px-2 py-2 gap-2 ${isMenuOpen && !showPlayer ? 'mt-4 border-t border-white/5 pt-4 pb-4 px-6' : ''}`}>

                        {/* MODE: FULL PLAYER */}
                        {showPlayer ? (
                            <div className="flex items-center justify-between w-full gap-4 px-2">
                                {/* Left: Track Info */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3 mr-auto"
                                >
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 animate-[spin_10s_linear_infinite]">
                                        <Image
                                            src={currentTrack.image}
                                            alt={currentTrack.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center overflow-hidden">
                                        <span className="text-white text-sm font-medium truncate max-w-[100px] md:max-w-[140px]">
                                            {currentTrack.title}
                                        </span>
                                        <span className="text-neutral-400 text-xs truncate max-w-[100px] md:max-w-[140px]">
                                            {currentTrack.artist || 'Unknown Artist'}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Center: Controls */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 md:gap-4"
                                >
                                    <button className="text-neutral-500 hover:text-white transition-colors hidden sm:block">
                                        <Shuffle size={16} />
                                    </button>
                                    <button className="text-neutral-400 hover:text-white transition-colors">
                                        <SkipBack size={20} fill="currentColor" />
                                    </button>

                                    <button
                                        onClick={togglePlay}
                                        className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black hover:scale-105 transition-transform"
                                    >
                                        {isPlaying ? (
                                            <Pause size={18} fill="currentColor" />
                                        ) : (
                                            <Play size={18} fill="currentColor" className="ml-0.5" />
                                        )}
                                    </button>

                                    <button className="text-neutral-400 hover:text-white transition-colors">
                                        <SkipForward size={20} fill="currentColor" />
                                    </button>
                                    <button className="text-neutral-500 hover:text-white transition-colors hidden sm:block">
                                        <Repeat size={16} />
                                    </button>
                                </motion.div>

                                {/* Right: Close (Minimize) */}
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={closePlayer} // Minimizes to widget
                                    className="text-neutral-500 hover:text-white transition-colors ml-4 p-2"
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>
                        ) : (
                            /* MODE: NAVIGATION (+ Widget) */
                            <>
                                {/* Left Side: "Menu" Button */}
                                <motion.button
                                    layout="position"
                                    className={`flex items-center gap-2 transition-colors text-white group ${isMenuOpen ? '' : 'px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl min-w-[110px]'}`}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <Menu size={18} className={`text-white/80 group-hover:text-white`} />
                                    <span className="text-sm font-medium tracking-wide">Menu</span>
                                </motion.button>

                                {/* Middle: Links (Hidden when Menu Open) */}
                                <AnimatePresence>
                                    {!isMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, width: 'auto', scale: 1 }}
                                            exit={{ opacity: 0, width: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            className="hidden md:flex items-center gap-6 px-4 text-sm font-medium text-gray-300 overflow-hidden whitespace-nowrap origin-left"
                                        >
                                            {['About', 'Artists', 'Releases', 'Contact'].map((item) => (
                                                <Link
                                                    key={item}
                                                    href={`/${item.toLowerCase()}`}
                                                    className="hover:text-white transition-colors tracking-wide"
                                                >
                                                    {item}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Divider */}
                                <AnimatePresence>
                                    {!isMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="hidden md:block mx-1"
                                        >
                                            <div className="w-px h-8 bg-white/10" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Right Side: Player Widget */}
                                <div className="ml-auto">
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        {isMenuOpen ? (
                                            <motion.button
                                                key="close"
                                                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="text-white/70 hover:text-white p-2"
                                            >
                                                <X size={20} />
                                            </motion.button>
                                        ) : (
                                            <motion.div
                                                key="widget"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="flex items-center gap-3 pr-1"
                                            >
                                                <div
                                                    className="relative w-24 h-11 rounded-lg overflow-hidden group cursor-pointer border border-white/10"
                                                    onClick={currentTrack ? togglePlayer : undefined} // Expand if track exists
                                                >
                                                    <Image
                                                        src={currentTrack ? currentTrack.image : "/hero/j21.JPG.jpeg"}
                                                        alt="Track"
                                                        fill
                                                        className={`object-cover transition-opacity ${currentTrack ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
                                                    />
                                                    <div className="absolute inset-0 bg-black/20" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-lg">
                                                            {isPlaying ? (
                                                                <Pause size={12} fill="black" className="text-black" />
                                                            ) : (
                                                                <Play size={12} fill="black" className="text-black ml-0.5" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
