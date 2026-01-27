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
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full px-4 md:px-6 pt-20 pb-32">

                {/* Visual Anchor: Floating Icons (Subtle) */}
                <div className="absolute inset-0 pointer-events-none hidden md:block opacity-30">
                    {floatingIcons.map(({ Icon, delay, x, y }, i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 text-primary/10"
                            initial={{ x, y, opacity: 0 }}
                            animate={{
                                y: [y, y - 20, y],
                                opacity: 0.5
                            }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
                                opacity: { duration: 1 }
                            }}
                        >
                            <Icon className="w-16 h-16" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
                >
                    {/* Elegant Title - No more pill background, just pure text */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="text-sm md:text-base font-light tracking-[0.2em] text-muted-foreground uppercase"
                    >
                        {PROFILE.title}
                    </motion.span>

                    {/* Name - Cleaner typography */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight font-heading text-foreground">
                        {PROFILE.name}
                        <span className="block mt-2 text-2xl md:text-3xl font-light text-muted-foreground font-sans tracking-widest opacity-60">
                            Li Yi
                        </span>
                    </h1>

                    {/* Role - Spacious and thin */}
                    <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl leading-loose">
                        {PROFILE.role.split(" | ").map((r, i) => (
                            <span key={i} className="inline-block mx-3">
                                {r}
                            </span>
                        ))}
                    </p>

                    {/* Buttons - More spacing */}
                    <div className="pt-8 flex flex-col sm:flex-row gap-6 items-center">
                        <Link href="#contact">
                            <ShimmerButton className="shadow-xl h-14 px-10 rounded-full">
                                <span className="text-base font-medium tracking-wide text-white dark:from-white dark:to-slate-900/10">
                                    {PROFILE.hero.cta_contact}
                                </span>
                            </ShimmerButton>
                        </Link>
                        <Link href="#projects">
                            <Button size="lg" variant="ghost" className="h-14 px-10 rounded-full text-base font-medium hover:bg-primary/5 text-foreground/80">
                                {PROFILE.hero.cta_projects} <ArrowRight className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Social Dock - Pinned to bottom, subtle, grayscale until hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 scale-90 opacity-60 hover:opacity-100 transition-all duration-500 hover:scale-100"
                >
                    <FloatingDock
                        desktopClassName="bg-transparent dark:bg-transparent border-none shadow-none"
                        items={[
                            { title: "Xiaohongshu", icon: <Icons.xiaohongshu className="h-full w-full text-muted-foreground group-hover:text-[#FF2442] transition-colors" />, href: PROFILE.socials.xiaohongshu },
                            { title: "WeChat", icon: <Icons.wechat className="h-full w-full text-muted-foreground group-hover:text-[#07C160] transition-colors" />, href: "#", action: () => { alert("公众号ID: 白衣卿相碎碎念"); navigator.clipboard.writeText("白衣卿相碎碎念"); } },
                            { title: "Douyin", icon: <Icons.douyin className="h-full w-full text-muted-foreground group-hover:text-foreground transition-colors" />, href: "https://www.douyin.com/user/self?from_tab_name=main&showSubTab=compilation&showTab=favorite_collection" },
                            { title: "Email", icon: <Mail className="h-full w-full text-muted-foreground group-hover:text-blue-500 transition-colors" />, href: `mailto:${PROFILE.email}` },
                        ]}
                    />
                </motion.div>
            </div>
        </AuroraBackground>
    )
}
