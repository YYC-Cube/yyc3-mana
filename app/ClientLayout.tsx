"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { isInitialized } = useAuth()

  // 检测移动端
  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 移动端路由变化时收起侧边栏
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }, [pathname, isMobile])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // 登录页面和未授权页面不显示布局
  if (pathname === "/login" || pathname === "/unauthorized") {
    return <>{children}</>
  }

  // 在挂载前或认证初始化中显示加载状态
  if (!mounted || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
            <div className="absolute inset-0 h-8 w-8 border-2 border-blue-200 rounded-full animate-pulse mx-auto"></div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 font-medium">正在初始化系统...</p>
            <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="h-screen flex overflow-hidden bg-gray-50">
        {/* 侧边栏 */}
        <div
          className={cn(
            "relative transition-all duration-300 ease-in-out flex-shrink-0",
            sidebarCollapsed ? "w-16" : "w-36",
            isMobile && "absolute inset-y-0 left-0 z-50",
          )}
        >
          <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        </div>

        {/* 移动端遮罩 */}
        {isMobile && !sidebarCollapsed && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setSidebarCollapsed(true)} />
        )}

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* 头部 */}
          <Header sidebarCollapsed={sidebarCollapsed} />

          {/* 内容区域 */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
            <div className="w-full max-w-none p-4 lg:p-6">
              <div className="animate-fade-in">{children}</div>
            </div>
          </main>
        </div>

        {/* Toast 通知 */}
        <Toaster />
      </div>
    </ProtectedRoute>
  )
}
