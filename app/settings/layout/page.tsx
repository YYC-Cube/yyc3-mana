"use client"

import { useState } from "react"
import { ResponsiveLayout } from "@/components/layout/responsive-layout"
import { ResponsiveContainer } from "@/components/layout/responsive-container"
import { ResponsiveGrid, ResponsiveGridItem } from "@/components/layout/responsive-grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useResponsiveLayout, type LayoutConfig } from "@/lib/responsive-layout"
import { useLayoutContext } from "@/components/layout/responsive-layout"
import { Monitor, Smartphone, Tablet, Layout, Grid, Maximize, Save, RotateCcw } from "lucide-react"

export default function LayoutSettingsPage() {
  const { screenSize, windowSize, isMobile, isTablet, isDesktop, orientation } = useResponsiveLayout()

  const { layoutConfig, updateLayoutConfig } = useLayoutContext()
  const [tempConfig, setTempConfig] = useState<LayoutConfig>(layoutConfig)

  const handleConfigChange = (updates: Partial<LayoutConfig>) => {
    setTempConfig((prev) => ({ ...prev, ...updates }))
  }

  const saveConfig = () => {
    updateLayoutConfig(tempConfig)
    // 保存到本地存储
    localStorage.setItem("layout-config", JSON.stringify(tempConfig))
  }

  const resetConfig = () => {
    const defaultConfig: LayoutConfig = {
      sidebar: {
        width: { expanded: 256, collapsed: 64 },
        autoCollapse: true,
        collapseDelay: 5000,
        hoverExpand: true,
        mobileBreakpoint: 1024,
      },
      header: {
        height: 64,
        sticky: true,
        showOnMobile: true,
      },
      content: {
        padding: { mobile: 16, tablet: 24, desktop: 32 },
        maxWidth: 1920,
        centered: true,
      },
      grid: {
        columns: { mobile: 1, tablet: 2, desktop: 3 },
        gap: { mobile: 16, tablet: 20, desktop: 24 },
      },
    }
    setTempConfig(defaultConfig)
  }

  const getDeviceIcon = () => {
    if (isMobile) return <Smartphone className="h-5 w-5" />
    if (isTablet) return <Tablet className="h-5 w-5" />
    return <Monitor className="h-5 w-5" />
  }

  return (
    <ResponsiveLayout>
      <ResponsiveContainer variant="contained">
        <div className="space-y-8">
          {/* 页面标题 */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">布局设置</h1>
            <p className="text-lg text-gray-600">自定义系统的响应式布局和显示效果</p>
          </div>

          {/* 当前设备信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getDeviceIcon()}
                <span>当前设备信息</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveGrid
                config={{
                  columns: { xs: 1, sm: 2, md: 4 },
                  gap: { xs: 16, md: 20 },
                }}
              >
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{screenSize.toUpperCase()}</div>
                  <div className="text-sm text-gray-500">屏幕尺寸</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {windowSize.width}×{windowSize.height}
                  </div>
                  <div className="text-sm text-gray-500">分辨率</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{orientation}</div>
                  <div className="text-sm text-gray-500">方向</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {isMobile ? "移动" : isTablet ? "平板" : "桌面"}
                  </div>
                  <div className="text-sm text-gray-500">设备类型</div>
                </div>
              </ResponsiveGrid>
            </CardContent>
          </Card>

          {/* 布局配置 */}
          <ResponsiveGrid
            config={{
              columns: { xs: 1, lg: 2 },
              gap: { xs: 24, lg: 32 },
            }}
          >
            {/* 侧边栏设置 */}
            <ResponsiveGridItem>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layout className="h-5 w-5" />
                    <span>侧边栏设置</span>
                  </CardTitle>
                  <CardDescription>配置侧边栏的行为和样式</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 宽度设置 */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium">展开宽度: {tempConfig.sidebar.width.expanded}px</label>
                    <Slider
                      value={[tempConfig.sidebar.width.expanded]}
                      onValueChange={([value]) =>
                        handleConfigChange({
                          sidebar: {
                            ...tempConfig.sidebar,
                            width: { ...tempConfig.sidebar.width, expanded: value },
                          },
                        })
                      }
                      min={200}
                      max={400}
                      step={16}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium">收缩宽度: {tempConfig.sidebar.width.collapsed}px</label>
                    <Slider
                      value={[tempConfig.sidebar.width.collapsed]}
                      onValueChange={([value]) =>
                        handleConfigChange({
                          sidebar: {
                            ...tempConfig.sidebar,
                            width: { ...tempConfig.sidebar.width, collapsed: value },
                          },
                        })
                      }
                      min={48}
                      max={120}
                      step={8}
                    />
                  </div>

                  {/* 自动收缩 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">自动收缩</div>
                      <div className="text-sm text-gray-500">无操作时自动收缩</div>
                    </div>
                    <Switch
                      checked={tempConfig.sidebar.autoCollapse}
                      onCheckedChange={(checked) =>
                        handleConfigChange({
                          sidebar: { ...tempConfig.sidebar, autoCollapse: checked },
                        })
                      }
                    />
                  </div>

                  {tempConfig.sidebar.autoCollapse && (
                    <div className="space-y-4">
                      <label className="text-sm font-medium">
                        收缩延迟: {tempConfig.sidebar.collapseDelay / 1000}秒
                      </label>
                      <Slider
                        value={[tempConfig.sidebar.collapseDelay]}
                        onValueChange={([value]) =>
                          handleConfigChange({
                            sidebar: { ...tempConfig.sidebar, collapseDelay: value },
                          })
                        }
                        min={1000}
                        max={30000}
                        step={1000}
                      />
                    </div>
                  )}

                  {/* 悬停展开 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">悬停展开</div>
                      <div className="text-sm text-gray-500">鼠标悬停时展开</div>
                    </div>
                    <Switch
                      checked={tempConfig.sidebar.hoverExpand}
                      onCheckedChange={(checked) =>
                        handleConfigChange({
                          sidebar: { ...tempConfig.sidebar, hoverExpand: checked },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </ResponsiveGridItem>

            {/* 内容区域设置 */}
            <ResponsiveGridItem>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Maximize className="h-5 w-5" />
                    <span>内容区域设置</span>
                  </CardTitle>
                  <CardDescription>配置主内容区域的布局</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 最大宽度 */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium">最大宽度: {tempConfig.content.maxWidth}px</label>
                    <Slider
                      value={[tempConfig.content.maxWidth]}
                      onValueChange={([value]) =>
                        handleConfigChange({
                          content: { ...tempConfig.content, maxWidth: value },
                        })
                      }
                      min={1200}
                      max={2400}
                      step={120}
                    />
                  </div>

                  {/* 居中对齐 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">居中对齐</div>
                      <div className="text-sm text-gray-500">内容区域居中显示</div>
                    </div>
                    <Switch
                      checked={tempConfig.content.centered}
                      onCheckedChange={(checked) =>
                        handleConfigChange({
                          content: { ...tempConfig.content, centered: checked },
                        })
                      }
                    />
                  </div>

                  {/* 内边距设置 */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium">移动端内边距: {tempConfig.content.padding.mobile}px</label>
                    <Slider
                      value={[tempConfig.content.padding.mobile]}
                      onValueChange={([value]) =>
                        handleConfigChange({
                          content: {
                            ...tempConfig.content,
                            padding: { ...tempConfig.content.padding, mobile: value },
                          },
                        })
                      }
                      min={8}
                      max={48}
                      step={4}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium">平板端内边距: {tempConfig.content.padding.tablet}px</label>
                    <Slider
                      value={[tempConfig.content.padding.tablet]}
                      onValueChange={([value]) =>
                        handleConfigChange({
                          content: {
                            ...tempConfig.content,
                            padding: { ...tempConfig.content.padding, tablet: value },
                          },
                        })
                      }
                      min={16}
                      max={64}
                      step={4}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium">桌面端内边距: {tempConfig.content.padding.desktop}px</label>
                    <Slider
                      value={[tempConfig.content.padding.desktop]}
                      onValueChange={([value]) =>
                        handleConfigChange({
                          content: {
                            ...tempConfig.content,
                            padding: { ...tempConfig.content.padding, desktop: value },
                          },
                        })
                      }
                      min={24}
                      max={80}
                      step={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </ResponsiveGridItem>

            {/* 网格设置 */}
            <ResponsiveGridItem span={{ lg: 2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Grid className="h-5 w-5" />
                    <span>网格布局设置</span>
                  </CardTitle>
                  <CardDescription>配置响应式网格的列数和间距</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveGrid
                    config={{
                      columns: { xs: 1, md: 2 },
                      gap: { xs: 24, md: 32 },
                    }}
                  >
                    {/* 列数设置 */}
                    <div className="space-y-6">
                      <h4 className="font-medium">网格列数</h4>

                      <div className="space-y-4">
                        <label className="text-sm font-medium">移动端: {tempConfig.grid.columns.mobile}列</label>
                        <Slider
                          value={[tempConfig.grid.columns.mobile]}
                          onValueChange={([value]) =>
                            handleConfigChange({
                              grid: {
                                ...tempConfig.grid,
                                columns: { ...tempConfig.grid.columns, mobile: value },
                              },
                            })
                          }
                          min={1}
                          max={3}
                          step={1}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-medium">平板端: {tempConfig.grid.columns.tablet}列</label>
                        <Slider
                          value={[tempConfig.grid.columns.tablet]}
                          onValueChange={([value]) =>
                            handleConfigChange({
                              grid: {
                                ...tempConfig.grid,
                                columns: { ...tempConfig.grid.columns, tablet: value },
                              },
                            })
                          }
                          min={1}
                          max={4}
                          step={1}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-medium">桌面端: {tempConfig.grid.columns.desktop}列</label>
                        <Slider
                          value={[tempConfig.grid.columns.desktop]}
                          onValueChange={([value]) =>
                            handleConfigChange({
                              grid: {
                                ...tempConfig.grid,
                                columns: { ...tempConfig.grid.columns, desktop: value },
                              },
                            })
                          }
                          min={2}
                          max={6}
                          step={1}
                        />
                      </div>
                    </div>

                    {/* 间距设置 */}
                    <div className="space-y-6">
                      <h4 className="font-medium">网格间距</h4>

                      <div className="space-y-4">
                        <label className="text-sm font-medium">移动端: {tempConfig.grid.gap.mobile}px</label>
                        <Slider
                          value={[tempConfig.grid.gap.mobile]}
                          onValueChange={([value]) =>
                            handleConfigChange({
                              grid: {
                                ...tempConfig.grid,
                                gap: { ...tempConfig.grid.gap, mobile: value },
                              },
                            })
                          }
                          min={8}
                          max={32}
                          step={4}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-medium">平板端: {tempConfig.grid.gap.tablet}px</label>
                        <Slider
                          value={[tempConfig.grid.gap.tablet]}
                          onValueChange={([value]) =>
                            handleConfigChange({
                              grid: {
                                ...tempConfig.grid,
                                gap: { ...tempConfig.grid.gap, tablet: value },
                              },
                            })
                          }
                          min={12}
                          max={40}
                          step={4}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-medium">桌面端: {tempConfig.grid.gap.desktop}px</label>
                        <Slider
                          value={[tempConfig.grid.gap.desktop]}
                          onValueChange={([value]) =>
                            handleConfigChange({
                              grid: {
                                ...tempConfig.grid,
                                gap: { ...tempConfig.grid.gap, desktop: value },
                              },
                            })
                          }
                          min={16}
                          max={48}
                          step={4}
                        />
                      </div>
                    </div>
                  </ResponsiveGrid>
                </CardContent>
              </Card>
            </ResponsiveGridItem>
          </ResponsiveGrid>

          {/* 操作按钮 */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={resetConfig}>
              <RotateCcw className="h-4 w-4 mr-2" />
              重置默认
            </Button>
            <Button onClick={saveConfig}>
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          </div>
        </div>
      </ResponsiveContainer>
    </ResponsiveLayout>
  )
}
