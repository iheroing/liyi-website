"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

export function SoundController() {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    // Handle fade in/out
    useEffect(() => {
        if (!audioRef.current) return

        const fadeDuration = 1000 // 1s fade
        const intervalTime = 50
        const steps = fadeDuration / intervalTime
        const volumeStep = 0.2 / steps // Target volume 0.2

        const fadeInterval = setInterval(() => {
            if (!audioRef.current) return

            if (isPlaying) {
                // Fade In
                if (audioRef.current.volume < 0.2) {
                    audioRef.current.volume = Math.min(0.2, audioRef.current.volume + volumeStep)
                } else {
                    clearInterval(fadeInterval)
                }
            } else {
                // Fade Out
                if (audioRef.current.volume > 0) {
                    audioRef.current.volume = Math.max(0, audioRef.current.volume - volumeStep)
                } else {
                    audioRef.current.pause()
                    clearInterval(fadeInterval)
                }
            }
        }, intervalTime)

        if (isPlaying) {
            audioRef.current.play().catch((e) => {
                console.log("Audio autoplay prevented:", e)
                setIsPlaying(false)
            })
        }

        return () => clearInterval(fadeInterval)
    }, [isPlaying])

    const toggleSound = () => {
        if (!audioRef.current) return

        // Reset volume to 0 before playing if starting new
        if (!isPlaying) {
            audioRef.current.volume = 0
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <motion.div
            className="fixed bottom-5 right-5 z-50 hidden items-center justify-center md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
        >
            <button
                onClick={toggleSound}
                className={cn(
                    "group relative flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-surface-1/70 backdrop-blur-xl elev-1",
                    "transition-[color,background-color,border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-surface-1 hover:elev-2",
                    isPlaying ? "text-ink-1" : "text-ink-4"
                )}
                aria-label={isPlaying ? "关闭环境音" : "播放环境音"}
                aria-pressed={isPlaying}
            >
                {/* Visualizer Effect */}
                {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/5 opacity-75 duration-1000" />
                        <span className="absolute inline-flex h-[80%] w-[80%] animate-ping rounded-full bg-foreground/10 opacity-50 delay-150 duration-1000" />
                    </div>
                )}

                <audio
                    ref={audioRef}
                    src="/audio/ambience.mp3"
                    loop
                    preload="auto"
                />

                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        {isPlaying ? (
                            <motion.div
                                key="playing"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                            >
                                <Volume2 className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.5} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="muted"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                            >
                                <VolumeX className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.5} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </button>
        </motion.div>
    )
}
