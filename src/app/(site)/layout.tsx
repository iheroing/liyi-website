import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SoundController } from "@/components/ui/sound-controller"

/**
 * Chrome for the personal site itself.
 *
 * It lives in a route group rather than in the root layout so that mounted
 * apps — /shenlun today, anything added under a slug tomorrow — render on a
 * bare page. Those apps are full-screen interfaces with their own header and
 * their own link back home; the personal-site nav on top of them is two
 * headers stacked.
 */
export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <a
                href="#projects"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2.5 focus:text-sm focus:text-background"
            >
                跳到主要内容
            </a>
            <Header />
            {/* page.tsx supplies its own <main>; a second one here would nest them. */}
            <div className="flex-1">{children}</div>
            <Footer />
            <SoundController />
        </>
    )
}
