"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  PenTool,
  Save,
  RotateCcw,
  Download,
  Upload,
  CheckCircle,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Shield,
  Clock,
  User,
  FileText,
  Fingerprint,
  Lock,
  Zap,
} from "lucide-react"

// 签名类型枚举
const SignatureTypes = {
  HANDWRITTEN: "handwritten",
  TYPED: "typed",
  UPLOADED: "uploaded",
  BIOMETRIC: "biometric",
} as const

// 签名验证状态
const VerificationStatus = {
  PENDING: "pending",
  VERIFIED: "verified",
  FAILED: "failed",
  EXPIRED: "expired",
} as const

// 电子签名服务类
class ElectronicSignatureService {
  // 生成签名哈希
  static generateSignatureHash(signatureData, timestamp, userId) {
    const data = `${signatureData}-${timestamp}-${userId}`
    // 简化的哈希生成（实际应用中应使用加密库）
    return btoa(data)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 32)
  }

  // 验证签名完整性
  static verifySignature(signature) {
    const { hash, timestamp, userId, data } = signature
    const expectedHash = this.generateSignatureHash(data, timestamp, userId)
    return hash === expectedHash
  }

  // 获取设备信息
  static getDeviceInfo() {
    const userAgent = navigator.userAgent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent)

    return {
      type: isMobile ? (isTablet ? "tablet" : "mobile") : "desktop",
      userAgent: userAgent,
      timestamp: new Date().toISOString(),
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }
  }

  // 创建签名记录
  static createSignatureRecord(signatureData, type, userId, documentId) {
    const timestamp = new Date().toISOString()
    const deviceInfo = this.getDeviceInfo()
    const hash = this.generateSignatureHash(signatureData, timestamp, userId)

    return {
      id: `sig_${Date.now()}`,
      documentId,
      userId,
      type,
      data: signatureData,
      hash,
      timestamp,
      deviceInfo,
      ipAddress: "192.168.1.100", // 实际应用中从服务器获取
      status: VerificationStatus.VERIFIED,
      metadata: {
        signatureBox: this.getSignatureBox(),
        quality: this.assessSignatureQuality(signatureData, type),
      },
    }
  }

  // 获取签名区域信息
  static getSignatureBox() {
    return {
      x: 0,
      y: 0,
      width: 400,
      height: 200,
    }
  }

  // 评估签名质量
  static assessSignatureQuality(data, type) {
    switch (type) {
      case SignatureTypes.HANDWRITTEN:
        return data.length > 100 ? "high" : data.length > 50 ? "medium" : "low"
      case SignatureTypes.TYPED:
        return data.length > 2 ? "high" : "low"
      case SignatureTypes.UPLOADED:
        return "medium"
      default:
        return "unknown"
    }
  }
}

// 手写签名画板组件
function SignaturePad({ onSignatureChange, disabled = false }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [signatureData, setSignatureData] = useState("")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    // 设置画布大小
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }, [])

  const startDrawing = (e) => {
    if (disabled) return
    setIsDrawing(true)
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")

    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing || disabled) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")

    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)

    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL()
    setSignatureData(dataURL)
    onSignatureChange(dataURL)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignatureData("")
    onSignatureChange("")
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        <canvas
          ref={canvasRef}
          className="w-full h-48 bg-white rounded border cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ touchAction: "none" }}
        />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">请在上方区域签名</p>
        <Button variant="outline" size="sm" onClick={clearSignature} disabled={disabled}>
          <RotateCcw className="w-4 h-4 mr-2" />
          清除
        </Button>
      </div>
    </div>
  )
}

// 移动端优化的签名组件
function MobileSignaturePad({ onSignatureChange, disabled = false }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPoint, setLastPoint] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 3 // 移动端使用更粗的线条
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    // 移动端优化的画布设置
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    // 禁用默认的���摸行为
    canvas.addEventListener("touchstart", (e) => e.preventDefault())
    canvas.addEventListener("touchmove", (e) => e.preventDefault())
    canvas.addEventListener("touchend", (e) => e.preventDefault())
  }, [])

  const getEventPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    return {
      x: ((clientX - rect.left) * (canvas.width / rect.width)) / 2,
      y: ((clientY - rect.top) * (canvas.height / rect.height)) / 2,
    }
  }

  const startDrawing = (e) => {
    if (disabled) return
    e.preventDefault()
    setIsDrawing(true)

    const pos = getEventPos(e)
    setLastPoint(pos)

    const ctx = canvasRef.current.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw = (e) => {
    if (!isDrawing || disabled) return
    e.preventDefault()

    const pos = getEventPos(e)
    const ctx = canvasRef.current.getContext("2d")

    if (lastPoint) {
      ctx.beginPath()
      ctx.moveTo(lastPoint.x, lastPoint.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }

    setLastPoint(pos)
  }

  const stopDrawing = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    setIsDrawing(false)
    setLastPoint(null)

    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL()
    onSignatureChange(dataURL)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    onSignatureChange("")
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50">
        <canvas
          ref={canvasRef}
          className="w-full h-64 bg-white rounded border touch-none"
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{ touchAction: "none" }}
        />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">请用手指在上方区域签名</p>
        <Button variant="outline" size="sm" onClick={clearSignature} disabled={disabled}>
          <RotateCcw className="w-4 h-4 mr-2" />
          清除
        </Button>
      </div>
    </div>
  )
}

// 主要的电子签名组件
export function ElectronicSignature({ documentId, onSignatureComplete, onClose, isMobile = false }) {
  const [activeTab, setActiveTab] = useState("handwritten")
  const [signatureData, setSignatureData] = useState("")
  const [typedSignature, setTypedSignature] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [signatureRecords, setSignatureRecords] = useState([])
  const [selectedFont, setSelectedFont] = useState("cursive")

  const deviceInfo = ElectronicSignatureService.getDeviceInfo()

  // 处理手写签名
  const handleHandwrittenSignature = (data) => {
    setSignatureData(data)
  }

  // 处理文字签名
  const handleTypedSignature = (text) => {
    setTypedSignature(text)
    // 生成文字签名的数据URL
    const canvas = document.createElement("canvas")
    canvas.width = 400
    canvas.height = 100
    const ctx = canvas.getContext("2d")

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#000000"
    ctx.font = `40px ${selectedFont}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    setSignatureData(canvas.toDataURL())
  }

  // 处理文件上传
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSignatureData(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // 完成签名
  const handleCompleteSignature = async () => {
    if (!signatureData) {
      alert("请先完成签名")
      return
    }

    setIsProcessing(true)

    try {
      // 创建签名记录
      const signatureRecord = ElectronicSignatureService.createSignatureRecord(
        signatureData,
        activeTab,
        "current_user",
        documentId,
      )

      // 模拟处理延迟
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSignatureRecords((prev) => [...prev, signatureRecord])

      if (onSignatureComplete) {
        onSignatureComplete(signatureRecord)
      }

      // 重置状态
      setSignatureData("")
      setTypedSignature("")
      setUploadedFile(null)
    } catch (error) {
      console.error("签名处理失败:", error)
      alert("签名处理失败，请重试")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isMobile ? "w-[95vw]" : ""}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <PenTool className="w-5 h-5" />
            <span>电子签名</span>
            {deviceInfo.type !== "desktop" && (
              <Badge variant="outline" className="ml-2">
                {deviceInfo.type === "mobile" ? (
                  <Smartphone className="w-3 h-3 mr-1" />
                ) : (
                  <Tablet className="w-3 h-3 mr-1" />
                )}
                {deviceInfo.type === "mobile" ? "移动端" : "平板端"}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>请选择签名方式并完成电子签名，签名将被加密存储并具有法律效力</DialogDescription>
        </DialogHeader>

        {/* 设备信息提示 */}
        <Alert className="bg-blue-50 border-blue-200">
          <Shield className="w-4 h-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>安全签名环境已启用</span>
              <div className="flex items-center space-x-2 text-xs text-blue-600">
                {deviceInfo.type === "desktop" && <Monitor className="w-3 h-3" />}
                {deviceInfo.type === "mobile" && <Smartphone className="w-3 h-3" />}
                {deviceInfo.type === "tablet" && <Tablet className="w-3 h-3" />}
                <span>
                  {deviceInfo.type === "desktop" ? "桌面端" : deviceInfo.type === "mobile" ? "移动端" : "平板端"}
                </span>
                <Separator orientation="vertical" className="h-3" />
                <Lock className="w-3 h-3" />
                <span>SSL加密</span>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full ${isMobile ? "grid-cols-2" : "grid-cols-4"}`}>
            <TabsTrigger value="handwritten" className="flex items-center space-x-1">
              <PenTool className="w-4 h-4" />
              <span className={isMobile ? "hidden sm:inline" : ""}>手写签名</span>
            </TabsTrigger>
            <TabsTrigger value="typed" className="flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span className={isMobile ? "hidden sm:inline" : ""}>文字签名</span>
            </TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="uploaded" className="flex items-center space-x-1">
                  <Upload className="w-4 h-4" />
                  <span>上传签名</span>
                </TabsTrigger>
                <TabsTrigger value="biometric" className="flex items-center space-x-1">
                  <Fingerprint className="w-4 h-4" />
                  <span>生物识别</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="handwritten" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">手写签名</CardTitle>
              </CardHeader>
              <CardContent>
                {isMobile ? (
                  <MobileSignaturePad onSignatureChange={handleHandwrittenSignature} disabled={isProcessing} />
                ) : (
                  <SignaturePad onSignatureChange={handleHandwrittenSignature} disabled={isProcessing} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">文字签名</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="signature-text">签名文字</Label>
                  <Input
                    id="signature-text"
                    value={typedSignature}
                    onChange={(e) => handleTypedSignature(e.target.value)}
                    placeholder="请输入您的姓名"
                    className="text-lg"
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <Label htmlFor="font-select">字体样式</Label>
                  <Select value={selectedFont} onValueChange={setSelectedFont}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cursive">手写体</SelectItem>
                      <SelectItem value="serif">衬线体</SelectItem>
                      <SelectItem value="sans-serif">无衬线体</SelectItem>
                      <SelectItem value="monospace">等宽体</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {typedSignature && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-2">签名预览：</p>
                    <div
                      className="text-4xl text-center py-4 bg-white border rounded"
                      style={{ fontFamily: selectedFont }}
                    >
                      {typedSignature}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {!isMobile && (
            <>
              <TabsContent value="uploaded" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">上传签名图片</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="signature-upload">选择签名图片</Label>
                      <Input
                        id="signature-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isProcessing}
                      />
                      <p className="text-sm text-gray-600 mt-1">支持 JPG、PNG 格式，建议尺寸 400x200 像素</p>
                    </div>

                    {uploadedFile && (
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <p className="text-sm text-gray-600 mb-2">上传的签名：</p>
                        <div className="bg-white border rounded p-4 text-center">
                          <img
                            src={signatureData || "/placeholder.svg"}
                            alt="上传的签名"
                            className="max-h-24 mx-auto"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="biometric" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">生物识别签名</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <Fingerprint className="w-4 h-4" />
                      <AlertDescription>
                        生物识别功能需要支持的硬件设备。请确保您的设备支持指纹识别或面部识别功能。
                      </AlertDescription>
                    </Alert>

                    <div className="text-center py-8">
                      <Fingerprint className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">生物识别功能开发中...</p>
                      <Button variant="outline" className="mt-4" disabled>
                        启用生物识别
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>

        {/* 签名预览 */}
        {signatureData && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>签名预览</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-4 text-center">
                <img src={signatureData || "/placeholder.svg"} alt="签名预览" className="max-h-32 mx-auto border" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">签名类型：</span>
                  <span className="font-medium">
                    {activeTab === "handwritten"
                      ? "手写签名"
                      : activeTab === "typed"
                        ? "文字签名"
                        : activeTab === "uploaded"
                          ? "上传签名"
                          : "生物识别"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">设备类型：</span>
                  <span className="font-medium">
                    {deviceInfo.type === "desktop" ? "桌面端" : deviceInfo.type === "mobile" ? "移动端" : "平板端"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            取消
          </Button>

          <div className="flex space-x-2">
            {signatureData && (
              <Button
                variant="outline"
                onClick={() => {
                  const link = document.createElement("a")
                  link.download = `signature-${Date.now()}.png`
                  link.href = signatureData
                  link.click()
                }}
                disabled={isProcessing}
              >
                <Download className="w-4 h-4 mr-2" />
                下载
              </Button>
            )}

            <Button
              onClick={handleCompleteSignature}
              disabled={!signatureData || isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  完成签名
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 签名记录查看组件
export function SignatureRecordViewer({ signatures, onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>签名记录</span>
          </DialogTitle>
          <DialogDescription>查看所有电子签名记录和验证信息</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {signatures.map((signature, index) => (
            <Card key={signature.id} className="border-l-4 border-l-green-400">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-12 border rounded bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={signature.data || "/placeholder.svg"}
                        alt="签名"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          已验证
                        </Badge>
                        <Badge variant="outline">
                          {signature.type === "handwritten"
                            ? "手写"
                            : signature.type === "typed"
                              ? "文字"
                              : signature.type === "uploaded"
                                ? "上传"
                                : "生物识别"}
                        </Badge>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3" />
                          <span>签名人：{signature.userId}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3" />
                          <span>签名时间：{new Date(signature.timestamp).toLocaleString("zh-CN")}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {signature.deviceInfo.type === "desktop" && <Monitor className="w-3 h-3" />}
                          {signature.deviceInfo.type === "mobile" && <Smartphone className="w-3 h-3" />}
                          {signature.deviceInfo.type === "tablet" && <Tablet className="w-3 h-3" />}
                          <span>
                            设备：
                            {signature.deviceInfo.type === "desktop"
                              ? "桌面端"
                              : signature.deviceInfo.type === "mobile"
                                ? "移动端"
                                : "平板端"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-sm text-gray-500">
                    <div>签名ID：{signature.id}</div>
                    <div>哈希：{signature.hash.substring(0, 8)}...</div>
                    <div>质量：{signature.metadata.quality}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {signatures.length === 0 && (
            <div className="text-center py-8">
              <PenTool className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无签名记录</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
