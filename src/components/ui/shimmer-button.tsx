import React from "react";
import { cn } from "@/lib/utils";

/**
 * Primary action. Colours come from --foreground/--background so it inverts
 * with the theme — the previous version hard-coded a near-black fill, which
 * disappeared against the dark background.
 */
type ShimmerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    // `as="a"` is a first-class use here — the hero and contact CTAs are links.
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "type"> & {
        as?: React.ElementType;
    };

export const ShimmerButton = React.forwardRef<HTMLElement, ShimmerButtonProps>(
    ({ className, children, as: Component = "button", ...props }, ref) => {
    return (
        <Component
            ref={ref}
            className={cn(
                "group relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-full",
                "bg-foreground text-background",
                "px-6 py-3 font-medium",
                "elev-2 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:-translate-y-0.5 hover:elev-3 active:translate-y-0 active:scale-[0.985]",
                className
            )}
            {...props}
        >
            {/* Top-edge highlight: the difference between a flat fill and a solid object. */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                    background:
                        "linear-gradient(180deg, color-mix(in oklab, var(--background) 16%, transparent), transparent 46%)",
                }}
            />
            {/* Sheen sweep on hover. */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[400%]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, color-mix(in oklab, var(--background) 22%, transparent), transparent)",
                }}
            />

            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </Component>
        );
    }
);

ShimmerButton.displayName = "ShimmerButton";
