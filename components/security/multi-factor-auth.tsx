"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Shield,
  Smartphone,
  Mail,
  Key,
  QrCode,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  Settings,
  Lock,
} from "lucide-react"

interface MFAMethod {
  id: string
  type: "totp" | "sms" | "email" | "backup"
  name: string
  description: string
  isEnabled: boolean
  isVerified: boolean
  lastUsed?: Date
  createdAt: Date
}

interface SecurityEvent {
  id: string
  type: "login" | "mfa_setup" | "mfa_verify" | "device_trust" | "suspicious"
  description: string
  ip: string
  device: string
  location: string
  timestamp: Date
  status: "success" | "failed" | "blocked"
}

interface TrustedDevice {
  id: string
  name: string
  type: "desktop" | "mobile" | "tablet"
  browser: string
  os: string
  ip: string
  lastAccess: Date
  isTrusted: boolean
  fingerprint: string
}

export function MultiFactorAuth() {
  const [mfaMethods, setMfaMethods] = useState<MFAMethod[]>([
    {
      id: "1",
      type: "totp",
      name: "身份验证器应用",
      description: "使用 Google Authenticator 或类似应用",
      isEnabled: true,
      isVerified: true,
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      type: "sms",
      name: "短信验证",
      description: "发送验证码到手机 +86 138****8888",
      isEnabled: true,
      isVerified: true,
      lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      type: "email",
      name: "邮箱验证",
      description: "发送验证码到 user@example.com",
      isEnabled: false,
      isVerified: false,
      createdAt: new Date(),
    },
    {
      id: "4",
      type: "backup",
      name: "备用代码",
      description: "一次性备用验证码",
      isEnabled: true,
      isVerified: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ])

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: "1",
      type: "login",
      description: "用户登录成功",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      location: "北京, 中国",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: "success",
    },
    {
      id: "2",
      type: "mfa_verify",
      description: "多因子认证验证成功",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      location: "北京, 中国",
      timestamp: new Date(Date.now() - 35 * 60 * 1000),
      status: "success",
    },
    {
      id: "3",
      type: "suspicious",
      description: "检测到异常登录尝试",
      ip: "203.0.113.1",
      device: "Unknown",
      location: "未知位置",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "blocked",
    },
  ])

  const [trustedDevices, setTrustedDevices] = useState<TrustedDevice[]>([
    {
      id: "1",
      name: "我的工作电脑",
      type: "desktop",
      browser: "Chrome 120.0",
      os: "Windows 11",
      ip: "192.168.1.100",
      lastAccess: new Date(Date.now() - 30 * 60 * 1000),
      isTrusted: true,
      fingerprint: "fp_abc123",
    },
    {
      id: "2",
      name: "iPhone 15",
      type: "mobile",
      browser: "Safari 17.0",
      os: "iOS 17.2",
      ip: "192.168.1.101",
      lastAccess: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isTrusted: true,
      fingerprint: "fp_def456",
    },
  ])

  const [qrCode, setQrCode] = useState("")
  const [backupCodes, setBackupCodes] = useState([
    "ABC123DEF",
    "GHI456JKL",
    "MNO789PQR",
    "STU012VWX",
    "YZ345ABC6",
    "DEF789GHI",
    "JKL012MNO",
    "PQR345STU",
    "VWX678YZ9",
    "ABC901DEF",
  ])
  const [isSetupDialogOpen, setIsSetupDialogOpen] = useState(false)
  const [setupStep, setSetupStep] = useState(1)

  const getMethodIcon = (type: MFAMethod["type"]) => {
    switch (type) {
      case "totp":
        return <Smartphone className="w-5 h-5" />
      case "sms":
        return <Smartphone className="w-5 h-5" />
      case "email":
        return <Mail className="w-5 h-5" />
      case "backup":
        return <Key className="w-5 h-5" />
    }
  }

  const getStatusBadge = (method: MFAMethod) => {
    if (!method.isEnabled) {
      return <Badge variant="secondary">未启用</Badge>
    }
    if (!method.isVerified) {
      return <Badge variant="destructive">未验证</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">已启用</Badge>
  }

  const getEventStatusIcon = (status: SecurityEvent["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "blocked":
        return <Shield className="w-4 h-4 text-orange-600" />
    }
  }

  const generateQRCode = () => {
    // 模拟生成 QR 码
    setQrCode("otpauth://totp/Enterprise%20System:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Enterprise%20System")
  }

  const generateBackupCodes = () => {
    const newCodes = Array.from({ length: 10 }, () => Math.random().toString(36).substring(2, 11).toUpperCase())
    setBackupCodes(newCodes)
  }

  const toggleMethod = (methodId: string) => {
    setMfaMethods((prev) =>
      prev.map((method) => (method.id === methodId ? { ...method, isEnabled: !method.isEnabled } : method)),
    )
  }

  const removeTrustedDevice = (deviceId: string) => {
    setTrustedDevices((prev) => prev.filter((device) => device.id !== deviceId))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">多因子认证</h1>
          <p className="text-muted-foreground">增强账户安全性，保护企业数据</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            安全报告
          </Button>
          <Dialog open={isSetupDialogOpen} onOpenChange={setIsSetupDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
                <Shield className="w-4 h-4 mr-2" />
                设置MFA
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>设置多因子认证</DialogTitle>
                <DialogDescription>选择认证方式以增强账户安全</DialogDescription>
              </DialogHeader>
              <MFASetupDialog
                step={setupStep}
                onStepChange={setSetupStep}
                onClose={() => setIsSetupDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 安全状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MFA状态</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">已启用</div>
            <p className="text-xs text-muted-foreground">{mfaMethods.filter((m) => m.isEnabled).length} 种方式已配置</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">受信任设备</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trustedDevices.length}</div>
            <p className="text-xs text-muted-foreground">已授权的设备</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">安全事件</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {securityEvents.filter((e) => e.status === "blocked").length}
            </div>
            <p className="text-xs text-muted-foreground">今日被阻止的尝试</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">最后验证</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30分钟前</div>
            <p className="text-xs text-muted-foreground">TOTP验证成功</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="methods">认证方式</TabsTrigger>
          <TabsTrigger value="devices">受信任设备</TabsTrigger>
          <TabsTrigger value="events">安全日志</TabsTrigger>
          <TabsTrigger value="settings">高级设置</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mfaMethods.map((method) => (
              <Card key={method.id} className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getMethodIcon(method.type)}
                      <div>
                        <CardTitle className="text-base">{method.name}</CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(method)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {method.lastUsed && (
                      <p className="text-sm text-muted-foreground">
                        最后使用: {method.lastUsed.toLocaleString("zh-CN")}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch checked={method.isEnabled} onCheckedChange={() => toggleMethod(method.id)} />
                        <Label>启用此方式</Label>
                      </div>

                      <div className="flex space-x-2">
                        {method.type === "backup" && method.isEnabled && (
                          <Button variant="outline" size="sm">
                            <Key className="w-4 h-4 mr-2" />
                            查看代码
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          设置
                        </Button>
                      </div>
                    </div>

                    {method.type === "totp" && method.isEnabled && !method.isVerified && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>请完成身份验证器应用的设置以启用此功能</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>受信任设备管理</CardTitle>
              <CardDescription>管理已授权访问的设备</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trustedDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {device.type === "desktop" ? (
                          <Settings className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Smartphone className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{device.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {device.browser} • {device.os}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          最后访问: {device.lastAccess.toLocaleString("zh-CN")} • IP: {device.ip}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={device.isTrusted ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {device.isTrusted ? "已信任" : "未信任"}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => removeTrustedDevice(device.id)}>
                        移除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>安全事件日志</CardTitle>
              <CardDescription>查看最近的安全相关活动</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    {getEventStatusIcon(event.status)}
                    <div className="flex-1">
                      <h4 className="font-medium">{event.description}</h4>
                      <div className="text-sm text-muted-foreground mt-1">
                        <p>设备: {event.device}</p>
                        <p>
                          位置: {event.location} • IP: {event.ip}
                        </p>
                        <p>时间: {event.timestamp.toLocaleString("zh-CN")}</p>
                      </div>
                    </div>
                    <Badge
                      className={
                        event.status === "success"
                          ? "bg-green-100 text-green-800"
                          : event.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-orange-100 text-orange-800"
                      }
                    >
                      {event.status === "success" ? "成功" : event.status === "failed" ? "失败" : "已阻止"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>安全策略</CardTitle>
                <CardDescription>配置安全相关设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>强制MFA</Label>
                    <p className="text-sm text-muted-foreground">要求所有用户启用多因子认证</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>记住设备</Label>
                    <p className="text-sm text-muted-foreground">在受信任设备上30天内免验证</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>异常登录检测</Label>
                    <p className="text-sm text-muted-foreground">检测并阻止可疑登录尝试</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>登录通知</Label>
                    <p className="text-sm text-muted-foreground">新设备登录时发送邮件通知</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>会话管理</CardTitle>
                <CardDescription>管理活动会话和超时设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>会话超时时间</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>30分钟</option>
                    <option>1小时</option>
                    <option>2小时</option>
                    <option>4小时</option>
                    <option>8小时</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>最大并发会话</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>1个设备</option>
                    <option>3个设备</option>
                    <option>5个设备</option>
                    <option>无限制</option>
                  </select>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  终止所有其他会话
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MFASetupDialog({
  step,
  onStepChange,
  onClose,
}: {
  step: number
  onStepChange: (step: number) => void
  onClose: () => void
}) {
  const [verificationCode, setVerificationCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  return (
    <div className="space-y-4">
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-medium">选择认证方式</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => onStepChange(2)}>
              <Smartphone className="w-4 h-4 mr-2" />
              身份验证器应用 (推荐)
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => onStepChange(3)}>
              <Smartphone className="w-4 h-4 mr-2" />
              短信验证
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => onStepChange(4)}>
              <Mail className="w-4 h-4 mr-2" />
              邮箱验证
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-medium">设置身份验证器</h3>
          <div className="text-center space-y-4">
            <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
            <p className="text-sm text-muted-foreground">使用身份验证器应用扫描二维码</p>
            <div className="space-y-2">
              <Label>验证码</Label>
              <Input
                placeholder="输入6位验证码"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onStepChange(1)}>
                返回
              </Button>
              <Button onClick={onClose}>验证并启用</Button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-medium">设置短信验证</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>手机号码</Label>
              <Input placeholder="输入手机号码" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <Button className="w-full">发送验证码</Button>
            <div className="space-y-2">
              <Label>验证码</Label>
              <Input
                placeholder="输入6位验证码"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onStepChange(1)}>
                返回
              </Button>
              <Button onClick={onClose}>验证并启用</Button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-medium">设置邮箱验证</h3>
          <div className="space-y-4">
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>验证码已发送到您的邮箱 user@example.com</AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label>验证码</Label>
              <Input
                placeholder="输入6位验证码"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onStepChange(1)}>
                返回
              </Button>
              <Button onClick={onClose}>验证并启用</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
