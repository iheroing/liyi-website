"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code, Brain, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { PROFILE } from "@/lib/data"
import { AuroraBackground } from "@/components/ui/aurora-background"

const floatingIcons = [
    { Icon: Code, delay: 0, x: -180, y: -120 },
    { Icon: Brain, delay: 2, x: 200, y: -100 },
    { Icon: Zap, delay: 4, x: 0, y: -200 },
]

// Premium easing curve
const smoothEase = [0.22, 1, 0.36, 1] as const

export function Hero() {
    return (
        <AuroraBackground>
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full px-6 md:px-8 pt-24 pb-36">

                {/* Floating Icons - Extremely subtle */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    {floatingIcons.map(({ Icon, delay, x, y }, i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 text-foreground/[0.03]"
                            initial={{ x, y, opacity: 0 }}
                            animate={{
                                y: [y, y - 15, y],
                                opacity: 0.3
                            }}
                            transition={{
                                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
                                opacity: { duration: 1.5 }
                            }}
                        >
                            <Icon className="w-20 h-20" strokeWidth={0.5} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: smoothEase }}
                    className="flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto"
                >
                    {/* Subtitle */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: smoothEase }}
                        className="text-xs md:text-sm font-light tracking-[0.35em] text-muted-foreground/60 uppercase"
                    >
                        {PROFILE.title}
                    </motion.span>

                    {/* Name - Dramatic typography */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1, ease: smoothEase }}
                        className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter font-heading text-foreground leading-none"
                    >
                        {PROFILE.name}
                    </motion.h1>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="text-xl md:text-2xl font-extralight text-muted-foreground/50 tracking-[0.4em] uppercase"
                    >
                        Li Yi
                    </motion.span>

                    {/* Role Pills - Elegant separation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: smoothEase }}
                        className="flex flex-wrap justify-center gap-4 text-muted-foreground/70"
                    >
                        {PROFILE.role.split(" | ").map((r, i) => (
                            <motion.span
                                key={i}
                                className="text-sm md:text-base font-light tracking-wide"
                                whileHover={{ color: "var(--foreground)", transition: { duration: 0.3 } }}
                            >
                                {r}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8, ease: smoothEase }}
                        className="pt-12 flex flex-col sm:flex-row gap-6 items-center"
                    >
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="inline-block"
                        >
                            <ShimmerButton
                                as="div"
                                className="shadow-2xl h-14 px-12 rounded-full cursor-pointer"
                                background="#1a1a1a"
                                shimmerColor="#ffffff"
                            >
                                <span className="text-base font-medium tracking-wider text-white">
                                    {PROFILE.hero.cta_contact}
                                </span>
                            </ShimmerButton>
                        </motion.a>
                        <motion.a
                            href="#projects"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex items-center h-14 px-10 rounded-full text-base font-light text-foreground/60 hover:text-foreground group cursor-pointer"
                        >
                            {PROFILE.hero.cta_projects}
                            <ArrowRight className="ml-3 h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-12 bg-gradient-to-b from-foreground/20 to-transparent"
                    />
                </motion.div>
            </div>
        </AuroraBackground>
    )
}
