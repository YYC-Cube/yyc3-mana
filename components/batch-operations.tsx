"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckSquare, Trash2, Download, Tag, Users, Calendar, Mail, Archive, Star, MoreHorizontal } from "lucide-react"

interface BatchOperationsProps {
  selectedItems: string[]
  totalItems: number
  itemType: "customer" | "task" | "finance"
  onSelectAll: (selected: boolean) => void
  onBatchAction: (action: string, options?: any) => void
  onClearSelection: () => void
}

export function BatchOperations({
  selectedItems,
  totalItems,
  itemType,
  onSelectAll,
  onBatchAction,
  onClearSelection,
}: BatchOperationsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [batchAction, setBatchAction] = useState<string>("")

  const itemTypeLabels = {
    customer: "客户",
    task: "任务",
    finance: "财务记录",
  }

  const batchActions = {
    customer: [
      { id: "delete", label: "删除客户", icon: Trash2, variant: "destructive" },
      { id: "export", label: "导出数据", icon: Download, variant: "default" },
      { id: "assign", label: "分配负责人", icon: Users, variant: "default" },
      { id: "tag", label: "添加标签", icon: Tag, variant: "default" },
      { id: "email", label: "发送邮件", icon: Mail, variant: "default" },
      { id: "archive", label: "归档", icon: Archive, variant: "default" },
    ],
    task: [
      { id: "delete", label: "删除任务", icon: Trash2, variant: "destructive" },
      { id: "complete", label: "标记完成", icon: CheckSquare, variant: "default" },
      { id: "assign", label: "分配负责人", icon: Users, variant: "default" },
      { id: "priority", label: "设置优先级", icon: Star, variant: "default" },
      { id: "deadline", label: "设置截止日期", icon: Calendar, variant: "default" },
      { id: "export", label: "导出任务", icon: Download, variant: "default" },
    ],
    finance: [
      { id: "delete", label: "删除记录", icon: Trash2, variant: "destructive" },
      { id: "export", label: "导出数据", icon: Download, variant: "default" },
      { id: "approve", label: "批量审批", icon: CheckSquare, variant: "default" },
      { id: "tag", label: "添加标签", icon: Tag, variant: "default" },
      { id: "archive", label: "归档", icon: Archive, variant: "default" },
    ],
  }

  const handleBatchAction = (actionId: string) => {
    setBatchAction(actionId)

    if (actionId === "delete") {
      setShowDeleteDialog(true)
    } else if (actionId === "assign") {
      setShowAssignDialog(true)
    } else {
      onBatchAction(actionId)
    }
  }

  const confirmDelete = () => {
    onBatchAction("delete")
    setShowDeleteDialog(false)
    onClearSelection()
  }

  const isAllSelected = selectedItems.length === totalItems && totalItems > 0
  const isPartialSelected = selectedItems.length > 0 && selectedItems.length < totalItems

  return (
    <>
      {selectedItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-sky-200 p-4 min-w-96">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isPartialSelected
                    }}
                    onCheckedChange={(checked) => onSelectAll(!!checked)}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    已选择 {selectedItems.length} 个{itemTypeLabels[itemType]}
                  </span>
                  {selectedItems.length === totalItems && (
                    <Badge variant="outline" className="bg-sky-50 text-sky-600 border-sky-200">
                      全选
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EnhancedButton variant="secondary" size="sm">
                      批量操作
                      <MoreHorizontal className="w-4 h-4 ml-2" />
                    </EnhancedButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>选择操作</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {batchActions[itemType].map((action) => {
                      const Icon = action.icon
                      return (
                        <DropdownMenuItem
                          key={action.id}
                          onClick={() => handleBatchAction(action.id)}
                          className={`cursor-pointer ${
                            action.variant === "destructive" ? "text-red-600 focus:text-red-600 focus:bg-red-50" : ""
                          }`}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          <span>{action.label}</span>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearSelection}
                  className="text-slate-500 hover:text-slate-700"
                >
                  取消选择
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 删除确认对话框 */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除选中的 {selectedItems.length} 个{itemTypeLabels[itemType]}吗？ 此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 分配负责人对话框 */}
      <AlertDialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>批量分配负责人</AlertDialogTitle>
            <AlertDialogDescription>
              为选中的 {selectedItems.length} 个{itemTypeLabels[itemType]}分配负责人
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="选择负责人" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zhang">张经理</SelectItem>
                <SelectItem value="li">李专员</SelectItem>
                <SelectItem value="wang">王主管</SelectItem>
                <SelectItem value="chen">陈总监</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onBatchAction("assign", { assignee: "selected_user" })
                setShowAssignDialog(false)
                onClearSelection()
              }}
            >
              确认分配
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
