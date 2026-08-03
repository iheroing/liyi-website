"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { EASE, VIEWPORT } from "@/lib/motion"

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1/70 px-3 py-1",
                "font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-4",
                className
            )}
        >
            <span aria-hidden className="h-1 w-1 rounded-full bg-ink-4" />
            {children}
        </span>
    )
}

/**
 * The shared section opener: eyebrow, two-line title, and an optional lede set
 * against it. Every section used to hand-roll this with slightly different
 * spacing and grey values.
 */
export function SectionHeading({
    eyebrow,
    title,
    subtitle,
    lede,
    align = "split",
    className,
}: {
    eyebrow: string
    title: string
    subtitle?: string
    lede?: string
    align?: "split" | "center"
    className?: string
}) {
    const isCenter = align === "center"

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.75, ease: EASE }}
            className={cn(
                "mb-14 md:mb-20",
                isCenter
                    ? "flex flex-col items-center text-center"
                    : "grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:items-end md:gap-14",
                className
            )}
        >
            <div>
                <Eyebrow className={cn("mb-5", isCenter && "mx-auto")}>{eyebrow}</Eyebrow>
                <h2 className="headline font-heading text-[2.1rem] font-medium leading-[1.16] text-ink-1 sm:text-4xl md:text-5xl">
                    {title}
                    {subtitle ? <span className="block text-ink-3">{subtitle}</span> : null}
                </h2>
            </div>

            {lede ? (
                <p
                    className={cn(
                        "text-[0.98rem] font-light leading-8 text-ink-3 md:text-base md:leading-9",
                        isCenter ? "measure mx-auto mt-6" : "measure md:pb-2"
                    )}
                >
                    {lede}
                </p>
            ) : null}
        </motion.div>
    )
}
