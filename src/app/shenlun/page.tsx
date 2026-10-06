import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "申论素材库已迁移｜李弋的数字花园",
  description: "申论素材库已迁移至飞书多维表格。权威文章收集、AI 加工与素材积累在飞书中继续。",
};

export default function ShenlunPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f1e7] px-6 py-16 text-[#10233f]">
      <section className="w-full max-w-xl" aria-labelledby="migration-title">
        <p className="mb-6 text-xs tracking-[0.2em] text-[#687486]">申论素材库 · 迁移说明</p>
        <h1 id="migration-title" className="font-serif text-3xl leading-tight sm:text-4xl">素材积累，继续在飞书。</h1>
        <p className="mt-6 text-base leading-8 text-[#526174]">
          原网站阅读入口已停用。权威文章全文、重点精读，以及规范词、金句论据、成语词语库，已统一在飞书多维表格中管理。
        </p>
        <p className="mt-4 text-sm leading-7 text-[#526174]">
          GitHub 定时抓取直接写入飞书，由多维表格 AI 字段加工；这一流程不依赖原网站。
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a href="https://huatu.feishu.cn/base/LloMbOivlaqSVDsPjUecLagJnsc" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#10233f] px-5 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10233f]">前往飞书素材库 ↗</a>
          <Link href="/" prefetch={false} className="text-sm underline underline-offset-4">返回个人主页</Link>
        </div>
        <p className="mt-5 text-xs leading-6 text-[#687486]">飞书素材库需要登录及相应访问权限，未开放公开访问。</p>
      </section>
    </main>
  );
}
