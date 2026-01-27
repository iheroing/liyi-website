import { Github, Twitter, Mail, MapPin, Linkedin, Link as LinkIcon, Download } from "lucide-react"

export const PROFILE = {
    name: "Li Yi (李弋)",
    title: "Vibecoding Educator",
    role: "跨界教育管理者 | 全栈开发者 | AI 布道者",
    location: "Beijing, China",
    email: "sjtuliyi@163.com",
    phone: "18508486115",
    summary: "一位懂技术的医学教育专家，也是一位深耕教育场景的全栈开发者。拥有上海交通大学医学院肿瘤学硕士背景，从一线金牌讲师起步，成长为华图教育医疗板块的核心操盘手。极具极客精神与深度反思习惯，信奉 'Vibecoding'，致力于弥合'业务'与'技术'的鸿沟。",
    avatar: "/placeholder.jpg", // We will need an image
    identities: [
        {
            role: "教育管理者",
            title: "华图教育培训学院副院长 & 华图医疗研究院院长",
            description: "掌舵集团师资培训体系（3000+人）与医疗内容研发（200+人）。"
        },
        {
            role: "全栈开发者",
            title: "Indie Developer",
            description: "独立开发多款 5⭐ 浏览器插件与垂直领域 SaaS 工具，热衷于用代码解决实际痛点。"
        },
        {
            role: "AI 先行者",
            title: "AI Evangelist",
            description: "DeepSeek、ChatGPT 深度实践者，擅长将 AI 技术落地于教研生产与企业管理工作流。"
        }
    ],
    products: {
        extensions: [
            { name: "MarkWord", version: "v2.1", status: "5星", description: "Markdown 转 Word 神器。完美保留格式，解决文档转换痛点。", url: "https://chromewebstore.google.com/detail/markword-markdown%E8%BD%ACword%E7%A5%9E%E5%99%A8/nfcbgjehfbamkkgloincpebmmdfhnoje?authuser=0&hl=zh-CN" },
            { name: "书映 MindFlow", version: "v1.1.1", status: "5星", description: "沉浸式阅读工具。支持边读边生成思维导图，提升阅读心流。", url: "https://chromewebstore.google.com/detail/%E4%B9%A6%E6%98%A0-mindflow/degeinlckofhmknnmenpeglapopcamif?authuser=0&hl=zh-CN" },
            { name: "Code2HTML Pro", version: "v1.0.0", status: "已发布", description: "代码转网页工具。一键将代码片段转化为美观的 HTML 分享页。", url: "https://chromewebstore.google.com/detail/code2html-pro-%E6%9E%81%E7%AE%80%E4%BB%A3%E7%A0%81%E8%BD%AC%E7%BD%91%E9%A1%B5%E5%B7%A5%E5%85%B7/iiggflpmjjdkdpobemhjpjlljohpglip?authuser=0&hl=zh-CN" },
            { name: "文档查重助手 Pro", version: "v2.0", status: "已发布", description: "教研质检利器。高效检测文档重复率，保障内容原创性。" }
        ],
        apps: [
            { name: "爱闪记 (AiShanJi)", url: "https://www.aishanji.com/", description: "AI 闪卡学习神器。利用 AI 自动生成记忆卡片，帮助用户利用碎片时间高效学习。" },
            { name: "华图教育培训师工具箱", url: "https://www.huatupeixun.space/", description: "培训师的一站式军火库。集成了近百款课堂互动工具、教学教具及团建游戏，赋能一线教学。" },
            { name: "知识原子化中台", url: "https://knowledge-atomizer-liyi.streamlit.app/", description: "知识管理工具，实现知识颗粒的标准化拆解与重组。" }
        ],
        enterprise: [
            { name: "华图培训管理系统", description: "覆盖全集团 3000+ 专职教师，建立 NPS + 差评率 + 360环评 多维评价体系。" },
            { name: "医疗交付管理平台", description: "华图教育“年度创新奖”。WPS 多维表格 SaaS 化应用，服务医疗研究院 200+ 核心团队。" },
            { name: "AI 教研与质检体系", description: "DeepSeek R1 + 飞书多维表格 + Python。落地 AI 质检与 AI 面试点评。" }
        ]
    },
    experience: [
        {
            period: "2025 - 至今",
            role: "副院长 / Vice Dean",
            company: "华图教育培训学院 / Huatu Education Training Academy",
            description: "统筹集团师资与干部培训，主导 PMT 项目，重塑企业文化与激励机制。"
        },
        {
            period: "2025.09 - 2025.12",
            role: "集团战略部 (轮岗)",
            company: "华图教育 / Huatu Education",
            description: "搭建战略管理资源库，完成医疗市场深度调研，参与制定2026年战略地图。"
        },
        {
            period: "2021 - 至今",
            role: "院长 / Dean",
            company: "华图医疗研究院 / Huatu Medical Research Institute",
            description: "主导医疗面试 PCT 项目与医考580，负责医疗板块内容研发与师资管理。"
        },
        {
            period: "2017 - 2021",
            role: "资深培训师 / Senior Trainer",
            company: "华图教育 / Huatu Education",
            description: "深耕医学考试教学，累计授课 10,000+ 小时，培训学员 10,000+ 人。"
        }
    ],
    education: [
        {
            period: "2014 - 2017",
            degree: "硕士 / Master of Oncology",
            school: "上海交通大学医学院 / Shanghai Jiao Tong University School of Medicine",
            description: "师从陆劲松教授，主攻乳腺癌诊疗研究 @ 仁济医院"
        },
        {
            period: "2009 - 2014",
            degree: "本科 / Bachelor of Clinical Medicine",
            school: "中南大学湘雅医学院 / Xiangya School of Medicine, CSU",
            description: "实习 @ 湘雅医院"
        }
    ],
    honors: [
        "华图教育“教师风采大赛”特等奖",
        "华图教育“明日之星奖”",
        "华图教育“银图奖”",
        "华图教育“年度创新奖”",
        "华图教育“春华秋实奖”"
    ],
    tags: ["#Vibecoding", "#全栈开发者", "#AI布道者", "#多维表格深度用户", "#医学教育专家"],
    philosophy: [
        { title: "M-Factor Algorithm", description: "基于帕累托原理，筛选决定 80% 分数的 20% 黄金考点。" },
        { title: "IDEART Model", description: "符合大脑认知规律的教学心流设计 (Import, Define, Explain, Application, Review, Task)。" },
        { title: "Atomic Notes", description: "知识颗粒的标准化拆解与重组，像珠宝商一样加工知识。" },
        { title: "AI Amplifier", description: "AI 是外脑、执行者和模拟器，让个体进化为“一人公司”。" }
    ]
}
