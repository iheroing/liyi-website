import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

// Latin only — the CJK stack comes from the system, see globals.css. A full CJK
// webfont would cost megabytes on a page that is mostly Chinese anyway.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-latin",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Retained for /shenlun, which sets font-serif across its reading interface.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const DESCRIPTION =
  "在教育现场，把复杂经验整理成可交付、可复用、可持续进化的 AI 工具、知识产品与工作流。";

export const metadata: Metadata = {
  title: "李弋 | 知识系统设计",
  description: DESCRIPTION,
  keywords: ["李弋", "知识系统", "教育科技", "AI 工作流", "培训师工具箱", "浏览器插件"],
  authors: [{ name: "李弋" }],
  creator: "李弋",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "李弋 | 知识系统设计",
    title: "李弋 | 知识系统设计",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "李弋 | 知识系统设计",
    description: DESCRIPTION,
  },
  // The SVG is 1.9 KB and stays sharp at every size, so modern browsers should
  // take it; the PNG is the fallback, and .ico covers old Windows shortcuts.
  // Serving one 1024px raster to all three slots meant every visitor paid for
  // the largest asset just to draw a 16px tab icon.
  icons: {
    icon: [
      { url: "/brand-icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

// Match the browser chrome to the page in both themes.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1c20" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables must live on <html>: the stacks that consume them are
    // declared in :root, and a :root value cannot read a variable defined on a
    // descendant — the declaration would be invalid at computed-value time and
    // silently fall back to the browser default.
    // Keep `lang` on this line: tests/route-contracts.test.mjs matches the
    // literal `<html lang="zh-CN"`.
    <html lang="zh-CN"
      className={`${inter.variable} ${jetbrainsMono.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {/* Site chrome — header, footer, ambient sound — lives in the (site)
            route group, not here. Mounted apps such as /shenlun ship their own
            full-page interface and their own way back home; rendering the
            personal-site nav on top of them stacks two headers. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
