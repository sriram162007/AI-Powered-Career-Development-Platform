import { useNavigate } from "react-router-dom";
import { Crown, Lock } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { FeatureKey } from "@/config/pricing";

interface UpgradePromptProps {
  feature: FeatureKey;
  featureLabel: string;
  description?: string;
  onUpgrade?: () => void;
  compact?: boolean;
}

const FEATURE_UPGRADE_INFO: Record<FeatureKey, { requiredPlan: string; title: string; description: string }> = {
  basic_profile: { requiredPlan: "Starter", title: "Unlock Profile Completion", description: "Upgrade to continue building your professional profile." },
  career_discovery: { requiredPlan: "Starter", title: "Unlock Advanced Career Discovery", description: "Upgrade to Starter to access advanced career discovery and personalized recommendations." },
  career_matching: { requiredPlan: "Starter", title: "Unlock Career Matching", description: "Upgrade to Starter to access detailed career matching." },
  skill_gap: { requiredPlan: "Starter", title: "Unlock Advanced Skill Gap Analysis", description: "Upgrade to Starter to access personalized skill-gap analysis and your complete 4-year roadmap." },
  resume_analysis: { requiredPlan: "Starter", title: "Unlock Resume AI Analysis", description: "You've used your free analysis for this month. Upgrade to Starter for 5 resume analyses per month." },
  resume_builder: { requiredPlan: "Starter", title: "Unlock Resume Builder", description: "Upgrade to Starter to access all resume builder templates and AI improvement." },
  career_roadmap: { requiredPlan: "Starter", title: "Unlock 4-Year Career Roadmap", description: "Upgrade to Starter to access your full 4-year career roadmap." },
  action_plan: { requiredPlan: "Starter", title: "Unlock 30/60/90-Day Action Plan", description: "Upgrade to Starter to access your personalized action plan." },
  ai_resume_improvement: { requiredPlan: "Starter", title: "Unlock AI Resume Improvement", description: "Upgrade to Starter to use AI-powered resume content improvement." },
  career_readiness: { requiredPlan: "Starter", title: "Unlock Career Readiness Score", description: "Upgrade to Starter to access your career readiness score and detailed insights." },
  learning_recommendations: { requiredPlan: "Starter", title: "Unlock Learning Recommendations", description: "Upgrade to Starter to get personalized learning recommendations." },
  progress_tracking: { requiredPlan: "Starter", title: "Unlock Progress Tracking", description: "Upgrade to Starter to track your career progress over time." },
  mock_interviews: { requiredPlan: "Pro", title: "Unlock Mock Interviews", description: "Upgrade to Pro to access AI mock interviews with personalized feedback." },
  interview_feedback: { requiredPlan: "Pro", title: "Unlock Interview Feedback", description: "Upgrade to Pro to receive detailed AI interview feedback." },
  company_preparation: { requiredPlan: "Pro", title: "Unlock Company-Specific Preparation", description: "Upgrade to Pro for company-specific interview preparation." },
  job_readiness: { requiredPlan: "Pro", title: "Unlock Job-Readiness Analysis", description: "Upgrade to Pro for comprehensive job-readiness analysis." },
  project_recommendations: { requiredPlan: "Pro", title: "Unlock Project Recommendations", description: "Upgrade to Pro for personalized project recommendations." },
  advanced_analytics: { requiredPlan: "Pro", title: "Unlock Advanced Analytics", description: "Upgrade to Pro for advanced career analytics and insights." },
  ai_career_coach: { requiredPlan: "Pro", title: "Unlock AI Career Coach", description: "Upgrade to Pro to access your AI career coach for personalized guidance." },
  faculty_dashboard: { requiredPlan: "Institution Starter", title: "Unlock Faculty Dashboard", description: "Institution plan required for faculty dashboards and batch analytics." },
  batch_analytics: { requiredPlan: "Institution Starter", title: "Unlock Batch Analytics", description: "Institution plan required for batch-level analytics." },
  department_reports: { requiredPlan: "Institution Starter", title: "Unlock Department Reports", description: "Institution plan required for department-level reports." },
  student_monitoring: { requiredPlan: "Institution Starter", title: "Unlock Student Monitoring", description: "Institution plan required for student progress monitoring." },
  placement_dashboard: { requiredPlan: "Institution Pro", title: "Unlock Placement Dashboard", description: "Institution Pro plan required for placement cell dashboards." },
  department_comparison: { requiredPlan: "Institution Pro", title: "Unlock Department Comparison", description: "Institution Pro plan required for department comparison reports." },
  placement_analytics: { requiredPlan: "Institution Pro", title: "Unlock Placement Analytics", description: "Institution Pro plan required for placement readiness analytics." },
  custom_career_tracks: { requiredPlan: "Institution Pro", title: "Unlock Custom Career Tracks", description: "Institution Pro plan required for custom career tracks." },
  institution_branding: { requiredPlan: "Institution Pro", title: "Unlock Institution Branding", description: "Institution Pro plan required for custom institution branding." },
  reports_export: { requiredPlan: "Institution Pro", title: "Unlock Reports & Export", description: "Institution Pro plan required for advanced reports and export." },
};

export function UpgradePrompt({ feature, featureLabel, description, onUpgrade, compact = false }: UpgradePromptProps) {
  const navigate = useNavigate();
  const info = FEATURE_UPGRADE_INFO[feature] || {
    requiredPlan: "Starter",
    title: "Unlock Premium Feature",
    description: "Upgrade to unlock this feature.",
  };

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate("/pricing");
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-center py-6">
        <Lock size={16} className="text-navy-400" />
        <span className="text-sm text-navy-500">{featureLabel}</span>
        <Button variant="outline" size="sm" onClick={handleUpgrade}>
          Upgrade
        </Button>
      </div>
    );
  }

  return (
    <Card padding="lg" className="border-2 border-dashed border-navy-200 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-orange-50/50 flex items-center justify-center">
          <Crown size={24} className="text-orange-500" />
        </div>
        <h3 className="text-lg font-semibold text-navy-900">{info.title}</h3>
        <p className="text-sm text-navy-500 max-w-md">
          {description || info.description}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <Button variant="primary" size="md" onClick={handleUpgrade}>
            Upgrade
          </Button>
          <Button variant="outline" size="md" onClick={() => navigate("/pricing")}>
            View Plans
          </Button>
        </div>
      </div>
    </Card>
  );
}
