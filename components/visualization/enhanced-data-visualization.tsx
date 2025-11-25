"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  BarChart3,
  LineChartIcon,
  PieChartIcon,
  TrendingUp,
  Database,
  Share,
  Cloud,
  Download,
  Settings,
  Zap,
  Eye,
  RefreshCw,
  Plus,
  AlertCircle,
} from "lucide-react"

interface DataSource {
  id: string
  name: string
  type: "api" | "database" | "realtime"
  url?: string
  status: "connected" | "disconnected" | "error"
  recordCount: number
  lastUpdate: Date
  fields: string[]
}

interface ChartConfig {
  id: string
  title: string
  type: "line" | "bar" | "pie" | "scatter" | "area" | "radar" | "treemap"
  dataSource: string
  xAxis: string
  yAxis: string[]
  filters: { [key: string]: any }
  colors: string[]
  refreshInterval?: number
}

interface VisualizationData {
  [key: string]: any
}

export function EnhancedDataVisualization() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "sales_db",
      name: "销售数据库",
      type: "database",
      status: "connected",
      recordCount: 15420,
      lastUpdate: new Date(),
      fields: ["date", "revenue", "orders", "customers", "region", "product"],
    },
    {
      id: "analytics_api",
      name: "分析API",
      type: "api",
      url: "https://api.analytics.com/v1",
      status: "connected",
      recordCount: 8930,
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
      fields: ["timestamp", "pageviews", "sessions", "bounceRate", "source"],
    },
    {
      id: "realtime_stream",
      name: "实时数据流",
      type: "realtime",
      status: "connected",
      recordCount: 2340,
      lastUpdate: new Date(Date.now() - 30 * 1000),
      fields: ["time", "value", "category", "status"],
    },
  ])

  const [charts, setCharts] = useState<ChartConfig[]>([
    {
      id: "sales_trend",
      title: "销售趋势分析",
      type: "line",
      dataSource: "sales_db",
      xAxis: "date",
      yAxis: ["revenue", "orders"],
      filters: {},
      colors: ["#3b82f6", "#10b981"],
    },
    {
      id: "region_distribution",
      title: "区域销售分布",
      type: "pie",
      dataSource: "sales_db",
      xAxis: "region",
      yAxis: ["revenue"],
      filters: {},
      colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
    },
  ])

  const [selectedChart, setSelectedChart] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [visualizationData, setVisualizationData] = useState<{ [key: string]: VisualizationData[] }>({})
  const [activeTab, setActiveTab] = useState("dashboard")

  // 模拟数据生成
  const generateMockData = useCallback((chartConfig: ChartConfig): VisualizationData[] => {
    const mockData: VisualizationData[] = []
    const recordCount = 30

    for (let i = 0; i < recordCount; i++) {
      const record: VisualizationData = {}

      if (chartConfig.xAxis === "date") {
        record[chartConfig.xAxis] = new Date(Date.now() - (recordCount - i) * 24 * 60 * 60 * 1000).toLocaleDateString(
          "zh-CN",
        )
      } else if (chartConfig.xAxis === "region") {
        const regions = ["华东", "华南", "华北", "西部", "东北"]
        record[chartConfig.xAxis] = regions[i % regions.length]
      } else {
        record[chartConfig.xAxis] = `项目${i + 1}`
      }

      chartConfig.yAxis.forEach((field) => {
        if (field === "revenue") {
          record[field] = Math.floor(Math.random() * 100000) + 50000
        } else if (field === "orders") {
          record[field] = Math.floor(Math.random() * 200) + 50
        } else if (field === "customers") {
          record[field] = Math.floor(Math.random() * 100) + 20
        } else {
          record[field] = Math.floor(Math.random() * 1000) + 100
        }
      })

      mockData.push(record)
    }

    return mockData
  }, [])

  // 加载图表数据
  const loadChartData = useCallback(
    async (chartId: string) => {
      setIsLoading(true)
      try {
        const chart = charts.find((c) => c.id === chartId)
        if (!chart) return

        // 模拟API调用延迟
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const data = generateMockData(chart)
        setVisualizationData((prev) => ({
          ...prev,
          [chartId]: data,
        }))
      } catch (error) {
        console.error("加载图表数据失败:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [charts, generateMockData],
  )

  // 初始化数据
  useEffect(() => {
    charts.forEach((chart) => {
      loadChartData(chart.id)
    })
  }, [charts, loadChartData])

  // 渲染图表
  const renderChart = (chartConfig: ChartConfig) => {
    const data = visualizationData[chartConfig.id] || []

    const chartProps = {
      config: chartConfig.yAxis.reduce((acc, field, index) => {
        acc[field] = {
          label: field,
          color: chartConfig.colors[index] || `hsl(var(--chart-${index + 1}))`,
        }
        return acc
      }, {} as any),
      className: "h-[300px]",
    }

    switch (chartConfig.type) {
      case "line":
        return (
          <ChartContainer {...chartProps}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={chartConfig.xAxis} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                {chartConfig.yAxis.map((field, index) => (
                  <Line
                    key={field}
                    type="monotone"
                    dataKey={field}
                    stroke={chartConfig.colors[index]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )

      case "bar":
        return (
          <ChartContainer {...chartProps}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={chartConfig.xAxis} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                {chartConfig.yAxis.map((field, index) => (
                  <Bar key={field} dataKey={field} fill={chartConfig.colors[index]} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )

      case "pie":
        const pieData = data.reduce(
          (acc, item) => {
            const existing = acc.find((a) => a.name === item[chartConfig.xAxis])
            if (existing) {
              existing.value += item[chartConfig.yAxis[0]]
            } else {
              acc.push({
                name: item[chartConfig.xAxis],
                value: item[chartConfig.yAxis[0]],
              })
            }
            return acc
          },
          [] as { name: string; value: number }[],
        )

        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartConfig.colors[index % chartConfig.colors.length]} />
                ))}
              </Pie>
              <ChartTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      case "area":
        return (
          <ChartContainer {...chartProps}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={chartConfig.xAxis} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                {chartConfig.yAxis.map((field, index) => (
                  <Area
                    key={field}
                    type="monotone"
                    dataKey={field}
                    stackId="1"
                    stroke={chartConfig.colors[index]}
                    fill={chartConfig.colors[index]}
                    fillOpacity={0.6}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )

      default:
        return <div className="h-[300px] flex items-center justify-center text-gray-500">暂不支持此图表类型</div>
    }
  }

  const getDataSourceStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "disconnected":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString("zh-CN")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
            增强数据可视化
          </h1>
          <p className="text-muted-foreground">高性能数据可视化和智能分析平台</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出报告
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            新建图表
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">可视化面板</TabsTrigger>
          <TabsTrigger value="datasources">数据源管理</TabsTrigger>
          <TabsTrigger value="charts">图表配置</TabsTrigger>
          <TabsTrigger value="performance">性能监控</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* 图表展示区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {charts.map((chart) => (
              <Card key={chart.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      {chart.type === "line" && <LineChartIcon className="w-5 h-5 mr-2 text-blue-600" />}
                      {chart.type === "bar" && <BarChart3 className="w-5 h-5 mr-2 text-green-600" />}
                      {chart.type === "pie" && <PieChartIcon className="w-5 h-5 mr-2 text-purple-600" />}
                      {chart.title}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => loadChartData(chart.id)}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    数据源: {dataSources.find((ds) => ds.id === chart.dataSource)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading && selectedChart === chart.id ? (
                    <div className="h-[300px] flex items-center justify-center">
                      <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                  ) : (
                    renderChart(chart)
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 实时数据指标 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                实时数据指标
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">2,847,392</p>
                  <p className="text-sm text-gray-600">总销售额</p>
                  <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">1,234</p>
                  <p className="text-sm text-gray-600">活跃用户</p>
                  <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.3%
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">567</p>
                  <p className="text-sm text-gray-600">新订单</p>
                  <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15.7%
                  </p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">89.2%</p>
                  <p className="text-sm text-gray-600">系统性能</p>
                  <p className="text-xs text-green-600 flex items-center justify-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasources" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">数据源管理</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              添加数据源
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {dataSources.map((ds) => (
              <Card key={ds.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          ds.type === "api"
                            ? "bg-blue-100 text-blue-600"
                            : ds.type === "database"
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {ds.type === "api" ? (
                          <Share className="w-4 h-4" />
                        ) : ds.type === "database" ? (
                          <Database className="w-4 h-4" />
                        ) : (
                          <Cloud className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{ds.name}</CardTitle>
                        <p className="text-sm text-gray-500">{ds.url || "内部数据源"}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getDataSourceStatusColor(ds.status)}`}
                    >
                      {ds.status === "connected" ? "已连接" : ds.status === "disconnected" ? "已断开" : "错误"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">记录数量</p>
                    <p className="font-semibold">{ds.recordCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">最后更新</p>
                    <p className="font-semibold">{formatDate(ds.lastUpdate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">数据源类型</p>
                    <p className="font-semibold">
                      {ds.type === "api" ? "API" : ds.type === "database" ? "数据库" : "实时数据"}
                    </p>
                  </div>
                </CardContent>
                <div className="p-4 border-t border-gray-100 flex justify-end">
                  <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                    测试连接
                  </Button>
                  <Button variant="outline" size="sm">
                    编辑
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">图表配置</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建图表
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {charts.map((chart) => (
              <Card key={chart.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {chart.title}
                    <Badge variant="outline">{chart.type}</Badge>
                  </CardTitle>
                  <CardDescription>数据源: {chart.dataSource}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">X轴字段</label>
                      <p className="text-sm text-gray-600">{chart.xAxis}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Y轴字段</label>
                      <p className="text-sm text-gray-600">{chart.yAxis.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      预览
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      编辑
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                渲染性能监控
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">45ms</p>
                  <p className="text-sm text-gray-600">平均渲染时间</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">98.5%</p>
                  <p className="text-sm text-gray-600">缓存命中率</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">2.3MB</p>
                  <p className="text-sm text-gray-600">内存使用</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>系统正在自动优化图表渲染性能。建议定期清理缓存数据以保持最佳性能。</AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
