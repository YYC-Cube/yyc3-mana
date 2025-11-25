"use client"

import { useState, useEffect, useCallback } from "react"
import { useMediaQuery } from "@/hooks/use-mobile"

interface UseSidebarOptions {
  defaultCollapsed?: boolean
  autoCollapse?: boolean
  autoCollapseDelay?: number
  mobileBreakpoint?: number
}

export function useSidebar(options: UseSidebarOptions = {}) {
  const {
    defaultCollapsed = false,
    autoCollapse = true,
    autoCollapseDelay = 3000,
    mobileBreakpoint = 1024,
  } = options

  const isMobile = useMediaQuery(`(max-width:${mobileBreakpoint}px)`)

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const [isHovered, setIsHovered] = useState(false)
  const [isPinned, setIsPinned] = useState(false)

  // 移动端首次加载时自动折叠
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true)
      setIsPinned(false)
    }
  }, [isMobile])

  // 自动收缩逻辑
  useEffect(() => {
    if (!autoCollapse || isPinned || isMobile || isHovered || isCollapsed) {
      return
    }

    const timer = setTimeout(() => {
      setIsCollapsed(true)
    }, autoCollapseDelay)

    return () => clearTimeout(timer)
  }, [autoCollapse, isPinned, isMobile, isHovered, isCollapsed, autoCollapseDelay])

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const togglePinned = useCallback(() => {
    setIsPinned((prev) => {
      const newPinned = !prev
      if (newPinned) {
        setIsCollapsed(false)
      }
      return newPinned
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsHovered(true)
      setIsCollapsed(false)
    }
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsHovered(false)
    }
  }, [isMobile])

  return {
    isCollapsed,
    isHovered,
    isPinned,
    isMobile,
    setIsCollapsed,
    toggleCollapsed,
    togglePinned,
    handleMouseEnter,
    handleMouseLeave,
  }
}
