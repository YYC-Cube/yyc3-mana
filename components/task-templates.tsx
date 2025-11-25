"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileIcon as FileTemplate,
  Plus,
  Copy,
  Edit,
  Trash2,
  Star,
  Clock,
  Tag,
  CheckSquare,
  Briefcase,
  Code,
  Megaphone,
  PieChart,
} from "lucide-react"

interface TaskTemplate {
  id: string
  name: string
  description: string
  category: string
  priority: "低" | "中" | "高"
  estimatedHours: number
  tags: string[]
  subtasks: string[]
  assigneeRole?: string
  isStarred: boolean
  usageCount: number
  createdAt: Date
}

interface TaskTemplatesProps {
  onUseTemplate?: (template: TaskTemplate) => void
}

export function TaskTemplates({ onUseTemplate }: TaskTemplatesProps) {
  const [templates, setTemplates] = useState<TaskTemplate[]>([
    {
      id: "1",
      name: "客户需求调研",
      description: "对潜在客户进行深入的需求调研和分析",
      category: "销售",
      priority: "高",
      estimatedHours: 8,
      tags: ["客户", "调研", "销售"],
      subtasks: ["准备调研问卷", "联系客户安排时间", "进行需求访谈", "整理调研结果", "撰写调研报告"],
      assigneeRole: "销售专员",
      isStarred: true,
      usageCount: 15,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "产品功能开发",
      description: "开发新的产品功能模块",
      category: "开发",
      priority: "高",
      estimatedHours: 40,
      tags: ["开发", "功能", "编码"],
      subtasks: ["需求分析和设计", "技术方案评审", "编码实现", "单元测试", "集成测试", "代码审查", "部署上线"],
      assigneeRole: "开发工程师",
      isStarred: true,
      usageCount: 23,
      createdAt: new Date("2024-01-10"),
    },
    {
      id: "3",
      name: "市场推广活动",
      description: "策划和执行市场推广活动",
      category: "市场",
      priority: "中",
      estimatedHours: 16,
      tags: ["市场", "推广", "活动"],
      subtasks: ["制定活动方案", "预算申请和审批", "物料设计和制作", "渠道合作洽谈", "活动执行", "效果评估和总结"],
      assigneeRole: "市场专员",
      isStarred: false,
      usageCount: 8,
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "4",
      name: "财务月度报表",
      description: "编制月度财务报表和分析",
      category: "财务",
      priority: "高",
      estimatedHours: 12,
      tags: ["财务", "报表", "分析"],
      subtasks: [
        "收集财务数据",
        "核对账目明细",
        "编制资产负债表",
        "编制利润表",
        "编制现金流量表",
        "财务分析报告",
        "报表审核和提交",
      ],
      assigneeRole: "财务专员",
      isStarred: true,
      usageCount: 12,
      createdAt: new Date("2024-01-05"),
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<TaskTemplate | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { value: "all", label: "全部分类", icon: FileTemplate },
    { value: "销售", label: "销售", icon: Briefcase },
    { value: "开发", label: "开发", icon: Code },
    { value: "市场", label: "市场", icon: Megaphone },
    { value: "财务", label: "财务", icon: PieChart },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleStar = (templateId: string) => {
    setTemplates((prev) =>
      prev.map((template) => (template.id === templateId ? { ...template, isStarred: !template.isStarred } : template)),
    )
  }

  const useTemplate = (template: TaskTemplate) => {
    // 增加使用次数
    setTemplates((prev) => prev.map((t) => (t.id === template.id ? { ...t, usageCount: t.usageCount + 1 } : t)))

    onUseTemplate?.(template)
  }

  const deleteTemplate = (templateId: string) => {
    setTemplates((prev) => prev.filter((template) => template.id !== templateId))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "border-red-200 text-red-700 bg-red-50"
      case "中":
        return "border-yellow-200 text-yellow-700 bg-yellow-50"
      case "低":
        return "border-green-200 text-green-700 bg-green-50"
      default:
        return "border-slate-200 text-slate-700 bg-slate-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* 头部操作区 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              placeholder="搜索模板..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <EnhancedButton icon={Plus}>创建模板</EnhancedButton>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>创建任务模板</DialogTitle>
              <DialogDescription>创建可重复使用的任务模板，提高工作效率</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">模板名称</label>
                  <Input placeholder="输入模板名称" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">分类</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="销售">销售</SelectItem>
                      <SelectItem value="开发">开发</SelectItem>
                      <SelectItem value="市场">市场</SelectItem>
                      <SelectItem value="财务">财务</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">描述</label>
                <Textarea placeholder="输入模板描述" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">优先级</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="低">低</SelectItem>
                      <SelectItem value="中">中</SelectItem>
                      <SelectItem value="高">高</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">预估工时（小时）</label>
                  <Input type="number" placeholder="8" />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  取消
                </Button>
                <EnhancedButton onClick={() => setShowCreateDialog(false)}>创建模板</EnhancedButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 模板列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <EnhancedCard key={template.id} variant="glass">
            <div className="space-y-4">
              {/* 模板头部 */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-slate-800 text-lg">{template.name}</h3>
                    <Badge variant="outline" className={getPriorityColor(template.priority)}>
                      {template.priority}
                    </Badge>
                    <Badge variant="outline" className="bg-sky-50 text-sky-600 border-sky-200">
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleStar(template.id)}
                  className={template.isStarred ? "text-yellow-500" : "text-slate-400"}
                >
                  <Star className={`w-4 h-4 ${template.isStarred ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* 模板信息 */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-4 h-4 text-sky-500" />
                  <span>{template.estimatedHours}小时</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <CheckSquare className="w-4 h-4 text-sky-500" />
                  <span>{template.subtasks.length}个子任务</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Copy className="w-4 h-4 text-sky-500" />
                  <span>使用{template.usageCount}次</span>
                </div>
              </div>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* 子任务预览 */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700">子任务预览</h4>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {template.subtasks.slice(0, 3).map((subtask, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
                      <span>{subtask}</span>
                    </div>
                  ))}
                  {template.subtasks.length > 3 && (
                    <div className="text-xs text-slate-500 pl-4">还有 {template.subtasks.length - 3} 个子任务...</div>
                  )}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center justify-between pt-4 border-t border-sky-100">
                <div className="text-xs text-slate-500">创建于 {template.createdAt.toLocaleDateString()}</div>
                <div className="flex items-center space-x-2">
                  <EnhancedButton variant="secondary" size="sm" icon={Copy} onClick={() => useTemplate(template)}>
                    使用模板
                  </EnhancedButton>
                  <Button variant="ghost" size="sm" onClick={() => setEditingTemplate(template)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTemplate(template.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </EnhancedCard>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileTemplate className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">暂无匹配的模板</h3>
          <p className="text-slate-500 mb-4">尝试调整搜索条件或创建新的任务模板</p>
          <EnhancedButton icon={Plus} onClick={() => setShowCreateDialog(true)}>
            创建第一个模板
          </EnhancedButton>
        </div>
      )}
    </div>
  )
}
