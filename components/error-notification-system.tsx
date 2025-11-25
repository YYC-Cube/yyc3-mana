"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, AlertTriangle, Info, CheckCircle, X, ExternalLink, Copy, Bug } from "lucide-react"

export interface ErrorNotification {
  id: string
  type: "error" | "warning" | "info" | "success"
  title: string
  message: string
  details?: string
  timestamp: number
  actions?: Array<{
    label: string
    action: () => void
    variant?: "default" | "outline" | "destructive"
  }>
  autoClose?: boolean
  duration?: number
  persistent?: boolean
}

interface ErrorNotificationSystemProps {
  notifications: ErrorNotification[]
  onDismiss: (id: string) => void
  onClearAll: () => void
}

export function ErrorNotificationSystem({ notifications, onDismiss, onClearAll }: ErrorNotificationSystemProps) {
  const [selectedNotification, setSelectedNotification] = useState<ErrorNotification | null>(null)

  // 自动关闭通知
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    notifications.forEach((notification) => {
      if (notification.autoClose && !notification.persistent) {
        const timer = setTimeout(() => {
          onDismiss(notification.id)
        }, notification.duration || 5000)
        timers.push(timer)
      }
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [notifications, onDismiss])

  // 获取通知图标
  const getNotificationIcon = (type: ErrorNotification["type"]) => {
    switch (type) {
      case "error":
        return AlertCircle
      case "warning":
        return AlertTriangle
      case "info":
        return Info
      case "success":
        return CheckCircle
      default:
        return Info
    }
  }

  // 获取通知颜色
  const getNotificationColor = (type: ErrorNotification["type"]) => {
    switch (type) {
      case "error":
        return "border-red-200 bg-red-50 text-red-800"
      case "warning":
        return "border-yellow-200 bg-yellow-50 text-yellow-800"
      case "info":
        return "border-blue-200 bg-blue-50 text-blue-800"
      case "success":
        return "border-green-200 bg-green-50 text-green-800"
      default:
        return "border-gray-200 bg-gray-50 text-gray-800"
    }
  }

  // 获取图标颜色
  const getIconColor = (type: ErrorNotification["type"]) => {
    switch (type) {
      case "error":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      case "info":
        return "text-blue-500"
      case "success":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  // 复制错误信息
  const copyErrorDetails = (notification: ErrorNotification) => {
    const errorInfo = `
错误类型: ${notification.type}
标题: ${notification.title}
消息: ${notification.message}
详细信息: ${notification.details || "无"}
时间: ${new Date(notification.timestamp).toLocaleString("zh-CN")}
    `.trim()

    navigator.clipboard.writeText(errorInfo).then(() => {
      // 可以添加复制成功的提示
      console.log("错误信息已复制到剪贴板")
    })
  }

  // 获取用户友好的错误解决方案
  const getErrorSolution = (notification: ErrorNotification): string => {
    const errorSolutions: Record<string, string> = {
      数据库未初始化: "请等待系统初始化完成，或尝试刷新页面重新初始化。",
      网络连接失败: "请检查您的网络连接，确保能够访问互联网。",
      同步服务启动失败: "请尝试刷新页面重新启动同步服务，或联系技术支持。",
      权限不足: "您可能没有执行此操作的权限，请联系管理员获取相应权限。",
      数据冲突: "检测到数据冲突，系统将尝试自动解决，或您可以手动处理冲突。",
      服务器错误: "服务器暂时不可用，请稍后重试或联系技术支持。",
    }

    // 根据错误标题或消息匹配解决方案
    for (const [key, solution] of Object.entries(errorSolutions)) {
      if (notification.title.includes(key) || notification.message.includes(key)) {
        return solution
      }
    }

    return "如果问题持续存在，请联系技术支持团队获取帮助。"
  }

  if (notifications.length === 0) return null

  return (
    <>
      {/* 通知列表 */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.slice(0, 3).map((notification) => {
          const Icon = getNotificationIcon(notification.type)
          return (
            <Card
              key={notification.id}
              className={`border ${getNotificationColor(notification.type)} shadow-lg animate-in slide-in-from-right-full duration-300`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getIconColor(notification.type)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-xs mt-1 opacity-90">{notification.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(notification.timestamp).toLocaleTimeString("zh-CN")}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedNotification(notification)}
                          className="h-6 w-6 p-0"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDismiss(notification.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* 快速操作按钮 */}
                    {notification.actions && notification.actions.length > 0 && (
                      <div className="flex space-x-2 mt-2">
                        {notification.actions.slice(0, 2).map((action, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant={action.variant || "outline"}
                            onClick={action.action}
                            className="h-6 text-xs px-2"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* 更多通知提示 */}
        {notifications.length > 3 && (
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-gray-600">还有 {notifications.length - 3} 个通知</p>
              <Button size="sm" variant="ghost" onClick={onClearAll} className="mt-1 h-6 text-xs">
                清除所有
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 详细错误对话框 */}
      {selectedNotification && (
        <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {(() => {
                  const Icon = getNotificationIcon(selectedNotification.type)
                  return <Icon className={`w-5 h-5 ${getIconColor(selectedNotification.type)}`} />
                })()}
                <span>{selectedNotification.title}</span>
                <Badge
                  variant="outline"
                  className={
                    selectedNotification.type === "error"
                      ? "border-red-200 text-red-700"
                      : selectedNotification.type === "warning"
                        ? "border-yellow-200 text-yellow-700"
                        : "border-blue-200 text-blue-700"
                  }
                >
                  {selectedNotification.type === "error"
                    ? "错误"
                    : selectedNotification.type === "warning"
                      ? "警告"
                      : "信息"}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                发生时间: {new Date(selectedNotification.timestamp).toLocaleString("zh-CN")}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* 错误消息 */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">错误描述</h4>
                  <p className="text-sm text-gray-700">{selectedNotification.message}</p>
                </CardContent>
              </Card>

              {/* 详细信息 */}
              {selectedNotification.details && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">技术详情</h4>
                      <Button size="sm" variant="outline" onClick={() => copyErrorDetails(selectedNotification)}>
                        <Copy className="w-4 h-4 mr-1" />
                        复制
                      </Button>
                    </div>
                    <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                      {selectedNotification.details}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {/* 解决方案 */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-blue-900">建议解决方案</h4>
                  </div>
                  <p className="text-sm text-blue-800">{getErrorSolution(selectedNotification)}</p>
                </CardContent>
              </Card>

              {/* 操作按钮 */}
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  {selectedNotification.actions?.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant || "default"}
                      onClick={() => {
                        action.action()
                        setSelectedNotification(null)
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // 报告错误到监控系统
                      window.dispatchEvent(
                        new CustomEvent("reportError", {
                          detail: selectedNotification,
                        }),
                      )
                    }}
                  >
                    <Bug className="w-4 h-4 mr-1" />
                    报告问题
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedNotification(null)}>
                    关闭
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

// 错误通知管理器
class ErrorNotificationManager {
  private notifications: ErrorNotification[] = []
  private listeners: Array<(notifications: ErrorNotification[]) => void> = []

  // 添加通知
  addNotification(notification: Omit<ErrorNotification, "id" | "timestamp">) {
    const fullNotification: ErrorNotification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    }

    this.notifications.unshift(fullNotification)

    // 限制通知数量
    if (this.notifications.length > 10) {
      this.notifications = this.notifications.slice(0, 10)
    }

    this.notifyListeners()
    return fullNotification.id
  }

  // 移除通知
  removeNotification(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id)
    this.notifyListeners()
  }

  // 清除所有通知
  clearAll() {
    this.notifications = []
    this.notifyListeners()
  }

  // 订阅通知变化
  subscribe(listener: (notifications: ErrorNotification[]) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // 获取当前通知
  getNotifications() {
    return [...this.notifications]
  }

  // 通知监听器
  private notifyListeners() {
    this.listeners.forEach((listener) => listener([...this.notifications]))
  }

  // 便捷方法
  error(title: string, message: string, details?: string, actions?: ErrorNotification["actions"]) {
    return this.addNotification({
      type: "error",
      title,
      message,
      details,
      actions,
      persistent: true,
    })
  }

  warning(title: string, message: string, autoClose = true) {
    return this.addNotification({
      type: "warning",
      title,
      message,
      autoClose,
      duration: 8000,
    })
  }

  info(title: string, message: string, autoClose = true) {
    return this.addNotification({
      type: "info",
      title,
      message,
      autoClose,
      duration: 5000,
    })
  }

  success(title: string, message: string, autoClose = true) {
    return this.addNotification({
      type: "success",
      title,
      message,
      autoClose,
      duration: 3000,
    })
  }
}

export const errorNotificationManager = new ErrorNotificationManager()
