"use client"

import type React from "react"
import { useResponsiveLayout } from "@/lib/responsive-layout"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime"

// 网格配置接口
interface GridConfig {
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  gap?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  autoFit?: boolean
  minItemWidth?: number
}

interface ResponsiveGridProps {
  children: React.ReactNode
  config?: GridConfig
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ResponsiveGrid({ children, config = {}, className, as: Component = "div" }: ResponsiveGridProps) {
  const { screenSize, getResponsiveValue } = useResponsiveLayout()

  // 默认配置
  const defaultConfig: Required<GridConfig> = {
    columns: {
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3,
      xl: 4,
      "2xl": 4,
    },
    gap: {
      xs: 16,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 24,
      "2xl": 28,
    },
    autoFit: false,
    minItemWidth: 280,
  }

  const mergedConfig = { ...defaultConfig, ...config }

  // 获取当前列数和间距
  const columns = getResponsiveValue(mergedConfig.columns, 3)
  const gap = getResponsiveValue(mergedConfig.gap, 24)

  // 生成网格样式
  const gridStyles: React.CSSProperties = mergedConfig.autoFit
    ? {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${mergedConfig.minItemWidth}px, 1fr))`,
        gap: `${gap}px`,
      }
    : {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      }

  return (
    <Component className={cn("w-full", className)} style={gridStyles}>
      {children}
    </Component>
  )
}

// 响应式网格项组件
interface ResponsiveGridItemProps {
  children: React.ReactNode
  span?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ResponsiveGridItem({ children, span = {}, className, as: Component = "div" }: ResponsiveGridItemProps) {
  const { getResponsiveValue } = useResponsiveLayout()

  const currentSpan = getResponsiveValue(span, 1)

  const itemStyles: React.CSSProperties = {
    gridColumn: `span ${currentSpan}`,
  }

  return (
    <Component className={cn("w-full", className)} style={itemStyles}>
      {children}
    </Component>
  )
}
