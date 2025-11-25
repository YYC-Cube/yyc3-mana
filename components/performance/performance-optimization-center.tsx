"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  HardDrive,
  Network,
  Settings,
  Play,
  Pause,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Target,
  Gauge,
  MaximizeIcon as Optimize,
  Database,
} from "lucide-react"

interface PerformanceMetric {
  id: string
  name: string
  value: number
  unit: string
  status: "excellent" | "good" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  target: number
  impact: "high" | "medium" | "low"
}

interface OptimizationRule {
  id: string
  name: string
  description: string
  category: "frontend" | "backend" | "database" | "network"
  enabled: boolean
  impact: "high" | "medium" | "low"
  complexity: "easy" | "medium" | "hard"
  estimatedGain: number
}

export function PerformanceOptimizationCenter() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([
    {
      id: "page_load",
      name: "页面加载时间",
      value: 2.3,
      unit: "秒",
      status: "good",
      trend: "down",
      target: 2.0,
      impact: "high",
    },
    {
      id: "first_paint",
      name: "首次绘制",
      value: 1.2,
      unit: "秒",
      status: "excellent",
      trend: "stable",
      target: 1.5,
      impact: "high",
    },
    {
      id: "interactive",
      name: "可交互时间",
      value: 3.8,
      unit: "秒",
      status: "warning",
      trend: "up",
      target: 3.0,
      impact: "high",
    },
    {
      id: "bundle_size",
      name: "包大小",
      value: 2.1,
      unit: "MB",
      status: "good",
      trend: "stable",
      target: 2.0,
      impact: "medium",
    },
    {
      id: "memory_usage",
      name: "内存使用",
      value: 45.2,
      unit: "MB",
      status: "good",
      trend: "down",
      target: 50.0,
      impact: "medium",
    },
    {
      id: "api_response",
      name: "API响应时间",
      value: 180,
      unit: "ms",
      status: "good",
      trend: "stable",
      target: 200,
      impact: "high",
    },
  ])

  const [optimizationRules, setOptimizationRules] = useState<OptimizationRule[]>([
    {
      id: "lazy_loading",
      name: "图片懒加载",
      description: "对页面中的图片实施懒加载，减少初始加载时间",
      category: "frontend",
      enabled: true,
      impact: "high",
      complexity: "easy",
      estimatedGain: 25,
    },
    {
      id: "code_splitting",
      name: "代码分割",
      description: "将代码按路由分割，减少初始包大小",
      category: "frontend",
      enabled: true,
      impact: "high",
      complexity: "medium",
      estimatedGain: 30,
    },
    {
      id: "cache_optimization",
      name: "缓存优化",
      description: "优化浏览器缓存策略，提升重复访问性能",
      category: "frontend",
      enabled: false,
      impact: "medium",
      complexity: "easy",
      estimatedGain: 20,
    },
    {
      id: "api_caching",
      name: "API缓存",
      description: "实施API响应缓存，减少服务器负载",
      category: "backend",
      enabled: true,
      impact: "high",
      complexity: "medium",
      estimatedGain: 40,
    },
    {
      id: "database_indexing",
      name: "数据库索引优化",
      description: "优化数据库查询索引，提升查询性能",
      category: "database",
      enabled: false,
      impact: "high",
      complexity: "hard",
      estimatedGain: 50,
    },
    {
      id: "cdn_optimization",
      name: "CDN优化",
      description: "使用CDN加速静态资源加载",
      category: "network",
      enabled: true,
      impact: "medium",
      complexity: "easy",
      estimatedGain: 35,
    },
  ])

  const [isOptimizing, setIsOptimizing] = useState(false)
  const [autoOptimization, setAutoOptimization] = useState(false)
  const [optimizationLevel, setOptimizationLevel] = useState([2])

  // 性能趋势数据
  const performanceTrend = [
    { time: "00:00", loadTime: 2.8, memory: 52, apiResponse: 220 },
    { time: "04:00", loadTime: 2.5, memory: 48, apiResponse: 195 },
    { time: "08:00", loadTime: 3.2, memory: 58, apiResponse: 245 },
    { time: "12:00", loadTime: 2.9, memory: 55, apiResponse: 210 },
    { time: "16:00", loadTime: 2.3, memory: 45, apiResponse: 180 },
    { time: "20:00", loadTime: 2.1, memory: 42, apiResponse: 165 },
  ]

  // 优化效果数据
  const optimizationEffect = [
    { metric: "页面加载", before: 3.5, after: 2.3, improvement: 34 },
    { metric: "首次绘制", before: 1.8, after: 1.2, improvement: 33 },
    { metric: "包大小", before: 3.2, after: 2.1, improvement: 34 },
    { metric: "内存使用", before: 68, after: 45, improvement: 34 },
    { metric: "API响应", before: 280, after: 180, improvement: 36 },
  ]

  // 资源使用分析
  const resourceUsage = [
    { category: "JavaScript", size: 850, percentage: 40, optimized: 680 },
    { category: "CSS", size: 320, percentage: 15, optimized: 240 },
    { category: "图片", size: 650, percentage: 30, optimized: 420 },
    { category: "字体", size: 180, percentage: 8, optimized: 150 },
    { category: "其他", size: 150, percentage: 7, optimized: 120 },
  ]

  useEffect(() => {
    // 模拟实时性能数据更新
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.max(0, metric.value + (Math.random() - 0.5) * 0.2),
          trend: Math.random() > 0.5 ? "up" : "down",
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100"
      case "good":
        return "text-blue-600 bg-blue-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4" />
      case "good":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "critical":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-600" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <Zap className="w-4 h-4" />
      case "backend":
        return <Database className="w-4 h-4" />
      case "database":
        return <HardDrive className="w-4 h-4" />
      case "network":
        return <Network className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  const runOptimization = async () => {
    setIsOptimizing(true)

    // 模拟优化过程
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      // 这里可以更新优化进度
    }

    // 应用优化效果
    setMetrics((prev) =>
      prev.map((metric) => ({
        ...metric,
        value: metric.value * 0.85, // 模拟15%的性能提升
        status: metric.value * 0.85 < metric.target ? "excellent" : metric.status,
      })),
    )

    setIsOptimizing(false)
  }

  const toggleRule = (ruleId: string) => {
    setOptimizationRules((prev) =>
      prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)),
    )
  }

  const getOverallScore = () => {
    const scores = metrics.map((metric) => {
      switch (metric.status) {
        case "excellent":
          return 100
        case "good":
          return 80
        case "warning":
          return 60
        case "critical":
          return 30
        default:
          return 50
      }
    })
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Zap className="w-8 h-8 mr-3 text-yellow-600" />
            性能优化中心
          </h1>
          <p className="text-muted-foreground">智能分析和优化系统性能表现</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm">自动优化</span>
            <Switch checked={autoOptimization} onCheckedChange={setAutoOptimization} />
          </div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新数据
          </Button>
          <Button onClick={runOptimization} disabled={isOptimizing}>
            {isOptimizing ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isOptimizing ? "优化中..." : "开始优化"}
          </Button>
        </div>
      </div>

      {/* 性能概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">性能评分</p>
                <p className="text-3xl font-bold text-green-600">{getOverallScore()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Gauge className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={getOverallScore()} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">优化建议</p>
                <p className="text-3xl font-bold text-blue-600">
                  {optimizationRules.filter((r) => !r.enabled && r.impact === "high").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">高影响优化项</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">已启用规则</p>
                <p className="text-3xl font-bold text-purple-600">
                  {optimizationRules.filter((r) => r.enabled).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Optimize className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">共 {optimizationRules.length} 个规则</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">预期提升</p>
                <p className="text-3xl font-bold text-orange-600">
                  {Math.round(
                    optimizationRules.filter((r) => r.enabled).reduce((sum, r) => sum + r.estimatedGain, 0) /
                      optimizationRules.filter((r) => r.enabled).length,
                  )}
                  %
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">平均性能提升</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="metrics">性能指标</TabsTrigger>
          <TabsTrigger value="optimization">优化规则</TabsTrigger>
          <TabsTrigger value="trends">趋势分析</TabsTrigger>
          <TabsTrigger value="resources">资源分析</TabsTrigger>
          <TabsTrigger value="settings">优化设置</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{metric.name}</CardTitle>
                    <Badge className={getStatusColor(metric.status)}>
                      {getStatusIcon(metric.status)}
                      <span className="ml-1">
                        {metric.status === "excellent"
                          ? "优秀"
                          : metric.status === "good"
                            ? "良好"
                            : metric.status === "warning"
                              ? "警告"
                              : "严重"}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold">
                        {metric.value.toFixed(metric.unit === "ms" ? 0 : 1)} {metric.unit}
                      </span>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>目标值</span>
                        <span>
                          {metric.target} {metric.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>影响程度</span>
                        <Badge variant="outline" className="text-xs">
                          {metric.impact === "high" ? "高" : metric.impact === "medium" ? "中" : "低"}
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={Math.min(100, (metric.target / Math.max(metric.value, metric.target)) * 100)}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {optimizationRules.map((rule) => (
              <Card key={rule.id} className={rule.enabled ? "border-green-200 bg-green-50" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          rule.category === "frontend"
                            ? "bg-blue-100 text-blue-600"
                            : rule.category === "backend"
                              ? "bg-green-100 text-green-600"
                              : rule.category === "database"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {getCategoryIcon(rule.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{rule.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {rule.category === "frontend"
                            ? "前端"
                            : rule.category === "backend"
                              ? "后端"
                              : rule.category === "database"
                                ? "数据库"
                                : "网络"}
                        </Badge>
                      </div>
                    </div>
                    <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                  </div>
                  <CardDescription>{rule.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">影响程度</p>
                        <Badge
                          variant="outline"
                          className={
                            rule.impact === "high"
                              ? "border-red-200 text-red-800"
                              : rule.impact === "medium"
                                ? "border-yellow-200 text-yellow-800"
                                : "border-green-200 text-green-800"
                          }
                        >
                          {rule.impact === "high" ? "高" : rule.impact === "medium" ? "中" : "低"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-gray-600">复杂度</p>
                        <Badge
                          variant="outline"
                          className={
                            rule.complexity === "hard"
                              ? "border-red-200 text-red-800"
                              : rule.complexity === "medium"
                                ? "border-yellow-200 text-yellow-800"
                                : "border-green-200 text-green-800"
                          }
                        >
                          {rule.complexity === "hard" ? "困难" : rule.complexity === "medium" ? "中等" : "简单"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-gray-600">预期提升</p>
                        <p className="font-bold text-green-600">{rule.estimatedGain}%</p>
                      </div>
                    </div>
                    <Progress value={rule.estimatedGain} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>性能趋势分析</CardTitle>
              <CardDescription>24小时性能指标变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  loadTime: {
                    label: "加载时间(秒)",
                    color: "hsl(var(--chart-1))",
                  },
                  memory: {
                    label: "内存使用(MB)",
                    color: "hsl(var(--chart-2))",
                  },
                  apiResponse: {
                    label: "API响应(ms)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="loadTime"
                      stroke="var(--color-loadTime)"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="memory"
                      stroke="var(--color-memory)"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="apiResponse"
                      stroke="var(--color-apiResponse)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>优化效果对比</CardTitle>
              <CardDescription>优化前后性能指标对比</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  before: {
                    label: "优化前",
                    color: "hsl(var(--chart-1))",
                  },
                  after: {
                    label: "优化后",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={optimizationEffect}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="before" fill="var(--color-before)" />
                    <Bar dataKey="after" fill="var(--color-after)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>资源使用分析</CardTitle>
              <CardDescription>各类资源的大小分布和优化潜力</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resourceUsage.map((resource) => (
                  <div key={resource.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{resource.category}</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">
                          {resource.size}KB → {resource.optimized}KB
                        </span>
                        <Badge className="bg-green-100 text-green-800">
                          -{Math.round(((resource.size - resource.optimized) / resource.size) * 100)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={resource.percentage} className="h-3" />
                      <Progress
                        value={(resource.optimized / resource.size) * resource.percentage}
                        className="h-3 absolute top-0 bg-green-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>资源加载瀑布图</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "HTML", time: 120, color: "bg-blue-500" },
                    { name: "CSS", time: 80, color: "bg-green-500" },
                    { name: "JavaScript", time: 200, color: "bg-yellow-500" },
                    { name: "图片", time: 150, color: "bg-purple-500" },
                    { name: "字体", time: 60, color: "bg-pink-500" },
                  ].map((item, index) => (
                    <div key={item.name} className="flex items-center space-x-3">
                      <span className="w-20 text-sm">{item.name}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div
                          className={`${item.color} h-4 rounded-full transition-all duration-500`}
                          style={{ width: `${(item.time / 200) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{item.time}ms</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>缓存命中率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "浏览器缓存", rate: 85 },
                    { type: "CDN缓存", rate: 92 },
                    { type: "API缓存", rate: 78 },
                    { type: "数据库缓存", rate: 88 },
                  ].map((cache) => (
                    <div key={cache.type} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{cache.type}</span>
                        <span className="text-sm text-gray-600">{cache.rate}%</span>
                      </div>
                      <Progress value={cache.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>优化设置</CardTitle>
              <CardDescription>配置自动优化参数和阈值</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">自动优化</h4>
                    <p className="text-sm text-gray-600">启用后系统将自动应用优化建议</p>
                  </div>
                  <Switch checked={autoOptimization} onCheckedChange={setAutoOptimization} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">优化级别</span>
                    <span className="text-sm text-gray-600">
                      {optimizationLevel[0] === 1 ? "保守" : optimizationLevel[0] === 2 ? "平衡" : "激进"}
                    </span>
                  </div>
                  <Slider
                    value={optimizationLevel}
                    onValueChange={setOptimizationLevel}
                    max={3}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>保守</span>
                    <span>平衡</span>
                    <span>激进</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">性能阈值</label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>页面加载时间</span>
                        <span>&lt; 3秒</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>API响应时间</span>
                        <span>&lt; 200ms</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">监控频率</label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>实时监控</span>
                        <span>每5秒</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>报告生成</span>
                        <span>每日</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
