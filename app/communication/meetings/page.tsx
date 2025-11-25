"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MeetingRoomManager } from "@/components/meeting-room-manager"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, Calendar, Clock, Users, Plus, Settings, Monitor, Play, Square } from "lucide-react"

interface ScheduledMeeting {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  organizer: string
  participants: string[]
  status: "upcoming" | "ongoing" | "ended"
  roomUrl: string
}

export default function MeetingsPage() {
  const searchParams = useSearchParams()
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | undefined>(searchParams.get("id") || undefined)
  const [currentUserId] = useState("current-user")
  const [meetings, setMeetings] = useState<ScheduledMeeting[]>([])
  const [showMeetingRoom, setShowMeetingRoom] = useState(false)

  // 会议统计数据
  const [meetingStats, setMeetingStats] = useState({
    todayMeetings: 5,
    ongoingMeetings: 2,
    totalParticipants: 34,
    averageDuration: 45,
  })

  // 模拟会议数据
  useEffect(() => {
    const mockMeetings: ScheduledMeeting[] = [
      {
        id: "meeting-1",
        title: "产品开发周会",
        description: "讨论本周产品开发进度和下周计划",
        startTime: new Date(Date.now() + 30 * 60 * 1000), // 30分钟后
        endTime: new Date(Date.now() + 90 * 60 * 1000), // 90分钟后
        organizer: "张产品经理",
        participants: ["李开发", "王设计师", "陈测试"],
        status: "upcoming",
        roomUrl: "https://meet.company.com/room/meeting-1",
      },
      {
        id: "meeting-2",
        title: "技术架构评审",
        description: "新系统技术架构方案评审",
        startTime: new Date(Date.now() - 15 * 60 * 1000), // 15分钟前开始
        endTime: new Date(Date.now() + 45 * 60 * 1000), // 45分钟后结束
        organizer: "李技术总监",
        participants: ["张架构师", "王开发", "赵运维"],
        status: "ongoing",
        roomUrl: "https://meet.company.com/room/meeting-2",
      },
      {
        id: "meeting-3",
        title: "客户需求讨论",
        description: "与客户讨论新功能需求",
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2小时后
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3小时后
        organizer: "王销售经理",
        participants: ["张产品经理", "李客服"],
        status: "upcoming",
        roomUrl: "https://meet.company.com/room/meeting-3",
      },
    ]
    setMeetings(mockMeetings)
  }, [])

  const joinMeeting = (meetingId: string) => {
    setSelectedMeetingId(meetingId)
    setShowMeetingRoom(true)
  }

  const leaveMeeting = () => {
    setShowMeetingRoom(false)
    setSelectedMeetingId(undefined)
  }

  const getStatusColor = (status: ScheduledMeeting["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "ended":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: ScheduledMeeting["status"]) => {
    switch (status) {
      case "upcoming":
        return "即将开始"
      case "ongoing":
        return "进行中"
      case "ended":
        return "已结束"
      default:
        return "未知"
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDuration = (start: Date, end: Date) => {
    const duration = end.getTime() - start.getTime()
    const minutes = Math.floor(duration / (1000 * 60))
    return `${minutes}分钟`
  }

  if (showMeetingRoom && selectedMeetingId) {
    return <MeetingRoomManager currentUserId={currentUserId} roomId={selectedMeetingId} />
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <Video className="w-8 h-8 mr-3 text-blue-600" />
            视频会议
          </h1>
          <p className="text-slate-600 mt-1">高效的远程会议和协作</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Calendar className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            会议日历
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Settings className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            会议设置
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            创建会议
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              今日会议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{meetingStats.todayMeetings}</div>
            <p className="text-sm text-muted-foreground">已安排的会议</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Video className="w-5 h-5 mr-2 text-blue-600" />
              进行中
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{meetingStats.ongoingMeetings}</div>
            <p className="text-sm text-muted-foreground">正在进行的会议</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              参与人数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{meetingStats.totalParticipants}</div>
            <p className="text-sm text-muted-foreground">总参与人数</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              平均时长
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{meetingStats.averageDuration}分钟</div>
            <p className="text-sm text-muted-foreground">会议平均时长</p>
          </CardContent>
        </Card>
      </div>

      {/* 会议列表 */}
      <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg text-blue-700">会议安排</CardTitle>
          <CardDescription>查看和管理您的会议安排</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="border-l-4 border-l-blue-500 bg-blue-50 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-lg text-blue-700">{meeting.title}</h3>
                      <Badge className={getStatusColor(meeting.status)}>{getStatusText(meeting.status)}</Badge>
                      {meeting.status === "ongoing" && (
                        <Badge variant="destructive" className="animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                          直播中
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{meeting.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}
                        </span>
                        <span className="text-gray-400">({formatDuration(meeting.startTime, meeting.endTime)})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{meeting.participants.length + 1} 人参与</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Avatar className="w-4 h-4">
                          <AvatarImage
                            src={`/placeholder.svg?height=16&width=16&text=${meeting.organizer.charAt(0)}`}
                          />
                          <AvatarFallback className="text-xs">{meeting.organizer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>主持人: {meeting.organizer}</span>
                      </div>
                    </div>

                    {/* 参与者头像 */}
                    <div className="flex items-center space-x-2 mt-3">
                      <span className="text-sm text-gray-500">参与者:</span>
                      <div className="flex -space-x-2">
                        <Avatar className="w-6 h-6 border-2 border-white">
                          <AvatarImage
                            src={`/placeholder.svg?height=24&width=24&text=${meeting.organizer.charAt(0)}`}
                          />
                          <AvatarFallback className="text-xs">{meeting.organizer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {meeting.participants.slice(0, 4).map((participant, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-white">
                            <AvatarImage src={`/placeholder.svg?height=24&width=24&text=${participant.charAt(0)}`} />
                            <AvatarFallback className="text-xs">{participant.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {meeting.participants.length > 4 && (
                          <div className="w-6 h-6 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{meeting.participants.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {meeting.status === "ongoing" ? (
                      <Button
                        onClick={() => joinMeeting(meeting.id)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group"
                      >
                        <Video className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                        加入会议
                      </Button>
                    ) : meeting.status === "upcoming" ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => joinMeeting(meeting.id)}
                          className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
                        >
                          <Play className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                          提前加入
                        </Button>
                        <Button
                          variant="outline"
                          className="border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
                        >
                          <Calendar className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                          编辑
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" disabled>
                        <Square className="w-4 h-4 mr-2" />
                        已结束
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 快捷操作 */}
      <Card className="border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-base text-blue-700">快捷操作</CardTitle>
          <CardDescription>常用会议功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <Plus className="w-6 h-6 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">创建会议</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 group"
            >
              <Calendar className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">会议日历</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 group"
            >
              <Monitor className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">屏幕共享</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 bg-transparent border-l-4 border-l-blue-500 transition-all duration-300 hover:scale-105 group"
            >
              <Settings className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">会议设置</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
