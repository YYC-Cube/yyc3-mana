"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Users, Shield, Key, UserPlus, Edit, Trash2, Eye, Lock } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
  permissions: string[]
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  isSystem: boolean
}

interface Permission {
  id: string
  name: string
  description: string
  category: string
  isSystem: boolean
}

export function PermissionManagement() {
  const [selectedTab, setSelectedTab] = useState("users")
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false)
  const [isCreateRoleDialogOpen, setIsCreateRoleDialogOpen] = useState(false)

  // 模拟用户数据
  const users: User[] = [
    {
      id: "1",
      name: "张经理",
      email: "zhang@company.com",
      role: "部门经理",
      department: "客服部",
      status: "active",
      lastLogin: "2025-06-21 14:30",
      permissions: ["customer_view", "customer_edit", "task_view", "task_create"],
    },
    {
      id: "2",
      name: "李总监",
      email: "li@company.com",
      role: "技术总监",
      department: "技术部",
      status: "active",
      lastLogin: "2025-06-21 13:45",
      permissions: ["system_admin", "user_manage", "data_export", "system_config"],
    },
    {
      id: "3",
      name: "王总监",
      email: "wang@company.com",
      role: "销售总监",
      department: "销售部",
      status: "active",
      lastLogin: "2025-06-21 12:20",
      permissions: ["sales_view", "sales_edit", "customer_view", "report_view"],
    },
    {
      id: "4",
      name: "陈专员",
      email: "chen@company.com",
      role: "普通员工",
      department: "财务部",
      status: "inactive",
      lastLogin: "2025-06-19 16:30",
      permissions: ["finance_view", "report_view"],
    },
  ]

  // 模拟角色数据
  const roles: Role[] = [
    {
      id: "1",
      name: "系统管理员",
      description: "拥有系统所有权限的超级管理员",
      permissions: ["system_admin", "user_manage", "role_manage", "data_export", "system_config"],
      userCount: 1,
      isSystem: true,
    },
    {
      id: "2",
      name: "部门经理",
      description: "部门管理权限，可管理本部门员工和业务",
      permissions: ["customer_view", "customer_edit", "task_view", "task_create", "team_manage"],
      userCount: 3,
      isSystem: false,
    },
    {
      id: "3",
      name: "销售总监",
      description: "销售业务管理权限",
      permissions: ["sales_view", "sales_edit", "customer_view", "customer_edit", "report_view"],
      userCount: 2,
      isSystem: false,
    },
    {
      id: "4",
      name: "普通员工",
      description: "基础业务操作权限",
      permissions: ["task_view", "customer_view", "report_view"],
      userCount: 8,
      isSystem: false,
    },
  ]

  // 模拟权限数据
  const permissions: Permission[] = [
    { id: "system_admin", name: "系统管理", description: "系统管理员权限", category: "系统", isSystem: true },
    { id: "user_manage", name: "用户管理", description: "管理用户账户", category: "系统", isSystem: true },
    { id: "role_manage", name: "角色管理", description: "管理用户角色", category: "系统", isSystem: true },
    { id: "customer_view", name: "客户查看", description: "查看客户信息", category: "业务", isSystem: false },
    { id: "customer_edit", name: "客户编辑", description: "编辑客户信息", category: "业务", isSystem: false },
    { id: "task_view", name: "任务查看", description: "查看任务信息", category: "业务", isSystem: false },
    { id: "task_create", name: "任务创建", description: "创建新任务", category: "业务", isSystem: false },
    { id: "sales_view", name: "销售查看", description: "查看销售数据", category: "业务", isSystem: false },
    { id: "sales_edit", name: "销售编辑", description: "编辑销售数据", category: "业务", isSystem: false },
    { id: "finance_view", name: "财务查看", description: "查看财务数据", category: "业务", isSystem: false },
    { id: "report_view", name: "报表查看", description: "查看各类报表", category: "报表", isSystem: false },
    { id: "data_export", name: "数据导出", description: "导出系统数据", category: "数据", isSystem: false },
    { id: "system_config", name: "系统配置", description: "修改系统配置", category: "系统", isSystem: true },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "活跃"
      case "inactive":
        return "停用"
      case "pending":
        return "待激活"
      default:
        return "未知"
    }
  }

  const getPermissionsByCategory = (category: string) => {
    return permissions.filter((p) => p.category === category)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">权限管理</h1>
          <p className="text-muted-foreground">用户角色与权限控制系统</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isCreateUserDialogOpen} onOpenChange={setIsCreateUserDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white border-0"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                添加用户
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新用户</DialogTitle>
                <DialogDescription>创建新的用户账户并分配角色</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">姓名</Label>
                  <Input id="name" placeholder="输入用户姓名" />
                </div>
                <div>
                  <Label htmlFor="email">邮箱</Label>
                  <Input id="email" type="email" placeholder="输入邮箱地址" />
                </div>
                <div>
                  <Label htmlFor="role">角色</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择用户角色" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">部门</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择所属部门" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">销售部</SelectItem>
                      <SelectItem value="service">客服部</SelectItem>
                      <SelectItem value="tech">技术部</SelectItem>
                      <SelectItem value="finance">财务部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateUserDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    onClick={() => setIsCreateUserDialogOpen(false)}
                    className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                  >
                    创建用户
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateRoleDialogOpen} onOpenChange={setIsCreateRoleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
                <Shield className="w-4 h-4 mr-2" />
                创建角色
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建新角色</DialogTitle>
                <DialogDescription>定义角色权限和描述</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="roleName">角色名称</Label>
                  <Input id="roleName" placeholder="输入角色名称" />
                </div>
                <div>
                  <Label htmlFor="roleDescription">角色描述</Label>
                  <Textarea id="roleDescription" placeholder="描述角色职责和权限范围" />
                </div>
                <div>
                  <Label>权限设置</Label>
                  <div className="space-y-4 mt-2">
                    {["系统", "业务", "报表", "数据"].map((category) => (
                      <div
                        key={category}
                        className="border border-sky-200 rounded-xl p-4 bg-white/80 backdrop-blur-sm shadow-sm"
                      >
                        <h4 className="font-medium mb-3">{category}权限</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {getPermissionsByCategory(category).map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Switch id={permission.id} />
                              <Label htmlFor={permission.id} className="text-sm">
                                {permission.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateRoleDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    onClick={() => setIsCreateRoleDialogOpen(false)}
                    className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                  >
                    创建角色
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 权限统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">活跃: {users.filter((u) => u.status === "active").length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">角色数量</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">自定义: {roles.filter((r) => !r.isSystem).length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">权限数量</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissions.length}</div>
            <p className="text-xs text-muted-foreground">系统: {permissions.filter((p) => p.isSystem).length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待处理</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">待激活用户</p>
          </CardContent>
        </Card>
      </div>

      {/* 详细管理 */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList>
          <TabsTrigger value="users">用户管理</TabsTrigger>
          <TabsTrigger value="roles">角色管理</TabsTrigger>
          <TabsTrigger value="permissions">权限管理</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>用户列表</CardTitle>
              <CardDescription>管理系统用户账户和权限</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="border border-sky-200 rounded-xl p-4 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{user.name}</h4>
                            <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>角色: {user.role}</span>
                            <span>部门: {user.department}</span>
                            <span>最后登录: {user.lastLogin}</span>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground mb-1">权限:</p>
                            <div className="flex flex-wrap gap-1">
                              {user.permissions.slice(0, 3).map((permission) => (
                                <Badge key={permission} variant="outline" className="text-xs">
                                  {permissions.find((p) => p.id === permission)?.name}
                                </Badge>
                              ))}
                              {user.permissions.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{user.permissions.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>角色管理</CardTitle>
              <CardDescription>管理用户角色和权限分配</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <Card
                    key={role.id}
                    className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          <CardDescription className="mt-1">{role.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {role.isSystem && <Badge variant="outline">系统角色</Badge>}
                          <Badge>{role.userCount} 用户</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">权限列表:</p>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map((permissionId) => (
                              <Badge key={permissionId} variant="secondary" className="text-xs">
                                {permissions.find((p) => p.id === permissionId)?.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            查看详情
                          </Button>
                          {!role.isSystem && (
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              编辑角色
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>权限管理</CardTitle>
              <CardDescription>系统权限定义和分类管理</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["系统", "业务", "报表", "数据"].map((category) => (
                  <div key={category}>
                    <h3 className="font-medium mb-3">{category}权限</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getPermissionsByCategory(category).map((permission) => (
                        <div
                          key={permission.id}
                          className="border border-sky-200 rounded-xl p-3 bg-white/80 backdrop-blur-sm shadow-sm"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{permission.name}</h4>
                              <p className="text-sm text-muted-foreground">{permission.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {permission.isSystem && (
                                <Badge variant="outline" className="text-xs">
                                  系统
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
