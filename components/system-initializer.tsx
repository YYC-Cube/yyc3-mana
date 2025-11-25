"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Database,
  Settings,
  Users,
  Shield,
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Server,
  Network,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Activity,
} from "lucide-react"

interface InitializationStep {
  id: string
  name: string
  description: string
  status: "pending" | "running" | "completed" | "failed" | "skipped"
  progress: number
  duration?: number
  error?: string
  dependencies?: string[]
}

interface SystemResource {
  name: string
  type: "cpu" | "memory" | "disk" | "network"
  usage: number
  total: number
  status: "normal" | "warning" | "critical"
}

export function SystemInitializer() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const [overallProgress, setOverallProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [systemResources, setSystemResources] = useState<SystemResource[]>([
    { name: "CPU", type: "cpu", usage: 45, total: 100, status: "normal" },
    { name: "内存", type: "memory", usage: 2.8, total: 8, status: "normal" },
    { name: "磁盘", type: "disk", usage: 156, total: 500, status: "normal" },
    { name: "网络", type: "network", usage: 12.5, total: 100, status: "normal" },
  ])

  const [initSteps, setInitSteps] = useState<InitializationStep[]>([
    {
      id: "database",
      name: "数据库初始化",
      description: "创建数据库表结构和基础数据",
      status: "pending",
      progress: 0,
      dependencies: [],
    },
    {
      id: "cache",
      name: "缓存系统",
      description: "初始化Redis缓存和会话存储",
      status: "pending",
      progress: 0,
      dependencies: ["database"],
    },
    {
      id: "auth",
      name: "认证系统",
      description: "配置用户认证和权限管理",
      status: "pending",
      progress: 0,
      dependencies: ["database"],
    },
    {
      id: "services",
      name: "核心服务",
      description: "启动业务逻辑服务和API接口",
      status: "pending",
      progress: 0,
      dependencies: ["database", "cache", "auth"],
    },
    {
      id: "workers",
      name: "后台任务",
      description: "启动队列处理和定时任务",
      status: "pending",
      progress: 0,
      dependencies: ["services"],
    },
    {
      id: "monitoring",
      name: "监控系统",
      description: "配置系统监控和日志收集",
      status: "pending",
      progress: 0,
      dependencies: ["services"],
    },
    {
      id: "optimization",
      name: "性能优化",
      description: "应用缓存策略和性能调优",
      status: "pending",
      progress: 0,
      dependencies: ["services", "monitoring"],
    },
  ])

  const getStepIcon = (status: InitializationStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "running":
        return <Clock className="w-5 h-5 text-blue-600 animate-spin" />
      case "skipped":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getResourceIcon = (type: SystemResource["type"]) => {
    switch (type) {
      case "cpu":
        return <Cpu className="w-4 h-4" />
      case "memory":
        return <Memory className="w-4 h-4" />
      case "disk":
        return <HardDrive className="w-4 h-4" />
      case "network":
        return <Network className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getResourceColor = (status: SystemResource["status"]) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("zh-CN")
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`])
  }

  const simulateStep = async (step: InitializationStep) => {
    setCurrentStep(step.id)
    setInitSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, status: "running", progress: 0 } : s)))

    addLog(`开始执行: ${step.name}`)

    // 模拟进度更新
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setInitSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, progress: i } : s)))
    }

    // 随机决定成功或失败（90%成功率）
    const success = Math.random() > 0.1

    if (success) {
      setInitSteps((prev) =>
        prev.map((s) =>
          s.id === step.id
            ? { ...s, status: "completed", progress: 100, duration: Math.floor(Math.random() * 5000) + 1000 }
            : s,
        ),
      )
      addLog(`✅ ${step.name} 完成`)
    } else {
      setInitSteps((prev) =>
        prev.map((s) =>
          s.id === step.id
            ? {
                ...s,
                status: "failed",
                progress: Math.floor(Math.random() * 80) + 10,
                error: "连接超时或配置错误",
              }
            : s,
        ),
      )
      addLog(`❌ ${step.name} 失败: 连接超时或配置错误`)
    }
  }

  const startInitialization = async () => {
    setIsInitializing(true)
    setOverallProgress(0)
    addLog("🚀 开始系统初始化...")

    // 重置所有步骤状态
    setInitSteps((prev) => prev.map((step) => ({ ...step, status: "pending", progress: 0, error: undefined })))

    const totalSteps = initSteps.length
    let completedSteps = 0

    for (const step of initSteps) {
      // 检查依赖项
      const dependenciesCompleted = step.dependencies?.every((depId) => {
        const depStep = initSteps.find((s) => s.id === depId)
        return depStep?.status === "completed"
      })

      if (step.dependencies && step.dependencies.length > 0 && !dependenciesCompleted) {
        setInitSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, status: "skipped" } : s)))
        addLog(`⏭️ 跳过 ${step.name}: 依赖项未完成`)
        continue
      }

      await simulateStep(step)
      completedSteps++
      setOverallProgress((completedSteps / totalSteps) * 100)

      // 如果步骤失败，询问是否继续
      const currentStepState = initSteps.find((s) => s.id === step.id)
      if (currentStepState?.status === "failed") {
        const shouldContinue = confirm(`${step.name} 初始化失败，是否继续其他步骤？`)
        if (!shouldContinue) {
          addLog("❌ 用户取消初始化")
          break
        }
      }
    }

    setCurrentStep(null)
    setIsInitializing(false)
    addLog("🎉 系统初始化完成")
  }

  const retryStep = async (stepId: string) => {
    const step = initSteps.find((s) => s.id === stepId)
    if (step) {
      await simulateStep(step)
    }
  }

  const resetInitialization = () => {
    setInitSteps((prev) =>
      prev.map((step) => ({ ...step, status: "pending", progress: 0, error: undefined, duration: undefined })),
    )
    setCurrentStep(null)
    setOverallProgress(0)
    setLogs([])
    addLog("🔄 系统初始化已重置")
  }

  // 模拟系统资源更新
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemResources((prev) =>
        prev.map((resource) => ({
          ...resource,
          usage:
            resource.type === "cpu"
              ? Math.max(10, Math.min(90, resource.usage + (Math.random() - 0.5) * 10))
              : resource.type === "memory"
                ? Math.max(1, Math.min(7, resource.usage + (Math.random() - 0.5) * 0.5))
                : resource.type === "disk"
                  ? Math.max(100, Math.min(400, resource.usage + (Math.random() - 0.5) * 5))
                  : Math.max(5, Math.min(50, resource.usage + (Math.random() - 0.5) * 5)),
          status: resource.usage > 80 ? "critical" : resource.usage > 60 ? "warning" : "normal",
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                系统初始化控制台
              </CardTitle>
              <CardDescription>管理和监控系统初始化过程</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={startInitialization}
                disabled={isInitializing}
                className="bg-gradient-to-r from-blue-500 to-indigo-600"
              >
                {isInitializing ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isInitializing ? "初始化中..." : "开始初始化"}
              </Button>
              <Button variant="outline" onClick={resetInitialization} disabled={isInitializing}>
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">总体进度</span>
                <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            {currentStep && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-sm font-medium text-blue-800">
                    正在执行: {initSteps.find((s) => s.id === currentStep)?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 初始化步骤 */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2 text-green-600" />
              初始化步骤
            </CardTitle>
            <CardDescription>系统组件初始化进度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border transition-all ${
                    step.status === "running"
                      ? "border-blue-200 bg-blue-50"
                      : step.status === "completed"
                        ? "border-green-200 bg-green-50"
                        : step.status === "failed"
                          ? "border-red-200 bg-red-50"
                          : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{step.name}</h4>
                          {getStepIcon(step.status)}
                          <Badge
                            variant={
                              step.status === "completed"
                                ? "default"
                                : step.status === "failed"
                                  ? "destructive"
                                  : step.status === "running"
                                    ? "secondary"
                                    : "outline"
                            }
                            className="text-xs"
                          >
                            {step.status === "pending"
                              ? "等待中"
                              : step.status === "running"
                                ? "执行中"
                                : step.status === "completed"
                                  ? "已完成"
                                  : step.status === "failed"
                                    ? "失败"
                                    : "已跳过"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>

                        {step.dependencies && step.dependencies.length > 0 && (
                          <div className="text-xs text-gray-500 mb-2">依赖: {step.dependencies.join(", ")}</div>
                        )}

                        {step.status === "running" || step.progress > 0 ? (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">进度</span>
                              <span className="text-xs text-gray-600">{step.progress}%</span>
                            </div>
                            <Progress value={step.progress} className="h-1" />
                          </div>
                        ) : null}

                        {step.error && (
                          <div className="mt-2 p-2 bg-red-100 rounded text-sm text-red-700">{step.error}</div>
                        )}

                        {step.duration && <div className="mt-2 text-xs text-gray-500">耗时: {step.duration}ms</div>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {step.status === "failed" && (
                        <Button variant="outline" size="sm" onClick={() => retryStep(step.id)}>
                          <RotateCcw className="w-3 h-3 mr-1" />
                          重试
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 系统资源和日志 */}
        <div className="space-y-6">
          {/* 系统资源 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="w-5 h-5 mr-2 text-purple-600" />
                系统资源
              </CardTitle>
              <CardDescription>实时系统资源使用情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemResources.map((resource) => (
                  <div key={resource.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={getResourceColor(resource.status)}>{getResourceIcon(resource.type)}</div>
                        <span className="text-sm font-medium">{resource.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {resource.type === "memory"
                          ? `${resource.usage.toFixed(1)}GB / ${resource.total}GB`
                          : resource.type === "disk"
                            ? `${resource.usage}GB / ${resource.total}GB`
                            : `${Math.round(resource.usage)}%`}
                      </span>
                    </div>
                    <Progress
                      value={
                        resource.type === "memory" || resource.type === "disk"
                          ? (resource.usage / resource.total) * 100
                          : resource.usage
                      }
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 初始化日志 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                初始化日志
              </CardTitle>
              <CardDescription>实时初始化过程日志</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-1 font-mono text-xs">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${
                        log.includes("❌")
                          ? "bg-red-50 text-red-700"
                          : log.includes("✅")
                            ? "bg-green-50 text-green-700"
                            : log.includes("⏭️")
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                  {logs.length === 0 && <div className="text-center text-gray-500 py-8">暂无日志信息</div>}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 快捷操作 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-base">快捷操作</CardTitle>
          <CardDescription>常用系统管理操作</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent"
            >
              <Download className="w-6 h-6 text-blue-600" />
              <span className="text-sm">导出配置</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 bg-transparent"
            >
              <Upload className="w-6 h-6 text-green-600" />
              <span className="text-sm">导入配置</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 bg-transparent"
            >
              <Shield className="w-6 h-6 text-purple-600" />
              <span className="text-sm">安全检查</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-orange-50 bg-transparent"
            >
              <Users className="w-6 h-6 text-orange-600" />
              <span className="text-sm">用户管理</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
