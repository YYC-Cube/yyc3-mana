"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  MessageCircle,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Smartphone,
  Building,
  Video,
  Cloud,
  Shield,
  Zap,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: any
  status: "connected" | "disconnected" | "error"
  features: string[]
  config?: Record<string, any>
}

export function ThirdPartyIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "wechat",
      name: "微信企业号",
      description: "企业微信集成，支持消息推送、审批流程、考勤管理",
      icon: MessageCircle,
      status: "disconnected",
      features: ["消息推送", "审批流程", "考勤打卡", "通讯录同步", "会议预约"],
    },
    {
      id: "dingtalk",
      name: "钉钉",
      description: "钉钉办公平台集成，实现统一办公体验",
      icon: Building,
      status: "connected",
      features: ["即时通讯", "视频会议", "智能考勤", "审批流程", "日程管理"],
      config: { appKey: "dingxxxxxxxxxxxx", appSecret: "***" },
    },
    {
      id: "feishu",
      name: "飞书",
      description: "字节跳动飞书平台，现代化办公协作",
      icon: Cloud,
      status: "disconnected",
      features: ["多维表格", "云文档", "视频会议", "机器人", "工作流"],
    },
    {
      id: "tencent-meeting",
      name: "腾讯会议",
      description: "腾讯会议集成，一键发起和管理会议",
      icon: Video,
      status: "disconnected",
      features: ["会议预约", "会议管理", "录制回放", "屏幕共享", "会议统计"],
    },
    {
      id: "alipay",
      name: "支付宝",
      description: "支付宝支付和小程序集成",
      icon: Smartphone,
      status: "disconnected",
      features: ["在线支付", "小程序", "芝麻信用", "花呗分期", "账单管理"],
    },
    {
      id: "wechat-pay",
      name: "微信支付",
      description: "微信支付和小程序商城集成",
      icon: MessageCircle,
      status: "disconnected",
      features: ["微信支付", "小程序", "公众号", "模板消息", "客服系统"],
    },
  ])

  const [activeTab, setActiveTab] = useState("overview")
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  // 连接集成
  const connectIntegration = async (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === integrationId ? { ...item, status: "connected" as const } : item)),
    )

    // 模拟API调用
    console.log(`连接集成: ${integrationId}`)
  }

  // 断开集成
  const disconnectIntegration = async (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === integrationId ? { ...item, status: "disconnected" as const } : item)),
    )

    console.log(`断开集成: ${integrationId}`)
  }

  // 获取状态图标
  const getStatusIcon = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const connectedCount = integrations.filter((i) => i.status === "connected").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Zap className="w-8 h-8 mr-3 text-blue-600" />
            第三方系统集成
          </h1>
          <p className="text-muted-foreground">连接国内主流办公和业务平台</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            已连接 {connectedCount}/{integrations.length} 个平台
          </Badge>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            集成设置
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">集成概览</TabsTrigger>
          <TabsTrigger value="communication">通讯协作</TabsTrigger>
          <TabsTrigger value="payment">支付服务</TabsTrigger>
          <TabsTrigger value="settings">配置管理</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* 集成状态概览 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">已连接平台</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{connectedCount}</div>
                <p className="text-sm text-muted-foreground">正常运行中</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">可用功能</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {integrations.reduce((acc, item) => acc + item.features.length, 0)}
                </div>
                <p className="text-sm text-muted-foreground">集成功能总数</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">数据同步</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">实时</div>
                <p className="text-sm text-muted-foreground">同步状态</p>
              </CardContent>
            </Card>
          </div>

          {/* 所有集成列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => {
              const IconComponent = integration.icon
              return (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusIcon(integration.status)}
                            <Badge className={getStatusColor(integration.status)}>
                              {integration.status === "connected"
                                ? "已连接"
                                : integration.status === "error"
                                  ? "连接错误"
                                  : "未连接"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">支持功能:</p>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {integration.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{integration.features.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {integration.status === "connected" ? (
                          <>
                            <Button size="sm" variant="outline" onClick={() => setSelectedIntegration(integration)}>
                              <Settings className="w-3 h-3 mr-1" />
                              配置
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => disconnectIntegration(integration.id)}
                            >
                              断开
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" className="w-full" onClick={() => connectIntegration(integration.id)}>
                            <ExternalLink className="w-3 h-3 mr-1" />
                            连接
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations
              .filter((i) => ["wechat", "dingtalk", "feishu", "tencent-meeting"].includes(i.id))
              .map((integration) => {
                const IconComponent = integration.icon
                return (
                  <Card key={integration.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <IconComponent className="w-6 h-6 mr-2 text-blue-600" />
                        {integration.name}
                      </CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">启用集成</span>
                          <Switch
                            checked={integration.status === "connected"}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                connectIntegration(integration.id)
                              } else {
                                disconnectIntegration(integration.id)
                              }
                            }}
                          />
                        </div>

                        {integration.status === "connected" && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">可用功能:</p>
                            {integration.features.map((feature, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span>{feature}</span>
                                <Switch defaultChecked />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>支付集成需要完成企业认证和安全配置。请确保遵循相关平台的安全规范。</AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations
              .filter((i) => ["alipay", "wechat-pay"].includes(i.id))
              .map((integration) => {
                const IconComponent = integration.icon
                return (
                  <Card key={integration.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <IconComponent className="w-6 h-6 mr-2 text-blue-600" />
                        {integration.name}
                      </CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">商户号</label>
                            <Input placeholder="请输入商户号" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">应用ID</label>
                            <Input placeholder="请输入应用ID" className="mt-1" />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">API密钥</label>
                          <Input type="password" placeholder="请输入API密钥" className="mt-1" />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm">启用支付功能</span>
                          <Switch
                            checked={integration.status === "connected"}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                connectIntegration(integration.id)
                              } else {
                                disconnectIntegration(integration.id)
                              }
                            }}
                          />
                        </div>

                        <Button className="w-full">
                          <Shield className="w-4 h-4 mr-2" />
                          测试连接
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>全局集成设置</CardTitle>
              <CardDescription>管理所有第三方集成的通用配置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">自动同步</p>
                  <p className="text-sm text-muted-foreground">自动同步数据到第三方平台</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">错误通知</p>
                  <p className="text-sm text-muted-foreground">集成出现错误时发送通知</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">数据加密</p>
                  <p className="text-sm text-muted-foreground">启用端到端数据加密</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div>
                <label className="text-sm font-medium">同步频率</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>实时同步</option>
                  <option>每5分钟</option>
                  <option>每15分钟</option>
                  <option>每小时</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">日志保留时间</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>7天</option>
                  <option>30天</option>
                  <option>90天</option>
                  <option>永久保留</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>集成日志</CardTitle>
              <CardDescription>查看最近的集成活动和错误日志</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "2024-01-15 14:30", type: "success", message: "钉钉数据同步成功" },
                  { time: "2024-01-15 14:25", type: "info", message: "微信企业号连接建立" },
                  { time: "2024-01-15 14:20", type: "warning", message: "支付宝接口响应缓慢" },
                  { time: "2024-01-15 14:15", type: "error", message: "飞书API调用失败" },
                ].map((log, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm">
                    <span className="text-muted-foreground">{log.time}</span>
                    <Badge
                      variant={log.type === "error" ? "destructive" : log.type === "warning" ? "secondary" : "default"}
                    >
                      {log.type}
                    </Badge>
                    <span>{log.message}</span>
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
