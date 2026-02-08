'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

const tracks = [
    {
        title: "Idea 10",
        artist: "Gibran Alcocer",
        genre: "Neoclassical, Solo Piano",
        image: "/hero/j11.JPG.jpeg" // Using existing assets
    },
    {
        title: "School Rooftop",
        artist: "", // Blank in reference
        genre: "Lofi Hip-Hop",
        image: "/hero/j12.JPG.jpeg"
    },
    {
        title: "Shootout",
        artist: "Izzamuzzic, Julien Marchal",
        genre: "Collaborations, Electronic",
        image: "/hero/j13.JPG.jpeg"
    },
    {
        title: "Snowfall",
        artist: "Øneheart",
        genre: "Collaborations, Ambient",
        image: "/hero/j14.JPG.jpeg"
    }
];

export default function RecordsSection() {
    const { playTrack } = usePlayer();

    return (
        <section className="relative z-10 min-h-screen w-full bg-transparent text-white overflow-hidden font-syne py-20 px-4 md:px-12">

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                {/* Left Column: Let's Explore & Description */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[50vh] lg:min-h-0">

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[3.5rem] md:text-[7rem] lg:text-[8rem] leading-[0.9] font-medium tracking-tighter"
                    >
                        Let's<br />Explore
                    </motion.h2>

                    {/* Bottom Description */}
                    <div className="flex flex-col gap-6 mt-12 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <ArrowDownLeft size={32} className="text-neutral-500 mb-4" />
                            <p className="text-neutral-400 text-sm md:text-base max-w-xs leading-relaxed">
                                To date, Kurate has collaborated with over 1,000 artists and has garnered a global audience of millions.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Right Column: Our Records & Tracklist */}
                <div className="lg:col-span-7 flex flex-col gap-12">

                    {/* Header Row */}
                    <div className="flex items-start justify-between">
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[3.5rem] md:text-[6rem] lg:text-[7rem] leading-[0.9] font-medium tracking-tighter"
                        >
                            Our<br />Records
                        </motion.h2>

                        <motion.button
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, type: "spring" }}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                        >
                            <ArrowDownLeft size={32} />
                        </motion.button>
                    </div>

                    {/* Tracklist Table */}
                    <div className="w-full flex flex-col">

                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-neutral-500 text-sm font-medium uppercase tracking-wider">
                            <div className="col-span-1"></div> {/* Play Icon Space */}
                            <div className="col-span-5">Track</div>
                            <div className="col-span-3">Artist(s)</div>
                            <div className="col-span-3 flex justify-between">
                                <span>Genre</span>
                                <Plus size={16} />
                            </div>
                        </div>

                        {/* Tracks */}
                        <div className="flex flex-col">
                            {tracks.map((track, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    onClick={() => playTrack(track)}
                                    className="group grid grid-cols-12 gap-4 py-6 border-b border-white/10 items-center hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                    {/* Play Button */}
                                    <div className="col-span-1 flex justify-center">
                                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                                            <Play size={14} fill="currentColor" />
                                        </div>
                                    </div>

                                    {/* Track Info */}
                                    <div className="col-span-5 flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded bg-neutral-800 overflow-hidden shrink-0">
                                            <Image src={track.image} alt={track.title} fill className="object-cover" />
                                        </div>
                                        <span className="font-medium text-lg">{track.title}</span>
                                    </div>

                                    {/* Artist */}
                                    <div className="col-span-3 text-neutral-400 text-sm">
                                        {track.artist}
                                    </div>

                                    {/* Genre */}
                                    <div className="col-span-3 text-neutral-500 text-sm">
                                        {track.genre}
                                    </div>

                                </motion.div>
                            ))}
                        </div>

                        {/* Show More */}
                        <div className="w-full flex justify-center mt-12">
                            <button className="text-white border-b border-white pb-1 text-sm font-medium hover:text-neutral-300 transition-colors">
                                Show more
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
