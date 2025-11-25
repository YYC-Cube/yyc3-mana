"use client"

// 操作管理器 - 管理全局操作和事件
class ActionManager {
  private listeners: Map<string, Array<(data?: any) => void>> = new Map()
  private actionQueue: Array<{ action: string; data: any; timestamp: number }> = []
  private isProcessing = false

  // 注册操作监听器
  on(action: string, callback: (data?: any) => void) {
    if (!this.listeners.has(action)) {
      this.listeners.set(action, [])
    }
    this.listeners.get(action)!.push(callback)
    console.log(`操作监听器已注册: ${action}`)
  }

  // 移除操作监听器
  off(action: string, callback: (data?: any) => void) {
    const listeners = this.listeners.get(action)
    if (listeners) {
      const index = listeners.indexOf(callback)
      if (index > -1) {
        listeners.splice(index, 1)
        console.log(`操作监听器已移除: ${action}`)
      }
    }
  }

  // 触发操作
  trigger(action: string, data?: any) {
    console.log(`触发操作: ${action}`, data)

    // 添加到操作队列
    this.actionQueue.push({
      action,
      data,
      timestamp: Date.now(),
    })

    // 处理操作队列
    this.processQueue()

    // 触发监听器
    const listeners = this.listeners.get(action)
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(data)
        } catch (error) {
          console.error(`操作监听器执行失败: ${action}`, error)
        }
      })
    }

    // 触发全局事件
    window.dispatchEvent(new CustomEvent(`action:${action}`, { detail: data }))
  }

  // 处理操作队列
  private async processQueue() {
    if (this.isProcessing) return

    this.isProcessing = true

    while (this.actionQueue.length > 0) {
      const { action, data } = this.actionQueue.shift()!

      try {
        await this.executeAction(action, data)
      } catch (error) {
        console.error(`操作执行失败: ${action}`, error)
      }

      // 添加小延迟避免阻塞
      await new Promise((resolve) => setTimeout(resolve, 10))
    }

    this.isProcessing = false
  }

  // 执行具体操作
  private async executeAction(action: string, data?: any) {
    switch (action) {
      case "schedule":
        this.handleScheduleAction(data)
        break
      case "profile":
        this.handleProfileAction(data)
        break
      case "settings":
        this.handleSettingsAction(data)
        break
      case "notifications":
        this.handleNotificationAction(data)
        break
      default:
        console.log(`未知操作: ${action}`, data)
    }
  }

  // 处理日程操作
  private handleScheduleAction(data: any) {
    console.log("处理日程操作:", data)

    if (data && data.title) {
      // 保存到本地存储
      const schedules = JSON.parse(localStorage.getItem("schedules") || "[]")
      schedules.push(data)
      localStorage.setItem("schedules", JSON.stringify(schedules))

      // 设置提醒
      if (data.date && data.time) {
        const scheduleTime = new Date(`${data.date}T${data.time}`)
        const now = new Date()
        const timeDiff = scheduleTime.getTime() - now.getTime()

        if (timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000) {
          // 24小时内
          setTimeout(
            () => {
              if ("Notification" in window && Notification.permission === "granted") {
                new Notification("会议提醒", {
                  body: `会议"${data.title}"即将开始`,
                  icon: "/images/yanyu-cloud-logo.png",
                })
              }
            },
            Math.max(0, timeDiff - 15 * 60 * 1000),
          ) // 提前15分钟提醒
        }
      }
    }
  }

  // 处理个人资料操作
  private handleProfileAction(data: any) {
    console.log("处理个人资料操作:", data)

    if (data) {
      // 更新全局用户状态
      window.dispatchEvent(new CustomEvent("userProfileUpdated", { detail: data }))
    }
  }

  // 处理设置操作
  private handleSettingsAction(data: any) {
    console.log("处理设置操作:", data)

    if (data) {
      // 应用设置
      if (data.interface?.darkMode !== undefined) {
        document.documentElement.setAttribute("data-theme", data.interface.darkMode ? "dark" : "light")
      }

      if (data.interface?.compactLayout !== undefined) {
        document.documentElement.classList.toggle("compact-layout", data.interface.compactLayout)
      }

      // 更新全局设置状态
      window.dispatchEvent(new CustomEvent("userSettingsUpdated", { detail: data }))
    }
  }

  // 处理通知操作
  private handleNotificationAction(data: any) {
    console.log("处理通知操作:", data)

    if (data && data.message) {
      // 显示通知
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("系统通知", {
          body: data.message,
          icon: "/images/yanyu-cloud-logo.png",
        })
      }
    }
  }

  // 获取操作历史
  getActionHistory() {
    return [...this.actionQueue]
  }

  // 清除操作历史
  clearHistory() {
    this.actionQueue = []
  }

  // 获取所有监听器
  getListeners() {
    const result: Record<string, number> = {}
    this.listeners.forEach((listeners, action) => {
      result[action] = listeners.length
    })
    return result
  }
}

// 创建全局实例
export const actionManager = new ActionManager()

// 设置默认操作
export const setupDefaultActions = () => {
  console.log("设置默认操作...")

  // 导航操作
  actionManager.on("navigate", (data) => {
    console.log("导航到:", data)
    if (data && data.module) {
      window.dispatchEvent(new CustomEvent("moduleChange", { detail: data.module }))
    }
  })

  // 数据操作
  actionManager.on("dataRefresh", () => {
    console.log("刷新数据")
    window.dispatchEvent(new CustomEvent("dataRefresh"))
  })

  actionManager.on("dataExport", (data) => {
    console.log("导出数据:", data)
    // 模拟导出
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `export_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  })

  // 系统操作
  actionManager.on("systemReset", () => {
    if (confirm("确定要重置系统吗？这将清除所有本地数据。")) {
      localStorage.clear()
      window.location.reload()
    }
  })

  console.log("默认操作设置完成")
}

// 导出便捷函数
export const triggerAction = (action: string, data?: any) => {
  actionManager.trigger(action, data)
}

export const onAction = (action: string, callback: (data?: any) => void) => {
  actionManager.on(action, callback)
}

export const offAction = (action: string, callback: (data?: any) => void) => {
  actionManager.off(action, callback)
}
