"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { PROFILE } from "@/lib/data"
import { EASE } from "@/lib/motion"

const NAV = [
    { name: PROFILE.nav.projects, href: "#projects", id: "projects" },
    { name: PROFILE.nav.philosophy, href: "#philosophy", id: "philosophy" },
    { name: PROFILE.nav.about, href: "#about", id: "about" },
    { name: PROFILE.nav.experience, href: "#experience", id: "experience" },
    { name: PROFILE.nav.contact, href: "#contact", id: "contact" },
]

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(true)
    const [activeId, setActiveId] = React.useState<string | null>(null)

    // Keep the last position in a ref: putting it in state re-subscribed the
    // scroll listener on every single scroll event.
    const lastScrollY = React.useRef(0)

    React.useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY
            setIsScrolled(y > 24)
            setIsVisible(!(y > lastScrollY.current && y > 160))
            lastScrollY.current = y
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Scroll spy, so the nav always says where you are.
    React.useEffect(() => {
        const sections = NAV.map((item) => document.getElementById(item.id)).filter(
            (el): el is HTMLElement => el !== null
        )
        if (sections.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
                if (visible) setActiveId(visible.target.id)
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [])

    React.useEffect(() => {
        if (!isOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen])

    // Esc closes the mobile sheet.
    React.useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isOpen])

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: isVisible ? 0 : -96, opacity: isVisible ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="pointer-events-none fixed top-0 z-50 w-full px-4 pt-3 md:pt-5"
        >
            <div
                className={`pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-16 md:pl-6 md:pr-2.5 ${isScrolled
                    ? "border-hairline bg-surface-1/90 backdrop-blur-2xl elev-2"
                    : "border-transparent bg-surface-1/50 backdrop-blur-xl"
                    }`}
            >
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-2 text-base font-medium tracking-[-0.02em] text-ink-1 md:text-lg"
                >
                    Li Yi
                    <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-ink-4 transition-colors duration-300 group-hover:bg-foreground"
                    />
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {NAV.map((item) => {
                        const isActive = activeId === item.id

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                aria-current={isActive ? "true" : undefined}
                                className={`relative rounded-full px-3.5 py-2 text-sm font-light transition-colors duration-300 ${isActive ? "text-ink-1" : "text-ink-3 hover:text-ink-1"
                                    }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.06]"
                                    />
                                )}
                                {item.name}
                            </Link>
                        )
                    })}
                    <span aria-hidden className="mx-1.5 h-4 w-px bg-hairline" />
                    <ThemeToggle />
                </nav>

                <div className="flex items-center gap-1 md:hidden">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative h-10 w-10 rounded-full"
                        aria-label={isOpen ? "关闭菜单" : "打开菜单"}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((open) => !open)}
                    >
                        <motion.span animate={isOpen ? "open" : "closed"} className="flex flex-col items-end gap-[5px]">
                            <motion.span
                                variants={{ closed: { width: 20, rotate: 0, y: 0 }, open: { width: 20, rotate: 45, y: 6 } }}
                                transition={{ duration: 0.32, ease: EASE }}
                                className="block h-px bg-foreground"
                            />
                            <motion.span
                                variants={{ closed: { width: 13, opacity: 1 }, open: { width: 0, opacity: 0 } }}
                                transition={{ duration: 0.32, ease: EASE }}
                                className="block h-px bg-foreground"
                            />
                            <motion.span
                                variants={{ closed: { width: 20, rotate: 0, y: 0 }, open: { width: 20, rotate: -45, y: -6 } }}
                                transition={{ duration: 0.32, ease: EASE }}
                                className="block h-px bg-foreground"
                            />
                        </motion.span>
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.24, ease: EASE }}
                        className="pointer-events-auto fixed inset-0 z-[80] flex flex-col bg-background/95 px-6 py-5 backdrop-blur-2xl md:hidden"
                    >
                        <div className="flex h-12 items-center justify-between">
                            <span className="text-base font-medium tracking-[-0.02em] text-ink-1">Li Yi</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="关闭菜单"
                                onClick={() => setIsOpen(false)}
                                className="relative h-10 w-10 rounded-full"
                            >
                                <span aria-hidden className="absolute h-px w-5 rotate-45 bg-foreground" />
                                <span aria-hidden className="absolute h-px w-5 -rotate-45 bg-foreground" />
                            </Button>
                        </div>

                        <nav className="flex flex-1 flex-col justify-center gap-6">
                            {NAV.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                                    transition={{ duration: 0.42, delay: 0.04 + i * 0.055, ease: EASE }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="group flex items-baseline gap-4"
                                    >
                                        <span className="font-mono text-xs tabular-nums text-ink-4">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="headline font-heading text-[2.5rem] font-medium leading-none text-ink-2 transition-colors duration-300 group-hover:text-ink-1">
                                            {item.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.3, duration: 0.35 }}
                            className="flex flex-col gap-5 pb-8"
                        >
                            <div className="rule-fade" />
                            <div className="flex justify-between font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-4">
                                <span>{PROFILE.location}</span>
                                <span>2026</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
