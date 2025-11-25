// Web Worker for heavy data processing
interface ProcessingTask {
  type: "CALCULATE_ANALYTICS" | "FILTER_DATA" | "SORT_DATA" | "EXPORT_DATA" | "SEARCH_DATA"
  payload: any
  id: string
}

interface ProcessingResult {
  type: string
  result: any
  id: string
  error?: string
}

// 数据分析计算
function calculateAnalytics(data: any[]): any {
  const startTime = performance.now()

  const analytics = {
    totalRecords: data.length,
    totalValue: 0,
    averageValue: 0,
    statusDistribution: {} as Record<string, number>,
    monthlyTrends: {} as Record<string, number>,
    topCustomers: [] as any[],
    performanceMetrics: {
      processingTime: 0,
      memoryUsage: 0,
    },
  }

  // 计算总价值和平均值
  data.forEach((item) => {
    analytics.totalValue += item.value || 0

    // 状态分布统计
    const status = item.status || "unknown"
    analytics.statusDistribution[status] = (analytics.statusDistribution[status] || 0) + 1

    // 月度趋势分析
    if (item.createdAt) {
      const month = new Date(item.createdAt).toISOString().slice(0, 7)
      analytics.monthlyTrends[month] = (analytics.monthlyTrends[month] || 0) + (item.value || 0)
    }
  })

  analytics.averageValue = analytics.totalValue / analytics.totalRecords

  // 找出前10大客户
  analytics.topCustomers = data
    .sort((a, b) => (b.value || 0) - (a.value || 0))
    .slice(0, 10)
    .map((customer) => ({
      id: customer.id,
      name: customer.name,
      value: customer.value,
      company: customer.company,
    }))

  const endTime = performance.now()
  analytics.performanceMetrics.processingTime = endTime - startTime

  return analytics
}

// 数据过滤
function filterData(data: any[], filters: any): any[] {
  return data.filter((item) => {
    // 状态过滤
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(item.status)) return false
    }

    // 价值范围过滤
    if (filters.valueRange) {
      const value = item.value || 0
      if (value < filters.valueRange.min || value > filters.valueRange.max) return false
    }

    // 日期范围过滤
    if (filters.dateRange) {
      const itemDate = new Date(item.createdAt || item.lastContact)
      const startDate = new Date(filters.dateRange.start)
      const endDate = new Date(filters.dateRange.end)
      if (itemDate < startDate || itemDate > endDate) return false
    }

    // 文本搜索
    if (filters.searchText) {
      const searchText = filters.searchText.toLowerCase()
      const searchFields = ["name", "company", "email", "phone", "title", "description"]
      const hasMatch = searchFields.some((field) => {
        const fieldValue = item[field]
        return fieldValue && fieldValue.toString().toLowerCase().includes(searchText)
      })
      if (!hasMatch) return false
    }

    // 标签过滤
    if (filters.tags && filters.tags.length > 0) {
      const itemTags = item.tags || []
      const hasMatchingTag = filters.tags.some((tag: string) => itemTags.includes(tag))
      if (!hasMatchingTag) return false
    }

    return true
  })
}

// 数据排序
function sortData(data: any[], sortConfig: { field: string; direction: "asc" | "desc" }): any[] {
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.field]
    const bValue = b[sortConfig.field]

    if (aValue === bValue) return 0

    let comparison = 0
    if (typeof aValue === "string" && typeof bValue === "string") {
      comparison = aValue.localeCompare(bValue, "zh-CN")
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      comparison = aValue - bValue
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime()
    } else {
      comparison = String(aValue).localeCompare(String(bValue), "zh-CN")
    }

    return sortConfig.direction === "desc" ? -comparison : comparison
  })
}

// 数据导出处理
function exportData(data: any[], format: "csv" | "json" | "excel"): string {
  switch (format) {
    case "csv":
      if (data.length === 0) return ""

      const headers = Object.keys(data[0])
      const csvHeaders = headers.join(",")
      const csvRows = data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // 处理包含逗号或引号的值
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value || ""
          })
          .join(","),
      )

      return [csvHeaders, ...csvRows].join("\n")

    case "json":
      return JSON.stringify(data, null, 2)

    case "excel":
      // 简化的Excel格式（实际项目中可能需要使用专门的库）
      const excelHeaders = Object.keys(data[0] || {}).join("\t")
      const excelRows = data.map((row) =>
        Object.values(row)
          .map((value) => value || "")
          .join("\t"),
      )
      return [excelHeaders, ...excelRows].join("\n")

    default:
      return JSON.stringify(data)
  }
}

// 高级搜索
function searchData(
  data: any[],
  searchConfig: {
    query: string
    fields: string[]
    fuzzy?: boolean
    caseSensitive?: boolean
  },
): any[] {
  const { query, fields, fuzzy = false, caseSensitive = false } = searchConfig

  if (!query.trim()) return data

  const searchQuery = caseSensitive ? query : query.toLowerCase()

  return data.filter((item) => {
    return fields.some((field) => {
      const fieldValue = item[field]
      if (!fieldValue) return false

      const value = caseSensitive ? fieldValue.toString() : fieldValue.toString().toLowerCase()

      if (fuzzy) {
        // 模糊搜索 - 简单的编辑距离算法
        return calculateLevenshteinDistance(value, searchQuery) <= Math.floor(searchQuery.length * 0.3)
      } else {
        // 精确搜索
        return value.includes(searchQuery)
      }
    })
  })
}

// 计算编辑距离（用于模糊搜索）
function calculateLevenshteinDistance(str1: string, str2: string): number {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
      }
    }
  }

  return matrix[str2.length][str1.length]
}

// 主消息处理器
self.onmessage = (e: MessageEvent<ProcessingTask>) => {
  const { type, payload, id } = e.data

  try {
    let result: any

    switch (type) {
      case "CALCULATE_ANALYTICS":
        result = calculateAnalytics(payload.data)
        break

      case "FILTER_DATA":
        result = filterData(payload.data, payload.filters)
        break

      case "SORT_DATA":
        result = sortData(payload.data, payload.sortConfig)
        break

      case "EXPORT_DATA":
        result = exportData(payload.data, payload.format)
        break

      case "SEARCH_DATA":
        result = searchData(payload.data, payload.searchConfig)
        break

      default:
        throw new Error(`未知的处理类型: ${type}`)
    }

    const response: ProcessingResult = {
      type,
      result,
      id,
    }

    self.postMessage(response)
  } catch (error) {
    const errorResponse: ProcessingResult = {
      type,
      result: null,
      id,
      error: error instanceof Error ? error.message : "处理过程中发生未知错误",
    }

    self.postMessage(errorResponse)
  }
}

// 导出类型定义
export type { ProcessingTask, ProcessingResult }
