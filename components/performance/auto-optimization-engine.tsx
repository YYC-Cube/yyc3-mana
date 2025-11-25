"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Database,
  Settings,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  Plus,
} from "lucide-react"

interface PerformanceMetric {
  id: string
  name: string
  category: "cpu" | "memory" | "disk" | "network" | "database" | "api"
  currentValue: number
  targetValue: number
  unit: string
  status: "optimal" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  lastOptimized: Date
  autoOptimize: boolean
}

interface OptimizationRule {
  id: string
  name: string
  description: string
  condition: string
  action: string
  enabled: boolean
  priority: "high" | "medium" | "low"
  executionCount: number
  lastExecuted?: Date
  successRate: number
}

interface OptimizationTask {
  id: string
  name: string
  type: "cache" | "query" | "resource" | "network" | "storage"
  status: "pending" | "running" | "completed" | "failed"
  progress: number
  estimatedTime: number
  impact: string
  startTime: Date
  endTime?: Date
}

export function AutoOptimizationEngine() {
  const [metrics] = useState<PerformanceMetric[]>([
    {
      id: "cpu_usage",
      name: "CPU使用率",
      category: "cpu",
      currentValue: 68.5,
      targetValue: 70,
      unit: "%",
      status: "optimal",
      trend: "stable",
      lastOptimized: new Date(Date.now() - 3600000),
      autoOptimize: true,
    },
    {
      id: "memory_usage",
      name: "内存使用率",
      category: "memory",
      currentValue: 82.3,
      targetValue: 80,
      unit: "%",
      status: "warning",
      trend: "up",
      lastOptimized: new Date(Date.now() - 1800000),
      autoOptimize: true,
    },
    {
      id: "disk_io",
      name: "磁盘I/O",
      category: "disk",
      currentValue: 156.7,
      targetValue: 200,
      unit: "MB/s",
      status: "optimal",
      trend: "down",
      lastOptimized: new Date(Date.now() - 7200000),
      autoOptimize: false,
    },
    {
      id: "network_latency",
      name: "网络延迟",
      category: "network",
      currentValue: 45.2,
      targetValue: 50,
      unit: "ms",
      status: "optimal",
      trend: "stable",
      lastOptimized: new Date(Date.now() - 900000),
      autoOptimize: true,
    },
    {
      id: "db_query_time",
      name: "数据库查询时间",
      category: "database",
      currentValue: 234.8,
      targetValue: 200,
      unit: "ms",
      status: "warning",
      trend: "up",
      lastOptimized: new Date(Date.now() - 2700000),
      autoOptimize: true,
    },
    {
      id: "api_response_time",
      name: "API响应时间",
      category: "api",
      currentValue: 189.3,
      targetValue: 150,
      unit: "ms",
      status: "critical",
      trend: "up",
      lastOptimized: new Date(Date.now() - 1200000),
      autoOptimize: true,
    },
  ])

  const [rules] = useState<OptimizationRule[]>([
    {
      id: "rule_1",
      name: "内存清理规则",
      description: "当内存使用率超过80%时自动清理缓存",
      condition: "memory_usage > 80%",
      action: "清理系统缓存和临时文件",
      enabled: true,
      priority: "high",
      executionCount: 23,
      lastExecuted: new Date(Date.now() - 1800000),
      successRate: 94.2,
    },
    {
      id: "rule_2",
      name: "数据库优化规则",
      description: "查询时间超过200ms时优化索引",
      condition: "db_query_time > 200ms",
      action: "重建索引和优化查询计划",
      enabled: true,
      priority: "medium",
      executionCount: 15,
      lastExecuted: new Date(Date.now() - 2700000),
      successRate: 87.5,
    },
    {
      id: "rule_3",
      name: "API缓存规则",
      description: "API响应时间超过150ms时启用缓存",
      condition: "api_response_time > 150ms",
      action: "启用Redis缓存和CDN加速",
      enabled: true,
      priority: "high",
      executionCount: 31,
      lastExecuted: new Date(Date.now() - 1200000),
      successRate: 96.8,
    },
    {
      id: "rule_4",
      name: "资源扩容规则",
      description: "CPU使用率持续超过90%时自动扩容",
      condition: "cpu_usage > 90% for 5min",
      action: "自动增加服务器实例",
      enabled: false,
      priority: "high",
      executionCount: 3,
      successRate: 100,
    },
  ])

  const [tasks, setTasks] = useState<OptimizationTask[]>([
    {
      id: "task_1",
      name: "内存缓存清理",
      type: "cache",
      status: "running",
      progress: 65,
      estimatedTime: 120,
      impact: "预计释放1.2GB内存",
      startTime: new Date(Date.now() - 78000),
    },
    {
      id: "task_2",
      name: "数据库索引重建",
      type: "query",
      status: "pending",
      progress: 0,
      estimatedTime: 300,
      impact: "预计提升查询性能30%",
      startTime: new Date(),
    },
    {
      id: "task_3",
      name: "CDN缓存预热",
      type: "network",
      status: "completed",
      progress: 100,
      estimatedTime: 180,
      impact: "API响应时间减少40ms",
      startTime: new Date(Date.now() - 600000),
      endTime: new Date(Date.now() - 420000),
    },
  ])

  const [autoOptimizeEnabled, setAutoOptimizeEnabled] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // 生成性能历史数据
  const performanceHistory = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      cpu: Math.random() * 30 + 50,
      memory: Math.random() * 20 + 70,
      disk: Math.random() * 100 + 100,
      network: Math.random() * 20 + 30,
      database: Math.random() * 100 + 150,
      api: Math.random() * 80 + 120,
    }))
  }, [])

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
      case "completed":
        return "bg-green-100 text-green-800"
      case "warning":
      case "running":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
      case "failed":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取趋势图标
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  // 获取类别图标
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cpu":
        return <Cpu className="w-5 h-5 text-blue-600" />
      case "memory":
        return <HardDrive className="w-5 h-5 text-green-600" />
      case "disk":
        return <HardDrive className="w-5 h-5 text-purple-600" />
      case "network":
        return <Wifi className="w-5 h-5 text-orange-600" />
      case "database":
        return <Database className="w-5 h-5 text-red-600" />
      case "api":
        return <Zap className="w-5 h-5 text-yellow-600" />
      default:
        return <Activity className="w-5 h-5 text-gray-600" />
    }
  }

  // 获取任务类型图标
  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "cache":
        return <RefreshCw className="w-4 h-4 text-blue-600" />
      case "query":
        return <Database className="w-4 h-4 text-green-600" />
      case "resource":
        return <Cpu className="w-4 h-4 text-purple-600" />
      case "network":
        return <Wifi className="w-4 h-4 text-orange-600" />
      case "storage":
        return <HardDrive className="w-4 h-4 text-red-600" />
      default:
        return <Settings className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredMetrics = selectedCategory === "all" ? metrics : metrics.filter((m) => m.category === selectedCategory)

  // 模拟任务进度更新
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.status === "running" && task.progress < 100) {
            const newProgress = Math.min(task.progress + Math.random() * 10, 100)
            return {
              ...task,
              progress: newProgress,
              status: newProgress >= 100 ? "completed" : "running",
              endTime: newProgress >= 100 ? new Date() : undefined,
            }
          }
          return task
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Zap className="w-8 h-8 mr-3 text-yellow-600" />
            自动优化引擎
          </h1>
          <p className="text-muted-foreground">智能监控系统性能并自动执行优化策略</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch checked={autoOptimizeEnabled} onCheckedChange={setAutoOptimizeEnabled} />
            <Label>自动优化</Label>
          </div>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            配置规则
          </Button>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white">
            <Play className="w-4 h-4 mr-2" />
            立即优化
          </Button>
        </div>
      </div>

      {/* 性能概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center">
                  {getCategoryIcon(metric.category)}
                  <span className="ml-2 text-sm">{metric.name}</span>
                </div>
                {getTrendIcon(metric.trend)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.currentValue.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                </div>
                <Progress
                  value={(metric.currentValue / metric.targetValue) * 100}
                  className="h-2"
                  // @ts-ignore
                  indicatorClassName={
                    metric.status === "optimal"
                      ? "bg-green-500"
                      : metric.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }
                />
                <div className="flex items-center justify-between text-xs">
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status === "optimal" ? "正常" : metric.status === "warning" ? "警告" : "严重"}
                  </Badge>
                  <span className="text-muted-foreground">
                    目标: {metric.targetValue}
                    {metric.unit}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">性能概览</TabsTrigger>
          <TabsTrigger value="rules">优化规则</TabsTrigger>
          <TabsTrigger value="tasks">执行任务</TabsTrigger>
          <TabsTrigger value="history">历史记录</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择性能类别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有指标</SelectItem>
                <SelectItem value="cpu">CPU</SelectItem>
                <SelectItem value="memory">内存</SelectItem>
                <SelectItem value="disk">磁盘</SelectItem>
                <SelectItem value="network">网络</SelectItem>
                <SelectItem value="database">数据库</SelectItem>
                <SelectItem value="api">API</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 实时性能监控 */}
            <Card>
              <CardHeader>
                <CardTitle>实时性能监控</CardTitle>
                <CardDescription>过去24小时的性能指标变化</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU" />
                    <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} name="内存" />
                    <Line type="monotone" dataKey="api" stroke="#f59e0b" strokeWidth={2} name="API" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 优化效果统计 */}
            <Card>
              <CardHeader>
                <CardTitle>优化效果统计</CardTitle>
                <CardDescription>自动优化带来的性能提升</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">23%</div>
                      <p className="text-sm text-muted-foreground">性能提升</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">156</div>
                      <p className="text-sm text-muted-foreground">优化次数</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">2.3GB</div>
                      <p className="text-sm text-muted-foreground">节省资源</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">94.2%</div>
                      <p className="text-sm text-muted-foreground">成功率</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 详细指标列表 */}
          <Card>
            <CardHeader>
              <CardTitle>详细性能指标</CardTitle>
              <CardDescription>当前系统各项性能指标详情</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getCategoryIcon(metric.category)}
                      <div>
                        <h4 className="font-medium">{metric.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          最后优化: {metric.lastOptimized.toLocaleString("zh-CN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {metric.currentValue.toFixed(1)} {metric.unit}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          目标: {metric.targetValue} {metric.unit}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status === "optimal" ? "正常" : metric.status === "warning" ? "警告" : "严重"}
                        </Badge>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={metric.autoOptimize} />
                        <Label className="text-sm">自动优化</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">优化规则管理</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              添加规则
            </Button>
          </div>

          <div className="grid gap-6">
            {rules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <CardDescription>{rule.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          rule.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : rule.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {rule.priority === "high" ? "高优先级" : rule.priority === "medium" ? "中优先级" : "低优先级"}
                      </Badge>
                      <Switch checked={rule.enabled} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">触发条件</Label>
                        <code className="block text-sm bg-gray-100 p-2 rounded mt-1">{rule.condition}</code>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">执行动作</Label>
                        <p className="text-sm mt-1">{rule.action}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">执行次数</Label>
                        <p className="font-medium">{rule.executionCount} 次</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">成功率</Label>
                        <p className="font-medium">{rule.successRate}%</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">最后执行</Label>
                        <p className="font-medium">
                          {rule.lastExecuted ? rule.lastExecuted.toLocaleString("zh-CN") : "从未执行"}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        测试执行
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        执行历史
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">优化任务</h3>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Pause className="w-4 h-4 mr-2" />
                暂停所有
              </Button>
              <Button>
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新状态
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getTaskTypeIcon(task.type)}
                      <div>
                        <CardTitle className="text-lg">{task.name}</CardTitle>
                        <CardDescription>{task.impact}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status === "pending"
                        ? "等待中"
                        : task.status === "running"
                          ? "执行中"
                          : task.status === "completed"
                            ? "已完成"
                            : "失败"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 进度条 */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>执行进度</span>
                        <span>{task.progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>

                    {/* 任务信息 */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">开始时间</p>
                        <p className="font-medium">{task.startTime.toLocaleString("zh-CN")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">预计时间</p>
                        <p className="font-medium">{task.estimatedTime}秒</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">任务类型</p>
                        <p className="font-medium capitalize">
                          {task.type === "cache"
                            ? "缓存优化"
                            : task.type === "query"
                              ? "查询优化"
                              : task.type === "resource"
                                ? "资源优化"
                                : task.type === "network"
                                  ? "网络优化"
                                  : "存储优化"}
                        </p>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex space-x-2">
                      {task.status === "running" && (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-2" />
                          暂停
                        </Button>
                      )}
                      {task.status === "pending" && (
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          开始
                        </Button>
                      )}
                      {task.status === "failed" && (
                        <Button size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          重试
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Activity className="w-4 h-4 mr-2" />
                        查看日志
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>优化历史记录</CardTitle>
              <CardDescription>过去30天的自动优化执行记录</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="cpu" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Area type="monotone" dataKey="disk" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 优化统计 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>本月优化次数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">156</div>
                <p className="text-sm text-muted-foreground">比上月增加23%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>平均性能提升</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">23.4%</div>
                <p className="text-sm text-muted-foreground">系统整体性能</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>节省资源成本</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">¥12,450</div>
                <p className="text-sm text-muted-foreground">本月节省金额</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
