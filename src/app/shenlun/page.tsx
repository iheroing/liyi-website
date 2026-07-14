import type { Metadata } from "next";
import { ShenlunClient } from "./shenlun-client";

export const metadata: Metadata = {
  title: "申论素材库｜李弋的数字花园",
  description: "持续收录权威文章全文，筛选重点精读材料，并从主旨、结构、论据、表达与题目等维度完成申论转化。",
};

export default function ShenlunPage() {
  return (
    <ShenlunClient
      apiUrl="https://shenlun-materials-2026.infinity88-2025.chatgpt.site/api/materials?limit=200&view=summary"
    />
  );
}
