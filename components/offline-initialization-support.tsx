"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Database, FolderSyncIcon as Sync, AlertCircle, CheckCircle } from "lucide-react"

interface OfflineCapability {
  id: string
  name: string
  description: string
  isAvailable: boolean
  fallbackMode: boolean
}

export function OfflineInitializationSupport() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [offlineCapabilities, setOfflineCapabilities] = useState<OfflineCapability[]>([
    {
      id: "local-storage",
      name: "本地数据存储",
      description: "使用浏览器本地存储保存数据",
      isAvailable: false,
      fallbackMode: false,
    },
    {
      id: "cached-data",
      name: "缓存数据访问",
      description: "访问之前缓存的业务数据",
      isAvailable: false,
      fallbackMode: false,
    },
    {
      id: "offline-operations",
      name: "离线操作支持",
      description: "支持离线状态下的基本操作",
      isAvailable: false,
      fallbackMode: false,
    },
    {
      id: "sync-queue",
      name: "同步队列",
      description: "离线操作将在联网后自动同步",
      isAvailable: false,
      fallbackMode: false,
    },
  ])

  const [initializationStatus, setInitializationStatus] = useState<"checking" | "ready" | "limited" | "failed">(
    "checking",
  )

  useEffect(() => {
    // 监听网络状态变化
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    initializeOfflineCapabilities()
  }, [])

  const initializeOfflineCapabilities = async () => {
    try {
      // 检查本地存储可用性
      const localStorageAvailable = checkLocalStorageAvailability()

      // 检查IndexedDB可用性
      const indexedDBAvailable = await checkIndexedDBAvailability()

      // 检查Service Worker支持
      const serviceWorkerAvailable = checkServiceWorkerSupport()

      // 检查缓存数据
      const cachedDataAvailable = await checkCachedDataAvailability()

      setOfflineCapabilities((prev) =>
        prev.map((capability) => {
          switch (capability.id) {
            case "local-storage":
              return { ...capability, isAvailable: localStorageAvailable || indexedDBAvailable }
            case "cached-data":
              return { ...capability, isAvailable: cachedDataAvailable }
            case "offline-operations":
              return { ...capability, isAvailable: localStorageAvailable && serviceWorkerAvailable }
            case "sync-queue":
              return { ...capability, isAvailable: serviceWorkerAvailable }
            default:
              return capability
          }
        }),
      )

      // 确定初始化状态
      const availableCount = offlineCapabilities.filter((c) => c.isAvailable).length
      if (availableCount === offlineCapabilities.length) {
        setInitializationStatus("ready")
      } else if (availableCount > 0) {
        setInitializationStatus("limited")
      } else {
        setInitializationStatus("failed")
      }
    } catch (error) {
      console.error("离线功能初始化失败:", error)
      setInitializationStatus("failed")
    }
  }

  const checkLocalStorageAvailability = (): boolean => {
    try {
      const testKey = "test_local_storage"
      localStorage.setItem(testKey, "test")
      localStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  }

  const checkIndexedDBAvailability = (): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const request = indexedDB.open("test_db", 1)
        request.onsuccess = () => {
          request.result.close()
          resolve(true)
        }
        request.onerror = () => resolve(false)
      } catch {
        resolve(false)
      }
    })
  }

  const checkServiceWorkerSupport = (): boolean => {
    return "serviceWorker" in navigator
  }

  const checkCachedDataAvailability = async (): Promise<boolean> => {
    try {
      const cachedData = localStorage.getItem("app_cached_data")
      return !!cachedData
    } catch {
      return false
    }
  }

  const enableOfflineMode = async () => {
    try {
      // 缓存关键数据
      const criticalData = {
        timestamp: Date.now(),
        userPreferences: JSON.parse(localStorage.getItem("user_preferences") || "{}"),
        recentData: JSON.parse(localStorage.getItem("recent_data") || "[]"),
        offlineMode: true,
      }

      localStorage.setItem("app_cached_data", JSON.stringify(criticalData))

      // 启用离线模式
      window.dispatchEvent(
        new CustomEvent("enableOfflineMode", {
          detail: { capabilities: offlineCapabilities.filter((c) => c.isAvailable) },
        }),
      )

      // 跳转到离线页面
      window.location.href = "/offline"
    } catch (error) {
      console.error("启用离线模式失败:", error)
    }
  }

  const getStatusColor = (status: typeof initializationStatus) => {
    switch (status) {
      case "ready":
        return "text-green-600 bg-green-50 border-green-200"
      case "limited":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "failed":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  const getStatusIcon = (status: typeof initializationStatus) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "limited":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Sync className="w-5 h-5 text-blue-600 animate-spin" />
    }
  }

  const getStatusMessage = (status: typeof initializationStatus) => {
    switch (status) {
      case "ready":
        return "离线功能完全可用"
      case "limited":
        return "部分离线功能可用"
      case "failed":
        return "离线功能不可用"
      default:
        return "正在检查离线功能..."
    }
  }

  if (!isOnline) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <WifiOff className="w-6 h-6 text-orange-600" />
            <div>
              <h3 className="font-medium text-orange-900">网络连接不可用</h3>
              <p className="text-sm text-orange-700">正在启用离线模式...</p>
            </div>
          </div>

          <div className="space-y-3">
            {offlineCapabilities.map((capability) => (
              <div key={capability.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  {capability.isAvailable ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{capability.name}</p>
                    <p className="text-xs text-gray-600">{capability.description}</p>
                  </div>
                </div>
                <Badge variant={capability.isAvailable ? "default" : "secondary"}>
                  {capability.isAvailable ? "可用" : "不可用"}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-4 flex space-x-3">
            <Button onClick={enableOfflineMode} className="flex-1">
              <Database className="w-4 h-4 mr-2" />
              启用离线模式
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              重试连接
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`border ${getStatusColor(initializationStatus)}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Wifi className="w-5 h-5 text-green-600" />
          {getStatusIcon(initializationStatus)}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">网络状态</h4>
              <Badge variant="outline" className="text-green-600 border-green-200">
                在线
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-1">{getStatusMessage(initializationStatus)}</p>
          </div>
        </div>

        {initializationStatus === "limited" && (
          <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-800">部分离线功能不可用，建议在网络稳定时使用完整功能。</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
