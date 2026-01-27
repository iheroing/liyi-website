import { Github, Twitter, Mail, MapPin, Linkedin, Link as LinkIcon, Download } from "lucide-react"

export const PROFILE = {
    name: "李弋",
    title: "Knowledge Architect",
    role: "医学 · 代码 · AI",
    bio: "左手医学，右手代码。致力于用技术重塑教育体验，让知识获取像呼吸一样自然。",
    location: "北京",
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
        scroll: "以手抵心，上下求索",
    },
    summary: "跨越医学与计算机的两栖探索者。从上海交大医学院的严谨科研，到赋能万千学子的教学实践，再到深耕教育场景的独立开发。我相信：代码可以打破学科边界，AI 能够重新定义知识生产力。",
    avatar: "/placeholder.jpg",
    identities: [
        {
            role: "教育操盘手",
            title: "Training Academy Vice Dean",
            description: "华图教育培训学院副院长，掌舵 3000+ 师资培养体系。在这里，我们不生产课程，我们培育能创造课程的人。"
        },
        {
            role: "全栈开发者",
            title: "Indie Developer",
            description: "多款 5⭐ 浏览器插件与教育工具的创造者。每一行代码，都是对某个痛点的回答。"
        },
        {
            role: "AI 智能体架构师",
            title: "AI Workflow Architect",
            description: "拒绝「对话框式」的浅层交互。我致力于构建人机共生的『数字外壳』，在算法的密林中，为人类认知寻找更轻盈的落点。"
        }
    ],
    products: {
        extensions: [
            { name: "MarkWord", version: "v2.1", status: "5星", description: "Markdown 转 Word，保留完美格式。文档转换，从此不再痛苦。", url: "https://chromewebstore.google.com/detail/markword-markdown%E8%BD%ACword%E7%A5%9E%E5%99%A8/nfcbgjehfbamkkgloincpebmmdfhnoje?authuser=0&hl=zh-CN" },
            { name: "书映 MindFlow", version: "v1.1.1", status: "5星", description: "将书籍内容直接『溶解』为思维导图。让阅读，真正发生心流。", url: "https://chromewebstore.google.com/detail/%E4%B9%A6%E6%98%A0-mindflow/degeinlckofhmknnmenpeglapopcamif?authuser=0&hl=zh-CN" },
            { name: "Code2HTML Pro", version: "v1.0.0", status: "已发布", description: "代码片段一键交付为完美网页。代码的优雅，由你定义。", url: "https://chromewebstore.google.com/detail/code2html-pro-%E6%9E%81%E7%AE%80%E4%BB%A3%E7%A0%81%E8%BD%AC%E7%BD%91%E9%A1%B5%E5%B7%A5%E5%85%B7/iiggflpmjjdkdpobemhjpjlljohpglip?authuser=0&hl=zh-CN" },
            { name: "文档查重助手 Pro", version: "v2.0", status: "已发布", description: "教研质检的守门员。守护每一份原创内容的价值。", url: "https://chromewebstore.google.com/detail/%E6%96%87%E6%A1%A3%E6%9F%A5%E9%87%8D%E5%8A%A9%E6%89%8B-pro/iicjkpmhadepfgmminjoljgbjaaobkef?authuser=0&hl=zh-CN" }
        ],
        apps: [
            { name: "爱闪记", url: "https://www.aishanji.com/", description: "AI 生成记忆卡片。用碎片时间，筑起知识宫殿。" },
            { name: "培训师工具箱", url: "https://www.huatupeixun.space/", description: "百款互动工具与教学模型。让课堂的每一秒都精彩。" },
            { name: "知识原子化中台", url: "https://knowledge-atomizer-liyi.streamlit.app/", description: "知识颗粒的拆解与重组。让复用，成为可能。" }
        ],
        enterprise: [
            { name: "华图培训管理系统", description: "覆盖 3000+ 教师的数字底座。NPS + 360 环评，让师资质量可衡量、可迭代。" },
            { name: "医疗交付管理平台", description: "复杂业务的透明化中枢。连接 200+ 团队的协作脉络，让流程井然有序。" },
            { name: "AI 师资个性化培训", description: "AI 辅助的师资成长引擎。为每一位讲师，打造独一无二的进化方案。" }
        ]
    },
    experience: [
        {
            period: "2025 - 至今",
            role: "副院长",
            company: "华图教育培训学院",
            description: "统筹师资培养与干部梯队。在这里，我们打造高密度的学习型组织。"
        },
        {
            period: "2025.09 - 2025.12",
            role: "战略部轮岗",
            company: "华图教育集团",
            description: "参与 2026 战略地图制定，完成医疗赛道的深度市场洞察。"
        },
        {
            period: "2021 - 至今",
            role: "院长",
            company: "华图医疗研究院",
            description: "从 0 到 1 搭建医疗教研体系。不只做管理，更在一线打磨产品。"
        },
        {
            period: "2017 - 2021",
            role: "资深培训师",
            company: "华图教育",
            description: "10,000+ 小时授课积淀。用极简逻辑，诠释复杂医学考点。"
        }
    ],
    education: [
        {
            period: "2014 - 2017",
            degree: "肿瘤学硕士",
            school: "上海交通大学医学院",
            description: "在严谨的肿瘤科研中，完成了数理逻辑与循证医学的双重洗礼。这段底色，决定了日后每一行代码的精确与克制。"
        },
        {
            period: "2009 - 2014",
            degree: "临床医学学士",
            school: "中南大学湘雅医学院",
            description: "「公勇勤慎，诚爱谦廉」——不仅是医学准则，也是我的人生信条。"
        }
    ],
    honors: [
        "教师风采大赛特等奖",
        "明日之星奖",
        "银图奖",
        "年度创新奖",
        "春华秋实奖"
    ],
    tags: ["Vibecoding", "全栈开发", "AI 布道", "多维表格", "医学教育"],
    philosophy: [
        { title: "黄金变量", description: "锁定决定 80% 结果的关键因子。从盲目刷题，进化为精准打击。" },
        { title: "心流教学", description: "告别填鸭式灌输。让知识像河流，自然流入大脑。" },
        { title: "知识原子", description: "像切割钻石一样打磨每一个知识颗粒。让沙子，被烧制成玻璃。" },
        { title: "AI 外脑", description: "思考的伙伴，执行的利器，认知的放大器。让每个人，都能成为一支超级战队。" },
        { title: "稀缺性转移", description: "'怎么做'变得廉价，'做什么'成为稀缺。人类的价值，在于定方向。" },
        { title: "率先垂范", description: "要求团队创新之前，自己先做出 Demo。管理者是探路者，不是指挥官。" }
    ]
}
