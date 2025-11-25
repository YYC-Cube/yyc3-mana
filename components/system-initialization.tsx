"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  Settings,
  Shield,
  Wifi,
  Cpu,
  RefreshCw,
  Play,
  Pause,
  Download,
} from "lucide-react"

interface InitializationStep {
  id: string
  name: string
  description: string
  status: "pending" | "running" | "completed" | "failed" | "skipped"
  progress: number
  duration: number
  dependencies: string[]
  critical: boolean
  logs: string[]
}

interface SystemCheck {
  id: string
  name: string
  category: "hardware" | "software" | "network" | "security"
  status: "pass" | "warning" | "fail"
  value: string
  threshold: string
  description: string
}

export function SystemInitialization() {
  const [initSteps, setInitSteps] = useState<InitializationStep[]>([
    {
      id: "database_check",
      name: "数据库连接检查",
      description: "检查数据库连接状态和权限",
      status: "pending",
      progress: 0,
      duration: 0,
      dependencies: [],
      critical: true,
      logs: [],
    },
    {
      id: "config_load",
      name: "配置文件加载",
      description: "加载系统配置和环境变量",
      status: "pending",
      progress: 0,
      duration: 0,
      dependencies: ["database_check"],
      critical: true,
      logs: [],
    },
    {
      id: "cache_init",
      name: "缓存系统初始化",
      description: "初始化Redis缓存和内存缓存",
      status: "pending",
      progress: 0,
      duration: 0,
      dependencies: ["config_load"],
      critical: false,
      logs: [],
    },
    {
      id: "security_check",
      name: "安全检查",
      description: "验证SSL证书和安全配置",
      status: "pending",
      progress: 0,
      duration: 0,
      dependencies: ["config_load"],
      critical: true,
      logs: [],
    },
    {
      id: "service_start",
      name: "服务启动",
      description: "启动后台服务和定时任务",
      status: "pending",
      progress: 0,
      duration: 0,
      dependencies: ["cache_init", "security_check"],
      critical: false,
      logs: [],
    },
    {
      id: "data_migration",
      name: "数据迁移",
      description: "执行数据库迁移和数据同步",
      status: "pending",
      progress: 0,
      duration: 0,
      dependencies: ["service_start"],
      critical: false,
      logs: [],
    },
  ])

  const [systemChecks] = useState<SystemCheck[]>([
    {
      id: "cpu_usage",
      name: "CPU使用率",
      category: "hardware",
      status: "pass",
      value: "23%",
      threshold: "< 80%",
      description: "系统CPU使用率正常",
    },
    {
      id: "memory_usage",
      name: "内存使用率",
      category: "hardware",
      status: "warning",
      value: "78%",
      threshold: "< 85%",
      description: "内存使用率较高，建议监控",
    },
    {
      id: "disk_space",
      name: "磁盘空间",
      category: "hardware",
      status: "pass",
      value: "45%",
      threshold: "< 90%",
      description: "磁盘空间充足",
    },
    {
      id: "network_latency",
      name: "网络延迟",
      category: "network",
      status: "pass",
      value: "12ms",
      threshold: "< 100ms",
      description: "网络连接正常",
    },
    {
      id: "ssl_cert",
      name: "SSL证书",
      category: "security",
      status: "pass",
      value: "有效",
      threshold: "有效期 > 30天",
      description: "SSL证书状态正常",
    },
    {
      id: "database_conn",
      name: "数据库连接",
      category: "software",
      status: "pass",
      value: "已连接",
      threshold: "连接正常",
      description: "数据库连接池状态正常",
    },
  ])

  const [isInitializing, setIsInitializing] = useState(false)
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const [overallProgress, setOverallProgress] = useState(0)

  // 模拟初始化过程
  const startInitialization = async () => {
    setIsInitializing(true)

    for (const step of initSteps) {
      // 检查依赖
      const dependenciesCompleted = step.dependencies.every(
        (depId) => initSteps.find((s) => s.id === depId)?.status === "completed",
      )

      if (!dependenciesCompleted && step.dependencies.length > 0) {
        updateStepStatus(step.id, "skipped", 0, ["依赖项未完成，跳过此步骤"])
        continue
      }

      setCurrentStep(step.id)
      updateStepStatus(step.id, "running", 0, [`开始执行: ${step.name}`])

      // 模拟执行过程
      const startTime = Date.now()
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        const duration = Date.now() - startTime
        updateStepStatus(
          step.id,
          "running",
          progress,
          [`开始执行: ${step.name}`, `进度: ${progress}%`, `耗时: ${duration}ms`],
          duration,
        )
      }

      // 随机决定成功或失败（关键步骤更容易成功）
      const success = step.critical ? Math.random() > 0.1 : Math.random() > 0.2

      if (success) {
        const duration = Date.now() - startTime
        updateStepStatus(
          step.id,
          "completed",
          100,
          [`开始执行: ${step.name}`, `执行完成`, `总耗时: ${duration}ms`],
          duration,
        )
      } else {
        const duration = Date.now() - startTime
        updateStepStatus(
          step.id,
          "failed",
          50,
          [`开始执行: ${step.name}`, `执行失败: 模拟错误`, `耗时: ${duration}ms`],
          duration,
        )

        if (step.critical) {
          setIsInitializing(false)
          return
        }
      }
    }

    setIsInitializing(false)
    setCurrentStep(null)
  }

  const updateStepStatus = (
    stepId: string,
    status: InitializationStep["status"],
    progress: number,
    logs: string[],
    duration = 0,
  ) => {
    setInitSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, status, progress, logs, duration } : step)),
    )
  }

  // 计算总体进度
  useEffect(() => {
    const completedSteps = initSteps.filter((step) => step.status === "completed").length
    const totalSteps = initSteps.length
    setOverallProgress((completedSteps / totalSteps) * 100)
  }, [initSteps])

  const getStatusIcon = (status: InitializationStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "running":
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
      case "failed":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "skipped":
        return <Clock className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: InitializationStep["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "skipped":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCheckStatusIcon = (status: SystemCheck["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "fail":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
    }
  }

  const getCategoryIcon = (category: SystemCheck["category"]) => {
    switch (category) {
      case "hardware":
        return <Cpu className="w-4 h-4" />
      case "software":
        return <Settings className="w-4 h-4" />
      case "network":
        return <Wifi className="w-4 h-4" />
      case "security":
        return <Shield className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">系统初始化</h1>
          <p className="text-muted-foreground">系统启动检查和初始化配置</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" disabled={isInitializing}>
            <Download className="w-4 h-4 mr-2" />
            导出日志
          </Button>
          <Button
            onClick={startInitialization}
            disabled={isInitializing}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {isInitializing ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                初始化中...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                开始初始化
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 总体进度 */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>初始化进度</span>
          </CardTitle>
          <CardDescription>系统初始化总体进度: {Math.round(overallProgress)}%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>已完成: {initSteps.filter((s) => s.status === "completed").length} 项</span>
              <span>总计: {initSteps.length} 项</span>
            </div>
            {currentStep && (
              <Alert className="bg-blue-50 border-blue-200">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <AlertDescription>正在执行: {initSteps.find((s) => s.id === currentStep)?.name}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="initialization" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="initialization">初始化步骤</TabsTrigger>
          <TabsTrigger value="system-check">系统检查</TabsTrigger>
          <TabsTrigger value="logs">执行日志</TabsTrigger>
        </TabsList>

        <TabsContent value="initialization" className="space-y-4">
          <div className="grid gap-4">
            {initSteps.map((step) => (
              <Card
                key={step.id}
                className={`transition-all duration-300 ${
                  currentStep === step.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(step.status)}
                      <div>
                        <CardTitle className="text-lg">{step.name}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {step.critical && (
                        <Badge variant="destructive" className="text-xs">
                          关键
                        </Badge>
                      )}
                      <Badge className={getStatusColor(step.status)}>
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
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* 进度条 */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>执行进度</span>
                        <span>{step.progress}%</span>
                      </div>
                      <Progress value={step.progress} className="h-2" />
                    </div>

                    {/* 依赖关系 */}
                    {step.dependencies.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">依赖项:</p>
                        <div className="flex flex-wrap gap-2">
                          {step.dependencies.map((depId) => {
                            const depStep = initSteps.find((s) => s.id === depId)
                            return (
                              <Badge key={depId} variant="outline" className="text-xs">
                                {depStep?.name}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* 执行信息 */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">执行时间:</span>
                        <span className="ml-2 font-medium">{step.duration}ms</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">状态:</span>
                        <span className="ml-2 font-medium">
                          {step.status === "pending"
                            ? "等待执行"
                            : step.status === "running"
                              ? "正在执行"
                              : step.status === "completed"
                                ? "执行成功"
                                : step.status === "failed"
                                  ? "执行失败"
                                  : "已跳过"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="system-check" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemChecks.map((check) => (
              <Card key={check.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(check.category)}
                      <CardTitle className="text-base">{check.name}</CardTitle>
                    </div>
                    {getCheckStatusIcon(check.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">当前值:</span>
                      <span className="font-medium">{check.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">阈值:</span>
                      <span className="font-medium">{check.threshold}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{check.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>执行日志</CardTitle>
              <CardDescription>详细的初始化执行日志</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {initSteps.map(
                  (step) =>
                    step.logs.length > 0 && (
                      <div key={step.id} className="border-l-4 border-l-blue-500 pl-4">
                        <h4 className="font-medium mb-2">{step.name}</h4>
                        <div className="space-y-1">
                          {step.logs.map((log, index) => (
                            <p key={index} className="text-sm text-muted-foreground font-mono">
                              [{new Date().toLocaleTimeString()}] {log}
                            </p>
                          ))}
                        </div>
                      </div>
                    ),
                )}

                {initSteps.every((step) => step.logs.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Database className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>暂无执行日志</p>
                    <p className="text-sm">开始初始化后将显示详细日志</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
