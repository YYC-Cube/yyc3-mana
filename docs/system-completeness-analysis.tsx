"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  Database,
  FileText,
  Zap,
  Target,
  Award,
  Lightbulb,
  ArrowRight,
  Download,
} from "lucide-react"

interface FeatureModule {
  id: string
  name: string
  description: string
  completeness: number
  status: "完成" | "进行中" | "待开发" | "需优化"
  priority: "高" | "中" | "低"
  components: string[]
  features: {
    name: string
    status: "完成" | "部分完成" | "未开始"
    completeness: number
  }[]
  technicalDebt: string[]
  recommendations: string[]
}

export function SystemCompletenessAnalysis() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const modules: FeatureModule[] = [
    {
      id: "dashboard",
      name: "仪表板系统",
      description: "企业数据概览和快速操作中心",
      completeness: 95,
      status: "完成",
      priority: "高",
      components: [
        "dashboard-content.tsx",
        "dashboard-module.tsx",
        "charts/sales-chart.tsx",
        "charts/finance-chart.tsx",
        "charts/performance-chart.tsx",
      ],
      features: [
        { name: "数据可视化", status: "完成", completeness: 100 },
        { name: "实时数据更新", status: "完成", completeness: 90 },
        { name: "自定义布局", status: "部分完成", completeness: 70 },
        { name: "导出功能", status: "完成", completeness: 95 },
        { name: "响应式设计", status: "完成", completeness: 100 },
      ],
      technicalDebt: ["需要优化图表渲染性能", "自定义布局功能需要完善"],
      recommendations: ["实现图表懒加载提升性能", "添加更多自定义配置选项", "增加数据钻取功能"],
    },
    {
      id: "task-management",
      name: "任务管理系统",
      description: "项目任务创建、分配、跟踪和协作",
      completeness: 88,
      status: "完成",
      priority: "高",
      components: [
        "task-management.tsx",
        "task-management-enhanced.tsx",
        "task-dependencies.tsx",
        "task-templates.tsx",
        "time-tracker.tsx",
      ],
      features: [
        { name: "任务CRUD操作", status: "完成", completeness: 100 },
        { name: "任务依赖关系", status: "完成", completeness: 95 },
        { name: "时间跟踪", status: "完成", completeness: 90 },
        { name: "任务模板", status: "完成", completeness: 85 },
        { name: "甘特图视图", status: "部分完成", completeness: 60 },
        { name: "团队协作", status: "完成", completeness: 80 },
      ],
      technicalDebt: ["甘特图组件需要重构", "批量操作功能待优化"],
      recommendations: ["完善甘特图功能", "添加任务自动化规则", "增强团队协作功能", "实现任务优先级智能排序"],
    },
    {
      id: "customer-management",
      name: "客户管理系统",
      description: "客户信息管理、关系维护和价值分析",
      completeness: 85,
      status: "完成",
      priority: "高",
      components: [
        "customer-management.tsx",
        "customer-management-enhanced.tsx",
        "customer-lifecycle.tsx",
        "customer-satisfaction.tsx",
      ],
      features: [
        { name: "客户信息管理", status: "完成", completeness: 100 },
        { name: "客户生命周期", status: "完成", completeness: 90 },
        { name: "满意度调查", status: "完成", completeness: 85 },
        { name: "客户价值分析", status: "部分完成", completeness: 70 },
        { name: "销售机会跟踪", status: "部分完成", completeness: 65 },
      ],
      technicalDebt: ["客户数据导入导出功能需要完善", "客户标签系统待优化"],
      recommendations: ["完善CRM工作流", "添加客户行为分析", "实现智能客户推荐", "增强数据导入导出功能"],
    },
    {
      id: "communication",
      name: "沟通协作系统",
      description: "即时通讯、会议管理和文档协作",
      completeness: 82,
      status: "完成",
      priority: "高",
      components: [
        "communication.tsx",
        "real-time-chat.tsx",
        "meeting-room-manager.tsx",
        "document-version-control.tsx",
        "notification-center.tsx",
      ],
      features: [
        { name: "即时聊天", status: "完成", completeness: 90 },
        { name: "会议管理", status: "完成", completeness: 85 },
        { name: "文档协作", status: "完成", completeness: 80 },
        { name: "通知系统", status: "完成", completeness: 95 },
        { name: "文件共享", status: "部分完成", completeness: 70 },
        { name: "视频通话", status: "未开始", completeness: 0 },
      ],
      technicalDebt: ["WebRTC集成需要完善", "文件上传组件需要优化"],
      recommendations: ["集成视频通话功能", "优化文件传输性能", "添加屏幕共享功能", "实现消息加密"],
    },
    {
      id: "analytics",
      name: "数据分析系统",
      description: "业务数据分析、报表生成和决策支持",
      completeness: 78,
      status: "完成",
      priority: "中",
      components: ["data-analytics.tsx", "kpi-tracking.tsx", "okr-management.tsx", "ai-analysis-center.tsx"],
      features: [
        { name: "数据可视化", status: "完成", completeness: 90 },
        { name: "KPI跟踪", status: "完成", completeness: 85 },
        { name: "OKR管理", status: "完成", completeness: 80 },
        { name: "AI分析", status: "完成", completeness: 75 },
        { name: "自定义报表", status: "部分完成", completeness: 60 },
        { name: "预测分析", status: "部分完成", completeness: 50 },
      ],
      technicalDebt: ["报表生成器需要重构", "AI模型集成待优化"],
      recommendations: ["完善自定义报表功能", "增强预测分析能力", "添加更多图表类型", "实现报表自动化"],
    },
    {
      id: "finance",
      name: "财务管理系统",
      description: "财务数据管理、发票处理和税务计算",
      completeness: 75,
      status: "完成",
      priority: "高",
      components: ["finance-module.tsx", "invoice-management.tsx", "tax-calculation.tsx"],
      features: [
        { name: "发票管理", status: "完成", completeness: 90 },
        { name: "税务计算", status: "完成", completeness: 85 },
        { name: "财务报表", status: "部分完成", completeness: 70 },
        { name: "预算管理", status: "部分完成", completeness: 60 },
        { name: "成本分析", status: "未开始", completeness: 0 },
      ],
      technicalDebt: ["财务数据验证规则需要完善", "报表模板需要扩展"],
      recommendations: ["完善预算管理功能", "添加成本分析模块", "实现财务预警系统", "增强数据安全性"],
    },
    {
      id: "approval",
      name: "审批流程系统",
      description: "工作流引擎、审批管理和电子签名",
      completeness: 92,
      status: "完成",
      priority: "高",
      components: ["oa-approval.tsx", "approval-module.tsx", "electronic-signature.tsx"],
      features: [
        { name: "工作流引擎", status: "完成", completeness: 95 },
        { name: "审批管理", status: "完成", completeness: 90 },
        { name: "电子签名", status: "完成", completeness: 85 },
        { name: "流程设计器", status: "完成", completeness: 90 },
        { name: "移动审批", status: "完成", completeness: 95 },
      ],
      technicalDebt: ["复杂流程性能需要优化", "签名验证机制待加强"],
      recommendations: ["优化复杂流程性能", "增强签名安全性", "添加流程分析功能", "实现流程模板市场"],
    },
    {
      id: "security",
      name: "安全权限系统",
      description: "用户权限管理、安全审计和访问控制",
      completeness: 88,
      status: "完成",
      priority: "高",
      components: [
        "permission-management.tsx",
        "security/security-audit-dashboard.tsx",
        "security/permission-guard.tsx",
        "security/permission-system.ts",
      ],
      features: [
        { name: "角色权限管理", status: "完成", completeness: 95 },
        { name: "安全审计", status: "完成", completeness: 85 },
        { name: "访问控制", status: "完成", completeness: 90 },
        { name: "单点登录", status: "部分完成", completeness: 70 },
        { name: "多因子认证", status: "未开始", completeness: 0 },
      ],
      technicalDebt: ["SSO集成需要完善", "审计日志存储优化"],
      recommendations: ["完善SSO集成", "添加多因子认证", "增强威胁检测", "实现零信任架构"],
    },
    {
      id: "mobile",
      name: "移动端优化",
      description: "移动设备适配、触摸交互和离线支持",
      completeness: 80,
      status: "完成",
      priority: "中",
      components: [
        "mobile/mobile-dashboard.tsx",
        "mobile/mobile-layout.tsx",
        "mobile/enhanced-touch-gestures.tsx",
        "mobile/mobile-performance-monitor.tsx",
      ],
      features: [
        { name: "响应式设计", status: "完成", completeness: 95 },
        { name: "触摸手势", status: "完成", completeness: 85 },
        { name: "离线支持", status: "完成", completeness: 75 },
        { name: "PWA功能", status: "完成", completeness: 80 },
        { name: "性能监控", status: "完成", completeness: 90 },
      ],
      technicalDebt: ["离线数据同步机制需要优化", "触摸手势兼容性待提升"],
      recommendations: ["优化离线数据同步", "增强触摸体验", "添加更多PWA功能", "实现推送通知"],
    },
    {
      id: "integration",
      name: "第三方集成",
      description: "外部系统集成、API管理和数据同步",
      completeness: 70,
      status: "进行中",
      priority: "中",
      components: ["third-party-integrations.tsx", "integration-module.tsx", "ai-analysis-center.tsx"],
      features: [
        { name: "钉钉集成", status: "完成", completeness: 80 },
        { name: "企业微信集成", status: "部分完成", completeness: 70 },
        { name: "AI模型集成", status: "完成", completeness: 85 },
        { name: "支付系统集成", status: "部分完成", completeness: 60 },
        { name: "邮件系统集成", status: "未开始", completeness: 0 },
      ],
      technicalDebt: ["API限流机制需要实现", "数据同步错误处理待完善"],
      recommendations: ["完善第三方API集成", "添加更多集成选项", "实现数据同步监控", "增强错误处理机制"],
    },
    {
      id: "i18n",
      name: "国际化系统",
      description: "多语言支持、本地化和文化适配",
      completeness: 85,
      status: "完成",
      priority: "中",
      components: ["i18n/language-provider.tsx", "i18n/language-switcher.tsx", "i18n/index.ts"],
      features: [
        { name: "多语言支持", status: "完成", completeness: 90 },
        { name: "动态语言切换", status: "完成", completeness: 85 },
        { name: "本地化格式", status: "完成", completeness: 80 },
        { name: "RTL语言支持", status: "部分完成", completeness: 60 },
        { name: "翻译管理", status: "部分完成", completeness: 70 },
      ],
      technicalDebt: ["翻译文件管理需要优化", "RTL布局适配待完善"],
      recommendations: ["完善RTL语言支持", "添加翻译管理界面", "实现自动翻译功能", "增强文化适配"],
    },
    {
      id: "performance",
      name: "性能监控系统",
      description: "系统性能监控、优化建议和资源管理",
      completeness: 75,
      status: "完成",
      priority: "中",
      components: ["performance-dashboard.tsx", "performance-monitor.ts", "mobile/mobile-performance-monitor.tsx"],
      features: [
        { name: "性能指标监控", status: "完成", completeness: 85 },
        { name: "资源使用统计", status: "完成", completeness: 80 },
        { name: "性能警报", status: "完成", completeness: 75 },
        { name: "优化建议", status: "部分完成", completeness: 60 },
        { name: "性能报告", status: "部分完成", completeness: 65 },
      ],
      technicalDebt: ["性能数据存储需要优化", "监控粒度需要细化"],
      recommendations: ["增强性能分析能力", "添加自动优化功能", "实现性能基准测试", "完善监控报告"],
    },
  ]

  const overallCompleteness = Math.round(modules.reduce((sum, module) => sum + module.completeness, 0) / modules.length)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "完成":
        return "bg-green-100 text-green-800 border-green-200"
      case "进行中":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "待开发":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "需优化":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-red-100 text-red-800"
      case "中":
        return "bg-yellow-100 text-yellow-800"
      case "低":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFeatureStatusIcon = (status: string) => {
    switch (status) {
      case "完成":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "部分完成":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "未开始":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const generateReport = () => {
    const completedModules = modules.filter((m) => m.status === "完成").length
    const inProgressModules = modules.filter((m) => m.status === "进行中").length
    const highPriorityModules = modules.filter((m) => m.priority === "高").length

    return {
      totalModules: modules.length,
      completedModules,
      inProgressModules,
      highPriorityModules,
      overallCompleteness,
      recommendations: [
        "优先完善高优先级模块的未完成功能",
        "加强系统集成和第三方服务对接",
        "提升移动端用户体验和性能",
        "完善安全性和数据保护机制",
        "增强AI和自动化功能",
      ],
    }
  }

  const report = generateReport()

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
            系统功能完整度分析报告
          </h1>
          <p className="text-slate-600 mt-1">全面评估企业管理系统各模块的开发进度和功能完整性</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            整体完成度: {overallCompleteness}%
          </Badge>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Download className="w-4 h-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 总体概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              总模块数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{report.totalModules}</div>
            <p className="text-sm text-slate-600">功能模块总数</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              已完成模块
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{report.completedModules}</div>
            <p className="text-sm text-slate-600">
              完成率: {Math.round((report.completedModules / report.totalModules) * 100)}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Clock className="w-5 h-5 mr-2 text-yellow-600" />
              进行中模块
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{report.inProgressModules}</div>
            <p className="text-sm text-slate-600">需要继续完善</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              高优先级模块
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{report.highPriorityModules}</div>
            <p className="text-sm text-slate-600">核心业务模块</p>
          </CardContent>
        </Card>
      </div>

      {/* 整体进度 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            整体开发进度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">系统整体完成度</span>
              <span className="text-2xl font-bold text-blue-600">{overallCompleteness}%</span>
            </div>
            <Progress value={overallCompleteness} className="h-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">85%+</div>
                <p className="text-sm text-green-700">高完成度模块</p>
                <p className="text-xs text-green-600">{modules.filter((m) => m.completeness >= 85).length} 个模块</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">70-84%</div>
                <p className="text-sm text-yellow-700">中等完成度模块</p>
                <p className="text-xs text-yellow-600">
                  {modules.filter((m) => m.completeness >= 70 && m.completeness < 85).length} 个模块
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">&lt;70%</div>
                <p className="text-sm text-red-700">待完善模块</p>
                <p className="text-xs text-red-600">{modules.filter((m) => m.completeness < 70).length} 个模块</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 模块详细分析 */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">模块概览</TabsTrigger>
          <TabsTrigger value="details">详细分析</TabsTrigger>
          <TabsTrigger value="recommendations">改进建议</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map((module) => (
              <Card
                key={module.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedModule(module.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <CardDescription className="mt-1">{module.description}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                      <Badge className={getPriorityColor(module.priority)}>优先级: {module.priority}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">完成度</span>
                        <span className="text-lg font-bold text-blue-600">{module.completeness}%</span>
                      </div>
                      <Progress value={module.completeness} className="h-3" />
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">主要功能状态:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {module.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            {getFeatureStatusIcon(feature.status)}
                            <span className="truncate">{feature.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-xs text-slate-500">{module.components.length} 个组件</span>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="w-3 h-3 mr-1" />
                        查看详情
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          {selectedModule ? (
            (() => {
              const module = modules.find((m) => m.id === selectedModule)!
              return (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">{module.name} - 详细分析</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* 功能完成度详情 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">功能完成度详情</h3>
                      <div className="space-y-3">
                        {module.features.map((feature, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                {getFeatureStatusIcon(feature.status)}
                                <span className="font-medium">{feature.name}</span>
                              </div>
                              <span className="font-bold text-blue-600">{feature.completeness}%</span>
                            </div>
                            <Progress value={feature.completeness} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 技术债务 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">技术债务</h3>
                      <div className="space-y-2">
                        {module.technicalDebt.map((debt, index) => (
                          <Alert key={index}>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>{debt}</AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </div>

                    {/* 组件列表 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">相关组件</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {module.components.map((component, index) => (
                          <Badge key={index} variant="outline" className="justify-start">
                            <FileText className="w-3 h-3 mr-1" />
                            {component}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })()
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">选择模块查看详情</h3>
                <p className="text-slate-500">点击左侧模块概览中的任意模块查看详细分析</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                系统改进建议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 总体建议 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">总体改进建议</h3>
                  <div className="space-y-3">
                    {report.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                        <span className="text-blue-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 优先级建议 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">优先级改进计划</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-medium text-red-700">高优先级 (立即执行)</h4>
                      <ul className="text-sm text-red-600 mt-2 space-y-1">
                        <li>• 完善财务管理系统的预算管理和成本分析功能</li>
                        <li>• 增强安全系统的多因子认证和威胁检测</li>
                        <li>• 优化沟通系统的视频通话和文件传输功能</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-medium text-yellow-700">中优先级 (近期完成)</h4>
                      <ul className="text-sm text-yellow-600 mt-2 space-y-1">
                        <li>• 完善第三方系统集成和API管理</li>
                        <li>• 增强数据分析系统的预测分析能力</li>
                        <li>• 优化移动端性能和用户体验</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium text-green-700">低优先级 (长期规划)</h4>
                      <ul className="text-sm text-green-600 mt-2 space-y-1">
                        <li>• 完善国际化系统的RTL语言支持</li>
                        <li>• 增强性能监控系统的自动优化功能</li>
                        <li>• 扩展任务管理系统的甘特图功能</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 技术改进建议 */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">技术架构改进</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                        性能优化
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• 实现组件懒加载</li>
                        <li>• 优化数据库查询</li>
                        <li>• 添加缓存机制</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-blue-500" />
                        安全增强
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• 实现零信任架构</li>
                        <li>• 加强数据加密</li>
                        <li>• 完善审计日志</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-green-500" />
                        用户体验
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• 优化交互流程</li>
                        <li>• 增强无障碍访问</li>
                        <li>• 完善错误处理</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Database className="w-4 h-4 mr-2 text-purple-500" />
                        数据管理
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• 优化数据结构</li>
                        <li>• 实现数据备份</li>
                        <li>• 增强数据分析</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 总结报告 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Award className="w-6 h-6 mr-2 text-purple-600" />
            系统评估总结
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-700">系统优势</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>核心业务模块完成度高，功能齐全</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>审批流程系统成熟，工作流引擎完善</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>安全权限系统完备，访问控制严格</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>移动端适配良好，响应式设计完善</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-orange-700">待改进领域</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                  <span>第三方集成功能需要进一步完善</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                  <span>财务管理系统功能相对薄弱</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                  <span>AI分析功能有待深化和优化</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                  <span>性能监控系统需要增强分析能力</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/60 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-700">总体评价</h3>
            <p className="text-sm text-blue-800">
              该企业管理系统已具备完整的核心功能架构，整体完成度达到 <strong>{overallCompleteness}%</strong>，
              在任务管理、客户管理、审批流程等核心业务领域表现优秀。建议重点完善财务管理、
              第三方集成和AI分析功能，进一步提升系统的完整性和竞争力。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
