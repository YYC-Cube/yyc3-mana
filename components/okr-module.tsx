"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, TrendingUp, Award, Calendar, Users, CheckCircle } from "lucide-react"

export function OKRModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">OKR目标管理</h1>
          <p className="text-muted-foreground">目标与关键结果管理系统</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white border-0"
          >
            <Target className="w-4 h-4 mr-2" />
            新建OKR
          </Button>
          <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
            <Award className="w-4 h-4 mr-2" />
            季度回顾
          </Button>
        </div>
      </div>

      {/* OKR概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总目标数</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-blue-600">
              <Calendar className="w-3 h-3 mr-1" />
              <span>本季度目标</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已完成</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>完成率 75%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">团队参与</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <div className="flex items-center text-xs text-purple-600">
              <Users className="w-3 h-3 mr-1" />
              <span>活跃成员</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均得分</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2</div>
            <div className="flex items-center text-xs text-green-600">
              <Award className="w-3 h-3 mr-1" />
              <span>优秀表现</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OKR详细管理 */}
      <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle>OKR管理详情</CardTitle>
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

            <TabsContent value="current" className="space-y-4">
              <div className="space-y-4">
                {[
                  {
                    objective: "提升客户满意度",
                    keyResults: [
                      { description: "客户满意度达到95%", progress: 92, target: 95 },
                      { description: "客户投诉减少50%", progress: 45, target: 50 },
                      { description: "客户续约率达到90%", progress: 87, target: 90 },
                    ],
                    owner: "客户成功团队",
                    quarter: "2024 Q1",
                  },
                  {
                    objective: "提高产品质量",
                    keyResults: [
                      { description: "Bug数量减少60%", progress: 55, target: 60 },
                      { description: "代码覆盖率达到85%", progress: 78, target: 85 },
                      { description: "发布周期缩短至2周", progress: 80, target: 100 },
                    ],
                    owner: "技术团队",
                    quarter: "2024 Q1",
                  },
                ].map((okr, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{okr.objective}</CardTitle>
                          <CardDescription>
                            {okr.owner} • {okr.quarter}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          进行中
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {okr.keyResults.map((kr, krIndex) => (
                          <div key={krIndex} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{kr.description}</span>
                              <span className="text-sm text-muted-foreground">
                                {kr.progress}/{kr.target}
                              </span>
                            </div>
                            <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                                style={{ width: `${(kr.progress / kr.target) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              完成度: {Math.round((kr.progress / kr.target) * 100)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                    className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="text-base">{team.team}</CardTitle>
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
                        <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
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
                <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">整体进度</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                      <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">季度目标完成度</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">风险目标</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">高风险</span>
                        <Badge variant="destructive">2</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">中风险</span>
                        <Badge variant="secondary">3</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">低风险</span>
                        <Badge variant="outline">19</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">关键里程碑</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Q1 中期检查</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-400 rounded-full"></div>
                        <span className="text-sm">Q1 最终评估</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        <span className="text-sm">Q2 规划</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-4">
              <div className="space-y-4">
                {[
                  { period: "2023 Q4", score: 8.7, status: "已完成", highlights: "超额完成销售目标，客户满意度创新高" },
                  { period: "2023 Q3", score: 7.9, status: "已完成", highlights: "产品功能迭代顺利，用户增长稳定" },
                  { period: "2023 Q2", score: 8.2, status: "已完成", highlights: "团队协作效率提升，项目按时交付" },
                ].map((review, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border-l-4 border-l-blue-500 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300"
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
                          <p className="text-sm text-muted-foreground">{review.highlights}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-300 bg-transparent"
                        >
                          查看详情
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

// 确保正确导出
export default OKRModule
