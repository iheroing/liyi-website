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
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                    <div className="w-20 h-1 bg-primary mt-4 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold">Profile</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {PROFILE.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {PROFILE.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-sm py-1">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="space-y-4 pt-4">
                            <h4 className="text-xl font-bold">Connect</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>📧 {PROFILE.email}</li>
                                <li>📍 {PROFILE.location}</li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="grid gap-4"
                    >
                        {PROFILE.identities.map((identity, index) => {
                            const Icon = iconMap[identity.role as keyof typeof iconMap] || User
                            return (
                                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
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
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
