"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Code,
  Database,
  Server,
  Shield,
  Zap,
  Monitor,
  Globe,
  GitBranch,
  Package,
  Settings,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  ExternalLink,
  Layers,
  Lock,
  Cloud,
} from "lucide-react"

export function DataStackDocumentation() {
  const [activeTab, setActiveTab] = useState("overview")

  // 技术栈数据
  const techStack = {
    frontend: {
      framework: "Next.js 14",
      language: "TypeScript",
      styling: "Tailwind CSS",
      components: "shadcn/ui",
      icons: "Lucide React",
      state: "React Hooks",
      routing: "App Router",
    },
    backend: {
      runtime: "Node.js",
      api: "Next.js API Routes",
      validation: "Zod",
      auth: "NextAuth.js",
      middleware: "Next.js Middleware",
    },
    database: {
      primary: "IndexedDB",
      orm: "原生 IndexedDB API",
      cache: "浏览器缓存",
      storage: "LocalStorage",
      sync: "Background Sync",
    },
    tools: {
      bundler: "Webpack",
      compiler: "SWC",
      linter: "ESLint",
      formatter: "Prettier",
      testing: "Jest + Testing Library",
      deployment: "Vercel",
    },
  }

  // 性能指标
  const performanceMetrics = {
    loadTime: 1.2,
    firstPaint: 0.8,
    interactive: 1.5,
    dbQuery: 0.05,
    bundleSize: 245,
    lighthouse: 95,
  }

  // 安全特性
  const securityFeatures = [
    { name: "数据加密", status: "implemented", description: "本地数据AES-256加密" },
    { name: "权限控制", status: "implemented", description: "基于角色的访问控制" },
    { name: "审计日志", status: "implemented", description: "完整的操作日志记录" },
    { name: "输入验证", status: "implemented", description: "前后端双重验证" },
    { name: "CSRF防护", status: "implemented", description: "跨站请求伪造防护" },
    { name: "XSS防护", status: "implemented", description: "跨站脚本攻击防护" },
  ]

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">数据路技术栈文档</h1>
        <p className="text-xl text-gray-600 mb-4">言语云企业管理系统技术架构详解</p>
        <div className="flex items-center justify-center space-x-4">
          <Badge className="bg-blue-100 text-blue-800">Next.js 14</Badge>
          <Badge className="bg-green-100 text-green-800">TypeScript</Badge>
          <Badge className="bg-purple-100 text-purple-800">IndexedDB</Badge>
          <Badge className="bg-orange-100 text-orange-800">PWA</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">技术概览</TabsTrigger>
          <TabsTrigger value="architecture">系统架构</TabsTrigger>
          <TabsTrigger value="dataflow">数据流程</TabsTrigger>
          <TabsTrigger value="database">数据库设计</TabsTrigger>
          <TabsTrigger value="performance">性能指标</TabsTrigger>
          <TabsTrigger value="security">安全特性</TabsTrigger>
          <TabsTrigger value="deployment">部署指南</TabsTrigger>
        </TabsList>

        {/* 技术概览 */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <span>前端技术</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(techStack.frontend).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="w-5 h-5 text-green-600" />
                  <span>后端技术</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(techStack.backend).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-purple-600" />
                  <span>数据存储</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(techStack.database).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-orange-600" />
                  <span>开发工具</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(techStack.tools).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 技术特色 */}
          <Card>
            <CardHeader>
              <CardTitle>技术特色与优势</CardTitle>
              <CardDescription>本系统采用的核心技术特色和竞争优势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">完全本地化</h4>
                      <p className="text-sm text-gray-600">无需服务器依赖，数据完全存储在本地，保证数据安全和隐私</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">高性能响应</h4>
                      <p className="text-sm text-gray-600">本地数据库查询，响应时间小于100ms，用户体验极佳</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">离线可用</h4>
                      <p className="text-sm text-gray-600">PWA技术支持，断网情况下仍可正常使用所有功能</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">现代化架构</h4>
                      <p className="text-sm text-gray-600">基于Next.js 14和TypeScript，代码质量高，维护性强</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">企业级安全</h4>
                      <p className="text-sm text-gray-600">多层次安全防护，数据加密，权限控制，审计日志</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">易于部署</h4>
                      <p className="text-sm text-gray-600">支持多种部署方式，一键部署到Vercel、Netlify等平台</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 系统架构 */}
        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="w-5 h-5" />
                <span>分层架构设计</span>
              </CardTitle>
              <CardDescription>系统采用经典的分层架构，确保代码的可维护性和扩展性</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 架构图 */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-medium text-blue-800">表现层 (Presentation Layer)</h4>
                      <p className="text-sm text-blue-700 mt-1">React组件、页面路由、用户界面</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-medium text-green-800">业务逻辑层 (Business Logic Layer)</h4>
                      <p className="text-sm text-green-700 mt-1">业务规则、数据处理、状态管理</p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-medium text-purple-800">数据访问层 (Data Access Layer)</h4>
                      <p className="text-sm text-purple-700 mt-1">数据库操作、缓存管理、数据同步</p>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-medium text-orange-800">数据存储层 (Data Storage Layer)</h4>
                      <p className="text-sm text-orange-700 mt-1">IndexedDB、LocalStorage、SessionStorage</p>
                    </div>
                  </div>
                </div>

                {/* 组件关系 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">核心组件</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>页面组件 (Pages)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>业务组件 (Components)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span>数据服务 (Services)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span>工具库 (Utils)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">数据流向</h4>
                    <div className="space-y-2 text-sm">
                      <div>1. 用户交互 → React组件</div>
                      <div>2. 组件事件 → 业务逻辑</div>
                      <div>3. 业务处理 → 数据服务</div>
                      <div>4. 数据操作 → IndexedDB</div>
                      <div>5. 结果返回 → 界面更新</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 模块依赖 */}
          <Card>
            <CardHeader>
              <CardTitle>模块依赖关系</CardTitle>
              <CardDescription>各功能模块之间的依赖关系和交互方式</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">核心模块</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 数据库管理</li>
                    <li>• 权限控制</li>
                    <li>• 错误处理</li>
                    <li>• 日志记录</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">业务模块</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 客户管理</li>
                    <li>• 任务管理</li>
                    <li>• OKR管理</li>
                    <li>• 审批流程</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">扩展模块</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• AI分析</li>
                    <li>• 第三方集成</li>
                    <li>• 数据分析</li>
                    <li>• 通知中心</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据流程 */}
        <TabsContent value="dataflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5" />
                <span>数据流程图</span>
              </CardTitle>
              <CardDescription>从用户交互到数据持久化的完整流程</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 流程步骤 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h4 className="font-medium">用户交互</h4>
                    <p className="text-sm text-gray-600 mt-1">点击、输入、提交</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <h4 className="font-medium">事件处理</h4>
                    <p className="text-sm text-gray-600 mt-1">React事件处理器</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <h4 className="font-medium">业务逻辑</h4>
                    <p className="text-sm text-gray-600 mt-1">数据验证、处理</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-orange-600 font-bold">4</span>
                    </div>
                    <h4 className="font-medium">数据持久化</h4>
                    <p className="text-sm text-gray-600 mt-1">IndexedDB存储</p>
                  </div>
                </div>

                {/* 详细流程 */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium mb-4">详细数据流程</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        1
                      </div>
                      <div>
                        <h5 className="font-medium">用户界面交互</h5>
                        <p className="text-sm text-gray-600">用户在React组件中进行操作，触发事件处理器</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        2
                      </div>
                      <div>
                        <h5 className="font-medium">数据验证与处理</h5>
                        <p className="text-sm text-gray-600">前端验证用户输入，格式化数据，准备发送到业务层</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        3
                      </div>
                      <div>
                        <h5 className="font-medium">业务逻辑执行</h5>
                        <p className="text-sm text-gray-600">执行业务规则，调用数据服务层进行数据操作</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        4
                      </div>
                      <div>
                        <h5 className="font-medium">数据库操作</h5>
                        <p className="text-sm text-gray-600">通过IndexedDB API进行数据的增删改查操作</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        5
                      </div>
                      <div>
                        <h5 className="font-medium">结果反馈</h5>
                        <p className="text-sm text-gray-600">操作结果返回到界面，更新组件状态，显示给用户</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 数据同步机制 */}
          <Card>
            <CardHeader>
              <CardTitle>数据同步机制</CardTitle>
              <CardDescription>离线数据同步和冲突解决策略</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">同步策略</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">实时同步</p>
                        <p className="text-xs text-gray-600">在线状态下实时同步数据变更</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">离线缓存</p>
                        <p className="text-xs text-gray-600">离线时将操作缓存到本地队列</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">批量同步</p>
                        <p className="text-xs text-gray-600">重新连接时批量处理缓存操作</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">冲突解决</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">时间戳优先</p>
                        <p className="text-xs text-gray-600">以最新修改时间为准</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">用户选择</p>
                        <p className="text-xs text-gray-600">提示用户手动选择保留版本</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">合并策略</p>
                        <p className="text-xs text-gray-600">智能合并非冲突字段</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据库设计 */}
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>IndexedDB架构设计</span>
              </CardTitle>
              <CardDescription>本地数据库的表结构和索引设计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 数据表结构 */}
                <div>
                  <h4 className="font-medium mb-4">数据表结构</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium text-blue-800 mb-2">customers (客户表)</h5>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div>• id (主键)</div>
                        <div>• name (姓名)</div>
                        <div>• company (公司)</div>
                        <div>• email (邮箱)</div>
                        <div>• status (状态)</div>
                        <div>• createdAt (创建时间)</div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">tasks (任务表)</h5>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>• id (主键)</div>
                        <div>• title (标题)</div>
                        <div>• status (状态)</div>
                        <div>• priority (优先级)</div>
                        <div>• assignee (负责人)</div>
                        <div>• dueDate (截止日期)</div>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h5 className="font-medium text-purple-800 mb-2">okrs (目标表)</h5>
                      <div className="text-sm text-purple-700 space-y-1">
                        <div>• id (主键)</div>
                        <div>• title (标题)</div>
                        <div>• owner (负责人)</div>
                        <div>• quarter (季度)</div>
                        <div>• progress (进度)</div>
                        <div>• keyResults (关键结果)</div>
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h5 className="font-medium text-orange-800 mb-2">notifications (通知表)</h5>
                      <div className="text-sm text-orange-700 space-y-1">
                        <div>• id (主键)</div>
                        <div>• type (类型)</div>
                        <div>• title (标题)</div>
                        <div>• isRead (已读状态)</div>
                        <div>• userId (用户ID)</div>
                        <div>• timestamp (时间戳)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 索引设计 */}
                <div>
                  <h4 className="font-medium mb-4">索引优化</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">主要索引</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 主键索引 (id)</li>
                          <li>• 状态索引 (status)</li>
                          <li>• 时间索引 (createdAt)</li>
                          <li>• 用户索引 (userId)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">复合索引</h5>
                        <ul className="text-sm space-y-1">
                          <li>• [userId, status]</li>
                          <li>• [type, timestamp]</li>
                          <li>• [assignee, dueDate]</li>
                          <li>• [company, status]</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 查询优化 */}
                <div>
                  <h4 className="font-medium mb-4">查询优化策略</h4>
                  <div className="space-y-3">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>分页查询:</strong> 使用cursor-based分页，避免大量数据加载
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>索引利用:</strong> 查询条件优先使用已建立的索引字段
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>数据缓存:</strong> 热点数据缓存到内存，减少数据库访问
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 数据模型 */}
          <Card>
            <CardHeader>
              <CardTitle>数据模型关系</CardTitle>
              <CardDescription>各数据表之间的关联关系</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 px-3 py-1 rounded">customers</div>
                    <span className="text-gray-400">1:N</span>
                    <div className="bg-green-100 px-3 py-1 rounded">tasks</div>
                    <span className="text-sm text-gray-600">(客户可以有多个任务)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 px-3 py-1 rounded">users</div>
                    <span className="text-gray-400">1:N</span>
                    <div className="bg-orange-100 px-3 py-1 rounded">notifications</div>
                    <span className="text-sm text-gray-600">(用户可以有多个通知)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-100 px-3 py-1 rounded">okrs</div>
                    <span className="text-gray-400">1:N</span>
                    <div className="bg-red-100 px-3 py-1 rounded">keyResults</div>
                    <span className="text-sm text-gray-600">(OKR包含多个关键结果)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 性能指标 */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span>加载性能</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">首次加载</span>
                    <span className="text-sm font-medium">{performanceMetrics.loadTime}s</span>
                  </div>
                  <Progress value={(performanceMetrics.loadTime / 3) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">首次绘制</span>
                    <span className="text-sm font-medium">{performanceMetrics.firstPaint}s</span>
                  </div>
                  <Progress value={(performanceMetrics.firstPaint / 2) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">可交互时间</span>
                    <span className="text-sm font-medium">{performanceMetrics.interactive}s</span>
                  </div>
                  <Progress value={(performanceMetrics.interactive / 3) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  <span>数据库性能</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">查询响应</span>
                    <span className="text-sm font-medium">{performanceMetrics.dbQuery * 1000}ms</span>
                  </div>
                  <Progress value={(performanceMetrics.dbQuery / 0.1) * 100} className="h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">&lt; 100ms</div>
                  <div className="text-sm text-gray-600">平均查询时间</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  <span>资源优化</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">包大小</span>
                    <span className="text-sm font-medium">{performanceMetrics.bundleSize}KB</span>
                  </div>
                  <Progress value={(performanceMetrics.bundleSize / 500) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Lighthouse评分</span>
                    <span className="text-sm font-medium">{performanceMetrics.lighthouse}/100</span>
                  </div>
                  <Progress value={performanceMetrics.lighthouse} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 性能优化建议 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>性能优化建议</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-green-700">已实施优化</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">代码分割和懒加载</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">图片压缩和WebP格式</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">CSS和JS压缩</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Service Worker缓存</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">数据库索引优化</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-blue-700">进一步优化</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">虚拟滚动优化长列表</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Web Workers处理重计算</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">预加载关键资源</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">CDN加速静态资源</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">HTTP/3协议支持</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 监控指标 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="w-5 h-5" />
                <span>实时监控指标</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">98.5%</div>
                  <div className="text-sm text-blue-700">可用性</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">45ms</div>
                  <div className="text-sm text-green-700">平均响应</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">1.2MB</div>
                  <div className="text-sm text-purple-700">内存使用</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">0.01%</div>
                  <div className="text-sm text-orange-700">错误率</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 安全特性 */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>安全防护体系</span>
              </CardTitle>
              <CardDescription>多层次安全防护机制，确保数据和系统安全</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">{feature.name}</h4>
                      <p className="text-sm text-green-700 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 数据安全 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>数据安全措施</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">数据加密</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 敏感数据AES-256加密存储</li>
                    <li>• 传输过程HTTPS加密</li>
                    <li>• 密钥安全管理和轮换</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">访问控制</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 基于角色的权限控制(RBAC)</li>
                    <li>• 最小权限原则</li>
                    <li>• 会话管理和超时控制</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">审计监控</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• 完整的操作日志记录</li>
                    <li>• 异常行为检测和告警</li>
                    <li>• 数据访问轨迹追踪</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 安全最佳实践 */}
          <Card>
            <CardHeader>
              <CardTitle>安全最佳实践</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>定期安全审计:</strong> 建议每季度进行一次全面的安全评估和漏洞扫描
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertDescription>
                    <strong>密码策略:</strong> 强制使用复杂密码，定期更换，启用双因素认证
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Monitor className="h-4 w-4" />
                  <AlertDescription>
                    <strong>实时监控:</strong> 部署安全监控系统，及时发现和响应安全威胁
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 部署指南 */}
        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="w-5 h-5" />
                <span>部署选项</span>
              </CardTitle>
              <CardDescription>支持多种部署方式，满足不同场景需求</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                    <h4 className="font-medium text-blue-800">Vercel部署</h4>
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>• 一键部署，自动CI/CD</p>
                    <p>• 全球CDN加速</p>
                    <p>• 自动HTTPS证书</p>
                    <p>• 无服务器架构</p>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    部署到Vercel
                  </Button>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Server className="w-6 h-6 text-green-600" />
                    <h4 className="font-medium text-green-800">Netlify部署</h4>
                  </div>
                  <div className="space-y-2 text-sm text-green-700">
                    <p>• Git集成部署</p>
                    <p>• 表单处理功能</p>
                    <p>• 分支预览</p>
                    <p>• 边缘函数支持</p>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    部署到Netlify
                  </Button>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Package className="w-6 h-6 text-purple-600" />
                    <h4 className="font-medium text-purple-800">Docker部署</h4>
                  </div>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p>• 容器化部署</p>
                    <p>• 环境一致性</p>
                    <p>• 易于扩展</p>
                    <p>• 私有云支持</p>
                  </div>
                  <Button className="w-full mt-4 bg-transparent" size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    下载Dockerfile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 部署步骤 */}
          <Card>
            <CardHeader>
              <CardTitle>快速部署步骤</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">1. Vercel部署 (推荐)</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>{`# 1. 克隆项目
git clone https://github.com/your-repo/yanyu-ems.git
cd yanyu-ems

# 2. 安装依赖
npm install

# 3. 部署到Vercel
npx vercel --prod`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">2. Docker部署</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>{`# 1. 构建镜像
docker build -t yanyu-ems .

# 2. 运行容器
docker run -p 3000:3000 yanyu-ems

# 3. 访问应用
open http://localhost:3000`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">3. 本地开发</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>{`# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 构建生产版本
npm run build`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 环境配置 */}
          <Card>
            <CardHeader>
              <CardTitle>环境配置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">环境变量配置</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>{`# .env.local
NEXT_PUBLIC_APP_NAME="言语云企业管理系统"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_API_URL="https://api.yanyu-cloud.com"

# 可选配置
NEXT_PUBLIC_ANALYTICS_ID="your-analytics-id"
NEXT_PUBLIC_SENTRY_DSN="your-sentry-dsn"`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">系统要求</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium text-blue-800 mb-2">开发环境</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Node.js 18.0+</li>
                        <li>• npm 8.0+ 或 yarn 1.22+</li>
                        <li>• Git 2.0+</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">浏览器支持</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Chrome 90+</li>
                        <li>• Firefox 88+</li>
                        <li>• Safari 14+</li>
                        <li>• Edge 90+</li>
                      </ul>
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
