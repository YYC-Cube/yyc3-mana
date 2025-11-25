// 数据冲突解决机制
interface ConflictData {
  id: string
  field: string
  clientValue: any
  serverValue: any
  clientTimestamp: number
  serverTimestamp: number
  type: "create" | "update" | "delete"
}

interface ConflictResolution {
  strategy: "client-wins" | "server-wins" | "merge" | "manual"
  resolver?: (clientData: any, serverData: any) => any
  priority?: number
}

class ConflictResolutionManager {
  private resolutionStrategies: Map<string, ConflictResolution> = new Map()

  // 注册冲突解决策略
  registerStrategy(dataType: string, resolution: ConflictResolution): void {
    this.resolutionStrategies.set(dataType, resolution)
  }

  // 检测数据冲突
  detectConflicts(clientData: any, serverData: any, dataType: string): ConflictData[] {
    const conflicts: ConflictData[] = []

    if (!serverData || !clientData) return conflicts

    // 检查时间戳冲突
    if (clientData.updatedAt && serverData.updatedAt) {
      const clientTime = new Date(clientData.updatedAt).getTime()
      const serverTime = new Date(serverData.updatedAt).getTime()

      if (Math.abs(clientTime - serverTime) > 1000) {
        // 1秒容差
        // 逐字段检查冲突
        Object.keys(clientData).forEach((field) => {
          if (field === "id" || field === "createdAt") return

          const clientValue = clientData[field]
          const serverValue = serverData[field]

          if (JSON.stringify(clientValue) !== JSON.stringify(serverValue)) {
            conflicts.push({
              id: clientData.id || serverData.id,
              field,
              clientValue,
              serverValue,
              clientTimestamp: clientTime,
              serverTimestamp: serverTime,
              type: "update",
            })
          }
        })
      }
    }

    return conflicts
  }

  // 解决冲突
  async resolveConflicts(conflicts: ConflictData[], dataType: string): Promise<any> {
    const strategy = this.resolutionStrategies.get(dataType) || {
      strategy: "server-wins" as const,
    }

    switch (strategy.strategy) {
      case "client-wins":
        return this.resolveClientWins(conflicts)

      case "server-wins":
        return this.resolveServerWins(conflicts)

      case "merge":
        return this.resolveMerge(conflicts, strategy.resolver)

      case "manual":
        return this.resolveManual(conflicts)

      default:
        return this.resolveServerWins(conflicts)
    }
  }

  // 客户端优先策略
  private resolveClientWins(conflicts: ConflictData[]): any {
    const resolved: any = {}

    conflicts.forEach((conflict) => {
      resolved[conflict.field] = conflict.clientValue
    })

    return {
      strategy: "client-wins",
      resolvedData: resolved,
      conflicts: conflicts.length,
    }
  }

  // 服务器优先策略
  private resolveServerWins(conflicts: ConflictData[]): any {
    const resolved: any = {}

    conflicts.forEach((conflict) => {
      resolved[conflict.field] = conflict.serverValue
    })

    return {
      strategy: "server-wins",
      resolvedData: resolved,
      conflicts: conflicts.length,
    }
  }

  // 智能合并策略
  private resolveMerge(conflicts: ConflictData[], resolver?: Function): any {
    const resolved: any = {}

    conflicts.forEach((conflict) => {
      if (resolver) {
        resolved[conflict.field] = resolver(conflict.clientValue, conflict.serverValue)
      } else {
        // 默认合并逻辑
        resolved[conflict.field] = this.defaultMerge(conflict)
      }
    })

    return {
      strategy: "merge",
      resolvedData: resolved,
      conflicts: conflicts.length,
    }
  }

  // 默认合并逻辑
  private defaultMerge(conflict: ConflictData): any {
    const { clientValue, serverValue, clientTimestamp, serverTimestamp } = conflict

    // 数组合并
    if (Array.isArray(clientValue) && Array.isArray(serverValue)) {
      const merged = [...new Set([...clientValue, ...serverValue])]
      return merged
    }

    // 对象合并
    if (typeof clientValue === "object" && typeof serverValue === "object") {
      return { ...serverValue, ...clientValue }
    }

    // 数值合并（取较大值）
    if (typeof clientValue === "number" && typeof serverValue === "number") {
      return Math.max(clientValue, serverValue)
    }

    // 字符串合并（取最新的）
    if (typeof clientValue === "string" && typeof serverValue === "string") {
      return clientTimestamp > serverTimestamp ? clientValue : serverValue
    }

    // 布尔值合并（取最新的）
    return clientTimestamp > serverTimestamp ? clientValue : serverValue
  }

  // 手动解决策略
  private async resolveManual(conflicts: ConflictData[]): Promise<any> {
    // 这里可以集成用户界面让用户手动选择
    return {
      strategy: "manual",
      conflicts,
      requiresUserInput: true,
    }
  }

  // 获取冲突摘要
  getConflictSummary(conflicts: ConflictData[]): {
    total: number
    byField: Record<string, number>
    byType: Record<string, number>
  } {
    const summary = {
      total: conflicts.length,
      byField: {} as Record<string, number>,
      byType: {} as Record<string, number>,
    }

    conflicts.forEach((conflict) => {
      // 按字段统计
      summary.byField[conflict.field] = (summary.byField[conflict.field] || 0) + 1

      // 按类型统计
      summary.byType[conflict.type] = (summary.byType[conflict.type] || 0) + 1
    })

    return summary
  }
}

// 导出单例
export const conflictResolver = new ConflictResolutionManager()

// 注册默认策略
conflictResolver.registerStrategy("customer", {
  strategy: "merge",
  resolver: (clientData: any, serverData: any) => ({
    ...serverData,
    ...clientData,
    // 特殊字段处理
    tags: [...new Set([...(serverData.tags || []), ...(clientData.tags || [])])],
    notes: (serverData.notes || "") + "\n" + (clientData.notes || ""),
  }),
})

conflictResolver.registerStrategy("task", {
  strategy: "client-wins", // 任务更新以客户端为准
  priority: 1,
})

conflictResolver.registerStrategy("approval", {
  strategy: "server-wins", // 审批状态以服务器为准
  priority: 2,
})
