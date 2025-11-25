"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import {
  Activity,
  Server,
  Globe,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Users,
  Eye,
  RefreshCw,
  Settings,
  Bell,
} from "lucide-react"

interface SystemMetric {
  id: string
  name: string
  value: number
  unit: string
  status: "healthy" | "warning" | "critical"
  threshold: {
    warning: number
    critical: number
  }
  trend: "up" | "down" | "stable"
  lastUpdated: Date
}

interface ServiceStatus {
  id: string
  name: string
  status: "online" | "offline" | "degraded"
  uptime: number
  responseTime: number
  lastCheck: Date
  endpoint: string
  dependencies: string[]
}

interface MonitoringAlert {
  id: string
  type: "error" | "warning" | "info"
  title: string
  description: string
  timestamp: Date
  resolved: boolean
  severity: "low" | "medium" | "high" | "critical"
  source: string
}

export function ProductionMonitoringDashboard() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      id: "cpu_usage",
      name: "CPU使用率",
      value: 45.2,
      unit: "%",
      status: "healthy",
      threshold: { warning: 70, critical: 90 },
      trend: "stable",
      lastUpdated: new Date(),
    },
    {
      id: "memory_usage",
      name: "内存使用率",
      value: 68.5,
      unit: "%",
      status: "warning",
      threshold: { warning: 70, critical: 85 },
      trend: "up",
      lastUpdated: new Date(),
    },
    {
      id: "disk_usage",
      name: "磁盘使用率",
      value: 42.1,
      unit: "%",
      status: "healthy",
      threshold: { warning: 80, critical: 95 },
      trend: "stable",
      lastUpdated: new Date(),
    },
    {
      id: "network_io",
      name: "网络IO",
      value: 125.8,
      unit: "MB/s",
      status: "healthy",
      threshold: { warning: 500, critical: 800 },
      trend: "down",
      lastUpdated: new Date(),
    },
    {
      id: "response_time",
      name: "响应时间",
      value: 245,
      unit: "ms",
      status: "healthy",
      threshold: { warning: 500, critical: 1000 },
      trend: "stable",
      lastUpdated: new Date(),
    },
    {
      id: "error_rate",
      name: "错误率",
      value: 0.8,
      unit: "%",
      status: "healthy",
      threshold: { warning: 2, critical: 5 },
      trend: "down",
      lastUpdated: new Date(),
    },
  ])

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      id: "web_server",
      name: "Web服务器",
      status: "online",
      uptime: 99.95,
      responseTime: 120,
      lastCheck: new Date(),
      endpoint: "https://api.example.com/health",
      dependencies: ["database", "cache"],
    },
    {
      id: "database",
      name: "数据库",
      status: "online",
      uptime: 99.98,
      responseTime: 45,
      lastCheck: new Date(),
      endpoint: "mysql://db.example.com:3306",
      dependencies: [],
    },
    {
      id: "cache",
      name: "缓存服务",
      status: "degraded",
      uptime: 98.5,
      responseTime: 15,
      lastCheck: new Date(),
      endpoint: "redis://cache.example.com:6379",
      dependencies: [],
    },
    {
      id: "file_storage",
      name: "文件存储",
      status: "online",
      uptime: 99.9,
      responseTime: 200,
      lastCheck: new Date(),
      endpoint: "https://storage.example.com",
      dependencies: [],
    },
  ])

  const [alerts, setAlerts] = useState<MonitoringAlert[]>([
    {
      id: "alert_1",
      type: "warning",
      title: "内存使用率偏高",
      description: "服务器内存使用率达到68.5%，接近警告阈值",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      resolved: false,
      severity: "medium",
      source: "system_monitor",
    },
    {
      id: "alert_2",
      type: "info",
      title: "缓存服务性能下降",
      description: "Redis缓存服务响应时间略有增加",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      resolved: false,
      severity: "low",
      source: "service_monitor",
    },
    {
      id: "alert_3",
      type: "error",
      title: "数据库连接异常",
      description: "检测到数据库连接池异常，已自动恢复",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      resolved: true,
      severity: "high",
      source: "database_monitor",
    },
  ])

  const [isMonitoring, setIsMonitoring] = useState(true)

  // 性能趋势数据
  const performanceTrend = [
    { time: "00:00", cpu: 35, memory: 45, response: 180 },
    { time: "04:00", cpu: 28, memory: 42, response: 165 },
    { time: "08:00", cpu: 52, memory: 58, response: 220 },
    { time: "12:00", cpu: 68, memory: 72, response: 280 },
    { time: "16:00", cpu: 45, memory: 55, response: 195 },
    { time: "20:00", cpu: 38, memory: 48, response: 175 },
  ]

  // 流量统计
  const trafficData = [
    { hour: "00", requests: 1200, users: 450 },
    { hour: "04", requests: 800, users: 320 },
    { hour: "08", requests: 2800, users: 1200 },
    { hour: "12", requests: 3500, users: 1800 },
    { hour: "16", requests: 2200, users: 950 },
    { hour: "20", requests: 1800, users: 720 },
  ]

  // 错误统计
  const errorData = [
    { type: "4xx错误", count: 45, percentage: 60 },
    { type: "5xx错误", count: 18, percentage: 24 },
    { type: "超时", count: 8, percentage: 11 },
    { type: "其他", count: 4, percentage: 5 },
  ]

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // 模拟实时数据更新
        setMetrics((prev) =>
          prev.map((metric) => ({
            ...metric,
            value: Math.max(0, metric.value + (Math.random() - 0.5) * 5),
            lastUpdated: new Date(),
            trend: Math.random() > 0.5 ? "up" : "down",
          })),
        )

        setServices((prev) =>
          prev.map((service) => ({
            ...service,
            responseTime: Math.max(10, service.responseTime + (Math.random() - 0.5) * 20),
            lastCheck: new Date(),
          })),
        )
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "online":
        return "text-green-600 bg-green-100"
      case "warning":
      case "degraded":
        return "text-yellow-600 bg-yellow-100"
      case "critical":
      case "offline":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "online":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
      case "degraded":
        return <AlertTriangle className="w-4 h-4" />
      case "critical":
      case "offline":
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "info":
        return <Activity className="w-4 h-4 text-blue-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, resolved: true } : alert)))
  }

  const getSystemHealth = () => {
    const healthyCount = metrics.filter((m) => m.status === "healthy").length
    const totalCount = metrics.length
    return Math.round((healthyCount / totalCount) * 100)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Activity className="w-8 h-8 mr-3 text-green-600" />
            生产环境监控
          </h1>
          <p className="text-muted-foreground">实时监控系统状态和性能指标</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsMonitoring(!isMonitoring)}>
            {isMonitoring ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            {isMonitoring ? "监控中" : "已暂停"}
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            设置
          </Button>
          <Button>
            <Bell className="w-4 h-4 mr-2" />
            告警规则
          </Button>
        </div>
      </div>

      {/* 系统健康度概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-600">{getSystemHealth()}%</p>
            <p className="text-sm text-gray-600">系统健康度</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Server className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{services.filter((s) => s.status === "online").length}</p>
            <p className="text-sm text-gray-600">在线服务</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">1,245</p>
            <p className="text-sm text-gray-600">在线用户</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">2,856</p>
            <p className="text-sm text-gray-600">每分钟请求</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <p className="text-2xl font-bold">{alerts.filter((a) => !a.resolved).length}</p>
            <p className="text-sm text-gray-600">活跃告警</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">系统概览</TabsTrigger>
          <TabsTrigger value="services">服务状态</TabsTrigger>
          <TabsTrigger value="performance">性能监控</TabsTrigger>
          <TabsTrigger value="alerts">告警中心</TabsTrigger>
          <TabsTrigger value="logs">日志分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* 关键指标 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{metric.name}</CardTitle>
                    <Badge className={getStatusColor(metric.status)}>
                      {getStatusIcon(metric.status)}
                      <span className="ml-1">
                        {metric.status === "healthy" ? "正常" : metric.status === "warning" ? "警告" : "严重"}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold">
                        {metric.value.toFixed(1)} {metric.unit}
                      </span>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>警告阈值</span>
                        <span>
                          {metric.threshold.warning} {metric.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>严重阈值</span>
                        <span>
                          {metric.threshold.critical} {metric.unit}
                        </span>
                      </div>
                    </div>
                    <Progress value={(metric.value / metric.threshold.critical) * 100} className="h-2" />
                    <p className="text-xs text-gray-500">最后更新: {metric.lastUpdated.toLocaleTimeString("zh-CN")}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 性能趋势 */}
          <Card>
            <CardHeader>
              <CardTitle>24小时性能趋势</CardTitle>
              <CardDescription>系统关键指标的变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  cpu: {
                    label: "CPU使用率",
                    color: "hsl(var(--chart-1))",
                  },
                  memory: {
                    label: "内存使用率",
                    color: "hsl(var(--chart-2))",
                  },
                  response: {
                    label: "响应时间",
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
                    <Line yAxisId="left" type="monotone" dataKey="cpu" stroke="var(--color-cpu)" strokeWidth={2} />
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
                      dataKey="response"
                      stroke="var(--color-response)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Server className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <p className="text-sm text-gray-600">{service.endpoint}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {getStatusIcon(service.status)}
                      <span className="ml-1">
                        {service.status === "online" ? "在线" : service.status === "degraded" ? "降级" : "离线"}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">可用性</p>
                      <p className="text-2xl font-bold text-green-600">{service.uptime}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">响应时间</p>
                      <p className="text-2xl font-bold">{service.responseTime}ms</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">依赖服务</p>
                    <div className="flex flex-wrap gap-1">
                      {service.dependencies.length > 0 ? (
                        service.dependencies.map((dep, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {dep}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">无依赖</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      最后检查: {service.lastCheck.toLocaleTimeString("zh-CN")}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>流量统计</CardTitle>
                <CardDescription>每小时请求量和用户数</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    requests: {
                      label: "请求数",
                      color: "hsl(var(--chart-1))",
                    },
                    users: {
                      label: "用户数",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="requests"
                        stackId="1"
                        stroke="var(--color-requests)"
                        fill="var(--color-requests)"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stackId="2"
                        stroke="var(--color-users)"
                        fill="var(--color-users)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>错误分析</CardTitle>
                <CardDescription>错误类型分布</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errorData.map((error) => (
                    <div key={error.type} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{error.type}</span>
                        <span className="text-sm text-gray-600">{error.count}</span>
                      </div>
                      <Progress value={error.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Cpu className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">45.2%</p>
                <p className="text-sm text-gray-600">CPU使用率</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MemoryStick className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">68.5%</p>
                <p className="text-sm text-gray-600">内存使用率</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <HardDrive className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">42.1%</p>
                <p className="text-sm text-gray-600">磁盘使用率</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Network className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">125.8</p>
                <p className="text-sm text-gray-600">网络IO(MB/s)</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">告警列表</h2>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                告警规则
              </Button>
              <Button>
                <Bell className="w-4 h-4 mr-2" />
                新建告警
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={alert.resolved ? "opacity-50" : ""}>
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{alert.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            alert.severity === "critical"
                              ? "bg-red-100 text-red-800"
                              : alert.severity === "high"
                                ? "bg-orange-100 text-orange-800"
                                : alert.severity === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                          }
                        >
                          {alert.severity === "critical"
                            ? "严重"
                            : alert.severity === "high"
                              ? "高"
                              : alert.severity === "medium"
                                ? "中"
                                : "低"}
                        </Badge>
                        {alert.resolved && <Badge className="bg-gray-100 text-gray-800">已解决</Badge>}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{alert.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {alert.timestamp.toLocaleString("zh-CN")}
                        </span>
                        <span>来源: {alert.source}</span>
                      </div>
                      {!alert.resolved && (
                        <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                          标记已解决
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>日志分析</CardTitle>
              <CardDescription>系统日志实时监控和分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Activity className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl font-bold">15,234</p>
                      <p className="text-sm text-gray-600">今日日志条数</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-sm text-gray-600">错误日志</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-gray-600">警告日志</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
                  <div className="space-y-1">
                    <div>[2024-01-20 14:30:15] INFO: 用户登录成功 - user_id: 12345</div>
                    <div>[2024-01-20 14:30:18] DEBUG: 数据库查询执行 - query_time: 45ms</div>
                    <div>[2024-01-20 14:30:22] WARN: 内存使用率较高 - usage: 68.5%</div>
                    <div>[2024-01-20 14:30:25] INFO: API请求处理完成 - endpoint: /api/users</div>
                    <div>[2024-01-20 14:30:28] ERROR: 数据库连接超时 - timeout: 5000ms</div>
                    <div>[2024-01-20 14:30:31] INFO: 缓存更新成功 - cache_key: user_12345</div>
                    <div>[2024-01-20 14:30:34] DEBUG: 文件上传完成 - file_size: 2.3MB</div>
                    <div>[2024-01-20 14:30:37] WARN: 磁盘空间不足 - available: 15%</div>
                    <div>[2024-01-20 14:30:40] INFO: 定时任务执行 - task: backup_database</div>
                    <div>[2024-01-20 14:30:43] DEBUG: 邮件发送成功 - recipient: user@example.com</div>
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
