"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileCheck, Plus, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, User, Calendar, Eye, ThumbsUp, ThumbsDown } from 'lucide-react'

export default function ApprovalPage() {
  const approvals = [
    {
      id: "APP-001",
      title: "员工请假申请",
      applicant: "张三",
      department: "技术部",
      type: "请假",
      status: "pending",
      priority: "normal",
      submitDate: "2025-06-28",
      description: "因个人事务需要请假3天",
      amount: null,
    },
    {
      id: "APP-002",
      title: "设备采购申请",
      applicant: "李四",
      department: "行政部",
      type: "采购",
      status: "approved",
      priority: "high",
      submitDate: "2025-06-27",
      description: "购买办公电脑10台",
      amount: 50000,
    },
    {
      id: "APP-003",
      title: "差旅费用报销",
      applicant: "王五",
      department: "销售部",
      type: "报销",
      status: "rejected",
      priority: "normal",
      submitDate: "2025-06-26",
      description: "北京出差费用报销",
      amount: 3500,
    },
    {
      id: "APP-004",
      title: "项目预算申请",
      applicant: "赵六",
      department: "项目部",
      type: "预算",
      status: "pending",
      priority: "urgent",
      submitDate: "2025-06-28",
      description: "新项目启动资金申请",
      amount: 100000,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "待审批"
      case "approved":
        return "已通过"
      case "rejected":
        return "已拒绝"
      default:
        return "未知"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "紧急"
      case "high":
        return "高"
      case "normal":
        return "普通"
      default:
        return "未知"
    }
  }

  const totalApprovals = approvals.length
  const pendingApprovals = approvals.filter((a) => a.status === "pending").length
  const approvedApprovals = approvals.filter((a) => a.status === "approved").length
  const rejectedApprovals = approvals.filter((a) => a.status === "rejected").length

  return (
    <AdaptiveSidebar defaultModule="approval">
      <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 min-h-screen">
        {/* 页面头部 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FileCheck className="w-8 h-8 mr-3 text-blue-600" />
              审批管理
            </h1>
            <p className="text-gray-600 mt-2">企业流程审批和管理系统</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
            >
              <Filter className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              筛选
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              发起申请
            </Button>
          </div>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总申请数</CardTitle>
              <FileCheck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{totalApprovals}</div>
              <p className="text-xs text-gray-600">本月新增 +15</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待审批</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{pendingApprovals}</div>
              <p className="text-xs text-gray-600">需要处理的申请</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已通过</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{approvedApprovals}</div>
              <p className="text-xs text-gray-600">通过率 {Math.round((approvedApprovals / totalApprovals) * 100)}%</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已拒绝</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">{rejectedApprovals}</div>
              <p className="text-xs text-gray-600">拒绝率 {Math.round((rejectedApprovals / totalApprovals) * 100)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* 搜索和筛选 */}
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="搜索申请标题、申请人或部门..."
                    className="pl-10 border-l-4 border-l-blue-500"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-48 border-l-4 border-l-blue-500">
                  <SelectValue placeholder="全部状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="pending">待审批</SelectItem>
                  <SelectItem value="approved">已通过</SelectItem>
                  <SelectItem value="rejected">已拒绝</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48 border-l-4 border-l-blue-500">
                  <SelectValue placeholder="全部类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="leave">请假</SelectItem>
                  <SelectItem value="purchase">采购</SelectItem>
                  <SelectItem value="expense">报销</SelectItem>
                  <SelectItem value="budget">预算</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 审批列表 */}
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <FileCheck className="w-5 h-5 mr-2" />
              审批列表
            </CardTitle>
            <CardDescription>待处理和已处理的审批申请</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {approvals.map((approval) => (
                <div
                  key={approval.id}
                  className="border-l-4 border-l-blue-500 bg-blue-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-blue-200 text-blue-700">
                          {approval.applicant.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{approval.title}</h3>
                        <p className="text-gray-600">{approval.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {approval.applicant} - {approval.department}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {approval.submitDate}
                          </div>
                          {approval.amount && (
                            <div className="flex items-center">
                              <span className="font-medium">¥{approval.amount.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(approval.priority)}>
                        {getPriorityText(approval.priority)}
                      </Badge>
                      <Badge className={getStatusColor(approval.status)}>{getStatusText(approval.status)}</Badge>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                    >
                      <Eye className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                      查看详情
                    </Button>
                    {approval.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-l-4 border-l-green-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                          通过
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-l-4 border-l-red-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                        >
                          <ThumbsDown className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                          拒绝
                        </Button>
                      </>
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
