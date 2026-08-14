"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  Award,
  ArrowRight,
  BookOpen,
  Star,
  Circle,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeToProfile, subscribeToSkills } from "@/lib/firestore";
import type { UserProfile, Skill } from "@/types/profile";
import { emptyCareerAnalytics } from "@/types/profile";

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
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubProfile = subscribeToProfile(user.uid, (data) => {
      if (data) setProfile(data);
    });
    const unsubSkills = subscribeToSkills(user.uid, (data) => {
      setSkills(data ?? []);
    });

    return () => {
      unsubProfile?.();
      unsubSkills?.();
    };
  }, [user?.uid]);

  const welcomeName = useMemo(() => {
    return profile?.personalInfo?.fullName || user?.displayName || "Student";
  }, [profile?.personalInfo?.fullName, user?.displayName]);

  const analytics = profile?.analytics || emptyCareerAnalytics;
  const totalSkills = skills.length;

  return (
    <div className="space-y-6">
      <WelcomeBanner
        name={welcomeName}
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
            <CircularProgress value={analytics.placementReadiness} label="Career Score" sublabel="Overall readiness" />
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex flex-col items-center">
            <CircularProgress value={analytics.resumeScore} label="Skill Match" sublabel="Target roles" />
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex flex-col items-center">
            <CircularProgress value={analytics.atsScore} label="ATS Score" sublabel="Resume Analysis" />
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex flex-col items-center">
            <CircularProgress value={totalSkills > 0 ? 50 : 0} label="Network Strength" sublabel={`${totalSkills} skills tracked`} />
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
              No progress data
            </Badge>
          </div>
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <BookOpen size={48} className="text-navy-200 mb-3" />
            <p className="text-sm text-navy-400">No career progress tracked yet</p>
            <p className="text-xs text-navy-300 mt-1">Upload your resume and complete a skill gap analysis to see your progress</p>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Target Roles</h3>
          {skills.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-navy-400">Based on your skills and career preferences, view recommended target roles in Career Discovery.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Target size={48} className="text-navy-200 mb-3" />
              <p className="text-sm text-navy-400">No target roles set</p>
              <p className="text-xs text-navy-300 mt-1">Complete Career Discovery to set target roles</p>
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Career Timeline</h3>
          {skills.length > 0 || analytics.resumeScore > 0 ? (
            <p className="text-sm text-navy-400">Your career timeline will appear here as you complete milestones. Check back after your first skill assessment or resume analysis.</p>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Circle size={48} className="text-navy-200 mb-3" />
              <p className="text-sm text-navy-400">No milestones yet</p>
              <p className="text-xs text-navy-300 mt-1">Complete your skill gap analysis and resume upload to start building your career timeline</p>
            </div>
          )}
        </Card>

        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">AI Recommendations</h3>
          {skills.length > 0 ? (
            <p className="text-sm text-navy-400">Visit Skill Gap for personalized recommendations based on your targeted career.</p>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Award size={48} className="text-navy-200 mb-3" />
              <p className="text-sm text-navy-400">No recommendations available</p>
              <p className="text-xs text-navy-300 mt-1">Complete your skill gap analysis to get personalized recommendations</p>
            </div>
          )}
          <Button variant="outline" className="w-full mt-4" rightIcon={<Star size={16} />}>
            Get More Insights
          </Button>
        </Card>
      </div>
    </div>
  );
}
