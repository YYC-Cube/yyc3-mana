"use client"

import { SystemTestConsole } from "@/components/system-test-console"
import { AutomatedTestRunner } from "@/components/automated-test-runner"
import { TestCoverageMonitor } from "@/components/test-coverage-monitor"
import { PerformanceDashboard } from "@/components/performance-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Zap, Target, Play, FileText, Settings } from "lucide-react"

export default function TestPage() {
  const handleRunQuickTest = () => {
    // 触发快速自动化测试
    window.dispatchEvent(new CustomEvent("runAutomatedTests"))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 页面标题 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">系统测试中心</h1>
          <p className="text-gray-600">全面的系统功能测试、性能监控和质量保证</p>
        </div>

        {/* 快速操作面板 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>快速操作</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <SystemTestConsole />
              <PerformanceDashboard />
              <Button onClick={handleRunQuickTest} className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>运行快速测试</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>生成测试报告</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 测试状态概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-blue-600" />
                <span>功能测试</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">核心功能</span>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    通过
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">业务模块</span>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    测试中
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">错误处理</span>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                    待测试
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span>性能测试</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">页面加载</span>
                  <span className="text-sm font-semibold text-green-600">优秀</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">API响应</span>
                  <span className="text-sm font-semibold text-blue-600">良好</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">内存使用</span>
                  <span className="text-sm font-semibold text-green-600">正常</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span>测试覆盖</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">总体覆盖率</span>
                  <span className="text-sm font-semibold text-blue-600">78.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">UI组件</span>
                  <span className="text-sm font-semibold text-green-600">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">业务逻辑</span>
                  <span className="text-sm font-semibold text-yellow-600">67%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 详细测试监控 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TestCoverageMonitor />
          <Card>
            <CardHeader>
              <CardTitle>测试执行历史</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "14:30", test: "自动化测试套件", status: "通过", duration: "2.3s" },
                  { time: "14:25", test: "性能基准测试", status: "通过", duration: "5.1s" },
                  { time: "14:20", test: "UI组件测试", status: "通过", duration: "1.8s" },
                  { time: "14:15", test: "API接口测试", status: "失败", duration: "3.2s" },
                  { time: "14:10", test: "错误处理测试", status: "通过", duration: "2.7s" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{item.time}</span>
                      <span className="text-sm font-medium">{item.test}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={
                          item.status === "通过" ? "text-green-600 border-green-200" : "text-red-600 border-red-200"
                        }
                      >
                        {item.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 自动化测试运行器（后台运行） */}
        <AutomatedTestRunner />
      </div>
    </div>
  )
}
