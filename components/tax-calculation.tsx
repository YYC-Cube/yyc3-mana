"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calculator,
  FileText,
  TrendingUp,
  AlertTriangle,
  Download,
  Calendar,
  DollarSign,
  Percent,
  PieChart,
  BarChart3,
} from "lucide-react"

interface TaxRate {
  id: string
  name: string
  rate: number
  category: string
  description: string
}

interface TaxCalculation {
  id: string
  period: string
  revenue: number
  vatTax: number
  incomeTax: number
  businessTax: number
  totalTax: number
  effectiveRate: number
}

export function TaxCalculation() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-01")
  const [calculationData, setCalculationData] = useState({
    revenue: 1000000,
    expenses: 600000,
    vatRate: 0.13,
    incomeTaxRate: 0.25,
    businessTaxRate: 0.05,
  })

  const taxRates: TaxRate[] = [
    { id: "1", name: "增值税", rate: 0.13, category: "流转税", description: "一般纳税人标准税率" },
    { id: "2", name: "增值税(小规模)", rate: 0.03, category: "流转税", description: "小规模纳税人征收率" },
    { id: "3", name: "企业所得税", rate: 0.25, category: "所得税", description: "企业所得税标准税率" },
    { id: "4", name: "小微企业所得税", rate: 0.2, category: "所得税", description: "小微企业优惠税率" },
    { id: "5", name: "个人所得税", rate: 0.45, category: "所得税", description: "个人所得税最高税率" },
    { id: "6", name: "城建税", rate: 0.07, category: "附加税", description: "城市维护建设税" },
    { id: "7", name: "教育费附加", rate: 0.03, category: "附加税", description: "教育费附加" },
    { id: "8", name: "地方教育附加", rate: 0.02, category: "附加税", description: "地方教育费附加" },
  ]

  const monthlyTaxData: TaxCalculation[] = [
    {
      id: "1",
      period: "2024-01",
      revenue: 1200000,
      vatTax: 156000,
      incomeTax: 150000,
      businessTax: 60000,
      totalTax: 366000,
      effectiveRate: 0.305,
    },
    {
      id: "2",
      period: "2024-02",
      revenue: 980000,
      vatTax: 127400,
      incomeTax: 122500,
      businessTax: 49000,
      totalTax: 298900,
      effectiveRate: 0.305,
    },
    {
      id: "3",
      period: "2024-03",
      revenue: 1100000,
      vatTax: 143000,
      incomeTax: 137500,
      businessTax: 55000,
      totalTax: 335500,
      effectiveRate: 0.305,
    },
  ]

  const calculateTax = () => {
    const { revenue, expenses, vatRate, incomeTaxRate, businessTaxRate } = calculationData
    const profit = revenue - expenses

    const vatTax = revenue * vatRate
    const incomeTax = profit * incomeTaxRate
    const businessTax = revenue * businessTaxRate
    const totalTax = vatTax + incomeTax + businessTax
    const effectiveRate = totalTax / revenue
    const netProfit = profit - totalTax

    return {
      revenue,
      expenses,
      profit,
      vatTax,
      incomeTax,
      businessTax,
      totalTax,
      effectiveRate,
      netProfit,
    }
  }

  const taxResult = calculateTax()

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">税务计算中心</h1>
          <p className="text-muted-foreground">智能税务计算与筹划分析</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出报表
          </Button>
          <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
            <FileText className="w-4 h-4 mr-2" />
            生成税务报告
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">税务计算器</TabsTrigger>
          <TabsTrigger value="rates">税率查询</TabsTrigger>
          <TabsTrigger value="analysis">税务分析</TabsTrigger>
          <TabsTrigger value="planning">税务筹划</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 计算器输入 */}
            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  税务计算器
                </CardTitle>
                <CardDescription>输入财务数据进行税务计算</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue">营业收入 (元)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={calculationData.revenue}
                    onChange={(e) =>
                      setCalculationData((prev) => ({
                        ...prev,
                        revenue: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    placeholder="输入营业收入"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expenses">营业成本 (元)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={calculationData.expenses}
                    onChange={(e) =>
                      setCalculationData((prev) => ({
                        ...prev,
                        expenses: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    placeholder="输入营业成本"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vatRate">增值税率</Label>
                    <Select
                      value={calculationData.vatRate.toString()}
                      onValueChange={(value) =>
                        setCalculationData((prev) => ({
                          ...prev,
                          vatRate: Number.parseFloat(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.13">13%</SelectItem>
                        <SelectItem value="0.09">9%</SelectItem>
                        <SelectItem value="0.06">6%</SelectItem>
                        <SelectItem value="0.03">3%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incomeTaxRate">所得税率</Label>
                    <Select
                      value={calculationData.incomeTaxRate.toString()}
                      onValueChange={(value) =>
                        setCalculationData((prev) => ({
                          ...prev,
                          incomeTaxRate: Number.parseFloat(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.25">25%</SelectItem>
                        <SelectItem value="0.20">20%</SelectItem>
                        <SelectItem value="0.15">15%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessTaxRate">附加税率</Label>
                    <Select
                      value={calculationData.businessTaxRate.toString()}
                      onValueChange={(value) =>
                        setCalculationData((prev) => ({
                          ...prev,
                          businessTaxRate: Number.parseFloat(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.12">12%</SelectItem>
                        <SelectItem value="0.10">10%</SelectItem>
                        <SelectItem value="0.05">5%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                  onClick={() => {
                    /* 触发重新计算 */
                  }}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  重新计算
                </Button>
              </CardContent>
            </Card>

            {/* 计算结果 */}
            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  计算结果
                </CardTitle>
                <CardDescription>基于输入数据的税务计算结果</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">营业收入</div>
                    <div className="text-xl font-bold text-blue-800">¥{taxResult.revenue.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-sm text-red-600 font-medium">营业成本</div>
                    <div className="text-xl font-bold text-red-800">¥{taxResult.expenses.toLocaleString()}</div>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">毛利润</div>
                  <div className="text-2xl font-bold text-green-800">¥{taxResult.profit.toLocaleString()}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">增值税</span>
                    <span className="font-medium">¥{taxResult.vatTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">企业所得税</span>
                    <span className="font-medium">¥{taxResult.incomeTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">附加税费</span>
                    <span className="font-medium">¥{taxResult.businessTax.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">税费合计</span>
                    <span className="text-xl font-bold text-red-600">¥{taxResult.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">综合税率</span>
                    <span className="text-lg font-bold text-orange-600">
                      {(taxResult.effectiveRate * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">税后净利润</span>
                    <span className="text-xl font-bold text-green-600">¥{taxResult.netProfit.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 税负分析图表 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                税负结构分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">增值税</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                        <div className="w-2/5 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">
                        {((taxResult.vatTax / taxResult.totalTax) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">企业所得税</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                        <div className="w-2/5 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">
                        {((taxResult.incomeTax / taxResult.totalTax) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">附加税费</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                        <div className="w-1/5 h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">
                        {((taxResult.businessTax / taxResult.totalTax) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">税负优化建议</h4>
                  <div className="space-y-1">
                    <div className="p-2 bg-yellow-50 rounded text-sm">
                      <span className="font-medium text-yellow-800">增值税优化:</span>
                      <span className="text-yellow-600"> 考虑进项税抵扣</span>
                    </div>
                    <div className="p-2 bg-green-50 rounded text-sm">
                      <span className="font-medium text-green-800">所得税优化:</span>
                      <span className="text-green-600"> 合理费用扣除</span>
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-sm">
                      <span className="font-medium text-blue-800">整体优化:</span>
                      <span className="text-blue-600"> 税务筹划建议</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">行业对比</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">当前税率</span>
                      <Badge className="bg-orange-100 text-orange-800">
                        {(taxResult.effectiveRate * 100).toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">行业平均</span>
                      <Badge className="bg-gray-100 text-gray-800">28.5%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">优化空间</span>
                      <Badge className="bg-green-100 text-green-800">
                        {(28.5 - taxResult.effectiveRate * 100).toFixed(2)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rates" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>税率查询表</CardTitle>
              <CardDescription>查看各类税种的最新税率信息</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>税种名称</TableHead>
                    <TableHead>税率</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>说明</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxRates.map((rate) => (
                    <TableRow key={rate.id}>
                      <TableCell className="font-medium">{rate.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{(rate.rate * 100).toFixed(rate.rate < 0.01 ? 1 : 0)}%</Badge>
                      </TableCell>
                      <TableCell>{rate.category}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{rate.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">月度税负</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">30.5%</div>
                <p className="text-xs text-muted-foreground">较上月 +0.8%</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">年度税费</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥3,654,200</div>
                <p className="text-xs text-muted-foreground">预计全年税费</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">优化潜力</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">¥245,800</div>
                <p className="text-xs text-muted-foreground">可节省税费</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>月度税务分析</CardTitle>
              <CardDescription>查看各月份的税务数据趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>期间</TableHead>
                    <TableHead>营业收入</TableHead>
                    <TableHead>增值税</TableHead>
                    <TableHead>所得税</TableHead>
                    <TableHead>附加税</TableHead>
                    <TableHead>税费合计</TableHead>
                    <TableHead>综合税率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyTaxData.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell className="font-medium">{data.period}</TableCell>
                      <TableCell>¥{data.revenue.toLocaleString()}</TableCell>
                      <TableCell>¥{data.vatTax.toLocaleString()}</TableCell>
                      <TableCell>¥{data.incomeTax.toLocaleString()}</TableCell>
                      <TableCell>¥{data.businessTax.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">¥{data.totalTax.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{(data.effectiveRate * 100).toFixed(1)}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  税务风险提醒
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-medium text-red-800">高风险</div>
                  <div className="text-sm text-red-600">增值税进项税额异常，需要核查</div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="font-medium text-yellow-800">中风险</div>
                  <div className="text-sm text-yellow-600">企业所得税预缴不足，建议补缴</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800">低风险</div>
                  <div className="text-sm text-green-600">整体税务合规性良好</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>税务筹划建议</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800">增值税筹划</div>
                  <div className="text-sm text-blue-600">
                    • 合理安排采购时间，充分利用进项税抵扣
                    <br />• 考虑设立分公司享受小规模纳税人优惠
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800">所得税筹划</div>
                  <div className="text-sm text-green-600">
                    • 加大研发费用投入，享受加计扣除
                    <br />• 合理安排固定资产折旧方式
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-800">整体筹划</div>
                  <div className="text-sm text-purple-600">
                    • 考虑在税收优惠地区设立子公司
                    <br />• 优化业务流程，降低整体税负
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>税务日历</CardTitle>
              <CardDescription>重要税务申报和缴纳时间提醒</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-sky-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">每月15日前</span>
                  </div>
                  <div className="text-sm text-muted-foreground">增值税、消费税申报缴纳</div>
                </div>
                <div className="p-4 border border-sky-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="font-medium">季度末次月15日前</span>
                  </div>
                  <div className="text-sm text-muted-foreground">企业所得税预缴申报</div>
                </div>
                <div className="p-4 border border-sky-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">次年5月31日前</span>
                  </div>
                  <div className="text-sm text-muted-foreground">企业所得税年度汇算清缴</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
