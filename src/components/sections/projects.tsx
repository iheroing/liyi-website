"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading"
import { PROFILE } from "@/lib/data"
import { VIEWPORT, rise, stagger } from "@/lib/motion"

const { featured, products } = PROFILE

const isExternal = (url: string) => url.startsWith("http")

/** Extensions a featured entry gathers, resolved back to the registry. */
function collected(names?: string[]) {
    if (!names) return []
    return names
        .map((name) => products.extensions.find((item) => item.name === name))
        .filter((item): item is (typeof products.extensions)[number] => Boolean(item))
}

/**
 * Everything shipped but not promoted above. Derived rather than listed, so a
 * newly mounted app shows up here the moment it lands in the registry.
 */
const restOfApps = products.apps.filter(
    (app) => !featured.some((item) => "url" in item && item.url === app.url)
)

function Pill({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            target={isExternal(href) ? "_blank" : undefined}
            rel={isExternal(href) ? "noreferrer" : undefined}
            className="group/pill inline-flex items-center justify-between gap-2 rounded-full border border-hairline bg-surface-1 px-4 py-2 text-sm font-light text-ink-3 transition-[color,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-transparent hover:bg-foreground hover:text-background"
        >
            <span className="truncate">{children}</span>
            <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/pill:-translate-y-0.5 group-hover/pill:translate-x-0.5"
                strokeWidth={1.6}
            />
        </Link>
    )
}

export function Projects() {
    return (
        <section id="projects" className="relative bg-surface-2 py-24 md:py-32">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
                <SectionHeading
                    eyebrow="Selected Work"
                    title="作品，"
                    subtitle="是工作方式的证据。"
                    lede="我更愿意把项目看成一组连续的实践：从课堂、文档、组织流程和报考决策里发现问题，再把它们做成可以被别人使用的系统。"
                />

                <motion.div
                    variants={stagger()}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
                >
                    {featured.map((project, index) => {
                        const extensions = collected("collects" in project ? project.collects : undefined)
                        const url = "url" in project ? project.url : undefined

                        return (
                            <motion.article key={project.name} variants={rise}>
                                <CardSpotlight className="h-full">
                                    <div className="flex h-full flex-col p-7 md:p-8">
                                        <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-4">
                                            {String(index + 1).padStart(2, "0")} — {project.label}
                                        </span>
                                        <h3 className="headline mt-3 text-2xl font-medium text-ink-1 md:text-[1.75rem]">
                                            {project.name}
                                        </h3>

                                        <p className="mt-5 text-[1.05rem] font-medium leading-8 text-ink-1/90">
                                            {project.headline}
                                        </p>
                                        <p className="mt-3.5 text-sm font-light leading-7 text-ink-3 md:text-[0.95rem] md:leading-8">
                                            {project.description}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {project.focus.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-foreground/[0.05] px-3 py-1 text-xs font-normal text-ink-3"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Push the rest to the card floor so cards of unequal
                                            content still line up along the bottom. */}
                                        <div className="flex-1" />

                                        <div className="mt-7 border-t border-hairline pt-5">
                                            <p className="text-sm font-light leading-7 text-ink-3">{project.note}</p>
                                        </div>

                                        {extensions.length > 0 ? (
                                            <div className="mt-6">
                                                <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-4">
                                                    插件入口
                                                </p>
                                                <div className="grid gap-2 sm:grid-cols-2">
                                                    {extensions.map((item) => (
                                                        <Pill key={item.name} href={item.url}>
                                                            {item.name}
                                                        </Pill>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : url ? (
                                            <div className="mt-6">
                                                <Link
                                                    href={url}
                                                    target={isExternal(url) ? "_blank" : undefined}
                                                    rel={isExternal(url) ? "noreferrer" : undefined}
                                                    className="group/link inline-flex w-fit items-center gap-2 rounded-full border border-hairline bg-surface-1 px-5 py-2.5 text-sm text-ink-2 transition-[color,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-transparent hover:bg-foreground hover:text-background"
                                                >
                                                    查看项目
                                                    {isExternal(url) ? (
                                                        <ArrowUpRight
                                                            className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                                                            strokeWidth={1.6}
                                                        />
                                                    ) : (
                                                        <ArrowRight
                                                            className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-0.5"
                                                            strokeWidth={1.6}
                                                        />
                                                    )}
                                                </Link>
                                            </div>
                                        ) : null}
                                    </div>
                                </CardSpotlight>
                            </motion.article>
                        )
                    })}
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={stagger(0.06, 0.02)}
                    className="mt-6 rounded-[1.75rem] border border-hairline bg-surface-1 p-7 elev-1 md:p-9"
                >
                    <motion.div
                        variants={rise}
                        className="mb-7 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end md:gap-10"
                    >
                        <div>
                            <Eyebrow>Also Shipped</Eyebrow>
                            <h3 className="headline mt-4 text-2xl font-medium text-ink-1">其余的都在这里</h3>
                        </div>
                        <p className="measure text-sm font-light leading-7 text-ink-3">
                            代表作品之外，还有一组更轻、更散、但同样在被使用的东西。它们共同构成我对教育工具、知识产品和 AI 工作流的长期观察。
                        </p>
                    </motion.div>

                    <motion.div variants={rise} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {restOfApps.map((app) => (
                            <Link
                                key={app.name}
                                href={app.url}
                                target={isExternal(app.url) ? "_blank" : undefined}
                                rel={isExternal(app.url) ? "noreferrer" : undefined}
                                className="group/app flex flex-col rounded-[1.25rem] border border-hairline bg-surface-2/60 p-5 transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-surface-1"
                            >
                                <div className="mb-3 flex items-start justify-between gap-4">
                                    <h4 className="text-base font-medium text-ink-1">{app.name}</h4>
                                    <ArrowUpRight
                                        className="mt-0.5 h-4 w-4 shrink-0 text-ink-4 transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/app:-translate-y-0.5 group-hover/app:translate-x-0.5 group-hover/app:text-ink-1"
                                        strokeWidth={1.6}
                                    />
                                </div>
                                <p className="text-sm font-light leading-6 text-ink-3">{app.description}</p>
                            </Link>
                        ))}
                    </motion.div>

                    <motion.div variants={rise} className="mt-8 border-t border-hairline pt-7">
                        <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-4">
                            组织内部系统
                        </p>
                        <div className="grid gap-4 md:grid-cols-3">
                            {products.enterprise.map((item) => (
                                <div key={item.name}>
                                    <h4 className="text-sm font-medium text-ink-1">{item.name}</h4>
                                    <p className="mt-2 text-sm font-light leading-6 text-ink-3">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
