"use client"

import { useEffect } from "react"

import { useState } from "react"

import type { ProcessingTask, ProcessingResult } from "../workers/data-processor.worker"

class WorkerManager {
  private workers: Worker[] = []
  private workerPool: Worker[] = []
  private taskQueue: Array<{
    task: ProcessingTask
    resolve: (result: any) => void
    reject: (error: Error) => void
  }> = []
  private maxWorkers = navigator.hardwareConcurrency || 4
  private currentTaskId = 0

  constructor() {
    this.initializeWorkerPool()
  }

  private initializeWorkerPool() {
    // 创建工作线程池
    for (let i = 0; i < this.maxWorkers; i++) {
      this.createWorker()
    }
  }

  private createWorker(): Worker {
    const worker = new Worker(new URL("../workers/data-processor.worker.ts", import.meta.url), { type: "module" })

    worker.onmessage = (e: MessageEvent<ProcessingResult>) => {
      const { type, result, id, error } = e.data

      // 找到对应的任务
      const taskIndex = this.taskQueue.findIndex((task) => task.task.id === id)
      if (taskIndex !== -1) {
        const task = this.taskQueue[taskIndex]
        this.taskQueue.splice(taskIndex, 1)

        if (error) {
          task.reject(new Error(error))
        } else {
          task.resolve(result)
        }
      }

      // 将工作线程返回到池中
      this.workerPool.push(worker)

      // 处理队列中的下一个任务
      this.processNextTask()
    }

    worker.onerror = (error) => {
      console.error("Worker错误:", error)
      // 重新创建工作线程
      this.createWorker()
    }

    this.workers.push(worker)
    this.workerPool.push(worker)

    return worker
  }

  private processNextTask() {
    if (this.taskQueue.length === 0 || this.workerPool.length === 0) {
      return
    }

    const worker = this.workerPool.pop()!
    const taskItem = this.taskQueue.find((item) => !item.task.id.includes("processing"))

    if (taskItem) {
      const taskIndex = this.taskQueue.indexOf(taskItem)
      this.taskQueue.splice(taskIndex, 1)

      // 标记任务为处理中
      taskItem.task.id += "_processing"
      this.taskQueue.push(taskItem)

      worker.postMessage(taskItem.task)
    }
  }

  private generateTaskId(): string {
    return `task_${++this.currentTaskId}_${Date.now()}`
  }

  // 公共API方法
  async calculateAnalytics(data: any[]): Promise<any> {
    return this.executeTask({
      type: "CALCULATE_ANALYTICS",
      payload: { data },
      id: this.generateTaskId(),
    })
  }

  async filterData(data: any[], filters: any): Promise<any[]> {
    return this.executeTask({
      type: "FILTER_DATA",
      payload: { data, filters },
      id: this.generateTaskId(),
    })
  }

  async sortData(data: any[], sortConfig: { field: string; direction: "asc" | "desc" }): Promise<any[]> {
    return this.executeTask({
      type: "SORT_DATA",
      payload: { data, sortConfig },
      id: this.generateTaskId(),
    })
  }

  async exportData(data: any[], format: "csv" | "json" | "excel"): Promise<string> {
    return this.executeTask({
      type: "EXPORT_DATA",
      payload: { data, format },
      id: this.generateTaskId(),
    })
  }

  async searchData(
    data: any[],
    searchConfig: {
      query: string
      fields: string[]
      fuzzy?: boolean
      caseSensitive?: boolean
    },
  ): Promise<any[]> {
    return this.executeTask({
      type: "SEARCH_DATA",
      payload: { data, searchConfig },
      id: this.generateTaskId(),
    })
  }

  private executeTask(task: ProcessingTask): Promise<any> {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ task, resolve, reject })
      this.processNextTask()
    })
  }

  // 获取工作线程状态
  getWorkerStatus() {
    return {
      totalWorkers: this.workers.length,
      availableWorkers: this.workerPool.length,
      busyWorkers: this.workers.length - this.workerPool.length,
      queuedTasks: this.taskQueue.length,
      maxWorkers: this.maxWorkers,
    }
  }

  // 清理资源
  terminate() {
    this.workers.forEach((worker) => worker.terminate())
    this.workers = []
    this.workerPool = []
    this.taskQueue = []
  }
}

// 导出单例实例
export const workerManager = new WorkerManager()

// 性能监控Hook
export function useWorkerPerformance() {
  const [status, setStatus] = useState(workerManager.getWorkerStatus())

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(workerManager.getWorkerStatus())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return status
}
