"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { APIManagementCenter } from "@/components/api/api-management-center"
import { EnhancedPredictionEngine } from "@/components/ai/enhanced-prediction-engine"
import { AutoOptimizationEngine } from "@/components/performance/auto-optimization-engine"
import { UserTrainingCenter } from "@/components/training/user-training-center"
import { Code, Brain, Zap, BookOpen, TrendingUp, Shield, Users, Settings } from "lucide-react"

export default function EnterpriseFeaturesPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const features = [
    {
      id: "api",
      title: "API管理中心",
      description: "完善的API密钥管理、使用监控和文档系统",
      icon: Code,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      stats: { keys: 8, requests: "24.5K", uptime: "99.9%" },
    },
    {
      id: "ai",
      title: "AI智能预测",
      description: "基于机器学习的业务预测和智能推荐",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      stats: { models: 4, accuracy: "92.3%", predictions: 156 },
    },
    {
      id: "optimization",
      title: "自动优化引擎",
      description: "智能监控系统性能，自动执行优化策略",
      icon: Zap,
      color: "text-green-600",
      bgColor: "bg-green-50",
      stats: { rules: 6, tasks: 23, improvement: "35%" },
    },
    {
      id: "training",
      title: "用户培训中心",
      description: "完整的培训体系和最佳实践指南",
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      stats: { courses: 12, users: 156, completion: "78%" },
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">企业级功能中心</h1>
          <p className="text-xl text-gray-600">集成API管理、AI预测、性能优化和用户培训的完整解决方案</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>功能概览</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>API管理</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>AI预测</span>
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>性能优化</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>用户培训</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* 功能概览卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => {
                const IconComponent = feature.icon
                return (
                  <Card
                    key={feature.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveTab(feature.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                        <IconComponent className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(feature.stats).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* 系统状态概览 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    系统健康状态
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API服务</span>
                      <span className="text-green-600 font-medium">正常</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI引擎</span>
                      <span className="text-green-600 font-medium">正常</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">优化引擎</span>
                      <span className="text-green-600 font-medium">正常</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">培训系统</span>
                      <span className="text-green-600 font-medium">正常</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    用户活跃度
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">今日活跃用户</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API调用次数</span>
                      <span className="font-medium">24,567</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">学习会话</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">优化任务</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-purple-600" />
                    快速操作
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <button
                      className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                      onClick={() => setActiveTab("api")}
                    >
                      创建新API密钥
                    </button>
                    <button
                      className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                      onClick={() => setActiveTab("ai")}
                    >
                      生成AI预测
                    </button>
                    <button
                      className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                      onClick={() => setActiveTab("optimization")}
                    >
                      执行系统优化
                    </button>
                    <button
                      className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                      onClick={() => setActiveTab("training")}
                    >
                      开始学习课程
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 最近活动 */}
            <Card>
              <CardHeader>
                <CardTitle>最近活动</CardTitle>
                <CardDescription>系统各模块的最新动态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      time: "2分钟前",
                      action: "API密钥 'mobile-app-key' 被创建",
                      type: "api",
                      icon: Code,
                      color: "text-blue-600",
                    },
                    {
                      time: "5分钟前",
                      action: "AI模型完成销售预测分析",
                      type: "ai",
                      icon: Brain,
                      color: "text-purple-600",
                    },
                    {
                      time: "10分钟前",
                      action: "自动优化任务提升响应时间35%",
                      type: "optimization",
                      icon: Zap,
                      color: "text-green-600",
                    },
                    {
                      time: "15分钟前",
                      action: "用户完成'客户管理'培训课程",
                      type: "training",
                      icon: BookOpen,
                      color: "text-orange-600",
                    },
                  ].map((activity, index) => {
                    const IconComponent = activity.icon
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className="flex-shrink-0">
                          <IconComponent className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <APIManagementCenter />
          </TabsContent>

          <TabsContent value="ai">
            <EnhancedPredictionEngine />
          </TabsContent>

          <TabsContent value="optimization">
            <AutoOptimizationEngine />
          </TabsContent>

          <TabsContent value="training">
            <UserTrainingCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
