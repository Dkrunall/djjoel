'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function ScrollExplore() {
    return (
        <div className="relative w-32 h-32 flex items-center justify-center text-white/50 mix-blend-difference pointer-events-none">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full"
            >
                <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
                    <defs>
                        <path
                            id="circlePath"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                    </defs>
                    <text fontSize="8.5" fill="currentColor" letterSpacing="1.2px" fontWeight="500">
                        <textPath xlinkHref="#circlePath" startOffset="0%">
                            SCROLL TO EXPLORE  •  SCROLL TO EXPLORE  •
                        </textPath>
                    </text>
                </svg>
            </motion.div>
            <ArrowDown className="w-5 h-5 text-white/70 animate-pulse" />
        </div>
    );
}
