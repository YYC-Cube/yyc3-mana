"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  CheckSquare,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  AlertCircle,
  ArrowUp,
  MoreHorizontal,
  Plus,
  Bell,
  RefreshCw,
} from "lucide-react"

interface DashboardStats {
  customers: { total: number; new: number; trend: number }
  tasks: { total: number; completed: number; pending: number; overdue: number }
  revenue: { total: number; monthly: number; trend: number }
  kpi: { score: number; target: number; trend: number }
}

interface RecentActivity {
  id: string
  type: "task" | "customer" | "approval" | "message"
  title: string
  description: string
  time: string
  priority?: "high" | "medium" | "low"
  status?: "completed" | "pending" | "overdue"
}

export function MobileDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    customers: { total: 1248, new: 23, trend: 12.5 },
    tasks: { total: 156, completed: 89, pending: 45, overdue: 22 },
    revenue: { total: 2847500, monthly: 485600, trend: 8.3 },
    kpi: { score: 87, target: 90, trend: 5.2 },
  })

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "task",
      title: "完成产品需求分析",
      description: "张三提交了产品需求分析报告",
      time: "2分钟前",
      priority: "high",
      status: "completed",
    },
    {
      id: "2",
      type: "customer",
      title: "新客户注册",
      description: "北京科技有限公司完成注册",
      time: "15分钟前",
      priority: "medium",
    },
    {
      id: "3",
      type: "approval",
      title: "费用报销审批",
      description: "李四的差旅费报销等待审批",
      time: "1小时前",
      priority: "medium",
      status: "pending",
    },
    {
      id: "4",
      type: "message",
      title: "系统维护通知",
      description: "系统将于今晚22:00进行维护",
      time: "2小时前",
      priority: "low",
    },
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 刷新数据
  const handleRefresh = async () => {
    setIsRefreshing(true)

    // 模拟数据刷新
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 更新统计数据
    setStats((prev) => ({
      customers: { ...prev.customers, new: prev.customers.new + Math.floor(Math.random() * 3) },
      tasks: { ...prev.tasks, completed: prev.tasks.completed + Math.floor(Math.random() * 2) },
      revenue: { ...prev.revenue, monthly: prev.revenue.monthly + Math.floor(Math.random() * 10000) },
      kpi: { ...prev.kpi, score: Math.min(100, prev.kpi.score + Math.floor(Math.random() * 3)) },
    }))

    setIsRefreshing(false)
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 6) return "深夜好"
    if (hour < 12) return "早上好"
    if (hour < 18) return "下午好"
    return "晚上好"
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task":
        return CheckSquare
      case "customer":
        return Users
      case "approval":
        return AlertCircle
      case "message":
        return Bell
      default:
        return Clock
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "task":
        return "text-blue-600 bg-blue-100"
      case "customer":
        return "text-green-600 bg-green-100"
      case "approval":
        return "text-orange-600 bg-orange-100"
      case "message":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6 pb-6">
      {/* 欢迎区域 */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">{getGreeting()}，管理员</h1>
            <p className="text-sky-100 text-sm">
              {currentTime.toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sky-100 text-sm">今日任务</span>
              <CheckSquare className="w-4 h-4 text-sky-100" />
            </div>
            <div className="text-2xl font-bold">{stats.tasks.pending}</div>
            <div className="text-sky-100 text-xs">待处理</div>
          </div>

          <div className="bg-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sky-100 text-sm">新客户</span>
              <Users className="w-4 h-4 text-sky-100" />
            </div>
            <div className="text-2xl font-bold">{stats.customers.new}</div>
            <div className="text-sky-100 text-xs">本周新增</div>
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "新建任务", icon: Plus, color: "bg-blue-500" },
          { label: "添加客户", icon: Users, color: "bg-green-500" },
          { label: "查看报表", icon: TrendingUp, color: "bg-purple-500" },
          { label: "更多", icon: MoreHorizontal, color: "bg-gray-500" },
        ].map((action, index) => {
          const Icon = action.icon
          return (
            <Button
              key={index}
              variant="outline"
              className="flex flex-col items-center space-y-2 p-4 h-auto border-2 hover:border-sky-300"
            >
              <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-center">{action.label}</span>
            </Button>
          )
        })}
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="w-3 h-3 mr-1" />
                <span>{stats.customers.trend}%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">{stats.customers.total.toLocaleString()}</div>
            <div className="text-sm text-slate-500">客户总数</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="w-3 h-3 mr-1" />
                <span>{stats.revenue.trend}%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-1">
              ¥{(stats.revenue.monthly / 10000).toFixed(1)}万
            </div>
            <div className="text-sm text-slate-500">本月收入</div>
          </CardContent>
        </Card>
      </div>

      {/* KPI进度 */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>KPI完成度</span>
            <Badge variant="outline" className="text-xs">
              {stats.kpi.score}/{stats.kpi.target}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <Progress value={(stats.kpi.score / stats.kpi.target) * 100} className="h-3" />
            <div className="flex justify-between text-sm text-slate-500">
              <span>当前进度: {stats.kpi.score}%</span>
              <span className="flex items-center text-green-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                <span>+{stats.kpi.trend}%</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 最近活动 */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>最近活动</span>
            <Button variant="ghost" size="sm" className="p-1">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-slate-800 truncate">{activity.title}</p>
                      {activity.priority && (
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(activity.priority)}`} />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mb-1">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{activity.time}</span>
                      {activity.status && (
                        <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {activity.status === "completed"
                            ? "已完成"
                            : activity.status === "pending"
                              ? "待处理"
                              : "已逾期"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 今日日程 */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>今日日程</span>
            <Button variant="ghost" size="sm" className="p-1">
              <Calendar className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {[
              { time: "09:00", title: "团队晨会", type: "会议" },
              { time: "14:00", title: "客户需求评审", type: "评审" },
              { time: "16:30", title: "项目进度汇报", type: "汇报" },
            ].map((schedule, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="text-sm font-medium text-sky-600 w-12">{schedule.time}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{schedule.title}</p>
                  <p className="text-xs text-slate-500">{schedule.type}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  即将开始
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
