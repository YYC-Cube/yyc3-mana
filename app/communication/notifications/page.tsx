"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Search,
  Settings,
  Check,
  X,
  Star,
  MessageSquare,
  Calendar,
  FileText,
  AlertTriangle,
  Info,
  CheckCircle,
  Filter,
} from "lucide-react"

interface Notification {
  id: string
  title: string
  content: string
  type: "message" | "meeting" | "document" | "system" | "announcement"
  priority: "low" | "medium" | "high" | "urgent"
  timestamp: Date
  isRead: boolean
  isStarred: boolean
  sender: string
  senderAvatar: string
  actionRequired: boolean
  category: string
}

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "项目评审会议提醒",
      content: "您有一个项目评审会议将在30分钟后开始，请提前准备相关材料。",
      type: "meeting",
      priority: "high",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isRead: false,
      isStarred: true,
      sender: "系统通知",
      senderAvatar: "",
      actionRequired: true,
      category: "会议",
    },
    {
      id: "2",
      title: "新消息通知",
      content: "张经理在产品开发群中@了您，请及时查看消息。",
      type: "message",
      priority: "medium",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      isStarred: false,
      sender: "张经理",
      senderAvatar: "",
      actionRequired: true,
      category: "消息",
    },
    {
      id: "3",
      title: "文档协作邀请",
      content: "李总监邀请您协作编辑《技术架构设计方案》文档。",
      type: "document",
      priority: "medium",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: true,
      isStarred: false,
      sender: "李总监",
      senderAvatar: "",
      actionRequired: true,
      category: "文档",
    },
    {
      id: "4",
      title: "系统维护通知",
      content: "系统将于本周六晚上22:00-24:00进行维护升级，期间可能影响正常使用。",
      type: "system",
      priority: "high",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      isStarred: false,
      sender: "系统管理员",
      senderAvatar: "",
      actionRequired: false,
      category: "系统",
    },
    {
      id: "5",
      title: "公司年会通知",
      content: "2025年公司年会将于12月28日举行，请各部门做好准备工作。",
      type: "announcement",
      priority: "medium",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      isStarred: true,
      sender: "人事部",
      senderAvatar: "",
      actionRequired: false,
      category: "公告",
    },
    {
      id: "6",
      title: "任务分配通知",
      content: "您被分配了新的任务：完成用户界面设计评审，截止时间为明天下午5点。",
      type: "system",
      priority: "urgent",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: false,
      isStarred: false,
      sender: "项目管理系统",
      senderAvatar: "",
      actionRequired: true,
      category: "任务",
    },
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    meetingReminders: true,
    documentUpdates: false,
    systemAlerts: true,
  })

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-5 h-5 text-blue-600" />
      case "meeting":
        return <Calendar className="w-5 h-5 text-blue-600" />
      case "document":
        return <FileText className="w-5 h-5 text-blue-600" />
      case "system":
        return <Settings className="w-5 h-5 text-blue-600" />
      case "announcement":
        return <Bell className="w-5 h-5 text-blue-600" />
      default:
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getPriorityIcon = (priority: Notification["priority"]) => {
    switch (priority) {
      case "urgent":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "high":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "medium":
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getPriorityText = (priority: Notification["priority"]) => {
    switch (priority) {
      case "urgent":
        return "紧急"
      case "high":
        return "重要"
      case "medium":
        return "普通"
      default:
        return "一般"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "刚刚"
    if (minutes < 60) return `${minutes}分钟前`
    if (hours < 24) return `${hours}小时前`
    if (days < 7) return `${days}天前`
    return date.toLocaleDateString("zh-CN")
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAsStarred = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isStarred: !notif.isStarred } : notif)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "unread" && !notif.isRead) ||
      (selectedFilter === "starred" && notif.isStarred) ||
      (selectedFilter === "action" && notif.actionRequired) ||
      notif.type === selectedFilter

    return matchesSearch && matchesFilter
  })

  const unreadCount = notifications.filter((notif) => !notif.isRead).length
  const starredCount = notifications.filter((notif) => notif.isStarred).length
  const actionRequiredCount = notifications.filter((notif) => notif.actionRequired).length

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <Bell className="w-8 h-8 mr-3 text-blue-600" />
            通知中心
          </h1>
          <p className="text-slate-600 mt-1">管理您的所有通知和提醒</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Check className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            全部已读
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Settings className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            通知设置
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-600" />
              全部通知
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
            <p className="text-sm text-muted-foreground">总通知数量</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-blue-600" />
              未读通知
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
            <p className="text-sm text-muted-foreground">需要查看</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Star className="w-5 h-5 mr-2 text-blue-600" />
              重要通知
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{starredCount}</div>
            <p className="text-sm text-muted-foreground">已标记重要</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
              待处理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{actionRequiredCount}</div>
            <p className="text-sm text-muted-foreground">需要操作</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 侧边栏 */}
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-blue-700">通知分类</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("all")}
            >
              <Bell className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              全部通知
              <Badge variant="secondary" className="ml-auto">
                {notifications.length}
              </Badge>
            </Button>
            <Button
              variant={selectedFilter === "unread" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("unread")}
            >
              <AlertTriangle className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              未读通知
              <Badge variant="destructive" className="ml-auto">
                {unreadCount}
              </Badge>
            </Button>
            <Button
              variant={selectedFilter === "starred" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("starred")}
            >
              <Star className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              重要通知
              <Badge variant="secondary" className="ml-auto">
                {starredCount}
              </Badge>
            </Button>
            <Button
              variant={selectedFilter === "action" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("action")}
            >
              <CheckCircle className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              待处理
              <Badge variant="secondary" className="ml-auto">
                {actionRequiredCount}
              </Badge>
            </Button>
            <div className="border-t pt-2 mt-4">
              <Button
                variant={selectedFilter === "message" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-300 hover:scale-105 group"
                onClick={() => setSelectedFilter("message")}
              >
                <MessageSquare className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                消息通知
              </Button>
              <Button
                variant={selectedFilter === "meeting" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-300 hover:scale-105 group"
                onClick={() => setSelectedFilter("meeting")}
              >
                <Calendar className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                会议提醒
              </Button>
              <Button
                variant={selectedFilter === "document" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-300 hover:scale-105 group"
                onClick={() => setSelectedFilter("document")}
              >
                <FileText className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                文档通知
              </Button>
              <Button
                variant={selectedFilter === "system" ? "default" : "ghost"}
                className="w-full justify-start transition-all duration-300 hover:scale-105 group"
                onClick={() => setSelectedFilter("system")}
              >
                <Settings className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                系统通知
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 通知列表 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 搜索和操作 */}
          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索通知..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-l-4 border-l-blue-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
                >
                  <Filter className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                  筛选
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 通知列表 */}
          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-base text-blue-700">通知列表</CardTitle>
              <CardDescription>
                {filteredNotifications.length} 条通知
                {selectedFilter !== "all" &&
                  ` · ${selectedFilter === "unread" ? "未读" : selectedFilter === "starred" ? "重要" : selectedFilter === "action" ? "待处理" : "已筛选"}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-1 p-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-l-4 border-l-blue-500 p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105 ${
                        !notification.isRead ? "bg-blue-50" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h4
                                className={`font-medium ${!notification.isRead ? "text-slate-900" : "text-slate-700"}`}
                              >
                                {notification.title}
                              </h4>
                              {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Badge
                                className={`text-xs ${getPriorityColor(notification.priority)} flex items-center space-x-1`}
                              >
                                {getPriorityIcon(notification.priority)}
                                <span>{getPriorityText(notification.priority)}</span>
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsStarred(notification.id)}
                                className="p-1 transition-all duration-300 hover:scale-105 group"
                              >
                                <Star
                                  className={`w-4 h-4 group-hover:translate-x-1 transition-all duration-300 ${notification.isStarred ? "text-yellow-500 fill-current" : "text-gray-400"}`}
                                />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-3 leading-relaxed">{notification.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-xs text-slate-500">
                              <div className="flex items-center space-x-1">
                                <Avatar className="w-4 h-4">
                                  <AvatarImage src={notification.senderAvatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">{notification.sender.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{notification.sender}</span>
                              </div>
                              <span>·</span>
                              <span>{formatTime(notification.timestamp)}</span>
                              <span>·</span>
                              <Badge variant="outline" className="text-xs">
                                {notification.category}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              {notification.actionRequired && (
                                <Button
                                  size="sm"
                                  className="text-xs bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group"
                                >
                                  处理
                                </Button>
                              )}
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs transition-all duration-300 hover:scale-105 group"
                                >
                                  <Check className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                                  标记已读
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-xs text-red-600 hover:text-red-700 transition-all duration-300 hover:scale-105 group"
                              >
                                <X className="w-3 h-3 group-hover:translate-x-1 transition-all duration-300" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* 空状态 */}
          {filteredNotifications.length === 0 && (
            <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">没有找到通知</h3>
                <p className="text-slate-500 text-center">{searchQuery ? "尝试调整搜索条件" : "您已查看了所有通知"}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 通知设置 */}
      <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-base flex items-center text-blue-700">
            <Settings className="w-5 h-5 mr-2 text-blue-600" />
            通知设置
          </CardTitle>
          <CardDescription>管理您的通知偏好设置</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">邮件通知</h4>
                <p className="text-sm text-muted-foreground">接收邮件通知</p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">推送通知</h4>
                <p className="text-sm text-muted-foreground">浏览器推送通知</p>
              </div>
              <Switch
                checked={notificationSettings.pushNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings((prev) => ({ ...prev, pushNotifications: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">消息通知</h4>
                <p className="text-sm text-muted-foreground">新消息提醒</p>
              </div>
              <Switch
                checked={notificationSettings.messageNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings((prev) => ({ ...prev, messageNotifications: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">会议提醒</h4>
                <p className="text-sm text-muted-foreground">会议开始前提醒</p>
              </div>
              <Switch
                checked={notificationSettings.meetingReminders}
                onCheckedChange={(checked) =>
                  setNotificationSettings((prev) => ({ ...prev, meetingReminders: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">文档更新</h4>
                <p className="text-sm text-muted-foreground">文档变更通知</p>
              </div>
              <Switch
                checked={notificationSettings.documentUpdates}
                onCheckedChange={(checked) =>
                  setNotificationSettings((prev) => ({ ...prev, documentUpdates: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">系统警报</h4>
                <p className="text-sm text-muted-foreground">系统重要通知</p>
              </div>
              <Switch
                checked={notificationSettings.systemAlerts}
                onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, systemAlerts: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
