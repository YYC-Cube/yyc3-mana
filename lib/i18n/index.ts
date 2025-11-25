// 国际化核心服务
import { createContext } from "react"

// 支持的语言
export const SUPPORTED_LANGUAGES = {
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  "en-US": "English",
  "ja-JP": "日本語",
  "ko-KR": "한국어",
} as const

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

// 翻译键类型
export interface TranslationKeys {
  // 通用
  common: {
    save: string
    cancel: string
    confirm: string
    delete: string
    edit: string
    add: string
    search: string
    filter: string
    export: string
    import: string
    loading: string
    success: string
    error: string
    warning: string
    info: string
    yes: string
    no: string
    ok: string
    close: string
    back: string
    next: string
    previous: string
    submit: string
    reset: string
    refresh: string
    more: string
    less: string
    all: string
    none: string
    select: string
    clear: string
    copy: string
    paste: string
    cut: string
    undo: string
    redo: string
  }

  // 导航
  navigation: {
    dashboard: string
    customers: string
    tasks: string
    analytics: string
    finance: string
    communication: string
    settings: string
    profile: string
    logout: string
    home: string
    about: string
    help: string
    contact: string
  }

  // 客户管理
  customers: {
    title: string
    list: string
    add: string
    edit: string
    delete: string
    search: string
    filter: string
    export: string
    import: string
    name: string
    email: string
    phone: string
    company: string
    address: string
    status: string
    createTime: string
    updateTime: string
    actions: string
    details: string
    history: string
    notes: string
    tags: string
    priority: string
    source: string
    assignee: string
    lifecycle: string
    satisfaction: string
  }

  // 任务管理
  tasks: {
    title: string
    list: string
    add: string
    edit: string
    delete: string
    assign: string
    complete: string
    pending: string
    inProgress: string
    overdue: string
    priority: {
      high: string
      medium: string
      low: string
    }
    status: {
      todo: string
      inProgress: string
      review: string
      done: string
      cancelled: string
    }
    dueDate: string
    assignee: string
    description: string
    attachments: string
    comments: string
    dependencies: string
    subtasks: string
    timeTracking: string
    estimatedTime: string
    actualTime: string
  }

  // 数据分析
  analytics: {
    title: string
    dashboard: string
    sales: string
    customers: string
    performance: string
    reports: string
    charts: string
    metrics: string
    trends: string
    insights: string
    revenue: string
    orders: string
    conversion: string
    growth: string
    retention: string
    churn: string
    lifetime: string
    acquisition: string
    engagement: string
    satisfaction: string
  }

  // 财务管理
  finance: {
    title: string
    invoices: string
    payments: string
    expenses: string
    reports: string
    taxes: string
    budgets: string
    forecasts: string
    revenue: string
    profit: string
    loss: string
    balance: string
    cashFlow: string
    accounts: string
    transactions: string
    reconciliation: string
    audit: string
    compliance: string
  }

  // 沟通协作
  communication: {
    title: string
    chat: string
    meetings: string
    documents: string
    notifications: string
    calendar: string
    contacts: string
    groups: string
    channels: string
    messages: string
    files: string
    sharing: string
    collaboration: string
    videoCall: string
    audioCall: string
    screenShare: string
    recording: string
    whiteboard: string
  }

  // 系统设置
  settings: {
    title: string
    general: string
    account: string
    security: string
    privacy: string
    notifications: string
    appearance: string
    language: string
    timezone: string
    currency: string
    dateFormat: string
    timeFormat: string
    theme: string
    layout: string
    sidebar: string
    permissions: string
    roles: string
    users: string
    integrations: string
    api: string
    backup: string
    restore: string
    logs: string
    audit: string
    performance: string
    monitoring: string
  }

  // 错误消息
  errors: {
    networkError: string
    serverError: string
    notFound: string
    unauthorized: string
    forbidden: string
    validationError: string
    timeoutError: string
    unknownError: string
    fileUploadError: string
    fileSizeError: string
    fileTypeError: string
    permissionDenied: string
    sessionExpired: string
    dataCorrupted: string
    syncFailed: string
    offlineMode: string
  }

  // 成功消息
  success: {
    saved: string
    deleted: string
    updated: string
    created: string
    uploaded: string
    downloaded: string
    exported: string
    imported: string
    sent: string
    received: string
    synchronized: string
    backed: string
    restored: string
    published: string
    archived: string
    activated: string
    deactivated: string
  }

  // 确认消息
  confirmations: {
    delete: string
    save: string
    cancel: string
    exit: string
    reset: string
    clear: string
    overwrite: string
    replace: string
    merge: string
    discard: string
    publish: string
    archive: string
    activate: string
    deactivate: string
  }

  // 时间和日期
  time: {
    now: string
    today: string
    yesterday: string
    tomorrow: string
    thisWeek: string
    lastWeek: string
    nextWeek: string
    thisMonth: string
    lastMonth: string
    nextMonth: string
    thisYear: string
    lastYear: string
    nextYear: string
    minutes: string
    hours: string
    days: string
    weeks: string
    months: string
    years: string
    ago: string
    later: string
    remaining: string
    elapsed: string
  }

  // 状态
  status: {
    active: string
    inactive: string
    pending: string
    approved: string
    rejected: string
    draft: string
    published: string
    archived: string
    deleted: string
    suspended: string
    verified: string
    unverified: string
    online: string
    offline: string
    available: string
    busy: string
    away: string
    doNotDisturb: string
  }
}

// 翻译资源
const translations: Record<SupportedLanguage, TranslationKeys> = {
  "zh-CN": {
    common: {
      save: "保存",
      cancel: "取消",
      confirm: "确认",
      delete: "删除",
      edit: "编辑",
      add: "添加",
      search: "搜索",
      filter: "筛选",
      export: "导出",
      import: "导入",
      loading: "加载中...",
      success: "成功",
      error: "错误",
      warning: "警告",
      info: "信息",
      yes: "是",
      no: "否",
      ok: "确定",
      close: "关闭",
      back: "返回",
      next: "下一步",
      previous: "上一步",
      submit: "提交",
      reset: "重置",
      refresh: "刷新",
      more: "更多",
      less: "收起",
      all: "全部",
      none: "无",
      select: "选择",
      clear: "清空",
      copy: "复制",
      paste: "粘贴",
      cut: "剪切",
      undo: "撤销",
      redo: "重做",
    },
    navigation: {
      dashboard: "仪表板",
      customers: "客户管理",
      tasks: "任务管理",
      analytics: "数据分析",
      finance: "财务管理",
      communication: "沟通协作",
      settings: "系统设置",
      profile: "个人资料",
      logout: "退出登录",
      home: "首页",
      about: "关于",
      help: "帮助",
      contact: "联系我们",
    },
    customers: {
      title: "客户管理",
      list: "客户列表",
      add: "添加客户",
      edit: "编辑客户",
      delete: "删除客户",
      search: "搜索客户",
      filter: "筛选客户",
      export: "导出客户",
      import: "导入客户",
      name: "客户姓名",
      email: "邮箱地址",
      phone: "联系电话",
      company: "公司名称",
      address: "联系地址",
      status: "客户状态",
      createTime: "创建时间",
      updateTime: "更新时间",
      actions: "操作",
      details: "客户详情",
      history: "历史记录",
      notes: "备注信息",
      tags: "标签",
      priority: "优先级",
      source: "来源渠道",
      assignee: "负责人",
      lifecycle: "生命周期",
      satisfaction: "满意度",
    },
    tasks: {
      title: "任务管理",
      list: "任务列表",
      add: "创建任务",
      edit: "编辑任务",
      delete: "删除任务",
      assign: "分配任务",
      complete: "完成任务",
      pending: "待处理",
      inProgress: "进行中",
      overdue: "已逾期",
      priority: {
        high: "高优先级",
        medium: "中优先级",
        low: "低优先级",
      },
      status: {
        todo: "待办",
        inProgress: "进行中",
        review: "待审核",
        done: "已完成",
        cancelled: "已取消",
      },
      dueDate: "截止日期",
      assignee: "执行人",
      description: "任务描述",
      attachments: "附件",
      comments: "评论",
      dependencies: "依赖关系",
      subtasks: "子任务",
      timeTracking: "时间跟踪",
      estimatedTime: "预估时间",
      actualTime: "实际时间",
    },
    analytics: {
      title: "数据分析",
      dashboard: "分析仪表板",
      sales: "销售分析",
      customers: "客户分析",
      performance: "绩效分析",
      reports: "分析报告",
      charts: "图表",
      metrics: "指标",
      trends: "趋势",
      insights: "洞察",
      revenue: "收入",
      orders: "订单",
      conversion: "转化率",
      growth: "增长率",
      retention: "留存率",
      churn: "流失率",
      lifetime: "生命周期价值",
      acquisition: "获客成本",
      engagement: "参与度",
      satisfaction: "满意度",
    },
    finance: {
      title: "财务管理",
      invoices: "发票管理",
      payments: "付款管理",
      expenses: "费用管理",
      reports: "财务报表",
      taxes: "税务管理",
      budgets: "预算管理",
      forecasts: "财务预测",
      revenue: "营业收入",
      profit: "利润",
      loss: "亏损",
      balance: "余额",
      cashFlow: "现金流",
      accounts: "账户",
      transactions: "交易记录",
      reconciliation: "对账",
      audit: "审计",
      compliance: "合规",
    },
    communication: {
      title: "沟通协作",
      chat: "即时聊天",
      meetings: "会议管理",
      documents: "文档管理",
      notifications: "通知中心",
      calendar: "日历",
      contacts: "联系人",
      groups: "群组",
      channels: "频道",
      messages: "消息",
      files: "文件",
      sharing: "共享",
      collaboration: "协作",
      videoCall: "视频通话",
      audioCall: "语音通话",
      screenShare: "屏幕共享",
      recording: "录制",
      whiteboard: "白板",
    },
    settings: {
      title: "系统设置",
      general: "常规设置",
      account: "账户设置",
      security: "安全设置",
      privacy: "隐私设置",
      notifications: "通知设置",
      appearance: "外观设置",
      language: "语言设置",
      timezone: "时区设置",
      currency: "货币设置",
      dateFormat: "日期格式",
      timeFormat: "时间格式",
      theme: "主题",
      layout: "布局",
      sidebar: "侧边栏",
      permissions: "权限管理",
      roles: "角色管理",
      users: "用户管理",
      integrations: "集成管理",
      api: "API设置",
      backup: "备份",
      restore: "恢复",
      logs: "日志",
      audit: "审计",
      performance: "性能",
      monitoring: "监控",
    },
    errors: {
      networkError: "网络连接错误",
      serverError: "服务器错误",
      notFound: "页面未找到",
      unauthorized: "未授权访问",
      forbidden: "访问被禁止",
      validationError: "数据验证失败",
      timeoutError: "请求超时",
      unknownError: "未知错误",
      fileUploadError: "文件上传失败",
      fileSizeError: "文件大小超出限制",
      fileTypeError: "文件类型不支持",
      permissionDenied: "权限不足",
      sessionExpired: "会话已过期",
      dataCorrupted: "数据损坏",
      syncFailed: "同步失败",
      offlineMode: "离线模式",
    },
    success: {
      saved: "保存成功",
      deleted: "删除成功",
      updated: "更新成功",
      created: "创建成功",
      uploaded: "上传成功",
      downloaded: "下载成功",
      exported: "导出成功",
      imported: "导入成功",
      sent: "发送成功",
      received: "接收成功",
      synchronized: "同步成功",
      backed: "备份成功",
      restored: "恢复成功",
      published: "发布成功",
      archived: "归档成功",
      activated: "激活成功",
      deactivated: "停用成功",
    },
    confirmations: {
      delete: "确定要删除吗？",
      save: "确定要保存吗？",
      cancel: "确定要取消吗？",
      exit: "确定要退出吗？",
      reset: "确定要重置吗？",
      clear: "确定要清空吗？",
      overwrite: "确定要覆盖吗？",
      replace: "确定要替换吗？",
      merge: "确定要合并吗？",
      discard: "确定要丢弃吗？",
      publish: "确定要发布吗？",
      archive: "确定要归档吗？",
      activate: "确定要激活吗？",
      deactivate: "确定要停用吗？",
    },
    time: {
      now: "现在",
      today: "今天",
      yesterday: "昨天",
      tomorrow: "明天",
      thisWeek: "本周",
      lastWeek: "上周",
      nextWeek: "下周",
      thisMonth: "本月",
      lastMonth: "上月",
      nextMonth: "下月",
      thisYear: "今年",
      lastYear: "去年",
      nextYear: "明年",
      minutes: "分钟",
      hours: "小时",
      days: "天",
      weeks: "周",
      months: "月",
      years: "年",
      ago: "前",
      later: "后",
      remaining: "剩余",
      elapsed: "已过",
    },
    status: {
      active: "活跃",
      inactive: "非活跃",
      pending: "待处理",
      approved: "已批准",
      rejected: "已拒绝",
      draft: "草稿",
      published: "已发布",
      archived: "已归档",
      deleted: "已删除",
      suspended: "已暂停",
      verified: "已验证",
      unverified: "未验证",
      online: "在线",
      offline: "离线",
      available: "可用",
      busy: "忙碌",
      away: "离开",
      doNotDisturb: "请勿打扰",
    },
  },
  "en-US": {
    common: {
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      filter: "Filter",
      export: "Export",
      import: "Import",
      loading: "Loading...",
      success: "Success",
      error: "Error",
      warning: "Warning",
      info: "Info",
      yes: "Yes",
      no: "No",
      ok: "OK",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      reset: "Reset",
      refresh: "Refresh",
      more: "More",
      less: "Less",
      all: "All",
      none: "None",
      select: "Select",
      clear: "Clear",
      copy: "Copy",
      paste: "Paste",
      cut: "Cut",
      undo: "Undo",
      redo: "Redo",
    },
    navigation: {
      dashboard: "Dashboard",
      customers: "Customers",
      tasks: "Tasks",
      analytics: "Analytics",
      finance: "Finance",
      communication: "Communication",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
      home: "Home",
      about: "About",
      help: "Help",
      contact: "Contact",
    },
    customers: {
      title: "Customer Management",
      list: "Customer List",
      add: "Add Customer",
      edit: "Edit Customer",
      delete: "Delete Customer",
      search: "Search Customers",
      filter: "Filter Customers",
      export: "Export Customers",
      import: "Import Customers",
      name: "Customer Name",
      email: "Email Address",
      phone: "Phone Number",
      company: "Company Name",
      address: "Address",
      status: "Status",
      createTime: "Created Time",
      updateTime: "Updated Time",
      actions: "Actions",
      details: "Customer Details",
      history: "History",
      notes: "Notes",
      tags: "Tags",
      priority: "Priority",
      source: "Source",
      assignee: "Assignee",
      lifecycle: "Lifecycle",
      satisfaction: "Satisfaction",
    },
    tasks: {
      title: "Task Management",
      list: "Task List",
      add: "Create Task",
      edit: "Edit Task",
      delete: "Delete Task",
      assign: "Assign Task",
      complete: "Complete Task",
      pending: "Pending",
      inProgress: "In Progress",
      overdue: "Overdue",
      priority: {
        high: "High Priority",
        medium: "Medium Priority",
        low: "Low Priority",
      },
      status: {
        todo: "To Do",
        inProgress: "In Progress",
        review: "Review",
        done: "Done",
        cancelled: "Cancelled",
      },
      dueDate: "Due Date",
      assignee: "Assignee",
      description: "Description",
      attachments: "Attachments",
      comments: "Comments",
      dependencies: "Dependencies",
      subtasks: "Subtasks",
      timeTracking: "Time Tracking",
      estimatedTime: "Estimated Time",
      actualTime: "Actual Time",
    },
    analytics: {
      title: "Analytics",
      dashboard: "Analytics Dashboard",
      sales: "Sales Analytics",
      customers: "Customer Analytics",
      performance: "Performance Analytics",
      reports: "Reports",
      charts: "Charts",
      metrics: "Metrics",
      trends: "Trends",
      insights: "Insights",
      revenue: "Revenue",
      orders: "Orders",
      conversion: "Conversion Rate",
      growth: "Growth Rate",
      retention: "Retention Rate",
      churn: "Churn Rate",
      lifetime: "Lifetime Value",
      acquisition: "Acquisition Cost",
      engagement: "Engagement",
      satisfaction: "Satisfaction",
    },
    finance: {
      title: "Finance",
      invoices: "Invoices",
      payments: "Payments",
      expenses: "Expenses",
      reports: "Financial Reports",
      taxes: "Taxes",
      budgets: "Budgets",
      forecasts: "Forecasts",
      revenue: "Revenue",
      profit: "Profit",
      loss: "Loss",
      balance: "Balance",
      cashFlow: "Cash Flow",
      accounts: "Accounts",
      transactions: "Transactions",
      reconciliation: "Reconciliation",
      audit: "Audit",
      compliance: "Compliance",
    },
    communication: {
      title: "Communication",
      chat: "Chat",
      meetings: "Meetings",
      documents: "Documents",
      notifications: "Notifications",
      calendar: "Calendar",
      contacts: "Contacts",
      groups: "Groups",
      channels: "Channels",
      messages: "Messages",
      files: "Files",
      sharing: "Sharing",
      collaboration: "Collaboration",
      videoCall: "Video Call",
      audioCall: "Audio Call",
      screenShare: "Screen Share",
      recording: "Recording",
      whiteboard: "Whiteboard",
    },
    settings: {
      title: "Settings",
      general: "General",
      account: "Account",
      security: "Security",
      privacy: "Privacy",
      notifications: "Notifications",
      appearance: "Appearance",
      language: "Language",
      timezone: "Timezone",
      currency: "Currency",
      dateFormat: "Date Format",
      timeFormat: "Time Format",
      theme: "Theme",
      layout: "Layout",
      sidebar: "Sidebar",
      permissions: "Permissions",
      roles: "Roles",
      users: "Users",
      integrations: "Integrations",
      api: "API",
      backup: "Backup",
      restore: "Restore",
      logs: "Logs",
      audit: "Audit",
      performance: "Performance",
      monitoring: "Monitoring",
    },
    errors: {
      networkError: "Network Error",
      serverError: "Server Error",
      notFound: "Page Not Found",
      unauthorized: "Unauthorized",
      forbidden: "Forbidden",
      validationError: "Validation Error",
      timeoutError: "Timeout Error",
      unknownError: "Unknown Error",
      fileUploadError: "File Upload Error",
      fileSizeError: "File Size Error",
      fileTypeError: "File Type Error",
      permissionDenied: "Permission Denied",
      sessionExpired: "Session Expired",
      dataCorrupted: "Data Corrupted",
      syncFailed: "Sync Failed",
      offlineMode: "Offline Mode",
    },
    success: {
      saved: "Saved Successfully",
      deleted: "Deleted Successfully",
      updated: "Updated Successfully",
      created: "Created Successfully",
      uploaded: "Uploaded Successfully",
      downloaded: "Downloaded Successfully",
      exported: "Exported Successfully",
      imported: "Imported Successfully",
      sent: "Sent Successfully",
      received: "Received Successfully",
      synchronized: "Synchronized Successfully",
      backed: "Backed Up Successfully",
      restored: "Restored Successfully",
      published: "Published Successfully",
      archived: "Archived Successfully",
      activated: "Activated Successfully",
      deactivated: "Deactivated Successfully",
    },
    confirmations: {
      delete: "Are you sure you want to delete?",
      save: "Are you sure you want to save?",
      cancel: "Are you sure you want to cancel?",
      exit: "Are you sure you want to exit?",
      reset: "Are you sure you want to reset?",
      clear: "Are you sure you want to clear?",
      overwrite: "Are you sure you want to overwrite?",
      replace: "Are you sure you want to replace?",
      merge: "Are you sure you want to merge?",
      discard: "Are you sure you want to discard?",
      publish: "Are you sure you want to publish?",
      archive: "Are you sure you want to archive?",
      activate: "Are you sure you want to activate?",
      deactivate: "Are you sure you want to deactivate?",
    },
    time: {
      now: "Now",
      today: "Today",
      yesterday: "Yesterday",
      tomorrow: "Tomorrow",
      thisWeek: "This Week",
      lastWeek: "Last Week",
      nextWeek: "Next Week",
      thisMonth: "This Month",
      lastMonth: "Last Month",
      nextMonth: "Next Month",
      thisYear: "This Year",
      lastYear: "Last Year",
      nextYear: "Next Year",
      minutes: "Minutes",
      hours: "Hours",
      days: "Days",
      weeks: "Weeks",
      months: "Months",
      years: "Years",
      ago: "Ago",
      later: "Later",
      remaining: "Remaining",
      elapsed: "Elapsed",
    },
    status: {
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      draft: "Draft",
      published: "Published",
      archived: "Archived",
      deleted: "Deleted",
      suspended: "Suspended",
      verified: "Verified",
      unverified: "Unverified",
      online: "Online",
      offline: "Offline",
      available: "Available",
      busy: "Busy",
      away: "Away",
      doNotDisturb: "Do Not Disturb",
    },
  },
  // 其他语言的翻译可以类似添加
  "zh-TW": {
    // 繁体中文翻译
    common: {
      save: "儲存",
      cancel: "取消",
      confirm: "確認",
      delete: "刪除",
      edit: "編輯",
      add: "新增",
      search: "搜尋",
      filter: "篩選",
      export: "匯出",
      import: "匯入",
      loading: "載入中...",
      success: "成功",
      error: "錯誤",
      warning: "警告",
      info: "資訊",
      yes: "是",
      no: "否",
      ok: "確定",
      close: "關閉",
      back: "返回",
      next: "下一步",
      previous: "上一步",
      submit: "提交",
      reset: "重置",
      refresh: "重新整理",
      more: "更多",
      less: "收起",
      all: "全部",
      none: "無",
      select: "選擇",
      clear: "清空",
      copy: "複製",
      paste: "貼上",
      cut: "剪下",
      undo: "復原",
      redo: "重做",
    },
    // ... 其他翻译内容
  } as TranslationKeys,
  "ja-JP": {
    // 日语翻译
    common: {
      save: "保存",
      cancel: "キャンセル",
      confirm: "確認",
      delete: "削除",
      edit: "編集",
      add: "追加",
      search: "検索",
      filter: "フィルター",
      export: "エクスポート",
      import: "インポート",
      loading: "読み込み中...",
      success: "成功",
      error: "エラー",
      warning: "警告",
      info: "情報",
      yes: "はい",
      no: "いいえ",
      ok: "OK",
      close: "閉じる",
      back: "戻る",
      next: "次へ",
      previous: "前へ",
      submit: "送信",
      reset: "リセット",
      refresh: "更新",
      more: "もっと見る",
      less: "閉じる",
      all: "すべて",
      none: "なし",
      select: "選択",
      clear: "クリア",
      copy: "コピー",
      paste: "貼り付け",
      cut: "切り取り",
      undo: "元に戻す",
      redo: "やり直し",
    },
    // ... 其他翻译内容
  } as TranslationKeys,
  "ko-KR": {
    // 韩语翻译
    common: {
      save: "저장",
      cancel: "취소",
      confirm: "확인",
      delete: "삭제",
      edit: "편집",
      add: "추가",
      search: "검색",
      filter: "필터",
      export: "내보내기",
      import: "가져오기",
      loading: "로딩 중...",
      success: "성공",
      error: "오류",
      warning: "경고",
      info: "정보",
      yes: "예",
      no: "아니오",
      ok: "확인",
      close: "닫기",
      back: "뒤로",
      next: "다음",
      previous: "이전",
      submit: "제출",
      reset: "재설정",
      refresh: "새로고침",
      more: "더보기",
      less: "접기",
      all: "전체",
      none: "없음",
      select: "선택",
      clear: "지우기",
      copy: "복사",
      paste: "붙여넣기",
      cut: "잘라내기",
      undo: "실행취소",
      redo: "다시실행",
    },
    // ... 其他翻译内容
  } as TranslationKeys,
}

// 国际化上下文
interface I18nContextType {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
  t: (key: string) => string
  formatDate: (date: Date, format?: string) => string
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string
  formatCurrency: (amount: number, currency?: string) => string
  formatRelativeTime: (date: Date) => string
  isRTL: boolean
}

const I18nContext = createContext<I18nContextType | null>(null)

// 获取嵌套对象的值
function getNestedValue(obj: any, path: string): string {
  return path.split(".").reduce((current, key) => current?.[key], obj) || path
}

// 国际化服务类
export class I18nService {
  private currentLanguage: SupportedLanguage = "zh-CN"
  private fallbackLanguage: SupportedLanguage = "en-US"

  constructor(initialLanguage?: SupportedLanguage) {
    if (initialLanguage && initialLanguage in SUPPORTED_LANGUAGES) {
      this.currentLanguage = initialLanguage
    } else {
      // 自动检测浏览器语言
      this.currentLanguage = this.detectBrowserLanguage()
    }
  }

  // 检测浏览器语言
  private detectBrowserLanguage(): SupportedLanguage {
    if (typeof window === "undefined") return "zh-CN"

    const browserLang = navigator.language || navigator.languages?.[0] || "zh-CN"

    // 精确匹配
    if (browserLang in SUPPORTED_LANGUAGES) {
      return browserLang as SupportedLanguage
    }

    // 语言代码匹配（如 zh 匹配 zh-CN）
    const langCode = browserLang.split("-")[0]
    const matchedLang = Object.keys(SUPPORTED_LANGUAGES).find((lang) => lang.startsWith(langCode)) as SupportedLanguage

    return matchedLang || "zh-CN"
  }

  // 设置语言
  setLanguage(language: SupportedLanguage) {
    this.currentLanguage = language

    // 保存到本地存储
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", language)

      // 设置HTML lang属性
      document.documentElement.lang = language

      // 设置文档方向
      document.documentElement.dir = this.isRTL(language) ? "rtl" : "ltr"
    }
  }

  // 获取当前语言
  getLanguage(): SupportedLanguage {
    return this.currentLanguage
  }

  // 翻译函数
  translate(key: string, params?: Record<string, string | number>): string {
    const translation =
      getNestedValue(translations[this.currentLanguage], key) ||
      getNestedValue(translations[this.fallbackLanguage], key) ||
      key

    // 参数替换
    if (params) {
      return Object.entries(params).reduce(
        (text, [param, value]) => text.replace(`{{${param}}}`, String(value)),
        translation,
      )
    }

    return translation
  }

  // 格式化日期
  formatDate(date: Date, format?: string): string {
    const options: Intl.DateTimeFormatOptions = {}

    switch (format) {
      case "short":
        options.dateStyle = "short"
        break
      case "medium":
        options.dateStyle = "medium"
        break
      case "long":
        options.dateStyle = "long"
        break
      case "full":
        options.dateStyle = "full"
        break
      default:
        options.year = "numeric"
        options.month = "2-digit"
        options.day = "2-digit"
    }

    return new Intl.DateTimeFormat(this.currentLanguage, options).format(date)
  }

  // 格式化数字
  formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.currentLanguage, options).format(number)
  }

  // 格式化货币
  formatCurrency(amount: number, currency = "CNY"): string {
    return new Intl.NumberFormat(this.currentLanguage, {
      style: "currency",
      currency,
    }).format(amount)
  }

  // 格式化相对时间
  formatRelativeTime(date: Date): string {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const rtf = new Intl.RelativeTimeFormat(this.currentLanguage, { numeric: "auto" })

    if (Math.abs(diffInSeconds) < 60) {
      return rtf.format(-diffInSeconds, "second")
    } else if (Math.abs(diffInSeconds) < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), "minute")
    } else if (Math.abs(diffInSeconds) < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), "hour")
    } else if (Math.abs(diffInSeconds) < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), "day")
    } else if (Math.abs(diffInSeconds) < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), "month")
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), "year")
    }
  }

  // 判断是否为从右到左的语言
  isRTL(language?: SupportedLanguage): boolean {
    const lang = language || this.currentLanguage
    const rtlLanguages = ["ar", "he", "fa", "ur"]
    return rtlLanguages.some((rtlLang) => lang.startsWith(rtlLang))
  }

  // 获取支持的语言列表
  getSupportedLanguages() {
    return SUPPORTED_LANGUAGES
  }

  // 加载语言包（用于动态加载）
  async loadLanguagePack(language: SupportedLanguage): Promise<void> {
    // 这里可以实现动态加载语言包的逻辑
    // 例如从服务器获取翻译文件
    try {
      // const response = await fetch(`/locales/${language}.json`)
      // const languagePack = await response.json()
      // translations[language] = languagePack
      console.log(`Language pack for ${language} loaded`)
    } catch (error) {
      console.error(`Failed to load language pack for ${language}:`, error)
    }
  }
}

// 导出国际化服务实例
export const i18nService = new I18nService()

// 导出上下文
export { I18nContext }

// 导出类型
export type { I18nContextType }
