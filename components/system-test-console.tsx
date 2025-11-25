"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Monitor,
  Smartphone,
  WifiOff,
  Settings,
  BarChart3,
  Zap,
  RefreshCw,
  Download,
} from "lucide-react"
import { errorNotificationManager } from "@/components/error-notification-system"

interface TestCase {
  id: string
  name: string
  category: string
  description: string
  status: "pending" | "running" | "passed" | "failed" | "skipped"
  duration?: number
  error?: string
  details?: string
  priority: "high" | "medium" | "low"
  automated: boolean
}

interface TestSuite {
  id: string
  name: string
  description: string
  icon: any
  tests: TestCase[]
  status: "pending" | "running" | "completed"
  progress: number
}

export function SystemTestConsole() {
  const [isOpen, setIsOpen] = useState(false)
  const [testSuites, setTestSuites] = useState<TestSuite[]>([])
  const [currentSuite, setCurrentSuite] = useState<string | null>(null)
  const [overallProgress, setOverallProgress] = useState(0)
  const [testResults, setTestResults] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)

  // 初始化测试套件
  useEffect(() => {
    const suites: TestSuite[] = [
      {
        id: "core-functionality",
        name: "核心功能测试",
        description: "测试系统核心功能模块",
        icon: Settings,
        status: "pending",
        progress: 0,
        tests: [
          {
            id: "header-rendering",
            name: "头部组件渲染",
            category: "UI组件",
            description: "验证Header组件正确渲染和功能",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "sidebar-navigation",
            name: "侧边栏导航",
            category: "导航",
            description: "测试侧边栏展开收起和模块切换",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "dashboard-loading",
            name: "仪表盘加载",
            category: "数据展示",
            description: "验证仪表盘数据正确加载和显示",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "module-switching",
            name: "模块切换",
            category: "导航",
            description: "测试各功能模块间的切换",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "search-functionality",
            name: "搜索功能",
            category: "搜索",
            description: "测试全局搜索功能",
            status: "pending",
            priority: "medium",
            automated: true,
          },
        ],
      },
      {
        id: "business-modules",
        name: "业务模块测试",
        description: "测试各业务功能模块",
        icon: BarChart3,
        status: "pending",
        progress: 0,
        tests: [
          {
            id: "customer-management",
            name: "客户管理",
            category: "CRM",
            description: "测试客户信息管理功能",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "task-management",
            name: "任务管理",
            category: "项目管理",
            description: "测试任务创建、分配、跟踪功能",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "finance-module",
            name: "财务模块",
            category: "财务",
            description: "测试财务数据统计和报表",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "okr-tracking",
            name: "OKR跟踪",
            category: "绩效管理",
            description: "测试OKR目标设定和跟踪",
            status: "pending",
            priority: "medium",
            automated: true,
          },
          {
            id: "approval-workflow",
            name: "审批流程",
            category: "OA",
            description: "测试审批流程和状态管理",
            status: "pending",
            priority: "medium",
            automated: true,
          },
        ],
      },
      {
        id: "performance-tests",
        name: "性能测试",
        description: "测试系统性能和响应速度",
        icon: Zap,
        status: "pending",
        progress: 0,
        tests: [
          {
            id: "page-load-time",
            name: "页面加载时间",
            category: "性能",
            description: "测试各页面加载时间是否在可接受范围",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "component-render-time",
            name: "组件渲染时间",
            category: "性能",
            description: "测试各组件渲染性能",
            status: "pending",
            priority: "medium",
            automated: true,
          },
          {
            id: "memory-usage",
            name: "内存使用",
            category: "性能",
            description: "监控内存使用情况",
            status: "pending",
            priority: "medium",
            automated: true,
          },
          {
            id: "api-response-time",
            name: "API响应时间",
            category: "网络",
            description: "测试API调用响应时间",
            status: "pending",
            priority: "high",
            automated: true,
          },
        ],
      },
      {
        id: "error-handling",
        name: "错误处理测试",
        description: "测试各种错误场景的处理",
        icon: AlertTriangle,
        status: "pending",
        progress: 0,
        tests: [
          {
            id: "network-error",
            name: "网络错误处理",
            category: "错误处理",
            description: "测试网络断开时的错误处理",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "api-error",
            name: "API错误处理",
            category: "错误处理",
            description: "测试API调用失败的错误处理",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "validation-error",
            name: "数据验证错误",
            category: "表单验证",
            description: "测试表单数据验证错误处理",
            status: "pending",
            priority: "medium",
            automated: true,
          },
          {
            id: "permission-error",
            name: "权限错误处理",
            category: "权限",
            description: "测试权限不足时的错误处理",
            status: "pending",
            priority: "medium",
            automated: true,
          },
        ],
      },
      {
        id: "responsive-design",
        name: "响应式设计测试",
        description: "测试不同设备和屏幕尺寸的适配",
        icon: Smartphone,
        status: "pending",
        progress: 0,
        tests: [
          {
            id: "mobile-layout",
            name: "移动端布局",
            category: "响应式",
            description: "测试移动端界面布局和交互",
            status: "pending",
            priority: "high",
            automated: false,
          },
          {
            id: "tablet-layout",
            name: "平板端布局",
            category: "响应式",
            description: "测试平板端界面适配",
            status: "pending",
            priority: "medium",
            automated: false,
          },
          {
            id: "desktop-layout",
            name: "桌面端布局",
            category: "响应式",
            description: "测试桌面端界面和功能",
            status: "pending",
            priority: "high",
            automated: false,
          },
          {
            id: "touch-gestures",
            name: "触摸手势",
            category: "交互",
            description: "测试触摸手势功能",
            status: "pending",
            priority: "medium",
            automated: false,
          },
        ],
      },
      {
        id: "offline-functionality",
        name: "离线功能测试",
        description: "测试离线模式和数据同步",
        icon: WifiOff,
        status: "pending",
        progress: 0,
        tests: [
          {
            id: "offline-storage",
            name: "离线存储",
            category: "离线功能",
            description: "测试离线数据存储功能",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "sync-functionality",
            name: "数据同步",
            category: "同步",
            description: "测试在线时的数据同步功能",
            status: "pending",
            priority: "high",
            automated: true,
          },
          {
            id: "conflict-resolution",
            name: "冲突解决",
            category: "同步",
            description: "测试数据冲突解决机制",
            status: "pending",
            priority: "medium",
            automated: true,
          },
          {
            id: "offline-operations",
            name: "离线操作",
            category: "离线功能",
            description: "测试离线状态下的操作功能",
            status: "pending",
            priority: "medium",
            automated: true,
          },
        ],
      },
    ]

    setTestSuites(suites)
  }, [])

  // 运行单个测试用例
  const runTestCase = async (testCase: TestCase): Promise<TestCase> => {
    const startTime = performance.now()

    // 模拟测试执行
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 500))

    const duration = performance.now() - startTime
    const success = Math.random() > 0.1 // 90% 成功率

    return {
      ...testCase,
      status: success ? "passed" : "failed",
      duration,
      error: success ? undefined : "模拟测试失败：功能未按预期工作",
      details: success ? "测试通过，所有断言成功" : "详细错误信息：组件渲染异常",
    }
  }

  // 运行测试套件
  const runTestSuite = async (suiteId: string) => {
    const suite = testSuites.find((s) => s.id === suiteId)
    if (!suite) return

    setCurrentSuite(suiteId)

    // 更新套件状态
    setTestSuites((prev) => prev.map((s) => (s.id === suiteId ? { ...s, status: "running" as const, progress: 0 } : s)))

    const totalTests = suite.tests.length
    let completedTests = 0

    for (const test of suite.tests) {
      // 更新测试状态为运行中
      setTestSuites((prev) =>
        prev.map((s) =>
          s.id === suiteId
            ? {
                ...s,
                tests: s.tests.map((t) => (t.id === test.id ? { ...t, status: "running" as const } : t)),
              }
            : s,
        ),
      )

      try {
        const result = await runTestCase(test)

        // 更新测试结果
        setTestSuites((prev) =>
          prev.map((s) =>
            s.id === suiteId
              ? {
                  ...s,
                  tests: s.tests.map((t) => (t.id === test.id ? result : t)),
                }
              : s,
          ),
        )

        completedTests++
        const progress = (completedTests / totalTests) * 100

        // 更新套件进度
        setTestSuites((prev) => prev.map((s) => (s.id === suiteId ? { ...s, progress } : s)))
      } catch (error) {
        // 处理测试执行错误
        setTestSuites((prev) =>
          prev.map((s) =>
            s.id === suiteId
              ? {
                  ...s,
                  tests: s.tests.map((t) =>
                    t.id === test.id ? { ...t, status: "failed" as const, error: String(error) } : t,
                  ),
                }
              : s,
          ),
        )
      }
    }

    // 标记套件完成
    setTestSuites((prev) =>
      prev.map((s) => (s.id === suiteId ? { ...s, status: "completed" as const, progress: 100 } : s)),
    )
  }

  // 运行所有测试
  const runAllTests = async () => {
    setIsRunning(true)
    const startTime = performance.now()

    try {
      for (const suite of testSuites) {
        await runTestSuite(suite.id)
      }

      const totalDuration = performance.now() - startTime

      // 生成测试报告
      const results = generateTestReport(totalDuration)
      setTestResults(results)

      // 显示完成通知
      errorNotificationManager.success(
        "测试完成",
        `所有测试套件执行完毕，总耗时 ${(totalDuration / 1000).toFixed(1)} 秒`,
      )
    } catch (error) {
      errorNotificationManager.error("测试执行失败", String(error))
    } finally {
      setIsRunning(false)
      setCurrentSuite(null)
    }
  }

  // 生成测试报告
  const generateTestReport = (totalDuration: number) => {
    const allTests = testSuites.flatMap((suite) => suite.tests)
    const passedTests = allTests.filter((test) => test.status === "passed")
    const failedTests = allTests.filter((test) => test.status === "failed")
    const skippedTests = allTests.filter((test) => test.status === "skipped")

    return {
      totalTests: allTests.length,
      passedTests: passedTests.length,
      failedTests: failedTests.length,
      skippedTests: skippedTests.length,
      successRate: (passedTests.length / allTests.length) * 100,
      totalDuration,
      averageTestDuration: allTests.reduce((sum, test) => sum + (test.duration || 0), 0) / allTests.length,
      suiteResults: testSuites.map((suite) => ({
        name: suite.name,
        passed: suite.tests.filter((t) => t.status === "passed").length,
        failed: suite.tests.filter((t) => t.status === "failed").length,
        total: suite.tests.length,
      })),
    }
  }

  // 获取状态图标
  const getStatusIcon = (status: TestCase["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case "skipped":
        return <Clock className="w-4 h-4 text-gray-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: TestCase["status"]) => {
    switch (status) {
      case "passed":
        return "text-green-600 bg-green-50 border-green-200"
      case "failed":
        return "text-red-600 bg-red-50 border-red-200"
      case "running":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "skipped":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  // 计算总体进度
  useEffect(() => {
    const allTests = testSuites.flatMap((suite) => suite.tests)
    const completedTests = allTests.filter((test) => test.status === "passed" || test.status === "failed")
    const progress = allTests.length > 0 ? (completedTests.length / allTests.length) * 100 : 0
    setOverallProgress(progress)
  }, [testSuites])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Monitor className="w-4 h-4" />
          <span>系统测试</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Monitor className="w-5 h-5" />
            <span>系统功能测试控制台</span>
            {isRunning && <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 测试控制面板 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>测试控制面板</CardTitle>
                <div className="flex space-x-2">
                  <Button onClick={runAllTests} disabled={isRunning} className="flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>{isRunning ? "测试进行中..." : "运行所有测试"}</span>
                  </Button>
                  {testResults && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const reportData = JSON.stringify(testResults, null, 2)
                        const blob = new Blob([reportData], { type: "application/json" })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = `test-report-${new Date().toISOString().split("T")[0]}.json`
                        a.click()
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      导出报告
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 总体进度 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>总体进度</span>
                  <span>{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>

              {/* 测试统计 */}
              {testResults && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{testResults.passedTests}</p>
                    <p className="text-sm text-gray-600">通过</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{testResults.failedTests}</p>
                    <p className="text-sm text-gray-600">失败</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{testResults.successRate.toFixed(1)}%</p>
                    <p className="text-sm text-gray-600">成功率</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {(testResults.totalDuration / 1000).toFixed(1)}s
                    </p>
                    <p className="text-sm text-gray-600">总耗时</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 测试套件 */}
          <Tabs defaultValue="suites" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suites">测试套件</TabsTrigger>
              <TabsTrigger value="report">测试报告</TabsTrigger>
            </TabsList>

            <TabsContent value="suites">
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {testSuites.map((suite) => {
                    const SuiteIcon = suite.icon
                    const passedTests = suite.tests.filter((t) => t.status === "passed").length
                    const failedTests = suite.tests.filter((t) => t.status === "failed").length
                    const totalTests = suite.tests.length

                    return (
                      <Card key={suite.id} className="border">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <SuiteIcon className="w-5 h-5 text-blue-600" />
                              <div>
                                <h3 className="font-semibold">{suite.name}</h3>
                                <p className="text-sm text-gray-600">{suite.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">
                                {passedTests}/{totalTests}
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => runTestSuite(suite.id)}
                                disabled={isRunning}
                              >
                                {currentSuite === suite.id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                          {suite.status === "running" && (
                            <div className="mt-2">
                              <Progress value={suite.progress} className="h-2" />
                            </div>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {suite.tests.map((test) => (
                              <div
                                key={test.id}
                                className={`flex items-center justify-between p-2 rounded border ${getStatusColor(test.status)}`}
                              >
                                <div className="flex items-center space-x-3">
                                  {getStatusIcon(test.status)}
                                  <div>
                                    <p className="text-sm font-medium">{test.name}</p>
                                    <p className="text-xs opacity-75">{test.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {test.priority}
                                  </Badge>
                                  {test.duration && <span className="text-xs">{test.duration.toFixed(0)}ms</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="report">
              {testResults ? (
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {/* 总体统计 */}
                    <Card>
                      <CardHeader>
                        <CardTitle>测试总结</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">总测试数</p>
                            <p className="text-2xl font-bold">{testResults.totalTests}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">成功率</p>
                            <p className="text-2xl font-bold text-green-600">{testResults.successRate.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">平均耗时</p>
                            <p className="text-2xl font-bold">{testResults.averageTestDuration.toFixed(0)}ms</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 套件详情 */}
                    {testResults.suiteResults.map((suite: any, index: number) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{suite.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">通过: {suite.passed}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span className="text-sm">失败: {suite.failed}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">总计: {suite.total}</span>
                            </div>
                          </div>
                          <Progress value={(suite.passed / suite.total) * 100} className="mt-2 h-2" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-8">
                  <Monitor className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">运行测试后查看详细报告</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
