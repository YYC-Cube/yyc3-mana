"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { BarChart3, Users, Settings, Bot, Building2, Brain, Smartphone, Shield } from "lucide-react"

export function ModuleCards() {
  const router = useRouter()

  const handleModuleClick = (moduleName: string) => {
    switch (moduleName) {
      case "dashboard":
        router.push("/dashboard")
        break
      case "users":
        router.push("/customers")
        break
      case "settings":
        router.push("/settings")
        break
      case "ai-assistant":
        router.push("/ai-assistant")
        break
      case "tenant-management":
        router.push("/tenant-management")
        break
      case "advanced-bi":
        router.push("/advanced-bi")
        break
      case "mobile-app":
        router.push("/mobile-app")
        break
      case "security":
        router.push("/security")
        break
      default:
        console.warn(`Unhandled module: ${moduleName}`)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 数据总览 - 绿色系 */}
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-green-50 to-lime-50 border-green-200 border-l-4 border-l-green-400"
        onClick={() => handleModuleClick("dashboard")}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-lime-600 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300">核心功能</Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">数据总览</h3>
          <p className="text-gray-600 text-sm mb-4">核心数据指标监控面板</p>
          <div className="flex items-center text-green-600 text-sm font-medium">
            <span>查看报表</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>

      {/* 用户管理 - 橙色系 */}
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 border-l-4 border-l-orange-400"
        onClick={() => handleModuleClick("users")}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <Badge className="bg-orange-100 text-orange-800 border-orange-300">权限控制</Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">用户管理</h3>
          <p className="text-gray-600 text-sm mb-4">用户账户和权限管理</p>
          <div className="flex items-center text-orange-600 text-sm font-medium">
            <span>管理用户</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>

      {/* 系统设置 - 蓝色系 */}
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200 border-l-4 border-l-sky-400"
        onClick={() => handleModuleClick("settings")}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <Badge className="bg-sky-100 text-sky-800 border-sky-300">个性定制</Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">系统设置</h3>
          <p className="text-gray-600 text-sm mb-4">系统偏好设置和账户管理</p>
          <div className="flex items-center text-sky-600 text-sm font-medium">
            <span>修改设置</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>

      {/* AI智能助手 - 紫色系 */}
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 border-l-4 border-l-purple-400"
        onClick={() => handleModuleClick("ai-assistant")}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <Badge className="bg-purple-100 text-purple-800 border-purple-300">AI驱动</Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">AI智能助手</h3>
          <p className="text-gray-600 text-sm mb-4">智能业务分析和决策支持</p>
          <div className="flex items-center text-purple-600 text-sm font-medium">
            <span>立即体验</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>

      {/* 多租户管理 - 绿色系 */}
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 border-l-4 border-l-emerald-400"
        onClick={() => handleModuleClick("tenant-management")}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">企业级</Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">多租户管理</h3>
          <p className="text-gray-600 text-sm mb-4">多企业组织统一管理</p>
          <div className="flex items-center text-emerald-600 text-sm font-medium">
            <span>管理租户</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>

      {/* 高级BI分析 - 紫色系 */}
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 border-l-4 border-l-indigo-400"
        onClick={() => handleModuleClick("advanced-bi")}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">智能分析</Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">高级BI分析</h3>
          <p className="text-gray-600 text-sm mb-4">商业智能和自定义报表</p>
          <div className="flex items-center text-indigo-600 text-sm font-medium">
            <span>查看分析</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>

      {/* 移动端应用 - 玫瑰色系 */}
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 border-l-4 border-l-rose-400"
        onClick={() => handleModuleClick("mobile-app")}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <Badge className="bg-rose-100 text-rose-800 border-rose-300">移动优先</Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">移动端应用</h3>
          <p className="text-gray-600 text-sm mb-4">原生移动端体验</p>
          <div className="flex items-center text-rose-600 text-sm font-medium">
            <span>体验应用</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>

      {/* 安全中心 - 橙色系 */}
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-red-50 to-orange-50 border-red-200 border-l-4 border-l-red-400"
        onClick={() => handleModuleClick("security")}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <Badge className="bg-red-100 text-red-800 border-red-300">安全防护</Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">安全中心</h3>
          <p className="text-gray-600 text-sm mb-4">系统安全监控和威胁防护</p>
          <div className="flex items-center text-red-600 text-sm font-medium">
            <span>安全管理</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
