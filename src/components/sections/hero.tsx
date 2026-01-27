"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download, Github, Mail, Code, Brain, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { PROFILE } from "@/lib/data"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Icons } from "@/components/icons"

const floatingIcons = [
    { Icon: Code, delay: 0, x: -150, y: -100 },
    { Icon: Brain, delay: 2, x: 180, y: -80 },
    { Icon: Zap, delay: 4, x: 0, y: -180 }, // Top centerish
]

export function Hero() {
    return (
        <AuroraBackground>
            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">

                {/* Floating Icons Background */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
                    {floatingIcons.map(({ Icon, delay, x, y }, i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 text-primary/20"
                            initial={{ x, y, opacity: 0 }}
                            animate={{
                                y: [y, y - 20, y],
                                opacity: 0.3
                            }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
                                opacity: { duration: 1 }
                            }}
                        >
                            <Icon className="w-12 h-12" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 relative"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary shadow-sm mb-6"
                    >
                        {PROFILE.title}
                    </motion.div>

                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl pb-2 font-heading">
                        <span className="block bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-primary/50">
                            {PROFILE.name}
                        </span>
                        <span className="text-xl md:text-3xl text-muted-foreground font-normal tracking-normal block mt-4 font-sans">
                            (Li Yi)
                        </span>
                    </h1>

                    <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                        {PROFILE.role.split(" | ").map((r, i) => (
                            <span key={i} className="inline-block px-2">
                                {r} {i < 2 && <span className="text-primary/40 ml-2">|</span>}
                            </span>
                        ))}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col gap-6 items-center mt-10 w-full"
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="#contact">
                            <ShimmerButton className="shadow-2xl h-12 px-8">
                                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                    {PROFILE.hero.cta_contact} <span className="ml-1 opacity-70 text-xs font-normal">{PROFILE.hero.cta_contact_en}</span>
                                </span>
                            </ShimmerButton>
                        </Link>
                        <Link href="#projects">
                            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base backdrop-blur-sm bg-background/50">
                                {PROFILE.hero.cta_projects} <span className="ml-2 text-xs opacity-70">{PROFILE.hero.cta_projects_en}</span> <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8">
                        <FloatingDock
                            items={[
                                { title: "小红书", icon: <Icons.xiaohongshu className="h-full w-full text-red-500" />, href: PROFILE.socials.xiaohongshu },
                                { title: "公众号: 白衣卿相碎碎念", icon: <Icons.wechat className="h-full w-full text-green-600" />, href: "#", action: () => { alert("公众号ID: 白衣卿相碎碎念 (已复制)"); navigator.clipboard.writeText("白衣卿相碎碎念"); } }, // Mock action
                                { title: "抖音", icon: <Icons.douyin className="h-full w-full text-black dark:text-white" />, href: "#", action: () => { alert("抖音ID: yixuelilaoshi (已复制)"); navigator.clipboard.writeText("yixuelilaoshi"); } },
                                { title: "Email", icon: <Mail className="h-full w-full" />, href: `mailto:${PROFILE.email}` },
                            ]}
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce duration-[2000ms]"
                >
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">{PROFILE.hero.scroll}</div>
                    <ArrowRight className="h-4 w-4 rotate-90 text-muted-foreground" />
                </motion.div>
            </div>
        </AuroraBackground>
    )
}
