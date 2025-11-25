"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Users,
  Share,
  Settings,
  MessageSquare,
  MoreHorizontal,
  Calendar,
  Clock,
  UserPlus,
  RepeatIcon as Record,
} from "lucide-react"
import { Plus } from "lucide-react" // Import Plus icon
import { Switch } from "@/components/ui/switch" // Import Switch component

interface Participant {
  id: string
  name: string
  avatar: string
  isHost: boolean
  isMuted: boolean
  isVideoOn: boolean
  isScreenSharing: boolean
  connectionQuality: "excellent" | "good" | "poor"
}

interface Meeting {
  id: string
  title: string
  host: string
  participants: Participant[]
  startTime: Date
  duration: number
  status: "scheduled" | "ongoing" | "ended"
  isRecording: boolean
  roomId: string
}

interface CallSettings {
  camera: boolean
  microphone: boolean
  speaker: boolean
  autoJoinAudio: boolean
  autoJoinVideo: boolean
  backgroundBlur: boolean
  noiseCancellation: boolean
}

export function VideoCallSystem() {
  const [currentMeeting, setCurrentMeeting] = useState<Meeting | null>(null)
  const [isInCall, setIsInCall] = useState(false)
  const [callSettings, setCallSettings] = useState<CallSettings>({
    camera: true,
    microphone: true,
    speaker: true,
    autoJoinAudio: true,
    autoJoinVideo: false,
    backgroundBlur: false,
    noiseCancellation: true,
  })

  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "产品评审会议",
      host: "张经理",
      participants: [
        {
          id: "1",
          name: "张经理",
          avatar: "",
          isHost: true,
          isMuted: false,
          isVideoOn: true,
          isScreenSharing: false,
          connectionQuality: "excellent",
        },
        {
          id: "2",
          name: "李开发",
          avatar: "",
          isHost: false,
          isMuted: true,
          isVideoOn: true,
          isScreenSharing: false,
          connectionQuality: "good",
        },
        {
          id: "3",
          name: "王设计师",
          avatar: "",
          isHost: false,
          isMuted: false,
          isVideoOn: false,
          isScreenSharing: false,
          connectionQuality: "excellent",
        },
      ],
      startTime: new Date(),
      duration: 45,
      status: "ongoing",
      isRecording: false,
      roomId: "room_123",
    },
    {
      id: "2",
      title: "周例会",
      host: "陈总监",
      participants: [],
      startTime: new Date(Date.now() + 60 * 60 * 1000),
      duration: 60,
      status: "scheduled",
      isRecording: false,
      roomId: "room_456",
    },
  ])

  const [isCreateMeetingOpen, setIsCreateMeetingOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: string; message: string; timestamp: Date }>
  >([])
  const [newMessage, setNewMessage] = useState("")

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // 模拟视频通话功能
  const startCall = async (meetingId: string) => {
    const meeting = meetings.find((m) => m.id === meetingId)
    if (!meeting) return

    setCurrentMeeting(meeting)
    setIsInCall(true)

    // 模拟获取用户媒体
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: callSettings.camera,
        audio: callSettings.microphone,
      })

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("获取媒体设备失败:", error)
    }
  }

  const endCall = () => {
    setIsInCall(false)
    setCurrentMeeting(null)

    // 停止所有媒体流
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  const toggleMute = () => {
    setCallSettings((prev) => ({ ...prev, microphone: !prev.microphone }))
  }

  const toggleVideo = () => {
    setCallSettings((prev) => ({ ...prev, camera: !prev.camera }))
  }

  const toggleScreenShare = () => {
    // 实现屏幕共享逻辑
    console.log("切换屏幕共享")
  }

  const sendChatMessage = () => {
    if (!newMessage.trim() || !currentMeeting) return

    const message = {
      id: Date.now().toString(),
      sender: "当前用户",
      message: newMessage,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const getConnectionQualityColor = (quality: Participant["connectionQuality"]) => {
    switch (quality) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}小时${mins}分钟` : `${mins}分钟`
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">视频会议系统</h1>
          <p className="text-muted-foreground">高质量视频通话与协作</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="w-4 h-4 mr-2" />
            设置
          </Button>
          <Dialog open={isCreateMeetingOpen} onOpenChange={setIsCreateMeetingOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
                <Video className="w-4 h-4 mr-2" />
                发起会议
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建新会议</DialogTitle>
                <DialogDescription>设置会议详情并邀请参与者</DialogDescription>
              </DialogHeader>
              <CreateMeetingForm onClose={() => setIsCreateMeetingOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 会议状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">进行中会议</CardTitle>
            <Video className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {meetings.filter((m) => m.status === "ongoing").length}
            </div>
            <p className="text-xs text-muted-foreground">当前活跃会议</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日会议</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">已安排的会议</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">参与人数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meetings.reduce((sum, m) => sum + m.participants.length, 0)}</div>
            <p className="text-xs text-muted-foreground">总参与人数</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">会议时长</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5小时</div>
            <p className="text-xs text-muted-foreground">今日总时长</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      {isInCall && currentMeeting ? (
        <Card className="bg-black rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-[600px] bg-gray-900">
              {/* 主视频区域 */}
              <div className="absolute inset-0">
                <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline />

                {/* 本地视频窗口 */}
                <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
                  <video ref={localVideoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                </div>

                {/* 参与者网格 */}
                <div className="absolute top-4 left-4 space-y-2">
                  {currentMeeting.participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-lg p-2"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={
                            participant.avatar ||
                            `/placeholder.svg?height=32&width=32&text=${participant.name.charAt(0)}`
                          }
                        />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-white text-sm">{participant.name}</span>
                      {participant.isHost && <Badge className="bg-blue-600 text-white text-xs">主持人</Badge>}
                      {participant.isMuted && <MicOff className="w-3 h-3 text-red-400" />}
                      {!participant.isVideoOn && <VideoOff className="w-3 h-3 text-red-400" />}
                      <div
                        className={`w-2 h-2 rounded-full ${
                          participant.connectionQuality === "excellent"
                            ? "bg-green-400"
                            : participant.connectionQuality === "good"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* 会议信息 */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded-lg p-3">
                  <div className="text-white text-center">
                    <h3 className="font-medium">{currentMeeting.title}</h3>
                    <p className="text-sm opacity-75">
                      {currentMeeting.participants.length} 位参与者 •
                      {currentMeeting.isRecording && (
                        <span className="text-red-400 ml-1">
                          <Record className="w-3 h-3 inline mr-1" />
                          录制中
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* 控制栏 */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black bg-opacity-75 rounded-full px-6 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full w-12 h-12 ${callSettings.microphone ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
                    onClick={toggleMute}
                  >
                    {callSettings.microphone ? (
                      <Mic className="w-5 h-5 text-white" />
                    ) : (
                      <MicOff className="w-5 h-5 text-white" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full w-12 h-12 ${callSettings.camera ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
                    onClick={toggleVideo}
                  >
                    {callSettings.camera ? (
                      <Video className="w-5 h-5 text-white" />
                    ) : (
                      <VideoOff className="w-5 h-5 text-white" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600"
                    onClick={toggleScreenShare}
                  >
                    <Share className="w-5 h-5 text-white" />
                  </Button>

                  <Button variant="ghost" size="sm" className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </Button>

                  <Button variant="ghost" size="sm" className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600">
                    <UserPlus className="w-5 h-5 text-white" />
                  </Button>

                  <Button variant="ghost" size="sm" className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600">
                    <MoreHorizontal className="w-5 h-5 text-white" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700"
                    onClick={endCall}
                  >
                    <PhoneOff className="w-5 h-5 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="meetings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meetings">会议列表</TabsTrigger>
            <TabsTrigger value="schedule">会议安排</TabsTrigger>
            <TabsTrigger value="history">历史记录</TabsTrigger>
          </TabsList>

          <TabsContent value="meetings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meetings.map((meeting) => (
                <Card
                  key={meeting.id}
                  className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        <CardDescription>主持人: {meeting.host}</CardDescription>
                      </div>
                      <Badge
                        className={
                          meeting.status === "ongoing"
                            ? "bg-green-100 text-green-800"
                            : meeting.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {meeting.status === "ongoing" ? "进行中" : meeting.status === "scheduled" ? "已安排" : "已结束"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{meeting.startTime.toLocaleString("zh-CN")}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{meeting.participants.length} 人参与</span>
                        </div>
                      </div>

                      {meeting.participants.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">参与者:</span>
                          <div className="flex -space-x-2">
                            {meeting.participants.slice(0, 4).map((participant) => (
                              <Avatar key={participant.id} className="w-6 h-6 border-2 border-white">
                                <AvatarImage
                                  src={
                                    participant.avatar ||
                                    `/placeholder.svg?height=24&width=24&text=${participant.name.charAt(0)}`
                                  }
                                />
                                <AvatarFallback className="text-xs">{participant.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                            {meeting.participants.length > 4 && (
                              <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-xs text-gray-600">+{meeting.participants.length - 4}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {meeting.status === "ongoing" ? (
                          <Button
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            onClick={() => startCall(meeting.id)}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            加入会议
                          </Button>
                        ) : meeting.status === "scheduled" ? (
                          <Button
                            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                            onClick={() => startCall(meeting.id)}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            开始会议
                          </Button>
                        ) : (
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <Video className="w-4 h-4 mr-2" />
                            查看录像
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>会议日程</CardTitle>
                <CardDescription>查看和管理即将到来的会议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>暂无安排的会议</p>
                    <Button className="mt-4" onClick={() => setIsCreateMeetingOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      安排新会议
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>会议历史</CardTitle>
                <CardDescription>查看过往会议记录和录像</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>暂无历史会议记录</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* 设置对话框 */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>视频会议设置</DialogTitle>
            <DialogDescription>配置音视频和会议偏好</DialogDescription>
          </DialogHeader>
          <CallSettingsForm settings={callSettings} onSettingsChange={setCallSettings} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CreateMeetingForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    duration: "60",
    participants: "",
  })

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">会议主题</label>
        <Input
          placeholder="输入会议主题"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">会议描述</label>
        <Input
          placeholder="输入会议描述"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">开始时间</label>
          <Input
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => setFormData((prev) => ({ ...prev, startTime: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">持续时间(分钟)</label>
          <Input
            type="number"
            placeholder="60"
            value={formData.duration}
            onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">邀请参与者</label>
        <Input
          placeholder="输入邮箱地址，用逗号分隔"
          value={formData.participants}
          onChange={(e) => setFormData((prev) => ({ ...prev, participants: e.target.value }))}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button onClick={onClose}>创建会议</Button>
      </div>
    </div>
  )
}

function CallSettingsForm({
  settings,
  onSettingsChange,
}: {
  settings: CallSettings
  onSettingsChange: (settings: CallSettings) => void
}) {
  const updateSetting = (key: keyof CallSettings, value: boolean) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium">音视频设置</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">摄像头</label>
              <p className="text-sm text-muted-foreground">加入会议时自动开启摄像头</p>
            </div>
            <Switch
              checked={settings.autoJoinVideo}
              onCheckedChange={(checked) => updateSetting("autoJoinVideo", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">麦克风</label>
              <p className="text-sm text-muted-foreground">加入会议时自动开启麦克风</p>
            </div>
            <Switch
              checked={settings.autoJoinAudio}
              onCheckedChange={(checked) => updateSetting("autoJoinAudio", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">背景模糊</label>
              <p className="text-sm text-muted-foreground">自动模糊背景</p>
            </div>
            <Switch
              checked={settings.backgroundBlur}
              onCheckedChange={(checked) => updateSetting("backgroundBlur", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">噪音消除</label>
              <p className="text-sm text-muted-foreground">智能降噪功能</p>
            </div>
            <Switch
              checked={settings.noiseCancellation}
              onCheckedChange={(checked) => updateSetting("noiseCancellation", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
