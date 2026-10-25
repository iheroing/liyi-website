"use client"

import { useState, type CSSProperties } from "react"
import { PROFILE } from "@/lib/data"

const STEPS = PROFILE.method
const R = 38          // 圆半径，放在 100×100 的 viewBox 里
const GAP = 11        // 两段弧之间留的角度，缺口正好让节点坐上去

/** 极角转 viewBox 坐标。-90° 是十二点钟，顺时针为正。 */
function onCircle(deg: number, radius = R) {
    const rad = (deg * Math.PI) / 180
    return [50 + radius * Math.cos(rad), 50 + radius * Math.sin(rad)] as const
}

/** 第 i 段弧：从这一步走到下一步的那一段路。 */
function arc(index: number) {
    const start = index * 72 - 90 + GAP / 2
    const end = start + 72 - GAP
    const [x1, y1] = onCircle(start)
    const [x2, y2] = onCircle(end)
    return `M ${x1.toFixed(3)} ${y1.toFixed(3)} A ${R} ${R} 0 0 1 ${x2.toFixed(3)} ${y2.toFixed(3)}`
}

export function Philosophy() {
    const [active, setActive] = useState(0)
    const current = STEPS[active]

    return (
        <section id="philosophy" className="ps-section" aria-labelledby="ps-method-title">
            <div className="ps-wrap ps-method-layout">
                <div className="ps-method-head">
                    <h2 id="ps-method-title" className="ps-title">先看清楚，<br />再动手做。</h2>
                    <p className="ps-intro">我没有什么方法论，只有一套用顺手了的顺序。它不保证做对，但能让做错的时候早一点知道。</p>
                    <p className="ps-method-loop-note">五步是一个闭环：交付不是终点，每一次反馈都让下一次「到现场去」更准。</p>
                </div>

                <div className="ps-loop">
                    {/* 环本身。viewBox 是正方形，容器 aspect-ratio 也是 1，
                        所以圆永远是圆，不会被拉成椭圆。 */}
                    <svg className="ps-loop-ring" viewBox="0 0 100 100" aria-hidden="true">
                        {/* 两个箭头，颜色写死。marker 里的 currentColor 是对着
                            <defs> 解析的，不是对着引用它的那条路径，所以靠
                            继承拿不到强调色。markerUnits 设成 userSpaceOnUse，
                            箭头才不会跟着线宽一起变大。 */}
                        <defs>
                            {[["ps-loop-arrow", "rgba(240,238,231,.3)"], ["ps-loop-arrow-on", "#5fa386"]].map(([id, fill]) => (
                                <marker key={id} id={id} viewBox="0 0 10 10" refX="7.2" refY="5"
                                    markerWidth="3.4" markerHeight="3.4" markerUnits="userSpaceOnUse" orient="auto">
                                    <path d="M 0 1.6 L 8 5 L 0 8.4 z" fill={fill} />
                                </marker>
                            ))}
                        </defs>
                        {STEPS.map((step, index) => (
                            <path
                                key={step.step}
                                className={`ps-loop-arc${index === active ? " is-active" : ""}`}
                                d={arc(index)}
                                markerEnd={`url(#ps-loop-arrow${index === active ? "-on" : ""})`}
                            />
                        ))}
                    </svg>

                    <div className="ps-loop-nodes" role="tablist" aria-label="五个步骤">
                        {STEPS.map((step, index) => {
                            const [x, y] = onCircle(index * 72 - 90)
                            return (
                                <button
                                    key={step.step}
                                    type="button"
                                    role="tab"
                                    id={`ps-step-${step.step}`}
                                    aria-selected={index === active}
                                    aria-controls="ps-step-panel"
                                    tabIndex={index === active ? 0 : -1}
                                    className={`ps-loop-node${index === active ? " is-active" : ""}`}
                                    style={{ "--nx": `${x}%`, "--ny": `${y}%` } as CSSProperties}
                                    onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index) }}
                                    onFocus={() => setActive(index)}
                                    onClick={() => setActive(index)}
                                    onKeyDown={event => {
                                        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
                                        event.preventDefault()
                                        const next = (index + (event.key === "ArrowRight" ? 1 : -1) + STEPS.length) % STEPS.length
                                        setActive(next)
                                        document.getElementById(`ps-step-${STEPS[next].step}`)?.focus()
                                    }}
                                >
                                    {step.title}
                                </button>
                            )
                        })}
                    </div>

                    <div className="ps-loop-center" id="ps-step-panel" role="tabpanel"
                        aria-labelledby={`ps-step-${current.step}`} aria-live="polite">
                        <span className="ps-loop-step">第 {active + 1} 步 / 共 {STEPS.length} 步</span>
                        <p>{current.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
