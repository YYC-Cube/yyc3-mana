"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, DollarSign, Target, Activity, PieChart, LineChart, Download, RefreshCw, Calendar, Filter } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <AdaptiveSidebar defaultModule="analytics">
      <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen">
        {/* 页面头部 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-emerald-600" />
              数据分析
            </h1>
            <p className="text-gray-600 mt-2">企业数据深度分析和洞察</p>
          </div>
          <div className="flex space-x-3">
            <Select>
              <SelectTrigger className="w-32 border-l-4 border-l-emerald-500">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="本月" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">今日</SelectItem>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="quarter">本季度</SelectItem>
                <SelectItem value="year">本年</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
            >
              <RefreshCw className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              刷新数据
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <Download className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总收入</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">¥2,847,392</div>
              <p className="text-xs text-emerald-600">+12.5% 较上月</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
              <Users className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">1,247</div>
              <p className="text-xs text-emerald-600">+8.2% 较上月</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">转化率</CardTitle>
              <Target className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">12.4%</div>
              <p className="text-xs text-emerald-600">+2.1% 较上月</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃度</CardTitle>
              <Activity className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">85.6%</div>
              <p className="text-xs text-emerald-600">+3.4% 较上月</p>
            </CardContent>
          </Card>
        </div>

        {/* 图表分析 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <LineChart className="w-5 h-5 mr-2" />
                收入趋势分析
              </CardTitle>
              <CardDescription>过去12个月收入变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-emerald-50 rounded-lg flex items-center justify-center">
                <p className="text-emerald-600 font-medium">收入趋势图表区域</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <PieChart className="w-5 h-5 mr-2" />
                用户行为分析
              </CardTitle>
              <CardDescription>用户活动和行为模式分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>页面浏览</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>功能使用</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>数据导出</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>其他操作</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 详细分析模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-emerald-700">销售分析</CardTitle>
              <CardDescription>销售数据深度分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">¥2,847,392</div>
                  <div className="text-sm text-gray-600">本月销售额</div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                >
                  <TrendingUp className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                  查看详情
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-emerald-700">客户分析</CardTitle>
              <CardDescription>客户行为和偏好分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">1,247</div>
                  <div className="text-sm text-gray-600">活跃客户数</div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                  查看详情
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-emerald-700">性能分析</CardTitle>
              <CardDescription>系统性能和效率分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">85.6%</div>
                  <div className="text-sm text-gray-600">系统效率</div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                >
                  <Activity className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                  查看详情
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdaptiveSidebar>
  )
}
