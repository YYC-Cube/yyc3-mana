"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useSidebarContext } from "./adaptive-sidebar"

interface SidebarTriggerProps {
  className?: string
}

export function SidebarTrigger({ className }: SidebarTriggerProps) {
  const { isCollapsed, setIsCollapsed } = useSidebarContext()

  return (
    <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className={className}>
      {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
    </Button>
  )
}
