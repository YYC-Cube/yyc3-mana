// 权限系统核心
interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
  conditions?: PermissionCondition[]
  metadata?: Record<string, any>
}

interface PermissionCondition {
  type: "time" | "ip" | "location" | "device" | "custom"
  operator: "equals" | "contains" | "in" | "between" | "greater" | "less"
  value: any
  field?: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  inherits?: string[]
  isSystem: boolean
  conditions?: RoleCondition[]
}

interface RoleCondition {
  type: "department" | "level" | "tenure" | "custom"
  operator: string
  value: any
}

interface User {
  id: string
  name: string
  email: string
  roles: string[]
  permissions: string[]
  department: string
  level: number
  metadata?: Record<string, any>
}

interface SecurityContext {
  user: User
  session: {
    id: string
    ip: string
    userAgent: string
    location?: string
    device: string
    startTime: Date
  }
  request: {
    resource: string
    action: string
    data?: any
    timestamp: Date
  }
}

class PermissionSystem {
  private permissions: Map<string, Permission> = new Map()
  private roles: Map<string, Role> = new Map()
  private users: Map<string, User> = new Map()
  private auditLog: SecurityAuditLog[] = []

  constructor() {
    this.initializeDefaultPermissions()
    this.initializeDefaultRoles()
  }

  // 初始化默认权限
  private initializeDefaultPermissions() {
    const defaultPermissions: Permission[] = [
      // 系统管理权限
      {
        id: "system.admin.full",
        name: "系统完全管理权限",
        description: "拥有系统所有操作权限",
        resource: "system",
        action: "*",
      },
      {
        id: "system.config.read",
        name: "系统配置查看",
        description: "查看系统配置信息",
        resource: "system.config",
        action: "read",
      },
      {
        id: "system.config.write",
        name: "系统配置修改",
        description: "修改系统配置信息",
        resource: "system.config",
        action: "write",
        conditions: [
          {
            type: "time",
            operator: "between",
            value: ["09:00", "18:00"],
          },
        ],
      },

      // 用户管理权限
      {
        id: "user.create",
        name: "创建用户",
        description: "创建新用户账户",
        resource: "user",
        action: "create",
      },
      {
        id: "user.read",
        name: "查看用户",
        description: "查看用户信息",
        resource: "user",
        action: "read",
      },
      {
        id: "user.update",
        name: "更新用户",
        description: "更新用户信息",
        resource: "user",
        action: "update",
      },
      {
        id: "user.delete",
        name: "删除用户",
        description: "删除用户账户",
        resource: "user",
        action: "delete",
        conditions: [
          {
            type: "custom",
            operator: "equals",
            value: true,
            field: "requireApproval",
          },
        ],
      },

      // 客户管理权限
      {
        id: "customer.create",
        name: "创建客户",
        description: "创建新客户记录",
        resource: "customer",
        action: "create",
      },
      {
        id: "customer.read",
        name: "查看客户",
        description: "查看客户信息",
        resource: "customer",
        action: "read",
      },
      {
        id: "customer.update",
        name: "更新客户",
        description: "更新客户信息",
        resource: "customer",
        action: "update",
      },
      {
        id: "customer.delete",
        name: "删除客户",
        description: "删除客户记录",
        resource: "customer",
        action: "delete",
      },
      {
        id: "customer.export",
        name: "导出客户数据",
        description: "导出客户数据",
        resource: "customer",
        action: "export",
        conditions: [
          {
            type: "ip",
            operator: "in",
            value: ["192.168.1.0/24", "10.0.0.0/8"],
          },
        ],
      },

      // 任务管理权限
      {
        id: "task.create",
        name: "创建任务",
        description: "创建新任务",
        resource: "task",
        action: "create",
      },
      {
        id: "task.read",
        name: "查看任务",
        description: "查看任务信息",
        resource: "task",
        action: "read",
      },
      {
        id: "task.update",
        name: "更新任务",
        description: "更新任务信息",
        resource: "task",
        action: "update",
      },
      {
        id: "task.assign",
        name: "分配任务",
        description: "分配任务给其他用户",
        resource: "task",
        action: "assign",
      },

      // 财务权限
      {
        id: "finance.invoice.create",
        name: "创建发票",
        description: "创建新发票",
        resource: "finance.invoice",
        action: "create",
      },
      {
        id: "finance.invoice.read",
        name: "查看发票",
        description: "查看发票信息",
        resource: "finance.invoice",
        action: "read",
      },
      {
        id: "finance.report.read",
        name: "查看财务报表",
        description: "查看财务报表",
        resource: "finance.report",
        action: "read",
      },

      // 数据分析权限
      {
        id: "analytics.dashboard.read",
        name: "查看分析仪表板",
        description: "查看数据分析仪表板",
        resource: "analytics.dashboard",
        action: "read",
      },
      {
        id: "analytics.export",
        name: "导出分析数据",
        description: "导出分析数据",
        resource: "analytics",
        action: "export",
      },
    ]

    defaultPermissions.forEach((permission) => {
      this.permissions.set(permission.id, permission)
    })
  }

  // 初始化默认角色
  private initializeDefaultRoles() {
    const defaultRoles: Role[] = [
      {
        id: "super_admin",
        name: "超级管理员",
        description: "拥有系统所有权限",
        permissions: ["system.admin.full"],
        isSystem: true,
      },
      {
        id: "system_admin",
        name: "系统管理员",
        description: "系统管理和配置权限",
        permissions: [
          "system.config.read",
          "system.config.write",
          "user.create",
          "user.read",
          "user.update",
          "user.delete",
        ],
        isSystem: true,
      },
      {
        id: "department_manager",
        name: "部门经理",
        description: "部门管理权限",
        permissions: [
          "user.read",
          "user.update",
          "customer.create",
          "customer.read",
          "customer.update",
          "task.create",
          "task.read",
          "task.update",
          "task.assign",
          "analytics.dashboard.read",
        ],
        isSystem: false,
        conditions: [
          {
            type: "level",
            operator: "greater",
            value: 5,
          },
        ],
      },
      {
        id: "sales_manager",
        name: "销售经理",
        description: "销售管理权限",
        permissions: [
          "customer.create",
          "customer.read",
          "customer.update",
          "customer.export",
          "task.create",
          "task.read",
          "task.update",
          "analytics.dashboard.read",
        ],
        isSystem: false,
      },
      {
        id: "finance_manager",
        name: "财务经理",
        description: "财务管理权限",
        permissions: [
          "finance.invoice.create",
          "finance.invoice.read",
          "finance.report.read",
          "customer.read",
          "analytics.dashboard.read",
          "analytics.export",
        ],
        isSystem: false,
      },
      {
        id: "employee",
        name: "普通员工",
        description: "基础操作权限",
        permissions: ["customer.read", "task.read", "task.update"],
        isSystem: false,
      },
    ]

    defaultRoles.forEach((role) => {
      this.roles.set(role.id, role)
    })
  }

  // 检查权限
  async checkPermission(context: SecurityContext, resource: string, action: string): Promise<boolean> {
    const startTime = performance.now()

    try {
      // 1. 获取用户所有权限
      const userPermissions = await this.getUserPermissions(context.user)

      // 2. 检查是否有匹配的权限
      const hasPermission = userPermissions.some((permission) => {
        return this.matchesPermission(permission, resource, action)
      })

      if (!hasPermission) {
        await this.logSecurityEvent({
          type: "permission_denied",
          userId: context.user.id,
          resource,
          action,
          timestamp: new Date(),
          context: {
            ip: context.session.ip,
            userAgent: context.session.userAgent,
          },
        })
        return false
      }

      // 3. 检查权限条件
      const applicablePermissions = userPermissions.filter((permission) =>
        this.matchesPermission(permission, resource, action),
      )

      for (const permission of applicablePermissions) {
        if (permission.conditions && permission.conditions.length > 0) {
          const conditionsMet = await this.evaluateConditions(permission.conditions, context)
          if (!conditionsMet) {
            await this.logSecurityEvent({
              type: "permission_condition_failed",
              userId: context.user.id,
              resource,
              action,
              timestamp: new Date(),
              context: {
                ip: context.session.ip,
                userAgent: context.session.userAgent,
                conditions: permission.conditions,
              },
            })
            return false
          }
        }
      }

      // 4. 记录成功的权限检查
      await this.logSecurityEvent({
        type: "permission_granted",
        userId: context.user.id,
        resource,
        action,
        timestamp: new Date(),
        context: {
          ip: context.session.ip,
          userAgent: context.session.userAgent,
          checkTime: performance.now() - startTime,
        },
      })

      return true
    } catch (error) {
      await this.logSecurityEvent({
        type: "permission_check_error",
        userId: context.user.id,
        resource,
        action,
        timestamp: new Date(),
        context: {
          error: error instanceof Error ? error.message : "Unknown error",
          ip: context.session.ip,
        },
      })
      return false
    }
  }

  // 获取用户所有权限
  private async getUserPermissions(user: User): Promise<Permission[]> {
    const permissions: Permission[] = []
    const processedRoles = new Set<string>()

    // 直接分配的权限
    for (const permissionId of user.permissions) {
      const permission = this.permissions.get(permissionId)
      if (permission) {
        permissions.push(permission)
      }
    }

    // 角色继承的权限
    const rolesToProcess = [...user.roles]

    while (rolesToProcess.length > 0) {
      const roleId = rolesToProcess.shift()!

      if (processedRoles.has(roleId)) continue
      processedRoles.add(roleId)

      const role = this.roles.get(roleId)
      if (!role) continue

      // 检查角色条件
      if (role.conditions && role.conditions.length > 0) {
        const conditionsMet = await this.evaluateRoleConditions(role.conditions, user)
        if (!conditionsMet) continue
      }

      // 添加角色权限
      for (const permissionId of role.permissions) {
        const permission = this.permissions.get(permissionId)
        if (permission && !permissions.find((p) => p.id === permission.id)) {
          permissions.push(permission)
        }
      }

      // 处理角色继承
      if (role.inherits) {
        rolesToProcess.push(...role.inherits)
      }
    }

    return permissions
  }

  // 匹配权限
  private matchesPermission(permission: Permission, resource: string, action: string): boolean {
    // 检查资源匹配
    if (permission.resource !== "*" && permission.resource !== resource) {
      // 支持通配符匹配
      if (!this.wildcardMatch(permission.resource, resource)) {
        return false
      }
    }

    // 检查操作匹配
    if (permission.action !== "*" && permission.action !== action) {
      return false
    }

    return true
  }

  // 通配符匹配
  private wildcardMatch(pattern: string, text: string): boolean {
    const regexPattern = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".")

    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(text)
  }

  // 评估权限条件
  private async evaluateConditions(conditions: PermissionCondition[], context: SecurityContext): Promise<boolean> {
    for (const condition of conditions) {
      const result = await this.evaluateCondition(condition, context)
      if (!result) return false
    }
    return true
  }

  // 评估单个条件
  private async evaluateCondition(condition: PermissionCondition, context: SecurityContext): Promise<boolean> {
    switch (condition.type) {
      case "time":
        return this.evaluateTimeCondition(condition, context)

      case "ip":
        return this.evaluateIpCondition(condition, context)

      case "location":
        return this.evaluateLocationCondition(condition, context)

      case "device":
        return this.evaluateDeviceCondition(condition, context)

      case "custom":
        return this.evaluateCustomCondition(condition, context)

      default:
        return false
    }
  }

  // 时间条件评估
  private evaluateTimeCondition(condition: PermissionCondition, context: SecurityContext): boolean {
    const now = new Date()

    switch (condition.operator) {
      case "between":
        if (Array.isArray(condition.value) && condition.value.length === 2) {
          const [start, end] = condition.value
          const currentTime = now.getHours() * 60 + now.getMinutes()
          const startTime = this.parseTime(start)
          const endTime = this.parseTime(end)
          return currentTime >= startTime && currentTime <= endTime
        }
        return false

      default:
        return false
    }
  }

  // IP条件评估
  private evaluateIpCondition(condition: PermissionCondition, context: SecurityContext): boolean {
    const clientIp = context.session.ip

    switch (condition.operator) {
      case "equals":
        return clientIp === condition.value

      case "in":
        if (Array.isArray(condition.value)) {
          return condition.value.some((allowedIp) => {
            if (allowedIp.includes("/")) {
              // CIDR notation
              return this.isIpInCidr(clientIp, allowedIp)
            }
            return clientIp === allowedIp
          })
        }
        return false

      default:
        return false
    }
  }

  // 位置条件评估
  private evaluateLocationCondition(condition: PermissionCondition, context: SecurityContext): boolean {
    // 实际项目中可能需要集成地理位置服务
    return true
  }

  // 设备条件评估
  private evaluateDeviceCondition(condition: PermissionCondition, context: SecurityContext): boolean {
    const userAgent = context.session.userAgent

    switch (condition.operator) {
      case "contains":
        return userAgent.toLowerCase().includes(condition.value.toLowerCase())

      default:
        return false
    }
  }

  // 自定义条件评估
  private evaluateCustomCondition(condition: PermissionCondition, context: SecurityContext): boolean {
    // 可以根据具体业务需求实现自定义条件逻辑
    return true
  }

  // 评估角色条件
  private async evaluateRoleConditions(conditions: RoleCondition[], user: User): Promise<boolean> {
    for (const condition of conditions) {
      const result = this.evaluateRoleCondition(condition, user)
      if (!result) return false
    }
    return true
  }

  // 评估单个角色条件
  private evaluateRoleCondition(condition: RoleCondition, user: User): boolean {
    switch (condition.type) {
      case "department":
        return condition.operator === "equals" ? user.department === condition.value : false

      case "level":
        switch (condition.operator) {
          case "greater":
            return user.level > condition.value
          case "less":
            return user.level < condition.value
          case "equals":
            return user.level === condition.value
          default:
            return false
        }

      default:
        return false
    }
  }

  // 工具方法
  private parseTime(timeStr: string): number {
    const [hours, minutes] = timeStr.split(":").map(Number)
    return hours * 60 + minutes
  }

  private isIpInCidr(ip: string, cidr: string): boolean {
    // 简化的CIDR检查实现
    // 实际项目中建议使用专门的IP处理库
    const [network, prefixLength] = cidr.split("/")
    // 这里需要实现完整的CIDR匹配逻辑
    return true
  }

  // 安全审计日志
  private async logSecurityEvent(event: SecurityAuditLog): Promise<void> {
    this.auditLog.push(event)

    // 实际项目中应该将日志发送到安全监控系统
    console.log("Security Event:", event)

    // 检查是否需要触发安全警报
    await this.checkSecurityAlerts(event)
  }

  // 安全警报检查
  private async checkSecurityAlerts(event: SecurityAuditLog): Promise<void> {
    // 检查异常登录
    if (event.type === "permission_denied") {
      const recentDenials = this.auditLog.filter(
        (log) =>
          log.userId === event.userId &&
          log.type === "permission_denied" &&
          Date.now() - log.timestamp.getTime() < 5 * 60 * 1000, // 5分钟内
      )

      if (recentDenials.length >= 5) {
        await this.triggerSecurityAlert({
          type: "multiple_permission_denials",
          userId: event.userId,
          count: recentDenials.length,
          timeWindow: "5分钟",
        })
      }
    }
  }

  // 触发安全警报
  private async triggerSecurityAlert(alert: any): Promise<void> {
    console.warn("Security Alert:", alert)
    // 实际项目中应该发送到安全团队
  }

  // 公共API方法
  async hasPermission(userId: string, resource: string, action: string, sessionContext?: any): Promise<boolean> {
    const user = this.users.get(userId)
    if (!user) return false

    const context: SecurityContext = {
      user,
      session: sessionContext || {
        id: "default",
        ip: "127.0.0.1",
        userAgent: "Unknown",
        device: "Unknown",
        startTime: new Date(),
      },
      request: {
        resource,
        action,
        timestamp: new Date(),
      },
    }

    return this.checkPermission(context, resource, action)
  }

  // 管理方法
  addPermission(permission: Permission): void {
    this.permissions.set(permission.id, permission)
  }

  addRole(role: Role): void {
    this.roles.set(role.id, role)
  }

  addUser(user: User): void {
    this.users.set(user.id, user)
  }

  getAuditLog(): SecurityAuditLog[] {
    return [...this.auditLog]
  }
}

// 安全审计日志接口
interface SecurityAuditLog {
  type: "permission_granted" | "permission_denied" | "permission_condition_failed" | "permission_check_error"
  userId: string
  resource: string
  action: string
  timestamp: Date
  context: Record<string, any>
}

// 导出权限系统实例
export const permissionSystem = new PermissionSystem()

// 导出类型
export type { Permission, PermissionCondition, Role, RoleCondition, User, SecurityContext, SecurityAuditLog }
