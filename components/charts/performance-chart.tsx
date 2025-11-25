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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// 绩效趋势数据
const performanceTrendData = [
  { month: "1月", teamA: 85, teamB: 78, teamC: 92, average: 85 },
  { month: "2月", teamA: 88, teamB: 82, teamC: 89, average: 86 },
  { month: "3月", teamA: 92, teamB: 85, teamC: 94, average: 90 },
  { month: "4月", teamA: 87, teamB: 88, teamC: 91, average: 89 },
  { month: "5月", teamA: 94, teamB: 90, teamC: 96, average: 93 },
  { month: "6月", teamA: 91, teamB: 87, teamC: 93, average: 90 },
]

// KPI达成情况
const kpiData = [
  { kpi: "销售目标", achievement: 105, target: 100 },
  { kpi: "客户满意度", achievement: 92, target: 90 },
  { kpi: "项目完成率", achievement: 88, target: 95 },
  { kpi: "团队协作", achievement: 94, target: 85 },
  { kpi: "创新指标", achievement: 78, target: 80 },
]

// 员工绩效排行
const employeePerformanceData = [
  { name: "张三", score: 95, department: "销售部" },
  { name: "李四", score: 92, department: "技术部" },
  { name: "王五", score: 89, department: "市场部" },
  { name: "赵六", score: 87, department: "运营部" },
  { name: "钱七", score: 85, department: "财务部" },
]

// 雷达图数据
const radarData = [
  { subject: "销售能力", A: 120, B: 110, fullMark: 150 },
  { subject: "技术能力", A: 98, B: 130, fullMark: 150 },
  { subject: "沟通能力", A: 86, B: 130, fullMark: 150 },
  { subject: "创新能力", A: 99, B: 100, fullMark: 150 },
  { subject: "执行能力", A: 85, B: 90, fullMark: 150 },
  { subject: "团队协作", A: 65, B: 85, fullMark: 150 },
]

export function PerformanceChart() {
  return (
    <div className="space-y-6">
      {/* 绩效趋势图 */}
      <Card>
        <CardHeader>
          <CardTitle>团队绩效趋势</CardTitle>
          <CardDescription>各团队月度绩效表现对比</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              teamA: {
                label: "团队A",
                color: "hsl(var(--chart-1))",
              },
              teamB: {
                label: "团队B",
                color: "hsl(var(--chart-2))",
              },
              teamC: {
                label: "团队C",
                color: "hsl(var(--chart-3))",
              },
              average: {
                label: "平均值",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="teamA"
                  stroke="var(--color-teamA)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-teamA)", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="teamB"
                  stroke="var(--color-teamB)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-teamB)", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="teamC"
                  stroke="var(--color-teamC)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-teamC)", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="var(--color-average)"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: "var(--color-average)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI达成情况 */}
        <Card>
          <CardHeader>
            <CardTitle>KPI达成情况</CardTitle>
            <CardDescription>各项关键指标完成情况</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                achievement: {
                  label: "实际达成",
                  color: "hsl(var(--chart-1))",
                },
                target: {
                  label: "目标值",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kpiData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="kpi" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="achievement" fill="var(--color-achievement)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="var(--color-target)" radius={[4, 4, 0, 0]} opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 员工绩效排行 */}
        <Card>
          <CardHeader>
            <CardTitle>员工绩效排行</CardTitle>
            <CardDescription>本月员工绩效得分排名</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeePerformanceData.map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{employee.name}</p>
                      <p className="text-sm text-slate-600">{employee.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-slate-800">{employee.score}</p>
                    <p className="text-xs text-slate-500">分</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 能力雷达图 */}
      <Card>
        <CardHeader>
          <CardTitle>团队能力分析</CardTitle>
          <CardDescription>团队A vs 团队B 各项能力对比</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              A: {
                label: "团队A",
                color: "hsl(var(--chart-1))",
              },
              B: {
                label: "团队B",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 150]} />
                <Radar
                  name="团队A"
                  dataKey="A"
                  stroke="var(--color-A)"
                  fill="var(--color-A)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="团队B"
                  dataKey="B"
                  stroke="var(--color-B)"
                  fill="var(--color-B)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <ChartTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
