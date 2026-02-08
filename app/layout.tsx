'use client';

import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { useState } from 'react';
import "./globals.css";
import Navigation from "@/components/Navigation";
import FloatingMenu from "@/components/FloatingMenu";
import { PlayerProvider } from "@/context/PlayerContext";
import { LoaderProvider } from "@/context/LoaderContext";
import AudioPlayer from '@/components/AudioPlayer';
import Footer from '@/components/Footer';
import { allTracks } from '@/lib/data/tracks';
import { Track } from '@/lib/types';
import { config } from '@/lib/config';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleTrackChange = (track: Track, index: number) => {
    setCurrentTrack(track);
  };

  const handlePlayStateChange = (isPlaying: boolean) => {
    setIsPlayerActive(isPlaying);
  };

  const handleMuteChange = (muted: boolean) => {
    setIsMuted(muted);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <html lang="en" className="dark">
      <head>
        <title>{config.site.title}</title>
        <meta name="description" content={config.site.description} />
        <meta name="keywords" content={config.site.keywords.join(', ')} />
        <meta property="og:title" content={config.site.title} />
        <meta property="og:description" content={config.site.description} />
        <meta property="og:image" content={config.site.image} />
        <meta property="og:url" content={config.site.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.site.title} />
        <meta name="twitter:description" content={config.site.description} />
        <meta name="twitter:image" content={config.site.image} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen`}>
        <PlayerProvider>
          <LoaderProvider>
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="max-w-7xl mx-auto h-full px-4 md:px-12 grid grid-cols-12 gap-8 md:gap-16 border-x border-white/5">
                {/* Vertical Lines */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-full border-l border-white/10 last:border-r-0" />
                ))}
              </div>
            </div>

            <main className="pb-24">
              {children}
            </main>
            <Footer />

            {/* Unified Floating Menu & Player */}
            <FloatingMenu />

            {/* Headless Audio Player (Logic Only) */}
            {allTracks.length > 0 && (
              <div className="hidden">
                <AudioPlayer
                  tracks={allTracks}
                  onTrackChange={handleTrackChange}
                  onPlayStateChange={handlePlayStateChange}
                  onMuteChange={handleMuteChange}
                />
              </div>
            )}
          </LoaderProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}