"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import type { ShenlunMaterial } from "./types";

const sources = ["全部", "人民日报", "中国政府网", "新华社", "求是"] as const;
const topics = ["全部", "高质量发展", "科技创新", "绿色发展", "基层治理", "民生保障", "文化建设"] as const;

export function ShenlunClient({
  apiUrl,
}: {
  apiUrl: string;
}) {
  const [items, setItems] = useState<ShenlunMaterial[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [source, setSource] = useState<(typeof sources)[number]>("全部");
  const [topic, setTopic] = useState<(typeof topics)[number]>("全部");
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [selected, setSelected] = useState<ShenlunMaterial | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const value = window.localStorage.getItem("liyi-shenlun-bookmarks");
    if (value) {
      try { setBookmarks(JSON.parse(value)); } catch { setBookmarks([]); }
    }
  }, []);

  useEffect(() => {
    let active = true;
    setLoadState("loading");
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("素材接口不可用");
        return response.json() as Promise<{ items?: ShenlunMaterial[]; updatedAt?: string | null }>;
      })
      .then((payload) => {
        if (!active) return;
        setItems(payload.items ?? []);
        setUpdatedAt(payload.updatedAt ?? null);
        setLoadState("ready");
      })
      .catch(() => {
        if (active) setLoadState("error");
      });
    return () => { active = false; };
  }, [apiUrl]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSource = source === "全部" || item.source === source;
      const matchesTopic = topic === "全部" || item.topic === topic;
      const text = [item.title, item.summary, item.viewpoint, item.evidence, item.topic, ...item.tags].join(" ").toLowerCase();
      return matchesSource && matchesTopic && (!keyword || text.includes(keyword));
    });
  }, [items, query, source, topic]);

  const toggleBookmark = (id: number) => {
    const next = bookmarks.includes(id)
      ? bookmarks.filter((item) => item !== id)
      : [...bookmarks, id];
    setBookmarks(next);
    window.localStorage.setItem("liyi-shenlun-bookmarks", JSON.stringify(next));
  };

  const copyEvidence = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const syncLabel = updatedAt
    ? new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(updatedAt))
    : "持续更新";

  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#10233f] [color-scheme:light]">
      <header className="sticky top-0 z-40 border-b-4 border-[#e33b36] bg-[#10233f] text-white">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-8 px-5 md:px-8">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-[#e33b36] font-serif text-2xl font-bold">申</span>
            <span className="grid">
              <strong className="font-serif text-lg tracking-[0.14em]">申论素材库</strong>
              <small className="text-[8px] tracking-[0.24em] text-white/50">SHENLUN ARCHIVE</small>
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-8 text-sm text-white/65 md:flex">
            <a href="#materials" className="hover:text-white">最新素材</a>
            <a href="#methods" className="hover:text-white">备考方法</a>
            <span className="flex items-center gap-2 text-white/55"><i className="h-2 w-2 rounded-full bg-emerald-400" />AI 自动更新</span>
          </nav>
          <Link href="/" className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs text-white/75 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" /> 返回个人主页
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-10 pt-12 md:grid-cols-[1fr_auto] md:px-8 md:pt-16">
        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.18em] text-[#e33b36]">AUTHORITY · TRACEABLE · AI ENHANCED</p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-7xl">
            读懂时代，<span className="text-[#e33b36]">写好申论</span>
          </h1>
          <p className="mt-6 max-w-3xl text-[15px] leading-8 text-[#687486] md:text-lg">
            持续收集人民日报、中国政府网、新华社与求是材料，由 AI 提炼观点、数据和申论用法，每一条都可回到权威原文。
          </p>
        </div>
        <div className="flex items-end gap-8 border-l border-[#ddd5c7] pl-8">
          <div><strong className="block font-serif text-4xl">{String(items.length).padStart(2, "0")}</strong><span className="text-xs text-[#687486]">当前收录</span></div>
          <div><strong className="block font-serif text-4xl">{items.filter((item) => item.originMode === "ai").length}</strong><span className="text-xs text-[#687486]">AI 提炼</span></div>
          <div className="hidden lg:block"><strong className="block font-serif text-lg">{syncLabel}</strong><span className="text-xs text-[#687486]">最近同步</span></div>
        </div>
      </section>

      <section className="mx-auto mb-8 max-w-[1376px] border border-[#ddd5c7] bg-[#fffdf8] p-4 shadow-[0_18px_45px_rgba(16,35,63,0.06)] md:p-7">
        <label className="flex h-14 items-center gap-3 border border-[#cfc5b5] bg-white px-4">
          <Search className="h-5 w-5" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索政策、主题、数据或关键词，例如：基层治理"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
          />
          {query && <button onClick={() => setQuery("")} aria-label="清除搜索" className="cursor-pointer"><X className="h-4 w-4" /></button>}
        </label>
        <FilterRow label="来源" values={sources} active={source} onChange={(value) => setSource(value as (typeof sources)[number])} dark />
        <FilterRow label="主题" values={topics} active={topic} onChange={(value) => setTopic(value as (typeof topics)[number])} />
      </section>

      <div className="mx-auto grid max-w-[1376px] gap-6 px-0 pb-20 lg:grid-cols-[minmax(0,1fr)_310px]">
        <main id="materials" className="min-w-0">
          <div className="mb-4 flex items-end justify-between px-5 md:px-0">
            <div className="flex items-baseline gap-3"><span className="text-[10px] font-bold tracking-[0.18em] text-[#e33b36]">CURATED</span><h2 className="font-serif text-3xl">最新素材</h2></div>
            <span className="text-xs text-[#687486]">共 {filtered.length} 条 · 按发布时间排序</span>
          </div>
          <div className="grid gap-3">
            {loadState === "loading" && (
              <div className="border border-[#ddd5c7] bg-[#fffdf8] px-6 py-20 text-center">
                <Sparkles className="mx-auto h-8 w-8 animate-pulse text-[#e33b36]" />
                <h3 className="mt-4 font-serif text-2xl">正在同步最新素材</h3>
                <p className="mt-2 text-sm text-[#687486]">连接权威来源与 AI 提炼结果…</p>
              </div>
            )}
            {loadState === "error" && (
              <div className="border border-[#ddd5c7] bg-[#fffdf8] px-6 py-20 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-[#e33b36]" />
                <h3 className="mt-4 font-serif text-2xl">同步暂时中断</h3>
                <p className="mt-2 text-sm text-[#687486]">刷新页面即可重新连接，权威原文数据不会丢失。</p>
              </div>
            )}
            {filtered.map((item, index) => (
              <article key={item.id} className="border-y border-[#ddd5c7] bg-[#fffdf8] md:border">
                <div className="flex min-h-12 items-center gap-3 border-b border-[#ddd5c7] px-5 text-xs text-[#687486] md:px-7">
                  <span className="h-2 w-2 rounded-full bg-[#e33b36]" />
                  <strong className="text-[#10233f]">{item.source}</strong>
                  <span>{item.date}</span>
                  <span>{item.kind}</span>
                  {item.originMode === "ai" && <span className="ml-1 flex items-center gap-1 text-[#e33b36]"><Sparkles className="h-3 w-3" /> AI 提炼</span>}
                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="ml-auto flex cursor-pointer items-center gap-1.5"
                    aria-label={bookmarks.includes(item.id) ? "取消收藏" : "收藏素材"}
                  >
                    <Bookmark className="h-4 w-4" fill={bookmarks.includes(item.id) ? "currentColor" : "none"} />
                    <span className="hidden sm:inline">{bookmarks.includes(item.id) ? "已收藏" : "收藏"}</span>
                  </button>
                </div>
                <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(230px,0.65fr)]">
                  <div className="p-5 md:p-7">
                    <button onClick={() => setSelected(item)} className="cursor-pointer text-left">
                      <h3 className={"font-serif font-semibold leading-[1.35] hover:text-[#e33b36] " + (index === 0 ? "text-3xl" : "text-2xl")}>{item.title}</h3>
                    </button>
                    <p className="mt-4 text-sm leading-7 text-[#687486]">{item.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => <span key={tag} className="bg-[#f0ebe1] px-3 py-1.5 text-[11px] text-[#1c385b]">{tag}</span>)}
                    </div>
                  </div>
                  <div className="flex flex-col border-t border-[#ddd5c7] bg-[#f6f1e7]/55 p-5 md:border-l md:border-t-0 md:p-6">
                    <span className="text-[10px] font-bold tracking-[0.15em] text-[#e33b36]">备考速用</span>
                    <p className="mt-3 font-serif text-[15px] leading-7 text-[#526076]">{item.viewpoint}</p>
                    <button onClick={() => setSelected(item)} className="mt-auto flex cursor-pointer items-center gap-2 pt-5 text-xs font-semibold">
                      展开提炼 <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {loadState === "ready" && filtered.length === 0 && (
              <div className="border border-[#ddd5c7] bg-[#fffdf8] px-6 py-20 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-[#e33b36]" />
                <h3 className="mt-4 font-serif text-2xl">没有找到匹配素材</h3>
                <button onClick={() => { setQuery(""); setSource("全部"); setTopic("全部"); }} className="mt-5 cursor-pointer bg-[#10233f] px-5 py-2.5 text-xs text-white">重置检索</button>
              </div>
            )}
          </div>
        </main>

        <aside className="grid content-start gap-4 px-5 lg:px-0">
          <section className="bg-[#10233f] p-6 text-white">
            <p className="text-xs tracking-[0.14em] text-white/55">素材库更新速报</p>
            <div className="mt-6 grid grid-cols-2">
              <div><strong className="block font-serif text-3xl text-[#ff665f]">{String(items.length).padStart(2, "0")}</strong><span className="text-[11px] text-white/55">当前收录</span></div>
              <div className="border-l border-white/20 pl-5"><strong className="block font-serif text-3xl">{bookmarks.length}</strong><span className="text-[11px] text-white/55">我的摘录</span></div>
            </div>
            <p className="mt-6 flex items-center gap-2 text-[10px] text-white/55"><span className="h-2 w-2 rounded-full bg-emerald-400" />每 6 小时自动更新</p>
          </section>
          <section id="methods" className="border border-[#ddd5c7] bg-[#fffdf8] p-6">
            <h3 className="font-serif text-xl">20 分钟精读法</h3>
            <ol className="mt-5 grid gap-5">
              {[["05′", "定位政策目标", "找出问题与行动方向"], ["08′", "拆解核心论点", "整理原因与对策关系"], ["07′", "积累数据案例", "形成一条可调用表达"]].map(([time, title, note]) => (
                <li key={time} className="grid grid-cols-[38px_1fr] gap-3">
                  <b className="font-serif text-[#e33b36]">{time}</b>
                  <span className="text-xs">{title}<small className="mt-1 block text-[#687486]">{note}</small></span>
                </li>
              ))}
            </ol>
          </section>
          <section className="border border-[#ddd5c7] bg-[#fffdf8] p-6">
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#e33b36]">维护原则</span>
            <p className="mt-4 border-l-2 border-[#e33b36] pl-4 font-serif text-[17px] leading-8">AI 负责提炼，不替代权威原文；每一个事实都应当能够追溯。</p>
          </section>
        </aside>
      </div>

      <footer className="bg-[#10233f] px-5 py-10 text-white/55">
        <div className="mx-auto flex max-w-[1376px] flex-wrap items-center gap-5 text-xs">
          <span className="font-serif text-lg text-white">申论素材库</span>
          <span>李弋的数字花园 · AI First</span>
          <Link href="/" className="ml-auto flex items-center gap-2 text-white"><ArrowLeft className="h-4 w-4" />返回个人主页</Link>
        </div>
      </footer>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#071426]/65 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <aside role="dialog" aria-modal="true" className="h-full w-full max-w-xl overflow-y-auto bg-[#fffdf8] p-6 shadow-2xl md:p-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.14em] text-[#e33b36]">{selected.source} · {selected.date}</span>
              <button onClick={() => setSelected(null)} className="cursor-pointer" aria-label="关闭"><X className="h-6 w-6" /></button>
            </div>
            <h2 className="mt-7 font-serif text-3xl font-semibold leading-[1.35]">{selected.title}</h2>
            <div className="mt-5 flex flex-wrap gap-2">{selected.tags.map((tag) => <span key={tag} className="bg-[#f0ebe1] px-3 py-1.5 text-[11px]">{tag}</span>)}</div>
            <DetailSection title="内容摘要">{selected.summary}</DetailSection>
            <DetailSection title="核心观点">{selected.viewpoint}</DetailSection>
            <section className="mt-7 border-t border-[#ddd5c7] pt-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.14em] text-[#e33b36]">事实数据</span>
                <button onClick={() => copyEvidence(selected.evidence)} className="flex cursor-pointer items-center gap-1.5 text-xs">
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}{copied ? "已复制" : "复制"}
                </button>
              </div>
              <p className="mt-3 font-serif text-lg leading-8">{selected.evidence}</p>
            </section>
            <DetailSection title="申论用法">{selected.usage}</DetailSection>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <button onClick={() => toggleBookmark(selected.id)} className="flex cursor-pointer items-center justify-center gap-2 border border-[#10233f] px-4 py-3 text-sm">
                <Bookmark className="h-4 w-4" fill={bookmarks.includes(selected.id) ? "currentColor" : "none"} />{bookmarks.includes(selected.id) ? "已加入摘录" : "加入摘录"}
              </button>
              <a href={selected.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#10233f] px-4 py-3 text-sm text-white">
                查看权威原文 <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  values,
  active,
  onChange,
  dark = false,
}: {
  label: string;
  values: readonly string[];
  active: string;
  onChange: (value: string) => void;
  dark?: boolean;
}) {
  return (
    <div className="mt-3 grid gap-2 md:grid-cols-[50px_1fr] md:items-center">
      <span className="text-xs text-[#867f74]">{label}</span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {values.map((value) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={"shrink-0 cursor-pointer border px-4 py-2 text-xs transition-colors " + (active === value ? (dark ? "border-[#10233f] bg-[#10233f] text-white" : "border-[#e33b36] bg-[#e33b36] text-white") : "border-[#ddd5c7] bg-white text-[#536075] hover:border-[#10233f]")}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7 border-t border-[#ddd5c7] pt-6">
      <span className="text-[10px] font-bold tracking-[0.14em] text-[#e33b36]">{title}</span>
      <p className="mt-3 font-serif text-lg leading-8">{children}</p>
    </section>
  );
}
