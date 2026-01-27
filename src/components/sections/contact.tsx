"use client"

import { motion } from "framer-motion"
import { PROFILE } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { Mail, MapPin } from "lucide-react"

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center space-y-6"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">get in touch.</h2>
                    <span className="text-muted-foreground text-sm tracking-widest uppercase mt-2">保持联系</span>
                    <p className="text-muted-foreground max-w-[600px] text-lg">
                        对教育科技、AI 落地感兴趣，或者只是想交个朋友？欢迎随时联系。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mt-8">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-5 w-5" />
                            <a href={`mailto:${PROFILE.email}`} className="hover:text-primary transition-colors">{PROFILE.email}</a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-5 w-5" />
                            <span>{PROFILE.location}</span>
                        </div>
                    </div>

                    <div className="pt-8">
                        <a href={`mailto:${PROFILE.email}`}>
                            <ShimmerButton className="shadow-2xl">
                                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                    Say Hello <span className="text-xs opacity-70 ml-1">打个招呼</span>
                                </span>
                            </ShimmerButton>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
