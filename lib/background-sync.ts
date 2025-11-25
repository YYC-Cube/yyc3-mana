import { offlineStorage } from "./offline-storage"

// 后台同步管理器
class BackgroundSyncManager {
  private syncInProgress = false
  private syncInterval: NodeJS.Timeout | null = null
  private maxRetries = 3
  private retryDelay = 5000 // 5秒

  // 初始化后台同步
  async init(): Promise<void> {
    await offlineStorage.init()

    // 注册Service Worker同步事件
    if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready
        await registration.sync.register("background-sync")
        console.log("后台同步已注册")
      } catch (error) {
        console.error("后台同步注册失败:", error)
      }
    }

    // 监听网络状态变化
    window.addEventListener("online", () => {
      console.log("网络连接恢复，开始同步...")
      this.startSync()
    })

    // 定期同步（在线时）
    this.startPeriodicSync()
  }

  // 添加离线操作到队列
  async queueOfflineAction(action: {
    type: "create" | "update" | "delete"
    module: string
    endpoint: string
    method: "GET" | "POST" | "PUT" | "DELETE"
    data?: any
    headers?: Record<string, string>
  }): Promise<number> {
    try {
      const actionId = await offlineStorage.addOfflineAction(action)

      // 记录日志
      await offlineStorage.addSyncLog({
        action: `队列操作: ${action.type} ${action.module}`,
        status: "success",
        message: "操作已添加到离线队列",
        details: { actionId, endpoint: action.endpoint },
      })

      // 如果在线，立即尝试同步
      if (navigator.onLine) {
        this.startSync()
      }

      return actionId
    } catch (error) {
      console.error("添加离线操作失败:", error)
      throw error
    }
  }

  // 开始同步
  async startSync(): Promise<void> {
    if (this.syncInProgress || !navigator.onLine) {
      return
    }

    this.syncInProgress = true

    try {
      const pendingActions = await offlineStorage.getPendingActions()

      if (pendingActions.length === 0) {
        console.log("没有待同步的操作")
        return
      }

      console.log(`开始同步 ${pendingActions.length} 个操作...`)

      // 按时间戳排序，确保操作顺序
      pendingActions.sort((a, b) => a.timestamp - b.timestamp)

      let successCount = 0
      let failureCount = 0

      for (const action of pendingActions) {
        try {
          await this.syncAction(action)
          await offlineStorage.updateActionStatus(action.id, "completed")
          successCount++

          // 记录成功日志
          await offlineStorage.addSyncLog({
            action: `同步成功: ${action.type} ${action.module}`,
            status: "success",
            message: "操作同步完成",
            details: { actionId: action.id, endpoint: action.endpoint },
          })
        } catch (error) {
          console.error(`同步操作失败 (ID: ${action.id}):`, error)

          // 增加重试次数
          action.retryCount++

          if (action.retryCount >= this.maxRetries) {
            await offlineStorage.updateActionStatus(action.id, "failed", String(error))
            failureCount++

            // 记录失败日志
            await offlineStorage.addSyncLog({
              action: `同步失败: ${action.type} ${action.module}`,
              status: "error",
              message: "操作同步失败，已达到最大重试次数",
              details: { actionId: action.id, error: String(error), retryCount: action.retryCount },
            })
          } else {
            // 延迟重试
            setTimeout(() => {
              this.syncAction(action).catch(console.error)
            }, this.retryDelay * action.retryCount)
          }
        }
      }

      console.log(`同步完成: 成功 ${successCount}, 失败 ${failureCount}`)

      // 发送同步完成事件
      window.dispatchEvent(
        new CustomEvent("syncCompleted", {
          detail: { successCount, failureCount },
        }),
      )
    } catch (error) {
      console.error("同步过程出错:", error)
    } finally {
      this.syncInProgress = false
    }
  }

  // 同步单个操作
  private async syncAction(action: OfflineActionWithId): Promise<void> {
    const { endpoint, method, data, headers } = action

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    // 如果是GET请求，缓存响应数据
    if (method === "GET") {
      const responseData = await response.json()
      await offlineStorage.cacheData(endpoint, responseData, action.module)
    }
  }

  // 开始定期同步
  private startPeriodicSync(): void {
    // 每5分钟检查一次
    this.syncInterval = setInterval(
      () => {
        if (navigator.onLine) {
          this.startSync()
        }
      },
      5 * 60 * 1000,
    )
  }

  // 停止定期同步
  stopPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
    }
  }

  // 获取同步状态
  async getSyncStatus(): Promise<{
    pendingCount: number
    isOnline: boolean
    isSyncing: boolean
  }> {
    const pendingActions = await offlineStorage.getPendingActions()

    return {
      pendingCount: pendingActions.length,
      isOnline: navigator.onLine,
      isSyncing: this.syncInProgress,
    }
  }

  // 强制同步
  async forcSync(): Promise<void> {
    if (!navigator.onLine) {
      throw new Error("网络连接不可用")
    }

    await this.startSync()
  }

  // 清理数据
  async cleanup(): Promise<void> {
    await offlineStorage.cleanup()
  }
}

// 导出单例
export const backgroundSync = new BackgroundSyncManager()

// 类型定义
interface OfflineActionWithId {
  id: number
  type: "create" | "update" | "delete"
  module: string
  endpoint: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  data?: any
  headers?: Record<string, string>
  timestamp: number
  status: "pending" | "completed" | "failed"
  retryCount: number
  completedAt?: number
  error?: string
}
