"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  Download,
  FileSpreadsheet,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  Settings,
} from "lucide-react"

interface ImportExportProps {
  type: "customer" | "task" | "finance"
  onImport?: (data: any[]) => void
  onExport?: (format: string, filters?: any) => void
}

export function DataImportExport({ type, onImport, onExport }: ImportExportProps) {
  const [importProgress, setImportProgress] = useState(0)
  const [exportProgress, setExportProgress] = useState(0)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [importResults, setImportResults] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [exportFormat, setExportFormat] = useState("excel")
  const [exportFilters, setExportFilters] = useState<any>({})

  const typeLabels = {
    customer: "客户数据",
    task: "任务数据",
    finance: "财务数据",
  }

  const supportedFormats = [
    { value: "excel", label: "Excel (.xlsx)", icon: FileSpreadsheet },
    { value: "csv", label: "CSV (.csv)", icon: FileText },
  ]

  // 模拟导入过程
  const handleImport = async () => {
    if (!selectedFile) return

    setIsImporting(true)
    setImportProgress(0)

    // 模拟文件解析和数据验证过程
    const steps = [
      { name: "读取文件", duration: 1000 },
      { name: "数据验证", duration: 1500 },
      { name: "格式转换", duration: 800 },
      { name: "数据导入", duration: 1200 },
    ]

    let currentProgress = 0
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.duration))
      currentProgress += 25
      setImportProgress(currentProgress)
    }

    // 模拟导入结果
    const mockResults = {
      total: 150,
      success: 142,
      failed: 8,
      warnings: 3,
      errors: [
        { row: 15, message: "手机号格式不正确" },
        { row: 23, message: "邮箱地址无效" },
        { row: 45, message: "必填字段为空" },
      ],
    }

    setImportResults(mockResults)
    setIsImporting(false)

    if (onImport) {
      onImport([]) // 传递解析后的数据
    }
  }

  // 模拟导出过程
  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    const steps = [
      { name: "查询数据", duration: 800 },
      { name: "应用筛选", duration: 600 },
      { name: "格式化数据", duration: 1000 },
      { name: "生成文件", duration: 1200 },
    ]

    let currentProgress = 0
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.duration))
      currentProgress += 25
      setExportProgress(currentProgress)
    }

    // 模拟文件下载
    const blob = new Blob(["模拟导出数据"], { type: "application/octet-stream" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${typeLabels[type]}_${new Date().toISOString().split("T")[0]}.${exportFormat === "excel" ? "xlsx" : "csv"}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsExporting(false)
    setExportProgress(0)

    if (onExport) {
      onExport(exportFormat, exportFilters)
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="import" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="import" className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>数据导入</span>
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>数据导出</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <EnhancedCard title={`导入${typeLabels[type]}`} description="支持Excel和CSV格式文件导入">
            <div className="space-y-4">
              {/* 文件选择 */}
              <div className="border-2 border-dashed border-sky-200 rounded-lg p-6 text-center hover:border-sky-300 transition-colors">
                <Upload className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-slate-800">选择要导入的文件</p>
                  <p className="text-sm text-slate-600">支持 .xlsx, .csv 格式，最大 10MB</p>
                  <Input
                    type="file"
                    accept=".xlsx,.csv"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between p-4 bg-sky-50 rounded-lg border border-sky-200">
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="w-8 h-8 text-sky-500" />
                    <div>
                      <p className="font-medium text-slate-800">{selectedFile.name}</p>
                      <p className="text-sm text-slate-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <EnhancedButton onClick={handleImport} disabled={isImporting} icon={isImporting ? Clock : Upload}>
                    {isImporting ? "导入中..." : "开始导入"}
                  </EnhancedButton>
                </div>
              )}

              {/* 导入进度 */}
              {isImporting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">导入进度</span>
                    <span className="text-sm text-slate-600">{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} className="h-2" />
                </div>
              )}

              {/* 导入结果 */}
              {importResults && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <Database className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-slate-800">{importResults.total}</p>
                      <p className="text-sm text-slate-600">总记录数</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-emerald-600">{importResults.success}</p>
                      <p className="text-sm text-slate-600">成功导入</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-red-600">{importResults.failed}</p>
                      <p className="text-sm text-slate-600">导入失败</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-yellow-600">{importResults.warnings}</p>
                      <p className="text-sm text-slate-600">警告信息</p>
                    </div>
                  </div>

                  {importResults.errors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-800">错误详情</h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {importResults.errors.map((error: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-sm p-2 bg-red-50 rounded border border-red-200"
                          >
                            <Badge variant="destructive">第{error.row}行</Badge>
                            <span className="text-red-700">{error.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </EnhancedCard>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <EnhancedCard title={`导出${typeLabels[type]}`} description="选择导出格式和筛选条件">
            <div className="space-y-6">
              {/* 导出格式选择 */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800">导出格式</h4>
                <div className="grid grid-cols-2 gap-3">
                  {supportedFormats.map((format) => {
                    const Icon = format.icon
                    return (
                      <div
                        key={format.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          exportFormat === format.value
                            ? "border-sky-500 bg-sky-50"
                            : "border-slate-200 hover:border-sky-300"
                        }`}
                        onClick={() => setExportFormat(format.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            className={`w-8 h-8 ${exportFormat === format.value ? "text-sky-500" : "text-slate-400"}`}
                          />
                          <div>
                            <p className="font-medium text-slate-800">{format.label}</p>
                            <p className="text-sm text-slate-600">
                              {format.value === "excel" ? "包含格式和公式" : "纯文本格式"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 导出筛选 */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800">筛选条件</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">时间范围</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择时间范围" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部时间</SelectItem>
                        <SelectItem value="today">今天</SelectItem>
                        <SelectItem value="week">本周</SelectItem>
                        <SelectItem value="month">本月</SelectItem>
                        <SelectItem value="quarter">本季度</SelectItem>
                        <SelectItem value="year">本年</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {type === "customer" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">客户等级</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择客户等级" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部等级</SelectItem>
                          <SelectItem value="vip">VIP客户</SelectItem>
                          <SelectItem value="a">A级客户</SelectItem>
                          <SelectItem value="b">B级客户</SelectItem>
                          <SelectItem value="c">C级客户</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {type === "task" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">任务状态</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择任务状态" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部状态</SelectItem>
                          <SelectItem value="pending">待开始</SelectItem>
                          <SelectItem value="progress">进行中</SelectItem>
                          <SelectItem value="completed">已完成</SelectItem>
                          <SelectItem value="cancelled">已取消</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              {/* 导出按钮 */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Settings className="w-4 h-4" />
                  <span>预计导出约 1,247 条记录</span>
                </div>
                <EnhancedButton
                  onClick={handleExport}
                  disabled={isExporting}
                  icon={isExporting ? Clock : Download}
                  className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                >
                  {isExporting ? "导出中..." : "开始导出"}
                </EnhancedButton>
              </div>

              {/* 导出进度 */}
              {isExporting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">导出进度</span>
                    <span className="text-sm text-slate-600">{exportProgress}%</span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
              )}
            </div>
          </EnhancedCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
