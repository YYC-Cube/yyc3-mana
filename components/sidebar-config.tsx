"use client"

import { useState, useEffect } from "react"
import { Settings, Monitor, Smartphone, Tablet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface SidebarConfigProps {
  onConfigChange?: (config: SidebarConfig) => void
}

interface SidebarConfig {
  autoCollapse: boolean
  collapseDelay: number
  hoverExpand: boolean
  responsiveBreakpoints: {
    mobile: number
    tablet: number
    desktop: number
  }
  behavior: "smart" | "manual" | "always-expanded" | "always-collapsed"
}

const defaultConfig: SidebarConfig = {
  autoCollapse: true,
  collapseDelay: 5000,
  hoverExpand: true,
  responsiveBreakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
  },
  behavior: "smart",
}

export function SidebarConfig({ onConfigChange }: SidebarConfigProps) {
  const [config, setConfig] = useState<SidebarConfig>(defaultConfig)
  const [currentScreenSize, setCurrentScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")

  // 检测当前屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width < config.responsiveBreakpoints.mobile) {
        setCurrentScreenSize("mobile")
      } else if (width < config.responsiveBreakpoints.tablet) {
        setCurrentScreenSize("tablet")
      } else {
        setCurrentScreenSize("desktop")
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [config.responsiveBreakpoints])

  // 配置变更处理
  const handleConfigChange = (newConfig: Partial<SidebarConfig>) => {
    const updatedConfig = { ...config, ...newConfig }
    setConfig(updatedConfig)
    onConfigChange?.(updatedConfig)

    // 保存到本地存储
    localStorage.setItem("sidebar-config", JSON.stringify(updatedConfig))
  }

  // 从本地存储加载配置
  useEffect(() => {
    const savedConfig = localStorage.getItem("sidebar-config")
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        setConfig({ ...defaultConfig, ...parsedConfig })
      } catch (error) {
        console.error("Failed to parse sidebar config:", error)
      }
    }
  }, [])

  const getScreenIcon = (size: string) => {
    switch (size) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      case "desktop":
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>侧边栏自动伸缩配置</span>
        </CardTitle>
        <CardDescription>自定义侧边栏的自动伸缩行为和响应式设置</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 当前屏幕状态 */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            {getScreenIcon(currentScreenSize)}
            <span className="font-medium">当前屏幕: {currentScreenSize}</span>
          </div>
          <Badge variant="outline">{window.innerWidth}px</Badge>
        </div>

        {/* 行为模式选择 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">行为模式</label>
          <Select
            value={config.behavior}
            onValueChange={(value: SidebarConfig["behavior"]) => handleConfigChange({ behavior: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smart">智能模式 - 根据使用情况自动调整</SelectItem>
              <SelectItem value="manual">手动模式 - 仅响应用户操作</SelectItem>
              <SelectItem value="always-expanded">始终展开</SelectItem>
              <SelectItem value="always-collapsed">始终收缩</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 自动收缩设置 */}
        {config.behavior === "smart" && (
          <>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium">自动收缩</label>
                <p className="text-xs text-gray-500">无操作时自动收缩侧边栏</p>
              </div>
              <Switch
                checked={config.autoCollapse}
                onCheckedChange={(checked) => handleConfigChange({ autoCollapse: checked })}
              />
            </div>

            {config.autoCollapse && (
              <div className="space-y-3">
                <label className="text-sm font-medium">收缩延迟: {config.collapseDelay / 1000}秒</label>
                <Slider
                  value={[config.collapseDelay]}
                  onValueChange={([value]) => handleConfigChange({ collapseDelay: value })}
                  min={1000}
                  max={30000}
                  step={1000}
                  className="w-full"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium">悬停展开</label>
                <p className="text-xs text-gray-500">鼠标悬停时自动展开</p>
              </div>
              <Switch
                checked={config.hoverExpand}
                onCheckedChange={(checked) => handleConfigChange({ hoverExpand: checked })}
              />
            </div>
          </>
        )}

        {/* 响应式断点设置 */}
        <div className="space-y-4">
          <label className="text-sm font-medium">响应式断点</label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 flex items-center space-x-1">
                <Smartphone className="h-3 w-3" />
                <span>移动端 (px)</span>
              </label>
              <input
                type="number"
                value={config.responsiveBreakpoints.mobile}
                onChange={(e) =>
                  handleConfigChange({
                    responsiveBreakpoints: {
                      ...config.responsiveBreakpoints,
                      mobile: Number.parseInt(e.target.value) || 768,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-500 flex items-center space-x-1">
                <Tablet className="h-3 w-3" />
                <span>平板端 (px)</span>
              </label>
              <input
                type="number"
                value={config.responsiveBreakpoints.tablet}
                onChange={(e) =>
                  handleConfigChange({
                    responsiveBreakpoints: {
                      ...config.responsiveBreakpoints,
                      tablet: Number.parseInt(e.target.value) || 1024,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-500 flex items-center space-x-1">
                <Monitor className="h-3 w-3" />
                <span>桌面端 (px)</span>
              </label>
              <input
                type="number"
                value={config.responsiveBreakpoints.desktop}
                onChange={(e) =>
                  handleConfigChange({
                    responsiveBreakpoints: {
                      ...config.responsiveBreakpoints,
                      desktop: Number.parseInt(e.target.value) || 1440,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        {/* 预设配置 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">快速配置</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleConfigChange({
                  behavior: "smart",
                  autoCollapse: true,
                  collapseDelay: 3000,
                  hoverExpand: true,
                })
              }
            >
              高效模式
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleConfigChange({
                  behavior: "manual",
                  autoCollapse: false,
                  hoverExpand: false,
                })
              }
            >
              简洁模式
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleConfigChange({
                  behavior: "always-expanded",
                  autoCollapse: false,
                  hoverExpand: false,
                })
              }
            >
              始终展开
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleConfigChange(defaultConfig)}>
              恢复默认
            </Button>
          </div>
        </div>

        {/* 配置预览 */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">当前配置预览</h4>
          <div className="text-xs text-blue-700 space-y-1">
            <p>
              • 行为模式:{" "}
              {config.behavior === "smart"
                ? "智能模式"
                : config.behavior === "manual"
                  ? "手动模式"
                  : config.behavior === "always-expanded"
                    ? "始终展开"
                    : "始终收缩"}
            </p>
            {config.behavior === "smart" && (
              <>
                <p>• 自动收缩: {config.autoCollapse ? `开启 (${config.collapseDelay / 1000}秒后)` : "关闭"}</p>
                <p>• 悬停展开: {config.hoverExpand ? "开启" : "关闭"}</p>
              </>
            )}
            <p>• 当前屏幕适配: {currentScreenSize}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
