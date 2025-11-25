"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search,
  Send,
  Eye,
  BarChart3,
  Target,
  Lightbulb,
} from "lucide-react"

interface Feedback {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  type: "bug" | "feature" | "improvement" | "complaint" | "praise"
  category: string
  title: string
  description: string
  rating: number
  status: "pending" | "reviewing" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: Date
  updatedAt: Date
  assignedTo?: string
  tags: string[]
  attachments?: string[]
  votes: number
  responses: FeedbackResponse[]
}

interface FeedbackResponse {
  id: string
  authorId: string
  authorName: string
  content: string
  createdAt: Date
  isOfficial: boolean
}

interface FeedbackStats {
  total: number
  pending: number
  resolved: number
  averageRating: number
  responseTime: number
  satisfactionRate: number
}

export function FeedbackCollectionSystem() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "fb_1",
      userId: "user_1",
      userName: "张三",
      userAvatar: "/placeholder.svg?height=40&width=40&text=张",
      type: "feature",
      category: "客户管理",
      title: "希望增加客户标签批量编辑功能",
      description: "目前只能单个编辑客户标签，希望能支持批量选择多个客户进行标签编辑，提高工作效率。",
      rating: 4,
      status: "in_progress",
      priority: "medium",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-18"),
      assignedTo: "开发团队",
      tags: ["客户管理", "批量操作", "效率"],
      votes: 12,
      responses: [
        {
          id: "resp_1",
          authorId: "admin_1",
          authorName: "产品经理",
          content: "感谢您的建议！这个功能确实很有价值，我们已经将其加入开发计划中。",
          createdAt: new Date("2024-01-16"),
          isOfficial: true,
        },
      ],
    },
    {
      id: "fb_2",
      userId: "user_2",
      userName: "李四",
      userAvatar: "/placeholder.svg?height=40&width=40&text=李",
      type: "bug",
      category: "数据分析",
      title: "报表导出功能异常",
      description: "在导出大量数据的报表时，系统会卡住，无法正常完成导出操作。",
      rating: 2,
      status: "resolved",
      priority: "high",
      createdAt: new Date("2024-01-12"),
      updatedAt: new Date("2024-01-17"),
      assignedTo: "技术团队",
      tags: ["报表", "导出", "性能"],
      votes: 8,
      responses: [
        {
          id: "resp_2",
          authorId: "admin_2",
          authorName: "技术支持",
          content: "问题已经修复，请更新到最新版本。",
          createdAt: new Date("2024-01-17"),
          isOfficial: true,
        },
      ],
    },
    {
      id: "fb_3",
      userId: "user_3",
      userName: "王五",
      userAvatar: "/placeholder.svg?height=40&width=40&text=王",
      type: "praise",
      category: "用户体验",
      title: "新版界面设计很棒",
      description: "新版本的界面设计简洁美观，操作更加直观，使用体验有了很大提升。",
      rating: 5,
      status: "closed",
      priority: "low",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-11"),
      tags: ["界面设计", "用户体验"],
      votes: 15,
      responses: [],
    },
  ])

  const [newFeedback, setNewFeedback] = useState({
    type: "feature" as Feedback["type"],
    category: "",
    title: "",
    description: "",
    rating: 5,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // 反馈统计数据
  const stats: FeedbackStats = {
    total: feedbacks.length,
    pending: feedbacks.filter((f) => f.status === "pending").length,
    resolved: feedbacks.filter((f) => f.status === "resolved").length,
    averageRating: feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length,
    responseTime: 2.5, // 平均响应时间（小时）
    satisfactionRate: 87.5, // 满意度
  }

  // 反馈趋势数据
  const feedbackTrend = [
    { month: "10月", total: 45, resolved: 38, pending: 7 },
    { month: "11月", total: 52, resolved: 47, pending: 5 },
    { month: "12月", total: 48, resolved: 42, pending: 6 },
    { month: "1月", total: 61, resolved: 55, pending: 6 },
  ]

  // 反馈类型分布
  const typeDistribution = [
    { type: "功能建议", count: 25, color: "#3b82f6" },
    { type: "问题反馈", count: 18, color: "#ef4444" },
    { type: "改进建议", count: 12, color: "#f59e0b" },
    { type: "投诉", count: 8, color: "#8b5cf6" },
    { type: "表扬", count: 15, color: "#10b981" },
  ]

  // 满意度分布
  const satisfactionData = [
    { rating: "5星", count: 35, percentage: 45 },
    { rating: "4星", count: 28, percentage: 36 },
    { rating: "3星", count: 10, percentage: 13 },
    { rating: "2星", count: 3, percentage: 4 },
    { rating: "1星", count: 2, percentage: 2 },
  ]

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || feedback.type === selectedType
    const matchesStatus = selectedStatus === "all" || feedback.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bug":
        return <AlertTriangle className="w-4 h-4" />
      case "feature":
        return <Lightbulb className="w-4 h-4" />
      case "improvement":
        return <TrendingUp className="w-4 h-4" />
      case "complaint":
        return <ThumbsDown className="w-4 h-4" />
      case "praise":
        return <ThumbsUp className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      bug: "问题反馈",
      feature: "功能建议",
      improvement: "改进建议",
      complaint: "投诉",
      praise: "表扬",
    }
    return labels[type as keyof typeof labels] || type
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewing":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-purple-100 text-purple-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: "待处理",
      reviewing: "审核中",
      in_progress: "处理中",
      resolved: "已解决",
      closed: "已关闭",
    }
    return labels[status as keyof typeof labels] || status
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const submitFeedback = () => {
    const feedback: Feedback = {
      id: `fb_${Date.now()}`,
      userId: "current_user",
      userName: "当前用户",
      ...newFeedback,
      status: "pending",
      priority: "medium",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      votes: 0,
      responses: [],
    }

    setFeedbacks((prev) => [feedback, ...prev])
    setNewFeedback({
      type: "feature",
      category: "",
      title: "",
      description: "",
      rating: 5,
    })
  }

  const voteFeedback = (feedbackId: string) => {
    setFeedbacks((prev) =>
      prev.map((feedback) => (feedback.id === feedbackId ? { ...feedback, votes: feedback.votes + 1 } : feedback)),
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-blue-600" />
            用户反馈收集系统
          </h1>
          <p className="text-muted-foreground">收集、管理和分析用户反馈，持续改进产品体验</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            反馈报告
          </Button>
          <Button>
            <MessageSquare className="w-4 h-4 mr-2" />
            提交反馈
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-600">总反馈数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold">{stats.pending}</p>
            <p className="text-sm text-gray-600">待处理</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{stats.resolved}</p>
            <p className="text-sm text-gray-600">已解决</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
            <p className="text-sm text-gray-600">平均评分</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{stats.responseTime}h</p>
            <p className="text-sm text-gray-600">响应时间</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-pink-600" />
            <p className="text-2xl font-bold">{stats.satisfactionRate}%</p>
            <p className="text-sm text-gray-600">满意度</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feedbacks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feedbacks">反馈列表</TabsTrigger>
          <TabsTrigger value="submit">提交反馈</TabsTrigger>
          <TabsTrigger value="analytics">数据分析</TabsTrigger>
          <TabsTrigger value="management">反馈管理</TabsTrigger>
        </TabsList>

        <TabsContent value="feedbacks" className="space-y-6">
          {/* 搜索和筛选 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="搜索反馈..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类型</SelectItem>
                      <SelectItem value="bug">问题反馈</SelectItem>
                      <SelectItem value="feature">功能建议</SelectItem>
                      <SelectItem value="improvement">改进建议</SelectItem>
                      <SelectItem value="complaint">投诉</SelectItem>
                      <SelectItem value="praise">表扬</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有状态</SelectItem>
                    <SelectItem value="pending">待处理</SelectItem>
                    <SelectItem value="reviewing">审核中</SelectItem>
                    <SelectItem value="in_progress">处理中</SelectItem>
                    <SelectItem value="resolved">已解决</SelectItem>
                    <SelectItem value="closed">已关闭</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 反馈列表 */}
          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => (
              <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar>
                        <AvatarImage src={feedback.userAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{feedback.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{feedback.title}</h3>
                          <div className="flex items-center space-x-1">
                            {getTypeIcon(feedback.type)}
                            <Badge variant="outline">{getTypeLabel(feedback.type)}</Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{feedback.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {feedback.userName}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {feedback.createdAt.toLocaleDateString("zh-CN")}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {feedback.rating}/5
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {feedback.votes}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {feedback.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(feedback.status)}>{getStatusLabel(feedback.status)}</Badge>
                      <Badge className={getPriorityColor(feedback.priority)}>
                        {feedback.priority === "urgent"
                          ? "紧急"
                          : feedback.priority === "high"
                            ? "高"
                            : feedback.priority === "medium"
                              ? "中"
                              : "低"}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => voteFeedback(feedback.id)}>
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {feedback.responses.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">官方回复</h4>
                      {feedback.responses.map((response) => (
                        <div key={response.id} className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{response.authorName}</span>
                            {response.isOfficial && (
                              <Badge variant="outline" className="text-xs">
                                官方
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {response.createdAt.toLocaleDateString("zh-CN")}
                            </span>
                          </div>
                          <p className="text-sm">{response.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>提交反馈</CardTitle>
              <CardDescription>您的反馈对我们很重要，帮助我们不断改进产品</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>反馈类型</Label>
                  <Select
                    value={newFeedback.type}
                    onValueChange={(value) => setNewFeedback({ ...newFeedback, type: value as Feedback["type"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">问题反馈</SelectItem>
                      <SelectItem value="feature">功能建议</SelectItem>
                      <SelectItem value="improvement">改进建议</SelectItem>
                      <SelectItem value="complaint">投诉</SelectItem>
                      <SelectItem value="praise">表扬</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>相关模块</Label>
                  <Input
                    value={newFeedback.category}
                    onChange={(e) => setNewFeedback({ ...newFeedback, category: e.target.value })}
                    placeholder="如：客户管理、数据分析等"
                  />
                </div>
              </div>

              <div>
                <Label>反馈标题</Label>
                <Input
                  value={newFeedback.title}
                  onChange={(e) => setNewFeedback({ ...newFeedback, title: e.target.value })}
                  placeholder="简要描述您的反馈"
                />
              </div>

              <div>
                <Label>详细描述</Label>
                <Textarea
                  value={newFeedback.description}
                  onChange={(e) => setNewFeedback({ ...newFeedback, description: e.target.value })}
                  placeholder="请详细描述您的问题、建议或意见"
                  rows={6}
                />
              </div>

              <div>
                <Label>满意度评分</Label>
                <div className="flex items-center space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewFeedback({ ...newFeedback, rating })}
                      className={`p-1 ${
                        rating <= newFeedback.rating ? "text-yellow-500" : "text-gray-300"
                      } hover:text-yellow-500 transition-colors`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{newFeedback.rating}/5</span>
                </div>
              </div>

              <Button
                onClick={submitFeedback}
                disabled={!newFeedback.title || !newFeedback.description}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                提交反馈
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>反馈趋势分析</CardTitle>
                <CardDescription>每月反馈数量和处理情况</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    total: {
                      label: "总数",
                      color: "hsl(var(--chart-1))",
                    },
                    resolved: {
                      label: "已解决",
                      color: "hsl(var(--chart-2))",
                    },
                    pending: {
                      label: "待处理",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={feedbackTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} />
                      <Line type="monotone" dataKey="resolved" stroke="var(--color-resolved)" strokeWidth={2} />
                      <Line type="monotone" dataKey="pending" stroke="var(--color-pending)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>反馈类型分布</CardTitle>
                <CardDescription>各类型反馈的数量分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "数量",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                      >
                        {typeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>用户满意度分析</CardTitle>
              <CardDescription>用户评分分布情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {satisfactionData.map((item) => (
                  <div key={item.rating} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.rating}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{item.count}</span>
                        <span className="text-sm text-gray-600">({item.percentage}%)</span>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>反馈管理</CardTitle>
              <CardDescription>管理和处理用户反馈</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                      <p className="text-2xl font-bold">{feedbacks.filter((f) => f.status === "pending").length}</p>
                      <p className="text-sm text-gray-600">待处理反馈</p>
                      <Button size="sm" className="mt-2">
                        立即处理
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <p className="text-2xl font-bold">
                        {feedbacks.filter((f) => f.priority === "urgent" || f.priority === "high").length}
                      </p>
                      <p className="text-sm text-gray-600">高优先级</p>
                      <Button size="sm" className="mt-2" variant="destructive">
                        紧急处理
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-2xl font-bold">
                        {Math.round((feedbacks.filter((f) => f.status === "resolved").length / feedbacks.length) * 100)}
                        %
                      </p>
                      <p className="text-sm text-gray-600">解决率</p>
                      <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                        查看详情
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">快速操作</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <MessageSquare className="w-6 h-6 mb-2" />
                      批量回复
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <CheckCircle className="w-6 h-6 mb-2" />
                      标记已解决
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Users className="w-6 h-6 mb-2" />
                      分配处理人
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <BarChart3 className="w-6 h-6 mb-2" />
                      生成报告
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
