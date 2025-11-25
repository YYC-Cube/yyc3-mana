import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 公开路径（不需要认证）
const publicPaths = ["/login", "/register", "/forgot-password", "/offline", "/unauthorized"]

// 静态资源路径
const staticPaths = ["/_next", "/favicon.ico", "/images", "/icons", "/manifest.json", "/sw.js"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 跳过静态资源
  if (staticPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 跳过 API 路由
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // 检查是否为公开路径
  const isPublicPath = publicPaths.includes(pathname)

  // 获取认证token
  const token = request.cookies.get("auth-token")?.value
  const isAuthenticated = !!token

  // 根路径重定向到仪表板
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } else {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // 如果是公开路径
  if (isPublicPath) {
    // 如果已认证且访问登录页，重定向到仪表板
    if (isAuthenticated && pathname === "/login") {
      const redirectPath = request.nextUrl.searchParams.get("redirect") || "/dashboard"
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
    return NextResponse.next()
  }

  // 如果是受保护的路径但未认证
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    // 保存原始路径用于登录后重定向
    if (pathname !== "/dashboard") {
      loginUrl.searchParams.set("redirect", pathname)
    }
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 匹配所有路径除了:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
