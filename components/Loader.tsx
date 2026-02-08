'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds total
        const steps = 100;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (count === 100) {
            // Small delay before unmounting to show 100%
            const timeout = setTimeout(() => {
                onComplete();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [count, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-end justify-start bg-black px-4 pb-4 md:px-8 md:pb-8"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="text-white font-bold text-[12vw] leading-none tracking-tighter mix-blend-difference">
                {count}%
            </div>
        </motion.div>
    );
}
