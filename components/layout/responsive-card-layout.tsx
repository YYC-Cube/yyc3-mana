"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveGrid, ResponsiveGridItem } from "./responsive-grid"
import { ResponsiveContainer } from "./responsive-container"
import { useResponsiveLayout } from "@/lib/responsive-layout"

interface CardLayoutItem {
  id: string
  title?: string
  content: React.ReactNode
  span?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  className?: string
  priority?: number
}

interface ResponsiveCardLayoutProps {
  items: CardLayoutItem[]
  title?: string
  description?: string
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
  className?: string
  containerVariant?: "full" | "contained" | "fluid" | "narrow"
}

export function ResponsiveCardLayout({
  items,
  title,
  description,
  columns,
  gap,
  autoFit = false,
  minItemWidth = 320,
  className,
  containerVariant = "contained",
}: ResponsiveCardLayoutProps) {
  const { isMobile } = useResponsiveLayout()

  // 根据优先级和屏幕尺寸排序项目
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const priorityA = a.priority || 0
      const priorityB = b.priority || 0
      return priorityB - priorityA
    })
  }, [items])

  return (
    <ResponsiveContainer variant={containerVariant} className={className}>
      {/* 页面标题 */}
      {(title || description) && (
        <div className="mb-8">
          {title && <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>}
          {description && <p className="text-lg text-gray-600">{description}</p>}
        </div>
      )}

      {/* 卡片网格 */}
      <ResponsiveGrid
        config={{
          columns,
          gap,
          autoFit,
          minItemWidth,
        }}
      >
        {sortedItems.map((item) => (
          <ResponsiveGridItem key={item.id} span={item.span} className={item.className}>
            <Card className="h-full transition-all duration-200 hover:shadow-lg">
              {item.title && (
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                </CardHeader>
              )}
              <CardContent className={item.title ? "pt-0" : ""}>{item.content}</CardContent>
            </Card>
          </ResponsiveGridItem>
        ))}
      </ResponsiveGrid>
    </ResponsiveContainer>
  )
}
