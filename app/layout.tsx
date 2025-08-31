'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState, useEffect } from 'react';
import "./globals.css";
import Navigation from '@/components/Navigation';
import AudioPlayer from '@/components/AudioPlayer';
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
        <Navigation 
          isPlayerActive={isPlayerActive}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
        
        <main className="pt-16 lg:pt-20 pb-24">
          {children}
        </main>

        {allTracks.length > 0 && (
          <AudioPlayer
            tracks={allTracks}
            onTrackChange={handleTrackChange}
            onPlayStateChange={handlePlayStateChange}
            onMuteChange={handleMuteChange}
          />
        )}
      </body>
    </html>
  );
}