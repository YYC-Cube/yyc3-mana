"use client"

import { SalesChart } from "@/components/charts/sales-chart"

export default function SalesAnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">销售分析</h1>
        <p className="text-slate-600 mt-2">深入分析销售数据，洞察业务趋势</p>
      </div>
      <SalesChart />
    </div>
  )
}
