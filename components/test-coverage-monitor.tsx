"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Target } from "lucide-react"

interface CoverageData {
  category: string
  total: number
  covered: number
  percentage: number
  status: "excellent" | "good" | "needs-improvement" | "poor"
}

export function TestCoverageMonitor() {
  const [coverageData, setCoverageData] = useState<CoverageData[]>([])
  const [overallCoverage, setOverallCoverage] = useState(0)

  useEffect(() => {
    // 模拟测试覆盖率数据
    const mockCoverageData: CoverageData[] = [
      {
        category: "UI组件",
        total: 25,
        covered: 23,
        percentage: 92,
        status: "excellent",
      },
      {
        category: "业务逻辑",
        total: 18,
        covered: 15,
        percentage: 83,
        status: "good",
      },
      {
        category: "API接口",
        total: 12,
        covered: 8,
        percentage: 67,
        status: "needs-improvement",
      },
      {
        category: "错误处理",
        total: 15,
        covered: 12,
        percentage: 80,
        status: "good",
      },
      {
        category: "性能测试",
        total: 8,
        covered: 6,
        percentage: 75,
        status: "good",
      },
      {
        category: "安全测试",
        total: 10,
        covered: 4,
        percentage: 40,
        status: "poor",
      },
    ]

    setCoverageData(mockCoverageData)

    // 计算总体覆盖率
    const totalItems = mockCoverageData.reduce((sum, item) => sum + item.total, 0)
    const coveredItems = mockCoverageData.reduce((sum, item) => sum + item.covered, 0)
    const overall = (coveredItems / totalItems) * 100

    setOverallCoverage(overall)
  }, [])

  const getStatusColor = (status: CoverageData["status"]) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-50 border-green-200"
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "needs-improvement":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "poor":
        return "text-red-600 bg-red-50 border-red-200"
    }
  }

  const getStatusIcon = (status: CoverageData["status"]) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "good":
        return <Target className="w-4 h-4 text-blue-500" />
      case "needs-improvement":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "poor":
        return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusText = (status: CoverageData["status"]) => {
    switch (status) {
      case "excellent":
        return "优秀"
      case "good":
        return "良好"
      case "needs-improvement":
        return "需改进"
      case "poor":
        return "较差"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>测试覆盖率监控</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 总体覆盖率 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">总体覆盖率</span>
            <span className="text-2xl font-bold text-blue-600">{overallCoverage.toFixed(1)}%</span>
          </div>
          <Progress value={overallCoverage} className="h-3" />
          <p className="text-sm text-gray-600 mt-1">
            {overallCoverage >= 90
              ? "覆盖率优秀，测试质量很高"
              : overallCoverage >= 80
                ? "覆盖率良好，建议继续提升"
                : overallCoverage >= 70
                  ? "覆盖率一般，需要加强测试"
                  : "覆盖率较低，急需改进"}
          </p>
        </div>

        {/* 分类覆盖率 */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">分类覆盖详情</h4>
          {coverageData.map((item, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getStatusColor(item.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {getStatusText(item.status)}
                  </Badge>
                  <span className="text-sm font-semibold">{item.percentage}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">
                  {item.covered}/{item.total} 项已测试
                </span>
                <span className="text-xs text-gray-600">还需 {item.total - item.covered} 项</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>

        {/* 改进建议 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">改进建议</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {coverageData
              .filter((item) => item.status === "poor" || item.status === "needs-improvement")
              .map((item, index) => (
                <li key={index}>
                  • {item.category}: 当前覆盖率 {item.percentage}%，建议增加{" "}
                  {Math.ceil(((item.total * 0.8 - item.covered) / item.total) * 100)}% 的测试用例
                </li>
              ))}
            {coverageData.every((item) => item.status === "excellent" || item.status === "good") && (
              <li>• 当前测试覆盖率表现良好，建议保持并持续优化测试质量</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
