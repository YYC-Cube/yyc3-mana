"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  TrendingUp,
  Target,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  PieChartIcon as RechartsPieChart,
  Activity,
  Star,
} from "lucide-react"
import {
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Pie,
} from "recharts"

export default function AICustomerDataPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedSegment, setSelectedSegment] = useState("all")

  // AI分析数据
  const aiInsights = [
    {
      id: "1",
      title: "高价值客户识别",
      description: "AI识别出23个高潜力客户，预计转化价值180万",
      confidence: 92,
      status: "active",
      impact: "high",
      customers: 23,
      value: 1800000,
    },
    {
      id: "2",
      title: "流失风险预警",
      description: "检测到15个客户存在流失风险，建议立即跟进",
      confidence: 87,
      status: "warning",
      impact: "critical",
      customers: 15,
      value: 450000,
    },
    {
      id: "3",
      title: "交叉销售机会",
      description: "发现38个交叉销售机会，平均客单价可提升35%",
      confidence: 78,
      status: "opportunity",
      impact: "medium",
      customers: 38,
      value: 680000,
    },
    {
      id: "4",
      title: "客户行为模式",
      description: "识别出5种主要客户行为模式，优化营销策略",
      confidence: 95,
      status: "completed",
      impact: "high",
      customers: 156,
      value: 0,
    },
  ]

  // 客户分段数据
  const customerSegments = [
    { name: "VIP客户", value: 28, color: "#8b5cf6", growth: 12 },
    { name: "活跃客户", value: 45, color: "#3b82f6", growth: 8 },
    { name: "潜在客户", value: 67, color: "#10b981", growth: 15 },
    { name: "流失风险", value: 16, color: "#f59e0b", growth: -5 },
  ]

  // 客户价值趋势
  const valueData = [
    { month: "1月", value: 2400000, prediction: 2450000 },
    { month: "2月", value: 2600000, prediction: 2680000 },
    { month: "3月", value: 2800000, prediction: 2850000 },
    { month: "4月", value: 3100000, prediction: 3150000 },
    { month: "5月", value: 3300000, prediction: 3400000 },
    { month: "6月", value: 3500000, prediction: 3600000 },
  ]

  // 客户行为分析
  const behaviorData = [
    { behavior: "浏览产品", frequency: 85, conversion: 12 },
    { behavior: "询价咨询", frequency: 45, conversion: 35 },
    { behavior: "下载资料", frequency: 32, conversion: 28 },
    { behavior: "参与活动", frequency: 28, conversion: 42 },
    { behavior: "推荐朋友", frequency: 15, conversion: 68 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-l-emerald-500 bg-emerald-50"
      case "warning":
        return "border-l-orange-500 bg-orange-50"
      case "opportunity":
        return "border-l-blue-500 bg-blue-50"
      case "completed":
        return "border-l-purple-500 bg-purple-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      case "opportunity":
        return <Target className="w-5 h-5 text-blue-600" />
      case "completed":
        return <Star className="w-5 h-5 text-purple-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-100 text-red-700">高影响</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700">中影响</Badge>
      case "critical":
        return <Badge className="bg-purple-100 text-purple-700">关键</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700">低影响</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            AI客户数据分析
          </h1>
          <p className="text-gray-600 mt-2">智能客户洞察与预测分析系统</p>
        </div>
        <div className="flex space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 border-l-4 border-l-purple-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年度</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新分析
          </Button>
        </div>
      </div>

      {/* AI洞察概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI洞察数量</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">127</div>
            <p className="text-xs text-gray-600">本月新增 +23</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">预测准确率</CardTitle>
            <Target className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">94.2%</div>
            <p className="text-xs text-gray-600">较上月 +2.1%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">客户价值</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">¥350万</div>
            <p className="text-xs text-gray-600">预测增长 +15%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">风险客户</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">15</div>
            <p className="text-xs text-gray-600">需要立即关注</p>
          </CardContent>
        </Card>
      </div>

      {/* AI洞察列表 */}
      <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Zap className="w-5 h-5 mr-2" />
            AI智能洞察
          </CardTitle>
          <CardDescription>基于机器学习的客户行为分析与预测</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className={`border-l-4 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 ${getStatusColor(insight.status)}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(insight.status)}
                    <div>
                      <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getImpactBadge(insight.impact)}
                    <Badge variant="outline">置信度 {insight.confidence}%</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{insight.customers}</div>
                    <div className="text-xs text-gray-600">涉及客户</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {insight.value > 0 ? `¥${(insight.value / 10000).toFixed(0)}万` : "-"}
                    </div>
                    <div className="text-xs text-gray-600">预估价值</div>
                  </div>
                  <div className="text-center">
                    <Progress
                      value={insight.confidence}
                      className="h-2 mt-2"
                      style={{
                        background: `linear-gradient(to right, 
                          ${
                            insight.status === "active"
                              ? "#10b981, #059669"
                              : insight.status === "warning"
                                ? "#f59e0b, #d97706"
                                : insight.status === "opportunity"
                                  ? "#3b82f6, #2563eb"
                                  : "#8b5cf6, #7c3aed"
                          })`,
                      }}
                    />
                    <div className="text-xs text-gray-600 mt-1">置信度</div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-all duration-300 hover:scale-105 bg-transparent"
                  >
                    查看详情
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white transition-all duration-300 hover:scale-105"
                  >
                    执行建议
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 数据可视化 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 客户价值趋势 */}
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              客户价值趋势预测
            </CardTitle>
            <CardDescription>实际价值 vs AI预测价值</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={valueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`¥${((value as number) / 10000).toFixed(0)}万`, ""]} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="url(#blueGradient)"
                  name="实际价值"
                />
                <Area
                  type="monotone"
                  dataKey="prediction"
                  stackId="2"
                  stroke="#8b5cf6"
                  fill="url(#purpleGradient)"
                  name="预测价值"
                />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 客户分段分布 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <RechartsPieChart className="w-5 h-5 mr-2" />
              客户分段分布
            </CardTitle>
            <CardDescription>基于AI算法的客户智能分类</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 客户行为分析 */}
      <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <Activity className="w-5 h-5 mr-2" />
            客户行为转化分析
          </CardTitle>
          <CardDescription>不同行为的频次与转化率对比</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={behaviorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="behavior" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="frequency" fill="#f59e0b" name="行为频次" />
              <Bar dataKey="conversion" fill="#10b981" name="转化率%" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
