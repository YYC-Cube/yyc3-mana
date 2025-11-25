"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { CheckSquare, Plus, Search, Filter, Calendar, Clock, User, Play, Pause, CheckCircle, AlertTriangle } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  assigneeAvatar?: string
  dueDate: string
  progress: number
  tags: string[]
  createdAt: string
}

export function TaskManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // 模拟任务数据
  const tasks: Task[] = [
    {
      id: "1",
      title: "客户需求分析报告",
      description: "完成Q2季度客户需求分析，整理客户反馈并制定改进方案",
      status: "in-progress",
      priority: "high",
      assignee: "张三",
      dueDate: "2025-06-25",
      progress: 75,
      tags: ["分析", "客户"],
      createdAt: "2025-06-15",
    },
    {
      id: "2",
      title: "产品功能优化",
      description: "根据用户反馈优化产品核心功能，提升用户体验",
      status: "todo",
      priority: "medium",
      assignee: "李四",
      dueDate: "2025-06-30",
      progress: 0,
      tags: ["开发", "优化"],
      createdAt: "2025-06-18",
    },
    {
      id: "3",
      title: "市场推广方案",
      description: "制定下半年市场推广策略，包括线上线下推广渠道",
      status: "completed",
      priority: "high",
      assignee: "王五",
      dueDate: "2025-06-20",
      progress: 100,
      tags: ["市场", "推广"],
      createdAt: "2025-06-10",
    },
    {
      id: "4",
      title: "系统安全检查",
      description: "进行系统安全漏洞扫描和修复，确保数据安全",
      status: "in-progress",
      priority: "urgent",
      assignee: "赵六",
      dueDate: "2025-06-22",
      progress: 60,
      tags: ["安全", "系统"],
      createdAt: "2025-06-16",
    },
    {
      id: "5",
      title: "员工培训计划",
      description: "制定新员工入职培训计划和老员工技能提升方案",
      status: "todo",
      priority: "low",
      assignee: "钱七",
      dueDate: "2025-07-05",
      progress: 20,
      tags: ["培训", "人力"],
      createdAt: "2025-06-19",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800"
      case "in-progress":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "todo":
        return "待开始"
      case "in-progress":
        return "进行中"
      case "completed":
        return "已完成"
      case "cancelled":
        return "已取消"
      default:
        return "未知"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "low":
        return "低优先级"
      case "medium":
        return "中优先级"
      case "high":
        return "高优先级"
      case "urgent":
        return "紧急"
      default:
        return "普通"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "from-orange-400 to-orange-500"
    if (progress >= 60) return "from-orange-300 to-orange-400"
    if (progress >= 40) return "from-yellow-400 to-yellow-500"
    return "from-red-400 to-red-500"
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length
  const urgentTasks = tasks.filter((t) => t.priority === "urgent").length

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <CheckSquare className="w-8 h-8 mr-3 text-orange-600" />
            任务管理
          </h1>
          <p className="text-gray-600 mt-2">智能任务分配和进度跟踪系统</p>
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
                创建任务
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建新任务</DialogTitle>
                <DialogDescription>填写任务详细信息</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">任务标题</Label>
                  <Input id="title" placeholder="输入任务标题" className="border-l-4 border-l-orange-500" />
                </div>
                <div>
                  <Label htmlFor="description">任务描述</Label>
                  <Textarea
                    id="description"
                    placeholder="详细描述任务内容"
                    className="border-l-4 border-l-orange-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="assignee">负责人</Label>
                    <Select>
                      <SelectTrigger className="border-l-4 border-l-orange-500">
                        <SelectValue placeholder="选择负责人" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zhang">张三</SelectItem>
                        <SelectItem value="li">李四</SelectItem>
                        <SelectItem value="wang">王五</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">优先级</Label>
                    <Select>
                      <SelectTrigger className="border-l-4 border-l-orange-500">
                        <SelectValue placeholder="选择优先级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">低优先级</SelectItem>
                        <SelectItem value="medium">中优先级</SelectItem>
                        <SelectItem value="high">高优先级</SelectItem>
                        <SelectItem value="urgent">紧急</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">截止日期</Label>
                  <Input id="dueDate" type="date" className="border-l-4 border-l-orange-500" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                  >
                    创建任务
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
            <CardTitle className="text-sm font-medium">总任务数</CardTitle>
            <CheckSquare className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{totalTasks}</div>
            <p className="text-xs text-gray-600">本月新增 +8</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已完成</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{completedTasks}</div>
            <p className="text-xs text-gray-600">完成率 {Math.round((completedTasks / totalTasks) * 100)}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">进行中</CardTitle>
            <Play className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{inProgressTasks}</div>
            <p className="text-xs text-gray-600">正在执行的任务</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">紧急任务</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{urgentTasks}</div>
            <p className="text-xs text-gray-600">需要立即处理</p>
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
                  placeholder="搜索任务标题、描述或负责人..."
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
                <SelectItem value="todo">待开始</SelectItem>
                <SelectItem value="in-progress">进行中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="cancelled">已取消</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48 border-l-4 border-l-orange-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部优先级</SelectItem>
                <SelectItem value="low">低优先级</SelectItem>
                <SelectItem value="medium">中优先级</SelectItem>
                <SelectItem value="high">高优先级</SelectItem>
                <SelectItem value="urgent">紧急</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 任务列表 */}
      <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <CheckSquare className="w-5 h-5 mr-2" />
            任务列表
          </CardTitle>
          <CardDescription>共找到 {filteredTasks.length} 个任务</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="border-l-4 border-l-orange-500 bg-orange-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{task.title}</h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {task.assignee}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {task.dueDate}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        创建于 {task.createdAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(task.status)}>{getStatusText(task.status)}</Badge>
                    <Badge className={getPriorityColor(task.priority)}>{getPriorityText(task.priority)}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">进度</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getProgressColor(task.progress)} rounded-full transition-all duration-500`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={task.assigneeAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-orange-200 text-orange-700">
                        {task.assignee.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-l-4 border-l-orange-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                  >
                    <Play className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                    开始
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-l-4 border-l-orange-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                  >
                    <Pause className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                    暂停
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white transition-all duration-300 hover:scale-105 group"
                  >
                    <CheckCircle className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                    完成
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
