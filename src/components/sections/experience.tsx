"use client"

import * as React from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading"
import { PROFILE } from "@/lib/data"
import { EASE, VIEWPORT } from "@/lib/motion"

type Entry = {
    key: string
    period: string
    title: string
    meta: string
    description: string
    kind: "work" | "study"
}

const entries: Entry[] = [
    ...PROFILE.experience.map((job) => ({
        key: `${job.company}-${job.role}`,
        period: job.period,
        title: job.role,
        meta: job.company,
        description: job.description,
        kind: "work" as const,
    })),
    ...PROFILE.education.map((edu) => ({
        key: edu.school,
        period: edu.period,
        title: edu.school,
        meta: edu.degree,
        description: edu.description,
        kind: "study" as const,
    })),
]

/**
 * The rail is drawn inside the list rather than floated off to the left the way
 * the old TracerBeam was, so the nodes actually line up with their cards.
 */
function Rail() {
    const ref = React.useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 72%", "end 62%"],
    })
    const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <div ref={ref} aria-hidden className="absolute inset-y-0 left-0 w-px">
            <div className="absolute inset-0 bg-hairline" />
            <motion.div
                style={{ scaleY }}
                className="absolute inset-0 origin-top bg-gradient-to-b from-foreground/50 via-foreground/30 to-transparent"
            />
        </div>
    )
}

export function Experience() {
    return (
        <section id="experience" className="relative bg-background py-24 md:py-32">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
                <SectionHeading
                    eyebrow="Background"
                    title="经历不是履历，"
                    subtitle="是工作方式的来源。"
                    lede="医学训练让我尊重证据，讲台让我理解现场，系统建设让我关心流程。它们最后汇到同一件事：把难以传递的经验，变成别人也能使用的结构。"
                />

                <div className="relative pl-7 md:pl-10">
                    <Rail />

                    <ol className="space-y-4">
                        {entries.map((entry, index) => (
                            <motion.li
                                key={entry.key}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={VIEWPORT}
                                transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.05, ease: EASE }}
                                className="group relative"
                            >
                                {/* Node, centred on the rail. */}
                                <span
                                    aria-hidden
                                    className={`absolute top-7 h-2.5 w-2.5 rounded-full ring-4 ring-background transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125 ${entry.kind === "work" ? "bg-foreground" : "bg-ink-4"
                                        } -left-[calc(1.75rem+5px)] md:-left-[calc(2.5rem+5px)]`}
                                />

                                <div className="rounded-[1.35rem] border border-hairline bg-surface-1 p-6 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:border-foreground/15 group-hover:elev-2 md:p-7">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                        <div className="min-w-0">
                                            <h3 className="headline text-lg font-medium text-ink-1 md:text-xl">
                                                {entry.title}
                                            </h3>
                                            <p className="mt-1.5 text-sm text-ink-3">{entry.meta}</p>
                                        </div>
                                        <span className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-4 tabular-nums">
                                            {entry.period}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm font-light leading-7 text-ink-3 md:leading-8">
                                        {entry.description}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mt-12 rounded-[1.5rem] border border-hairline bg-surface-2/70 p-7 md:mt-14 md:p-8"
                >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                        <div>
                            <Eyebrow>Recognition</Eyebrow>
                            <h3 className="headline mt-4 text-xl font-medium text-ink-1">一些外部反馈</h3>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            {PROFILE.honors.map((honor) => (
                                <li
                                    key={honor}
                                    className="rounded-full border border-hairline bg-surface-1 px-4 py-1.5 text-sm font-light text-ink-3"
                                >
                                    {honor}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
