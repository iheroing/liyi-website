import { PROFILE } from "@/lib/data"

export function Philosophy() {
    return (
        <section id="philosophy" className="ps-section" aria-labelledby="ps-method-title">
            <div className="ps-wrap">
                <div className="ps-editorial ps-section-head">
                    <p className="ps-label">方法</p>
                    <div>
                        <h2 id="ps-method-title" className="ps-title">从现场出发，回到真实使用。</h2>
                        <p className="ps-intro">好的表达应该有温度，每一个判断也都能回到具体工作：现场、结构、工具和反馈。</p>
                    </div>
                </div>
                <ol className="ps-method">
                    {PROFILE.method.map((item) => (
                        <li key={item.step}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ol>
                <details className="ps-notes">
                    <summary>正在想的几件事<span aria-hidden="true" className="ps-notes-toggle">＋</span></summary>
                    <p className="ps-note-intro">不是结论墙，而是最近持续回到的问题。</p>
                    <div className="ps-thinking">
                        {PROFILE.thinking.map((item) => (
                            <article key={item.title}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </article>
                        ))}
                    </div>
                </details>
            </div>
        </section>
    )
}
