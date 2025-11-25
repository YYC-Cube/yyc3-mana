interface ValidationRule {
  id: string
  name: string
  type: "required" | "type" | "range" | "pattern" | "custom" | "uniqueness" | "relationship"
  field: string
  config: any
  severity: "error" | "warning" | "info"
  autoFix?: boolean
  description: string
}

interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  suggestions: ValidationSuggestion[]
  score: number
  processedAt: Date
}

interface ValidationError {
  id: string
  ruleId: string
  field: string
  message: string
  severity: "error" | "warning" | "info"
  value: any
  expectedValue?: any
  canAutoFix: boolean
  fixSuggestion?: string
}

interface ValidationWarning {
  id: string
  field: string
  message: string
  impact: "low" | "medium" | "high"
}

interface ValidationSuggestion {
  id: string
  type: "optimization" | "cleanup" | "enhancement"
  message: string
  action: string
}

interface DataQualityMetrics {
  completeness: number
  accuracy: number
  consistency: number
  validity: number
  uniqueness: number
  timeliness: number
  overall: number
}

class DataValidationEngine {
  private rules: Map<string, ValidationRule> = new Map()
  private validationHistory: ValidationResult[] = []
  private customValidators: Map<string, Function> = new Map()
  private dataProfiles: Map<string, any> = new Map()

  constructor() {
    this.initializeDefaultRules()
  }

  // 初始化默认验证规则
  private initializeDefaultRules(): void {
    const defaultRules: ValidationRule[] = [
      {
        id: "required_field",
        name: "必填字段验证",
        type: "required",
        field: "*",
        config: {},
        severity: "error",
        autoFix: false,
        description: "检查必填字段是否为空",
      },
      {
        id: "email_format",
        name: "邮箱格式验证",
        type: "pattern",
        field: "email",
        config: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "邮箱格式不正确",
        },
        severity: "error",
        autoFix: false,
        description: "验证邮箱地址格式",
      },
      {
        id: "phone_format",
        name: "手机号格式验证",
        type: "pattern",
        field: "phone",
        config: {
          pattern: /^1[3-9]\d{9}$/,
          message: "手机号格式不正确",
        },
        severity: "error",
        autoFix: false,
        description: "验证手机号码格式",
      },
      {
        id: "positive_number",
        name: "正数验证",
        type: "range",
        field: "amount",
        config: {
          min: 0,
          message: "数值必须为正数",
        },
        severity: "error",
        autoFix: true,
        description: "确保数值为正数",
      },
      {
        id: "date_range",
        name: "日期范围验证",
        type: "range",
        field: "date",
        config: {
          min: new Date("2020-01-01"),
          max: new Date("2030-12-31"),
          message: "日期超出有效范围",
        },
        severity: "warning",
        autoFix: false,
        description: "验证日期是否在合理范围内",
      },
    ]

    defaultRules.forEach((rule) => this.rules.set(rule.id, rule))
  }

  // 添加验证规则
  addRule(rule: ValidationRule): void {
    this.rules.set(rule.id, rule)
  }

  // 移除验证规则
  removeRule(ruleId: string): void {
    this.rules.delete(ruleId)
  }

  // 添加自定义验证器
  addCustomValidator(name: string, validator: Function): void {
    this.customValidators.set(name, validator)
  }

  // 验证单个数据项
  validateItem(data: any, ruleIds?: string[]): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []
    const suggestions: ValidationSuggestion[] = []

    const rulesToApply = ruleIds
      ? Array.from(this.rules.values()).filter((rule) => ruleIds.includes(rule.id))
      : Array.from(this.rules.values())

    for (const rule of rulesToApply) {
      const result = this.applyRule(data, rule)
      if (result) {
        if (result.severity === "error") {
          errors.push(result)
        } else {
          warnings.push({
            id: result.id,
            field: result.field,
            message: result.message,
            impact: result.severity === "warning" ? "medium" : "low",
          })
        }
      }
    }

    // 生成优化建议
    const optimizationSuggestions = this.generateSuggestions(data, errors, warnings)
    suggestions.push(...optimizationSuggestions)

    const score = this.calculateQualityScore(data, errors, warnings)

    const result: ValidationResult = {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      score,
      processedAt: new Date(),
    }

    this.validationHistory.push(result)
    return result
  }

  // 批量验证数据
  validateBatch(dataArray: any[], ruleIds?: string[]): ValidationResult[] {
    return dataArray.map((data) => this.validateItem(data, ruleIds))
  }

  // 应用单个验证规则
  private applyRule(data: any, rule: ValidationRule): ValidationError | null {
    const fieldValue = this.getFieldValue(data, rule.field)

    switch (rule.type) {
      case "required":
        return this.validateRequired(fieldValue, rule)
      case "type":
        return this.validateType(fieldValue, rule)
      case "range":
        return this.validateRange(fieldValue, rule)
      case "pattern":
        return this.validatePattern(fieldValue, rule)
      case "uniqueness":
        return this.validateUniqueness(fieldValue, rule, data)
      case "custom":
        return this.validateCustom(fieldValue, rule, data)
      default:
        return null
    }
  }

  // 获取字段值
  private getFieldValue(data: any, fieldPath: string): any {
    if (fieldPath === "*") return data

    const keys = fieldPath.split(".")
    let value = data

    for (const key of keys) {
      if (value && typeof value === "object") {
        value = value[key]
      } else {
        return undefined
      }
    }

    return value
  }

  // 必填字段验证
  private validateRequired(value: any, rule: ValidationRule): ValidationError | null {
    if (value === null || value === undefined || value === "") {
      return {
        id: `${rule.id}_${Date.now()}`,
        ruleId: rule.id,
        field: rule.field,
        message: `字段 ${rule.field} 为必填项`,
        severity: rule.severity,
        value,
        canAutoFix: false,
      }
    }
    return null
  }

  // 类型验证
  private validateType(value: any, rule: ValidationRule): ValidationError | null {
    const expectedType = rule.config.type
    const actualType = typeof value

    if (value !== null && value !== undefined && actualType !== expectedType) {
      return {
        id: `${rule.id}_${Date.now()}`,
        ruleId: rule.id,
        field: rule.field,
        message: `字段 ${rule.field} 类型错误，期望 ${expectedType}，实际 ${actualType}`,
        severity: rule.severity,
        value,
        expectedValue: expectedType,
        canAutoFix: true,
        fixSuggestion: `转换为 ${expectedType} 类型`,
      }
    }
    return null
  }

  // 范围验证
  private validateRange(value: any, rule: ValidationRule): ValidationError | null {
    if (value === null || value === undefined) return null

    const { min, max } = rule.config
    const numValue = typeof value === "string" ? Number.parseFloat(value) : value

    if (min !== undefined && numValue < min) {
      return {
        id: `${rule.id}_${Date.now()}`,
        ruleId: rule.id,
        field: rule.field,
        message: `字段 ${rule.field} 值 ${value} 小于最小值 ${min}`,
        severity: rule.severity,
        value,
        expectedValue: min,
        canAutoFix: rule.autoFix || false,
        fixSuggestion: `设置为最小值 ${min}`,
      }
    }

    if (max !== undefined && numValue > max) {
      return {
        id: `${rule.id}_${Date.now()}`,
        ruleId: rule.id,
        field: rule.field,
        message: `字段 ${rule.field} 值 ${value} 大于最大值 ${max}`,
        severity: rule.severity,
        value,
        expectedValue: max,
        canAutoFix: rule.autoFix || false,
        fixSuggestion: `设置为最大值 ${max}`,
      }
    }

    return null
  }

  // 模式验证
  private validatePattern(value: any, rule: ValidationRule): ValidationError | null {
    if (value === null || value === undefined) return null

    const { pattern, message } = rule.config
    const stringValue = String(value)

    if (!pattern.test(stringValue)) {
      return {
        id: `${rule.id}_${Date.now()}`,
        ruleId: rule.id,
        field: rule.field,
        message: message || `字段 ${rule.field} 格式不正确`,
        severity: rule.severity,
        value,
        canAutoFix: false,
      }
    }

    return null
  }

  // 唯一性验证
  private validateUniqueness(value: any, rule: ValidationRule, data: any): ValidationError | null {
    // 这里需要外部数据源支持，暂时返回null
    // 实际实现中需要查询数据库或缓存
    return null
  }

  // 自定义验证
  private validateCustom(value: any, rule: ValidationRule, data: any): ValidationError | null {
    const validator = this.customValidators.get(rule.config.validator)
    if (!validator) return null

    try {
      const result = validator(value, data, rule.config)
      if (!result.isValid) {
        return {
          id: `${rule.id}_${Date.now()}`,
          ruleId: rule.id,
          field: rule.field,
          message: result.message,
          severity: rule.severity,
          value,
          canAutoFix: result.canAutoFix || false,
          fixSuggestion: result.fixSuggestion,
        }
      }
    } catch (error) {
      return {
        id: `${rule.id}_${Date.now()}`,
        ruleId: rule.id,
        field: rule.field,
        message: `自定义验证器执行失败: ${error}`,
        severity: "error",
        value,
        canAutoFix: false,
      }
    }

    return null
  }

  // 自动修复数据
  autoFixData(data: any, validationResult: ValidationResult): any {
    const fixedData = JSON.parse(JSON.stringify(data))

    for (const error of validationResult.errors) {
      if (error.canAutoFix) {
        this.applyAutoFix(fixedData, error)
      }
    }

    return fixedData
  }

  // 应用自动修复
  private applyAutoFix(data: any, error: ValidationError): void {
    const rule = this.rules.get(error.ruleId)
    if (!rule) return

    switch (rule.type) {
      case "type":
        this.fixTypeError(data, error, rule)
        break
      case "range":
        this.fixRangeError(data, error, rule)
        break
      default:
        break
    }
  }

  // 修复类型错误
  private fixTypeError(data: any, error: ValidationError, rule: ValidationRule): void {
    const expectedType = rule.config.type
    const fieldPath = error.field.split(".")
    let current = data

    for (let i = 0; i < fieldPath.length - 1; i++) {
      current = current[fieldPath[i]]
    }

    const lastKey = fieldPath[fieldPath.length - 1]
    const currentValue = current[lastKey]

    switch (expectedType) {
      case "number":
        current[lastKey] = Number.parseFloat(currentValue) || 0
        break
      case "string":
        current[lastKey] = String(currentValue)
        break
      case "boolean":
        current[lastKey] = Boolean(currentValue)
        break
    }
  }

  // 修复范围错误
  private fixRangeError(data: any, error: ValidationError, rule: ValidationRule): void {
    const { min, max } = rule.config
    const fieldPath = error.field.split(".")
    let current = data

    for (let i = 0; i < fieldPath.length - 1; i++) {
      current = current[fieldPath[i]]
    }

    const lastKey = fieldPath[fieldPath.length - 1]
    const currentValue = current[lastKey]

    if (min !== undefined && currentValue < min) {
      current[lastKey] = min
    } else if (max !== undefined && currentValue > max) {
      current[lastKey] = max
    }
  }

  // 生成优化建议
  private generateSuggestions(
    data: any,
    errors: ValidationError[],
    warnings: ValidationWarning[],
  ): ValidationSuggestion[] {
    const suggestions: ValidationSuggestion[] = []

    // 基于错误生成建议
    if (errors.length > 0) {
      suggestions.push({
        id: "fix_errors",
        type: "cleanup",
        message: `发现 ${errors.length} 个数据错误`,
        action: "运行自动修复或手动修正数据",
      })
    }

    // 基于警告生成建议
    if (warnings.length > 0) {
      suggestions.push({
        id: "review_warnings",
        type: "optimization",
        message: `发现 ${warnings.length} 个数据警告`,
        action: "检查数据质量并考虑优化",
      })
    }

    // 数据完整性建议
    const missingFields = this.detectMissingFields(data)
    if (missingFields.length > 0) {
      suggestions.push({
        id: "complete_data",
        type: "enhancement",
        message: `检测到 ${missingFields.length} 个可选字段缺失`,
        action: "考虑补充完整数据以提高数据质量",
      })
    }

    return suggestions
  }

  // 检测缺失字段
  private detectMissingFields(data: any): string[] {
    const commonFields = ["id", "name", "email", "phone", "address", "createTime", "updateTime"]
    const missingFields: string[] = []

    for (const field of commonFields) {
      if (!(field in data) || data[field] === null || data[field] === undefined) {
        missingFields.push(field)
      }
    }

    return missingFields
  }

  // 计算数据质量分数
  private calculateQualityScore(data: any, errors: ValidationError[], warnings: ValidationWarning[]): number {
    const totalFields = Object.keys(data).length
    const errorWeight = 10
    const warningWeight = 3

    const errorPenalty = errors.length * errorWeight
    const warningPenalty = warnings.length * warningWeight
    const totalPenalty = errorPenalty + warningPenalty

    const maxScore = 100
    const score = Math.max(0, maxScore - (totalPenalty / totalFields) * 10)

    return Math.round(score * 100) / 100
  }

  // 计算数据质量指标
  calculateQualityMetrics(dataArray: any[]): DataQualityMetrics {
    const results = this.validateBatch(dataArray)

    const totalRecords = dataArray.length
    const validRecords = results.filter((r) => r.isValid).length
    const totalFields = dataArray.reduce((sum, data) => sum + Object.keys(data).length, 0)
    const filledFields = dataArray.reduce((sum, data) => {
      return sum + Object.values(data).filter((v) => v !== null && v !== undefined && v !== "").length
    }, 0)

    const completeness = totalFields > 0 ? (filledFields / totalFields) * 100 : 0
    const accuracy = totalRecords > 0 ? (validRecords / totalRecords) * 100 : 0

    // 简化的一致性计算
    const consistency = this.calculateConsistency(dataArray)

    // 有效性基于验证结果
    const validity = accuracy

    // 唯一性计算
    const uniqueness = this.calculateUniqueness(dataArray)

    // 时效性（基于时间戳字段）
    const timeliness = this.calculateTimeliness(dataArray)

    const overall = (completeness + accuracy + consistency + validity + uniqueness + timeliness) / 6

    return {
      completeness: Math.round(completeness * 100) / 100,
      accuracy: Math.round(accuracy * 100) / 100,
      consistency: Math.round(consistency * 100) / 100,
      validity: Math.round(validity * 100) / 100,
      uniqueness: Math.round(uniqueness * 100) / 100,
      timeliness: Math.round(timeliness * 100) / 100,
      overall: Math.round(overall * 100) / 100,
    }
  }

  // 计算数据一致性
  private calculateConsistency(dataArray: any[]): number {
    if (dataArray.length === 0) return 100

    const fieldTypes: { [key: string]: Set<string> } = {}

    // 分析每个字段的类型一致性
    dataArray.forEach((data) => {
      Object.entries(data).forEach(([key, value]) => {
        if (!fieldTypes[key]) {
          fieldTypes[key] = new Set()
        }
        fieldTypes[key].add(typeof value)
      })
    })

    const consistentFields = Object.values(fieldTypes).filter((types) => types.size === 1).length
    const totalFields = Object.keys(fieldTypes).length

    return totalFields > 0 ? (consistentFields / totalFields) * 100 : 100
  }

  // 计算数据唯一性
  private calculateUniqueness(dataArray: any[]): number {
    if (dataArray.length === 0) return 100

    const uniqueRecords = new Set(dataArray.map((data) => JSON.stringify(data))).size
    return (uniqueRecords / dataArray.length) * 100
  }

  // 计算数据时效性
  private calculateTimeliness(dataArray: any[]): number {
    const now = new Date()
    const timeFields = ["createTime", "updateTime", "timestamp", "date"]

    let totalTimeScore = 0
    let recordsWithTime = 0

    dataArray.forEach((data) => {
      for (const field of timeFields) {
        if (data[field]) {
          const recordTime = new Date(data[field])
          const daysDiff = (now.getTime() - recordTime.getTime()) / (1000 * 60 * 60 * 24)

          // 越新的数据分数越高
          const timeScore = Math.max(0, 100 - daysDiff)
          totalTimeScore += timeScore
          recordsWithTime++
          break
        }
      }
    })

    return recordsWithTime > 0 ? totalTimeScore / recordsWithTime : 100
  }

  // 获取验证历史
  getValidationHistory(limit?: number): ValidationResult[] {
    const history = [...this.validationHistory].reverse()
    return limit ? history.slice(0, limit) : history
  }

  // 获取规则列表
  getRules(): ValidationRule[] {
    return Array.from(this.rules.values())
  }

  // 清理历史记录
  clearHistory(): void {
    this.validationHistory = []
  }

  // 导出验证报告
  exportValidationReport(results: ValidationResult[]): string {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalValidations: results.length,
        validRecords: results.filter((r) => r.isValid).length,
        averageScore: results.reduce((sum, r) => sum + r.score, 0) / results.length,
      },
      details: results.map((result) => ({
        isValid: result.isValid,
        score: result.score,
        errorCount: result.errors.length,
        warningCount: result.warnings.length,
        suggestionCount: result.suggestions.length,
        processedAt: result.processedAt,
      })),
    }

    return JSON.stringify(report, null, 2)
  }
}

// 创建全局验证引擎实例
export const dataValidationEngine = new DataValidationEngine()

// 便捷函数
export const validateData = (data: any, ruleIds?: string[]) => {
  return dataValidationEngine.validateItem(data, ruleIds)
}

export const validateDataBatch = (dataArray: any[], ruleIds?: string[]) => {
  return dataValidationEngine.validateBatch(dataArray, ruleIds)
}

export const autoFixData = (data: any, validationResult: ValidationResult) => {
  return dataValidationEngine.autoFixData(data, validationResult)
}

export const getDataQualityMetrics = (dataArray: any[]) => {
  return dataValidationEngine.calculateQualityMetrics(dataArray)
}
