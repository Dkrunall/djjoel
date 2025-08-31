'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlitchBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'red' | 'cyan' | 'purple' | 'green';
}

export default function GlitchBackground({
  className = '',
  intensity = 'medium',
  color = 'red'
}: GlitchBackgroundProps) {
  const [glitchLines, setGlitchLines] = useState<Array<{ id: number; height: number; top: number; opacity: number }>>([]);

  const intensityConfig = {
    low: { lineCount: 3, frequency: 3000 },
    medium: { lineCount: 5, frequency: 2000 },
    high: { lineCount: 8, frequency: 1000 }
  };

  const colorConfig = {
    red: 'bg-red-500',
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500'
  };

  const config = intensityConfig[intensity];
  const colorClass = colorConfig[color];

  useEffect(() => {
    const generateGlitchLines = () => {
      const lines = Array.from({ length: config.lineCount }, (_, i) => ({
        id: i,
        height: Math.random() * 4 + 1, // 1-5px height
        top: Math.random() * 100, // 0-100% from top
        opacity: Math.random() * 0.8 + 0.2 // 0.2-1 opacity
      }));
      setGlitchLines(lines);
    };

    generateGlitchLines();
    const interval = setInterval(generateGlitchLines, config.frequency);

    return () => clearInterval(interval);
  }, [config.lineCount, config.frequency]);

  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {/* Static noise overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
        animate={{
          opacity: [0.02, 0.08, 0.02]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Glitch lines */}
      {glitchLines.map((line) => (
        <motion.div
          key={line.id}
          className={cn('absolute left-0 right-0', colorClass)}
          style={{
            height: `${line.height}px`,
            top: `${line.top}%`,
            opacity: line.opacity
          }}
          initial={{ scaleX: 0, x: '-100%' }}
          animate={{
            scaleX: [0, 1, 1, 0],
            x: ['-100%', '0%', '0%', '100%']
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Scan lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.03) 50%)',
          backgroundSize: '100% 4px'
        }}
        animate={{
          backgroundPositionY: ['0px', '4px']
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* RGB shift effect */}
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        animate={{
          background: [
            'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.1) 50%, transparent 100%)',
            'linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)',
            'linear-gradient(90deg, transparent 0%, rgba(255, 0, 255, 0.1) 50%, transparent 100%)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop'
        }}
      />
    </div>
  );
}