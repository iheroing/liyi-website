"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Github, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PROFILE } from "@/lib/data"

export function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium text-muted-foreground mb-4">
                        {PROFILE.title}
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 pb-2">
                        {PROFILE.name}
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {PROFILE.role.split(" | ").map((r, i) => (
                            <span key={i} className="block md:inline-block md:not-last:after:content-['|'] md:not-last:after:mx-2 md:not-last:after:text-gray-400">
                                {r}
                            </span>
                        ))}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col gap-4 min-[400px]:flex-row mt-8"
                >
                    <Link href="#contact">
                        <Button size="lg" className="h-12 px-8">
                            Contact Me <Mail className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="#projects">
                        <Button size="lg" variant="outline" className="h-12 px-8">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce"
                >
                    <div className="text-xs text-muted-foreground mb-2">Scroll Down</div>
                    <ArrowRight className="h-4 w-4 rotate-90 text-muted-foreground" />
                </motion.div>
            </div>
        </section>
    )
}
