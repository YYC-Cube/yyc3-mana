"use client"

import type React from "react"

import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { I18nContext, SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/lib/i18n"
import { Languages, Globe, Check } from "lucide-react"

interface LanguageSwitcherProps {
  variant?: "button" | "compact" | "icon"
  showLabel?: boolean
  className?: string
}

export function LanguageSwitcher({ variant = "button", showLabel = true, className = "" }: LanguageSwitcherProps) {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error("LanguageSwitcher must be used within a LanguageProvider")
  }

  const { language, setLanguage, t } = context

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage)

    // 触发页面重新渲染的事件
    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { language: newLanguage },
      }),
    )
  }

  const getLanguageFlag = (lang: SupportedLanguage): string => {
    const flags: Record<SupportedLanguage, string> = {
      "zh-CN": "🇨🇳",
      "zh-TW": "🇹🇼",
      "en-US": "🇺🇸",
      "ja-JP": "🇯🇵",
      "ko-KR": "🇰🇷",
    }
    return flags[lang] || "🌐"
  }

  const getCurrentLanguageDisplay = () => {
    return SUPPORTED_LANGUAGES[language]
  }

  if (variant === "icon") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={`p-2 ${className}`}>
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {Object.entries(SUPPORTED_LANGUAGES).map(([lang, name]) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => handleLanguageChange(lang as SupportedLanguage)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getLanguageFlag(lang as SupportedLanguage)}</span>
                <span>{name}</span>
              </div>
              {language === lang && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={`px-3 ${className}`}>
            <span className="text-lg mr-1">{getLanguageFlag(language)}</span>
            <span className="text-sm">{language.split("-")[0].toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {Object.entries(SUPPORTED_LANGUAGES).map(([lang, name]) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => handleLanguageChange(lang as SupportedLanguage)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getLanguageFlag(lang as SupportedLanguage)}</span>
                <span>{name}</span>
              </div>
              {language === lang && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`flex items-center space-x-2 ${className}`}>
          <Languages className="h-4 w-4" />
          {showLabel && (
            <>
              <span className="text-lg">{getLanguageFlag(language)}</span>
              <span>{getCurrentLanguageDisplay()}</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b">{t("settings.language")}</div>
        {Object.entries(SUPPORTED_LANGUAGES).map(([lang, name]) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang as SupportedLanguage)}
            className="flex items-center justify-between cursor-pointer py-3"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{getLanguageFlag(lang as SupportedLanguage)}</span>
              <div>
                <div className="font-medium">{name}</div>
                <div className="text-xs text-gray-500">{lang}</div>
              </div>
            </div>
            {language === lang && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Check className="h-3 w-3 mr-1" />
                {t("common.select")}
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Hook for using translation
export function useTranslation() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }

  return context
}

// Translation component for inline usage
interface TranslationProps {
  k: string // translation key
  params?: Record<string, string | number>
  fallback?: string
}

export function Translation({ k, params, fallback }: TranslationProps) {
  const { t } = useTranslation()

  try {
    return <>{t(k, params)}</>
  } catch (error) {
    console.warn(`Translation missing for key: ${k}`)
    return <>{fallback || k}</>
  }
}

// Higher-order component for translation
export function withTranslation<P extends object>(
  Component: React.ComponentType<P & { t: (key: string, params?: Record<string, string | number>) => string }>,
) {
  return function TranslatedComponent(props: P) {
    const { t } = useTranslation()
    return <Component {...props} t={t} />
  }
}
