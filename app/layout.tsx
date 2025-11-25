import type React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/layout/adaptive-sidebar"
import "./globals.css"

export const metadata: Metadata = {
  title: "YYC³ - 言语云客户关怀中心",
  description: "企业级客户关系管理系统",
  generator: "v0.dev",
  openGraph: {
    title: "YYC³ - 言语云客户关怀中心",
    description: "企业级客户关系管理系统",
    images: ["/images/yanyu-cloud-3d-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "YYC³ - 言语云客户关怀中心",
    images: ["/images/yanyu-cloud-3d-logo.png"],
    creator: "言语云",
  },
  icons: {
    icon: "/favicon.ico",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="apple-touch-icon" href="/images/yanyu-cloud-3d-logo.png" />
      </head>
      <body className="antialiased bg-gray-50 dark:bg-gray-900">
        {/* ✅ 全局侧边栏状态管理 */}
        <SidebarProvider defaultOpen={true} defaultCollapsed={false}>
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}
