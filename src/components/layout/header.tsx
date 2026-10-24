"use client"

import { useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { PROFILE } from "@/lib/data"

const links = [{ href: "#projects", label: "作品" }, { href: "#about", label: "关于" }, { href: "#philosophy", label: "方法" }, { href: "#experience", label: "经历" }]

export function Header() {
    const [open, setOpen] = useState(false)
    return (
        <header className="pf-header">
            <div className="pf-frame pf-header-inner">
                <a className="pf-wordmark" href="#projects" aria-label="李弋，返回作品首页" onClick={() => setOpen(false)}>李弋<span aria-hidden="true">.</span><span className="pf-wordmark-latin">Li Yi</span></a>
                <nav className="pf-desktop-nav" aria-label="主导航">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
                <a href="#contact" className="pf-header-contact">聊聊 <ArrowUpRight size={17} aria-hidden="true" /></a>
                <button className="pf-menu-button" type="button" aria-label={open ? "关闭菜单" : "打开菜单"} aria-expanded={open} aria-controls="pf-mobile-nav" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
            </div>
            <nav id="pf-mobile-nav" hidden={!open} className="pf-mobile-nav" aria-label="手机导航" onKeyDown={event => { if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>('.pf-menu-button')?.focus() } }}>{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}<a href={`mailto:${PROFILE.email}`} onClick={() => setOpen(false)}>发一封邮件 <ArrowUpRight size={16} /></a></nav>
        </header>
    )
}
