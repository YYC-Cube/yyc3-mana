"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Zap,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  Search,
  Webhook,
  Database,
  Cloud,
  Mail,
  MessageSquare,
  CreditCard,
  BarChart3,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  category: string
  status: "connected" | "disconnected" | "error" | "pending"
  icon: any
  lastSync: string
  dataPoints: number
  isActive: boolean
}

export function IntegrationModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const integrations: Integration[] = [
    {
      id: "1",
      name: "微信企业版",
      description: "企业微信集成，支持消息推送和用户同步",
      category: "通讯",
      status: "connected",
      icon: MessageSquare,
      lastSync: "2025-06-21 14:30",
      dataPoints: 1250,
      isActive: true,
    },
    {
      id: "2",
      name: "钉钉",
      description: "钉钉办公平台集成，支持考勤和审批同步",
      category: "办公",
      status: "connected",
      icon: Clock,
      lastSync: "2025-06-21 13:45",
      dataPoints: 890,
      isActive: true,
    },
    {
      id: "3",
      name: "支付宝",
      description: "支付宝支付接口，支持在线支付和账单同步",
      category: "支付",
      status: "connected",
      icon: CreditCard,
      lastSync: "2025-06-21 12:20",
      dataPoints: 456,
      isActive: true,
    },
    {
      id: "4",
      name: "腾讯云",
      description: "腾讯云服务集成，支持存储和计算资源管理",
      category: "云服务",
      status: "error",
      icon: Cloud,
      lastSync: "2025-06-20 16:30",
      dataPoints: 0,
      isActive: false,
    },
    {
      id: "5",
      name: "阿里云邮箱",
      description: "企业邮箱服务，支持邮件发送和接收",
      category: "邮件",
      status: "connected",
      icon: Mail,
      lastSync: "2025-06-21 10:15",
      dataPoints: 234,
      isActive: true,
    },
    {
      id: "6",
      name: "百度统计",
      description: "网站数据分析，支持访问统计和用户行为分析",
      category: "分析",
      status: "pending",
      icon: BarChart3,
      lastSync: "从未同步",
      dataPoints: 0,
      isActive: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "disconnected":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "已连接"
      case "disconnected":
        return "未连接"
      case "error":
        return "连接错误"
      case "pending":
        return "待配置"
      default:
        return "未知状态"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "disconnected":
        return <Clock className="w-4 h-4 text-gray-600" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const connectedCount = integrations.filter((i) => i.status === "connected").length
  const errorCount = integrations.filter((i) => i.status === "error").length
  const totalDataPoints = integrations.reduce((sum, i) => sum + i.dataPoints, 0)

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-rose-600" />
            集成管理中心
          </h1>
          <p className="text-gray-600 mt-2">第三方服务集成和API管理</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-l-4 border-l-rose-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Webhook className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            API文档
          </Button>
          <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            添加集成
          </Button>
        </div>
      </div>

      {/* 集成概览统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-rose-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总集成数</CardTitle>
            <Zap className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700">{integrations.length}</div>
            <p className="text-xs text-rose-600">已配置的服务</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已连接</CardTitle>
            <CheckCircle className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700">{connectedCount}</div>
            <p className="text-xs text-green-600">正常运行中</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">异常服务</CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700">{errorCount}</div>
            <p className="text-xs text-red-600">需要处理</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">数据同步</CardTitle>
            <Database className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700">{totalDataPoints.toLocaleString()}</div>
            <p className="text-xs text-rose-600">今日同步条数</p>
          </CardContent>
        </Card>
      </div>

      {/* 集成管理详情 */}
      <Card className="border-l-4 border-l-rose-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-rose-700">
            <Settings className="w-5 h-5 mr-2" />
            集成服务管理
          </CardTitle>
          <CardDescription>管理所有第三方服务集成和API连接</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">全部服务</TabsTrigger>
              <TabsTrigger value="connected">已连接</TabsTrigger>
              <TabsTrigger value="error">异常服务</TabsTrigger>
              <TabsTrigger value="settings">集成设置</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索集成服务..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 max-w-sm border-l-4 border-l-rose-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-l-4 border-l-rose-500 bg-transparent">
                    筛选
                  </Button>
                  <Button variant="outline" size="sm" className="border-l-4 border-l-rose-500 bg-transparent">
                    批量操作
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations.map((integration) => (
                  <Card
                    key={integration.id}
                    className="border-l-4 border-l-rose-500 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <integration.icon className="w-8 h-8 text-rose-600" />
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <Badge variant="outline">{integration.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(integration.status)}
                          <Badge className={getStatusColor(integration.status)}>
                            {getStatusText(integration.status)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>

                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>最后同步:</span>
                          <span>{integration.lastSync}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>数据条数:</span>
                          <span>{integration.dataPoints.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>启用状态:</span>
                          <Switch checked={integration.isActive} className="data-[state=checked]:bg-rose-500" />
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-l-4 border-l-rose-500 transition-all duration-300 hover:scale-105 bg-transparent"
                        >
                          <Settings className="w-3 h-3 mr-1" />
                          配置
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white transition-all duration-300 hover:scale-105 group"
                        >
                          <Zap className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                          测试
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="connected" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations
                  .filter((i) => i.status === "connected")
                  .map((integration) => (
                    <Card
                      key={integration.id}
                      className="border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <integration.icon className="w-8 h-8 text-green-600" />
                            <div>
                              <CardTitle className="text-base">{integration.name}</CardTitle>
                              <Badge className="bg-green-100 text-green-700">运行正常</Badge>
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>

                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>最后同步:</span>
                            <span className="text-green-600">{integration.lastSync}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>同步数据:</span>
                            <span className="font-medium">{integration.dataPoints.toLocaleString()} 条</span>
                          </div>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                          <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full w-full"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="error" className="space-y-4">
              <div className="space-y-4">
                {filteredIntegrations
                  .filter((i) => i.status === "error")
                  .map((integration) => (
                    <Card
                      key={integration.id}
                      className="border-l-4 border-l-red-500 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                            <div>
                              <h3 className="font-medium text-red-800">{integration.name}</h3>
                              <p className="text-sm text-muted-foreground">{integration.description}</p>
                              <div className="text-xs text-red-600 mt-2">连接失败 - API密钥可能已过期</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-105 bg-transparent"
                            >
                              重新连接
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105"
                            >
                              修复问题
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="border-l-4 border-l-rose-500 bg-white/80 backdrop-blur-sm shadow-sm">
                <CardHeader>
                  <CardTitle className="text-rose-700">全局集成设置</CardTitle>
                  <CardDescription>配置集成服务的全局参数和安全设置</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-sync">自动同步</Label>
                        <p className="text-sm text-muted-foreground">启用后将自动同步所有集成服务的数据</p>
                      </div>
                      <Switch id="auto-sync" className="data-[state=checked]:bg-rose-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="error-notifications">错误通知</Label>
                        <p className="text-sm text-muted-foreground">集成服务出现错误时发送通知</p>
                      </div>
                      <Switch id="error-notifications" defaultChecked className="data-[state=checked]:bg-rose-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-encryption">数据加密</Label>
                        <p className="text-sm text-muted-foreground">对同步的敏感数据进行加密存储</p>
                      </div>
                      <Switch id="data-encryption" defaultChecked className="data-[state=checked]:bg-rose-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="rate-limiting">API限流</Label>
                        <p className="text-sm text-muted-foreground">启用API请求频率限制保护</p>
                      </div>
                      <Switch id="rate-limiting" defaultChecked className="data-[state=checked]:bg-rose-500" />
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white transition-all duration-300 hover:scale-105">
                        保存设置
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
