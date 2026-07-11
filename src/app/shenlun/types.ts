export type ShenlunMaterial = {
  id: number;
  title: string;
  source: "人民日报" | "中国政府网" | "新华社" | "求是";
  date: string;
  kind: string;
  topic: string;
  tags: string[];
  summary: string;
  viewpoint: string;
  evidence: string;
  usage: string;
  url: string;
  fetchedAt?: string;
  originMode?: "auto" | "ai" | "editorial";
  fullText?: string;
  wordCount?: number;
  valueScore?: number;
  importance?: "重点精读" | "常规积累" | "快速浏览";
  whyImportant?: string;
  thesis?: string;
  structure?: Array<{
    title: string;
    detail: string;
  }>;
  dimensions?: Array<{
    name: string;
    analysis: string;
  }>;
  sentences?: string[];
  examples?: Array<{
    scenario: string;
    expression: string;
  }>;
  questions?: string[];
};
