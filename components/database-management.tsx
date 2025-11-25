"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Database,
  Server,
  HardDrive,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Play,
  Download,
  Settings,
  Plus,
  Search,
  BarChart3,
  Clock,
  Shield,
} from "lucide-react"

interface DatabaseConnection {
  id: string
  name: string
  type: "mysql" | "postgresql" | "mongodb" | "redis" | "sqlite"
  host: string
  port: number
  database: string
  username: string
  status: "connected" | "disconnected" | "error"
  lastConnected: Date
  connectionPool: {
    active: number
    idle: number
    max: number
  }
  performance: {
    queryTime: number
    throughput: number
    errorRate: number
  }
}

interface DatabaseTable {
  name: string
  rows: number
  size: string
  engine: string
  collation: string
  lastUpdated: Date
}

interface BackupJob {
  id: string
  name: string
  database: string
  type: "full" | "incremental" | "differential"
  schedule: string
  status: "running" | "completed" | "failed" | "scheduled"
  lastRun: Date
  nextRun: Date
  size: string
  duration: number
}

interface QueryLog {
  id: string
  query: string
  database: string
  duration: number
  timestamp: Date
  status: "success" | "error"
  rows: number
}

export function DatabaseManagement() {
  const [connections, setConnections] = useState<DatabaseConnection[]>([
    {
      id: "main_db",
      name: "主数据库",
      type: "mysql",
      host: "localhost",
      port: 3306,
      database: "enterprise_db",
      username: "admin",
      status: "connected",
      lastConnected: new Date(),
      connectionPool: { active: 15, idle: 5, max: 50 },
      performance: { queryTime: 45.2, throughput: 1250, errorRate: 0.02 },
    },
    {
      id: "cache_db",
      name: "缓存数据库",
      type: "redis",
      host: "localhost",
      port: 6379,
      database: "0",
      username: "default",
      status: "connected",
      lastConnected: new Date(),
      connectionPool: { active: 8, idle: 2, max: 20 },
      performance: { queryTime: 2.1, throughput: 5000, errorRate: 0.001 },
    },
    {
      id: "analytics_db",
      name: "分析数据库",
      type: "postgresql",
      host: "analytics.internal",
      port: 5432,
      database: "analytics",
      username: "analyst",
      status: "error",
      lastConnected: new Date(Date.now() - 3600000),
      connectionPool: { active: 0, idle: 0, max: 30 },
      performance: { queryTime: 0, throughput: 0, errorRate: 1.0 },
    },
  ])

  const [tables, setTables] = useState<DatabaseTable[]>([
    {
      name: "customers",
      rows: 15420,
      size: "2.3 MB",
      engine: "InnoDB",
      collation: "utf8mb4_unicode_ci",
      lastUpdated: new Date(),
    },
    {
      name: "orders",
      rows: 45680,
      size: "8.7 MB",
      engine: "InnoDB",
      collation: "utf8mb4_unicode_ci",
      lastUpdated: new Date(Date.now() - 1800000),
    },
    {
      name: "products",
      rows: 2340,
      size: "1.1 MB",
      engine: "InnoDB",
      collation: "utf8mb4_unicode_ci",
      lastUpdated: new Date(Date.now() - 3600000),
    },
  ])

  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([
    {
      id: "daily_backup",
      name: "每日全量备份",
      database: "enterprise_db",
      type: "full",
      schedule: "0 2 * * *",
      status: "completed",
      lastRun: new Date(Date.now() - 86400000),
      nextRun: new Date(Date.now() + 86400000 - (Date.now() % 86400000)),
      size: "1.2 GB",
      duration: 1800,
    },
    {
      id: "hourly_backup",
      name: "每小时增量备份",
      database: "enterprise_db",
      type: "incremental",
      schedule: "0 * * * *",
      status: "running",
      lastRun: new Date(Date.now() - 3600000),
      nextRun: new Date(Date.now() + 3600000 - (Date.now() % 3600000)),
      size: "45 MB",
      duration: 120,
    },
  ])

  const [queryLogs, setQueryLogs] = useState<QueryLog[]>([
    {
      id: "1",
      query: "SELECT * FROM customers WHERE status = 'active'",
      database: "enterprise_db",
      duration: 23.5,
      timestamp: new Date(),
      status: "success",
      rows: 1247,
    },
    {
      id: "2",
      query: "UPDATE orders SET status = 'shipped' WHERE id IN (...)",
      database: "enterprise_db",
      duration: 156.8,
      timestamp: new Date(Date.now() - 300000),
      status: "success",
      rows: 45,
    },
    {
      id: "3",
      query: "SELECT COUNT(*) FROM products WHERE category = 'electronics'",
      database: "enterprise_db",
      duration: 2.1,
      timestamp: new Date(Date.now() - 600000),
      status: "success",
      rows: 1,
    },
  ])

  const [selectedConnection, setSelectedConnection] = useState<string>("main_db")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [queryInput, setQueryInput] = useState("")
  const [isExecutingQuery, setIsExecutingQuery] = useState(false)

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setConnections((prev) =>
        prev.map((conn) => ({
          ...conn,
          performance: {
            ...conn.performance,
            queryTime: conn.performance.queryTime + (Math.random() - 0.5) * 5,
            throughput: Math.max(0, conn.performance.throughput + (Math.random() - 0.5) * 100),
          },
          connectionPool: {
            ...conn.connectionPool,
            active: Math.max(
              0,
              Math.min(conn.connectionPool.max, conn.connectionPool.active + Math.floor((Math.random() - 0.5) * 4)),
            ),
          },
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
      case "completed":
      case "success":
        return "bg-green-100 text-green-800"
      case "disconnected":
      case "scheduled":
        return "bg-gray-100 text-gray-800"
      case "error":
      case "failed":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
      case "completed":
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getDatabaseIcon = (type: string) => {
    switch (type) {
      case "mysql":
        return <Database className="w-5 h-5 text-blue-600" />
      case "postgresql":
        return <Database className="w-5 h-5 text-blue-800" />
      case "mongodb":
        return <Database className="w-5 h-5 text-green-600" />
      case "redis":
        return <Server className="w-5 h-5 text-red-600" />
      case "sqlite":
        return <HardDrive className="w-5 h-5 text-gray-600" />
      default:
        return <Database className="w-5 h-5 text-gray-600" />
    }
  }

  const executeQuery = async () => {
    if (!queryInput.trim()) return

    setIsExecutingQuery(true)
    try {
      // 模拟查询执行
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

      const newLog: QueryLog = {
        id: Date.now().toString(),
        query: queryInput,
        database: selectedConnection,
        duration: Math.random() * 100 + 10,
        timestamp: new Date(),
        status: Math.random() > 0.1 ? "success" : "error",
        rows: Math.floor(Math.random() * 1000),
      }

      setQueryLogs((prev) => [newLog, ...prev.slice(0, 9)])
      setQueryInput("")
    } catch (error) {
      console.error("查询执行失败:", error)
    } finally {
      setIsExecutingQuery(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">数据库管理</h1>
          <p className="text-muted-foreground">数据库连接、监控、备份和查询管理</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出配置
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                新建连接
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建数据库连接</DialogTitle>
                <DialogDescription>配置新的数据库连接</DialogDescription>
              </DialogHeader>
              <CreateConnectionForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 数据库概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Database className="w-5 h-5 mr-2 text-blue-600" />
              总连接数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{connections.length}</div>
            <p className="text-sm text-muted-foreground">
              活跃: {connections.filter((c) => c.status === "connected").length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              查询吞吐量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {connections.reduce((sum, c) => sum + c.performance.throughput, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">查询/秒</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              平均响应时间
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(connections.reduce((sum, c) => sum + c.performance.queryTime, 0) / connections.length).toFixed(1)}ms
            </div>
            <p className="text-sm text-muted-foreground">查询响应</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Shield className="w-5 h-5 mr-2 text-orange-600" />
              错误率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {((connections.reduce((sum, c) => sum + c.performance.errorRate, 0) / connections.length) * 100).toFixed(
                2,
              )}
              %
            </div>
            <p className="text-sm text-muted-foreground">查询错误</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="connections">数据库连接</TabsTrigger>
          <TabsTrigger value="tables">表管理</TabsTrigger>
          <TabsTrigger value="query">查询工具</TabsTrigger>
          <TabsTrigger value="backup">备份管理</TabsTrigger>
          <TabsTrigger value="monitoring">性能监控</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-4">
          <div className="grid gap-4">
            {connections.map((conn) => (
              <Card key={conn.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getDatabaseIcon(conn.type)}
                      <div>
                        <CardTitle className="text-lg">{conn.name}</CardTitle>
                        <CardDescription>
                          {conn.host}:{conn.port} / {conn.database}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(conn.status)}>
                        {getStatusIcon(conn.status)}
                        <span className="ml-1">
                          {conn.status === "connected" ? "已连接" : conn.status === "disconnected" ? "已断开" : "错误"}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 连接池状态 */}
                    <div>
                      <h4 className="font-medium mb-2">连接池状态</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>活跃连接</span>
                          <span>
                            {conn.connectionPool.active}/{conn.connectionPool.max}
                          </span>
                        </div>
                        <Progress
                          value={(conn.connectionPool.active / conn.connectionPool.max) * 100}
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground">空闲: {conn.connectionPool.idle}</div>
                      </div>
                    </div>

                    {/* 性能指标 */}
                    <div>
                      <h4 className="font-medium mb-2">性能指标</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>查询时间</span>
                          <span>{conn.performance.queryTime.toFixed(1)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>吞吐量</span>
                          <span>{conn.performance.throughput.toLocaleString()}/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>错误率</span>
                          <span>{(conn.performance.errorRate * 100).toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* 连接信息 */}
                    <div>
                      <h4 className="font-medium mb-2">连接信息</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>类型</span>
                          <span className="uppercase">{conn.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>用户</span>
                          <span>{conn.username}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>最后连接</span>
                          <span>{conn.lastConnected.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      测试连接
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      编辑
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      监控
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>数据表管理</CardTitle>
                  <CardDescription>查看和管理数据库表结构</CardDescription>
                </div>
                <Select value={selectedConnection} onValueChange={setSelectedConnection}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {connections.map((conn) => (
                      <SelectItem key={conn.id} value={conn.id}>
                        {conn.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>表名</TableHead>
                    <TableHead>行数</TableHead>
                    <TableHead>大小</TableHead>
                    <TableHead>引擎</TableHead>
                    <TableHead>字符集</TableHead>
                    <TableHead>最后更新</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map((table) => (
                    <TableRow key={table.name}>
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>{table.rows.toLocaleString()}</TableCell>
                      <TableCell>{table.size}</TableCell>
                      <TableCell>{table.engine}</TableCell>
                      <TableCell>{table.collation}</TableCell>
                      <TableCell>{table.lastUpdated.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Search className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="query" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SQL查询工具</CardTitle>
              <CardDescription>执行SQL查询和查看结果</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Select value={selectedConnection} onValueChange={setSelectedConnection}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {connections
                      .filter((c) => c.status === "connected")
                      .map((conn) => (
                        <SelectItem key={conn.id} value={conn.id}>
                          {conn.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>SQL查询</Label>
                <Textarea
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="输入SQL查询语句..."
                  rows={6}
                  className="font-mono"
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={executeQuery}
                  disabled={isExecutingQuery || !queryInput.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isExecutingQuery ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      执行中...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      执行查询
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setQueryInput("")}>
                  清空
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 查询历史 */}
          <Card>
            <CardHeader>
              <CardTitle>查询历史</CardTitle>
              <CardDescription>最近执行的查询记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queryLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(log.status)}
                        <span className="text-sm font-medium">{log.database}</span>
                        <Badge variant="outline" className="text-xs">
                          {log.duration.toFixed(1)}ms
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{log.timestamp.toLocaleString()}</span>
                    </div>
                    <code className="text-sm bg-gray-100 p-2 rounded block">{log.query}</code>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>返回行数: {log.rows}</span>
                      <span>状态: {log.status === "success" ? "成功" : "失败"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">备份任务</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              创建备份任务
            </Button>
          </div>

          <div className="grid gap-4">
            {backupJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{job.name}</CardTitle>
                      <CardDescription>
                        {job.database} •{" "}
                        {job.type === "full" ? "全量备份" : job.type === "incremental" ? "增量备份" : "差异备份"}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(job.status)}>
                      {getStatusIcon(job.status)}
                      <span className="ml-1">
                        {job.status === "running"
                          ? "运行中"
                          : job.status === "completed"
                            ? "已完成"
                            : job.status === "failed"
                              ? "失败"
                              : "已计划"}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">计划</p>
                      <p className="font-medium">{job.schedule}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">最后运行</p>
                      <p className="font-medium">{job.lastRun.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">下次运行</p>
                      <p className="font-medium">{job.nextRun.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">备份大小</p>
                      <p className="font-medium">{job.size}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      立即运行
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      编辑
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      下载
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>连接池监控</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {connections.map((conn) => (
                    <div key={conn.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{conn.name}</span>
                        <span>
                          {conn.connectionPool.active}/{conn.connectionPool.max}
                        </span>
                      </div>
                      <Progress value={(conn.connectionPool.active / conn.connectionPool.max) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>性能指标</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {connections.map((conn) => (
                    <div key={conn.id} className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">{conn.name}</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">查询时间</p>
                          <p className="font-medium">{conn.performance.queryTime.toFixed(1)}ms</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">吞吐量</p>
                          <p className="font-medium">{conn.performance.throughput.toLocaleString()}/s</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">错误率</p>
                          <p className="font-medium">{(conn.performance.errorRate * 100).toFixed(2)}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 实时监控警报 */}
          <Card>
            <CardHeader>
              <CardTitle>监控警报</CardTitle>
              <CardDescription>数据库性能和状态警报</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {connections
                  .filter((c) => c.status === "error" || c.performance.errorRate > 0.1)
                  .map((conn) => (
                    <Alert key={conn.id} className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{conn.name}</strong>:
                        {conn.status === "error"
                          ? " 连接失败"
                          : ` 错误率过高 (${(conn.performance.errorRate * 100).toFixed(2)}%)`}
                      </AlertDescription>
                    </Alert>
                  ))}

                {connections
                  .filter((c) => c.connectionPool.active / c.connectionPool.max > 0.8)
                  .map((conn) => (
                    <Alert key={`pool_${conn.id}`} className="border-yellow-200 bg-yellow-50">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{conn.name}</strong>: 连接池使用率过高 (
                        {Math.round((conn.connectionPool.active / conn.connectionPool.max) * 100)}%)
                      </AlertDescription>
                    </Alert>
                  ))}

                {connections.every(
                  (c) =>
                    c.status === "connected" &&
                    c.performance.errorRate <= 0.1 &&
                    c.connectionPool.active / c.connectionPool.max <= 0.8,
                ) && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>所有数据库连接状态正常，性能指标良好</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CreateConnectionForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "mysql",
    host: "",
    port: "",
    database: "",
    username: "",
    password: "",
  })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">连接名称</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="输入连接名称"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">数据库类型</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mysql">MySQL</SelectItem>
              <SelectItem value="postgresql">PostgreSQL</SelectItem>
              <SelectItem value="mongodb">MongoDB</SelectItem>
              <SelectItem value="redis">Redis</SelectItem>
              <SelectItem value="sqlite">SQLite</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="host">主机地址</Label>
          <Input
            id="host"
            value={formData.host}
            onChange={(e) => setFormData((prev) => ({ ...prev, host: e.target.value }))}
            placeholder="localhost"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="port">端口</Label>
          <Input
            id="port"
            type="number"
            value={formData.port}
            onChange={(e) => setFormData((prev) => ({ ...prev, port: e.target.value }))}
            placeholder="3306"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="database">数据库名</Label>
        <Input
          id="database"
          value={formData.database}
          onChange={(e) => setFormData((prev) => ({ ...prev, database: e.target.value }))}
          placeholder="输入数据库名"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">用户名</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
            placeholder="输入用户名"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="输入密码"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button onClick={onClose}>
          <Database className="w-4 h-4 mr-2" />
          创建连接
        </Button>
      </div>
    </div>
  )
}
