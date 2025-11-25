"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  BarChart3,
  Zap,
  RefreshCw,
  Download,
  Settings,
} from "lucide-react"

interface PredictionModel {
  id: string
  name: string
  type: "sales" | "customer" | "performance" | "risk"
  accuracy: number
  lastTrained: Date
  status: "active" | "training" | "outdated"
  predictions: number
}

interface Prediction {
  id: string
  modelId: string
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  timeframe: string
  value: number
  trend: "up" | "down" | "stable"
  factors: string[]
  recommendations: string[]
  createdAt: Date
}

interface SmartRecommendation {
  id: string
  category: "optimization" | "risk" | "opportunity" | "efficiency"
  title: string
  description: string
  priority: "high" | "medium" | "low"
  impact: number
  effort: number
  roi: number
  actions: string[]
  deadline?: Date
}

export function EnhancedPredictionEngine() {
  const [models] = useState<PredictionModel[]>([
    {
      id: "model_sales",
      name: "销售预测模型",
      type: "sales",
      accuracy: 94.2,
      lastTrained: new Date("2024-01-10"),
      status: "active",
      predictions: 156,
    },
    {
      id: "model_customer",
      name: "客户流失预测",
      type: "customer",
      accuracy: 87.8,
      lastTrained: new Date("2024-01-08"),
      status: "active",
      predictions: 89,
    },
    {
      id: "model_performance",
      name: "团队绩效预测",
      type: "performance",
      accuracy: 91.5,
      lastTrained: new Date("2024-01-12"),
      status: "training",
      predictions: 67,
    },
    {
      id: "model_risk",
      name: "风险评估模型",
      type: "risk",
      accuracy: 88.9,
      lastTrained: new Date("2024-01-05"),
      status: "outdated",
      predictions: 234,
    },
  ])

  const [predictions] = useState<Prediction[]>([
    {
      id: "pred_1",
      modelId: "model_sales",
      title: "下月销售额预测",
      description: "基于历史数据和市场趋势，预测下月销售额将达到320万元",
      confidence: 94.2,
      impact: "high",
      timeframe: "下个月",
      value: 3200000,
      trend: "up",
      factors: ["季节性增长", "新产品发布", "市场推广活动", "客户续约率提升"],
      recommendations: ["增加库存准备以应对需求增长", "加强销售团队培训", "优化客户服务流程", "准备额外的营销预算"],
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "pred_2",
      modelId: "model_customer",
      title: "客户流失风险预警",
      description: "识别出15个高风险客户，预计流失概率超过70%",
      confidence: 87.8,
      impact: "high",
      timeframe: "未来30天",
      value: 15,
      trend: "down",
      factors: ["服务满意度下降", "竞争对手活动", "价格敏感性", "使用频率降低"],
      recommendations: ["立即联系高风险客户", "提供个性化优惠方案", "改进客户服务质量", "加强客户关系维护"],
      createdAt: new Date("2024-01-14"),
    },
    {
      id: "pred_3",
      modelId: "model_performance",
      title: "团队效率提升预测",
      description: "通过优化工作流程，预计团队效率可提升25%",
      confidence: 91.5,
      impact: "medium",
      timeframe: "未来3个月",
      value: 25,
      trend: "up",
      factors: ["自动化工具部署", "流程标准化", "技能培训", "协作工具优化"],
      recommendations: ["部署自动化工具", "制定标准化流程", "开展技能培训计划", "优化团队协作方式"],
      createdAt: new Date("2024-01-13"),
    },
  ])

  const [recommendations] = useState<SmartRecommendation[]>([
    {
      id: "rec_1",
      category: "optimization",
      title: "优化客户服务响应时间",
      description: "通过AI客服和工单自动分配，可将平均响应时间从4小时缩短至1小时",
      priority: "high",
      impact: 85,
      effort: 60,
      roi: 240,
      actions: ["部署AI智能客服系统", "建立工单自动分配规则", "培训客服团队使用新工具", "建立响应时间监控机制"],
      deadline: new Date("2024-02-15"),
    },
    {
      id: "rec_2",
      category: "opportunity",
      title: "拓展高价值客户群体",
      description: "分析显示企业级客户的LTV比个人客户高300%，建议加大B2B市场投入",
      priority: "high",
      impact: 95,
      effort: 80,
      roi: 320,
      actions: ["制定B2B市场策略", "建立企业销售团队", "开发企业级产品功能", "建立合作伙伴渠道"],
      deadline: new Date("2024-03-01"),
    },
    {
      id: "rec_3",
      category: "risk",
      title: "降低关键人员依赖风险",
      description: "核心业务过度依赖少数关键人员，建议建立知识管理和备份机制",
      priority: "medium",
      impact: 70,
      effort: 50,
      roi: 180,
      actions: ["建立知识库和文档体系", "实施关键岗位轮岗制度", "开展技能交叉培训", "制定应急预案"],
    },
    {
      id: "rec_4",
      category: "efficiency",
      title: "自动化重复性任务",
      description: "识别出40%的日常任务可以自动化，预计可节省30%的人力成本",
      priority: "medium",
      impact: 75,
      effort: 65,
      roi: 200,
      actions: ["分析可自动化的任务清单", "选择合适的自动化工具", "开发自动化脚本", "培训员工使用自动化工具"],
    },
  ])

  const [selectedModel, setSelectedModel] = useState<string>("all")
  const [isGenerating, setIsGenerating] = useState(false)

  // 生成新预测
  const generatePrediction = async (modelId: string) => {
    setIsGenerating(true)
    try {
      // 模拟AI预测生成过程
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // 这里应该调用实际的AI预测API
      // const result = await aiService.generatePrediction(modelId)

      console.log(`为模型 ${modelId} 生成预测完成`)
    } catch (error) {
      console.error("生成预测失败:", error)
      // 添加错误提示
    } finally {
      setIsGenerating(false)
    }
  }

  // 获取模型状态颜色
  const getModelStatusColor = (status: PredictionModel["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-blue-100 text-blue-800"
      case "outdated":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取影响级别颜色
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取趋势图标
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />
    }
  }

  // 获取类别图标
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "optimization":
        return <Zap className="w-5 h-5 text-blue-600" />
      case "risk":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "opportunity":
        return <Target className="w-5 h-5 text-green-600" />
      case "efficiency":
        return <Clock className="w-5 h-5 text-purple-600" />
      default:
        return <Lightbulb className="w-5 h-5 text-gray-600" />
    }
  }

  const filteredPredictions =
    selectedModel === "all"
      ? predictions.filter((p) => p && p.id && p.title) // 添加数据验证
      : predictions.filter((p) => p && p.modelId === selectedModel)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            AI智能预测引擎
          </h1>
          <p className="text-muted-foreground">基于机器学习的业务预测和智能推荐系统</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="选择预测模型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有模型</SelectItem>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => generatePrediction("all")} disabled={isGenerating}>
            {isGenerating ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Brain className="w-4 h-4 mr-2" />}
            生成预测
          </Button>
        </div>
      </div>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">预测分析</TabsTrigger>
          <TabsTrigger value="recommendations">智能推荐</TabsTrigger>
          <TabsTrigger value="models">模型管理</TabsTrigger>
          <TabsTrigger value="insights">深度洞察</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          {/* 预测概览 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  活跃预测
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{predictions.length}</div>
                <p className="text-sm text-muted-foreground">个预测结果</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  平均准确率
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {(models.reduce((acc, model) => acc + model.accuracy, 0) / models.length).toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">模型准确率</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  高风险预警
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  {predictions.filter((p) => p.impact === "high" && p.trend === "down").length}
                </div>
                <p className="text-sm text-muted-foreground">需要关注</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  增长机会
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {predictions.filter((p) => p.impact === "high" && p.trend === "up").length}
                </div>
                <p className="text-sm text-muted-foreground">个机会</p>
              </CardContent>
            </Card>
          </div>

          {/* 预测结果列表 */}
          <div className="space-y-6">
            {filteredPredictions.map((prediction) => (
              <Card key={prediction.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(prediction.trend)}
                      <div>
                        <CardTitle className="text-lg">{prediction.title}</CardTitle>
                        <CardDescription>{prediction.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getImpactColor(prediction.impact)}>
                        {prediction.impact === "high" ? "高影响" : prediction.impact === "medium" ? "中影响" : "低影响"}
                      </Badge>
                      <Badge variant="outline">{prediction.timeframe}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 置信度 */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>预测置信度</span>
                        <span className="font-medium">{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>

                    {/* 影响因素 */}
                    <div>
                      <h4 className="font-medium mb-2">关键影响因素</h4>
                      <div className="flex flex-wrap gap-2">
                        {prediction.factors.map((factor, index) => (
                          <Badge key={index} variant="outline">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* 建议行动 */}
                    <div>
                      <h4 className="font-medium mb-2">建议行动</h4>
                      <ul className="space-y-1">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        导出报告
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        调整参数
                      </Button>
                      <Button size="sm">
                        <Target className="w-4 h-4 mr-2" />
                        制定计划
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* 推荐概览 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["optimization", "opportunity", "risk", "efficiency"].map((category) => {
              const categoryRecs = recommendations.filter((r) => r.category === category)
              const avgROI = categoryRecs.reduce((acc, r) => acc + r.roi, 0) / categoryRecs.length || 0

              return (
                <Card key={category}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      {getCategoryIcon(category)}
                      <span className="ml-2 capitalize">
                        {category === "optimization"
                          ? "优化建议"
                          : category === "opportunity"
                            ? "机会发现"
                            : category === "risk"
                              ? "风险管控"
                              : "效率提升"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{categoryRecs.length}</div>
                    <p className="text-sm text-muted-foreground">平均ROI: {avgROI.toFixed(0)}%</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* 推荐列表 */}
          <div className="space-y-6">
            {recommendations
              .sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 }
                return priorityOrder[b.priority] - priorityOrder[a.priority]
              })
              .map((recommendation) => (
                <Card key={recommendation.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(recommendation.category)}
                        <div>
                          <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                          <CardDescription>{recommendation.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            recommendation.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : recommendation.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {recommendation.priority === "high"
                            ? "高优先级"
                            : recommendation.priority === "medium"
                              ? "中优先级"
                              : "低优先级"}
                        </Badge>
                        {recommendation.deadline && (
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {recommendation.deadline.toLocaleDateString("zh-CN")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* 指标 */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">预期影响</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={recommendation.impact} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{recommendation.impact}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">实施难度</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={recommendation.effort} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{recommendation.effort}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">投资回报率</p>
                          <div className="text-lg font-bold text-green-600">{recommendation.roi}%</div>
                        </div>
                      </div>

                      {/* 行动计划 */}
                      <div>
                        <h4 className="font-medium mb-2">实施步骤</h4>
                        <ol className="space-y-1">
                          {recommendation.actions.map((action, index) => (
                            <li key={index} className="text-sm flex items-start space-x-2">
                              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          采纳建议
                        </Button>
                        <Button variant="outline" size="sm">
                          <Clock className="w-4 h-4 mr-2" />
                          稍后处理
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          导出计划
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-6">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <CardDescription>
                        最后训练: {model.lastTrained.toLocaleDateString("zh-CN")} • 已生成 {model.predictions} 个预测
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getModelStatusColor(model.status)}>
                        {model.status === "active" ? "活跃" : model.status === "training" ? "训练中" : "需更新"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 准确率 */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>模型准确率</span>
                        <span className="font-medium">{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>

                    {/* 模型信息 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">模型类型</p>
                        <p className="font-medium capitalize">
                          {model.type === "sales"
                            ? "销售预测"
                            : model.type === "customer"
                              ? "客户分析"
                              : model.type === "performance"
                                ? "绩效预测"
                                : "风险评估"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">预测数量</p>
                        <p className="font-medium">{model.predictions} 个</p>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex space-x-2">
                      <Button size="sm" disabled={model.status === "training"}>
                        {model.status === "training" ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Brain className="w-4 h-4 mr-2" />
                        )}
                        {model.status === "training" ? "训练中..." : "重新训练"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        配置参数
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        性能分析
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 预测趋势分析 */}
            <Card>
              <CardHeader>
                <CardTitle>预测趋势分析</CardTitle>
                <CardDescription>过去30天的预测准确率变化</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 30 }, (_, i) => {
                    const accuracy = 85 + Math.random() * 10
                    return (
                      <div
                        key={i}
                        className="bg-blue-500 rounded-t flex-1 min-w-0"
                        style={{ height: `${accuracy}%` }}
                        title={`第${i + 1}天: ${accuracy.toFixed(1)}%`}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>30天前</span>
                  <span>15天前</span>
                  <span>今天</span>
                </div>
              </CardContent>
            </Card>

            {/* 模型性能对比 */}
            <Card>
              <CardHeader>
                <CardTitle>模型性能对比</CardTitle>
                <CardDescription>各预测模型的准确率对比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {models.map((model) => (
                    <div key={model.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{model.name}</span>
                        <span className="font-medium">{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 预测价值分析 */}
            <Card>
              <CardHeader>
                <CardTitle>预测价值分析</CardTitle>
                <CardDescription>AI预测为业务带来的价值统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">节省成本</p>
                      <p className="text-2xl font-bold text-green-600">¥156万</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">增加收入</p>
                      <p className="text-2xl font-bold text-blue-600">¥234万</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">风险规避</p>
                      <p className="text-2xl font-bold text-purple-600">¥89万</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">效率提升</p>
                      <p className="text-2xl font-bold text-orange-600">35%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 数据质量监控 */}
            <Card>
              <CardHeader>
                <CardTitle>数据质量监控</CardTitle>
                <CardDescription>训练数据的质量和完整性指标</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "数据完整性", value: 98.5, color: "bg-green-500" },
                    { name: "数据准确性", value: 96.2, color: "bg-blue-500" },
                    { name: "数据时效性", value: 94.8, color: "bg-purple-500" },
                    { name: "数据一致性", value: 97.1, color: "bg-orange-500" },
                  ].map((metric) => (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.name}</span>
                        <span className="font-medium">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${metric.color} h-2 rounded-full`} style={{ width: `${metric.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI洞察报告 */}
          <Card>
            <CardHeader>
              <CardTitle>AI深度洞察报告</CardTitle>
              <CardDescription>基于全量数据分析的深度业务洞察</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    <strong>关键发现:</strong> 通过分析过去6个月的数据，AI识别出3个重要的业务模式和5个潜在的增长机会。
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      客户行为模式
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      高价值客户通常在周二和周四活跃度最高，建议在这些时间段加强营销活动。
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                      收入优化机会
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      通过调整定价策略和产品组合，预计可以提升15-20%的整体收入。
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                      潜在风险点
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      某些产品线的客户满意度呈下降趋势，需要及时采取改进措施。
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">AI推荐的下一步行动</h4>
                  <ol className="space-y-2">
                    {[
                      "立即启动客户满意度提升计划，重点关注问题产品线",
                      "在周二和周四增加30%的营销投入，提高转化率",
                      "调整定价策略，对高价值客户提供个性化优惠",
                      "建立实时预警系统，及时发现业务异常",
                      "加强数据收集，提高预测模型的准确性",
                    ].map((action, index) => (
                      <li key={index} className="text-sm flex items-start space-x-2">
                        <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
