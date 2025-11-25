"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useResponsiveLayout, type LayoutConfig } from "@/lib/responsive-layout"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils"

// 布局上下文
interface LayoutContextType {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  layoutConfig: LayoutConfig
  updateLayoutConfig: (config: Partial<LayoutConfig>) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function useLayoutContext() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider")
  }
  return context
}

// 响应式布局提供者
interface ResponsiveLayoutProviderProps {
  children: React.ReactNode
  initialConfig?: Partial<LayoutConfig>
}

export function ResponsiveLayoutProvider({ children, initialConfig }: ResponsiveLayoutProviderProps) {
  const { layoutConfig: defaultConfig, isMobile } = useResponsiveLayout(initialConfig)
  const [layoutConfig, setLayoutConfig] = useState(defaultConfig)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // 移动端自动关闭侧边栏
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  const updateLayoutConfig = (config: Partial<LayoutConfig>) => {
    setLayoutConfig((prev) => ({ ...prev, ...config }))
  }

  const value: LayoutContextType = {
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarOpen,
    setSidebarOpen,
    layoutConfig,
    updateLayoutConfig,
  }

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

// 主布局组件
interface ResponsiveLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  showHeader?: boolean
  className?: string
}

export function ResponsiveLayout({
  children,
  showSidebar = true,
  showHeader = true,
  className,
}: ResponsiveLayoutProps) {
  const { sidebarCollapsed, sidebarOpen, setSidebarOpen, layoutConfig } = useLayoutContext()
  const { isMobile, isTablet, getContentStyles } = useResponsiveLayout()

  // 计算主内容区域的边距
  const getMainContentMargin = () => {
    if (!showSidebar) return "0"
    if (isMobile) return "0"

    return sidebarCollapsed ? `${layoutConfig.sidebar.width.collapsed}px` : `${layoutConfig.sidebar.width.expanded}px`
  }

  return (
    <div className={cn("min-h-screen bg-gray-50", className)}>
      {/* 侧边栏 */}
      {showSidebar && (
        <>
          <Sidebar />

          {/* 移动端遮罩 */}
          {isMobile && sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
        </>
      )}

      {/* 主内容区域 */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          marginLeft: getMainContentMargin(),
        }}
      >
        {/* 头部 */}
        {showHeader && (
          <Header
            height={layoutConfig.header.height}
            sticky={layoutConfig.header.sticky}
            showOnMobile={layoutConfig.header.showOnMobile}
          />
        )}

        {/* 页面内容 */}
        <main
          className="min-h-screen"
          style={{
            paddingTop: showHeader ? `${layoutConfig.header.height}px` : "0",
            ...getContentStyles(),
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
