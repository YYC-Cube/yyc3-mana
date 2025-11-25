"use client"

import { PerformanceChart } from "@/components/charts/performance-chart"

export default function PerformanceAnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">绩效分析</h1>
        <p className="text-slate-600 mt-2">团队和个人绩效表现全面分析</p>
      </div>
      <PerformanceChart />
    </div>
  )
}
