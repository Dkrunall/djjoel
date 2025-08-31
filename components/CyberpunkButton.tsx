'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface CyberpunkButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  glitchOnHover?: boolean;
}

export default function CyberpunkButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  glitchOnHover = true
}: CyberpunkButtonProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-cyan-500 to-blue-600',
      border: 'border-cyan-400',
      shadow: 'shadow-cyan-500/50',
      glow: 'shadow-lg shadow-cyan-500/50'
    },
    secondary: {
      bg: 'bg-gradient-to-r from-purple-500 to-pink-600',
      border: 'border-purple-400',
      shadow: 'shadow-purple-500/50',
      glow: 'shadow-lg shadow-purple-500/50'
    },
    danger: {
      bg: 'bg-gradient-to-r from-red-500 to-red-600',
      border: 'border-red-400',
      shadow: 'shadow-red-500/50',
      glow: 'shadow-lg shadow-red-500/50'
    },
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
      border: 'border-green-400',
      shadow: 'shadow-green-500/50',
      glow: 'shadow-lg shadow-green-500/50'
    }
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantConfig = variants[variant];
  const sizeConfig = sizes[size];

  const handleMouseEnter = () => {
    if (glitchOnHover && !disabled) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }
  };

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden font-mono font-bold uppercase tracking-wider',
        'border-2 rounded-lg transition-all duration-300',
        'hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        variantConfig.bg,
        variantConfig.border,
        sizeConfig,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      whileHover={{
        boxShadow: disabled ? undefined : `0 0 20px ${variantConfig.shadow.split('/')[0]}`,
        textShadow: disabled ? undefined : '0 0 10px rgba(255, 255, 255, 0.8)'
      }}
      whileTap={{
        scale: disabled ? 1 : 0.95
      }}
    >
      {/* Background glow effect */}
      <motion.div
        className={cn(
          'absolute inset-0 opacity-0 transition-opacity duration-300',
          variantConfig.bg
        )}
        animate={{
          opacity: isGlitching ? [0, 0.3, 0] : 0
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Glitch overlay */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0 bg-red-500 mix-blend-screen"
            animate={{
              x: [-2, 2, -1, 1, 0],
              opacity: [0.3, 0.7, 0.2, 0.5, 0]
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute inset-0 bg-cyan-500 mix-blend-screen"
            animate={{
              x: [2, -2, 1, -1, 0],
              opacity: [0.2, 0.5, 0.3, 0.4, 0]
            }}
            transition={{ duration: 0.2 }}
          />
        </>
      )}

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-0"
        animate={{
          y: ['-100%', '100%'],
          opacity: [0, 0.1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Button content */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{
          x: isGlitching ? [-1, 1, -0.5, 0.5, 0] : 0
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white opacity-50" />
    </motion.button>
  );
}