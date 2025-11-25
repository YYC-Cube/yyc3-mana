"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  BarChart3,
  Shield,
  Database,
  Smartphone,
  Zap,
  Users,
  Settings,
  TrendingUp,
  FileText,
  Download,
  RefreshCw,
} from "lucide-react"

interface AuditItem {
  id: string
  name: string
  status: "success" | "warning" | "error" | "pending"
  score: number
  description: string
  details: string[]
  recommendations: string[]
}

interface AuditCategory {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  items: AuditItem[]
  overallScore: number
}

export function GlobalStartupAudit() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [auditData, setAuditData] = useState<AuditCategory[]>([])

  // 模拟审核数据
  const generateAuditData = (): AuditCategory[] => [
    {
      id: "system-core",
      name: "系统核心",
      icon: Settings,
      overallScore: 85,
      items: [
        {
          id: "database",
          name: "数据库连接",
          status: "success",
          score: 95,
          description: "数据库连接正常，性能良好",
          details: ["IndexedDB 初始化成功", "数据表结构完整", "索引配置正确"],
          recommendations: ["定期清理过期数据", "优化查询性能"],
        },
        {
          id: "routing",
          name: "路由系统",
          status: "success",
          score: 90,
          description: "路由配置完整，导航正常",
          details: ["所有路由可访问", "动态路由工作正常", "404页面配置"],
          recommendations: ["添加路由守卫", "优化路由懒加载"],
        },
        {
          id: "state-management",
          name: "状态管理",
          status: "warning",
          score: 75,
          description: "状态管理基本正常，部分优化空间",
          details: ["React状态正常", "本地存储可用", "状态同步存在延迟"],
          recommendations: ["实现全局状态管理", "优化状态更新机制"],
        },
      ],
    },
    {
      id: "data-management",
      name: "数据管理",
      icon: Database,
      overallScore: 78,
      items: [
        {
          id: "data-integrity",
          name: "数据完整性",
          status: "success",
          score: 88,
          description: "数据结构完整，验证机制正常",
          details: ["数据模型定义完整", "字段验证正常", "关联关系正确"],
          recommendations: ["添加数据备份机制", "实现数据版本控制"],
        },
        {
          id: "data-sync",
          name: "数据同步",
          status: "warning",
          score: 70,
          description: "数据同步功能部分实现",
          details: ["离线数据缓存", "同步机制基础实现", "冲突解决待完善"],
          recommendations: ["完善同步策略", "优化冲突解决算法"],
        },
        {
          id: "data-backup",
          name: "数据备份",
          status: "error",
          score: 45,
          description: "数据备份机制未完全实现",
          details: ["本地备份部分实现", "云端备份未配置", "恢复机制待开发"],
          recommendations: ["实现自动备份", "配置云端存储", "开发数据恢复功能"],
        },
      ],
    },
    {
      id: "security",
      name: "安全检查",
      icon: Shield,
      overallScore: 65,
      items: [
        {
          id: "authentication",
          name: "用户认证",
          status: "warning",
          score: 60,
          description: "基础认证功能实现，安全性待加强",
          details: ["基础登录功能", "会话管理简单", "权限控制基础"],
          recommendations: ["实现多因素认证", "加强会话安全", "完善权限系统"],
        },
        {
          id: "data-encryption",
          name: "数据加密",
          status: "error",
          score: 40,
          description: "数据加密机制不完善",
          details: ["敏感数据未加密", "传输加密部分实现", "存储加密缺失"],
          recommendations: ["实现端到端加密", "加强数据传输安全", "配置存储加密"],
        },
        {
          id: "access-control",
          name: "访问控制",
          status: "warning",
          score: 70,
          description: "访问控制基本实现，细粒度控制待完善",
          details: ["基础角色权限", "页面访问控制", "API权限验证"],
          recommendations: ["实现细粒度权限", "添加审计日志", "完善权限继承"],
        },
      ],
    },
    {
      id: "performance",
      name: "性能监控",
      icon: TrendingUp,
      overallScore: 82,
      items: [
        {
          id: "load-time",
          name: "加载性能",
          status: "success",
          score: 85,
          description: "页面加载速度良好",
          details: ["首屏加载时间 < 2s", "资源压缩正常", "缓存策略有效"],
          recommendations: ["优化图片加载", "实现代码分割", "使用CDN加速"],
        },
        {
          id: "runtime-performance",
          name: "运行时性能",
          status: "success",
          score: 88,
          description: "运行时性能表现优秀",
          details: ["内存使用合理", "CPU占用正常", "响应时间快"],
          recommendations: ["监控内存泄漏", "优化大数据渲染", "实现虚拟滚动"],
        },
        {
          id: "network-optimization",
          name: "网络优化",
          status: "warning",
          score: 75,
          description: "网络请求优化有改进空间",
          details: ["请求数量适中", "缓存策略基础", "离线支持部分实现"],
          recommendations: ["减少请求数量", "优化缓存策略", "完善离线功能"],
        },
      ],
    },
    {
      id: "ui-ux",
      name: "用户界面",
      icon: Users,
      overallScore: 90,
      items: [
        {
          id: "responsive-design",
          name: "响应式设计",
          status: "success",
          score: 92,
          description: "响应式设计实现良好",
          details: ["移动端适配完整", "平板适配正常", "桌面端体验优秀"],
          recommendations: ["优化超大屏幕显示", "完善触摸交互", "提升加载动画"],
        },
        {
          id: "accessibility",
          name: "无障碍访问",
          status: "warning",
          score: 78,
          description: "无障碍功能部分实现",
          details: ["键盘导航支持", "屏幕阅读器部分支持", "颜色对比度良好"],
          recommendations: ["完善ARIA标签", "添加焦点管理", "支持高对比度模式"],
        },
        {
          id: "user-experience",
          name: "用户体验",
          status: "success",
          score: 95,
          description: "用户体验设计优秀",
          details: ["界面美观现代", "交互流畅自然", "信息架构清晰"],
          recommendations: ["添加用户引导", "优化错误提示", "增强反馈机制"],
        },
      ],
    },
    {
      id: "features",
      name: "功能模块",
      icon: BarChart3,
      overallScore: 88,
      items: [
        {
          id: "core-features",
          name: "核心功能",
          status: "success",
          score: 95,
          description: "核心功能完整实现",
          details: ["任务管理完整", "客户管理功能齐全", "数据分析丰富"],
          recommendations: ["添加高级筛选", "实现批量操作", "优化搜索功能"],
        },
        {
          id: "advanced-features",
          name: "高级功能",
          status: "warning",
          score: 80,
          description: "高级功能部分实现",
          details: ["AI分析基础实现", "自动化流程部分完成", "集成功能待完善"],
          recommendations: ["完善AI功能", "扩展自动化", "增加第三方集成"],
        },
        {
          id: "customization",
          name: "个性化定制",
          status: "warning",
          score: 75,
          description: "个性化功能基础实现",
          details: ["主题切换支持", "布局自定义部分实现", "用户偏好设置基础"],
          recommendations: ["扩展主题选项", "完善布局定制", "增加个人工作台"],
        },
      ],
    },
    {
      id: "mobile",
      name: "移动端",
      icon: Smartphone,
      overallScore: 80,
      items: [
        {
          id: "mobile-compatibility",
          name: "移动端兼容性",
          status: "success",
          score: 85,
          description: "移动端兼容性良好",
          details: ["iOS Safari 支持", "Android Chrome 支持", "响应式布局完整"],
          recommendations: ["优化触摸交互", "改进手势支持", "提升加载速度"],
        },
        {
          id: "pwa-features",
          name: "PWA功能",
          status: "warning",
          score: 75,
          description: "PWA功能部分实现",
          details: ["Service Worker 配置", "离线缓存基础", "安装提示实现"],
          recommendations: ["完善离线功能", "优化缓存策略", "添加推送通知"],
        },
        {
          id: "mobile-performance",
          name: "移动端性能",
          status: "success",
          score: 82,
          description: "移动端性能表现良好",
          details: ["加载速度适中", "内存使用合理", "电池消耗正常"],
          recommendations: ["优化图片加载", "减少网络请求", "实现懒加载"],
        },
      ],
    },
    {
      id: "integrations",
      name: "系统集成",
      icon: Zap,
      overallScore: 60,
      items: [
        {
          id: "api-integration",
          name: "API集成",
          status: "warning",
          score: 65,
          description: "API集成基础实现",
          details: ["RESTful API 部分实现", "数据格式标准化", "错误处理基础"],
          recommendations: ["完善API文档", "实现GraphQL", "加强错误处理"],
        },
        {
          id: "third-party-services",
          name: "第三方服务",
          status: "error",
          score: 45,
          description: "第三方服务集成不完整",
          details: ["支付集成未实现", "邮件服务部分配置", "云存储待集成"],
          recommendations: ["集成支付网关", "配置邮件服务", "实现云存储"],
        },
        {
          id: "webhook-support",
          name: "Webhook支持",
          status: "error",
          score: 30,
          description: "Webhook功能未实现",
          details: ["Webhook接收未配置", "事件触发机制缺失", "安全验证待实现"],
          recommendations: ["实现Webhook接收", "配置事件系统", "添加安全验证"],
        },
      ],
    },
  ]

  // 运行审核
  const runAudit = async () => {
    setIsRunning(true)
    setProgress(0)

    // 模拟审核过程
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setProgress(i)
    }

    setAuditData(generateAuditData())
    setIsRunning(false)
  }

  // 计算总体评分
  const calculateOverallScore = () => {
    if (auditData.length === 0) return 0
    const totalScore = auditData.reduce((sum, category) => sum + category.overallScore, 0)
    return Math.round(totalScore / auditData.length)
  }

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-gray-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200"
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "error":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  // 获取评分等级
  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "A", color: "text-green-600" }
    if (score >= 80) return { grade: "B", color: "text-blue-600" }
    if (score >= 70) return { grade: "C", color: "text-yellow-600" }
    if (score >= 60) return { grade: "D", color: "text-orange-600" }
    return { grade: "F", color: "text-red-600" }
  }

  useEffect(() => {
    // 自动运行一次审核
    runAudit()
  }, [])

  const overallScore = calculateOverallScore()
  const overallGrade = getScoreGrade(overallScore)

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">全局系统审核</h1>
          <p className="text-slate-600 mt-1">全面检查系统功能完整性和性能表现</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={runAudit} disabled={isRunning}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "审核中..." : "重新审核"}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 审核进度 */}
      {isRunning && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>审核进度</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* 总体评分 */}
      {!isRunning && auditData.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">系统总体评分</h2>
                <p className="text-blue-100 mt-1">基于 {auditData.length} 个类别的综合评估</p>
              </div>
              <div className="text-center">
                <div className={`text-6xl font-bold ${overallGrade.color}`}>{overallGrade.grade}</div>
                <div className="text-3xl font-semibold">{overallScore}/100</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 类别概览 */}
      {!isRunning && auditData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {auditData.map((category) => {
            const grade = getScoreGrade(category.overallScore)
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <category.icon className="w-8 h-8 text-blue-600" />
                    <div className={`text-2xl font-bold ${grade.color}`}>{grade.grade}</div>
                  </div>
                  <h3 className="font-semibold text-slate-800">{category.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{category.overallScore}/100</p>
                  <Progress value={category.overallScore} className="mt-2 h-2" />
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* 详细审核结果 */}
      {!isRunning && auditData.length > 0 && (
        <Tabs defaultValue={auditData[0]?.id} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            {auditData.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {auditData.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <category.icon className="w-6 h-6 text-blue-600" />
                    <span>{category.name}</span>
                    <Badge variant="secondary">{category.overallScore}/100</Badge>
                  </CardTitle>
                  <CardDescription>详细检查结果和改进建议</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {category.items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(item.status)}
                            <div>
                              <h4 className="font-semibold text-slate-800">{item.name}</h4>
                              <p className="text-sm text-slate-600">{item.description}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(item.status)}>{item.score}/100</Badge>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                          <div>
                            <h5 className="font-medium text-slate-700 mb-2">检查详情</h5>
                            <ul className="space-y-1">
                              {item.details.map((detail, index) => (
                                <li key={index} className="text-sm text-slate-600 flex items-center space-x-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-slate-700 mb-2">改进建议</h5>
                            <ul className="space-y-1">
                              {item.recommendations.map((recommendation, index) => (
                                <li key={index} className="text-sm text-slate-600 flex items-center space-x-2">
                                  <TrendingUp className="w-3 h-3 text-blue-500 flex-shrink-0" />
                                  <span>{recommendation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* 改进路线图 */}
      {!isRunning && auditData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <span>系统改进路线图</span>
            </CardTitle>
            <CardDescription>按优先级排序的改进建议</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">🔥 高优先级 (立即处理)</h4>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>• 实现数据备份和恢复机制</li>
                  <li>• 加强数据加密和安全措施</li>
                  <li>• 完善用户认证和权限系统</li>
                  <li>• 实现第三方服务集成</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700">⏰ 中优先级 (短期目标)</h4>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>• 优化数据同步机制</li>
                  <li>• 完善PWA功能</li>
                  <li>• 实现API文档和GraphQL</li>
                  <li>• 加强无障碍访问支持</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">📈 低优先级 (长期规划)</h4>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>• 扩展个性化定制功能</li>
                  <li>• 优化移动端性能</li>
                  <li>• 实现高级AI功能</li>
                  <li>• 添加更多第三方集成</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
