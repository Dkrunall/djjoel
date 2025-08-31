// Local storage utility functions for DJ JOEL website

import { ExclusiveAccess, PlayerState, Track } from '../types';

// Storage keys
const EXCLUSIVE_ACCESS_KEY = 'dj-joel-exclusive';
const PLAYER_STATE_KEY = 'dj-joel-player';
const VOLUME_KEY = 'dj-joel-volume';

/**
 * Set exclusive access in localStorage
 */
export const setExclusiveAccess = (hasAccess: boolean): void => {
  try {
    const accessData: ExclusiveAccess = {
      hasAccess,
      timestamp: Date.now(),
      deviceId: crypto.randomUUID()
    };
    localStorage.setItem(EXCLUSIVE_ACCESS_KEY, JSON.stringify(accessData));
  } catch (error) {
    console.warn('Failed to save exclusive access to localStorage:', error);
  }
};

/**
 * Get exclusive access from localStorage
 */
export const getExclusiveAccess = (): boolean => {
  try {
    const stored = localStorage.getItem(EXCLUSIVE_ACCESS_KEY);
    if (!stored) return false;
    
    const accessData: ExclusiveAccess = JSON.parse(stored);
    const daysSinceAccess = (Date.now() - accessData.timestamp) / (1000 * 60 * 60 * 24);
    
    // Access expires after 30 days
    return accessData.hasAccess && daysSinceAccess < 30;
  } catch (error) {
    console.warn('Failed to read exclusive access from localStorage:', error);
    return false;
  }
};

/**
 * Clear exclusive access from localStorage
 */
export const clearExclusiveAccess = (): void => {
  try {
    localStorage.removeItem(EXCLUSIVE_ACCESS_KEY);
  } catch (error) {
    console.warn('Failed to clear exclusive access from localStorage:', error);
  }
};

/**
 * Save player state to localStorage
 */
export const savePlayerState = (state: Partial<PlayerState>): void => {
  try {
    const currentState = getPlayerState();
    const newState = { ...currentState, ...state };
    localStorage.setItem(PLAYER_STATE_KEY, JSON.stringify(newState));
  } catch (error) {
    console.warn('Failed to save player state to localStorage:', error);
  }
};

/**
 * Get player state from localStorage
 */
export const getPlayerState = (): PlayerState => {
  const defaultState: PlayerState = {
    currentTrack: 0,
    playlist: [],
    isPlaying: false,
    volume: 0.8,
    shuffle: false,
    loop: 'none'
  };
  
  try {
    const stored = localStorage.getItem(PLAYER_STATE_KEY);
    if (!stored) return defaultState;
    
    const state: PlayerState = JSON.parse(stored);
    return { ...defaultState, ...state };
  } catch (error) {
    console.warn('Failed to read player state from localStorage:', error);
    return defaultState;
  }
};

/**
 * Clear player state from localStorage
 */
export const clearPlayerState = (): void => {
  try {
    localStorage.removeItem(PLAYER_STATE_KEY);
  } catch (error) {
    console.warn('Failed to clear player state from localStorage:', error);
  }
};

/**
 * Save volume setting
 */
export const saveVolume = (volume: number): void => {
  try {
    localStorage.setItem(VOLUME_KEY, volume.toString());
  } catch (error) {
    console.warn('Failed to save volume to localStorage:', error);
  }
};

/**
 * Get volume setting
 */
export const getVolume = (): number => {
  try {
    const stored = localStorage.getItem(VOLUME_KEY);
    if (!stored) return 0.8; // Default volume
    
    const volume = parseFloat(stored);
    return isNaN(volume) ? 0.8 : Math.max(0, Math.min(1, volume));
  } catch (error) {
    console.warn('Failed to read volume from localStorage:', error);
    return 0.8;
  }
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get storage usage info
 */
export const getStorageInfo = (): { used: number; available: number } => {
  if (!isStorageAvailable()) {
    return { used: 0, available: 0 };
  }
  
  try {
    let used = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    
    // Rough estimate of available space (5MB typical limit)
    const available = 5 * 1024 * 1024 - used;
    
    return { used, available: Math.max(0, available) };
  } catch (error) {
    console.warn('Failed to calculate storage info:', error);
    return { used: 0, available: 0 };
  }
};

/**
 * Clear all DJ JOEL related data from localStorage
 */
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(EXCLUSIVE_ACCESS_KEY);
    localStorage.removeItem(PLAYER_STATE_KEY);
    localStorage.removeItem(VOLUME_KEY);
  } catch (error) {
    console.warn('Failed to clear all data from localStorage:', error);
  }
};