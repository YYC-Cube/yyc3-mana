"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select as LucideSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  Zap,
  TrendingUp,
  Target,
  Users,
  DollarSign,
  Activity,
  Lightbulb,
  RefreshCwIcon,
  Settings,
  CheckCircle,
  Eye,
  Send,
  MessageSquare,
  BarChartIcon,
  Cpu,
  Package,
  Calculator,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
} from "recharts"

export function AIAnalysisModule() {
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [analysisType, setAnalysisType] = useState("predictive")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // AI分析数据
  const aiInsights = [
    {
      title: "销售预测",
      confidence: 94,
      prediction: "下月销售额预计增长15%",
      impact: "high",
      category: "sales",
    },
    {
      title: "客户流失风险",
      confidence: 87,
      prediction: "3位VIP客户存在流失风险",
      impact: "high",
      category: "customer",
    },
    {
      title: "库存优化",
      confidence: 91,
      prediction: "建议增加产品A库存20%",
      impact: "medium",
      category: "inventory",
    },
    {
      title: "市场趋势",
      confidence: 89,
      prediction: "Q3市场需求将上升12%",
      impact: "medium",
      category: "market",
    },
  ]

  // 预测数据
  const predictionData = [
    { month: "7月", actual: 2800000, predicted: 3220000, confidence: 0.94 },
    { month: "8月", actual: null, predicted: 3450000, confidence: 0.91 },
    { month: "9月", actual: null, predicted: 3680000, confidence: 0.88 },
    { month: "10月", actual: null, predicted: 3920000, confidence: 0.85 },
    { month: "11月", actual: null, predicted: 4150000, confidence: 0.82 },
    { month: "12月", actual: null, predicted: 4380000, confidence: 0.79 },
  ]

  // 智能推荐
  const recommendations = [
    {
      id: "1",
      title: "优化营销策略",
      description: "基于客户行为分析，建议调整数字营销投入分配",
      priority: "high",
      impact: "提升转化率15%",
      effort: "中等",
      category: "marketing",
    },
    {
      id: "2",
      title: "库存管理优化",
      description: "AI预测显示某些产品需求将大幅增长",
      priority: "medium",
      impact: "减少缺货风险",
      effort: "低",
      category: "inventory",
    },
    {
      id: "3",
      title: "客户服务改进",
      description: "分析客户反馈，识别服务流程中的痛点",
      priority: "high",
      impact: "提升满意度20%",
      effort: "高",
      category: "service",
    },
    {
      id: "4",
      title: "定价策略调整",
      description: "市场分析建议对特定产品进行价格优化",
      priority: "medium",
      impact: "增加利润率8%",
      effort: "中等",
      category: "pricing",
    },
  ]

  // AI模型状态
  const modelStatus = [
    {
      name: "销售预测模型",
      status: "active",
      accuracy: 94.2,
      lastTrained: "2025-06-15",
      predictions: 1247,
    },
    {
      name: "客户分析模型",
      status: "active",
      accuracy: 91.8,
      lastTrained: "2025-06-18",
      predictions: 856,
    },
    {
      name: "库存优化模型",
      status: "training",
      accuracy: 89.5,
      lastTrained: "2025-06-20",
      predictions: 432,
    },
    {
      name: "市场趋势模型",
      status: "active",
      accuracy: 87.3,
      lastTrained: "2025-06-12",
      predictions: 678,
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-blue-100 text-blue-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sales":
        return <DollarSign className="w-4 h-4" />
      case "customer":
        return <Users className="w-4 h-4" />
      case "inventory":
        return <Package className="w-4 h-4" />
      case "market":
        return <TrendingUp className="w-4 h-4" />
      case "marketing":
        return <Target className="w-4 h-4" />
      case "service":
        return <MessageSquare className="w-4 h-4" />
      case "pricing":
        return <Calculator className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            AI智能助手
          </h1>
          <p className="text-gray-600 mt-2">人工智能驱动的业务分析和决策支持系统</p>
        </div>
        <div className="flex space-x-3">
          <LucideSelect value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-40 border-l-4 border-l-purple-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
              <SelectItem value="custom">自定义模型</SelectItem>
            </SelectContent>
          </LucideSelect>
          <Button
            variant="outline"
            className="border-l-4 border-l-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Settings className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            设置
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Zap className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            开始分析
          </Button>
        </div>
      </div>

      {/* AI洞察概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {aiInsights.map((insight, index) => (
          <Card
            key={index}
            className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
              {getCategoryIcon(insight.category)}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">{insight.prediction}</p>
                <div className="flex items-center justify-between">
                  <Badge className={getImpactColor(insight.impact)}>
                    {insight.impact === "high" ? "高影响" : insight.impact === "medium" ? "中影响" : "低影响"}
                  </Badge>
                  <span className="text-xs text-purple-600 font-medium">{insight.confidence}% 置信度</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${insight.confidence}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 主要分析区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 预测分析 */}
        <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              销售预测分析
            </CardTitle>
            <CardDescription>基于AI模型的未来6个月销售预测</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `¥${((value as number) / 10000).toFixed(0)}万`,
                    name === "actual" ? "实际" : "预测",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#8b5cf6"
                  fill="url(#purpleGradient)"
                  strokeWidth={2}
                  name="actual"
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#a855f7"
                  fill="url(#purpleLightGradient)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="predicted"
                />
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="purpleLightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI对话助手 */}
        <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <MessageSquare className="w-5 h-5 mr-2" />
              AI对话助手
            </CardTitle>
            <CardDescription>与AI助手进行业务咨询和数据分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-48 bg-purple-50 rounded-lg p-4 overflow-y-auto border-l-4 border-l-purple-500">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Brain className="w-6 h-6 text-purple-600 mt-1" />
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">
                        您好！我是您的AI业务助手。我可以帮您分析数据、预测趋势、提供决策建议。请问有什么可以帮助您的吗？
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 justify-end">
                    <div className="bg-purple-100 rounded-lg p-3">
                      <p className="text-sm">分析一下我们的客户流失情况</p>
                    </div>
                    <Users className="w-6 h-6 text-gray-600 mt-1" />
                  </div>
                  <div className="flex items-start space-x-2">
                    <Brain className="w-6 h-6 text-purple-600 mt-1" />
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">
                        根据分析，您的客户流失率为8.5%，主要集中在新客户群体。建议加强新客户的跟进服务，预计可降低流失率至6%以下。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Input placeholder="输入您的问题..." className="flex-1 border-l-4 border-l-purple-500" />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300 hover:scale-105 group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 智能推荐和模型状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 智能推荐 */}
        <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <Lightbulb className="w-5 h-5 mr-2" />
              智能推荐
            </CardTitle>
            <CardDescription>AI生成的业务优化建议</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="border-l-4 border-l-purple-500 bg-purple-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(rec.category)}
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    </div>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority === "high" ? "高优先级" : rec.priority === "medium" ? "中优先级" : "低优先级"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">预期影响: </span>
                      <span className="font-medium text-green-600">{rec.impact}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">实施难度: </span>
                      <span className="font-medium">{rec.effort}</span>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 text-xs transition-all duration-300 hover:scale-105 group bg-transparent"
                    >
                      <Eye className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                      详情
                    </Button>
                    <Button
                      size="sm"
                      className="h-6 px-2 text-xs bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300 hover:scale-105 group"
                    >
                      <CheckCircle className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                      采纳
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI模型状态 */}
        <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <Cpu className="w-5 h-5 mr-2" />
              AI模型状态
            </CardTitle>
            <CardDescription>各AI模型的运行状态和性能指标</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {modelStatus.map((model, index) => (
                <div
                  key={index}
                  className="border-l-4 border-l-purple-500 bg-purple-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{model.name}</h4>
                    <Badge className={getStatusColor(model.status)}>
                      {model.status === "active" ? "运行中" : model.status === "training" ? "训练中" : "未激活"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-600">准确率: </span>
                      <span className="font-medium">{model.accuracy}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">预测次数: </span>
                      <span className="font-medium">{model.predictions}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">最后训练: {model.lastTrained}</span>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs transition-all duration-300 hover:scale-105 group"
                      >
                        <RefreshCwIcon className="w-3 h-3 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs transition-all duration-300 hover:scale-105 group"
                      >
                        <Settings className="w-3 h-3 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${model.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI分析工具 */}
      <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <BarChartIcon className="w-5 h-5 mr-2" />
            AI分析工具
          </CardTitle>
          <CardDescription>选择分析类型并配置参数</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300 hover:scale-105 group">
              <TrendingUp className="w-6 h-6 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">预测分析</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 bg-transparent border-l-4 border-l-purple-500 transition-all duration-300 hover:scale-105 group"
            >
              <Users className="w-6 h-6 text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">客户分析</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 bg-transparent border-l-4 border-l-purple-500 transition-all duration-300 hover:scale-105 group"
            >
              <RechartsBarChart className="w-6 h-6 text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">市场分析</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 bg-transparent border-l-4 border-l-purple-500 transition-all duration-300 hover:scale-105 group"
            >
              <Target className="w-6 h-6 text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">风险评估</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
