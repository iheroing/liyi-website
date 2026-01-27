import React from "react";
import { cn } from "@/lib/utils";

export const ShimmerButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        shimmerColor?: string;
        shimmerSize?: string;
        borderRadius?: string;
        shimmerDuration?: string;
        background?: string;
    }
>(
    (
        {
            shimmerColor = "#ffffff",
            shimmerSize = "0.05em",
            shimmerDuration = "3s",
            borderRadius = "100px",
            background = "rgba(0, 0, 0, 1)",
            className,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "group relative flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border-slate-800 border-0 px-6 py-3 font-medium text-slate-400 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
                    className,
                )}
                style={
                    {
                        "--shimmer-color": shimmerColor,
                        "--shimmer-size": shimmerSize,
                        "--shimmer-duration": shimmerDuration,
                        "--border-radius": borderRadius,
                        "--spread": "90deg",
                        "--background": background,
                        borderRadius: borderRadius,
                    } as React.CSSProperties
                }
                {...props}
            >
                <div
                    className={cn(
                        "-z-30 absolute inset-0 overflow-visible [container-type:size]",
                    )}
                >
                    <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
                        <div className="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
                    </div>
                </div>

                {/* Backdrop - Direct inline black background */}
                <div className="absolute inset-[2px] -z-20 rounded-[calc(var(--border-radius))] bg-black" />

                {/* Content */}
                <div className="relative z-10 flex items-center justify-center gap-2">
                    {children}
                </div>

            </button>
        );
    },
);

ShimmerButton.displayName = "ShimmerButton";
