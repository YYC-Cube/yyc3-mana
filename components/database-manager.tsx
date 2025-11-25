"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Table,
  Play,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Search,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Activity,
  Users,
  FileText,
  Zap,
} from "lucide-react"

interface DatabaseTable {
  name: string
  rows: number
  size: string
  lastUpdated: Date
  status: "healthy" | "warning" | "error"
  type: "data" | "log" | "cache" | "config"
}

interface QueryResult {
  id: string
  query: string
  duration: number
  rows: number
  status: "success" | "error"
  timestamp: Date
  error?: string
}

interface DatabaseStats {
  totalSize: string
  totalTables: number
  totalRows: number
  connections: number
  uptime: string
  performance: {
    cpu: number
    memory: number
    disk: number
    queries: number
  }
}

export function DatabaseManager() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sqlQuery, setSqlQuery] = useState("")
  const [queryResults, setQueryResults] = useState<QueryResult[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [dbStats, setDbStats] = useState<DatabaseStats>({
    totalSize: "2.4 GB",
    totalTables: 28,
    totalRows: 156789,
    connections: 12,
    uptime: "15天 8小时",
    performance: {
      cpu: 35,
      memory: 68,
      disk: 45,
      queries: 1247,
    },
  })

  const [tables, setTables] = useState<DatabaseTable[]>([
    {
      name: "users",
      rows: 15678,
      size: "45.2 MB",
      lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "healthy",
      type: "data",
    },
    {
      name: "tasks",
      rows: 23456,
      size: "78.9 MB",
      lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
      status: "healthy",
      type: "data",
    },
    {
      name: "customers",
      rows: 8934,
      size: "34.1 MB",
      lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: "warning",
      type: "data",
    },
    {
      name: "audit_logs",
      rows: 89234,
      size: "156.7 MB",
      lastUpdated: new Date(Date.now() - 15 * 60 * 1000),
      status: "healthy",
      type: "log",
    },
    {
      name: "cache_sessions",
      rows: 1234,
      size: "5.6 MB",
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
      status: "healthy",
      type: "cache",
    },
    {
      name: "system_config",
      rows: 156,
      size: "0.8 MB",
      lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: "error",
      type: "config",
    },
  ])

  const getTableIcon = (type: DatabaseTable["type"]) => {
    switch (type) {
      case "data":
        return <Table className="w-4 h-4 text-blue-600" />
      case "log":
        return <FileText className="w-4 h-4 text-green-600" />
      case "cache":
        return <Zap className="w-4 h-4 text-yellow-600" />
      case "config":
        return <Settings className="w-4 h-4 text-purple-600" />
      default:
        return <Table className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusIcon = (status: DatabaseTable["status"]) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: DatabaseTable["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 1) return "刚刚"
    if (minutes < 60) return `${minutes}分钟前`
    if (hours < 24) return `${hours}小时前`
    return date.toLocaleDateString("zh-CN")
  }

  const executeQuery = async () => {
    if (!sqlQuery.trim()) return

    setIsExecuting(true)
    const startTime = Date.now()

    // 模拟查询执行
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 500))

    const duration = Date.now() - startTime
    const isError = Math.random() < 0.1 // 10% 错误率

    const result: QueryResult = {
      id: Date.now().toString(),
      query: sqlQuery,
      duration,
      rows: isError ? 0 : Math.floor(Math.random() * 1000),
      status: isError ? "error" : "success",
      timestamp: new Date(),
      error: isError ? "语法错误: 表名不存在" : undefined,
    }

    setQueryResults((prev) => [result, ...prev.slice(0, 9)]) // 保留最近10条
    setIsExecuting(false)
  }

  const refreshTables = () => {
    // 模拟刷新表数据
    setTables((prev) =>
      prev.map((table) => ({
        ...table,
        lastUpdated: new Date(),
        rows: table.rows + Math.floor(Math.random() * 100) - 50,
      })),
    )
  }

  const optimizeTable = (tableName: string) => {
    // 模拟表优化
    setTables((prev) =>
      prev.map((table) =>
        table.name === tableName
          ? {
              ...table,
              status: "healthy" as const,
              lastUpdated: new Date(),
            }
          : table,
      ),
    )
  }

  const filteredTables = tables.filter((table) => table.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // 模拟性能数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setDbStats((prev) => ({
        ...prev,
        connections: Math.max(1, Math.min(50, prev.connections + Math.floor(Math.random() * 6) - 3)),
        performance: {
          cpu: Math.max(10, Math.min(90, prev.performance.cpu + Math.floor(Math.random() * 20) - 10)),
          memory: Math.max(20, Math.min(95, prev.performance.memory + Math.floor(Math.random() * 10) - 5)),
          disk: Math.max(10, Math.min(80, prev.performance.disk + Math.floor(Math.random() * 8) - 4)),
          queries: prev.performance.queries + Math.floor(Math.random() * 10),
        },
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* 数据库概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Database className="w-5 h-5 mr-2 text-blue-600" />
              数据库大小
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{dbStats.totalSize}</div>
            <p className="text-sm text-muted-foreground">总存储空间</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Table className="w-5 h-5 mr-2 text-green-600" />
              数据表数量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dbStats.totalTables}</div>
            <p className="text-sm text-muted-foreground">活跃数据表</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              总记录数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{dbStats.totalRows.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">数据记录总数</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-600" />
              活跃连接
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{dbStats.connections}</div>
            <p className="text-sm text-muted-foreground">当前连接数</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="tables">数据表</TabsTrigger>
          <TabsTrigger value="query">查询</TabsTrigger>
          <TabsTrigger value="performance">性能</TabsTrigger>
          <TabsTrigger value="maintenance">维护</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 系统状态 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-600" />
                  系统状态
                </CardTitle>
                <CardDescription>数据库运行状态概览</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">运行时间</span>
                  <Badge className="bg-green-100 text-green-800">{dbStats.uptime}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">数据库版本</span>
                  <span className="text-sm font-medium">PostgreSQL 15.2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">字符集</span>
                  <span className="text-sm font-medium">UTF-8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">时区</span>
                  <span className="text-sm font-medium">Asia/Shanghai</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">最大连接数</span>
                  <span className="text-sm font-medium">100</span>
                </div>
              </CardContent>
            </Card>

            {/* 最近活动 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  最近活动
                </CardTitle>
                <CardDescription>数据库最近的操作记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {queryResults.slice(0, 5).map((result) => (
                    <div key={result.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <div
                        className={`w-2 h-2 rounded-full ${result.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{result.query}</p>
                        <p className="text-xs text-gray-500">
                          {formatTime(result.timestamp)} • {result.duration}ms • {result.rows} 行
                        </p>
                      </div>
                    </div>
                  ))}
                  {queryResults.length === 0 && <div className="text-center text-gray-500 py-4">暂无查询记录</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tables" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Table className="w-5 h-5 mr-2 text-blue-600" />
                    数据表管理
                  </CardTitle>
                  <CardDescription>查看和管理数据库表</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="搜索表名..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" onClick={refreshTables}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    刷新
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredTables.map((table) => (
                  <div
                    key={table.name}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      {getTableIcon(table.type)}
                      <div>
                        <h4 className="font-medium">{table.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{table.rows.toLocaleString()} 行</span>
                          <span>{table.size}</span>
                          <span>更新于 {formatTime(table.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(table.status)}
                      <Badge className={getStatusColor(table.status)}>
                        {table.status === "healthy" ? "正常" : table.status === "warning" ? "警告" : "错误"}
                      </Badge>
                      {table.status !== "healthy" && (
                        <Button variant="outline" size="sm" onClick={() => optimizeTable(table.name)}>
                          优化
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="query" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="w-5 h-5 mr-2 text-green-600" />
                SQL 查询执行器
              </CardTitle>
              <CardDescription>执行 SQL 查询并查看结果</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">SQL 查询</label>
                <Textarea
                  placeholder="输入 SQL 查询语句..."
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="min-h-[120px] font-mono"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={executeQuery} disabled={isExecuting || !sqlQuery.trim()}>
                  {isExecuting ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isExecuting ? "执行中..." : "执行查询"}
                </Button>
                <Button variant="outline" onClick={() => setSqlQuery("")}>
                  清空
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 查询结果 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                查询结果
              </CardTitle>
              <CardDescription>最近的查询执行结果</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queryResults.map((result) => (
                  <div
                    key={result.id}
                    className={`p-4 rounded-lg border ${
                      result.status === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {result.status === "success" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm font-medium">
                          {result.status === "success" ? "查询成功" : "查询失败"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{formatTime(result.timestamp)}</span>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm mb-2">{result.query}</div>
                    {result.status === "success" ? (
                      <div className="text-sm text-gray-600">
                        返回 {result.rows} 行，耗时 {result.duration}ms
                      </div>
                    ) : (
                      <div className="text-sm text-red-600">{result.error}</div>
                    )}
                  </div>
                ))}
                {queryResults.length === 0 && <div className="text-center text-gray-500 py-8">暂无查询结果</div>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  系统性能
                </CardTitle>
                <CardDescription>实时系统资源使用情况</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU 使用率</span>
                    <span>{dbStats.performance.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dbStats.performance.cpu}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>内存使用率</span>
                    <span>{dbStats.performance.memory}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dbStats.performance.memory}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>磁盘使用率</span>
                    <span>{dbStats.performance.disk}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dbStats.performance.disk}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                  查询统计
                </CardTitle>
                <CardDescription>数据库查询性能统计</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{dbStats.performance.queries}</div>
                    <div className="text-sm text-gray-600">总查询数</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(dbStats.performance.queries / 24)}
                    </div>
                    <div className="text-sm text-gray-600">每小时查询</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">156ms</div>
                    <div className="text-sm text-gray-600">平均响应时间</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">99.2%</div>
                    <div className="text-sm text-gray-600">成功率</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-600" />
                数据库维护
              </CardTitle>
              <CardDescription>数据库备份、恢复和优化操作</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500 to-indigo-600">
                  <Download className="w-6 h-6" />
                  <span className="text-sm">创建备份</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 bg-transparent"
                >
                  <Upload className="w-6 h-6 text-green-600" />
                  <span className="text-sm">恢复备份</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 bg-transparent"
                >
                  <Zap className="w-6 h-6 text-purple-600" />
                  <span className="text-sm">优化数据库</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-orange-50 bg-transparent"
                >
                  <RefreshCw className="w-6 h-6 text-orange-600" />
                  <span className="text-sm">重建索引</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-6 h-6 text-red-600" />
                  <span className="text-sm">清理日志</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50 bg-transparent"
                >
                  <HardDrive className="w-6 h-6 text-gray-600" />
                  <span className="text-sm">磁盘清理</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 备份历史 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                备份历史
              </CardTitle>
              <CardDescription>最近的数据库备份记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: "backup_2024_01_15_daily.sql",
                    size: "2.4 GB",
                    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                    type: "自动备��",
                  },
                  {
                    name: "backup_2024_01_14_daily.sql",
                    size: "2.3 GB",
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                    type: "自动备份",
                  },
                  {
                    name: "backup_2024_01_13_manual.sql",
                    size: "2.3 GB",
                    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                    type: "手动备份",
                  },
                ].map((backup, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{backup.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{backup.size}</span>
                          <span>{formatTime(backup.date)}</span>
                          <Badge variant="outline">{backup.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        下载
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-3 h-3 mr-1" />
                        恢复
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
