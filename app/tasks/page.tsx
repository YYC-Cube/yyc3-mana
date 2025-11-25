"use client"

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar"
import { TaskManagement } from "@/components/task-management"

export default function TasksPage() {
  return (
    <AdaptiveSidebar defaultModule="tasks">
      <TaskManagement />
    </AdaptiveSidebar>
  )
}
