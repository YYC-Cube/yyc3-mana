"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  Settings,
  Activity,
  Terminal,
  Zap,
  Shield,
  FileText,
} from "lucide-react"

interface InitStep {
  id: string
  name: string
  description: string
  status: "pending" | "running" | "completed" | "error"
  progress: number
  logs: string[]
  duration?: number
}

interface SystemStatus {
  database: "connected" | "disconnected" | "error"
  cache: "active" | "inactive" | "error"
  services: "running" | "stopped" | "error"
  permissions: "configured" | "pending" | "error"
}

export default function SystemInitializationPage() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [systemLogs, setSystemLogs] = useState<string[]>([])
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    database: "disconnected",
    cache: "inactive",
    services: "stopped",
    permissions: "pending",
  })

  const [initSteps, setInitSteps] = useState<InitStep[]>([
    {
      id: "database",
      name: "数据库初始化",
      description: "连接数据库并创建必要的表结构",
      status: "pending",
      progress: 0,
      logs: [],
    },
    {
      id: "cache",
      name: "缓存系统",
      description: "初始化Redis缓存和会话存储",
      status: "pending",
      progress: 0,
      logs: [],
    },
    {
      id: "services",
      name: "核心服务",
      description: "启动认证、通知等核心服务",
      status: "pending",
      progress: 0,
      logs: [],
    },
    {
      id: "permissions",
      name: "权限配置",
      description: "设置用户角色和权限系统",
      status: "pending",
      progress: 0,
      logs: [],
    },
    {
      id: "data-seed",
      name: "数据种子",
      description: "导入初始数据和示例内容",
      status: "pending",
      progress: 0,
      logs: [],
    },
    {
      id: "verification",
      name: "系统验证",
      description: "验证所有组件正常工作",
      status: "pending",
      progress: 0,
      logs: [],
    },
  ])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logEntry = `[${timestamp}] ${message}`
    setSystemLogs((prev) => [...prev, logEntry])
  }

  const updateStepStatus = (stepId: string, status: InitStep["status"], progress: number, log?: string) => {
    setInitSteps((prev) =>
      prev.map((step) => {
        if (step.id === stepId) {
          const updatedLogs = log ? [...step.logs, log] : step.logs
          return { ...step, status, progress, logs: updatedLogs }
        }
        return step
      }),
    )

    if (log) {
      addLog(log)
    }
  }

  const simulateInitialization = async () => {
    setIsInitializing(true)
    setOverallProgress(0)
    addLog("开始系统初始化...")

    for (let i = 0; i < initSteps.length; i++) {
      const step = initSteps[i]
      setCurrentStep(i)

      // 开始步骤
      updateStepStatus(step.id, "running", 0, `开始 ${step.name}...`)

      // 模拟进度
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        updateStepStatus(step.id, "running", progress)
        setOverallProgress(((i + progress / 100) / initSteps.length) * 100)
      }

      // 完成步骤
      updateStepStatus(step.id, "completed", 100, `${step.name} 完成`)

      // 更新系统状态
      switch (step.id) {
        case "database":
          setSystemStatus((prev) => ({ ...prev, database: "connected" }))
          break
        case "cache":
          setSystemStatus((prev) => ({ ...prev, cache: "active" }))
          break
        case "services":
          setSystemStatus((prev) => ({ ...prev, services: "running" }))
          break
        case "permissions":
          setSystemStatus((prev) => ({ ...prev, permissions: "configured" }))
          break
      }
    }

    addLog("系统初始化完成！")
    setIsInitializing(false)
  }

  const resetInitialization = () => {
    setInitSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: "pending",
        progress: 0,
        logs: [],
      })),
    )
    setCurrentStep(0)
    setOverallProgress(0)
    setSystemLogs([])
    setSystemStatus({
      database: "disconnected",
      cache: "inactive",
      services: "stopped",
      permissions: "pending",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
      case "running":
      case "configured":
        return "text-green-600 bg-green-100"
      case "error":
        return "text-red-600 bg-red-100"
      default:
        return "text-yellow-600 bg-yellow-100"
    }
  }

  const getStatusIcon = (status: InitStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "running":
        return <Clock className="h-5 w-5 text-blue-600 animate-spin" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">系统初始化控制台</h1>
          <p className="text-gray-600 mt-1">管理和监控系统初始化过程</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={simulateInitialization} disabled={isInitializing} className="bg-blue-600 hover:bg-blue-700">
            <Play className="w-4 h-4 mr-2" />
            {isInitializing ? "初始化中..." : "开始初始化"}
          </Button>
          <Button onClick={resetInitialization} variant="outline" disabled={isInitializing}>
            <RotateCcw className="w-4 h-4 mr-2" />
            重置
          </Button>
        </div>
      </div>

      {/* 系统状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">数据库</p>
                <Badge className={getStatusColor(systemStatus.database)}>
                  {systemStatus.database === "connected" ? "已连接" : "未连接"}
                </Badge>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">缓存系统</p>
                <Badge className={getStatusColor(systemStatus.cache)}>
                  {systemStatus.cache === "active" ? "活跃" : "未激活"}
                </Badge>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">核心服务</p>
                <Badge className={getStatusColor(systemStatus.services)}>
                  {systemStatus.services === "running" ? "运行中" : "已停止"}
                </Badge>
              </div>
              <Settings className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">权限系统</p>
                <Badge className={getStatusColor(systemStatus.permissions)}>
                  {systemStatus.permissions === "configured" ? "已配置" : "待配置"}
                </Badge>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 总体进度 */}
      {isInitializing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>初始化进度</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>总体进度</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
              <p className="text-sm text-gray-600">
                当前步骤: {initSteps[currentStep]?.name} ({currentStep + 1}/{initSteps.length})
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 主要内容区域 */}
      <Tabs defaultValue="steps" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="steps">初始化步骤</TabsTrigger>
          <TabsTrigger value="logs">系统日志</TabsTrigger>
          <TabsTrigger value="config">配置管理</TabsTrigger>
        </TabsList>

        {/* 初始化步骤 */}
        <TabsContent value="steps">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {initSteps.map((step, index) => (
              <Card key={step.id} className={currentStep === index && isInitializing ? "ring-2 ring-blue-500" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(step.status)}
                      <span>{step.name}</span>
                    </div>
                    <Badge variant={step.status === "completed" ? "default" : "secondary"}>
                      {step.status === "pending"
                        ? "等待中"
                        : step.status === "running"
                          ? "运行中"
                          : step.status === "completed"
                            ? "已完成"
                            : "错误"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>进度</span>
                      <span>{step.progress}%</span>
                    </div>
                    <Progress value={step.progress} className="h-2" />
                    {step.logs.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                        <p className="text-xs font-medium text-gray-600 mb-2">执行日志:</p>
                        {step.logs.map((log, logIndex) => (
                          <p key={logIndex} className="text-xs text-gray-700 font-mono">
                            {log}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 系统日志 */}
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Terminal className="h-5 w-5" />
                <span>系统日志</span>
              </CardTitle>
              <CardDescription>实时系统初始化日志</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
                {systemLogs.length === 0 ? (
                  <p className="text-green-400">等待系统日志...</p>
                ) : (
                  systemLogs.map((log, index) => (
                    <p key={index} className="text-green-400 mb-1">
                      {log}
                    </p>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 配置管理 */}
        <TabsContent value="config">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>环境配置</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">开发模式</span>
                  <Badge variant="secondary">启用</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">调试日志</span>
                  <Badge variant="secondary">启用</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">自动备份</span>
                  <Badge variant="default">启用</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">性能监控</span>
                  <Badge variant="default">启用</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>初始化配置</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">数据库种子</span>
                  <Badge variant="default">包含</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">示例数据</span>
                  <Badge variant="default">包含</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">默认用户</span>
                  <Badge variant="secondary">创建</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">系统设置</span>
                  <Badge variant="default">默认</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 操作提示 */}
      {!isInitializing && overallProgress === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            点击"开始初始化"按钮来启动系统初始化过程。这将设置数据库、缓存、服务和权限系统。
          </AlertDescription>
        </Alert>
      )}

      {overallProgress === 100 && !isInitializing && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>系统初始化已完成！所有组件都已正确配置并正在运行。</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
