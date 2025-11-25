import type { Metadata } from "next"
import SystemSettings from "@/components/system-settings"

export const metadata: Metadata = {
  title: "系统设置 - 金兰企业管理系统",
  description: "全局系统配置管理",
}

export default function SystemSettingsPage() {
  return <SystemSettings />
}
