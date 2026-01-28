"use client"

import { motion } from "framer-motion"
import { PROFILE } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { TracerBeam } from "@/components/ui/tracer-beam"

// Premium easing
const smoothEase = [0.22, 1, 0.36, 1] as const

export function Experience() {
    return (
        <section id="experience" className="py-28 md:py-36 bg-muted/10">
            <div className="container px-6 md:px-8 max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: smoothEase }}
                    className="flex flex-col items-center text-center mb-20"
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">Evolutionary Path</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-heading">进化轨迹</h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
                        className="w-16 h-[2px] bg-foreground/10 mt-8 origin-left"
                    />
                </motion.div>

                <div className="flex justify-center w-full">
                    <TracerBeam className="px-4 max-w-3xl mx-auto">
                        <div className="relative pl-10 space-y-20 ml-2 pt-6">
                            {/* Work Experience */}
                            {PROFILE.experience.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: smoothEase }}
                                    className="relative group"
                                >
                                    {/* Timeline Dot */}
                                    <motion.span
                                        className="absolute -left-[38px] top-2 h-4 w-4 rounded-full border-2 border-background bg-foreground/80 z-10 group-hover:scale-125 transition-transform duration-300"
                                        whileHover={{ scale: 1.3 }}
                                    />
                                    <div className="space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <h4 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">{job.role}</h4>
                                            <Badge variant="outline" className="w-fit text-xs font-light tracking-wide px-3 py-1">{job.period}</Badge>
                                        </div>
                                        <p className="text-sm font-medium text-foreground/60 tracking-wide">{job.company}</p>
                                        <p className="text-base text-muted-foreground font-light leading-relaxed">{job.description}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Divider */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: smoothEase }}
                                className="h-[1px] bg-border/50 origin-left"
                            />

                            {/* Education */}
                            {PROFILE.education.map((edu, index) => (
                                <motion.div
                                    key={`edu-${index}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: smoothEase }}
                                    className="relative group"
                                >
                                    <motion.span
                                        className="absolute -left-[38px] top-2 h-4 w-4 rounded-full border-2 border-background bg-muted-foreground/50 z-10 group-hover:scale-125 transition-transform duration-300"
                                    />
                                    <div className="space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <h4 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">{edu.school.split("/")[0]}</h4>
                                            <Badge variant="outline" className="w-fit text-xs font-light tracking-wide px-3 py-1">{edu.period}</Badge>
                                        </div>
                                        <p className="text-sm font-medium text-foreground/60 tracking-wide">{edu.degree}</p>
                                        <p className="text-base text-muted-foreground font-light leading-relaxed">{edu.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TracerBeam>
                </div>
            </div>
        </section>
    )
}
