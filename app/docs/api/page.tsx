"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Code, Database, FileText, Settings, Info, Copy } from "lucide-react"

export default function APIDocumentationPage() {
  const apiEndpoints = [
    {
      method: "GET",
      path: "/api/customers",
      description: "获取客户列表",
      category: "customers",
      params: ["page", "limit", "search"],
      response: "Customer[]",
    },
    {
      method: "POST",
      path: "/api/customers",
      description: "创建新客户",
      category: "customers",
      body: "CreateCustomerRequest",
      response: "Customer",
    },
    {
      method: "GET",
      path: "/api/tasks",
      description: "获取任务列表",
      category: "tasks",
      params: ["status", "assignee", "project"],
      response: "Task[]",
    },
    {
      method: "PUT",
      path: "/api/tasks/:id",
      description: "更新任务状态",
      category: "tasks",
      body: "UpdateTaskRequest",
      response: "Task",
    },
    {
      method: "GET",
      path: "/api/okrs",
      description: "获取OKR列表",
      category: "okrs",
      params: ["quarter", "owner", "department"],
      response: "OKR[]",
    },
    {
      method: "POST",
      path: "/api/notifications",
      description: "发送通知",
      category: "notifications",
      body: "CreateNotificationRequest",
      response: "Notification",
    },
  ]

  const dataModels = {
    Customer: {
      id: "string",
      name: "string",
      company: "string",
      email: "string",
      phone: "string",
      status: "'active' | 'inactive' | 'potential'",
      value: "number",
      createdAt: "string",
      updatedAt: "string",
    },
    Task: {
      id: "string",
      title: "string",
      description: "string",
      status: "'todo' | 'in-progress' | 'review' | 'completed'",
      priority: "'low' | 'medium' | 'high' | 'urgent'",
      assignee: "string",
      dueDate: "string",
      progress: "number",
      createdAt: "string",
    },
    OKR: {
      id: "string",
      title: "string",
      description: "string",
      owner: "string",
      quarter: "string",
      progress: "number",
      keyResults: "KeyResult[]",
      status: "'draft' | 'active' | 'completed'",
    },
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">API 文档</h1>
        <p className="text-xl text-gray-600 mb-4">言语云企业管理系统 API 接口文档</p>
        <div className="flex items-center justify-center space-x-4">
          <Badge className="bg-green-100 text-green-800">REST API</Badge>
          <Badge className="bg-blue-100 text-blue-800">JSON</Badge>
          <Badge className="bg-purple-100 text-purple-800">TypeScript</Badge>
        </div>
      </div>

      <Tabs defaultValue="endpoints" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints">API 端点</TabsTrigger>
          <TabsTrigger value="models">数据模型</TabsTrigger>
          <TabsTrigger value="examples">代码示例</TabsTrigger>
          <TabsTrigger value="authentication">认证授权</TabsTrigger>
        </TabsList>

        {/* API 端点 */}
        <TabsContent value="endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>API 端点列表</span>
              </CardTitle>
              <CardDescription>系统提供的所有 API 接口</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800"
                              : endpoint.method === "POST"
                                ? "bg-blue-100 text-blue-800"
                                : endpoint.method === "PUT"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(endpoint.path)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      {endpoint.params && (
                        <div>
                          <span className="text-gray-500">参数: </span>
                          <span className="font-mono">{endpoint.params.join(", ")}</span>
                        </div>
                      )}
                      {endpoint.body && (
                        <div>
                          <span className="text-gray-500">请求体: </span>
                          <span className="font-mono">{endpoint.body}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">响应: </span>
                        <span className="font-mono">{endpoint.response}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据模型 */}
        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>数据模型定义</span>
              </CardTitle>
              <CardDescription>系统中使用的数据结构定义</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(dataModels).map(([modelName, fields]) => (
                  <div key={modelName} className="border rounded-lg p-4">
                    <h4 className="font-medium text-lg mb-3">{modelName}</h4>
                    <div className="bg-gray-50 p-4 rounded">
                      <pre className="text-sm">
                        <code>
                          {`interface ${modelName} {\n${Object.entries(fields)
                            .map(([key, type]) => `  ${key}: ${type}`)
                            .join("\n")}\n}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 代码示例 */}
        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>使用示例</span>
              </CardTitle>
              <CardDescription>常见 API 调用示例</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">获取客户列表</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>{`// 使用 fetch API
const response = await fetch('/api/customers?page=1&limit=10')
const customers = await response.json()

// 使用 axios
import axios from 'axios'
const { data: customers } = await axios.get('/api/customers', {
  params: { page: 1, limit: 10 }
})`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">创建新客户</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>{`const newCustomer = {
  name: "张三",
  company: "科技有限公司",
  email: "zhang@example.com",
  phone: "138-0000-0000",
  status: "potential"
}

const response = await fetch('/api/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newCustomer)
})

const customer = await response.json()`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">更新任务状态</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>{`const taskId = "task_123"
const updateData = {
  status: "completed",
  progress: 100
}

const response = await fetch(\`/api/tasks/\${taskId}\`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updateData)
})

const updatedTask = await response.json()`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 认证授权 */}
        <TabsContent value="authentication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>认证与授权</span>
              </CardTitle>
              <CardDescription>API 访问控制和安全机制</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    本系统采用本地化存储，无需传统的 API 认证。所有数据操作都在客户端完成。
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="font-medium mb-3">权限控制</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 基于角色的访问控制 (RBAC)</li>
                      <li>• 数据级别的权限过滤</li>
                      <li>• 操作日志记录和审计</li>
                      <li>• 会话管理和超时控制</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">安全最佳实践</h4>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded">
                      <h5 className="font-medium text-green-800">数据验证</h5>
                      <p className="text-sm text-green-700">所有输入数据都经过严格的类型检查和格式验证</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <h5 className="font-medium text-yellow-800">错误处理</h5>
                      <p className="text-sm text-yellow-700">统一的错误响应格式，不暴露敏感信息</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <h5 className="font-medium text-purple-800">日志记录</h5>
                      <p className="text-sm text-purple-700">完整的操作日志，支持审计和问题追踪</p>
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
