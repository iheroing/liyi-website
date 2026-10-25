export const PROFILE = {
    name: "李弋",
    title: "知识系统设计者",
    role: "Education · Medicine · AI Workflow",
    bio: "把教育现场里的复杂经验，整理成可交付、可复用、可持续进化的系统。",
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
        philosophy: "方法",
        contact: "联系",
    },
    hero: {
        eyebrow: "Li Yi · Knowledge Systems",
        title: ["在教育现场，", "把复杂经验", "变成系统。"],
        description: "我在医学、教育与代码之间工作。关注那些难以被标准化的经验：课堂判断、教研流程、报考决策、组织培训，以及它们如何被 AI 和工具重新整理、放大和交付。",
        cta_contact: "与我联系",
        cta_projects: "看代表作品",
        scroll: "以手抵心，上下求索",
        coordinates: [
            { label: "Field", value: "教育现场", text: "从真实课堂、培训组织和教研管理里提取问题。" },
            { label: "System", value: "知识结构", text: "把隐性经验拆成流程、指标、规则和界面。" },
            { label: "Tool", value: "AI 工作流", text: "用代码和智能体把判断变成可运行的工具。" },
            { label: "Temper", value: "医学底色", text: "保留证据意识、边界感和对复杂性的尊重。" },
        ],
    },
    summary: "我不太相信抽象的“技术改变教育”。我更关心 AI 如何进入真实流程：减少重复劳动，放大专业判断，让经验不再只停留在某个优秀个体身上，而是可以被复用、被检验、被继续生长。",
    tags: ["教育现场", "知识系统", "AI Workflow", "工具工程", "医学训练"],
    identities: [
        {
            role: "现场的人",
            title: "Education Practitioner",
            description: "长期在培训、教研和师资培养的一线工作。很多工具不是从概念出发，而是从现场反复出现的低效、误判和沟通成本里长出来的。"
        },
        {
            role: "造工具的人",
            title: "Tool Builder",
            description: "用插件、Web 应用、内部系统和自动化流程，把个人判断变成可复用的工作界面。工具不追求炫技，先追求能被真实使用。"
        },
        {
            role: "拆系统的人",
            title: "Knowledge Systems",
            description: "习惯把复杂知识拆成结构，把模糊经验拆成规则，把一次性交付拆成可迭代系统。医学训练给了我证据感，代码给了我表达方式。"
        }
    ],

    /**
     * Machine-facing registry of everything shipped. The publish-liyi-project
     * skill appends an entry here on every new mount, and
     * tests/route-contracts.test.mjs asserts these names and urls by regex.
     *
     * Do not restructure or rename. Editorial emphasis belongs in `featured`
     * below; anything here that is not featured still surfaces automatically in
     * the project index, so a newly mounted app needs no further homepage edit.
     */
    products: {
        extensions: [
            { name: "MarkWord", version: "v2.1", status: "5星", description: "Markdown 转 Word，保留完美格式。文档转换，从此不再痛苦。", url: "https://chromewebstore.google.com/detail/markword-markdown%E8%BD%ACword%E7%A5%9E%E5%99%A8/nfcbgjehfbamkkgloincpebmmdfhnoje?authuser=0&hl=zh-CN" },
            { name: "书映 MindFlow", version: "v1.1.1", status: "5星", description: "将书籍内容直接『溶解』为思维导图。让阅读，真正发生心流。", url: "https://chromewebstore.google.com/detail/%E4%B9%A6%E6%98%A0-mindflow/degeinlckofhmknnmenpeglapopcamif?authuser=0&hl=zh-CN" },
            { name: "Code2HTML Pro", version: "v1.0.0", status: "已发布", description: "代码片段一键交付为完美网页。代码的优雅，由你定义。", url: "https://chromewebstore.google.com/detail/code2html-pro-%E6%9E%81%E7%AE%80%E4%BB%A3%E7%A0%81%E8%BD%AC%E7%BD%91%E9%A1%B5%E5%B7%A5%E5%85%B7/iiggflpmjjdkdpobemhjpjlljohpglip?authuser=0&hl=zh-CN" },
            { name: "文档查重助手 Pro", version: "v2.0", status: "已发布", description: "教研质检的守门员。守护每一份原创内容的价值。", url: "https://chromewebstore.google.com/detail/%E6%96%87%E6%A1%A3%E6%9F%A5%E9%87%8D%E5%8A%A9%E6%89%8B-pro/iicjkpmhadepfgmminjoljgbjaaobkef?authuser=0&hl=zh-CN" }
        ],
        apps: [
            { name: "申论素材库", url: "/shenlun", thumb: "/images/work/evidence/shenlun-home-2026-10-24.jpg", description: "已迁移至飞书多维表格，集中管理权威文章、重点精读和表达素材；定时抓取与 AI 加工在飞书中继续。" },
            { name: "AI 培训师", url: "/ai-trainer", thumb: "/images/work/evidence/ai-trainer-report-2026-10-24.jpg", description: "围绕六维度评价、教学亮点、改进建议与课堂笔记，形成清晰完整的单课复盘报告。" },
            { name: "雪花密语", url: "/snowflake", description: "把一句只说一次的话，凝结成独一无二的雪花；端到端加密，主动揭开后密文立即失效。" },
            { name: "爱闪记", url: "https://www.aishanji.com/", description: "AI 生成记忆卡片。用碎片时间，筑起知识宫殿。" },
            { name: "培训师工具箱", url: "https://www.huatupeixun.space/", description: "百款互动工具与教学模型。让课堂的每一秒都精彩。" },
            { name: "原子笔记", url: "/atomizer", thumb: "/images/work/evidence/atomizer-workspace-2026-10-24.jpg", description: "将 Markdown、Word 和带大纲的 PDF 拆解为可复用的知识原子，并导出到 CSV、Obsidian 或飞书。" }
        ],
        miniPrograms: [
            { name: "诗骰", description: "选择词包、掷出词面、排成诗句，保存并分享诗笺。", entry: "微信搜索「诗骰」" }
        ],
        enterprise: [
            { name: "国考报岗指导", description: "内部正式上线。结合招录条件与岗位适配度，为报岗咨询提供筛选、比较与决策支持。" },
            { name: "华图培训管理系统", description: "践行数据治理与 AI First。让沉淀的数据成为燃料，接入智能体，为组织进化创造无限可能。" },
            { name: "医疗交付管理平台", description: "复杂业务的透明化中枢。连接 200+ 团队的协作脉络，让流程井然有序。" },
            { name: "AI 师资个性化培训", description: "AI 辅助的师资成长引擎。为每一位讲师，打造独一无二的进化方案。" }
        ]
    },

    /**
     * Editorial layer: a handful of products told properly. Each entry points
     * back into `products` — by `url` for a single app, by `collects` for a
     * group — so nothing here can drift into describing something unshipped.
     * Promotion is a deliberate act; mounting is not.
     */
    featured: [
        {
            name: "培训师工具箱",
            label: "Teaching Tools",
            url: "https://www.huatupeixun.space/",
            shot: "/images/work/huatu.jpg",
            headline: "为教学准备趁手的工具，也为课堂留一点实验空间。",
            description: "面向培训师和教研团队，把实用工具与教学实验放在同一个工作台。覆盖课堂互动、讲解组织、题目拆解与活动设计，从教学现场出发，持续打磨。",
            focus: ["课堂现场", "教学模型", "工具矩阵", "高频复用"],
            note: "代表我的核心母题：不是让 AI 替代教师，而是把优秀教师的工作方式拆出来、做成可被更多人使用的结构。"
        },
        {
            name: "诗骰",
            label: "WeChat Mini Program",
            shot: "/images/work/poetry-dice.jpg",
            entry: "微信搜索「诗骰」",
            codeImage: "/images/poetry-dice-miniprogram.jpg",
            headline: "掷出几个词，写一首自己的诗。",
            description: "已上线的微信小程序。选择一位诗人的词包，掷出词面，再把零散的词排成诗句，保存为一张可以分享的诗笺。",
            focus: ["微信小程序", "词包", "排词成诗", "诗笺分享"],
            note: "给日常留一点偶然，也给表达留一点余地。"
        },
        {
            name: "浏览器插件矩阵",
            label: "Browser Extensions",
            collects: ["MarkWord", "书映 MindFlow", "Code2HTML Pro", "文档查重助手 Pro"],
            shot: "/images/work/plugins.jpg",
            headline: "围绕文档、阅读和代码交付，做一组轻量但高频的生产力工具。",
            description: "解决的是知识工作里最具体的摩擦：格式转换、阅读结构化、代码展示、教研质检。每一个都小到可以在一次会议的间隙里用完。",
            focus: ["Chrome 插件", "文档工作流", "阅读结构化", "轻量交付"],
            note: "这些小工具的价值不在宏大，而在足够贴近人的日常动作：一键、稳定、少解释。"
        },
        {
            name: "雪花密语",
            label: "Ephemeral Message",
            url: "/snowflake",
            shot: "/images/work/snowflake.jpg",
            headline: "把一句只想说一次的话，交出去之后就不再属于任何人。",
            description: "端到端加密，密钥只存在于链接本身，服务端拿不到明文。收信人主动揭开后密文立即失效，每条消息还会生成一片不会重复的雪花，读完即化。",
            focus: ["端到端加密", "阅后即焚", "无需账号", "一次性链接"],
            note: "做它是想试一件事：一个用完就消失的东西，能不能仍然让人觉得郑重。"
        },
        {
            name: "爱闪记",
            label: "Memory System",
            url: "https://www.aishanji.com/",
            shot: "/images/work/aishanji.jpg",
            headline: "把读过的东西，变成会主动来找你的记忆卡片。",
            description: "AI 从材料里生成问答卡，再按遗忘曲线安排复习。重点不在生成得多快，而在于让零散的碎片时间，最终落到同一套知识结构上。",
            focus: ["AI 生成卡片", "间隔复习", "碎片时间", "知识宫殿"],
            note: "记忆这件事上，工具能帮的其实只有一件：在你快要忘记的那一刻出现。"
        }
    ],

    method: [
        { step: "01", title: "到现场去", description: "先看真实工作怎么发生：谁在判断，哪里重复，哪些环节靠经验硬撑。" },
        { step: "02", title: "拆成结构", description: "把模糊经验拆成对象、规则、指标、例外和交互，不急着套 AI。" },
        { step: "03", title: "做成工具", description: "用最小可用界面承载判断，让工具在真实流程里被试用，而不是停在 Demo。" },
        { step: "04", title: "交付证据", description: "重要系统必须能解释：为什么推荐、依据是什么、边界在哪里、谁需要复核。" },
        { step: "05", title: "持续进化", description: "系统上线不是结束。每次反馈都应该让知识结构变得更清晰，而不是只修补表层问题。" }
    ],
    thinking: [
        {
            title: "AI 不是对话框，而是流程的重新布线。",
            description: "真正有用的 AI 落地，往往不是多一个入口，而是让信息、判断和动作在原流程里少绕几圈。"
        },
        {
            title: "工具的美感，来自对工作现场的尊重。",
            description: "一个按钮、一段解释、一个默认排序，背后都应该有对用户处境的理解。否则再精致也只是界面。"
        },
        {
            title: "教育产品最难的不是生成内容，而是保存判断。",
            description: "好的教师留下的不只是讲义，还有取舍、节奏、比喻、追问和临场修正。系统要想办法承接这些东西。"
        }
    ],
    experience: [
        {
            role: "医学训练",
            description: "在湘雅学临床，在上海交大读肿瘤学。医学训练让我习惯追问依据，也谨慎对待结论。"
        },
        {
            role: "教学与教研",
            description: "从医学讲师到教研与师资培养，把知识讲透，也把教学经验整理成更多人用得上的方法。"
        },
        {
            role: "业务与战略",
            description: "把视野从课堂延伸到业务与组织，判断什么值得做、什么应该先做，以及怎样把事情推进下去。"
        },
        {
            role: "产品与开发",
            description: "做小程序、插件，也做内部系统。工具的题目，来自教学与工作中反复遇到的问题。"
        }
    ],
    honors: [
        "AI 先锋大赛特等奖 × 2",
        "教师风采大赛特等奖",
        "明日之星奖",
        "银图奖",
        "年度创新奖",
        "春华秋实奖"
    ],
}
