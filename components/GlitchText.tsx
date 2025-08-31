'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  trigger?: 'hover' | 'auto' | 'none';
  duration?: number;
}

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function GlitchText({
  text,
  className = '',
  intensity = 'medium',
  trigger = 'hover',
  duration = 2000
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchedText, setGlitchedText] = useState(text);

  const intensityConfig = {
    low: { probability: 0.1, maxGlitchChars: 1 },
    medium: { probability: 0.2, maxGlitchChars: 2 },
    high: { probability: 0.3, maxGlitchChars: 3 }
  };

  const config = intensityConfig[intensity];

  const createGlitchedText = useCallback(() => {
    return text
      .split('')
      .map((char) => {
        if (Math.random() < config.probability && char !== ' ') {
          const glitchCount = Math.floor(Math.random() * config.maxGlitchChars) + 1;
          return Array(glitchCount)
            .fill(0)
            .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
            .join('');
        }
        return char;
      })
      .join('');
  }, [text, config.probability, config.maxGlitchChars]);

  useEffect(() => {
    if (trigger === 'auto') {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }, duration);
      return () => clearInterval(interval);
    }
  }, [trigger, duration]);

  useEffect(() => {
    if (isGlitching) {
      const glitchInterval = setInterval(() => {
        setGlitchedText(createGlitchedText());
      }, 50);

      const resetTimeout = setTimeout(() => {
        setGlitchedText(text);
        setIsGlitching(false);
      }, 200);

      return () => {
        clearInterval(glitchInterval);
        clearTimeout(resetTimeout);
      };
    }
  }, [isGlitching, text, config.probability, config.maxGlitchChars, createGlitchedText]);

  const handleTrigger = () => {
    if (trigger === 'hover' && !isGlitching) {
      setIsGlitching(true);
    }
  };

  return (
    <motion.span
      className={cn(
        'relative inline-block font-mono',
        isGlitching && 'text-red-500',
        className
      )}
      onMouseEnter={handleTrigger}
      animate={{
        textShadow: isGlitching
          ? [
              '2px 0 #ff0000, -2px 0 #00ffff',
              '3px 0 #ff0000, -3px 0 #00ffff',
              '1px 0 #ff0000, -1px 0 #00ffff',
              '0 0 #ff0000, 0 0 #00ffff'
            ]
          : '0 0 transparent',
        x: isGlitching ? [0, -2, 2, -1, 1, 0] : 0
      }}
      transition={{
        duration: 0.2,
        ease: 'easeInOut'
      }}
    >
      {glitchedText}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-red-500 opacity-70"
            animate={{
              x: [-2, 2, -1, 1, 0],
              opacity: [0.7, 0.3, 0.8, 0.2, 0]
            }}
            transition={{ duration: 0.2 }}
          >
            {glitchedText}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-cyan-500 opacity-50"
            animate={{
              x: [2, -2, 1, -1, 0],
              opacity: [0.5, 0.8, 0.3, 0.6, 0]
            }}
            transition={{ duration: 0.2 }}
          >
            {glitchedText}
          </motion.span>
        </>
      )}
    </motion.span>
  );
}