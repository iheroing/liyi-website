"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PROFILE } from "@/lib/data"

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)

    const navItems = [
        { name: PROFILE.nav.about, href: "#about" },
        { name: PROFILE.nav.experience, href: "#experience" },
        { name: PROFILE.nav.projects, href: "#projects" },
        { name: PROFILE.nav.contact, href: "#contact" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-5xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
                {/* Logo - Larger on desktop */}
                <Link href="/" className="font-bold text-lg md:text-xl tracking-tighter flex-shrink-0">
                    Li Yi<span className="text-primary">.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <ThemeToggle />
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64">
                            <nav className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
