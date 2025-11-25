"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Plus, Search, Filter, Phone, Mail, MapPin, Calendar, TrendingUp, Star, Eye, Edit } from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  location: string
  status: "active" | "inactive" | "potential" | "vip"
  value: number
  lastContact: string
  avatar?: string
  tags: string[]
  satisfaction: number
}

export function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // 模拟客户数据
  const customers: Customer[] = [
    {
      id: "1",
      name: "张明华",
      email: "zhang@company.com",
      phone: "138-0000-1234",
      company: "科技有限公司",
      location: "北京市朝阳区",
      status: "vip",
      value: 850000,
      lastContact: "2025-06-20",
      tags: ["重要客户", "长期合作"],
      satisfaction: 95,
    },
    {
      id: "2",
      name: "李小红",
      email: "li@startup.com",
      phone: "139-0000-5678",
      company: "创新科技",
      location: "上海市浦东新区",
      status: "active",
      value: 320000,
      lastContact: "2025-06-18",
      tags: ["新客户", "潜力大"],
      satisfaction: 87,
    },
    {
      id: "3",
      name: "王建国",
      email: "wang@enterprise.com",
      phone: "137-0000-9012",
      company: "传统制造业",
      location: "广州市天河区",
      status: "potential",
      value: 150000,
      lastContact: "2025-06-15",
      tags: ["待跟进"],
      satisfaction: 72,
    },
    {
      id: "4",
      name: "陈美丽",
      email: "chen@design.com",
      phone: "136-0000-3456",
      company: "设计工作室",
      location: "深圳市南山区",
      status: "active",
      value: 280000,
      lastContact: "2025-06-19",
      tags: ["设计行业", "合作愉快"],
      satisfaction: 91,
    },
    {
      id: "5",
      name: "刘大伟",
      email: "liu@consulting.com",
      phone: "135-0000-7890",
      company: "咨询公司",
      location: "杭州市西湖区",
      status: "inactive",
      value: 120000,
      lastContact: "2025-05-28",
      tags: ["需要激活"],
      satisfaction: 65,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "bg-orange-100 text-orange-800"
      case "active":
        return "bg-orange-100 text-orange-800"
      case "potential":
        return "bg-orange-100 text-orange-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "vip":
        return "VIP客户"
      case "active":
        return "活跃客户"
      case "potential":
        return "潜在客户"
      case "inactive":
        return "非活跃"
      default:
        return "未知"
    }
  }

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 90) return "from-orange-400 to-orange-500"
    if (satisfaction >= 80) return "from-orange-300 to-orange-400"
    if (satisfaction >= 70) return "from-yellow-400 to-yellow-500"
    return "from-red-400 to-red-500"
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalValue = customers.reduce((sum, customer) => sum + customer.value, 0)
  const activeCustomers = customers.filter((c) => c.status === "active" || c.status === "vip").length
  const avgSatisfaction = Math.round(customers.reduce((sum, c) => sum + c.satisfaction, 0) / customers.length)

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="w-8 h-8 mr-3 text-orange-600" />
            客户管理
          </h1>
          <p className="text-gray-600 mt-2">全生命周期客户关系管理系统</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-l-4 border-l-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Filter className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            筛选
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                添加客户
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>添加新客户</DialogTitle>
                <DialogDescription>填写客户基本信息</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">客户姓名</Label>
                  <Input id="name" placeholder="输入客户姓名" className="border-l-4 border-l-orange-500" />
                </div>
                <div>
                  <Label htmlFor="company">公司名称</Label>
                  <Input id="company" placeholder="输入公司名称" className="border-l-4 border-l-orange-500" />
                </div>
                <div>
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="输入邮箱地址"
                    className="border-l-4 border-l-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">联系电话</Label>
                  <Input id="phone" placeholder="输入联系电话" className="border-l-4 border-l-orange-500" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="location">地址</Label>
                  <Input id="location" placeholder="输入详细地址" className="border-l-4 border-l-orange-500" />
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                  >
                    添加客户
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总客户数</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{customers.length}</div>
            <p className="text-xs text-gray-600">本月新增 +12</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃客户</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{activeCustomers}</div>
            <p className="text-xs text-gray-600">活跃率 {Math.round((activeCustomers / customers.length) * 100)}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">客户价值</CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">¥{(totalValue / 10000).toFixed(0)}万</div>
            <p className="text-xs text-gray-600">总客户价值</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">满意度</CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{avgSatisfaction}%</div>
            <p className="text-xs text-gray-600">平均客户满意度</p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜索客户姓名、公司或邮箱..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-l-4 border-l-orange-500"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 border-l-4 border-l-orange-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="vip">VIP客户</SelectItem>
                <SelectItem value="active">活跃客户</SelectItem>
                <SelectItem value="potential">潜在客户</SelectItem>
                <SelectItem value="inactive">非活跃</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 客户列表 */}
      <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <Users className="w-5 h-5 mr-2" />
            客户列表
          </CardTitle>
          <CardDescription>共找到 {filteredCustomers.length} 位客户</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="border-l-4 border-l-orange-500 bg-orange-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-orange-200 text-orange-700">
                        {customer.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{customer.name}</h3>
                      <p className="text-gray-600">{customer.company}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {customer.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {customer.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(customer.status)}>{getStatusText(customer.status)}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">¥{(customer.value / 10000).toFixed(0)}万</div>
                    <div className="text-xs text-gray-600">客户价值</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{customer.satisfaction}%</div>
                    <div className="text-xs text-gray-600">满意度</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full bg-gradient-to-r ${getSatisfactionColor(customer.satisfaction)} rounded-full transition-all duration-500`}
                        style={{ width: `${customer.satisfaction}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{customer.lastContact}</div>
                    <div className="text-xs text-gray-600">最后联系</div>
                  </div>
                  <div className="text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {customer.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-l-4 border-l-orange-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                  >
                    <Eye className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                    查看
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-l-4 border-l-orange-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                  >
                    <Edit className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                    编辑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-l-4 border-l-orange-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                  >
                    <Phone className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                    联系
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white transition-all duration-300 hover:scale-105 group"
                  >
                    <Calendar className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                    跟进
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
