"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Plus,
  Search,
  Share2,
  Download,
  Edit,
  Eye,
  Users,
  Clock,
  Star,
  Folder,
  Filter,
  MoreHorizontal,
  Upload,
} from "lucide-react"

interface Document {
  id: string
  title: string
  type: "document" | "spreadsheet" | "presentation" | "pdf"
  size: string
  lastModified: Date
  author: string
  authorAvatar: string
  collaborators: string[]
  status: "draft" | "review" | "published"
  isStarred: boolean
  tags: string[]
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const documents: Document[] = [
    {
      id: "1",
      title: "产品需求文档 v2.1",
      type: "document",
      size: "2.5 MB",
      lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
      author: "王产品经理",
      authorAvatar: "",
      collaborators: ["张设计师", "李开发", "陈测试"],
      status: "review",
      isStarred: true,
      tags: ["产品", "需求", "重要"],
    },
    {
      id: "2",
      title: "技术架构设计方案",
      type: "document",
      size: "1.8 MB",
      lastModified: new Date(Date.now() - 4 * 60 * 60 * 1000),
      author: "李技术总监",
      authorAvatar: "",
      collaborators: ["张架构师", "王开发"],
      status: "published",
      isStarred: false,
      tags: ["技术", "架构"],
    },
    {
      id: "3",
      title: "Q2销售数据分析",
      type: "spreadsheet",
      size: "3.2 MB",
      lastModified: new Date(Date.now() - 6 * 60 * 60 * 1000),
      author: "赵销售经理",
      authorAvatar: "",
      collaborators: ["刘分析师", "孙助理"],
      status: "published",
      isStarred: true,
      tags: ["销售", "数据", "分析"],
    },
    {
      id: "4",
      title: "用户体验设计规范",
      type: "presentation",
      size: "5.1 MB",
      lastModified: new Date(Date.now() - 8 * 60 * 60 * 1000),
      author: "张设计师",
      authorAvatar: "",
      collaborators: ["王UI", "李UX"],
      status: "draft",
      isStarred: false,
      tags: ["设计", "规范", "UX"],
    },
    {
      id: "5",
      title: "项目进度报告",
      type: "pdf",
      size: "1.2 MB",
      lastModified: new Date(Date.now() - 12 * 60 * 60 * 1000),
      author: "陈项目经理",
      authorAvatar: "",
      collaborators: [],
      status: "published",
      isStarred: false,
      tags: ["项目", "报告"],
    },
  ]

  const recentDocuments = documents.slice(0, 3)
  const starredDocuments = documents.filter((doc) => doc.isStarred)

  const getDocumentIcon = (type: Document["type"]) => {
    switch (type) {
      case "document":
        return <FileText className="w-5 h-5 text-blue-600" />
      case "spreadsheet":
        return <FileText className="w-5 h-5 text-blue-600" />
      case "presentation":
        return <FileText className="w-5 h-5 text-blue-600" />
      case "pdf":
        return <FileText className="w-5 h-5 text-blue-600" />
      default:
        return <FileText className="w-5 h-5 text-blue-600" />
    }
  }

  const getStatusColor = (status: Document["status"]) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "review":
        return "bg-blue-100 text-blue-800"
      case "published":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Document["status"]) => {
    switch (status) {
      case "draft":
        return "草稿"
      case "review":
        return "审核中"
      case "published":
        return "已发布"
      default:
        return "未知"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) return "刚刚"
    if (hours < 24) return `${hours}小时前`
    if (days < 7) return `${days}天前`
    return date.toLocaleDateString("zh-CN")
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "starred" && doc.isStarred) ||
      (selectedFilter === "recent" && Date.now() - doc.lastModified.getTime() < 24 * 60 * 60 * 1000) ||
      doc.status === selectedFilter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-blue-600" />
            文档协作
          </h1>
          <p className="text-slate-600 mt-1">团队文档管理与协作编辑</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Upload className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            上传文档
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            新建文档
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              总文档数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
            <p className="text-sm text-muted-foreground">本月新增 +12</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              协作文档
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {documents.filter((doc) => doc.collaborators.length > 0).length}
            </div>
            <p className="text-sm text-muted-foreground">多人协作中</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Star className="w-5 h-5 mr-2 text-blue-600" />
              收藏文档
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{starredDocuments.length}</div>
            <p className="text-sm text-muted-foreground">重要文档</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              最近更新
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{recentDocuments.length}</div>
            <p className="text-sm text-muted-foreground">今日更新</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 侧边栏 */}
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-blue-700">文档分类</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("all")}
            >
              <Folder className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              全部文档
            </Button>
            <Button
              variant={selectedFilter === "recent" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("recent")}
            >
              <Clock className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              最近更新
            </Button>
            <Button
              variant={selectedFilter === "starred" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("starred")}
            >
              <Star className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              收藏文档
            </Button>
            <Button
              variant={selectedFilter === "draft" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("draft")}
            >
              <Edit className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              草稿
            </Button>
            <Button
              variant={selectedFilter === "review" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("review")}
            >
              <Eye className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              审核中
            </Button>
            <Button
              variant={selectedFilter === "published" ? "default" : "ghost"}
              className="w-full justify-start transition-all duration-300 hover:scale-105 group"
              onClick={() => setSelectedFilter("published")}
            >
              <Share2 className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
              已发布
            </Button>
          </CardContent>
        </Card>

        {/* 文档列表 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 搜索和过滤 */}
          <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索文档..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-l-4 border-l-blue-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
                >
                  <Filter className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                  筛选
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 文档网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocuments.map((document) => (
              <Card
                key={document.id}
                className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getDocumentIcon(document.type)}
                      <div className="flex-1">
                        <CardTitle className="text-base line-clamp-1 text-blue-700">{document.title}</CardTitle>
                        <CardDescription className="text-sm">{document.size}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {document.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                        <MoreHorizontal className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 状态和标签 */}
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(document.status)}>{getStatusText(document.status)}</Badge>
                    <div className="flex flex-wrap gap-1">
                      {document.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 作者和协作者 */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={document.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">{document.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-slate-600">{document.author}</span>
                    </div>
                    {document.collaborators.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-500">{document.collaborators.length} 位协作者</span>
                      </div>
                    )}
                  </div>

                  {/* 时间和操作 */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-slate-500">{formatTime(document.lastModified)}</span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                        <Eye className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                      <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                        <Edit className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                      <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                        <Share2 className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                      <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                        <Download className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 空状态 */}
          {filteredDocuments.length === 0 && (
            <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">没有找到文档</h3>
                <p className="text-slate-500 text-center mb-4">
                  {searchQuery ? "尝试调整搜索条件" : "开始创建您的第一个文档"}
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                  <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                  新建文档
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 快速操作面板 */}
      <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-base text-blue-700">快速操作</CardTitle>
          <CardDescription>常用文档操作</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <FileText className="w-6 h-6 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">新建文档</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 group"
            >
              <Upload className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">上传文件</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 group"
            >
              <Share2 className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">共享文档</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 group"
            >
              <Users className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">团队协作</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
