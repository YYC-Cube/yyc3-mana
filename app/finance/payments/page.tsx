"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Search, Filter, Plus, CheckCircle, Clock, XCircle, DollarSign } from "lucide-react"

export default function PaymentsPage() {
  const payments = [
    {
      id: "PAY-001",
      amount: 15000,
      recipient: "北京科技有限公司",
      method: "银行转账",
      status: "已完成",
      date: "2025-06-28",
      description: "软件开发服务费",
    },
    {
      id: "PAY-002",
      amount: 8500,
      recipient: "上海设计工作室",
      method: "支付宝",
      status: "处理中",
      date: "2025-06-28",
      description: "UI设计费用",
    },
    {
      id: "PAY-003",
      amount: 25000,
      recipient: "广州营销公司",
      method: "微信支付",
      status: "已完成",
      date: "2025-06-27",
      description: "广告投放费用",
    },
    {
      id: "PAY-004",
      amount: 3200,
      recipient: "深圳物流公司",
      method: "银行转账",
      status: "失败",
      date: "2025-06-27",
      description: "物流配送费",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "已完成":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case "处理中":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "失败":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已完成":
        return "bg-emerald-100 text-emerald-700"
      case "处理中":
        return "bg-orange-100 text-orange-700"
      case "失败":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <AdaptiveSidebar defaultModule="payments">
      <div className="space-y-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen p-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <CreditCard className="w-8 h-8 mr-3 text-emerald-600" />
              支付管理
            </h1>
            <p className="text-gray-600 mt-2">管理和跟踪所有支付交易</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            新建支付
          </Button>
        </div>

        {/* 搜索和筛选 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="搜索支付记录..." className="pl-10 border-l-4 border-l-emerald-500" />
              </div>
              <Select>
                <SelectTrigger className="w-32 border-l-4 border-l-emerald-500">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="processing">处理中</SelectItem>
                  <SelectItem value="failed">失败</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 支付统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日支付</CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">¥23,500</div>
              <p className="text-xs text-gray-600">+12.5% 较昨日</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">本月支付</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">¥456,700</div>
              <p className="text-xs text-gray-600">+8.2% 较上月</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待处理</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">3</div>
              <p className="text-xs text-gray-600">笔支付待处理</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">成功率</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">98.5%</div>
              <p className="text-xs text-gray-600">支付成功率</p>
            </CardContent>
          </Card>
        </div>

        {/* 支付记录 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-emerald-700">支付记录</CardTitle>
            <CardDescription>最近的支付交易记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border-l-4 border-l-emerald-500 bg-emerald-50 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <div>
                        <p className="font-medium">{payment.recipient}</p>
                        <p className="text-sm text-gray-500">{payment.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">¥{payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{payment.method}</p>
                    </div>
                    <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                    <div className="text-sm text-gray-500">{payment.date}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                    >
                      查看
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdaptiveSidebar>
  )
}
