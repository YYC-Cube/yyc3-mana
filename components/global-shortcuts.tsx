"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Keyboard,
  Search,
  Users,
  CheckSquare,
  Calendar,
  Mail,
  Phone,
  FileText,
  Settings,
  Home,
  BarChart3,
  Zap,
} from "lucide-react"

interface Shortcut {
  id: string
  key: string
  description: string
  action: () => void
  category: string
  icon: React.ReactNode
}

interface GlobalShortcutsProps {
  onNavigate?: (path: string) => void
  onAction?: (actionId: string) => void
}

export function GlobalShortcuts({ onNavigate, onAction }: GlobalShortcutsProps) {
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [showShortcutsDialog, setShowShortcutsDialog] = useState(false)

  const shortcuts: Shortcut[] = [
    // 导航快捷键
    {
      id: "nav-dashboard",
      key: "Ctrl+1",
      description: "打开仪表盘",
      action: () => onNavigate?.("/"),
      category: "导航",
      icon: <Home className="w-4 h-4" />
    },
    {
      id: "nav-customers",
      key: "Ctrl+2", 
      description: "打开客户管理",
      action: () => onNavigate?("/customers"),
      category: "导航",\
      icon: <Users className="w-4 h-4" />
    },
    {
      id: "nav-tasks",
      key: "Ctrl+3",
      description: "打开任务管理",
      action: () => onNavigate?("/tasks"),
      category: "导航",
      icon: <CheckSquare className="w-4 h-4" />
    },
    {
      id: "nav-analytics",
      key: "Ctrl+4",
      description: "打开数据分析",
      action: () => onNavigate?("/analytics"),
      category: "导航",
      icon: <BarChart3 className="w-4 h-4" />
    },
    
    // 功能快捷键
    {
      id: "global-search",
      key: "Ctrl+K",
      description: "全局搜索",
      action: () => setIsCommandOpen(true),
      category: "功能",
      icon: <Search className="w-4 h-4" />
    },
    {
      id: "add-customer",
      key: "Ctrl+Shift+C",
      description: "添加客户",
      action: () => onAction?.("add-customer"),
      category: "功能",
      icon: <Users className="w-4 h-4" />
    },
    {
      id: "create-task",
      key: "Ctrl+Shift+T",
      description: "创建任务",
      action: () => onAction?.("create-task"),
      category: "功能",
      icon: <CheckSquare className="w-4 h-4" />
    },
    {
      id: "schedule-meeting",
      key: "Ctrl+Shift+M",
      description: "安排会议",
      action: () => onAction?.("schedule-meeting"),
      category: "功能",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: "send-email",
      key: "Ctrl+Shift+E",
      description: "发送邮件",
      action: () => onAction?.("send-email"),
      category: "功能",
      icon: <Mail className="w-4 h-4" />
    },
    {
      id: "make-call",
      key: "Ctrl+Shift+P",
      description: "拨打电话",
      action: () => onAction?.("make-call"),
      category: "功能",
      icon: <Phone className="w-4 h-4" />
    },
    {
      id: "create-report",
      key: "Ctrl+Shift+R",
      description: "生成报表",
      action: () => onAction?.("create-report"),
      category: "功能",
      icon: <FileText className="w-4 h-4" />
    },
    
    // 系统快捷键
    {
      id: "show-shortcuts",
      key: "Ctrl+/",
      description: "显示快捷键帮助",
      action: () => setShowShortcutsDialog(true),
      category: "系统",
      icon: <Keyboard className="w-4 h-4" />
    },
    {
      id: "settings",
      key: "Ctrl+,",
      description: "打开设置",
      action: () => onNavigate?("/settings"),
      category: "系统",
      icon: <Settings className="w-4 h-4" />
    }
  ]

  // 注册全局快捷键
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = `${event.ctrlKey ? "Ctrl+" : ""}${event.shiftKey ? "Shift+" : ""}${event.key}`

      const shortcut = shortcuts.find((s) => s.key === key)
      if (shortcut) {
        event.preventDefault()
        shortcut.action()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [shortcuts])

  const groupedShortcuts = () =>
    shortcuts.reduce(
      (groups, shortcut) => {
        const category = shortcut.category
        if (!groups[category]) {
          groups[category] = []
        }
        groups[category].push(shortcut)
        return groups
      },
      {} as Record<string, Shortcut[]>,
    )

  return (
    <>
      {/* 命令面板 */}
      <Dialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <DialogContent className="max-w-2xl p-0">
          <Command className="rounded-lg border-0 shadow-md">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput placeholder="搜索功能或快捷键..." className="border-0 focus:ring-0" />
            </div>
            <CommandList className="max-h-96">
              <CommandEmpty>未找到相关功能</CommandEmpty>
              {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
                <CommandGroup key={category} heading={category}>
                  {shortcuts.map((shortcut) => (
                    <CommandItem
                      key={shortcut.id}
                      onSelect={() => {
                        shortcut.action()
                        setIsCommandOpen(false)
                      }}
                      className="flex items-center justify-between p-3"
                    >
                      <div className="flex items-center space-x-3">
                        {shortcut.icon}
                        <span>{shortcut.description}</span>
                      </div>
                      <Badge variant="outline" className="text-xs font-mono">
                        {shortcut.key}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>

      {/* 快捷键帮助对话框 */}
      <Dialog open={showShortcutsDialog} onOpenChange={setShowShortcutsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Keyboard className="w-5 h-5" />
              <span>快捷键帮助</span>
            </DialogTitle>
            <DialogDescription>使用快捷键提高工作效率，快速访问常用功能</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
              <div key={category}>
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                  {category === "导航" && <Home className="w-4 h-4" />}
                  {category === "功能" && <Zap className="w-4 h-4" />}
                  {category === "系统" && <Settings className="w-4 h-4" />}
                  <span>{category}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {shortcuts.map((shortcut) => (
                    <div
                      key={shortcut.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-center space-x-3">
                        {shortcut.icon}
                        <span className="text-sm text-slate-700">{shortcut.description}</span>
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">
                        {shortcut.key}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={() => setShowShortcutsDialog(false)}>关闭</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 快捷键提示按钮 */}
      <div className="fixed bottom-4 right-4 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-white shadow-lg border-sky-200 text-sky-600 hover:bg-sky-50"
              onClick={() => setShowShortcutsDialog(true)}
            >
              <Keyboard className="w-4 h-4 mr-2" />
              快捷键
              <Badge variant="secondary" className="ml-2 text-xs">
                Ctrl+/
              </Badge>
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </>
  )
}
