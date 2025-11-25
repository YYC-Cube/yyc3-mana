"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt, Banknote, Target, AlertTriangle, ArrowUpRight, ArrowDownRight, PieChart, BarChart3 } from 'lucide-react'

export default function FinancePage() {
  return (
    <AdaptiveSidebar defaultModule="finance">
      <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen">
        {/* 页面头部 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <DollarSign className="w-8 h-8 mr-3 text-emerald-600" />
              财务概览
            </h1>
            <p className="text-gray-600 mt-2">企业财务数据总览和分析</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
            >
              <BarChart3 className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              财务报表
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <PieChart className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              生成报告
            </Button>
          </div>
        </div>

        {/* 财务概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总收入</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
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
              <CardTitle className="text-sm font-medium">总支出</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">¥1,234,567</div>
              <div className="flex items-center text-xs text-red-600 mt-1">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                <span>+8.3% 较上月</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">净利润</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">¥1,612,825</div>
              <div className="flex items-center text-xs text-emerald-600 mt-1">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                <span>+15.2% 较上月</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">现金流</CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700">¥856,432</div>
              <div className="flex items-center text-xs text-emerald-600 mt-1">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                <span>+6.8% 较上月</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 财务模块快捷入口 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <Target className="w-5 h-5 mr-2" />
                预算管理
              </CardTitle>
              <CardDescription>预算规划和执行监控</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">本月预算执行</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                >
                  <span className="group-hover:translate-x-1 transition-all duration-300">查看详情</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <Receipt className="w-5 h-5 mr-2" />
                发票管理
              </CardTitle>
              <CardDescription>发票创建和跟踪管理</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-emerald-600">23</div>
                    <div className="text-xs text-gray-600">待付款</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">156</div>
                    <div className="text-xs text-gray-600">已付款</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                >
                  <span className="group-hover:translate-x-1 transition-all duration-300">管理发票</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <Banknote className="w-5 h-5 mr-2" />
                支付管理
              </CardTitle>
              <CardDescription>支付交易和资金流管理</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-emerald-600">98.5%</div>
                    <div className="text-xs text-gray-600">成功率</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">3</div>
                    <div className="text-xs text-gray-600">待处理</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
                >
                  <span className="group-hover:translate-x-1 transition-all duration-300">查看支付</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 财务趋势分析 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <TrendingUp className="w-5 h-5 mr-2" />
                收入趋势
              </CardTitle>
              <CardDescription>过去6个月收入变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-emerald-50 rounded-lg flex items-center justify-center">
                <p className="text-emerald-600 font-medium">收入趋势图表区域</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <PieChart className="w-5 h-5 mr-2" />
                支出分析
              </CardTitle>
              <CardDescription>支出类别分布和占比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>人力成本</span>
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
                      <span>运营费用</span>
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
                      <span>营销推广</span>
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
                      <span>其他费用</span>
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

        {/* 财务预警 */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <AlertTriangle className="w-5 h-5 mr-2" />
              财务预警
            </CardTitle>
            <CardDescription>需要关注的财务风险和异常</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">现金流预警</h4>
                    <p className="text-sm text-yellow-600 mt-1">预计下月现金流可能出现紧张，建议提前准备资金</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">逾期应收款</h4>
                    <p className="text-sm text-red-600 mt-1">有3笔应收款已逾期超过30天，总金额¥156,000</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">预算超支提醒</h4>
                    <p className="text-sm text-blue-600 mt-1">营销费用本月已超出预算15%，建议控制支出</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdaptiveSidebar>
  )
}
