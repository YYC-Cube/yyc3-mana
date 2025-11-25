"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, DollarSign, Target, Activity, ArrowUpRight, ArrowDownRight, FileText, CheckCircle } from 'lucide-react'

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen">
      {/* 欢迎区域 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-emerald-600" />
            欢迎回来！
          </h1>
          <p className="text-gray-600 mt-2">
            今天是{" "}
            {new Date().toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Activity className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            实时数据
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <BarChart3 className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            查看报表
          </Button>
        </div>
      </div>

      {/* 核心KPI卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">总销售额</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">¥2,847,392</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              <span>+12.5% 较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">活跃客户</CardTitle>
            <Users className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">1,247</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              <span>+8.2% 较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">待办任务</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">23</div>
            <div className="flex items-center text-xs text-orange-600 mt-1">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              <span>-5.1% 较上周</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">转化率</CardTitle>
            <Target className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">12.4%</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              <span>+2.1% 较上月</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 销售趋势 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emerald-700">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>销售趋势分析</span>
            </CardTitle>
            <CardDescription>过去6个月的销售数据趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">本月销售目标</span>
                <span className="text-sm text-gray-600">¥3,000,000</span>
              </div>
              <div className="w-full h-4 bg-emerald-100 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"></div>
              </div>
              <div className="text-xs text-gray-600">完成度: 94.9% (¥2,847,392)</div>

              <div className="h-32 bg-emerald-50 rounded-lg flex items-center justify-center mt-4">
                <p className="text-emerald-600 font-medium">销售趋势图表区域</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 客户活动 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emerald-700">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>客户活动统计</span>
            </CardTitle>
            <CardDescription>客户行为和活跃度分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">247</div>
                  <div className="text-xs text-gray-600">新增客户</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">85%</div>
                  <div className="text-xs text-gray-600">活跃度</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">4.2</div>
                  <div className="text-xs text-gray-600">满意度</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>客户留存率</span>
                    <span>73%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: "73%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>重复购买率</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>推荐率</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快速操作和最近活动 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 快速操作 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-emerald-700">快速操作</CardTitle>
            <CardDescription>常用功能快速入口</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 border-l-4 border-l-emerald-500 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                <BarChart3 className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  数据分析
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 border-l-4 border-l-emerald-500 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                <FileText className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  报表中心
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 border-l-4 border-l-emerald-500 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                <Target className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  KPI监控
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 border-l-4 border-l-emerald-500 hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                <Users className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  客户管理
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 最近活动 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-emerald-700">最近活动</CardTitle>
            <CardDescription>系统最新动态和更新</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  type: "success",
                  title: "月度销售报告已生成",
                  description: "2024年1月销售数据分析完成",
                  time: "2小时前",
                  icon: FileText,
                },
                {
                  type: "info",
                  title: "新客户注册",
                  description: "ABC公司完成注册并提交了首个订单",
                  time: "4小时前",
                  icon: Users,
                },
                {
                  type: "warning",
                  title: "KPI预警",
                  description: "客户转化率低于预期目标",
                  time: "6小时前",
                  icon: Target,
                },
                {
                  type: "success",
                  title: "系统更新完成",
                  description: "数据分析模块功能优化上线",
                  time: "1天前",
                  icon: Activity,
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "success"
                        ? "bg-emerald-100"
                        : activity.type === "info"
                          ? "bg-blue-100"
                          : activity.type === "warning"
                            ? "bg-orange-100"
                            : "bg-gray-100"
                    }`}
                  >
                    <activity.icon
                      className={`w-4 h-4 ${
                        activity.type === "success"
                          ? "text-emerald-600"
                          : activity.type === "info"
                            ? "text-blue-600"
                            : activity.type === "warning"
                              ? "text-orange-600"
                              : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
