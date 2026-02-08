'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Track = {
    title: string;
    artist: string;
    image: string;
};

type PlayerContextType = {
    currentTrack: Track | null;
    isPlaying: boolean;
    isPlayerOpen: boolean;
    playTrack: (track: Track) => void;
    togglePlay: () => void;
    togglePlayer: () => void;
    closePlayer: () => void; // Minimizes player
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);

    const playTrack = (track: Track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
        setIsPlayerOpen(true); // Auto expand when playing new track
    };

    const togglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    const togglePlayer = () => {
        setIsPlayerOpen((prev) => !prev);
    };

    const closePlayer = () => {
        setIsPlayerOpen(false); // Just minimize, don't stop music
    };

    return (
        <PlayerContext.Provider value={{ currentTrack, isPlaying, isPlayerOpen, playTrack, togglePlay, togglePlayer, closePlayer }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
}
