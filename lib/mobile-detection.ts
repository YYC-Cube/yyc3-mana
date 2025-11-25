"use client"

// 移动端检测服务
export class MobileDetectionService {
  // 检测是否为移动设备
  static isMobile(): boolean {
    if (typeof window === "undefined") return false

    const userAgent = navigator.userAgent.toLowerCase()
    const mobileKeywords = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone", "mobile"]

    return mobileKeywords.some((keyword) => userAgent.includes(keyword)) || window.innerWidth <= 768
  }

  // 检测是否为平板设备
  static isTablet(): boolean {
    if (typeof window === "undefined") return false

    const userAgent = navigator.userAgent.toLowerCase()
    return (
      (userAgent.includes("ipad") || (userAgent.includes("android") && !userAgent.includes("mobile"))) &&
      window.innerWidth >= 768 &&
      window.innerWidth <= 1024
    )
  }

  // 检测是否为触摸设备
  static isTouchDevice(): boolean {
    if (typeof window === "undefined") return false

    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0
  }

  // 获取设备类型
  static getDeviceType(): "mobile" | "tablet" | "desktop" {
    if (this.isMobile()) return "mobile"
    if (this.isTablet()) return "tablet"
    return "desktop"
  }

  // 检测操作系统
  static getOS(): "ios" | "android" | "windows" | "macos" | "linux" | "unknown" {
    if (typeof window === "undefined") return "unknown"

    const userAgent = navigator.userAgent.toLowerCase()

    if (userAgent.includes("iphone") || userAgent.includes("ipad")) return "ios"
    if (userAgent.includes("android")) return "android"
    if (userAgent.includes("windows")) return "windows"
    if (userAgent.includes("mac")) return "macos"
    if (userAgent.includes("linux")) return "linux"

    return "unknown"
  }

  // 检测是否支持PWA
  static supportsPWA(): boolean {
    if (typeof window === "undefined") return false

    return "serviceWorker" in navigator && "PushManager" in window
  }
}

// 手势处理类
export class GestureHandler {
  private element: HTMLElement
  private startX = 0
  private startY = 0
  private startTime = 0
  private isTracking = false

  constructor(element: HTMLElement) {
    this.element = element
    this.init()
  }

  private init() {
    this.element.addEventListener("touchstart", this.handleTouchStart.bind(this), { passive: true })
    this.element.addEventListener("touchmove", this.handleTouchMove.bind(this), { passive: true })
    this.element.addEventListener("touchend", this.handleTouchEnd.bind(this), { passive: true })
  }

  private handleTouchStart(e: TouchEvent) {
    const touch = e.touches[0]
    this.startX = touch.clientX
    this.startY = touch.clientY
    this.startTime = Date.now()
    this.isTracking = true
  }

  private handleTouchMove(e: TouchEvent) {
    if (!this.isTracking) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - this.startX
    const deltaY = touch.clientY - this.startY

    // 防止页面滚动时触发手势
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      this.isTracking = false
      return
    }
  }

  private handleTouchEnd(e: TouchEvent) {
    if (!this.isTracking) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - this.startX
    const deltaY = touch.clientY - this.startY
    const deltaTime = Date.now() - this.startTime

    const minSwipeDistance = 50
    const maxSwipeTime = 300

    if (Math.abs(deltaX) > minSwipeDistance && deltaTime < maxSwipeTime) {
      if (deltaX > 0) {
        this.dispatchSwipeEvent("swipeRight")
      } else {
        this.dispatchSwipeEvent("swipeLeft")
      }
    }

    this.isTracking = false
  }

  private dispatchSwipeEvent(type: string) {
    const event = new CustomEvent(type, {
      bubbles: true,
      cancelable: true,
    })
    this.element.dispatchEvent(event)
  }

  destroy() {
    this.element.removeEventListener("touchstart", this.handleTouchStart.bind(this))
    this.element.removeEventListener("touchmove", this.handleTouchMove.bind(this))
    this.element.removeEventListener("touchend", this.handleTouchEnd.bind(this))
  }
}

// 移动端工具函数
export const MobileUtils = {
  // 防止iOS Safari的橡皮筋效果
  preventBounce() {
    document.addEventListener(
      "touchmove",
      (e) => {
        if ((e.target as HTMLElement).closest(".scrollable")) return
        e.preventDefault()
      },
      { passive: false },
    )
  },

  // 隐藏地址栏
  hideAddressBar() {
    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 100)
  },

  // 设置视口高度
  setViewportHeight() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  },

  // 检测横竖屏
  getOrientation(): "portrait" | "landscape" {
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape"
  },

  // 振动反馈
  vibrate(pattern: number | number[] = 100) {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern)
    }
  },
}
