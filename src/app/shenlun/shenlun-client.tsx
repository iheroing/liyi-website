"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  Copy,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  ListTree,
  Quote,
  Search,
  Sparkles,
  Star,
  Target,
  X,
} from "lucide-react";
import type { ShenlunMaterial } from "./types";

const sources = ["全部", "人民日报", "中国政府网", "新华社", "求是"] as const;
const topics = ["全部", "高质量发展", "科技创新", "绿色发展", "基层治理", "民生保障", "文化建设"] as const;
const importanceLevels = ["全部", "重点精读", "常规积累", "快速浏览"] as const;
const detailTabs = ["精读分析", "申论应用", "原文全文"] as const;
type DetailTab = (typeof detailTabs)[number];

function materialImportance(item: ShenlunMaterial): Exclude<(typeof importanceLevels)[number], "全部"> {
  if (item.importance) return item.importance;
  if (typeof item.valueScore === "number" && item.valueScore >= 85) return "重点精读";
  if (typeof item.valueScore === "number" && item.valueScore < 60) return "快速浏览";
  return "常规积累";
}

function safeTags(item: ShenlunMaterial) {
  return Array.isArray(item.tags) ? item.tags : [];
}

function textParagraphs(text?: string) {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n|\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function ShenlunClient({ apiUrl }: { apiUrl: string }) {
  const [items, setItems] = useState<ShenlunMaterial[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [source, setSource] = useState<(typeof sources)[number]>("全部");
  const [topic, setTopic] = useState<(typeof topics)[number]>("全部");
  const [importance, setImportance] = useState<(typeof importanceLevels)[number]>("全部");
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [selected, setSelected] = useState<ShenlunMaterial | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("精读分析");
  const [fullTextExpanded, setFullTextExpanded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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
        setItems(Array.isArray(payload.items) ? payload.items : []);
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
      const matchesImportance = importance === "全部" || materialImportance(item) === importance;
      const text = [
        item.title,
        item.summary,
        item.viewpoint,
        item.evidence,
        item.topic,
        item.whyImportant,
        item.thesis,
        item.fullText,
        ...safeTags(item),
      ].filter(Boolean).join(" ").toLowerCase();
      return matchesSource && matchesTopic && matchesImportance && (!keyword || text.includes(keyword));
    });
  }, [items, query, source, topic, importance]);

  const focusCount = items.filter((item) => materialImportance(item) === "重点精读").length;

  const openMaterial = (item: ShenlunMaterial, tab: DetailTab = "精读分析") => {
    setSelected(item);
    setDetailTab(tab);
    setFullTextExpanded(false);
  };

  const toggleBookmark = (id: number) => {
    const next = bookmarks.includes(id)
      ? bookmarks.filter((item) => item !== id)
      : [...bookmarks, id];
    setBookmarks(next);
    window.localStorage.setItem("liyi-shenlun-bookmarks", JSON.stringify(next));
  };

  const copyText = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1500);
  };

  const resetFilters = () => {
    setQuery("");
    setSource("全部");
    setTopic("全部");
    setImportance("全部");
  };

  const syncLabel = updatedAt
    ? new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(updatedAt))
    : "持续更新";

  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#10233f] [color-scheme:light]">
      <header className="sticky top-0 z-40 border-b-4 border-[#e33b36] bg-[#10233f] text-white">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-8 px-5 md:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-[#e33b36] font-serif text-2xl font-bold">申</span>
            <span className="grid">
              <strong className="font-serif text-lg tracking-[0.14em]">申论素材库</strong>
              <small className="text-[8px] tracking-[0.24em] text-white/50">SHENLUN ARCHIVE</small>
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-8 text-sm text-white/65 md:flex">
            <a href="#materials" className="hover:text-white">材料标注台</a>
            <a href="#methods" className="hover:text-white">精读方法</a>
            <span className="flex items-center gap-2 text-white/55"><i className="h-2 w-2 rounded-full bg-emerald-400" />AI 自动更新</span>
          </nav>
          <Link href="/" className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs text-white/75 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" /> 返回个人主页
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-10 pt-12 md:grid-cols-[1fr_auto] md:px-8 md:pt-16">
        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.18em] text-[#e33b36]">全文可读 · 重点精读 · 申论转化</p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-7xl">
            不止收藏材料，<span className="text-[#e33b36]">更要读懂、会用</span>
          </h1>
          <p className="mt-6 max-w-3xl text-[15px] leading-8 text-[#687486] md:text-lg">
            收录权威文章全文，按申论价值分级；对重点文章拆解主旨、结构与分析维度，再转化为可直接调用的论据、表达和题目思路。
          </p>
        </div>
        <div className="flex items-end gap-8 border-l border-[#ddd5c7] pl-8">
          <div><strong className="block font-serif text-4xl">{String(items.length).padStart(2, "0")}</strong><span className="text-xs text-[#687486]">当前收录</span></div>
          <div><strong className="block font-serif text-4xl text-[#e33b36]">{focusCount}</strong><span className="text-xs text-[#687486]">重点精读</span></div>
          <div className="hidden lg:block"><strong className="block font-serif text-lg">{syncLabel}</strong><span className="text-xs text-[#687486]">最近同步</span></div>
        </div>
      </section>

      <section className="mx-auto mb-8 max-w-[1376px] border border-[#ddd5c7] bg-[#fffdf8] p-4 shadow-[0_18px_45px_rgba(16,35,63,0.06)] md:p-7">
        <label className="flex h-14 items-center gap-3 border border-[#cfc5b5] bg-white px-4">
          <Search className="h-5 w-5" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索全文、政策、论点、案例或关键词，例如：基层治理"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
          />
          {query && <button onClick={() => setQuery("")} aria-label="清除搜索" className="cursor-pointer"><X className="h-4 w-4" /></button>}
        </label>
        <FilterRow label="精读" values={importanceLevels} active={importance} onChange={(value) => setImportance(value as (typeof importanceLevels)[number])} dark />
        <FilterRow label="来源" values={sources} active={source} onChange={(value) => setSource(value as (typeof sources)[number])} />
        <FilterRow label="主题" values={topics} active={topic} onChange={(value) => setTopic(value as (typeof topics)[number])} />
      </section>

      <div className="mx-auto grid max-w-[1376px] gap-6 pb-20 lg:grid-cols-[minmax(0,1fr)_310px]">
        <main id="materials" className="min-w-0">
          <div className="mb-4 flex items-end justify-between px-5 md:px-0">
            <div className="flex items-baseline gap-3"><span className="text-[10px] font-bold tracking-[0.18em] text-[#e33b36]">ANNOTATION DESK</span><h2 className="font-serif text-3xl">材料标注台</h2></div>
            <span className="text-xs text-[#687486]">共 {filtered.length} 条 · 价值分级阅读</span>
          </div>
          <div className="grid gap-3">
            {loadState === "loading" && <StatusPanel icon={<Sparkles className="h-8 w-8 animate-pulse text-[#e33b36]" />} title="正在同步最新素材" note="连接权威来源、文章全文与 AI 精读结果…" />}
            {loadState === "error" && <StatusPanel icon={<BookOpen className="h-8 w-8 text-[#e33b36]" />} title="同步暂时中断" note="刷新页面即可重新连接，已入库的全文与标注不会丢失。" />}
            {filtered.map((item, index) => {
              const level = materialImportance(item);
              return (
                <article key={item.id} className={"border-y bg-[#fffdf8] md:border " + (level === "重点精读" ? "border-[#e33b36]/55 shadow-[inset_4px_0_0_#e33b36]" : "border-[#ddd5c7]") }>
                  <div className="flex min-h-12 flex-wrap items-center gap-3 border-b border-[#ddd5c7] px-5 py-2 text-xs text-[#687486] md:px-7">
                    <ImportanceBadge value={level} />
                    <strong className="text-[#10233f]">{item.source}</strong>
                    <span>{item.date}</span>
                    <span>{item.kind}</span>
                    {item.originMode === "ai" && <span className="flex items-center gap-1 text-[#e33b36]"><Sparkles className="h-3 w-3" /> AI 标注</span>}
                    {typeof item.wordCount === "number" && <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{item.wordCount.toLocaleString("zh-CN")} 字</span>}
                    <button onClick={() => toggleBookmark(item.id)} className="ml-auto flex cursor-pointer items-center gap-1.5" aria-label={bookmarks.includes(item.id) ? "取消收藏" : "收藏素材"}>
                      <Bookmark className="h-4 w-4" fill={bookmarks.includes(item.id) ? "currentColor" : "none"} />
                      <span className="hidden sm:inline">{bookmarks.includes(item.id) ? "已收藏" : "收藏"}</span>
                    </button>
                  </div>
                  <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(240px,0.65fr)]">
                    <div className="p-5 md:p-7">
                      <button onClick={() => openMaterial(item)} className="cursor-pointer text-left">
                        <h3 className={"font-serif font-semibold leading-[1.35] hover:text-[#e33b36] " + (index === 0 ? "text-3xl" : "text-2xl")}>{item.title}</h3>
                      </button>
                      <p className="mt-4 text-sm leading-7 text-[#687486]">{item.summary || "该材料正在生成内容摘要，可先进入全文阅读。"}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {safeTags(item).map((tag) => <span key={tag} className="bg-[#f0ebe1] px-3 py-1.5 text-[11px] text-[#1c385b]">{tag}</span>)}
                      </div>
                    </div>
                    <div className="flex flex-col border-t border-[#ddd5c7] bg-[#f6f1e7]/55 p-5 md:border-l md:border-t-0 md:p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-[0.15em] text-[#e33b36]">申论价值判断</span>
                        {typeof item.valueScore === "number" && <strong className="font-serif text-xl">{item.valueScore}<small className="ml-0.5 text-[10px] font-normal text-[#687486]">/100</small></strong>}
                      </div>
                      <p className="mt-3 font-serif text-[15px] leading-7 text-[#526076]">{item.whyImportant || item.viewpoint || "正在判断材料的申论价值与适用主题。"}</p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        <button onClick={() => openMaterial(item, "精读分析")} className="flex cursor-pointer items-center gap-2 bg-[#10233f] px-4 py-2.5 text-xs font-semibold text-white">
                          {level === "重点精读" ? "开始精读" : "查看标注"}<ArrowRight className="h-4 w-4" />
                        </button>
                        <button onClick={() => openMaterial(item, "原文全文")} className="flex cursor-pointer items-center gap-2 border border-[#cfc5b5] bg-white px-3 py-2.5 text-xs">
                          <FileText className="h-4 w-4" />读全文
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
            {loadState === "ready" && filtered.length === 0 && (
              <div className="border border-[#ddd5c7] bg-[#fffdf8] px-6 py-20 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-[#e33b36]" />
                <h3 className="mt-4 font-serif text-2xl">没有找到匹配素材</h3>
                <button onClick={resetFilters} className="mt-5 cursor-pointer bg-[#10233f] px-5 py-2.5 text-xs text-white">重置检索</button>
              </div>
            )}
          </div>
        </main>

        <aside className="grid content-start gap-4 px-5 lg:px-0">
          <section className="bg-[#10233f] p-6 text-white">
            <p className="text-xs tracking-[0.14em] text-white/55">今日精读台</p>
            <div className="mt-6 grid grid-cols-2">
              <div><strong className="block font-serif text-3xl text-[#ff665f]">{String(focusCount).padStart(2, "0")}</strong><span className="text-[11px] text-white/55">重点精读</span></div>
              <div className="border-l border-white/20 pl-5"><strong className="block font-serif text-3xl">{bookmarks.length}</strong><span className="text-[11px] text-white/55">我的摘录</span></div>
            </div>
            <button onClick={() => setImportance("重点精读")} className="mt-6 flex w-full cursor-pointer items-center justify-between border border-white/20 px-4 py-3 text-xs hover:bg-white/10">
              只看重点文章 <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-4 flex items-center gap-2 text-[10px] text-white/55"><span className="h-2 w-2 rounded-full bg-emerald-400" />每 6 小时自动更新</p>
          </section>
          <section id="methods" className="border border-[#ddd5c7] bg-[#fffdf8] p-6">
            <h3 className="font-serif text-xl">一篇文章，三遍读法</h3>
            <ol className="mt-5 grid gap-5">
              {[["01", "通读全文", "判断主题、语境与政策方向"], ["02", "拆解论证", "提取主旨、结构与分析维度"], ["03", "完成转化", "积累表达、案例与作答思路"]].map(([step, title, note]) => (
                <li key={step} className="grid grid-cols-[38px_1fr] gap-3">
                  <b className="font-serif text-[#e33b36]">{step}</b>
                  <span className="text-xs">{title}<small className="mt-1 block text-[#687486]">{note}</small></span>
                </li>
              ))}
            </ol>
          </section>
          <section className="border border-[#ddd5c7] bg-[#fffdf8] p-6">
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#e33b36]">标注原则</span>
            <p className="mt-4 border-l-2 border-[#e33b36] pl-4 font-serif text-[17px] leading-8">全文是依据，精读是过程，转化为申论表达才是目的。</p>
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
        <MaterialWorkbench
          item={selected}
          tab={detailTab}
          onTabChange={setDetailTab}
          onClose={() => setSelected(null)}
          bookmarked={bookmarks.includes(selected.id)}
          onBookmark={() => toggleBookmark(selected.id)}
          copied={copied}
          onCopy={copyText}
          fullTextExpanded={fullTextExpanded}
          onToggleFullText={() => setFullTextExpanded((value) => !value)}
        />
      )}
    </div>
  );
}

function MaterialWorkbench({
  item,
  tab,
  onTabChange,
  onClose,
  bookmarked,
  onBookmark,
  copied,
  onCopy,
  fullTextExpanded,
  onToggleFullText,
}: {
  item: ShenlunMaterial;
  tab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
  onClose: () => void;
  bookmarked: boolean;
  onBookmark: () => void;
  copied: string | null;
  onCopy: (text: string, key: string) => void;
  fullTextExpanded: boolean;
  onToggleFullText: () => void;
}) {
  const level = materialImportance(item);
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#071426]/65 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside role="dialog" aria-modal="true" aria-label={`${item.title}材料标注台`} className="flex h-full w-full max-w-[860px] flex-col bg-[#fffdf8] shadow-2xl">
        <div className="shrink-0 border-b border-[#ddd5c7] bg-[#fffdf8] px-5 pt-5 md:px-10 md:pt-8">
          <div className="flex items-start justify-between gap-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#687486]">
              <ImportanceBadge value={level} />
              <strong className="text-[#10233f]">{item.source}</strong><span>·</span><span>{item.date}</span>
              {typeof item.wordCount === "number" && <span>· {item.wordCount.toLocaleString("zh-CN")} 字</span>}
              {typeof item.valueScore === "number" && <span>· 申论价值 {item.valueScore}/100</span>}
            </div>
            <button onClick={onClose} className="shrink-0 cursor-pointer p-1" aria-label="关闭"><X className="h-6 w-6" /></button>
          </div>
          <h2 className="mt-5 max-w-3xl font-serif text-2xl font-semibold leading-[1.4] md:text-3xl">{item.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">{safeTags(item).map((tag) => <span key={tag} className="bg-[#f0ebe1] px-3 py-1.5 text-[11px]">{tag}</span>)}</div>
          <div className="mt-6 flex overflow-x-auto border-t border-[#ddd5c7]">
            {detailTabs.map((value) => (
              <button key={value} onClick={() => onTabChange(value)} className={"flex min-w-[124px] cursor-pointer items-center justify-center gap-2 border-b-4 px-4 py-4 text-sm font-semibold transition-colors " + (tab === value ? "border-[#e33b36] text-[#10233f]" : "border-transparent text-[#7a8493] hover:text-[#10233f]") }>
                {value === "精读分析" ? <Layers3 className="h-4 w-4" /> : value === "申论应用" ? <GraduationCap className="h-4 w-4" /> : <FileText className="h-4 w-4" />}{value}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-7 md:px-10 md:py-9">
          {tab === "精读分析" && <CloseReading item={item} />}
          {tab === "申论应用" && <ShenlunApplication item={item} copied={copied} onCopy={onCopy} />}
          {tab === "原文全文" && <FullArticle item={item} expanded={fullTextExpanded} onToggle={onToggleFullText} />}
        </div>

        <div className="shrink-0 border-t border-[#ddd5c7] bg-[#f6f1e7] px-5 py-4 md:px-10">
          <div className="flex flex-wrap gap-3">
            <button onClick={onBookmark} className="flex cursor-pointer items-center justify-center gap-2 border border-[#10233f] px-4 py-3 text-sm">
              <Bookmark className="h-4 w-4" fill={bookmarked ? "currentColor" : "none"} />{bookmarked ? "已加入摘录" : "加入摘录"}
            </button>
            <a href={item.url} target="_blank" rel="noreferrer" className="ml-auto flex items-center justify-center gap-2 bg-[#10233f] px-4 py-3 text-sm text-white">
              查看来源页面 <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function CloseReading({ item }: { item: ShenlunMaterial }) {
  const structure = Array.isArray(item.structure) ? item.structure : [];
  const dimensions = Array.isArray(item.dimensions) ? item.dimensions : [];
  return (
    <div className="mx-auto max-w-3xl">
      <div className="border-l-4 border-[#e33b36] bg-[#f6f1e7] px-5 py-5">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#e33b36]"><Star className="h-4 w-4" />为什么值得读</div>
        <p className="mt-3 font-serif text-lg leading-8">{item.whyImportant || item.summary || "这篇材料的精读价值正在分析中。"}</p>
      </div>
      <AnalysisSection icon={<Target className="h-4 w-4" />} title="核心主旨">
        <p className="font-serif text-lg leading-8">{item.thesis || item.viewpoint || "核心主旨正在提炼中。"}</p>
      </AnalysisSection>
      <AnalysisSection icon={<ListTree className="h-4 w-4" />} title="论证结构">
        {structure.length ? (
          <ol className="grid gap-4">
            {structure.map((part, index) => <li key={`${part.title}-${index}`} className="grid grid-cols-[32px_1fr] gap-3"><span className="grid h-8 w-8 place-items-center bg-[#10233f] font-serif text-sm text-white">{index + 1}</span><div><h4 className="font-semibold">{part.title}</h4><p className="mt-1 text-sm leading-7 text-[#687486]">{part.detail}</p></div></li>)}
          </ol>
        ) : <EmptyAnalysis text="文章结构正在拆解，现阶段可先结合摘要与全文阅读。" />}
      </AnalysisSection>
      <AnalysisSection icon={<Layers3 className="h-4 w-4" />} title="申论分析维度">
        {dimensions.length ? (
          <div className="grid gap-px border border-[#ddd5c7] bg-[#ddd5c7] sm:grid-cols-2">
            {dimensions.map((dimension, index) => <div key={`${dimension.name}-${index}`} className="bg-[#fffdf8] p-5"><h4 className="font-serif text-lg text-[#e33b36]">{dimension.name}</h4><p className="mt-2 text-sm leading-7 text-[#687486]">{dimension.analysis}</p></div>)}
          </div>
        ) : <EmptyAnalysis text="多维分析尚未生成，可先使用核心观点作为论证起点。" />}
      </AnalysisSection>
    </div>
  );
}

function ShenlunApplication({ item, copied, onCopy }: { item: ShenlunMaterial; copied: string | null; onCopy: (text: string, key: string) => void }) {
  const sentences = Array.isArray(item.sentences) ? item.sentences : [];
  const examples = Array.isArray(item.examples) ? item.examples : [];
  const questions = Array.isArray(item.questions) ? item.questions : [];
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-4 md:grid-cols-2">
        <ApplicationCard title="可用论据" icon={<ClipboardCheck className="h-4 w-4" />} text={item.evidence || "论据正在整理中。"} copyKey="evidence" copied={copied} onCopy={onCopy} />
        <ApplicationCard title="使用方法" icon={<Target className="h-4 w-4" />} text={item.usage || "申论用法正在整理中。"} copyKey="usage" copied={copied} onCopy={onCopy} />
      </div>
      <AnalysisSection icon={<Quote className="h-4 w-4" />} title="可积累表达">
        {sentences.length ? <div className="grid gap-3">{sentences.map((sentence, index) => <CopyRow key={index} text={sentence} copyKey={`sentence-${index}`} copied={copied} onCopy={onCopy} />)}</div> : <EmptyAnalysis text="高质量表达正在从全文中标注。" />}
      </AnalysisSection>
      <AnalysisSection icon={<GraduationCap className="h-4 w-4" />} title="写作迁移示例">
        {examples.length ? <div className="grid gap-3">{examples.map((example, index) => <div key={`${example.scenario}-${index}`} className="border border-[#ddd5c7] p-5"><span className="text-xs font-bold text-[#e33b36]">{example.scenario}</span><p className="mt-3 font-serif text-base leading-8">{example.expression}</p></div>)}</div> : <EmptyAnalysis text="正在把材料转化为不同题型和主题下的可用表达。" />}
      </AnalysisSection>
      <AnalysisSection icon={<BookOpen className="h-4 w-4" />} title="关联申论问题">
        {questions.length ? <ul className="grid gap-3">{questions.map((question, index) => <li key={index} className="flex gap-3 border-b border-[#ddd5c7] pb-3 text-sm leading-7"><span className="font-serif text-[#e33b36]">Q{index + 1}</span><span>{question}</span></li>)}</ul> : <EmptyAnalysis text="关联题目正在生成，可先依据材料主题自行设问。" />}
      </AnalysisSection>
    </div>
  );
}

function FullArticle({ item, expanded, onToggle }: { item: ShenlunMaterial; expanded: boolean; onToggle: () => void }) {
  const paragraphs = textParagraphs(item.fullText);
  const visible = expanded ? paragraphs : paragraphs.slice(0, 12);
  const structure = Array.isArray(item.structure) ? item.structure : [];
  return (
    <div className="mx-auto max-w-[720px]">
      {paragraphs.length ? (
        <>
          <div className="mb-8 border-y border-[#ddd5c7] py-5 text-sm text-[#687486]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-2"><FileText className="h-4 w-4" />全文 {item.wordCount ? `${item.wordCount.toLocaleString("zh-CN")} 字` : `${item.fullText?.length.toLocaleString("zh-CN")} 字符`}</span>
              <span>来源：{item.source}</span><span>发布日期：{item.date}</span>
            </div>
          </div>
          {structure.length > 0 && (
            <nav aria-label="文章结构目录" className="mb-9 bg-[#f0ebe1] p-5">
              <div className="flex items-center gap-2 text-xs font-bold"><ListTree className="h-4 w-4 text-[#e33b36]" />精读目录</div>
              <ol className="mt-4 grid gap-2 text-sm text-[#526076] sm:grid-cols-2">{structure.map((part, index) => <li key={`${part.title}-${index}`}><span className="mr-2 font-serif text-[#e33b36]">{String(index + 1).padStart(2, "0")}</span>{part.title}</li>)}</ol>
            </nav>
          )}
          <article className="font-serif text-[17px] leading-[2.05] text-[#263a55] md:text-[18px]">
            {visible.map((paragraph, index) => <p key={index} className={index === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.9] first-letter:text-[#e33b36]" : "mt-6"}>{paragraph}</p>)}
          </article>
          {paragraphs.length > 12 && (
            <div className="mt-9 border-t border-[#ddd5c7] pt-6 text-center">
              <button onClick={onToggle} className="inline-flex cursor-pointer items-center gap-2 border border-[#10233f] px-5 py-3 text-sm font-semibold">
                {expanded ? "收起全文" : `继续阅读全文（剩余 ${paragraphs.length - 12} 段）`}<ChevronDown className={"h-4 w-4 transition-transform " + (expanded ? "rotate-180" : "")} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="border border-[#ddd5c7] bg-[#f6f1e7] px-6 py-16 text-center">
          <FileText className="mx-auto h-9 w-9 text-[#e33b36]" />
          <h3 className="mt-4 font-serif text-2xl">全文正在入库</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#687486]">这条旧素材暂时只有提炼结果。全文采集完成后会直接显示在这里，不影响当前的摘要和申论用法。</p>
          <a href={item.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#10233f] px-5 py-3 text-sm text-white">先到来源页面阅读 <ExternalLink className="h-4 w-4" /></a>
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, values, active, onChange, dark = false }: { label: string; values: readonly string[]; active: string; onChange: (value: string) => void; dark?: boolean }) {
  return (
    <div className="mt-3 grid gap-2 md:grid-cols-[50px_1fr] md:items-center">
      <span className="text-xs text-[#867f74]">{label}</span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {values.map((value) => <button key={value} onClick={() => onChange(value)} className={"shrink-0 cursor-pointer border px-4 py-2 text-xs transition-colors " + (active === value ? (dark ? "border-[#10233f] bg-[#10233f] text-white" : "border-[#e33b36] bg-[#e33b36] text-white") : "border-[#ddd5c7] bg-white text-[#536075] hover:border-[#10233f]")}>{value}</button>)}
      </div>
    </div>
  );
}

function ImportanceBadge({ value }: { value: "重点精读" | "常规积累" | "快速浏览" }) {
  const styles = value === "重点精读" ? "bg-[#e33b36] text-white" : value === "快速浏览" ? "bg-[#e5e1d9] text-[#687486]" : "bg-[#10233f] text-white";
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] ${styles}`}>{value === "重点精读" && <Star className="h-3 w-3" fill="currentColor" />}{value}</span>;
}

function AnalysisSection({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return <section className="mt-9 border-t border-[#ddd5c7] pt-7"><div className="mb-5 flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#e33b36]">{icon}{title}</div>{children}</section>;
}

function ApplicationCard({ title, icon, text, copyKey, copied, onCopy }: { title: string; icon: ReactNode; text: string; copyKey: string; copied: string | null; onCopy: (text: string, key: string) => void }) {
  return <section className="border border-[#ddd5c7] bg-[#f6f1e7] p-5"><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#e33b36]">{icon}{title}</span><CopyButton text={text} copyKey={copyKey} copied={copied} onCopy={onCopy} /></div><p className="mt-4 font-serif text-base leading-8">{text}</p></section>;
}

function CopyRow({ text, copyKey, copied, onCopy }: { text: string; copyKey: string; copied: string | null; onCopy: (text: string, key: string) => void }) {
  return <div className="grid grid-cols-[1fr_auto] gap-4 border-l-2 border-[#e33b36] bg-[#f6f1e7] px-5 py-4"><p className="font-serif text-base leading-8">{text}</p><CopyButton text={text} copyKey={copyKey} copied={copied} onCopy={onCopy} /></div>;
}

function CopyButton({ text, copyKey, copied, onCopy }: { text: string; copyKey: string; copied: string | null; onCopy: (text: string, key: string) => void }) {
  const done = copied === copyKey;
  return <button onClick={() => onCopy(text, copyKey)} className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs" aria-label={`复制${text.slice(0, 12)}`}>{done ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}{done ? "已复制" : "复制"}</button>;
}

function EmptyAnalysis({ text }: { text: string }) {
  return <div className="border border-dashed border-[#cfc5b5] px-5 py-6 text-sm leading-7 text-[#7a8493]">{text}</div>;
}

function StatusPanel({ icon, title, note }: { icon: ReactNode; title: string; note: string }) {
  return <div className="border border-[#ddd5c7] bg-[#fffdf8] px-6 py-20 text-center"><div className="mx-auto grid place-items-center">{icon}</div><h3 className="mt-4 font-serif text-2xl">{title}</h3><p className="mt-2 text-sm text-[#687486]">{note}</p></div>;
}
