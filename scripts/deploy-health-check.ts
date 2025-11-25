#!/usr/bin/env ts-node

/**
 * 部署健康检查脚本
 * 用于验证部署后的系统健康状况
 */

import https from "https"
import { performance } from "perf_hooks"

interface HealthCheckResult {
  endpoint: string
  status: "success" | "failure"
  responseTime: number
  statusCode?: number
  error?: string
}

const PRODUCTION_URL = process.env.PRODUCTION_URL || "https://enterprise-system.com"
const TIMEOUT = 10000 // 10 seconds

const endpoints = [
  "/api/health",
  "/api/health/database",
  "/api/health/redis",
  "/api/health/services",
  "/api/version",
  "/",
  "/dashboard",
]

async function checkEndpoint(endpoint: string): Promise<HealthCheckResult> {
  const url = `${PRODUCTION_URL}${endpoint}`
  const startTime = performance.now()

  return new Promise((resolve) => {
    const req = https.get(url, { timeout: TIMEOUT }, (res) => {
      const endTime = performance.now()
      const responseTime = Math.round(endTime - startTime)

      let data = ""
      res.on("data", (chunk) => {
        data += chunk
      })

      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve({
            endpoint,
            status: "success",
            responseTime,
            statusCode: res.statusCode,
          })
        } else {
          resolve({
            endpoint,
            status: "failure",
            responseTime,
            statusCode: res.statusCode,
            error: `HTTP ${res.statusCode}`,
          })
        }
      })
    })

    req.on("error", (error) => {
      const endTime = performance.now()
      const responseTime = Math.round(endTime - startTime)

      resolve({
        endpoint,
        status: "failure",
        responseTime,
        error: error.message,
      })
    })

    req.on("timeout", () => {
      req.destroy()
      const endTime = performance.now()
      const responseTime = Math.round(endTime - startTime)

      resolve({
        endpoint,
        status: "failure",
        responseTime,
        error: "Request timeout",
      })
    })
  })
}

async function runHealthChecks(): Promise<void> {
  console.log("🏥 开始健康检查...\n")
  console.log(`目标环境: ${PRODUCTION_URL}\n`)

  const results: HealthCheckResult[] = []

  for (const endpoint of endpoints) {
    const result = await checkEndpoint(endpoint)
    results.push(result)

    const icon = result.status === "success" ? "✅" : "❌"
    const statusText = result.status === "success" ? `${result.statusCode} (${result.responseTime}ms)` : result.error

    console.log(`${icon} ${endpoint.padEnd(30)} ${statusText}`)
  }

  console.log("\n📊 健康检查汇总:")
  const successCount = results.filter((r) => r.status === "success").length
  const failureCount = results.filter((r) => r.status === "failure").length
  const avgResponseTime = Math.round(results.reduce((sum, r) => sum + r.responseTime, 0) / results.length)

  console.log(`   成功: ${successCount}`)
  console.log(`   失败: ${failureCount}`)
  console.log(`   平均响应时间: ${avgResponseTime}ms\n`)

  if (failureCount > 0) {
    console.error("❌ 健康检查失败")
    process.exit(1)
  }

  console.log("✅ 所有健康检查通过")
  process.exit(0)
}

// 运行健康检查
runHealthChecks().catch((error) => {
  console.error("健康检查脚本执行失败:", error)
  process.exit(1)
})
