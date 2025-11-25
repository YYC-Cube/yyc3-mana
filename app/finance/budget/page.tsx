"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { BudgetManagement } from "@/components/finance/budget-management"

export default function BudgetPage() {
  return (
    <AdaptiveSidebar defaultModule="budget">
      <BudgetManagement />
    </AdaptiveSidebar>
  )
}
