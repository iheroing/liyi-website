"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PROFILE } from "@/lib/data"
import { ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import { CardSpotlight } from "@/components/ui/card-spotlight"

// Premium easing
const smoothEase = [0.22, 1, 0.36, 1] as const

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: smoothEase
        }
    }
}

export function Projects() {
    return (
        <section id="projects" className="py-28 md:py-36 bg-muted/10">
            <div className="container px-6 md:px-8 max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: smoothEase }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">Selected Projects</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-heading">精选项目</h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
                        className="w-16 h-[2px] bg-foreground/10 mt-8 origin-left"
                    />
                    <p className="text-muted-foreground/70 mt-6 max-w-lg text-base font-light leading-relaxed">
                        从独立开发到企业级系统，致力于弥合教育与技术之间的鸿沟
                    </p>
                </motion.div>

                <Tabs defaultValue="extensions" className="w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: smoothEase }}
                        className="flex justify-center mb-12"
                    >
                        <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted/50 p-1 rounded-full">
                            <TabsTrigger value="extensions" className="rounded-full text-sm font-light tracking-wide data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300">浏览器插件</TabsTrigger>
                            <TabsTrigger value="apps" className="rounded-full text-sm font-light tracking-wide data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300">应用</TabsTrigger>
                            <TabsTrigger value="enterprise" className="rounded-full text-sm font-light tracking-wide data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300">企业项目</TabsTrigger>
                        </TabsList>
                    </motion.div>

                    <TabsContent value="extensions">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {PROFILE.products.extensions.map((project, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                                >
                                    <CardSpotlight className="flex flex-col h-full bg-background/80 backdrop-blur-sm">
                                        <div className="p-8 flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-medium tracking-tight">{project.name}</h3>
                                                <Badge variant={project.status.includes("5") ? "default" : "secondary"} className="font-light text-xs">
                                                    {project.status.includes("5") && <Star className="h-3 w-3 mr-1 fill-current" />}
                                                    {project.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs font-mono text-muted-foreground/50 mb-4 tracking-wide">{project.version}</p>
                                            <div className="flex-1 mb-6">
                                                <p className="text-muted-foreground font-light leading-relaxed">{project.description}</p>
                                            </div>
                                            {project.url && (
                                                <Link href={project.url} target="_blank" className="w-full">
                                                    <Button variant="outline" className="w-full rounded-full font-light hover:bg-foreground hover:text-background transition-all duration-300 group">
                                                        访问插件
                                                        <ExternalLink className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </CardSpotlight>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="apps">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {PROFILE.products.apps.map((project, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                                >
                                    <CardSpotlight className="flex flex-col h-full bg-background/80 backdrop-blur-sm">
                                        <div className="p-6 flex flex-col h-full">
                                            <h3 className="text-lg font-medium tracking-tight mb-4">{project.name}</h3>
                                            <div className="flex-1 mb-6">
                                                <p className="text-muted-foreground font-light text-sm leading-relaxed">{project.description}</p>
                                            </div>
                                            {project.url && (
                                                <Link href={project.url} target="_blank" className="w-full">
                                                    <Button variant="outline" className="w-full rounded-full text-sm font-light hover:bg-foreground hover:text-background transition-all duration-300 group">
                                                        访问
                                                        <ExternalLink className="ml-2 h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </CardSpotlight>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="enterprise">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {PROFILE.products.enterprise.map((project, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                                >
                                    <CardSpotlight className="flex flex-col h-full bg-background/80 backdrop-blur-sm">
                                        <div className="p-8 flex flex-col h-full">
                                            <h3 className="text-xl font-medium tracking-tight mb-4">{project.name}</h3>
                                            <div className="flex-1">
                                                <p className="text-muted-foreground font-light leading-relaxed">{project.description}</p>
                                            </div>
                                        </div>
                                    </CardSpotlight>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
