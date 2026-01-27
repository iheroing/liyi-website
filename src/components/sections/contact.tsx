"use client"

import { motion } from "framer-motion"
import { PROFILE } from "@/lib/data"
import { Mail, MapPin, ArrowRight } from "lucide-react"

// Premium easing
const smoothEase = [0.22, 1, 0.36, 1] as const

export function Contact() {
    return (
        <section id="contact" className="py-32 md:py-40 bg-background">
            <div className="container px-6 md:px-8 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: smoothEase }}
                    className="flex flex-col items-center text-center"
                >
                    {/* Section Header */}
                    <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">Get in Touch</span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter font-heading">联系我</h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
                        className="w-16 h-[2px] bg-foreground/10 mt-8 origin-left"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
                        className="text-muted-foreground/70 max-w-md text-base md:text-lg font-light leading-relaxed mt-8"
                    >
                        对教育科技、AI 落地感兴趣，或者只是想交个朋友？欢迎随时联系。
                    </motion.p>

                    {/* Contact Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
                        className="flex flex-col sm:flex-row gap-4 mt-10"
                    >
                        <motion.a
                            href={`mailto:${PROFILE.email}`}
                            className="flex items-center gap-3 text-muted-foreground/70 hover:text-foreground bg-muted/30 hover:bg-muted/50 px-5 py-3 rounded-full transition-all duration-300 group"
                            whileHover={{ x: 3 }}
                        >
                            <Mail className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                            <span className="text-sm font-light tracking-wide">{PROFILE.email}</span>
                        </motion.a>
                        <motion.div
                            className="flex items-center gap-3 text-muted-foreground/60 bg-muted/30 px-5 py-3 rounded-full"
                            whileHover={{ x: 3 }}
                        >
                            <MapPin className="h-4 w-4 opacity-50" strokeWidth={1.5} />
                            <span className="text-sm font-light tracking-wide">{PROFILE.location}</span>
                        </motion.div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
                        className="mt-14"
                    >
                        <motion.a
                            href={`mailto:${PROFILE.email}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-4 rounded-full font-medium text-base tracking-wide hover:bg-foreground/90 transition-colors duration-300 group"
                        >
                            发送邮件
                            <ArrowRight className="h-4 w-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
