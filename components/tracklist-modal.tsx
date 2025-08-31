'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
export type Track = { t:string; d:number; src:string }
export type EP = { id:string; title:string; art:string; tracks:Track[]; year:number }
export function openTracklist(ep: EP){ const ev = new CustomEvent('open-tracklist', { detail: ep }); window.dispatchEvent(ev) }
function f(s:number){ const m=Math.floor(s/60)||0; const r=Math.floor(s%60)||0; return `${m}:${`${r}`.padStart(2,'0')}` }
export function TracklistModal({ onPlay }: { onPlay?: (src:string,title:string)=>void }){
  const [open,setOpen] = useState(false)
  const [ep,setEp] = useState<EP | null>(null)
  useEffect(()=>{ const h=(e:any)=>{ setEp(e.detail); setOpen(true) }; window.addEventListener('open-tracklist',h); return()=>window.removeEventListener('open-tracklist',h) },[])
  return (<AnimatePresence>{open && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="card w-full max-w-lg overflow-hidden" onClick={(e)=>e.stopPropagation()}>
        <Image src={ep?.art || ''} className="h-auto w-full object-cover aspect-[16/9]" alt="art" width={512} height={288}/>
        <div className="p-5">
          <div className="text-white font-bold text-lg">{ep?.title}</div>
          <div className="mt-3 space-y-2">
            {ep?.tracks?.map((t,i)=> (
              <div key={i} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0b0b0f] p-3">
                <div className="min-w-0"><div className="truncate text-white">{i+1}. {t.t}</div><div className="text-xs text-zinc-400">{f(t.d)}</div></div>
                <button className="btn-primary" onClick={()=>{ onPlay?.(t.src, `${ep!.title} — ${t.t}`); setOpen(false) }}>Play</button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>)
}