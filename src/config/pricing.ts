import type { PlanType, PlanCategory } from "@/types/profile";

export type FeatureKey =
  | "basic_profile"
  | "career_discovery"
  | "career_matching"
  | "skill_gap"
  | "resume_analysis"
  | "resume_builder"
  | "career_roadmap"
  | "action_plan"
  | "ai_resume_improvement"
  | "career_readiness"
  | "learning_recommendations"
  | "progress_tracking"
  | "mock_interviews"
  | "interview_feedback"
  | "company_preparation"
  | "job_readiness"
  | "project_recommendations"
  | "advanced_analytics"
  | "ai_career_coach"
  | "faculty_dashboard"
  | "batch_analytics"
  | "department_reports"
  | "student_monitoring"
  | "placement_dashboard"
  | "department_comparison"
  | "placement_analytics"
  | "custom_career_tracks"
  | "institution_branding"
  | "reports_export";

export interface PlanFeatureConfig {
  key: FeatureKey;
  label: string;
  description?: string;
  limits?: Partial<Record<PlanType, number | "unlimited" | null>>;
}

export interface PricingPlan {
  key: PlanType;
  category: PlanCategory;
  name: string;
  description: string;
  price: {
    amount: number | null;
    currency: string;
    interval: "month" | "year" | "seat-year" | "custom";
    display: string;
  };
  color: string;
  gradient: string;
  recommended: boolean;
  featured: boolean;
  features: FeatureKey[];
    limits?: Record<string, number | "unlimited">;
    minSeats?: number;
    priceNote?: string;
    cta?: string;
  }

export const FEATURE_CONFIGS: PlanFeatureConfig[] = [
  { key: "basic_profile", label: "Basic Profile" },
  { key: "career_discovery", label: "Career Discovery" },
  { key: "career_matching", label: "Career Matching" },
  { key: "skill_gap", label: "Skill Gap Analysis" },
  { key: "resume_analysis", label: "Resume AI Analysis" },
  { key: "resume_builder", label: "Resume Builder" },
  { key: "career_roadmap", label: "4-Year Career Roadmap" },
  { key: "action_plan", label: "30/60/90-Day Action Plan" },
  { key: "ai_resume_improvement", label: "AI Resume Improvement" },
  { key: "career_readiness", label: "Career Readiness Score" },
  { key: "learning_recommendations", label: "Learning Recommendations" },
  { key: "progress_tracking", label: "Progress Tracking" },
  { key: "mock_interviews", label: "Mock Interviews" },
  { key: "interview_feedback", label: "Interview Feedback" },
  { key: "company_preparation", label: "Company-Specific Preparation" },
  { key: "job_readiness", label: "Job-Readiness Analysis" },
  { key: "project_recommendations", label: "Project Recommendations" },
  { key: "advanced_analytics", label: "Advanced Analytics" },
  { key: "ai_career_coach", label: "AI Career Coach" },
  { key: "faculty_dashboard", label: "Faculty Dashboard" },
  { key: "batch_analytics", label: "Batch Analytics" },
  { key: "department_reports", label: "Department-Level Reports" },
  { key: "student_monitoring", label: "Student Progress Monitoring" },
  { key: "placement_dashboard", label: "Placement Cell Dashboard" },
  { key: "department_comparison", label: "Department Comparison" },
  { key: "placement_analytics", label: "Placement Readiness Analytics" },
  { key: "custom_career_tracks", label: "Custom Career Tracks" },
  { key: "institution_branding", label: "Institution Branding" },
  { key: "reports_export", label: "Reports & Export" },
];

export const PLAN_HIERARCHY: PlanType[] = [
  "free",
  "starter",
  "pro",
  "institution_starter",
  "institution_pro",
  "enterprise",
];

export const INDIVIDUAL_PLANS: Record<string, PricingPlan> = {
  free: {
    key: "free",
    category: "individual",
    name: "Free",
    description: "Try the platform with essential career tools",
    price: { amount: 0, currency: "₹", interval: "month", display: "₹0" },
    color: "gray",
    gradient: "linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)",
    recommended: false,
    featured: false,
    features: [
      "basic_profile",
      "career_discovery",
      "career_matching",
      "skill_gap",
      "resume_builder",
      "career_roadmap",
    ],
    limits: {
      resume_analyses: 1,
      ai_improvements: 5,
    },
    cta: "Start Free",
  },
  starter: {
    key: "starter",
    category: "individual",
    name: "Starter",
    description: "For students actively preparing for placements",
    price: { amount: 399, currency: "₹", interval: "month", display: "₹399/month" },
    color: "orange",
    gradient: "linear-gradient(135deg, #ff6b35 0%, #f5b942 100%)",
    recommended: true,
    featured: true,
    features: [
      "basic_profile",
      "career_discovery",
      "career_matching",
      "skill_gap",
      "resume_analysis",
      "resume_builder",
      "career_roadmap",
      "action_plan",
      "ai_resume_improvement",
      "career_readiness",
      "learning_recommendations",
      "progress_tracking",
    ],
    limits: {
      resume_analyses: 5,
      ai_improvements: 20,
    },
    cta: "Get Starter",
  },
  pro: {
    key: "pro",
    category: "individual",
    name: "Pro",
    description: "For serious placement preparation",
    price: { amount: 899, currency: "₹", interval: "month", display: "₹899/month" },
    color: "navy",
    gradient: "linear-gradient(135deg, #1e2844 0%, #0b1020 100%)",
    recommended: false,
    featured: false,
    features: [
      "basic_profile",
      "career_discovery",
      "career_matching",
      "skill_gap",
      "resume_analysis",
      "resume_builder",
      "career_roadmap",
      "action_plan",
      "ai_resume_improvement",
      "career_readiness",
      "learning_recommendations",
      "progress_tracking",
      "mock_interviews",
      "interview_feedback",
      "company_preparation",
      "job_readiness",
      "project_recommendations",
      "advanced_analytics",
      "ai_career_coach",
    ],
    limits: {
      resume_analyses: "unlimited",
      ai_improvements: "unlimited",
    },
    cta: "Get Pro",
  },
};

export const INSTITUTION_PLANS: Record<string, PricingPlan> = {
  institution_starter: {
    key: "institution_starter",
    category: "institution",
    name: "Institution Starter",
    description: "Built for colleges and placement cells",
    price: {
      amount: 499,
      currency: "₹",
      interval: "seat-year",
      display: "₹499–₹699/student/year",
    },
    color: "blue",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    recommended: false,
    featured: false,
    features: [
      "basic_profile",
      "career_discovery",
      "career_matching",
      "skill_gap",
      "resume_analysis",
      "resume_builder",
      "career_roadmap",
      "career_readiness",
      "faculty_dashboard",
      "batch_analytics",
      "department_reports",
      "student_monitoring",
    ],
    minSeats: 100,
    priceNote: "Starting from ₹499 per student/year (100+ seats required)",
  },
  institution_pro: {
    key: "institution_pro",
    category: "institution",
    name: "Institution Pro",
    description: "Complete placement solution for institutions",
    price: {
      amount: 999,
      currency: "₹",
      interval: "seat-year",
      display: "₹999–₹1,499/student/year",
    },
    color: "purple",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    recommended: false,
    featured: false,
    features: [
      "basic_profile",
      "career_discovery",
      "career_matching",
      "skill_gap",
      "resume_analysis",
      "resume_builder",
      "career_roadmap",
      "action_plan",
      "ai_resume_improvement",
      "career_readiness",
      "learning_recommendations",
      "progress_tracking",
      "mock_interviews",
      "interview_feedback",
      "company_preparation",
      "advanced_analytics",
      "faculty_dashboard",
      "batch_analytics",
      "department_reports",
      "student_monitoring",
      "placement_dashboard",
      "department_comparison",
      "placement_analytics",
      "custom_career_tracks",
      "institution_branding",
      "reports_export",
    ],
    minSeats: 100,
    priceNote: "Starting from ₹999 per student/year (100+ seats required)",
  },
  enterprise: {
    key: "enterprise",
    category: "institution",
    name: "Enterprise / University",
    description: "For universities, multi-campus institutions, and large training organizations",
    price: {
      amount: null,
      currency: "₹",
      interval: "custom",
      display: "Custom",
    },
    color: "gold",
    gradient: "linear-gradient(135deg, #f5b942 0%, #d97706 100%)",
    recommended: false,
    featured: false,
    features: [
      "basic_profile",
      "career_discovery",
      "career_matching",
      "skill_gap",
      "resume_analysis",
      "resume_builder",
      "career_roadmap",
      "action_plan",
      "ai_resume_improvement",
      "career_readiness",
      "learning_recommendations",
      "progress_tracking",
      "mock_interviews",
      "interview_feedback",
      "company_preparation",
      "advanced_analytics",
      "ai_career_coach",
      "faculty_dashboard",
      "batch_analytics",
      "department_reports",
      "student_monitoring",
      "placement_dashboard",
      "department_comparison",
      "placement_analytics",
      "custom_career_tracks",
      "institution_branding",
      "reports_export",
    ],
    minSeats: 500,
    priceNote: "Custom pricing — contact sales",
  },
};

export const ALL_PLANS: Record<string, PricingPlan> = {
  ...INDIVIDUAL_PLANS,
  ...INSTITUTION_PLANS,
};

export function getPlan(planType: PlanType): PricingPlan | undefined {
  return ALL_PLANS[planType];
}

export function getPlanByName(planName: string): PricingPlan | undefined {
  return Object.values(ALL_PLANS).find((p) => p.name.toLowerCase() === planName.toLowerCase());
}

export function isFeatureEnabled(planType: PlanType, feature: FeatureKey): boolean {
  const plan = getPlan(planType);
  if (!plan) return false;
  return plan.features.includes(feature);
}

export function getFeatureLimit(planType: PlanType, feature: FeatureKey, limitKey: string): number | "unlimited" | null {
  const plan = getPlan(planType);
  if (!plan) return null;

  if (plan.limits && plan.limits[limitKey] !== undefined) {
    return plan.limits[limitKey];
  }

  const featureConfig = FEATURE_CONFIGS.find((f) => f.key === feature);
  if (featureConfig?.limits) {
    const limit = featureConfig.limits[planType];
    if (limit !== undefined) return limit;
  }

  if (plan.features.includes(feature)) {
    return "unlimited";
  }

  return null;
}

export function canAccessPlan(userPlan: PlanType, requiredPlan: PlanType): boolean {
  return PLAN_HIERARCHY.indexOf(userPlan) >= PLAN_HIERARCHY.indexOf(requiredPlan);
}

export function canUseFeature(plan: PlanType, feature: FeatureKey): boolean {
  return isFeatureEnabled(plan, feature);
}
