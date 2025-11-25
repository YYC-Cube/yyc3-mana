"use client"

import { PageContainer } from "@/components/layout/page-container"
import { SidebarConfig } from "@/components/sidebar-config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone, Tablet, Zap, Eye, Clock, Settings } from "lucide-react"

export default function SidebarSettingsPage() {
  return (
    <PageContainer title="侧边栏设置" description="配置侧边栏的自动伸缩行为和响应式设置">
      <div className="space-y-6">
        {/* 功能介绍 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">智能伸缩</h3>
                  <p className="text-xs text-gray-500">根据使用情况自动调整</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium">悬停展开</h3>
                  <p className="text-xs text-gray-500">鼠标悬停自动展开</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <h3 className="font-medium">延迟收缩</h3>
                  <p className="text-xs text-gray-500">可配置收缩延迟时间</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-600" />
                <div>
                  <h3 className="font-medium">响应式</h3>
                  <p className="text-xs text-gray-500">适配不同屏幕尺寸</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 使用说明 */}
        <Card>
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
            <CardDescription>了解侧边栏自动伸缩的各种功能和使用方法</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">桌面端</span>
                  <Badge variant="outline">≥1024px</Badge>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 ml-6">
                  <li>• 支持悬停展开</li>
                  <li>• 智能自动收缩</li>
                  <li>• 手动切换控制</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Tablet className="h-4 w-4 text-green-600" />
                  <span className="font-medium">平板端</span>
                  <Badge variant="outline">768-1024px</Badge>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 ml-6">
                  <li>• 默认收缩状态</li>
                  <li>• 点击展开/收缩</li>
                  <li>• 优化触摸体验</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">移动端</span>
                  <Badge variant="outline">＜768px</Badge>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 ml-6">
                  <li>• 抽屉式导航</li>
                  <li>• 全屏遮罩</li>
                  <li>• 手势友好</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 配置组件 */}
        <SidebarConfig
          onConfigChange={(config) => {
            console.log("Sidebar config changed:", config)
            // 这里可以将配置发送到后端或更新全局状态
          }}
        />

        {/* 快捷键说明 */}
        <Card>
          <CardHeader>
            <CardTitle>快捷键</CardTitle>
            <CardDescription>使用键盘快捷键快速控制侧边栏</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">切换侧边栏</span>
                  <Badge variant="outline">Ctrl + B</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">强制展开</span>
                  <Badge variant="outline">Ctrl + Shift + B</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">导航搜索</span>
                  <Badge variant="outline">Ctrl + K</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">设置面板</span>
                  <Badge variant="outline">Ctrl + ,</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
