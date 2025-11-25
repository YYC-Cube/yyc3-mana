"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  Video,
  Phone,
  Users,
  Send,
  Paperclip,
  Smile,
  Search,
  Plus,
  Settings,
  Calendar,
  FileText,
  Mic,
  Share2,
  MoreHorizontal,
  Clock,
  CheckCheck,
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  type: "text" | "file" | "image" | "voice"
  isRead: boolean
  reactions?: { emoji: string; users: string[] }[]
}

interface ChatRoom {
  id: string
  name: string
  type: "direct" | "group" | "channel"
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline: boolean
  members: string[]
  description?: string
}

interface OnlineUser {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "busy" | "offline"
  department: string
  role: string
}

export function Communication() {
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 模拟聊天室数据
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: "1",
      name: "张经理",
      type: "direct",
      avatar: "",
      lastMessage: "明天的会议准备好了吗？",
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2,
      isOnline: true,
      members: ["user1", "user2"],
    },
    {
      id: "2",
      name: "产品开发团队",
      type: "group",
      avatar: "",
      lastMessage: "新功能的原型设计已完成",
      lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
      unreadCount: 5,
      isOnline: true,
      members: ["user1", "user2", "user3", "user4"],
      description: "产品开发相关讨论",
    },
    {
      id: "3",
      name: "李总监",
      type: "direct",
      avatar: "",
      lastMessage: "项目进度如何？",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 0,
      isOnline: false,
      members: ["user1", "user3"],
    },
    {
      id: "4",
      name: "全体员工",
      type: "channel",
      avatar: "",
      lastMessage: "公司年会通知已发布",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 1,
      isOnline: true,
      members: ["user1", "user2", "user3", "user4", "user5"],
      description: "公司重要通知和公告",
    },
  ])

  // 模拟消息数据
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "m1",
        senderId: "user2",
        senderName: "张经理",
        senderAvatar: "",
        content: "你好，关于明天的项目评审会议，你准备好了吗？",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        type: "text",
        isRead: true,
      },
      {
        id: "m2",
        senderId: "user1",
        senderName: "我",
        senderAvatar: "",
        content: "已经准备好了，PPT和相关文档都整理完毕。",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        type: "text",
        isRead: true,
      },
      {
        id: "m3",
        senderId: "user2",
        senderName: "张经理",
        senderAvatar: "",
        content: "很好，记得提前10分钟到会议室。",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: "text",
        isRead: false,
      },
    ],
    "2": [
      {
        id: "m4",
        senderId: "user3",
        senderName: "王设计师",
        senderAvatar: "",
        content: "新功能的原型设计已经完成，大家可以查看一下。",
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        type: "text",
        isRead: true,
      },
      {
        id: "m5",
        senderId: "user4",
        senderName: "李开发",
        senderAvatar: "",
        content: "看起来不错，我们什么时候开始开发？",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        type: "text",
        isRead: true,
      },
    ],
  })

  // 在线用户数据
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([
    {
      id: "user1",
      name: "张经理",
      avatar: "",
      status: "online",
      department: "销售部",
      role: "部门经理",
    },
    {
      id: "user2",
      name: "李总监",
      avatar: "",
      status: "busy",
      department: "技术部",
      role: "技术总监",
    },
    {
      id: "user3",
      name: "王设计师",
      avatar: "",
      status: "online",
      department: "设计部",
      role: "UI设计师",
    },
    {
      id: "user4",
      name: "陈开发",
      avatar: "",
      status: "away",
      department: "技术部",
      role: "前端开发",
    },
    {
      id: "user5",
      name: "赵产品",
      avatar: "",
      status: "online",
      department: "产品部",
      role: "产品经理",
    },
  ])

  // 公告数据
  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      title: "公司年会通知",
      content: "公司年会将于下月15日举行，请大家提前安排时间。",
      author: "人事部",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: "high",
    },
    {
      id: "2",
      title: "系统维护通知",
      content: "系统将于本周六晚上进行维护升级，预计2小时。",
      author: "技术部",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      priority: "medium",
    },
    {
      id: "3",
      title: "新员工入职欢迎",
      content: "欢迎新同事加入我们的团队！",
      author: "人事部",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      priority: "low",
    },
  ])

  // 发送消息
  const sendMessage = () => {
    if (!message.trim() || !activeChat) return

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: "user1",
      senderName: "我",
      senderAvatar: "",
      content: message,
      timestamp: new Date(),
      type: "text",
      isRead: true,
    }

    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }))

    // 更新聊天室最后消息
    setChatRooms((prev) =>
      prev.map((room) =>
        room.id === activeChat
          ? {
              ...room,
              lastMessage: message,
              lastMessageTime: new Date(),
            }
          : room,
      ),
    )

    setMessage("")
    scrollToBottom()
  }

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // 获取状态颜色
  const getStatusColor = (status: OnlineUser["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  // 获取状态文本
  const getStatusText = (status: OnlineUser["status"]) => {
    switch (status) {
      case "online":
        return "在线"
      case "away":
        return "离开"
      case "busy":
        return "忙碌"
      default:
        return "离线"
    }
  }

  // 格式化时间
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

  // 过滤聊天室
  const filteredChatRooms = chatRooms.filter((room) => room.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // 当前聊天室
  const currentChat = chatRooms.find((room) => room.id === activeChat)
  const currentMessages = activeChat ? messages[activeChat] || [] : []

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages])

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-blue-600" />
            沟通协作
          </h1>
          <p className="text-slate-600 mt-1">团队协作，高效沟通</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Video className="w-4 h-4 mr-2" />
            发起会议
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            创建群组
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
            <Users className="w-4 h-4 mr-2" />
            邀请成员
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              未读消息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {chatRooms.reduce((sum, room) => sum + room.unreadCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">需要处理的消息</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              在线用户
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {onlineUsers.filter((user) => user.status === "online").length}
            </div>
            <p className="text-sm text-muted-foreground">当前在线人数</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
              活跃群组
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {chatRooms.filter((room) => room.type === "group").length}
            </div>
            <p className="text-sm text-muted-foreground">参与的群组数量</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-600" />
              今日消息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">156</div>
            <p className="text-sm text-muted-foreground">今天发送的消息</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* 聊天列表 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">消息列表</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索聊天..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px]">
              <div className="space-y-1 p-4">
                {filteredChatRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-slate-50 ${
                      activeChat === room.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                    }`}
                    onClick={() => setActiveChat(room.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={room.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                            {room.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {room.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-800 truncate">{room.name}</h4>
                          <span className="text-xs text-slate-500">{formatTime(room.lastMessageTime)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-600 truncate">{room.lastMessage}</p>
                          {room.unreadCount > 0 && (
                            <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                              {room.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 聊天窗口 */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          {activeChat ? (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={currentChat?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                        {currentChat?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-slate-800">{currentChat?.name}</h3>
                      <p className="text-sm text-slate-600">
                        {currentChat?.type === "group"
                          ? `${currentChat.members.length} 名成员`
                          : currentChat?.isOnline
                            ? "在线"
                            : "离线"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {currentMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === "user1" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            msg.senderId === "user1"
                              ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                              : "bg-slate-100 text-slate-800 rounded-r-lg rounded-tl-lg"
                          } p-3`}
                        >
                          {msg.senderId !== "user1" && (
                            <p className="text-xs font-medium mb-1 opacity-70">{msg.senderName}</p>
                          )}
                          <p className="text-sm">{msg.content}</p>
                          <div className="flex items-center justify-end mt-1 space-x-1">
                            <span className="text-xs opacity-70">{formatTime(msg.timestamp)}</span>
                            {msg.senderId === "user1" && (
                              <CheckCheck className={`w-3 h-3 ${msg.isRead ? "text-blue-200" : "text-white"}`} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={isRecording ? "text-red-500" : ""}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="输入消息..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!message.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">选择一个聊天开始对话</p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* 信息面板 */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <Tabs defaultValue="online" className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="online">在线用户</TabsTrigger>
              <TabsTrigger value="announcements">公告</TabsTrigger>
            </TabsList>

            <TabsContent value="online" className="mt-4">
              <ScrollArea className="h-[500px]">
                <div className="space-y-3 p-4">
                  {onlineUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white text-sm">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                            user.status,
                          )}`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-800 text-sm truncate">{user.name}</h4>
                        <p className="text-xs text-slate-600 truncate">{user.department}</p>
                        <p className="text-xs text-slate-500">{getStatusText(user.status)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="announcements" className="mt-4">
              <ScrollArea className="h-[500px]">
                <div className="space-y-4 p-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-800 text-sm">{announcement.title}</h4>
                        <Badge
                          variant={
                            announcement.priority === "high"
                              ? "destructive"
                              : announcement.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {announcement.priority === "high"
                            ? "重要"
                            : announcement.priority === "medium"
                              ? "普通"
                              : "一般"}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{announcement.content}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{announcement.author}</span>
                        <span>{formatTime(announcement.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* 快速操作区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Video className="w-5 h-5 mr-2 text-blue-600" />
              视频会议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">快速发起或加入视频会议</p>
            <div className="space-y-2">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600">
                <Video className="w-4 h-4 mr-2" />
                发起会议
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                预约会议
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              文档协作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">创建和协作编辑文档</p>
            <div className="space-y-2">
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                <Plus className="w-4 h-4 mr-2" />
                新建文档
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                共享文档
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              团队管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">管理团队成员和权限</p>
            <div className="space-y-2">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                邀请成员
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                权限设置
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
