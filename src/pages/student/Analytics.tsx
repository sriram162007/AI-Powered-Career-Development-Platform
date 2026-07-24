"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  BookOpen,
  Award,
  FileText,
  Download,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const learningTrend = [
  { week: "W1", hours: 12, skills: 3, score: 72 },
  { week: "W2", hours: 18, skills: 5, score: 76 },
  { week: "W3", hours: 15, skills: 4, score: 74 },
  { week: "W4", hours: 22, skills: 6, score: 80 },
  { week: "W5", hours: 25, skills: 7, score: 82 },
  { week: "W6", hours: 28, skills: 8, score: 85 },
  { week: "W7", hours: 20, skills: 5, score: 78 },
  { week: "W8", hours: 30, skills: 9, score: 88 },
];

const scoreProgress = [
  { month: "Jan", ats: 65, resume: 70, interview: 60 },
  { month: "Feb", ats: 68, resume: 72, interview: 65 },
  { month: "Mar", ats: 72, resume: 75, interview: 70 },
  { month: "Apr", ats: 75, resume: 78, interview: 72 },
  { month: "May", ats: 78, resume: 82, interview: 75 },
  { month: "Jun", ats: 82, resume: 85, interview: 80 },
];

const activityBreakdown = [
  { name: "Learning", value: 35, color: "#ff6b35" },
  { name: "Projects", value: 25, color: "#f5b942" },
  { name: "Interviews", value: 20, color: "#3b82f6" },
  { name: "Networking", value: 12, color: "#22c55e" },
  { name: "Other", value: 8, color: "#9ca3af" },
];

const goalProgress = [
  { goal: "Complete React Course", current: 85, target: 100, color: "#ff6b35" },
  { goal: "Build Portfolio", current: 60, target: 100, color: "#f5b942" },
  { goal: "100 LeetCode Problems", current: 45, target: 100, color: "#3b82f6" },
  { goal: "Network with 50 Professionals", current: 72, target: 100, color: "#22c55e" },
];

const insights = [
  {
    title: "Peak Performance",
    description: "You perform best on Saturdays with an average score of 92.",
    trend: "up",
    change: "+12%",
  },
  {
    title: "Skill Gap Identified",
    description: "System Design score is 15% below target. Recommended action: complete 'Grokking SD' course.",
    trend: "down",
    change: "-15%",
  },
  {
    title: "Consistency Win",
    description: "You have maintained a 12-day learning streak. Keep it up!",
    trend: "up",
    change: "+3 days",
  },
  {
    title: "Application Response Rate",
    description: "Your resume ATS score improved by 5 points. Response rate expected to increase by 20%.",
    trend: "up",
    change: "+5 pts",
  },
];

const kpiCards = [
  {
    title: "Total Learning Hours",
    value: "156h",
    change: "+12%",
    trend: "up",
    icon: <Clock size={20} />,
    color: "#ff6b35",
  },
  {
    title: "Courses Completed",
    value: "8",
    change: "+2",
    trend: "up",
    icon: <BookOpen size={20} />,
    color: "#f5b942",
  },
  {
    title: "Avg Assessment Score",
    value: "84%",
    change: "+5%",
    trend: "up",
    icon: <Award size={20} />,
    color: "#22c55e",
  },
  {
    title: "Resume Views",
    value: "24",
    change: "+8",
    trend: "up",
    icon: <FileText size={20} />,
    color: "#3b82f6",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Analytics</h1>
          <p className="text-sm text-navy-400 mt-1">Deep insights into your career development metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw size={14} />}>
            Refresh
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
            Export
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        {["1m", "3m", "6m", "1y"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              timeRange === range
                ? "bg-navy-900 text-white"
                : "bg-gray-100 text-navy-600 hover:bg-gray-200"
            }`}
          >
            {range === "1m" ? "1 Month" : range === "3m" ? "3 Months" : range === "6m" ? "6 Months" : "1 Year"}
          </button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {kpiCards.map((kpi) => (
          <motion.div key={kpi.title} variants={item}>
            <Card padding="md" className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${kpi.color}15`, color: kpi.color }}
                >
                  {kpi.icon}
                </div>
                <Badge
                  variant={kpi.trend === "up" ? "success" : "danger"}
                  size="sm"
                  className="flex items-center gap-0.5"
                >
                  {kpi.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-navy-900">{kpi.value}</p>
              <p className="text-xs text-navy-400 mt-1">{kpi.title}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-navy-900">Learning Progress</h3>
              <p className="text-xs text-navy-400 mt-0.5">Hours and skills acquired over time</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ background: "#ff6b35" }} />
                <span className="text-xs text-navy-500">Hours</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ background: "#f5b942" }} />
                <span className="text-xs text-navy-500">Skills</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningTrend}>
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff6b35" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
                <Area type="monotone" dataKey="hours" stroke="#ff6b35" fill="url(#hoursGradient)" strokeWidth={2} />
                <Line type="monotone" dataKey="skills" stroke="#f5b942" strokeWidth={2} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-navy-900">Score Progression</h3>
              <p className="text-xs text-navy-400 mt-0.5">ATS, Resume, and Interview scores</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
                <Line type="monotone" dataKey="ats" stroke="#ff6b35" strokeWidth={2} name="ATS Score" dot={false} />
                <Line type="monotone" dataKey="resume" stroke="#f5b942" strokeWidth={2} name="Resume Score" dot={false} />
                <Line type="monotone" dataKey="interview" stroke="#3b82f6" strokeWidth={2} name="Interview Score" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: "#ff6b35" }} />
              <span className="text-xs text-navy-500">ATS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: "#f5b942" }} />
              <span className="text-xs text-navy-500">Resume</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ background: "#3b82f6" }} />
              <span className="text-xs text-navy-500">Interview</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Activity Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activityBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {activityBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {activityBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-navy-600">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-navy-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-navy-900">Goal Progress</h3>
              <p className="text-xs text-navy-400 mt-0.5">Track your personal and professional goals</p>
            </div>
            <Button variant="outline" size="sm" leftIcon={<Target size={14} />}>
              Set New Goal
            </Button>
          </div>
          <div className="space-y-5">
            {goalProgress.map((goal) => (
              <div key={goal.goal}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-navy-900">{goal.goal}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-navy-400">{goal.current}/{goal.target}</span>
                    <span className="text-xs font-semibold text-navy-700">
                      {Math.round((goal.current / goal.target) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: goal.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-navy-900">AI Insights</h3>
            <p className="text-xs text-navy-400 mt-0.5">Personalized recommendations based on your data</p>
          </div>
          <Badge variant="outline" size="sm">
            <Sparkles size={12} className="mr-1" />
            AI Powered
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors"
            >
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                  insight.trend === "up" ? "text-green-600" : "text-red-500"
                }`}
                style={{ background: insight.trend === "up" ? "#ecfdf5" : "#fef2f2" }}
              >
                {insight.trend === "up" ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-navy-900">{insight.title}</p>
                  <Badge
                    variant={insight.trend === "up" ? "success" : "danger"}
                    size="sm"
                  >
                    {insight.change}
                  </Badge>
                </div>
                <p className="text-xs text-navy-400 leading-relaxed">{insight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
