"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3, Users, DollarSign, Activity, Calendar, Settings, Plus } from 'lucide-react'

export default function KPIPage() {
  const kpis = [
    {
      id: "KPI-001",
      name: "月度销售额",
      category: "销售",
      current: 2847392,
      target: 3000000,
      unit: "¥",
      trend: "up",
      change: 12.5,
      status: "on-track",
      description: "本月销售收入总额",
    },
    {
      id: "KPI-002",
      name: "客户满意度",
      category: "客户",
      current: 4.2,
      target: 4.5,
      unit: "分",
      trend: "up",
      change: 5.2,
      status: "at-risk",
      description: "客户满意度评分",
    },
    {
      id: "KPI-003",
      name: "员工效率",
      category: "运营",
      current: 85.6,
      target: 90,
      unit: "%",
      trend: "up",
      change: 3.4,
      status: "on-track",
      description: "员工工作效率指标",
    },
    {
      id: "KPI-004",
      name: "成本控制率",
      category: "财务",
      current: 78.2,
      target: 75,
      unit: "%",
      trend: "down",
      change: -2.1,
      status: "off-track",
      description: "成本控制效果指标",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800"
      case "at-risk":
        return "bg-orange-100 text-orange-800"
      case "off-track":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-track":
        return "正常"
      case "at-risk":
        return "风险"
      case "off-track":
        return "异常"
      default:
        return "未知"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "at-risk":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case "off-track":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Target className="w-4 h-4 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "销售":
        return "bg-orange-100 text-orange-800"
      case "客户":
        return "bg-orange-100 text-orange-800"
      case "运营":
        return "bg-orange-100 text-orange-800"
      case "财务":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getProgressColor = (progress: number, status: string) => {
    if (status === "off-track") return "from-red-400 to-red-500"
    if (status === "at-risk") return "from-orange-400 to-orange-500"
    return "from-orange-400 to-orange-500"
  }

  return (
    <AdaptiveSidebar defaultModule="kpi">
      <div className="p-6 space-y-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 min-h-screen">
        {/* 页面头部 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Target className="w-8 h-8 mr-3 text-orange-600" />
              KPI监控
            </h1>
            <p className="text-gray-600 mt-2">关键绩效指标实时监控和分析</p>
          </div>
          <div className="flex space-x-3">
            <Select>
              <SelectTrigger className="w-32 border-l-4 border-l-orange-500">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="本月" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">今日</SelectItem>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="quarter">本季度</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-l-4 border-l-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
            >
              <Settings className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              设置目标
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              添加KPI
            </Button>
          </div>
        </div>

        {/* KPI概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总KPI数</CardTitle>
              <Target className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">{kpis.length}</div>
              <p className="text-xs text-gray-600">监控指标总数</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">正常指标</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {kpis.filter((kpi) => kpi.status === "on-track").length}
              </div>
              <p className="text-xs text-gray-600">达标指标数量</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">风险指标</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {kpis.filter((kpi) => kpi.status === "at-risk").length}
              </div>
              <p className="text-xs text-gray-600">需要关注</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">异常指标</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                {kpis.filter((kpi) => kpi.status === "off-track").length}
              </div>
              <p className="text-xs text-gray-600">需要处理</p>
            </CardContent>
          </Card>
        </div>

        {/* KPI详细列表 */}
        <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <Target className="w-5 h-5 mr-2" />
              KPI监控面板
            </CardTitle>
            <CardDescription>关键绩效指标实时状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {kpis.map((kpi) => (
                <div
                  key={kpi.id}
                  className="border-l-4 border-l-orange-500 bg-orange-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{kpi.name}</h3>
                        <Badge className={getCategoryColor(kpi.category)}>{kpi.category}</Badge>
                        <Badge className={getStatusColor(kpi.status)}>{getStatusText(kpi.status)}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{kpi.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {kpi.unit}
                        {kpi.unit === "¥" ? kpi.current.toLocaleString() : kpi.current}
                      </div>
                      <div className="text-sm text-gray-500">
                        目标: {kpi.unit}
                        {kpi.unit === "¥" ? kpi.target.toLocaleString() : kpi.target}
                      </div>
                      <div
                        className={`flex items-center text-xs mt-1 ${
                          kpi.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {kpi.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        <span>{Math.abs(kpi.change)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>完成进度</span>
                      <span>{calculateProgress(kpi.current, kpi.target).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getProgressColor(
                          calculateProgress(kpi.current, kpi.target),
                          kpi.status,
                        )} rounded-full transition-all duration-500`}
                        style={{ width: `${calculateProgress(kpi.current, kpi.target)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPI分析图表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700">
                <BarChart3 className="w-5 h-5 mr-2" />
                KPI趋势分析
              </CardTitle>
              <CardDescription>关键指标变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-orange-50 rounded-lg flex items-center justify-center">
                <p className="text-orange-600 font-medium">KPI趋势图表区域</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700">
                <Activity className="w-5 h-5 mr-2" />
                目标达成率
              </CardTitle>
              <CardDescription>各类别KPI达成情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["销售", "客户", "运营", "财务"].map((category) => {
                  const categoryKPIs = kpis.filter((kpi) => kpi.category === category)
                  const avgProgress =
                    categoryKPIs.reduce((sum, kpi) => sum + calculateProgress(kpi.current, kpi.target), 0) /
                    categoryKPIs.length
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{category}</span>
                        <span>{avgProgress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${avgProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdaptiveSidebar>
  )
}
