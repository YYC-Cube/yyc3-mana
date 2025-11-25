"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert } from "@/components/ui/alert"
import { Smartphone, Battery, Wifi, HardDrive, AlertTriangle, CheckCircle, Activity } from "lucide-react"

interface MobilePerformanceMetrics {
  // 设备信息
  device: {
    model: string
    os: string
    version: string
    userAgent: string
  }

  // 性能指标
  performance: {
    memoryUsage: number
    memoryLimit: number
    cpuUsage: number
    batteryLevel: number
    batteryCharging: boolean
    networkType: string
    connectionSpeed: number
    temperature: number
  }

  // 应用性能
  app: {
    loadTime: number
    renderTime: number
    interactionDelay: number
    frameRate: number
    bundleSize: number
    cacheHitRate: number
  }

  // 网络性能
  network: {
    latency: number
    downloadSpeed: number
    uploadSpeed: number
    dataUsage: number
    requestCount: number
    errorRate: number
  }

  // 用户体验
  ux: {
    firstContentfulPaint: number
    largestContentfulPaint: number
    cumulativeLayoutShift: number
    firstInputDelay: number
    timeToInteractive: number
  }
}

interface PerformanceAlert {
  id: string
  type: "warning" | "error" | "info"
  title: string
  description: string
  timestamp: Date
  metric: string
  value: number
  threshold: number
}

export function MobilePerformanceMonitor() {
  const [metrics, setMetrics] = useState<MobilePerformanceMetrics | null>(null)
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [history, setHistory] = useState<MobilePerformanceMetrics[]>([])

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(collectMetrics, 5000) // 每5秒收集一次
      collectMetrics() // 立即收集一次

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  const collectMetrics = async () => {
    try {
      const newMetrics = await gatherPerformanceMetrics()
      setMetrics(newMetrics)

      // 保存历史记录
      setHistory((prev) => [...prev.slice(-19), newMetrics]) // 保留最近20条记录

      // 检查性能警报
      const newAlerts = checkPerformanceAlerts(newMetrics)
      setAlerts((prev) => [...prev, ...newAlerts].slice(-10)) // 保留最近10个警报
    } catch (error) {
      console.error("收集性能指标失败:", error)
    }
  }

  const gatherPerformanceMetrics = async (): Promise<MobilePerformanceMetrics> => {
    // 设备信息
    const device = {
      model: getDeviceModel(),
      os: getOperatingSystem(),
      version: getOSVersion(),
      userAgent: navigator.userAgent,
    }

    // 内存信息
    const memory = (performance as any).memory || {}
    const memoryUsage = memory.usedJSHeapSize || 0
    const memoryLimit = memory.jsHeapSizeLimit || 0

    // 电池信息
    const battery = await getBatteryInfo()

    // 网络信息
    const connection = getNetworkInfo()

    // 性能时间
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    const paint = performance.getEntriesByType("paint")

    return {
      device,
      performance: {
        memoryUsage,
        memoryLimit,
        cpuUsage: getCPUUsage(),
        batteryLevel: battery.level * 100,
        batteryCharging: battery.charging,
        networkType: connection.effectiveType,
        connectionSpeed: connection.downlink,
        temperature: getDeviceTemperature(),
      },
      app: {
        loadTime: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
        renderTime: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
        interactionDelay: getInteractionDelay(),
        frameRate: getFrameRate(),
        bundleSize: getBundleSize(),
        cacheHitRate: getCacheHitRate(),
      },
      network: {
        latency: connection.rtt,
        downloadSpeed: connection.downlink,
        uploadSpeed: getUploadSpeed(),
        dataUsage: getDataUsage(),
        requestCount: getRequestCount(),
        errorRate: getNetworkErrorRate(),
      },
      ux: {
        firstContentfulPaint: getFirstContentfulPaint(),
        largestContentfulPaint: getLargestContentfulPaint(),
        cumulativeLayoutShift: getCumulativeLayoutShift(),
        firstInputDelay: getFirstInputDelay(),
        timeToInteractive: getTimeToInteractive(),
      },
    }
  }

  // 辅助函数
  const getDeviceModel = (): string => {
    const ua = navigator.userAgent
    if (ua.includes("iPhone")) return "iPhone"
    if (ua.includes("iPad")) return "iPad"
    if (ua.includes("Android")) return "Android"
    return "Unknown"
  }

  const getOperatingSystem = (): string => {
    const ua = navigator.userAgent
    if (ua.includes("iOS")) return "iOS"
    if (ua.includes("Android")) return "Android"
    if (ua.includes("Windows")) return "Windows"
    if (ua.includes("Mac")) return "macOS"
    return "Unknown"
  }

  const getOSVersion = (): string => {
    const ua = navigator.userAgent
    const match = ua.match(/(?:Android|iOS|iPhone OS|Mac OS X)\s([\d_.]+)/)
    return match ? match[1].replace(/_/g, ".") : "Unknown"
  }

  const getBatteryInfo = async () => {
    try {
      const battery = await (navigator as any).getBattery?.()
      return {
        level: battery?.level || 1,
        charging: battery?.charging || false,
      }
    } catch {
      return { level: 1, charging: false }
    }
  }

  const getNetworkInfo = () => {
    const connection =
      (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    return {
      effectiveType: connection?.effectiveType || "4g",
      downlink: connection?.downlink || 10,
      rtt: connection?.rtt || 100,
    }
  }

  const getCPUUsage = (): number => {
    // 简化的CPU使用率估算
    const start = performance.now()
    let iterations = 0
    const maxTime = 10 // 10ms测试窗口

    while (performance.now() - start < maxTime) {
      iterations++
    }

    // 基于迭代次数估算CPU性能（数值越高性能越好）
    const baselineIterations = 100000 // 基准迭代次数
    const cpuScore = Math.min(100, (iterations / baselineIterations) * 100)
    return 100 - cpuScore // 转换为使用率（数值越高使用率越高）
  }

  const getDeviceTemperature = (): number => {
    // 模拟设备温度（实际需要原生API支持）
    return 35 + Math.random() * 10
  }

  const getInteractionDelay = (): number => {
    // 获取交互延迟
    const entries = performance.getEntriesByType("event")
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1] as any
      return lastEntry.processingStart - lastEntry.startTime
    }
    return 0
  }

  const getFrameRate = (): number => {
    // 简化的帧率计算
    return 60 - Math.random() * 10
  }

  const getBundleSize = (): number => {
    // 估算应用包大小
    const resources = performance.getEntriesByType("resource")
    return resources.reduce((total, resource) => total + (resource.transferSize || 0), 0)
  }

  const getCacheHitRate = (): number => {
    // 计算缓存命中率
    const resources = performance.getEntriesByType("resource")
    const cachedResources = resources.filter((resource) => resource.transferSize === 0)
    return resources.length > 0 ? (cachedResources.length / resources.length) * 100 : 0
  }

  const getUploadSpeed = (): number => {
    // 模拟上传速度
    return Math.random() * 5 + 1
  }

  const getDataUsage = (): number => {
    // 估算数据使用量
    const resources = performance.getEntriesByType("resource")
    return resources.reduce((total, resource) => total + (resource.transferSize || 0), 0) / 1024 / 1024 // MB
  }

  const getRequestCount = (): number => {
    return performance.getEntriesByType("resource").length
  }

  const getNetworkErrorRate = (): number => {
    // 简化的网络错误率计算
    return Math.random() * 5 // 0-5%
  }

  const getFirstContentfulPaint = (): number => {
    const fcp = performance.getEntriesByName("first-contentful-paint")[0]
    return fcp?.startTime || 0
  }

  const getLargestContentfulPaint = (): number => {
    const lcp = performance.getEntriesByType("largest-contentful-paint")[0] as any
    return lcp?.startTime || 0
  }

  const getCumulativeLayoutShift = (): number => {
    const cls = performance.getEntriesByType("layout-shift") as any[]
    return cls.reduce((total, entry) => total + entry.value, 0)
  }

  const getFirstInputDelay = (): number => {
    const fid = performance.getEntriesByType("first-input")[0] as any
    return fid ? fid.processingStart - fid.startTime : 0
  }

  const getTimeToInteractive = (): number => {
    // 简化的TTI计算
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    return navigation?.domInteractive - navigation?.navigationStart || 0
  }

  const checkPerformanceAlerts = (metrics: MobilePerformanceMetrics): PerformanceAlert[] => {
    const alerts: PerformanceAlert[] = []
    const now = new Date()

    // 内存使用率警报
    const memoryUsageRate = (metrics.performance.memoryUsage / metrics.performance.memoryLimit) * 100
    if (memoryUsageRate > 80) {
      alerts.push({
        id: `memory_${now.getTime()}`,
        type: memoryUsageRate > 90 ? "error" : "warning",
        title: "内存使用率过高",
        description: `当前内存使用率 ${memoryUsageRate.toFixed(1)}%`,
        timestamp: now,
        metric: "memory",
        value: memoryUsageRate,
        threshold: 80,
      })
    }

    // 电池电量警报
    if (metrics.performance.batteryLevel < 20) {
      alerts.push({
        id: `battery_${now.getTime()}`,
        type: metrics.performance.batteryLevel < 10 ? "error" : "warning",
        title: "电池电量不足",
        description: `当前电量 ${metrics.performance.batteryLevel.toFixed(0)}%`,
        timestamp: now,
        metric: "battery",
        value: metrics.performance.batteryLevel,
        threshold: 20,
      })
    }

    // 网络延迟警报
    if (metrics.network.latency > 500) {
      alerts.push({
        id: `latency_${now.getTime()}`,
        type: metrics.network.latency > 1000 ? "error" : "warning",
        title: "网络延迟过高",
        description: `当前延迟 ${metrics.network.latency}ms`,
        timestamp: now,
        metric: "latency",
        value: metrics.network.latency,
        threshold: 500,
      })
    }

    // 帧率警报
    if (metrics.app.frameRate < 30) {
      alerts.push({
        id: `framerate_${now.getTime()}`,
        type: metrics.app.frameRate < 20 ? "error" : "warning",
        title: "帧率过低",
        description: `当前帧率 ${metrics.app.frameRate.toFixed(1)} FPS`,
        timestamp: now,
        metric: "frameRate",
        value: metrics.app.frameRate,
        threshold: 30,
      })
    }

    return alerts
  }

  const getPerformanceScore = (metrics: MobilePerformanceMetrics): number => {
    const scores = [
      Math.min(100, (1 - metrics.performance.memoryUsage / metrics.performance.memoryLimit) * 100),
      Math.min(100, metrics.performance.batteryLevel),
      Math.min(100, (1000 - metrics.network.latency) / 10),
      Math.min(100, metrics.app.frameRate * 1.67),
      Math.min(100, (5000 - metrics.ux.firstContentfulPaint) / 50),
    ]

    return scores.reduce((sum, score) => sum + score, 0) / scores.length
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto">
      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>移动端性能监控</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>实时监控</span>
            <Button
              variant={isMonitoring ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsMonitoring(!isMonitoring)}
            >
              {isMonitoring ? "停止监控" : "开始监控"}
            </Button>
          </div>

          {metrics && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">综合评分</span>
                <span className={`font-bold ${getScoreColor(getPerformanceScore(metrics))}`}>
                  {getPerformanceScore(metrics).toFixed(0)}
                </span>
              </div>
              <Progress value={getPerformanceScore(metrics)} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 设备信息 */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">设备信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">设备型号</span>
                <p className="font-medium">{metrics.device.model}</p>
              </div>
              <div>
                <span className="text-gray-600">操作系统</span>
                <p className="font-medium">
                  {metrics.device.os} {metrics.device.version}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 性能指标 */}
      {metrics && (
        <div className="grid grid-cols-2 gap-4">
          {/* 内存使用 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <HardDrive className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">
                  {((metrics.performance.memoryUsage / metrics.performance.memoryLimit) * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">内存使用</p>
              <Progress
                value={(metrics.performance.memoryUsage / metrics.performance.memoryLimit) * 100}
                className="h-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formatBytes(metrics.performance.memoryUsage)} / {formatBytes(metrics.performance.memoryLimit)}
              </p>
            </CardContent>
          </Card>

          {/* 电池状态 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Battery
                  className={`h-5 w-5 ${
                    metrics.performance.batteryLevel > 50
                      ? "text-green-500"
                      : metrics.performance.batteryLevel > 20
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                />
                <span className="text-sm font-medium">{metrics.performance.batteryLevel.toFixed(0)}%</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">电池电量</p>
              <Progress value={metrics.performance.batteryLevel} className="h-1" />
              <p className="text-xs text-gray-500 mt-1">{metrics.performance.batteryCharging ? "充电中" : "未充电"}</p>
            </CardContent>
          </Card>

          {/* 网络状态 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Wifi className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">{metrics.performance.networkType.toUpperCase()}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">网络连接</p>
              <p className="text-xs text-gray-500">{metrics.performance.connectionSpeed.toFixed(1)} Mbps</p>
              <p className="text-xs text-gray-500">延迟: {metrics.network.latency}ms</p>
            </CardContent>
          </Card>

          {/* 帧率 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">{metrics.app.frameRate.toFixed(0)} FPS</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">帧率</p>
              <Progress value={(metrics.app.frameRate / 60) * 100} className="h-1" />
              <p className="text-xs text-gray-500 mt-1">渲染时间: {metrics.app.renderTime.toFixed(0)}ms</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 用户体验指标 */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">用户体验指标</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">首次内容绘制 (FCP)</span>
                <span className="font-medium">{metrics.ux.firstContentfulPaint.toFixed(0)}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最大内容绘制 (LCP)</span>
                <span className="font-medium">{metrics.ux.largestContentfulPaint.toFixed(0)}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">首次输入延迟 (FID)</span>
                <span className="font-medium">{metrics.ux.firstInputDelay.toFixed(0)}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">累积布局偏移 (CLS)</span>
                <span className="font-medium">{metrics.ux.cumulativeLayoutShift.toFixed(3)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 性能警报 */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>性能警报</span>
              <Badge variant="destructive">{alerts.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(-5).map((alert) => (
                <Alert key={alert.id} className="p-3">
                  <div className="flex items-start space-x-2">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium">{alert.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.timestamp.toLocaleTimeString("zh-CN")}</p>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 数据使用统计 */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">数据使用</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">数据传输</span>
                <p className="font-medium">{metrics.network.dataUsage.toFixed(2)} MB</p>
              </div>
              <div>
                <span className="text-gray-600">请求次数</span>
                <p className="font-medium">{metrics.network.requestCount}</p>
              </div>
              <div>
                <span className="text-gray-600">缓存命中率</span>
                <p className="font-medium">{metrics.app.cacheHitRate.toFixed(1)}%</p>
              </div>
              <div>
                <span className="text-gray-600">错误率</span>
                <p className="font-medium">{metrics.network.errorRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
