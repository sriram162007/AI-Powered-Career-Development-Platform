"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Flame,
  Trophy,
  TrendingUp,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Award,
  Target,
  Zap,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

type SkillCategory = "all" | "technical" | "soft" | "domain" | "tools";

const skillsData = [
  {
    id: 1,
    name: "React",
    category: "technical",
    level: "Advanced",
    progress: 88,
    score: 92,
    lastAssessed: "2 days ago",
    icon: "⚛️",
  },
  {
    id: 2,
    name: "TypeScript",
    category: "technical",
    level: "Advanced",
    progress: 82,
    score: 88,
    lastAssessed: "1 week ago",
    icon: "📘",
  },
  {
    id: 3,
    name: "Node.js",
    category: "technical",
    level: "Intermediate",
    progress: 70,
    score: 76,
    lastAssessed: "3 days ago",
    icon: "🟢",
  },
  {
    id: 4,
    name: "Python",
    category: "technical",
    level: "Intermediate",
    progress: 65,
    score: 72,
    lastAssessed: "1 week ago",
    icon: "🐍",
  },
  {
    id: 5,
    name: "Communication",
    category: "soft",
    level: "Advanced",
    progress: 85,
    score: 90,
    lastAssessed: "2 weeks ago",
    icon: "💬",
  },
  {
    id: 6,
    name: "Leadership",
    category: "soft",
    level: "Intermediate",
    progress: 60,
    score: 68,
    lastAssessed: "1 month ago",
    icon: "👥",
  },
  {
    id: 7,
    name: "Problem Solving",
    category: "soft",
    level: "Advanced",
    progress: 90,
    score: 94,
    lastAssessed: "3 days ago",
    icon: "🧩",
  },
  {
    id: 8,
    name: "Time Management",
    category: "soft",
    level: "Intermediate",
    progress: 72,
    score: 78,
    lastAssessed: "2 weeks ago",
    icon: "⏰",
  },
  {
    id: 9,
    name: "Machine Learning",
    category: "domain",
    level: "Beginner",
    progress: 35,
    score: 45,
    lastAssessed: "1 month ago",
    icon: "🤖",
  },
  {
    id: 10,
    name: "Data Science",
    category: "domain",
    level: "Intermediate",
    progress: 55,
    score: 62,
    lastAssessed: "2 weeks ago",
    icon: "📊",
  },
  {
    id: 11,
    name: "Cloud Computing",
    category: "domain",
    level: "Intermediate",
    progress: 60,
    score: 68,
    lastAssessed: "1 week ago",
    icon: "☁️",
  },
  {
    id: 12,
    name: "Docker",
    category: "tools",
    level: "Intermediate",
    progress: 68,
    score: 74,
    lastAssessed: "3 days ago",
    icon: "🐳",
  },
  {
    id: 13,
    name: "Git",
    category: "tools",
    level: "Advanced",
    progress: 85,
    score: 90,
    lastAssessed: "1 week ago",
    icon: "📦",
  },
  {
    id: 14,
    name: "Figma",
    category: "tools",
    level: "Intermediate",
    progress: 58,
    score: 65,
    lastAssessed: "2 weeks ago",
    icon: "🎨",
  },
];

const skillRadarData = [
  { skill: "React", value: 88 },
  { skill: "TypeScript", value: 82 },
  { skill: "Node.js", value: 70 },
  { skill: "Python", value: 65 },
  { skill: "Communication", value: 85 },
  { skill: "Design", value: 58 },
];

const categoryStats = [
  { category: "Technical", count: 4, avgProgress: 76, color: "#ff6b35" },
  { category: "Soft Skills", count: 4, avgProgress: 77, color: "#f5b942" },
  { category: "Domain", count: 3, avgProgress: 50, color: "#3b82f6" },
  { category: "Tools", count: 3, avgProgress: 70, color: "#22c55e" },
];

const achievements = [
  {
    title: "React Master",
    description: "Scored 90+ in React assessment",
    icon: <Trophy size={20} />,
    unlocked: true,
  },
  {
    title: "Quick Learner",
    description: "Completed 5 courses in 30 days",
    icon: <Zap size={20} />,
    unlocked: true,
  },
  {
    title: "Team Player",
    description: "Led 3 group projects successfully",
    icon: <Target size={20} />,
    unlocked: true,
  },
  {
    title: "Python Pro",
    description: "Score 85+ in Python assessment",
    icon: <Award size={20} />,
    unlocked: false,
  },
];

const levelColors: Record<string, string> = {
  Beginner: "#3b82f6",
  Intermediate: "#f59e0b",
  Advanced: "#22c55e",
  Expert: "#ff6b35",
};

const categoryConfig: Record<string, { label: string; icon: string; color: string }> = {
  technical: { label: "Technical", icon: "💻", color: "#ff6b35" },
  soft: { label: "Soft Skills", icon: "🤝", color: "#f5b942" },
  domain: { label: "Domain", icon: "🎯", color: "#3b82f6" },
  tools: { label: "Tools", icon: "🛠️", color: "#22c55e" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function SkillsPage() {
  const [category, setCategory] = useState<SkillCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = category === "all" || skill.category === category;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: { key: SkillCategory; label: string }[] = [
    { key: "all", label: "All Skills" },
    { key: "technical", label: "Technical" },
    { key: "soft", label: "Soft Skills" },
    { key: "domain", label: "Domain" },
    { key: "tools", label: "Tools" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Skills</h1>
          <p className="text-sm text-navy-400 mt-1">Track and improve your professional skills</p>
        </div>
        <Button leftIcon={<Plus size={18} />} rightIcon={<ChevronRight size={16} />}>
          Add New Skill
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
              <GraduationCap size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">14</p>
              <p className="text-xs text-navy-400">Total Skills</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#fef9e7" }}
            >
              <Flame size={22} style={{ color: "#f5b942" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">12</p>
              <p className="text-xs text-navy-400">Day Streak</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#ecfdf5" }}
            >
              <Trophy size={22} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">3</p>
              <p className="text-xs text-navy-400">Achievements</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#eff6ff" }}
            >
              <TrendingUp size={22} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">+8%</p>
              <p className="text-xs text-navy-400">Avg Progress</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card padding="md" className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-semibold text-navy-900">Skill Proficiency</h3>
              <p className="text-xs text-navy-400 mt-0.5">Your top skills by score</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" size={16} />
                <Input
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Filter size={16} />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === cat.key
                    ? "bg-navy-900 text-white"
                    : "bg-gray-100 text-navy-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors"
                >
                  <div className="text-2xl">{skill.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-navy-900 truncate">{skill.name}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
                          style={{
                            color: levelColors[skill.level],
                            backgroundColor: levelColors[skill.level] + "15",
                            border: `1px solid ${levelColors[skill.level]}40`,
                          }}
                        >
                          {skill.level}
                        </span>
                        <span className="text-xs font-semibold text-navy-700 w-8 text-right">
                          {skill.score}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${categoryConfig[skill.category]?.color || "#ff6b35"} 0%, ${categoryConfig[skill.category]?.color || "#f5b942"} 100%)`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.progress}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-xs text-navy-400 w-10 text-right">{skill.progress}%</span>
                    </div>
                    <p className="text-xs text-navy-400 mt-1">Assessed {skill.lastAssessed}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        <div className="space-y-4 sm:space-y-6">
          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-4">Skill Radar</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#ff6b35"
                    fill="#ff6b35"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-4">Categories</h3>
            <div className="space-y-3">
              {categoryStats.map((cat) => (
                <div key={cat.category} className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: `${cat.color}15` }}
                  >
                    {categoryConfig[cat.category.toLowerCase()]?.icon || "📊"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-navy-900">{cat.category}</p>
                      <span className="text-xs text-navy-400">{cat.count} skills</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: cat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.avgProgress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-navy-700 w-10 text-right">
                    {cat.avgProgress}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <div
                  key={ach.title}
                  className={`p-3 rounded-xl border text-center ${
                    ach.unlocked
                      ? "border-orange-200 bg-orange-50/50"
                      : "border-gray-100 bg-gray-50 opacity-60"
                  }`}
                >
                  <div
                    className={`mx-auto mb-2 h-10 w-10 rounded-full flex items-center justify-center ${
                      ach.unlocked ? "text-orange-600" : "text-gray-400"
                    }`}
                    style={
                      ach.unlocked
                        ? { background: "#fef3f0" }
                        : { background: "#f1f5f9" }
                    }
                  >
                    {ach.icon}
                  </div>
                  <p className="text-xs font-medium text-navy-900 truncate">{ach.title}</p>
                  <p className="text-xs text-navy-400 mt-0.5 line-clamp-1">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
