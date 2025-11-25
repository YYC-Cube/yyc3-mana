"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, TrendingUp, FileText, Users, Calendar, RefreshCw } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "customer" | "task" | "document" | "user" | "event"
  url: string
  timestamp?: Date
}

interface GlobalSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSearch: (query: string) => Promise<void>
  isLoading: boolean
}

export function GlobalSearchDialog({ open, onOpenChange, onSearch, isLoading }: GlobalSearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>(["客户管理", "待审批任务", "本月报表", "团队会议"])

  // 模拟搜索结果
  const mockResults: SearchResult[] = [
    {
      id: "1",
      title: "张三 - 重要客户",
      description: "北京科技有限公司 CEO，年度合作金额 500万",
      type: "customer",
      url: "/customers/1",
      timestamp: new Date(),
    },
    {
      id: "2",
      title: "Q4季度销售报告",
      description: "2024年第四季度销售数据分析报告",
      type: "document",
      url: "/documents/2",
      timestamp: new Date(),
    },
    {
      id: "3",
      title: "产品发布会议",
      description: "新产品发布策划会议，参与人员：产品团队",
      type: "event",
      url: "/calendar/3",
      timestamp: new Date(),
    },
  ]

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    await onSearch(searchQuery)
    // 模拟搜索结果
    setResults(
      mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )

    // 添加到最近搜索
    if (!recentSearches.includes(searchQuery)) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 3)])
    }
  }

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "customer":
        return Users
      case "task":
        return Clock
      case "document":
        return FileText
      case "user":
        return Users
      case "event":
        return Calendar
      default:
        return FileText
    }
  }

  const getTypeBadge = (type: SearchResult["type"]) => {
    const badges = {
      customer: { label: "客户", color: "bg-blue-100 text-blue-800" },
      task: { label: "任务", color: "bg-green-100 text-green-800" },
      document: { label: "文档", color: "bg-purple-100 text-purple-800" },
      user: { label: "用户", color: "bg-orange-100 text-orange-800" },
      event: { label: "日程", color: "bg-pink-100 text-pink-800" },
    }
    return badges[type]
  }

  useEffect(() => {
    if (open) {
      setQuery("")
      setResults([])
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>全局搜索</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 搜索输入框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="搜索客户、任务、文档..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(query)
                }
              }}
              className="pl-10 pr-12 h-12 text-base"
              autoFocus
            />
            {isLoading ? (
              <RefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
            ) : (
              <Button
                size="sm"
                onClick={() => handleSearch(query)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
              >
                搜索
              </Button>
            )}
          </div>

          {/* 搜索结果 */}
          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                搜索结果 ({results.length})
              </h3>
              {results.map((result) => {
                const TypeIcon = getTypeIcon(result.type)
                const typeBadge = getTypeBadge(result.type)

                return (
                  <div
                    key={result.id}
                    className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      console.log("导航到:", result.url)
                      onOpenChange(false)
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <TypeIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                          <Badge className={`text-xs ${typeBadge.color}`}>{typeBadge.label}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                        {result.timestamp && (
                          <p className="text-xs text-gray-400 mt-1">{result.timestamp.toLocaleString("zh-CN")}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* 最近搜索 */}
          {query === "" && recentSearches.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                最近搜索
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery(search)
                      handleSearch(search)
                    }}
                    className="text-xs"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 空状态 */}
          {query !== "" && results.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">未找到相关结果</p>
              <p className="text-sm text-gray-400 mt-1">尝试使用不同的关键词</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
