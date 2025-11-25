"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import {
  Globe,
  Key,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Plus,
  MoreHorizontal,
  Zap,
  Database,
  Cloud,
  Webhook,
  Code,
  Monitor,
  RefreshCw,
} from "lucide-react"

interface APIEndpoint {
  id: string
  name: string
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  status: "active" | "inactive" | "deprecated"
  version: string
  category: string
  description: string
  responseTime: number
  successRate: number
  requestsToday: number
  lastUsed: Date
  rateLimit: number
  authentication: "none" | "api-key" | "oauth" | "jwt"
}

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  expiresAt: Date
  lastUsed: Date
  requestCount: number
  status: "active" | "revoked" | "expired"
}

interface Integration {
  id: string
  name: string
  type: "webhook" | "database" | "cloud-service" | "payment" | "analytics"
  status: "connected" | "disconnected" | "error"
  provider: string
  description: string
  lastSync: Date
  dataTransferred: number
  errorCount: number
}

export function APIManagementCenter() {
  const [endpoints] = useState<APIEndpoint[]>([
    {
      id: "api_1",
      name: "获取客户列表",
      url: "/api/customers",
      method: "GET",
      status: "active",
      version: "v1.2",
      category: "客户管理",
      description: "获取所有客户的基本信息",
      responseTime: 245,
      successRate: 99.2,
      requestsToday: 1247,
      lastUsed: new Date(),
      rateLimit: 1000,
      authentication: "api-key",
    },
    {
      id: "api_2",
      name: "创建订单",
      url: "/api/orders",
      method: "POST",
      status: "active",
      version: "v2.0",
      category: "订单管理",
      description: "创建新的订单记录",
      responseTime: 156,
      successRate: 98.7,
      requestsToday: 892,
      lastUsed: new Date(),
      rateLimit: 500,
      authentication: "jwt",
    },
    {
      id: "api_3",
      name: "更新产品信息",
      url: "/api/products/{id}",
      method: "PUT",
      status: "deprecated",
      version: "v1.0",
      category: "产品管理",
      description: "更新指定产品的详细信息",
      responseTime: 312,
      successRate: 95.4,
      requestsToday: 156,
      lastUsed: new Date(Date.now() - 86400000),
      rateLimit: 200,
      authentication: "oauth",
    },
  ])

  const [apiKeys] = useState<APIKey[]>([
    {
      id: "key_1",
      name: "生产环境密钥",
      key: "ak_prod_1234567890abcdef",
      permissions: ["read", "write", "delete"],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(),
      requestCount: 15420,
      status: "active",
    },
    {
      id: "key_2",
      name: "测试环境密钥",
      key: "ak_test_abcdef1234567890",
      permissions: ["read", "write"],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 3600000),
      requestCount: 2847,
      status: "active",
    },
    {
      id: "key_3",
      name: "已撤销密钥",
      key: "ak_revoked_fedcba0987654321",
      permissions: ["read"],
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 86400000),
      requestCount: 892,
      status: "revoked",
    },
  ])

  const [integrations] = useState<Integration[]>([
    {
      id: "int_1",
      name: "微信支付",
      type: "payment",
      status: "connected",
      provider: "WeChat Pay",
      description: "微信支付接口集成",
      lastSync: new Date(),
      dataTransferred: 2.4,
      errorCount: 0,
    },
    {
      id: "int_2",
      name: "阿里云OSS",
      type: "cloud-service",
      status: "connected",
      provider: "Alibaba Cloud",
      description: "对象存储服务",
      lastSync: new Date(Date.now() - 1800000),
      dataTransferred: 15.7,
      errorCount: 2,
    },
    {
      id: "int_3",
      name: "MySQL数据库",
      type: "database",
      status: "error",
      provider: "MySQL",
      description: "主数据库连接",
      lastSync: new Date(Date.now() - 3600000),
      dataTransferred: 0,
      errorCount: 5,
    },
  ])

  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // 模拟API性能数据
  const performanceData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    requests: Math.floor(Math.random() * 1000) + 200,
    responseTime: Math.floor(Math.random() * 200) + 100,
    errors: Math.floor(Math.random() * 20),
  }))

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "connected":
        return "bg-green-100 text-green-800"
      case "inactive":
      case "disconnected":
        return "bg-gray-100 text-gray-800"
      case "deprecated":
      case "error":
        return "bg-red-100 text-red-800"
      case "revoked":
      case "expired":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取方法颜色
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800"
      case "POST":
        return "bg-green-100 text-green-800"
      case "PUT":
        return "bg-yellow-100 text-yellow-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      case "PATCH":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取集成类型图标
  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case "webhook":
        return <Webhook className="w-5 h-5" />
      case "database":
        return <Database className="w-5 h-5" />
      case "cloud-service":
        return <Cloud className="w-5 h-5" />
      case "payment":
        return <Zap className="w-5 h-5" />
      case "analytics":
        return <Monitor className="w-5 h-5" />
      default:
        return <Globe className="w-5 h-5" />
    }
  }

  const filteredEndpoints =
    selectedEndpoint === "all" ? endpoints : endpoints.filter((e) => e.category === selectedEndpoint)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Globe className="w-8 h-8 mr-3 text-blue-600" />
            API管理中心
          </h1>
          <p className="text-muted-foreground">统一管理API接口、密钥和第三方集成</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Monitor className="w-4 h-4 mr-2" />
            监控面板
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                新建API
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建新API接口</DialogTitle>
                <DialogDescription>配置新的API接口信息</DialogDescription>
              </DialogHeader>
              <CreateAPIForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* API概览统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-600" />
              总API数量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{endpoints.length}</div>
            <p className="text-sm text-muted-foreground">个接口</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              今日请求
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {endpoints.reduce((sum, api) => sum + api.requestsToday, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">次调用</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              平均成功率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {(endpoints.reduce((sum, api) => sum + api.successRate, 0) / endpoints.length).toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground">成功率</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Clock className="w-5 h-5 mr-2 text-yellow-600" />
              平均响应时间
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(endpoints.reduce((sum, api) => sum + api.responseTime, 0) / endpoints.length)}ms
            </div>
            <p className="text-sm text-muted-foreground">响应时间</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Key className="w-5 h-5 mr-2 text-purple-600" />
              活跃密钥
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{apiKeys.filter((key) => key.status === "active").length}</div>
            <p className="text-sm text-muted-foreground">个密钥</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints">API接口</TabsTrigger>
          <TabsTrigger value="keys">密钥管理</TabsTrigger>
          <TabsTrigger value="integrations">第三方集成</TabsTrigger>
          <TabsTrigger value="monitoring">监控分析</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-6">
          <div className="flex justify-between items-center">
            <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择API分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有接口</SelectItem>
                <SelectItem value="客户管理">客户管理</SelectItem>
                <SelectItem value="订单管理">订单管理</SelectItem>
                <SelectItem value="产品管理">产品管理</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API接口列表</CardTitle>
              <CardDescription>管理所有API接口的状态和配置</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>接口名称</TableHead>
                    <TableHead>方法</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>成功率</TableHead>
                    <TableHead>响应时间</TableHead>
                    <TableHead>今日请求</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEndpoints.map((endpoint) => (
                    <TableRow key={endpoint.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{endpoint.name}</p>
                          <p className="text-sm text-muted-foreground">{endpoint.category}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{endpoint.url}</code>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(endpoint.status)}>
                          {endpoint.status === "active" ? "活跃" : endpoint.status === "inactive" ? "停用" : "已弃用"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={endpoint.successRate} className="w-16 h-2" />
                          <span className="text-sm">{endpoint.successRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{endpoint.responseTime}ms</TableCell>
                      <TableCell>{endpoint.requestsToday.toLocaleString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Settings className="w-4 h-4 mr-2" />
                              配置
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Code className="w-4 h-4 mr-2" />
                              文档
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Monitor className="w-4 h-4 mr-2" />
                              监控
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">API密钥管理</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              生成新密钥
            </Button>
          </div>

          <div className="grid gap-6">
            {apiKeys.map((key) => (
              <Card key={key.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{key.name}</CardTitle>
                      <CardDescription>
                        创建时间: {key.lastUsed.toLocaleDateString("zh-CN")} • 使用次数:{" "}
                        {key.requestCount.toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(key.status)}>
                      {key.status === "active" ? "活跃" : key.status === "revoked" ? "已撤销" : "已过期"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>API密钥</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm">{key.key}</code>
                        <Button variant="outline" size="sm">
                          复制
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>权限</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {key.permissions.map((permission) => (
                            <Badge key={permission} variant="outline">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>过期时间</Label>
                        <p className="text-sm mt-1">{key.expiresAt.toLocaleDateString("zh-CN")}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        重新生成
                      </Button>
                      {key.status === "active" && (
                        <Button variant="destructive" size="sm">
                          撤销
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">第三方集成</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              添加集成
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getIntegrationIcon(integration.type)}
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription>{integration.provider}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status === "connected"
                        ? "已连接"
                        : integration.status === "disconnected"
                          ? "未连接"
                          : "错误"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{integration.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">最后同步</p>
                        <p className="font-medium">{integration.lastSync.toLocaleString("zh-CN")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">数据传输</p>
                        <p className="font-medium">{integration.dataTransferred}GB</p>
                      </div>
                    </div>

                    {integration.errorCount > 0 && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>检测到 {integration.errorCount} 个错误，需要处理</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        配置
                      </Button>
                      <Button variant="outline" size="sm">
                        <Monitor className="w-4 h-4 mr-2" />
                        监控
                      </Button>
                      {integration.status === "error" && (
                        <Button size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          重试
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API请求趋势 */}
            <Card>
              <CardHeader>
                <CardTitle>API请求趋势</CardTitle>
                <CardDescription>过去24小时的API调用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 响应时间分析 */}
            <Card>
              <CardHeader>
                <CardTitle>响应时间分析</CardTitle>
                <CardDescription>API响应时间变化趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="responseTime" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 错误统计 */}
          <Card>
            <CardHeader>
              <CardTitle>错误统计</CardTitle>
              <CardDescription>API错误率和错误类型分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">总错误数</p>
                  <p className="text-3xl font-bold text-red-600">
                    {performanceData.reduce((sum, data) => sum + data.errors, 0)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">错误率</p>
                  <p className="text-3xl font-bold text-yellow-600">2.3%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">平均MTTR</p>
                  <p className="text-3xl font-bold text-blue-600">15分钟</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CreateAPIForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    method: "GET",
    category: "",
    description: "",
    authentication: "api-key",
    rateLimit: "1000",
  })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">接口名称</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="输入接口名称"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="method">请求方法</Label>
          <Select
            value={formData.method}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, method: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">接口URL</Label>
        <Input
          id="url"
          value={formData.url}
          onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
          placeholder="/api/example"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">分类</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            placeholder="接口分类"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rateLimit">速率限制</Label>
          <Input
            id="rateLimit"
            type="number"
            value={formData.rateLimit}
            onChange={(e) => setFormData((prev) => ({ ...prev, rateLimit: e.target.value }))}
            placeholder="1000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">描述</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="接口功能描述"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button onClick={onClose}>创建接口</Button>
      </div>
    </div>
  )
}
