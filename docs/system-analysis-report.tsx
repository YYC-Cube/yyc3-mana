"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Settings,
  BarChart3,
  FileText,
  Code,
  Database,
  Smartphone,
  Activity,
} from "lucide-react"

export function SystemAnalysisReport() {
  // 功能模块评估数据
  const moduleAnalysis = [
    {
      name: "仪表盘模块",
      completeness: 95,
      status: "excellent",
      features: ["数据概览", "实时统计", "快速操作", "系统状态"],
      issues: ["缺少自定义仪表盘功能"],
      priority: "low",
    },
    {
      name: "客户管理",
      completeness: 90,
      status: "good",
      features: ["客户列表", "客户分析", "跟进记录", "销售机会"],
      issues: ["缺少客户导入/导出", "高级筛选功能待完善"],
      priority: "medium",
    },
    {
      name: "任务管理",
      completeness: 88,
      status: "good",
      features: ["任务创建", "进度跟踪", "团队协作", "甘特图"],
      issues: ["缺少任务模板", "时间追踪功能"],
      priority: "medium",
    },
    {
      name: "财务管理",
      completeness: 85,
      status: "good",
      features: ["收支统计", "财务报表", "预算管理", "成本分析"],
      issues: ["缺少发票管理", "税务计算功能"],
      priority: "high",
    },
    {
      name: "OKR管理",
      completeness: 82,
      status: "good",
      features: ["目标设定", "进度跟踪", "团队OKR", "评估回顾"],
      issues: ["缺少OKR模板", "自动提醒功能"],
      priority: "medium",
    },
    {
      name: "审批中心",
      completeness: 80,
      status: "fair",
      features: ["审批流程", "状态跟踪", "批量处理", "流程设计"],
      issues: ["缺少电子签名", "移动端审批体验"],
      priority: "high",
    },
    {
      name: "沟通中心",
      completeness: 75,
      status: "fair",
      features: ["消息中心", "群组管理", "会议安排", "通知系统"],
      issues: ["缺少视频会议集成", "文件共享功能"],
      priority: "high",
    },
    {
      name: "KPI跟踪",
      completeness: 78,
      status: "fair",
      features: ["指标设定", "数据收集", "趋势分析", "报告生成"],
      issues: ["缺少自动化数据采集", "预警机制"],
      priority: "medium",
    },
    {
      name: "数据分析",
      completeness: 70,
      status: "needs-improvement",
      features: ["基础报表", "数据可视化", "趋势分析", "导出功能"],
      issues: ["缺少高级分析功能", "实时数据处理", "AI洞察"],
      priority: "high",
    },
  ]

  // 技术架构评估
  const architectureAnalysis = {
    frontend: {
      score: 88,
      strengths: ["React 18", "TypeScript", "Tailwind CSS", "响应式设计", "组件化架构"],
      weaknesses: ["缺少状态管理库", "组件测试覆盖不足"],
      recommendations: ["集成Redux/Zustand", "增加单元测试"],
    },
    backend: {
      score: 75,
      strengths: ["RESTful API设计", "错误处理机制", "性能监控"],
      weaknesses: ["缺少真实后端实现", "数据库设计待完善", "API文档不足"],
      recommendations: ["实现Node.js/Python后端", "完善数据库设计", "API文档化"],
    },
    database: {
      score: 65,
      strengths: ["本地存储支持", "离线功能", "数据同步机制"],
      weaknesses: ["缺少真实数据库", "数据关系设计", "备份恢复机制"],
      recommendations: ["集成PostgreSQL/MongoDB", "设计数据模型", "实现备份策略"],
    },
    security: {
      score: 70,
      strengths: ["基础认证框架", "错误日志记录", "输入验证"],
      weaknesses: ["缺少JWT认证", "权限控制系统", "数据加密"],
      recommendations: ["实现完整认证系统", "角色权限管理", "数据加密传输"],
    },
  }

  // 用户体验评估
  const uxAnalysis = {
    design: {
      score: 92,
      highlights: ["现代化UI设计", "一致的视觉风格", "直观的导航结构", "响应式布局"],
      improvements: ["深色模式支持", "个性化设置", "无障碍功能优化"],
    },
    usability: {
      score: 85,
      highlights: ["简洁的操作流程", "清晰的信息层次", "友好的错误提示"],
      improvements: ["快捷键支持", "批量操作优化", "搜索功能增强"],
    },
    performance: {
      score: 80,
      highlights: ["快速页面加载", "流畅的动画效果", "离线功能支持"],
      improvements: ["代码分割优化", "图片懒加载", "缓存策略优化"],
    },
  }

  // 系统稳定性评估
  const stabilityAnalysis = {
    errorHandling: {
      score: 88,
      features: ["全局错误捕获", "用户友好错误提示", "错误日志记录", "自动重试机制"],
      coverage: "85%",
    },
    monitoring: {
      score: 82,
      features: ["性能监控", "错误追踪", "用户行为分析", "系统健康检查"],
      coverage: "78%",
    },
    testing: {
      score: 45,
      features: ["自动化测试框架", "测试用例设计"],
      coverage: "30%",
      gaps: ["单元测试", "集成测试", "端到端测试", "性能测试"],
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-50 border-green-200"
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "fair":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "needs-improvement":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "good":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      case "fair":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "needs-improvement":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
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

  const overallScore = Math.round(
    (moduleAnalysis.reduce((sum, module) => sum + module.completeness, 0) / moduleAnalysis.length +
      (architectureAnalysis.frontend.score +
        architectureAnalysis.backend.score +
        architectureAnalysis.database.score +
        architectureAnalysis.security.score) /
        4 +
      (uxAnalysis.design.score + uxAnalysis.usability.score + uxAnalysis.performance.score) / 3 +
      (stabilityAnalysis.errorHandling.score + stabilityAnalysis.monitoring.score + stabilityAnalysis.testing.score) /
        3) /
      4,
  )

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 报告标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">言语云企业管理系统</h1>
        <h2 className="text-xl text-gray-600 mb-4">全局功能完整度分析报告</h2>
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{overallScore}%</div>
            <div className="text-sm text-gray-500">综合完成度</div>
          </div>
          <div className="w-32">
            <Progress value={overallScore} className="h-3" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="modules">功能模块</TabsTrigger>
          <TabsTrigger value="architecture">技术架构</TabsTrigger>
          <TabsTrigger value="ux">用户体验</TabsTrigger>
          <TabsTrigger value="stability">系统稳定性</TabsTrigger>
          <TabsTrigger value="recommendations">改进建议</TabsTrigger>
        </TabsList>

        {/* 功能模块分析 */}
        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>业务功能模块完整度分析</span>
              </CardTitle>
              <CardDescription>评估各业务模块的功能完整性、用户体验和技术实现质量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {moduleAnalysis.map((module, index) => (
                  <Card key={index} className={`border ${getStatusColor(module.status)}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{module.name}</CardTitle>
                        {getStatusIcon(module.status)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={module.completeness} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{module.completeness}%</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-green-700 mb-1">已实现功能</h4>
                        <div className="flex flex-wrap gap-1">
                          {module.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-red-700 mb-1">待完善功能</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {module.issues.map((issue, idx) => (
                            <li key={idx} className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(module.priority)}`}></div>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 技术架构分析 */}
        <TabsContent value="architecture" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(architectureAnalysis).map(([key, analysis]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {key === "frontend" && <Code className="w-5 h-5" />}
                    {key === "backend" && <Settings className="w-5 h-5" />}
                    {key === "database" && <Database className="w-5 h-5" />}
                    {key === "security" && <Shield className="w-5 h-5" />}
                    <span>
                      {key === "frontend"
                        ? "前端架构"
                        : key === "backend"
                          ? "后端架构"
                          : key === "database"
                            ? "数据层"
                            : "安全性"}
                    </span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Progress value={analysis.score} className="flex-1 h-2" />
                    <span className="text-sm font-medium">{analysis.score}%</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2">技术优势</h4>
                    <div className="flex flex-wrap gap-1">
                      {analysis.strengths.map((strength, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-2">待改进项</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {analysis.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3 text-yellow-500" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-blue-700 mb-2">改进建议</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {analysis.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3 text-blue-500" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 用户体验分析 */}
        <TabsContent value="ux" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(uxAnalysis).map(([key, analysis]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {key === "design" && <Smartphone className="w-5 h-5" />}
                    {key === "usability" && <Users className="w-5 h-5" />}
                    {key === "performance" && <Zap className="w-5 h-5" />}
                    <span>{key === "design" ? "界面设计" : key === "usability" ? "易用性" : "性能体验"}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Progress value={analysis.score} className="flex-1 h-2" />
                    <span className="text-sm font-medium">{analysis.score}%</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2">优势亮点</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {analysis.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-blue-700 mb-2">改进空间</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {analysis.improvements.map((improvement, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3 text-blue-500" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 系统稳定性分析 */}
        <TabsContent value="stability" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(stabilityAnalysis).map(([key, analysis]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {key === "errorHandling" && <Shield className="w-5 h-5" />}
                    {key === "monitoring" && <Activity className="w-5 h-5" />}
                    {key === "testing" && <FileText className="w-5 h-5" />}
                    <span>{key === "errorHandling" ? "错误处理" : key === "monitoring" ? "系统监控" : "测试覆盖"}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Progress value={analysis.score} className="flex-1 h-2" />
                    <span className="text-sm font-medium">{analysis.score}%</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2">已实现功能</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {analysis.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {analysis.coverage && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 mb-2">覆盖率</h4>
                      <div className="flex items-center space-x-2">
                        <Progress value={Number.parseInt(analysis.coverage)} className="flex-1 h-2" />
                        <span className="text-xs font-medium">{analysis.coverage}</span>
                      </div>
                    </div>
                  )}

                  {analysis.gaps && (
                    <div>
                      <h4 className="text-sm font-medium text-red-700 mb-2">缺失项</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {analysis.gaps.map((gap, idx) => (
                          <li key={idx} className="flex items-center space-x-1">
                            <XCircle className="w-3 h-3 text-red-500" />
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 改进建议 */}
        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 短期改进建议 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>短期改进建议 (1-3个月)</span>
                </CardTitle>
                <CardDescription>优先级高，影响用户体验的关键功能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">🔥 高优先级</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• 完善财务管理的发票和税务功能</li>
                      <li>• 增强审批中心的移动端体验</li>
                      <li>• 实现数据分析的实时处理能力</li>
                      <li>• 集成视频会议功能到沟通中心</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">⚡ 中优先级</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• 增加客户数据导入导出功能</li>
                      <li>• 完善任务管理的时间追踪</li>
                      <li>• 实现OKR自动提醒机制</li>
                      <li>• 优化KPI数据采集自动化</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 中长期改进建议 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span>中长期改进建议 (3-12个月)</span>
                </CardTitle>
                <CardDescription>技术架构和系统能力的全面提升</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">🏗️ 技术架构</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 实现完整的后端API服务</li>
                      <li>• 集成企业级数据库解决方案</li>
                      <li>• 建立完善的认证和权限系统</li>
                      <li>• 实现微服务架构拆分</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">🚀 功能增强</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 集成AI智能分析和预测</li>
                      <li>• 实现高级数据可视化</li>
                      <li>• 支持第三方系统集成</li>
                      <li>• 开发移动端原生应用</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">🔧 质量保障</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• 建立完整的测试体系</li>
                      <li>• 实现CI/CD自动化部署</li>
                      <li>• 完善监控和告警系统</li>
                      <li>• 建立灾备和恢复机制</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 总结和下一步行动 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-500" />
                <span>总结与行动计划</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">优势</div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 现代化技术栈</li>
                    <li>• 完整的业务模块</li>
                    <li>• 优秀的用户体验</li>
                    <li>• 良好的扩展性</li>
                  </ul>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">挑战</div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 后端服务缺失</li>
                    <li>• 测试覆盖不足</li>
                    <li>• 部分功能待完善</li>
                    <li>• 安全机制需加强</li>
                  </ul>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">机会</div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• AI功能集成</li>
                    <li>• 移动端拓展</li>
                    <li>• 第三方集成</li>
                    <li>• 企业级部署</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
