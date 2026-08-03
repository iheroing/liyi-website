"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useRef, useState } from "react";

/**
 * A card that tracks the cursor with a soft light.
 *
 * The two layers are themed through --spot-face and --spot-edge rather than
 * hard-coded, because the effect cannot be the same in both modes: on a white
 * card any face wash darkens, and a darkening "spotlight" reads as a smudge.
 * Light mode lights the edge only; dark mode, which has headroom, lights both.
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
                    background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, var(--spot-face), transparent 62%)`,
                }}
            />
            {/* The same light picked up on the border only — reads as a bevel.
                The two mask layers are clipped to different boxes and then
                excluded, leaving just the 1px ring between them. Note the
                longhands: `mask-image` only accepts images, so folding
                `content-box` into it makes the whole declaration invalid and the
                mask silently resolves to none — which paints the full gradient
                across the card face instead of its edge. */}
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-[inherit] p-px transition-opacity duration-500"
                style={{
                    opacity: active ? 1 : 0,
                    background: `radial-gradient(380px circle at ${position.x}px ${position.y}px, var(--spot-edge), transparent 55%)`,
                    // Prefixed first, standard last, so the standard property
                    // wins wherever both are understood.
                    WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
                    WebkitMaskClip: "content-box, border-box",
                    WebkitMaskOrigin: "content-box, border-box",
                    WebkitMaskComposite: "xor",
                    maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
                    maskClip: "content-box, border-box",
                    maskOrigin: "content-box, border-box",
                    maskComposite: "exclude",
                }}
            />

            <div className="relative z-10 flex h-full flex-col">{children}</div>
        </div>
    );
};
