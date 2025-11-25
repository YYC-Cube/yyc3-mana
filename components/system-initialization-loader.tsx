"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Wifi, Settings, CheckCircle, AlertCircle, RefreshCw, Zap } from "lucide-react"

interface InitializationStep {
  id: string
  name: string
  description: string
  status: "pending" | "loading" | "completed" | "error"
  progress: number
  duration?: number
  error?: string
}

interface SystemInitializationLoaderProps {
  isVisible: boolean
  onComplete: () => void
  onError: (error: string) => void
}

export function SystemInitializationLoader({ isVisible, onComplete, onError }: SystemInitializationLoaderProps) {
  const [steps, setSteps] = useState<InitializationStep[]>([
    {
      id: "offline-storage",
      name: "离线存储初始化",
      description: "初始化本地数据库和缓存系统",
      status: "pending",
      progress: 0,
    },
    {
      id: "sync-service",
      name: "同步服务启动",
      description: "启动后台数据同步服务",
      status: "pending",
      progress: 0,
    },
    {
      id: "conflict-resolver",
      name: "冲突解决器配置",
      description: "配置数据冲突解决策略",
      status: "pending",
      progress: 0,
    },
    {
      id: "network-check",
      name: "网络连接检测",
      description: "检测网络状态和服务器连接",
      status: "pending",
      progress: 0,
    },
    {
      id: "user-preferences",
      name: "用户偏好加载",
      description: "加载用户设置和个性化配置",
      status: "pending",
      progress: 0,
    },
  ])

  const [overallProgress, setOverallProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [showDetails, setShowDetails] = useState(false)
  const [initializationError, setInitializationError] = useState<string | null>(null)

  // 模拟初始化过程
  const simulateInitialization = async () => {
    const initStartTime = Date.now()
    setStartTime(initStartTime)

    try {
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        setCurrentStep(i)

        // 更新步骤状态为加载中
        setSteps((prev) =>
          prev.map((s, index) => (index === i ? { ...s, status: "loading" as const, progress: 0 } : s)),
        )

        // 模拟步骤执行过程
        const stepStartTime = Date.now()

        // 根据不同步骤模拟不同的执行时间
        const stepDuration = getStepDuration(step.id)
        const progressInterval = stepDuration / 20 // 20个进度更新

        for (let progress = 0; progress <= 100; progress += 5) {
          await new Promise((resolve) => setTimeout(resolve, progressInterval))

          setSteps((prev) => prev.map((s, index) => (index === i ? { ...s, progress } : s)))

          // 更新总体进度
          const totalProgress = (i * 100 + progress) / steps.length
          setOverallProgress(totalProgress)

          // 模拟可能的错误（5%概率）
          if (progress === 50 && Math.random() < 0.05) {
            throw new Error(`${step.name}过程中发生错误`)
          }
        }

        const stepEndTime = Date.now()
        const stepDurationActual = stepEndTime - stepStartTime

        // 标记步骤完成
        setSteps((prev) =>
          prev.map((s, index) =>
            index === i
              ? {
                  ...s,
                  status: "completed" as const,
                  progress: 100,
                  duration: stepDurationActual,
                }
              : s,
          ),
        )
      }

      // 初始化完成
      const totalDuration = Date.now() - initStartTime
      console.log(`系统初始化完成，总耗时: ${totalDuration}ms`)

      // 发送性能监控数据
      window.dispatchEvent(
        new CustomEvent("systemInitializationCompleted", {
          detail: {
            totalDuration,
            steps: steps.map((step, index) => ({
              ...step,
              duration: step.duration || 0,
            })),
          },
        }),
      )

      setTimeout(() => {
        onComplete()
      }, 1000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知错误"
      setInitializationError(errorMessage)

      // 标记当前步骤为错误状态
      setSteps((prev) =>
        prev.map((s, index) => (index === currentStep ? { ...s, status: "error" as const, error: errorMessage } : s)),
      )

      onError(errorMessage)
    }
  }

  // 获取步骤预估执行时间
  const getStepDuration = (stepId: string): number => {
    const durations: Record<string, number> = {
      "offline-storage": 800,
      "sync-service": 600,
      "conflict-resolver": 400,
      "network-check": 300,
      "user-preferences": 200,
    }
    return durations[stepId] || 500
  }

  // 重试初始化
  const handleRetry = () => {
    setInitializationError(null)
    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: "pending" as const,
        progress: 0,
        error: undefined,
      })),
    )
    setOverallProgress(0)
    setCurrentStep(0)
    simulateInitialization()
  }

  // 获取步骤图标
  const getStepIcon = (step: InitializationStep) => {
    const iconMap: Record<string, any> = {
      "offline-storage": Database,
      "sync-service": RefreshCw,
      "conflict-resolver": Settings,
      "network-check": Wifi,
      "user-preferences": Zap,
    }
    return iconMap[step.id] || Settings
  }

  // 获取状态颜色
  const getStatusColor = (status: InitializationStep["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-500"
      case "loading":
        return "text-blue-500"
      case "error":
        return "text-red-500"
      default:
        return "text-gray-400"
    }
  }

  useEffect(() => {
    if (isVisible) {
      simulateInitialization()
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          {/* 头部信息 */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
                {overallProgress > 0 && (
                  <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">系统初始化中</h2>
            <p className="text-gray-600">正在为您准备企业管理系统，请稍候...</p>
          </div>

          {/* 总体进度 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">初始化进度</span>
              <span className="text-sm text-gray-500">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            {startTime > 0 && (
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>已用时: {Math.round((Date.now() - startTime) / 1000)}秒</span>
                <span>预计剩余: {Math.round(((100 - overallProgress) / 100) * 5)}秒</span>
              </div>
            )}
          </div>

          {/* 当前步骤 */}
          {!initializationError && (
            <div className="mb-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">{steps[currentStep]?.name || "准备中..."}</p>
                  <p className="text-xs text-blue-700">{steps[currentStep]?.description || "系统正在准备初始化"}</p>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  {currentStep + 1}/{steps.length}
                </Badge>
              </div>
            </div>
          )}

          {/* 错误信息 */}
          {initializationError && (
            <div className="mb-4">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900">初始化失败</p>
                  <p className="text-xs text-red-700">{initializationError}</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleRetry}>
                  重试
                </Button>
              </div>
            </div>
          )}

          {/* 详细步骤 */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full justify-between"
            >
              <span>查看详细步骤</span>
              <span className="text-xs">{showDetails ? "收起" : "展开"}</span>
            </Button>

            {showDetails && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {steps.map((step, index) => {
                  const StepIcon = getStepIcon(step)
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        index === currentStep ? "bg-blue-50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {step.status === "loading" ? (
                          <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                        ) : step.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : step.status === "error" ? (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        ) : (
                          <StepIcon className={`w-4 h-4 ${getStatusColor(step.status)}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{step.name}</p>
                        {step.status === "loading" && (
                          <div className="mt-1">
                            <Progress value={step.progress} className="h-1" />
                          </div>
                        )}
                        {step.duration && <p className="text-xs text-gray-500">耗时: {step.duration}ms</p>}
                        {step.error && <p className="text-xs text-red-600">{step.error}</p>}
                      </div>
                      <div className="flex-shrink-0">
                        {step.status === "completed" && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            完成
                          </Badge>
                        )}
                        {step.status === "error" && (
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            失败
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* 底部提示 */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">首次启动可能需要较长时间，请耐心等待</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
