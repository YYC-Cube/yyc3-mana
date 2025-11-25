"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Brain,
  TrendingUp,
  MessageSquare,
  FileText,
  Lightbulb,
  Activity,
  Zap,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Settings,
} from "lucide-react"
import { ollamaService, analyzeBusinessData, askAI, generateAIReport } from "@/lib/ollama-service"

interface AnalysisResult {
  id: string
  type: string
  title: string
  content: string
  timestamp: Date
  status: "success" | "error" | "processing"
}

export function AIAnalysisCenter() {
  const [isConnected, setIsConnected] = useState(false)
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [question, setQuestion] = useState("")
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [activeTab, setActiveTab] = useState("dashboard")

  // 检查Ollama连接状态
  useEffect(() => {
    checkOllamaConnection()
  }, [])

  const checkOllamaConnection = async () => {
    try {
      const connected = await ollamaService.checkConnection()
      setIsConnected(connected)

      if (connected) {
        const models = await ollamaService.getAvailableModels()
        setAvailableModels(models)
        if (models.length > 0 && !selectedModel) {
          setSelectedModel(models[0])
        }
      }
    } catch (error) {
      console.error("检查Ollama连接失败:", error)
      setIsConnected(false)
    }
  }

  // 模拟业务数据
  const getBusinessData = () => ({
    sales: {
      monthly: [
        { month: "1月", revenue: 2200000, orders: 156, customers: 89 },
        { month: "2月", revenue: 2400000, orders: 178, customers: 95 },
        { month: "3月", revenue: 2600000, orders: 189, customers: 102 },
        { month: "4月", revenue: 2750000, orders: 201, customers: 108 },
        { month: "5月", revenue: 2800000, orders: 195, customers: 112 },
        { month: "6月", revenue: 2847392, orders: 203, customers: 118 },
      ],
      total: 2847392,
      growth: 12.5,
    },
    customers: {
      total: 118,
      new: 45,
      retention: 85.2,
      satisfaction: 4.2,
    },
    tasks: {
      completed: 156,
      pending: 23,
      overdue: 5,
      efficiency: 92,
    },
  })

  // 执行数据分析
  const performDataAnalysis = async (analysisType: string) => {
    if (!isConnected) {
      alert("AI服务未连接，请检查Ollama服务状态")
      return
    }

    setIsLoading(true)
    const analysisId = `analysis_${Date.now()}`

    // 添加处理中的结果
    const processingResult: AnalysisResult = {
      id: analysisId,
      type: analysisType,
      title: getAnalysisTitle(analysisType),
      content: "正在分析中...",
      timestamp: new Date(),
      status: "processing",
    }
    setAnalysisResults((prev) => [processingResult, ...prev])

    try {
      const businessData = getBusinessData()
      const result = await analyzeBusinessData(businessData, analysisType as any)

      // 更新结果
      setAnalysisResults((prev) =>
        prev.map((item) => (item.id === analysisId ? { ...item, content: result, status: "success" as const } : item)),
      )
    } catch (error) {
      console.error("AI分析失败:", error)
      setAnalysisResults((prev) =>
        prev.map((item) =>
          item.id === analysisId ? { ...item, content: `分析失败: ${error}`, status: "error" as const } : item,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  // 智能问答
  const handleAskQuestion = async () => {
    if (!question.trim() || !isConnected) return

    setIsLoading(true)
    const questionId = `question_${Date.now()}`

    const processingResult: AnalysisResult = {
      id: questionId,
      type: "question",
      title: `问题: ${question.slice(0, 50)}...`,
      content: "正在思考中...",
      timestamp: new Date(),
      status: "processing",
    }
    setAnalysisResults((prev) => [processingResult, ...prev])

    try {
      const businessData = getBusinessData()
      const answer = await askAI(question, businessData)

      setAnalysisResults((prev) =>
        prev.map((item) => (item.id === questionId ? { ...item, content: answer, status: "success" as const } : item)),
      )
      setQuestion("")
    } catch (error) {
      console.error("AI问答失败:", error)
      setAnalysisResults((prev) =>
        prev.map((item) =>
          item.id === questionId ? { ...item, content: `回答失败: ${error}`, status: "error" as const } : item,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  // 生成报告
  const generateReport = async (reportType: string) => {
    if (!isConnected) return

    setIsLoading(true)
    const reportId = `report_${Date.now()}`

    const processingResult: AnalysisResult = {
      id: reportId,
      type: "report",
      title: `${reportType}报告`,
      content: "正在生成报告...",
      timestamp: new Date(),
      status: "processing",
    }
    setAnalysisResults((prev) => [processingResult, ...prev])

    try {
      const businessData = getBusinessData()
      const report = await generateAIReport(businessData, reportType)

      setAnalysisResults((prev) =>
        prev.map((item) => (item.id === reportId ? { ...item, content: report, status: "success" as const } : item)),
      )
    } catch (error) {
      console.error("报告生成失败:", error)
      setAnalysisResults((prev) =>
        prev.map((item) =>
          item.id === reportId ? { ...item, content: `报告生成失败: ${error}`, status: "error" as const } : item,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getAnalysisTitle = (type: string) => {
    const titles = {
      data_analysis: "数据深度分析",
      prediction: "业务预测分析",
      recommendation: "智能建议",
      summary: "业务总结报告",
    }
    return titles[type as keyof typeof titles] || "分析结果"
  }

  const getStatusIcon = (status: AnalysisResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "processing":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            AI智能分析中心
          </h1>
          <p className="text-muted-foreground">基于本地大模型的智能业务分析</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className="text-sm">{isConnected ? "AI服务已连接" : "AI服务未连接"}</span>
          </div>
          <Button variant="outline" onClick={checkOllamaConnection}>
            <RefreshCw className="w-4 h-4 mr-2" />
            检查连接
          </Button>
        </div>
      </div>

      {!isConnected && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            AI服务未连接。请确保Ollama服务正在运行，并检查配置。
            <br />
            启动命令: <code className="bg-gray-100 px-2 py-1 rounded">ollama serve</code>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">分析面板</TabsTrigger>
          <TabsTrigger value="chat">智能问答</TabsTrigger>
          <TabsTrigger value="reports">报告生成</TabsTrigger>
          <TabsTrigger value="settings">设置</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* 快速分析按钮 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => performDataAnalysis("data_analysis")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  数据分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">深度分析业务数据，识别趋势和模式</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => performDataAnalysis("prediction")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-600" />
                  预测分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">基于历史数据预测未来趋势</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => performDataAnalysis("recommendation")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                  智能建议
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">获取专业的业务改进建议</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => performDataAnalysis("summary")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  数据总结
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">生成业务数据总结报告</p>
              </CardContent>
            </Card>
          </div>

          {/* 分析结果 */}
          <Card>
            <CardHeader>
              <CardTitle>分析结果</CardTitle>
              <CardDescription>最近的AI分析结果和建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {analysisResults.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>暂无分析结果，点击上方按钮开始分析</p>
                  </div>
                ) : (
                  analysisResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result.status)}
                          <h4 className="font-medium">{result.title}</h4>
                          <Badge variant="outline">{result.type}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {result.timestamp.toLocaleString("zh-CN")}
                        </span>
                      </div>
                      <div className="text-sm whitespace-pre-wrap bg-gray-50 p-3 rounded">{result.content}</div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                AI智能问答
              </CardTitle>
              <CardDescription>向AI助手询问任何业务相关问题</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="请输入您的问题..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                    disabled={!isConnected || isLoading}
                  />
                  <Button onClick={handleAskQuestion} disabled={!question.trim() || !isConnected || isLoading}>
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "提问"}
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  示例问题：
                  <div className="mt-2 space-x-2">
                    {[
                      "本月销售情况如何？",
                      "客户满意度有什么改进建议？",
                      "如何提高任务完成效率？",
                      "预测下个月的业绩表现",
                    ].map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestion(example)}
                        disabled={isLoading}
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: "销售分析", desc: "详细的销售数据分析报告" },
              { type: "客户洞察", desc: "客户行为和满意度分析" },
              { type: "运营效率", desc: "业务流程和效率分析" },
              { type: "财务概览", desc: "财务状况和趋势分析" },
              { type: "团队绩效", desc: "团队工作效率分析" },
              { type: "市场趋势", desc: "行业和市场趋势分析" },
            ].map((report, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => generateReport(report.type)}
              >
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    {report.type}报告
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{report.desc}</p>
                  <Button className="w-full mt-3" variant="outline" size="sm">
                    <Zap className="w-4 h-4 mr-2" />
                    生成报告
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                AI服务设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Ollama服务地址</label>
                <Input value={ollamaService.getStatus().baseUrl} disabled className="mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium">当前模型</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="选择模型" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">服务状态</label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span>连接状态</span>
                    <Badge variant={isConnected ? "default" : "destructive"}>{isConnected ? "已连接" : "未连接"}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>可用模型</span>
                    <span>{availableModels.length} 个</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
