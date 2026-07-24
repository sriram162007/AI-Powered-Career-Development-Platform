"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Target,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Briefcase,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { getOrCreateProfile, getProfileAnalytics, saveAnalytics, subscribeToProfile } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import type { CareerAnalytics } from "@/types/profile";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function CareerReadinessEngine() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<CareerAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const calculateAnalytics = (profile: any): CareerAnalytics => {
    const skills = profile.skills || [];
    const projects = profile.projects || [];
    const internships = profile.internships || [];
    const certificates = profile.certificates || [];
    const academicInfo = profile.academicInfo;

    const parsedCgpa = parseFloat(academicInfo.cgpa || "0");
    const cgpaScore = !isNaN(parsedCgpa) ? Math.min(100, Math.round((parsedCgpa / 10) * 100)) : 0;
    const skillScore = skills.length > 0 ? Math.min(100, Math.round((skills.filter((s: any) => s.level === "Expert" || s.level === "Advanced").length / Math.max(1, skills.length)) * 100)) : 0;
    const resumeScore = 65;
    const atsScore = 70;
    const projectScore = projects.length > 0 ? Math.min(100, projects.length * 20) : 0;
    const internshipScore = internships.length > 0 ? Math.min(100, internships.length * 25) : 0;
    const certificateScore = certificates.length > 0 ? Math.min(100, certificates.length * 20) : 0;
    const interviewScore = 75;

    const placementReadiness = Math.round((resumeScore * 0.2 + atsScore * 0.15 + skillScore * 0.2 + cgpaScore * 0.1 + projectScore * 0.15 + internshipScore * 0.1 + certificateScore * 0.05 + interviewScore * 0.05));
    const jobReadiness = Math.round((placementReadiness * 0.7 + 30));
    const profileCompleteness = Math.round(
      ([
        profile.personalInfo?.fullName,
        profile.personalInfo?.email,
        profile.personalInfo?.phone,
        academicInfo?.university,
        academicInfo?.degree,
        academicInfo?.cgpa,
        profile.careerGoal?.targetRole,
      ].filter(Boolean).length / 7) * 100
    );

    return {
      resumeScore,
      atsScore,
      skillScore,
      cgpaScore,
      projectScore,
      internshipScore,
      certificateScore,
      interviewScore,
      placementReadiness,
      jobReadiness,
      profileCompleteness,
    };
  };

  useEffect(() => {
    if (!user?.uid) return;

    let unsubscribe: (() => void) | null = null;

    const init = async () => {
      try {
        const profile = await getOrCreateProfile(user.uid, user?.email ?? undefined);
        if (!mountedRef.current) return;

        const existingAnalytics = await getProfileAnalytics(user.uid);
        if (!mountedRef.current) return;

        const calculated = calculateAnalytics(profile);

        if (existingAnalytics) {
          setAnalytics({ ...existingAnalytics, ...calculated });
        } else {
          setAnalytics(calculated);
        }

        await saveAnalytics(user.uid, calculated);
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }

      unsubscribe = subscribeToProfile(user.uid, (profile) => {
        if (!mountedRef.current || !profile) return;
        const calculated = calculateAnalytics(profile);
        setAnalytics(calculated);
        saveAnalytics(user.uid, calculated);
      });
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid]);

  const handleRecalculate = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const profile = await getOrCreateProfile(user.uid, user?.email ?? undefined);
      const calculated = calculateAnalytics(profile);
      setAnalytics(calculated);
      await saveAnalytics(user.uid, calculated);
    } catch (error) {
      console.error("Failed to recalculate analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-navy-200 border-t-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-navy-400">Analyzing your career readiness...</p>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const radarData = [
    { metric: "Resume", value: analytics.resumeScore, fullMark: 100 },
    { metric: "ATS", value: analytics.atsScore, fullMark: 100 },
    { metric: "Skills", value: analytics.skillScore, fullMark: 100 },
    { metric: "CGPA", value: analytics.cgpaScore, fullMark: 100 },
    { metric: "Projects", value: analytics.projectScore, fullMark: 100 },
    { metric: "Internship", value: analytics.internshipScore, fullMark: 100 },
    { metric: "Certs", value: analytics.certificateScore, fullMark: 100 },
    { metric: "Interview", value: analytics.interviewScore, fullMark: 100 },
  ];

  const barData = [
    { name: "Resume", score: analytics.resumeScore },
    { name: "ATS", score: analytics.atsScore },
    { name: "Skills", score: analytics.skillScore },
    { name: "CGPA", score: analytics.cgpaScore },
    { name: "Projects", score: analytics.projectScore },
    { name: "Internship", score: analytics.internshipScore },
    { name: "Certs", score: analytics.certificateScore },
    { name: "Interview", score: analytics.interviewScore },
  ];

  const kpiCards = [
    { title: "Placement Readiness", value: `${analytics.placementReadiness}%`, trend: analytics.placementReadiness >= 70 ? "up" : "down", change: analytics.placementReadiness >= 70 ? "+5%" : "-3%", icon: <Target size={20} />, color: "#ff6b35" },
    { title: "Job Readiness", value: `${analytics.jobReadiness}%`, trend: analytics.jobReadiness >= 70 ? "up" : "down", change: analytics.jobReadiness >= 70 ? "+8%" : "-2%", icon: <Briefcase size={20} />, color: "#3b82f6" },
    { title: "Profile Completeness", value: `${analytics.profileCompleteness}%`, trend: "up", change: "+12%", icon: <Sparkles size={20} />, color: "#22c55e" },
    { title: "Interview Score", value: `${analytics.interviewScore}%`, trend: "up", change: "+5%", icon: <MessageSquare size={20} />, color: "#f5b942" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Career Readiness Engine</h1>
          <p className="text-sm text-navy-400 mt-1">AI-powered analysis of your career preparedness</p>
        </div>
        <Button variant="outline" size="lg" onClick={handleRecalculate} leftIcon={<RefreshCw size={18} />}>
          Recalculate
        </Button>
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
                <Badge variant={kpi.trend === "up" ? "success" : "danger"} size="sm">
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
          <h3 className="text-base font-semibold text-navy-900 mb-4">Readiness Radar</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "#64748b" }} />
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
          <h3 className="text-base font-semibold text-navy-900 mb-4">Score Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="score" fill="url(#readinessGradient)" radius={[6, 6, 0, 0]} barSize={32} />
                <defs>
                  <linearGradient id="readinessGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b35" />
                    <stop offset="100%" stopColor="#f5b942" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-navy-900">Detailed Analysis</h3>
          <Badge variant="outline" size="sm">
            <Sparkles size={12} className="mr-1" />
            AI Powered
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Resume Score", value: analytics.resumeScore, description: "ATS optimization and content quality" },
            { label: "ATS Score", value: analytics.atsScore, description: "Machine readability and keyword matching" },
            { label: "Skill Score", value: analytics.skillScore, description: "Skill depth and diversity" },
            { label: "CGPA Score", value: analytics.cgpaScore, description: "Academic performance indicator" },
            { label: "Project Score", value: analytics.projectScore, description: "Portfolio quality and relevance" },
            { label: "Internship Score", value: analytics.internshipScore, description: "Industry experience level" },
            { label: "Certificate Score", value: analytics.certificateScore, description: "Professional certifications" },
            { label: "Interview Score", value: analytics.interviewScore, description: "Mock interview performance" },
          ].map((metric) => (
            <div key={metric.label} className="p-4 rounded-xl border border-gray-100 bg-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-navy-900">{metric.label}</p>
                <span className="text-lg font-bold text-navy-900">{metric.value}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${metric.value}%`,
                    background: metric.value >= 80 ? "#22c55e" : metric.value >= 60 ? "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)" : "#ef4444",
                  }}
                />
              </div>
              <p className="text-xs text-navy-400">{metric.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="md">
        <h3 className="text-base font-semibold text-navy-900 mb-4">Readiness Timeline</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { month: "Jan", placement: analytics.placementReadiness - 15, job: analytics.jobReadiness - 20 },
                { month: "Feb", placement: analytics.placementReadiness - 10, job: analytics.jobReadiness - 15 },
                { month: "Mar", placement: analytics.placementReadiness - 5, job: analytics.jobReadiness - 10 },
                { month: "Apr", placement: analytics.placementReadiness - 2, job: analytics.jobReadiness - 5 },
                { month: "May", placement: analytics.placementReadiness, job: analytics.jobReadiness },
              ]}
            >
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
              <Line type="monotone" dataKey="placement" stroke="#ff6b35" strokeWidth={2} name="Placement Readiness" dot={{ fill: "#ff6b35", r: 4 }} />
              <Line type="monotone" dataKey="job" stroke="#3b82f6" strokeWidth={2} name="Job Readiness" dot={{ fill: "#3b82f6", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
