"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DashboardContent } from "@/components/dashboard-content"

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* 左侧侧边栏 */}
      <AdaptiveSidebar>
        <Sidebar />
      </AdaptiveSidebar>

      {/* 右侧主区域 */}
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
