"use client"

import { CustomerManagement } from "@/components/customer-management"

export default function CustomerAnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">客户分析</h1>
        <p className="text-slate-600 mt-2">全面了解客户行为和价值分布</p>
      </div>
      <CustomerManagement />
    </div>
  )
}
