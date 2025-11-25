"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Send,
  Smile,
  Paperclip,
  Mic,
  MicOff,
  Phone,
  Video,
  Search,
  Settings,
  Users,
  Check,
  CheckCheck,
  Reply,
  Copy,
  Trash2,
  Edit,
  Heart,
  ThumbsUp,
  Laugh,
  MessageSquare,
} from "lucide-react"
import { chatService, type ChatMessage, type ChatRoom, type ChatUser } from "@/lib/chat-service"

interface RealTimeChatProps {
  currentUserId: string
  selectedRoomId?: string
  onRoomChange?: (roomId: string) => void
}

export function RealTimeChat({ currentUserId, selectedRoomId, onRoomChange }: RealTimeChatProps) {
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<ChatUser[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // 初始化数据
  useEffect(() => {
    loadRooms()
    loadOnlineUsers()

    // 监听新消息
    const handleNewMessage = (data: { chatId: string; message: ChatMessage }) => {
      if (data.chatId === currentRoom?.id) {
        setMessages((prev) => [...prev, data.message])
        scrollToBottom()
      }
      // 更新房间列表中的最后消息
      setRooms((prev) =>
        prev.map((room) =>
          room.id === data.chatId ? { ...room, lastMessage: data.message, updatedAt: new Date() } : room,
        ),
      )
    }

    chatService.addEventListener("message:new", handleNewMessage)

    return () => {
      chatService.removeEventListener("message:new", handleNewMessage)
    }
  }, [currentRoom?.id])

  // 选择房间时加载消息
  useEffect(() => {
    if (selectedRoomId) {
      const room = rooms.find((r) => r.id === selectedRoomId)
      if (room) {
        setCurrentRoom(room)
        loadMessages(selectedRoomId)
      }
    }
  }, [selectedRoomId, rooms])

  // 自动滚动到底部
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadRooms = () => {
    const userRooms = chatService.getChatRooms(currentUserId)
    setRooms(userRooms)

    if (userRooms.length > 0 && !selectedRoomId) {
      const firstRoom = userRooms[0]
      setCurrentRoom(firstRoom)
      loadMessages(firstRoom.id)
      onRoomChange?.(firstRoom.id)
    }
  }

  const loadMessages = (roomId: string) => {
    const roomMessages = chatService.getMessages(roomId)
    setMessages(roomMessages)
  }

  const loadOnlineUsers = () => {
    const users = chatService.getOnlineUsers()
    setOnlineUsers(users)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentRoom) return

    try {
      await chatService.sendMessage(currentRoom.id, currentUserId, messageInput.trim())
      setMessageInput("")
      inputRef.current?.focus()
    } catch (error) {
      console.error("发送消息失败:", error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleRoomSelect = (room: ChatRoom) => {
    setCurrentRoom(room)
    loadMessages(room.id)
    onRoomChange?.(room.id)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        // 这里可以上传音频文件并发送消息
        console.log("录音完成", blob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("录音失败:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const addReaction = async (messageId: string, emoji: string) => {
    if (!currentRoom) return

    try {
      await chatService.addReaction(currentRoom.id, messageId, emoji, currentUserId)
      // 重新加载消息以显示反应
      loadMessages(currentRoom.id)
    } catch (error) {
      console.error("添加反应失败:", error)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "今天"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "昨天"
    } else {
      return date.toLocaleDateString("zh-CN")
    }
  }

  const getMessageStatus = (message: ChatMessage) => {
    if (message.senderId === currentUserId) {
      return message.isRead ? (
        <CheckCheck className="w-3 h-3 text-blue-500" />
      ) : (
        <Check className="w-3 h-3 text-gray-400" />
      )
    }
    return null
  }

  const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex h-[600px] bg-white rounded-lg border overflow-hidden">
      {/* 左侧聊天室列表 */}
      <div className="w-80 border-r bg-gray-50">
        {/* 搜索栏 */}
        <div className="p-4 border-b bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="搜索聊天室..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* 聊天室列表 */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentRoom?.id === room.id ? "bg-blue-100 border border-blue-200" : "hover:bg-white"
                }`}
                onClick={() => handleRoomSelect(room)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${room.name.charAt(0)}`} />
                      <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {room.type === "group" && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{room.name}</h4>
                      {room.lastMessage && (
                        <span className="text-xs text-gray-500">{formatTime(room.lastMessage.timestamp)}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600 truncate">{room.lastMessage?.content || "暂无消息"}</p>
                      {room.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs h-5 min-w-5 px-1">
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

        {/* 在线用户 */}
        <div className="border-t bg-white p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">在线用户 ({onlineUsers.length})</h4>
          <div className="flex space-x-2">
            {onlineUsers.slice(0, 5).map((user) => (
              <div key={user.id} className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar || `/placeholder.svg?height=32&width=32&text=${user.name.charAt(0)}`} />
                  <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            ))}
            {onlineUsers.length > 5 && (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-600">+{onlineUsers.length - 5}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 右侧聊天区域 */}
      <div className="flex-1 flex flex-col">
        {currentRoom ? (
          <>
            {/* 聊天头部 */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${currentRoom.name.charAt(0)}`} />
                  <AvatarFallback>{currentRoom.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{currentRoom.name}</h3>
                  <p className="text-sm text-gray-500">
                    {currentRoom.type === "group" ? `${currentRoom.participants.length} 位成员` : "私聊"}
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
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 消息列表 */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const isOwn = message.senderId === currentUserId
                  const showDate =
                    index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

                  return (
                    <div key={message.id}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      )}

                      <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          {!isOwn && (
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32&text=${message.senderName.charAt(0)}`}
                              />
                              <AvatarFallback className="text-xs">{message.senderName.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}

                          <div
                            className={`relative group ${
                              isOwn ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                            } rounded-lg px-3 py-2 cursor-pointer`}
                            onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
                          >
                            {!isOwn && <p className="text-xs font-medium mb-1 opacity-70">{message.senderName}</p>}

                            <p className="text-sm break-words">{message.content}</p>

                            <div className="flex items-center justify-between mt-1">
                              <span className={`text-xs ${isOwn ? "text-blue-100" : "text-gray-500"}`}>
                                {formatTime(message.timestamp)}
                              </span>
                              {getMessageStatus(message)}
                            </div>

                            {/* 消息反应 */}
                            {message.reactions && message.reactions.length > 0 && (
                              <div className="flex space-x-1 mt-2">
                                {message.reactions.map((reaction, idx) => (
                                  <span key={idx} className="text-xs bg-white bg-opacity-20 rounded-full px-2 py-1">
                                    {reaction.emoji}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* 消息操作菜单 */}
                            {selectedMessage === message.id && (
                              <div
                                className={`absolute top-0 ${isOwn ? "right-full mr-2" : "left-full ml-2"} bg-white border rounded-lg shadow-lg p-1 z-10`}
                              >
                                <div className="flex space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => addReaction(message.id, "👍")}
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => addReaction(message.id, "❤️")}
                                  >
                                    <Heart className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => addReaction(message.id, "😂")}
                                  >
                                    <Laugh className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Reply className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                  {isOwn && (
                                    <>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* 输入区域 */}
            <div className="p-4 border-t bg-white">
              {isTyping && <div className="mb-2 text-sm text-gray-500">有人正在输入...</div>}

              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Textarea
                    ref={inputRef}
                    placeholder="输入消息..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[40px] max-h-32 resize-none"
                    rows={1}
                  />
                </div>

                <div className="flex items-center space-x-1">
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
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseLeave={stopRecording}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">选择一个聊天室</h3>
              <p className="text-gray-500">开始与团队成员交流</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
