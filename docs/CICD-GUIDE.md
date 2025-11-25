# CI/CD 完整指南

## 📋 目录

- [概述](#概述)
- [工作流架构](#工作流架构)
- [环境配置](#环境配置)
- [部署流程](#部署流程)
- [监控与告警](#监控与告警)
- [回滚策略](#回滚策略)
- [最佳实践](#最佳实践)
- [故障排除](#故障排除)

## 概述

本项目采用全自动化的 CI/CD 流水线,实现从代码提交到生产部署的全流程自动化。

### 核心特性

- ✅ **多环境部署**: 开发、测试、预发布、生产
- ✅ **自动化测试**: 单元测试、集成测试、E2E测试
- ✅ **安全扫描**: 代码扫描、依赖审计、容器扫描
- ✅ **性能监控**: 实时性能监控和告警
- ✅ **蓝绿部署**: 零停机部署策略
- ✅ **金丝雀发布**: 逐步流量切换
- ✅ **自动回滚**: 失败自动回滚机制

## 工作流架构

### 1. 持续集成 (CI)

**触发条件**: 代码推送到任何分支

**流程**:
\`\`\`
代码推送 → 代码质量检查 → 安全扫描 → 单元测试 → 集成测试 → E2E测试 → 构建验证 → Docker镜像构建
\`\`\`

**质量门禁**:
- ESLint 检查通过
- TypeScript 类型检查通过
- 测试覆盖率 ≥ 80%
- 安全漏洞扫描通过
- SonarQube 质量门禁通过

### 2. 持续部署 - 测试环境 (CD-Staging)

**触发条件**: 代码推送到 `develop` 分支

**流程**:
\`\`\`
预部署检查 → 数据库迁移 → 部署到测试环境 → 烟雾测试 → 性能测试 → 回归测试 → 部署验证
\`\`\`

**自动化程度**: 100% 自动化

### 3. 持续部署 - 生产环境 (CD-Production)

**触发条件**: 发布新版本或手动触发

**流程**:
\`\`\`
人工审批 → 预生产验证 → 蓝绿部署 → 金丝雀测试(1%) → 逐步流量切换(10%→50%→100%) → 生产验证 → 持续监控
\`\`\`

**安全措施**:
- 必须人工审批
- 预生产环境验证
- 逐步流量切换
- 实时监控
- 自动回滚机制

## 环境配置

### 必需的 GitHub Secrets

#### 基础配置
\`\`\`
NODE_ENV=production
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
\`\`\`

#### 数据库
\`\`\`
STAGING_DATABASE_URL=postgresql://...
PRODUCTION_DATABASE_URL=postgresql://...
PRODUCTION_DATABASE_READONLY_URL=postgresql://...
\`\`\`

#### 安全密钥
\`\`\`
PRODUCTION_JWT_SECRET=your-jwt-secret
PRODUCTION_SESSION_SECRET=your-session-secret
PRODUCTION_ENCRYPTION_KEY=your-encryption-key
\`\`\`

#### 监控与告警
\`\`\`
SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=your-token
DATADOG_API_KEY=your-datadog-key
MONITORING_API=https://your-monitoring-api
MONITORING_DASHBOARD_URL=https://...
\`\`\`

#### 通知
\`\`\`
SLACK_WEBHOOK=https://hooks.slack.com/...
NOTIFY_EMAIL=team@yourdomain.com
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
\`\`\`

#### 第三方服务
\`\`\`
SNYK_TOKEN=your-snyk-token
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-password
SONAR_TOKEN=your-sonar-token
SONAR_HOST_URL=https://sonarcloud.io
\`\`\`

#### 部署相关
\`\`\`
STAGING_URL=https://staging.enterprise-system.com
PRODUCTION_URL=https://enterprise-system.com
LOAD_BALANCER_API=https://...
LB_TOKEN=your-lb-token
CDN_PURGE_URL=https://...
CDN_TOKEN=your-cdn-token
DNS_API=https://...
DNS_TOKEN=your-dns-token
\`\`\`

### 环境变量文件

1. **本地开发**: `.env.development`
2. **测试环境**: `.env.staging`
3. **生产环境**: `.env.production`

详见各环境的 `.env` 文件。

## 部署流程

### 测试环境部署

1. **自动触发**:
   \`\`\`bash
   git push origin develop
   \`\`\`

2. **流程监控**:
   - 访问 GitHub Actions 查看部署进度
   - Slack 接收实时通知

3. **部署完成**:
   - 自动通知团队
   - 测试环境 URL: `https://staging.enterprise-system.com`

### 生产环境部署

1. **创建发布版本**:
   \`\`\`bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   \`\`\`

2. **GitHub Release**:
   - 访问 GitHub Releases
   - 点击 "Draft a new release"
   - 选择标签并发布

3. **人工审批**:
   - 等待审批通知
   - 审批人在 GitHub Actions 中批准

4. **监控部署**:
   - 金丝雀阶段: 1% 流量
   - 逐步扩展: 10% → 50% → 100%
   - 实时监控指标

5. **部署验证**:
   - 自动烟雾测试
   - 关键路径测试
   - 性能基准验证

### 手动触发部署

1. 访问 GitHub Actions
2. 选择 "持续部署 - 生产环境"
3. 点击 "Run workflow"
4. 输入部署版本
5. 等待审批并完成部署

## 监控与告警

### 实时监控指标

- **错误率**: 阈值 < 1%
- **响应时间**: P95 < 500ms
- **CPU 使用率**: < 80%
- **内存使用率**: < 85%
- **数据库连接**: < 80% 最大连接数

### 告警渠道

1. **Slack**: 实时通知团队频道
2. **邮件**: 发送详细报告
3. **短信**: 紧急情况下通知值班人员
4. **PagerDuty**: 自动创建事故工单

### 监控周期

- **健康检查**: 每 5 分钟
- **性能监控**: 每 5 分钟
- **SSL 证书**: 每天检查
- **数据库监控**: 每 5 分钟

## 回滚策略

### 自动回滚

**触发条件**:
- 部署验证失败
- 错误率超过阈值
- 响应时间异常
- 健康检查失败

**执行流程**:
1. 立即切换所有流量到旧版本
2. 发送紧急通知
3. 创建事故报告
4. 保留新版本用于调试

### 手动回滚

1. **触发回滚**:
   \`\`\`bash
   # 访问 GitHub Actions
   # 选择 "生产环境回滚"
   # 点击 "Run workflow"
   # 输入回滚原因
   \`\`\`

2. **指定版本**:
   - 留空: 回滚到上一版本
   - 指定: 回滚到特定版本

3. **审批流程**:
   - 等待审批
   - 确认回滚

4. **验证**:
   - 自动健康检查
   - 版本验证
   - 烟雾测试

## 最佳实践

### 1. 代码提交

- 使用语义化提交信息
- 遵循 Conventional Commits
- 提交前运行本地测试

### 2. 分支策略

- `main`: 生产代码
- `develop`: 开发分支
- `feature/*`: 功能分支
- `hotfix/*`: 紧急修复

### 3. 测试要求

- 单元测试覆盖率 ≥ 80%
- 关键路径必须有 E2E 测试
- 新功能必须包含测试

### 4. 部署时机

- **避免高峰期**: 不在用户活跃时段部署
- **工作时间**: 尽量在工作时间部署
- **提前通知**: 重大更新提前通知用户

### 5. 回滚准备

- 保持上一版本可用
- 确保数据库向后兼容
- 准备回滚计划

## 故障排除

### 常见问题

#### 1. 部署卡住

**原因**: 健康检查超时

**解决**:
\`\`\`bash
# 检查应用日志
vercel logs

# 检查健康端点
curl https://your-deployment.vercel.app/api/health
\`\`\`

#### 2. 测试失败

**原因**: 环境变量缺失

**解决**:
- 检查 GitHub Secrets 配置
- 验证环境变量格式
- 查看测试日志

#### 3. 数据库迁移失败

**原因**: 迁移脚本错误

**解决**:
\`\`\`bash
# 回滚迁移
npm run db:migrate:rollback

# 修复迁移脚本
# 重新执行迁移
\`\`\`

#### 4. 性能告警

**原因**: 流量激增或代码问题

**解决**:
1. 检查监控面板
2. 分析慢查询
3. 检查错误日志
4. 必要时进行回滚

### 紧急联系方式

- **技术负责人**: tech-lead@yourdomain.com
- **运维团队**: ops@yourdomain.com
- **值班电话**: +86-xxx-xxxx-xxxx
- **Slack**: #emergency-response

### 事故响应流程

1. **发现问题**: 监控告警或用户报告
2. **评估影响**: 确定严重程度
3. **立即响应**: 回滚或修复
4. **通知用户**: 更新状态页
5. **事后分析**: 编写事故报告
6. **改进措施**: 防止类似问题

## 相关文档

- [环境变量配置指南](.env.example)
- [部署健康检查脚本](../scripts/deploy-health-check.ts)
- [监控配置文档](./monitoring.md)
- [安全最佳实践](./security-best-practices.md)

---

**最后更新**: 2024-01-01  
**维护人**: DevOps Team
