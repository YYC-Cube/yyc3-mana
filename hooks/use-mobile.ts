"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // 初始化状态
    setMatches(media.matches)

    // 监听变化
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // 现代浏览器使用 addEventListener
    if (media.addEventListener) {
      media.addEventListener("change", listener)
      return () => media.removeEventListener("change", listener)
    }
    // 旧浏览器使用 addListener
    else {
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [query])

  return matches
}

export function useMobile() {
  return useMediaQuery("(max-width: 768px)")
}
