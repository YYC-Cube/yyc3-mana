"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calculator,
  Receipt,
  PieChart,
  BarChart3,
  Plus,
  Filter,
  Download,
  Target,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

export function FinanceModule() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // 财务数据
  const revenueData = [
    { month: "1月", revenue: 2400000, expense: 1800000, profit: 600000 },
    { month: "2月", revenue: 2600000, expense: 1900000, profit: 700000 },
    { month: "3月", revenue: 2800000, expense: 2000000, profit: 800000 },
    { month: "4月", revenue: 3100000, expense: 2200000, profit: 900000 },
    { month: "5月", revenue: 3300000, expense: 2300000, profit: 1000000 },
    { month: "6月", revenue: 3500000, expense: 2400000, profit: 1100000 },
  ]

  const expenseData = [
    { category: "人力成本", amount: 1200000, percentage: 35, color: "#10b981" },
    { category: "运营费用", amount: 800000, percentage: 23, color: "#3b82f6" },
    { category: "市场推广", amount: 600000, percentage: 17, color: "#f59e0b" },
    { category: "技术投入", amount: 500000, percentage: 15, color: "#8b5cf6" },
    { category: "其他费用", amount: 350000, percentage: 10, color: "#ef4444" },
  ]

  const cashFlowData = [
    { week: "第1周", inflow: 800000, outflow: 600000, net: 200000 },
    { week: "第2周", inflow: 900000, outflow: 650000, net: 250000 },
    { week: "第3周", inflow: 750000, outflow: 700000, net: 50000 },
    { week: "第4周", inflow: 1100000, outflow: 800000, net: 300000 },
  ]

  const kpiMetrics = [
    {
      title: "总收入",
      value: "¥350万",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      target: "¥400万",
      progress: 87.5,
    },
    {
      title: "净利润",
      value: "¥110万",
      change: "+18.2%",
      trend: "up",
      icon: TrendingUp,
      target: "¥120万",
      progress: 91.7,
    },
    {
      title: "总支出",
      value: "¥240万",
      change: "+8.1%",
      trend: "up",
      icon: Calculator,
      target: "¥250万",
      progress: 96.0,
    },
    {
      title: "利润率",
      value: "31.4%",
      change: "+2.3%",
      trend: "up",
      icon: Target,
      target: "35%",
      progress: 89.7,
    },
  ]

  const recentTransactions = [
    {
      id: "1",
      type: "income",
      description: "客户付款 - 项目A",
      amount: 150000,
      date: "2025-06-20",
      status: "completed",
      category: "销售收入",
    },
    {
      id: "2",
      type: "expense",
      description: "办公设备采购",
      amount: 25000,
      date: "2025-06-19",
      status: "completed",
      category: "运营费用",
    },
    {
      id: "3",
      type: "income",
      description: "服务费收入",
      amount: 80000,
      date: "2025-06-18",
      status: "pending",
      category: "服务收入",
    },
    {
      id: "4",
      type: "expense",
      description: "员工薪资发放",
      amount: 180000,
      date: "2025-06-15",
      status: "completed",
      category: "��力成本",
    },
    {
      id: "5",
      type: "expense",
      description: "市场推广费用",
      amount: 35000,
      date: "2025-06-14",
      status: "completed",
      category: "市场推广",
    },
  ]

  const getTransactionIcon = (type: string) => {
    return type === "income" ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "已完成"
      case "pending":
        return "待处理"
      case "failed":
        return "失败"
      default:
        return "未知"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <DollarSign className="w-8 h-8 mr-3 text-emerald-600" />
            财务管理
          </h1>
          <p className="text-gray-600 mt-2">全面的财务数据分析和资金管理系统</p>
        </div>
        <div className="flex space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 border-l-4 border-l-emerald-500">
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
            className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Filter className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            筛选
          </Button>
          <Button
            variant="outline"
            className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Download className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            导出
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                新增交易
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>新增财务交易</DialogTitle>
                <DialogDescription>记录收入或支出交易</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">交易类型</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">收入</SelectItem>
                        <SelectItem value="expense">支出</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">金额</Label>
                    <Input id="amount" type="number" placeholder="输入金额" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">描述</Label>
                  <Input id="description" placeholder="交易描述" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">分类</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">销售收入</SelectItem>
                        <SelectItem value="service">服务收入</SelectItem>
                        <SelectItem value="operation">运营费用</SelectItem>
                        <SelectItem value="marketing">市场推广</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">日期</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                  >
                    保存交易
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card
            key={index}
            className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">{metric.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change} 较上期
                </p>
                <p className="text-xs text-gray-500">目标: {metric.target}</p>
              </div>
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${metric.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">完成度: {metric.progress}%</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 主要图表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 收入趋势 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              收入与利润趋势
            </CardTitle>
            <CardDescription>过去6个月的财务表现</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`¥${((value as number) / 10000).toFixed(0)}万`, ""]} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#emeraldGradient)"
                  name="收入"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stackId="2"
                  stroke="#059669"
                  fill="url(#emeraldDarkGradient)"
                  name="利润"
                />
                <defs>
                  <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="emeraldDarkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 支出分布 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <PieChart className="w-5 h-5 mr-2" />
              支出分布分析
            </CardTitle>
            <CardDescription>各类支出占比情况</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`¥${((value as number) / 10000).toFixed(0)}万`, ""]} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 现金流和交易记录 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 现金流分析 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <BarChart3 className="w-5 h-5 mr-2" />
              现金流分析
            </CardTitle>
            <CardDescription>本月现金流入流出情况</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [`¥${((value as number) / 10000).toFixed(0)}万`, ""]} />
                <Bar dataKey="inflow" fill="#10b981" name="流入" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outflow" fill="#ef4444" name="流出" radius={[4, 4, 0, 0]} />
                <Bar dataKey="net" fill="#3b82f6" name="净流量" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 最近交易 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <Receipt className="w-5 h-5 mr-2" />
              最近交易记录
            </CardTitle>
            <CardDescription>最新的财务交易明细</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border-l-4 border-l-emerald-500 bg-emerald-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                        <p className="text-sm text-gray-600">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {transaction.type === "income" ? "+" : "-"}¥{transaction.amount.toLocaleString()}
                      </p>
                      <Badge className={getStatusColor(transaction.status)}>{getStatusText(transaction.status)}</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{transaction.date}</span>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs transition-all duration-300 hover:scale-105 group"
                      >
                        <Receipt className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                        详情
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 财务摘要 */}
      <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-700">
            <Calculator className="w-5 h-5 mr-2" />
            财务摘要报告
          </CardTitle>
          <CardDescription>本月财务状况综合分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-l-emerald-500 bg-emerald-50 rounded-lg p-4">
              <h4 className="font-medium text-emerald-700 mb-2">收入分析</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>销售收入:</span>
                  <span className="font-medium">¥280万</span>
                </div>
                <div className="flex justify-between">
                  <span>服务收入:</span>
                  <span className="font-medium">¥70万</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">总收入:</span>
                  <span className="font-bold text-emerald-600">¥350万</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-l-emerald-500 bg-emerald-50 rounded-lg p-4">
              <h4 className="font-medium text-emerald-700 mb-2">支出分析</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>人力成本:</span>
                  <span className="font-medium">¥120万</span>
                </div>
                <div className="flex justify-between">
                  <span>运营费用:</span>
                  <span className="font-medium">¥80万</span>
                </div>
                <div className="flex justify-between">
                  <span>其他支出:</span>
                  <span className="font-medium">¥40万</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">总支出:</span>
                  <span className="font-bold text-red-600">¥240万</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-l-emerald-500 bg-emerald-50 rounded-lg p-4">
              <h4 className="font-medium text-emerald-700 mb-2">盈利分析</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>毛利润:</span>
                  <span className="font-medium">¥110万</span>
                </div>
                <div className="flex justify-between">
                  <span>利润率:</span>
                  <span className="font-medium">31.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>同比增长:</span>
                  <span className="font-medium text-green-600">+18.2%</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">净利润:</span>
                  <span className="font-bold text-emerald-600">¥110万</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
