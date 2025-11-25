"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  Send,
  Eye,
  Edit,
  Plus,
  Search,
  Download,
  Upload,
  ArrowRight,
  MessageCircle,
  History,
  Workflow,
  Settings,
} from "lucide-react"

// 审批状态枚举
const ApprovalStatus = {
  DRAFT: "draft",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
  REVOKED: "revoked",
} as const

// 审批类型配置
const ApprovalTypes = {
  LEAVE: {
    name: "请假申请",
    icon: Calendar,
    color: "bg-blue-500",
    workflow: ["直属主管", "HR审核", "部门总监"],
  },
  EXPENSE: {
    name: "费用报销",
    icon: FileText,
    color: "bg-green-500",
    workflow: ["直属主管", "财务审核"],
  },
  PURCHASE: {
    name: "采购申请",
    icon: Upload,
    color: "bg-purple-500",
    workflow: ["部门主管", "财务审核", "总经理"],
  },
  TRAVEL: {
    name: "出差申请",
    icon: User,
    color: "bg-orange-500",
    workflow: ["直属主管", "行政审核"],
  },
  CONTRACT: {
    name: "合同审批",
    icon: FileText,
    color: "bg-red-500",
    workflow: ["法务审核", "财务审核", "总经理", "董事长"],
  },
  OTHER: {
    name: "其他申请",
    icon: FileText,
    color: "bg-gray-500",
    workflow: ["直属主管"],
  },
}

// 工作流引擎类
class WorkflowEngine {
  static createWorkflow(type, amount = 0) {
    const typeConfig = ApprovalTypes[type]
    if (!typeConfig) return []

    const workflow = [...typeConfig.workflow]

    // 根据金额动态调整工作流
    if (type === "EXPENSE" && amount > 10000) {
      workflow.push("总经理")
    }
    if (type === "PURCHASE" && amount > 50000) {
      workflow.push("董事长")
    }

    return workflow.map((step, index) => ({
      step: index + 1,
      name: step,
      user: this.getApproverByRole(step),
      status: "waiting",
      time: null,
      reason: null,
    }))
  }

  static getApproverByRole(role) {
    const approvers = {
      直属主管: "李经理",
      部门主管: "陈主管",
      部门总监: "王总监",
      HR审核: "HR部门",
      财务审核: "财务部",
      行政审核: "行政部",
      法务审核: "法务部",
      总经理: "总经理",
      董事长: "董事长",
    }
    return approvers[role] || role
  }

  static getNextStep(workflow, currentStep) {
    return workflow.find((step) => step.step === currentStep + 1)
  }

  static canApprove(workflow, currentStep, userId) {
    const step = workflow.find((s) => s.step === currentStep)
    return step && step.status === "pending"
  }

  static processApproval(workflow, currentStep, action, reason = "", userId = "current_user") {
    const updatedWorkflow = [...workflow]
    const stepIndex = currentStep - 1

    if (stepIndex < updatedWorkflow.length) {
      updatedWorkflow[stepIndex] = {
        ...updatedWorkflow[stepIndex],
        status: action,
        time: new Date().toLocaleString("zh-CN"),
        reason: reason || undefined,
        approver: userId,
      }

      // 如果通过，激活下一步
      if (action === "approved" && stepIndex + 1 < updatedWorkflow.length) {
        updatedWorkflow[stepIndex + 1] = {
          ...updatedWorkflow[stepIndex + 1],
          status: "pending",
        }
      }
    }

    return updatedWorkflow
  }

  static calculateProgress(workflow) {
    const completedSteps = workflow.filter((step) => step.status === "approved" || step.status === "rejected").length
    return Math.round((completedSteps / workflow.length) * 100)
  }

  static getFinalStatus(workflow) {
    const hasRejected = workflow.some((step) => step.status === "rejected")
    if (hasRejected) return "rejected"

    const allApproved = workflow.every((step) => step.status === "approved")
    if (allApproved) return "approved"

    const hasPending = workflow.some((step) => step.status === "pending")
    if (hasPending) return "pending"

    return "draft"
  }
}

// 模拟数据
const mockApprovals = [
  {
    id: "APP001",
    title: "年假申请 - 2024年春节假期",
    type: "LEAVE",
    applicant: { name: "张三", avatar: "", department: "技术部", id: "user_001" },
    status: "pending",
    priority: "normal",
    createTime: "2024-01-15 09:30",
    amount: null,
    description: "申请春节期间年假，共7天，用于回家过年。需要提前安排工作交接。",
    attachments: ["请假条.pdf"],
    currentStep: 2,
    totalSteps: 3,
    workflow: [
      {
        step: 1,
        name: "直属主管",
        user: "李经理",
        status: "approved",
        time: "2024-01-15 10:15",
        reason: "同意请假申请",
      },
      { step: 2, name: "HR审核", user: "HR部门", status: "pending", time: null },
      { step: 3, name: "部门总监", user: "王总监", status: "waiting", time: null },
    ],
  },
  {
    id: "APP002",
    title: "办公用品采购申请",
    type: "PURCHASE",
    applicant: { name: "李四", avatar: "", department: "行政部", id: "user_002" },
    status: "approved",
    priority: "high",
    createTime: "2024-01-14 14:20",
    amount: 3500,
    description: "采购办公桌椅、文具用品等，预算3500元。包含：办公桌2张、办公椅4把、文具用品一批。",
    attachments: ["采购清单.xlsx", "报价单.pdf"],
    currentStep: 3,
    totalSteps: 3,
    workflow: [
      {
        step: 1,
        name: "部门主管",
        user: "陈主管",
        status: "approved",
        time: "2024-01-14 15:30",
        reason: "采购需求合理",
      },
      {
        step: 2,
        name: "财务审核",
        user: "财务部",
        status: "approved",
        time: "2024-01-15 09:00",
        reason: "预算充足，同意采购",
      },
      { step: 3, name: "总经理", user: "总经理", status: "approved", time: "2024-01-15 11:20", reason: "批准采购" },
    ],
  },
  {
    id: "APP003",
    title: "差旅费报销申请",
    type: "EXPENSE",
    applicant: { name: "王五", avatar: "", department: "销售部", id: "user_003" },
    status: "rejected",
    priority: "normal",
    createTime: "2024-01-13 16:45",
    amount: 2800,
    description: "北京出差产生的交通费、住宿费等报销。出差时间：2024-01-10至2024-01-12。",
    attachments: ["发票1.jpg", "发票2.jpg"],
    currentStep: 2,
    totalSteps: 2,
    workflow: [
      {
        step: 1,
        name: "直属主管",
        user: "赵经理",
        status: "approved",
        time: "2024-01-14 08:30",
        reason: "出差合理，同意报销",
      },
      {
        step: 2,
        name: "财务审核",
        user: "财务部",
        status: "rejected",
        time: "2024-01-14 14:20",
        reason: "部分发票不符合报销标准，请重新提交",
      },
    ],
  },
]

export function OAApproval() {
  const [approvals, setApprovals] = useState(mockApprovals)
  const [selectedApproval, setSelectedApproval] = useState(null)
  const [activeTab, setActiveTab] = useState("pending")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false)
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false)
  const [signatureRecords, setSignatureRecords] = useState([])
  const [currentSigningApproval, setCurrentSigningApproval] = useState(null)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 获取状态统计
  const getStatusStats = () => {
    return {
      pending: approvals.filter((a) => a.status === "pending").length,
      approved: approvals.filter((a) => a.status === "approved").length,
      rejected: approvals.filter((a) => a.status === "rejected").length,
      draft: approvals.filter((a) => a.status === "draft").length,
    }
  }

  // 过滤审批单
  const filteredApprovals = approvals.filter((approval) => {
    const matchesSearch =
      approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || approval.type === filterType
    const matchesTab = activeTab === "all" || approval.status === activeTab

    return matchesSearch && matchesType && matchesTab
  })

  // 处理审批操作
  const handleApprovalAction = (approvalId, action, reason = "") => {
    setApprovals((prev) =>
      prev.map((approval) => {
        if (approval.id === approvalId) {
          const updatedWorkflow = WorkflowEngine.processApproval(
            approval.workflow,
            approval.currentStep,
            action,
            reason,
          )

          const finalStatus = WorkflowEngine.getFinalStatus(updatedWorkflow)
          const nextStep =
            action === "approved" ? Math.min(approval.currentStep + 1, approval.totalSteps) : approval.currentStep

          return {
            ...approval,
            status: finalStatus,
            currentStep: nextStep,
            workflow: updatedWorkflow,
          }
        }
        return approval
      }),
    )
  }

  // 撤回申请
  const handleRevoke = (approvalId) => {
    setApprovals((prev) =>
      prev.map((approval) => {
        if (approval.id === approvalId && approval.status === "pending") {
          return {
            ...approval,
            status: "revoked",
          }
        }
        return approval
      }),
    )
  }

  const stats = getStatusStats()

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">审批中心</h1>
          <p className="text-gray-600 mt-1">智能工作流程管理和审批处理</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => setIsWorkflowDialogOpen(true)}>
            <Workflow className="w-4 h-4 mr-2" />
            工作流设置
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            导出报表
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                发起申请
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>发起新申请</DialogTitle>
                <DialogDescription>请填写申请信息，系统将自动分配审批流程</DialogDescription>
              </DialogHeader>
              <CreateApprovalForm
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={(newApproval) => {
                  setApprovals((prev) => [...prev, newApproval])
                  setIsCreateDialogOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-yellow-400 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">待审批</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-xs text-gray-500 mt-1">需要处理</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-400 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">已通过</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                <p className="text-xs text-gray-500 mt-1">本月完成</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-400 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">已拒绝</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                <p className="text-xs text-gray-500 mt-1">需要修改</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-400 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">草稿</p>
                <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
                <p className="text-xs text-gray-500 mt-1">待提交</p>
              </div>
              <Edit className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索申请标题或申请人..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="筛选类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                {Object.entries(ApprovalTypes).map(([key, type]) => (
                  <SelectItem key={key} value={key}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 审批列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>审批列表</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="pending">待审批</TabsTrigger>
              <TabsTrigger value="approved">已通过</TabsTrigger>
              <TabsTrigger value="rejected">已拒绝</TabsTrigger>
              <TabsTrigger value="draft">草稿</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredApprovals.map((approval) => (
                  <ApprovalCard
                    key={approval.id}
                    approval={approval}
                    onAction={handleApprovalAction}
                    onView={setSelectedApproval}
                    onRevoke={handleRevoke}
                  />
                ))}

                {filteredApprovals.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">暂无相关审批记录</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      发起新申请
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 审批详情弹窗 */}
      {selectedApproval && (
        <ApprovalDetailDialog
          approval={selectedApproval}
          onClose={() => setSelectedApproval(null)}
          onAction={handleApprovalAction}
          onRevoke={handleRevoke}
        />
      )}

      {/* 工作流设置弹窗 */}
      {isWorkflowDialogOpen && <WorkflowSettingsDialog onClose={() => setIsWorkflowDialogOpen(false)} />}
    </div>
  )
}

// 审批卡片组件
function ApprovalCard({ approval, onAction, onView, onRevoke }) {
  const ApprovalTypeConfig = ApprovalTypes[approval.type]
  const TypeIcon = ApprovalTypeConfig.icon
  const progress = WorkflowEngine.calculateProgress(approval.workflow)

  return (
    <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-sky-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* 类型图标 */}
            <div
              className={`w-12 h-12 rounded-lg ${ApprovalTypeConfig.color} flex items-center justify-center shadow-sm`}
            >
              <TypeIcon className="w-6 h-6 text-white" />
            </div>

            {/* 申请信息 */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{approval.title}</h3>
                <Badge className={`${getStatusColor(approval.status)} border`}>
                  {getStatusIcon(approval.status)}
                  <span className="ml-1">
                    {approval.status === "pending"
                      ? "待审批"
                      : approval.status === "approved"
                        ? "已通过"
                        : approval.status === "rejected"
                          ? "已拒绝"
                          : approval.status === "revoked"
                            ? "已撤回"
                            : "草稿"}
                  </span>
                </Badge>
                {approval.priority === "high" && (
                  <Badge variant="destructive" className="animate-pulse">
                    紧急
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{approval.applicant.name}</span>
                  <span className="text-gray-400">·</span>
                  <span>{approval.applicant.department}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{approval.createTime}</span>
                </div>
                {approval.amount && (
                  <div className="flex items-center space-x-1">
                    <span className="font-medium text-green-600">¥{approval.amount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* 工作流进度 */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">审批进度</span>
                  <span className="text-sm text-gray-600">
                    {approval.currentStep}/{approval.totalSteps} ({progress}%)
                  </span>
                </div>
                <Progress value={progress} className="h-2" />

                {/* 当前审批人 */}
                {approval.status === "pending" && (
                  <div className="flex items-center mt-2 text-sm text-sky-600">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    <span>当前审批人: {approval.workflow[approval.currentStep - 1]?.user}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{approval.description}</p>

              {/* 附件 */}
              {approval.attachments && approval.attachments.length > 0 && (
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <FileText className="w-4 h-4 mr-1" />
                  <span>{approval.attachments.length} 个附件</span>
                </div>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center space-x-2 ml-4">
            <Button variant="outline" size="sm" onClick={() => onView(approval)}>
              <Eye className="w-4 h-4 mr-1" />
              查看
            </Button>

            {approval.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                  onClick={() => onAction(approval.id, "approved")}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  通过
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => onAction(approval.id, "rejected", "需要补充材料")}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  拒绝
                </Button>

                {/* 撤回按钮 - 只有申请人可以撤回 */}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                  onClick={() => onRevoke(approval.id)}
                >
                  撤回
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 审批详情弹窗组件
function ApprovalDetailDialog({ approval, onClose, onAction, onRevoke }) {
  const [comment, setComment] = useState("")
  const [activeDetailTab, setActiveDetailTab] = useState("info")
  const ApprovalTypeConfig = ApprovalTypes[approval.type]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg ${ApprovalTypeConfig.color} flex items-center justify-center`}>
              <ApprovalTypeConfig.icon className="w-4 h-4 text-white" />
            </div>
            <span>{approval.title}</span>
          </DialogTitle>
          <DialogDescription>
            申请编号：{approval.id} · 申请人：{approval.applicant.name} · {approval.applicant.department}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeDetailTab} onValueChange={setActiveDetailTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">基本信息</TabsTrigger>
            <TabsTrigger value="workflow">审批流程</TabsTrigger>
            <TabsTrigger value="history">操作历史</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6 mt-6">
            {/* 基本信息 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">申请类型</Label>
                <p className="mt-1 flex items-center space-x-2">
                  <ApprovalTypeConfig.icon className="w-4 h-4" />
                  <span>{ApprovalTypeConfig.name}</span>
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">申请时间</Label>
                <p className="mt-1">{approval.createTime}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">申请人</Label>
                <p className="mt-1">
                  {approval.applicant.name} · {approval.applicant.department}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">优先级</Label>
                <Badge
                  className={approval.priority === "high" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}
                >
                  {approval.priority === "high" ? "紧急" : "普通"}
                </Badge>
              </div>
              {approval.amount && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">申请金额</Label>
                  <p className="mt-1 font-medium text-green-600">¥{approval.amount.toLocaleString()}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* 申请内容 */}
            <div>
              <Label className="text-sm font-medium text-gray-700">申请说明</Label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">{approval.description}</p>
              </div>
            </div>

            {/* 附件 */}
            {approval.attachments && approval.attachments.length > 0 && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">相关附件</Label>
                <div className="grid grid-cols-2 gap-3">
                  {approval.attachments.map((file, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="flex-1 text-sm">{file}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6 mt-6">
            {/* 审批流程可视化 */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-4 block">审批流程</Label>
              <div className="space-y-4">
                {approval.workflow.map((step, index) => (
                  <div key={step.step} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          step.status === "approved"
                            ? "bg-green-100 text-green-600 border-green-300"
                            : step.status === "rejected"
                              ? "bg-red-100 text-red-600 border-red-300"
                              : step.status === "pending"
                                ? "bg-yellow-100 text-yellow-600 border-yellow-300 animate-pulse"
                                : "bg-gray-100 text-gray-400 border-gray-300"
                        }`}
                      >
                        {step.status === "approved" ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : step.status === "rejected" ? (
                          <XCircle className="w-5 h-5" />
                        ) : step.status === "pending" ? (
                          <Clock className="w-5 h-5" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-current" />
                        )}
                      </div>
                      {index < approval.workflow.length - 1 && (
                        <div
                          className={`w-px h-12 mt-2 ${step.status === "approved" ? "bg-green-300" : "bg-gray-200"}`}
                        />
                      )}
                    </div>

                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{step.name}</p>
                          <p className="text-sm text-gray-600">{step.user}</p>
                        </div>
                        <div className="text-right">
                          {step.time && <p className="text-sm text-gray-600">{step.time}</p>}
                          <Badge
                            className={`${
                              step.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : step.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : step.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {step.status === "approved"
                              ? "已通过"
                              : step.status === "rejected"
                                ? "已拒绝"
                                : step.status === "pending"
                                  ? "审批中"
                                  : "等待中"}
                          </Badge>
                        </div>
                      </div>
                      {step.reason && (
                        <Alert className={step.status === "rejected" ? "border-red-200" : "border-green-200"}>
                          <MessageCircle className="w-4 h-4" />
                          <AlertDescription>
                            <strong>审批意见：</strong>
                            {step.reason}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <History className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">申请创建</p>
                  <p className="text-sm text-gray-600">
                    {approval.createTime} · {approval.applicant.name}
                  </p>
                </div>
              </div>

              {approval.workflow
                .filter((step) => step.time)
                .map((step, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {step.status === "approved" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">
                        {step.status === "approved" ? "审批通过" : "审批拒绝"} - {step.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {step.time} · {step.user}
                      </p>
                      {step.reason && <p className="text-sm text-gray-700 mt-1">{step.reason}</p>}
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* 审批操作 */}
        {approval.status === "pending" && (
          <>
            <Separator />
            <div>
              <Label className="text-sm font-medium text-gray-700">审批意见</Label>
              <Textarea
                placeholder="请输入审批意见..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          </>
        )}

        <DialogFooter className="flex justify-between">
          <div>
            {approval.status === "pending" && (
              <Button
                variant="outline"
                className="text-orange-600 border-orange-200 hover:bg-orange-50"
                onClick={() => {
                  onRevoke(approval.id)
                  onClose()
                }}
              >
                撤回申请
              </Button>
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              关闭
            </Button>
            {approval.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    onAction(approval.id, "rejected", comment || "审批不通过")
                    onClose()
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  拒绝
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    onAction(approval.id, "approved", comment || "审批通过")
                    onClose()
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  通过
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 创建申请表单组件
function CreateApprovalForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    amount: "",
    priority: "normal",
    attachments: [],
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // 创建新的审批申请
    const newApproval = {
      id: `APP${Date.now().toString().slice(-3)}`,
      title: formData.title,
      type: formData.type,
      applicant: { name: "当前用户", avatar: "", department: "当前部门", id: "current_user" },
      status: "pending",
      priority: formData.priority,
      createTime: new Date().toLocaleString("zh-CN"),
      amount: formData.amount ? Number.parseFloat(formData.amount) : null,
      description: formData.description,
      attachments: formData.attachments,
      currentStep: 1,
      totalSteps: 0,
      workflow: [],
    }

    // 使用工作流引擎创建工作流
    const workflow = WorkflowEngine.createWorkflow(formData.type, newApproval.amount)
    newApproval.workflow = workflow
    newApproval.totalSteps = workflow.length

    // 激活第一步
    if (workflow.length > 0) {
      newApproval.workflow[0].status = "pending"
    }

    onSubmit(newApproval)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">申请类型 *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })} required>
            <SelectTrigger>
              <SelectValue placeholder="选择申请类型" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ApprovalTypes).map(([key, type]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center space-x-2">
                    <type.icon className="w-4 h-4" />
                    <span>{type.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priority">优先级</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">普通</SelectItem>
              <SelectItem value="high">紧急</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="title">申请标题 *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="请输入申请标题"
          required
        />
      </div>

      <div>
        <Label htmlFor="amount">申请金额（可选）</Label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="请输入金额"
        />
      </div>

      <div>
        <Label htmlFor="description">申请说明 *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="请详细描述申请内容..."
          rows={4}
          required
        />
      </div>

      {/* 预览工作流 */}
      {formData.type && (
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">预览审批流程</Label>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              {ApprovalTypes[formData.type].workflow.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{step}</div>
                  {index < ApprovalTypes[formData.type].workflow.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button type="submit" disabled={!formData.type || !formData.title || !formData.description}>
          <Send className="w-4 h-4 mr-2" />
          提交申请
        </Button>
      </DialogFooter>
    </form>
  )
}

// 工作流设置弹窗
function WorkflowSettingsDialog({ onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Workflow className="w-5 h-5" />
            <span>工作流设置</span>
          </DialogTitle>
          <DialogDescription>配置不同类型申请的审批流程和规则</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {Object.entries(ApprovalTypes).map(([key, type]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <type.icon className="w-5 h-5" />
                  <span>{type.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">审批流程：</span>
                  {type.workflow.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <Badge variant="outline">{step}</Badge>
                      {index < type.workflow.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            保存设置
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 辅助函数
function getStatusColor(status) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    case "revoked":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getStatusIcon(status) {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />
    case "approved":
      return <CheckCircle className="w-4 h-4" />
    case "rejected":
      return <XCircle className="w-4 h-4" />
    case "revoked":
      return <AlertCircle className="w-4 h-4" />
    case "draft":
      return <Edit className="w-4 h-4" />
    default:
      return <AlertCircle className="w-4 h-4" />
  }
}
