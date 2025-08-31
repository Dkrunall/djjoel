// Audio utility functions for DJ JOEL website

/**
 * Format duration from seconds to MM:SS format
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Format duration to human readable format (e.g., "3m 45s")
 */
export const formatDurationHuman = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
};

/**
 * Convert time string (MM:SS) to seconds
 */
export const parseTimeToSeconds = (timeString: string): number => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (currentTime: number, duration: number): number => {
  if (duration === 0) return 0;
  return Math.min(100, (currentTime / duration) * 100);
};

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get next track index based on current index and loop mode
 */
export const getNextTrackIndex = (
  currentIndex: number,
  playlistLength: number,
  loop: 'none' | 'track' | 'playlist',
  shuffle: boolean = false
): number | null => {
  if (loop === 'track') {
    return currentIndex;
  }
  
  if (shuffle) {
    // For shuffle, return random index that's not current
    const availableIndices = Array.from({ length: playlistLength }, (_, i) => i)
      .filter(i => i !== currentIndex);
    
    if (availableIndices.length === 0) {
      return loop === 'playlist' ? currentIndex : null;
    }
    
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
  }
  
  const nextIndex = currentIndex + 1;
  
  if (nextIndex >= playlistLength) {
    return loop === 'playlist' ? 0 : null;
  }
  
  return nextIndex;
};

/**
 * Get previous track index
 */
export const getPreviousTrackIndex = (
  currentIndex: number,
  playlistLength: number,
  loop: 'none' | 'track' | 'playlist'
): number | null => {
  const prevIndex = currentIndex - 1;
  
  if (prevIndex < 0) {
    return loop === 'playlist' ? playlistLength - 1 : null;
  }
  
  return prevIndex;
};

/**
 * Validate audio file URL
 */
export const isValidAudioUrl = (url: string): boolean => {
  const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
  return audioExtensions.some(ext => url.toLowerCase().includes(ext));
};

/**
 * Create audio element with error handling
 */
export const createAudioElement = (src: string): Promise<HTMLAudioElement> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    
    audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
    audio.addEventListener('error', () => reject(new Error(`Failed to load audio: ${src}`)), { once: true });
    
    audio.src = src;
    audio.load();
  });
};