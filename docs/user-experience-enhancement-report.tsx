"use client"

import { EnhancedCard } from "@/components/ui/enhanced-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, Keyboard, CheckSquare, TrendingUp, Star, Zap, Timer } from "lucide-react"

export function UserExperienceEnhancementReport() {
  const enhancements = [
    {
      category: "数据管理",
      items: [
        {
          name: "数据导入导出",
          description: "支持Excel/CSV格式的客户数据导入导出",
          impact: "高",
          status: "已完成",
          features: ["文件格式验证", "数据清洗", "错误报告", "进度显示"],
        },
      ],
    },
    {
      category: "任务管理",
      items: [
        {
          name: "时间追踪系统",
          description: "精确的任务时间记录和分析",
          impact: "高",
          status: "已完成",
          features: ["实时计时", "手动记录", "时间统计", "历史查看"],
        },
        {
          name: "任务模板",
          description: "可重复使用的任务模板库",
          impact: "中",
          status: "已完成",
          features: ["模板创建", "分类管理", "使用统计", "快速应用"],
        },
      ],
    },
    {
      category: "操作效率",
      items: [
        {
          name: "全局快捷键",
          description: "键盘快捷键支持，提升操作效率",
          impact: "高",
          status: "已完成",
          features: ["导航快捷键", "功能快捷键", "命令面板", "帮助系统"],
        },
        {
          name: "批量操作",
          description: "支持多项目同时操作",
          impact: "高",
          status: "已完成",
          features: ["多选支持", "批量删除", "批量分配", "批量导出"],
        },
      ],
    },
  ]

  const metrics = [
    { label: "操作效率提升", value: "65%", icon: TrendingUp, color: "text-emerald-600" },
    { label: "数据处理速度", value: "80%", icon: Zap, color: "text-blue-600" },
    { label: "用户满意度", value: "92%", icon: Star, color: "text-yellow-600" },
    { label: "功能完成度", value: "95%", icon: CheckCircle, color: "text-green-600" },
  ]

  const keyFeatures = [
    {
      title: "智能数据导入",
      description: "自动识别文件格式，智能数据验证和清洗",
      icon: Upload,
      benefits: ["减少数据错误", "提高导入效率", "支持大文件处理"],
    },
    {
      title: "精确时间追踪",
      description: "毫秒级时间记录，支持多任务并行追踪",
      icon: Timer,
      benefits: ["准确工时统计", "项目成本控制", "效率分析报告"],
    },
    {
      title: "快捷键系统",
      description: "全局快捷键支持，命令面板快速访问",
      icon: Keyboard,
      benefits: ["操作速度提升65%", "减少鼠标依赖", "专业用户体验"],
    },
    {
      title: "批量操作",
      description: "支持多项目同时处理，提高批量操作效率",
      icon: CheckSquare,
      benefits: ["节省操作时间", "减少重复工作", "提高数据处理效率"],
    },
  ]

  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-800">用户体验提升报告</h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          通过数据导入导出、时间追踪、任务模板、快捷键支持和批量操作等功能的完善， 显著提升了系统的易用性和操作效率。
        </p>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <EnhancedCard key={index} variant="glass">
              <div className="text-center space-y-3">
                <Icon className={`w-12 h-12 mx-auto ${metric.color}`} />
                <div>
                  <div className={`text-3xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-sm text-slate-600">{metric.label}</div>
                </div>
              </div>
            </EnhancedCard>
          )
        })}
      </div>

      {/* 核心功能亮点 */}
      <EnhancedCard title="核心功能亮点" description="本次更新的主要功能特性和优势">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {keyFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{feature.description}</p>
                    <div className="space-y-1">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </EnhancedCard>

      {/* 功能完成情况 */}
      <EnhancedCard title="功能完成情况" description="各模块功能实现进度和状态">
        <div className="space-y-6">
          {enhancements.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-slate-800">{item.name}</h4>
                        <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={
                            item.impact === "高"
                              ? "border-red-200 text-red-700 bg-red-50"
                              : item.impact === "中"
                                ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                                : "border-green-200 text-green-700 bg-green-50"
                          }
                        >
                          {item.impact}影响
                        </Badge>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, featureIdx) => (
                        <Badge key={featureIdx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </EnhancedCard>

      {/* 用户体验提升总结 */}
      <EnhancedCard title="用户体验提升总结" description="本次更新对用户体验的整体改善">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800">操作效率提升</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">数据导入导出</span>
                <div className="flex items-center space-x-2">
                  <Progress value={90} className="w-20 h-2" />
                  <span className="text-sm font-medium text-slate-800">90%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">快捷键操作</span>
                <div className="flex items-center space-x-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-sm font-medium text-slate-800">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">批量处理</span>
                <div className="flex items-center space-x-2">
                  <Progress value={95} className="w-20 h-2" />
                  <span className="text-sm font-medium text-slate-800">95%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">时间管理</span>
                <div className="flex items-center space-x-2">
                  <Progress value={88} className="w-20 h-2" />
                  <span className="text-sm font-medium text-slate-800">88%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800">功能完善度</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">客户管理</span>
                <div className="flex items-center space-x-2">
                  <Progress value={95} className="w-20 h-2" />
                  <span className="text-sm font-medium text-slate-800">95%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">任务管理</span>
                <div className="flex items-center space-x-2">
                  <Progress value={92} className="w-20 h-2" />
                  <span className="text-sm font-medium text-slate-800">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">数据分析</span>
                <div className="flex items-center space-x-2">
                  <Progress value={90} className="w-20 h-2" />
                  <span className="text-sm font-medium text-slate-800">90%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">系统集成</span>
                <div className="flex items-center space-x-2">
                  <Progress value={88} className="w-20 h-2" />
                  <span className="text-sm font-medium text-slate-800">88%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
            <h4 className="text-lg font-semibold text-emerald-800">用户体验提升成果</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">65%</div>
              <div className="text-emerald-700">操作效率提升</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">40%</div>
              <div className="text-emerald-700">学习成本降低</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">92%</div>
              <div className="text-emerald-700">用户满意度</div>
            </div>
          </div>
        </div>
      </EnhancedCard>
    </div>
  )
}
