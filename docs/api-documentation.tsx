"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Copy, Play, CheckCircle, AlertCircle, Search } from "lucide-react"

interface APIEndpoint {
  id: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
  category: string
  params?: string[]
  body?: string
  response: string
  example: {
    request?: any
    response: any
  }
  errors?: Array<{
    code: number
    message: string
    description: string
  }>
}

export function APIDocumentation() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [testResults, setTestResults] = useState<Record<string, any>>({})

  const apiEndpoints: APIEndpoint[] = [
    {
      id: "get-customers",
      method: "GET",
      path: "/api/customers",
      description: "获取客户列表，支持分页、搜索和筛选",
      category: "customers",
      params: ["page", "limit", "search", "status", "assignedTo"],
      response: "{ data: Customer[], total: number, page: number, limit: number }",
      example: {
        request: {
          url: "/api/customers?page=1&limit=10&status=active",
          method: "GET",
        },
        response: {
          data: [
            {
              id: "1",
              name: "张总",
              company: "华润集团",
              email: "zhang@huarun.com",
              phone: "138-0000-1234",
              status: "active",
              value: 500000,
              lastContact: "2025-06-19",
              assignedTo: "李销售",
              tags: ["VIP", "大客户"],
              createdAt: "2025-01-01T00:00:00Z",
              updatedAt: "2025-06-19T00:00:00Z",
            },
          ],
          total: 1,
          page: 1,
          limit: 10,
        },
      },
      errors: [
        { code: 400, message: "Bad Request", description: "请求参数格式错误" },
        { code: 500, message: "Internal Server Error", description: "服务器内部错误" },
      ],
    },
    {
      id: "create-customer",
      method: "POST",
      path: "/api/customers",
      description: "创建新客户记录",
      category: "customers",
      body: "CreateCustomerRequest",
      response: "Customer",
      example: {
        request: {
          name: "新客户",
          company: "新公司",
          email: "new@example.com",
          phone: "138-0000-0000",
          status: "potential",
          assignedTo: "销售员",
          tags: ["新客户"],
        },
        response: {
          id: "new-id",
          name: "新客户",
          company: "新公司",
          email: "new@example.com",
          phone: "138-0000-0000",
          status: "potential",
          value: 0,
          assignedTo: "销售员",
          tags: ["新客户"],
          createdAt: "2025-06-28T10:10:09Z",
          updatedAt: "2025-06-28T10:10:09Z",
        },
      },
      errors: [
        { code: 400, message: "Validation Error", description: "必填字段缺失或格式错误" },
        { code: 409, message: "Conflict", description: "邮箱已存在" },
      ],
    },
    {
      id: "update-customer",
      method: "PUT",
      path: "/api/customers/:id",
      description: "更新客户信息",
      category: "customers",
      body: "UpdateCustomerRequest",
      response: "Customer",
      example: {
        request: {
          name: "张总经理",
          value: 600000,
          status: "active",
        },
        response: {
          id: "1",
          name: "张总经理",
          company: "华润集团",
          email: "zhang@huarun.com",
          phone: "138-0000-1234",
          status: "active",
          value: 600000,
          lastContact: "2025-06-19",
          assignedTo: "李销售",
          tags: ["VIP", "大客户"],
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-06-28T10:10:09Z",
        },
      },
      errors: [
        { code: 404, message: "Not Found", description: "客户不存在" },
        { code: 400, message: "Validation Error", description: "更新数据格式错误" },
      ],
    },
    {
      id: "delete-customer",
      method: "DELETE",
      path: "/api/customers/:id",
      description: "删除客户记录",
      category: "customers",
      response: "{ success: boolean, message: string }",
      example: {
        response: {
          success: true,
          message: "客户删除成功",
        },
      },
      errors: [
        { code: 404, message: "Not Found", description: "客户不存在" },
        { code: 409, message: "Conflict", description: "客户有关联数据，无法删除" },
      ],
    },
    {
      id: "get-tasks",
      method: "GET",
      path: "/api/tasks",
      description: "获取任务列表",
      category: "tasks",
      params: ["page", "limit", "status", "priority", "assignee", "project"],
      response: "{ data: Task[], total: number, page: number, limit: number }",
      example: {
        request: {
          url: "/api/tasks?status=in-progress&priority=high",
          method: "GET",
        },
        response: {
          data: [
            {
              id: "1",
              title: "产品原型设计",
              description: "完成新产品的原型设计",
              status: "in-progress",
              priority: "high",
              assignee: "张设计师",
              dueDate: "2025-06-25",
              progress: 65,
              tags: ["设计", "原型"],
              project: "新产品开发",
              createdAt: "2025-01-01T00:00:00Z",
              updatedAt: "2025-06-19T00:00:00Z",
            },
          ],
          total: 1,
          page: 1,
          limit: 10,
        },
      },
    },
    {
      id: "create-task",
      method: "POST",
      path: "/api/tasks",
      description: "创建新任务",
      category: "tasks",
      body: "CreateTaskRequest",
      response: "Task",
      example: {
        request: {
          title: "新任务",
          description: "任务描述",
          priority: "medium",
          assignee: "开发者",
          dueDate: "2025-07-01",
          project: "项目名称",
          tags: ["开发"],
        },
        response: {
          id: "new-task-id",
          title: "新任务",
          description: "任务描述",
          status: "todo",
          priority: "medium",
          assignee: "开发者",
          dueDate: "2025-07-01",
          progress: 0,
          project: "项目名称",
          tags: ["开发"],
          createdAt: "2025-06-28T10:10:09Z",
          updatedAt: "2025-06-28T10:10:09Z",
        },
      },
    },
    {
      id: "update-task-status",
      method: "PUT",
      path: "/api/tasks/:id/status",
      description: "更新任务状态",
      category: "tasks",
      body: "{ status: TaskStatus, progress?: number }",
      response: "Task",
      example: {
        request: {
          status: "completed",
          progress: 100,
        },
        response: {
          id: "1",
          title: "产品原型设计",
          description: "完成新产品的原型设计",
          status: "completed",
          priority: "high",
          assignee: "张设计师",
          dueDate: "2025-06-25",
          progress: 100,
          tags: ["设计", "原型"],
          project: "新产品开发",
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-06-28T10:10:09Z",
        },
      },
    },
    {
      id: "get-notifications",
      method: "GET",
      path: "/api/notifications",
      description: "获取通知列表",
      category: "notifications",
      params: ["userId", "type", "isRead", "limit"],
      response: "Notification[]",
      example: {
        request: {
          url: "/api/notifications?userId=user1&isRead=false",
          method: "GET",
        },
        response: [
          {
            id: "1",
            type: "task",
            title: "任务即将到期",
            content: "您的任务'产品原型设计'将在2小时后到期",
            timestamp: "2025-06-28T08:10:09Z",
            isRead: false,
            priority: "high",
            userId: "user1",
            actionRequired: true,
          },
        ],
      },
    },
    {
      id: "mark-notification-read",
      method: "PUT",
      path: "/api/notifications/:id/read",
      description: "标记通知为已读",
      category: "notifications",
      response: "{ success: boolean }",
      example: {
        response: {
          success: true,
        },
      },
    },
  ]

  const categories = [
    { id: "all", name: "全部", count: apiEndpoints.length },
    { id: "customers", name: "客户管理", count: apiEndpoints.filter((api) => api.category === "customers").length },
    { id: "tasks", name: "任务管理", count: apiEndpoints.filter((api) => api.category === "tasks").length },
    {
      id: "notifications",
      name: "通知中心",
      count: apiEndpoints.filter((api) => api.category === "notifications").length,
    },
  ]

  const filteredEndpoints = apiEndpoints.filter((endpoint) => {
    const matchesCategory = selectedCategory === "all" || endpoint.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const testEndpoint = async (endpoint: APIEndpoint) => {
    try {
      setTestResults((prev) => ({ ...prev, [endpoint.id]: { loading: true } }))

      // 模拟API测试
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const success = Math.random() > 0.2 // 80% 成功率

      setTestResults((prev) => ({
        ...prev,
        [endpoint.id]: {
          loading: false,
          success,
          response: success ? endpoint.example.response : { error: "测试失败" },
          timestamp: new Date().toISOString(),
        },
      }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [endpoint.id]: {
          loading: false,
          success: false,
          error: String(error),
          timestamp: new Date().toISOString(),
        },
      }))
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800"
      case "POST":
        return "bg-blue-100 text-blue-800"
      case "PUT":
        return "bg-yellow-100 text-yellow-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">API 接口文档</h1>
        <p className="text-xl text-gray-600 mb-4">言语云企业管理系统完整API参考</p>
        <div className="flex items-center justify-center space-x-4">
          <Badge className="bg-green-100 text-green-800">REST API</Badge>
          <Badge className="bg-blue-100 text-blue-800">JSON</Badge>
          <Badge className="bg-purple-100 text-purple-800">TypeScript</Badge>
          <Badge className="bg-orange-100 text-orange-800">本地化</Badge>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="搜索API接口..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-1"
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API端点列表 */}
      <div className="space-y-4">
        {filteredEndpoints.map((endpoint) => (
          <Card key={endpoint.id} className="border hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                  <code className="text-sm font-mono bg-gray-100 px-3 py-1 rounded">{endpoint.path}</code>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(endpoint.path)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testEndpoint(endpoint)}
                    disabled={testResults[endpoint.id]?.loading}
                  >
                    {testResults[endpoint.id]?.loading ? (
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span className="ml-1">测试</span>
                  </Button>
                </div>
              </div>
              <CardDescription className="text-base">{endpoint.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="example" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="example">示例</TabsTrigger>
                  <TabsTrigger value="parameters">参数</TabsTrigger>
                  <TabsTrigger value="response">响应</TabsTrigger>
                  <TabsTrigger value="errors">错误</TabsTrigger>
                </TabsList>

                <TabsContent value="example" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* 请求示例 */}
                    {endpoint.example.request && (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">请求示例</Label>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <pre className="text-sm overflow-x-auto">
                            <code>{JSON.stringify(endpoint.example.request, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* 响应示例 */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">响应示例</Label>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{JSON.stringify(endpoint.example.response, null, 2)}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="parameters" className="space-y-4">
                  {endpoint.params && endpoint.params.length > 0 ? (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">查询参数</Label>
                      <div className="space-y-2">
                        {endpoint.params.map((param) => (
                          <div key={param} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <code className="text-sm font-mono">{param}</code>
                            <span className="text-sm text-gray-600">- 可选参数</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {endpoint.body && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">请求体</Label>
                      <div className="p-2 bg-gray-50 rounded">
                        <code className="text-sm font-mono">{endpoint.body}</code>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="response" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">响应格式</Label>
                    <div className="p-2 bg-gray-50 rounded">
                      <code className="text-sm font-mono">{endpoint.response}</code>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="errors" className="space-y-4">
                  {endpoint.errors && endpoint.errors.length > 0 ? (
                    <div className="space-y-2">
                      {endpoint.errors.map((error) => (
                        <Alert key={error.code}>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{error.code}</Badge>
                              <span className="font-medium">{error.message}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{error.description}</p>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">暂无错误信息</p>
                  )}
                </TabsContent>
              </Tabs>

              {/* 测试结果 */}
              {testResults[endpoint.id] && !testResults[endpoint.id].loading && (
                <div className="mt-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    {testResults[endpoint.id].success ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="font-medium">测试结果 - {testResults[endpoint.id].success ? "成功" : "失败"}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(testResults[endpoint.id].timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-sm overflow-x-auto">
                      <code>
                        {JSON.stringify(testResults[endpoint.id].response || testResults[endpoint.id].error, null, 2)}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEndpoints.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">没有找到匹配的API接口</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
