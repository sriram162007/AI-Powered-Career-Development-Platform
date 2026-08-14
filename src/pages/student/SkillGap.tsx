"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Award,
  TrendingUp,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { useAuth } from "@/contexts/AuthContext";
import { getOrCreateProfile, subscribeToProfile, subscribeToSkills } from "@/lib/firestore";
import { getCareerById, type CareerRole } from "@/data/careers";
import { calculateSkillGapFromProfile } from "@/lib/skillGapEngine";
import type { SkillGapResult, SkillGapItem, ProficiencyLevel } from "@/types/skillGap";
import type { Skill } from "@/types/profile";

const statusIcons = {
  STRONG: <CheckCircle2 size={16} className="text-green-500" />,
  DEVELOPING: <AlertCircle size={16} className="text-orange-500" />,
  MISSING: <XCircle size={16} className="text-red-500" />,
};

const statusColors = {
  STRONG: "success",
  DEVELOPING: "warning",
  MISSING: "danger",
} as const;

const priorityColors = {
  HIGH: "danger",
  MEDIUM: "warning",
  LOW: "default",
} as const;

const levelColors: Record<ProficiencyLevel, { bg: string; text: string; value: number }> = {
  None: { bg: "#f1f5f9", text: "#94a3b8", value: 0 },
  Beginner: { bg: "#dbeafe", text: "#1d4ed8", value: 25 },
  Intermediate: { bg: "#fef3c7", text: "#b45309", value: 50 },
  Advanced: { bg: "#d1fae5", text: "#065f46", value: 100 },
};

const catOrder: Record<string, number> = {
  Prerequisite: 0,
  Foundation: 1,
  Core: 2,
  Advanced: 3,
  Tool: 4,
};

function sortGaps(gaps: SkillGapItem[]): SkillGapItem[] {
  return [...gaps].sort((a, b) => {
    const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    const priDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priDiff !== 0) return priDiff;

    const catDiff = (catOrder[a.category] ?? 5) - (catOrder[b.category] ?? 5);
    if (catDiff !== 0) return catDiff;

    return a.skillName.localeCompare(b.skillName);
  });
}

function SkillLevelBar({ level }: { level: ProficiencyLevel }) {
  const config = levelColors[level];
  return (
    <div className="flex items-center gap-2 min-w-24">
      <div className="text-xs font-medium" style={{ color: config.text }}>{level}</div>
      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${config.value}%`, backgroundColor: config.text }}
        />
      </div>
    </div>
  );
}

function GapItem({ item, showReason = true }: { item: SkillGapItem; showReason?: boolean }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors">
      <div className="mt-0.5 shrink-0">
        {statusIcons[item.status]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-navy-900">{item.skillName}</span>
          <Badge variant={statusColors[item.status]} size="sm">
            {item.status}
          </Badge>
          <Badge variant={priorityColors[item.priority]} size="sm">
            {item.priority}
          </Badge>
          <Badge variant="outline" size="sm">
            {item.category}
          </Badge>
        </div>

        <div className="flex items-center gap-4 mt-1 text-xs text-navy-400">
          <span>Expected: {item.expectedLevel}</span>
          <span>•</span>
          <span>You have: {item.studentLevel}</span>
        </div>

        {showReason && item.reason && (
          <p className="text-xs text-navy-400 mt-1.5 leading-relaxed">
            {item.reason}
          </p>
        )}
      </div>
    </div>
  );
}

export default function SkillGap() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedCareer, setSelectedCareer] = useState<CareerRole | null>(null);
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [gapResult, setGapResult] = useState<SkillGapResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [firestoreError, setFirestoreError] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const profile = await getOrCreateProfile(user.uid, user?.email ?? undefined);
        const careerId = profile.careerPreferences?.selectedCareerId;

        if (careerId) {
          const career = getCareerById(careerId);
          setSelectedCareer(career ?? null);
        }
        setFirestoreError(false);
      } catch {
        setFirestoreError(true);
      }
    };

    loadProfile();

    const unsubProfile = subscribeToProfile(user.uid, (data) => {
      if (data) {
        if (data.careerPreferences?.selectedCareerId) {
          const career = getCareerById(data.careerPreferences.selectedCareerId);
          setSelectedCareer(career ?? null);
        } else {
          setSelectedCareer(null);
        }
      }
    });

    const unsubSkills = subscribeToSkills(user.uid, (data) => {
      if (data === null) {
        setFirestoreError(true);
        setSkills(null);
      } else {
        setSkills(data);
        setFirestoreError(false);
      }
    });

    setLoading(false);

    return () => {
      unsubProfile?.();
      unsubSkills?.();
    };
  }, [user?.uid, user?.email]);

  useEffect(() => {
    if (!selectedCareer || skills === null) return;

    const skillInputs = skills.map((s) => ({ name: s.name, level: s.level }));
    const result = calculateSkillGapFromProfile(selectedCareer.id, skillInputs);
    setGapResult(result);
  }, [selectedCareer, skills]);

  useEffect(() => {
    if (!selectedCareer || skills !== null) return;
    if (!firestoreError) return;

    const result = calculateSkillGapFromProfile(selectedCareer.id, []);
    setGapResult(result);
  }, [selectedCareer, skills, firestoreError]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy-200 border-t-orange-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Award size={48} className="text-navy-200 mb-4" />
        <h2 className="text-xl font-semibold text-navy-900 mb-2">Authentication Required</h2>
        <p className="text-navy-400 mb-4">Please sign in to access your skill gap analysis.</p>
        <Button onClick={() => navigate("/login")}>Sign In</Button>
      </div>
    );
  }

  if (firestoreError && !selectedCareer) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <AlertCircle size={48} className="text-navy-200 mb-4" />
        <h2 className="text-xl font-semibold text-navy-900 mb-2">Connection Error</h2>
        <p className="text-navy-400 mb-6 max-w-md">
          Unable to connect to Firestore. Please check your internet connection and try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!selectedCareer) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Target size={48} className="text-navy-200 mb-4" />
        <h2 className="text-xl font-semibold text-navy-900 mb-2">No Target Career Selected</h2>
        <p className="text-navy-400 mb-6 max-w-md">
          Choose a career first to see your skill gap analysis. We will compare your
          current skills against the skills required for your target career.
        </p>
        <Button size="lg" leftIcon={<Target size={18} />} onClick={() => navigate("/career-discovery")}>
          Go to Career Discovery
        </Button>
      </div>
    );
  }

  if (!gapResult) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <AlertCircle size={48} className="text-navy-200 mb-4" />
        <h2 className="text-xl font-semibold text-navy-900 mb-2">Unable to Calculate Skill Gap</h2>
        <p className="text-navy-400 mb-6">
          We could not calculate the skill gap for the selected career. Please try
          selecting a different career.
        </p>
        <Button onClick={() => navigate("/career-discovery")}>
          Choose a Different Career
        </Button>
      </div>
    );
  }

  const coverageBreakdown = gapResult.coverageBreakdown;
  const trackedSkillsCount = skills ? skills.length : 0;

  return (
    <div className="space-y-6">
      {firestoreError && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-orange-200 bg-orange-50">
          <AlertCircle size={18} className="text-orange-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-medium text-orange-900">Connection Issue</h3>
            <p className="text-sm text-orange-700 mt-0.5">
              We are using cached career data. Your skills could not be loaded from Firestore.
              Displaying all requirements as missing. Check your internet connection for updated results.
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Your Skill Gap</h1>
          <p className="text-sm text-navy-400 mt-1">
            Target Career: {gapResult.careerName}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate(`/career-discovery/${selectedCareer.id}`)}>
          View Career Details
        </Button>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <Card padding="md" className="flex flex-col items-center">
          <CircularProgress
            value={gapResult.coverageScore}
            label="Skill Coverage"
            sublabel="Requirements met"
            size={100}
          />
        </Card>
        <Card padding="md" className="flex flex-col items-center">
          <div className="text-3xl font-bold text-navy-900">{gapResult.highPriorityGaps.length}</div>
          <div className="text-xs text-navy-400 mt-1">High Priority Gaps</div>
        </Card>
        <Card padding="md" className="flex flex-col items-center">
          <div className="text-3xl font-bold text-navy-900">{gapResult.currentSkills.length}</div>
          <div className="text-xs text-navy-400 mt-1">Current Skills</div>
        </Card>
        <Card padding="md" className="flex flex-col items-center">
          <div className="text-3xl font-bold text-navy-900">{trackedSkillsCount}</div>
          <div className="text-xs text-navy-400 mt-1">Tracked Skills</div>
        </Card>
      </motion.div>

      <Card padding="md">
        <h3 className="text-base font-semibold text-navy-900 mb-4">Coverage by Category</h3>
        <div className="space-y-3">
          {Object.entries(coverageBreakdown).map(([category, score]) => (
            <div key={category} className="flex items-center gap-4">
              <span className="text-sm font-medium text-navy-700 w-20">{category}</span>
              <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${score}%`, background: "#ff6b35" }}
                />
              </div>
              <span className="text-sm font-medium text-navy-900 w-12 text-right">{score}%</span>
            </div>
          ))}
        </div>
      </Card>

      {gapResult.currentSkills.length > 0 && (
        <Card padding="md">
          <h3 className="text-base font-semibold text-navy-900 mb-4">Current Skills</h3>
          <div className="space-y-2">
            {gapResult.currentSkills.map((item) => (
              <div
                key={item.normalizedName}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-navy-900">{item.skillName}</span>
                  <Badge variant="outline" size="sm">{item.category}</Badge>
                </div>
                <SkillLevelBar level={item.studentLevel} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {skills && skills.length === 0 && (
        <Card padding="lg" className="text-center">
          <Award size={48} className="text-navy-200 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-navy-900 mb-2">No Skills Recorded Yet</h3>
          <p className="text-sm text-navy-400 mb-4">
            You haven't added any skills. All career requirements appear as missing.
          </p>
          <Button onClick={() => navigate("/skills-management")}>
            Manage My Skills
          </Button>
        </Card>
      )}

      {gapResult.highPriorityGaps.length > 0 && (
        <Card padding="md">
          <div className="flex items-center gap-2 mb-4">
            <XCircle size={18} className="text-red-600" />
            <h3 className="text-base font-semibold text-navy-900">High Priority Gaps</h3>
          </div>
          <div className="space-y-3">
            {sortGaps(gapResult.highPriorityGaps).map((item) => (
              <GapItem key={item.normalizedName} item={item} />
            ))}
          </div>
        </Card>
      )}

      {gapResult.mediumPriorityGaps.length > 0 && (
        <Card padding="md">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={18} className="text-orange-600" />
            <h3 className="text-base font-semibold text-navy-900">Medium Priority Gaps</h3>
          </div>
          <div className="space-y-3">
            {sortGaps(gapResult.mediumPriorityGaps).map((item) => (
              <GapItem key={item.normalizedName} item={item} />
            ))}
          </div>
        </Card>
      )}

      {gapResult.lowPriorityGaps.length > 0 && (
        <Card padding="md">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} className="text-navy-400" />
            <h3 className="text-base font-semibold text-navy-900">Later</h3>
          </div>
          <div className="space-y-3">
            {sortGaps(gapResult.lowPriorityGaps).map((item) => (
              <GapItem key={item.normalizedName} item={item} />
            ))}
          </div>
        </Card>
      )}

      {gapResult.gaps.length === 0 && gapResult.currentSkills.length > 0 && (
        <Card padding="lg" className="text-center">
          <CheckCircle2 size={48} className="text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-navy-900 mb-2">All Skills Covered!</h3>
          <p className="text-sm text-navy-400">
            Your current skills meet the requirements for this career.
          </p>
        </Card>
      )}

      {gapResult.nextRecommendedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card padding="lg" className="border-2 border-orange-500/30 bg-orange-50/30">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                <Target size={18} className="text-orange-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-navy-900 mb-1">
                  Next Recommended Skill
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-navy-900">
                    {gapResult.nextRecommendedSkill.skillName}
                  </span>
                  <Badge variant={priorityColors[gapResult.nextRecommendedSkill.priority]} size="sm">
                    {gapResult.nextRecommendedSkill.priority} priority
                  </Badge>
                  <Badge variant="outline" size="sm">
                    {gapResult.nextRecommendedSkill.category}
                  </Badge>
                </div>
                <p className="text-sm text-navy-500 leading-relaxed">
                  {gapResult.nextRecommendedSkill.reason}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-3"
              leftIcon={<TrendingUp size={16} />}
              onClick={() => navigate("/courses")}
            >
              Find Learning Resources
            </Button>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
