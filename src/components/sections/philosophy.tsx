"use client"

import { motion } from "framer-motion"
import { PROFILE } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Premium easing
const smoothEase = [0.22, 1, 0.36, 1] as const

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: smoothEase
        }
    }
}

export function Philosophy() {
    return (
        <section id="philosophy" className="py-28 md:py-36 bg-muted/20">
            <div className="container px-6 md:px-8 max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: smoothEase }}
                    className="flex flex-col items-center text-center mb-20"
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">Philosophy & Vision</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-heading">核心理念</h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
                        className="w-16 h-[2px] bg-foreground/10 mt-8 origin-left"
                    />
                    <p className="text-muted-foreground/70 mt-6 max-w-lg text-base font-light leading-relaxed">
                        驱动我工作的核心方法论与思维模型
                    </p>
                </motion.div>

                {/* Philosophy Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {PROFILE.philosophy.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                        >
                            <Card className="h-full border-none shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)] transition-all duration-500 bg-background/60 backdrop-blur-sm group">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg md:text-xl font-medium tracking-tight text-foreground group-hover:text-foreground/80 transition-colors duration-300">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base">{item.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
