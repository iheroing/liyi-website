"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { Icons } from "@/components/icons"
import { PROFILE } from "@/lib/data"

export function Footer() {
    return (
        <footer className="border-t py-8 md:py-12 bg-muted/30">
            <div className="container max-w-5xl mx-auto flex flex-col items-center justify-between gap-6 md:flex-row px-4 md:px-6">
                {/* Copyright - Centered on mobile, left on desktop */}
                <p className="text-sm text-center text-muted-foreground md:text-left order-2 md:order-1">
                    © {new Date().getFullYear()} Li Yi. All rights reserved.
                </p>

                {/* Social Icons - Centered on mobile, right on desktop */}
                <div className="flex gap-5 items-center order-1 md:order-2">
                    <Link
                        href={PROFILE.socials.xiaohongshu}
                        target="_blank"
                        className="text-muted-foreground hover:text-[#FF2442] transition-colors p-1"
                        aria-label="小红书"
                    >
                        <Icons.xiaohongshu className="h-5 w-5" />
                    </Link>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText("白衣卿相碎碎念");
                            alert("公众号ID已复制: 白衣卿相碎碎念");
                        }}
                        className="text-muted-foreground hover:text-[#07C160] transition-colors p-1"
                        aria-label="微信公众号"
                    >
                        <Icons.wechat className="h-5 w-5" />
                    </button>
                    <Link
                        href={PROFILE.socials.douyin || "#"}
                        target="_blank"
                        className="text-muted-foreground hover:text-black dark:hover:text-white transition-colors p-1"
                        aria-label="抖音"
                    >
                        <Icons.douyin className="h-5 w-5" />
                    </Link>
                    <Link
                        href={`mailto:${PROFILE.email}`}
                        className="text-muted-foreground hover:text-blue-500 transition-colors p-1"
                        aria-label="邮件"
                    >
                        <Mail className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
