"use client";

import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), {
    ssr: false,
});

const START_DATE = new Date("2026-04-01T14:42:00");

function getElapsed() {
    const now = new Date();
    const diffMs = now.getTime() - START_DATE.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
}

function AnimatedDigit({ digit }: { digit: string }) {
    return (
        <span className="relative inline-block w-[1ch] overflow-hidden" style={{ height: "1.2em" }}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={digit}
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 text-center"
                >
                    {digit}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

function AnimatedValue({ value }: { value: number }) {
    const str = String(value).padStart(2, "0");
    return (
        <span className="inline-flex">
            {str.split("").map((d, i) => <AnimatedDigit key={i} digit={d} />)}
        </span>
    );
}

export default function Home() {
    const { width, height } = useWindowSize();
    const [elapsed, setElapsed] = useState(getElapsed);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsed(getElapsed());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const textClass = "text-5xl md:text-8xl font-extrabold text-pink-600 drop-shadow-lg leading-tight";

    return (
        <main className="relative flex h-dvh flex-col items-center justify-center overflow-hidden">
            <Confetti width={width} height={height} numberOfPieces={120} gravity={0.08} recycle={true} />
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1496857239036-1fb137683000?q=80&w=2070&auto=format&fit=crop')"
                }}
            />
            <div className="absolute inset-0 z-0 bg-white/50 backdrop-blur-sm" />

            <div className="z-10 text-center px-6 flex flex-col items-center gap-2">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={textClass}
                >
                    HAPPY {elapsed.days} DAYS
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={textClass + " flex items-center"}
                >
                    <AnimatedValue value={elapsed.days} />
                    <span>:</span>
                    <AnimatedValue value={elapsed.hours} />
                    <span>:</span>
                    <AnimatedValue value={elapsed.minutes} />
                    <span>:</span>
                    <AnimatedValue value={elapsed.seconds} />
                </motion.p>
            </div>
        </main>
    );
}
