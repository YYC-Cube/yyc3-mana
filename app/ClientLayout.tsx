"use client"

import type React from "react"
import { ResponsiveLayoutProvider } from "@/components/layout/responsive-layout"
import "./globals.css"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <html lang="zh-CN">
      <head>
        <title>言语云企业管理系统</title>
        <meta name="description" content="Created with 言语云" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <ResponsiveLayoutProvider>{children}</ResponsiveLayoutProvider>
      </body>
    </html>
  )
}
