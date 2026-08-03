"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useRef, useState } from "react";

/**
 * A card that tracks the cursor with a soft light. The highlight is derived
 * from --foreground, so it stays monochrome in both themes instead of the
 * purple tint the original shipped with.
 */
export const CardSpotlight = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const divRef = useRef<HTMLDivElement>(null);
    const frame = useRef<number | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false);

    // Pointer moves fire far faster than we can paint; coalesce to one per frame.
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const div = divRef.current;
        if (!div) return;

        const { clientX, clientY } = e;
        if (frame.current !== null) return;

        frame.current = requestAnimationFrame(() => {
            frame.current = null;
            const rect = div.getBoundingClientRect();
            setPosition({ x: clientX - rect.left, y: clientY - rect.top });
        });
    }, []);

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            className={cn(
                "group/card relative flex flex-col overflow-hidden rounded-[1.5rem] border border-hairline bg-surface-1",
                "transition-[box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "elev-1 hover:border-foreground/15 hover:elev-3",
                className
            )}
            {...props}
        >
            {/* Cursor-tracked wash across the card face. */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity: active ? 1 : 0,
                    background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, color-mix(in oklab, var(--foreground) 5%, transparent), transparent 62%)`,
                }}
            />
            {/* The same light picked up on the border only — reads as a bevel. */}
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-[inherit] p-px transition-opacity duration-500"
                style={{
                    opacity: active ? 1 : 0,
                    background: `radial-gradient(380px circle at ${position.x}px ${position.y}px, color-mix(in oklab, var(--foreground) 26%, transparent), transparent 55%)`,
                    maskImage:
                        "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    WebkitMaskImage:
                        "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                }}
            />

            <div className="relative z-10 flex h-full flex-col">{children}</div>
        </div>
    );
};
