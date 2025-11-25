"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Upload,
  Download,
  File,
  ImageIcon,
  Video,
  Music,
  Archive,
  FileText,
  Share2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  RotateCcw,
  Search,
  MoreHorizontal,
} from "lucide-react"

interface FileTransfer {
  id: string
  fileName: string
  fileSize: number
  fileType: string
  sender: string
  receiver: string
  status: "uploading" | "downloading" | "completed" | "failed" | "paused"
  progress: number
  speed: number
  timeRemaining: number
  startTime: Date
  endTime?: Date
  thumbnail?: string
}

interface SharedFile {
  id: string
  fileName: string
  fileSize: number
  fileType: string
  owner: string
  sharedWith: string[]
  uploadTime: Date
  downloadCount: number
  expiryTime?: Date
  isPublic: boolean
  description?: string
  tags: string[]
}

export function FileTransferSystem() {
  const [transfers, setTransfers] = useState<FileTransfer[]>([
    {
      id: "1",
      fileName: "产品设计文档.pdf",
      fileSize: 15728640, // 15MB
      fileType: "application/pdf",
      sender: "张设计师",
      receiver: "李经理",
      status: "uploading",
      progress: 65,
      speed: 1024000, // 1MB/s
      timeRemaining: 5,
      startTime: new Date(Date.now() - 30000),
    },
    {
      id: "2",
      fileName: "演示视频.mp4",
      fileSize: 104857600, // 100MB
      fileType: "video/mp4",
      sender: "王开发",
      receiver: "团队群组",
      status: "completed",
      progress: 100,
      speed: 0,
      timeRemaining: 0,
      startTime: new Date(Date.now() - 300000),
      endTime: new Date(Date.now() - 60000),
    },
    {
      id: "3",
      fileName: "项目截图.zip",
      fileSize: 52428800, // 50MB
      fileType: "application/zip",
      sender: "陈测试",
      receiver: "我",
      status: "downloading",
      progress: 30,
      speed: 512000, // 512KB/s
      timeRemaining: 70,
      startTime: new Date(Date.now() - 15000),
    },
  ])

  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([
    {
      id: "1",
      fileName: "公司手册.pdf",
      fileSize: 5242880, // 5MB
      fileType: "application/pdf",
      owner: "人事部",
      sharedWith: ["全体员工"],
      uploadTime: new Date(Date.now() - 86400000),
      downloadCount: 156,
      isPublic: true,
      description: "员工入职必读手册",
      tags: ["手册", "入职", "规章制度"],
    },
    {
      id: "2",
      fileName: "Q1财务报告.xlsx",
      fileSize: 2097152, // 2MB
      fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      owner: "财务部",
      sharedWith: ["管理层"],
      uploadTime: new Date(Date.now() - 172800000),
      downloadCount: 23,
      expiryTime: new Date(Date.now() + 604800000), // 7天后过期
      isPublic: false,
      description: "第一季度财务数据分析",
      tags: ["财务", "报告", "Q1"],
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 文件上传处理
  const handleFileUpload = useCallback((files: FileList) => {
    Array.from(files).forEach((file) => {
      const newTransfer: FileTransfer = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        sender: "我",
        receiver: "选择接收者",
        status: "uploading",
        progress: 0,
        speed: 0,
        timeRemaining: 0,
        startTime: new Date(),
      }

      setTransfers((prev) => [...prev, newTransfer])

      // 模拟文件上传进度
      simulateFileTransfer(newTransfer.id)
    })
  }, [])

  // 模拟文件传输进度
  const simulateFileTransfer = (transferId: string) => {
    const interval = setInterval(() => {
      setTransfers((prev) =>
        prev.map((transfer) => {
          if (transfer.id === transferId && transfer.status === "uploading") {
            const newProgress = Math.min(transfer.progress + Math.random() * 10, 100)
            const speed = 500000 + Math.random() * 1000000 // 0.5-1.5MB/s
            const timeRemaining =
              newProgress < 100 ? Math.ceil((transfer.fileSize * (100 - newProgress)) / 100 / speed) : 0

            if (newProgress >= 100) {
              clearInterval(interval)
              return {
                ...transfer,
                progress: 100,
                status: "completed" as const,
                speed: 0,
                timeRemaining: 0,
                endTime: new Date(),
              }
            }

            return {
              ...transfer,
              progress: newProgress,
              speed,
              timeRemaining,
            }
          }
          return transfer
        }),
      )
    }, 1000)
  }

  // 拖拽上传
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // 格式化传输速度
  const formatSpeed = (bytesPerSecond: number) => {
    return formatFileSize(bytesPerSecond) + "/s"
  }

  // 格式化剩余时间
  const formatTimeRemaining = (seconds: number) => {
    if (seconds < 60) return `${seconds}秒`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟`
    return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds % 3600) / 60)}分钟`
  }

  // 获取文件图标
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="w-5 h-5" />
    if (fileType.startsWith("video/")) return <Video className="w-5 h-5" />
    if (fileType.startsWith("audio/")) return <Music className="w-5 h-5" />
    if (fileType.includes("pdf")) return <FileText className="w-5 h-5" />
    if (fileType.includes("zip") || fileType.includes("rar")) return <Archive className="w-5 h-5" />
    return <File className="w-5 h-5" />
  }

  // 获取状态图标
  const getStatusIcon = (status: FileTransfer["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-blue-600" />
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: FileTransfer["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "failed":
        return "text-red-600"
      case "paused":
        return "text-yellow-600"
      default:
        return "text-blue-600"
    }
  }

  // 过滤文件
  const filteredTransfers = transfers.filter((transfer) => {
    const matchesSearch = transfer.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || transfer.status === filterType
    return matchesSearch && matchesFilter
  })

  const filteredSharedFiles = sharedFiles.filter((file) => {
    const matchesSearch =
      file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">文件传输系统</h1>
          <p className="text-muted-foreground">高效安全的文件共享与传输</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            批量下载
          </Button>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
                <Upload className="w-4 h-4 mr-2" />
                上传文件
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>上传文件</DialogTitle>
                <DialogDescription>选择要上传的文件并设置共享选项</DialogDescription>
              </DialogHeader>
              <FileUploadForm onClose={() => setIsUploadDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 传输统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃传输</CardTitle>
            <Upload className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {transfers.filter((t) => t.status === "uploading" || t.status === "downloading").length}
            </div>
            <p className="text-xs text-muted-foreground">正在进行的传输</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已完成</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {transfers.filter((t) => t.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">成功传输的文件</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">共享文件</CardTitle>
            <Share2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{sharedFiles.length}</div>
            <p className="text-xs text-muted-foreground">可访问的共享文件</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">传输速度</CardTitle>
            <Download className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatSpeed(
                transfers.reduce(
                  (sum, t) => sum + (t.status === "uploading" || t.status === "downloading" ? t.speed : 0),
                  0,
                ),
              )}
            </div>
            <p className="text-xs text-muted-foreground">当前总传输速度</p>
          </CardContent>
        </Card>
      </div>

      {/* 拖拽上传区域 */}
      <Card
        className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-sky-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="p-8">
          <div className="text-center">
            <Upload className="w-16 h-16 text-sky-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">拖拽文件到此处上传</h3>
            <p className="text-gray-500 mb-4">或者点击选择文件</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              选择文件
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="transfers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transfers">传输记录</TabsTrigger>
          <TabsTrigger value="shared">共享文件</TabsTrigger>
          <TabsTrigger value="settings">传输设置</TabsTrigger>
        </TabsList>

        <TabsContent value="transfers" className="space-y-6">
          {/* 搜索和筛选 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="搜索文件名..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    className="px-3 py-2 border rounded-md"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">全部状态</option>
                    <option value="uploading">上传中</option>
                    <option value="downloading">下载中</option>
                    <option value="completed">已完成</option>
                    <option value="failed">失败</option>
                    <option value="paused">已暂停</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 传输列表 */}
          <div className="space-y-4">
            {filteredTransfers.map((transfer) => (
              <Card
                key={transfer.id}
                className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">{getFileIcon(transfer.fileType)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium truncate">{transfer.fileName}</h4>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(transfer.status)}
                          <Badge className={`${getStatusColor(transfer.status)} bg-transparent`}>
                            {transfer.status === "uploading"
                              ? "上传中"
                              : transfer.status === "downloading"
                                ? "下载中"
                                : transfer.status === "completed"
                                  ? "已完成"
                                  : transfer.status === "failed"
                                    ? "失败"
                                    : "已暂停"}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>
                          {transfer.sender} → {transfer.receiver}
                        </span>
                        <span>{formatFileSize(transfer.fileSize)}</span>
                      </div>

                      {(transfer.status === "uploading" || transfer.status === "downloading") && (
                        <div className="space-y-2">
                          <Progress value={transfer.progress} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {transfer.progress.toFixed(1)}% • {formatSpeed(transfer.speed)}
                            </span>
                            <span>剩余 {formatTimeRemaining(transfer.timeRemaining)}</span>
                          </div>
                        </div>
                      )}

                      {transfer.status === "completed" && transfer.endTime && (
                        <div className="text-xs text-muted-foreground">
                          完成时间: {transfer.endTime.toLocaleString("zh-CN")}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {transfer.status === "uploading" || transfer.status === "downloading" ? (
                        <>
                          <Button variant="ghost" size="sm">
                            <Pause className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      ) : transfer.status === "paused" ? (
                        <>
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </>
                      ) : transfer.status === "completed" ? (
                        <>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <Button variant="ghost" size="sm">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-6">
          {/* 搜索栏 */}
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="搜索共享文件..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* 共享文件列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSharedFiles.map((file) => (
              <Card
                key={file.id}
                className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getFileIcon(file.fileType)}
                      <div>
                        <CardTitle className="text-base truncate">{file.fileName}</CardTitle>
                        <CardDescription>{formatFileSize(file.fileSize)}</CardDescription>
                      </div>
                    </div>
                    <Badge className={file.isPublic ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                      {file.isPublic ? "公开" : "私有"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      <p>分享者: {file.owner}</p>
                      <p>上传时间: {file.uploadTime.toLocaleDateString("zh-CN")}</p>
                      <p>下载次数: {file.downloadCount}</p>
                    </div>

                    {file.description && <p className="text-sm">{file.description}</p>}

                    {file.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {file.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {file.expiryTime && (
                      <div className="text-xs text-orange-600">过期时间: {file.expiryTime.toLocaleString("zh-CN")}</div>
                    )}

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        下载
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>传输设置</CardTitle>
              <CardDescription>配置文件传输和共享选项</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">传输限制</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">最大上传速度</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>无限制</option>
                        <option>1 MB/s</option>
                        <option>5 MB/s</option>
                        <option>10 MB/s</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">最大文件大小</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>100 MB</option>
                        <option>500 MB</option>
                        <option>1 GB</option>
                        <option>5 GB</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">并发传输数</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>3</option>
                        <option>5</option>
                        <option>10</option>
                        <option>无限制</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">安全设置</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium">文件加密</label>
                        <p className="text-sm text-muted-foreground">传输过程中加密文件</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium">病毒扫描</label>
                        <p className="text-sm text-muted-foreground">自动扫描上传的文件</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium">水印保护</label>
                        <p className="text-sm text-muted-foreground">为图片添加水印</p>
                      </div>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FileUploadForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    description: "",
    isPublic: false,
    expiryDays: "30",
    tags: "",
    recipients: "",
  })

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">文件描述</label>
        <Input
          placeholder="输入文件描述"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">标签</label>
        <Input
          placeholder="输入标签，用逗号分隔"
          value={formData.tags}
          onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">过期时间</label>
          <select
            className="w-full p-2 border rounded-md"
            value={formData.expiryDays}
            onChange={(e) => setFormData((prev) => ({ ...prev, expiryDays: e.target.value }))}
          >
            <option value="7">7天</option>
            <option value="30">30天</option>
            <option value="90">90天</option>
            <option value="365">1年</option>
            <option value="0">永不过期</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">访问权限</label>
          <select
            className="w-full p-2 border rounded-md"
            value={formData.isPublic ? "public" : "private"}
            onChange={(e) => setFormData((prev) => ({ ...prev, isPublic: e.target.value === "public" }))}
          >
            <option value="private">私有</option>
            <option value="public">公开</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">分享给</label>
        <Input
          placeholder="输入邮箱地址，用逗号分隔"
          value={formData.recipients}
          onChange={(e) => setFormData((prev) => ({ ...prev, recipients: e.target.value }))}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button onClick={onClose}>开始上传</Button>
      </div>
    </div>
  )
}
