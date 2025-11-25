// 移动端通知服务 - 备用实现（不依赖Service Worker）
export class MobileNotificationFallback {
  private static instance: MobileNotificationFallback
  private permission: NotificationPermission = "default"
  private notificationQueue: Array<{
    id: string
    title: string
    body: string
    timestamp: number
    read: boolean
    type: string
    data?: any
  }> = []

  private constructor() {
    this.init()
  }

  static getInstance(): MobileNotificationFallback {
    if (!MobileNotificationFallback.instance) {
      MobileNotificationFallback.instance = new MobileNotificationFallback()
    }
    return MobileNotificationFallback.instance
  }

  private async init() {
    // 检查浏览器支持
    if (!("Notification" in window)) {
      console.warn("此浏览器不支持桌面通知")
      return
    }

    // 获取当前权限状态
    this.permission = Notification.permission

    // 从本地存储恢复通知队列
    this.loadNotificationQueue()
  }

  // 请求通知权限
  async requestPermission(): Promise<boolean> {
    if (this.permission === "granted") {
      return true
    }

    if (this.permission === "denied") {
      return false
    }

    const permission = await Notification.requestPermission()
    this.permission = permission
    return permission === "granted"
  }

  // 发送本地通知（备用实现）
  async sendNotification(options: {
    title: string
    body: string
    icon?: string
    badge?: string
    tag?: string
    data?: any
    type?: string
  }) {
    // 添加到通知队列
    const notification = {
      id: Date.now().toString(),
      title: options.title,
      body: options.body,
      timestamp: Date.now(),
      read: false,
      type: options.type || "general",
      data: options.data,
    }

    this.notificationQueue.unshift(notification)
    this.saveNotificationQueue()

    // 如果有权限，发送浏览器通知
    if (this.permission === "granted") {
      try {
        const browserNotification = new Notification(options.title, {
          body: options.body,
          icon: options.icon || "/images/yanyu-cloud-logo.png",
          badge: options.badge || "/images/yanyu-cloud-logo.png",
          tag: options.tag,
          data: options.data,
          requireInteraction: false,
          silent: false,
        })

        browserNotification.onclick = (event) => {
          event.preventDefault()
          window.focus()
          browserNotification.close()

          // 标记为已读
          this.markAsRead(notification.id)

          // 处理点击事件
          if (options.data?.url) {
            window.location.href = options.data.url
          }
        }

        // 自动关闭通知
        setTimeout(() => {
          browserNotification.close()
        }, 8000)
      } catch (error) {
        console.error("发送浏览器通知失败:", error)
      }
    } else {
      // 尝试请求权限
      await this.requestPermission()
    }

    // 触发自定义事件，让UI组件可以监听
    window.dispatchEvent(
      new CustomEvent("mobile-notification", {
        detail: notification,
      }),
    )

    return notification
  }

  // 获取通知列表
  getNotifications(): Array<{
    id: string
    title: string
    body: string
    timestamp: number
    read: boolean
    type: string
    data?: any
  }> {
    return [...this.notificationQueue]
  }

  // 获取未读通知数量
  getUnreadCount(): number {
    return this.notificationQueue.filter((n) => !n.read).length
  }

  // 标记通知为已读
  markAsRead(notificationId: string) {
    const notification = this.notificationQueue.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.saveNotificationQueue()

      // 触发更新事件
      window.dispatchEvent(new CustomEvent("notification-read", { detail: notificationId }))
    }
  }

  // 标记所有通知为已读
  markAllAsRead() {
    this.notificationQueue.forEach((n) => (n.read = true))
    this.saveNotificationQueue()
    window.dispatchEvent(new CustomEvent("all-notifications-read"))
  }

  // 删除通知
  removeNotification(notificationId: string) {
    this.notificationQueue = this.notificationQueue.filter((n) => n.id !== notificationId)
    this.saveNotificationQueue()
    window.dispatchEvent(new CustomEvent("notification-removed", { detail: notificationId }))
  }

  // 清除所有通知
  clearAllNotifications() {
    this.notificationQueue = []
    this.saveNotificationQueue()
    window.dispatchEvent(new CustomEvent("all-notifications-cleared"))
  }

  // 保存通知队列到本地存储
  private saveNotificationQueue() {
    try {
      // 只保留最近100条通知
      const recentNotifications = this.notificationQueue.slice(0, 100)
      localStorage.setItem("mobile-notifications", JSON.stringify(recentNotifications))
    } catch (error) {
      console.error("保存通知队列失败:", error)
    }
  }

  // 从本地存储加载通知队列
  private loadNotificationQueue() {
    try {
      const saved = localStorage.getItem("mobile-notifications")
      if (saved) {
        this.notificationQueue = JSON.parse(saved)
      }
    } catch (error) {
      console.error("加载通知队列失败:", error)
      this.notificationQueue = []
    }
  }

  // 预设通知类型
  async sendTaskNotification(taskTitle: string, assignee: string) {
    return this.sendNotification({
      title: "新任务分配",
      body: `${assignee}，您有新的任务：${taskTitle}`,
      icon: "/images/task-icon.png",
      type: "task",
      data: { type: "task", url: "/tasks", taskTitle, assignee },
    })
  }

  async sendApprovalNotification(approvalTitle: string, requester: string) {
    return this.sendNotification({
      title: "待审批事项",
      body: `${requester}提交了审批申请：${approvalTitle}`,
      icon: "/images/approval-icon.png",
      type: "approval",
      data: { type: "approval", url: "/approval", approvalTitle, requester },
    })
  }

  async sendMessageNotification(sender: string, message: string) {
    return this.sendNotification({
      title: `来自${sender}的消息`,
      body: message,
      icon: "/images/message-icon.png",
      type: "message",
      data: { type: "message", url: "/communication", sender, message },
    })
  }

  async sendSystemNotification(title: string, message: string) {
    return this.sendNotification({
      title: `系统通知：${title}`,
      body: message,
      icon: "/images/system-icon.png",
      type: "system",
      data: { type: "system", url: "/dashboard", title, message },
    })
  }
}

// 导出单例实例
export const mobileNotificationFallback = MobileNotificationFallback.getInstance()
