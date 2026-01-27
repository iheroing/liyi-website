"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PROFILE } from "@/lib/data"
import { User, Code, Brain } from "lucide-react"

const iconMap = {
    "教育管理者": User,
    "全栈开发者": Code,
    "AI 先行者": Brain
}

export function About() {
    return (
        <section id="about" className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading">关于我</h2>
                    <span className="text-muted-foreground text-sm tracking-widest uppercase mt-2 opacity-60">About Me</span>
                    <div className="w-20 h-1 bg-primary mt-6 rounded-full opacity-20"></div>
                </motion.div>

                {/* Bio Section - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        {PROFILE.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-6">
                        {PROFILE.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-sm py-1">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </motion.div>

                {/* Identity Cards - Stacked and Centered */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PROFILE.identities.map((identity, index) => {
                        const Icon = iconMap[identity.role as keyof typeof iconMap] || User
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            >
                                <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{identity.role}</CardTitle>
                                            <p className="text-sm text-muted-foreground font-medium">{identity.title}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            {identity.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Contact Info - Centered */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-6 mt-12 text-muted-foreground"
                >
                    <div className="flex items-center gap-2">
                        <span>📧</span>
                        <span>{PROFILE.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{PROFILE.location}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
