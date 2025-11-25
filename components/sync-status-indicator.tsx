"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Wifi,
  WifiOff,
  Database,
  Activity,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"

interface SyncStatus {
  pendingCount: number
  isOnline: boolean
  isSyncing: boolean
}

interface SyncStatistics {
  pendingCount: number
  completedToday: number
  failedToday: number
  averageSyncTime: number
  conflictRate: number
}

export function SyncStatusIndicator() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    pendingCount: 0,
    isOnline: true,
    isSyncing: false,
  })
  const [syncStats, setSyncStats] = useState<SyncStatistics>({
    pendingCount: 0,
    completedToday: 0,
    failedToday: 0,
    averageSyncTime: 0,
    conflictRate: 0,
  })
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)
  const [syncProgress, setSyncProgress] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isServiceReady, setIsServiceReady] = useState(false)

  // 更新同步状态
  const updateSyncStatus = async () => {
    try {
      if (!isServiceReady) {
        // 服务未就绪时显示默认状态
        setSyncStatus({
          pendingCount: 0,
          isOnline: navigator.onLine,
          isSyncing: false,
        })
        return
      }

      // 动态导入同步服务管理器
      const syncModule = await import("@/lib/sync-service-manager")
      const syncServiceManager = syncModule.syncServiceManager || syncModule.default

      if (!syncServiceManager) {
        throw new Error("同步服务管理器不可用")
      }

      // 获取基本状态
      const basicStatus = {
        pendingCount: 0,
        isOnline: navigator.onLine,
        isSyncing: false,
      }
      setSyncStatus(basicStatus)

      // 获取详细统计信息
      const stats = await syncServiceManager.getSyncStatistics()
      setSyncStats(stats)

      // 更新状态中的待处理数量
      setSyncStatus((prev) => ({
        ...prev,
        pendingCount: stats.pendingCount,
      }))
    } catch (error) {
      console.error("获取同步状态失败:", error)
      // 设置默认状态
      setSyncStatus({
        pendingCount: 0,
        isOnline: navigator.onLine,
        isSyncing: false,
      })
      setSyncStats({
        pendingCount: 0,
        completedToday: 0,
        failedToday: 0,
        averageSyncTime: 0,
        conflictRate: 0,
      })
    }
  }

  // 强制同步
  const handleForceSync = async () => {
    if (!isServiceReady) {
      console.warn("同步服务未就绪")
      return
    }

    try {
      setSyncStatus((prev) => ({ ...prev, isSyncing: true }))

      const syncModule = await import("@/lib/sync-service-manager")
      const syncServiceManager = syncModule.syncServiceManager || syncModule.default

      if (syncServiceManager) {
        await syncServiceManager.startSync()
        setLastSyncTime(new Date())
        await updateSyncStatus()
      }
    } catch (error) {
      console.error("强制同步失败:", error)
    } finally {
      setSyncStatus((prev) => ({ ...prev, isSyncing: false }))
    }
  }

  useEffect(() => {
    // 监听应用服务就绪事件
    const handleAppServicesReady = () => {
      setIsServiceReady(true)
      updateSyncStatus()
    }

    // 监听应用服务错误事件
    const handleAppServicesError = (event: CustomEvent) => {
      setIsServiceReady(false)
      console.error("应用服务错误:", event.detail.error)
    }

    // 监听同步完成事件
    const handleSyncCompleted = (event: CustomEvent) => {
      setLastSyncTime(new Date())
      setSyncProgress(100)
      setTimeout(() => setSyncProgress(0), 2000)
      updateSyncStatus()
    }

    // 监听网络状态变化
    const handleOnlineStatusChange = () => {
      updateSyncStatus()
    }

    window.addEventListener("appServicesReady", handleAppServicesReady)
    window.addEventListener("appServicesError", handleAppServicesError as EventListener)
    window.addEventListener("incrementalSyncCompleted", handleSyncCompleted as EventListener)
    window.addEventListener("online", handleOnlineStatusChange)
    window.addEventListener("offline", handleOnlineStatusChange)

    // 初始化状态更新
    updateSyncStatus()

    // 定期更新状态
    const statusInterval = setInterval(updateSyncStatus, 10000)

    return () => {
      window.removeEventListener("appServicesReady", handleAppServicesReady)
      window.removeEventListener("appServicesError", handleAppServicesError as EventListener)
      window.removeEventListener("incrementalSyncCompleted", handleSyncCompleted as EventListener)
      window.removeEventListener("online", handleOnlineStatusChange)
      window.removeEventListener("offline", handleOnlineStatusChange)
      clearInterval(statusInterval)
    }
  }, [isServiceReady])

  // 获取状态信息
  const getStatusInfo = () => {
    if (!isServiceReady) {
      return {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: Clock,
        text: "初始化中",
        description: "同步服务正在初始化",
      }
    }

    if (!syncStatus.isOnline) {
      return {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: WifiOff,
        text: "离线",
        description: "网络连接不可用",
      }
    }

    if (syncStatus.isSyncing) {
      return {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: RefreshCw,
        text: "同步中",
        description: "正在同步数据",
      }
    }

    if (syncStatus.pendingCount > 0) {
      return {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
        text: "待同步",
        description: `${syncStatus.pendingCount} 个操作待同步`,
      }
    }

    return {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
      text: "已同步",
      description: "所有数据已同步",
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <StatusIcon
            className={`w-4 h-4 mr-2 ${syncStatus.isSyncing ? "animate-spin" : ""} ${
              syncStatus.isOnline && isServiceReady ? "text-green-500" : "text-red-500"
            }`}
          />
          <span className="hidden sm:inline">{statusInfo.text}</span>
          {syncStatus.pendingCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {syncStatus.pendingCount > 99 ? "99+" : syncStatus.pendingCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>同步状态中心</span>
          </DialogTitle>
          <DialogDescription>查看数据同步状态、性能统计和管理离线操作</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">实时状态</TabsTrigger>
            <TabsTrigger value="statistics">性能统计</TabsTrigger>
            <TabsTrigger value="conflicts">冲突管理</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-4">
            {/* 服务状态 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">服务状态</span>
                  </div>
                  <Badge className={isServiceReady ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {isServiceReady ? "就绪" : "初始化中"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* 网络状态 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {syncStatus.isOnline ? (
                      <Wifi className="w-5 h-5 text-green-500" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-medium">网络状态</span>
                  </div>
                  <Badge className={syncStatus.isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {syncStatus.isOnline ? "在线" : "离线"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* 同步状态 */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Database className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">数据同步</span>
                    </div>
                    <Badge className={statusInfo.color}>{statusInfo.text}</Badge>
                  </div>

                  <p className="text-sm text-gray-600">{statusInfo.description}</p>

                  {syncStatus.isSyncing && syncProgress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>同步进度</span>
                        <span>{syncProgress}%</span>
                      </div>
                      <Progress value={syncProgress} className="h-2" />
                    </div>
                  )}

                  {lastSyncTime && (
                    <p className="text-xs text-gray-500">上次同步: {lastSyncTime.toLocaleString("zh-CN")}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex space-x-2">
              <Button
                onClick={handleForceSync}
                disabled={!syncStatus.isOnline || syncStatus.isSyncing || !isServiceReady}
                className="flex-1"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${syncStatus.isSyncing ? "animate-spin" : ""}`} />
                {syncStatus.isSyncing ? "同步中..." : "立即同步"}
              </Button>

              <Button variant="outline" onClick={updateSyncStatus}>
                刷新状态
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            {/* 今日统计 */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-green-600">{syncStats.completedToday}</p>
                      <p className="text-sm text-gray-600">今日完成</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold text-red-600">{syncStats.failedToday}</p>
                      <p className="text-sm text-gray-600">今日失败</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 性能指标 */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">平均同步时间</span>
                    <span className="text-sm text-gray-600">{syncStats.averageSyncTime}ms</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">冲突率</span>
                    <span className="text-sm text-gray-600">{(syncStats.conflictRate * 100).toFixed(1)}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">待处理操作</span>
                    <Badge variant="outline">{syncStats.pendingCount}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 性能趋势图 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">同步性能趋势</span>
                </div>
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-sm">性能图表占位符</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conflicts" className="space-y-4">
            {/* 冲突概览 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">数据冲突管理</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">自动解决冲突</span>
                    <Badge className="bg-green-100 text-green-800">85%</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">需要手动处理</span>
                    <Badge className="bg-yellow-100 text-yellow-800">15%</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">冲突解决策略</span>
                    <span className="text-sm text-gray-600">智能合并</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 冲突历史 */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">最近冲突记录</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">客户信息更新冲突</p>
                      <p className="text-xs text-gray-500">2分钟前 - 已自动解决</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">已解决</Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">任务状态冲突</p>
                      <p className="text-xs text-gray-500">15分钟前 - 客户端优先</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">已处理</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 冲突解决设置 */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">冲突解决策略</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>客户数据</span>
                    <span className="text-gray-600">智能合并</span>
                  </div>
                  <div className="flex justify-between">
                    <span>任务状态</span>
                    <span className="text-gray-600">客户端优先</span>
                  </div>
                  <div className="flex justify-between">
                    <span>审批流程</span>
                    <span className="text-gray-600">服务器优先</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
