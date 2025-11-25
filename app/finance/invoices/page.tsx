"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { InvoiceManagement } from "@/components/invoice-management"

export default function InvoicesPage() {
  return (
    <AdaptiveSidebar defaultModule="invoices">
      <InvoiceManagement />
    </AdaptiveSidebar>
  )
}
