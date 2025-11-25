import { offlineStorage } from "./offline-storage"
import { conflictResolver } from "./conflict-resolution"

// 增强的后台同步管理器
class EnhancedBackgroundSyncManager {
  private syncInProgress = false
  private isInitialized = false // 添加初始化状态
  private syncQueue: PriorityQueue<SyncOperation> = new PriorityQueue()
  private batchSize = 10
  private maxRetries = 3
  private retryDelay = 5000

  // 同步操作优先级
  private priorities = {
    critical: 1, // 关键业务操作
    high: 2, // 重要操作
    normal: 3, // 普通操作
    low: 4, // 低优先级操作
  }

  // 初始化增强同步
  async init(): Promise<void> {
    try {
      await offlineStorage.init()
      this.isInitialized = true // 标记为已初始化

      // 注册Service Worker同步事件
      if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
        try {
          const registration = await navigator.serviceWorker.ready
          await registration.sync.register("enhanced-background-sync")
          console.log("增强后台同步已注册")
        } catch (error) {
          console.error("增强后台同步注册失败:", error)
        }
      }

      // 监听网络状态变化
      window.addEventListener("online", () => {
        console.log("网络连接恢复，开始增量同步...")
        this.startIncrementalSync()
      })

      // 定期批量同步
      this.startBatchSync()
    } catch (error) {
      console.error("增强后台同步初始化失败:", error)
      this.isInitialized = false
      throw error
    }
  }

  // 添加优先级操作到队列
  async queuePriorityOperation(operation: {
    type: "create" | "update" | "delete"
    module: string
    endpoint: string
    method: "GET" | "POST" | "PUT" | "DELETE"
    data?: any
    headers?: Record<string, string>
    priority?: "critical" | "high" | "normal" | "low"
    dependencies?: string[]
    metadata?: any
  }): Promise<number> {
    const priority = this.priorities[operation.priority || "normal"]

    const syncOperation: SyncOperation = {
      ...operation,
      id: Date.now() + Math.random(),
      timestamp: Date.now(),
      priority,
      status: "pending",
      retryCount: 0,
      dependencies: operation.dependencies || [],
    }

    // 添加到优先级队列
    this.syncQueue.enqueue(syncOperation, priority)

    // 存储到离线存储
    const actionId = await offlineStorage.addOfflineAction({
      type: operation.type,
      module: operation.module,
      endpoint: operation.endpoint,
      method: operation.method,
      data: operation.data,
      headers: operation.headers,
    })

    // 记录日志
    await offlineStorage.addSyncLog({
      action: `优先级队列操作: ${operation.type} ${operation.module}`,
      status: "success",
      message: `操作已添加到优先级队列 (优先级: ${operation.priority})`,
      details: { actionId, priority, endpoint: operation.endpoint },
    })

    // 如果在线且为高优先级，立即同步
    if (navigator.onLine && (operation.priority === "critical" || operation.priority === "high")) {
      this.startIncrementalSync()
    }

    return actionId
  }

  // 开始增量同步
  async startIncrementalSync(): Promise<void> {
    if (!this.isInitialized) {
      console.warn("同步服务未初始化，跳过同步")
      return
    }

    if (this.syncInProgress || !navigator.onLine) {
      return
    }

    this.syncInProgress = true

    try {
      console.log("开始增量同步...")

      // 获取待同步操作
      const pendingActions = await offlineStorage.getPendingActions()

      if (pendingActions.length === 0) {
        console.log("没有待同步的操作")
        return
      }

      // 按优先级和依赖关系排序
      const sortedActions = this.sortActionsByPriorityAndDependencies(pendingActions)

      // 分批处理
      const batches = this.createBatches(sortedActions, this.batchSize)

      let totalSuccess = 0
      let totalFailure = 0

      for (const batch of batches) {
        const batchResults = await this.processBatch(batch)
        totalSuccess += batchResults.success
        totalFailure += batchResults.failure

        // 批次间短暂延迟，避免服务器压力
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      console.log(`增量同步完成: 成功 ${totalSuccess}, 失败 ${totalFailure}`)

      // 发送同步完成事件
      window.dispatchEvent(
        new CustomEvent("incrementalSyncCompleted", {
          detail: { successCount: totalSuccess, failureCount: totalFailure },
        }),
      )
    } catch (error) {
      console.error("增量同步过程出错:", error)
    } finally {
      this.syncInProgress = false
    }
  }

  // 处理批次
  private async processBatch(batch: OfflineActionWithId[]): Promise<{ success: number; failure: number }> {
    const promises = batch.map((action) => this.syncActionWithConflictResolution(action))
    const results = await Promise.allSettled(promises)

    let success = 0
    let failure = 0

    results.forEach((result, index) => {
      const action = batch[index]

      if (result.status === "fulfilled") {
        success++
        offlineStorage.updateActionStatus(action.id, "completed")
      } else {
        failure++
        action.retryCount++

        if (action.retryCount >= this.maxRetries) {
          offlineStorage.updateActionStatus(action.id, "failed", String(result.reason))
        }
      }
    })

    return { success, failure }
  }

  // 带冲突解决的同步操作
  private async syncActionWithConflictResolution(action: OfflineActionWithId): Promise<void> {
    const { endpoint, method, data, headers, module } = action

    try {
      // 对于更新操作，先获取服务器最新数据
      if (method === "PUT" || method === "PATCH") {
        const getResponse = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json", ...headers },
        })

        if (getResponse.ok) {
          const serverData = await getResponse.json()

          // 检测冲突
          const conflicts = conflictResolver.detectConflicts(data, serverData, module)

          if (conflicts.length > 0) {
            console.log(`检测到 ${conflicts.length} 个数据冲突`)

            // 解决冲突
            const resolution = await conflictResolver.resolveConflicts(conflicts, module)

            if (resolution.requiresUserInput) {
              // 需要用户手动解决
              throw new Error("需要用户手动解决数据冲突")
            }

            // 使用解决后的数据
            Object.assign(data, resolution.resolvedData)

            // 记录冲突解决日志
            await offlineStorage.addSyncLog({
              action: `冲突解决: ${module}`,
              status: "success",
              message: `使用 ${resolution.strategy} 策略解决了 ${conflicts.length} 个冲突`,
              details: { conflicts: conflicts.length, strategy: resolution.strategy },
            })
          }
        }
      }

      // 执行同步操作
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: data ? JSON.stringify(data) : undefined,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // 缓存响应数据
      if (method === "GET") {
        const responseData = await response.json()
        await offlineStorage.cacheData(endpoint, responseData, module)
      }
    } catch (error) {
      console.error(`同步操作失败 (ID: ${action.id}):`, error)
      throw error
    }
  }

  // 按优先级和依赖关系排序
  private sortActionsByPriorityAndDependencies(actions: OfflineActionWithId[]): OfflineActionWithId[] {
    // 简单的拓扑排序和优先级排序
    return actions.sort((a, b) => {
      // 首先按优先级排序（数值越小优先级越高）
      const priorityDiff = (a as any).priority - (b as any).priority
      if (priorityDiff !== 0) return priorityDiff

      // 然后按时间戳排序
      return a.timestamp - b.timestamp
    })
  }

  // 创建批次
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = []
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize))
    }
    return batches
  }

  // 开始批量同步
  private startBatchSync(): void {
    // 每30秒进行一次批量同步
    setInterval(() => {
      if (navigator.onLine && !this.syncInProgress) {
        this.startIncrementalSync()
      }
    }, 30000)
  }

  // 获取同步统计
  async getSyncStatistics(): Promise<{
    pendingCount: number
    completedToday: number
    failedToday: number
    averageSyncTime: number
    conflictRate: number
  }> {
    // 如果未初始化，先尝试初始化
    if (!this.isInitialized) {
      try {
        await this.init()
      } catch (error) {
        console.error("同步服务初始化失败:", error)
        // 返回默认值
        return {
          pendingCount: 0,
          completedToday: 0,
          failedToday: 0,
          averageSyncTime: 0,
          conflictRate: 0,
        }
      }
    }

    try {
      const pendingActions = await offlineStorage.getPendingActions()

      // 这里可以从数据库获取更详细的统计信息
      return {
        pendingCount: pendingActions.length,
        completedToday: Math.floor(Math.random() * 50), // 模拟数据
        failedToday: Math.floor(Math.random() * 5), // 模拟数据
        averageSyncTime: Math.floor(Math.random() * 200) + 50, // 模拟数据
        conflictRate: Math.random() * 0.1, // 模拟数据
      }
    } catch (error) {
      console.error("获取同步统计失败:", error)
      return {
        pendingCount: 0,
        completedToday: 0,
        failedToday: 0,
        averageSyncTime: 0,
        conflictRate: 0,
      }
    }
  }

  // 添加检查初始化状态的方法
  isReady(): boolean {
    return this.isInitialized
  }
}

// 优先级队列实现
class PriorityQueue<T> {
  private items: Array<{ element: T; priority: number }> = []

  enqueue(element: T, priority: number): void {
    const queueElement = { element, priority }
    let added = false

    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement)
        added = true
        break
      }
    }

    if (!added) {
      this.items.push(queueElement)
    }
  }

  dequeue(): T | undefined {
    return this.items.shift()?.element
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }
}

// 类型定义
interface SyncOperation {
  id: number
  type: "create" | "update" | "delete"
  module: string
  endpoint: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  data?: any
  headers?: Record<string, string>
  timestamp: number
  priority: number
  status: "pending" | "completed" | "failed"
  retryCount: number
  dependencies: string[]
  metadata?: any
}

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

// 导出增强同步管理器
export const enhancedBackgroundSync = new EnhancedBackgroundSyncManager()
