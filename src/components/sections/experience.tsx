import { PROFILE } from "@/lib/data"

export function Experience() {
    return (
        <section id="experience" className="ps-section" aria-labelledby="ps-experience-title">
            <div className="ps-wrap ps-editorial">
                <div>
                    <p className="ps-label">经历</p>
                    <h2 id="ps-experience-title" className="ps-side-title">一路走来</h2>
                </div>
                <div>
                    <ol className="ps-experience">
                        {PROFILE.experience.map((entry) => (
                            <li key={entry.role}>
                                <h3>{entry.role}</h3>
                                <p>{entry.description}</p>
                            </li>
                        ))}
                    </ol>
                    <div className="ps-honors">
                        <h3>荣誉</h3>
                        <ul>{PROFILE.honors.map((honor) => <li key={honor}>{honor}</li>)}</ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
