"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  PhoneOff,
  Settings,
  Users,
  MessageSquare,
  Hand,
  Grid3X3,
  Maximize,
  Volume2,
  RepeatIcon as Record,
  StopCircle,
  Clock,
  MoreHorizontal,
  Copy,
  Share2,
  Presentation,
} from "lucide-react"

interface MeetingParticipant {
  id: string
  name: string
  avatar: string
  isHost: boolean
  isMuted: boolean
  isVideoOn: boolean
  isHandRaised: boolean
  isScreenSharing: boolean
  joinTime: Date
  status: "connected" | "connecting" | "disconnected"
}

interface MeetingRoom {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  participants: MeetingParticipant[]
  maxParticipants: number
  isRecording: boolean
  isLocked: boolean
  roomUrl: string
  hostId: string
}

interface MeetingRoomManagerProps {
  currentUserId: string
  roomId?: string
}

export function MeetingRoomManager({ currentUserId, roomId }: MeetingRoomManagerProps) {
  const [currentRoom, setCurrentRoom] = useState<MeetingRoom | null>(null)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [volume, setVolume] = useState([50])
  const [viewMode, setViewMode] = useState<"grid" | "speaker" | "presentation">("grid")
  const [showChat, setShowChat] = useState(false)
  const [showParticipants, setShowParticipants] = useState(true)
  const [chatMessages, setChatMessages] = useState<
    Array<{
      id: string
      sender: string
      message: string
      timestamp: Date
    }>
  >([])
  const [chatInput, setChatInput] = useState("")

  const videoRef = useRef<HTMLVideoElement>(null)
  const screenShareRef = useRef<HTMLVideoElement>(null)

  // 模拟会议室数据
  useEffect(() => {
    if (roomId) {
      const mockRoom: MeetingRoom = {
        id: roomId,
        title: "产品开发周会",
        description: "讨论本周产品开发进度和下周计划",
        startTime: new Date(Date.now() - 30 * 60 * 1000), // 30分钟前开始
        endTime: new Date(Date.now() + 30 * 60 * 1000), // 30分钟后结束
        participants: [
          {
            id: "user1",
            name: "张产品经理",
            avatar: "",
            isHost: true,
            isMuted: false,
            isVideoOn: true,
            isHandRaised: false,
            isScreenSharing: false,
            joinTime: new Date(Date.now() - 25 * 60 * 1000),
            status: "connected",
          },
          {
            id: "user2",
            name: "李开发工程师",
            avatar: "",
            isHost: false,
            isMuted: true,
            isVideoOn: true,
            isHandRaised: false,
            isScreenSharing: false,
            joinTime: new Date(Date.now() - 20 * 60 * 1000),
            status: "connected",
          },
          {
            id: "user3",
            name: "王设计师",
            avatar: "",
            isHost: false,
            isMuted: false,
            isVideoOn: false,
            isHandRaised: true,
            isScreenSharing: false,
            joinTime: new Date(Date.now() - 15 * 60 * 1000),
            status: "connected",
          },
          {
            id: "user4",
            name: "陈测试工程师",
            avatar: "",
            isHost: false,
            isMuted: true,
            isVideoOn: true,
            isHandRaised: false,
            isScreenSharing: false,
            joinTime: new Date(Date.now() - 10 * 60 * 1000),
            status: "connecting",
          },
        ],
        maxParticipants: 50,
        isRecording: false,
        isLocked: false,
        roomUrl: `https://meet.company.com/room/${roomId}`,
        hostId: "user1",
      }
      setCurrentRoom(mockRoom)
    }
  }, [roomId])

  // 初始化摄像头
  useEffect(() => {
    if (isVideoOn && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => console.error("获取媒体设备失败:", err))
    }
  }, [isVideoOn])

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    if (currentRoom) {
      // 更新参与者状态
      setCurrentRoom((prev) =>
        prev
          ? {
              ...prev,
              participants: prev.participants.map((p) =>
                p.id === currentUserId ? { ...p, isVideoOn: !isVideoOn } : p,
              ),
            }
          : null,
      )
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (currentRoom) {
      // 更新参与者状态
      setCurrentRoom((prev) =>
        prev
          ? {
              ...prev,
              participants: prev.participants.map((p) => (p.id === currentUserId ? { ...p, isMuted: !isMuted } : p)),
            }
          : null,
      )
    }
  }

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = stream
        }
        setIsScreenSharing(true)
        setViewMode("presentation")
      } catch (err) {
        console.error("屏幕共享失败:", err)
      }
    } else {
      if (screenShareRef.current && screenShareRef.current.srcObject) {
        const stream = screenShareRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
        screenShareRef.current.srcObject = null
      }
      setIsScreenSharing(false)
      setViewMode("grid")
    }
  }

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised)
    if (currentRoom) {
      setCurrentRoom((prev) =>
        prev
          ? {
              ...prev,
              participants: prev.participants.map((p) =>
                p.id === currentUserId ? { ...p, isHandRaised: !isHandRaised } : p,
              ),
            }
          : null,
      )
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (currentRoom) {
      setCurrentRoom((prev) => (prev ? { ...prev, isRecording: !isRecording } : null))
    }
  }

  const leaveRoom = () => {
    // 停止所有媒体流
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    if (screenShareRef.current && screenShareRef.current.srcObject) {
      const stream = screenShareRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    // 离开房间逻辑
    console.log("离开会议室")
  }

  const sendChatMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: "我",
        message: chatInput.trim(),
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, newMessage])
      setChatInput("")
    }
  }

  const copyRoomUrl = () => {
    if (currentRoom) {
      navigator.clipboard.writeText(currentRoom.roomUrl)
      // 显示复制成功提示
    }
  }

  const formatDuration = (startTime: Date) => {
    const duration = Date.now() - startTime.getTime()
    const minutes = Math.floor(duration / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours > 0) {
      return `${hours}:${remainingMinutes.toString().padStart(2, "0")}`
    }
    return `${remainingMinutes}:${Math.floor((duration % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0")}`
  }

  if (!currentRoom) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">会议室未找到</h3>
          <p className="text-gray-500">请检查会议室链接是否正确</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* 顶部工具栏 */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-medium">{currentRoom.title}</h1>
          <Badge variant="secondary" className="bg-green-600">
            <Clock className="w-3 h-3 mr-1" />
            {formatDuration(currentRoom.startTime)}
          </Badge>
          {currentRoom.isRecording && (
            <Badge variant="destructive" className="animate-pulse">
              <Record className="w-3 h-3 mr-1" />
              录制中
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={copyRoomUrl}>
            <Copy className="w-4 h-4 mr-2" />
            复制链接
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            邀请
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 flex">
        {/* 视频区域 */}
        <div className="flex-1 relative">
          {viewMode === "presentation" && isScreenSharing ? (
            // 演示模式
            <div className="h-full bg-black flex items-center justify-center">
              <video ref={screenShareRef} autoPlay muted className="max-w-full max-h-full" />
            </div>
          ) : (
            // 网格模式
            <div className="h-full p-4">
              <div
                className={`grid gap-4 h-full ${
                  currentRoom.participants.length <= 4
                    ? "grid-cols-2 grid-rows-2"
                    : currentRoom.participants.length <= 9
                      ? "grid-cols-3 grid-rows-3"
                      : "grid-cols-4 grid-rows-3"
                }`}
              >
                {currentRoom.participants.map((participant) => (
                  <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
                    {participant.isVideoOn ? (
                      <video
                        ref={participant.id === currentUserId ? videoRef : undefined}
                        autoPlay
                        muted={participant.id === currentUserId}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src={
                              participant.avatar ||
                              `/placeholder.svg?height=64&width=64&text=${participant.name.charAt(0)}`
                            }
                          />
                          <AvatarFallback className="text-2xl">{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                    )}

                    {/* 参与者信息覆盖层 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{participant.name}</span>
                          {participant.isHost && (
                            <Badge variant="secondary" className="text-xs">
                              主持人
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {participant.isMuted && <MicOff className="w-4 h-4 text-red-400" />}
                          {!participant.isVideoOn && <VideoOff className="w-4 h-4 text-red-400" />}
                          {participant.isHandRaised && <Hand className="w-4 h-4 text-yellow-400" />}
                          {participant.isScreenSharing && <Monitor className="w-4 h-4 text-blue-400" />}
                        </div>
                      </div>
                    </div>

                    {/* 连接状态指示器 */}
                    <div
                      className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                        participant.status === "connected"
                          ? "bg-green-500"
                          : participant.status === "connecting"
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-red-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 视图模式切换 */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "secondary"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "speaker" ? "default" : "secondary"}
              size="sm"
              onClick={() => setViewMode("speaker")}
            >
              <Maximize className="w-4 h-4" />
            </Button>
            {isScreenSharing && (
              <Button
                variant={viewMode === "presentation" ? "default" : "secondary"}
                size="sm"
                onClick={() => setViewMode("presentation")}
              >
                <Presentation className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* 右侧面板 */}
        {(showParticipants || showChat) && (
          <div className="w-80 bg-gray-800 border-l border-gray-700">
            {/* 面板切换 */}
            <div className="flex border-b border-gray-700">
              <Button
                variant={showParticipants ? "default" : "ghost"}
                className="flex-1 rounded-none"
                onClick={() => {
                  setShowParticipants(true)
                  setShowChat(false)
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                参与者 ({currentRoom.participants.length})
              </Button>
              <Button
                variant={showChat ? "default" : "ghost"}
                className="flex-1 rounded-none"
                onClick={() => {
                  setShowParticipants(false)
                  setShowChat(true)
                }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                聊天
                {chatMessages.length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 text-xs">
                    {chatMessages.length}
                  </Badge>
                )}
              </Button>
            </div>

            {/* 参与者列表 */}
            {showParticipants && (
              <ScrollArea className="h-full p-4">
                <div className="space-y-3">
                  {currentRoom.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={
                              participant.avatar ||
                              `/placeholder.svg?height=32&width=32&text=${participant.name.charAt(0)}`
                            }
                          />
                          <AvatarFallback className="text-sm">{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                            participant.status === "connected"
                              ? "bg-green-500"
                              : participant.status === "connecting"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium truncate">{participant.name}</p>
                          {participant.isHost && (
                            <Badge variant="secondary" className="text-xs">
                              主持人
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {new Date(participant.joinTime).toLocaleTimeString("zh-CN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          加入
                        </p>
                      </div>

                      <div className="flex items-center space-x-1">
                        {participant.isMuted ? (
                          <MicOff className="w-4 h-4 text-red-400" />
                        ) : (
                          <Mic className="w-4 h-4 text-green-400" />
                        )}
                        {participant.isVideoOn ? (
                          <Video className="w-4 h-4 text-green-400" />
                        ) : (
                          <VideoOff className="w-4 h-4 text-red-400" />
                        )}
                        {participant.isHandRaised && <Hand className="w-4 h-4 text-yellow-400" />}
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {/* 聊天区域 */}
            {showChat && (
              <div className="h-full flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{message.sender}</span>
                          <span className="text-xs text-gray-400">
                            {message.timestamp.toLocaleTimeString("zh-CN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 break-words">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="输入消息..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                      className="bg-gray-700 border-gray-600"
                    />
                    <Button onClick={sendChatMessage} size="sm">
                      发送
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 底部控制栏 */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          {/* 左侧控制 */}
          <div className="flex items-center space-x-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              onClick={toggleMute}
              className="rounded-full w-12 h-12"
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>

            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              className="rounded-full w-12 h-12"
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>

            <Button
              variant={isScreenSharing ? "default" : "secondary"}
              size="lg"
              onClick={toggleScreenShare}
              className="rounded-full w-12 h-12"
            >
              {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
            </Button>
          </div>

          {/* 中间控制 */}
          <div className="flex items-center space-x-2">
            <Button variant={isHandRaised ? "default" : "secondary"} onClick={toggleHandRaise}>
              <Hand className="w-4 h-4 mr-2" />
              {isHandRaised ? "放下手" : "举手"}
            </Button>

            <Button variant={isRecording ? "destructive" : "secondary"} onClick={toggleRecording}>
              {isRecording ? <StopCircle className="w-4 h-4 mr-2" /> : <Record className="w-4 h-4 mr-2" />}
              {isRecording ? "停止录制" : "开始录制"}
            </Button>

            <Button
              variant={showParticipants || showChat ? "default" : "secondary"}
              onClick={() => {
                if (!showParticipants && !showChat) {
                  setShowParticipants(true)
                } else {
                  setShowParticipants(false)
                  setShowChat(false)
                }
              }}
            >
              <Users className="w-4 h-4 mr-2" />
              参与者
            </Button>

            <Button variant={showChat ? "default" : "secondary"} onClick={() => setShowChat(!showChat)}>
              <MessageSquare className="w-4 h-4 mr-2" />
              聊天
            </Button>
          </div>

          {/* 右侧控制 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-20" />
            </div>

            <Button variant="destructive" onClick={leaveRoom}>
              <PhoneOff className="w-4 h-4 mr-2" />
              离开会议
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
