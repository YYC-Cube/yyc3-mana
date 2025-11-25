"use client"

// 通用按钮处理器
export class ButtonHandler {
  private static instance: ButtonHandler
  private handlers: Map<string, (data?: any) => void> = new Map()
  private actionHistory: Array<{ id: string; data: any; timestamp: number }> = []

  static getInstance(): ButtonHandler {
    if (!ButtonHandler.instance) {
      ButtonHandler.instance = new ButtonHandler()
    }
    return ButtonHandler.instance
  }

  // 注册按钮处理函数
  register(buttonId: string, handler: (data?: any) => void) {
    this.handlers.set(buttonId, handler)
    console.log(`按钮处理器已注册: ${buttonId}`)
  }

  // 执行按钮操作
  execute(buttonId: string, data?: any) {
    const handler = this.handlers.get(buttonId)
    if (handler) {
      console.log(`执行按钮操作: ${buttonId}`, data)
      try {
        handler(data)

        // 记录操作历史
        this.actionHistory.push({
          id: buttonId,
          data,
          timestamp: Date.now(),
        })

        // 限制历史记录数量
        if (this.actionHistory.length > 100) {
          this.actionHistory = this.actionHistory.slice(-50)
        }

        this.showSuccess(`操作"${buttonId}"执行成功`)
      } catch (error) {
        console.error(`按钮操作执行失败: ${buttonId}`, error)
        this.showError(`操作失败: ${error}`)
      }
    } else {
      console.warn(`未找到按钮处理器: ${buttonId}`)
      this.showError(`功能暂未实现: ${buttonId}`)
    }
  }

  // 批量注册处理器
  registerBatch(handlers: Record<string, (data?: any) => void>) {
    Object.entries(handlers).forEach(([id, handler]) => {
      this.register(id, handler)
    })
  }

  // 注销处理器
  unregister(buttonId: string) {
    if (this.handlers.has(buttonId)) {
      this.handlers.delete(buttonId)
      console.log(`按钮处理器已注销: ${buttonId}`)
    }
  }

  // 显示错误信息
  private showError(message: string) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("操作提示", {
        body: message,
        icon: "/images/yanyu-cloud-logo.png",
      })
    } else {
      alert(message)
    }
  }

  // 显示成功信息
  showSuccess(message: string) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("操作成功", {
        body: message,
        icon: "/images/yanyu-cloud-logo.png",
      })
    } else {
      console.log("成功:", message)
    }
  }

  // 获取所有已注册的处理器
  getRegisteredHandlers(): string[] {
    return Array.from(this.handlers.keys())
  }

  // 获取操作历史
  getActionHistory(): Array<{ id: string; data: any; timestamp: number }> {
    return [...this.actionHistory]
  }

  // 清除操作历史
  clearHistory() {
    this.actionHistory = []
  }

  // 检查处理器是否存在
  hasHandler(buttonId: string): boolean {
    return this.handlers.has(buttonId)
  }
}

// 导出单例实例
export const buttonHandler = ButtonHandler.getInstance()

// 预定义的通用操作
export const commonActions = {
  // 添加操作
  add: (type: string, data?: any) => {
    console.log(`添加${type}:`, data)

    // 触发相应的创建事件
    window.dispatchEvent(new CustomEvent(`create${type}`, { detail: data }))

    buttonHandler.showSuccess(`${type}添加成功`)
  },

  // 编辑操作
  edit: (type: string, data?: any) => {
    console.log(`编辑${type}:`, data)

    // 触发相应的编辑事件
    window.dispatchEvent(new CustomEvent(`edit${type}`, { detail: data }))

    buttonHandler.showSuccess(`${type}编辑成功`)
  },

  // 删除操作
  delete: (type: string, data?: any) => {
    if (confirm(`确定要删除这个${type}吗？`)) {
      console.log(`删除${type}:`, data)

      // 触发相应的删除事件
      window.dispatchEvent(new CustomEvent(`delete${type}`, { detail: data }))

      buttonHandler.showSuccess(`${type}删除成功`)
    }
  },

  // 导出操作
  export: (type: string, data?: any) => {
    console.log(`导出${type}:`, data)

    // 模拟导出过程
    const exportData = {
      type,
      data,
      timestamp: new Date().toISOString(),
      filename: `${type}_export_${Date.now()}.xlsx`,
    }

    // 触发导出事件
    window.dispatchEvent(new CustomEvent("dataExport", { detail: exportData }))

    buttonHandler.showSuccess(`${type}导出成功`)
  },

  // 分析操作
  analyze: (type: string, data?: any) => {
    console.log(`分析${type}:`, data)

    // 触发分析事件
    window.dispatchEvent(new CustomEvent(`analyze${type}`, { detail: data }))

    buttonHandler.showSuccess(`${type}分析完成`)
  },

  // 搜索操作
  search: (query: string, filters?: any) => {
    console.log(`搜索: ${query}`, filters)

    // 触发搜索事件
    window.dispatchEvent(
      new CustomEvent("globalSearch", {
        detail: { query, filters },
      }),
    )

    buttonHandler.showSuccess("搜索完成")
  },

  // 筛选操作
  filter: (type: string, value: string) => {
    console.log(`筛选${type}: ${value}`)

    // 触发筛选事件
    window.dispatchEvent(
      new CustomEvent("dataFilter", {
        detail: { type, value },
      }),
    )

    buttonHandler.showSuccess("筛选应用成功")
  },

  // 刷新操作
  refresh: (type: string) => {
    console.log(`刷新${type}`)

    // 触发刷新事件
    window.dispatchEvent(new CustomEvent(`refresh${type}`))

    buttonHandler.showSuccess(`${type}数据已刷新`)
  },

  // 同步操作
  sync: (type: string) => {
    console.log(`同步${type}`)

    // 触发同步事件
    window.dispatchEvent(new CustomEvent(`sync${type}`))

    buttonHandler.showSuccess(`${type}同步完成`)
  },

  // 备份操作
  backup: (type: string) => {
    console.log(`备份${type}`)

    // 触发备份事件
    window.dispatchEvent(new CustomEvent(`backup${type}`))

    buttonHandler.showSuccess(`${type}备份完成`)
  },

  // 恢复操作
  restore: (type: string, data?: any) => {
    if (confirm(`确定要恢复${type}吗？`)) {
      console.log(`恢复${type}:`, data)

      // 触发恢复事件
      window.dispatchEvent(new CustomEvent(`restore${type}`, { detail: data }))

      buttonHandler.showSuccess(`${type}恢复完成`)
    }
  },
}

// 初始化默认处理器
export const initializeDefaultHandlers = () => {
  buttonHandler.registerBatch({
    // 导航相关
    "nav-dashboard": () => window.dispatchEvent(new CustomEvent("navigateTo", { detail: "dashboard" })),
    "nav-tasks": () => window.dispatchEvent(new CustomEvent("navigateTo", { detail: "tasks" })),
    "nav-customers": () => window.dispatchEvent(new CustomEvent("navigateTo", { detail: "customers" })),
    "nav-analytics": () => window.dispatchEvent(new CustomEvent("navigateTo", { detail: "analytics" })),

    // 快速操作
    "quick-new-task": () => commonActions.add("任务"),
    "quick-new-customer": () => commonActions.add("客户"),
    "quick-new-project": () => commonActions.add("项目"),

    // 数据操作
    "data-export": (data) => commonActions.export("数据", data),
    "data-import": () => window.dispatchEvent(new CustomEvent("dataImport")),
    "data-backup": () => commonActions.backup("数据"),
    "data-restore": () => commonActions.restore("数据"),

    // 系统操作
    "system-refresh": () => commonActions.refresh("系统"),
    "system-sync": () => commonActions.sync("系统"),
    "system-settings": () => window.dispatchEvent(new CustomEvent("openSettings")),

    // 用户操作
    "user-profile": () => window.dispatchEvent(new CustomEvent("openProfile")),
    "user-logout": () => {
      if (confirm("确定要退出登录吗？")) {
        localStorage.clear()
        window.location.href = "/login"
      }
    },
  })
}
