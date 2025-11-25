"use client"

import { useState, useCallback } from "react"
import { backgroundSync } from "@/lib/background-sync"

interface UseOfflineOperationOptions {
  module: string
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  onOfflineQueued?: (actionId: number) => void
}

export function useOfflineOperation(options: UseOfflineOperationOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const executeOperation = useCallback(
    async (
      endpoint: string,
      method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
      data?: any,
      headers?: Record<string, string>,
    ) => {
      setIsLoading(true)
      setError(null)

      try {
        if (navigator.onLine) {
          // 在线时直接执行
          const response = await fetch(endpoint, {
            method,
            headers: {
              "Content-Type": "application/json",
              ...headers,
            },
            body: data ? JSON.stringify(data) : undefined,
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          const result = await response.json()
          options.onSuccess?.(result)
          return result
        } else {
          // 离线时添加到队列
          const actionId = await backgroundSync.queueOfflineAction({
            type: method === "POST" ? "create" : method === "PUT" ? "update" : "delete",
            module: options.module,
            endpoint,
            method,
            data,
            headers,
          })

          options.onOfflineQueued?.(actionId)
          return { offline: true, actionId }
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        options.onError?.(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [options],
  )

  return {
    executeOperation,
    isLoading,
    error,
  }
}
