"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Trash2,
  BookMarkedIcon as MarkAsRead,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface Notification {
  id: string
  type: "system" | "task" | "approval" | "message" | "alert"
  title: string
  content: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high" | "urgent"
  sender?: string
  actionRequired?: boolean
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "urgent" as any,
      title: "紧急采购申请待审批",
      content: "办公用品采购申请金额¥15,000，需要您的审批",
      timestamp: "2025-06-21 14:30",
      isRead: false,
      priority: "urgent",
      sender: "采购部",
      actionRequired: true,
    },
    {
      id: "2",
      type: "task",
      title: "任务即将到期",
      content: "客户满意度调研任务将在2小时后到期",
      timestamp: "2025-06-21 13:45",
      isRead: false,
      priority: "high",
      sender: "系统",
      actionRequired: true,
    },
    {
      id: "3",
      type: "message",
      title: "新消息提醒",
      content: "张经理发送了一条消息：关于下周会议安排",
      timestamp: "2025-06-21 12:20",
      isRead: false,
      priority: "medium",
      sender: "张经理",
    },
    {
      id: "4",
      type: "system",
      title: "系统维护通知",
      content: "系统将于今晚22:00-24:00进行维护升级",
      timestamp: "2025-06-21 10:15",
      isRead: true,
      priority: "medium",
      sender: "系统管理员",
    },
    {
      id: "5",
      type: "approval",
      title: "请假申请已批准",
      content: "您的年假申请已通过审批",
      timestamp: "2025-06-20 16:30",
      isRead: true,
      priority: "low",
      sender: "人事部",
    },
    {
      id: "6",
      type: "alert",
      title: "库存预警",
      content: "沙发系列库存不足，当前库存仅剩15件",
      timestamp: "2025-06-20 14:20",
      isRead: false,
      priority: "high",
      sender: "库存系统",
      actionRequired: true,
    },
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    approvalAlerts: true,
    systemUpdates: false,
    marketingMessages: false,
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "system":
        return <Settings className="w-4 h-4 text-blue-600" />
      case "task":
        return <Clock className="w-4 h-4 text-orange-600" />
      case "approval":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "message":
        return <MessageSquare className="w-4 h-4 text-purple-600" />
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "紧急"
      case "high":
        return "重要"
      case "medium":
        return "普通"
      case "low":
        return "一般"
      default:
        return "未知"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const urgentCount = notifications.filter((n) => n.priority === "urgent" && !n.isRead).length

  const handleSettingChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Bell className="w-8 h-8 mr-3 text-blue-600" />
            通知中心
          </h1>
          <p className="text-gray-600 mt-2">消息通知与提醒管理</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <MarkAsRead className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            全部已读
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Settings className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            通知设置
          </Button>
        </div>
      </div>

      {/* 通知统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">未读通知</CardTitle>
            <Bell className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{unreadCount}</div>
            <p className="text-xs text-blue-600">需要处理的消息</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">紧急通知</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
            <p className="text-xs text-blue-600">需要立即处理</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日通知</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {notifications.filter((n) => n.timestamp.includes("2025-06-21")).length}
            </div>
            <p className="text-xs text-blue-600">今天收到的消息</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待处理</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {notifications.filter((n) => n.actionRequired && !n.isRead).length}
            </div>
            <p className="text-xs text-blue-600">需要操作的事项</p>
          </CardContent>
        </Card>
      </div>

      {/* 通知列表 */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">全部通知</TabsTrigger>
          <TabsTrigger value="unread">未读 ({unreadCount})</TabsTrigger>
          <TabsTrigger value="urgent">紧急</TabsTrigger>
          <TabsTrigger value="settings">通知设置</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Bell className="w-5 h-5 mr-2" />
                所有通知
              </CardTitle>
              <CardDescription>按时间顺序显示所有通知消息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-l-4 border-l-blue-500 rounded-xl p-4 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 ${
                      !notification.isRead ? "bg-blue-50/80 border-blue-300" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3 flex-1">
                        {getTypeIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
                              {notification.title}
                            </h4>
                            <Badge className={getPriorityColor(notification.priority)}>
                              {getPriorityText(notification.priority)}
                            </Badge>
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-orange-600 border-orange-300">
                                需要处理
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{notification.timestamp}</span>
                            {notification.sender && <span>发送人: {notification.sender}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.isRead && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)} className="transition-all duration-300 hover:scale-105">
                            <MarkAsRead className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)} className="transition-all duration-300 hover:scale-105">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Bell className="w-5 h-5 mr-2" />
                未读通知
              </CardTitle>
              <CardDescription>显示所有未读的通知消息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((n) => !n.isRead)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="border-l-4 border-l-blue-500 rounded-xl p-4 bg-blue-50/80 backdrop-blur-sm shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3 flex-1">
                          {getTypeIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold">{notification.title}</h4>
                              <Badge className={getPriorityColor(notification.priority)}>
                                {getPriorityText(notification.priority)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.content}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>{notification.timestamp}</span>
                              {notification.sender && <span>发送人: {notification.sender}</span>}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white border-0 transition-all duration-300 hover:scale-105"
                        >
                          标记已读
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <Card className="border-l-4 border-l-red-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <AlertTriangle className="w-5 h-5 mr-2" />
                紧急通知
              </CardTitle>
              <CardDescription>需要立即处理的重要通知</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((n) => n.priority === "urgent" || n.priority === "high")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="border-l-4 border-l-red-500 rounded-xl p-4 bg-red-50/80 backdrop-blur-sm shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3 flex-1">
                          {getTypeIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-red-800">{notification.title}</h4>
                              <Badge className={getPriorityColor(notification.priority)}>
                                {getPriorityText(notification.priority)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.content}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>{notification.timestamp}</span>
                              {notification.sender && <span>发送人: {notification.sender}</span>}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 hover:scale-105"
                        >
                          立即处理
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Settings className="w-5 h-5 mr-2" />
                通知设置
              </CardTitle>
              <CardDescription>管理您的通知偏好和提醒设置</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <h4 className="font-medium">电子邮件通知</h4>
                          <p className="text-sm text-slate-500">接收系统发送的电子邮件通知</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onChange={() => handleSettingChange("emailNotifications")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <h4 className="font-medium">推送通知</h4>
                          <p className="text-sm text-slate-500">接收系统推送的消息通知</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onChange={() => handleSettingChange("pushNotifications")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-orange-600 mr-3" />
                        <div>
                          <h4 className="font-medium">任务提醒</h4>
                          <p className="text-sm text-slate-500">接收任务截止日期提醒</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.taskReminders}
                        onChange={() => handleSettingChange("taskReminders")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <h4 className="font-medium">审批提醒</h4>
                          <p className="text-sm text-slate-500">接收待审批事项提醒</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.approvalAlerts}
                        onChange={() => handleSettingChange("approvalAlerts")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Settings className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <h4 className="font-medium">系统更新</h4>
                          <p className="text-sm text-slate-500">接收系统更新通知</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.systemUpdates}
                        onChange={() => handleSettingChange("systemUpdates")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <MessageSquare className="w-5 h-5 text-purple-600 mr-3" />
                        <div>
                          <h4 className="font-medium">营销消息</h4>
                          <p className="text-sm text-slate-500">接收营销推广消息</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.marketingMessages}
                        onChange={() => handleSettingChange("marketingMessages")}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-3">通知声音设置</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">全部通知</h5>
                        <select className="mt-1 text-sm w-full">
                          <option>默认声音</option>
                          <option>清脆铃声</option>
                          <option>轻柔提醒</option>
                          <option>关闭声音</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">紧急通知</h5>
                        <select className="mt-1 text-sm w-full">
                          <option>紧急警报</option>
                          <option>默认声音</option>
                          <option>关闭声音</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">审批通知</h5>
                        <select className="mt-1 text-sm w-full">
                          <option>默认声音</option>
                          <option>轻柔提醒</option>
                          <option>关闭声音</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">取消</Button>
                  <Button variant="solid" className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105">
                    保存设置
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
