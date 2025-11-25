"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, Settings, Bell, Save, X } from "lucide-react"
import { actionManager } from "@/lib/action-manager"
import { AvatarUpload } from "@/components/avatar-upload"

interface QuickActionHandlerProps {
  onActionComplete?: (action: string, data?: any) => void
}

export function QuickActionHandler({ onActionComplete }: QuickActionHandlerProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  const [scheduleForm, setScheduleForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: "60",
    location: "",
    description: "",
    attendees: "",
    priority: "medium",
  })
  const [profileForm, setProfileForm] = useState({
    username: "管理员",
    email: "admin@yanyu.cloud",
    phone: "",
    department: "系统管理部",
    position: "系统管理员",
    bio: "",
    location: "",
    website: "",
  })
  const [settingsForm, setSettingsForm] = useState({
    notifications: {
      desktop: true,
      email: true,
      sms: false,
      sound: true,
    },
    interface: {
      darkMode: false,
      compactLayout: true,
      showTips: true,
      language: "zh-CN",
    },
    privacy: {
      profileVisible: true,
      activityVisible: false,
      emailVisible: false,
    },
  })

  // 从本地存储加载用户头像和资料
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar")
    if (savedAvatar) {
      setUserAvatar(savedAvatar)
    }

    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile)
        setProfileForm((prev) => ({ ...prev, ...profile }))
      } catch (error) {
        console.error("加载用户资料失败:", error)
      }
    }

    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        setSettingsForm((prev) => ({ ...prev, ...settings }))
      } catch (error) {
        console.error("加载用户设置失败:", error)
      }
    }
  }, [])

  // 监听全局操作触发
  useEffect(() => {
    const handleScheduleAction = () => setIsScheduleOpen(true)
    const handleProfileAction = () => setIsProfileOpen(true)
    const handleSettingsAction = () => setIsSettingsOpen(true)
    const handleNotificationAction = () => {
      // 请求通知权限并发送测试通知
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("通知测试", {
              body: "通知功能测试成功！",
              icon: "/images/yanyu-cloud-logo.png",
            })
            actionManager.trigger("notifications", { message: "通知功能测试成功！" })
          } else {
            alert("通知权限被拒绝，请在浏览器设置中允许通知")
          }
        })
      } else {
        alert("您的浏览器不支持通知功能")
      }
    }

    // 注册全局操作监听器
    actionManager.on("schedule", handleScheduleAction)
    actionManager.on("profile", handleProfileAction)
    actionManager.on("settings", handleSettingsAction)
    actionManager.on("notifications", handleNotificationAction)

    return () => {
      actionManager.off("schedule", handleScheduleAction)
      actionManager.off("profile", handleProfileAction)
      actionManager.off("settings", handleSettingsAction)
      actionManager.off("notifications", handleNotificationAction)
    }
  }, [])

  const handleSaveSchedule = () => {
    if (!scheduleForm.title.trim()) {
      alert("请输入会议标题")
      return
    }

    if (!scheduleForm.date) {
      alert("请选择会议日期")
      return
    }

    const scheduleData = {
      ...scheduleForm,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }

    // 保存到本地存储
    const savedSchedules = localStorage.getItem("userSchedules")
    const schedules = savedSchedules ? JSON.parse(savedSchedules) : []
    schedules.push(scheduleData)
    localStorage.setItem("userSchedules", JSON.stringify(schedules))

    actionManager.trigger("schedule", scheduleData)
    setIsScheduleOpen(false)
    setScheduleForm({
      title: "",
      date: "",
      time: "",
      duration: "60",
      location: "",
      description: "",
      attendees: "",
      priority: "medium",
    })
    onActionComplete?.("schedule", scheduleData)

    // 显示成功提示
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("日程创建成功", {
        body: `会议"${scheduleData.title}"已创建`,
        icon: "/images/yanyu-cloud-logo.png",
      })
    }
  }

  const handleSaveProfile = () => {
    if (!profileForm.username.trim()) {
      alert("请输入用户名")
      return
    }

    if (!profileForm.email.trim()) {
      alert("请输入邮箱地址")
      return
    }

    const profileData = {
      ...profileForm,
      avatar: userAvatar,
      updatedAt: new Date().toISOString(),
      updated: true,
    }

    // 保存到本地存储
    localStorage.setItem("userProfile", JSON.stringify(profileData))

    actionManager.trigger("profile", profileData)
    setIsProfileOpen(false)
    onActionComplete?.("profile", profileData)

    // 触发头部用户信息更新
    window.dispatchEvent(new CustomEvent("profileUpdated", { detail: profileData }))

    // 显示成功提示
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("资料更新成功", {
        body: "个人资料已成功更新",
        icon: userAvatar || "/images/yanyu-cloud-logo.png",
      })
    }
  }

  const handleSaveSettings = () => {
    const settingsData = {
      ...settingsForm,
      updatedAt: new Date().toISOString(),
      updated: true,
    }

    // 保存到本地存储
    localStorage.setItem("userSettings", JSON.stringify(settingsData))

    // 应用主题设置
    if (settingsData.interface.darkMode) {
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
    }

    actionManager.trigger("settings", settingsData)
    setIsSettingsOpen(false)
    onActionComplete?.("settings", settingsData)

    // 显示成功提示
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("设置保存成功", {
        body: "系统设置已成功保存",
        icon: "/images/yanyu-cloud-logo.png",
      })
    }
  }

  const handleAvatarChange = (avatarUrl: string) => {
    setUserAvatar(avatarUrl)
    localStorage.setItem("userAvatar", avatarUrl)
    // 立即触发头部更新
    window.dispatchEvent(new CustomEvent("avatarUpdated", { detail: { avatar: avatarUrl } }))
  }

  return (
    <>
      {/* 日程安排对话框 */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-sky-600" />
              创建日程安排
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">
                标题 *
              </Label>
              <Input
                id="event-title"
                placeholder="会议标题"
                className="col-span-3"
                value={scheduleForm.title}
                onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-date" className="text-right">
                日期 *
              </Label>
              <Input
                id="event-date"
                type="date"
                className="col-span-3"
                value={scheduleForm.date}
                onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-time" className="text-right">
                时间
              </Label>
              <Input
                id="event-time"
                type="time"
                className="col-span-3"
                value={scheduleForm.time}
                onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-duration" className="text-right">
                时长
              </Label>
              <Select
                value={scheduleForm.duration}
                onValueChange={(value) => setScheduleForm({ ...scheduleForm, duration: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择时长" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30分钟</SelectItem>
                  <SelectItem value="60">1小时</SelectItem>
                  <SelectItem value="90">1.5小时</SelectItem>
                  <SelectItem value="120">2小时</SelectItem>
                  <SelectItem value="180">3小时</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-location" className="text-right">
                地点
              </Label>
              <Input
                id="event-location"
                placeholder="会议地点或链接"
                className="col-span-3"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-attendees" className="text-right">
                参与者
              </Label>
              <Input
                id="event-attendees"
                placeholder="参与者邮箱，用逗号分隔"
                className="col-span-3"
                value={scheduleForm.attendees}
                onChange={(e) => setScheduleForm({ ...scheduleForm, attendees: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-priority" className="text-right">
                优先级
              </Label>
              <Select
                value={scheduleForm.priority}
                onValueChange={(value) => setScheduleForm({ ...scheduleForm, priority: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">低</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="high">高</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-desc" className="text-right">
                描述
              </Label>
              <Textarea
                id="event-desc"
                placeholder="会议描述和议程"
                className="col-span-3"
                value={scheduleForm.description}
                onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              取消
            </Button>
            <Button onClick={handleSaveSchedule} className="bg-sky-600 hover:bg-sky-700">
              <Save className="w-4 h-4 mr-2" />
              创建日程
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 个人资料对话框 */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-sky-600" />
              个人资料设置
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* 头像设置 */}
            <div className="flex flex-col items-center space-y-4 pb-6 border-b">
              <AvatarUpload
                currentAvatar={userAvatar || undefined}
                userName={profileForm.username}
                onAvatarChange={handleAvatarChange}
                size="xl"
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{profileForm.username}</h3>
                <p className="text-sm text-gray-500">{profileForm.position}</p>
                <p className="text-xs text-gray-400">{profileForm.department}</p>
              </div>
            </div>

            {/* 基本信息 */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">基本信息</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username" className="text-sm font-medium mb-1 block">
                    用户名 *
                  </Label>
                  <Input
                    id="username"
                    value={profileForm.username}
                    onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                    placeholder="请输入用户名"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium mb-1 block">
                    邮箱地址 *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    placeholder="请输入邮箱地址"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium mb-1 block">
                    手机号码
                  </Label>
                  <Input
                    id="phone"
                    placeholder="请输入手机号码"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium mb-1 block">
                    所在地区
                  </Label>
                  <Input
                    id="location"
                    placeholder="请输入所在地区"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department" className="text-sm font-medium mb-1 block">
                    所属部门
                  </Label>
                  <Input
                    id="department"
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    placeholder="请输入所属部门"
                  />
                </div>

                <div>
                  <Label htmlFor="position" className="text-sm font-medium mb-1 block">
                    职位
                  </Label>
                  <Input
                    id="position"
                    value={profileForm.position}
                    onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
                    placeholder="请输入职位"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website" className="text-sm font-medium mb-1 block">
                  个人网站
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={profileForm.website}
                  onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-sm font-medium mb-1 block">
                  个人简介
                </Label>
                <Textarea
                  id="bio"
                  placeholder="请输入个人简介..."
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              取消
            </Button>
            <Button onClick={handleSaveProfile} className="bg-sky-600 hover:bg-sky-700">
              <Save className="w-4 h-4 mr-2" />
              保存资料
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 系统设置对话框 */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2 text-sky-600" />
              系统设置
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* 通知设置 */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                通知设置
              </h4>
              <div className="space-y-3 pl-6">
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">桌面通知</span>
                    <span className="text-xs text-gray-500">在浏览器中显示通知</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.notifications.desktop}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        notifications: { ...settingsForm.notifications, desktop: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">邮件通知</span>
                    <span className="text-xs text-gray-500">发送邮件提醒</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.notifications.email}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        notifications: { ...settingsForm.notifications, email: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">短信通知</span>
                    <span className="text-xs text-gray-500">发送短信提醒</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.notifications.sms}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        notifications: { ...settingsForm.notifications, sms: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">声音提醒</span>
                    <span className="text-xs text-gray-500">播放提示音</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.notifications.sound}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        notifications: { ...settingsForm.notifications, sound: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
              </div>
            </div>

            {/* 界面设置 */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">界面设置</h4>
              <div className="space-y-3 pl-6">
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">暗色模式</span>
                    <span className="text-xs text-gray-500">使用深色主题</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.interface.darkMode}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        interface: { ...settingsForm.interface, darkMode: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">紧凑布局</span>
                    <span className="text-xs text-gray-500">减少界面间距</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.interface.compactLayout}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        interface: { ...settingsForm.interface, compactLayout: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">显示提示</span>
                    <span className="text-xs text-gray-500">显示操作提示信息</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.interface.showTips}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        interface: { ...settingsForm.interface, showTips: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
              </div>
            </div>

            {/* 隐私设置 */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">隐私设置</h4>
              <div className="space-y-3 pl-6">
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">公开个人资料</span>
                    <span className="text-xs text-gray-500">其他用户可查看</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.privacy.profileVisible}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        privacy: { ...settingsForm.privacy, profileVisible: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">显示活动状态</span>
                    <span className="text-xs text-gray-500">显示在线状态</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.privacy.activityVisible}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        privacy: { ...settingsForm.privacy, activityVisible: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">公开邮箱地址</span>
                    <span className="text-xs text-gray-500">其他用户可查看邮箱</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.privacy.emailVisible}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        privacy: { ...settingsForm.privacy, emailVisible: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              取消
            </Button>
            <Button onClick={handleSaveSettings} className="bg-sky-600 hover:bg-sky-700">
              <Save className="w-4 h-4 mr-2" />
              保存设置
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// 导出全局触发函数供其他组件使用
export const triggerQuickAction = {
  schedule: () => actionManager.trigger("schedule"),
  notifications: () => actionManager.trigger("notifications"),
  profile: () => actionManager.trigger("profile"),
  settings: () => actionManager.trigger("settings"),
}
