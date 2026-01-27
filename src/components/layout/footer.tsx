import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t py-12 bg-muted/30">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row md:py-0 px-4 md:px-6">
                <p className="text-sm text-center text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} Li Yi. All rights reserved.
                </p>
                <div className="flex gap-4">
                    {/* Add social links here if available in PROFILE, currently hardcoded generic or from data if possible */}
                </div>
            </div>
        </footer>
    )
}
