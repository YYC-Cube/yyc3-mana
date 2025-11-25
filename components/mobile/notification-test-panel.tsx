"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mobileNotificationFallback } from "@/lib/mobile-notifications-fallback"
import { Bell, Send, TestTube } from "lucide-react"

export function NotificationTestPanel() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [type, setType] = useState("general")
  const [isSending, setIsSending] = useState(false)

  const handleSendTestNotification = async () => {
    if (!title || !body) return

    setIsSending(true)
    try {
      await mobileNotificationFallback.sendNotification({
        title,
        body,
        type,
        data: { test: true, timestamp: Date.now() },
      })

      // 清空表单
      setTitle("")
      setBody("")
      setType("general")
    } catch (error) {
      console.error("发送测试通知失败:", error)
    } finally {
      setIsSending(false)
    }
  }

  const handleSendPresetNotifications = async () => {
    setIsSending(true)
    try {
      // 发送各种类型的预设通知
      await mobileNotificationFallback.sendTaskNotification("完成月度报告", "张三")
      await mobileNotificationFallback.sendApprovalNotification("请假申请", "李四")
      await mobileNotificationFallback.sendMessageNotification("王五", "项目进度更新，请查看最新文档")
      await mobileNotificationFallback.sendSystemNotification("系统维护", "系统将于今晚22:00-24:00进行维护")
    } catch (error) {
      console.error("发送预设通知失败:", error)
    } finally {
      setIsSending(false)
    }
  }

  const handleRequestPermission = async () => {
    const granted = await mobileNotificationFallback.requestPermission()
    if (granted) {
      alert("通知权限已授予！")
    } else {
      alert("通知权限被拒绝，请在浏览器设置中手动开启。")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TestTube className="w-5 h-5" />
          <span>通知测试面板</span>
        </CardTitle>
        <CardDescription>测试移动端通知功能</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 权限请求 */}
        <div className="space-y-2">
          <Button onClick={handleRequestPermission} variant="outline" className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            请求通知权限
          </Button>
        </div>

        {/* 自定义通知 */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="title">通知标题</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="输入通知标题" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">通知内容</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="输入通知内容"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">通知类型</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">一般通知</SelectItem>
                <SelectItem value="task">任务通知</SelectItem>
                <SelectItem value="approval">审批通知</SelectItem>
                <SelectItem value="message">消息通知</SelectItem>
                <SelectItem value="system">系统通知</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSendTestNotification} disabled={!title || !body || isSending} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            {isSending ? "发送中..." : "发送测试通知"}
          </Button>
        </div>

        {/* 预设通知 */}
        <div className="pt-4 border-t">
          <Button onClick={handleSendPresetNotifications} disabled={isSending} variant="outline" className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            {isSending ? "发送中..." : "发送预设通知"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
