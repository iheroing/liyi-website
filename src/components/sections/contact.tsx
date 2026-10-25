import { PROFILE } from "@/lib/data"

export function Contact() {
    return (
        <section id="contact" className="ps-section ps-contact" aria-labelledby="ps-contact-title">
            <div className="ps-wrap ps-editorial">
                <p className="ps-label">联系</p>
                <div>
                    <h2 id="ps-contact-title" className="ps-title">有个具体的问题？<br />我们聊聊。</h2>
                    <p className="ps-intro">如果你手上有一个每天都在发生、却一直没人好好整理的问题，那大概就是我感兴趣的那一类。教育培训、知识管理、AI 工具落地、内部流程产品化，都算。</p>
                    <a className="ps-email" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                    {/* 全页此前没有一个真正的行动点：邮箱是链接，"聊聊"藏在导航里 */}
                    <a className="ps-cta" href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("从 liyi.online 来")}`}>
                        写封邮件 <span aria-hidden="true">→</span>
                    </a>
                    <div className="ps-contact-links">
                        <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                        <a href={PROFILE.socials.xiaohongshu} target="_blank" rel="noopener noreferrer">小红书 <span aria-hidden="true">↗</span></a>
                        <p>微信公众号 <span className="ps-wechat">{PROFILE.socials.wechat}</span></p>
                        <p>{PROFILE.location}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
