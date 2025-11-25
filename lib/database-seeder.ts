"use client"

import {
  localDB,
  type Customer,
  type Task,
  type Order,
  type Product,
  type User,
  type SystemSetting,
  type LogEntry,
} from "./local-database"

// 数据种子生成器
export class DatabaseSeeder {
  private static instance: DatabaseSeeder
  private isSeeded = false

  static getInstance(): DatabaseSeeder {
    if (!DatabaseSeeder.instance) {
      DatabaseSeeder.instance = new DatabaseSeeder()
    }
    return DatabaseSeeder.instance
  }

  // 检查是否已经有种子数据
  async checkSeeded(): Promise<boolean> {
    try {
      const customerCount = await localDB.count("customers")
      return customerCount > 0
    } catch (error) {
      console.error("检查种子数据失败:", error)
      return false
    }
  }

  // 生成所有种子数据
  async seedAll(): Promise<void> {
    if (this.isSeeded) {
      console.log("数据已经初始化过了")
      return
    }

    try {
      console.log("开始生成种子数据...")

      await this.seedSystemSettings()
      await this.seedUsers()
      await this.seedCustomers()
      await this.seedProducts()
      await this.seedOrders()
      await this.seedTasks()
      await this.seedLogs()

      this.isSeeded = true
      console.log("种子数据生成完成")
    } catch (error) {
      console.error("生成种子数据失败:", error)
      throw error
    }
  }

  // 生成系统设置
  private async seedSystemSettings(): Promise<void> {
    const settings: SystemSetting[] = [
      {
        key: "company_name",
        value: "企业管理系统",
        category: "general",
        description: "公司名称",
        type: "string",
        updateDate: new Date(),
      },
      {
        key: "max_file_size",
        value: 10485760, // 10MB
        category: "upload",
        description: "最大文件上传大小（字节）",
        type: "number",
        updateDate: new Date(),
      },
      {
        key: "enable_notifications",
        value: true,
        category: "notifications",
        description: "启用系统通知",
        type: "boolean",
        updateDate: new Date(),
      },
      {
        key: "theme_config",
        value: {
          primaryColor: "#3b82f6",
          secondaryColor: "#10b981",
          darkMode: false,
        },
        category: "appearance",
        description: "主题配置",
        type: "object",
        updateDate: new Date(),
      },
    ]

    for (const setting of settings) {
      await localDB.add("settings", setting)
    }
    console.log("系统设置数据生成完成")
  }

  // 生成用户数据
  private async seedUsers(): Promise<void> {
    const users: User[] = [
      {
        username: "admin",
        email: "admin@company.com",
        password: "admin123", // 实际应用中应该加密
        role: "admin",
        department: "管理部",
        permissions: ["*"],
        createDate: new Date(),
        lastLogin: new Date(),
        isActive: true,
      },
      {
        username: "manager1",
        email: "manager1@company.com",
        password: "manager123",
        role: "manager",
        department: "销售部",
        permissions: ["customers.read", "customers.write", "orders.read", "orders.write"],
        createDate: new Date(),
        lastLogin: new Date(Date.now() - 86400000),
        isActive: true,
      },
      {
        username: "employee1",
        email: "employee1@company.com",
        password: "employee123",
        role: "employee",
        department: "技术部",
        permissions: ["tasks.read", "tasks.write"],
        createDate: new Date(),
        lastLogin: new Date(Date.now() - 3600000),
        isActive: true,
      },
      {
        username: "viewer1",
        email: "viewer1@company.com",
        password: "viewer123",
        role: "viewer",
        department: "财务部",
        permissions: ["orders.read", "customers.read"],
        createDate: new Date(),
        isActive: true,
      },
    ]

    for (const user of users) {
      await localDB.add("users", user)
    }
    console.log("用户数据生成完成")
  }

  // 生成客户数据
  private async seedCustomers(): Promise<void> {
    const companies = [
      "华润集团",
      "万科地产",
      "碧桂园",
      "恒大集团",
      "中国平安",
      "腾讯科技",
      "阿里巴巴",
      "百度公司",
      "京东集团",
      "美团点评",
      "字节跳动",
      "小米科技",
      "华为技术",
      "中兴通讯",
      "联想集团",
    ]

    const firstNames = ["张", "李", "王", "刘", "陈", "杨", "赵", "黄", "周", "吴"]
    const lastNames = ["伟", "芳", "娜", "敏", "静", "丽", "强", "磊", "军", "洋"]
    const statuses: Array<"active" | "inactive" | "potential"> = ["active", "inactive", "potential"]

    const customers: Customer[] = []

    for (let i = 0; i < 50; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const company = companies[Math.floor(Math.random() * companies.length)]

      customers.push({
        name: `${firstName}${lastName}`,
        email: `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}@${company.toLowerCase().replace(/[^a-z]/g, "")}.com`,
        phone: `138${Math.floor(Math.random() * 100000000)
          .toString()
          .padStart(8, "0")}`,
        company: company,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        lastContact: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined,
        notes: Math.random() > 0.5 ? "重要客户，需要重点关注" : undefined,
      })
    }

    for (const customer of customers) {
      await localDB.add("customers", customer)
    }
    console.log("客户数据生成完成")
  }

  // 生成产品数据
  private async seedProducts(): Promise<void> {
    const categories = ["电子产品", "办公用品", "家具", "软件", "服务"]
    const productNames = [
      "笔记本电脑",
      "台式机",
      "显示器",
      "键盘",
      "鼠标",
      "办公桌",
      "办公椅",
      "文件柜",
      "白板",
      "投影仪",
      "管理软件",
      "设计软件",
      "开发工具",
      "安全软件",
      "数据库",
      "技术咨询",
      "培训服务",
      "维护服务",
      "定制开发",
      "系统集成",
    ]

    const products: Product[] = []

    for (let i = 0; i < 30; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const name = productNames[Math.floor(Math.random() * productNames.length)]

      products.push({
        name: `${name} ${i + 1}`,
        description: `高质量的${name}，适用于企业办公环境`,
        category: category,
        price: Math.floor(Math.random() * 10000) + 100,
        stock: Math.floor(Math.random() * 1000) + 10,
        sku: `SKU${(i + 1).toString().padStart(4, "0")}`,
        images: [`/images/product${i + 1}.jpg`],
        specifications: {
          品牌: "企业品牌",
          型号: `Model-${i + 1}`,
          保修期: "1年",
        },
        createDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
        updateDate: new Date(),
      })
    }

    for (const product of products) {
      await localDB.add("products", product)
    }
    console.log("产品数据生成完成")
  }

  // 生成订单数据
  private async seedOrders(): Promise<void> {
    const customers = await localDB.getAll<Customer>("customers")
    const products = await localDB.getAll<Product>("products")
    const statuses: Array<"pending" | "confirmed" | "shipped" | "delivered" | "cancelled"> = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ]

    const orders: Order[] = []

    for (let i = 0; i < 100; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)]
      const orderProducts = products.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 1)

      const items = orderProducts.map((product) => {
        const quantity = Math.floor(Math.random() * 10) + 1
        return {
          productId: product.id!,
          quantity,
          unitPrice: product.price,
          totalPrice: product.price * quantity,
        }
      })

      const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0)

      orders.push({
        customerId: customer.id!,
        orderNumber: `ORD${(i + 1).toString().padStart(6, "0")}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        orderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
        totalAmount,
        items,
        shippingAddress: `${customer.company} - ${customer.name}收`,
        notes: Math.random() > 0.7 ? "加急订单" : undefined,
      })
    }

    for (const order of orders) {
      await localDB.add("orders", order)
    }
    console.log("订单数据生成完成")
  }

  // 生成任务数据
  private async seedTasks(): Promise<void> {
    const users = await localDB.getAll<User>("users")
    const taskTitles = [
      "客户需求分析",
      "产品功能开发",
      "系统测试",
      "文档编写",
      "用户培训",
      "数据备份",
      "安全检查",
      "性能优化",
      "界面设计",
      "数据库维护",
      "客户回访",
      "市场调研",
      "竞品分析",
      "方案设计",
      "项目评估",
    ]

    const statuses: Array<"todo" | "in-progress" | "completed" | "cancelled"> = [
      "todo",
      "in-progress",
      "completed",
      "cancelled",
    ]
    const priorities: Array<"low" | "medium" | "high" | "urgent"> = ["low", "medium", "high", "urgent"]
    const tags = ["重要", "紧急", "客户", "内部", "技术", "销售", "支持"]

    const tasks: Task[] = []

    for (let i = 0; i < 80; i++) {
      const user = users[Math.floor(Math.random() * users.length)]
      const title = taskTitles[Math.floor(Math.random() * taskTitles.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const priority = priorities[Math.floor(Math.random() * priorities.length)]
      const taskTags = tags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)

      const createDate = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000)
      const dueDate = new Date(createDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)

      tasks.push({
        title: `${title} ${i + 1}`,
        description: `详细描述${title}的具体要求和执行步骤`,
        status,
        priority,
        assignee: user.username,
        dueDate,
        createDate,
        completedDate:
          status === "completed"
            ? new Date(createDate.getTime() + Math.random() * (dueDate.getTime() - createDate.getTime()))
            : undefined,
        tags: taskTags,
        estimatedHours: Math.floor(Math.random() * 40) + 1,
        actualHours: status === "completed" ? Math.floor(Math.random() * 50) + 1 : undefined,
      })
    }

    for (const task of tasks) {
      await localDB.add("tasks", task)
    }
    console.log("任务数据生成完成")
  }

  // 生成日志数据
  private async seedLogs(): Promise<void> {
    const levels: Array<"debug" | "info" | "warn" | "error"> = ["debug", "info", "warn", "error"]
    const modules = ["auth", "customer", "order", "product", "task", "system", "database"]
    const users = await localDB.getAll<User>("users")

    const logMessages = {
      debug: ["调试信息", "变量值检查", "函数调用跟踪"],
      info: ["用户登录", "数据更新", "操作完成", "系统启动"],
      warn: ["性能警告", "配置问题", "资源不足", "连接超时"],
      error: ["数据库错误", "网络异常", "权限拒绝", "系统崩溃"],
    }

    const logs: LogEntry[] = []

    for (let i = 0; i < 200; i++) {
      const level = levels[Math.floor(Math.random() * levels.length)]
      const module = modules[Math.floor(Math.random() * modules.length)]
      const user = users[Math.floor(Math.random() * users.length)]
      const messages = logMessages[level]
      const message = messages[Math.floor(Math.random() * messages.length)]

      logs.push({
        level,
        message: `${message} - ${module}模块`,
        module,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        userId: Math.random() > 0.3 ? user.id : undefined,
        metadata: {
          ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      })
    }

    for (const log of logs) {
      await localDB.add("logs", log)
    }
    console.log("日志数据生成完成")
  }

  // 清空所有数据
  async clearAll(): Promise<void> {
    const stores = ["customers", "tasks", "orders", "products", "users", "settings", "logs", "cache"]

    for (const store of stores) {
      await localDB.clear(store)
    }

    this.isSeeded = false
    console.log("所有数据已清空")
  }

  // 重新生成数据
  async reseed(): Promise<void> {
    await this.clearAll()
    await this.seedAll()
  }

  // 获取数据统计
  async getStats(): Promise<{
    customers: number
    tasks: number
    orders: number
    products: number
    users: number
    logs: number
  }> {
    return {
      customers: await localDB.count("customers"),
      tasks: await localDB.count("tasks"),
      orders: await localDB.count("orders"),
      products: await localDB.count("products"),
      users: await localDB.count("users"),
      logs: await localDB.count("logs"),
    }
  }

  // 生成业务报告数据
  async generateBusinessData(): Promise<{
    salesData: any[]
    customerGrowth: any[]
    taskCompletion: any[]
    productPerformance: any[]
  }> {
    const orders = await localDB.getAll<Order>("orders")
    const customers = await localDB.getAll<Customer>("customers")
    const tasks = await localDB.getAll<Task>("tasks")
    const products = await localDB.getAll<Product>("products")

    // 销售数据（按月）
    const salesData = this.generateMonthlySalesData(orders)

    // 客户增长数据
    const customerGrowth = this.generateCustomerGrowthData(customers)

    // 任务完成率数据
    const taskCompletion = this.generateTaskCompletionData(tasks)

    // 产品性能数据
    const productPerformance = this.generateProductPerformanceData(orders, products)

    return {
      salesData,
      customerGrowth,
      taskCompletion,
      productPerformance,
    }
  }

  private generateMonthlySalesData(orders: Order[]): any[] {
    const monthlyData: { [key: string]: { revenue: number; orders: number } } = {}

    orders.forEach((order) => {
      const month = order.orderDate.toISOString().slice(0, 7) // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = { revenue: 0, orders: 0 }
      }
      monthlyData[month].revenue += order.totalAmount
      monthlyData[month].orders += 1
    })

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        revenue: data.revenue,
        orders: data.orders,
      }))
  }

  private generateCustomerGrowthData(customers: Customer[]): any[] {
    const monthlyData: { [key: string]: number } = {}

    customers.forEach((customer) => {
      const month = customer.createDate.toISOString().slice(0, 7)
      monthlyData[month] = (monthlyData[month] || 0) + 1
    })

    let cumulative = 0
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => {
        cumulative += count
        return { month, newCustomers: count, totalCustomers: cumulative }
      })
  }

  private generateTaskCompletionData(tasks: Task[]): any[] {
    const statusCounts = tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: (count / tasks.length) * 100,
    }))
  }

  private generateProductPerformanceData(orders: Order[], products: Product[]): any[] {
    const productSales: { [key: number]: { quantity: number; revenue: number } } = {}

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = { quantity: 0, revenue: 0 }
        }
        productSales[item.productId].quantity += item.quantity
        productSales[item.productId].revenue += item.totalPrice
      })
    })

    return products
      .map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        quantity: productSales[product.id!]?.quantity || 0,
        revenue: productSales[product.id!]?.revenue || 0,
        stock: product.stock,
      }))
      .sort((a, b) => b.revenue - a.revenue)
  }
}

// 导出单例实例
export const seeder = DatabaseSeeder.getInstance()
