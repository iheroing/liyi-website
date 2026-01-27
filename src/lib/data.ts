import { Github, Twitter, Mail, MapPin, Linkedin, Link as LinkIcon, Download } from "lucide-react"

export const PROFILE = {
    name: "李弋",
    title: "Vibecoding Educator",
    role: "医学教育专家 | 全栈开发者 | AI 布道师",
    bio: "左手医学，右手代码。致力于用技术重塑教育体验，让知识获取像呼吸一样自然。",
    location: "中国, 北京",
    email: "sjtuliyi@163.com",
    socials: {
        github: "https://github.com/iheroing",
        xiaohongshu: "https://www.xiaohongshu.com/user/profile/61d313ec000000001000e0df",
        wechat: "白衣卿相碎碎念",
        douyin: "https://www.douyin.com/user/self?from_tab_name=main&showSubTab=compilation&showTab=favorite_collection",
    },
    nav: {
        home: "首页",
        about: "关于",
        experience: "经历",
        projects: "作品",
        contact: "联系",
    },
    hero: {
        cta_contact: "与我联系",
        cta_contact_en: "Get in Touch",
        cta_projects: "探索作品",
        cta_projects_en: "View Projects",
        scroll: "以手抵心，上下求索", // More poetic/elegant than "Scroll down"
    },
    summary: "一位跨越医学与计算机的「两栖」探索者。拥有上海交通大学医学院肿瘤学硕士背景，曾是千万级营收的医学金牌讲师，如今也是深耕教育场景的独立开发者。我信奉 'Vibecoding' 哲学，擅长用代码打破学科边界，用 AI 重新定义知识生产力。",
    avatar: "/placeholder.jpg",
    identities: [
        {
            role: "教育操盘手",
            title: "Training Academy Vice Dean",
            description: "华图教育培训学院副院长。掌舵集团 3000+ 师资体系与 200+ 研发团队，主导企业文化重塑与人才密度升级。"
        },
        {
            role: "全栈开发者",
            title: "Indie Developer",
            description: "独立开发多款 5⭐ 浏览器插件与垂直领域 SaaS 工具。热衷于将复杂业务逻辑转化为优雅的代码解决方案。"
        },
        {
            role: "AI 先行者",
            title: "AI Evangelist",
            description: "DeepSeek 与 ChatGPT 的深度实践者。不仅是工具的使用者，更是 AI 工作流的架构师，致力于让 AI 成为每个人的「外脑」。"
        }
    ],
    products: {
        extensions: [
            { name: "MarkWord", version: "v2.1", status: "5星", description: "Markdown 转 Word 神器。保留完美格式，让文档转换不再痛苦。", url: "https://chromewebstore.google.com/detail/markword-markdown%E8%BD%ACword%E7%A5%9E%E5%99%A8/nfcbgjehfbamkkgloincpebmmdfhnoje?authuser=0&hl=zh-CN" },
            { name: "书映 MindFlow", version: "v1.1.1", status: "5星", description: "沉浸式阅读伴侣。边读边生成思维导图，让阅读真正发生心流。", url: "https://chromewebstore.google.com/detail/%E4%B9%A6%E6%98%A0-mindflow/degeinlckofhmknnmenpeglapopcamif?authuser=0&hl=zh-CN" },
            { name: "Code2HTML Pro", version: "v1.0.0", status: "已发布", description: "代码分享美化工具。一键将代码片段转化为极具设计感的 HTML 分享页。", url: "https://chromewebstore.google.com/detail/code2html-pro-%E6%9E%81%E7%AE%80%E4%BB%A3%E7%A0%81%E8%BD%AC%E7%BD%91%E9%A1%B5%E5%B7%A5%E5%85%B7/iiggflpmjjdkdpobemhjpjlljohpglip?authuser=0&hl=zh-CN" },
            { name: "文档查重助手 Pro", version: "v2.0", status: "已发布", description: "教研质检守门员。高效检测文档重复率，守护原创内容的价值。", url: "https://chromewebstore.google.com/detail/%E6%96%87%E6%A1%A3%E6%9F%A5%E9%87%8D%E5%8A%A9%E6%89%8B-pro/iicjkpmhadepfgmminjoljgbjaaobkef?authuser=0&hl=zh-CN" }
        ],
        apps: [
            { name: "爱闪记 (AiShanJi)", url: "https://www.aishanji.com/", description: "AI 驱动的闪卡学习神器。智能生成记忆卡片，利用碎片时间构建坚固的知识宫殿。" },
            { name: "华图教育培训师工具箱", url: "https://www.huatupeixun.space/", description: "培训师的一站式「军火库」。集成百款互动工具与教学模型，赋能课堂每一个精彩瞬间。" },
            { name: "知识原子化中台", url: "https://knowledge-atomizer-liyi.streamlit.app/", description: "下一代知识管理工具。实现知识颗粒的标准化拆解与重组，让知识复用成为可能。" }
        ],
        enterprise: [
            { name: "华图培训管理系统", description: "覆盖全集团 3000+ 专职教师，构建 NPS + 360环评的多维评价闭环，驱动师资质量持续跃升。" },
            { name: "医疗交付管理平台", description: "获华图教育「年度创新奖」。基于多维表格的 SaaS 化应用，重构医疗研究院 200+ 核心团队的协作流。" },
            { name: "AI 教研与质检体系", description: "融合 DeepSeek R1 与 Python 自动化。落地 AI 质检与 AI 面试点评，极大提升教研生产力。" }
        ]
    },
    experience: [
        {
            period: "2025 - 至今",
            role: "副院长 / Vice Dean",
            company: "华图教育培训学院",
            description: "统筹集团师资培养与干部梯队建设，主导 PMT 变革，致力于打造高密度的学习型组织。"
        },
        {
            period: "2025.09 - 2025.12",
            role: "集团战略部 (轮岗)",
            company: "华图教育集团",
            description: "协助制定 2026 集团战略地图，搭建战略管理资源库，完成医疗赛道深度市场洞察。"
        },
        {
            period: "2021 - 至今",
            role: "院长 / Dean",
            company: "华图医疗研究院",
            description: "从 0 到 1 搭建医疗教研体系。主导医疗面试 PCT 项目与「医考580」产品，不仅做管理，更在一线打磨产品。"
        },
        {
            period: "2017 - 2021",
            role: "资深培训师 / Senior Trainer",
            company: "华图教育",
            description: "深耕医学考试教学，累计授课 10,000+ 小时。始终保持对讲台的敬畏，用极简逻辑以此诠释复杂医学考点。"
        }
    ],
    education: [
        {
            period: "2014 - 2017",
            degree: "肿瘤学硕士 / Master of Oncology",
            school: "上海交通大学医学院",
            description: "师从陆劲松教授 @ 仁济医院。在严谨的医学科研中，通过了逻辑思维与数据分析的洗礼。"
        },
        {
            period: "2009 - 2014",
            degree: "临床医学学士",
            school: "中南大学湘雅医学院",
            description: "实习 @ 湘雅医院。「公勇勤慎，诚爱谦廉」的院训不仅是医学准则，也是我的人生信条。"
        }
    ],
    honors: [
        "华图教育「教师风采大赛」特等奖",
        "华图教育「明日之星奖」",
        "华图教育「银图奖」",
        "华图教育「年度创新奖」",
        "华图教育「春华秋实奖」"
    ],
    tags: ["#Vibecoding", "#全栈开发者", "#AI布道者", "#多维表格深度用户", "#医学教育专家"],
    philosophy: [
        { title: "M-Factor Algorithm", description: "基于帕累托原理，精准筛选决定 80% 结果的 20% 黄金变量。" },
        { title: "IDEART Model", description: "符合大脑认知规律的教学心流设计 (Import, Define, Explain, Application, Review, Task)。" },
        { title: "Atomic Notes", description: "知识颗粒的标准化拆解与重组，像精密加工珠宝一样打磨每一个知识点。" },
        { title: "AI Amplifier", description: "AI 是外脑，是执行者，更是模拟器。它让每一个个体都能进化为一支「超级战队」。" }
    ]
}
