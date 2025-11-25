"use client"

import { useState, useEffect } from "react"
import { Activity, AlertTriangle, Info, XCircle, User, Database, Shield, Zap, Bug, Server, Network } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface LogEntry {
  id: string
  timestamp: string
  level: "debug" | "info" | "warn" | "error" | "fatal"
  category: "system" | "security" | "user" | "api" | "database" | "network"
  message: string
  details: string
  userId?: string
  username?: string
  ip: string
  userAgent: string
  module: string
  action: string
  resource?: string
  duration?: number
  status: "success" | "failure" | "pending"
  tags: string[]
}

interface LogStats {
  totalLogs: number
  todayLogs: number
  errorLogs: number
  warningLogs: number
  errorRate: number
  avgResponseTime: number
  topUsers: Array<{ username: string; count: number }>
  topModules: Array<{ module: string; count: number }>
}

interface LogConfig {
  enabled: boolean
  level: "debug" | "info" | "warn" | "error"
  retention: number
  maxSize: number
  autoCleanup: boolean
  realTimeMonitoring: boolean
  alertThreshold: number
  emailNotification: boolean
  categories: {
    system: boolean
    security: boolean
    user: boolean
    api: boolean
    database: boolean
    network: boolean
  }
}

export default function LogManagement() {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("today")
  const [realTimeEnabled, setRealTimeEnabled] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2024-01-02 14:30:25",
      level: "error",
      category: "security",
      message: "检测到SQL注入攻击尝试",
      details: "用户尝试在登录表单中注入恶意SQL代码，已被系统拦截",
      userId: "unknown",
      username: "unknown",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      module: "auth",
      action: "login",
      resource: "/api/auth/login",
      duration: 1250,
      status: "failure",
      tags: ["security", "attack", "sql-injection"],
    },
    {
      id: "2",
      timestamp: "2024-01-02 14:25:10",
      level: "warn",
      category: "user",
      message: "用户登录失败次数过多",
      details: "用户admin@jinlan.com在5分钟内尝试登录失败3次，账户已临时锁定",
      userId: "1",
      username: "admin@jinlan.com",
      ip: "203.208.60.1",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      module: "auth",
      action: "login",
      resource: "/api/auth/login",
      duration: 890,
      status: "failure",
      tags: ["auth", "failed-login", "rate-limit"],
    },
    {
      id: "3",
      timestamp: "2024-01-02 14:20:15",
      level: "info",
      category: "user",
      message: "用户成功登录系统",
      details: "用户manager@jinlan.com成功登录系统，来源IP: 114.114.114.114",
      userId: "2",
      username: "manager@jinlan.com",
      ip: "114.114.114.114",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      module: "auth",
      action: "login",
      resource: "/api/auth/login",
      duration: 456,
      status: "success",
      tags: ["auth", "login", "success"],
    },
    {
      id: "4",
      timestamp: "2024-01-02 14:15:30",
      level: "error",
      category: "database",
      message: "数据库连接超时",
      details: "连接到主数据库时发生超时，尝试连接备用数据库",
      ip: "127.0.0.1",
      userAgent: "System",
      module: "database",
      action: "connect",
      resource: "mysql://localhost:3306/jinlan_db",
      duration: 30000,
      status: "failure",
      tags: ["database", "timeout", "connection"],
    },
    {
      id: "5",
      timestamp: "2024-01-02 14:10:45",
      level: "info",
      category: "system",
      message: "系统定时任务执行完成",
      details: "数据备份任务执行成功，备份文件大小: 2.5GB",
      ip: "127.0.0.1",
      userAgent: "System Scheduler",
      module: "scheduler",
      action: "backup",
      resource: "/data/backup/",
      duration: 180000,
      status: "success",
      tags: ["system", "backup", "scheduled"],
    },
    {
      id: "6",
      timestamp: "2024-01-02 14:05:20",
      level: "warn",
      category: "api",
      message: "API调用频率超过限制",
      details: "客户端8.8.8.8在1分钟内调用API超过100次，已触发限流",
      ip: "8.8.8.8",
      userAgent: "API Client v1.0",
      module: "api",
      action: "rate_limit",
      resource: "/api/v1/users",
      duration: 50,
      status: "failure",
      tags: ["api", "rate-limit", "throttle"],
    },
    {
      id: "7",
      timestamp: "2024-01-02 14:00:00",
      level: "info",
      category: "network",
      message: "网络连接状态检查",
      details: "所有网络连接正常，延迟: 15ms",
      ip: "127.0.0.1",
      userAgent: "Network Monitor",
      module: "network",
      action: "health_check",
      duration: 15,
      status: "success",
      tags: ["network", "health", "monitoring"],
    },
    {
      id: "8",
      timestamp: "2024-01-02 13:55:35",
      level: "debug",
      category: "system",
      message: "缓存清理任务开始",
      details: "开始清理过期的Redis缓存数据",
      ip: "127.0.0.1",
      userAgent: "Cache Manager",
      module: "cache",
      action: "cleanup",
      duration: 5000,
      status: "success",
      tags: ["cache", "cleanup", "redis"],
    },
  ])

  const [logStats, setLogStats] = useState<LogStats>({
    totalLogs: 8,
    todayLogs: 8,
    errorLogs: 2,
    warningLogs: 2,
    errorRate: 25,
    avgResponseTime: 1250,
    topUsers: [
      { username: "admin@jinlan.com", count: 15 },
      { username: "manager@jinlan.com", count: 12 },
      { username: "employee@jinlan.com", count: 8 },
    ],
    topModules: [
      { module: "auth", count: 25 },
      { module: "api", count: 18 },
      { module: "system", count: 12 },
    ],
  })

  const [logConfig, setLogConfig] = useState<LogConfig>({
    enabled: true,
    level: "info",
    retention: 30,
    maxSize: 1024,
    autoCleanup: true,
    realTimeMonitoring: true,
    alertThreshold: 10,
    emailNotification: true,
    categories: {
      system: true,
      security: true,
      user: true,
      api: true,
      database: true,
      network: true,
    },
  })

  useEffect(() => {
    // 计算日志统计数据
    const total = logs.length
    const today = new Date().toDateString()
    const todayCount = logs.filter((log) => new Date(log.timestamp).toDateString() === today).length
    const errorCount = logs.filter((log) => log.level === "error").length
    const warningCount = logs.filter((log) => log.level === "warn").length

    setLogStats((prev) => ({
      ...prev,
      totalLogs: total,
      todayLogs: todayCount,
      errorLogs: errorCount,
      warningLogs: warningCount,
      errorRate: total > 0 ? (errorCount / total) * 100 : 0,
    }))
  }, [logs])

  useEffect(() => {
    // 实时日志更新
    if (realTimeEnabled && autoRefresh) {
      const interval = setInterval(() => {
        // 模拟新日志
        const newLog: LogEntry = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleString(),
          level: ["info", "warn", "error"][Math.floor(Math.random() * 3)] as any,
          category: ["system", "user", "api"][Math.floor(Math.random() * 3)] as any,
          message: "实时日志消息",
          details: "这是一条实时生成的日志消息",
          ip: "127.0.0.1",
          userAgent: "System",
          module: "system",
          action: "monitor",
          status: "success",
          tags: ["real-time", "monitor"],
        }

        setLogs((prev) => [newLog, ...prev.slice(0, 49)]) // 保持最新50条
      }, 10000) // 每10秒更新一次

      return () => clearInterval(interval)
    }
  }, [realTimeEnabled, autoRefresh])

  const handleExportLogs = () => {
    const csvData = [
      ["时间", "级别", "分类", "消息", "用户", "IP地址", "模块", "操作", "状态"],
      ...filteredLogs.map((log) => [
        log.timestamp,
        log.level,
        log.category,
        log.message,
        log.username || "系统",
        log.ip,
        log.module,
        log.action,
        log.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `logs-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "导出成功",
      description: "日志数据已导出到CSV文件",
    })
  }

  const handleClearLogs = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setLogs([])
      toast({
        title: "清理完成",
        description: "所有日志已清理",
      })
    } catch (error) {
      toast({
        title: "清理失败",
        description: "无法清理日志，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleConfigChange = (key: keyof LogConfig, value: any) => {
    setLogConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleCategoryChange = (category: keyof LogConfig["categories"], enabled: boolean) => {
    setLogConfig((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: enabled,
      },
    }))
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "debug":
        return "text-gray-600 bg-gray-50"
      case "info":
        return "text-blue-600 bg-blue-50"
      case "warn":
        return "text-yellow-600 bg-yellow-50"
      case "error":
        return "text-red-600 bg-red-50"
      case "fatal":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }
"use client"

import { useState, useEffect } from "react"
import { 
  Activity, AlertTriangle, Info, XCircle, User, Database, Shield, Zap, 
  Bug, Server, Network, CheckCircle, Cog, Calendar, SlidersHorizontal, 
  Trash, Download, Eye, Refresh, ChevronDown, Plus, Minus 
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface LogEntry {
  id: string
  timestamp: string
  level: "debug" | "info" | "warn" | "error" | "fatal"
  category: "system" | "security" | "user" | "api" | "database" | "network"
  message: string
  details: string
  userId?: string
  username?: string
  ip: string
  userAgent: string
  module: string
  action: string
  resource?: string
  duration?: number
  status: "success" | "failure" | "pending"
  tags: string[]
}

interface LogStats {
  totalLogs: number
  todayLogs: number
  errorLogs: number
  warningLogs: number
  errorRate: number
  avgResponseTime: number
  topUsers: Array<{ username: string; count: number }>
  topModules: Array<{ module: string; count: number }>
}

interface LogConfig {
  enabled: boolean
  level: "debug" | "info" | "warn" | "error"
  retention: number
  maxSize: number
  autoCleanup: boolean
  realTimeMonitoring: boolean
  alertThreshold: number
  emailNotification: boolean
  categories: {
    system: boolean
    security: boolean
    user: boolean
    api: boolean
    database: boolean
    network: boolean
  }
}

export default function LogManagement() {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("today")
  const [realTimeEnabled, setRealTimeEnabled] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showConfigPanel, setShowConfigPanel] = useState(false)
  const [logsPerPage, setLogsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2024-01-02 14:30:25",
      level: "error",
      category: "security",
      message: "检测到SQL注入攻击尝试",
      details: "用户尝试在登录表单中注入恶意SQL代码，已被系统拦截",
      userId: "unknown",
      username: "unknown",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      module: "auth",
      action: "login",
      resource: "/api/auth/login",
      duration: 1250,
      status: "failure",
      tags: ["security", "attack", "sql-injection"],
    },
    {
      id: "2",
      timestamp: "2024-01-02 14:25:10",
      level: "warn",
      category: "user",
      message: "用户登录失败次数过多",
      details: "用户admin@jinlan.com在5分钟内尝试登录失败3次，账户已临时锁定",
      userId: "1",
      username: "admin@jinlan.com",
      ip: "203.208.60.1",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      module: "auth",
      action: "login",
      resource: "/api/auth/login",
      duration: 890,
      status: "failure",
      tags: ["auth", "failed-login", "rate-limit"],
    },
    {
      id: "3",
      timestamp: "2024-01-02 14:20:15",
      level: "info",
      category: "user",
      message: "用户成功登录系统",
      details: "用户manager@jinlan.com成功登录系统，来源IP: 114.114.114.114",
      userId: "2",
      username: "manager@jinlan.com",
      ip: "114.114.114.114",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      module: "auth",
      action: "login",
      resource: "/api/auth/login",
      duration: 456,
      status: "success",
      tags: ["auth", "login", "success"],
    },
    {
      id: "4",
      timestamp: "2024-01-02 14:15:30",
      level: "error",
      category: "database",
      message: "数据库连接超时",
      details: "连接到主数据库时发生超时，尝试连接备用数据库",
      ip: "127.0.0.1",
      userAgent: "System",
      module: "database",
      action: "connect",
      resource: "mysql://localhost:3306/jinlan_db",
      duration: 30000,
      status: "failure",
      tags: ["database", "timeout", "connection"],
    },
    {
      id: "5",
      timestamp: "2024-01-02 14:10:45",
      level: "info",
      category: "system",
      message: "系统定时任务执行完成",
      details: "数据备份任务执行成功，备份文件大小: 2.5GB",
      ip: "127.0.0.1",
      userAgent: "System Scheduler",
      module: "scheduler",
      action: "backup",
      resource: "/data/backup/",
      duration: 180000,
      status: "success",
      tags: ["system", "backup", "scheduled"],
    },
    {
      id: "6",
      timestamp: "2024-01-02 14:05:20",
      level: "warn",
      category: "api",
      message: "API调用频率超过限制",
      details: "客户端8.8.8.8在1分钟内调用API超过100次，已触发限流",
      ip: "8.8.8.8",
      userAgent: "API Client v1.0",
      module: "api",
      action: "rate_limit",
      resource: "/api/v1/users",
      duration: 50,
      status: "failure",
      tags: ["api", "rate-limit", "throttle"],
    },
    {
      id: "7",
      timestamp: "2024-01-02 14:00:00",
      level: "info",
      category: "network",
      message: "网络连接状态检查",
      details: "所有网络连接正常，延迟: 15ms",
      ip: "127.0.0.1",
      userAgent: "Network Monitor",
      module: "network",
      action: "health_check",
      duration: 15,
      status: "success",
      tags: ["network", "health", "monitoring"],
    },
    {
      id: "8",
      timestamp: "2024-01-02 13:55:35",
      level: "debug",
      category: "system",
      message: "缓存清理任务开始",
      details: "开始清理过期的Redis缓存数据",
      ip: "127.0.0.1",
      userAgent: "Cache Manager",
      module: "cache",
      action: "cleanup",
      duration: 5000,
      status: "success",
      tags: ["cache", "cleanup", "redis"],
    },
    {
      id: "9",
      timestamp: "2024-01-02 13:50:10",
      level: "info",
      category: "api",
      message: "API请求成功",
      details: "GET /api/v1/products/123 200 OK",
      ip: "10.0.0.5",
      userAgent: "Frontend App v2.1",
      module: "api",
      action: "get",
      resource: "/api/v1/products/123",
      duration: 256,
      status: "success",
      tags: ["api", "success", "product"],
    },
    {
      id: "10",
      timestamp: "2024-01-02 13:45:45",
      level: "warn",
      category: "database",
      message: "数据库查询缓慢",
      details: "查询耗时超过500ms: SELECT * FROM orders WHERE created_at > '2023-01-01'",
      ip: "127.0.0.1",
      userAgent: "Backend Service",
      module: "database",
      action: "query",
      resource: "orders",
      duration: 875,
      status: "success",
      tags: ["database", "slow-query", "performance"],
    }
  ])

  const [logStats, setLogStats] = useState<LogStats>({
    totalLogs: 10,
    todayLogs: 10,
    errorLogs: 2,
    warningLogs: 3,
    errorRate: 20,
    avgResponseTime: 5200,
    topUsers: [
      { username: "admin@jinlan.com", count: 15 },
      { username: "manager@jinlan.com", count: 12 },
      { username: "employee@jinlan.com", count: 8 },
    ],
    topModules: [
      { module: "auth", count: 25 },
      { module: "api", count: 18 },
      { module: "system", count: 12 },
    ],
  })

  const [logConfig, setLogConfig] = useState<LogConfig>({
    enabled: true,
    level: "info",
    retention: 30,
    maxSize: 1024,
    autoCleanup: true,
    realTimeMonitoring: true,
    alertThreshold: 10,
    emailNotification: true,
    categories: {
      system: true,
      security: true,
      user: true,
      api: true,
      database: true,
      network: true,
    },
  })

  // 计算过滤后的日志
  const filteredLogs = logs.filter(log => {
    // 搜索词过滤
    const searchMatch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.ip.includes(searchTerm) ||
                        log.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // 日志级别过滤
    const levelMatch = selectedLevel === "all" || log.level === selectedLevel;
    
    // 分类过滤
    const categoryMatch = selectedCategory === "all" || log.category === selectedCategory;
    
    // 日期范围过滤（简化实现，实际应根据时间戳判断）
    const dateMatch = true; // 简化处理，实际项目中需要实现日期范围过滤
    
    return searchMatch && levelMatch && categoryMatch && dateMatch;
  })

  // 分页处理
  const startIndex = (currentPage - 1) * logsPerPage;
  const endIndex = startIndex + logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  useEffect(() => {
    // 计算日志统计数据
    const total = logs.length;
    const today = new Date().toDateString();
    const todayCount = logs.filter(log => new Date(log.timestamp).toDateString() === today).length;
    const errorCount = logs.filter(log => log.level === "error").length;
    const warningCount = logs.filter(log => log.level === "warn").length;
    
    // 计算平均响应时间
    const validDurations = logs.filter(log => log.duration !== undefined).map(log => log.duration);
    const avgResponseTime = validDurations.length > 0 ? 
      Math.round(validDurations.reduce((sum, duration) => sum + duration, 0) / validDurations.length) : 0;
    
    setLogStats({
      totalLogs: total,
      todayLogs: todayCount,
      errorLogs: errorCount,
      warningLogs: warningCount,
      errorRate: total > 0 ? Math.round((errorCount / total) * 100) : 0,
      avgResponseTime: avgResponseTime,
      topUsers: logStats.topUsers,
      topModules: logStats.topModules,
    });
  }, [logs]);

  useEffect(() => {
    // 实时日志更新
    if (realTimeEnabled && autoRefresh) {
      const interval = setInterval(() => {
        // 模拟新日志
        const levels = ["info", "warn", "error", "debug"];
        const categories = ["system", "user", "api", "database", "network", "security"];
        const actions = ["request", "login", "query", "update", "delete", "create"];
        const statuses = ["success", "failure"];
        
        const newLog: LogEntry = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleString(),
          level: levels[Math.floor(Math.random() * levels.length)] as any,
          category: categories[Math.floor(Math.random() * categories.length)] as any,
          message: `自动生成的实时日志 - ${actions[Math.floor(Math.random() * actions.length)]}`,
          details: "这是一条系统自动生成的实时监控日志，用于演示实时更新功能",
          ip: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
          userAgent: "System Monitor",
          module: "realtime",
          action: actions[Math.floor(Math.random() * actions.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          tags: ["real-time", "auto-generated"],
          // 其他字段设为默认值
          userId: undefined,
          username: undefined,
          resource: undefined,
          duration: undefined,
        };
        
        setLogs(prev => [newLog, ...prev.slice(0, 49)]); // 保持最新50条
      }, 10000); // 每10秒更新一次
      
      return () => clearInterval(interval);
    }
  }, [realTimeEnabled, autoRefresh]);

  // 处理日志导出
  const handleExportLogs = () => {
    if (filteredLogs.length === 0) {
      toast({
        title: "导出失败",
        description: "没有可导出的日志记录",
        variant: "destructive",
      });
      return;
    }
    
    const csvData = [
      ["时间", "级别", "分类", "消息", "用户", "IP地址", "模块", "操作", "状态"],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.level,
        log.category,
        log.message,
        log.username || "系统",
        log.ip,
        log.module,
        log.action,
        log.status,
      ]),
    ]
      .map(row => row.join(","))
      .join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `日志导出-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "导出成功",
      description: "日志数据已导出到CSV文件",
    });
  };

  // 处理清除日志
  const getLevelIcon = (level: string) => {
    switch (level) {
      case "debug":
        return <Bug className="w-4 h-4 text-gray-600" />
      case "info":
        return <Info className="w-4 h-4 text-blue-600" />
      case "warn":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "fatal":
        return <XCircle className="w-4 h-4 text-purple-600" />
      default:
        return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "system":
        return <Server className="w-4 h-4" />
      case "security":
        return <Shield className="w-4 h-4" />
      case "user":
        return <User className="w-4 h-4" />
      case "api":
        return <Zap className="w-4 h-4" />
      case "database":
        return <Database className="w-4 h-4" />
      case "network":
        return <Network className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
