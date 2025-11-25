# 贡献指南

感谢您对言语云企业管理系统的关注！我们欢迎各种形式的贡献。

## 贡献方式

### 1. 代码贡献
- 修复 Bug
- 添加新功能
- 改进现有功能
- 性能优化
- 代码重构

### 2. 文档贡献
- 改进文档
- 添加示例
- 翻译文档
- 修正错误

### 3. 其他贡献
- 报告 Bug
- 提出功能建议
- 参与讨论
- 帮助其他用户

## 开发流程

### 1. Fork 项目

点击项目页面右上角的 "Fork" 按钮。

### 2. 克隆仓库

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/yanyu-ems.git
cd yanyu-ems
\`\`\`

### 3. 创建分支

\`\`\`bash
# 创建功能分支
git checkout -b feature/your-feature-name

# 或创建修复分支
git checkout -b fix/your-bug-fix
\`\`\`

### 4. 开发和测试

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 代码检查
npm run lint
\`\`\`

### 5. 提交代码

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

\`\`\`bash
# 功能添加
git commit -m "feat: add new feature"

# Bug 修复
git commit -m "fix: resolve issue #123"

# 文档更新
git commit -m "docs: update installation guide"

# 代码重构
git commit -m "refactor: improve component structure"

# 性能优化
git commit -m "perf: optimize query performance"
\`\`\`

### 6. 推送代码

\`\`\`bash
git push origin feature/your-feature-name
\`\`\`

### 7. 创建 Pull Request

1. 访问您的 Fork 仓库页面
2. 点击 "New Pull Request"
3. 填写 PR 描述：
   - 简要说明更改内容
   - 关联相关 Issue
   - 添加截图（如果是 UI 更改）
   - 说明测试情况

## 代码规范

### TypeScript 规范

\`\`\`typescript
// ✅ 好的示例
interface UserData {
  id: string
  name: string
  email: string
}

function getUserData(userId: string): Promise<UserData> {
  // 实现
}

// ❌ 不好的示例
function getData(id: any): any {
  // 实现
}
\`\`\`

### React 组件规范

\`\`\`typescript
// ✅ 好的示例
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={variant}>
      {label}
    </button>
  )
}

// ❌ 不好的示例
export function Button(props: any) {
  return <button {...props} />
}
\`\`\`

### 样式规范

\`\`\`typescript
// ✅ 使用 Tailwind CSS
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-bold">Title</h2>
</div>

// ❌ 避免内联样式
<div style={{ display: 'flex', padding: '16px' }}>
  <h2 style={{ fontSize: '20px' }}>Title</h2>
</div>
\`\`\`

## 测试要求

### 单元测试

\`\`\`typescript
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button label="Click me" onClick={() => {}} />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button label="Click me" onClick={handleClick} />)
    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalled()
  })
})
\`\`\`

### 集成测试

\`\`\`typescript
describe('User Flow', () => {
  it('completes user registration', async () => {
    // 测试完整的用户注册流程
  })
})
\`\`\`

## 文档贡献

### 文档结构

\`\`\`
docs/
├── 01-getting-started/     # 快速开始
├── 02-user-guide/          # 用户指南
├── 03-development/         # 开发文档
├── 04-design-system/       # 设计系统
├── 05-api/                 # API 文档
└── ...
\`\`\`

### 文档编写规范

1. 使用清晰的标题层级
2. 提供代码示例
3. 添加截图说明
4. 包含相关链接
5. 保持简洁明了

## 代码审查

### Pull Request 检查清单

- [ ] 代码符合项目规范
- [ ] 添加了必要的测试
- [ ] 测试全部通过
- [ ] 更新了相关文档
- [ ] 提交信息符合规范
- [ ] 没有引入新的警告
- [ ] 功能正常工作

### 审查标准

1. **代码质量**
   - 代码可读性
   - 代码复用性
   - 错误处理
   - 性能考虑

2. **测试覆盖**
   - 单元测试
   - 集成测试
   - 边界情况

3. **文档完整性**
   - 代码注释
   - API 文档
   - 使用示例

## 社区行为准则

### 我们的承诺

- 尊重所有贡献者
- 接受建设性批评
- 关注社区利益
- 展现同理心

### 不可接受的行为

- 骚扰和歧视
- 人身攻击
- 发布他人隐私
- 其他不专业行为

## 许可证

贡献的代码将采用与项目相同的许可证（MIT License）。

## 联系方式

- 邮箱: dev@yanyu-cloud.com
- 讨论区: https://github.com/your-org/yanyu-ems/discussions
- Issue: https://github.com/your-org/yanyu-ems/issues

---

感谢您的贡献！🎉
