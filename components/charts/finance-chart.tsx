"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"

// 财务趋势数据
const financeTrendData = [
  { month: "1月", income: 850000, expense: 620000, profit: 230000 },
  { month: "2月", income: 920000, expense: 680000, profit: 240000 },
  { month: "3月", income: 780000, expense: 590000, profit: 190000 },
  { month: "4月", income: 1050000, expense: 750000, profit: 300000 },
  { month: "5月", income: 1180000, expense: 820000, profit: 360000 },
  { month: "6月", income: 1100000, expense: 780000, profit: 320000 },
]

// 支出分类数据
const expenseData = [
  { category: "人力成本", amount: 320000, percentage: 42 },
  { category: "运营费用", amount: 180000, percentage: 24 },
  { category: "市场推广", amount: 120000, percentage: 16 },
  { category: "技术投入", amount: 90000, percentage: 12 },
  { category: "其他费用", amount: 45000, percentage: 6 },
]

// 预算执行情况
const budgetData = [
  { name: "人力成本", value: 85, color: "#10b981" },
  { name: "运营费用", value: 92, color: "#3b82f6" },
  { name: "市场推广", value: 78, color: "#f59e0b" },
  { name: "技术投入", value: 95, color: "#8b5cf6" },
]

export function FinanceChart() {
  return (
    <div className="space-y-6">
      {/* 财务趋势图 */}
      <Card>
        <CardHeader>
          <CardTitle>财务趋势分析</CardTitle>
          <CardDescription>收入、支出和利润趋势对比</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              income: {
                label: "收入",
                color: "hsl(var(--chart-1))",
              },
              expense: {
                label: "支出",
                color: "hsl(var(--chart-2))",
              },
              profit: {
                label: "利润",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="var(--color-income)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-income)", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="var(--color-expense)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-expense)", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="var(--color-profit)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-profit)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 支出分类分析 */}
        <Card>
          <CardHeader>
            <CardTitle>支出分类分析</CardTitle>
            <CardDescription>各类支出金额对比</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: {
                  label: "支出金额",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 预算执行情况 */}
        <Card>
          <CardHeader>
            <CardTitle>预算执行情况</CardTitle>
            <CardDescription>各项预算执行进度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.name}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
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
