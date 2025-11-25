"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, PieChart, Activity, Download, Filter, Users, DollarSign, Target } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

export function DataAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("all")

  // 销售趋势数据
  const salesTrendData = [
    { month: "1月", sales: 2400000, target: 2500000, growth: 12.5 },
    { month: "2月", sales: 2600000, target: 2700000, growth: 15.2 },
    { month: "3月", sales: 2800000, target: 2800000, growth: 8.7 },
    { month: "4月", sales: 3100000, target: 3000000, growth: 25.3 },
    { month: "5月", sales: 3300000, target: 3200000, growth: 18.9 },
    { month: "6月", sales: 3500000, target: 3400000, growth: 22.1 },
  ]

  // 客户分析数据
  const customerData = [
    { segment: "VIP客户", count: 28, revenue: 1200000, satisfaction: 95 },
    { segment: "活跃客户", count: 156, revenue: 2800000, satisfaction: 87 },
    { segment: "潜在客户", count: 234, revenue: 450000, satisfaction: 72 },
    { segment: "流失客户", count: 45, revenue: 120000, satisfaction: 45 },
  ]

  // 产品销售分布
  const productData = [
    { name: "产品A", value: 35, color: "#10b981" },
    { name: "产品B", value: 28, color: "#059669" },
    { name: "产品C", value: 22, color: "#047857" },
    { name: "产品D", value: 15, color: "#065f46" },
  ]

  // 地区销售数据
  const regionData = [
    { region: "华东", sales: 1200000, growth: 15.2 },
    { region: "华南", sales: 980000, growth: 12.8 },
    { region: "华北", sales: 850000, growth: 8.5 },
    { region: "西部", sales: 470000, growth: 22.1 },
  ]

  // 关键指标
  const kpiMetrics = [
    {
      title: "总销售额",
      value: "¥350万",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "客户数量",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      title: "转化率",
      value: "23.5%",
      change: "+3.1%",
      trend: "up",
      icon: Target,
      color: "green",
    },
    {
      title: "活跃度",
      value: "87.3%",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      color: "green",
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-green-600" />
            数据分析中心
          </h1>
          <p className="text-gray-600 mt-2">全面的数据分析和商业智能洞察</p>
        </div>
        <div className="flex space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 border-l-4 border-l-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年度</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-l-4 border-l-green-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Filter className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            筛选
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Download className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card
            key={index}
            className="border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{metric.value}</div>
              <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.change} 较上期
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 主要图表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 销售趋势 */}
        <Card className="border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              销售趋势分析
            </CardTitle>
            <CardDescription>销售额与目标对比趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`¥${((value as number) / 10000).toFixed(0)}万`, ""]} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#10b981"
                  fill="url(#greenGradient)"
                  strokeWidth={2}
                  name="实际销售"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#059669"
                  fill="transparent"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="销售目标"
                />
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 产品销售分布 */}
        <Card className="border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <PieChart className="w-5 h-5 mr-2" />
              产品销售分布
            </CardTitle>
            <CardDescription>各产品线销售占比</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 客户分析和地区销售 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 客户分析 */}
        <Card className="border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Users className="w-5 h-5 mr-2" />
              客户分析
            </CardTitle>
            <CardDescription>客户分段分析和价值贡献</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerData.map((segment, index) => (
                <div key={index} className="border-l-4 border-l-green-500 bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{segment.segment}</h4>
                    <Badge className="bg-green-100 text-green-700">{segment.count}人</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">收入贡献: </span>
                      <span className="font-medium">¥{(segment.revenue / 10000).toFixed(0)}万</span>
                    </div>
                    <div>
                      <span className="text-gray-600">满意度: </span>
                      <span className="font-medium">{segment.satisfaction}%</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${segment.satisfaction}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 地区销售 */}
        <Card className="border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <BarChart3 className="w-5 h-5 mr-2" />
              地区销售分析
            </CardTitle>
            <CardDescription>各地区销售业绩和增长率</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip formatter={(value) => [`¥${((value as number) / 10000).toFixed(0)}万`, ""]} />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 详细数据表格 */}
      <Card className="border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <Activity className="w-5 h-5 mr-2" />
            详细数据分析
          </CardTitle>
          <CardDescription>各项指标的详细数据和趋势分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-green-200">
                  <th className="text-left p-3 font-medium text-gray-700">指标</th>
                  <th className="text-left p-3 font-medium text-gray-700">当前值</th>
                  <th className="text-left p-3 font-medium text-gray-700">目标值</th>
                  <th className="text-left p-3 font-medium text-gray-700">完成率</th>
                  <th className="text-left p-3 font-medium text-gray-700">趋势</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-green-100 hover:bg-green-50">
                  <td className="p-3">月度销售额</td>
                  <td className="p-3 font-medium">¥350万</td>
                  <td className="p-3">¥400万</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                          style={{ width: "87.5%" }}
                        ></div>
                      </div>
                      <span className="text-sm">87.5%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge className="bg-green-100 text-green-700">↗ +12.5%</Badge>
                  </td>
                </tr>
                <tr className="border-b border-green-100 hover:bg-green-50">
                  <td className="p-3">客户获取</td>
                  <td className="p-3 font-medium">156人</td>
                  <td className="p-3">180人</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                          style={{ width: "86.7%" }}
                        ></div>
                      </div>
                      <span className="text-sm">86.7%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge className="bg-green-100 text-green-700">↗ +8.2%</Badge>
                  </td>
                </tr>
                <tr className="border-b border-green-100 hover:bg-green-50">
                  <td className="p-3">客户满意度</td>
                  <td className="p-3 font-medium">87.3%</td>
                  <td className="p-3">90%</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                          style={{ width: "97%" }}
                        ></div>
                      </div>
                      <span className="text-sm">97%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge className="bg-red-100 text-red-700">↘ -2.1%</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
