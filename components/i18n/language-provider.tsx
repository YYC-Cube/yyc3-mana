"use client"

import { useState, useEffect, type ReactNode } from "react"
import { I18nContext, i18nService, type SupportedLanguage, type I18nContextType } from "@/lib/i18n"

interface LanguageProviderProps {
  children: ReactNode
  initialLanguage?: SupportedLanguage
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage || i18nService.getLanguage())

  useEffect(() => {
    // 从本地存储恢复语言设置
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("preferred-language") as SupportedLanguage
      if (savedLanguage && savedLanguage in i18nService.getSupportedLanguages()) {
        setLanguageState(savedLanguage)
        i18nService.setLanguage(savedLanguage)
      }
    }
  }, [])

  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage)
    i18nService.setLanguage(newLanguage)
  }

  const t = (key: string, params?: Record<string, string | number>) => {
    return i18nService.translate(key, params)
  }

  const formatDate = (date: Date, format?: string) => {
    return i18nService.formatDate(date, format)
  }

  const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    return i18nService.formatNumber(number, options)
  }

  const formatCurrency = (amount: number, currency?: string) => {
    return i18nService.formatCurrency(amount, currency)
  }

  const formatRelativeTime = (date: Date) => {
    return i18nService.formatRelativeTime(date)
  }

  const isRTL = i18nService.isRTL(language)

  const contextValue: I18nContextType = {
    language,
    setLanguage,
    t,
    formatDate,
    formatNumber,
    formatCurrency,
    formatRelativeTime,
    isRTL,
  }

  return (
    <I18nContext.Provider value={contextValue}>
      <div dir={isRTL ? "rtl" : "ltr"} lang={language}>
        {children}
      </div>
    </I18nContext.Provider>
  )
}
