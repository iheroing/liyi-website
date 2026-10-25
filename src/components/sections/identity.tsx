import type { CSSProperties } from "react"
import { PROFILE } from "@/lib/data"
import "./portfolio-story.css"

/**
 * 「关于」+「经历」合成的一节。
 *
 * 分开时两边都在自我介绍：一边列身份，一边列履历，读者要自己把它们对上。
 * 这里只讲一件事 —— 四段路各留下了什么，那些留下的东西就是现在的我。
 * 卡片并置，是为了让「留下」那一列能横着比较。
 */
export function Identity() {
    return (
        <section id="about" className="ps-section ps-identity-section" aria-labelledby="ps-identity-title">
            <div className="ps-wrap">
                <header className="ps-identity-head">
                    <h2 id="ps-identity-title" className="ps-title">
                        学医、教书、写代码，<br />留下的是同一种东西。
                    </h2>
                    <p className="ps-intro">
                        四段路，没有一段被下一段替换掉。医学留下的证据感，今天还用在判断一个推荐该不该给出；
                        课堂留下的现场感，决定了工具从哪里开始做。
                    </p>
                </header>

                <ol className="ps-journey">
                    {PROFILE.journey.map((step, index) => (
                        <li key={step.stage} className="ps-journey-step" style={{ "--step-i": index } as CSSProperties}>
                            <div className="ps-journey-head">
                                <span className="ps-journey-index" aria-hidden="true">{`第${"一二三四"[index]}段`}</span>
                                <div>
                                    <h3>{step.stage}</h3>
                                    <span className="ps-caption">{step.when}</span>
                                </div>
                            </div>
                            <p className="ps-journey-what">{step.what}</p>
                            {/* 这半截不写「留下」两个字：整节的标题已经说了
                                留下的是什么，这里再贴一个小标签，就是多余的
                                眉题。换一层底色足够把两半分开。 */}
                            <div className="ps-journey-keeps">
                                <strong>{step.keeps}</strong>
                                <p>{step.keepsWhy}</p>
                            </div>
                        </li>
                    ))}
                </ol>

                <footer className="ps-identity-foot">
                    <p className="ps-identity-now">
                        现在在做的，是把这四样东西放进同一件事里：
                        <em>先确认问题真的存在，再写出一个能被打开的答案。</em>
                    </p>
                    <ul className="ps-identity-honors">
                        {PROFILE.honors.slice(0, 4).map((honor) => <li key={honor}>{honor}</li>)}
                    </ul>
                </footer>
            </div>
        </section>
    )
}
