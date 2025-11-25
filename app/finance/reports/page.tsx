"use client"

import { FinanceChart } from "@/components/charts/finance-chart"

export default function FinanceReportsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">财务报表</h1>
        <p className="text-slate-600 mt-2">详细的财务数据分析和报表</p>
      </div>
      <FinanceChart />
    </div>
  )
}
