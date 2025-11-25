interface NotificationData {
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
  data?: any
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  messageNotifications: boolean
  meetingReminders: boolean
  documentUpdates: boolean
  systemAlerts: boolean
  soundEnabled: boolean
  vibrationEnabled: boolean
}

class NotificationService {
  private notifications: Map<string, NotificationData> = new Map()
  private settings: NotificationSettings
  private listeners: Map<string, Function[]> = new Map()
  private permission: NotificationPermission = "default"

  constructor() {
    this.settings = {
      emailNotifications: true,
      pushNotifications: true,
      messageNotifications: true,
      meetingReminders: true,
      documentUpdates: false,
      systemAlerts: true,
      soundEnabled: true,
      vibrationEnabled: true,
    }

    this.initializeNotifications()
  }

  private async initializeNotifications() {
    // 请求通知权限
    if ("Notification" in window) {
      this.permission = await Notification.requestPermission()
    }

    // 初始化示例通知
    this.addSampleNotifications()
  }

  private addSampleNotifications() {
    const sampleNotifications: Omit<NotificationData, "id">[] = [
      {
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
    ]

    sampleNotifications.forEach((notif) => {
      const id = this.generateId()
      this.notifications.set(id, { ...notif, id })
    })
  }

  // 创建通知
  async createNotification(data: Omit<NotificationData, "id" | "timestamp" | "isRead" | "isStarred">): Promise<string> {
    const notification: NotificationData = {
      ...data,
      id: this.generateId(),
      timestamp: new Date(),
      isRead: false,
      isStarred: false,
    }

    this.notifications.set(notification.id, notification)

    // 根据设置发送通知
    await this.processNotification(notification)

    // 通知监听器
    this.notifyListeners("notification:created", notification)

    return notification.id
  }

  // 处理通知
  private async processNotification(notification: NotificationData) {
    // 检查是否应该发送此类型的通知
    if (!this.shouldSendNotification(notification.type)) {
      return
    }

    // 发送浏览器通知
    if (this.settings.pushNotifications && this.permission === "granted") {
      await this.sendBrowserNotification(notification)
    }

    // 播放声音
    if (this.settings.soundEnabled) {
      this.playNotificationSound(notification.priority)
    }

    // 震动
    if (this.settings.vibrationEnabled && "navigator" in window && "vibrate" in navigator) {
      this.vibrateDevice(notification.priority)
    }
  }

  // 发送浏览器通知
  private async sendBrowserNotification(notification: NotificationData) {
    try {
      const browserNotification = new Notification(notification.title, {
        body: notification.content,
        icon: notification.senderAvatar || "/favicon.ico",
        badge: "/favicon.ico",
        tag: notification.id,
        requireInteraction: notification.priority === "urgent",
        silent: !this.settings.soundEnabled,
      })

      browserNotification.onclick = () => {
        // 处理点击事件
        this.handleNotificationClick(notification)
        browserNotification.close()
      }

      // 自动关闭通知
      setTimeout(() => {
        browserNotification.close()
      }, 5000)
    } catch (error) {
      console.error("发送浏览器通知失败:", error)
    }
  }

  // 播放通知声音
  private playNotificationSound(priority: NotificationData["priority"]) {
    try {
      const audio = new Audio()

      switch (priority) {
        case "urgent":
          audio.src = "/sounds/urgent.mp3"
          break
        case "high":
          audio.src = "/sounds/high.mp3"
          break
        default:
          audio.src = "/sounds/default.mp3"
          break
      }

      audio.volume = 0.5
      audio.play().catch(() => {
        // 忽略播放失败
      })
    } catch (error) {
      console.error("播放通知声音失败:", error)
    }
  }

  // 设备震动
  private vibrateDevice(priority: NotificationData["priority"]) {
    try {
      let pattern: number[]

      switch (priority) {
        case "urgent":
          pattern = [200, 100, 200, 100, 200]
          break
        case "high":
          pattern = [200, 100, 200]
          break
        default:
          pattern = [200]
          break
      }

      navigator.vibrate(pattern)
    } catch (error) {
      console.error("设备震动失败:", error)
    }
  }

  // 检查是否应该发送通知
  private shouldSendNotification(type: NotificationData["type"]): boolean {
    switch (type) {
      case "message":
        return this.settings.messageNotifications
      case "meeting":
        return this.settings.meetingReminders
      case "document":
        return this.settings.documentUpdates
      case "system":
      case "announcement":
        return this.settings.systemAlerts
      default:
        return true
    }
  }

  // 处理通知点击
  private handleNotificationClick(notification: NotificationData) {
    // 标记为已读
    this.markAsRead(notification.id)

    // 通知监听器
    this.notifyListeners("notification:clicked", notification)

    // 根据类型执行相应操作
    switch (notification.type) {
      case "message":
        // 跳转到聊天页面
        window.location.href = `/communication/chat?id=${notification.data?.chatId}`
        break
      case "meeting":
        // 跳转到会议页面
        window.location.href = `/communication/meetings?id=${notification.data?.meetingId}`
        break
      case "document":
        // 跳转到文档页面
        window.location.href = `/communication/documents?id=${notification.data?.documentId}`
        break
      default:
        // 跳转到通知中心
        window.location.href = "/communication/notifications"
        break
    }
  }

  // 获取所有通知
  getNotifications(filter?: {
    type?: NotificationData["type"]
    isRead?: boolean
    isStarred?: boolean
    priority?: NotificationData["priority"]
  }): NotificationData[] {
    let notifications = Array.from(this.notifications.values())

    if (filter) {
      if (filter.type) {
        notifications = notifications.filter((n) => n.type === filter.type)
      }
      if (filter.isRead !== undefined) {
        notifications = notifications.filter((n) => n.isRead === filter.isRead)
      }
      if (filter.isStarred !== undefined) {
        notifications = notifications.filter((n) => n.isStarred === filter.isStarred)
      }
      if (filter.priority) {
        notifications = notifications.filter((n) => n.priority === filter.priority)
      }
    }

    return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // 标记为已读
  markAsRead(id: string): boolean {
    const notification = this.notifications.get(id)
    if (notification) {
      notification.isRead = true
      this.notifications.set(id, notification)
      this.notifyListeners("notification:read", notification)
      return true
    }
    return false
  }

  // 标记所有为已读
  markAllAsRead(): number {
    let count = 0
    this.notifications.forEach((notification) => {
      if (!notification.isRead) {
        notification.isRead = true
        count++
      }
    })
    this.notifyListeners("notification:all_read", count)
    return count
  }

  // 切换收藏状态
  toggleStar(id: string): boolean {
    const notification = this.notifications.get(id)
    if (notification) {
      notification.isStarred = !notification.isStarred
      this.notifications.set(id, notification)
      this.notifyListeners("notification:starred", notification)
      return notification.isStarred
    }
    return false
  }

  // 删除通知
  deleteNotification(id: string): boolean {
    const notification = this.notifications.get(id)
    if (notification) {
      this.notifications.delete(id)
      this.notifyListeners("notification:deleted", notification)
      return true
    }
    return false
  }

  // 获取未读数量
  getUnreadCount(): number {
    return Array.from(this.notifications.values()).filter((n) => !n.isRead).length
  }

  // 获取收藏数量
  getStarredCount(): number {
    return Array.from(this.notifications.values()).filter((n) => n.isStarred).length
  }

  // 搜索通知
  searchNotifications(query: string): NotificationData[] {
    const lowerQuery = query.toLowerCase()
    return Array.from(this.notifications.values()).filter(
      (notification) =>
        notification.title.toLowerCase().includes(lowerQuery) ||
        notification.content.toLowerCase().includes(lowerQuery) ||
        notification.sender.toLowerCase().includes(lowerQuery),
    )
  }

  // 更新设置
  updateSettings(newSettings: Partial<NotificationSettings>): void {
    this.settings = { ...this.settings, ...newSettings }
    this.notifyListeners("settings:updated", this.settings)
  }

  // 获取设置
  getSettings(): NotificationSettings {
    return { ...this.settings }
  }

  // 清理旧通知
  cleanupOldNotifications(daysToKeep = 30): number {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)
    let deletedCount = 0

    this.notifications.forEach((notification, id) => {
      if (notification.timestamp < cutoffDate && notification.isRead) {
        this.notifications.delete(id)
        deletedCount++
      }
    })

    if (deletedCount > 0) {
      this.notifyListeners("notifications:cleaned", deletedCount)
    }

    return deletedCount
  }

  // 生成ID
  private generateId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
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
        console.error("通知监听器执行错误:", error)
      }
    })
  }

  // 创建快捷通知方法
  async notifyMessage(sender: string, content: string, chatId: string): Promise<string> {
    return this.createNotification({
      title: `来自 ${sender} 的新消息`,
      content,
      type: "message",
      priority: "medium",
      sender,
      senderAvatar: "",
      actionRequired: true,
      category: "消息",
      data: { chatId },
    })
  }

  async notifyMeeting(title: string, startTime: Date, meetingId: string): Promise<string> {
    const minutesUntil = Math.floor((startTime.getTime() - Date.now()) / (1000 * 60))
    return this.createNotification({
      title: "会议提醒",
      content: `${title} 将在 ${minutesUntil} 分钟后开始`,
      type: "meeting",
      priority: minutesUntil <= 15 ? "high" : "medium",
      sender: "系统通知",
      senderAvatar: "",
      actionRequired: true,
      category: "会议",
      data: { meetingId },
    })
  }

  async notifyDocument(title: string, author: string, documentId: string): Promise<string> {
    return this.createNotification({
      title: "文档更新",
      content: `${author} 更新了文档《${title}》`,
      type: "document",
      priority: "low",
      sender: author,
      senderAvatar: "",
      actionRequired: false,
      category: "文档",
      data: { documentId },
    })
  }

  async notifySystem(
    title: string,
    content: string,
    priority: NotificationData["priority"] = "medium",
  ): Promise<string> {
    return this.createNotification({
      title,
      content,
      type: "system",
      priority,
      sender: "系统管理员",
      senderAvatar: "",
      actionRequired: priority === "urgent" || priority === "high",
      category: "系统",
    })
  }
}

// 创建单例实例
export const notificationService = new NotificationService()

// 导出类型
export type { NotificationData, NotificationSettings }
