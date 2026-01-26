"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Fireworks } from "fireworks-js";

const Confetti = dynamic(() => import("react-confetti"), {
    ssr: false,
});

const messages = [
    { text: "Joyeux Anniversaire Rose !", lang: "fr" },
    { text: "生日快乐 Rose！", lang: "zh" },
    { text: "¡Feliz Cumpleaños Rose !", lang: "es" },
    { text: "Happy Birthday Rose !", lang: "en" },
    { text: "Buon Compleanno Rose !", lang: "it" },
    { text: "Alles Gute zum Geburtstag Rose !", lang: "de" },
    { text: "Feliz Aniversário Rose !", lang: "pt" }
];

export default function Home() {
    const { width, height } = useWindowSize();
    const [index, setIndex] = useState(0);
    const fireworksRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!fireworksRef.current) return;

        const fireworks = new Fireworks(fireworksRef.current, {
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 80,
            traceLength: 3,
            traceSpeed: 10,
            explosion: 5,
            intensity: 30,
            flickering: 50,
            lineStyle: "round",
            hue: {
                min: 0,
                max: 360
            },
            delay: {
                min: 30,
                max: 60
            },
            rocketsPoint: {
                min: 50,
                max: 50 // 👈 PART DU BAS DE L’ÉCRAN
            }
        });

        fireworks.start();

        return () => fireworks.stop();
    }, []);

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
            <div
                ref={fireworksRef}
                className="absolute inset-0 z-0 pointer-events-none"
            />
            <Confetti width={width} height={height} numberOfPieces={300} gravity={0.15} />
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1496857239036-1fb137683000?q=80&w=2070&auto=format&fit=crop')"
                }}
            />
            <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-sm" />
            <div className="z-10 text-center px-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ scale: 0, rotate: -10, opacity: 0 }}
                        animate={{
                            scale: 1,
                            rotate: 0,
                            opacity: 1,
                        }}
                        exit={{
                            scale: 0,
                            opacity: 0,
                            transition: { duration: 0.3 },
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                        }}
                    >
                    <h1 className="text-6xl md:text-8xl font-extrabold text-pink-600 drop-shadow-lg"
                            style={{ fontFamily: "sans-serif" }}>
                            {messages[index].text}
                        </h1>
                    </motion.div>
                </AnimatePresence>
            </div>

            <footer className="absolute bottom-4 z-10 text-pink-900 font-medium">
                (C&apos;est pour tes 18 ans)
            </footer>
        </main>
    );
}