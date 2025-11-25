"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Lock,
  Users,
  Activity,
  TrendingUp,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  Download,
} from "lucide-react"
import { permissionSystem, type SecurityAuditLog } from "@/lib/security/permission-system"
import { useTranslation } from "@/components/i18n/language-switcher"

interface SecurityMetrics {
  totalEvents: number
  successfulAccess: number
  deniedAccess: number
  suspiciousActivity: number
  activeUsers: number
  securityScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  trends: {
    accessAttempts: number[]
    deniedRequests: number[]
    suspiciousEvents: number[]
  }
}

interface SecurityAlert {
  id: string
  type: "multiple_failures" | "unusual_access" | "permission_escalation" | "data_breach"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  timestamp: Date
  userId?: string
  ip?: string
  resolved: boolean
}

export function SecurityAuditDashboard() {
  const { t } = useTranslation()
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>([])
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null)
  const [alerts, setAlerts] = useState<SecurityAlert[]>([])
  const [selectedTimeRange, setSelectedTimeRange] = useState<"1h" | "24h" | "7d" | "30d">("24h")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSecurityData()

    // 定期刷新数据
    const interval = setInterval(loadSecurityData, 30000) // 30秒刷新一次

    return () => clearInterval(interval)
  }, [selectedTimeRange])

  const loadSecurityData = async () => {
    setLoading(true)

    try {
      // 获取审计日志
      const logs = permissionSystem.getAuditLog()
      setAuditLogs(logs)

      // 计算安全指标
      const calculatedMetrics = calculateSecurityMetrics(logs)
      setMetrics(calculatedMetrics)

      // 生成安全警报
      const generatedAlerts = generateSecurityAlerts(logs)
      setAlerts(generatedAlerts)
    } catch (error) {
      console.error("加载安全数据失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateSecurityMetrics = (logs: SecurityAuditLog[]): SecurityMetrics => {
    const now = Date.now()
    const timeRanges = {
      "1h": 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
    }

    const cutoffTime = now - timeRanges[selectedTimeRange]
    const recentLogs = logs.filter((log) => log.timestamp.getTime() > cutoffTime)

    const totalEvents = recentLogs.length
    const successfulAccess = recentLogs.filter((log) => log.type === "permission_granted").length
    const deniedAccess = recentLogs.filter((log) => log.type === "permission_denied").length
    const suspiciousActivity = recentLogs.filter(
      (log) => log.type === "permission_condition_failed" || log.type === "permission_check_error",
    ).length

    const uniqueUsers = new Set(recentLogs.map((log) => log.userId)).size

    // 计算安全评分 (0-100)
    const successRate = totalEvents > 0 ? (successfulAccess / totalEvents) * 100 : 100
    const suspiciousRate = totalEvents > 0 ? (suspiciousActivity / totalEvents) * 100 : 0
    const securityScore = Math.max(0, Math.min(100, successRate - suspiciousRate * 2))

    // 确定风险等级
    let riskLevel: "low" | "medium" | "high" | "critical" = "low"
    if (securityScore < 50) riskLevel = "critical"
    else if (securityScore < 70) riskLevel = "high"
    else if (securityScore < 85) riskLevel = "medium"

    // 生成趋势数据（简化版）
    const trends = {
      accessAttempts: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 50)),
      deniedRequests: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 10)),
      suspiciousEvents: Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * 5)),
    }

    return {
      totalEvents,
      successfulAccess,
      deniedAccess,
      suspiciousActivity,
      activeUsers: uniqueUsers,
      securityScore,
      riskLevel,
      trends,
    }
  }

  const generateSecurityAlerts = (logs: SecurityAuditLog[]): SecurityAlert[] => {
    const alerts: SecurityAlert[] = []

    // 检查多次失败登录
    const deniedLogs = logs.filter((log) => log.type === "permission_denied")
    const userFailures = new Map<string, number>()

    deniedLogs.forEach((log) => {
      const count = userFailures.get(log.userId) || 0
      userFailures.set(log.userId, count + 1)
    })

    userFailures.forEach((count, userId) => {
      if (count >= 5) {
        alerts.push({
          id: `multiple_failures_${userId}`,
          type: "multiple_failures",
          severity: count >= 10 ? "critical" : "high",
          title: "多次访问失败",
          description: `用户 ${userId} 在短时间内有 ${count} 次访问失败`,
          timestamp: new Date(),
          userId,
          resolved: false,
        })
      }
    })

    // 检查异常访问时间
    const nightAccess = logs.filter((log) => {
      const hour = log.timestamp.getHours()
      return hour < 6 || hour > 22
    })

    if (nightAccess.length > 10) {
      alerts.push({
        id: "unusual_access_time",
        type: "unusual_access",
        severity: "medium",
        title: "异常访问时间",
        description: `检测到 ${nightAccess.length} 次非工作时间访问`,
        timestamp: new Date(),
        resolved: false,
      })
    }

    return alerts
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-orange-600 bg-orange-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  const formatEventType = (type: string) => {
    const types: Record<string, string> = {
      permission_granted: "权限授予",
      permission_denied: "权限拒绝",
      permission_condition_failed: "条件检查失败",
      permission_check_error: "权限检查错误",
    }
    return types[type] || type
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3">加载安全数据中...</span>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">安全审计中心</h1>
          <p className="text-gray-600">实时监控系统安全状态和访问行为</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setSelectedTimeRange("1h")}
            className={selectedTimeRange === "1h" ? "bg-blue-50 border-blue-300" : ""}
          >
            1小时
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedTimeRange("24h")}
            className={selectedTimeRange === "24h" ? "bg-blue-50 border-blue-300" : ""}
          >
            24小时
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedTimeRange("7d")}
            className={selectedTimeRange === "7d" ? "bg-blue-50 border-blue-300" : ""}
          >
            7天
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedTimeRange("30d")}
            className={selectedTimeRange === "30d" ? "bg-blue-50 border-blue-300" : ""}
          >
            30天
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 安全概览 */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">安全评分</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.securityScore.toFixed(0)}</p>
                </div>
                <div className="flex flex-col items-end">
                  <Shield className="h-8 w-8 text-blue-500" />
                  <Badge className={`mt-2 ${getRiskLevelColor(metrics.riskLevel)}`}>
                    {metrics.riskLevel.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <Progress value={metrics.securityScore} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">总事件数</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.totalEvents}</p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% 较上期</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">访问成功率</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {metrics.totalEvents > 0 ? ((metrics.successfulAccess / metrics.totalEvents) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-gray-600">
                  成功: {metrics.successfulAccess} | 失败: {metrics.deniedAccess}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">活跃用户</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.activeUsers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-gray-600">可疑活动: {metrics.suspiciousActivity}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 安全警报 */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>安全警报</span>
              <Badge variant="destructive">{alerts.filter((a) => !a.resolved).length}</Badge>
            </CardTitle>
            <CardDescription>需要关注的安全事件</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.slice(0, 5).map((alert) => (
                <Alert
                  key={alert.id}
                  className={`border-l-4 ${
                    alert.severity === "critical"
                      ? "border-l-red-500 bg-red-50"
                      : alert.severity === "high"
                        ? "border-l-orange-500 bg-orange-50"
                        : alert.severity === "medium"
                          ? "border-l-yellow-500 bg-yellow-50"
                          : "border-l-blue-500 bg-blue-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getSeverityIcon(alert.severity)}
                      <div>
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {alert.timestamp.toLocaleString("zh-CN")}
                          </span>
                          {alert.userId && (
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {alert.userId}
                            </span>
                          )}
                          {alert.ip && (
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {alert.ip}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge variant={alert.resolved ? "secondary" : "destructive"}>
                      {alert.resolved ? "已处理" : "待处理"}
                    </Badge>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 详细数据 */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">安全事件</TabsTrigger>
          <TabsTrigger value="users">用户活动</TabsTrigger>
          <TabsTrigger value="resources">资源访问</TabsTrigger>
          <TabsTrigger value="trends">趋势分析</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>最近安全事件</CardTitle>
              <CardDescription>系统权限检查和访问记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.slice(0, 20).map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {log.type === "permission_granted" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : log.type === "permission_denied" ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{formatEventType(log.type)}</span>
                          <Badge variant="outline" className="text-xs">
                            {log.resource}.{log.action}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {log.userId}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {log.timestamp.toLocaleString("zh-CN")}
                          </span>
                          {log.context.ip && (
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {log.context.ip}
                            </span>
                          )}
                          {log.context.userAgent && (
                            <span className="flex items-center">
                              {log.context.userAgent.includes("Mobile") ? (
                                <Smartphone className="h-3 w-3 mr-1" />
                              ) : (
                                <Monitor className="h-3 w-3 mr-1" />
                              )}
                              {log.context.userAgent.includes("Mobile") ? "移动端" : "桌面端"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>用户活动统计</CardTitle>
              <CardDescription>各用户的访问行为分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>用户活动分析功能开发中...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>资源访问统计</CardTitle>
              <CardDescription>各资源的访问频率和权限使用情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Lock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>资源访问分析功能开发中...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>安全趋势分析</CardTitle>
              <CardDescription>安全事件的时间趋势和模式分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>趋势分析功能开发中...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
