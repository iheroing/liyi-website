"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

export const CardSpotlight = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-card dark:border-zinc-800 dark:bg-card transition-colors",
                className
            )}
            {...props}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--spotlight-color),.1), transparent 40%)`,
                }}
            />

            {/* Spotlight border effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--spotlight-color),.4), transparent 40%)`,
                    maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                    WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                    maskComposite: `exclude`,
                    WebkitMaskComposite: `xor`,
                }}
            />

            {children}
        </div>
    );
};
