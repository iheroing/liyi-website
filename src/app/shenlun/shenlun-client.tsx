"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
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
  AlertTriangle,
  LoaderCircle,
} from "lucide-react";
import type { ShenlunMaterial } from "./types";

const sources = ["全部", "人民日报", "中国政府网", "新华社", "求是"] as const;
const topics = ["全部", "高质量发展", "科技创新", "绿色发展", "基层治理", "民生保障", "文化建设"] as const;
const importanceLevels = ["全部", "重点精读", "常规积累", "快速浏览"] as const;
const detailTabs = ["精读分析", "申论应用", "原文全文"] as const;
type DetailTab = (typeof detailTabs)[number];
export type SyncRunSummary = {
  discovered: number;
  processed: number;
  failureCount: number;
  warningCount?: number;
};

export type ShenlunInitialData = {
  items?: ShenlunMaterial[];
  total?: number;
  updatedAt?: string | null;
  checkedAt?: string | null;
  lastRun?: SyncRunSummary | null;
};

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

function decodeDisplayText(value?: string) {
  if (!value) return "";
  let decoded = value;
  const namedEntities: Record<string, string> = {
    amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'", nbsp: " ", ensp: " ", emsp: " ", thinsp: " ",
  };
  for (let pass = 0; pass < 2 && /&(?:#\d+|#x[\da-f]+|amp|lt|gt|quot|apos|nbsp|ensp|emsp|thinsp);/i.test(decoded); pass += 1) {
    decoded = decoded.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|ensp|emsp|thinsp);/gi, (entity, token: string) => {
      if (token.startsWith("#")) {
        const codePoint = token[1]?.toLowerCase() === "x"
          ? Number.parseInt(token.slice(2), 16)
          : Number.parseInt(token.slice(1), 10);
        try { return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity; } catch { return entity; }
      }
      return namedEntities[token.toLowerCase()] ?? entity;
    });
  }
  return decoded
    .replace(/[\u00a0\u2002\u2003\u2009]+/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function normalizeMaterial(item: ShenlunMaterial): ShenlunMaterial {
  return {
    ...item,
    title: decodeDisplayText(item.title),
    summary: decodeDisplayText(item.summary),
    viewpoint: decodeDisplayText(item.viewpoint),
    evidence: decodeDisplayText(item.evidence),
    usage: decodeDisplayText(item.usage),
    fullText: decodeDisplayText(item.fullText),
    whyImportant: decodeDisplayText(item.whyImportant),
    thesis: decodeDisplayText(item.thesis),
    tags: safeTags(item).map(decodeDisplayText),
    structure: item.structure?.map((part) => ({ title: decodeDisplayText(part.title), detail: decodeDisplayText(part.detail) })),
    dimensions: item.dimensions?.map((part) => ({ name: decodeDisplayText(part.name), analysis: decodeDisplayText(part.analysis) })),
    sentences: item.sentences?.map(decodeDisplayText),
    examples: item.examples?.map((example) => ({ scenario: decodeDisplayText(example.scenario), expression: decodeDisplayText(example.expression) })),
    questions: item.questions?.map(decodeDisplayText),
  };
}

export function ShenlunClient({ apiUrl, initialData = null }: { apiUrl: string; initialData?: ShenlunInitialData | null }) {
  const initialItems = Array.isArray(initialData?.items) ? initialData.items.map(normalizeMaterial) : [];
  const [items, setItems] = useState<ShenlunMaterial[]>(initialItems);
  const [total, setTotal] = useState(initialData?.total ?? initialItems.length);
  const [updatedAt, setUpdatedAt] = useState<string | null>(initialData?.updatedAt ?? null);
  const [checkedAt, setCheckedAt] = useState<string | null>(initialData?.checkedAt ?? null);
  const [lastRun, setLastRun] = useState<SyncRunSummary | null>(initialData?.lastRun ?? null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(initialData ? "ready" : "loading");
  const [source, setSource] = useState<(typeof sources)[number]>("全部");
  const [topic, setTopic] = useState<(typeof topics)[number]>("全部");
  const [importance, setImportance] = useState<(typeof importanceLevels)[number]>("全部");
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [selected, setSelected] = useState<ShenlunMaterial | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("精读分析");
  const [detailState, setDetailState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [copied, setCopied] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const detailCache = useRef(new Map<number, ShenlunMaterial>());
  const detailRequestId = useRef(0);
  const hasInitialData = useRef(Boolean(initialData));

  useEffect(() => {
    const value = window.localStorage.getItem("liyi-shenlun-bookmarks");
    const frame = window.requestAnimationFrame(() => {
      if (value) {
        try { setBookmarks(JSON.parse(value)); } catch { setBookmarks([]); }
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) throw new Error("素材接口不可用");
          return response.json() as Promise<ShenlunInitialData>;
        })
        .then((payload) => {
          if (!active) return;
          setItems(Array.isArray(payload.items) ? payload.items.map(normalizeMaterial) : []);
          setTotal(Number.isInteger(payload.total) ? payload.total as number : payload.items?.length ?? 0);
          setUpdatedAt(payload.updatedAt ?? null);
          setCheckedAt(payload.checkedAt ?? null);
          setLastRun(payload.lastRun ?? null);
          setLoadState("ready");
        })
        .catch(() => {
          if (active && !hasInitialData.current) setLoadState("error");
        });
    }, hasInitialData.current ? 60_000 : 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [apiUrl]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        detailRequestId.current += 1;
        setSelected(null);
        window.requestAnimationFrame(() => openerRef.current?.focus());
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        detailRequestId.current += 1;
        setSelected(null);
        window.requestAnimationFrame(() => searchRef.current?.focus());
      }
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
      const matchesBookmark = !bookmarkedOnly || bookmarks.includes(item.id);
      const text = [
        item.title,
        item.summary,
        item.viewpoint,
        item.evidence,
        item.topic,
        item.whyImportant,
        item.thesis,
        ...safeTags(item),
      ].filter(Boolean).join(" ").toLowerCase();
      return matchesSource && matchesTopic && matchesImportance && matchesBookmark && (!keyword || text.includes(keyword));
    });
  }, [items, query, source, topic, importance, bookmarkedOnly, bookmarks]);

  const focusCount = items.filter((item) => materialImportance(item) === "重点精读").length;

  const openMaterial = (item: ShenlunMaterial, tab: DetailTab = "精读分析") => {
    const requestId = ++detailRequestId.current;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(item);
    setDetailTab(tab);
    const cached = detailCache.current.get(item.id);
    if (cached) {
      setSelected(cached);
      setDetailState("ready");
      return;
    }
    setDetailState("loading");
    const endpoint = new URL(apiUrl, window.location.origin);
    endpoint.pathname = endpoint.pathname.replace(/\/?$/, `/${item.id}`);
    endpoint.search = "";
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error("详情加载失败");
        return response.json() as Promise<{ item?: ShenlunMaterial }>;
      })
      .then((payload) => {
        if (!payload.item) throw new Error("详情不存在");
        const normalized = normalizeMaterial(payload.item);
        detailCache.current.set(item.id, normalized);
        if (requestId !== detailRequestId.current) return;
        setSelected((current) => current?.id === item.id ? normalized : current);
        setDetailState("ready");
      })
      .catch(() => {
        if (requestId === detailRequestId.current) setDetailState("error");
      });
  };

  const closeMaterial = () => {
    detailRequestId.current += 1;
    setSelected(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
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
    setBookmarkedOnly(false);
  };

  const hasActiveFilters = Boolean(query) || source !== "全部" || topic !== "全部" || importance !== "全部" || bookmarkedOnly;

  const contentUpdateLabel = updatedAt
    ? new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Shanghai" }).format(new Date(updatedAt))
    : "暂无记录";
  const checkLabel = checkedAt
    ? new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Shanghai" }).format(new Date(checkedAt))
    : "等待检查";
  const runStatusLabel = lastRun
    ? lastRun.failureCount > 0
      ? `本轮检查 ${lastRun.discovered} 篇 · ${lastRun.failureCount} 项故障`
      : lastRun.warningCount
        ? `本轮检查 ${lastRun.discovered} 篇 · ${lastRun.warningCount} 项待补采集`
      : lastRun.processed > 0
        ? `本轮检查 ${lastRun.discovered} 篇 · 处理 ${lastRun.processed} 篇`
        : `本轮检查 ${lastRun.discovered} 篇 · 暂无新内容`
    : "每 6 小时自动检查权威来源";
  const statusTone = loadState === "loading" ? "loading" : lastRun?.failureCount ? "failed" : lastRun?.warningCount ? "degraded" : "healthy";
  const statusLabel = statusTone === "loading" ? "正在核对" : statusTone === "failed" ? "更新异常" : statusTone === "degraded" ? `${lastRun?.warningCount ?? 0} 项待补采集` : "更新正常";
  const statusExplanation = statusTone === "degraded"
    ? "有材料尚未达到完整入库标准；现有内容可以阅读，系统会在后续任务中继续补采。"
    : statusTone === "failed"
      ? "最近一轮更新遇到故障，已保留此前可用内容。"
      : "最近一轮权威来源检查已完成。";

  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#10233f] [color-scheme:light]">
      <header className="sticky top-0 z-40 border-b-4 border-[#e33b36] bg-[#10233f] text-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-8 px-5 md:px-8">
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
            <span title={statusExplanation} aria-label={`${statusLabel}：${statusExplanation}`} className="flex items-center gap-2 text-white/65"><i className={"h-2 w-2 rounded-full " + (statusTone === "failed" ? "bg-red-400" : statusTone === "degraded" ? "bg-amber-400" : statusTone === "loading" ? "bg-white/40" : "bg-emerald-400")} />{statusLabel}</span>
          </nav>
          <Link href="/" className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs text-white/75 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" /> 返回个人主页
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-6 px-5 pb-5 pt-6 md:grid-cols-[1fr_auto] md:px-8 md:pt-7">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-[#e33b36]">全文可读 · 重点精读 · 申论转化</p>
          <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] md:text-5xl">
            不止收藏材料，<span className="text-[#e33b36]">更要读懂、会用</span>
          </h1>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-[#687486] md:text-[15px]">
            收录权威文章全文，按申论价值分级；对重点文章拆解主旨、结构与分析维度，再转化为可直接调用的论据、表达和题目思路。
          </p>
        </div>
        <div className="flex items-end gap-8 border-l border-[#ddd5c7] pl-8">
          <div><strong className="block font-serif text-4xl">{String(total || items.length).padStart(2, "0")}</strong><span className="text-xs text-[#687486]">当前收录</span></div>
          <div><strong className="block font-serif text-4xl text-[#e33b36]">{focusCount}</strong><span className="text-xs text-[#687486]">重点精读</span></div>
          <div className="hidden lg:block"><strong className="block font-serif text-lg">{checkLabel}</strong><span className="text-xs text-[#687486]">最近检查</span></div>
        </div>
      </section>

      <section className="mx-auto mb-6 max-w-[1376px] border-y border-[#ddd5c7] bg-[#fffdf8] p-3 shadow-[0_12px_34px_rgba(16,35,63,0.06)] md:border">
        <div className="flex gap-2">
        <label className="flex h-11 min-w-0 flex-1 items-center gap-3 border border-[#cfc5b5] bg-white px-4">
          <Search className="h-5 w-5" />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索全文、政策、论点、案例或关键词，例如：基层治理"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
          />
          {query && <button onClick={() => setQuery("")} aria-label="清除搜索" className="cursor-pointer"><X className="h-4 w-4" /></button>}
          <kbd className="hidden border border-[#ddd5c7] bg-[#f6f1e7] px-2 py-1 text-[10px] text-[#687486] sm:block">⌘ K</kbd>
        </label>
        <button
          onClick={() => setBookmarkedOnly((value) => !value)}
          className={"flex shrink-0 cursor-pointer items-center gap-2 border px-4 text-xs font-semibold transition active:scale-[0.97] " + (bookmarkedOnly ? "border-[#10233f] bg-[#10233f] text-white" : "border-[#cfc5b5] bg-white/90")}
        >
          <Bookmark className="h-4 w-4" fill={bookmarkedOnly ? "currentColor" : "none"} />
          <span className="hidden sm:inline">我的摘录</span><span>{bookmarks.length}</span>
        </button>
        </div>
        <FilterRow label="精读" values={importanceLevels} active={importance} onChange={(value) => setImportance(value as (typeof importanceLevels)[number])} dark />
        <FilterRow label="来源" values={sources} active={source} onChange={(value) => setSource(value as (typeof sources)[number])} />
        <FilterRow label="主题" values={topics} active={topic} onChange={(value) => setTopic(value as (typeof topics)[number])} />
        {hasActiveFilters && <div className="mt-2 flex justify-end"><button onClick={resetFilters} className="cursor-pointer text-xs text-[#687486] underline decoration-[#cfc5b5] underline-offset-4 hover:text-[#10233f]">清除全部条件</button></div>}
      </section>

      <div className="mx-auto grid max-w-[1376px] gap-6 pb-20 lg:grid-cols-[minmax(0,1fr)_310px]">
        <main id="materials" className="min-w-0">
          <div className="mb-4 flex items-end justify-between px-5 md:px-0">
            <div className="flex items-baseline gap-3"><span className="text-[10px] font-bold tracking-[0.18em] text-[#e33b36]">ANNOTATION DESK</span><h2 className="font-serif text-3xl">材料标注台</h2></div>
            <span className="text-xs text-[#687486]">共 {filtered.length} 条 · 价值分级阅读</span>
          </div>
          <div className="grid gap-3">
            {loadState === "loading" && <StatusPanel icon={<Sparkles className="h-8 w-8 animate-pulse text-[#e33b36]" />} title="正在同步最新素材" note="连接权威来源、文章全文与 AI 精读结果…" />}
            {loadState === "error" && <StatusPanel icon={<BookOpen className="h-8 w-8 text-[#e33b36]" />} title="同步暂时中断" note="已入库的全文与标注不会丢失。" action="重新连接" onAction={() => window.location.reload()} />}
            {filtered.map((item, index) => {
              const level = materialImportance(item);
              return (
                <article key={item.id} className={"border-y bg-[#fffdf8] md:border " + (level === "重点精读" ? "border-[#e33b36]/55 shadow-[inset_4px_0_0_#e33b36]" : "border-[#ddd5c7]") }>
                  <div className="flex min-h-12 flex-wrap items-center gap-3 border-b border-[#ddd5c7] px-5 py-2 text-xs text-[#687486] md:px-7">
                    <ImportanceBadge value={level} />
                    <strong className="text-[#10233f]">{item.source}</strong>
                    <span>{item.date}</span>
                    <span>{item.kind}</span>
                    <span className={"flex items-center gap-1 " + (item.originMode === "ai" ? "text-[#e33b36]" : "text-[#8a7565]")}>{item.originMode === "ai" ? <Sparkles className="h-3 w-3" /> : <FileText className="h-3 w-3" />}{item.originMode === "ai" ? "AI 精读" : item.originMode === "editorial" ? "人工校核" : "自动提取"}</span>
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

        <aside className="grid content-start gap-3 px-5 lg:sticky lg:top-20 lg:self-start lg:px-0">
          <section className="bg-[#10233f] p-5 text-white">
            <p className="text-xs tracking-[0.14em] text-white/55">今日精读台</p>
            <div className="mt-4 grid grid-cols-2">
              <div><strong className="block font-serif text-3xl text-[#ff665f]">{String(focusCount).padStart(2, "0")}</strong><span className="text-[11px] text-white/55">重点精读</span></div>
              <div className="border-l border-white/20 pl-5"><strong className="block font-serif text-3xl">{bookmarks.length}</strong><span className="text-[11px] text-white/55">我的摘录</span></div>
            </div>
            <button onClick={() => setImportance("重点精读")} className="mt-4 flex w-full cursor-pointer items-center justify-between border border-white/20 px-4 py-2.5 text-xs transition active:scale-[0.98] hover:bg-white/10">
              只看重点文章 <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-4 border-t border-white/15 pt-3 text-[10px] leading-5 text-white/55">
              <p className="flex items-center gap-2"><span className={"h-2 w-2 rounded-full " + (statusTone === "failed" ? "bg-red-400" : statusTone === "degraded" ? "bg-amber-400" : "bg-emerald-400")} />最近检查 {checkLabel}</p>
              <p>{runStatusLabel}</p>
              {statusTone === "degraded" ? <p className="mt-1 text-amber-200/80">现有内容可读，系统会继续补采未完整项目。</p> : null}
              <p>最近内容变更 {contentUpdateLabel}</p>
            </div>
          </section>
          <section id="methods" className="border border-[#ddd5c7] bg-[#fffdf8] p-5">
            <h3 className="font-serif text-xl">一篇文章，三遍读法</h3>
            <ol className="mt-4 grid gap-4">
              {[["01", "通读全文", "判断主题、语境与政策方向"], ["02", "拆解论证", "提取主旨、结构与分析维度"], ["03", "完成转化", "积累表达、案例与作答思路"]].map(([step, title, note]) => (
                <li key={step} className="grid grid-cols-[38px_1fr] gap-3">
                  <b className="font-serif text-[#e33b36]">{step}</b>
                  <span className="text-xs">{title}<small className="mt-1 block text-[#687486]">{note}</small></span>
                </li>
              ))}
            </ol>
          </section>
          <section className="border border-[#ddd5c7] bg-[#fffdf8] p-5">
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

      <AnimatePresence>
        {selected && (
          <MaterialWorkbench
            item={selected}
            tab={detailTab}
            onTabChange={setDetailTab}
            onClose={closeMaterial}
            bookmarked={bookmarks.includes(selected.id)}
            onBookmark={() => toggleBookmark(selected.id)}
            copied={copied}
            onCopy={copyText}
            detailState={detailState}
          />
        )}
      </AnimatePresence>
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
  detailState,
}: {
  item: ShenlunMaterial;
  tab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
  onClose: () => void;
  bookmarked: boolean;
  onBookmark: () => void;
  copied: string | null;
  onCopy: (text: string, key: string) => void;
  detailState: "idle" | "loading" | "ready" | "error";
}) {
  const level = materialImportance(item);
  const reducedMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const changeTab = useCallback((nextTab: DetailTab) => {
    onTabChange(nextTab);
    contentRef.current?.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    setScrollProgress(0);
  }, [onTabChange, reducedMotion]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < detailTabs.length) changeTab(detailTabs[index]);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changeTab]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#fffdf8]"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 18, scale: 0.995 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 18, scale: 0.995 }}
      transition={{ type: "spring", bounce: 0, duration: 0.36 }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <aside role="dialog" aria-modal="true" aria-label={`${item.title}材料标注台`} className="flex h-full w-full flex-col bg-[#fffdf8]">
        <div className="shrink-0 border-b border-[#ddd5c7] bg-[#fffdf8]/92 px-4 backdrop-blur-xl md:px-7 xl:px-10">
          <div className="mx-auto flex min-h-16 w-full max-w-[1720px] items-center gap-3 py-2">
            <button autoFocus onClick={onClose} className="flex h-10 shrink-0 cursor-pointer items-center gap-2 border border-[#ddd5c7] bg-white px-3 text-xs font-semibold transition active:scale-[0.96] hover:border-[#10233f]" aria-label="返回素材库">
              <ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">返回</span>
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#687486]">
                <ImportanceBadge value={level} /><strong className="text-[#10233f]">{item.source}</strong><span>{item.date}</span>
                {typeof item.wordCount === "number" && <span>{item.wordCount.toLocaleString("zh-CN")} 字</span>}
                {typeof item.valueScore === "number" && <span>价值 {item.valueScore}/100</span>}
              </div>
              <h2 className="mt-1 truncate font-serif text-lg font-semibold leading-tight md:text-xl">{item.title}</h2>
            </div>
            <button onClick={onBookmark} className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center border border-[#ddd5c7] bg-white transition active:scale-[0.94] hover:border-[#10233f]" aria-label={bookmarked ? "取消摘录" : "加入摘录"}>
              <Bookmark className="h-4 w-4" fill={bookmarked ? "currentColor" : "none"} />
            </button>
            <a href={item.url} target="_blank" rel="noreferrer" className="flex h-10 shrink-0 items-center gap-2 bg-[#10233f] px-3 text-xs text-white transition active:scale-[0.97]">
              <span className="hidden sm:inline">来源页面</span><ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div role="tablist" aria-label="材料阅读视图" className="mx-auto flex w-full max-w-[1720px] items-end gap-4 overflow-x-auto">
            {detailTabs.map((value) => (
              <button key={value} role="tab" aria-selected={tab === value} aria-controls="shenlun-detail-panel" tabIndex={tab === value ? 0 : -1} onClick={() => changeTab(value)} onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                const direction = event.key === "ArrowRight" ? 1 : -1;
                const next = (detailTabs.indexOf(value) + direction + detailTabs.length) % detailTabs.length;
                changeTab(detailTabs[next]);
              }} className={"flex min-w-[112px] cursor-pointer items-center justify-center gap-2 border-b-3 px-3 py-3 text-xs font-semibold transition-colors active:bg-[#f0ebe1] " + (tab === value ? "border-[#e33b36] text-[#10233f]" : "border-transparent text-[#7a8493] hover:text-[#10233f]") }>
                {value === "精读分析" ? <Layers3 className="h-4 w-4" /> : value === "申论应用" ? <GraduationCap className="h-4 w-4" /> : <FileText className="h-4 w-4" />}{value}<kbd className="hidden text-[9px] font-normal text-[#9ca3af] lg:inline">⌥{detailTabs.indexOf(value) + 1}</kbd>
              </button>
            ))}
            <div className="ml-auto hidden max-w-[440px] items-center gap-1.5 overflow-hidden pb-3 xl:flex">
              {safeTags(item).slice(0, 3).map((tag) => <span key={tag} className="shrink-0 bg-[#f0ebe1] px-2.5 py-1 text-[10px]">{tag}</span>)}
            </div>
          </div>
          <div className="h-0.5 bg-transparent"><motion.div className="h-full origin-left bg-[#e33b36]" animate={{ scaleX: scrollProgress }} transition={{ type: "spring", bounce: 0, duration: 0.25 }} /></div>
        </div>

        <div
          ref={contentRef}
          onScroll={(event) => {
            const element = event.currentTarget;
            const maximum = element.scrollHeight - element.clientHeight;
            setScrollProgress(maximum > 0 ? element.scrollTop / maximum : 0);
          }}
          id="shenlun-detail-panel"
          role="tabpanel"
          className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-8 xl:px-12 xl:py-6"
        >
          <div className="mx-auto w-full max-w-[1720px]">
            <AnimatePresence initial={false}>
              {detailState === "loading" ? (
                <motion.div key="detail-loading" exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0.08 : 0.16 }}>
                  <DetailLoading item={item} />
                </motion.div>
              ) : detailState === "error" ? (
                <motion.div key="detail-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  <DetailError item={item} />
                </motion.div>
              ) : (
                <motion.div
                  key={`detail-${tab}`}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={{ type: "spring", bounce: 0, duration: reducedMotion ? 0.12 : 0.28 }}
                >
                  {tab === "精读分析" && <CloseReading item={item} />}
                  {tab === "申论应用" && <ShenlunApplication item={item} copied={copied} onCopy={onCopy} />}
                  {tab === "原文全文" && <FullArticle item={item} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>
    </motion.div>
  );
}

function CloseReading({ item }: { item: ShenlunMaterial }) {
  const structure = Array.isArray(item.structure) ? item.structure : [];
  const dimensions = Array.isArray(item.dimensions) ? item.dimensions : [];
  return (
    <div>
      <div className="grid gap-5 xl:grid-cols-2">
      <div className="border-l-4 border-[#e33b36] bg-[#f6f1e7] px-5 py-5 md:px-7 md:py-6">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#e33b36]"><Star className="h-4 w-4" />为什么值得读</div>
        <p className="mt-3 font-serif text-lg leading-8">{item.whyImportant || item.summary || "这篇材料的精读价值正在分析中。"}</p>
      </div>
      <div className="border border-[#ddd5c7] bg-white px-5 py-5 md:px-7 md:py-6">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#e33b36]"><Target className="h-4 w-4" />核心主旨</div>
        <p className="mt-3 font-serif text-lg leading-8">{item.thesis || item.viewpoint || "核心主旨正在提炼中。"}</p>
      </div>
      </div>
      <AnalysisSection icon={<ListTree className="h-4 w-4" />} title="论证结构">
        {structure.length ? (
          <ol className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {structure.map((part, index) => <li key={`${part.title}-${index}`} className="grid min-w-0 grid-cols-[42px_1fr] gap-4 border border-[#ddd5c7] bg-white p-5"><span className="grid h-10 w-10 place-items-center bg-[#10233f] font-serif text-sm text-white">{index + 1}</span><div className="min-w-0"><h4 className="font-semibold">{part.title}</h4><p className="mt-2 text-sm leading-7 text-[#687486]">{part.detail}</p></div></li>)}
          </ol>
        ) : <EmptyAnalysis text="文章结构正在拆解，现阶段可先结合摘要与全文阅读。" />}
      </AnalysisSection>
      <AnalysisSection icon={<Layers3 className="h-4 w-4" />} title="申论分析维度">
        {dimensions.length ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px border border-[#ddd5c7] bg-[#ddd5c7]">
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
    <div>
      <div className="grid gap-4 xl:grid-cols-2">
        <ApplicationCard title="可用论据" icon={<ClipboardCheck className="h-4 w-4" />} text={item.evidence || "论据正在整理中。"} copyKey="evidence" copied={copied} onCopy={onCopy} />
        <ApplicationCard title="使用方法" icon={<Target className="h-4 w-4" />} text={item.usage || "申论用法正在整理中。"} copyKey="usage" copied={copied} onCopy={onCopy} />
      </div>
      <div className="grid gap-x-8 2xl:grid-cols-[1.05fr_0.95fr]">
        <AnalysisSection icon={<Quote className="h-4 w-4" />} title="可积累表达">
          {sentences.length ? <div className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-1">{sentences.map((sentence, index) => <CopyRow key={index} text={sentence} copyKey={`sentence-${index}`} copied={copied} onCopy={onCopy} />)}</div> : <EmptyAnalysis text="高质量表达正在从全文中标注。" />}
        </AnalysisSection>
        <AnalysisSection icon={<GraduationCap className="h-4 w-4" />} title="写作迁移示例">
          {examples.length ? <div className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-1">{examples.map((example, index) => <div key={`${example.scenario}-${index}`} className="border border-[#ddd5c7] bg-white p-5"><span className="text-xs font-bold text-[#e33b36]">{example.scenario}</span><p className="mt-3 font-serif text-base leading-8">{example.expression}</p></div>)}</div> : <EmptyAnalysis text="正在把材料转化为不同题型和主题下的可用表达。" />}
        </AnalysisSection>
      </div>
      <AnalysisSection icon={<BookOpen className="h-4 w-4" />} title="关联申论问题">
        {questions.length ? <ul className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">{questions.map((question, index) => <li key={index} className="flex gap-3 border border-[#ddd5c7] bg-white p-4 text-sm leading-7"><span className="font-serif text-[#e33b36]">Q{index + 1}</span><span>{question}</span></li>)}</ul> : <EmptyAnalysis text="关联题目正在生成，可先依据材料主题自行设问。" />}
      </AnalysisSection>
    </div>
  );
}

function FullArticle({ item }: { item: ShenlunMaterial }) {
  const paragraphs = textParagraphs(item.fullText);
  const structure = Array.isArray(item.structure) ? item.structure : [];
  return (
    <div>
      {paragraphs.length ? (
        <>
          <div className="mb-7 border-y border-[#ddd5c7] py-4 text-sm text-[#687486]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-2"><FileText className="h-4 w-4" />全文 {item.wordCount ? `${item.wordCount.toLocaleString("zh-CN")} 字` : `${item.fullText?.length.toLocaleString("zh-CN")} 字符`}</span>
              <span>来源：{item.source}</span><span>发布日期：{item.date}</span>
            </div>
          </div>
          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,780px)_minmax(260px,1fr)] xl:justify-center 2xl:grid-cols-[240px_minmax(0,800px)_340px] 2xl:justify-between">
          <nav aria-label="文章结构目录" className="order-2 bg-[#f0ebe1] p-5 xl:order-3 xl:col-span-2 2xl:order-1 2xl:col-span-1 2xl:sticky 2xl:top-0">
            <div className="flex items-center gap-2 text-xs font-bold"><ListTree className="h-4 w-4 text-[#e33b36]" />精读目录</div>
            {structure.length > 0 ? <ol className="mt-4 grid gap-3 text-sm text-[#526076]">{structure.map((part, index) => <li key={`${part.title}-${index}`} className="border-t border-[#d8d0c3] pt-3 first:border-0 first:pt-0"><span className="mr-2 font-serif text-[#e33b36]">{String(index + 1).padStart(2, "0")}</span>{part.title}</li>)}</ol> : <p className="mt-4 text-sm leading-7 text-[#687486]">结构目录正在生成，可先通读正文。</p>}
          </nav>
          <article className="order-1 min-w-0 font-serif text-[17px] leading-[2.05] text-[#263a55] md:text-[18px] xl:order-1 2xl:order-2">
            {paragraphs.map((paragraph, index) => <p key={index} className={index === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.9] first-letter:text-[#e33b36]" : "mt-6"}>{paragraph}</p>)}
          </article>
          <aside className="order-3 border-t-4 border-[#e33b36] bg-[#10233f] p-6 text-white xl:order-2 xl:sticky xl:top-0 2xl:order-3">
            <div className="text-[10px] font-bold tracking-[0.16em] text-[#ff7771]">申论速记</div>
            <QuickNote label="核心主旨" text={item.thesis || item.viewpoint || "正在提炼"} />
            <QuickNote label="可用论据" text={item.evidence || "正在整理"} />
            <QuickNote label="使用方向" text={item.usage || "正在整理"} />
          </aside>
          </div>
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

function QuickNote({ label, text }: { label: string; text: string }) {
  return <div className="mt-5 border-t border-white/15 pt-4"><h4 className="text-xs font-semibold text-white/65">{label}</h4><p className="mt-2 font-serif text-sm leading-7 text-white/90">{text}</p></div>;
}

function DetailLoading({ item }: { item: ShenlunMaterial }) {
  const reducedMotion = useReducedMotion();
  const pulse = (delay: number) => reducedMotion ? {} : {
    animate: { opacity: [0.34, 0.72, 0.34] },
    transition: { duration: 1.45, delay, repeat: Infinity, ease: "easeInOut" as const },
  };
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="min-h-[56vh]">
      <div className="border border-[#ddd5c7] bg-white">
        <div className="flex items-center gap-4 border-b border-[#e7e0d5] px-5 py-4 md:px-7">
          <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#10233f] text-white">
            <LoaderCircle className={`h-4 w-4 ${reducedMotion ? "" : "animate-spin"}`} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg font-semibold text-[#10233f]">正在装订全文与精读标注</h3>
              <span className="text-[10px] font-semibold tracking-[0.12em] text-[#e33b36]">READING WORKSPACE</span>
            </div>
            <p className="mt-1 truncate text-xs text-[#687486]">{item.title} · 通常只需片刻</p>
          </div>
        </div>
        <div className="h-0.5 overflow-hidden bg-[#eee8de]" aria-hidden="true">
          <motion.div
            className="h-full w-1/3 bg-[#e33b36]"
            initial={{ x: "-100%" }}
            animate={reducedMotion ? { x: "0%" } : { x: ["-100%", "300%"] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div aria-hidden="true" className="mt-5 grid gap-5 xl:grid-cols-2">
        {[0, 0.12].map((delay, cardIndex) => (
          <div key={delay} className={`min-h-44 border p-6 ${cardIndex === 0 ? "border-l-4 border-[#e33b36] bg-[#f6f1e7]" : "border-[#ddd5c7] bg-white"}`}>
            <motion.div {...pulse(delay)} className="h-2.5 w-24 bg-[#c8c0b4]" />
            <motion.div {...pulse(delay + 0.08)} className="mt-7 h-4 w-[92%] bg-[#d9d2c7]" />
            <motion.div {...pulse(delay + 0.16)} className="mt-3 h-4 w-[78%] bg-[#e1dbd1]" />
            <motion.div {...pulse(delay + 0.24)} className="mt-3 h-4 w-[64%] bg-[#e7e1d8]" />
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="mt-8 border-t border-[#ddd5c7] pt-7">
        <motion.div {...pulse(0.18)} className="h-2.5 w-20 bg-[#d2cabe]" />
        <div className="mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {[0, 0.1, 0.2].map((delay, index) => (
            <motion.div key={delay} {...pulse(delay)} className="grid min-h-28 grid-cols-[38px_1fr] gap-4 border border-[#ddd5c7] bg-white p-5">
              <span className="grid h-9 w-9 place-items-center bg-[#e7e0d5] font-serif text-xs text-[#8a8276]">{index + 1}</span>
              <span className="space-y-3 pt-1"><i className="block h-3 w-2/3 bg-[#d5cec3]" /><i className="block h-3 w-full bg-[#e4ded5]" /><i className="block h-3 w-4/5 bg-[#ebe6de]" /></span>
            </motion.div>
          ))}
        </div>
      </div>
      <span className="sr-only">正在加载完整文章内容，请稍候。</span>
    </div>
  );
}

function DetailError({ item }: { item: ShenlunMaterial }) {
  return <div role="alert" className="grid min-h-[50vh] place-items-center"><div className="max-w-md text-center"><AlertTriangle className="mx-auto h-9 w-9 text-amber-600" /><h3 className="mt-4 font-serif text-2xl">精读详情暂时未能加载</h3><p className="mt-3 text-sm leading-7 text-[#687486]">摘要与来源仍然可用，可以先核对权威原文，稍后重新打开本篇材料。</p><a href={item.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#10233f] px-5 py-3 text-sm text-white">查看权威原文 <ExternalLink className="h-4 w-4" /></a></div></div>;
}

function FilterRow({ label, values, active, onChange, dark = false }: { label: string; values: readonly string[]; active: string; onChange: (value: string) => void; dark?: boolean }) {
  return (
    <div className="mt-2 grid gap-2 md:grid-cols-[50px_1fr] md:items-center">
      <span className="text-xs text-[#867f74]">{label}</span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {values.map((value) => <button key={value} onClick={() => onChange(value)} className={"shrink-0 cursor-pointer border px-3.5 py-1.5 text-xs transition active:scale-[0.97] " + (active === value ? (dark ? "border-[#10233f] bg-[#10233f] text-white" : "border-[#e33b36] bg-[#e33b36] text-white") : "border-[#ddd5c7] bg-white text-[#536075] hover:border-[#10233f]")}>{value}</button>)}
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

function StatusPanel({ icon, title, note, action, onAction }: { icon: ReactNode; title: string; note: string; action?: string; onAction?: () => void }) {
  return <div className="border border-[#ddd5c7] bg-[#fffdf8] px-6 py-20 text-center"><div className="mx-auto grid place-items-center">{icon}</div><h3 className="mt-4 font-serif text-2xl">{title}</h3><p className="mt-2 text-sm text-[#687486]">{note}</p>{action && onAction ? <button onClick={onAction} className="mt-5 cursor-pointer bg-[#10233f] px-5 py-2.5 text-xs text-white">{action}</button> : null}</div>;
}
