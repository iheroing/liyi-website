"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PROFILE } from "@/lib/data"
import { User, Code, Brain, Mail, MapPin } from "lucide-react"

const iconMap = {
    "教育管理者": User,
    "全栈开发者": Code,
    "AI 先行者": Brain
}

// Stagger animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
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
            ease: [0.22, 1, 0.36, 1] as const
        }
    }
}

export function About() {
    return (
        <section id="about" className="py-28 md:py-36 bg-muted/20">
            <div className="container px-6 md:px-8 max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center mb-20"
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">About Me</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-heading">关于我</h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="w-16 h-[2px] bg-foreground/10 mt-8 origin-left"
                    />
                </motion.div>

                {/* Bio Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                        {PROFILE.summary}
                    </p>
                    <motion.div
                        className="flex flex-wrap gap-2 justify-center mt-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {PROFILE.tags.map((tag, i) => (
                            <motion.div key={tag} variants={itemVariants}>
                                <Badge
                                    variant="secondary"
                                    className="text-sm py-1.5 px-4 font-normal tracking-wide hover:bg-primary/10 transition-colors duration-300"
                                >
                                    {tag}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Identity Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {PROFILE.identities.map((identity, index) => {
                        const Icon = iconMap[identity.role as keyof typeof iconMap] || User
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
                            >
                                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 h-full bg-background/80 backdrop-blur-sm group">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-3">
                                        <motion.div
                                            className="h-12 w-12 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/60 group-hover:bg-foreground/10 group-hover:text-foreground transition-all duration-500"
                                            whileHover={{ rotate: 5, scale: 1.05 }}
                                        >
                                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                                        </motion.div>
                                        <div>
                                            <CardTitle className="text-base font-medium tracking-tight">{identity.role}</CardTitle>
                                            <p className="text-xs text-muted-foreground/70 font-light mt-0.5">{identity.title}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                            {identity.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-8 mt-20 text-muted-foreground/70"
                >
                    <motion.div
                        className="flex items-center gap-3 group cursor-default"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Mail className="h-4 w-4 group-hover:text-foreground transition-colors duration-300" strokeWidth={1.5} />
                        <span className="text-sm font-light tracking-wide">{PROFILE.email}</span>
                    </motion.div>
                    <motion.div
                        className="flex items-center gap-3 group cursor-default"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                    >
                        <MapPin className="h-4 w-4 group-hover:text-foreground transition-colors duration-300" strokeWidth={1.5} />
                        <span className="text-sm font-light tracking-wide">{PROFILE.location}</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
