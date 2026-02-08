'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, AudioLines, ArrowRight } from 'lucide-react';

export default function AwardsSection() {
    return (
        <section className="relative z-10 min-h-screen w-full bg-transparent text-white overflow-hidden font-syne py-20 px-4 md:px-12 flex flex-col gap-24">

            {/* 1. Top Section - Moon Phases & Awards */}
            <div className="w-full flex flex-col gap-12">
                {/* Top Right Label */}
                <div className="w-full flex justify-end">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2 text-right max-w-[200px] md:max-w-xs"
                    >
                        <ArrowUpRight size={24} className="text-neutral-500 mt-1" />
                        <p className="text-sm md:text-base text-neutral-400 font-medium leading-tight">
                            Proud recipients of 6 x RIAA Gold® awards!
                        </p>
                    </motion.div>
                </div>

                {/* Center Content: Moon Phases / Circles */}
                <div className="flex-1 flex items-center justify-center w-full">
                    <div className="flex items-center gap-4 md:gap-12 lg:gap-20">
                        {/* 1. Left Crescent Outline */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full border border-white/30 relative"
                        >
                            <div className="absolute inset-0 bg-black rounded-full translate-x-1/2 scale-x-[0.6]" />
                        </motion.div>

                        {/* 2. Left Filled Phase */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-r from-blue-900 to-transparent opacity-80 overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-black rounded-full translate-x-[40%]" />
                        </motion.div>

                        {/* 3. Center Circle (Vinyl Record) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden z-10 flex items-center justify-center bg-neutral-900 shadow-2xl"
                        >
                            <motion.div
                                className="relative w-full h-full rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(#111_0,#111_2px,#222_3px)] opacity-90" />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full overflow-hidden border-4 border-neutral-800">
                                    <Image src="/hero/j7.JPG.jpeg" alt="Vinyl Label" fill className="object-cover" />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* 4. Right Filled Phase */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-l from-blue-900 to-transparent opacity-80 overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-black rounded-full -translate-x-[40%]" />
                        </motion.div>

                        {/* 5. Right Crescent Outline */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full border border-white/30 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-black rounded-full -translate-x-1/2 scale-x-[0.6]" />
                        </motion.div>
                    </div>
                </div>
            </div>


            {/* 2. Our Artists Header Section */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-white/10 pt-16">

                {/* Left Label */}
                <div className="hidden md:block col-span-2">
                    <span className="text-neutral-500 text-sm font-medium">(Meet<br />our Artists)</span>
                </div>

                {/* Main Title */}
                <div className="col-span-1 md:col-span-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[3.5rem] md:text-[8rem] leading-[0.9] font-medium tracking-tighter"
                    >
                        Our
                        <div className="pl-24 md:pl-32">Artists</div>
                    </motion.h2>
                </div>

                {/* Right Description */}
                <div className="col-span-1 md:col-span-4 flex flex-col items-start md:items-start justify-end gap-6 pb-4">
                    <AudioLines className="text-blue-400 w-8 h-8" />
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">
                        Kurate Music has had the privilege of collaborating with a diverse array of independent acts, covering genres ranging from ambient to pop, and everything in between.
                    </p>
                    <a href="#" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors text-sm font-mediumgroup">
                        Learn more
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>


            {/* 3. Artists Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-white/10">

                {/* Card 1: Øneheart */}
                <div className="border-r border-white/10 p-8 flex flex-col gap-8 min-h-[600px] hover:bg-white/5 transition-colors duration-500">
                    <div className="flex flex-col gap-4">
                        <span className="text-neutral-500 text-sm">(1)</span>
                        <h3 className="text-3xl font-medium">Øneheart</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Dmitry Volynkin, aka Øneheart, embarked on his musical journey at 11. He&apos;s a visionary multi-genre artist crafting ambient, wave, and electronic landscapes.
                        </p>
                    </div>
                    <div className="flex-1 relative w-full h-[300px] mt-auto overflow-hidden bg-neutral-900">
                        <Image
                            src="/hero/j8.JPG.jpeg"
                            alt="Øneheart"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>

                {/* Card 2: Main Portrait */}
                <div className="border-r border-white/10 relative min-h-[600px] group overflow-hidden">
                    <Image
                        src="/hero/j9.JPG.jpeg"
                        alt="Featured Artist"
                        fill
                        className="object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Card 3: Caleb Arredondo */}
                <div className="p-8 flex flex-col gap-8 min-h-[600px] hover:bg-white/5 transition-colors duration-500">
                    <div className="flex flex-col gap-4">
                        <span className="text-neutral-500 text-sm">(3)</span>
                        <h3 className="text-3xl font-medium">Caleb Arredondo</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Caleb started by posting his own saxophone compositions on social media. He experimented with playing in an empty parking lot, using the natural reverb to create a signature sound.
                        </p>
                    </div>
                    <div className="flex-1 relative w-full h-[200px] mt-auto overflow-hidden bg-neutral-900">
                        <Image
                            src="/hero/j10.JPG.jpeg"
                            alt="Caleb Arredondo"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                </div>

            </div>

        </section>
    );
}
