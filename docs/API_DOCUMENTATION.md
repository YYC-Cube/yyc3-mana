# API接口文档

## 📋 概述

企业管理系统API提供完整的RESTful接口，支持认证、用户管理、业务数据等功能。所有API均采用JSON格式进行数据交换。

## 🔗 基础信息

- **Base URL**: \`https://api.zy.baby\`
- **API版本**: v1
- **认证方式**: Bearer Token (JWT)
- **数据格式**: JSON
- **字符编码**: UTF-8

## 🔐 认证系统

### 登录
\`\`\`http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123",
  "remember": false
}
\`\`\`

**响应示例**:
\`\`\`json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "name": "系统管理员",
      "email": "admin@company.com",
      "role": "admin",
      "avatar": "https://api.zy.baby/avatars/admin.jpg"
    },
    "expiresIn": 86400
  },
  "message": "登录成功"
}
\`\`\`

### 登出
\`\`\`http
POST /auth/logout
Authorization: Bearer {token}
\`\`\`

### 刷新Token
\`\`\`http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

### 获取当前用户信息
\`\`\`http
GET /auth/me
Authorization: Bearer {token}
\`\`\`

## 👤 用户管理

### 获取用户列表
\`\`\`http
GET /users?page=1&limit=20&search=admin&role=admin
Authorization: Bearer {token}
\`\`\`

**查询参数**:
- \`page\`: 页码 (默认: 1)
- \`limit\`: 每页数量 (默认: 20, 最大: 100)
- \`search\`: 搜索关键词
- \`role\`: 用户角色筛选
- \`status\`: 用户状态筛选

**响应示例**:
\`\`\`json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "username": "admin",
        "name": "系统管理员",
        "email": "admin@company.com",
        "role": "admin",
        "status": "active",
        "avatar": "https://api.zy.baby/avatars/admin.jpg",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
\`\`\`

### 创建用户
\`\`\`http
POST /users
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "newuser",
  "name": "新用户",
  "email": "newuser@company.com",
  "password": "password123",
  "role": "user"
}
\`\`\`

### 更新用户
\`\`\`http
PUT /users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "更新后的用户名",
  "email": "updated@company.com",
  "role": "manager"
}
\`\`\`

### 删除用户
\`\`\`http
DELETE /users/{id}
Authorization: Bearer {token}
\`\`\`

## 📊 仪表板数据

### 获取仪表板统计
\`
