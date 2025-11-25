# 快速安装指南

本指南将帮助您在5分钟内完成系统的安装和部署。

## 系统要求

### 开发环境
- **Node.js**: 18.0 或更高版本
- **npm**: 8.0 或更高版本（或 yarn 1.22+）
- **Git**: 2.0 或更高版本

### 浏览器要求
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 安装方式

我们提供多种安装方式，您可以根据需求选择：

### 方式一：在线部署（推荐）

#### 1. Vercel 部署（最简单）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/yanyu-ems)

点击上方按钮，按照 Vercel 的提示完成部署：

1. 登录 Vercel 账号
2. 选择仓库导入
3. 配置项目名称
4. 点击 Deploy
5. 等待部署完成（通常2-3分钟）

#### 2. Netlify 部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-org/yanyu-ems)

### 方式二：本地开发

#### 1. 克隆仓库

\`\`\`bash
# 使用 HTTPS
git clone https://github.com/your-org/yanyu-ems.git

# 或使用 SSH
git clone git@github.com:your-org/yanyu-ems.git

# 进入项目目录
cd yanyu-ems
\`\`\`

#### 2. 安装依赖

\`\`\`bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
\`\`\`

#### 3. 启动开发服务器

\`\`\`bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev

# 或使用 pnpm
pnpm dev
\`\`\`

#### 4. 访问应用

打开浏览器，访问 [http://localhost:3000](http://localhost:3000)

### 方式三：Docker 部署

#### 1. 使用 Docker Compose（推荐）

创建 `docker-compose.yml` 文件：

\`\`\`yaml
version: '3.8'

services:
  app:
    image: yanyucloud/ems:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
\`\`\`

启动服务：

\`\`\`bash
docker-compose up -d
\`\`\`

#### 2. 使用 Docker 命令

\`\`\`bash
# 拉取镜像
docker pull yanyucloud/ems:latest

# 运行容器
docker run -d \
  --name yanyu-ems \
  -p 3000:3000 \
  -e NODE_ENV=production \
  yanyucloud/ems:latest
\`\`\`

#### 3. 构建自定义镜像

\`\`\`bash
# 克隆仓库
git clone https://github.com/your-org/yanyu-ems.git
cd yanyu-ems

# 构建镜像
docker build -t my-yanyu-ems .

# 运行容器
docker run -d -p 3000:3000 my-yanyu-ems
\`\`\`

## 生产环境部署

### 构建生产版本

\`\`\`bash
# 构建
npm run build

# 启动生产服务器
npm start
\`\`\`

### 环境变量配置

创建 `.env.local` 文件：

\`\`\`env
# 应用基础配置
NEXT_PUBLIC_APP_NAME="言语云企业管理系统"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# API 配置（如果需要）
NEXT_PUBLIC_API_URL="https://api.your-domain.com"

# 分析工具（可选）
NEXT_PUBLIC_GA_ID="your-ga-id"
NEXT_PUBLIC_SENTRY_DSN="your-sentry-dsn"

# 功能开关
NEXT_PUBLIC_ENABLE_AI=true
NEXT_PUBLIC_ENABLE_OFFLINE=true
\`\`\`

### 性能优化配置

在 `next.config.mjs` 中：

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用 React 严格模式
  reactStrictMode: true,
  
  // 图片优化
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // 压缩
  compress: true,
  
  // PWA 配置
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
}

export default nextConfig
\`\`\`

## 验证安装

### 1. 访问主页

打开浏览器，访问您的部署地址，应该能看到登录界面。

### 2. 检查功能

- ✅ 页面正常加载
- ✅ 侧边栏可以展开/收起
- ✅ 导航菜单正常工作
- ✅ 数据能够正常保存
- ✅ 离线功能正常

### 3. 性能检查

使用 Chrome DevTools 的 Lighthouse 检查：

\`\`\`bash
npm run lighthouse
\`\`\`

期望得分：
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## 常见问题排查

### 问题：安装依赖失败

\`\`\`bash
# 清理缓存
npm cache clean --force

# 删除 node_modules 和 lock 文件
rm -rf node_modules package-lock.json

# 重新安装
npm install
\`\`\`

### 问题：端口被占用

\`\`\`bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或者使用其他端口
PORT=3001 npm run dev
\`\`\`

### 问题：构建失败

\`\`\`bash
# 检查 Node.js 版本
node --version

# 更新到最新的 LTS 版本
nvm install --lts
nvm use --lts

# 重新构建
npm run build
\`\`\`

### 问题：页面白屏

1. 打开浏览器控制台查看错误信息
2. 检查是否有 JavaScript 错误
3. 清除浏览器缓存
4. 尝试无痕模式访问

## 后续步骤

安装成功后，您可以：

1. [基础配置](./03-configuration.md) - 配置系统参数
2. [首次使用](./04-first-steps.md) - 开始使用系统
3. [用户指南](../02-user-guide/01-dashboard.md) - 了解详细功能

## 获取帮助

如果遇到安装问题：

- 📖 [故障排查指南](../07-deployment/07-troubleshooting.md)
- 💬 [社区讨论](https://github.com/your-org/yanyu-ems/discussions)
- 🐛 [提交问题](https://github.com/your-org/yanyu-ems/issues/new)

---

**上一步**: [系统简介](./01-introduction.md) ←  
**下一步**: [基础配置](./03-configuration.md) →
