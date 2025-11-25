"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { OKRManagement } from "@/components/okr-management"

export default function OKRPage() {
  return (
    <AdaptiveSidebar defaultModule="okr">
      <OKRManagement />
    </AdaptiveSidebar>
  )
}
