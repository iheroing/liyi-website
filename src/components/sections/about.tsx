"use client"

import { motion } from "framer-motion"
import { Brain, Code, MapPin } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { PROFILE } from "@/lib/data"
import { VIEWPORT, rise, stagger } from "@/lib/motion"

const iconMap = {
    "现场的人": MapPin,
    "造工具的人": Code,
    "拆系统的人": Brain,
}

export function About() {
    return (
        <section id="about" className="relative bg-surface-2 py-24 md:py-32">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
                <SectionHeading
                    eyebrow="About"
                    title="不是跨界，"
                    subtitle="是同一个问题的不同侧面。"
                    lede={PROFILE.summary}
                />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={stagger(0.09)}
                    className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
                >
                    {PROFILE.identities.map((identity) => {
                        const Icon = iconMap[identity.role as keyof typeof iconMap]

                        return (
                            <motion.article
                                key={identity.role}
                                variants={rise}
                                className="group flex h-full flex-col rounded-[1.5rem] border border-hairline bg-surface-1 p-7 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-foreground/15 hover:elev-3"
                            >
                                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-hairline bg-foreground/[0.04] text-ink-3 transition-[background-color,color] duration-500 group-hover:bg-foreground group-hover:text-background">
                                    <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-xl font-medium text-ink-1">{identity.role}</h3>
                                <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-4">
                                    {identity.title}
                                </p>
                                <p className="mt-5 text-sm font-light leading-7 text-ink-3">{identity.description}</p>
                            </motion.article>
                        )
                    })}
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={stagger(0.05, 0.1)}
                    className="mt-10 flex flex-wrap items-center gap-2"
                >
                    {PROFILE.tags.map((tag) => (
                        <motion.span
                            key={tag}
                            variants={rise}
                            className="rounded-full border border-hairline bg-surface-1 px-4 py-1.5 text-sm font-light text-ink-3"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
