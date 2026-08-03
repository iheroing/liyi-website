"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail, MapPin } from "lucide-react"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { Eyebrow } from "@/components/ui/section-heading"
import { PROFILE } from "@/lib/data"
import { EASE, VIEWPORT } from "@/lib/motion"

export function Contact() {
    return (
        <section id="contact" className="relative bg-surface-2 py-24 md:py-32">
            <div className="container mx-auto max-w-4xl px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.75, ease: EASE }}
                    className="relative overflow-hidden rounded-[2rem] border border-hairline bg-surface-1 px-7 py-12 text-center elev-2-hi md:px-14 md:py-16"
                >
                    {/* A single light source from above, matching the hero. */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(110% 70% at 50% -14%, color-mix(in oklab, var(--foreground) 5%, transparent), transparent 60%)",
                        }}
                    />

                    <div className="relative">
                        <Eyebrow className="mx-auto mb-6">Contact</Eyebrow>

                        <h2 className="headline font-heading text-[2rem] font-medium leading-[1.16] text-ink-1 sm:text-4xl md:text-5xl">
                            如果你也在处理复杂经验，
                            <span className="block text-ink-3">我们可以聊聊。</span>
                        </h2>

                        <p className="measure mx-auto mt-7 text-[0.98rem] font-light leading-8 text-ink-3 md:text-base md:leading-9">
                            教育培训、知识管理、AI 工具落地、内部流程产品化，或者只是某个“明明每天都在发生，却一直没人好好整理”的问题，都值得被认真看一眼。
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4">
                            <ShimmerButton as="a" href={`mailto:${PROFILE.email}`} className="h-13 py-0 pl-7 pr-2.5 text-base">
                                发送邮件
                                <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                                    <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                                </span>
                            </ShimmerButton>

                            <div className="flex flex-col items-center gap-2 text-sm text-ink-3 sm:flex-row sm:gap-3">
                                <a
                                    href={`mailto:${PROFILE.email}`}
                                    className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-2/70 px-4 py-2 transition-colors duration-300 hover:border-foreground/20 hover:text-ink-1"
                                >
                                    <Mail className="h-4 w-4 text-ink-4" strokeWidth={1.5} />
                                    {PROFILE.email}
                                </a>
                                <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-2/70 px-4 py-2">
                                    <MapPin className="h-4 w-4 text-ink-4" strokeWidth={1.5} />
                                    {PROFILE.location}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
