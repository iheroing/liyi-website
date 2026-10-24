"use client"

import { useCallback, useRef, useState, type CSSProperties, type ComponentProps, type KeyboardEvent } from "react"
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PROFILE } from "@/lib/data"
import { isMounted } from "@/lib/mounted-routes"
import { CASE_STUDIES } from "@/lib/case-studies"

const { featured, products } = PROFILE
const restOfApps = products.apps.filter(app => !featured.some(item => "url" in item && item.url === app.url))
const ease = [0.22, 1, 0.36, 1] as const

function WorkLink({ href = "", children, ...props }: ComponentProps<"a">) {
    if (href.startsWith("http") || isMounted(href)) {
        return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} {...props}>{children}</a>
    }
    return <Link href={href} {...props}>{children}</Link>
}

export function Projects() {
    const [active, setActive] = useState(0)
    const [selected, setSelected] = useState<number | null>(null)
    const reduceMotion = useReducedMotion()
    const cards = useRef<(HTMLButtonElement | null)[]>([])
    const rail = useRef<HTMLDivElement>(null)
    const returnFocus = useRef<HTMLElement | null>(null)
    const closeButton = useRef<HTMLButtonElement>(null)
    const current = featured[active]
    const currentCase = CASE_STUDIES[active]
    const detail = selected === null ? null : featured[selected]
    const detailCase = selected === null ? null : CASE_STUDIES[selected]

    const choose = useCallback((next: number, focus = false) => {
        const index = (next + featured.length) % featured.length
        setActive(index)
        if (window.matchMedia("(max-width: 760px)").matches) {
            const card = cards.current[index]
            const container = rail.current
            if (card && container) container.scrollTo({ left: card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2, behavior: reduceMotion ? "instant" : "smooth" })
        }
        if (focus) cards.current[index]?.focus({ preventScroll: true })
    }, [reduceMotion])

    function openProject(index: number, opener: HTMLElement) {
        setActive(index)
        returnFocus.current = opener
        setSelected(index)
    }

    function onGalleryKey(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault()
            choose(active + (event.key === "ArrowRight" ? 1 : -1), true)
        } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault()
            choose(event.key === "Home" ? 0 : featured.length - 1, true)
        }
    }

    return (
        <LayoutGroup id="work-gallery">
            <section id="projects" className="pf-exhibition" style={{ "--project-tone": currentCase.tone } as CSSProperties} aria-label="代表作品">
                <div className="pf-intro pf-frame">
                    <h1>从现场出发，<br />把想法做出来。</h1>
                    <div className="pf-intro-note">
                        <p>我是李弋，在医学、教育与代码之间工作。<br className="pf-desktop-break" />这里是我把经验变成工具的几种尝试。</p>
                        <a href="#about">关于我 <ArrowDown size={16} aria-hidden="true" /></a>
                    </div>
                </div>

                <div className="pf-gallery" onKeyDown={onGalleryKey}>
                    <div className="pf-card-rail" ref={rail} onScroll={() => {
                        if (!rail.current || !window.matchMedia("(max-width: 760px)").matches) return
                        const root = rail.current.getBoundingClientRect()
                        const center = root.left + root.width / 2
                        let closest = 0
                        let distance = Infinity
                        cards.current.forEach((card, index) => {
                            if (!card) return
                            const rect = card.getBoundingClientRect()
                            const delta = Math.abs(rect.left + rect.width / 2 - center)
                            if (delta < distance) { distance = delta; closest = index }
                        })
                        setActive(closest)
                    }}>
                        {featured.map((project, index) => (
                            <button
                                type="button"
                                key={project.name}
                                ref={node => { cards.current[index] = node }}
                                className={`pf-work-card${active === index ? " is-active" : ""}`}
                                style={{ "--card-angle": `${(index - 2) * 7}deg`, "--card-y": `${Math.abs(index - 2) * 19}px` } as CSSProperties}
                                aria-label={`查看${project.name}案例`}
                                aria-haspopup="dialog"
                                onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index) }}
                                onFocus={() => setActive(index)}
                                onClick={event => openProject(index, event.currentTarget)}
                            >
                                <motion.div className="pf-card-image" layoutId={reduceMotion ? undefined : `art-${index}`}>
                                    <Image src={project.shot} alt={`${project.name}概念主视觉`} fill priority={index < 2} sizes="(max-width: 760px) 76vw, 260px" />
                                </motion.div>
                                <div className="pf-card-caption">
                                    <span>{project.name}</span>
                                    <span className="pf-card-kind">{CASE_STUDIES[index].kind}</span>
                                    <ArrowUpRight className="pf-card-arrow" size={18} aria-hidden="true" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pf-gallery-bottom pf-frame">
                    <div className="pf-project-focus" aria-live="polite" aria-atomic="true">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div key={current.name} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}>
                                <h2>{current.name}</h2>
                                <p>{currentCase.summary}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="pf-gallery-controls">
                        <span className="pf-gallery-position">{active + 1} / {featured.length}</span>
                        <button type="button" aria-label="上一个作品" onClick={() => choose(active - 1)}><ArrowLeft size={20} /></button>
                        <button type="button" aria-label="下一个作品" onClick={() => choose(active + 1)}><ArrowRight size={20} /></button>
                    </div>
                </div>
                <div className="pf-gallery-foot pf-frame"><span>选一件作品，展开看看。</span><a href="#more-work">继续向下 <ArrowDown size={14} /></a></div>
            </section>

            <section id="more-work" className="pf-other-work pf-frame" aria-labelledby="other-work-title">
                <div className="pf-section-heading"><h2 id="other-work-title">还有一些，<br />正在解决具体的问题。</h2><p>从一堂课、一份文档，到组织里的日常协作。</p></div>
                <div className="pf-more-links">{restOfApps.map(app => <WorkLink key={app.name} href={app.url}><span><strong>{app.name}</strong><span>{app.description}</span></span><ArrowUpRight size={24} aria-hidden="true" /></WorkLink>)}</div>
                <details className="pf-internal"><summary>组织内部的实践 <span>{products.enterprise.length} 个项目 <ArrowDown size={16} /></span></summary><div>{products.enterprise.map(project => <article key={project.name}><h3>{project.name}</h3><p>{project.description}</p></article>)}</div></details>
            </section>

            <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) setSelected(null) }}>
                <AnimatePresence>
                    {detail && detailCase && selected !== null && (
                        <Dialog.Portal forceMount>
                            <Dialog.Overlay asChild><motion.div className="pf-dialog-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .2 }} /></Dialog.Overlay>
                            <Dialog.Content asChild onOpenAutoFocus={event => { event.preventDefault(); closeButton.current?.focus() }} onCloseAutoFocus={event => { event.preventDefault(); returnFocus.current?.focus({ preventScroll: true }) }} aria-describedby="case-summary">
                                <motion.div className="pf-dialog-content" initial={reduceMotion ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : 20 }} transition={{ duration: reduceMotion ? 0 : .35, ease }}>
                                    <div className="pf-case-top"><span>{detailCase.kind}</span><Dialog.Close asChild><button type="button" ref={closeButton} className="pf-case-close" aria-label="关闭案例"><span>返回作品</span><X size={20} /></button></Dialog.Close></div>
                                    <motion.div className="pf-case-art" layoutId={reduceMotion ? undefined : `art-${selected}`}><Image src={detail.shot} alt={`${detail.name}概念主视觉`} fill sizes="(max-width: 760px) 100vw, 1040px" /></motion.div>
                                    <div className="pf-case-body">
                                        <div className="pf-case-intro"><div><Dialog.Title>{detail.name}</Dialog.Title><Dialog.Description id="case-summary">{detailCase.summary}</Dialog.Description></div><p>{detail.description}</p></div>
                                        <div className="pf-case-process"><h3>从问题到作品</h3><ol>{detailCase.process.map(step => <li key={step.title}><h4>{step.title}</h4><p>{step.text}</p></li>)}</ol></div>
                                        {detailCase.screens.length > 0 && <div className="pf-evidence"><h3>{selected === 1 ? "在微信小程序里" : "打开之后"}</h3><div className={selected === 1 ? "pf-phone-screens" : "pf-screen-collection"}>{detailCase.screens.map(screen => <figure key={screen.src}><Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes={selected === 1 ? "(max-width: 760px) 42vw, 270px" : "(max-width: 760px) 90vw, 900px"} /><figcaption>{screen.caption}</figcaption></figure>)}</div><p className="pf-evidence-note">{detailCase.evidenceNote}</p></div>}
                                        {detail.collects && <div className="pf-extension-list">{detail.collects.map(name => { const extension = products.extensions.find(item => item.name === name); return extension ? <WorkLink key={name} href={extension.url}><strong>{extension.name}</strong><span>{extension.description}</span><ArrowUpRight size={20} /></WorkLink> : null })}</div>}
                                        <div className="pf-case-end"><p>{detail.note}</p>{"url" in detail ? <WorkLink className="pf-primary-link" href={detail.url}>打开{detail.name} <ArrowUpRight size={18} /></WorkLink> : detail.codeImage ? <div className="pf-mini-entrance"><Image src={detail.codeImage} alt="诗骰微信小程序码" width={128} height={128} /><div><strong>在微信里，掷一首诗。</strong><span>{detail.entry}</span><a href={detail.codeImage} target="_blank" rel="noopener noreferrer">打开小程序码 <ArrowUpRight size={14} /></a></div></div> : null}</div>
                                        <button type="button" className="pf-next-case" onClick={() => { const next = (selected + 1) % featured.length; setSelected(next); setActive(next); document.querySelector('.pf-dialog-content')?.scrollTo({ top: 0, behavior: 'instant' }); closeButton.current?.focus() }}>下一件作品：{featured[(selected + 1) % featured.length].name}<ArrowRight size={20} /></button>
                                    </div>
                                </motion.div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    )}
                </AnimatePresence>
            </Dialog.Root>
        </LayoutGroup>
    )
}
