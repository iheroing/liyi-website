import { ArrowUpRight } from "lucide-react"
import { PROFILE } from "@/lib/data"

export function Footer() {
    return (
        <footer className="pf-footer pf-frame">
            <div className="pf-footer-top"><p>医学给我严谨，代码给我自由。</p><a href="#projects">再看一遍作品 <ArrowUpRight size={18} aria-hidden="true" /></a></div>
            <div className="pf-footer-name" aria-hidden="true">Li Yi.</div>
            <div className="pf-footer-bottom"><span>© {new Date().getFullYear()} {PROFILE.name}</span><span>{PROFILE.location} · 保持好奇，继续创造。</span></div>
        </footer>
    )
}
