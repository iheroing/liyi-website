import type { Metadata } from "next";
import { ShenlunClient, type ShenlunInitialData } from "./shenlun-client";

const MATERIALS_SOURCE_URL = "https://shenlun-materials-2026.infinity88-2025.chatgpt.site/api/materials?limit=200&view=summary";
const MATERIALS_CLIENT_URL = "/shenlun-api/materials?limit=200&view=summary";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "申论素材库｜李弋的数字花园",
  description: "持续收录权威文章全文，筛选重点精读材料，并从主旨、结构、论据、表达与题目等维度完成申论转化。",
};

async function getInitialMaterials(): Promise<ShenlunInitialData | null> {
  try {
    const response = await fetch(MATERIALS_SOURCE_URL, { next: { revalidate } });
    if (!response.ok) return null;
    return await response.json() as ShenlunInitialData;
  } catch {
    return null;
  }
}

export default async function ShenlunPage() {
  const initialData = await getInitialMaterials();
  return (
    <ShenlunClient
      apiUrl={MATERIALS_CLIENT_URL}
      initialData={initialData}
    />
  );
}
