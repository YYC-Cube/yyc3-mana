"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Activity, Database, Eye } from "lucide-react"

export function AnalyticsModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">数据分析中心</h1>
          <p className="text-muted-foreground">商业智能和数据可视化分析平台</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white border-0"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            创建报表
          </Button>
          <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
            <Eye className="w-4 h-4 mr-2" />
            实时监控
          </Button>
        </div>
      </div>

      {/* 数据分析概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">数据源</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-blue-600">
              <Database className="w-3 h-3 mr-1" />
              <span>已连接数据源</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃报表</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <div className="flex items-center text-xs text-green-600">
              <Activity className="w-3 h-3 mr-1" />
              <span>实时更新</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">数据量</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <div className="flex items-center text-xs text-purple-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>记录数量</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">查询性能</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <div className="flex items-center text-xs text-green-600">
              <Activity className="w-3 h-3 mr-1" />
              <span>平均响应时间</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 数据分析详情 */}
      <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle>数据分析详情</CardTitle>
          <CardDescription>全面的商业智能分析和数据洞察</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">数据仪表盘</TabsTrigger>
              <TabsTrigger value="reports">分析报表</TabsTrigger>
              <TabsTrigger value="insights">业务洞察</TabsTrigger>
              <TabsTrigger value="predictions">预测分析</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">销售趋势分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">本月销售额</span>
                        <span className="text-lg font-bold text-blue-600">¥2,456,789</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>第1周</span>
                          <span>¥456,123</span>
                        </div>
                        <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                          <div className="w-1/5 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>第2周</span>
                          <span>¥678,234</span>
                        </div>
                        <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                          <div className="w-1/4 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>第3周</span>
                          <span>¥789,345</span>
                        </div>
                        <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>第4周</span>
                          <span>¥533,087</span>
                        </div>
                        <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                          <div className="w-1/5 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">客户分布分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">企业客户</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-3/5 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">748</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">个人客户</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-2/5 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">499</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">客户增长趋势</p>
                        <p className="text-xs text-blue-600">企业客户增长率 +15.2%</p>
                        <p className="text-xs text-blue-600">个人客户增长率 +8.7%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">产品性能分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "产品A", sales: 85, revenue: "¥456,789" },
                        { name: "产品B", sales: 72, revenue: "¥234,567" },
                        { name: "产品C", sales: 68, revenue: "¥345,678" },
                        { name: "产品D", sales: 45, revenue: "¥123,456" },
                      ].map((product, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{product.name}</span>
                            <span className="font-medium">{product.revenue}</span>
                          </div>
                          <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"
                              style={{ width: `${product.sales}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">地区业绩分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { region: "华东地区", performance: 92, growth: "+12.5%" },
                        { region: "华南地区", performance: 88, growth: "+8.3%" },
                        { region: "华北地区", performance: 76, growth: "+5.7%" },
                        { region: "西南地区", performance: 65, growth: "+15.2%" },
                        { region: "其他地区", performance: 58, growth: "+3.1%" },
                      ].map((region, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{region.region}</span>
                              <span className="text-green-600">{region.growth}</span>
                            </div>
                            <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                                style={{ width: `${region.performance}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="space-y-3">
                {[
                  { 
                    title: "月度销售报告", 
                    description: "详细的月度销售数据分析和趋势预测", 
                    lastUpdate: "2小时前",
                    status: "已更新",
                    type: "销售分析"
                  },
                  { 
                    title: "客户行为分析", 
                    description: "客户购买行为和偏好分析报告", 
                    lastUpdate: "6小时前",
                    status: "已更新",
                    type: "客户分析"
                  },
                  { 
                    title: "财务绩效报告", 
                    description: "企业财务状况和盈利能力分析", 
                    lastUpdate: "1天前",
                    status: "已更新",
                    type: "财务分析"
                  },
                  { 
                    title: "运营效率分析", 
                    description: "业务流程和运营效率优化建议", 
                    lastUpdate: "2天前",
                    status: "待更新",
                    type: "运营分析"
                  },
                ].map((report, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium">{report.title}</h3>
                            <Badge variant="outline">{report.type}</Badge>
                            <Badge variant={report.status === "已更新" ? "default" : "secondary"}>
                              {report.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                          <span className="text\
