const CACHE_NAME = "zuoyou-ems-v1.0.0"
const OFFLINE_URL = "/offline"

// 需要缓存的静态资源
const STATIC_CACHE_URLS = ["/", "/offline", "/images/zuoyou-logo.png", "/manifest.json"]

// 需要缓存的API路径模式
const API_CACHE_PATTERNS = [/^\/api\/dashboard/, /^\/api\/customers/, /^\/api\/tasks/, /^\/api\/approval/]

// 安装事件 - 预缓存静态资源
self.addEventListener("install", (event) => {
  console.log("Service Worker 安装中...")

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("预缓存静态资源")
        return cache.addAll(STATIC_CACHE_URLS)
      })
      .then(() => {
        // 强制激活新的 Service Worker
        return self.skipWaiting()
      }),
  )
})

// 激活事件 - 清理旧缓存
self.addEventListener("activate", (event) => {
  console.log("Service Worker 激活中...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("删除旧缓存:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        // 立即控制所有客户端
        return self.clients.claim()
      }),
  )
})

// 拦截网络请求
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 只处理同源请求
  if (url.origin !== location.origin) {
    return
  }

  // HTML 页面请求 - 网络优先策略
  if (request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 缓存成功的响应
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          // 网络失败时从缓存获取
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match(OFFLINE_URL)
          })
        }),
    )
    return
  }

  // API 请求 - 网络优先，缓存备用
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 只缓存成功的 GET 请求
          if (request.method === "GET" && response.ok) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // 网络失败时从缓存获取
          if (request.method === "GET") {
            return caches.match(request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse
              }
              // 返回离线数据
              return new Response(
                JSON.stringify({
                  error: "网络连接失败",
                  offline: true,
                  message: "当前处于离线状态，显示的是缓存数据",
                }),
                {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                },
              )
            })
          }
        }),
    )
    return
  }

  // 静态资源 - 缓存优先策略
  if (request.destination === "image" || request.destination === "script" || request.destination === "style") {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(request).then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
      }),
    )
    return
  }
})

// 后台同步
self.addEventListener("sync", (event) => {
  console.log("后台同步事件:", event.tag)

  if (event.tag === "background-sync") {
    event.waitUntil(
      // 执行后台同步任务
      syncData(),
    )
  }
})

// 推送通知
self.addEventListener("push", (event) => {
  console.log("收到推送消息:", event)

  const options = {
    body: event.data ? event.data.text() : "您有新的消息",
    icon: "/images/zuoyou-logo.png",
    badge: "/images/zuoyou-logo.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "查看详情",
        icon: "/images/zuoyou-logo.png",
      },
      {
        action: "close",
        title: "关闭",
        icon: "/images/zuoyou-logo.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("ZUOYOU 企业管理系统", options))
})

// 通知点击事件
self.addEventListener("notificationclick", (event) => {
  console.log("通知被点击:", event)

  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  }
})

// 同步数据函数
async function syncData() {
  try {
    // 这里可以实现具体的数据同步逻辑
    console.log("执行后台数据同步...")

    // 示例：同步待处理的离线操作
    const offlineActions = await getOfflineActions()

    for (const action of offlineActions) {
      try {
        await fetch(action.url, {
          method: action.method,
          headers: action.headers,
          body: action.body,
        })

        // 同步成功，删除离线操作记录
        await removeOfflineAction(action.id)
      } catch (error) {
        console.error("同步操作失败:", error)
      }
    }

    console.log("后台数据同步完成")
  } catch (error) {
    console.error("后台同步失败:", error)
  }
}

// 获取离线操作记录（示例）
async function getOfflineActions() {
  // 这里应该从 IndexedDB 或其他存储中获取离线操作
  return []
}

// 删除离线操作记录（示例）
async function removeOfflineAction(actionId) {
  // 这里应该从存储中删除已同步的操作
  console.log("删除离线操作:", actionId)
}
