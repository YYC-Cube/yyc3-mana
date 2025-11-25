// 全局设计系统配置
export const designSystem = {
  colors: {
    primary: {
      50: "rgb(240 249 255)", // sky-50
      100: "rgb(224 242 254)", // sky-100
      200: "rgb(186 230 253)", // sky-200
      300: "rgb(125 211 252)", // sky-300
      400: "rgb(56 189 248)", // sky-400
      500: "rgb(14 165 233)", // sky-500
      600: "rgb(2 132 199)", // sky-600
      700: "rgb(3 105 161)", // sky-700
      800: "rgb(7 89 133)", // sky-800
      900: "rgb(12 74 110)", // sky-900
    },
    secondary: {
      50: "rgb(239 246 255)", // blue-50
      100: "rgb(219 234 254)", // blue-100
      200: "rgb(191 219 254)", // blue-200
      300: "rgb(147 197 253)", // blue-300
      400: "rgb(96 165 250)", // blue-400
      500: "rgb(59 130 246)", // blue-500
      600: "rgb(37 99 235)", // blue-600
      700: "rgb(29 78 216)", // blue-700
      800: "rgb(30 64 175)", // blue-800
      900: "rgb(30 58 138)", // blue-900
    },
    success: {
      50: "rgb(236 253 245)", // emerald-50
      500: "rgb(16 185 129)", // emerald-500
      600: "rgb(5 150 105)", // emerald-600
    },
    warning: {
      50: "rgb(255 251 235)", // amber-50
      500: "rgb(245 158 11)", // amber-500
      600: "rgb(217 119 6)", // amber-600
    },
    error: {
      50: "rgb(254 242 242)", // red-50
      500: "rgb(239 68 68)", // red-500
      600: "rgb(220 38 38)", // red-600
    },
    neutral: {
      50: "rgb(248 250 252)", // slate-50
      100: "rgb(241 245 249)", // slate-100
      200: "rgb(226 232 240)", // slate-200
      300: "rgb(203 213 225)", // slate-300
      400: "rgb(148 163 184)", // slate-400
      500: "rgb(100 116 139)", // slate-500
      600: "rgb(71 85 105)", // slate-600
      700: "rgb(51 65 85)", // slate-700
      800: "rgb(30 41 59)", // slate-800
      900: "rgb(15 23 42)", // slate-900
    },
  },
  spacing: {
    xs: "0.5rem", // 8px
    sm: "0.75rem", // 12px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
  },
  borderRadius: {
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
}

// 统一的CSS类名
export const commonStyles = {
  card: "bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200",
  cardHeader: "border-b border-sky-100 bg-gradient-to-r from-sky-50/50 to-blue-50/30",
  button: {
    primary:
      "bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white shadow-md hover:shadow-lg",
    secondary: "bg-white/70 hover:bg-white border border-sky-200 hover:border-sky-300 text-sky-700 hover:text-sky-800",
    ghost: "hover:bg-sky-50 text-sky-600 hover:text-sky-700",
  },
  input: "border-sky-200 focus:border-sky-400 focus:ring-sky-400 bg-sky-50/30 focus:bg-white",
  badge: {
    primary: "bg-gradient-to-r from-sky-400 to-blue-500 text-white",
    secondary: "bg-sky-100 text-sky-700 border border-sky-200",
    success: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border border-amber-200",
    error: "bg-red-100 text-red-700 border border-red-200",
  },
  layout: {
    container: "p-6 space-y-6 bg-gradient-to-br from-sky-50/50 to-blue-50/30 min-h-full",
    grid: "grid gap-6",
    section: "space-y-4",
  },
}
