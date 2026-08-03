"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop"
import { PROFILE } from "@/lib/data"
import { EASE } from "@/lib/motion"

// Derived, so these never drift from what the work section actually promotes.
const SELECTED = PROFILE.featured.slice(0, 3).map((item) => item.name)

export function Hero() {
    return (
        <AmbientBackdrop>
            <div className="relative z-10 flex min-h-[100svh] w-full items-center px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.72fr] lg:gap-16">
                    <div className="flex flex-col items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
                            className="mb-7 inline-flex items-center gap-3 rounded-full border border-hairline bg-surface-1/70 p-1 pr-4 backdrop-blur-xl elev-1 md:mb-8"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground font-mono text-[0.62rem] font-medium tracking-tight text-background">
                                LY
                            </span>
                            <span className="text-sm font-medium text-ink-1">Li Yi</span>
                            <span aria-hidden className="h-3 w-px bg-hairline" />
                            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-4">
                                Knowledge Systems
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.16, duration: 0.9, ease: EASE }}
                            className="headline font-heading text-[2.6rem] font-medium leading-[1.1] text-ink-1 sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.08]"
                        >
                            {PROFILE.hero.title.map((line, i) => (
                                <span key={line} className={i === PROFILE.hero.title.length - 1 ? "block text-ink-1" : "block"}>
                                    {line}
                                </span>
                            ))}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.36, duration: 0.85, ease: EASE }}
                            className="measure mt-7 text-[0.98rem] font-light leading-8 text-ink-3 md:mt-9 md:text-lg md:leading-9"
                        >
                            {PROFILE.hero.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.54, duration: 0.7, ease: EASE }}
                            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:mt-11"
                        >
                            <ShimmerButton as="a" href="#projects" className="h-13 py-0 pl-7 pr-2.5 text-base">
                                {PROFILE.hero.cta_projects}
                                <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                                    <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                                </span>
                            </ShimmerButton>

                            <a
                                href="#contact"
                                className="group inline-flex h-13 items-center justify-center rounded-full border border-hairline bg-surface-1/60 px-6 text-base font-light text-ink-2 backdrop-blur-sm transition-[color,border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-foreground/25 hover:text-ink-1"
                            >
                                {PROFILE.hero.cta_contact}
                                <span className="ml-3 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                                    <ArrowRight className="h-3.5 w-3.5 text-ink-3" strokeWidth={1.6} />
                                </span>
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.72, duration: 0.7, ease: EASE }}
                            className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-2 md:mt-11"
                        >
                            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-4">
                                Selected work
                            </span>
                            <span aria-hidden className="mx-1 h-px w-6 bg-hairline" />
                            {SELECTED.map((item) => (
                                <a
                                    key={item}
                                    href="#projects"
                                    className="rounded-full border border-transparent bg-foreground/[0.045] px-3 py-1 text-xs text-ink-3 transition-colors duration-300 hover:border-hairline hover:bg-foreground/[0.075] hover:text-ink-1"
                                >
                                    {item}
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    <motion.aside
                        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 0.42, duration: 0.9, ease: EASE }}
                        className="relative rounded-[1.75rem] border border-hairline bg-surface-1/70 p-6 backdrop-blur-xl elev-2-hi md:rounded-[2rem] md:p-8"
                    >
                        <div className="mb-6 flex items-center justify-between gap-6 md:mb-7">
                            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-4">
                                Working Coordinates
                            </span>
                            <span className="font-mono text-[0.66rem] text-ink-4">2026</span>
                        </div>

                        <dl className="space-y-5">
                            {PROFILE.hero.coordinates.map((item) => (
                                <div key={item.label} className="border-t border-hairline pt-5 first:border-t-0 first:pt-0">
                                    <div className="mb-1.5 flex items-baseline justify-between gap-4">
                                        <dt className="text-[1.05rem] font-medium text-ink-1">{item.value}</dt>
                                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-4">
                                            {item.label}
                                        </span>
                                    </div>
                                    <dd className="text-sm font-light leading-6 text-ink-3">{item.text}</dd>
                                </div>
                            ))}
                        </dl>
                    </motion.aside>
                </div>

                <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.9 }}
                    className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 lg:block"
                >
                    <motion.span
                        animate={{ y: [0, 7, 0], opacity: [0.55, 1, 0.55] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="block h-12 w-px bg-gradient-to-b from-transparent via-ink-4 to-transparent"
                    />
                </motion.div>
            </div>
        </AmbientBackdrop>
    )
}
