"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-9 w-9">
                <span className="h-4 w-4" />
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 relative overflow-hidden"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: resolvedTheme === "dark" ? 0 : 180,
                    scale: 1
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
            >
                {resolvedTheme === "dark" ? (
                    <Moon className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                    <Sun className="h-4 w-4" strokeWidth={1.5} />
                )}
            </motion.div>
            <span className="sr-only">切换主题</span>
        </Button>
    )
}
