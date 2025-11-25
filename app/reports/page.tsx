"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp, Users, DollarSign, Target, Clock, CheckCircle, Plus, Eye } from 'lucide-react'

export default function ReportsPage() {
  const reports = [
    {
      id: "RPT-001",
      title: "月度销售报告",
      type: "销售",
      status: "completed",
      generatedDate: "2025-06-28",
      period: "2025年6月",
      description: "包含销售数据、趋势分析和客户统计",
      size: "2.3 MB",
    },
    {
      id: "RPT-002",
      title: "财务分析报告",
      type: "财务",
      status: "generating",
      generatedDate: "2025-06-28",
      period: "2025年Q2",
      description: "财务状况、预算执行和成本分析",
      size: "1.8 MB",
    },
    {
      id: "RPT-003",
      title: "客户满意度报告",
      type: "客户",
      status: "completed",
      generatedDate: "2025-06-27",
      period: "2025年6月",
      description: "客户反馈、满意度调查和改进建议",
      size: "1.2 MB",
    },
    {
      id: "RPT-004",
      title: "运营效率报告",
      type: "运营",
      status: "scheduled",
      generatedDate: "2025-06-30",
      period: "2025年6月",
      description: "业务流程效率和优化建议",
      size: "待生成",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-orange-100 text-orange-800"
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
      case "generating":
        return "生成中"
      case "scheduled":
        return "已计划"
      case "failed":
        return "失败"
      default:
        return "未知"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "generating":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "scheduled":
        return <Calendar className="w-4 h-4 text-orange-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "销售":
        return "bg-emerald-100 text-emerald-800"
      case "财务":
        return "bg-emerald-100 text-emerald-800"
      case "客户":
        return "bg-emerald-100 text-emerald-800"
      case "运营":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdaptiveSidebar defaultModule="reports">
      <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen">
        {/* 页面头部 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FileText className="w-8 h-8 mr-3 text-emerald-600" />
              报表中心
            </h1>
            <p className="text-gray-600 mt-2">企业数据报表生成和管理</p>
          </div>
          <div className="flex space-x-3">
            <Select>
              <SelectTrigger className="w-32 border-l-4 border-l-emerald-500">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="全部类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="sales">销售报告</SelectItem>
                <SelectItem value="finance">财务报告</SelectItem>
                <SelectItem value="customer">客户报告</SelectItem>
                <SelectItem value="operation">运营报告</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
            >
              <Calendar className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              计划任务
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              生成报告
            </Button>
          </div>
        </div>

        {/* 报表统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总报表数</CardTitle>
              <FileText className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">{reports.length}</div>
              <p className="text-xs text-gray-600">本月新增 +8</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已完成</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {reports.filter((r) => r.status === "completed").length}
              </div>
              <p className="text-xs text-gray-600">可下载查看</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">生成中</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">
                {reports.filter((r) => r.status === "generating").length}
              </div>
              <p className="text-xs text-gray-600">正在处理</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已计划</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {reports.filter((r) => r.status === "scheduled").length}
              </div>
              <p className="text-xs text-gray-600">定时生成</p>
            </CardContent>
          </Card>
        </div>

        {/* 快速生成报表 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-emerald-700">快速生成报表</CardTitle>
            <CardDescription>选择报表类型快速生成</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-2 border-l-4 border-l-emerald-500 hover:bg-emerald-50 hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                <BarChart3 className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  销售报告
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-2 border-l-4 border-l-emerald-500 hover:bg-emerald-50 hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                <DollarSign className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  财务报告
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-2 border-l-4 border-l-emerald-500 hover:bg-emerald-50 hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                <Users className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  客户报告
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-2 border-l-4 border-l-emerald-500 hover:bg-emerald-50 hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                <Target className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  运营报告
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 报表列表 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <FileText className="w-5 h-5 mr-2" />
              报表列表
            </CardTitle>
            <CardDescription>所有生成的报表记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="border-l-4 border-l-emerald-500 bg-emerald-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{report.title}</h3>
                      <p className="text-gray-600 mt-1">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {report.period}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {report.generatedDate}
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(report.type)}>{report.type}</Badge>
                      <Badge className={getStatusColor(report.status)}>{getStatusText(report.status)}</Badge>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                    >
                      <Eye className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                      预览
                    </Button>
                    {report.status === "completed" && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all duration-300 hover:scale-105 group"
                      >
                        <Download className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                        下载
                      </Button>
                    )}
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
