'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ScrollExplore from './ScrollExplore';

// Animation Variants
const reveal = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.5 + i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }
    })
};

const maskReveal = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.8 } }
};

const cardDeck = {
    hidden: { rotate: 0, scale: 0.8, y: 100, opacity: 0 },
    visible: (i: number) => ({
        rotate: (i - 1.5) * 5, // Spread around center
        scale: 1,
        y: 0,
        opacity: 1,
        transition: {
            delay: 1.8 + i * 0.1,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function Hero() {
    return (
        <section className="relative z-10 min-h-screen w-full bg-transparent text-white font-syne">

            {/* 1. Grid Background - REMOVED (Using Global Grid from Layout) */}

            {/* 2. Top Left - Brand & Vertical Text & Image */}
            <div className="absolute top-12 left-12 z-20 flex flex-col gap-6">
                {/* Logo */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center">
                    <div className="relative w-32 h-12">
                        <Image
                            src="/jlogo.png"
                            alt="Kurate Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Image & Vertical Text Container */}
                <div className="relative mt-2 ml-4">
                    {/* Vertical Text */}
                    <div className="absolute -left-10 top-0 bottom-0 flex items-center justify-center">
                        <span className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-neutral-300 rotate-180 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
                            Empowering Artists
                        </span>
                    </div>

                    {/* Artist Image (from public/hero) */}
                    <motion.div
                        custom={1}
                        variants={reveal}
                        initial="hidden"
                        animate="visible"
                        className="relative w-[160px] h-[220px] md:w-[180px] md:h-[260px] overflow-hidden rounded-sm"
                    >
                        <Image
                            src="/hero/j4.JPG.jpeg"
                            alt="Live Performance"
                            fill
                            className="object-cover"
                        />
                        {/* Scribble Overlay Simulation */}
                        <div className="absolute bottom-4 right-2 text-white/90">
                            <svg width="30" height="30" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                                <path d="M10,90 Q50,10 90,90" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 3. Top Right - Image & Caption */}
            <div className="absolute top-32 right-12 z-20 hidden md:flex flex-col gap-3">
                <motion.div
                    custom={2}
                    variants={reveal}
                    initial="hidden"
                    animate="visible"
                    className="relative w-[220px] h-[140px] md:w-[260px] md:h-[180px] overflow-hidden rounded-sm"
                >
                    {/* Guitarist (from public/hero) */}
                    <Image
                        src="/hero/j1.JPG.jpeg"
                        alt="Guitarist"
                        fill
                        className="object-cover grayscale-[20%] contrast-110"
                    />
                </motion.div>
                <div className="overflow-hidden">
                    <motion.p
                        variants={maskReveal}
                        initial="hidden"
                        animate="visible"
                        className="text-[10px] md:text-xs text-neutral-300 tracking-wide font-medium"
                    >
                        Captivating Global Audiences
                    </motion.p>
                </div>
            </div>

            {/* 4. Center - Main Logo Title */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] z-30 text-center w-full pointer-events-none">
                <div className="relative inline-block w-full max-w-4xl px-4">
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        className="relative w-full h-[20vh] md:h-[30vh]"
                    >
                        <Image
                            src="/jlogo.png"
                            alt="Kurate"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </div>

                <div className="overflow-hidden mt-2">
                    {/* Dynamic Record Label text removed */}
                </div>
            </div>

            {/* 5. Bottom Center - Card Deck & Scroll Indicator */}
            <div className="absolute -bottom-12 left-0 w-full h-[50vh] z-10 flex items-end justify-center pb-8 pointer-events-none">
                <div className="relative w-full max-w-4xl flex items-end justify-center">

                    {/* Cards - Portrait Ratio (Narrower width, Taller height) */}
                    <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[450px]">

                        {/* Rotating Scroll Text - Attached to Card Container, shifted Left */}
                        <div className="absolute -left-[100px] md:-left-[180px] bottom-10 md:bottom-20 z-20">
                            <ScrollExplore />
                        </div>

                        {[0, 1].map((i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={cardDeck}
                                initial="hidden"
                                animate="visible"
                                className="absolute inset-x-0 bottom-0 h-full rounded-2xl overflow-hidden shadow-2xl origin-bottom"
                                style={{ zIndex: i }}
                            >
                                <div className="relative w-full h-full bg-neutral-900">
                                    {/* Ref image: Singer with warm/red light */}
                                    <Image
                                        src={i === 1 ? "/hero/j5.JPG.jpeg" : "/hero/j2.JPG.jpeg"}
                                        alt="Gallery"
                                        fill
                                        className="object-cover brightness-[0.6] hover:brightness-100 transition-all duration-500"
                                    />
                                    {/* Gradient Overlay for text readability if needed */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}
