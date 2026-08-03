"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

/**
 * The hero backdrop: a single soft light source, a low counter-glow, and a fine
 * grain layer. The grain matters — without it a gradient this large bands
 * visibly on 8-bit displays.
 */
export const AmbientBackdrop = ({
    className,
    children,
    ...props
}: React.HTMLProps<HTMLDivElement> & { children?: ReactNode }) => {
    return (
        <section
            className={cn(
                "relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground",
                className
            )}
            {...props}
        >
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Key light, high and slightly off-centre. */}
                <div
                    className="absolute inset-0 opacity-90 dark:opacity-100"
                    style={{
                        background:
                            "radial-gradient(120% 78% at 62% -12%, color-mix(in oklab, var(--foreground) 4%, transparent), transparent 62%)",
                    }}
                />
                {/* Cool fill from the lower left, so the field is not flat. */}
                <div
                    className="absolute inset-0 opacity-70 dark:opacity-90"
                    style={{
                        background:
                            "radial-gradient(70% 60% at 4% 88%, color-mix(in oklab, var(--foreground) 5%, transparent), transparent 58%)",
                    }}
                />
                {/* Vignette that grounds the section against the next one. */}
                <div
                    className="absolute inset-x-0 bottom-0 h-56"
                    style={{
                        background:
                            "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--foreground) 3%, transparent))",
                    }}
                />
                {/* Grain. Inlined so it costs no request and cannot flash. */}
                <div
                    className="absolute inset-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.055] dark:mix-blend-screen"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
                        backgroundSize: "160px 160px",
                    }}
                />
            </div>
            {children}
        </section>
    );
};
