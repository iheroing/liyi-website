import { PROFILE } from "@/lib/data"
import "./portfolio-story.css"

export function About() {
    return (
        <section id="about" className="ps-section" aria-labelledby="ps-about-title">
            <div className="ps-wrap ps-editorial">
                <p className="ps-label">关于</p>
                <div>
                    <h2 id="ps-about-title" className="ps-title">在医学、教育与代码之间，<br />把经验变成系统。</h2>
                    <p className="ps-intro">{PROFILE.summary}</p>
                    <div className="ps-identities">
                        {PROFILE.identities.map((identity) => (
                            <article key={identity.role}>
                                <h3>{identity.role}</h3>
                                <span className="ps-caption">{identity.title}</span>
                                <p>{identity.description}</p>
                            </article>
                        ))}
                    </div>
                    <p className="ps-tags">{PROFILE.tags.join(" / ")}</p>
                </div>
            </div>
        </section>
    )
}
