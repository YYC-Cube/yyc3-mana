"use client"

import type React from "react"
import { useResponsiveLayout } from "@/lib/responsive-layout"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime"

interface ResponsiveContainerProps {
  children: React.ReactNode
  variant?: "full" | "contained" | "fluid" | "narrow"
  padding?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  maxWidth?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  centered?: boolean
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ResponsiveContainer({
  children,
  variant = "contained",
  padding,
  maxWidth,
  centered = true,
  className,
  as: Component = "div",
}: ResponsiveContainerProps) {
  const { getResponsiveValue, breakpoints } = useResponsiveLayout()

  // 默认内边距配置
  const defaultPadding = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 32,
    "2xl": 40,
  }

  // 默认最大宽度配置
  const defaultMaxWidth = {
    xs: breakpoints.xs,
    sm: breakpoints.sm,
    md: breakpoints.md,
    lg: breakpoints.lg,
    xl: breakpoints.xl,
    "2xl": breakpoints["2xl"],
  }

  const variantMaxWidth = {
    full: { "2xl": 9999 },
    contained: { "2xl": 1280 },
    fluid: { "2xl": 9999 },
    narrow: { "2xl": 768 },
  }

  // 获取当前配置
  const currentPadding = getResponsiveValue(padding || defaultPadding, 24)
  const currentMaxWidth = getResponsiveValue(maxWidth || variantMaxWidth[variant] || defaultMaxWidth, 1280)

  // 生成容器样式
  const containerStyles: React.CSSProperties = {
    width: "100%",
    paddingLeft: `${currentPadding}px`,
    paddingRight: `${currentPadding}px`,
    maxWidth: variant === "full" || variant === "fluid" ? "100%" : `${currentMaxWidth}px`,
    margin: centered ? "0 auto" : "0",
  }

  // 生成CSS类名
  const containerClasses = cn(
    "w-full",
    {
      "min-h-screen": variant === "full",
    },
    className,
  )

  return (
    <Component className={containerClasses} style={containerStyles}>
      {children}
    </Component>
  )
}
