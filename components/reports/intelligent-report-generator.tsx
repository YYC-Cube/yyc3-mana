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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  FileText,
  BarChart3,
  TrendingUp,
  Calendar,
  Download,
  Share2,
  Eye,
  Edit,
  Copy,
  Trash2,
  Plus,
  Filter,
  Search,
  Target,
  Zap,
  Sparkles,
  Play,
} from "lucide-react"

interface ReportTemplate {
  id: string
  name: string
  description: string
  category: string
  type: "dashboard" | "table" | "chart" | "document"
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom"
  dataSource: string[]
  metrics: string[]
  filters: ReportFilter[]
  isActive: boolean
  lastGenerated?: Date
  createdBy: string
  usage: number
}

interface ReportFilter {
  field: string
  operator: string
  value: any
  label: string
}

interface GeneratedReport {
  id: string
  templateId: string
  name: string
  generatedAt: Date
  format: "pdf" | "excel" | "csv" | "html"
  size: string
  status: "generating" | "completed" | "failed"
  downloadUrl?: string
}

export function IntelligentReportGenerator() {
  const [templates, setTemplates] = useState<ReportTemplate[]>([
    {
      id: "template_1",
      name: "销售业绩月报",
      description: "月度销售数据汇总和分析报告",
      category: "销售",
      type: "dashboard",
      frequency: "monthly",
      dataSource: ["customers", "orders", "revenue"],
      metrics: ["总销售额", "新客户数", "转化率", "客单价"],
      filters: [
        { field: "date", operator: "between", value: ["2024-01-01", "2024-01-31"], label: "时间范围" },
        { field: "status", operator: "equals", value: "completed", label: "订单状态" },
      ],
      isActive: true,
      lastGenerated: new Date("2024-01-20"),
      createdBy: "张经理",
      usage: 45,
    },
    {
      id: "template_2",
      name: "客户分析报告",
      description: "客户行为和满意度分析",
      category: "客户",
      type: "document",
      frequency: "weekly",
      dataSource: ["customers", "feedback", "interactions"],
      metrics: ["活跃客户数", "满意度评分", "流失率", "生命周期价值"],
      filters: [
        { field: "customerType", operator: "in", value: ["premium", "standard"], label: "客户类型" },
        { field: "region", operator: "equals", value: "华东", label: "地区" },
      ],
      isActive: true,
      lastGenerated: new Date("2024-01-18"),
      createdBy: "李分析师",
      usage: 32,
    },
    {
      id: "template_3",
      name: "任务完成统计",
      description: "团队任务执行情况统计",
      category: "项目",
      type: "chart",
      frequency: "daily",
      dataSource: ["tasks", "users", "projects"],
      metrics: ["完成任务数", "平均完成时间", "逾期率", "团队效率"],
      filters: [
        { field: "priority", operator: "in", value: ["high", "medium"], label: "优先级" },
        { field: "assignee", operator: "not_null", value: null, label: "已分配" },
      ],
      isActive: false,
      lastGenerated: new Date("2024-01-19"),
      createdBy: "王项目经理",
      usage: 28,
    },
  ])

  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>([
    {
      id: "report_1",
      templateId: "template_1",
      name: "销售业绩月报_2024年1月",
      generatedAt: new Date("2024-01-20 10:30:00"),
      format: "pdf",
      size: "2.3 MB",
      status: "completed",
      downloadUrl: "/reports/sales_202401.pdf",
    },
    {
      id: "report_2",
      templateId: "template_2",
      name: "客户分析报告_第3周",
      generatedAt: new Date("2024-01-18 14:15:00"),
      format: "excel",
      size: "1.8 MB",
      status: "completed",
      downloadUrl: "/reports/customer_analysis_w3.xlsx",
    },
    {
      id: "report_3",
      templateId: "template_3",
      name: "任务完成统计_2024-01-19",
      generatedAt: new Date("2024-01-19 09:00:00"),
      format: "html",
      size: "856 KB",
      status: "generating",
    },
  ])

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
    type: "dashboard" as ReportTemplate["type"],
    frequency: "monthly" as ReportTemplate["frequency"],
    dataSource: [] as string[],
    metrics: [] as string[],
  })

  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 报告使用统计
  const reportUsageData = [
    { month: "10月", generated: 45, downloaded: 38 },
    { month: "11月", generated: 52, downloaded: 47 },
    { month: "12月", generated: 48, downloaded: 42 },
    { month: "1月", generated: 61, downloaded: 55 },
  ]

  // 报告类型分布
  const reportTypeData = [
    { type: "仪表板", count: 12, color: "#3b82f6" },
    { type: "图表", count: 8, color: "#10b981" },
    { type: "文档", count: 6, color: "#f59e0b" },
    { type: "表格", count: 4, color: "#8b5cf6" },
  ]

  // 数据源使用频率
  const dataSourceUsage = [
    { source: "客户数据", usage: 85, reports: 15 },
    { source: "销售数据", usage: 78, reports: 12 },
    { source: "任务数据", usage: 65, reports: 10 },
    { source: "财务数据", usage: 52, reports: 8 },
    { source: "用户数据", usage: 45, reports: 6 },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dashboard":
        return <BarChart3 className="w-4 h-4" />
      case "chart":
        return <TrendingUp className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      case "table":
        return <Target className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      dashboard: "仪表板",
      chart: "图表",
      document: "文档",
      table: "表格",
    }
    return labels[type as keyof typeof labels] || type
  }

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      daily: "每日",
      weekly: "每周",
      monthly: "每月",
      quarterly: "每季度",
      yearly: "每年",
      custom: "自定义",
    }
    return labels[frequency as keyof typeof labels] || frequency
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const generateReport = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    const newReport: GeneratedReport = {
      id: `report_${Date.now()}`,
      templateId,
      name: `${template.name}_${new Date().toLocaleDateString("zh-CN")}`,
      generatedAt: new Date(),
      format: "pdf",
      size: "生成中...",
      status: "generating",
    }

    setGeneratedReports((prev) => [newReport, ...prev])

    // 模拟报告生成过程
    setTimeout(() => {
      setGeneratedReports((prev) =>
        prev.map((report) =>
          report.id === newReport.id
            ? {
                ...report,
                status: "completed",
                size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
                downloadUrl: `/reports/${template.name.toLowerCase()}_${Date.now()}.pdf`,
              }
            : report,
        ),
      )
    }, 3000)
  }

  const createTemplate = () => {
    const template: ReportTemplate = {
      id: `template_${Date.now()}`,
      ...newTemplate,
      filters: [],
      isActive: true,
      createdBy: "当前用户",
      usage: 0,
    }

    setTemplates((prev) => [template, ...prev])
    setNewTemplate({
      name: "",
      description: "",
      category: "",
      type: "dashboard",
      frequency: "monthly",
      dataSource: [],
      metrics: [],
    })
    setShowTemplateDialog(false)
  }

  const toggleTemplate = (templateId: string) => {
    setTemplates((prev) =>
      prev.map((template) => (template.id === templateId ? { ...template, isActive: !template.isActive } : template)),
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <FileText className="w-8 h-8 mr-3 text-blue-600" />
            智能报表生成器
          </h1>
          <p className="text-muted-foreground">自动化生成各类业务报表和分析报告</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            批量下载
          </Button>
          <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                创建模板
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建报表模板</DialogTitle>
                <DialogDescription>设���自定义报表模板，实现自动化报表生成</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>模板名称</Label>
                    <Input
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      placeholder="输入模板名称"
                    />
                  </div>
                  <div>
                    <Label>报表类别</Label>
                    <Input
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                      placeholder="如：销售、客户、财务"
                    />
                  </div>
                </div>
                <div>
                  <Label>模板描述</Label>
                  <Textarea
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="描述报表的用途和内容"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>报表类型</Label>
                    <Select
                      value={newTemplate.type}
                      onValueChange={(value) =>
                        setNewTemplate({ ...newTemplate, type: value as ReportTemplate["type"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">仪表板</SelectItem>
                        <SelectItem value="chart">图表</SelectItem>
                        <SelectItem value="document">文档</SelectItem>
                        <SelectItem value="table">表格</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>生成频率</Label>
                    <Select
                      value={newTemplate.frequency}
                      onValueChange={(value) =>
                        setNewTemplate({ ...newTemplate, frequency: value as ReportTemplate["frequency"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">每日</SelectItem>
                        <SelectItem value="weekly">每周</SelectItem>
                        <SelectItem value="monthly">每月</SelectItem>
                        <SelectItem value="quarterly">每季度</SelectItem>
                        <SelectItem value="yearly">每年</SelectItem>
                        <SelectItem value="custom">自定义</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>数据源</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["客户数据", "销售数据", "任务数据", "财务数据", "用户数据", "产品数据"].map((source) => (
                      <label key={source} className="flex items-center space-x-2">
                        <Checkbox
                          checked={newTemplate.dataSource.includes(source)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewTemplate({
                                ...newTemplate,
                                dataSource: [...newTemplate.dataSource, source],
                              })
                            } else {
                              setNewTemplate({
                                ...newTemplate,
                                dataSource: newTemplate.dataSource.filter((s) => s !== source),
                              })
                            }
                          }}
                        />
                        <span className="text-sm">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                    取消
                  </Button>
                  <Button onClick={createTemplate} disabled={!newTemplate.name || !newTemplate.description}>
                    创建模板
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{templates.length}</p>
            <p className="text-sm text-gray-600">报表模板</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{templates.filter((t) => t.isActive).length}</p>
            <p className="text-sm text-gray-600">活跃模板</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{generatedReports.length}</p>
            <p className="text-sm text-gray-600">生成报表</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{generatedReports.filter((r) => r.status === "completed").length}</p>
            <p className="text-sm text-gray-600">已完成</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">报表模板</TabsTrigger>
          <TabsTrigger value="reports">生成记录</TabsTrigger>
          <TabsTrigger value="analytics">使用分析</TabsTrigger>
          <TabsTrigger value="settings">系统设置</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* 搜索和筛选 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="搜索模板..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类别</SelectItem>
                      <SelectItem value="销售">销售</SelectItem>
                      <SelectItem value="客户">客户</SelectItem>
                      <SelectItem value="项目">项目</SelectItem>
                      <SelectItem value="财务">财务</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 模板列表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`hover:shadow-lg transition-shadow ${
                  template.isActive ? "border-green-200 bg-green-50" : "border-gray-200"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        {getTypeIcon(template.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={template.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      >
                        {template.isActive ? "活跃" : "暂停"}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">报表类型</p>
                      <p className="font-medium">{getTypeLabel(template.type)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">生成频率</p>
                      <p className="font-medium">{getFrequencyLabel(template.frequency)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">使用次数</p>
                      <p className="font-medium">{template.usage}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">最后生成</p>
                      <p className="font-medium">{template.lastGenerated?.toLocaleDateString("zh-CN") || "未生成"}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">数据源</p>
                    <div className="flex flex-wrap gap-1">
                      {template.dataSource.map((source, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">关键指标</p>
                    <div className="flex flex-wrap gap-1">
                      {template.metrics.map((metric, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => generateReport(template.id)} disabled={!template.isActive}>
                        <Sparkles className="w-4 h-4 mr-1" />
                        生成报表
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        预览
                      </Button>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" onClick={() => toggleTemplate(template.id)}>
                        {template.isActive ? <Trash2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="space-y-4">
            {generatedReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {report.generatedAt.toLocaleString("zh-CN")}
                          </span>
                          <span>{report.format.toUpperCase()}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status === "completed" ? "已完成" : report.status === "generating" ? "生成中" : "失败"}
                      </Badge>
                      <div className="flex space-x-2">
                        {report.status === "completed" && (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              预览
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              下载
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4 mr-1" />
                              分享
                            </Button>
                          </>
                        )}
                        {report.status === "generating" && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm text-gray-600">生成中...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>报表生成趋势</CardTitle>
                <CardDescription>每月报表生成和下载统计</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    generated: {
                      label: "生成数量",
                      color: "hsl(var(--chart-1))",
                    },
                    downloaded: {
                      label: "下载数量",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={reportUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="generated" stroke="var(--color-generated)" strokeWidth={2} />
                      <Line type="monotone" dataKey="downloaded" stroke="var(--color-downloaded)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>报表类型分布</CardTitle>
                <CardDescription>各类型报表的使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "数量",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reportTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                      >
                        {reportTypeData.map((entry, index) => (
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
              <CardTitle>数据源使用分析</CardTitle>
              <CardDescription>各数据源的使用频率和报表数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSourceUsage.map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{source.source}</span>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>使用率: {source.usage}%</span>
                        <span>报表数: {source.reports}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${source.usage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>报表生成设置</CardTitle>
              <CardDescription>配置自动化报表生成参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">生成设置</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">自动生成报表</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">生成失败重试</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">生成完成通知</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">存储设置</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm">报表保存天数</Label>
                      <Input type="number" defaultValue="30" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">最大文件大小(MB)</Label>
                      <Input type="number" defaultValue="50" className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">导出格式</h4>
                <div className="grid grid-cols-4 gap-4">
                  {["PDF", "Excel", "CSV", "HTML"].map((format) => (
                    <label key={format} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">性能优化</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">并发生成数量</span>
                    <Input type="number" defaultValue="3" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">缓存生成结果</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">压缩大文件</span>
                    <input type="checkbox" defaultChecked className="rounded" />
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
