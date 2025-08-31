import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slug(s = ''): string { return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') }
export function fmt(s?: number): string { const m=Math.floor((s||0)/60); const r=Math.floor((s||0)%60); return `${m}:${`${r}`.padStart(2,'0')}` }
export function formatTourDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

export function isFutureDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  const now = new Date()
  return date > now
}