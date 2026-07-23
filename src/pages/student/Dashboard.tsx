"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BookOpen, FileText, MessageSquare, TrendingUp, Briefcase, Award } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { QuickActionsSection } from "@/components/dashboard/QuickActions";

const learningData = [
  { month: "Jan", hours: 12, skills: 3 },
  { month: "Feb", hours: 18, skills: 4 },
  { month: "Mar", hours: 15, skills: 5 },
  { month: "Apr", hours: 25, skills: 6 },
  { month: "May", hours: 22, skills: 7 },
  { month: "Jun", hours: 30, skills: 8 },
];

const skillDistribution = [
  { name: "Technical", value: 45, color: "#ff6b35" },
  { name: "Soft Skills", value: 25, color: "#f5b942" },
  { name: "Domain", value: 20, color: "#3b82f6" },
  { name: "Tools", value: 10, color: "#9ca3af" },
];

const recentActivities = [
  {
    id: "1",
    title: "Completed React Advanced Course",
    description: "Finished 12 modules with a score of 92%",
    timestamp: "2 hours ago",
    type: "success" as const,
    icon: <BookOpen size={16} className="text-green-600" />,
  },
  {
    id: "2",
    title: "Resume Updated",
    description: "Added 2 new projects and updated skills section",
    timestamp: "5 hours ago",
    type: "info" as const,
    icon: <FileText size={16} className="text-blue-600" />,
  },
  {
    id: "3",
    title: "Mock Interview Scheduled",
    description: "AI-powered interview with Google engineer on Friday",
    timestamp: "1 day ago",
    type: "warning" as const,
    icon: <MessageSquare size={16} className="text-orange-600" />,
  },
  {
    id: "4",
    title: "Applied to Frontend Internship",
    description: "Application submitted to Stripe for Summer 2026",
    timestamp: "2 days ago",
    type: "default" as const,
    icon: <Briefcase size={16} className="text-navy-500" />,
  },
];

const notifications = [
  {
    id: "1",
    title: "New Job Match: Frontend Developer",
    message: "Google has posted a new role matching your profile with 94% compatibility.",
    time: "10 min ago",
    read: false,
    type: "info" as const,
  },
  {
    id: "2",
    title: "Resume Review Complete",
    message: "Your resume ATS score improved by 5 points. View the detailed report.",
    time: "1 hour ago",
    read: false,
    type: "success" as const,
  },
  {
    id: "3",
    title: "Placement Drive Starting Soon",
    message: "TCS campus placement drive starts in 3 days. Prepare your profile.",
    time: "3 hours ago",
    read: true,
    type: "warning" as const,
  },
  {
    id: "4",
    title: "Weekly Learning Goal Achieved",
    message: "You completed 30 hours of learning this week. Keep it up!",
    time: "1 day ago",
    read: true,
    type: "success" as const,
  },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <WelcomeBanner
        name="Alex"
        subtitle="Track your career progress, improve your skills, and land your dream job with AI-powered insights."
        cta={
          <Button size="lg" rightIcon={<TrendingUp size={18} />}>
            View Career Path
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card padding="md" className="flex flex-col items-center">
          <CircularProgress value={78} label="ATS Score" sublabel="Resume Analysis" trend="+5%" />
        </Card>
        <Card padding="md" className="flex flex-col items-center">
          <CircularProgress value={85} label="Resume Score" sublabel="Overall Quality" trend="+3%" />
        </Card>
        <Card padding="md" className="flex flex-col items-center">
          <CircularProgress value={72} label="Placement Readiness" sublabel="Based on 12 skills" trend="+8%" />
        </Card>
        <Card padding="md" className="flex flex-col items-center">
          <CircularProgress value={68} label="Internship Readiness" sublabel="Experience Match" trend="+12%" />
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
              <BarChart data={learningData}>
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
            <Badge variant="outline" size="sm">8 Skills</Badge>
          </div>
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
          <ActivityList activities={recentActivities} />
        </Card>

        <div className="space-y-4 sm:space-y-6">
          <NotificationPanel
            notifications={notifications}
            onDismiss={(id) => console.log("Dismiss notification:", id)}
            onViewAll={() => console.log("View all notifications")}
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
