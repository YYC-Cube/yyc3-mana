"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, Award, AlertCircle } from "lucide-react"

interface SatisfactionSurvey {
  id: string
  customerId: string
  customerName: string
  rating: number
  feedback: string
  category: "product" | "service" | "support" | "overall"
  date: string
  status: "pending" | "responded" | "resolved"
}

interface SatisfactionMetrics {
  averageRating: number
  totalResponses: number
  npsScore: number
  satisfactionTrend: number
}

export function CustomerSatisfaction() {
  const [surveys] = useState<SatisfactionSurvey[]>([
    {
      id: "1",
      customerId: "1",
      customerName: "华润集团",
      rating: 5,
      feedback: "产品质量很好，服务也很到位，会继续合作",
      category: "overall",
      date: "2025-06-19",
      status: "responded",
    },
    {
      id: "2",
      customerId: "2",
      customerName: "万科地产",
      rating: 4,
      feedback: "产品不错，但交期可以再快一些",
      category: "service",
      date: "2025-06-18",
      status: "pending",
    },
    {
      id: "3",
      customerId: "3",
      customerName: "碧桂园",
      rating: 5,
      feedback: "非常满意，质量和服务都很棒",
      category: "product",
      date: "2025-06-17",
      status: "resolved",
    },
  ])

  const [metrics] = useState<SatisfactionMetrics>({
    averageRating: 4.7,
    totalResponses: 156,
    npsScore: 72,
    satisfactionTrend: 8.5,
  })

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">待处理</Badge>
      case "responded":
        return <Badge className="bg-blue-100 text-blue-800">已回复</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">已解决</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const categories = {
      product: { label: "产品", color: "bg-blue-100 text-blue-800" },
      service: { label: "服务", color: "bg-green-100 text-green-800" },
      support: { label: "支持", color: "bg-purple-100 text-purple-800" },
      overall: { label: "整体", color: "bg-orange-100 text-orange-800" },
    }
    const cat = categories[category as keyof typeof categories] || categories.overall
    return <Badge className={cat.color}>{cat.label}</Badge>
  }

  const getSatisfactionLevel = (rating: number) => {
    if (rating >= 4.5) return { label: "非常满意", color: "text-green-600", icon: <Award className="w-4 h-4" /> }
    if (rating >= 3.5) return { label: "满意", color: "text-blue-600", icon: <ThumbsUp className="w-4 h-4" /> }
    if (rating >= 2.5) return { label: "一般", color: "text-yellow-600", icon: <MessageSquare className="w-4 h-4" /> }
    return { label: "不满意", color: "text-red-600", icon: <ThumbsDown className="w-4 h-4" /> }
  }

  const satisfactionLevel = getSatisfactionLevel(metrics.averageRating)

  return (
    <div className="space-y-6">
      {/* 满意度概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均评分</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center space-x-2">
              <span>{metrics.averageRating}</span>
              <div className="flex">{getRatingStars(Math.round(metrics.averageRating))}</div>
            </div>
            <div className={`text-xs flex items-center space-x-1 ${satisfactionLevel.color}`}>
              {satisfactionLevel.icon}
              <span>{satisfactionLevel.label}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总回复数</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalResponses}</div>
            <p className="text-xs text-muted-foreground">本月收集反馈</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS评分</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.npsScore}</div>
            <p className="text-xs text-green-600">+{metrics.satisfactionTrend}% 较上月</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待处理</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveys.filter((s) => s.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">需要跟进的反馈</p>
          </CardContent>
        </Card>
      </div>

      {/* 满意度分布 */}
      <Card>
        <CardHeader>
          <CardTitle>满意度分布</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = surveys.filter((s) => s.rating === rating).length
              const percentage = surveys.length > 0 ? (count / surveys.length) * 100 : 0

              return (
                <div key={rating} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 w-20">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <Progress value={percentage} className="h-2" />
                  </div>
                  <div className="text-sm text-muted-foreground w-16 text-right">
                    {count} ({percentage.toFixed(0)}%)
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 客户反馈列表 */}
      <Card>
        <CardHeader>
          <CardTitle>最新客户反馈</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {surveys.map((survey) => (
              <div key={survey.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{survey.customerName}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">{getRatingStars(survey.rating)}</div>
                      <span className="text-sm text-muted-foreground">{survey.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {getCategoryBadge(survey.category)}
                    {getStatusBadge(survey.status)}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">"{survey.feedback}"</p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{survey.date}</span>
                  <div className="flex space-x-2">
                    {survey.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline">
                          回复
                        </Button>
                        <Button size="sm">标记已处理</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 快速回复模板 */}
      <Card>
        <CardHeader>
          <CardTitle>快速回复模板</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium text-sm">感谢反馈模板</h4>
              <p className="text-xs text-muted-foreground">感谢您的宝贵反馈，我们会持续改进产品和服务质量...</p>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium text-sm">问题解决模板</h4>
              <p className="text-xs text-muted-foreground">我们已经了解到您遇到的问题，正在积极处理中...</p>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium text-sm">服务改进模板</h4>
              <p className="text-xs text-muted-foreground">根据您的建议，我们将在以下方面进行改进...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
