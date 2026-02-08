'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function ScrollSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    return (
        <section ref={containerRef} className="relative z-10 min-h-screen py-20 px-4 md:px-12 bg-transparent text-white overflow-hidden font-syne">

            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* 1. Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 mb-12"
                >
                    <span className="text-gray-400 uppercase tracking-[0.2em] text-xs font-medium">REDEFINING</span>
                    <span className="text-white uppercase tracking-[0.2em] text-xs font-bold">THE FUTURE OF MUSIC</span>
                </motion.div>

                {/* 2. Animated Scribble */}
                <div className="relative w-32 h-48 md:w-48 md:h-64 mb-16 opacity-80">
                    <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <motion.path
                            d="M100,20 C140,20 160,40 140,80 C120,120 40,100 80,180 C110,240 60,260 90,290"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M80,20 C120,20 140,50 120,90 C100,130 60,140 90,220"
                            stroke="white"
                            strokeWidth="1"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                            className="opacity-50"
                        />
                    </svg>
                </div>

                {/* 3. Main Grid Content */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    {/* Left: (About) Label */}
                    <div className="col-span-1 md:col-span-2 pt-2 md:pt-4">
                        <span className="text-neutral-500 text-sm md:text-base font-medium">(About)</span>
                    </div>

                    {/* Right: Large Text */}
                    <div className="col-span-1 md:col-span-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-center md:text-left"
                        >
                            Empowering artists, captivating global
                            <span className="inline-block relative w-28 h-12 md:w-40 md:h-16 mx-2 align-bottom rounded-full overflow-hidden bg-neutral-800 border border-white/10 transform translate-y-2">
                                <Image
                                    src="/hero/j6.JPG.jpeg"
                                    alt="Global Audiences"
                                    fill
                                    className="object-cover opacity-80"
                                />
                                {/* Animated Equalizer Overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-full flex items-end justify-center gap-[3px] pb-3 z-10 px-4">
                                    {[0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 0.4, 0.7, 0.3].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 md:w-1.5 bg-white rounded-t-full shadow-sm"
                                            animate={{ height: ["20%", `${h * 60}%`, "25%"] }}
                                            transition={{
                                                duration: 0.5 + Math.random() * 0.5,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                ease: "easeInOut",
                                                delay: i * 0.05
                                            }}
                                        />
                                    ))}
                                </div>
                            </span>
                            audiences, and redefining the future of music
                        </motion.h2>
                    </div>

                </div>

            </div>
        </section>
    );
}
