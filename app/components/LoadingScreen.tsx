"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const JOKES = [
    "Why do programmers wear glasses? Because they don't C#.",
    "I'd tell you a joke about UDP, but you might not get it.",
    "A SQL query walks into a bar and asks, 'Can I join you?'",
    "Real programmers count from 0.",
    "There are 10 types of people: those who understand binary, and those who don't.",
    "What is the object-oriented way to become wealthy? Inheritance.",
    "How many programmers does it take to change a light bulb? None, it's a hardware problem.",
    "!false - It's funny because it's true.",
    "A programmer's favorite hangout place? Foo Bar.",
    "Software developers: Turning coffee into code since 1950."
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [jokeIndex, setJokeIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Rotate jokes
        const jokeInterval = setInterval(() => {
            setJokeIndex((prev) => (prev + 1) % JOKES.length);
        }, 2000);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => {
            clearInterval(jokeInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md space-y-8 text-center">
                {/* Animated Brand */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-2"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white">Basita Tashfeen</h1>
                    <div className="h-0.5 w-12 bg-white/20 mx-auto rounded-full" />
                </motion.div>

                {/* Jokes */}
                <div className="h-16 flex items-center justify-center px-4">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={jokeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="text-white/60 text-lg font-medium italic"
                        >
                            {JOKES[jokeIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress Bar Container */}
                <div className="space-y-3">
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            className="h-full bg-gradient-to-r from-white via-white/50 to-white/10"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                        />
                    </div>
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-white/30 font-bold">
                        <span>Optimizing Assets</span>
                        <span>{progress}%</span>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
}
