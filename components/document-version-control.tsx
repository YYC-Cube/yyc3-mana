"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  GitBranch,
  GitCommit,
  GitMerge,
  History,
  Download,
  Eye,
  Edit,
  Share2,
  Clock,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  RotateCcw,
  Save,
  Tag,
} from "lucide-react"

interface DocumentVersion {
  id: string
  version: string
  title: string
  description: string
  author: string
  authorAvatar: string
  timestamp: Date
  size: string
  changes: number
  status: "draft" | "review" | "approved" | "published"
  comments: DocumentComment[]
  isCurrentVersion: boolean
  parentVersion?: string
  tags: string[]
}

interface DocumentComment {
  id: string
  author: string
  authorAvatar: string
  content: string
  timestamp: Date
  type: "comment" | "suggestion" | "approval" | "rejection"
  resolved: boolean
}

interface DocumentVersionControlProps {
  documentId: string
  currentUserId: string
}

export function DocumentVersionControl({ documentId, currentUserId }: DocumentVersionControlProps) {
  const [versions, setVersions] = useState<DocumentVersion[]>([])
  const [selectedVersion, setSelectedVersion] = useState<DocumentVersion | null>(null)
  const [compareVersion, setCompareVersion] = useState<DocumentVersion | null>(null)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [newVersionDescription, setNewVersionDescription] = useState("")
  const [isCreatingVersion, setIsCreatingVersion] = useState(false)

  // 模拟版本数据
  useEffect(() => {
    const mockVersions: DocumentVersion[] = [
      {
        id: "v1.0",
        version: "1.0",
        title: "产品需求文档 v1.0",
        description: "初始版本，包含基本功能需求",
        author: "张产品经理",
        authorAvatar: "",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        size: "2.1 MB",
        changes: 0,
        status: "published",
        comments: [],
        isCurrentVersion: false,
        tags: ["初始版本", "基础功能"],
      },
      {
        id: "v1.1",
        version: "1.1",
        title: "产品需求文档 v1.1",
        description: "添加用户反馈功能需求",
        author: "张产品经理",
        authorAvatar: "",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        size: "2.3 MB",
        changes: 15,
        status: "published",
        comments: [
          {
            id: "c1",
            author: "李开发",
            authorAvatar: "",
            content: "用户反馈功能的技术实现需要进一步讨论",
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            type: "comment",
            resolved: true,
          },
        ],
        isCurrentVersion: false,
        parentVersion: "v1.0",
        tags: ["用户反馈", "功能增强"],
      },
      {
        id: "v1.2",
        version: "1.2",
        title: "产品需求文档 v1.2",
        description: "优化用户界面设计要求",
        author: "王设计师",
        authorAvatar: "",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        size: "2.5 MB",
        changes: 8,
        status: "approved",
        comments: [
          {
            id: "c2",
            author: "陈测试",
            authorAvatar: "",
            content: "界面设计符合用户体验标准",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            type: "approval",
            resolved: false,
          },
        ],
        isCurrentVersion: false,
        parentVersion: "v1.1",
        tags: ["UI优化", "用户体验"],
      },
      {
        id: "v2.0",
        version: "2.0",
        title: "产品需求文档 v2.0",
        description: "重大版本更新，添加AI功能模块",
        author: "张产品经理",
        authorAvatar: "",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        size: "3.1 MB",
        changes: 42,
        status: "review",
        comments: [
          {
            id: "c3",
            author: "李技术总监",
            authorAvatar: "",
            content: "AI功能模块的技术架构需要详细评估",
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
            type: "suggestion",
            resolved: false,
          },
          {
            id: "c4",
            author: "赵项目经理",
            authorAvatar: "",
            content: "时间安排需要调整，建议分阶段实施",
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            type: "comment",
            resolved: false,
          },
        ],
        isCurrentVersion: true,
        parentVersion: "v1.2",
        tags: ["AI功能", "重大更新"],
      },
    ]

    setVersions(mockVersions)
    setSelectedVersion(mockVersions.find((v) => v.isCurrentVersion) || mockVersions[0])
  }, [])

  const getStatusIcon = (status: DocumentVersion["status"]) => {
    switch (status) {
      case "draft":
        return <Edit className="w-4 h-4 text-gray-500" />
      case "review":
        return <Eye className="w-4 h-4 text-blue-500" />
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "published":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status: DocumentVersion["status"]) => {
    switch (status) {
      case "draft":
        return "草稿"
      case "review":
        return "审核中"
      case "approved":
        return "已批准"
      case "published":
        return "已发布"
      default:
        return "未知"
    }
  }

  const getStatusColor = (status: DocumentVersion["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "review":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "published":
        return "bg-green-200 text-green-900"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCommentTypeIcon = (type: DocumentComment["type"]) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      case "suggestion":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "approval":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "rejection":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))

    if (days > 0) return `${days}天前`
    if (hours > 0) return `${hours}小时前`
    if (minutes > 0) return `${minutes}分钟前`
    return "刚刚"
  }

  const createNewVersion = () => {
    if (!newVersionDescription.trim()) return

    const newVersion: DocumentVersion = {
      id: `v${versions.length + 1}.0`,
      version: `${versions.length + 1}.0`,
      title: `产品需求文档 v${versions.length + 1}.0`,
      description: newVersionDescription,
      author: "当前用户",
      authorAvatar: "",
      timestamp: new Date(),
      size: "2.8 MB",
      changes: 0,
      status: "draft",
      comments: [],
      isCurrentVersion: true,
      parentVersion: selectedVersion?.id,
      tags: ["新版本"],
    }

    // 更新版本列表
    setVersions((prev) => prev.map((v) => ({ ...v, isCurrentVersion: false })).concat(newVersion))
    setSelectedVersion(newVersion)
    setNewVersionDescription("")
    setIsCreatingVersion(false)
  }

  const addComment = () => {
    if (!newComment.trim() || !selectedVersion) return

    const comment: DocumentComment = {
      id: `c${Date.now()}`,
      author: "当前用户",
      authorAvatar: "",
      content: newComment,
      timestamp: new Date(),
      type: "comment",
      resolved: false,
    }

    setVersions((prev) =>
      prev.map((v) => (v.id === selectedVersion.id ? { ...v, comments: [...v.comments, comment] } : v)),
    )

    setSelectedVersion((prev) => (prev ? { ...prev, comments: [...prev.comments, comment] } : null))
    setNewComment("")
  }

  const revertToVersion = (version: DocumentVersion) => {
    // 恢复到指定版本的逻辑
    console.log("恢复到版本:", version.version)
  }

  const downloadVersion = (version: DocumentVersion) => {
    // 下载指定版本的逻辑
    console.log("下载版本:", version.version)
  }

  return (
    <div className="space-y-6">
      {/* 版本控制头部 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <GitBranch className="w-5 h-5 mr-2 text-blue-600" />
                文档版本控制
              </CardTitle>
              <CardDescription>管理文档版本历史和协作评审</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setIsCreatingVersion(!isCreatingVersion)}>
                <Plus className="w-4 h-4 mr-2" />
                新建版本
              </Button>
              <Button variant="outline">
                <GitMerge className="w-4 h-4 mr-2" />
                合并版本
              </Button>
            </div>
          </div>
        </CardHeader>

        {isCreatingVersion && (
          <CardContent className="border-t">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">版本描述</label>
                <Textarea
                  placeholder="描述此版本的主要变更内容..."
                  value={newVersionDescription}
                  onChange={(e) => setNewVersionDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={createNewVersion} disabled={!newVersionDescription.trim()}>
                  <Save className="w-4 h-4 mr-2" />
                  创建版本
                </Button>
                <Button variant="outline" onClick={() => setIsCreatingVersion(false)}>
                  取消
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 版本列表 */}
        <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <History className="w-4 h-4 mr-2" />
              版本历史
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="p-4 space-y-3">
                {versions.map((version, index) => (
                  <div
                    key={version.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedVersion?.id === version.id
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedVersion(version)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          v{version.version}
                        </Badge>
                        {version.isCurrentVersion && <Badge className="text-xs bg-green-600">当前</Badge>}
                      </div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(version.status)}
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(version.status)}`}>
                          {getStatusText(version.status)}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-medium text-sm mb-1 line-clamp-1">{version.title}</h4>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{version.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Avatar className="w-4 h-4">
                          <AvatarImage
                            src={
                              version.authorAvatar ||
                              `/placeholder.svg?height=16&width=16&text=${version.author.charAt(0)}`
                            }
                          />
                          <AvatarFallback className="text-xs">{version.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{version.author}</span>
                      </div>
                      <span>{formatTime(version.timestamp)}</span>
                    </div>

                    {version.changes > 0 && <div className="mt-2 text-xs text-blue-600">+{version.changes} 处变更</div>}

                    {version.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {version.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* 版本连接线 */}
                    {index < versions.length - 1 && (
                      <div className="flex justify-center mt-3">
                        <div className="w-px h-4 bg-gray-300"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 版本详情 */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  {selectedVersion ? `版本 ${selectedVersion.version}` : "选择版本"}
                </CardTitle>
                {selectedVersion && <CardDescription>{selectedVersion.description}</CardDescription>}
              </div>
              {selectedVersion && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => downloadVersion(selectedVersion)}>
                    <Download className="w-4 h-4 mr-2" />
                    下载
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                  {!selectedVersion.isCurrentVersion && (
                    <Button variant="outline" size="sm" onClick={() => revertToVersion(selectedVersion)}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      恢复
                    </Button>
                  )}
                  <Button
                    variant={showComments ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    评论 ({selectedVersion.comments.length})
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>

          {selectedVersion ? (
            <CardContent>
              {/* 版本信息 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-blue-600">{selectedVersion.version}</div>
                  <div className="text-sm text-gray-600">版本号</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-green-600">{selectedVersion.size}</div>
                  <div className="text-sm text-gray-600">文件大小</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-purple-600">{selectedVersion.changes}</div>
                  <div className="text-sm text-gray-600">变更数量</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-orange-600">{selectedVersion.comments.length}</div>
                  <div className="text-sm text-gray-600">评论数量</div>
                </div>
              </div>

              {/* 作者信息 */}
              <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={
                      selectedVersion.authorAvatar ||
                      `/placeholder.svg?height=40&width=40&text=${selectedVersion.author.charAt(0)}`
                    }
                  />
                  <AvatarFallback>{selectedVersion.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{selectedVersion.author}</span>
                    <Badge className={getStatusColor(selectedVersion.status)}>
                      {getStatusText(selectedVersion.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center space-x-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedVersion.timestamp.toLocaleString("zh-CN")}
                    </span>
                    {selectedVersion.parentVersion && (
                      <span className="flex items-center">
                        <GitCommit className="w-4 h-4 mr-1" />
                        基于 v{versions.find((v) => v.id === selectedVersion.parentVersion)?.version}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 标签 */}
              {selectedVersion.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    标签
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVersion.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* 评论区域 */}
              {showComments && (
                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium mb-4 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    评论与反馈 ({selectedVersion.comments.length})
                  </h4>

                  {/* 评论列表 */}
                  <div className="space-y-4 mb-4">
                    {selectedVersion.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={
                              comment.authorAvatar ||
                              `/placeholder.svg?height=32&width=32&text=${comment.author.charAt(0)}`
                            }
                          />
                          <AvatarFallback className="text-sm">{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            {getCommentTypeIcon(comment.type)}
                            <span className="text-xs text-gray-500">{formatTime(comment.timestamp)}</span>
                            {comment.resolved && (
                              <Badge variant="secondary" className="text-xs">
                                已解决
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 添加评论 */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="添加评论或建议..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex items-center space-x-2">
                      <Button onClick={addComment} disabled={!newComment.trim()}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        添加评论
                      </Button>
                      <Button variant="outline">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        批准
                      </Button>
                      <Button variant="outline">
                        <XCircle className="w-4 h-4 mr-2" />
                        拒绝
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* 版本比较 */}
              <div className="border-t pt-6 mt-6">
                <h4 className="text-sm font-medium mb-4 flex items-center">
                  <GitMerge className="w-4 h-4 mr-2" />
                  版本比较
                </h4>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-600">比较版本</label>
                    <select
                      className="w-full mt-1 p-2 border rounded-md"
                      value={compareVersion?.id || ""}
                      onChange={(e) => {
                        const version = versions.find((v) => v.id === e.target.value)
                        setCompareVersion(version || null)
                      }}
                    >
                      <option value="">选择版本进行比较</option>
                      {versions
                        .filter((v) => v.id !== selectedVersion.id)
                        .map((version) => (
                          <option key={version.id} value={version.id}>
                            v{version.version} - {version.description}
                          </option>
                        ))}
                    </select>
                  </div>
                  <Button disabled={!compareVersion}>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    比较差异
                  </Button>
                </div>

                {compareVersion && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        v{compareVersion.version} → v{selectedVersion.version}
                      </span>
                      <span className="text-sm text-blue-600">
                        {Math.abs(selectedVersion.changes - compareVersion.changes)} 处差异
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">选择版本查看详情</h3>
                <p className="text-gray-500">从左侧版本列表中选择一个版本</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
