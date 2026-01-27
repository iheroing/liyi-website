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
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Philosophy", href: "#philosophy" },
        { name: "Contact", href: "#contact" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="font-bold text-xl tracking-tighter">
                    Li Yi<span className="text-primary">.</span>
                </Link>
                <nav className="hidden md:flex gap-6 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <ThemeToggle />
                </nav>
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
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
