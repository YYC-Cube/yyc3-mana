// 离线存储管理类
class OfflineStorageManager {
  private dbName = "zuoyou-ems-offline"
  private dbVersion = 1
  private db: IDBDatabase | null = null

  // 初始化数据库
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // 创建离线操作存储
        if (!db.objectStoreNames.contains("offlineActions")) {
          const actionStore = db.createObjectStore("offlineActions", {
            keyPath: "id",
            autoIncrement: true,
          })
          actionStore.createIndex("timestamp", "timestamp", { unique: false })
          actionStore.createIndex("type", "type", { unique: false })
          actionStore.createIndex("status", "status", { unique: false })
        }

        // 创建缓存数据存储
        if (!db.objectStoreNames.contains("cachedData")) {
          const dataStore = db.createObjectStore("cachedData", {
            keyPath: "key",
          })
          dataStore.createIndex("timestamp", "timestamp", { unique: false })
          dataStore.createIndex("module", "module", { unique: false })
        }

        // 创建同步日志存储
        if (!db.objectStoreNames.contains("syncLogs")) {
          const logStore = db.createObjectStore("syncLogs", {
            keyPath: "id",
            autoIncrement: true,
          })
          logStore.createIndex("timestamp", "timestamp", { unique: false })
          logStore.createIndex("status", "status", { unique: false })
        }
      }
    })
  }

  // 添加离线操作
  async addOfflineAction(action: OfflineAction): Promise<number> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["offlineActions"], "readwrite")
      const store = transaction.objectStore("offlineActions")

      const actionWithTimestamp = {
        ...action,
        timestamp: Date.now(),
        status: "pending" as const,
        retryCount: 0,
      }

      const request = store.add(actionWithTimestamp)

      request.onsuccess = () => resolve(request.result as number)
      request.onerror = () => reject(request.error)
    })
  }

  // 获取待同步的操作
  async getPendingActions(): Promise<OfflineActionWithId[]> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["offlineActions"], "readonly")
      const store = transaction.objectStore("offlineActions")
      const index = store.index("status")

      const request = index.getAll("pending")

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // 更新操作状态
  async updateActionStatus(id: number, status: "completed" | "failed", error?: string): Promise<void> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["offlineActions"], "readwrite")
      const store = transaction.objectStore("offlineActions")

      const getRequest = store.get(id)

      getRequest.onsuccess = () => {
        const action = getRequest.result
        if (action) {
          action.status = status
          action.completedAt = Date.now()
          if (error) action.error = error

          const updateRequest = store.put(action)
          updateRequest.onsuccess = () => resolve()
          updateRequest.onerror = () => reject(updateRequest.error)
        } else {
          reject(new Error("操作不存在"))
        }
      }

      getRequest.onerror = () => reject(getRequest.error)
    })
  }

  // 缓存数据
  async cacheData(key: string, data: any, module: string): Promise<void> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["cachedData"], "readwrite")
      const store = transaction.objectStore("cachedData")

      const cachedItem = {
        key,
        data,
        module,
        timestamp: Date.now(),
      }

      const request = store.put(cachedItem)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // 获取缓存数据
  async getCachedData(key: string): Promise<any> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["cachedData"], "readonly")
      const store = transaction.objectStore("cachedData")

      const request = store.get(key)

      request.onsuccess = () => {
        const result = request.result
        if (result) {
          // 检查数据是否过期（24小时）
          const isExpired = Date.now() - result.timestamp > 24 * 60 * 60 * 1000
          if (isExpired) {
            resolve(null)
          } else {
            resolve(result.data)
          }
        } else {
          resolve(null)
        }
      }

      request.onerror = () => reject(request.error)
    })
  }

  // 记录同步日志
  async addSyncLog(log: SyncLog): Promise<void> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["syncLogs"], "readwrite")
      const store = transaction.objectStore("syncLogs")

      const logWithTimestamp = {
        ...log,
        timestamp: Date.now(),
      }

      const request = store.add(logWithTimestamp)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // 清理过期数据
  async cleanup(): Promise<void> {
    if (!this.db) return

    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

    // 清理完成的操作
    const actionTransaction = this.db.transaction(["offlineActions"], "readwrite")
    const actionStore = actionTransaction.objectStore("offlineActions")
    const actionIndex = actionStore.index("timestamp")

    const actionRange = IDBKeyRange.upperBound(oneWeekAgo)
    actionIndex.openCursor(actionRange).onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        if (cursor.value.status === "completed") {
          cursor.delete()
        }
        cursor.continue()
      }
    }

    // 清理过期缓存
    const dataTransaction = this.db.transaction(["cachedData"], "readwrite")
    const dataStore = dataTransaction.objectStore("cachedData")
    const dataIndex = dataStore.index("timestamp")

    const dataRange = IDBKeyRange.upperBound(oneWeekAgo)
    dataIndex.openCursor(dataRange).onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        cursor.delete()
        cursor.continue()
      }
    }
  }
}

// 类型定义
interface OfflineAction {
  type: "create" | "update" | "delete"
  module: string
  endpoint: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  data?: any
  headers?: Record<string, string>
}

interface OfflineActionWithId extends OfflineAction {
  id: number
  timestamp: number
  status: "pending" | "completed" | "failed"
  retryCount: number
  completedAt?: number
  error?: string
}

interface SyncLog {
  action: string
  status: "success" | "error"
  message: string
  details?: any
}

export const offlineStorage = new OfflineStorageManager()
