import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "申论素材库已迁移｜李弋的数字花园",
  description: "把好文章，读成自己的表达。申论素材库已迁至飞书，权威原文、精读与表达积累在那里继续。",
};

export default function ShenlunPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f1e7] px-6 py-16 text-[#10233f] sm:py-24">
      <section className="w-full max-w-2xl" aria-labelledby="migration-title">
        <p className="mb-8 flex items-center gap-3 text-xs tracking-[0.2em] text-[#687486]">
          <span aria-hidden="true" className="h-px w-8 bg-[#a44037]" />申论素材库
        </p>
        <h1 id="migration-title" className="font-serif text-[2.25rem] leading-[1.35] tracking-tight sm:text-[3.5rem]">
          把好文章，<br />
          <span className="text-[#a44037]">读成自己的表达。</span>
        </h1>
        <p className="mt-7 text-base leading-8 text-[#526174]">
          申论素材库已搬到飞书。<br />
          权威原文、精读与表达积累，在那里继续。
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a href="https://huatu.feishu.cn/base/LloMbOivlaqSVDsPjUecLagJnsc" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#10233f] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#233d5c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10233f]">去飞书，继续读 ↗</a>
          <Link href="/" prefetch={false} className="text-sm underline underline-offset-4">返回个人主页</Link>
        </div>
        <p className="mt-5 text-xs leading-6 text-[#687486]">登录飞书后查看 · 需访问权限</p>
      </section>
    </main>
  );
}
