"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, Camera, User, X, Save, RotateCcw } from "lucide-react"

interface AvatarUploadProps {
  currentAvatar?: string
  userName: string
  onAvatarChange: (avatarUrl: string) => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function AvatarUpload({ currentAvatar, userName, onAvatarChange, size = "lg" }: AvatarUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(currentAvatar || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith("image/")) {
        alert("请选择图片文件")
        return
      }

      // 验证文件大小 (最大 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("图片大小不能超过 5MB")
        return
      }

      setIsUploading(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewAvatar(result)
        setIsUploading(false)
      }
      reader.onerror = () => {
        alert("文件读取失败，请重试")
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (previewAvatar) {
      onAvatarChange(previewAvatar)
      setIsOpen(false)

      // 显示成功提示
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("头像更新成功", {
          body: "您的头像已成功更新",
          icon: previewAvatar,
        })
      }
    }
  }

  const handleReset = () => {
    setPreviewAvatar(null)
    onAvatarChange("")
  }

  const generateDefaultAvatar = () => {
    // 生成默认头像（基于用户名首字母）
    const canvas = document.createElement("canvas")
    canvas.width = 200
    canvas.height = 200
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // 背景渐变
      const gradient = ctx.createLinearGradient(0, 0, 200, 200)
      gradient.addColorStop(0, "#667eea")
      gradient.addColorStop(1, "#764ba2")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 200, 200)

      // 文字
      ctx.fillStyle = "white"
      ctx.font = "bold 80px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(userName.charAt(0).toUpperCase(), 100, 100)

      const defaultAvatar = canvas.toDataURL()
      setPreviewAvatar(defaultAvatar)
    }
  }

  const renderAvatar = () => {
    if (currentAvatar) {
      return (
        <img
          src={currentAvatar || "/placeholder.svg"}
          alt={userName}
          className={`${sizeClasses[size]} rounded-full object-cover`}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            target.nextElementSibling?.classList.remove("hidden")
          }}
        />
      )
    }

    return (
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center`}
      >
        <span className="text-white font-semibold text-sm">{userName.charAt(0).toUpperCase()}</span>
      </div>
    )
  }

  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        {renderAvatar()}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className={`${iconSizes[size]} text-white`} />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-sky-600" />
              更换头像
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* 头像预览 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {previewAvatar ? (
                  <img
                    src={previewAvatar || "/placeholder.svg"}
                    alt="头像预览"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center border-4 border-gray-200">
                    <span className="text-white font-semibold text-xl">{userName.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 text-center">点击下方按钮更换头像</p>
            </div>

            {/* 操作按钮 */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? "上传中..." : "上传图片"}
              </Button>

              <Button variant="outline" className="w-full bg-transparent" onClick={generateDefaultAvatar}>
                <User className="w-4 h-4 mr-2" />
                生成默认头像
              </Button>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

              <p className="text-xs text-gray-500 text-center">支持 JPG、PNG、GIF 格式，文件大小不超过 5MB</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleReset}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>

              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  取消
                </Button>
                <Button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700" disabled={!previewAvatar}>
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
