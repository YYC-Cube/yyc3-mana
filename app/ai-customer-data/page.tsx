"use client"

import { AiCustomerData } from "@/components/ai-customer-data"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"

export default function AiCustomerDataPage() {
  return (
    <div className="p-6">
      {/* 页面头部区域 - 统一设计规范 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI客户数据</h1>
          <p className="text-slate-600 mt-1">智能客户数据分析与转化预测系统</p>
        </div>
      </div>

      {/* AI客户数据内容 */}
      <AiCustomerData />

      <FloatingNavButtons />
    </div>
  )
}
