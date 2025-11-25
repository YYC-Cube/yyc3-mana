"use client"

import { useState, useEffect, useCallback } from "react"

// 响应式断点定义
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export type Breakpoint = keyof typeof breakpoints
export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

// 布局配置接口
export interface LayoutConfig {
  sidebar: {
    width: {
      expanded: number
      collapsed: number
    }
    autoCollapse: boolean
    collapseDelay: number
    hoverExpand: boolean
    mobileBreakpoint: number
  }
  header: {
    height: number
    sticky: boolean
    showOnMobile: boolean
  }
  content: {
    padding: {
      mobile: number
      tablet: number
      desktop: number
    }
    maxWidth: number
    centered: boolean
  }
  grid: {
    columns: {
      mobile: number
      tablet: number
      desktop: number
    }
    gap: {
      mobile: number
      tablet: number
      desktop: number
    }
  }
}

// 默认布局配置
export const defaultLayoutConfig: LayoutConfig = {
  sidebar: {
    width: {
      expanded: 256,
      collapsed: 64,
    },
    autoCollapse: true,
    collapseDelay: 5000,
    hoverExpand: true,
    mobileBreakpoint: 1024,
  },
  header: {
    height: 64,
    sticky: true,
    showOnMobile: true,
  },
  content: {
    padding: {
      mobile: 16,
      tablet: 24,
      desktop: 32,
    },
    maxWidth: 1920,
    centered: true,
  },
  grid: {
    columns: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
    gap: {
      mobile: 16,
      tablet: 20,
      desktop: 24,
    },
  },
}

// 响应式布局Hook
export function useResponsiveLayout(config: Partial<LayoutConfig> = {}) {
  const [screenSize, setScreenSize] = useState<ScreenSize>("lg")
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape")

  const layoutConfig = { ...defaultLayoutConfig, ...config }

  // 获取当前屏幕尺寸
  const getCurrentScreenSize = useCallback((width: number): ScreenSize => {
    if (width >= breakpoints["2xl"]) return "2xl"
    if (width >= breakpoints.xl) return "xl"
    if (width >= breakpoints.lg) return "lg"
    if (width >= breakpoints.md) return "md"
    if (width >= breakpoints.sm) return "sm"
    return "xs"
  }, [])

  // 更新布局状态
  const updateLayout = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight

    setWindowSize({ width, height })

    const newScreenSize = getCurrentScreenSize(width)
    setScreenSize(newScreenSize)

    const mobile = width < breakpoints.md
    const tablet = width >= breakpoints.md && width < breakpoints.lg
    const desktop = width >= breakpoints.lg

    setIsMobile(mobile)
    setIsTablet(tablet)
    setIsDesktop(desktop)

    setOrientation(width > height ? "landscape" : "portrait")
  }, [getCurrentScreenSize])

  // 监听窗口大小变化
  useEffect(() => {
    updateLayout()

    const handleResize = () => {
      updateLayout()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateLayout])

  // 获取响应式值
  const getResponsiveValue = useCallback(
    (values: Partial<Record<ScreenSize, any>>, fallback: any) => {
      return values[screenSize] ?? values.lg ?? values.md ?? values.sm ?? fallback
    },
    [screenSize],
  )

  // 获取当前内容区域样式
  const getContentStyles = useCallback(() => {
    const padding = isMobile
      ? layoutConfig.content.padding.mobile
      : isTablet
        ? layoutConfig.content.padding.tablet
        : layoutConfig.content.padding.desktop

    return {
      padding: `${padding}px`,
      maxWidth: layoutConfig.content.centered ? `${layoutConfig.content.maxWidth}px` : "100%",
      margin: layoutConfig.content.centered ? "0 auto" : "0",
    }
  }, [isMobile, isTablet, layoutConfig.content])

  // 获取网格样式
  const getGridStyles = useCallback(() => {
    const columns = isMobile
      ? layoutConfig.grid.columns.mobile
      : isTablet
        ? layoutConfig.grid.columns.tablet
        : layoutConfig.grid.columns.desktop

    const gap = isMobile
      ? layoutConfig.grid.gap.mobile
      : isTablet
        ? layoutConfig.grid.gap.tablet
        : layoutConfig.grid.gap.desktop

    return {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: `${gap}px`,
    }
  }, [isMobile, isTablet, layoutConfig.grid])

  return {
    screenSize,
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    orientation,
    layoutConfig,
    getResponsiveValue,
    getContentStyles,
    getGridStyles,
    breakpoints,
  }
}

// 响应式容器组件
export function useResponsiveContainer() {
  const { isMobile, isTablet, isDesktop, getContentStyles } = useResponsiveLayout()

  const getContainerClass = useCallback((variant: "full" | "contained" | "fluid" = "contained") => {
    const baseClasses = "w-full"

    switch (variant) {
      case "full":
        return `${baseClasses} min-h-screen`
      case "contained":
        return `${baseClasses} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
      case "fluid":
        return `${baseClasses} px-4 sm:px-6 lg:px-8`
      default:
        return baseClasses
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop,
    getContainerClass,
    getContentStyles,
  }
}
