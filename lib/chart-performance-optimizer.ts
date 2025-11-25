interface ChartPerformanceConfig {
  enableVirtualization: boolean
  maxDataPoints: number
  updateThrottle: number
  cacheEnabled: boolean
  lazyLoading: boolean
  compressionLevel: number
}

interface ChartMetrics {
  renderTime: number
  memoryUsage: number
  dataSize: number
  updateFrequency: number
  cacheHitRate: number
}

class ChartPerformanceOptimizer {
  private config: ChartPerformanceConfig
  private cache: Map<string, any> = new Map()
  private metrics: ChartMetrics[] = []
  private observers: Map<string, IntersectionObserver> = new Map()

  constructor(config: Partial<ChartPerformanceConfig> = {}) {
    this.config = {
      enableVirtualization: true,
      maxDataPoints: 1000,
      updateThrottle: 100,
      cacheEnabled: true,
      lazyLoading: true,
      compressionLevel: 0.8,
      ...config,
    }
  }

  // 数据优化
  optimizeData(data: any[], chartType: string): any[] {
    const startTime = performance.now()

    let optimizedData = data

    // 数据点限制
    if (data.length > this.config.maxDataPoints) {
      optimizedData = this.downsampleData(data, this.config.maxDataPoints)
    }

    // 数据压缩
    if (this.config.compressionLevel < 1) {
      optimizedData = this.compressData(optimizedData, chartType)
    }

    // 记录性能指标
    const renderTime = performance.now() - startTime
    this.recordMetrics({
      renderTime,
      memoryUsage: this.estimateMemoryUsage(optimizedData),
      dataSize: optimizedData.length,
      updateFrequency: 0,
      cacheHitRate: 0,
    })

    return optimizedData
  }

  // 数据降采样
  private downsampleData(data: any[], targetSize: number): any[] {
    if (data.length <= targetSize) return data

    const step = Math.ceil(data.length / targetSize)
    const downsampled = []

    for (let i = 0; i < data.length; i += step) {
      // 使用平均值进行降采样
      const chunk = data.slice(i, i + step)
      const averaged = this.averageDataPoints(chunk)
      downsampled.push(averaged)
    }

    return downsampled
  }

  // 数据点平均
  private averageDataPoints(points: any[]): any {
    if (points.length === 1) return points[0]

    const result: any = {}
    const numericFields: string[] = []

    // 识别数值字段
    Object.keys(points[0]).forEach((key) => {
      if (typeof points[0][key] === "number") {
        numericFields.push(key)
        result[key] = 0
      } else {
        result[key] = points[0][key] // 非数值字段取第一个值
      }
    })

    // 计算数值字段平均值
    numericFields.forEach((field) => {
      const sum = points.reduce((acc, point) => acc + (point[field] || 0), 0)
      result[field] = sum / points.length
    })

    return result
  }

  // 数据压缩
  private compressData(data: any[], chartType: string): any[] {
    switch (chartType) {
      case "line":
        return this.compressLineData(data)
      case "bar":
        return this.compressBarData(data)
      default:
        return data
    }
  }

  // 线图数据压缩（移除冗余点）
  private compressLineData(data: any[]): any[] {
    if (data.length < 3) return data

    const compressed = [data[0]] // 保留第一个点
    const tolerance = this.config.compressionLevel

    for (let i = 1; i < data.length - 1; i++) {
      const prev = data[i - 1]
      const current = data[i]
      const next = data[i + 1]

      // 计算点的重要性（基于趋势变化）
      const importance = this.calculatePointImportance(prev, current, next)

      if (importance > tolerance) {
        compressed.push(current)
      }
    }

    compressed.push(data[data.length - 1]) // 保留最后一个点
    return compressed
  }

  // 计算点的重要性
  private calculatePointImportance(prev: any, current: any, next: any): number {
    // 简化的重要性计算（基于角度变化）
    const fields = Object.keys(current).filter((key) => typeof current[key] === "number")

    let totalImportance = 0
    fields.forEach((field) => {
      const slope1 = current[field] - prev[field]
      const slope2 = next[field] - current[field]
      const angleChange = Math.abs(slope2 - slope1)
      totalImportance += angleChange
    })

    return totalImportance / fields.length
  }

  // 柱图数据压缩
  private compressBarData(data: any[]): any[] {
    // 对于柱图，主要是合并相似的数据点
    const threshold = this.config.compressionLevel * 0.1
    const compressed = []

    for (const item of data) {
      const similar = compressed.find((comp) => this.isSimilarBarData(comp, item, threshold))
      if (similar) {
        // 合并相似数据
        this.mergeBarData(similar, item)
      } else {
        compressed.push({ ...item })
      }
    }

    return compressed
  }

  // 判断柱图数据是否相似
  private isSimilarBarData(item1: any, item2: any, threshold: number): boolean {
    const numericFields = Object.keys(item1).filter((key) => typeof item1[key] === "number")

    for (const field of numericFields) {
      const diff = Math.abs(item1[field] - item2[field])
      const avg = (item1[field] + item2[field]) / 2
      if (diff / avg > threshold) {
        return false
      }
    }

    return true
  }

  // 合并柱图数据
  private mergeBarData(target: any, source: any): void {
    const numericFields = Object.keys(target).filter((key) => typeof target[key] === "number")

    numericFields.forEach((field) => {
      target[field] = (target[field] + source[field]) / 2
    })
  }

  // 缓存管理
  getCachedData(key: string): any | null {
    if (!this.config.cacheEnabled) return null

    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < 300000) {
      // 5分钟缓存
      return cached.data
    }

    return null
  }

  setCachedData(key: string, data: any): void {
    if (!this.config.cacheEnabled) return

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })

    // 限制缓存大小
    if (this.cache.size > 100) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }
  }

  // 懒加载支持
  setupLazyLoading(elementId: string, loadCallback: () => void): void {
    if (!this.config.lazyLoading) {
      loadCallback()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadCallback()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(elementId)
    if (element) {
      observer.observe(element)
      this.observers.set(elementId, observer)
    }
  }

  // 节流更新
  throttledUpdate = this.throttle((callback: () => void) => {
    callback()
  }, this.config.updateThrottle)

  private throttle(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout | null = null
    let lastExecTime = 0

    return function (this: any, ...args: any[]) {
      const currentTime = Date.now()

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args)
        lastExecTime = currentTime
      } else {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(
          () => {
            func.apply(this, args)
            lastExecTime = Date.now()
          },
          delay - (currentTime - lastExecTime),
        )
      }
    }
  }

  // 内存使用估算
  private estimateMemoryUsage(data: any[]): number {
    const jsonString = JSON.stringify(data)
    return new Blob([jsonString]).size
  }

  // 记录性能指标
  private recordMetrics(metrics: ChartMetrics): void {
    this.metrics.push(metrics)

    // 只保留最近100条记录
    if (this.metrics.length > 100) {
      this.metrics.shift()
    }
  }

  // 获取性能统计
  getPerformanceStats(): {
    averageRenderTime: number
    averageMemoryUsage: number
    cacheHitRate: number
    totalOptimizations: number
  } {
    if (this.metrics.length === 0) {
      return {
        averageRenderTime: 0,
        averageMemoryUsage: 0,
        cacheHitRate: 0,
        totalOptimizations: 0,
      }
    }

    const totalRenderTime = this.metrics.reduce((sum, m) => sum + m.renderTime, 0)
    const totalMemoryUsage = this.metrics.reduce((sum, m) => sum + m.memoryUsage, 0)
    const totalCacheHits = this.metrics.reduce((sum, m) => sum + m.cacheHitRate, 0)

    return {
      averageRenderTime: totalRenderTime / this.metrics.length,
      averageMemoryUsage: totalMemoryUsage / this.metrics.length,
      cacheHitRate: totalCacheHits / this.metrics.length,
      totalOptimizations: this.metrics.length,
    }
  }

  // 清理资源
  cleanup(): void {
    this.cache.clear()
    this.metrics.length = 0
    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()
  }

  // 配置更新
  updateConfig(newConfig: Partial<ChartPerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  // 获取优化建议
  getOptimizationSuggestions(): string[] {
    const stats = this.getPerformanceStats()
    const suggestions: string[] = []

    if (stats.averageRenderTime > 100) {
      suggestions.push("考虑减少数据点数量或启用数据压缩")
    }

    if (stats.averageMemoryUsage > 5 * 1024 * 1024) {
      // 5MB
      suggestions.push("内存使用较高，建议启用数据虚拟化")
    }

    if (stats.cacheHitRate < 0.5) {
      suggestions.push("缓存命中率较低，考虑调整缓存策略")
    }

    if (!this.config.lazyLoading) {
      suggestions.push("启用懒加载可以提升页面初始加载性能")
    }

    return suggestions
  }
}

// 创建全局优化器实例
export const chartOptimizer = new ChartPerformanceOptimizer()

// 便捷函数
export const optimizeChartData = (data: any[], chartType: string, cacheKey?: string) => {
  if (cacheKey) {
    const cached = chartOptimizer.getCachedData(cacheKey)
    if (cached) return cached
  }

  const optimized = chartOptimizer.optimizeData(data, chartType)

  if (cacheKey) {
    chartOptimizer.setCachedData(cacheKey, optimized)
  }

  return optimized
}

export const setupChartLazyLoading = (elementId: string, loadCallback: () => void) => {
  chartOptimizer.setupLazyLoading(elementId, loadCallback)
}

export const getChartPerformanceStats = () => {
  return chartOptimizer.getPerformanceStats()
}
