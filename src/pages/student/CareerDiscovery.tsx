"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Star,
  Target,
  Sparkles,
  ArrowLeft,
  Award,
  BookOpen,
  Code2,
  Zap,
  Shield,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { getOrCreateProfile, subscribeToProfile, saveCareerPreferences } from "@/lib/firestore";
import { careerRoles, allInterestTags, type CareerRole } from "@/data/careers";
import { matchCareersFromProfile, type CareerMatch } from "@/lib/careerMatching";
import type { UserProfile } from "@/types/profile";

type DiscoveryView = "browse" | "interests" | "results";

const interestIcons: Record<string, React.ReactNode> = {
  "Building things": <Code2 size={18} className="text-blue-600" />,
  "Solving problems": <Target size={18} className="text-green-600" />,
  "Mathematics / Data": <BookOpen size={18} className="text-purple-600" />,
  "Artificial Intelligence": <Sparkles size={18} className="text-orange-600" />,
  "Security": <Shield size={18} className="text-red-600" />,
  "Cloud / Infrastructure": <Zap size={18} className="text-yellow-600" />,
  "Designing Applications": <Award size={18} className="text-pink-600" />,
};

const difficultyColors: Record<string, "success" | "warning" | "danger"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
};

export default function CareerDiscovery() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [view, setView] = useState<DiscoveryView>("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<CareerMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    getOrCreateProfile(user.uid, user?.email ?? undefined)
      .then((p) => {
        setProfile(p);
        const existingInterests = p.careerPreferences?.interests ?? [];

        if (existingInterests.length > 0) {
          setSelectedInterests(existingInterests);
          const computed = matchCareersFromProfile(p, { interests: existingInterests });
          setMatches(computed);
          setView("results");
        }
      })
      .catch((err) => {
        console.warn("Failed to load profile:", err);
        setProfile(null);
      });

    const unsub = subscribeToProfile(user.uid, (data) => {
      if (data) {
        setProfile(data);
      }
    });

    setLoading(false);

    return () => {
      unsub?.();
    };
  }, [user?.uid, user?.email]);

  const filteredCareers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return careerRoles;

    return careerRoles.filter(
      (career) =>
        career.name.toLowerCase().includes(query) ||
        career.shortDescription.toLowerCase().includes(query) ||
        career.tools.some((t) => t.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const toggleInterest = useCallback((interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }, []);

  const handleShowMatches = async () => {
    if (!user?.uid) return;

    if (selectedInterests.length === 0) {
      addToast("Please select at least one interest to get recommendations.", "error");
      return;
    }

    setSaving(true);
    try {
      await Promise.race([
        saveCareerPreferences(user.uid, {
          interests: selectedInterests,
          careerDiscoveryCompleted: true,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 8000)
        ),
      ]);

      const computed = matchCareersFromProfile(
        profile ?? { uid: user.uid } as UserProfile,
        { interests: selectedInterests }
      );
      setMatches(computed);
      setView("results");
      addToast("Your interests have been saved.", "success");
    } catch {
      addToast("Unable to save your interests. Check your internet connection and try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleBrowseCareers = () => {
    setView("browse");
  };

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
        <p className="text-navy-400 mb-4">Please sign in to access Career Discovery.</p>
        <Button onClick={() => navigate("/login")}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {view === "browse" && (
        <>
          <WelcomeBanner
            name={profile?.personalInfo?.fullName || user?.displayName || "Student"}
            subtitle="Discover careers aligned with your interests, skills, and academic background."
            cta={
              <Button size="lg" leftIcon={<Sparkles size={18} />} onClick={() => setView("interests")}>
                I'm not sure yet
              </Button>
            }
          />

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Input
              placeholder="Search careers..."
              leftIcon={<Search size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredCareers.map((career) => (
              <CareerCard key={career.id} career={career} onExplore={() => navigate(`/career-discovery/${career.id}`)} />
            ))}
          </motion.div>

          {filteredCareers.length === 0 && (
            <div className="text-center py-12">
              <Search size={48} className="text-navy-200 mx-auto mb-3" />
              <p className="text-navy-400">No careers found matching "{searchQuery}"</p>
            </div>
          )}
        </>
      )}

      {view === "interests" && (
        <InterestSelection
          selectedInterests={selectedInterests}
          onToggle={toggleInterest}
          onShowMatches={handleShowMatches}
          onBack={() => setView("browse")}
          saving={saving}
        />
      )}

      {view === "results" && (
        <ResultsView
          matches={matches}
          selectedInterests={selectedInterests}
          onExplore={(careerId) => navigate(`/career-discovery/${careerId}`)}
          onBrowseCareers={handleBrowseCareers}
          onEditInterests={() => setView("interests")}
        />
      )}
    </div>
  );
}

function CareerCard({ career, onExplore }: { career: CareerRole; onExplore: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        padding="lg"
        hover
        className="flex flex-col h-full"
        onClick={onExplore}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-navy-900">{career.name}</h3>
          <Badge variant={difficultyColors[career.difficulty]} size="sm">
            {career.difficulty}
          </Badge>
        </div>

        <p className="text-sm text-navy-400 mb-4 line-clamp-2 flex-1">
          {career.shortDescription}
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {career.foundationSkills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-navy-500">
            <BookOpen size={14} />
            <span>{career.tools.length} tools</span>
          </div>
          <Button size="sm" leftIcon={<Target size={14} />} onClick={onExplore}>
            Explore
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function InterestSelection({
  selectedInterests,
  onToggle,
  onShowMatches,
  onBack,
  saving,
}: {
  selectedInterests: string[];
  onToggle: (interest: string) => void;
  onShowMatches: () => void;
  onBack: () => void;
  saving: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={16} />} onClick={onBack}>
          Back
        </Button>
        <h1 className="text-2xl font-bold text-navy-900">Find What Fits You</h1>
      </div>

      <p className="text-navy-400 text-sm mb-6 text-center max-w-lg mx-auto">
        Select the areas that interest you most. We will use your selections
        along with your profile to find careers that are a good fit for you.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {allInterestTags.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <button
              key={interest}
              onClick={() => onToggle(interest)}
              className={`
                flex items-center gap-2 p-3 rounded-xl border text-sm font-medium
                transition-all duration-200
                ${
                  isSelected
                    ? "border-orange-500 bg-orange-50/80 text-orange-900 shadow-md"
                    : "border-gray-200 text-navy-600 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {interestIcons[interest]}
              {interest}
              {isSelected && <CheckCircle2 size={14} className="ml-auto text-orange-600" />}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onShowMatches} loading={saving} leftIcon={<Sparkles size={16} />}>
          Show My Matches
        </Button>
      </div>

      {selectedInterests.length > 0 && (
        <p className="text-xs text-navy-400 text-center mt-4">
          {selectedInterests.length} interest{selectedInterests.length > 1 ? "s" : ""} selected
        </p>
      )}
    </motion.div>
  );
}

function ResultsView({
  matches,
  selectedInterests,
  onExplore,
  onBrowseCareers,
  onEditInterests,
}: {
  matches: CareerMatch[];
  selectedInterests: string[];
  onExplore: (careerId: string) => void;
  onBrowseCareers: () => void;
  onEditInterests: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Your Career Matches</h1>
          <p className="text-sm text-navy-400 mt-1">
            Based on your {selectedInterests.length} interest{selectedInterests.length > 1 ? "s" : ""}
            and profile data
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onBrowseCareers}>
            Browse All Careers
          </Button>
          <Button variant="ghost" size="sm" onClick={onEditInterests}>
            Edit Interests
          </Button>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-12">
          <Award size={48} className="text-navy-200 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-navy-900 mb-2">No Matches Found</h3>
          <p className="text-sm text-navy-400 mb-4">
            Try selecting different interests or browse all careers to explore options.
          </p>
          <Button onClick={onBrowseCareers}>Browse All Careers</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match, idx) => (
            <motion.div
              key={match.careerId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card padding="md" className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-navy-900">{match.career.name}</h3>
                      <Badge variant="outline" size="sm">
                        #{idx + 1}
                      </Badge>
                    </div>

                    <p className="text-sm text-navy-400 mb-3 line-clamp-2">
                      {match.career.shortDescription}
                    </p>

                    {match.reasons.length > 0 && (
                      <div className="space-y-1.5 mb-3">
                        {match.reasons.slice(0, 3).map((reason, ridx) => (
                          <div key={ridx} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                            <span className="text-xs text-navy-500">{reason.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-orange-500 fill-orange-500" />
                      <span className="text-xl font-bold text-navy-900">{match.matchScore}%</span>
                    </div>
                    <Button size="sm" leftIcon={<Target size={14} />} onClick={() => onExplore(match.careerId)}>
                      Explore
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
