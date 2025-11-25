"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Printer,
} from "lucide-react"

interface Invoice {
  id: string
  number: string
  customerName: string
  customerEmail: string
  issueDate: string
  dueDate: string
  amount: number
  taxAmount: number
  totalAmount: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  items: InvoiceItem[]
}

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  taxRate: number
  amount: number
}

export function InvoiceManagement() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      number: "INV-2024-001",
      customerName: "北京科技有限公司",
      customerEmail: "finance@bjtech.com",
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      amount: 10000,
      taxAmount: 1300,
      totalAmount: 11300,
      status: "paid",
      items: [
        {
          id: "1",
          description: "软件开发服务",
          quantity: 1,
          unitPrice: 10000,
          taxRate: 0.13,
          amount: 10000,
        },
      ],
    },
    {
      id: "INV-002",
      number: "INV-2024-002",
      customerName: "上海贸易公司",
      customerEmail: "accounting@shtrade.com",
      issueDate: "2024-01-20",
      dueDate: "2024-02-20",
      amount: 25000,
      taxAmount: 3250,
      totalAmount: 28250,
      status: "sent",
      items: [
        {
          id: "1",
          description: "系统集成服务",
          quantity: 1,
          unitPrice: 25000,
          taxRate: 0.13,
          amount: 25000,
        },
      ],
    },
    {
      id: "INV-003",
      number: "INV-2024-003",
      customerName: "深圳制造企业",
      customerEmail: "finance@szmfg.com",
      issueDate: "2024-01-25",
      dueDate: "2024-01-25",
      amount: 15000,
      taxAmount: 1950,
      totalAmount: 16950,
      status: "overdue",
      items: [
        {
          id: "1",
          description: "技术咨询服务",
          quantity: 1,
          unitPrice: 15000,
          taxRate: 0.13,
          amount: 15000,
        },
      ],
    },
  ])

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const getStatusBadge = (status: Invoice["status"]) => {
    const statusConfig = {
      draft: { label: "草稿", className: "bg-gray-100 text-gray-800" },
      sent: { label: "已发送", className: "bg-emerald-100 text-emerald-800" },
      paid: { label: "已付款", className: "bg-green-100 text-green-800" },
      overdue: { label: "逾期", className: "bg-red-100 text-red-800" },
      cancelled: { label: "已取消", className: "bg-gray-100 text-gray-800" },
    }

    const config = statusConfig[status]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "sent":
        return <Clock className="w-4 h-4 text-emerald-600" />
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalStats = {
    total: invoices.length,
    paid: invoices.filter((inv) => inv.status === "paid").length,
    pending: invoices.filter((inv) => inv.status === "sent").length,
    overdue: invoices.filter((inv) => inv.status === "overdue").length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
    paidAmount: invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.totalAmount, 0),
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-emerald-600" />
            发票管理
          </h1>
          <p className="text-gray-600 mt-2">管理企业发票的创建、发送和跟踪</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Download className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            导出数据
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                创建发票
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>创建新发票</DialogTitle>
                <DialogDescription>填写发票信息并添加项目明细</DialogDescription>
              </DialogHeader>
              <CreateInvoiceForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">发票总数</CardTitle>
            <FileText className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">{totalStats.total}</div>
            <p className="text-xs text-gray-600">本月新增 +12</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已付款</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalStats.paid}</div>
            <p className="text-xs text-gray-600">付款率 {Math.round((totalStats.paid / totalStats.total) * 100)}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待付款</CardTitle>
            <Clock className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{totalStats.pending}</div>
            <p className="text-xs text-gray-600">平均账期 30天</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">逾期发票</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalStats.overdue}</div>
            <p className="text-xs text-gray-600">需要跟进催收</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">应收金额</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">
              ¥{(totalStats.totalAmount - totalStats.paidAmount).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">已收 ¥{totalStats.paidAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="搜索发票号或客户名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-l-4 border-l-emerald-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 border-l-4 border-l-emerald-500">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="draft">草稿</SelectItem>
                  <SelectItem value="sent">已发送</SelectItem>
                  <SelectItem value="paid">已付款</SelectItem>
                  <SelectItem value="overdue">逾期</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 发票列表 */}
      <Card className="border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-emerald-700">发票列表</CardTitle>
          <CardDescription>管理所有发票记录</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>发票号</TableHead>
                <TableHead>客户</TableHead>
                <TableHead>开票日期</TableHead>
                <TableHead>到期日期</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>¥{invoice.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedInvoice(invoice)}
                        className="transition-all duration-300 hover:scale-105 group"
                      >
                        <Eye className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                      <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                        <Edit className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                      <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                        <Printer className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                      <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 发票详情对话框 */}
      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getStatusIcon(selectedInvoice.status)}
                发票详情 - {selectedInvoice.number}
              </DialogTitle>
            </DialogHeader>
            <InvoiceDetail invoice={selectedInvoice} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function CreateInvoiceForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    issueDate: "",
    dueDate: "",
    items: [{ description: "", quantity: 1, unitPrice: 0, taxRate: 0.13 }],
  })

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0, taxRate: 0.13 }],
    }))
  }

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const updateItem = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    const taxTotal = formData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice * item.taxRate, 0)
    return { subtotal, taxTotal, total: subtotal + taxTotal }
  }

  const { subtotal, taxTotal, total } = calculateTotals()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">客户名称</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
            placeholder="输入客户名称"
            className="border-l-4 border-l-emerald-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerEmail">客户邮箱</Label>
          <Input
            id="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData((prev) => ({ ...prev, customerEmail: e.target.value }))}
            placeholder="输入客户邮箱"
            className="border-l-4 border-l-emerald-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="issueDate">开票日期</Label>
          <Input
            id="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, issueDate: e.target.value }))}
            className="border-l-4 border-l-emerald-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">到期日期</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
            className="border-l-4 border-l-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">发票项目</h3>
          <Button
            onClick={addItem}
            variant="outline"
            size="sm"
            className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
          >
            <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            添加项目
          </Button>
        </div>

        {formData.items.map((item, index) => (
          <Card key={index} className="p-4 border-l-4 border-l-emerald-500">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <Label>项目描述</Label>
                <Textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, "description", e.target.value)}
                  placeholder="输入项目描述"
                  rows={2}
                  className="border-l-4 border-l-emerald-500"
                />
              </div>
              <div>
                <Label>数量</Label>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                  min="1"
                  className="border-l-4 border-l-emerald-500"
                />
              </div>
              <div>
                <Label>单价</Label>
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(index, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="border-l-4 border-l-emerald-500"
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  disabled={formData.items.length === 1}
                  className="transition-all duration-300 hover:scale-105 group"
                >
                  <Trash2 className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                </Button>
              </div>
            </div>
            <div className="mt-2 text-right">
              <span className="text-sm text-muted-foreground">
                小计: ¥{(item.quantity * item.unitPrice).toFixed(2)}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-emerald-50 border-l-4 border-l-emerald-500">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>小计:</span>
            <span>¥{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>税额:</span>
            <span>¥{taxTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>总计:</span>
            <span>¥{total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button onClick={onClose}>保存草稿</Button>
        <Button
          onClick={onClose}
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
        >
          创建并发送
        </Button>
      </div>
    </div>
  )
}

function InvoiceDetail({ invoice }: { invoice: Invoice }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">发票信息</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">发票号:</span>
              <span className="font-medium">{invoice.number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">开票日期:</span>
              <span>{invoice.issueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">到期日期:</span>
              <span>{invoice.dueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">状态:</span>
              <Badge
                className={
                  invoice.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : invoice.status === "sent"
                      ? "bg-emerald-100 text-emerald-800"
                      : invoice.status === "overdue"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                }
              >
                {invoice.status === "paid"
                  ? "已付款"
                  : invoice.status === "sent"
                    ? "已发送"
                    : invoice.status === "overdue"
                      ? "逾期"
                      : "草稿"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">客户信息</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">客户名称:</span>
              <span className="font-medium">{invoice.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">邮箱:</span>
              <span>{invoice.customerEmail}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">项目明细</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>描述</TableHead>
              <TableHead>数量</TableHead>
              <TableHead>单价</TableHead>
              <TableHead>税率</TableHead>
              <TableHead>金额</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>¥{item.unitPrice.toFixed(2)}</TableCell>
                <TableCell>{(item.taxRate * 100).toFixed(0)}%</TableCell>
                <TableCell>¥{item.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Card className="p-4 bg-emerald-50 border-l-4 border-l-emerald-500">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>小计:</span>
            <span>¥{invoice.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>税额:</span>
            <span>¥{invoice.taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>总计:</span>
            <span>¥{invoice.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
        >
          <Download className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
          下载PDF
        </Button>
        <Button
          variant="outline"
          className="border-l-4 border-l-emerald-500 transition-all duration-300 hover:scale-105 group bg-transparent"
        >
          <Printer className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
          打印
        </Button>
        <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all duration-300 hover:scale-105 group">
          <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
          发送邮件
        </Button>
      </div>
    </div>
  )
}
