"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Github, Mail, Code, Brain, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PROFILE } from "@/lib/data"
import { AuroraBackground } from "@/components/ui/aurora-background"

const floatingIcons = [
    { Icon: Code, delay: 0, x: -150, y: -100 },
    { Icon: Brain, delay: 2, x: 180, y: -80 },
    { Icon: Zap, delay: 4, x: 0, y: -180 }, // Top centerish
]

export function Hero() {
    return (
        <AuroraBackground>
            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">

                {/* Floating Icons Background */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
                    {floatingIcons.map(({ Icon, delay, x, y }, i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 text-primary/20"
                            initial={{ x, y, opacity: 0 }}
                            animate={{
                                y: [y, y - 20, y],
                                opacity: 0.3
                            }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
                                opacity: { duration: 1 }
                            }}
                        >
                            <Icon className="w-12 h-12" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 relative"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary shadow-sm mb-6"
                    >
                        {PROFILE.title}
                    </motion.div>

                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl pb-2 font-heading">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-primary/50">
                            {PROFILE.name.split(" ")[0]} {PROFILE.name.split(" ")[1]}
                        </span>
                        <span className="text-2xl md:text-4xl text-muted-foreground font-normal tracking-normal block mt-2">
                            (Li Yi)
                        </span>
                    </h1>

                    <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                        {PROFILE.role.split(" | ").map((r, i) => (
                            <span key={i} className="inline-block px-2">
                                {r} {i < 2 && <span className="text-primary/40 ml-2">|</span>}
                            </span>
                        ))}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col gap-4 min-[400px]:flex-row mt-10"
                >
                    <Link href="#contact">
                        <Button size="lg" className="h-12 px-8 rounded-full text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                            Contact Me <Mail className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="#projects">
                        <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base backdrop-blur-sm bg-background/50">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce duration-[2000ms]"
                >
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Scroll</div>
                    <ArrowRight className="h-4 w-4 rotate-90 text-muted-foreground" />
                </motion.div>
            </div>
        </AuroraBackground>
    )
}
