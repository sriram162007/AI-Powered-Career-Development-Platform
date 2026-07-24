"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  Award,
  ArrowRight,
  CheckCircle2,
  Circle,
  Star,
  Zap,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import {
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const careerProgress = [
  { month: "Jan", score: 45, readiness: 30 },
  { month: "Feb", score: 52, readiness: 38 },
  { month: "Mar", score: 58, readiness: 45 },
  { month: "Apr", score: 65, readiness: 55 },
  { month: "May", score: 71, readiness: 62 },
  { month: "Jun", score: 78, readiness: 70 },
];

const milestones = [
  {
    id: 1,
    title: "Completed React Advanced Course",
    description: "Mastered hooks, context, and performance optimization",
    date: "Jun 2025",
    status: "completed",
    type: "learning",
  },
  {
    id: 2,
    title: "Built 3 Full-Stack Projects",
    description: "E-commerce, Social Media, and Analytics dashboards",
    date: "Apr 2025",
    status: "completed",
    type: "project",
  },
  {
    id: 3,
    title: "Resume ATS Score: 78/100",
    description: "Improved by 12 points after AI optimization",
    date: "Mar 2025",
    status: "completed",
    type: "achievement",
  },
  {
    id: 4,
    title: "Mock Interview: Senior Frontend",
    description: "Scored 85/100 with Google engineer AI simulation",
    date: "Feb 2025",
    status: "completed",
    type: "interview",
  },
  {
    id: 5,
    title: "Target: Software Engineer at Google",
    description: "Current readiness: 72% | Gap: System Design, DSA",
    date: "Current Goal",
    status: "active",
    type: "goal",
  },
  {
    id: 6,
    title: "System Design Mastery",
    description: "Learn scalable architecture patterns and case studies",
    date: "Next 3 months",
    status: "upcoming",
    type: "learning",
  },
  {
    id: 7,
    title: "Open Source Contribution",
    description: "Contribute to 3 major React libraries on GitHub",
    date: "Next 6 months",
    status: "upcoming",
    type: "project",
  },
  {
    id: 8,
    title: "Technical Leadership Role",
    description: "Lead a team of 5 engineers on a product launch",
    date: "1 Year Goal",
    status: "upcoming",
    type: "goal",
  },
];

const targetRoles = [
  {
    title: "Frontend Engineer",
    company: "Google",
    match: 85,
    salary: "$150K - $200K",
    skills: ["React", "TypeScript", "System Design"],
    color: "#ff6b35",
  },
  {
    title: "Full Stack Developer",
    company: "Stripe",
    match: 78,
    salary: "$140K - $180K",
    skills: ["Node.js", "React", "PostgreSQL"],
    color: "#3b82f6",
  },
  {
    title: "Product Engineer",
    company: "Airbnb",
    match: 72,
    salary: "$130K - $170K",
    skills: ["React", "Analytics", "UX"],
    color: "#f5b942",
  },
];

const recommendations = [
  {
    icon: <Zap size={18} />,
    title: "Strengthen System Design",
    description:
      "Your target roles require system design expertise. Complete the 'Grokking System Design' course.",
    priority: "high",
  },
  {
    icon: <Target size={18} />,
    title: "Practice DSA Daily",
    description:
      "Solve 2 LeetCode problems daily to crack FAANG interviews. Current streak: 5 days.",
    priority: "high",
  },
  {
    icon: <Award size={18} />,
    title: "Build a Portfolio Project",
    description:
      "Create a production-grade app using Next.js and deploy it on Vercel.",
    priority: "medium",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function CareerPath() {
  const [selectedRole, setSelectedRole] = useState(0);

  return (
    <div className="space-y-6">
      <WelcomeBanner
        name="Alex"
        subtitle="Your personalized career roadmap powered by AI insights."
        cta={
          <Button size="lg" rightIcon={<ArrowRight size={18} />}>
            Explore Paths
          </Button>
        }
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card padding="md" className="flex flex-col items-center">
            <CircularProgress value={78} label="Career Score" sublabel="Overall readiness" trend="+5%" />
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex flex-col items-center">
            <CircularProgress value={85} label="Skill Match" sublabel="Target roles" trend="+3%" />
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex flex-col items-center">
            <CircularProgress value={72} label="Interview Ready" sublabel="Based on mocks" trend="+12%" />
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex flex-col items-center">
            <CircularProgress value={68} label="Network Strength" sublabel="Connections made" trend="+8%" />
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card padding="md" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-navy-900">Career Progress</h3>
              <p className="text-xs text-navy-400 mt-0.5">Readiness score over time</p>
            </div>
            <Badge variant="outline" size="sm">
              <TrendingUp size={12} className="mr-1" />
              +12%
            </Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={careerProgress}>
                <defs>
                  <linearGradient id="careerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff6b35" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#ff6b35" fill="url(#careerGradient)" strokeWidth={2} />
                <Line type="monotone" dataKey="readiness" stroke="#f5b942" strokeWidth={2} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Target Roles</h3>
          <div className="space-y-4">
            {targetRoles.map((role, index) => (
              <motion.div
                key={role.company}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedRole === index
                    ? "border-orange-400 shadow-md"
                    : "border-gray-100 hover:border-gray-200"
                }`}
                style={{ background: "var(--surface, #fff)" }}
                onClick={() => setSelectedRole(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{role.title}</p>
                    <p className="text-xs text-navy-400">{role.company}</p>
                  </div>
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center"
                    style={{ background: `${role.color}20` }}
                  >
                    <Target size={16} style={{ color: role.color }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: role.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${role.match}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs font-medium text-navy-700">{role.match}%</span>
                </div>
                <p className="text-xs text-navy-500">{role.salary}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {role.skills.map((skill) => (
                    <Badge key={skill} variant="outline" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Career Timeline</h3>
          <div className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100" />
            <div className="space-y-4">
              {milestones.slice(0, 5).map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="relative z-10 mt-1">
                    {milestone.status === "completed" ? (
                      <CheckCircle2 size={20} className="text-green-500" />
                    ) : milestone.status === "active" ? (
                      <Circle size={20} className="text-orange-500 fill-orange-500" />
                    ) : (
                      <Circle size={20} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-navy-900">{milestone.title}</p>
                    <p className="text-xs text-navy-400 mt-0.5">{milestone.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={
                          milestone.status === "completed"
                            ? "success"
                            : milestone.status === "active"
                              ? "info"
                              : "outline"
                        }
                        size="sm"
                      >
                        {milestone.status}
                      </Badge>
                      <span className="text-xs text-navy-400">{milestone.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white"
              >
                <div
                  className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center"
                  style={{ background: "#fef3f0" }}
                >
                  <span style={{ color: "#ff6b35" }}>{rec.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-navy-900">{rec.title}</p>
                    <Badge
                      variant={rec.priority === "high" ? "danger" : "warning"}
                      size="sm"
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-navy-400 leading-relaxed">{rec.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" rightIcon={<Star size={16} />}>
            Get More Insights
          </Button>
        </Card>
      </div>
    </div>
  );
}
