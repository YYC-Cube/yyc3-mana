"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Zap, type LucideIcon } from "lucide-react"

interface QuickAction {
  icon: LucideIcon
  label: string
  action: () => void
  shortcut?: string
}

interface QuickActionsMenuProps {
  actions: QuickAction[]
}

export function QuickActionsMenu({ actions }: QuickActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-colors duration-200"
        >
          <Zap className="w-4 h-4 mr-2" />
          快速操作
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>快速操作</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, index) => (
          <DropdownMenuItem key={index} onClick={action.action} className="cursor-pointer">
            <action.icon className="mr-2 h-4 w-4" />
            <span className="flex-1">{action.label}</span>
            {action.shortcut && <span className="text-xs text-gray-400 ml-2">{action.shortcut}</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
