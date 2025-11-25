interface ChatMessage {
  id: string
  chatId: string
  senderId: string
  senderName: string
  content: string
  type: "text" | "file" | "image" | "voice"
  timestamp: Date
  isRead: boolean
  reactions?: { emoji: string; userId: string }[]
}

interface ChatRoom {
  id: string
  name: string
  type: "direct" | "group" | "channel"
  participants: string[]
  lastMessage?: ChatMessage
  unreadCount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface ChatUser {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "busy" | "offline"
  lastSeen: Date
}

class ChatService {
  private messages: Map<string, ChatMessage[]> = new Map()
  private rooms: Map<string, ChatRoom> = new Map()
  private users: Map<string, ChatUser> = new Map()
  private listeners: Map<string, Function[]> = new Map()

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    // 初始化示例数据
    const sampleUsers: ChatUser[] = [
      {
        id: "user1",
        name: "张经理",
        avatar: "",
        status: "online",
        lastSeen: new Date(),
      },
      {
        id: "user2",
        name: "李总监",
        avatar: "",
        status: "busy",
        lastSeen: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        id: "user3",
        name: "王设计师",
        avatar: "",
        status: "online",
        lastSeen: new Date(),
      },
    ]

    sampleUsers.forEach((user) => this.users.set(user.id, user))

    const sampleRooms: ChatRoom[] = [
      {
        id: "room1",
        name: "产品开发团队",
        type: "group",
        participants: ["user1", "user2", "user3"],
        unreadCount: 0,
        isActive: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
    ]

    sampleRooms.forEach((room) => this.rooms.set(room.id, room))
  }

  // 发送消息
  async sendMessage(
    chatId: string,
    senderId: string,
    content: string,
    type: "text" | "file" | "image" | "voice" = "text",
  ): Promise<ChatMessage> {
    const user = this.users.get(senderId)
    if (!user) {
      throw new Error("用户不存在")
    }

    const message: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      chatId,
      senderId,
      senderName: user.name,
      content,
      type,
      timestamp: new Date(),
      isRead: false,
    }

    // 添加消息到聊天室
    const messages = this.messages.get(chatId) || []
    messages.push(message)
    this.messages.set(chatId, messages)

    // 更新聊天室信息
    const room = this.rooms.get(chatId)
    if (room) {
      room.lastMessage = message
      room.updatedAt = new Date()
      this.rooms.set(chatId, room)
    }

    // 通知监听器
    this.notifyListeners(`message:${chatId}`, message)
    this.notifyListeners("message:new", { chatId, message })

    return message
  }

  // 获取聊天室消息
  getMessages(chatId: string, limit = 50, offset = 0): ChatMessage[] {
    const messages = this.messages.get(chatId) || []
    return messages.slice(-limit - offset, -offset || undefined).reverse()
  }

  // 获取聊天室列表
  getChatRooms(userId: string): ChatRoom[] {
    return Array.from(this.rooms.values())
      .filter((room) => room.participants.includes(userId))
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  }

  // 创建聊天室
  async createChatRoom(
    name: string,
    type: ChatRoom["type"],
    participants: string[],
    creatorId: string,
  ): Promise<ChatRoom> {
    const room: ChatRoom = {
      id: `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      type,
      participants: [...participants, creatorId],
      unreadCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.rooms.set(room.id, room)
    this.messages.set(room.id, [])

    // 通知监听器
    this.notifyListeners("room:created", room)

    return room
  }

  // 加入聊天室
  async joinChatRoom(roomId: string, userId: string): Promise<boolean> {
    const room = this.rooms.get(roomId)
    if (!room) {
      throw new Error("聊天室不存在")
    }

    if (!room.participants.includes(userId)) {
      room.participants.push(userId)
      room.updatedAt = new Date()
      this.rooms.set(roomId, room)

      // 通知监听器
      this.notifyListeners(`room:joined:${roomId}`, { userId, room })
      return true
    }

    return false
  }

  // 离开聊天室
  async leaveChatRoom(roomId: string, userId: string): Promise<boolean> {
    const room = this.rooms.get(roomId)
    if (!room) {
      throw new Error("聊天室不存在")
    }

    const index = room.participants.indexOf(userId)
    if (index > -1) {
      room.participants.splice(index, 1)
      room.updatedAt = new Date()
      this.rooms.set(roomId, room)

      // 通知监听器
      this.notifyListeners(`room:left:${roomId}`, { userId, room })
      return true
    }

    return false
  }

  // 标记消息为已读
  async markAsRead(chatId: string, messageId: string, userId: string): Promise<boolean> {
    const messages = this.messages.get(chatId) || []
    const message = messages.find((msg) => msg.id === messageId)

    if (message && message.senderId !== userId) {
      message.isRead = true
      this.messages.set(chatId, messages)

      // 通知监听器
      this.notifyListeners(`message:read:${chatId}`, { messageId, userId })
      return true
    }

    return false
  }

  // 更新用户状态
  async updateUserStatus(userId: string, status: ChatUser["status"]): Promise<boolean> {
    const user = this.users.get(userId)
    if (user) {
      user.status = status
      user.lastSeen = new Date()
      this.users.set(userId, user)

      // 通知监听器
      this.notifyListeners("user:status", { userId, status })
      return true
    }

    return false
  }

  // 获取在线用户
  getOnlineUsers(): ChatUser[] {
    return Array.from(this.users.values()).filter((user) => user.status === "online")
  }

  // 搜索消息
  searchMessages(query: string, chatId?: string): ChatMessage[] {
    const allMessages: ChatMessage[] = []

    if (chatId) {
      const messages = this.messages.get(chatId) || []
      allMessages.push(...messages)
    } else {
      this.messages.forEach((messages) => {
        allMessages.push(...messages)
      })
    }

    return allMessages.filter((message) => message.content.toLowerCase().includes(query.toLowerCase()))
  }

  // 添加事件监听器
  addEventListener(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  // 移除事件监听器
  removeEventListener(event: string, callback: Function): void {
    const listeners = this.listeners.get(event)
    if (listeners) {
      const index = listeners.indexOf(callback)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  // 通知监听器
  private notifyListeners(event: string, data: any): void {
    const listeners = this.listeners.get(event) || []
    listeners.forEach((callback) => {
      try {
        callback(data)
      } catch (error) {
        console.error("事件监听器执行错误:", error)
      }
    })
  }

  // 获取聊天室信息
  getChatRoom(roomId: string): ChatRoom | undefined {
    return this.rooms.get(roomId)
  }

  // 获取用户信息
  getUser(userId: string): ChatUser | undefined {
    return this.users.get(userId)
  }

  // 添加消息反应
  async addReaction(chatId: string, messageId: string, emoji: string, userId: string): Promise<boolean> {
    const messages = this.messages.get(chatId) || []
    const message = messages.find((msg) => msg.id === messageId)

    if (message) {
      if (!message.reactions) {
        message.reactions = []
      }

      const existingReaction = message.reactions.find((r) => r.emoji === emoji)
      if (existingReaction) {
        if (!existingReaction.userId.includes(userId)) {
          existingReaction.userId = userId
        }
      } else {
        message.reactions.push({ emoji, userId })
      }

      this.messages.set(chatId, messages)

      // 通知监听器
      this.notifyListeners(`message:reaction:${chatId}`, { messageId, emoji, userId })
      return true
    }

    return false
  }

  // 移除消息反应
  async removeReaction(chatId: string, messageId: string, emoji: string, userId: string): Promise<boolean> {
    const messages = this.messages.get(chatId) || []
    const message = messages.find((msg) => msg.id === messageId)

    if (message && message.reactions) {
      const reactionIndex = message.reactions.findIndex((r) => r.emoji === emoji && r.userId === userId)

      if (reactionIndex > -1) {
        message.reactions.splice(reactionIndex, 1)
        this.messages.set(chatId, messages)

        // 通知监听器
        this.notifyListeners(`message:reaction:removed:${chatId}`, { messageId, emoji, userId })
        return true
      }
    }

    return false
  }

  // 获取未读消息数量
  getUnreadCount(chatId: string, userId: string): number {
    const messages = this.messages.get(chatId) || []
    return messages.filter((msg) => msg.senderId !== userId && !msg.isRead).length
  }

  // 清理旧消息
  async cleanupOldMessages(chatId: string, daysToKeep = 30): Promise<number> {
    const messages = this.messages.get(chatId) || []
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)

    const filteredMessages = messages.filter((msg) => msg.timestamp > cutoffDate)
    const removedCount = messages.length - filteredMessages.length

    this.messages.set(chatId, filteredMessages)

    return removedCount
  }
}

// 创建单例实例
export const chatService = new ChatService()

// 导出类型
export type { ChatMessage, ChatRoom, ChatUser }
