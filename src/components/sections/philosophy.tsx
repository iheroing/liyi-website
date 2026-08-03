"use client"

import { motion } from "framer-motion"
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading"
import { PROFILE } from "@/lib/data"
import { VIEWPORT, rise, stagger } from "@/lib/motion"

export function Philosophy() {
    return (
        <section id="philosophy" className="relative bg-background py-24 md:py-32">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
                <SectionHeading
                    eyebrow="Method & Notes"
                    title="保留锋芒，"
                    subtitle="落在方法里。"
                    lede="我不想把个人网站写成冷冰冰的职业说明书。好的表达应该有温度，但每一个判断最好都能回到具体工作：现场、结构、工具和反馈。"
                />

                <div className="grid gap-5 md:gap-6 lg:grid-cols-[1.02fr_0.78fr]">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={stagger(0.06)}
                        className="rounded-[1.75rem] border border-hairline bg-surface-2/70 p-7 md:p-9"
                    >
                        <motion.div variants={rise} className="mb-7">
                            <Eyebrow>Operating Method</Eyebrow>
                            <h3 className="headline mt-4 text-2xl font-medium text-ink-1">我通常这样做系统</h3>
                        </motion.div>

                        <ol className="space-y-3">
                            {PROFILE.method.map((item) => (
                                <motion.li
                                    key={item.step}
                                    variants={rise}
                                    className="group grid gap-x-5 gap-y-2 rounded-[1.15rem] border border-hairline bg-surface-1 p-5 transition-[border-color,box-shadow] duration-500 hover:border-foreground/15 hover:elev-2 sm:grid-cols-[2.5rem_1fr]"
                                >
                                    <span className="font-mono text-sm tabular-nums text-ink-4 transition-colors duration-500 group-hover:text-ink-2">
                                        {item.step}
                                    </span>
                                    <div>
                                        <h4 className="text-[1.05rem] font-medium text-ink-1">{item.title}</h4>
                                        <p className="mt-2 text-sm font-light leading-7 text-ink-3">{item.description}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ol>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={stagger(0.07, 0.1)}
                        className="flex flex-col gap-4"
                    >
                        <motion.div
                            variants={rise}
                            className="rounded-[1.75rem] border border-hairline bg-foreground/[0.035] p-7"
                        >
                            <Eyebrow>Recent Thinking</Eyebrow>
                            <h3 className="headline mt-4 text-2xl font-medium text-ink-1">正在想的几件事</h3>
                            <p className="mt-3 text-sm font-light leading-7 text-ink-3">
                                这里保留一点更个人的语言。不是结论墙，而是我最近持续回到的问题。
                            </p>
                        </motion.div>

                        {PROFILE.thinking.map((item, i) => (
                            <motion.article
                                key={item.title}
                                variants={rise}
                                className="relative flex-1 rounded-[1.25rem] border border-hairline bg-surface-1 p-6 transition-[border-color,box-shadow] duration-500 hover:border-foreground/15 hover:elev-2"
                            >
                                <span
                                    aria-hidden
                                    className="absolute right-6 top-5 font-mono text-[0.62rem] tabular-nums text-ink-4/70"
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h4 className="headline max-w-[calc(100%-2rem)] text-[1.05rem] font-medium leading-7 text-ink-1">
                                    {item.title}
                                </h4>
                                <p className="mt-3 text-sm font-light leading-7 text-ink-3">{item.description}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
