"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CheckSquare, Clock, Plus, Calendar, Flag, User } from "lucide-react"

export function TaskModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">任务管理中心</h1>
          <p className="text-muted-foreground">高效的项目协作和任务跟踪系统</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            新建任务
          </Button>
          <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            项目看板
          </Button>
        </div>
      </div>

      {/* 任务概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总任务数</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-blue-600">
              <Calendar className="w-3 h-3 mr-1" />
              <span>本月任务</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已完成</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center text-xs text-green-600">
              <CheckSquare className="w-3 h-3 mr-1" />
              <span>完成率 57.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">进行中</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <div className="flex items-center text-xs text-orange-600">
              <Clock className="w-3 h-3 mr-1" />
              <span>活跃任务</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">逾期任务</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center text-xs text-red-600">
              <Flag className="w-3 h-3 mr-1" />
              <span>需要关注</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 任务管理详情 */}
      <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle>任务管理详情</CardTitle>
          <CardDescription>全面的任务跟踪和项目协作</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active">进行中</TabsTrigger>
              <TabsTrigger value="completed">已完成</TabsTrigger>
              <TabsTrigger value="overdue">逾期任务</TabsTrigger>
              <TabsTrigger value="team">团队协作</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="flex justify-between items-center">
                <Input placeholder="搜索任务..." className="max-w-sm" />
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    筛选
                  </Button>
                  <Button variant="outline" size="sm">
                    排序
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "客户管理系统优化",
                    project: "CRM项目",
                    assignee: "张三",
                    priority: "高",
                    progress: 75,
                    dueDate: "2024-01-20",
                  },
                  {
                    title: "移动端界面设计",
                    project: "APP开发",
                    assignee: "李四",
                    priority: "中",
                    progress: 45,
                    dueDate: "2024-01-25",
                  },
                  {
                    title: "数据库性能优化",
                    project: "系统升级",
                    assignee: "王五",
                    priority: "高",
                    progress: 60,
                    dueDate: "2024-01-18",
                  },
                  {
                    title: "用户反馈处理",
                    project: "产品维护",
                    assignee: "赵六",
                    priority: "低",
                    progress: 30,
                    dueDate: "2024-01-30",
                  },
                ].map((task, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{task.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{task.project}</span>
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {task.assignee}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {task.dueDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              task.priority === "高" ? "destructive" : task.priority === "中" ? "default" : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>
                          <Button variant="outline" size="sm">
                            详情
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>进度</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    title: "用户登录功能开发",
                    project: "Web平台",
                    assignee: "张三",
                    completedDate: "2024-01-15",
                    duration: "5天",
                  },
                  {
                    title: "支付接口集成",
                    project: "电商系统",
                    assignee: "李四",
                    completedDate: "2024-01-12",
                    duration: "3天",
                  },
                  {
                    title: "数据报表设计",
                    project: "BI系统",
                    assignee: "王五",
                    completedDate: "2024-01-10",
                    duration: "7天",
                  },
                ].map((task, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <CheckSquare className="w-5 h-5 text-green-600" />
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{task.project}</span>
                              <div className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {task.assignee}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">已完成</div>
                          <div className="text-xs text-muted-foreground">{task.completedDate}</div>
                          <div className="text-xs text-muted-foreground">耗时: {task.duration}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="overdue" className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    title: "系统安全审计",
                    project: "安全项目",
                    assignee: "张三",
                    dueDate: "2024-01-10",
                    overdueDays: 5,
                  },
                  {
                    title: "API文档更新",
                    project: "开发文档",
                    assignee: "李四",
                    dueDate: "2024-01-08",
                    overdueDays: 7,
                  },
                  {
                    title: "性能测试报告",
                    project: "测试项目",
                    assignee: "王五",
                    dueDate: "2024-01-12",
                    overdueDays: 3,
                  },
                ].map((task, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Flag className="w-5 h-5 text-red-600" />
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{task.project}</span>
                              <div className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {task.assignee}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="destructive">逾期 {task.overdueDays} 天</Badge>
                          <div className="text-xs text-muted-foreground mt-1">截止: {task.dueDate}</div>
                          <Button variant="outline" size="sm" className="mt-2">
                            立即处理
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "张三", role: "前端开发", tasks: 12, completed: 8, avatar: "Z" },
                  { name: "李四", role: "后端开发", tasks: 15, completed: 11, avatar: "L" },
                  { name: "王五", role: "UI设计师", tasks: 8, completed: 6, avatar: "W" },
                  { name: "赵六", role: "测试工程师", tasks: 10, completed: 9, avatar: "Z" },
                  { name: "钱七", role: "产品经理", tasks: 6, completed: 4, avatar: "Q" },
                  { name: "孙八", role: "项目经理", tasks: 5, completed: 5, avatar: "S" },
                ].map((member, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {member.avatar}
                        </div>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>任务进度</span>
                          <span>
                            {member.completed}/{member.tasks}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                            style={{ width: `${(member.completed / member.tasks) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          完成率: {Math.round((member.completed / member.tasks) * 100)}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
