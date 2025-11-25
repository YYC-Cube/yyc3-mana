"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Brain, Bot, TrendingUp, Zap, MessageSquare, BarChart3, Users, Target, Lightbulb, Search, Plus, Play, Settings } from 'lucide-react'

export default function AIPage() {
  const aiFeatures = [
    {
      id: "AI-001",
      title: "智能数据分析",
      description: "自动分析业务数据，发现潜在趋势和机会",
      status: "active",
      usage: 85,
      icon: BarChart3,
    },
    {
      id: "AI-002",
      title: "客户行为预测",
      description: "基于历史数据预测客户行为和需求",
      status: "active",
      usage: 72,
      icon: Users,
    },
    {
      id: "AI-003",
      title: "智能推荐系统",
      description: "为客户提供个性化产品和服务推荐",
      status: "training",
      usage: 45,
      icon: Target,
    },
    {
      id: "AI-004",
      title: "自动化流程优化",
      description: "识别并优化业务流程中的效率瓶颈",
      status: "pending",
      usage: 0,
      icon: Zap,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "运行中"
      case "training":
        return "训练中"
      case "pending":
        return "待启动"
      default:
        return "未知"
    }
  }

  return (
    <AdaptiveSidebar defaultModule="ai-analysis">
      <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 min-h-screen">
        {/* 页面头部 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-purple-600" />
              AI智能分析
            </h1>
            <p className="text-gray-600 mt-2">人工智能驱动的企业数据分析和洞察</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-l-4 border-l-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
            >
              <Settings className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              AI设置
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              新建分析
            </Button>
          </div>
        </div>

        {/* AI功能概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI模型数</CardTitle>
              <Brain className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{aiFeatures.length}</div>
              <p className="text-xs text-gray-600">已部署模型</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">运行中</CardTitle>
              <Bot className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {aiFeatures.filter((f) => f.status === "active").length}
              </div>
              <p className="text-xs text-gray-600">活跃AI服务</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">训练中</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {aiFeatures.filter((f) => f.status === "training").length}
              </div>
              <p className="text-xs text-gray-600">模型训练</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均准确率</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">92.5%</div>
              <p className="text-xs text-gray-600">模型性能</p>
            </CardContent>
          </Card>
        </div>

        {/* AI助手对话 */}
        <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <MessageSquare className="w-5 h-5 mr-2" />
              AI智能助手
            </CardTitle>
            <CardDescription>与AI助手对话，获取数据洞察和建议</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="询问AI助手关于业务数据的问题..."
                    className="pl-10 border-l-4 border-l-purple-500"
                  />
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300 hover:scale-105 group">
                  <MessageSquare className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                  发送
                </Button>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      您好！我是您的AI智能助手。我可以帮您分析业务数据、预测趋势、优化流程。请告诉我您想了解什么？
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 ml-11">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-l-4 border-l-purple-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                  >
                    <span className="group-hover:translate-x-1 transition-all duration-300">分析销售趋势</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-l-4 border-l-purple-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                  >
                    <span className="group-hover:translate-x-1 transition-all duration-300">预测客户需求</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-l-4 border-l-purple-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                  >
                    <span className="group-hover:translate-x-1 transition-all duration-300">优化运营流程</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI功能模块 */}
        <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <Brain className="w-5 h-5 mr-2" />
              AI功能模块
            </CardTitle>
            <CardDescription>智能分析和预测功能</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiFeatures.map((feature) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={feature.id}
                    className="border-l-4 border-l-purple-500 bg-purple-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-gray-900">{feature.title}</h3>
                          <Badge className={getStatusColor(feature.status)}>{getStatusText(feature.status)}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>使用率</span>
                        <span>{feature.usage}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${feature.usage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      {feature.status === "pending" ? (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300 hover:scale-105 group"
                        >
                          <Play className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                          启动
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-l-4 border-l-purple-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                        >
                          <Settings className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                          配置
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI洞察和建议 */}
        <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <Lightbulb className="w-5 h-5 mr-2" />
              AI洞察建议
            </CardTitle>
            <CardDescription>基于数据分析的智能建议</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-800">销售机会识别</h4>
                    <p className="text-sm text-purple-600 mt-1">
                      AI分析发现，客户群体A在周末的购买转化率比工作日高35%，建议增加周末营销活动
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">成本优化建议</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      通过优化库存管理流程，预计可以降低15%的运营成本，建议实施智能库存预测系统
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">客户留存策略</h4>
                    <p className="text-sm text-green-600 mt-1">
                      高价值客户流失风险预警：3位重要客户可能在下月流失，建议主动联系并提供专属服务
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdaptiveSidebar>
  )
}
