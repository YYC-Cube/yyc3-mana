"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileNotificationCenter } from "./mobile-notification-center"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  DollarSign,
  Target,
  FileCheck,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Menu,
  Search,
  User,
  Home,
  Plus,
  Settings,
  X,
  ChevronRight,
  Wifi,
  Battery,
  Signal,
} from "lucide-react"

interface MobileLayoutProps {
  children: React.ReactNode
  activeModule?: string
  setActiveModule?: (module: string) => void
}

const navigationItems = [
  { id: "dashboard", label: "仪表盘", icon: LayoutDashboard, badge: null },
  { id: "customers", label: "客户管理", icon: Users, badge: "12" },
  { id: "tasks", label: "任务管理", icon: CheckSquare, badge: "5" },
  { id: "finance", label: "财务管理", icon: DollarSign, badge: null },
  { id: "okr", label: "OKR管理", icon: Target, badge: "3" },
  { id: "approval", label: "审批中心", icon: FileCheck, badge: "8" },
  { id: "communication", label: "沟通中心", icon: MessageSquare, badge: "新" },
  { id: "kpi", label: "KPI跟踪", icon: TrendingUp, badge: null },
  { id: "analytics", label: "数据分析", icon: BarChart3, badge: null },
]

const quickActions = [
  { id: "new-task", label: "新建任务", icon: Plus, color: "bg-blue-500" },
  { id: "new-customer", label: "添加客户", icon: Users, color: "bg-green-500" },
  { id: "new-approval", label: "发起审批", icon: FileCheck, color: "bg-orange-500" },
  { id: "new-meeting", label: "创建会议", icon: MessageSquare, color: "bg-purple-500" },
]

export function MobileLayout({ children, activeModule = "dashboard", setActiveModule }: MobileLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(100)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showQuickActions, setShowQuickActions] = useState(false)
  const layoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 监听网络状态
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // 获取电池信息（如果支持）
    if ("getBattery" in navigator) {
      ;(navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100))
        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100))
        })
      })
    }

    // 更新时间
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(timeInterval)
    }
  }, [])

  const getActiveModuleInfo = () => {
    return navigationItems.find((item) => item.id === activeModule) || navigationItems[0]
  }

  const activeModuleInfo = getActiveModuleInfo()

  return (
    <div ref={layoutRef} className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex flex-col">
      {/* 状态栏 */}
      <div className="bg-slate-900 text-white px-4 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center space-x-2">
          <span>{currentTime.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</span>
          {!isOnline && <span className="text-red-400">离线</span>}
        </div>
        <div className="flex items-center space-x-1">
          <Signal className="w-3 h-3" />
          <Wifi className={`w-3 h-3 ${isOnline ? "text-white" : "text-red-400"}`} />
          <div className="flex items-center space-x-1">
            <Battery className="w-3 h-3" />
            <span>{batteryLevel}%</span>
          </div>
        </div>
      </div>

      {/* 顶部导航栏 */}
      <header className="bg-white border-b border-sky-200 shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 bg-white">
              <MobileMenu
                activeModule={activeModule}
                setActiveModule={(module) => {
                  setActiveModule?.(module)
                  setIsMenuOpen(false)
                }}
                onClose={() => setIsMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-2">
            <activeModuleInfo.icon className="w-5 h-5 text-sky-600" />
            <h1 className="text-lg font-semibold text-slate-800">{activeModuleInfo.label}</h1>
            {activeModuleInfo.badge && (
              <Badge className="bg-red-500 text-white text-xs">{activeModuleInfo.badge}</Badge>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Search className="w-5 h-5" />
          </Button>
          <MobileNotificationCenter />
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="p-4">{children}</div>
      </main>

      {/* 底部导航栏 */}
      <nav className="bg-white border-t border-sky-200 shadow-lg px-4 py-2 flex justify-around items-center fixed bottom-0 left-0 right-0 z-40">
        {[
          { id: "dashboard", icon: Home, label: "首页" },
          { id: "tasks", icon: CheckSquare, label: "任务" },
          { id: "customers", icon: Users, label: "客户" },
          { id: "analytics", icon: BarChart3, label: "分析" },
        ].map((item) => {
          const Icon = item.icon
          const isActive = activeModule === item.id
          const moduleInfo = navigationItems.find((nav) => nav.id === item.id)

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 p-2 min-w-0 ${
                isActive ? "text-sky-600" : "text-slate-500"
              }`}
              onClick={() => setActiveModule?.(item.id)}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {moduleInfo?.badge && (
                  <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {moduleInfo.badge === "新" ? "!" : moduleInfo.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs truncate">{item.label}</span>
            </Button>
          )
        })}

        {/* 快速操作按钮 */}
        <Button
          className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full w-12 h-12 p-0 shadow-lg"
          onClick={() => setShowQuickActions(!showQuickActions)}
        >
          <Plus className={`w-6 h-6 transition-transform ${showQuickActions ? "rotate-45" : ""}`} />
        </Button>
      </nav>

      {/* 快速操作面板 */}
      {showQuickActions && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-end justify-center pb-24">
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">快速操作</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowQuickActions(false)} className="p-1">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="flex flex-col items-center space-y-2 p-4 h-auto border-2 hover:border-sky-300"
                    onClick={() => {
                      setShowQuickActions(false)
                      // 处理快速操作
                      console.log(`执行快速操作: ${action.id}`)
                    }}
                  >
                    <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 移动端菜单组件
function MobileMenu({
  activeModule,
  setActiveModule,
  onClose,
}: {
  activeModule: string
  setActiveModule: (module: string) => void
  onClose: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* 菜单头部 */}
      <div className="p-6 border-b border-sky-200 bg-gradient-to-r from-sky-50 to-blue-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img src="/images/yanyu-cloud-logo.png" alt="言语云" className="w-10 h-10 object-contain" />
            <div>
              <h2 className="text-lg font-bold text-slate-800">言语云</h2>
              <p className="text-xs text-slate-500">企业管理系统</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* 用户信息 */}
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700">管理员</p>
            <p className="text-xs text-slate-500">admin@yanyu.cloud</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeModule === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-12 transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:text-sky-700 hover:bg-sky-50"
              }`}
              onClick={() => setActiveModule(item.id)}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge
                  variant={isActive ? "secondary" : "default"}
                  className={`ml-2 ${
                    isActive
                      ? "bg-white/20 text-white border-white/30"
                      : "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                  } text-xs px-2 py-0.5`}
                >
                  {item.badge}
                </Badge>
              )}
              <ChevronRight className="w-4 h-4 ml-2 opacity-50" />
            </Button>
          )
        })}
      </nav>

      {/* 菜单底部 */}
      <div className="p-4 border-t border-sky-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start h-10 text-slate-600 hover:text-sky-700 hover:bg-sky-50">
          <Settings className="w-4 h-4 mr-3" />
          系统设置
        </Button>

        <div className="pt-2 text-center">
          <p className="text-xs text-slate-400">版本 v2.1.0</p>
          <p className="text-xs text-slate-400">© 2024 言语云</p>
        </div>
      </div>
    </div>
  )
}
