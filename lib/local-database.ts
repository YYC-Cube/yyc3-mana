"use client"

// IndexedDB 封装类
export class LocalDatabase {
  private dbName: string
  private version: number
  private db: IDBDatabase | null = null

  constructor(dbName = "EnterpriseDB", version = 1) {
    this.dbName = dbName
    this.version = version
  }

  // 初始化数据库
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => {
        reject(new Error(`数据库打开失败: ${request.error}`))
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // 创建对象存储
        this.createObjectStores(db)
      }
    })
  }

  // 创建对象存储
  private createObjectStores(db: IDBDatabase): void {
    // 客户数据存储
    if (!db.objectStoreNames.contains("customers")) {
      const customerStore = db.createObjectStore("customers", { keyPath: "id", autoIncrement: true })
      customerStore.createIndex("name", "name", { unique: false })
      customerStore.createIndex("email", "email", { unique: true })
      customerStore.createIndex("status", "status", { unique: false })
      customerStore.createIndex("createDate", "createDate", { unique: false })
    }

    // 任务数据存储
    if (!db.objectStoreNames.contains("tasks")) {
      const taskStore = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true })
      taskStore.createIndex("title", "title", { unique: false })
      taskStore.createIndex("status", "status", { unique: false })
      taskStore.createIndex("priority", "priority", { unique: false })
      taskStore.createIndex("assignee", "assignee", { unique: false })
      taskStore.createIndex("dueDate", "dueDate", { unique: false })
    }

    // 订单数据存储
    if (!db.objectStoreNames.contains("orders")) {
      const orderStore = db.createObjectStore("orders", { keyPath: "id", autoIncrement: true })
      orderStore.createIndex("customerId", "customerId", { unique: false })
      orderStore.createIndex("status", "status", { unique: false })
      orderStore.createIndex("orderDate", "orderDate", { unique: false })
      orderStore.createIndex("totalAmount", "totalAmount", { unique: false })
    }

    // 产品数据存储
    if (!db.objectStoreNames.contains("products")) {
      const productStore = db.createObjectStore("products", { keyPath: "id", autoIncrement: true })
      productStore.createIndex("name", "name", { unique: false })
      productStore.createIndex("category", "category", { unique: false })
      productStore.createIndex("price", "price", { unique: false })
      productStore.createIndex("stock", "stock", { unique: false })
    }

    // 用户数据存储
    if (!db.objectStoreNames.contains("users")) {
      const userStore = db.createObjectStore("users", { keyPath: "id", autoIncrement: true })
      userStore.createIndex("username", "username", { unique: true })
      userStore.createIndex("email", "email", { unique: true })
      userStore.createIndex("role", "role", { unique: false })
      userStore.createIndex("department", "department", { unique: false })
    }

    // 系统配置存储
    if (!db.objectStoreNames.contains("settings")) {
      const settingsStore = db.createObjectStore("settings", { keyPath: "key" })
      settingsStore.createIndex("category", "category", { unique: false })
    }

    // 日志存储
    if (!db.objectStoreNames.contains("logs")) {
      const logStore = db.createObjectStore("logs", { keyPath: "id", autoIncrement: true })
      logStore.createIndex("level", "level", { unique: false })
      logStore.createIndex("timestamp", "timestamp", { unique: false })
      logStore.createIndex("module", "module", { unique: false })
    }

    // 缓存存储
    if (!db.objectStoreNames.contains("cache")) {
      const cacheStore = db.createObjectStore("cache", { keyPath: "key" })
      cacheStore.createIndex("expiry", "expiry", { unique: false })
      cacheStore.createIndex("category", "category", { unique: false })
    }
  }

  // 通用添加方法
  async add<T>(storeName: string, data: T): Promise<number> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.add(data)

      request.onsuccess = () => {
        resolve(request.result as number)
      }

      request.onerror = () => {
        reject(new Error(`添加数据失败: ${request.error}`))
      }
    })
  }

  // 通用获取方法
  async get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = store.get(key)

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(new Error(`获取数据失败: ${request.error}`))
      }
    })
  }

  // 通用获取所有数据方法
  async getAll<T>(storeName: string, limit?: number): Promise<T[]> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = limit ? store.getAll(undefined, limit) : store.getAll()

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(new Error(`获取所有数据失败: ${request.error}`))
      }
    })
  }

  // 通用更新方法
  async update<T>(storeName: string, data: T): Promise<void> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.put(data)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error(`更新数据失败: ${request.error}`))
      }
    })
  }

  // 通用删除方法
  async delete(storeName: string, key: IDBValidKey): Promise<void> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error(`删除数据失败: ${request.error}`))
      }
    })
  }

  // 按索引查询
  async getByIndex<T>(storeName: string, indexName: string, value: IDBValidKey): Promise<T[]> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const index = store.index(indexName)
      const request = index.getAll(value)

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(new Error(`按索引查询失败: ${request.error}`))
      }
    })
  }

  // 范围查询
  async getByRange<T>(storeName: string, indexName: string, range: IDBKeyRange, limit?: number): Promise<T[]> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const index = store.index(indexName)
      const request = limit ? index.getAll(range, limit) : index.getAll(range)

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(new Error(`范围查询失败: ${request.error}`))
      }
    })
  }

  // 计数方法
  async count(storeName: string, query?: IDBValidKey | IDBKeyRange): Promise<number> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const request = query ? store.count(query) : store.count()

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(new Error(`计数失败: ${request.error}`))
      }
    })
  }

  // 清空存储
  async clear(storeName: string): Promise<void> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const request = store.clear()

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error(`清空存储失败: ${request.error}`))
      }
    })
  }

  // 批量操作
  async batchOperation<T>(
    storeName: string,
    operations: Array<{ type: "add" | "update" | "delete"; data?: T; key?: IDBValidKey }>,
  ): Promise<void> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      let completed = 0
      const total = operations.length

      if (total === 0) {
        resolve()
        return
      }

      const checkCompletion = () => {
        completed++
        if (completed === total) {
          resolve()
        }
      }

      operations.forEach((operation) => {
        let request: IDBRequest

        switch (operation.type) {
          case "add":
            request = store.add(operation.data!)
            break
          case "update":
            request = store.put(operation.data!)
            break
          case "delete":
            request = store.delete(operation.key!)
            break
          default:
            throw new Error(`不支持的操作类型: ${operation.type}`)
        }

        request.onsuccess = checkCompletion
        request.onerror = () => {
          reject(new Error(`批量操作失败: ${request.error}`))
        }
      })
    })
  }

  // 事务处理
  async transaction<T>(
    storeNames: string[],
    mode: IDBTransactionMode,
    callback: (stores: { [key: string]: IDBObjectStore }) => Promise<T>,
  ): Promise<T> {
    if (!this.db) throw new Error("数据库未初始化")

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeNames, mode)
      const stores: { [key: string]: IDBObjectStore } = {}

      storeNames.forEach((name) => {
        stores[name] = transaction.objectStore(name)
      })

      transaction.oncomplete = () => {
        // 事务完成后解析结果
      }

      transaction.onerror = () => {
        reject(new Error(`事务失败: ${transaction.error}`))
      }

      // 执行回调
      callback(stores).then(resolve).catch(reject)
    })
  }

  // 数据库信息
  async getInfo(): Promise<{
    name: string
    version: number
    stores: string[]
    size: number
  }> {
    if (!this.db) throw new Error("数据库未初始化")

    const stores = Array.from(this.db.objectStoreNames)
    let totalSize = 0

    // 估算数据库大小
    for (const storeName of stores) {
      const count = await this.count(storeName)
      totalSize += count
    }

    return {
      name: this.dbName,
      version: this.version,
      stores,
      size: totalSize,
    }
  }

  // 导出数据
  async exportData(): Promise<{ [storeName: string]: any[] }> {
    if (!this.db) throw new Error("数据库未初始化")

    const result: { [storeName: string]: any[] } = {}
    const stores = Array.from(this.db.objectStoreNames)

    for (const storeName of stores) {
      result[storeName] = await this.getAll(storeName)
    }

    return result
  }

  // 导入数据
  async importData(data: { [storeName: string]: any[] }): Promise<void> {
    if (!this.db) throw new Error("数据库未初始化")

    for (const [storeName, items] of Object.entries(data)) {
      if (this.db.objectStoreNames.contains(storeName)) {
        // 清空现有数据
        await this.clear(storeName)

        // 批量添加新数据
        const operations = items.map((item) => ({ type: "add" as const, data: item }))
        await this.batchOperation(storeName, operations)
      }
    }
  }

  // 关闭数据库
  close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  // 删除数据库
  static async deleteDatabase(dbName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(dbName)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error(`删除数据库失败: ${request.error}`))
      }

      request.onblocked = () => {
        reject(new Error("删除数据库被阻塞，请关闭所有相关页面"))
      }
    })
  }
}

// 数据库实例
export const localDB = new LocalDatabase()

// 数据类型定义
export interface Customer {
  id?: number
  name: string
  email: string
  phone: string
  company: string
  status: "active" | "inactive" | "potential"
  createDate: Date
  lastContact?: Date
  notes?: string
}

export interface Task {
  id?: number
  title: string
  description: string
  status: "todo" | "in-progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  dueDate: Date
  createDate: Date
  completedDate?: Date
  tags: string[]
  estimatedHours?: number
  actualHours?: number
}

export interface Order {
  id?: number
  customerId: number
  orderNumber: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  orderDate: Date
  totalAmount: number
  items: OrderItem[]
  shippingAddress: string
  notes?: string
}

export interface OrderItem {
  productId: number
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Product {
  id?: number
  name: string
  description: string
  category: string
  price: number
  stock: number
  sku: string
  images: string[]
  specifications: { [key: string]: string }
  createDate: Date
  updateDate: Date
}

export interface User {
  id?: number
  username: string
  email: string
  password: string
  role: "admin" | "manager" | "employee" | "viewer"
  department: string
  permissions: string[]
  createDate: Date
  lastLogin?: Date
  isActive: boolean
}

export interface SystemSetting {
  key: string
  value: any
  category: string
  description: string
  type: "string" | "number" | "boolean" | "object"
  updateDate: Date
}

export interface LogEntry {
  id?: number
  level: "debug" | "info" | "warn" | "error"
  message: string
  module: string
  timestamp: Date
  userId?: number
  metadata?: any
}

export interface CacheEntry {
  key: string
  value: any
  category: string
  expiry: Date
  createDate: Date
}
