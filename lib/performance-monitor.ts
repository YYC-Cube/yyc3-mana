// 性能监控系统
class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map()
  private listeners: Array<(metrics: PerformanceMetric[]) => void> = []
  private isEnabled = true

  // 开始性能测量
  startMeasure(name: string, category = "general"): string {
    const measureId = `${name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const metric: PerformanceMetric = {
      id: measureId,
      name,
      category,
      startTime: performance.now(),
      timestamp: Date.now(),
      status: "measuring",
    }

    this.metrics.set(measureId, metric)
    return measureId
  }

  // 结束性能测量
  endMeasure(measureId: string, metadata?: Record<string, any>): PerformanceMetric | null {
    const metric = this.metrics.get(measureId)
    if (!metric) {
      console.warn(`性能测量 ${measureId} 不存在`)
      return null
    }

    const endTime = performance.now()
    const updatedMetric: PerformanceMetric = {
      ...metric,
      endTime,
      duration: endTime - metric.startTime,
      status: "completed",
      metadata,
    }

    this.metrics.set(measureId, updatedMetric)
    this.notifyListeners()

    // 记录到控制台（开发环境）
    if (process.env.NODE_ENV === "development") {
      console.log(`⏱️ ${metric.name}: ${updatedMetric.duration?.toFixed(2)}ms`, metadata)
    }

    // 发送到监控服务
    this.sendToMonitoringService(updatedMetric)

    return updatedMetric
  }

  // 记录错误测量
  errorMeasure(measureId: string, error: string, metadata?: Record<string, any>): PerformanceMetric | null {
    const metric = this.metrics.get(measureId)
    if (!metric) return null

    const updatedMetric: PerformanceMetric = {
      ...metric,
      endTime: performance.now(),
      duration: performance.now() - metric.startTime,
      status: "error",
      error,
      metadata,
    }

    this.metrics.set(measureId, updatedMetric)
    this.notifyListeners()
    return updatedMetric
  }

  // 直接记录性能指标
  recordMetric(name: string, duration: number, category = "general", metadata?: Record<string, any>) {
    const metric: PerformanceMetric = {
      id: `${name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      category,
      startTime: performance.now() - duration,
      endTime: performance.now(),
      duration,
      timestamp: Date.now(),
      status: "completed",
      metadata,
    }

    this.metrics.set(metric.id, metric)
    this.notifyListeners()
    this.sendToMonitoringService(metric)
  }

  // 获取性能统计
  getStatistics(category?: string): PerformanceStatistics {
    const allMetrics = Array.from(this.metrics.values())
    const filteredMetrics = category ? allMetrics.filter((m) => m.category === category) : allMetrics

    const completedMetrics = filteredMetrics.filter((m) => m.status === "completed" && m.duration)
    const errorMetrics = filteredMetrics.filter((m) => m.status === "error")

    if (completedMetrics.length === 0) {
      return {
        totalCount: filteredMetrics.length,
        completedCount: 0,
        errorCount: errorMetrics.length,
        averageDuration: 0,
        minDuration: 0,
        maxDuration: 0,
        p95Duration: 0,
        successRate: 0,
      }
    }

    const durations = completedMetrics.map((m) => m.duration!).sort((a, b) => a - b)
    const totalDuration = durations.reduce((sum, d) => sum + d, 0)

    return {
      totalCount: filteredMetrics.length,
      completedCount: completedMetrics.length,
      errorCount: errorMetrics.length,
      averageDuration: totalDuration / completedMetrics.length,
      minDuration: durations[0] || 0,
      maxDuration: durations[durations.length - 1] || 0,
      p95Duration: durations[Math.floor(durations.length * 0.95)] || 0,
      successRate: completedMetrics.length / filteredMetrics.length,
    }
  }

  // 获取最近的性能指标
  getRecentMetrics(limit = 50): PerformanceMetric[] {
    return Array.from(this.metrics.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit)
  }

  // 清理旧的性能数据
  cleanup(maxAge: number = 24 * 60 * 60 * 1000) {
    const cutoffTime = Date.now() - maxAge
    const keysToDelete: string[] = []

    this.metrics.forEach((metric, key) => {
      if (metric.timestamp < cutoffTime) {
        keysToDelete.push(key)
      }
    })

    keysToDelete.forEach((key) => this.metrics.delete(key))

    if (keysToDelete.length > 0) {
      console.log(`清理了 ${keysToDelete.length} 个过期的性能指标`)
    }
  }

  // 订阅性能指标变化
  subscribe(listener: (metrics: PerformanceMetric[]) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // 发送到监控服务
  private sendToMonitoringService(metric: PerformanceMetric) {
    if (!this.isEnabled) return

    // 这里可以集成真实的监控服务，如 Sentry、DataDog 等
    window.dispatchEvent(
      new CustomEvent("performanceMetric", {
        detail: metric,
      }),
    )
  }

  // 通知监听器
  private notifyListeners() {
    const recentMetrics = this.getRecentMetrics()
    this.listeners.forEach((listener) => listener(recentMetrics))
  }

  // 启用/禁用监控
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  // 获取系统性能信息
  getSystemPerformance(): SystemPerformance {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    const memory = (performance as any).memory

    return {
      // 页面加载性能
      pageLoad: {
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
        loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
        firstPaint: this.getFirstPaint(),
        firstContentfulPaint: this.getFirstContentfulPaint(),
      },
      // 内存使用情况
      memory: memory
        ? {
            used: memory.usedJSHeapSize,
            total: memory.totalJSHeapSize,
            limit: memory.jsHeapSizeLimit,
          }
        : undefined,
      // 网络信息
      network: this.getNetworkInfo(),
      // 设备信息
      device: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
      },
    }
  }

  // 获取首次绘制时间
  private getFirstPaint(): number {
    const paintEntries = performance.getEntriesByType("paint")
    const firstPaint = paintEntries.find((entry) => entry.name === "first-paint")
    return firstPaint?.startTime || 0
  }

  // 获取首次内容绘制时间
  private getFirstContentfulPaint(): number {
    const paintEntries = performance.getEntriesByType("paint")
    const fcp = paintEntries.find((entry) => entry.name === "first-contentful-paint")
    return fcp?.startTime || 0
  }

  // 获取网络信息
  private getNetworkInfo(): NetworkInfo {
    const connection =
      (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    return {
      effectiveType: connection?.effectiveType || "unknown",
      downlink: connection?.downlink || 0,
      rtt: connection?.rtt || 0,
      saveData: connection?.saveData || false,
    }
  }
}

// 类型定义
interface PerformanceMetric {
  id: string
  name: string
  category: string
  startTime: number
  endTime?: number
  duration?: number
  timestamp: number
  status: "measuring" | "completed" | "error"
  error?: string
  metadata?: Record<string, any>
}

interface PerformanceStatistics {
  totalCount: number
  completedCount: number
  errorCount: number
  averageDuration: number
  minDuration: number
  maxDuration: number
  p95Duration: number
  successRate: number
}

interface SystemPerformance {
  pageLoad: {
    domContentLoaded: number
    loadComplete: number
    firstPaint: number
    firstContentfulPaint: number
  }
  memory?: {
    used: number
    total: number
    limit: number
  }
  network: NetworkInfo
  device: {
    userAgent: string
    platform: string
    language: string
    cookieEnabled: boolean
    onLine: boolean
  }
}

interface NetworkInfo {
  effectiveType: string
  downlink: number
  rtt: number
  saveData: boolean
}

// 导出性能监控实例
export const performanceMonitor = new PerformanceMonitor()

// 便捷的性能测量装饰器
export function measurePerformance(name: string, category?: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const measureId = performanceMonitor.startMeasure(name, category)

      try {
        const result = await originalMethod.apply(this, args)
        performanceMonitor.endMeasure(measureId, { args: args.length })
        return result
      } catch (error) {
        performanceMonitor.errorMeasure(measureId, String(error))
        throw error
      }
    }

    return descriptor
  }
}

// 自动清理定时器
setInterval(
  () => {
    performanceMonitor.cleanup()
  },
  60 * 60 * 1000,
) // 每小时清理一次
