import type { Metadata } from "next"
import UserManagement from "@/components/user-management"

export const metadata: Metadata = {
  title: "用户管理 - 金兰企业管理系统",
  description: "用户权限和角色管理",
}

export default function UserManagementPage() {
  return <UserManagement />
}
