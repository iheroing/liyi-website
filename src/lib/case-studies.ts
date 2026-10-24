export type CaseScreen = { src: string; alt: string; caption: string; width: number; height: number }
export type CaseStudy = {
    kind: string
    summary: string
    tone: string
    process: { title: string; text: string }[]
    screens: CaseScreen[]
    evidenceNote: string
}

// The artwork is an interpretation of each project. Screens are real captures;
// their provenance is recorded separately from the conceptual covers.
export const CASE_STUDIES: CaseStudy[] = [
    {
        kind: "教学工具与实验", tone: "#222b28", summary: "让一堂课的好想法，有趁手的工具。",
        process: [
            { title: "问题来自课堂", text: "互动、讲解、练习与活动设计里，有许多反复发生的小需求。" },
            { title: "工具与教学实验", text: "把实用工具和教学实验放到同一个工作台，按课堂需要选择。" },
            { title: "回到使用现场", text: "让培训师和教研团队在真实教学中检验，继续调整。" },
        ], screens: [{ src: "/images/work/evidence/huatu-home-2026-10-23.png", alt: "培训师工具箱工作台", caption: "课堂工具与教学实验的工作台", width: 2880, height: 1800 }], evidenceNote: "工作台界面，2026 年 10 月截图。",
    },
    {
        kind: "微信小程序", tone: "#302a25", summary: "掷几个词，把偶然写成自己的诗。",
        process: [
            { title: "掷出词面", text: "选择诗人词包，掷出词面，从偶然里挑选想留下的词。" },
            { title: "排成诗句", text: "移动词语，调整顺序与断行，让诗句慢慢长出来。" },
            { title: "落款成笺", text: "把写下的诗保存为诗笺，也可以分享给别人。" },
        ], screens: [
            { src: "/images/work/evidence/poetry-dice-1.6.0-desk.png", alt: "诗骰微信小程序书桌，九枚石骰和词面", caption: "书桌 · 从九枚骰子里选词", width: 616, height: 1334 },
            { src: "/images/work/evidence/poetry-dice-1.6.0-compose.png", alt: "诗骰微信小程序排句界面", caption: "排句 · 移动词语，留出断行", width: 616, height: 1334 },
            { src: "/images/work/evidence/poetry-dice-1.6.0-poem.png", alt: "诗骰微信小程序诗笺详情", caption: "诗笺 · 给写下的诗一个落款", width: 616, height: 1334 },
        ], evidenceNote: "微信小程序 1.6.0 开发版，2026 年 10 月本地模拟器画面。",
    },
    {
        kind: "四个浏览器扩展", tone: "#272a35", summary: "把知识工作里的小摩擦，逐个消掉。",
        process: [
            { title: "整理与转换", text: "MarkWord 处理 Markdown 到 Word 的文档交付。" },
            { title: "阅读与表达", text: "书映整理阅读结构，Code2HTML 处理代码片段的网页展示。" },
            { title: "检查与交付", text: "文档查重助手面向教研质检，把常用动作放进浏览器。" },
        ], screens: [
            { src: "/images/work/evidence/plugins-markword-listing-2026-10-24.png", alt: "MarkWord 的 Chrome 应用商店页面", caption: "MarkWord · Markdown 转 Word", width: 2160, height: 1350 },
            { src: "/images/work/evidence/plugins-mindflow-listing-2026-10-24.png", alt: "书映 MindFlow 的 Chrome 应用商店页面", caption: "书映 MindFlow · 把书读成结构", width: 2160, height: 1350 },
            { src: "/images/work/evidence/plugins-code2html-listing-2026-10-24.png", alt: "Code2HTML Pro 的 Chrome 应用商店页面", caption: "Code2HTML Pro · 代码片段转网页", width: 2160, height: 1350 },
            { src: "/images/work/evidence/plugins-dupcheck-listing-2026-10-24.png", alt: "文档查重助手 Pro 的 Chrome 应用商店页面", caption: "文档查重助手 Pro · 教研质检", width: 2160, height: 1350 },
        ], evidenceNote: "四个扩展的 Chrome 应用商店页面，2026 年 10 月抓取；页面是发布记录，不是扩展运行时界面。",
    },
    {
        kind: "一次性的加密消息", tone: "#202d32", summary: "把只想说一次的话，交给一片雪花。",
        process: [
            { title: "写下一句话", text: "消息在本地加密，密钥随分享链接传递。" },
            { title: "交出一片雪花", text: "每条消息对应一片雪花，把链接交给收信人。" },
            { title: "读过，然后消失", text: "收信人主动揭开后，密文立即失效。" },
        ], screens: [{ src: "/images/work/evidence/snowflake-home-2026-10-23.png", alt: "雪花密语写信与生成雪花的界面", caption: "写下一句话，再把雪花交给收信人", width: 2880, height: 1800 }], evidenceNote: "产品界面，2026 年 10 月截图。",
    },
    {
        kind: "记忆与复习工具", tone: "#30272b", summary: "让读过的知识，在快忘记时再出现。",
        process: [
            { title: "放入学习材料", text: "将需要记住的内容整理成资料，交给工具生成问答卡。" },
            { title: "主动回忆", text: "先尝试回答，再揭开答案，检查自己真正记住了什么。" },
            { title: "安排下次复习", text: "根据记忆情况安排复习，把碎片时间连成持续的学习。" },
        ], screens: [{ src: "/images/work/evidence/aishanji-create-sample-2026-10-24.png", alt: "爱闪记制作页，填有主动回忆学习法的示例资料", caption: "把学习资料整理为问答卡片", width: 2880, height: 1800 }], evidenceNote: "制作页填入示例资料后的界面，2026 年 10 月截图。",
    },
]
