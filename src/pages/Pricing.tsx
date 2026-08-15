import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Building, Globe, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { INDIVIDUAL_PLANS, INSTITUTION_PLANS, ALL_PLANS, type FeatureKey, FEATURE_CONFIGS, type PricingPlan } from "@/config/pricing";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const navigate = useNavigate();
  const { plan } = useSubscription();
  const [selectedTab, setSelectedTab] = useState<"individual" | "institution">("individual");

  const currentPlan = ALL_PLANS[plan];

  const handlePlanSelect = (planKey: string) => {
    if (planKey === "enterprise") {
      window.location.href = "mailto:sales@careerai.in";
    } else {
      navigate("/pricing/checkout", {
        state: { planKey },
        replace: true,
      });
    }
  };

  const individualPlans = Object.values(INDIVIDUAL_PLANS);
  const institutionPlans = Object.values(INSTITUTION_PLANS);

  const featureCategories: { name: string; keys: FeatureKey[] }[] = [
    {
      name: "Career Tools",
      keys: ["career_discovery", "career_matching", "skill_gap", "career_roadmap", "action_plan", "career_readiness"],
    },
    {
      name: "Resume & AI",
      keys: ["resume_analysis", "resume_builder", "ai_resume_improvement"],
    },
    {
      name: "Learning",
      keys: ["learning_recommendations", "progress_tracking"],
    },
    {
      name: "Interviews",
      keys: ["mock_interviews", "interview_feedback"],
    },
    {
      name: "Advanced",
      keys: ["company_preparation", "job_readiness", "project_recommendations", "advanced_analytics", "ai_career_coach"],
    },
    {
      name: "Institution",
      keys: ["faculty_dashboard", "batch_analytics", "department_reports", "student_monitoring", "placement_dashboard", "department_comparison", "placement_analytics", "custom_career_tracks", "institution_branding", "reports_export"],
    },
  ];

  const getFeatureStatus = (planKey: string, featureKey: FeatureKey): string => {
    const plan = ALL_PLANS[planKey];
    if (!plan) return "—";

    if (plan.features.includes(featureKey)) {
      if (featureKey === "resume_analysis") {
        const limit = plan.limits?.resume_analyses;
        if (limit !== undefined) {
          return limit === "unlimited" ? "Unlimited" : `${limit}/mo`;
        }
      }

      if (featureKey === "ai_resume_improvement") {
        const limit = plan.limits?.ai_improvements;
        if (limit !== undefined) {
          return limit === "unlimited" ? "Unlimited" : `${limit}/mo`;
        }
      }

      return "Included";
    }

    return "—";
  };

  return (
    <div className="min-h-screen bg-navy-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-900">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-navy-500 max-w-3xl mx-auto">
            Choose the plan that fits your career stage. Whether you're an
            individual student preparing for placements or an institution looking
            to empower your students, we have a solution for you.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedTab("individual")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTab === "individual"
                ? "bg-orange-500 text-white"
                : "bg-white text-navy-500 hover:bg-navy-50"
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setSelectedTab("institution")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTab === "institution"
                ? "bg-blue-500 text-white"
                : "bg-white text-navy-500 hover:bg-navy-50"
            }`}
          >
            Institution
          </button>
        </div>

        {selectedTab === "individual" && (
          <IndividualPlansSection
            plans={individualPlans}
            currentPlan={currentPlan?.key || "free"}
            onPlanSelect={handlePlanSelect}
          />
        )}

        {selectedTab === "institution" && (
          <InstitutionPlansSection
            plans={institutionPlans}
            onPlanSelect={handlePlanSelect}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-navy-900 text-center mb-2">Feature Comparison</h2>
          <p className="text-sm text-navy-500 text-center mb-8">
            Compare features across all plans
          </p>

          <div className="overflow-x-auto">
            <FeatureComparisonTable
              individualPlans={individualPlans}
              featureCategories={featureCategories}
              getFeatureStatus={getFeatureStatus}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card padding="lg" className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-navy-900 mb-4">
              Have questions?
            </h3>
            <p className="text-navy-500 mb-4">
              For individual billing, plan changes, or institution inquiries,
              reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={() => window.location.href = "mailto:support@careerai.in"}>
                Contact Support
              </Button>
              <Button variant="outline" onClick={() => window.open("https://careerai.in/faq", "_blank")}>
                View FAQ
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function IndividualPlansSection({
  plans,
  currentPlan,
  onPlanSelect,
}: {
  plans: PricingPlan[];
  currentPlan: string;
  onPlanSelect: (planKey: string) => void;
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start mb-12">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.key}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card
            padding="lg"
            className={`h-full border flex flex-col relative ${
              plan.featured
                ? "border-orange-400/50 shadow-xl shadow-orange-500/10 bg-white"
                : "border-navy-200 bg-white"
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <Star size={12} className="mr-1" />
                  Recommended
                </Badge>
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-navy-900">{plan.name}</h3>
              <p className="text-sm text-navy-500 mt-1">{plan.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-navy-900">{plan.price.display}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.slice(0, 6).map((feature) => {
                const config = FEATURE_CONFIGS.find((f) => f.key === feature);
                return (
                  <li key={feature} className="flex items-start gap-3 text-sm text-navy-600">
                    <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                    <span>{config?.label || feature}</span>
                  </li>
                );
              })}
              {plan.features.length > 6 && (
                <li className="text-xs text-navy-400">
                  +{plan.features.length - 6} more features
                </li>
              )}
            </ul>

            <Button
              variant={plan.key === currentPlan ? "outline" : "primary"}
              className="w-full"
              size="lg"
              onClick={() => onPlanSelect(plan.key)}
              disabled={plan.key === currentPlan}
            >
              {plan.key === currentPlan ? "Current Plan" : plan.cta || "Get Started"}
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function InstitutionPlansSection({
  plans,
  onPlanSelect,
}: {
  plans: PricingPlan[];
  onPlanSelect: (planKey: string) => void;
}) {
  return (
    <div className="space-y-8 mb-12">
      <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-6 text-center">
        <Building size={32} className="text-blue-500 mx-auto mb-3" />
        <h2 className="text-xl font-semibold text-navy-900 mb-2">
          Built for colleges and placement cells
        </h2>
        <p className="text-sm text-navy-500 max-w-3xl mx-auto">
          Empower your students with comprehensive career development tools.
          Institution plans include faculty dashboards, batch analytics,
          and department-level reporting. All priced per student per year.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              padding="lg"
              className="h-full border flex flex-col border-navy-200 bg-white"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: plan.color === "blue" ? "#eff6ff" : plan.color === "purple" ? "#f5f0ff" : "#fffbeb",
                    }}
                  >
                    {plan.category === "institution" && plan.minSeats && (
                      <Users size={20} style={{ color: plan.color === "blue" ? "#3b82f6" : plan.color === "purple" ? "#8b5cf6" : "#d97706" }} />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">{plan.name}</h3>
                </div>
                <p className="text-sm text-navy-500">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-navy-900">{plan.price.display}</span>
                </div>
                {plan.priceNote && (
                  <p className="text-xs text-navy-400 mt-1">{plan.priceNote}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.slice(0, 6).map((feature) => {
                  const config = FEATURE_CONFIGS.find((f) => f.key === feature);
                  return (
                    <li key={feature} className="flex items-start gap-3 text-sm text-navy-600">
                      <Check size={16} className="text-blue-500 mt-0.5 shrink-0" />
                      <span>{config?.label || feature}</span>
                    </li>
                  );
                })}
                {plan.features.length > 6 && (
                  <li className="text-xs text-navy-400">
                    +{plan.features.length - 6} more features
                  </li>
                )}
              </ul>

              <Button
                variant="primary"
                className="w-full"
                size="lg"
                onClick={() => onPlanSelect(plan.key)}
              >
                {plan.cta || (plan.key === "enterprise" ? "Contact Sales" : "Get Started")}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-navy-900/5 border border-navy-900/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-navy-900 mb-3 flex items-center gap-2">
          <Globe size={20} className="text-navy-500" />
          Enterprise / University
        </h3>
        <p className="text-sm text-navy-500 mb-4">
          For universities, multi-campus institutions, and large training
          organizations. Custom pricing with dedicated support, custom career
          tracks, and full institution branding.
        </p>
        <Button
          variant="outline"
          size="md"
          onClick={() => window.location.href = "mailto:sales@careerai.in"}
        >
          Contact Sales for Custom Pricing
        </Button>
      </div>
    </div>
  );
}

function FeatureComparisonTable({
  individualPlans,
  featureCategories,
  getFeatureStatus,
}: {
  individualPlans: PricingPlan[];
  featureCategories: { name: string; keys: FeatureKey[] }[];
  getFeatureStatus: (planKey: string, featureKey: FeatureKey) => string;
}) {
  const displayPlans = [
    individualPlans[0],
    individualPlans[1],
    individualPlans[2],
  ];

  return (
    <div className="border border-navy-200 rounded-xl overflow-hidden bg-white">
      <div className="grid grid-cols-[250px_1fr_1fr_1fr] gap-px bg-navy-50">
        <div className="p-4 text-sm font-semibold text-navy-900">Feature</div>
        {displayPlans.map((plan) => (
          <div key={plan.key} className="p-4 text-center">
            <div className="text-sm font-semibold text-navy-900">{plan.name}</div>
            <div className="text-xs text-navy-500 mt-1">{plan.price.display}</div>
          </div>
        ))}
      </div>

      {featureCategories.map((category) => (
        <div key={category.name}>
          <div className="bg-navy-50 px-4 py-2 border-t border-navy-200">
            <h4 className="text-xs font-semibold text-navy-500 uppercase tracking-wider">
              {category.name}
            </h4>
          </div>
          {category.keys.map((featureKey) => {
            const config = FEATURE_CONFIGS.find((f) => f.key === featureKey);
            return (
              <div key={featureKey} className="grid grid-cols-[250px_1fr_1fr_1fr] gap-px border-t border-navy-200">
                <div className="p-3 text-sm text-navy-700 bg-white">{config?.label || featureKey}</div>
                {displayPlans.map((plan) => {
                  const status = getFeatureStatus(plan.key, featureKey);
                  return (
                    <div key={plan.key} className="p-3 text-center bg-white">
                      {status === "—" ? (
                        <span className="text-navy-400">—</span>
                      ) : (
                        <span className="text-sm text-navy-900">{status}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
