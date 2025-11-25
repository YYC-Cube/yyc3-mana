"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Video,
  Users,
  Calendar,
  FileText,
  Bell,
  Plus,
  Search,
  Settings,
  Info,
  Zap,
  Activity,
  Share2,
} from "lucide-react"

export function CommunicationModule() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  // 通信统计数据
  const communicationStats = [
    {
      title: "活跃对话",
      value: "24",
      change: "+12%",
      icon: MessageSquare,
      color: "blue",
    },
    {
      title: "视频会议",
      value: "8",
      change: "+25%",
      icon: Video,
      color: "blue",
    },
    {
      title: "在线用户",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "blue",
    },
    {
      title: "消息总数",
      value: "2.3K",
      change: "+15%",
      icon: Activity,
      color: "blue",
    },
  ]

  // 最近对话
  const recentChats = [
    {
      id: "1",
      name: "产品开发团队",
      lastMessage: "新功能的原型设计已经完成，请大家查看",
      time: "5分钟前",
      unread: 3,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "group",
      status: "online",
    },
    {
      id: "2",
      name: "张经理",
      lastMessage: "明天的会议时间需要调整一下",
      time: "15分钟前",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "direct",
      status: "online",
    },
    {
      id: "3",
      name: "客户服务组",
      lastMessage: "客户反馈的问题已经解决",
      time: "30分钟前",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "group",
      status: "away",
    },
    {
      id: "4",
      name: "李设计师",
      lastMessage: "UI设计稿已更新，请查收",
      time: "1小时前",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "direct",
      status: "online",
    },
    {
      id: "5",
      name: "技术支持",
      lastMessage: "系统维护将在今晚进行",
      time: "2小时前",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "group",
      status: "offline",
    },
  ]

  // 即将到来的会议
  const upcomingMeetings = [
    {
      id: "1",
      title: "产品评审会议",
      time: "14:00 - 15:30",
      participants: ["张三", "李四", "王五"],
      type: "video",
      status: "upcoming",
    },
    {
      id: "2",
      title: "客户需求讨论",
      time: "16:00 - 17:00",
      participants: ["陈经理", "客户代表"],
      type: "video",
      status: "upcoming",
    },
    {
      id: "3",
      title: "技术架构评审",
      time: "明天 09:00 - 10:30",
      participants: ["技术团队"],
      type: "video",
      status: "scheduled",
    },
  ]

  // 最新通知
  const notifications = [
    {
      id: "1",
      title: "系统更新通知",
      content: "系统将在今晚22:00进行更新维护",
      time: "10分钟前",
      type: "system",
      priority: "high",
    },
    {
      id: "2",
      title: "新消息提醒",
      content: "您有3条未读消息",
      time: "30分钟前",
      type: "message",
      priority: "medium",
    },
    {
      id: "3",
      title: "会议提醒",
      content: "产品评审会议将在30分钟后开始",
      time: "1小时前",
      type: "meeting",
      priority: "high",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "system":
        return <Settings className="w-4 h-4" />
      case "message":
        return <MessageSquare className="w-4 h-4" />
      case "meeting":
        return <Calendar className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-blue-600" />
            沟通协作
          </h1>
          <p className="text-gray-600 mt-2">统一的团队沟通和协作平台</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Search className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            搜索
          </Button>
          <Button
            variant="outline"
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Settings className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            设置
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            新建对话
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {communicationStats.map((stat, index) => (
          <Card
            key={index}
            className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change} 较上周</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 最近对话 */}
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <MessageSquare className="w-5 h-5 mr-2" />
              最近对话
            </CardTitle>
            <CardDescription>团队沟通和消息记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`border-l-4 border-l-blue-500 bg-blue-50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 ${
                    selectedChat === chat.id ? "ring-2 ring-blue-300" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-200 text-blue-700">{chat.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                            chat.status,
                          )}`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{chat.name}</h4>
                          {chat.type === "group" && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                              群组
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{chat.time}</p>
                      {chat.unread > 0 && <Badge className="bg-red-500 text-white text-xs mt-1">{chat.unread}</Badge>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="transition-all duration-300 hover:scale-105 bg-transparent group">
                <MessageSquare className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                查看所有对话
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 侧边栏 - 会议和通知 */}
        <div className="space-y-6">
          {/* 即将到来的会议 */}
          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Video className="w-5 h-5 mr-2" />
                即将到来的会议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="border-l-4 border-l-blue-500 bg-blue-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{meeting.title}</h4>
                      <Video className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{meeting.time}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {meeting.participants.slice(0, 3).map((participant, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-white">
                            <AvatarFallback className="text-xs bg-blue-200 text-blue-700">
                              {participant.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {meeting.participants.length > 3 && (
                          <div className="w-6 h-6 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{meeting.participants.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="h-6 px-2 text-xs bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:scale-105 group"
                      >
                        <Video className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-all duration-300" />
                        加入
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 最新通知 */}
          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Bell className="w-5 h-5 mr-2" />
                最新通知
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-l-4 border-l-blue-500 bg-blue-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(notification.type)}
                        <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                      </div>
                      <Badge className={getPriorityColor(notification.priority)}>
                        {notification.priority === "high" ? "高" : notification.priority === "medium" ? "中" : "低"}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{notification.content}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full transition-all duration-300 hover:scale-105 bg-transparent group"
                >
                  <Bell className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                  查看所有通知
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 快速操作面板 */}
      <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Zap className="w-5 h-5 mr-2" />
            快速操作
          </CardTitle>
          <CardDescription>常用的沟通和协作功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:scale-105 group">
              <MessageSquare className="w-6 h-6 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">发起聊天</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 group"
            >
              <Video className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">视频会议</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 group"
            >
              <FileText className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">文档协作</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 group"
            >
              <Share2 className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">文件共享</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 团队状态 */}
      <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Users className="w-5 h-5 mr-2" />
            团队在线状态
          </CardTitle>
          <CardDescription>查看团队成员的在线状态和活动情况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "张三", status: "online", activity: "正在编辑文档" },
              { name: "李四", status: "away", activity: "5分钟前活跃" },
              { name: "王五", status: "busy", activity: "会议中" },
              { name: "赵六", status: "online", activity: "正在聊天" },
            ].map((member, index) => (
              <div
                key={index}
                className="border-l-4 border-l-blue-500 bg-blue-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-200 text-blue-700">{member.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                        member.status,
                      )}`}
                    ></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{member.name}</h4>
                    <p className="text-xs text-gray-600">{member.activity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
