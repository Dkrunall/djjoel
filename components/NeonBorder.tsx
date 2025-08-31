'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NeonBorderProps {
  children: ReactNode;
  className?: string;
  color?: 'cyan' | 'purple' | 'red' | 'green' | 'yellow' | 'pink';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  cornerAccents?: boolean;
}

export default function NeonBorder({
  children,
  className = '',
  color = 'cyan',
  intensity = 'medium',
  animated = true,
  cornerAccents = true
}: NeonBorderProps) {
  const colorConfig = {
    cyan: {
      border: 'border-cyan-400',
      shadow: 'shadow-cyan-500/50',
      glow: '#00ffff'
    },
    purple: {
      border: 'border-purple-400',
      shadow: 'shadow-purple-500/50',
      glow: '#8b5cf6'
    },
    red: {
      border: 'border-red-400',
      shadow: 'shadow-red-500/50',
      glow: '#ef4444'
    },
    green: {
      border: 'border-green-400',
      shadow: 'shadow-green-500/50',
      glow: '#10b981'
    },
    yellow: {
      border: 'border-yellow-400',
      shadow: 'shadow-yellow-500/50',
      glow: '#f59e0b'
    },
    pink: {
      border: 'border-pink-400',
      shadow: 'shadow-pink-500/50',
      glow: '#ec4899'
    }
  };

  const intensityConfig = {
    low: { blur: 5, spread: 2 },
    medium: { blur: 10, spread: 4 },
    high: { blur: 20, spread: 8 }
  };

  // Ensure we always have a valid config with fallback
  const defaultConfig = {
    border: 'border-cyan-400',
    shadow: 'shadow-cyan-500/50',
    glow: '#00ffff'
  };
  
  const config = (colorConfig[color as keyof typeof colorConfig] || colorConfig.cyan || defaultConfig);
  const intensitySettings = intensityConfig[intensity as keyof typeof intensityConfig] || intensityConfig.medium || { blur: 10, spread: 4 };
  
  // Ensure config has all required properties
  const safeConfig = {
    border: config?.border || 'border-cyan-400',
    shadow: config?.shadow || 'shadow-cyan-500/50',
    glow: config?.glow || '#00ffff'
  };

  return (
    <motion.div
      className={cn(
        'relative border-2 rounded-lg',
        safeConfig.border,
        className
      )}
      animate={animated ? {
        boxShadow: [
          `0 0 ${intensitySettings.blur}px ${intensitySettings.spread}px ${safeConfig.glow}40`,
          `0 0 ${intensitySettings.blur * 1.5}px ${intensitySettings.spread * 1.5}px ${safeConfig.glow}60`,
          `0 0 ${intensitySettings.blur}px ${intensitySettings.spread}px ${safeConfig.glow}40`
        ]
      } : {
        boxShadow: `0 0 ${intensitySettings.blur}px ${intensitySettings.spread}px ${safeConfig.glow}40`
      }}
      transition={{
        duration: 2,
        repeat: animated ? Infinity : 0,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }}
    >
      {/* Corner accents */}
      {cornerAccents && (
        <>
          <motion.div
            className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"
            animate={animated ? {
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: animated ? Infinity : 0,
              repeatType: 'reverse'
            }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white"
            animate={animated ? {
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: animated ? Infinity : 0,
              repeatType: 'reverse',
              delay: 0.2
            }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white"
            animate={animated ? {
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: animated ? Infinity : 0,
              repeatType: 'reverse',
              delay: 0.4
            }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"
            animate={animated ? {
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: animated ? Infinity : 0,
              repeatType: 'reverse',
              delay: 0.6
            }}
          />
        </>
      )}

      {/* Animated border lines */}
      {animated && (
        <>
          {/* Top line */}
          <motion.div
            className={cn('absolute top-0 left-0 h-0.5', `bg-${color}-400`)}
            animate={{
              width: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          {/* Right line */}
          <motion.div
            className={cn('absolute top-0 right-0 w-0.5', `bg-${color}-400`)}
            animate={{
              height: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.75
            }}
          />
          {/* Bottom line */}
          <motion.div
            className={cn('absolute bottom-0 right-0 h-0.5', `bg-${color}-400`)}
            animate={{
              width: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5
            }}
          />
          {/* Left line */}
          <motion.div
            className={cn('absolute bottom-0 left-0 w-0.5', `bg-${color}-400`)}
            animate={{
              height: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2.25
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}