"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Target, Award, AlertTriangle, CheckCircle } from "lucide-react"

export function KPIModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">KPI绩效监控</h1>
          <p className="text-muted-foreground">关键绩效指标监控和分析系统</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white border-0"
          >
            <Target className="w-4 h-4 mr-2" />
            设置KPI
          </Button>
          <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            生成报告
          </Button>
        </div>
      </div>

      {/* KPI概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总KPI数</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="flex items-center text-xs text-blue-600">
              <Target className="w-3 h-3 mr-1" />
              <span>活跃指标</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">达标率</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.2%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>优秀表现</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">风险指标</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-xs text-red-600">
              <AlertTriangle className="w-3 h-3 mr-1" />
              <span>需要关注</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均得分</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5</div>
            <div className="flex items-center text-xs text-green-600">
              <Award className="w-3 h-3 mr-1" />
              <span>良好水平</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI详细监控 */}
      <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle>KPI监控详情</CardTitle>
          <CardDescription>关键绩效指标的详细监控和分析</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">指标概览</TabsTrigger>
              <TabsTrigger value="department">部门KPI</TabsTrigger>
              <TabsTrigger value="individual">个人KPI</TabsTrigger>
              <TabsTrigger value="trends">趋势分析</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="space-y-4">
                {[
                  {
                    name: "客户满意度",
                    current: 94.2,
                    target: 95,
                    unit: "%",
                    trend: "上升",
                    status: "良好",
                    department: "客服部",
                  },
                  {
                    name: "销售完成率",
                    current: 112.5,
                    target: 100,
                    unit: "%",
                    trend: "上升",
                    status: "优秀",
                    department: "销售部",
                  },
                  {
                    name: "项目按时交付率",
                    current: 87.3,
                    target: 90,
                    unit: "%",
                    trend: "下降",
                    status: "风险",
                    department: "技术部",
                  },
                  {
                    name: "员工满意度",
                    current: 8.2,
                    target: 8.5,
                    unit: "/10",
                    trend: "稳定",
                    status: "良好",
                    department: "人事部",
                  },
                  {
                    name: "成本控制率",
                    current: 95.8,
                    target: 98,
                    unit: "%",
                    trend: "下降",
                    status: "风险",
                    department: "财务部",
                  },
                  {
                    name: "产品质量得分",
                    current: 9.1,
                    target: 9.0,
                    unit: "/10",
                    trend: "上升",
                    status: "优秀",
                    department: "质量部",
                  },
                ].map((kpi, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium">{kpi.name}</h3>
                            <Badge variant="outline">{kpi.department}</Badge>
                            <Badge
                              variant={
                                kpi.status === "优秀" ? "default" : kpi.status === "良好" ? "secondary" : "destructive"
                              }
                            >
                              {kpi.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-blue-600">
                              {kpi.current}
                              {kpi.unit}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              目标: {kpi.target}
                              {kpi.unit}
                            </div>
                            <div
                              className={`flex items-center text-xs ${kpi.trend === "上升" ? "text-green-600" : kpi.trend === "下降" ? "text-red-600" : "text-gray-600"}`}
                            >
                              <TrendingUp className={`w-3 h-3 mr-1 ${kpi.trend === "下降" ? "rotate-180" : ""}`} />
                              {kpi.trend}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="w-32 h-2 bg-sky-100 rounded-full overflow-hidden mb-2">
                            <div
                              className={`h-full rounded-full ${kpi.current >= kpi.target ? "bg-gradient-to-r from-green-400 to-green-500" : kpi.current >= kpi.target * 0.8 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" : "bg-gradient-to-r from-red-400 to-red-500"}`}
                              style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            完成度: {Math.round((kpi.current / kpi.target) * 100)}%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="department" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "销售部", kpis: 4, avgScore: 92.3, status: "优秀" },
                  { name: "技术部", kpis: 5, avgScore: 85.7, status: "良好" },
                  { name: "客服部", kpis: 3, avgScore: 91.8, status: "优秀" },
                  { name: "财务部", kpis: 3, avgScore: 88.2, status: "良好" },
                  { name: "人事部", kpis: 2, avgScore: 86.5, status: "良好" },
                  { name: "质量部", kpis: 1, avgScore: 95.0, status: "优秀" },
                ].map((dept, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{dept.name}</CardTitle>
                        <Badge variant={dept.status === "优秀" ? "default" : "secondary"}>{dept.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">KPI数量</span>
                          <span className="font-medium">{dept.kpis}个</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">平均得分</span>
                          <span className="font-medium text-blue-600">{dept.avgScore}</span>
                        </div>
                        <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                            style={{ width: `${dept.avgScore}%` }}
                          ></div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          查看详情
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="individual" className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: "张三", department: "销售部", kpis: 3, avgScore: 95.2, rank: 1 },
                  { name: "李四", department: "技术部", kpis: 4, avgScore: 91.8, rank: 2 },
                  { name: "王五", department: "客服部", kpis: 2, avgScore: 89.5, rank: 3 },
                  { name: "赵六", department: "财务部", kpis: 3, avgScore: 87.3, rank: 4 },
                  { name: "钱七", department: "人事部", kpis: 2, avgScore: 85.7, rank: 5 },
                ].map((person, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {person.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium">{person.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{person.department}</span>
                              <span>•</span>
                              <span>{person.kpis}个KPI</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant={person.rank <= 3 ? "default" : "secondary"}>第{person.rank}名</Badge>
                            <span className="text-lg font-bold text-blue-600">{person.avgScore}</span>
                          </div>
                          <div className="w-24 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                              style={{ width: `${person.avgScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">月度趋势</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">1月</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-4/5 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">82.5</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">2月</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-[85%] h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">85.3</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">3月</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-[87.5%] h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">87.5</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">关键洞察</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-800">销售业绩突出</p>
                        <p className="text-xs text-green-600">连续3个月超额完成目标</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">交付效率待提升</p>
                        <p className="text-xs text-yellow-600">建议优化项目管理流程</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">整体趋势向好</p>
                        <p className="text-xs text-blue-600">KPI达成率稳步提升</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
