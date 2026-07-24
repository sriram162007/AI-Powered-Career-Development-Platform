"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Briefcase,
  Code2,
  GraduationCap,
  Users,
  Globe,
  Trophy,
  Medal,
  FileText,
  User,
  Sparkles,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { getOrCreateProfile, subscribeToProfile } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";

const sections = [
  { key: "personal", label: "Personal Information", icon: <User size={18} />, weight: 15, fields: ["fullName", "email", "phone", "linkedin", "github", "portfolio", "location"] },
  { key: "academic", label: "Academic Information", icon: <GraduationCap size={18} />, weight: 15, fields: ["university", "degree", "department", "currentYear", "cgpa", "graduationYear"] },
  { key: "career", label: "Career Goal", icon: <Target size={18} />, weight: 10, fields: ["targetRole", "preferredIndustry", "preferredLocation"] },
  { key: "skills", label: "Skills", icon: <Code2 size={18} />, weight: 20, fields: ["skills"] },
  { key: "projects", label: "Projects", icon: <BookOpen size={18} />, weight: 10, fields: ["projects"] },
  { key: "internships", label: "Internships", icon: <Briefcase size={18} />, weight: 10, fields: ["internships"] },
  { key: "certificates", label: "Certificates", icon: <Award size={18} />, weight: 8, fields: ["certificates"] },
  { key: "languages", label: "Languages", icon: <Globe size={18} />, weight: 4, fields: ["languages"] },
  { key: "achievements", label: "Achievements", icon: <Trophy size={18} />, weight: 3, fields: ["achievements"] },
  { key: "volunteer", label: "Volunteer Experience", icon: <Users size={18} />, weight: 2, fields: ["volunteerExperience"] },
  { key: "hackathons", label: "Hackathons", icon: <Medal size={18} />, weight: 2, fields: ["hackathons"] },
  { key: "awards", label: "Awards", icon: <Trophy size={18} />, weight: 2, fields: ["awards"] },
  { key: "publications", label: "Publications", icon: <FileText size={18} />, weight: 2, fields: ["publications"] },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function ProfileCompleteness() {
  const { user } = useAuth();
  const [sectionScores, setSectionScores] = useState<any[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const calculateScores = (profileData: any) => {
    const sectionKeyMap: Record<string, string> = {
      personal: "personalInfo",
      academic: "academicInfo",
      career: "careerGoal",
    };

    const scores = sections.map((section) => {
      let filledFields = 0;
      let totalFields = section.fields.length;
      let sectionData: any;

      if (section.key === "skills") {
        sectionData = profileData.skills || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else if (section.key === "projects") {
        sectionData = profileData.projects || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else if (section.key === "internships") {
        sectionData = profileData.internships || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else if (section.key === "certificates") {
        sectionData = profileData.certificates || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else if (section.key === "languages") {
        sectionData = profileData.languages || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else if (section.key === "achievements") {
        sectionData = profileData.achievements || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else if (section.key === "volunteer") {
        sectionData = profileData.volunteerExperience || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else if (section.key === "hackathons") {
        sectionData = profileData.hackathons || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else if (section.key === "awards") {
        sectionData = profileData.awards || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else if (section.key === "publications") {
        sectionData = profileData.publications || [];
        filledFields = Array.isArray(sectionData) && sectionData.length > 0 ? 1 : 0;
      } else {
        const actualKey = sectionKeyMap[section.key] || section.key;
        sectionData = profileData[actualKey] || {};
        filledFields = section.fields.filter((field: string) => sectionData[field] && String(sectionData[field]).trim() !== "").length;
      }

      const percentage = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
      return {
        ...section,
        filled: filledFields,
        total: totalFields,
        percentage,
        status: percentage === 100 ? "complete" : percentage >= 50 ? "partial" : "incomplete",
      };
    });

    const overall = Math.round(scores.reduce((acc, section) => acc + (section.percentage * section.weight / 100), 0));
    setSectionScores(scores);
    setOverallScore(overall);
  };

  useEffect(() => {
    if (!user?.uid) return;

    let unsubscribe: (() => void) | null = null;

    const init = async () => {
      try {
        const data = await getOrCreateProfile(user.uid, user?.email ?? undefined);
        if (!mountedRef.current) return;
        calculateScores(data);
      } catch (error) {
        console.error("Failed to load profile completeness:", error);
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }

      unsubscribe = subscribeToProfile(user.uid, (profile) => {
        if (!mountedRef.current || !profile) return;
        calculateScores(profile);
      });
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid]);

  const handleRefresh = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const data = await getOrCreateProfile(user.uid, user?.email ?? undefined);
      if (mountedRef.current) {
        calculateScores(data);
      }
    } catch (error) {
      console.error("Failed to refresh profile completeness:", error);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const missingSections = sectionScores.filter((s) => s.percentage < 100);
  const completedSections = sectionScores.filter((s) => s.percentage === 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-navy-200 border-t-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-sm text-navy-400">Analyzing profile completeness...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Profile Completeness</h1>
          <p className="text-sm text-navy-400 mt-1">Complete your profile to unlock all features</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} leftIcon={<Sparkles size={14} />}>
          Refresh Analysis
        </Button>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card padding="md" className="flex flex-col items-center">
            <CircularProgress value={overallScore} label="Overall" sublabel={`${completedSections.length}/${sections.length} sections`} trend={`${overallScore}%`} />
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#ecfdf5" }}>
              <CheckCircle2 size={22} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{completedSections.length}</p>
              <p className="text-xs text-navy-400">Completed Sections</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#fef2f2" }}>
              <XCircle size={22} style={{ color: "#ef4444" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{missingSections.length}</p>
              <p className="text-xs text-navy-400">Missing Sections</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#fef9e7" }}>
              <TrendingUp size={22} style={{ color: "#f5b942" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">+15%</p>
              <p className="text-xs text-navy-400">Improvement Potential</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Section Breakdown</h3>
          <div className="space-y-4">
            {sectionScores.map((section) => (
              <div key={section.key}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: section.status === "complete" ? "#ecfdf5" : section.status === "partial" ? "#fef9e7" : "#fef2f2" }}>
                      {section.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-900">{section.label}</p>
                      <p className="text-xs text-navy-400">{section.filled}/{section.total} fields</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-navy-700">{section.percentage}%</span>
                    {section.status === "complete" ? (
                      <CheckCircle2 size={16} className="text-green-500" />
                    ) : section.status === "partial" ? (
                      <AlertTriangle size={16} className="text-yellow-500" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: section.status === "complete" ? "#22c55e" : section.status === "partial" ? "#f5b942" : "#ef4444",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${section.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Recommended Actions</h3>
          <div className="space-y-3">
            {missingSections.map((section) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-orange-200 bg-orange-50/50"
              >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#fef3f0" }}>
                  <Target size={16} style={{ color: "#ff6b35" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-navy-900">Complete {section.label}</p>
                  <p className="text-xs text-navy-400 mt-0.5">
                    {section.filled === 0
                      ? "This section is empty. Add information to improve your profile."
                      : `You have filled ${section.filled} of ${section.total} fields. Complete the remaining fields.`}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={12} className="text-green-600" />
                    <span className="text-xs text-green-600 font-medium">+{section.weight}% profile score</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {missingSections.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-3" />
              <p className="text-sm font-medium text-navy-900">Profile Complete!</p>
              <p className="text-xs text-navy-400 mt-1">All sections are filled. Great job!</p>
            </div>
          )}
        </Card>
      </div>

      <Card padding="md">
        <h3 className="text-base font-semibold text-navy-900 mb-4">Completion Timeline</h3>
        <div className="space-y-4">
          {[
            { week: "Week 1", tasks: ["Personal Information", "Academic Information"], completed: true },
            { week: "Week 2", tasks: ["Career Goal", "Add 3 Skills"], completed: true },
            { week: "Week 3", tasks: ["Add 2 Projects", "Add 1 Internship"], completed: false },
            { week: "Week 4", tasks: ["Add Certificates", "Add Achievements", "Complete Profile"], completed: false },
          ].map((milestone) => (
            <div key={milestone.week} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${milestone.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                  {milestone.completed ? <CheckCircle2 size={18} /> : <div className="h-2 w-2 rounded-full bg-gray-300" />}
                </div>
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium text-navy-900">{milestone.week}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {milestone.tasks.map((task) => (
                    <Badge key={task} variant={milestone.completed ? "success" : "outline"} size="sm">{task}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
