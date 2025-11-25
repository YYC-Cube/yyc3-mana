// Ollama本地大模型服务集成
interface OllamaConfig {
  baseUrl: string
  model: string
  timeout: number
}

interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface OllamaResponse {
  model: string
  created_at: string
  message: {
    role: string
    content: string
  }
  done: boolean
}

interface AnalysisRequest {
  type: "data_analysis" | "prediction" | "recommendation" | "summary"
  data: any
  context?: string
  parameters?: Record<string, any>
}

class OllamaService {
  private config: OllamaConfig
  private isConnected = false
  private availableModels: string[] = []

  constructor() {
    this.config = {
      baseUrl: process.env.NEXT_PUBLIC_OLLAMA_URL || "http://localhost:11434",
      model: process.env.NEXT_PUBLIC_OLLAMA_MODEL || "qwen2.5:7b",
      timeout: 30000,
    }
  }

  // 检查Ollama服务连接状态
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api/tags`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(5000),
      })

      if (response.ok) {
        const data = await response.json()
        this.availableModels = data.models?.map((m: any) => m.name) || []
        this.isConnected = true
        console.log("Ollama服务连接成功，可用模型:", this.availableModels)
        return true
      }
    } catch (error) {
      console.warn("Ollama服务连接失败:", error)
      this.isConnected = false
    }
    return false
  }

  // 获取可用模型列表
  async getAvailableModels(): Promise<string[]> {
    if (!this.isConnected) {
      await this.checkConnection()
    }
    return this.availableModels
  }

  // 发送聊天请求
  async chat(messages: ChatMessage[], model?: string): Promise<string> {
    if (!this.isConnected) {
      throw new Error("Ollama服务未连接，请检查服务状态")
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model || this.config.model,
          messages,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 2048,
          },
        }),
        signal: AbortSignal.timeout(this.config.timeout),
      })

      if (!response.ok) {
        throw new Error(`Ollama请求失败: ${response.status} ${response.statusText}`)
      }

      const data: OllamaResponse = await response.json()
      return data.message.content
    } catch (error) {
      console.error("Ollama聊天请求失败:", error)
      throw error
    }
  }

  // 数据分析
  async analyzeData(request: AnalysisRequest): Promise<string> {
    const systemPrompt = this.getSystemPrompt(request.type)
    const userPrompt = this.buildUserPrompt(request)

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]

    return await this.chat(messages)
  }

  // 获取系统提示词
  private getSystemPrompt(type: AnalysisRequest["type"]): string {
    const prompts = {
      data_analysis: `你是一个专业的数据分析师。请分析提供的业务数据，识别关键趋势、模式和异常情况。
      提供清晰的分析结论和可行的业务建议。回答请使用中文，格式要清晰易读。`,

      prediction: `你是一个业务预测专家。基于历史数据和当前趋势，提供准确的业务预测。
      包括预测结果、置信度、影响因素分析。回答请使用中文，提供具体的数值预测。`,

      recommendation: `你是一个业务顾问。基于提供的业务数据和情况，给出专业的改进建议。
      建议要具体可行，包括优先级和实施步骤。回答请使用中文，条理清晰。`,

      summary: `你是一个业务报告专家。请对提供的数据进行全面总结，突出重点信息。
      总结要简洁明了，包含关键指标和重要发现。回答请使用中文，结构化呈现。`,
    }

    return prompts[type]
  }

  // 构建用户提示词
  private buildUserPrompt(request: AnalysisRequest): string {
    let prompt = `请分析以下业务数据：\n\n`

    if (request.context) {
      prompt += `背景信息：${request.context}\n\n`
    }

    prompt += `数据内容：\n${JSON.stringify(request.data, null, 2)}\n\n`

    if (request.parameters) {
      prompt += `分析参数：\n${JSON.stringify(request.parameters, null, 2)}\n\n`
    }

    prompt += `请提供详细的分析结果。`

    return prompt
  }

  // 智能问答
  async askQuestion(question: string, context?: any): Promise<string> {
    const systemPrompt = `你是一个企业管理系统的AI助手。请回答用户关于业务管理的问题。
    回答要专业、准确、实用。如果涉及具体数据，请基于提供的上下文信息。回答请使用中文。`

    let userPrompt = question
    if (context) {
      userPrompt += `\n\n相关上下文：\n${JSON.stringify(context, null, 2)}`
    }

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]

    return await this.chat(messages)
  }

  // 生成业务报告
  async generateReport(data: any, reportType: string): Promise<string> {
    const request: AnalysisRequest = {
      type: "summary",
      data,
      context: `生成${reportType}报告`,
      parameters: { reportType },
    }

    return await this.analyzeData(request)
  }

  // 获取服务状态
  getStatus() {
    return {
      connected: this.isConnected,
      baseUrl: this.config.baseUrl,
      model: this.config.model,
      availableModels: this.availableModels,
    }
  }
}

// 导出服务实例
export const ollamaService = new OllamaService()

// 便捷函数
export const analyzeBusinessData = async (data: any, type: AnalysisRequest["type"] = "data_analysis") => {
  return await ollamaService.analyzeData({ type, data })
}

export const askAI = async (question: string, context?: any) => {
  return await ollamaService.askQuestion(question, context)
}

export const generateAIReport = async (data: any, reportType: string) => {
  return await ollamaService.generateReport(data, reportType)
}
