"use client"

import type React from "react"
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"

// ✅ 获取用户角色（可替换为真实上下文）
const getUserRole = (): string => {
  return localStorage.getItem("user-role") || "guest"
}

// -------------------- Context --------------------

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebarContext() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarContext must be used within SidebarProvider")
  }
  return context
}

// -------------------- Provider --------------------

interface SidebarProviderProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  // ✅ 记忆上次收缩状态
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed")
    if (stored !== null) {
      setIsCollapsed(stored === "true")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(isCollapsed))
  }, [isCollapsed])

  // ✅ 路由 + 角色感知收缩
  useEffect(() => {
    const collapseRoutes = [
      "/analytics",
      "/reports",
      "/ai-analysis",
      "/ai-prediction",
      "/ai-automation",
    ]
    const shouldCollapseByRoute = collapseRoutes.some((prefix) =>
      pathname.startsWith(prefix),
    )

    const role = getUserRole()
    const shouldCollapseByRole = ["guest", "analyst"].includes(role)

    const finalCollapse = shouldCollapseByRoute || shouldCollapseByRole
    setIsCollapsed(finalCollapse)
  }, [pathname])

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

// -------------------- Adaptive Sidebar --------------------

interface AdaptiveSidebarProps {
  children: React.ReactNode
  className?: string
}

export function AdaptiveSidebar({
  children,
  className,
}: AdaptiveSidebarProps) {
  const { isCollapsed } = useSidebarContext()

  return (
    <motion.aside
      animate={{
        width: isCollapsed
          ? "var(--sidebar-collapsed-width)"
          : "var(--sidebar-width)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "relative h-full bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] border-r border-[hsl(var(--sidebar-border))] overflow-hidden sidebar-transition",
        className,
      )}
      style={{
        width: isCollapsed
          ? "var(--sidebar-collapsed-width)"
          : "var(--sidebar-width)",
        minWidth: isCollapsed
          ? "var(--sidebar-collapsed-width)"
          : "var(--sidebar-width)",
      }}
    >
      <div className="h-full overflow-y-auto">{children}</div>
    </motion.aside>
  )
}
