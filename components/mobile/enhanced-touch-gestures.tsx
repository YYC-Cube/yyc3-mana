"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { RefreshCw, ArrowLeft, ArrowRight } from "lucide-react"

interface EnhancedTouchGesturesProps {
  children: ReactNode
  onRefresh?: () => Promise<void>
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onLongPress?: () => void
  onDoubleTap?: () => void
  onPinchZoom?: (scale: number) => void
  enablePullToRefresh?: boolean
  enableSwipeNavigation?: boolean
  enableLongPress?: boolean
  enableDoubleTap?: boolean
  enablePinchZoom?: boolean
  refreshThreshold?: number
  swipeThreshold?: number
  longPressDelay?: number
  doubleTapDelay?: number
  className?: string
}

interface TouchState {
  startX: number
  startY: number
  currentX: number
  currentY: number
  startTime: number
  isScrolling: boolean
  isPulling: boolean
  isLongPressing: boolean
  longPressTimer?: NodeJS.Timeout
  lastTapTime: number
  tapCount: number
  initialDistance?: number
  currentScale: number
}

export function EnhancedTouchGestures({
  children,
  onRefresh,
  onSwipeLeft,
  onSwipeRight,
  onLongPress,
  onDoubleTap,
  onPinchZoom,
  enablePullToRefresh = true,
  enableSwipeNavigation = true,
  enableLongPress = false,
  enableDoubleTap = false,
  enablePinchZoom = false,
  refreshThreshold = 80,
  swipeThreshold = 100,
  longPressDelay = 500,
  doubleTapDelay = 300,
  className = "",
}: EnhancedTouchGesturesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [showRefreshIndicator, setShowRefreshIndicator] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [isLongPressing, setIsLongPressing] = useState(false)
  const [scale, setScale] = useState(1)

  // 触摸状态
  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    startTime: 0,
    isScrolling: false,
    isPulling: false,
    isLongPressing: false,
    lastTapTime: 0,
    tapCount: 0,
    currentScale: 1,
  })

  // 获取两点间距离（用于缩放手势）
  const getDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  // 添加触觉反馈
  const hapticFeedback = (type: "light" | "medium" | "heavy" = "light") => {
    if ("vibrate" in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 50,
      }
      navigator.vibrate(patterns[type])
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrame: number

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      const now = Date.now()

      // 清除之前的长按定时器
      if (touchState.current.longPressTimer) {
        clearTimeout(touchState.current.longPressTimer)
      }

      touchState.current = {
        ...touchState.current,
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        startTime: now,
        isScrolling: false,
        isPulling: false,
        isLongPressing: false,
      }

      // 处理双击
      if (enableDoubleTap) {
        const timeSinceLastTap = now - touchState.current.lastTapTime
        if (timeSinceLastTap < doubleTapDelay) {
          touchState.current.tapCount++
        } else {
          touchState.current.tapCount = 1
        }
        touchState.current.lastTapTime = now
      }

      // 处理长按
      if (enableLongPress && onLongPress) {
        touchState.current.longPressTimer = setTimeout(() => {
          if (!touchState.current.isScrolling) {
            touchState.current.isLongPressing = true
            setIsLongPressing(true)
            hapticFeedback("medium")
            onLongPress()
          }
        }, longPressDelay)
      }

      // 处理缩放手势
      if (enablePinchZoom && e.touches.length === 2) {
        touchState.current.initialDistance = getDistance(e.touches[0], e.touches[1])
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return

      const touch = e.touches[0]
      const deltaX = touch.clientX - touchState.current.startX
      const deltaY = touch.clientY - touchState.current.startY

      touchState.current.currentX = touch.clientX
      touchState.current.currentY = touch.clientY

      // 判断滚动方向
      if (!touchState.current.isScrolling && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
        touchState.current.isScrolling = true

        // 清除长按定时器
        if (touchState.current.longPressTimer) {
          clearTimeout(touchState.current.longPressTimer)
        }
      }

      // 处理缩放手势
      if (enablePinchZoom && e.touches.length === 2 && touchState.current.initialDistance) {
        e.preventDefault()
        const currentDistance = getDistance(e.touches[0], e.touches[1])
        const scaleChange = currentDistance / touchState.current.initialDistance
        const newScale = Math.max(0.5, Math.min(3, scaleChange))

        setScale(newScale)
        touchState.current.currentScale = newScale

        if (onPinchZoom) {
          onPinchZoom(newScale)
        }
        return
      }

      // 下拉刷新逻辑
      if (enablePullToRefresh && deltaY > 0 && container.scrollTop === 0 && !isRefreshing) {
        e.preventDefault()
        touchState.current.isPulling = true

        const distance = Math.min(deltaY * 0.5, refreshThreshold * 1.5)
        setPullDistance(distance)
        setShowRefreshIndicator(distance > 20)

        // 添加阻尼效果
        container.style.transform = `translateY(${distance}px)`
        container.style.transition = "none"

        // 触觉反馈
        if (distance >= refreshThreshold && !showRefreshIndicator) {
          hapticFeedback("light")
        }
      }

      // 左右滑动提示
      if (enableSwipeNavigation && Math.abs(deltaX) > 30 && Math.abs(deltaY) < 50) {
        const direction = deltaX > 0 ? "right" : "left"
        setSwipeDirection(direction)

        // 添加视觉反馈
        if (Math.abs(deltaX) > swipeThreshold / 2) {
          hapticFeedback("light")
        }
      }
    }

    const handleTouchEnd = async (e: TouchEvent) => {
      const deltaX = touchState.current.currentX - touchState.current.startX
      const deltaY = touchState.current.currentY - touchState.current.startY
      const deltaTime = Date.now() - touchState.current.startTime
      const velocity = Math.abs(deltaX) / deltaTime

      // 清除长按定时器
      if (touchState.current.longPressTimer) {
        clearTimeout(touchState.current.longPressTimer)
      }

      // 重置容器位置
      container.style.transform = ""
      container.style.transition = "transform 0.3s ease-out"

      // 处理双击
      if (enableDoubleTap && touchState.current.tapCount === 2 && deltaTime < doubleTapDelay && onDoubleTap) {
        hapticFeedback("medium")
        onDoubleTap()
        touchState.current.tapCount = 0
      }

      // 下拉刷新
      if (enablePullToRefresh && touchState.current.isPulling && pullDistance >= refreshThreshold && onRefresh) {
        setIsRefreshing(true)
        hapticFeedback("heavy")

        try {
          await onRefresh()
        } catch (error) {
          console.error("刷新失败:", error)
        } finally {
          setIsRefreshing(false)
        }
      }

      // 左右滑动导航
      if (enableSwipeNavigation && Math.abs(deltaX) > swipeThreshold && Math.abs(deltaY) < 50 && velocity > 0.3) {
        hapticFeedback("medium")

        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft()
        }
      }

      // 重置状态
      setPullDistance(0)
      setShowRefreshIndicator(false)
      setSwipeDirection(null)
      setIsLongPressing(false)
      touchState.current.isPulling = false
      touchState.current.isLongPressing = false
    }

    const handleTouchCancel = () => {
      // 清理所有状态
      if (touchState.current.longPressTimer) {
        clearTimeout(touchState.current.longPressTimer)
      }

      container.style.transform = ""
      container.style.transition = "transform 0.3s ease-out"

      setPullDistance(0)
      setShowRefreshIndicator(false)
      setSwipeDirection(null)
      setIsLongPressing(false)
      touchState.current.isPulling = false
      touchState.current.isLongPressing = false
    }

    // 添加事件监听器
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: false })
    container.addEventListener("touchcancel", handleTouchCancel, { passive: false })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
      container.removeEventListener("touchcancel", handleTouchCancel)

      if (touchState.current.longPressTimer) {
        clearTimeout(touchState.current.longPressTimer)
      }

      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [
    enablePullToRefresh,
    enableSwipeNavigation,
    enableLongPress,
    enableDoubleTap,
    enablePinchZoom,
    refreshThreshold,
    swipeThreshold,
    longPressDelay,
    doubleTapDelay,
    onRefresh,
    onSwipeLeft,
    onSwipeRight,
    onLongPress,
    onDoubleTap,
    onPinchZoom,
    isRefreshing,
    pullDistance,
    showRefreshIndicator,
  ])

  return (
    <div
      ref={containerRef}
      className={`relative h-full overflow-auto ${className}`}
      style={{
        transform: enablePinchZoom ? `scale(${scale})` : undefined,
        transformOrigin: "center center",
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* 下拉刷新指示器 */}
      {enablePullToRefresh && (showRefreshIndicator || isRefreshing) && (
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 bg-gradient-to-b from-sky-50 to-transparent z-10"
          style={{
            transform: `translateY(${Math.max(0, pullDistance - 60)}px)`,
            opacity: Math.min(1, pullDistance / 40),
          }}
        >
          <div className="flex items-center space-x-2 text-sky-600">
            <RefreshCw
              className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""} ${
                pullDistance >= refreshThreshold ? "rotate-180" : ""
              } transition-transform duration-200`}
            />
            <span className="text-sm font-medium">
              {isRefreshing ? "正在刷新..." : pullDistance >= refreshThreshold ? "释放刷新" : "下拉刷新"}
            </span>
          </div>
        </div>
      )}

      {/* 左右滑动提示 */}
      {enableSwipeNavigation && (
        <>
          <div
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-r from-sky-400 to-transparent transition-opacity duration-200 pointer-events-none ${
              swipeDirection === "right" ? "opacity-60" : "opacity-20"
            }`}
          />
          <div
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-l from-sky-400 to-transparent transition-opacity duration-200 pointer-events-none ${
              swipeDirection === "left" ? "opacity-60" : "opacity-20"
            }`}
          />

          {/* 滑动方向指示器 */}
          {swipeDirection && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/20 rounded-full p-3 pointer-events-none">
              {swipeDirection === "left" ? (
                <ArrowLeft className="w-6 h-6 text-white" />
              ) : (
                <ArrowRight className="w-6 h-6 text-white" />
              )}
            </div>
          )}
        </>
      )}

      {/* 长按指示器 */}
      {enableLongPress && isLongPressing && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-full text-sm pointer-events-none z-20">
          长按激活
        </div>
      )}

      {/* 缩放指示器 */}
      {enablePinchZoom && scale !== 1 && (
        <div className="absolute top-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm pointer-events-none z-20">
          {Math.round(scale * 100)}%
        </div>
      )}

      {children}
    </div>
  )
}
