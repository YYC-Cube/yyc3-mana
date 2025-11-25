"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Search, Filter, Check, X, Plus, Minus } from "lucide-react"

// 移动端优化的按钮组件
interface MobileButtonProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function MobileButton({
  children,
  variant = "default",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = "",
}: MobileButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]",
  }

  const variantClasses = {
    default: "bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800",
    outline: "border-2 border-sky-600 text-sky-600 hover:bg-sky-50 active:bg-sky-100",
    ghost: "text-sky-600 hover:bg-sky-50 active:bg-sky-100",
    destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  }

  return (
    <Button
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${isPressed ? "scale-95" : ""}
        transition-all duration-150 ease-out
        touch-manipulation
        select-none
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <span>加载中...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

// 移动端优化的输入框组件
interface MobileInputProps {
  label?: string
  placeholder?: string
  value?: string
  type?: "text" | "email" | "tel" | "number" | "password"
  error?: string
  required?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  className?: string
}

export function MobileInput({
  label,
  placeholder,
  value = "",
  type = "text",
  error,
  required = false,
  disabled = false,
  onChange,
  onFocus,
  onBlur,
  className = "",
}: MobileInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label className="text-base font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <Input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => {
            setIsFocused(true)
            onFocus?.()
          }}
          onBlur={() => {
            setIsFocused(false)
            onBlur?.()
          }}
          className={`
            min-h-[48px] text-base px-4 py-3
            ${isFocused ? "ring-2 ring-sky-500 border-sky-500" : ""}
            ${error ? "border-red-500 ring-red-500" : ""}
            transition-all duration-200
          `}
        />
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <X className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <X className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

// 移动端优化的选择器组件
interface MobileSelectProps {
  label?: string
  placeholder?: string
  value?: string
  options: Array<{ value: string; label: string }>
  error?: string
  required?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
  className?: string
}

export function MobileSelect({
  label,
  placeholder = "请选择",
  value = "",
  options,
  error,
  required = false,
  disabled = false,
  onChange,
  className = "",
}: MobileSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options.find((opt) => opt.value === value))

  const handleSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option)
    onChange?.(option.value)
    setIsOpen(false)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label className="text-base font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full min-h-[48px] px-4 py-3 text-left bg-white border rounded-md
            flex items-center justify-between
            ${isOpen ? "ring-2 ring-sky-500 border-sky-500" : "border-gray-300"}
            ${error ? "border-red-500 ring-red-500" : ""}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"}
            transition-all duration-200
          `}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption?.label || placeholder}
          </span>
          {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-4 py-3 text-left hover:bg-gray-50 active:bg-gray-100
                  flex items-center justify-between
                  ${selectedOption?.value === option.value ? "bg-sky-50 text-sky-700" : "text-gray-900"}
                  transition-colors duration-150
                `}
              >
                <span>{option.label}</span>
                {selectedOption?.value === option.value && <Check className="w-4 h-4 text-sky-600" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <X className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

// 移动端优化的卡片组件
interface MobileCardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  clickable?: boolean
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function MobileCard({
  children,
  title,
  subtitle,
  actions,
  clickable = false,
  selected = false,
  onClick,
  className = "",
}: MobileCardProps) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Card
      className={`
        ${clickable ? "cursor-pointer" : ""}
        ${selected ? "ring-2 ring-sky-500 border-sky-500" : ""}
        ${isPressed ? "scale-98" : ""}
        transition-all duration-150 ease-out
        ${className}
      `}
      onClick={onClick}
      onTouchStart={() => clickable && setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
    >
      {(title || subtitle || actions) && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {title && <CardTitle className="text-lg font-semibold text-gray-900 truncate">{title}</CardTitle>}
              {subtitle && <p className="text-sm text-gray-600 mt-1 truncate">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center space-x-2 ml-4">{actions}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className={title || subtitle || actions ? "pt-0" : ""}>{children}</CardContent>
    </Card>
  )
}

// 移动端优化的搜索框组件
interface MobileSearchProps {
  placeholder?: string
  value?: string
  showFilter?: boolean
  filterCount?: number
  onSearch?: (query: string) => void
  onFilter?: () => void
  onClear?: () => void
  className?: string
}

export function MobileSearch({
  placeholder = "搜索...",
  value = "",
  showFilter = false,
  filterCount = 0,
  onSearch,
  onFilter,
  onClear,
  className = "",
}: MobileSearchProps) {
  const [query, setQuery] = useState(value)
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch?.(searchQuery)
  }

  const handleClear = () => {
    setQuery("")
    onSearch?.("")
    onClear?.()
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            pl-10 pr-10 min-h-[48px] text-base
            ${isFocused ? "ring-2 ring-sky-500 border-sky-500" : ""}
            transition-all duration-200
          `}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {showFilter && (
        <Button variant="outline" size="sm" onClick={onFilter} className="min-h-[48px] px-3 relative bg-transparent">
          <Filter className="w-5 h-5" />
          {filterCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {filterCount}
            </Badge>
          )}
        </Button>
      )}
    </div>
  )
}

// 移动端优化的数字输入组件
interface MobileNumberInputProps {
  label?: string
  value?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (value: number) => void
  className?: string
}

export function MobileNumberInput({
  label,
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  className = "",
}: MobileNumberInputProps) {
  const handleIncrement = () => {
    const newValue = Math.min(max, value + step)
    onChange?.(newValue)
  }

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step)
    onChange?.(newValue)
  }

  const handleInputChange = (inputValue: string) => {
    const numValue = Number.parseFloat(inputValue) || 0
    const clampedValue = Math.max(min, Math.min(max, numValue))
    onChange?.(clampedValue)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label className="text-base font-medium text-gray-700">{label}</Label>}

      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <button
          type="button"
          disabled={disabled || value <= min}
          onClick={handleDecrement}
          className="p-3 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <Minus className="w-5 h-5 text-gray-600" />
        </button>

        <Input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => handleInputChange(e.target.value)}
          className="border-0 text-center text-lg font-medium min-h-[48px] focus:ring-0"
        />

        <button
          type="button"
          disabled={disabled || value >= max}
          onClick={handleIncrement}
          className="p-3 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
