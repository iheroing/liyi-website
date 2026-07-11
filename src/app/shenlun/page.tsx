import type { Metadata } from "next";
import { ShenlunClient } from "./shenlun-client";

export const metadata: Metadata = {
  title: "申论素材库｜李弋的数字花园",
  description: "持续收集人民日报、中国政府网、新华社与求是材料，由 AI 提炼申论可用观点、数据和案例。",
};

export default function ShenlunPage() {
  return (
    <ShenlunClient
      apiUrl="https://shenlun-materials-2026.infinity88-2025.chatgpt.site/api/materials?limit=100"
    />
  );
}
