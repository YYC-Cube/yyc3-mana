// 错误日志记录系统
interface ErrorLog {
  id: string
  timestamp: number
  level: "error" | "warning" | "info" | "debug"
  category: string
  message: string
  details?: any
  stack?: string
  userAgent: string
  url: string
  userId?: string
  sessionId: string
  context?: Record<string, any>
}

class ErrorLogger {
  private logs: ErrorLog[] = []
  private maxLogs = 1000
  private sessionId: string
  private isEnabled = true

  constructor() {
    this.sessionId = this.generateSessionId()
    this.setupGlobalErrorHandlers()
  }

  // 生成会话ID
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // 设置全局错误处理器
  private setupGlobalErrorHandlers() {
    // 捕获未处理的JavaScript错误
    window.addEventListener("error", (event) => {
      this.error("JavaScript Error", event.message, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      })
    })

    // 捕获未处理的Promise拒绝
    window.addEventListener("unhandledrejection", (event) => {
      this.error("Unhandled Promise Rejection", String(event.reason), {
        promise: event.promise,
        stack: event.reason?.stack,
      })
    })

    // 捕获资源加载错误
    window.addEventListener(
      "error",
      (event) => {
        if (event.target !== window) {
          this.warning(
            "Resource Load Error",
            `Failed to load: ${(event.target as any)?.src || (event.target as any)?.href}`,
            {
              element: event.target?.tagName,
              source: (event.target as any)?.src || (event.target as any)?.href,
            },
          )
        }
      },
      true,
    )
  }

  // 记录错误
  error(message: string, details?: any, context?: Record<string, any>) {
    this.log("error", "application", message, details, context)
  }

  // 记录警告
  warning(message: string, details?: any, context?: Record<string, any>) {
    this.log("warning", "application", message, details, context)
  }

  // 记录信息
  info(message: string, details?: any, context?: Record<string, any>) {
    this.log("info", "application", message, details, context)
  }

  // 记录调试信息
  debug(message: string, details?: any, context?: Record<string, any>) {
    this.log("debug", "application", message, details, context)
  }

  // 记录性能问题
  performance(message: string, duration: number, context?: Record<string, any>) {
    this.log("warning", "performance", message, { duration }, context)
  }

  // 记录用户操作
  userAction(action: string, details?: any, context?: Record<string, any>) {
    this.log("info", "user-action", action, details, context)
  }

  // 记录系统事件
  systemEvent(event: string, details?: any, context?: Record<string, any>) {
    this.log("info", "system", event, details, context)
  }

  // 通用日志记录方法
  private log(
    level: ErrorLog["level"],
    category: string,
    message: string,
    details?: any,
    context?: Record<string, any>,
  ) {
    if (!this.isEnabled) return

    const errorLog: ErrorLog = {
      id: this.generateLogId(),
      timestamp: Date.now(),
      level,
      category,
      message,
      details,
      stack: new Error().stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId: this.sessionId,
      context: {
        ...context,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        memory: (performance as any).memory
          ? {
              used: (performance as any).memory.usedJSHeapSize,
              total: (performance as any).memory.totalJSHeapSize,
            }
          : undefined,
        connection: this.getConnectionInfo(),
      },
    }

    this.logs.unshift(errorLog)

    // 限制日志数量
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // 控制台输出
    this.consoleOutput(errorLog)

    // 发送到远程日志服务
    this.sendToRemoteLogger(errorLog)

    // 本地存储（用于离线时的日志保存）
    this.saveToLocalStorage(errorLog)
  }

  // 生成日志ID
  private generateLogId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // 获取网络连接信息
  private getConnectionInfo() {
    const connection =
      (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    return connection
      ? {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
        }
      : null
  }

  // 控制台输出
  private consoleOutput(log: ErrorLog) {
    const style = this.getConsoleStyle(log.level)
    const prefix = `[${log.level.toUpperCase()}] [${log.category}]`

    switch (log.level) {
      case "error":
        console.error(`${prefix} ${log.message}`, log.details, log.context)
        break
      case "warning":
        console.warn(`${prefix} ${log.message}`, log.details, log.context)
        break
      case "info":
        console.info(`${prefix} ${log.message}`, log.details, log.context)
        break
      case "debug":
        console.debug(`${prefix} ${log.message}`, log.details, log.context)
        break
    }
  }

  // 获取控制台样式
  private getConsoleStyle(level: ErrorLog["level"]): string {
    const styles = {
      error: "color: #dc2626; font-weight: bold;",
      warning: "color: #d97706; font-weight: bold;",
      info: "color: #2563eb; font-weight: bold;",
      debug: "color: #6b7280; font-weight: normal;",
    }
    return styles[level]
  }

  // 发送到远程日志服务
  private async sendToRemoteLogger(log: ErrorLog) {
    try {
      // 这里可以集成真实的日志服务，如 Sentry、LogRocket 等
      if (log.level === "error" || log.level === "warning") {
        // 只发送错误和警告到远程服务
        await fetch("/api/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(log),
        }).catch(() => {
          // 静默处理发送失败，避免循环错误
        })
      }
    } catch (error) {
      // 静默处理，避免日志记录本身产生错误
    }
  }

  // 保存到本地存储
  private saveToLocalStorage(log: ErrorLog) {
    try {
      const key = "error_logs"
      const existingLogs = JSON.parse(localStorage.getItem(key) || "[]")
      existingLogs.unshift(log)

      // 只保留最近的100条日志
      const trimmedLogs = existingLogs.slice(0, 100)
      localStorage.setItem(key, JSON.stringify(trimmedLogs))
    } catch (error) {
      // 本地存储失败时静默处理
    }
  }

  // 获取日志
  getLogs(filter?: {
    level?: ErrorLog["level"]
    category?: string
    limit?: number
    since?: number
  }): ErrorLog[] {
    let filteredLogs = [...this.logs]

    if (filter) {
      if (filter.level) {
        filteredLogs = filteredLogs.filter((log) => log.level === filter.level)
      }
      if (filter.category) {
        filteredLogs = filteredLogs.filter((log) => log.category === filter.category)
      }
      if (filter.since) {
        filteredLogs = filteredLogs.filter((log) => log.timestamp >= filter.since)
      }
      if (filter.limit) {
        filteredLogs = filteredLogs.slice(0, filter.limit)
      }
    }

    return filteredLogs
  }

  // 清除日志
  clearLogs() {
    this.logs = []
    localStorage.removeItem("error_logs")
  }

  // 导出日志
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  // 获取日志统计
  getLogStats() {
    const stats = {
      total: this.logs.length,
      error: 0,
      warning: 0,
      info: 0,
      debug: 0,
      categories: {} as Record<string, number>,
    }

    this.logs.forEach((log) => {
      stats[log.level]++
      stats.categories[log.category] = (stats.categories[log.category] || 0) + 1
    })

    return stats
  }

  // 启用/禁用日志记录
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }
}

// 导出日志记录器实例
export const errorLogger = new ErrorLogger()

// 便捷的日志记录函数
export const logError = (message: string, details?: any, context?: Record<string, any>) => {
  errorLogger.error(message, details, context)
}

export const logWarning = (message: string, details?: any, context?: Record<string, any>) => {
  errorLogger.warning(message, details, context)
}

export const logInfo = (message: string, details?: any, context?: Record<string, any>) => {
  errorLogger.info(message, details, context)
}

export const logDebug = (message: string, details?: any, context?: Record<string, any>) => {
  errorLogger.debug(message, details, context)
}

export const logUserAction = (action: string, details?: any, context?: Record<string, any>) => {
  errorLogger.userAction(action, details, context)
}

export const logPerformance = (message: string, duration: number, context?: Record<string, any>) => {
  errorLogger.performance(message, duration, context)
}
