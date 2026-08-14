"use client";

import { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BookOpen, FileText, MessageSquare, TrendingUp, Award } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { QuickActionsSection } from "@/components/dashboard/QuickActions";
import { useAuth } from "@/contexts/AuthContext";
import {
  getOrCreateProfile,
  subscribeToProfile,
  subscribeToSkills,
  subscribeToCourses,
  subscribeToProjects,
} from "@/lib/firestore";
import {
  emptyCareerAnalytics,
  type UserProfile,
  type Skill,
  type Course,
  type Project,
} from "@/types/profile";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "success" | "info" | "warning" | "default";
  icon?: React.ReactNode;
}

const fallbackLearningData = [
  { month: "Jan", hours: 12, skills: 3 },
  { month: "Feb", hours: 18, skills: 4 },
  { month: "Mar", hours: 15, skills: 5 },
  { month: "Apr", hours: 25, skills: 6 },
  { month: "May", hours: 22, skills: 7 },
  { month: "Jun", hours: 30, skills: 8 },
];

const notificationColors = ["#ff6b35", "#f5b942", "#3b82f6", "#9ca3af", "#22c55e", "#8b5cf6", "#ec4899"];

const fallbackNotifications = [
  {
    id: "1",
    title: "New Job Match: Frontend Developer",
    message: "A new role matching your profile has been posted. Check your career recommendations.",
    time: "No recent notifications",
    read: true,
    type: "info" as const,
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    getOrCreateProfile(user.uid, user?.email ?? undefined).then((p) => setProfile(p));

    const unsubProfile = subscribeToProfile(user.uid, (data) => {
      if (data) setProfile(data);
    });
    const unsubSkills = subscribeToSkills(user.uid, (data) => setSkills(data ?? []));
    const unsubCourses = subscribeToCourses(user.uid, setCourses);
    const unsubProjects = subscribeToProjects(user.uid, setProjects);

    return () => {
      unsubProfile?.();
      unsubSkills?.();
      unsubCourses?.();
      unsubProjects?.();
    };
  }, [user?.uid, user?.email]);

  const welcomeName = profile?.personalInfo?.fullName || user?.displayName || "Student";
  const analytics = profile?.analytics || emptyCareerAnalytics;
  const totalSkills = skills.length;

  const skillDistribution = useMemo(() => {
    if (skills.length === 0) return [];

    const categoryCounts: Record<string, number> = {};
    skills.forEach((s) => {
      const cat = s.category || "Other";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const total = skills.length;
    return Object.entries(categoryCounts).map(([name, count], index) => ({
      name,
      value: Math.round((count / total) * 100),
      color: notificationColors[index % notificationColors.length],
    }));
  }, [skills]);

  const recentActivities = useMemo(() => {
    const activities: ActivityItem[] = [];

    projects.slice(0, 2).forEach((p, i) => {
      activities.push({
        id: p.id || `proj-${i}`,
        title: `Project: ${p.projectName || "Untitled Project"}`,
        description: p.description || "No description available.",
        timestamp: "Recently added",
        type: "info",
        icon: <FileText size={16} className="text-blue-600" />,
      });
    });

    courses
      .filter((c) => c.status === "Completed")
      .slice(0, 2)
      .forEach((c, i) => {
        activities.push({
          id: c.id || `course-${i}`,
          title: `Completed ${c.courseName || "Untitled Course"}`,
          description: `via ${c.provider || "Unknown provider"}`,
          timestamp: c.completionDate || "Recently completed",
          type: "success",
          icon: <BookOpen size={16} className="text-green-600" />,
        });
      });

    return activities;
  }, [projects, courses]);

  return (
    <div className="space-y-6">
      <WelcomeBanner
        name={welcomeName}
        subtitle="Track your career progress, improve your skills, and land your dream job with AI-powered insights."
        cta={
          <Button size="lg" rightIcon={<TrendingUp size={18} />}>
            View Career Path
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card padding="md" className="flex flex-col items-center">
          <CircularProgress value={analytics.atsScore} label="ATS Score" sublabel="Resume Analysis" />
        </Card>
        <Card padding="md" className="flex flex-col items-center">
          <CircularProgress value={analytics.resumeScore} label="Resume Score" sublabel="Overall Quality" />
        </Card>
        <Card padding="md" className="flex flex-col items-center">
          <CircularProgress
            value={analytics.placementReadiness}
            label="Placement Readiness"
            sublabel={totalSkills > 0 ? `${totalSkills} skills tracked` : "No skills tracked"}
          />
        </Card>
        <Card padding="md" className="flex flex-col items-center">
          <CircularProgress value={analytics.internshipScore} label="Internship Readiness" sublabel="Experience Match" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card padding="md" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-navy-900">Learning Progress</h3>
              <p className="text-xs text-navy-400 mt-0.5">Hours spent per month</p>
            </div>
            <Badge variant="outline" size="sm">
              <TrendingUp size={12} className="mr-1" />
              +25%
            </Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fallbackLearningData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Bar dataKey="hours" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={32} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b35" />
                    <stop offset="100%" stopColor="#f5b942" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-navy-900">Skill Distribution</h3>
            <Badge variant="outline" size="sm">{totalSkills} Skills</Badge>
          </div>
          {skillDistribution.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="none" />
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
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <Award size={48} className="text-navy-200 mb-3" />
              <p className="text-sm text-navy-400">No skills tracked yet</p>
              <p className="text-xs text-navy-300 mt-1">Add skills to see distribution</p>
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {skillDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: item.color }}
                />
                <span className="text-xs text-navy-600 truncate">{item.name}</span>
                <span className="text-xs font-medium text-navy-900 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card padding="md" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-navy-900">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
              View All
            </Button>
          </div>
          {recentActivities.length > 0 ? (
            <ActivityList activities={recentActivities} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText size={48} className="text-navy-200 mb-3" />
              <p className="text-sm text-navy-400">No recent activity</p>
              <p className="text-xs text-navy-300 mt-1">Your activity will appear here as you progress</p>
            </div>
          )}
        </Card>

        <div className="space-y-4 sm:space-y-6">
          <NotificationPanel
            notifications={fallbackNotifications}
            onDismiss={() => {}}
            onViewAll={() => {}}
          />

          <Card padding="md">
            <h3 className="text-base font-semibold text-navy-900 mb-4">Quick Actions</h3>
            <QuickActionsSection
              actions={[
                {
                  title: "Build Resume",
                  description: "Update your resume with AI assistance",
                  icon: <FileText size={20} />,
                  action: () => console.log("Build Resume"),
                  variant: "primary",
                },
                {
                  title: "Practice Interview",
                  description: "Start an AI mock interview session",
                  icon: <MessageSquare size={20} />,
                  action: () => console.log("Practice Interview"),
                  variant: "default",
                },
                {
                  title: "Take Assessment",
                  description: "Evaluate your current skill level",
                  icon: <Award size={20} />,
                  action: () => console.log("Take Assessment"),
                  variant: "default",
                },
                {
                  title: "View Analytics",
                  description: "Deep dive into your career metrics",
                  icon: <TrendingUp size={20} />,
                  action: () => console.log("View Analytics"),
                  variant: "default",
                },
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
