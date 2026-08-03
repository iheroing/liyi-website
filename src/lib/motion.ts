import type { Variants } from "framer-motion"

/** One easing curve for the whole site. Everything else reads as noise. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Sections enter once, from just below the fold. */
export const VIEWPORT = { once: true, margin: "-88px" } as const

export const rise: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE },
    },
}

export const riseBlur: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: EASE },
    },
}

/** Parent for staggered grids. Children should use `rise`. */
export const stagger = (step = 0.07, delay = 0.05): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: step, delayChildren: delay },
    },
})
