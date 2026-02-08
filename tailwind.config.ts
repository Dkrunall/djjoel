import type { Config } from 'tailwindcss'
export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { ink: '#e5e7eb', panel: '#111116', accent: '#ff2d55', accent2: '#b1142a' } } },
  plugins: []
} satisfies Config