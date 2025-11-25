import { performanceMonitor } from "./performance-monitor"
import { errorNotificationManager } from "@/components/error-notification-system"

// 同步服务管理器 - 统一管理所有同步相关服务
class SyncServiceManager {
  private static instance: SyncServiceManager
  private isInitialized = false
  private initPromise: Promise<void> | null = null
  private syncService: any = null

  private constructor() {}

  static getInstance(): SyncServiceManager {
    if (!SyncServiceManager.instance) {
      SyncServiceManager.instance = new SyncServiceManager()
    }
    return SyncServiceManager.instance
  }

  // 确保只初始化一次
  async ensureInitialized(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    if (this.initPromise) {
      return this.initPromise
    }

    this.initPromise = this.initialize()
    return this.initPromise
  }

  private async initialize(): Promise<void> {
    try {
      console.log("开始初始化同步服务...")

      const measureId = performanceMonitor.startMeasure("sync-service-init", "initialization")

      // 模拟同步服务初始化
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 创建模拟的同步服务
      this.syncService = {
        init: async () => {
          console.log("同步服务初始化完成")
        },
        getSyncStatistics: async () => ({
          pendingCount: 0,
          completedToday: 12,
          failedToday: 0,
          averageSyncTime: 150,
          conflictRate: 0.02,
        }),
        startIncrementalSync: async () => {
          console.log("开始增量同步")
          // 模拟同步过程
          await new Promise((resolve) => setTimeout(resolve, 500))

          // 发送同步完成事件
          window.dispatchEvent(
            new CustomEvent("incrementalSyncCompleted", {
              detail: { timestamp: Date.now() },
            }),
          )
        },
      }

      await this.syncService.init()

      performanceMonitor.endMeasure(measureId, {
        success: true,
        service: "sync-service-manager",
      })

      this.isInitialized = true
      console.log("同步服务管理器初始化完成")

      // 发送初始化完成事件
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("syncServiceReady"))
      }
    } catch (error) {
      console.error("同步服务初始化失败:", error)
      this.initPromise = null // 重置，允许重试

      if (typeof window !== "undefined") {
        errorNotificationManager.error(
          "同步服务初始化失败",
          "后台同步服务启动失败，部分功能可能不可用",
          String(error),
          [
            {
              label: "重试初始化",
              action: () => this.retryInitialization(),
              variant: "default",
            },
          ],
        )
      }

      throw error
    }
  }

  isReady(): boolean {
    return this.isInitialized
  }

  // 安全的同步服务获取
  async getSyncService() {
    await this.ensureInitialized()
    return this.syncService
  }

  // 添加重试初始化方法
  private async retryInitialization() {
    this.syncService = null
    this.isInitialized = false
    this.initPromise = null
    await this.ensureInitialized()
  }

  // 获取同步统计信息
  async getSyncStatistics() {
    try {
      const syncService = await this.getSyncService()
      return await syncService.getSyncStatistics()
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

  // 开始同步
  async startSync() {
    try {
      const syncService = await this.getSyncService()
      await syncService.startIncrementalSync()
    } catch (error) {
      console.error("启动同步失败:", error)
      throw error
    }
  }
}

// 创建单例实例
export const syncServiceManager = SyncServiceManager.getInstance()

// 同时提供默认导出以保持兼容性
export default syncServiceManager
