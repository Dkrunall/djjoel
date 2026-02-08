'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
const images = [
  '/hero/j22.JPG.jpeg',
  '/hero/j23.JPG.jpeg',
  '/hero/j24.JPG.jpeg'
]
export function MasonryLightbox() {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string | null>(null)
  return (<>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {images.map((s, i) => (
        <motion.a key={i} href={s} onClick={(e) => { e.preventDefault(); setSrc(s); setOpen(true) }} whileHover={{ scale: 1.01 }} className="block overflow-hidden rounded-2xl border border-white/10">
          <Image src={s} className="w-full h-48 object-cover" alt="gallery" width={400} height={192} />
        </motion.a>
      ))}
    </div>
    <AnimatePresence>{open && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-6" onClick={() => setOpen(false)}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="max-h-[80vh] w-auto rounded-xl border border-white/20 shadow-2xl overflow-hidden">
          <Image src={src!} className="max-h-[80vh] w-auto" alt="full" width={800} height={600} />
        </motion.div>
      </motion.div>
    )}</AnimatePresence>
  </>)
}