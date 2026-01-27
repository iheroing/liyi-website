"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { Icons } from "@/components/icons"
import { PROFILE } from "@/lib/data"

export function Footer() {
    const socialLinks = [
        {
            icon: Icons.xiaohongshu,
            href: PROFILE.socials.xiaohongshu,
            label: "小红书",
            hoverColor: "hover:text-[#FF2442]"
        },
        {
            icon: Icons.wechat,
            onClick: () => { navigator.clipboard.writeText("白衣卿相碎碎念"); alert("公众号ID已复制: 白衣卿相碎碎念"); },
            label: "微信公众号",
            hoverColor: "hover:text-[#07C160]"
        },
        {
            icon: Icons.douyin,
            href: PROFILE.socials.douyin || "#",
            label: "抖音",
            hoverColor: "hover:text-foreground"
        },
        {
            icon: Mail,
            href: `mailto:${PROFILE.email}`,
            label: "邮件",
            hoverColor: "hover:text-blue-500"
        }
    ]

    return (
        <footer className="border-t border-border/50 py-16 md:py-20 bg-muted/10">
            <div className="container max-w-5xl mx-auto flex flex-col items-center gap-10 px-6 md:px-8">
                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-6 items-center"
                >
                    {socialLinks.map((social, i) => {
                        const IconComponent = social.icon
                        const commonClasses = `text-muted-foreground/50 ${social.hoverColor} transition-all duration-300 p-2 rounded-full hover:bg-muted/50`

                        if (social.onClick) {
                            return (
                                <motion.button
                                    key={i}
                                    onClick={social.onClick}
                                    className={commonClasses}
                                    aria-label={social.label}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <IconComponent className="h-5 w-5" />
                                </motion.button>
                            )
                        }

                        return (
                            <motion.div key={i} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                                <Link
                                    href={social.href!}
                                    target="_blank"
                                    className={commonClasses}
                                    aria-label={social.label}
                                >
                                    <IconComponent className="h-5 w-5" />
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-16 h-[1px] bg-border/50 origin-center"
                />

                {/* Copyright */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-xs text-muted-foreground/40 font-light tracking-widest uppercase"
                >
                    © {new Date().getFullYear()} Li Yi
                </motion.p>
            </div>
        </footer>
    )
}
