"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { Icons } from "@/components/icons"
import { PROFILE } from "@/lib/data"

export function Footer() {
    return (
        <footer className="border-t py-12 bg-muted/30">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row md:py-0 px-4 md:px-6">
                <p className="text-sm text-center text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} Li Yi. All rights reserved.
                </p>
                <div className="flex gap-6 items-center">
                    <Link href={PROFILE.socials.xiaohongshu} target="_blank" className="text-muted-foreground hover:text-[#FF2442] transition-colors">
                        <Icons.xiaohongshu className="h-5 w-5" />
                        <span className="sr-only">Little Red Book</span>
                    </Link>
                    <button onClick={() => { navigator.clipboard.writeText("白衣卿相碎碎念"); alert("公众号ID已复制"); }} className="text-muted-foreground hover:text-[#07C160] transition-colors">
                        <Icons.wechat className="h-5 w-5" />
                        <span className="sr-only">WeChat</span>
                    </button>
                    <Link href={PROFILE.socials.douyin || "#"} target="_blank" className="text-muted-foreground hover:text-black dark:hover:text-white transition-colors">
                        <Icons.douyin className="h-5 w-5" />
                        <span className="sr-only">Douyin</span>
                    </Link>
                    <Link href={`mailto:${PROFILE.email}`} className="text-muted-foreground hover:text-blue-500 transition-colors">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
