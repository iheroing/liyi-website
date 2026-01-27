"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PROFILE } from "@/lib/data"

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { name: PROFILE.nav.about, href: "#about" },
        { name: PROFILE.nav.experience, href: "#experience" },
        { name: PROFILE.nav.projects, href: "#projects" },
        { name: PROFILE.nav.contact, href: "#contact" },
    ]

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled
                ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="container max-w-5xl mx-auto flex h-16 md:h-20 items-center justify-between px-6 md:px-8">
                {/* Logo */}
                <Link href="/" className="font-bold text-lg md:text-xl tracking-tighter flex-shrink-0 group">
                    <motion.span
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                    >
                        Li Yi<span className="text-foreground/30 group-hover:text-foreground/60 transition-colors duration-300">.</span>
                    </motion.span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navItems.map((item, i) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * i }}
                        >
                            <Link
                                href={item.href}
                                className="text-sm font-light tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-300" />
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        <ThemeToggle />
                    </motion.div>
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 relative">
                                <motion.div
                                    animate={isOpen ? "open" : "closed"}
                                    className="flex flex-col gap-1.5 items-end"
                                >
                                    <motion.span
                                        variants={{
                                            closed: { width: 24 },
                                            open: { width: 24, rotate: 45, y: 7.5 }
                                        }}
                                        className="h-[1px] bg-foreground block"
                                    />
                                    <motion.span
                                        variants={{
                                            closed: { width: 16, opacity: 1 },
                                            open: { width: 0, opacity: 0 }
                                        }}
                                        className="h-[1px] bg-foreground block"
                                    />
                                    <motion.span
                                        variants={{
                                            closed: { width: 24 },
                                            open: { width: 24, rotate: -45, y: -7.5 }
                                        }}
                                        className="h-[1px] bg-foreground block"
                                    />
                                </motion.div>
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-full sm:w-full border-none bg-background/95 backdrop-blur-2xl p-0 flex flex-col"
                            showCloseButton={false}
                        >
                            <div className="flex justify-between items-center px-6 h-16 border-b border-border/10">
                                <span className="font-bold text-lg tracking-tighter">Li Yi.</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-10 w-10"
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: 90 }}
                                        className="relative flex items-center justify-center"
                                    >
                                        <span className="absolute h-[1px] w-6 bg-foreground rotate-45" />
                                        <span className="absolute h-[1px] w-6 bg-foreground -rotate-45" />
                                    </motion.div>
                                </Button>
                            </div>

                            <nav className="flex-1 flex flex-col items-center justify-center gap-10">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.1 + (i * 0.1),
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="text-4xl font-light tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground transition-all duration-500 hover:tracking-[0.25em]"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="p-12 flex flex-col items-center gap-6"
                            >
                                <div className="h-[1px] w-12 bg-border/50" />
                                <div className="flex gap-8 text-muted-foreground/60">
                                    <span className="text-xs tracking-widest uppercase font-light">Beijing</span>
                                    <span className="text-xs tracking-widest uppercase font-light">2026</span>
                                </div>
                            </motion.div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    )
}
