"use client"

import type React from "react"
import { useResponsiveLayout } from "@/lib/responsive-layout"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime"

// 响应式显示/隐藏组件
interface ResponsiveShowProps {
  children: React.ReactNode
  on?: Array<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">
  above?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  below?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  className?: string
}

export function ResponsiveShow({ children, on, above, below, className }: ResponsiveShowProps) {
  const { screenSize, breakpoints } = useResponsiveLayout()

  let shouldShow = true

  if (on) {
    shouldShow = on.includes(screenSize)
  } else if (above) {
    const currentWidth = breakpoints[screenSize]
    const minWidth = breakpoints[above]
    shouldShow = currentWidth >= minWidth
  } else if (below) {
    const currentWidth = breakpoints[screenSize]
    const maxWidth = breakpoints[below]
    shouldShow = currentWidth < maxWidth
  }

  if (!shouldShow) return null

  return <div className={className}>{children}</div>
}

// 响应式间距组件
interface ResponsiveSpacerProps {
  size?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  direction?: "horizontal" | "vertical" | "both"
  className?: string
}

export function ResponsiveSpacer({
  size = { xs: 16, sm: 20, md: 24, lg: 32, xl: 40, "2xl": 48 },
  direction = "vertical",
  className,
}: ResponsiveSpacerProps) {
  const { getResponsiveValue } = useResponsiveLayout()

  const currentSize = getResponsiveValue(size, 24)

  const spacerStyles: React.CSSProperties = {
    width: direction === "horizontal" || direction === "both" ? `${currentSize}px` : "auto",
    height: direction === "vertical" || direction === "both" ? `${currentSize}px` : "auto",
  }

  return <div className={cn("flex-shrink-0", className)} style={spacerStyles} />
}

// 响应式文本组件
interface ResponsiveTextProps {
  children: React.ReactNode
  size?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    "2xl"?: string
  }
  weight?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    "2xl"?: string
  }
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ResponsiveText({
  children,
  size = { xs: "text-sm", sm: "text-base", md: "text-lg", lg: "text-xl", xl: "text-2xl", "2xl": "text-3xl" },
  weight = {
    xs: "font-normal",
    sm: "font-normal",
    md: "font-medium",
    lg: "font-semibold",
    xl: "font-bold",
    "2xl": "font-bold",
  },
  className,
  as: Component = "p",
}: ResponsiveTextProps) {
  const { getResponsiveValue } = useResponsiveLayout()

  const currentSize = getResponsiveValue(size, "text-base")
  const currentWeight = getResponsiveValue(weight, "font-normal")

  return <Component className={cn(currentSize, currentWeight, className)}>{children}</Component>
}
