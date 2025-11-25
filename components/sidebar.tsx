"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Target,
  Users,
  CheckSquare,
  FileCheck,
  Zap,
  DollarSign,
  CreditCard,
  Receipt,
  Banknote,
  MessageSquare,
  Video,
  FileImage,
  Bell,
  Brain,
  TrendingUp,
  Bot,
  Settings,
  Shield,
  Database,
  Puzzle,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  Pin,
  PinOff,
  Smartphone,
} from "lucide-react"

interface SidebarProps {
  activeModule?: string
  setActiveModule?: (module: string) => void
  className?: string
}

export function Sidebar({ activeModule = "dashboard", setActiveModule, className }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPinned, setIsPinned] = useState(false)

  // 根据路径设置活跃模块
  useEffect(() => {
    const pathToModule: Record<string, string> = {
      "/": "dashboard",
      "/analytics": "analytics",
      "/reports": "reports",
      "/kpi": "kpi",
      "/customers": "customers",
      "/tasks": "tasks",
      "/approval": "approval",
      "/okr": "okr",
      "/finance": "finance",
      "/finance/budget": "budget",
      "/finance/invoices": "invoices",
      "/finance/payments": "payments",
      "/communication/chat": "chat",
      "/communication/meetings": "meetings",
      "/communication/documents": "documents",
      "/communication/notifications": "notifications",
      "/ai": "ai-analysis",
      "/ai/prediction": "ai-prediction",
      "/ai/automation": "ai-automation",
      "/security/permissions": "permissions",
      "/security/audit": "audit",
      "/security/mfa": "mfa",
      "/system/settings": "settings",
      "/system/database": "database",
      "/system/integrations": "integrations",
      "/system/backup": "backup",
    }

    const currentModule = pathToModule[pathname] || "dashboard"
    if (setActiveModule && currentModule !== activeModule) {
      setActiveModule(currentModule)
    }
  }, [pathname, activeModule, setActiveModule])

  const menuItems = [
    {
      category: "应用总览",
      color: "blue",
      items: [
        {
          id: "dashboard",
          label: "服务中心",
          icon: LayoutDashboard,
          path: "/",
        },
        {
          id: "analytics",
          label: "数据分析",
          icon: BarChart3,
          path: "/analytics",
        },
        {
          id: "reports",
          label: "报表中心",
          icon: FileText,
          path: "/reports",
        },
        {
          id: "kpi",
          label: "指标监控",
          icon: Target,
          path: "/kpi",
        },
      ],
    },
    {
      category: "AI智能助手",
      color: "purple",
      items: [
        {
          id: "ai-analysis",
          label: "智能分析",
          icon: Brain,
          path: "/ai",
        },
        {
          id: "ai-prediction",
          label: "客户数据",
          icon: TrendingUp,
          path: "/ai/prediction",
        },
        {
          id: "ai-automation",
          label: "智能表单",
          icon: Bot,
          path: "/ai/automation",
        },
      ],
    },
    {
      category: "高级功能",
      color: "mixed",
      items: [
        {
          id: "multi-tenant",
          label: "门店管理",
          icon: Users,
          path: "/multi-tenant",
          color: "green",
        },
        {
          id: "bi-analysis",
          label: "商业智能",
          icon: BarChart3,
          path: "/bi-analysis",
          color: "purple",
        },
        {
          id: "mobile-app",
          label: "移动应用",
          icon: Smartphone,
          path: "/mobile-app",
          color: "red",
        },
        {
          id: "security-center",
          label: "安全中心",
          icon: Shield,
          path: "/security",
          color: "orange",
        },
      ],
    },
    {
      category: "核心功能",
      color: "mixed",
      items: [
        {
          id: "customers",
          label: "客户管理",
          icon: Users,
          path: "/customers",
          color: "orange",
        },
        {
          id: "tasks",
          label: "任务管理",
          icon: CheckSquare,
          path: "/tasks",
          color: "green",
        },
        {
          id: "communication",
          label: "沟通协作",
          icon: MessageSquare,
          path: "/communication",
          color: "green",
        },
        {
          id: "data-analytics",
          label: "数据分析",
          icon: BarChart3,
          path: "/analytics",
          color: "purple",
        },
        {
          id: "finance",
          label: "财务管理",
          icon: DollarSign,
          path: "/finance",
          color: "orange",
        },
        {
          id: "project-management",
          label: "项目管理",
          icon: Target,
          path: "/projects",
          color: "purple",
        },
      ],
    },
    {
      category: "财务管理",
      color: "orange",
      items: [
        {
          id: "budget",
          label: "预算管理",
          icon: CreditCard,
          path: "/finance/budget",
        },
        {
          id: "invoices",
          label: "发票管理",
          icon: Receipt,
          path: "/finance/invoices",
        },
        {
          id: "payments",
          label: "支付管理",
          icon: Banknote,
          path: "/finance/payments",
        },
      ],
    },
    {
      category: "沟通协作",
      color: "green",
      items: [
        {
          id: "chat",
          label: "即时聊天",
          icon: MessageSquare,
          path: "/communication/chat",
        },
        {
          id: "meetings",
          label: "视频会议",
          icon: Video,
          path: "/communication/meetings",
        },
        {
          id: "documents",
          label: "文档协作",
          icon: FileImage,
          path: "/communication/documents",
        },
        {
          id: "notifications",
          label: "通知中心",
          icon: Bell,
          path: "/communication/notifications",
        },
      ],
    },
    {
      category: "系统设置",
      color: "slate",
      items: [
        {
          id: "approval",
          label: "审批管理",
          icon: FileCheck,
          path: "/approval",
        },
        {
          id: "okr",
          label: "目标管理",
          icon: Zap,
          path: "/okr",
        },
        {
          id: "settings",
          label: "基础设置",
          icon: Settings,
          path: "/system/settings",
        },
        {
          id: "database",
          label: "数据库管理",
          icon: Database,
          path: "/system/database",
        },
        {
          id: "integrations",
          label: "集成管理",
          icon: Puzzle,
          path: "/system/integrations",
        },
        {
          id: "backup",
          label: "备份恢复",
          icon: HardDrive,
          path: "/system/backup",
        },
      ],
    },
  ]

  const handleNavigation = (path: string, moduleId: string) => {
    router.push(path)
    setActiveModule?.(moduleId)
  }

  const handleLogoClick = () => {
    router.push("/")
    setActiveModule?.("dashboard")
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    if (!isCollapsed) {
      setIsPinned(false)
    }
  }

  const togglePin = () => {
    setIsPinned(!isPinned)
    if (!isPinned) {
      setIsCollapsed(false)
    }
  }

  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsHovered(true)
      setIsCollapsed(false)
    }
  }

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsHovered(false)
      setTimeout(() => {
        if (!isPinned) {
          setIsCollapsed(true)
        }
      }, 300)
    }
  }

  const sidebarWidth = isCollapsed && !isHovered ? "w-14" : "w-56"

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        border: "border-l-blue-500",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-blue-700 dark:text-blue-300",
        hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-l-blue-500",
        collapsedBg: "bg-blue-100 dark:bg-blue-900/30",
        collapsedBorder: "border-l-4 border-l-blue-500",
        iconColor: "text-blue-600 dark:text-blue-400",
      },
      purple: {
        border: "border-l-purple-500",
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-700 dark:text-purple-300",
        hover: "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-l-purple-500",
        collapsedBg: "bg-purple-100 dark:bg-purple-900/30",
        collapsedBorder: "border-l-4 border-l-purple-500",
        iconColor: "text-purple-600 dark:text-purple-400",
      },
      green: {
        border: "border-l-green-500",
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-700 dark:text-green-300",
        hover: "hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-l-green-500",
        collapsedBg: "bg-green-100 dark:bg-green-900/30",
        collapsedBorder: "border-l-4 border-l-green-500",
        iconColor: "text-green-600 dark:text-green-400",
      },
      orange: {
        border: "border-l-orange-500",
        bg: "bg-orange-50 dark:bg-orange-900/20",
        text: "text-orange-700 dark:text-orange-300",
        hover: "hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-l-orange-500",
        collapsedBg: "bg-orange-100 dark:bg-orange-900/30",
        collapsedBorder: "border-l-4 border-l-orange-500",
        iconColor: "text-orange-600 dark:text-orange-400",
      },
      red: {
        border: "border-l-red-500",
        bg: "bg-red-50 dark:bg-red-900/20",
        text: "text-red-700 dark:text-red-300",
        hover: "hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-l-red-500",
        collapsedBg: "bg-red-100 dark:bg-red-900/30",
        collapsedBorder: "border-l-4 border-l-red-500",
        iconColor: "text-red-600 dark:text-red-400",
      },
      slate: {
        border: "border-l-slate-500",
        bg: "bg-slate-50 dark:bg-slate-900/20",
        text: "text-slate-700 dark:text-slate-300",
        hover: "hover:bg-slate-50 dark:hover:bg-slate-900/20 hover:border-l-slate-500",
        collapsedBg: "bg-slate-100 dark:bg-slate-900/30",
        collapsedBorder: "border-l-4 border-l-slate-500",
        iconColor: "text-slate-600 dark:text-slate-400",
      },
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.slate
  }

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full transition-all duration-300 ease-in-out flex flex-col shadow-lg",
          sidebarWidth,
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 顶部控制区域 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {(!isCollapsed || isHovered) && (
            <div className="flex flex-col items-center space-y-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
                onClick={handleLogoClick}
              >
                <img src="/images/yanyu-cloud-3d-logo.png" alt="YYC Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700 leading-tight">
                  Customer Care Center
                </p>
              </div>
            </div>
          )}

          {isCollapsed && !isHovered && (
            <div className="flex justify-center w-full">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
                onClick={handleLogoClick}
              >
                <img src="/images/yanyu-cloud-3d-logo.png" alt="YYC Logo" className="w-full h-full object-contain" />
              </div>
            </div>
          )}

          {(!isCollapsed || isHovered) && (
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={togglePin} className="p-1">
                    {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{isPinned ? "取消固定" : "固定侧边栏"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={toggleCollapse} className="p-1">
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{isCollapsed ? "展开侧边栏" : "收缩侧边栏"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-4">
          {menuItems.map((category) => (
            <div key={category.category} className={cn("px-3", isCollapsed && !isHovered && "px-2")}>
              {(!isCollapsed || isHovered) && (
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {category.category}
                </h3>
              )}

              <div className="space-y-2">
                {category.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeModule === item.id
                  const itemColor = item.color || category.color
                  const colors = getColorClasses(itemColor)

                  return (
                    <Tooltip key={item.id}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full transition-all duration-300 group relative",
                            // 展开状态样式
                            (!isCollapsed || isHovered) && [
                              "justify-start h-10 px-3 border-l-4 border-transparent",
                              isActive
                                ? `${colors.border} ${colors.bg} ${colors.text} shadow-sm`
                                : `hover:border-l-4 ${colors.hover} text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:shadow-xl hover:scale-105`,
                            ],
                            // 收缩状态样式
                            isCollapsed &&
                              !isHovered && [
                                "justify-center h-10 w-10 mx-auto rounded-lg shadow-sm",
                                `${colors.collapsedBg} ${colors.collapsedBorder} hover:shadow-md hover:scale-105`,
                              ],
                          )}
                          onClick={() => handleNavigation(item.path, item.id)}
                        >
                          <Icon
                            className={cn(
                              "flex-shrink-0 transition-colors duration-300",
                              (!isCollapsed || isHovered) && "w-5 h-5",
                              isCollapsed && !isHovered && `w-5 h-5 ${colors.iconColor}`,
                            )}
                          />
                          {(!isCollapsed || isHovered) && (
                            <span className="ml-3 font-medium group-hover:translate-x-1 transition-all duration-300">
                              {item.label}
                            </span>
                          )}
                        </Button>
                      </TooltipTrigger>
                      {isCollapsed && !isHovered && (
                        <TooltipContent side="right">
                          <p>{item.label}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* 底部状态 */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {(!isCollapsed || isHovered) && (
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>系统运行正常</span>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
