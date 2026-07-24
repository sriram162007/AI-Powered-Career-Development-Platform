"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  TrendingUp,
  Flame,
  Trophy,
  Target,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { subscribeToSkills, addSkill, updateSkill, deleteSkill } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import type { Skill, SkillLevel } from "@/types/profile";

type SkillCategory = "all" | "technical" | "soft" | "domain" | "tools";

const skillCategories = [
  { key: "all", label: "All", count: 0 },
  { key: "technical", label: "Technical", count: 0 },
  { key: "soft", label: "Soft Skills", count: 0 },
  { key: "domain", label: "Domain", count: 0 },
  { key: "tools", label: "Tools", count: 0 },
];

const levelColors: Record<SkillLevel, { bg: string; text: string }> = {
  Beginner: { bg: "#dbeafe", text: "#1d4ed8" },
  Intermediate: { bg: "#fef3c7", text: "#b45309" },
  Advanced: { bg: "#d1fae5", text: "#065f46" },
  Expert: { bg: "#fef3f0", text: "#c2410c" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function SkillsManagement() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [category, setCategory] = useState<SkillCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    category: "technical",
    level: "Beginner",
    lastUpdated: new Date().toISOString().split("T")[0],
    source: "Self Learning",
  });

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = subscribeToSkills(user.uid, (data) => setSkills(data));
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid]);

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = category === "all" || skill.category === category;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryCounts = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoriesWithCounts = skillCategories.map((cat) => ({
    ...cat,
    count: cat.key === "all" ? skills.length : categoryCounts[cat.key] || 0,
  }));

  const handleAddSkill = async () => {
    if (!newSkill.name.trim() || !user?.uid) return;
    if (editingSkill) {
      await updateSkill(user.uid, editingSkill.id!, newSkill);
      setEditingSkill(null);
    } else {
      await addSkill(user.uid, newSkill);
    }
    setNewSkill({
      name: "",
      category: "technical",
      level: "Beginner",
      lastUpdated: new Date().toISOString().split("T")[0],
      source: "Self Learning",
    });
    setShowAddModal(false);
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setNewSkill({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      lastUpdated: skill.lastUpdated,
      source: skill.source,
    });
    setShowAddModal(true);
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (!user?.uid) return;
    if (confirm("Are you sure you want to delete this skill?")) {
      await deleteSkill(user.uid, skillId);
    }
  };

  const skillRadarData = filteredSkills.slice(0, 6).map((skill) => ({
    skill: skill.name,
    value: skill.level === "Expert" ? 95 : skill.level === "Advanced" ? 80 : skill.level === "Intermediate" ? 60 : 40,
  }));

  const skillHeatmap = filteredSkills.map((skill) => ({
    name: skill.name,
    value: skill.level === "Expert" ? 4 : skill.level === "Advanced" ? 3 : skill.level === "Intermediate" ? 2 : 1,
    level: skill.level,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Skills Management</h1>
          <p className="text-sm text-navy-400 mt-1">Manage and track your professional skills</p>
        </div>
        <Button size="lg" leftIcon={<Plus size={18} />} onClick={() => { setEditingSkill(null); setNewSkill({ name: "", category: "technical", level: "Beginner", lastUpdated: new Date().toISOString().split("T")[0], source: "Self Learning" }); setShowAddModal(true); }}>
          Add Skill
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
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#fef3f0" }}>
              <TrendingUp size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{skills.length}</p>
              <p className="text-xs text-navy-400">Total Skills</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#fef9e7" }}>
              <Flame size={22} style={{ color: "#f5b942" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">
                {skills.filter((s) => s.level === "Expert" || s.level === "Advanced").length}
              </p>
              <p className="text-xs text-navy-400">Advanced+ Skills</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#ecfdf5" }}>
              <Trophy size={22} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">
                {skills.filter((s) => s.level === "Expert").length}
              </p>
              <p className="text-xs text-navy-400">Expert Skills</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#eff6ff" }}>
              <Target size={22} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">
                {skills.length > 0 ? Math.round((skills.filter((s) => s.level === "Expert" || s.level === "Advanced").length / skills.length) * 100) : 0}%
              </p>
              <p className="text-xs text-navy-400">Skill Quality</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card padding="md" className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-semibold text-navy-900">Skill Inventory</h3>
              <p className="text-xs text-navy-400 mt-0.5">All your skills with levels and sources</p>
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
            {categoriesWithCounts.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key as SkillCategory)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === cat.key
                    ? "bg-navy-900 text-white"
                    : "bg-gray-100 text-navy-600 hover:bg-gray-200"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-navy-900 truncate">{skill.name}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
                          style={{
                            color: levelColors[skill.level].text,
                            backgroundColor: levelColors[skill.level].bg,
                            border: `1px solid ${levelColors[skill.level].text}40`,
                          }}
                        >
                          {skill.level}
                        </span>
                        <Badge variant="outline" size="sm">{skill.source}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: skill.level === "Expert" ? "#22c55e" : skill.level === "Advanced" ? "#ff6b35" : skill.level === "Intermediate" ? "#f5b942" : "#3b82f6",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level === "Expert" ? 95 : skill.level === "Advanced" ? 80 : skill.level === "Intermediate" ? 60 : 40}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-xs text-navy-400 w-24 text-right">{skill.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => handleEditSkill(skill)}>
                      <Edit3 size={16} className="text-navy-500" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteSkill(skill.id!)}>
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
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
                  <Radar name="Score" dataKey="value" stroke="#ff6b35" fill="#ff6b35" fillOpacity={0.2} strokeWidth={2} />
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
            <h3 className="text-base font-semibold text-navy-900 mb-4">Level Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillHeatmap}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="value" fill="url(#skillGradient)" radius={[4, 4, 0, 0]} barSize={20} />
                  <defs>
                    <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff6b35" />
                      <stop offset="100%" stopColor="#f5b942" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy-900">{editingSkill ? "Edit Skill" : "Add New Skill"}</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                  <Trash2 size={20} className="text-navy-400" />
                </button>
              </div>
              <div className="space-y-4">
                <Input label="Skill Name" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} placeholder="e.g., React, Python, Leadership" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">Category</label>
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                      style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                    >
                      <option value="technical">Technical</option>
                      <option value="soft">Soft Skills</option>
                      <option value="domain">Domain</option>
                      <option value="tools">Tools</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">Level</label>
                    <select
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as SkillLevel })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                      style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Source</label>
                  <select
                    value={newSkill.source}
                    onChange={(e) => setNewSkill({ ...newSkill, source: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                    style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                  >
                    <option value="Course">Course</option>
                    <option value="Internship">Internship</option>
                    <option value="Project">Project</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Self Learning">Self Learning</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAddSkill}>{editingSkill ? "Update" : "Add"} Skill</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
