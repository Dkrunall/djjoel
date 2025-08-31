'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MatrixRainProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
  fontSize?: number;
}

export default function MatrixRain({
  className = '',
  intensity = 'medium',
  color = '#00ff00',
  fontSize = 14
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const intensityConfig = {
    low: { speed: 0.5, density: 0.3 },
    medium: { speed: 1, density: 0.5 },
    high: { speed: 1.5, density: 0.8 }
  };

  const config = intensityConfig[intensity];

  // Matrix characters (mix of katakana, numbers, and symbols)
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character with glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // Reset drop to top with some randomness
        if (y > canvas.height && Math.random() > (1 - config.density)) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i] += config.speed;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [color, fontSize, config.speed, config.density, chars]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'absolute inset-0 pointer-events-none opacity-20',
        className
      )}
      style={{
        width: '100%',
        height: '100%'
      }}
    />
  );
}