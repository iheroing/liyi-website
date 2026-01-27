"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PROFILE } from "@/lib/data"
import { ExternalLink, Github, Star } from "lucide-react"
import Link from "next/link"

import { CardSpotlight } from "@/components/ui/card-spotlight"

export function Projects() {
    return (
        <section id="projects" className="py-20 bg-background">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading">精选项目</h2>
                    <span className="text-muted-foreground text-sm tracking-widest uppercase mt-2 opacity-60">Selected Projects</span>
                    <p className="text-muted-foreground mt-4 max-w-[800px]">
                        从独立开发到企业级系统，致力于弥合教育与技术之间的鸿沟。
                    </p>
                </motion.div>

                <Tabs defaultValue="extensions" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid w-full max-w-[400px] grid-cols-3">
                            <TabsTrigger value="extensions">浏览器插件</TabsTrigger>
                            <TabsTrigger value="apps">应用</TabsTrigger>
                            <TabsTrigger value="enterprise">企业项目</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="extensions">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {PROFILE.products.extensions.map((project, index) => (
                                <CardSpotlight key={index} className="flex flex-col h-full bg-card">
                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold leading-none tracking-tight">{project.name}</h3>
                                            <Badge variant={project.status.includes("5") ? "default" : "secondary"}>
                                                {project.status.includes("5") && <Star className="h-3 w-3 mr-1 fill-current" />}
                                                {project.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm font-mono text-muted-foreground mb-4">{project.version}</p>
                                        <div className="flex-1">
                                            <p className="text-muted-foreground">{project.description}</p>
                                        </div>
                                        {project.url && (
                                            <div className="mt-6">
                                                <Link href={project.url} target="_blank" className="w-full">
                                                    <Button variant="outline" className="w-full">
                                                        Visit Extension <ExternalLink className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </CardSpotlight>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="apps">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {PROFILE.products.apps.map((project, index) => (
                                <CardSpotlight key={index} className="flex flex-col h-full bg-card">
                                    <div className="p-6 flex flex-col h-full">
                                        <h3 className="text-xl font-bold leading-none tracking-tight mb-4">{project.name}</h3>
                                        <div className="flex-1 mb-6">
                                            <p className="text-muted-foreground">{project.description}</p>
                                        </div>
                                        {project.url && (
                                            <Link href={project.url} target="_blank" className="w-full">
                                                <Button variant="outline" className="w-full">
                                                    Visit <ExternalLink className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </CardSpotlight>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="enterprise">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {PROFILE.products.enterprise.map((project, index) => (
                                <CardSpotlight key={index} className="flex flex-col h-full bg-card">
                                    <div className="p-6 flex flex-col h-full">
                                        <h3 className="text-xl font-bold leading-none tracking-tight mb-4">{project.name}</h3>
                                        <div className="flex-1">
                                            <p className="text-muted-foreground">{project.description}</p>
                                        </div>
                                    </div>
                                </CardSpotlight>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
