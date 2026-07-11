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
};
