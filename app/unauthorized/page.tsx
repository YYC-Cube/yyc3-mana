"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Home, ArrowLeft, LogOut } from "lucide-react"

export default function UnauthorizedPage() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleGoHome = () => {
    router.push("/dashboard")
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleSwitchAccount = () => {
    logout()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">访问被拒绝</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">抱歉，您没有访问此页面的权限</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {user && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">当前账户信息</h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-medium">用户名:</span> {user.username}
                </p>
                <p>
                  <span className="font-medium">姓名:</span> {user.name}
                </p>
                <p>
                  <span className="font-medium">角色:</span> {user.role}
                </p>
                <p>
                  <span className="font-medium">邮箱:</span> {user.email}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button onClick={handleGoHome} className="w-full" size="lg">
              <Home className="mr-2 h-4 w-4" />
              回到首页
            </Button>

            <Button onClick={handleGoBack} variant="outline" className="w-full bg-transparent" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回上页
            </Button>

            <Button onClick={handleSwitchAccount} variant="ghost" className="w-full" size="lg">
              <LogOut className="mr-2 h-4 w-4" />
              切换账户
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">如需更高权限，请联系系统管理员</div>
        </CardContent>
      </Card>
    </div>
  )
}
