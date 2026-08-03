"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Github, Mail } from "lucide-react"
import { Icons } from "@/components/icons"
import { PROFILE } from "@/lib/data"
import { EASE } from "@/lib/motion"

export function Footer() {
    const [copied, setCopied] = React.useState(false)
    const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(() => {
        return () => {
            if (resetTimer.current) clearTimeout(resetTimer.current)
        }
    }, [])

    const copyWechat = async () => {
        try {
            await navigator.clipboard.writeText(PROFILE.socials.wechat)
            setCopied(true)
            if (resetTimer.current) clearTimeout(resetTimer.current)
            resetTimer.current = setTimeout(() => setCopied(false), 2200)
        } catch {
            // Clipboard can be blocked (insecure context, denied permission).
            // The id is already on screen, so there is nothing to recover from.
            setCopied(false)
        }
    }

    const links = [
        { icon: Icons.xiaohongshu, href: PROFILE.socials.xiaohongshu, label: "小红书" },
        { icon: Icons.douyin, href: PROFILE.socials.douyin, label: "抖音" },
        { icon: Github, href: PROFILE.socials.github, label: "GitHub" },
        { icon: Mail, href: `mailto:${PROFILE.email}`, label: "邮件" },
    ]

    return (
        <footer className="border-t border-hairline bg-surface-2 py-14 md:py-16">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-10"
                >
                    <div className="text-center md:text-left">
                        <p className="text-base font-medium text-ink-1">{PROFILE.name}</p>
                        <p className="mt-1 text-sm font-light text-ink-3">
                            {PROFILE.title} · {PROFILE.location}
                        </p>
                    </div>

                    {/* Monochrome by design — brand colours here pulled the eye away
                        from everything above them. */}
                    <div className="flex flex-wrap items-center justify-center gap-1">
                        {links.map(({ icon: Icon, href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noreferrer" : undefined}
                                aria-label={label}
                                className="flex h-10 w-10 items-center justify-center rounded-full text-ink-4 transition-[color,background-color] duration-300 hover:bg-foreground/[0.06] hover:text-ink-1"
                            >
                                <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.5} />
                            </Link>
                        ))}

                        <button
                            type="button"
                            onClick={copyWechat}
                            aria-label={copied ? "公众号 ID 已复制" : `复制公众号 ID ${PROFILE.socials.wechat}`}
                            className="flex h-10 items-center gap-2 rounded-full px-3 text-ink-4 transition-[color,background-color] duration-300 hover:bg-foreground/[0.06] hover:text-ink-1"
                        >
                            {copied ? (
                                <Check className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.8} />
                            ) : (
                                <Icons.wechat className="h-[1.05rem] w-[1.05rem]" />
                            )}
                            <span className="text-xs font-light">
                                {copied ? "已复制" : PROFILE.socials.wechat}
                            </span>
                        </button>
                    </div>
                </motion.div>

                <div className="rule-fade my-9" />

                <div className="flex flex-col items-center gap-2 text-center font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-4 sm:flex-row sm:justify-between">
                    <span>© {new Date().getFullYear()} Li Yi</span>
                    <span>Built with Next.js</span>
                </div>
            </div>
        </footer>
    )
}
