"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Play, Pause, Square, Clock, Timer, Plus, Trash2 } from "lucide-react"

interface TimeEntry {
  id: string
  taskId: string
  taskName: string
  startTime: Date
  endTime?: Date
  duration: number
  description: string
  category: string
}

interface TimeTrackerProps {
  taskId?: string
  taskName?: string
  onTimeUpdate?: (totalTime: number) => void
}

export function TimeTracker({ taskId, taskName, onTimeUpdate }: TimeTrackerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [newEntryDescription, setNewEntryDescription] = useState("")

  // 计时器效果
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
        setCurrentTime(elapsed)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, startTime])

  // 格式化时间显示
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // 开始计时
  const startTimer = () => {
    setIsRunning(true)
    setStartTime(new Date())
    setCurrentTime(0)
  }

  // 暂停计时
  const pauseTimer = () => {
    setIsRunning(false)
    if (startTime && currentTime > 0) {
      // 保存时间记录
      const entry: TimeEntry = {
        id: Date.now().toString(),
        taskId: taskId || "unknown",
        taskName: taskName || "未指定任务",
        startTime: startTime,
        endTime: new Date(),
        duration: currentTime,
        description: "",
        category: "工作时间",
      }
      setTimeEntries((prev) => [entry, ...prev])

      // 通知父组件时间更新
      const totalTime = timeEntries.reduce((sum, entry) => sum + entry.duration, 0) + currentTime
      onTimeUpdate?.(totalTime)
    }
  }

  // 停止计时
  const stopTimer = () => {
    if (isRunning) {
      pauseTimer()
    }
    setIsRunning(false)
    setCurrentTime(0)
    setStartTime(null)
  }

  // 手动添加时间记录
  const addManualEntry = (duration: number, description: string) => {
    const entry: TimeEntry = {
      id: Date.now().toString(),
      taskId: taskId || "manual",
      taskName: taskName || "手动记录",
      startTime: new Date(Date.now() - duration * 1000),
      endTime: new Date(),
      duration: duration,
      description: description,
      category: "手动记录",
    }
    setTimeEntries((prev) => [entry, ...prev])
    setShowAddEntry(false)
    setNewEntryDescription("")

    // 通知父组件时间更新
    const totalTime = timeEntries.reduce((sum, entry) => sum + entry.duration, 0) + duration
    onTimeUpdate?.(totalTime)
  }

  // 删除时间记录
  const deleteEntry = (entryId: string) => {
    setTimeEntries((prev) => prev.filter((entry) => entry.id !== entryId))
  }

  // 计算总时间
  const totalTime = timeEntries.reduce((sum, entry) => sum + entry.duration, 0) + currentTime

  return (
    <div className="space-y-4">
      {/* 计时器主界面 */}
      <EnhancedCard variant="gradient">
        <div className="text-center space-y-6">
          {/* 时间显示 */}
          <div className="space-y-2">
            <div className="text-6xl font-mono font-bold text-slate-800 tracking-wider">{formatTime(currentTime)}</div>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>当前计时</span>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center justify-center space-x-4">
            {!isRunning ? (
              <EnhancedButton
                onClick={startTimer}
                icon={Play}
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-8 py-3 text-lg"
              >
                开始计时
              </EnhancedButton>
            ) : (
              <>
                <EnhancedButton
                  onClick={pauseTimer}
                  icon={Pause}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-3"
                >
                  暂停
                </EnhancedButton>
                <EnhancedButton
                  onClick={stopTimer}
                  icon={Square}
                  className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-6 py-3"
                >
                  停止
                </EnhancedButton>
              </>
            )}
          </div>

          {/* 总时间统计 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-sky-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{formatTime(totalTime)}</div>
              <div className="text-sm text-slate-600">总计时间</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{timeEntries.length}</div>
              <div className="text-sm text-slate-600">时间记录</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">
                {timeEntries.length > 0 ? formatTime(Math.floor(totalTime / timeEntries.length)) : "00:00:00"}
              </div>
              <div className="text-sm text-slate-600">平均时长</div>
            </div>
          </div>
        </div>
      </EnhancedCard>

      {/* 时间记录列表 */}
      <EnhancedCard title="时间记录" description="查看和管理所有时间记录">
        <div className="space-y-4">
          {/* 操作按钮 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-sky-50 text-sky-600 border-sky-200">
                共 {timeEntries.length} 条记录
              </Badge>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                总时长 {formatTime(totalTime)}
              </Badge>
            </div>

            <Dialog open={showAddEntry} onOpenChange={setShowAddEntry}>
              <DialogTrigger asChild>
                <EnhancedButton variant="secondary" icon={Plus} size="sm">
                  手动添加
                </EnhancedButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>手动添加时间记录</DialogTitle>
                  <DialogDescription>为任务添加手动时间记录</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => addManualEntry(15 * 60, newEntryDescription)}
                      className="text-sm"
                    >
                      15分钟
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => addManualEntry(30 * 60, newEntryDescription)}
                      className="text-sm"
                    >
                      30分钟
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => addManualEntry(60 * 60, newEntryDescription)}
                      className="text-sm"
                    >
                      1小时
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">自定义时长（分钟）</label>
                    <Input
                      type="number"
                      placeholder="输入分钟数"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const minutes = Number.parseInt((e.target as HTMLInputElement).value)
                          if (minutes > 0) {
                            addManualEntry(minutes * 60, newEntryDescription)
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">备注说明</label>
                    <Textarea
                      placeholder="添加时间记录的说明..."
                      value={newEntryDescription}
                      onChange={(e) => setNewEntryDescription(e.target.value)}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* 记录列表 */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {timeEntries.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Timer className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>暂无时间记录</p>
                <p className="text-sm">开始计时或手动添加记录</p>
              </div>
            ) : (
              timeEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-800">{formatTime(entry.duration)}</span>
                        <Badge variant="outline" className="text-xs">
                          {entry.category}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-600">
                        {entry.startTime.toLocaleString()} - {entry.endTime?.toLocaleString()}
                      </div>
                      {entry.description && <div className="text-sm text-slate-500 mt-1">{entry.description}</div>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </EnhancedCard>
    </div>
  )
}
