"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { permissionSystem, type User } from "@/lib/security/permission-system"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, Lock } from "lucide-react"

// 权限上下文
interface PermissionContextType {
  user: User | null
  hasPermission: (resource: string, action: string) => Promise<boolean>
  checkPermission: (resource: string, action: string) => boolean
  permissions: string[]
  loading: boolean
}

const PermissionContext = createContext<PermissionContextType | null>(null)

// 权限提供者组件
interface PermissionProviderProps {
  children: ReactNode
  user: User | null
  sessionContext?: any
}

export function PermissionProvider({ children, user, sessionContext }: PermissionProviderProps) {
  const [permissions, setPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [permissionCache, setPermissionCache] = useState<Map<string, boolean>>(new Map())

  useEffect(() => {
    if (user) {
      // 添加用户到权限系统
      permissionSystem.addUser(user)
      loadUserPermissions()
    } else {
      setPermissions([])
      setPermissionCache(new Map())
      setLoading(false)
    }
  }, [user])

  const loadUserPermissions = async () => {
    if (!user) return

    setLoading(true)
    try {
      // 获取用户所有权限
      const userPermissions = await getUserPermissions(user)
      setPermissions(userPermissions)
    } catch (error) {
      console.error("加载用户权限失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const getUserPermissions = async (user: User): Promise<string[]> => {
    // 这里应该从后端API获取用户权限
    // 暂时返回模拟数据
    const allPermissions = [
      ...user.permissions,
      // 根据角色获取权限
      ...(user.roles.includes("department_manager")
        ? [
            "customer.create",
            "customer.read",
            "customer.update",
            "task.create",
            "task.read",
            "task.update",
            "task.assign",
          ]
        : []),
      ...(user.roles.includes("employee") ? ["customer.read", "task.read", "task.update"] : []),
    ]

    return [...new Set(allPermissions)]
  }

  const hasPermission = async (resource: string, action: string): Promise<boolean> => {
    if (!user) return false

    const cacheKey = `${resource}:${action}`
    if (permissionCache.has(cacheKey)) {
      return permissionCache.get(cacheKey)!
    }

    try {
      const result = await permissionSystem.hasPermission(user.id, resource, action, sessionContext)

      // 缓存结果（5分钟）
      setPermissionCache((prev) => new Map(prev.set(cacheKey, result)))
      setTimeout(
        () => {
          setPermissionCache((prev) => {
            const newCache = new Map(prev)
            newCache.delete(cacheKey)
            return newCache
          })
        },
        5 * 60 * 1000,
      )

      return result
    } catch (error) {
      console.error("权限检查失败:", error)
      return false
    }
  }

  const checkPermission = (resource: string, action: string): boolean => {
    const permissionId = `${resource}.${action}`
    return permissions.includes(permissionId) || permissions.includes(`${resource}.*`)
  }

  const contextValue: PermissionContextType = {
    user,
    hasPermission,
    checkPermission,
    permissions,
    loading,
  }

  return <PermissionContext.Provider value={contextValue}>{children}</PermissionContext.Provider>
}

// 权限Hook
export function usePermissions() {
  const context = useContext(PermissionContext)
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionProvider")
  }
  return context
}

// 权限守卫组件
interface PermissionGuardProps {
  resource: string
  action: string
  children: ReactNode
  fallback?: ReactNode
  showError?: boolean
}

export function PermissionGuard({ resource, action, children, fallback, showError = true }: PermissionGuardProps) {
  const { checkPermission, loading } = usePermissions()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-sm text-gray-500">检查权限中...</span>
      </div>
    )
  }

  const hasAccess = checkPermission(resource, action)

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>
    }

    if (showError) {
      return (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            您没有权限执行此操作。需要权限: {resource}.{action}
          </AlertDescription>
        </Alert>
      )
    }

    return null
  }

  return <>{children}</>
}

// 权限按钮组件
interface PermissionButtonProps {
  resource: string
  action: string
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function PermissionButton({
  resource,
  action,
  children,
  onClick,
  className = "",
  disabled = false,
}: PermissionButtonProps) {
  const { checkPermission } = usePermissions()

  const hasAccess = checkPermission(resource, action)
  const isDisabled = disabled || !hasAccess

  return (
    <button
      onClick={hasAccess ? onClick : undefined}
      disabled={isDisabled}
      className={`
        ${className}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${!hasAccess ? "bg-gray-300 text-gray-500" : ""}
      `}
      title={!hasAccess ? `需要权限: ${resource}.${action}` : undefined}
    >
      {!hasAccess && <Lock className="w-4 h-4 mr-2" />}
      {children}
    </button>
  )
}

// 权限状态显示组件
export function PermissionStatus() {
  const { user, permissions, loading } = usePermissions()

  if (loading) {
    return (
      <div className="flex items-center text-sm text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
        加载权限中...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center text-sm text-red-500">
        <AlertTriangle className="w-4 h-4 mr-2" />
        未登录
      </div>
    )
  }

  return (
    <div className="flex items-center text-sm text-green-600">
      <Shield className="w-4 h-4 mr-2" />
      {user.name} ({permissions.length} 项权限)
    </div>
  )
}

// 权限详情组件
export function PermissionDetails() {
  const { user, permissions } = usePermissions()

  if (!user) return null

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">权限详情</h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">用户信息</h4>
          <div className="mt-2 text-sm text-gray-600">
            <p>姓名: {user.name}</p>
            <p>邮箱: {user.email}</p>
            <p>部门: {user.department}</p>
            <p>级别: {user.level}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">角色</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.roles.map((role) => (
              <span key={role} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {role}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">权限列表 ({permissions.length})</h4>
          <div className="mt-2 max-h-40 overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              {permissions.map((permission) => (
                <span key={permission} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {permission}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
