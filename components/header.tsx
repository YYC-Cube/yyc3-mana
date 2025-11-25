"use client"

import { Bell, Search, Settings, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebarContext } from "@/components/layout/adaptive-sidebar"

interface HeaderProps {
  activeModule?: string
  className?: string
  onMenuClick?: () => void
}

export function Header({ activeModule = "dashboard", className = "" }: HeaderProps) {
  const { toggle, isMobile } = useSidebarContext()

  const moduleNames: Record<string, string> = {
    dashboard: "服务中心",
    analytics: "数据分析",
    reports: "报表中心",
    kpi: "指标监控",
    customers: "客户管理",
    tasks: "任务管理",
    approval: "审批管理",
    okr: "目标管理",
    finance: "财务管理",
    budget: "预算管理",
    invoices: "发票管理",
    payments: "支付管理",
    chat: "即时聊天",
    meetings: "视频会议",
    documents: "文档协作",
    notifications: "通知中心",
    "ai-analysis": "智能分析",
    "ai-prediction": "预测分析",
    "ai-automation": "自动化",
    settings: "系统设置",
    database: "数据库管理",
    integrations: "集成管理",
    backup: "备份恢复",
  }

  return (
    <header className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* 左侧：菜单按钮和标题 */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggle} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {moduleNames[activeModule] || "服务中心"}
          </h1>
        </div>

        {/* 中间：搜索框 */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="搜索客户、任务、订单..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900"
            />
          </div>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="flex items-center space-x-2">
          {/* 通知 */}
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* 设置 */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>个人资料</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>设置</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
