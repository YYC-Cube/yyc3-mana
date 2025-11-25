"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Check, CheckCheck, Trash2, X, MessageSquare, ClipboardList, AlertCircle, Settings } from "lucide-react"
import { mobileNotificationFallback } from "@/lib/mobile-notifications-fallback"

interface Notification {
  id: string
  title: string
  body: string
  timestamp: number
  read: boolean
  type: string
  data?: any
}

export function MobileNotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    // 初始化通知数据
    loadNotifications()

    // 监听通知事件
    const handleNewNotification = (event: CustomEvent) => {
      loadNotifications()
    }

    const handleNotificationRead = () => {
      loadNotifications()
    }

    const handleAllNotificationsRead = () => {
      loadNotifications()
    }

    const handleNotificationRemoved = () => {
      loadNotifications()
    }

    const handleAllNotificationsCleared = () => {
      loadNotifications()
    }

    window.addEventListener("mobile-notification", handleNewNotification as EventListener)
    window.addEventListener("notification-read", handleNotificationRead)
    window.addEventListener("all-notifications-read", handleAllNotificationsRead)
    window.addEventListener("notification-removed", handleNotificationRemoved)
    window.addEventListener("all-notifications-cleared", handleAllNotificationsCleared)

    return () => {
      window.removeEventListener("mobile-notification", handleNewNotification as EventListener)
      window.removeEventListener("notification-read", handleNotificationRead)
      window.removeEventListener("all-notifications-read", handleAllNotificationsRead)
      window.removeEventListener("notification-removed", handleNotificationRemoved)
      window.removeEventListener("all-notifications-cleared", handleAllNotificationsCleared)
    }
  }, [])

  const loadNotifications = () => {
    const allNotifications = mobileNotificationFallback.getNotifications()
    setNotifications(allNotifications)
    setUnreadCount(mobileNotificationFallback.getUnreadCount())
  }

  const handleMarkAsRead = (notificationId: string) => {
    mobileNotificationFallback.markAsRead(notificationId)
  }

  const handleMarkAllAsRead = () => {
    mobileNotificationFallback.markAllAsRead()
  }

  const handleRemoveNotification = (notificationId: string) => {
    mobileNotificationFallback.removeNotification(notificationId)
  }

  const handleClearAll = () => {
    mobileNotificationFallback.clearAllNotifications()
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return <ClipboardList className="w-4 h-4 text-blue-500" />
      case "approval":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      case "message":
        return <MessageSquare className="w-4 h-4 text-green-500" />
      case "system":
        return <Settings className="w-4 h-4 text-gray-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getFilteredNotifications = () => {
    if (filter === "all") return notifications
    if (filter === "unread") return notifications.filter((n) => !n.read)
    return notifications.filter((n) => n.type === filter)
  }

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "刚刚"
    if (minutes < 60) return `${minutes}分钟前`
    if (hours < 24) return `${hours}小时前`
    if (days < 7) return `${days}天前`
    return new Date(timestamp).toLocaleDateString("zh-CN")
  }

  return (
    <>
      {/* 通知按钮 */}
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)} className="relative p-2 hover:bg-slate-100">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-600">
            {unreadCount > 99 ? "99+" : unreadCount.toString()}
          </Badge>
        )}
      </Button>

      {/* 通知中心弹窗 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center md:justify-center">
          <Card className="w-full max-w-md mx-4 mb-4 md:mb-0 max-h-[80vh] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">通知中心</CardTitle>
                  <CardDescription>{unreadCount > 0 ? `${unreadCount}条未读消息` : "暂无未读消息"}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* 过滤器 */}
              <div className="flex space-x-2 mt-3">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="text-xs"
                >
                  全部
                </Button>
                <Button
                  variant={filter === "unread" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("unread")}
                  className="text-xs"
                >
                  未读
                </Button>
                <Button
                  variant={filter === "task" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("task")}
                  className="text-xs"
                >
                  任务
                </Button>
                <Button
                  variant={filter === "approval" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("approval")}
                  className="text-xs"
                >
                  审批
                </Button>
              </div>

              {/* 操作按钮 */}
              {notifications.length > 0 && (
                <div className="flex space-x-2 mt-3">
                  {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="text-xs">
                      <CheckCheck className="w-3 h-3 mr-1" />
                      全部已读
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleClearAll} className="text-xs text-red-600">
                    <Trash2 className="w-3 h-3 mr-1" />
                    清空全部
                  </Button>
                </div>
              )}
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full max-h-96">
                {getFilteredNotifications().length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>暂无通知</p>
                  </div>
                ) : (
                  <div className="space-y-1 p-3">
                    {getFilteredNotifications().map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border transition-colors ${
                          notification.read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4
                                className={`text-sm font-medium truncate ${
                                  notification.read ? "text-gray-700" : "text-gray-900"
                                }`}
                              >
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Check className="w-3 h-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveNotification(notification.id)}
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <p className={`text-sm mt-1 ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                              {notification.body}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">{formatTime(notification.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
