"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { CustomerManagement } from "@/components/customer-management"

export default function CustomersPage() {
  return (
    <AdaptiveSidebar defaultModule="customers">
      <CustomerManagement />
    </AdaptiveSidebar>
  )
}
