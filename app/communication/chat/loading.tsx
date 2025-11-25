export default function ChatLoading() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 左侧聊天列表骨架 */}
      <div className="w-80 border-r bg-white/80 backdrop-blur-sm">
        {/* 搜索框骨架 */}
        <div className="p-4 border-b">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* 聊天列表骨架 */}
        <div className="p-2 space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧聊天区域骨架 */}
      <div className="flex-1 flex flex-col">
        {/* 聊天头部骨架 */}
        <div className="p-4 border-b bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* 消息区域骨架 */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  i % 2 === 0 ? "bg-blue-200" : "bg-gray-200"
                } animate-pulse`}
              >
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  {Math.random() > 0.5 && <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 输入区域骨架 */}
        <div className="p-4 border-t bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
