"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Home,
  Users,
  CheckSquare,
  BarChart3,
  MessageSquare,
  Building2,
  Target,
  Brain,
  FormInput,
  Smartphone,
  Shield,
  Settings,
  TrendingUp,
  Activity,
  Zap,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function OverviewPage() {
  const applicationModules = [
    {
      title: "仪表板",
      description: "企业数据总览和关键指标监控",
      href: "/",
      icon: Home,
      color: "emerald",
      features: ["实时数据", "可视化图表", "智能洞察"],
      status: "active",
      usage: 95,
    },
    {
      title: "客户管理",
      description: "全生命周期客户关系管理系统",
      href: "/customers",
      icon: Users,
      color: "orange",
      features: ["客户档案", "跟进记录", "价值分析"],
      status: "active",
      usage: 87,
    },
    {
      title: "任务管理",
      description: "智能任务分配和进度跟踪",
      href: "/tasks",
      icon: CheckSquare,
      color: "orange",
      features: ["任务分配", "进度跟踪", "协作工具"],
      status: "active",
      usage: 92,
    },
    {
      title: "数据分析",
      description: "高级BI分析和预测洞察",
      href: "/analytics",
      icon: BarChart3,
      color: "purple",
      features: ["多维分析", "预测模型", "智能报表"],
      status: "active",
      usage: 78,
    },
    {
      title: "沟通协作",
      description: "团队协作和沟通平台",
      href: "/communication",
      icon: MessageSquare,
      color: "blue",
      features: ["即时通讯", "视频会议", "文档协作"],
      status: "active",
      usage: 84,
    },
    {
      title: "财务管理",
      description: "财务数据管理和报表分析",
      href: "/finance",
      icon: Building2,
      color: "green",
      features: ["财务报表", "成本分析", "预算管理"],
      status: "active",
      usage: 73,
    },
    {
      title: "目标管理",
      description: "OKR和KPI目标管理系统",
      href: "/okr",
      icon: Target,
      color: "green",
      features: ["OKR管理", "KPI跟踪", "绩效评估"],
      status: "active",
      usage: 89,
    },
    {
      title: "AI客户数据",
      description: "智能客户洞察与预测分析",
      href: "/ai/customer-data",
      icon: Brain,
      color: "purple",
      features: ["智能分析", "预测模型", "行为洞察"],
      status: "new",
      usage: 65,
    },
    {
      title: "AI智能表单",
      description: "智能表单设计与数据收集",
      href: "/ai/smart-forms",
      icon: FormInput,
      color: "purple",
      features: ["智能填充", "语音输入", "自动验证"],
      status: "new",
      usage: 58,
    },
    {
      title: "移动端应用",
      description: "移动端管理和NFC功能",
      href: "/mobile/dashboard",
      icon: Smartphone,
      color: "rose",
      features: ["移动仪表板", "NFC签到", "离线支持"],
      status: "active",
      usage: 71,
    },
    {
      title: "系统设置",
      description: "系统配置和管理工具",
      href: "/settings/layout",
      icon: Settings,
      color: "blue",
      features: ["系统配置", "权限管理", "布局设置"],
      status: "active",
      usage: 45,
    },
    {
      title: "安全中心",
      description: "系统安全和数据保护",
      href: "/test",
      icon: Shield,
      color: "orange",
      features: ["安全监控", "数据保护", "访问控制"],
      status: "active",
      usage: 67,
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "border-l-emerald-500 bg-emerald-50 hover:bg-emerald-100",
      orange: "border-l-orange-500 bg-orange-50 hover:bg-orange-100",
      blue: "border-l-blue-500 bg-blue-50 hover:bg-blue-100",
      purple: "border-l-purple-500 bg-purple-50 hover:bg-purple-100",
      rose: "border-l-rose-500 bg-rose-50 hover:bg-rose-100",
      green: "border-l-green-500 bg-green-50 hover:bg-green-100",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-purple-100 text-purple-700">NEW</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-700">运行中</Badge>
      case "beta":
        return <Badge className="bg-blue-100 text-blue-700">测试版</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700">未知</Badge>
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return "from-emerald-400 to-emerald-500"
    if (usage >= 60) return "from-blue-400 to-blue-500"
    if (usage >= 40) return "from-yellow-400 to-yellow-500"
    return "from-red-400 to-red-500"
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Home className="w-8 h-8 mr-3 text-green-600" />
            应用总览
          </h1>
          <p className="text-gray-600 mt-2">企业管理系统功能模块总览</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">系统运行正常</span>
          </div>
          <Badge className="bg-green-100 text-green-700">
            <Activity className="w-3 h-3 mr-1" />
            {applicationModules.filter((m) => m.status === "active").length} 个模块运行中
          </Badge>
        </div>
      </div>

      {/* 系统统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总模块数</CardTitle>
            <Home className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{applicationModules.length}</div>
            <p className="text-xs text-gray-600">功能模块总数</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">运行中</CardTitle>
            <Activity className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">
              {applicationModules.filter((m) => m.status === "active").length}
            </div>
            <p className="text-xs text-gray-600">正常运行模块</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新功能</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {applicationModules.filter((m) => m.status === "new").length}
            </div>
            <p className="text-xs text-gray-600">新增功能模块</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均使用率</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {Math.round(applicationModules.reduce((acc, m) => acc + m.usage, 0) / applicationModules.length)}%
            </div>
            <p className="text-xs text-gray-600">系统整体使用率</p>
          </CardContent>
        </Card>
      </div>

      {/* 应用模块网格 */}
      <Card className="border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <Zap className="w-5 h-5 mr-2" />
            功能模块
          </CardTitle>
          <CardDescription>企业管理系统的所有功能模块概览</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationModules.map((module, index) => (
              <Link key={index} href={module.href}>
                <div
                  className={`border-l-4 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${getColorClasses(module.color)}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                        <module.icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                      </div>
                    </div>
                    {getStatusBadge(module.status)}
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">核心功能</div>
                    <div className="flex flex-wrap gap-1">
                      {module.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">使用率</span>
                      <span className="font-medium">{module.usage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getUsageColor(module.usage)} rounded-full transition-all duration-500`}
                        style={{ width: `${module.usage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
                    >
                      进入模块 →
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 快速操作 */}
      <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Zap className="w-5 h-5 mr-2" />
            快速操作
          </CardTitle>
          <CardDescription>常用功能快速入口</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/customers">
              <Button
                variant="outline"
                className="w-full h-16 border-l-4 border-l-orange-500 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-transparent"
              >
                <div className="text-center">
                  <Users className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">客户管理</div>
                </div>
              </Button>
            </Link>
            <Link href="/tasks">
              <Button
                variant="outline"
                className="w-full h-16 border-l-4 border-l-orange-500 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-transparent"
              >
                <div className="text-center">
                  <CheckSquare className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">任务管理</div>
                </div>
              </Button>
            </Link>
            <Link href="/ai/customer-data">
              <Button
                variant="outline"
                className="w-full h-16 border-l-4 border-l-purple-500 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-transparent"
              >
                <div className="text-center">
                  <Brain className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">AI分析</div>
                </div>
              </Button>
            </Link>
            <Link href="/analytics">
              <Button
                variant="outline"
                className="w-full h-16 border-l-4 border-l-purple-500 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-transparent"
              >
                <div className="text-center">
                  <BarChart3 className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">数据分析</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
