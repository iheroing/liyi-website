"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#10233f] grid place-items-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-sm bg-[#e33b36] text-white font-serif text-2xl">申</div>
        <h1 className="font-serif text-3xl mb-3">数据同步暂时中断</h1>
        <p className="text-sm text-[#687486] leading-7 mb-6">权威原文仍然安全，稍后重试即可恢复。</p>
        <button onClick={reset} className="bg-[#10233f] text-white px-6 py-3 text-sm cursor-pointer">重新加载</button>
      </div>
    </div>
  );
}
