"use client"

import { motion } from "framer-motion"
import { PROFILE } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export function Experience() {
    return (
        <section id="experience" className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience & Education</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Professional Experience */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold border-b pb-4 mb-6">Career</h3>
                        <div className="relative border-l border-primary/20 pl-8 space-y-12 ml-4">
                            {PROFILE.experience.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
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
                        </div>
                    </div>

                    {/* Education */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold border-b pb-4 mb-6">Education</h3>
                        <div className="relative border-l border-primary/20 pl-8 space-y-12 ml-4">
                            {PROFILE.education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
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

                        <div className="mt-12">
                            <h3 className="text-2xl font-bold border-b pb-4 mb-6">Honors</h3>
                            <div className="space-y-4">
                                {PROFILE.honors.map((honor, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                        <span className="text-muted-foreground">{honor}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
