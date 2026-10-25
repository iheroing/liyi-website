import { PROFILE } from "@/lib/data"
import "./portfolio-story.css"

/**
 * 三条观点，每条都是一个对照。
 *
 * 以前是三个大标题各占一屏，中间全是留白 —— 1045px 高只装了 192 个字，
 * 读完也不知道三条之间有什么关系。现在把「不是什么」和「而是什么」拆成
 * 上下两行并排成一张对照表：三条立刻可比，整节矮了一半。
 *
 * 划掉那一半的线是滚动时画出来的，句子自己把自己的主张演一遍。
 */
export function Thinking() {
    return (
        <section id="thinking" className="ps-section ps-thinking-section" aria-labelledby="ps-thinking-title">
            <div className="ps-wrap">
                <h2 id="ps-thinking-title" className="ps-thinking-lead">正在想的几件事</h2>
                <ol className="ps-think-list">
                    {PROFILE.thinking.map((item) => (
                        <li key={item.but} className="ps-think-item">
                            <h3>
                                <span className="ps-think-not">
                                    不是<em>{item.not}</em>
                                </span>
                                <span className="ps-think-but">而是{item.but}</span>
                            </h3>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
