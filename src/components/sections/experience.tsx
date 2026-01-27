"use client"

import { motion } from "framer-motion"
import { PROFILE } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { TracerBeam } from "@/components/ui/tracer-beam"

export function Experience() {
    return (
        <section id="experience" className="py-20 bg-muted/20">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading">经历与教育</h2>
                    <span className="text-muted-foreground text-sm tracking-widest uppercase mt-2 opacity-60">Experience & Education</span>
                </motion.div>

                <div className="flex justify-center w-full">
                    <TracerBeam className="px-4 max-w-4xl mx-auto">
                        <div className="relative pl-8 space-y-16 ml-4 pt-4">
                            {PROFILE.experience.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[45px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary z-10" />
                                    <div className="space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                            <h4 className="text-xl font-bold text-foreground">{job.role}</h4>
                                            <Badge variant="outline" className="w-fit">{job.period}</Badge>
                                        </div>
                                        <p className="text-primary font-medium">{job.company}</p>
                                        <p className="text-muted-foreground">{job.description}</p>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="h-px bg-border my-8" />

                            {PROFILE.education.map((edu, index) => (
                                <motion.div
                                    key={`edu-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[45px] top-1 h-5 w-5 rounded-full border-4 border-background bg-zinc-500 z-10" />
                                    <div className="space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                            <h4 className="text-xl font-bold text-foreground">{edu.school.split("/")[0]}</h4>
                                            <Badge variant="outline" className="w-fit">{edu.period}</Badge>
                                        </div>
                                        <p className="text-primary font-medium">{edu.degree}</p>
                                        <p className="text-muted-foreground">{edu.description}</p>
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
