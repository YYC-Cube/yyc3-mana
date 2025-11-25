"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Activity, Clock, Zap, TrendingUp, AlertTriangle, CheckCircle, Wifi, Monitor, Database } from "lucide-react"
import { performanceMonitor } from "@/lib/performance-monitor"

interface PerformanceMetric {
  id: string
  name: string
  category: string
  duration?: number
  timestamp: number
  status: "measuring" | "completed" | "error"
  error?: string
}

interface PerformanceStats {
  totalCount: number
  completedCount: number
  errorCount: number
  averageDuration: number
  minDuration: number
  maxDuration: number
  p95Duration: number
  successRate: number
}

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [stats, setStats] = useState<PerformanceStats | null>(null)
  const [systemPerf, setSystemPerf] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 订阅性能指标更新
    const unsubscribe = performanceMonitor.subscribe((newMetrics) => {
      setMetrics(newMetrics)
    })

    // 定期更新统计信息
    const updateStats = () => {
      const statistics = performanceMonitor.getStatistics()
      setStats(statistics)

      const systemPerformance = performanceMonitor.getSystemPerformance()
      setSystemPerf(systemPerformance)
    }

    updateStats()
    const interval = setInterval(updateStats, 5000)

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [])

  // 获取性能等级
  const getPerformanceGrade = (avgDuration: number): { grade: string; color: string } => {
    if (avgDuration < 100) return { grade: "优秀", color: "text-green-600" }
    if (avgDuration < 300) return { grade: "良好", color: "text-blue-600" }
    if (avgDuration < 1000) return { grade: "一般", color: "text-yellow-600" }
    return { grade: "需优化", color: "text-red-600" }
  }

  // 格式化内存大小
  const formatMemory = (bytes: number): string => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  // 获取网络类型显示
  const getNetworkDisplay = (effectiveType: string): string => {
    const networkTypes: Record<string, string> = {
      "slow-2g": "2G慢速",
      "2g": "2G",
      "3g": "3G",
      "4g": "4G",
      unknown: "未知",
    }
    return networkTypes[effectiveType] || effectiveType
  }

  if (!stats) return null

  const performanceGrade = getPerformanceGrade(stats.averageDuration)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Activity className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">性能</span>
          <Badge variant="outline" className={`ml-2 ${performanceGrade.color} border-current`}>
            {performanceGrade.grade}
          </Badge>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>系统性能监控</span>
          </DialogTitle>
          <DialogDescription>实时监控系统性能指标和用户体验数据</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="metrics">性能指标</TabsTrigger>
            <TabsTrigger value="system">系统信息</TabsTrigger>
            <TabsTrigger value="history">历史记录</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* 核心性能指标 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.averageDuration.toFixed(0)}ms</p>
                      <p className="text-sm text-gray-600">平均响应时间</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{(stats.successRate * 100).toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">成功率</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.p95Duration.toFixed(0)}ms</p>
                      <p className="text-sm text-gray-600">P95响应时间</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.errorCount}</p>
                      <p className="text-sm text-gray-600">错误次数</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 性能等级 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>性能评级</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold ${performanceGrade.color}`}>{performanceGrade.grade}</h3>
                    <p className="text-sm text-gray-600">基于平均响应时间 {stats.averageDuration.toFixed(0)}ms</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">总请求数</p>
                    <p className="text-xl font-semibold">{stats.totalCount}</p>
                  </div>
                </div>

                {/* 性能分布 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>最快响应</span>
                    <span>{stats.minDuration.toFixed(0)}ms</span>
                  </div>
                  <Progress value={(stats.minDuration / stats.maxDuration) * 100} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>最慢响应</span>
                    <span>{stats.maxDuration.toFixed(0)}ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            {/* 按类别分组的性能指标 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["initialization", "sync", "ui", "network"].map((category) => {
                const categoryStats = performanceMonitor.getStatistics(category)
                if (categoryStats.totalCount === 0) return null

                return (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-lg capitalize">
                        {category === "initialization" && "初始化"}
                        {category === "sync" && "数据同步"}
                        {category === "ui" && "用户界面"}
                        {category === "network" && "网络请求"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">平均时间</span>
                          <span className="font-medium">{categoryStats.averageDuration.toFixed(0)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">成功率</span>
                          <span className="font-medium">{(categoryStats.successRate * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">总次数</span>
                          <span className="font-medium">{categoryStats.totalCount}</span>
                        </div>
                        <Progress value={categoryStats.successRate * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            {systemPerf && (
              <>
                {/* 页面加载性能 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Monitor className="w-5 h-5" />
                      <span>页面加载性能</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">DOM内容加载</p>
                        <p className="text-lg font-semibold">{systemPerf.pageLoad.domContentLoaded.toFixed(0)}ms</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">页面完全加载</p>
                        <p className="text-lg font-semibold">{systemPerf.pageLoad.loadComplete.toFixed(0)}ms</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">首次绘制</p>
                        <p className="text-lg font-semibold">{systemPerf.pageLoad.firstPaint.toFixed(0)}ms</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">首次内容绘制</p>
                        <p className="text-lg font-semibold">{systemPerf.pageLoad.firstContentfulPaint.toFixed(0)}ms</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 内存使用情况 */}
                {systemPerf.memory && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Database className="w-5 h-5" />
                        <span>内存使用情况</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>已使用内存</span>
                          <span className="font-semibold">{formatMemory(systemPerf.memory.used)}</span>
                        </div>
                        <Progress value={(systemPerf.memory.used / systemPerf.memory.total) * 100} className="h-3" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>总内存: {formatMemory(systemPerf.memory.total)}</span>
                          <span>限制: {formatMemory(systemPerf.memory.limit)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 网络信息 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Wifi className="w-5 h-5" />
                      <span>网络信息</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">网络类型</p>
                        <p className="text-lg font-semibold">{getNetworkDisplay(systemPerf.network.effectiveType)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">下行速度</p>
                        <p className="text-lg font-semibold">{systemPerf.network.downlink} Mbps</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">往返时间</p>
                        <p className="text-lg font-semibold">{systemPerf.network.rtt}ms</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">省流模式</p>
                        <p className="text-lg font-semibold">{systemPerf.network.saveData ? "开启" : "关闭"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {/* 最近的性能记录 */}
            <Card>
              <CardHeader>
                <CardTitle>最近性能记录</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {metrics.slice(0, 20).map((metric) => (
                    <div key={metric.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{metric.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(metric.timestamp).toLocaleTimeString("zh-CN")}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {metric.category}
                        </Badge>
                        {metric.status === "completed" && metric.duration && (
                          <span className="text-sm font-medium">{metric.duration.toFixed(0)}ms</span>
                        )}
                        {metric.status === "error" && (
                          <Badge variant="destructive" className="text-xs">
                            错误
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
