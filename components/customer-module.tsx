"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, Phone, Mail, TrendingUp, Star, Calendar } from "lucide-react"

export function CustomerModule() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">客户管理中心</h1>
          <p className="text-muted-foreground">全面的客户关系管理系统</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white border-0"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            添加客户
          </Button>
          <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            客户分析
          </Button>
        </div>
      </div>

      {/* 客户概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总客户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+12.5% 较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃客户</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>活跃度 71.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新增客户</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-blue-600">
              <Calendar className="w-3 h-3 mr-1" />
              <span>本月新增</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">客户满意度</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center text-xs text-green-600">
              <Star className="w-3 h-3 mr-1" />
              <span>优秀评级</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 客户管理详情 */}
      <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle>客户管理详情</CardTitle>
          <CardDescription>全面的客户信息管理和分析</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="list">客户列表</TabsTrigger>
              <TabsTrigger value="analysis">客户分析</TabsTrigger>
              <TabsTrigger value="follow">跟进记录</TabsTrigger>
              <TabsTrigger value="opportunity">销售机会</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <div className="flex justify-between items-center">
                <Input placeholder="搜索客户..." className="max-w-sm" />
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    筛选
                  </Button>
                  <Button variant="outline" size="sm">
                    导出
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "张三",
                    company: "科技有限公司",
                    phone: "138****1234",
                    email: "zhang@tech.com",
                    status: "活跃",
                    value: "¥125,000",
                  },
                  {
                    name: "李四",
                    company: "贸易集团",
                    phone: "139****5678",
                    email: "li@trade.com",
                    status: "潜在",
                    value: "¥89,000",
                  },
                  {
                    name: "王五",
                    company: "制造企业",
                    phone: "137****9012",
                    email: "wang@manu.com",
                    status: "活跃",
                    value: "¥234,000",
                  },
                  {
                    name: "赵六",
                    company: "服务公司",
                    phone: "136****3456",
                    email: "zhao@service.com",
                    status: "休眠",
                    value: "¥45,000",
                  },
                ].map((customer, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium">{customer.name}</h3>
                            <p className="text-sm text-muted-foreground">{customer.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="w-3 h-3 mr-1" />
                              {customer.phone}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="w-3 h-3 mr-1" />
                              {customer.email}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                customer.status === "活跃"
                                  ? "default"
                                  : customer.status === "潜在"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {customer.status}
                            </Badge>
                            <div className="text-sm font-medium mt-1">{customer.value}</div>
                          </div>
                          <Button variant="outline" size="sm">
                            详情
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">客户分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">企业客户</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-3/5 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">个人客户</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div className="w-2/5 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-base">地区分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">华东地区</span>
                        <Badge variant="secondary">35%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">华南地区</span>
                        <Badge variant="secondary">28%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">华北地区</span>
                        <Badge variant="secondary">22%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">其他地区</span>
                        <Badge variant="secondary">15%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="follow" className="space-y-4">
              <div className="space-y-3">
                {[
                  { customer: "张三", action: "电话沟通", time: "2小时前", status: "已完成", note: "讨论了新产品需求" },
                  { customer: "李四", action: "邮件跟进", time: "1天前", status: "待回复", note: "发送了产品报价单" },
                  { customer: "王五", action: "现场拜访", time: "3天前", status: "已完成", note: "签署了合作意向书" },
                  { customer: "赵六", action: "微信沟通", time: "1周前", status: "需跟进", note: "客户表示需要考虑" },
                ].map((record, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{record.customer}</h4>
                            <Badge variant="outline">{record.action}</Badge>
                            <span className="text-sm text-muted-foreground">{record.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{record.note}</p>
                        </div>
                        <Badge
                          variant={
                            record.status === "已完成"
                              ? "default"
                              : record.status === "待回复"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {record.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="opportunity" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "企业ERP系统",
                    customer: "科技有限公司",
                    value: "¥500,000",
                    stage: "需求分析",
                    probability: "70%",
                  },
                  {
                    title: "数字化转型项目",
                    customer: "制造企业",
                    value: "¥800,000",
                    stage: "方案设计",
                    probability: "85%",
                  },
                  {
                    title: "云服务采购",
                    customer: "贸易集团",
                    value: "¥200,000",
                    stage: "商务谈判",
                    probability: "60%",
                  },
                  {
                    title: "系统集成服务",
                    customer: "服务公司",
                    value: "¥300,000",
                    stage: "初步接触",
                    probability: "30%",
                  },
                ].map((opportunity, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{opportunity.title}</CardTitle>
                      <CardDescription>{opportunity.customer}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">预期价值</span>
                          <span className="font-medium">{opportunity.value}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">当前阶段</span>
                          <Badge variant="outline">{opportunity.stage}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">成功概率</span>
                          <span className="font-medium text-green-600">{opportunity.probability}</span>
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
