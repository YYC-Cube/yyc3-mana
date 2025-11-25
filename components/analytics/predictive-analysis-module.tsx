"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Brain, TrendingUp, AlertTriangle, BarChart3, Activity, Users, 
  DollarSign, Lightbulb, ArrowUp, ArrowDown, CheckCircle, 
  Clock, RefreshCcw, PlayCircle, Download, ChartLine, Info 
} from "lucide-react"

interface PredictionModel {
  id: string
  name: string
  type: "sales" | "customer" | "market" | "risk" | "demand"
  accuracy: number
  status: "training" | "ready" | "predicting" | "error"
  lastTrained: Date
  dataPoints: number
  predictions: number
  confidence: number
}

interface Prediction {
  id: string
  modelId: string
  title: string
  description: string
  timeframe: string
  confidence: number
  impact: "high" | "medium" | "low"
  category: string
  predictedValue: number
  currentValue: number
  trend: "up" | "down" | "stable"
  createdAt: Date
}

interface Insight {
  id: string
  title: string
  description: string
  type: "opportunity" | "risk" | "trend" | "anomaly"
  priority: "high" | "medium" | "low"
  confidence: number
  actionable: boolean
  relatedData: string[]
}

export function PredictiveAnalysisModule() {
  const [models] = useState<PredictionModel[]>([
    {
      id: "model_1",
      name: "销售预测模型",
      type: "sales",
      accuracy: 87.5,
      status: "ready",
      lastTrained: new Date("2024-01-15"),
      dataPoints: 12500,
      predictions: 156,
      confidence: 85,
    },
    {
      id: "model_2",
      name: "客户流失预测",
      type: "customer",
      accuracy: 92.3,
      status: "ready",
      lastTrained: new Date("2024-01-18"),
      dataPoints: 8900,
      predictions: 89,
      confidence: 91,
    },
    {
      id: "model_3",
      name: "市场趋势分析",
      type: "market",
      accuracy: 78.9,
      status: "training",
      lastTrained: new Date("2024-01-10"),
      dataPoints: 15600,
      predictions: 234,
      confidence: 76,
    },
    {
      id: "model_4",
      name: "风险评估模型",
      type: "risk",
      accuracy: 94.1,
      status: "ready",
      lastTrained: new Date("2024-01-20"),
      dataPoints: 6700,
      predictions: 67,
      confidence: 93,
    },
  ])

  const [predictions] = useState<Prediction[]>([
    {
      id: "pred_1",
      modelId: "model_1",
      title: "下月销售额预测",
      description: "基于历史数据和市场趋势，预测下月销售额将增长15%",
      timeframe: "下月",
      confidence: 87,
      impact: "high",
      category: "销售",
      predictedValue: 1150000,
      currentValue: 1000000,
      trend: "up",
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "pred_2",
      modelId: "model_2",
      title: "客户流失风险预警",
      description: "识别出15个高风险流失客户，建议及时跟进",
      timeframe: "未来30天",
      confidence: 92,
      impact: "high",
      category: "客户",
      predictedValue: 15,
      currentValue: 8,
      trend: "up",
      createdAt: new Date("2024-01-19"),
    },
    {
      id: "pred_3",
      modelId: "model_3",
      title: "市场需求变化",
      description: "预测产品A的市场需求将在下季度下降8%",
      timeframe: "下季度",
      confidence: 78,
      impact: "medium",
      category: "市场",
      predictedValue: 920,
      currentValue: 1000,
      trend: "down",
      createdAt: new Date("2024-01-18"),
    },
  ])

  const [insights] = useState<Insight[]>([
    {
      id: "insight_1",
      title: "销售季节性模式发现",
      description: "数据显示每年第四季度销售额比平均水平高35%，建议提前备货",
      type: "opportunity",
      priority: "high",
      confidence: 89,
      actionable: true,
      relatedData: ["销售数据", "库存数据"],
    },
    {
      id: "insight_2",
      title: "客户价值分层异常",
      description: "发现高价值客户群体的购买频率下降，需要关注客户满意度",
      type: "risk",
      priority: "high",
      confidence: 94,
      actionable: true,
      relatedData: ["客户数据", "交易数据"],
    },
    {
      id: "insight_3",
      title: "新兴市场机会",
      description: "华南地区显示出强劲的增长潜力，建议加大投入",
      type: "opportunity",
      priority: "medium",
      confidence: 76,
      actionable: true,
      relatedData: ["地区数据", "市场数据"],
    },
  ])

  const [selectedTimeframe, setSelectedTimeframe] = useState("month")
  const [selectedModel, setSelectedModel] = useState("all")

  // 预测趋势数据
  const predictionTrend = [
    { month: "1月", actual: 850000, predicted: 880000, confidence: 85 },
    { month: "2月", actual: 920000, predicted: 950000, confidence: 87 },
    { month: "3月", actual: 1050000, predicted: 1020000, confidence: 89 },
    { month: "4月", actual: null, predicted: 1150000, confidence: 87 },
    { month: "5月", actual: null, predicted: 1280000, confidence: 82 },
    { month: "6月", actual: null, predicted: 1350000, confidence: 78 },
  ]

  // 模型准确度对比
  const modelAccuracy = [
    { model: "销售预测", accuracy: 87.5, predictions: 156 },
    { model: "客户流失", accuracy: 92.3, predictions: 89 },
    { model: "市场趋势", accuracy: 78.9, predictions: 234 },
    { model: "风险评估", accuracy: 94.1, predictions: 67 },
  ]

  // 预测影响分析
  const impactAnalysis = [
    { category: "收入影响", positive: 2300000, negative: 450000 },
    { category: "客户影响", positive: 1200, negative: 180 },
    { category: "市场份额", positive: 8.5, negative: 2.1 },
    { category: "运营效率", positive: 15.2, negative: 3.8 },
  ]

  const getModelTypeIcon = (type: string) => {
    switch (type) {
      case "sales":
        return <DollarSign className="w-4 h-4" />
      case "customer":
        return <Users className="w-4 h-4" />
      case "market":
        return <BarChart3 className="w-4 h-4" />
      case "risk":
        return <AlertTriangle className="w-4 h-4" />
      case "demand":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Brain className="w-4 h-4" />
    }
  }

  const getModelTypeLabel = (type: string) => {
    const labels = {
      sales: "销售预测",
      customer: "客户分析",
      market: "市场分析",
      risk: "风险评估",
      demand: "需求预测",
    }
    return labels[type as keyof typeof labels] || type
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-blue-100 text-blue-800"
      case "predicting":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      ready: "就绪",
      training: "训练中",
      predicting: "预测中",
      error: "错误",
    }
    return labels[status as keyof typeof labels] || status
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Lightbulb className="w-4 h-4 text-yellow-600" />
      case "risk":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "trend":
        return <TrendingUp className="w-4 h-4 text-blue-600" />
      case "anomaly":
        return <Activity className="w-4 h-4 text-purple-600" />
      default:
        return <Brain className="w-4 h-4 text-gray-600" />
    }
  }

  const runPrediction = (modelId: string) => {
    console.log("运行预测模型:", modelId)
    // 这里实现预测逻辑
  }

  const retrainModel = (modelId: string) => {
    console.log("重新训练模型:", modelId)
    // 这里实现模型重训练逻辑
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            预测分析模块
          </h1>
          <p className="text-muted-foreground">基于AI的智能预测和洞察分析</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">预测准确率</h3>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-slate-800">88.2%</span>
            <span className="ml-2 text-green-600 text-sm flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" /> 2.4%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">较上月提升</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">已完成预测</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-slate-800">489</span>
            <span className="ml-2 text-green-600 text-sm flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" /> 12.3%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">较上月提升</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">模型数量</h3>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-slate-800">12</span>
            <span className="ml-2 text-green-600 text-sm flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" /> 2 个
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">较上月新增</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">数据点</h3>
            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
              <Activity className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-slate-800">54.8K</span>
            <span className="ml-2 text-green-600 text-sm flex items-center">
              <ArrowUp className="w-3 h-3 mr-1" /> 8.7K
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">较上月新增</p>
        </div>
      </div>

      {/* 预测趋势图表 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">销售预测趋势</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ChartLine className="w-3 h-3 mr-1" />
              图表视图
            </Button>
            <Button variant="outline" size="sm">
              <Info className="w-3 h-3 mr-1" />
              数据详情
            </Button>
          </div>
        </div>
        <div className="h-[300px]">
          {/* 这里应该是一个图表组件，例如使用Chart.js或D3.js */}
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <ChartLine className="w-16 h-16" />
            <p className="mt-2">销售预测趋势图表</p>
          </div>
        </div>
      </div>

      {/* 模型列表 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">预测模型</h2>
          <Button variant="outline">
            <RefreshCcw className="w-4 h-4 mr-2" />
            刷新模型
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">模型名称</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">类型</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">准确度</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">最后训练</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {models.map((model) => (
                <tr key={model.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                        {getModelTypeIcon(model.type)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{model.name}</div>
                        <div className="text-sm text-slate-500">{model.dataPoints.toLocaleString()} 数据点</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-800">{getModelTypeLabel(model.type)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-slate-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${model.accuracy}%` }} />
                      </div>
                      <span className="text-sm font-medium text-slate-800">{model.accuracy}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(model.status)}`}>
                      {getStatusLabel(model.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {model.lastTrained.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => runPrediction(model.id)}>
                        <PlayCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => retrainModel(model.id)}>
                        <RefreshCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 最近预测 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">最近预测</h2>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="所有模型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有模型</SelectItem>
              {models.map(model => (
                <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="p-4 bg-white/90 rounded-lg border border-slate-100 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-slate-800">{prediction.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{prediction.description}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    prediction.impact === "high" ? "bg-red-100 text-red-800" :
                    prediction.impact === "medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {prediction.impact.charAt(0).toUpperCase() + prediction.impact.slice(1)}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {prediction.timeframe}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span className="text-sm text-slate-600">{prediction.confidence}% 置信度</span>
                  </div>
                  <div className="flex items-center">
                    {getTrendIcon(prediction.trend)}
                    <span className="text-sm text-slate-600 ml-1">
                      {prediction.trend === "up" ? "上升" : prediction.trend === "down" ? "下降" : "稳定"}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-800">
                    {prediction.category}
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(prediction.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 智能洞察 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">智能洞察</h2>
          <Button variant="outline">
            <Lightbulb className="w-4 h-4 mr-2" />
            查看全部
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 bg-white/90 rounded-lg border border-slate-100 hover:shadow-sm transition-shadow">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                  {getInsightIcon(insight.type)}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium text-slate-800">{insight.title}</h3>
                    <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                      insight.priority === "high" ? "bg-red-100 text-red-800" :
                      insight.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{insight.description}</p>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-500 mr-1" />
                  <span className="text-sm text-slate-600">{insight.confidence}% 置信度</span>
                </div>
                {insight.actionable && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    可执行
                  </span>
                )}
              </div>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {insight.relatedData.map((data, index) => (
                  <span key={index} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full">
                    {data}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
