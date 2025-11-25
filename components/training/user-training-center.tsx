"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  BookOpen,
  Users,
  Clock,
  Star,
  Play,
  CheckCircle,
  Target,
  Search,
  Filter,
  Download,
  Share2,
  Calendar,
  Trophy,
} from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: "beginner" | "intermediate" | "advanced"
  duration: number
  instructor: string
  rating: number
  enrollments: number
  completionRate: number
  thumbnail: string
  tags: string[]
  isEnrolled: boolean
  progress: number
  lastAccessed?: Date
}

interface LearningPath {
  id: string
  title: string
  description: string
  courses: string[]
  estimatedTime: number
  difficulty: "beginner" | "intermediate" | "advanced"
  completionRate: number
  enrollments: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: string
  earnedAt?: Date
  progress: number
  requirement: number
}

export function UserTrainingCenter() {
  const [courses] = useState<Course[]>([
    {
      id: "course_1",
      title: "企业管理系统基础操作",
      description: "学习系统的基本功能和操作流程",
      category: "基础操作",
      level: "beginner",
      duration: 120,
      instructor: "张老师",
      rating: 4.8,
      enrollments: 1250,
      completionRate: 85,
      thumbnail: "/placeholder.svg?height=200&width=300&text=基础操作",
      tags: ["基础", "操作", "入门"],
      isEnrolled: true,
      progress: 75,
      lastAccessed: new Date("2024-01-18"),
    },
    {
      id: "course_2",
      title: "客户管理高级技巧",
      description: "深入学习客户管理的高级功能和最佳实践",
      category: "客户管理",
      level: "intermediate",
      duration: 180,
      instructor: "李老师",
      rating: 4.9,
      enrollments: 890,
      completionRate: 78,
      thumbnail: "/placeholder.svg?height=200&width=300&text=客户管理",
      tags: ["客户", "管理", "高级"],
      isEnrolled: true,
      progress: 45,
      lastAccessed: new Date("2024-01-15"),
    },
    {
      id: "course_3",
      title: "数据分析与报表制作",
      description: "掌握数据分析工具和报表制作技能",
      category: "数据分析",
      level: "advanced",
      duration: 240,
      instructor: "王老师",
      rating: 4.7,
      enrollments: 650,
      completionRate: 72,
      thumbnail: "/placeholder.svg?height=200&width=300&text=数据分析",
      tags: ["数据", "分析", "报表"],
      isEnrolled: false,
      progress: 0,
    },
    {
      id: "course_4",
      title: "任务管理与协作",
      description: "提升团队协作效率的任务管理技巧",
      category: "任务管理",
      level: "intermediate",
      duration: 150,
      instructor: "赵老师",
      rating: 4.6,
      enrollments: 720,
      completionRate: 80,
      thumbnail: "/placeholder.svg?height=200&width=300&text=任务管理",
      tags: ["任务", "协作", "效率"],
      isEnrolled: true,
      progress: 20,
      lastAccessed: new Date("2024-01-10"),
    },
  ])

  const [learningPaths] = useState<LearningPath[]>([
    {
      id: "path_1",
      title: "新员工入门路径",
      description: "为新员工设计的完整学习路径",
      courses: ["course_1", "course_4"],
      estimatedTime: 270,
      difficulty: "beginner",
      completionRate: 65,
      enrollments: 450,
    },
    {
      id: "path_2",
      title: "销售专员进阶",
      description: "销售人员技能提升专用路径",
      courses: ["course_2", "course_3"],
      estimatedTime: 420,
      difficulty: "intermediate",
      completionRate: 58,
      enrollments: 320,
    },
  ])

  const [achievements] = useState<Achievement[]>([
    {
      id: "ach_1",
      title: "学习新手",
      description: "完成第一门课程",
      icon: "🎓",
      category: "学习",
      earnedAt: new Date("2024-01-10"),
      progress: 1,
      requirement: 1,
    },
    {
      id: "ach_2",
      title: "知识探索者",
      description: "完成5门课程",
      icon: "🔍",
      category: "学习",
      progress: 2,
      requirement: 5,
    },
    {
      id: "ach_3",
      title: "学习达人",
      description: "连续学习7天",
      icon: "🔥",
      category: "坚持",
      earnedAt: new Date("2024-01-15"),
      progress: 7,
      requirement: 7,
    },
    {
      id: "ach_4",
      title: "分享专家",
      description: "分享10次学习心得",
      icon: "📢",
      category: "分享",
      progress: 3,
      requirement: 10,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // 学习统计数据
  const learningStats = {
    totalCourses: courses.length,
    enrolledCourses: courses.filter((c) => c.isEnrolled).length,
    completedCourses: courses.filter((c) => c.isEnrolled && c.progress === 100).length,
    totalHours: courses.filter((c) => c.isEnrolled).reduce((sum, c) => sum + (c.duration * c.progress) / 100, 0) / 60,
    averageProgress: Math.round(
      courses.filter((c) => c.isEnrolled).reduce((sum, c) => sum + c.progress, 0) /
        courses.filter((c) => c.isEnrolled).length,
    ),
  }

  // 学习进度趋势
  const progressTrend = [
    { week: "第1周", hours: 3.5, courses: 1 },
    { week: "第2周", hours: 5.2, courses: 2 },
    { week: "第3周", hours: 4.8, courses: 2 },
    { week: "第4周", hours: 6.1, courses: 3 },
  ]

  // 技能分布
  const skillDistribution = [
    { skill: "基础操作", level: 85, color: "#3b82f6" },
    { skill: "客户管理", level: 70, color: "#10b981" },
    { skill: "数据分析", level: 45, color: "#f59e0b" },
    { skill: "任务管理", level: 60, color: "#8b5cf6" },
    { skill: "系统配置", level: 30, color: "#ef4444" },
  ]

  // 课程完成率分布
  const completionData = [
    { range: "0-25%", count: 1, color: "#ef4444" },
    { range: "26-50%", count: 1, color: "#f59e0b" },
    { range: "51-75%", count: 1, color: "#3b82f6" },
    { range: "76-100%", count: 1, color: "#10b981" },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "beginner":
        return "初级"
      case "intermediate":
        return "中级"
      case "advanced":
        return "高级"
      default:
        return level
    }
  }

  const enrollCourse = (courseId: string) => {
    // 这里实现课程报名逻辑
    console.log("报名课程:", courseId)
  }

  const continueCourse = (courseId: string) => {
    // 这里实现继续学习逻辑
    console.log("继续学习:", courseId)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
            用户培训中心
          </h1>
          <p className="text-muted-foreground">提升技能水平，掌握系统使用技巧</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            学习证书
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            学习计划
          </Button>
        </div>
      </div>

      {/* 学习统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{learningStats.enrolledCourses}</p>
            <p className="text-sm text-gray-600">已报名课程</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{learningStats.completedCourses}</p>
            <p className="text-sm text-gray-600">已完成课程</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{learningStats.totalHours.toFixed(1)}</p>
            <p className="text-sm text-gray-600">学习时长(小时)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{learningStats.averageProgress}%</p>
            <p className="text-sm text-gray-600">平均进度</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold">{achievements.filter((a) => a.earnedAt).length}</p>
            <p className="text-sm text-gray-600">获得成就</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="courses">课程中心</TabsTrigger>
          <TabsTrigger value="paths">学习路径</TabsTrigger>
          <TabsTrigger value="progress">学习进度</TabsTrigger>
          <TabsTrigger value="achievements">成就系统</TabsTrigger>
          <TabsTrigger value="community">学习社区</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* 搜索和筛选 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="搜索课程..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">所有分类</option>
                    <option value="基础操作">基础操作</option>
                    <option value="客户管理">客户管理</option>
                    <option value="数据分析">数据分析</option>
                    <option value="任务管理">任务管理</option>
                  </select>
                </div>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">所有难度</option>
                  <option value="beginner">初级</option>
                  <option value="intermediate">中级</option>
                  <option value="advanced">高级</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 课程列表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.description}</CardDescription>
                    </div>
                    <Badge className={getLevelColor(course.level)}>{getLevelLabel(course.level)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.enrollments}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}分钟
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{course.instructor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {course.isEnrolled ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>学习进度</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex space-x-2">
                        <Button onClick={() => continueCourse(course.id)} className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          继续学习
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => enrollCourse(course.id)} className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      立即报名
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="paths" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <CardDescription className="mt-2">{path.description}</CardDescription>
                    </div>
                    <Badge className={getLevelColor(path.difficulty)}>{getLevelLabel(path.difficulty)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{path.courses.length}</p>
                      <p className="text-sm text-gray-600">课程数量</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{Math.round(path.estimatedTime / 60)}h</p>
                      <p className="text-sm text-gray-600">预计时长</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{path.enrollments}</p>
                      <p className="text-sm text-gray-600">学习人数</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>完成率</span>
                      <span>{path.completionRate}%</span>
                    </div>
                    <Progress value={path.completionRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">包含课程:</h4>
                    <div className="space-y-1">
                      {path.courses.map((courseId) => {
                        const course = courses.find((c) => c.id === courseId)
                        return (
                          <div key={courseId} className="flex items-center justify-between text-sm">
                            <span>{course?.title}</span>
                            <Badge variant="outline" className="text-xs">
                              {course?.duration}分钟
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <Button className="w-full">
                    <Target className="w-4 h-4 mr-2" />
                    开始学习路径
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>学习时长趋势</CardTitle>
                <CardDescription>每周学习时间和课程数量变化</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    hours: {
                      label: "学习时长",
                      color: "hsl(var(--chart-1))",
                    },
                    courses: {
                      label: "课程数量",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="hours"
                        stroke="var(--color-hours)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="courses"
                        stroke="var(--color-courses)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>技能水平分布</CardTitle>
                <CardDescription>各项技能的掌握程度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillDistribution.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <span className="text-sm text-gray-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: skill.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>课程完成情况</CardTitle>
              <CardDescription>当前报名课程的学习进度</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses
                  .filter((course) => course.isEnrolled)
                  .map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{course.progress}%</p>
                          <p className="text-xs text-gray-500">{course.lastAccessed?.toLocaleDateString("zh-CN")}</p>
                        </div>
                        <div className="w-24">
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <Button size="sm" onClick={() => continueCourse(course.id)}>
                          <Play className="w-3 h-3 mr-1" />
                          继续
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`hover:shadow-lg transition-shadow ${
                  achievement.earnedAt ? "border-yellow-200 bg-yellow-50" : ""
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

                  {achievement.earnedAt ? (
                    <div>
                      <Badge className="bg-yellow-100 text-yellow-800 mb-2">已获得</Badge>
                      <p className="text-xs text-gray-500">{achievement.earnedAt.toLocaleDateString("zh-CN")}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>进度</span>
                        <span>
                          {achievement.progress}/{achievement.requirement}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.requirement) * 100} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>成就统计</CardTitle>
              <CardDescription>各类成就的获得情况</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "成就数量",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "已获得", value: achievements.filter((a) => a.earnedAt).length, color: "#10b981" },
                        {
                          name: "进行中",
                          value: achievements.filter((a) => !a.earnedAt && a.progress > 0).length,
                          color: "#f59e0b",
                        },
                        {
                          name: "未开始",
                          value: achievements.filter((a) => !a.earnedAt && a.progress === 0).length,
                          color: "#6b7280",
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: "已获得", value: achievements.filter((a) => a.earnedAt).length, color: "#10b981" },
                        {
                          name: "进行中",
                          value: achievements.filter((a) => !a.earnedAt && a.progress > 0).length,
                          color: "#f59e0b",
                        },
                        {
                          name: "未开始",
                          value: achievements.filter((a) => !a.earnedAt && a.progress === 0).length,
                          color: "#6b7280",
                        },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>学习讨论</CardTitle>
                <CardDescription>与其他学员交流学习心得</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      user: "张三",
                      avatar: "/placeholder.svg?height=40&width=40&text=张",
                      content: "客户管理模块的高级筛选功能真的很实用，大大提高了工作效率！",
                      course: "客户管理高级技巧",
                      time: "2小时前",
                      likes: 12,
                    },
                    {
                      user: "李四",
                      avatar: "/placeholder.svg?height=40&width=40&text=李",
                      content: "数据分析课程中的图表制作部分有点难理解，有没有同学可以分享一下经验？",
                      course: "数据分析与报表制作",
                      time: "4小时前",
                      likes: 8,
                    },
                    {
                      user: "王五",
                      avatar: "/placeholder.svg?height=40&width=40&text=王",
                      content: "刚完成了基础操作课程，感觉对系统的理解更深入了，推荐新同事学习！",
                      course: "企业管理系统基础操作",
                      time: "1天前",
                      likes: 15,
                    },
                  ].map((discussion, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={discussion.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{discussion.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">{discussion.user}</span>
                            <Badge variant="outline" className="text-xs">
                              {discussion.course}
                            </Badge>
                            <span className="text-xs text-gray-500">{discussion.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{discussion.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-blue-600">
                              <Star className="w-3 h-3" />
                              <span>{discussion.likes}</span>
                            </button>
                            <button className="hover:text-blue-600">回复</button>
                            <button className="hover:text-blue-600">分享</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>学习排行榜</CardTitle>
                  <CardDescription>本月学习时长排名</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: "张三", hours: 25.5, avatar: "/placeholder.svg?height=32&width=32&text=张" },
                      { rank: 2, name: "李四", hours: 22.3, avatar: "/placeholder.svg?height=32&width=32&text=李" },
                      { rank: 3, name: "王五", hours: 19.8, avatar: "/placeholder.svg?height=32&width=32&text=王" },
                      { rank: 4, name: "赵六", hours: 18.2, avatar: "/placeholder.svg?height=32&width=32&text=赵" },
                      { rank: 5, name: "你", hours: 16.7, avatar: "/placeholder.svg?height=32&width=32&text=我" },
                    ].map((user) => (
                      <div key={user.rank} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              user.rank <= 3 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {user.rank}
                          </div>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{user.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{user.hours}h</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>学习小组</CardTitle>
                  <CardDescription>加入学习小组，共同进步</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "新员工互助组", members: 45, activity: "高" },
                      { name: "数据分析爱好者", members: 32, activity: "中" },
                      { name: "系统管理专家", members: 28, activity: "高" },
                    ].map((group, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{group.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {group.members}人
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">活跃度: {group.activity}</span>
                          <Button size="sm" variant="outline">
                            加入
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
