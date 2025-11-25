"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Database, RefreshCw } from "lucide-react"

export default function InitializationLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* 页面标题加载 */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* 总体进度卡片加载 */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-3 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 标签页加载 */}
      <div className="space-y-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>

        {/* 初始化步骤加载 */}
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* 进度条 */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>

                  {/* 依赖关系 */}
                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>

                  {/* 执行信息 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 底部操作按钮加载 */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-32" />
      </div>

      {/* 加载提示 */}
      <div className="fixed bottom-4 right-4">
        <Card className="bg-white shadow-lg border border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">系统初始化中</p>
                <p className="text-xs text-blue-600">正在检查系统组件...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
