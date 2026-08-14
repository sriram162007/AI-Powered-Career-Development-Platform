"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  CheckCircle2,
  BookOpen,
  Code2,
  Zap,
  Star,
  Award,
  Building,
  Briefcase,
  Users,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { getOrCreateProfile, subscribeToProfile, saveCareerPreferences } from "@/lib/firestore";
import { getCareerById, type CareerRole } from "@/data/careers";

const difficultyIcons = {
  Beginner: <Star size={16} className="text-green-500 fill-green-500" />,
  Intermediate: <Star size={16} className="text-orange-500 fill-orange-500" />,
  Advanced: <Star size={16} className="text-purple-500 fill-purple-500" />,
};

const difficultyColors = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
} as const;

export default function CareerDetails() {
  const { careerId } = useParams<{ careerId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [career, setCareer] = useState<CareerRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!careerId) {
      setCareer(null);
      setLoading(false);
      return;
    }

    const c = getCareerById(careerId);
    if (c) {
      setCareer(c);
    } else {
      setCareer(null);
    }
    setLoading(false);
  }, [careerId]);

  useEffect(() => {
    if (!user?.uid) return;

    getOrCreateProfile(user.uid, user?.email ?? undefined).then((p) => {
      setSelected(p.careerPreferences?.selectedCareerId === careerId);
    });

    const unsub = subscribeToProfile(user.uid, (data) => {
      if (data) {
        setSelected(data.careerPreferences?.selectedCareerId === careerId);
      }
    });

    return () => {
      unsub?.();
    };
  }, [user?.uid, user?.email, careerId]);

  const handleChooseCareer = async () => {
    if (!user?.uid || !careerId || selecting) return;

    setSelecting(true);
    try {
      await Promise.race([
        saveCareerPreferences(user.uid, {
          selectedCareerId: careerId,
          careerDiscoveryCompleted: true,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 8000)
        ),
      ]);
      setSelected(true);
      addToast(`"${career?.name}" selected as your target career.`, "success");
    } catch {
      addToast(
        "Unable to save your career right now. Check your internet connection and try again.",
        "error"
      );
    } finally {
      setSelecting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy-200 border-t-orange-500" />
      </div>
    );
  }

  if (!career) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Award size={48} className="text-navy-200 mb-4" />
        <h2 className="text-xl font-semibold text-navy-900 mb-2">Career Not Found</h2>
        <p className="text-navy-400 mb-4">The career you are looking for does not exist.</p>
        <Button onClick={() => navigate("/career-discovery")}>
          Back to Career Discovery
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate("/career-discovery")}>
          Back
        </Button>
        <h1 className="text-2xl font-bold text-navy-900">{career.name}</h1>
      </div>

      <Card padding="lg" className="border border-navy-100">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={difficultyColors[career.difficulty]} size="md">
                {difficultyIcons[career.difficulty]}
                {career.difficulty}
              </Badge>
              <span className="text-xs text-navy-400">Starting year: {career.recommendedStartingYear}</span>
            </div>
            <p className="text-base text-navy-500 leading-relaxed">{career.shortDescription}</p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            {selected ? (
              <Badge variant="success" size="md">
                <CheckCircle2 size={14} className="mr-1" />
                Selected
              </Badge>
            ) : (
              <Button
                variant="primary"
                onClick={handleChooseCareer}
                loading={selecting}
                leftIcon={<Target size={16} />}
              >
                Choose this career
              </Button>
            )}
          </div>
        </div>
      </Card>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: "Foundation Skills", value: career.foundationSkills, icon: <BookOpen size={20} className="text-blue-600" /> },
          { label: "Core Skills", value: career.coreSkills, icon: <Code2 size={20} className="text-green-600" /> },
          { label: "Advanced Skills", value: career.advancedSkills, icon: <Zap size={20} className="text-purple-600" /> },
        ].map((item) => (
          <Card key={item.label} padding="md" className="hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-navy-900">{item.label}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.value.map((skill) => (
                <Badge key={skill} variant="outline" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="lg" className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <Users size={18} className="text-navy-600" />
            </div>
            <h3 className="text-base font-semibold text-navy-900">What they do</h3>
          </div>
          <ul className="space-y-2">
            {career.whatTheyDo.map((item, idx) => (
              <li key={idx} className="text-sm text-navy-500 flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card padding="lg" className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <Building size={18} className="text-navy-600" />
            </div>
            <h3 className="text-base font-semibold text-navy-900">Industries</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {career.industries.map((ind) => (
              <Badge key={ind} variant="outline" size="sm">
                {ind}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="lg" className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <Award size={18} className="text-navy-600" />
            </div>
            <h3 className="text-base font-semibold text-navy-900">Tools</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {career.tools.map((tool) => (
              <Badge key={tool} variant="default" size="sm">
                {tool}
              </Badge>
            ))}
          </div>
        </Card>

        <Card padding="lg" className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <Briefcase size={18} className="text-navy-600" />
            </div>
            <h3 className="text-base font-semibold text-navy-900">Example Job Roles</h3>
          </div>
          <ul className="space-y-2">
            {career.exampleJobTitles.map((title) => (
              <li key={title} className="text-sm text-navy-500 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                {title}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card padding="lg" className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <Target size={18} className="text-navy-600" />
            </div>
            <h3 className="text-base font-semibold text-navy-900">Prerequisites</h3>
          </div>
          <ul className="space-y-2">
            {career.prerequisites.map((prereq) => (
              <li key={prereq} className="text-sm text-navy-500 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-orange-500 mt-0.5 shrink-0" />
                {prereq}
              </li>
            ))}
          </ul>
        </Card>

        <Card padding="lg" className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <Sparkles size={18} className="text-navy-600" />
            </div>
            <h3 className="text-base font-semibold text-navy-900">Related Career Paths</h3>
          </div>
          <div className="space-y-2">
            {career.relatedCareers.map((relatedId) => {
              const related = getCareerById(relatedId);
              return related ? (
                <button
                  key={relatedId}
                  onClick={() => navigate(`/career-discovery/${relatedId}`)}
                  className="text-left w-full p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm font-medium text-navy-900">{related.name}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{related.shortDescription}</p>
                </button>
              ) : null;
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
