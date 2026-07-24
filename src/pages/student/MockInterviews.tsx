"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Play,
  Clock,
  Star,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Sparkles,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const interviewSessions = [
  {
    id: 1,
    role: "Frontend Engineer",
    company: "Google",
    type: "Technical",
    date: "Today, 2:00 PM",
    status: "upcoming",
    duration: "45 min",
    topics: ["React", "System Design", "DSA"],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Stripe",
    type: "Behavioral",
    date: "Tomorrow, 11:00 AM",
    status: "upcoming",
    duration: "30 min",
    topics: ["Leadership", "Communication", "Culture Fit"],
  },
  {
    id: 3,
    role: "Software Engineer",
    company: "Microsoft",
    type: "Mixed",
    date: "Jul 26, 3:00 PM",
    status: "scheduled",
    duration: "60 min",
    topics: ["Algorithms", "Azure", "OOPS"],
  },
];

const pastInterviews = [
  {
    id: 4,
    role: "Frontend Engineer",
    company: "Amazon",
    date: "Jul 20, 2025",
    score: 82,
    feedback: "Strong technical skills. Improve system design explanations.",
    topics: ["React", "JavaScript", "CSS"],
    passed: true,
  },
  {
    id: 5,
    role: "Software Developer",
    company: "Meta",
    date: "Jul 18, 2025",
    score: 76,
    feedback: "Good problem-solving. Work on edge cases and time complexity.",
    topics: ["DSA", "Python", "SQL"],
    passed: true,
  },
  {
    id: 6,
    role: "Junior Developer",
    company: "Netflix",
    date: "Jul 15, 2025",
    score: 58,
    feedback: "Needs improvement in core CS fundamentals. Retry recommended.",
    topics: ["Networking", "OS", "DBMS"],
    passed: false,
  },
  {
    id: 7,
    role: "Frontend Engineer",
    company: "Google",
    date: "Jul 12, 2025",
    score: 88,
    feedback: "Excellent communication and technical depth. Almost ready!",
    topics: ["React", "TypeScript", "Testing"],
    passed: true,
  },
  {
    id: 8,
    role: "Full Stack Engineer",
    company: "Uber",
    date: "Jul 10, 2025",
    score: 71,
    feedback: "Decent performance. Focus on backend API design patterns.",
    topics: ["Node.js", "MongoDB", "Express"],
    passed: true,
  },
];

const topicPerformance = [
  { topic: "React", score: 88 },
  { topic: "DSA", score: 72 },
  { topic: "System Design", score: 65 },
  { topic: "Behavioral", score: 80 },
  { topic: "JavaScript", score: 85 },
  { topic: "SQL", score: 68 },
];

const performanceTrend = [
  { interview: "I1", score: 58 },
  { interview: "I2", score: 71 },
  { interview: "I3", score: 76 },
  { interview: "I4", score: 82 },
  { interview: "I5", score: 88 },
];

const interviewTypes = [
  {
    type: "Technical",
    description: "Coding, algorithms, and system design",
    icon: <Target size={20} />,
    color: "#ff6b35",
    count: 12,
  },
  {
    type: "Behavioral",
    description: "Leadership, communication, culture fit",
    icon: <MessageSquare size={20} />,
    color: "#f5b942",
    count: 8,
  },
  {
    type: "Mixed",
    description: "Combined technical and behavioral",
    icon: <Sparkles size={20} />,
    color: "#3b82f6",
    count: 15,
  },
  {
    type: "Aptitude",
    description: "Logical reasoning and quantitative",
    icon: <Award size={20} />,
    color: "#22c55e",
    count: 6,
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

export default function MockInterviews() {
  const [showNewInterview, setShowNewInterview] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Mock Interviews</h1>
          <p className="text-sm text-navy-400 mt-1">Practice with AI-powered interview simulations</p>
        </div>
        <Button
          size="lg"
          leftIcon={<Play size={18} />}
          onClick={() => setShowNewInterview(true)}
        >
          Start New Interview
        </Button>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#fef3f0" }}
            >
              <MessageSquare size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">41</p>
              <p className="text-xs text-navy-400">Total Sessions</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#ecfdf5" }}
            >
              <TrendingUp size={22} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">78%</p>
              <p className="text-xs text-navy-400">Avg Score</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#fef9e7" }}
            >
              <Star size={22} style={{ color: "#f5b942" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">4.2</p>
              <p className="text-xs text-navy-400">Avg Rating</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#eff6ff" }}
            >
              <Clock size={22} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">24h</p>
              <p className="text-xs text-navy-400">Total Practice</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card padding="md" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-navy-900">Upcoming Interviews</h3>
              <p className="text-xs text-navy-400 mt-0.5">Scheduled sessions</p>
            </div>
            <Badge variant="outline" size="sm">
              {interviewSessions.length} upcoming
            </Badge>
          </div>
          <div className="space-y-3">
            {interviewSessions.map((session) => (
              <motion.div
                key={session.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-all"
              >
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#f1f5f9" }}
                >
                  <MessageSquare size={22} className="text-navy-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-navy-900 truncate">{session.role}</p>
                    <Badge variant="info" size="sm">{session.type}</Badge>
                  </div>
                  <p className="text-xs text-navy-400">{session.company}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {session.topics.map((topic) => (
                      <Badge key={topic} variant="outline" size="sm">{topic}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs text-navy-500 mb-1">
                    <Calendar size={12} />
                    {session.date}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-navy-400">
                    <Clock size={12} />
                    {session.duration}
                  </div>
                  <Button size="sm" variant="primary" className="mt-2">
                    Join
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="space-y-4 sm:space-y-6">
          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-4">Interview Types</h3>
            <div className="grid grid-cols-2 gap-3">
              {interviewTypes.map((type) => (
                <motion.div
                  key={type.type}
                  whileHover={{ scale: 1.03 }}
                  className="p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all cursor-pointer"
                  style={{ background: "var(--surface, #fff)" }}
                >
                  <div
                    className="mb-2 h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${type.color}15`, color: type.color }}
                  >
                    {type.icon}
                  </div>
                  <p className="text-xs font-semibold text-navy-900">{type.type}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{type.count} sessions</p>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-3">Quick Start</h3>
            <p className="text-xs text-navy-400 mb-3">Choose a scenario to begin practicing</p>
            <div className="space-y-2">
              <Button variant="primary" className="w-full justify-between" rightIcon={<Play size={16} />}>
                Frontend Interview
              </Button>
              <Button variant="outline" className="w-full justify-between" rightIcon={<Play size={16} />}>
                Behavioral Round
              </Button>
              <Button variant="outline" className="w-full justify-between" rightIcon={<Play size={16} />}>
                System Design
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-navy-900">Score Trend</h3>
            <Badge variant="outline" size="sm">
              <TrendingUp size={12} className="mr-1" />
              +17%
            </Badge>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="interview" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#ff6b35" strokeWidth={2} dot={{ fill: "#ff6b35", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Topic Performance</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis dataKey="topic" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} width={80} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="score" fill="url(#interviewGradient)" radius={[0, 4, 4, 0]} barSize={16} />
                <defs>
                  <linearGradient id="interviewGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff6b35" />
                    <stop offset="100%" stopColor="#f5b942" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Past Sessions</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {pastInterviews.map((interview) => (
              <div
                key={interview.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="shrink-0 mt-0.5">
                  {interview.passed ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : (
                    <XCircle size={18} className="text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-navy-900 truncate">{interview.role}</p>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium text-navy-700">{interview.score}</span>
                    </div>
                  </div>
                  <p className="text-xs text-navy-400">{interview.company} • {interview.date}</p>
                  <p className="text-xs text-navy-500 mt-1 line-clamp-1">{interview.feedback}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {interview.topics.map((topic) => (
                      <Badge key={topic} variant="outline" size="sm">{topic}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AnimatePresence>
        {showNewInterview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowNewInterview(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy-900">Start New Interview</h3>
                <button
                  onClick={() => setShowNewInterview(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XCircle size={20} className="text-navy-400" />
                </button>
              </div>
              <p className="text-sm text-navy-400 mb-4">Select an interview type to begin your AI-powered practice session.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {interviewTypes.map((type) => (
                  <motion.button
                    key={type.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all text-left"
                  >
                    <div
                      className="mb-2 h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${type.color}15`, color: type.color }}
                    >
                      {type.icon}
                    </div>
                    <p className="text-sm font-semibold text-navy-900">{type.type}</p>
                    <p className="text-xs text-navy-400 mt-0.5">{type.description}</p>
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowNewInterview(false)}>
                  Cancel
                </Button>
                <Button variant="primary" leftIcon={<Play size={16} />}>
                  Start Interview
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
