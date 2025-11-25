// 移动端推送通知服务
export class MobileNotificationService {
  private static instance: MobileNotificationService
  private permission: NotificationPermission = "default"
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null

  private constructor() {
    this.init()
  }

  static getInstance(): MobileNotificationService {
    if (!MobileNotificationService.instance) {
      MobileNotificationService.instance = new MobileNotificationService()
    }
    return MobileNotificationService.instance
  }

  private async init() {
    // 检查浏览器支持
    if (!("Notification" in window)) {
      console.warn("此浏览器不支持桌面通知")
      return
    }

    // 获取当前权限状态
    this.permission = Notification.permission

    // 只在生产环境或支持的开发环境中注册Service Worker
    if ("serviceWorker" in navigator && this.isServiceWorkerSupported()) {
      try {
        // 检查sw.js是否存在
        const swResponse = await fetch("/sw.js", { method: "HEAD" })
        if (swResponse.ok && swResponse.headers.get("content-type")?.includes("javascript")) {
          this.serviceWorkerRegistration = await navigator.serviceWorker.register("/sw.js")
          console.log("Service Worker注册成功")
        } else {
          console.log("Service Worker文件不可用，使用基础通知功能")
        }
      } catch (error) {
        console.log("Service Worker注册失败，使用基础通知功能:", error)
        // 不抛出错误，继续使用基础通知功能
      }
    }
  }

  // 添加Service Worker支持检测方法
  private isServiceWorkerSupported(): boolean {
    // 检查是否在支持的环境中
    const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    const isHTTPS = location.protocol === "https:"
    const isProduction = process.env.NODE_ENV === "production"

    return isLocalhost || isHTTPS || isProduction
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

  // 发送本地通知
  async sendNotification(options: {
    title: string
    body: string
    icon?: string
    badge?: string
    tag?: string
    data?: any
    actions?: Array<{
      action: string
      title: string
      icon?: string
    }>
  }) {
    if (this.permission !== "granted") {
      const granted = await this.requestPermission()
      if (!granted) {
        console.warn("通知权限被拒绝")
        return
      }
    }

    const notificationOptions: NotificationOptions = {
      body: options.body,
      icon: options.icon || "/images/yanyu-cloud-logo.png",
      badge: options.badge || "/images/yanyu-cloud-logo.png",
      tag: options.tag,
      data: options.data,
      requireInteraction: true,
      silent: false,
    }

    // 添加操作按钮（如果支持）
    if (options.actions && "actions" in Notification.prototype) {
      notificationOptions.actions = options.actions
    }

    try {
      const notification = new Notification(options.title, notificationOptions)

      notification.onclick = (event) => {
        event.preventDefault()
        window.focus()
        notification.close()

        // 处理点击事件
        if (options.data?.url) {
          window.location.href = options.data.url
        }
      }

      // 自动关闭通知
      setTimeout(() => {
        notification.close()
      }, 10000)

      return notification
    } catch (error) {
      console.error("发送通知失败:", error)
    }
  }

  // 发送推送通知（需要服务端支持）
  async sendPushNotification(options: {
    title: string
    body: string
    url?: string
    icon?: string
    badge?: string
  }) {
    if (!this.serviceWorkerRegistration) {
      console.warn("Service Worker未注册，无法发送推送通知")
      return
    }

    try {
      // 获取推送订阅
      let subscription = await this.serviceWorkerRegistration.pushManager.getSubscription()

      if (!subscription) {
        // 创建新的推送订阅
        subscription = await this.serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ""),
        })
      }

      // 发送到服务端
      await fetch("/api/push-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription,
          notification: options,
        }),
      })
    } catch (error) {
      console.error("发送推送通知失败:", error)
    }
  }

  // 工具方法：转换VAPID密钥
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  // 清除所有通知
  clearAllNotifications() {
    if ("serviceWorker" in navigator && this.serviceWorkerRegistration) {
      this.serviceWorkerRegistration.getNotifications().then((notifications) => {
        notifications.forEach((notification) => notification.close())
      })
    }
  }

  // 预设通知类型
  async sendTaskNotification(taskTitle: string, assignee: string) {
    return this.sendNotification({
      title: "新任务分配",
      body: `${assignee}，您有新的任务：${taskTitle}`,
      icon: "/images/task-icon.png",
      tag: "task-notification",
      data: { type: "task", url: "/tasks" },
      actions: [
        { action: "view", title: "查看任务" },
        { action: "dismiss", title: "稍后处理" },
      ],
    })
  }

  async sendApprovalNotification(approvalTitle: string, requester: string) {
    return this.sendNotification({
      title: "待审批事项",
      body: `${requester}提交了审批申请：${approvalTitle}`,
      icon: "/images/approval-icon.png",
      tag: "approval-notification",
      data: { type: "approval", url: "/approval" },
      actions: [
        { action: "approve", title: "立即审批" },
        { action: "dismiss", title: "稍后处理" },
      ],
    })
  }

  async sendMessageNotification(sender: string, message: string) {
    return this.sendNotification({
      title: `来自${sender}的消息`,
      body: message,
      icon: "/images/message-icon.png",
      tag: "message-notification",
      data: { type: "message", url: "/communication" },
      actions: [
        { action: "reply", title: "回复" },
        { action: "dismiss", title: "稍后查看" },
      ],
    })
  }

  async sendSystemNotification(title: string, message: string) {
    return this.sendNotification({
      title: `系统通知：${title}`,
      body: message,
      icon: "/images/system-icon.png",
      tag: "system-notification",
      data: { type: "system", url: "/dashboard" },
    })
  }
}

// 导出单例实例
export const mobileNotificationService = MobileNotificationService.getInstance()
