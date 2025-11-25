"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, Award, Calendar, Users, CheckCircle, Plus, Settings, BarChart3 } from 'lucide-react'

export function OKRManagement() {
  const okrs = [
    {
      id: "OKR-001",
      objective: "提升客户满意度",
      owner: "客户成功团队",
      quarter: "2024 Q2",
      progress: 75,
      status: "on-track",
      keyResults: [
        { description: "客户满意度达到95%", current: 92, target: 95, progress: 97 },
        { description: "客户投诉减少50%", current: 45, target: 50, progress: 90 },
        { description: "客户续约率达到90%", current: 87, target: 90, progress: 97 },
      ],
    },
    {
      id: "OKR-002",
      objective: "提高产品质量",
      owner: "技术团队",
      quarter: "2024 Q2",
      progress: 68,
      status: "at-risk",
      keyResults: [
        { description: "Bug数量减少60%", current: 55, target: 60, progress: 92 },
        { description: "代码覆盖率达到85%", current: 78, target: 85, progress: 92 },
        { description: "发布周期缩短至2周", current: 80, target: 100, progress: 80 },
      ],
    },
    {
      id: "OKR-003",
      objective: "扩大市场份额",
      owner: "销售团队",
      quarter: "2024 Q2",
      progress: 82,
      status: "on-track",
      keyResults: [
        { description: "新客户获取增长30%", current: 28, target: 30, progress: 93 },
        { description: "市场占有率提升至15%", current: 14, target: 15, progress: 93 },
        { description: "销售额增长25%", current: 22, target: 25, progress: 88 },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800"
      case "at-risk":
        return "bg-orange-100 text-orange-800"
      case "off-track":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-track":
        return "正常进行"
      case "at-risk":
        return "存在风险"
      case "off-track":
        return "偏离目标"
      default:
        return "未知状态"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "from-blue-400 to-blue-500"
    if (progress >= 60) return "from-blue-300 to-blue-400"
    if (progress >= 40) return "from-orange-400 to-orange-500"
    return "from-red-400 to-red-500"
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-600" />
            OKR目标管理
          </h1>
          <p className="text-gray-600 mt-2">目标与关键结果管理系统</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Settings className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            设置
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            新建OKR
          </Button>
        </div>
      </div>

      {/* OKR概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总目标数</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{okrs.length}</div>
            <p className="text-xs text-gray-600">本季度目标</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">正常进行</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {okrs.filter((okr) => okr.status === "on-track").length}
            </div>
            <p className="text-xs text-gray-600">达标目标</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均进度</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {Math.round(okrs.reduce((sum, okr) => sum + okr.progress, 0) / okrs.length)}%
            </div>
            <p className="text-xs text-gray-600">整体完成度</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">团队参与</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">12</div>
            <p className="text-xs text-gray-600">参与团队数</p>
          </CardContent>
        </Card>
      </div>

      {/* OKR详细管理 */}
      <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Target className="w-5 h-5 mr-2" />
            OKR管理详情
          </CardTitle>
          <CardDescription>目标设定、跟踪和评估</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="current">当前OKR</TabsTrigger>
              <TabsTrigger value="team">团队OKR</TabsTrigger>
              <TabsTrigger value="progress">进度跟踪</TabsTrigger>
              <TabsTrigger value="review">回顾评估</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              {okrs.map((okr) => (
                <div
                  key={okr.id}
                  className="border-l-4 border-l-blue-500 bg-blue-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{okr.objective}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {okr.owner}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {okr.quarter}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(okr.status)}>{getStatusText(okr.status)}</Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-700">{okr.progress}%</div>
                        <div className="text-xs text-gray-500">整体进度</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getProgressColor(okr.progress)} rounded-full transition-all duration-500`}
                        style={{ width: `${okr.progress}%` }}
                      ></div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">关键结果</h4>
                      {okr.keyResults.map((kr, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{kr.description}</span>
                            <span className="text-sm text-gray-600">{kr.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                              style={{ width: `${kr.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            当前: {kr.current} / 目标: {kr.target}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { team: "销售团队", objectives: 3, avgScore: 8.5, members: 8 },
                  { team: "技术团队", objectives: 4, avgScore: 7.8, members: 12 },
                  { team: "产品团队", objectives: 2, avgScore: 9.1, members: 6 },
                  { team: "运营团队", objectives: 3, avgScore: 8.2, members: 10 },
                ].map((team, index) => (
                  <Card
                    key={index}
                    className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <CardHeader>
                      <CardTitle className="text-base text-blue-700">{team.team}</CardTitle>
                      <CardDescription>{team.members} 名成员</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">目标数量</span>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                            {team.objectives}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">平均得分</span>
                          <span className="font-medium text-green-600">{team.avgScore}/10</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${team.avgScore * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-blue-700">整体进度</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">季度目标完成度</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-blue-700">风险目标</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">高风险</span>
                        <Badge variant="destructive">1</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">中风险</span>
                        <Badge variant="secondary">2</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">低风险</span>
                        <Badge variant="outline">0</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-blue-700">关键里程碑</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Q2 中期检查</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-400 rounded-full"></div>
                        <span className="text-sm">Q2 最终评估</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        <span className="text-sm">Q3 规划</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-4">
              <div className="space-y-4">
                {[
                  { period: "2024 Q1", score: 8.7, status: "已完成", highlights: "超额完成销售目标，客户满意度创新高" },
                  { period: "2023 Q4", score: 7.9, status: "已完成", highlights: "产品功能迭代顺利，用户增长稳定" },
                  { period: "2023 Q3", score: 8.2, status: "已完成", highlights: "团队协作效率提升，项目按时交付" },
                ].map((review, index) => (
                  <Card
                    key={index}
                    className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium">{review.period}</h3>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {review.status}
                            </Badge>
                            <span className="text-lg font-bold text-green-600">{review.score}/10</span>
                          </div>
                          <p className="text-sm text-gray-600">{review.highlights}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 bg-transparent group"
                        >
                          <span className="group-hover:translate-x-1 transition-all duration-300">查看详情</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
