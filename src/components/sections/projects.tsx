"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PROFILE } from "@/lib/data"
import { ExternalLink, Github, Star } from "lucide-react"
import Link from "next/link"

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
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Selected Projects</h2>
                    <p className="text-muted-foreground mt-4 max-w-[800px]">
                        From indie development to enterprise-grade systems, bridging the gap between education and technology.
                    </p>
                </motion.div>

                <Tabs defaultValue="extensions" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid w-full max-w-[400px] grid-cols-3">
                            <TabsTrigger value="extensions">Extensions</TabsTrigger>
                            <TabsTrigger value="apps">Apps</TabsTrigger>
                            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="extensions">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {PROFILE.products.extensions.map((project, index) => (
                                <Card key={index} className="flex flex-col">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
                                            <Badge variant={project.status.includes("5") ? "default" : "secondary"}>
                                                {project.status.includes("5") && <Star className="h-3 w-3 mr-1 fill-current" />}
                                                {project.status}
                                            </Badge>
                                        </div>
                                        <CardDescription className="text-sm font-mono mt-1">{project.version}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-muted-foreground">{project.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="apps">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PROFILE.products.apps.map((project, index) => (
                                <Card key={index} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-muted-foreground">{project.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        {project.url && (
                                            <Link href={project.url} target="_blank" className="w-full">
                                                <Button variant="outline" className="w-full">
                                                    Visit <ExternalLink className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        )}
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="enterprise">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {PROFILE.products.enterprise.map((project, index) => (
                                <Card key={index} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-muted-foreground">{project.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
