"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// 销售趋势数据
const salesTrendData = [
  { month: "1月", sales: 65000, target: 70000, growth: 12.5 },
  { month: "2月", sales: 72000, target: 75000, growth: 15.2 },
  { month: "3月", sales: 68000, target: 70000, growth: 8.7 },
  { month: "4月", sales: 85000, target: 80000, growth: 25.3 },
  { month: "5月", sales: 92000, target: 90000, growth: 18.9 },
  { month: "6月", sales: 88000, target: 85000, growth: 22.1 },
]

// 产品销售分布
const productSalesData = [
  { product: "产品A", sales: 320000, percentage: 35 },
  { product: "产品B", sales: 280000, percentage: 30 },
  { product: "产品C", sales: 180000, percentage: 20 },
  { product: "产品D", sales: 120000, percentage: 15 },
]

// 区域销售数据
const regionSalesData = [
  { name: "华东", value: 35, color: "#3b82f6" },
  { name: "华南", value: 28, color: "#10b981" },
  { name: "华北", value: 22, color: "#f59e0b" },
  { name: "西部", value: 15, color: "#ef4444" },
]

export function SalesChart() {
  return (
    <div className="space-y-6">
      {/* 销售趋势图 */}
      <Card>
        <CardHeader>
          <CardTitle>销售趋势分析</CardTitle>
          <CardDescription>过去6个月的销售表现与目标对比</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              sales: {
                label: "实际销售",
                color: "hsl(var(--chart-1))",
              },
              target: {
                label: "销售目标",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-sales)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-sales)", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="var(--color-target)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "var(--color-target)", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 产品销售排行 */}
        <Card>
          <CardHeader>
            <CardTitle>产品销售排行</CardTitle>
            <CardDescription>各产品线销售额对比</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: "销售额",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productSalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="product" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 区域销售分布 */}
        <Card>
          <CardHeader>
            <CardTitle>区域销售分布</CardTitle>
            <CardDescription>各区域销售占比情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={regionSalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {regionSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {regionSalesData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-600">{item.name}</span>
                  <span className="text-sm font-semibold text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
