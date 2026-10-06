import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "申论素材库已迁移｜李弋的数字花园",
  description: "申论素材库已搬到飞书。权威文章与表达素材，在那里继续积累。",
};

export default function ShenlunPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f1e7] px-6 py-16 text-[#10233f]">
      <section className="w-full max-w-xl" aria-labelledby="migration-title">
        <p className="mb-6 text-xs tracking-[0.2em] text-[#687486]">申论素材库</p>
        <h1 id="migration-title" className="font-serif text-3xl leading-tight sm:text-4xl">换个地方，继续积累。</h1>
        <p className="mt-6 text-base leading-8 text-[#526174]">
          申论素材库已搬到飞书。<br />
          权威文章与表达素材，都在那里继续更新。
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a href="https://huatu.feishu.cn/base/LloMbOivlaqSVDsPjUecLagJnsc" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#10233f] px-5 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10233f]">前往飞书素材库 ↗</a>
          <Link href="/" prefetch={false} className="text-sm underline underline-offset-4">返回个人主页</Link>
        </div>
        <p className="mt-5 text-xs leading-6 text-[#687486]">登录飞书后查看 · 需访问权限</p>
      </section>
    </main>
  );
}
