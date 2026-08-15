import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeToProfile, saveSubscription } from "@/lib/firestore";
import type { UserProfile, PlanType, Subscription, Usage } from "@/types/profile";
import { ALL_PLANS, isFeatureEnabled, canAccessPlan, getFeatureLimit, type FeatureKey } from "@/config/pricing";

const USAGE_LIMIT_KEY_MAP: Record<string, keyof Usage> = {
  resume_analyses: "resumeAnalysesThisMonth",
  ai_improvements: "aiImprovementsThisMonth",
  mock_interviews: "mockInterviewsThisMonth",
};

export function useSubscription() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const unsub = subscribeToProfile(user.uid, (data) => {
      if (data) setProfile(data);
      setLoading(false);
    });

    return () => unsub?.();
  }, [user?.uid]);

  const subscription: Subscription | null = profile?.subscription || null;
  const usage: Usage | null = profile?.usage || null;
  const plan: PlanType = subscription?.plan || "free";
  const planStatus: Subscription["status"] = subscription?.status || "active";

  const canUse = useCallback(
    (feature: FeatureKey): boolean => {
      return isFeatureEnabled(plan, feature);
    },
    [plan]
  );

  const hasPlan = useCallback(
    (requiredPlan: PlanType): boolean => {
      return canAccessPlan(plan, requiredPlan);
    },
    [plan]
  );

  const getPlanInfo = useCallback(() => {
    return ALL_PLANS[plan] || ALL_PLANS["free"];
  }, [plan]);

  const getLimit = useCallback(
    (feature: FeatureKey, limitKey: string): number | "unlimited" | null => {
      return getFeatureLimit(plan, feature, limitKey);
    },
    [plan]
  );

  const checkUsageLimit = useCallback(
    (limitKey: string): { allowed: boolean; remaining: number | null } => {
      if (!profile || !usage) {
        return { allowed: true, remaining: null };
      }

      const usageField = USAGE_LIMIT_KEY_MAP[limitKey] || (limitKey as keyof Usage);
      const current = usage[usageField] as number | undefined;
      if (current === undefined) return { allowed: true, remaining: null };

      const limitValue = getFeatureLimit(plan, "" as FeatureKey, limitKey);

      if (limitValue === "unlimited" || limitValue === null) {
        return { allowed: true, remaining: null };
      }

      if (limitValue === 0) return { allowed: true, remaining: null };

      return {
        allowed: current < limitValue,
        remaining: Math.max(0, limitValue - current),
      };
    },
    [plan, profile, usage]
  );

  const planDisplay = useMemo(() => {
    const planInfo = ALL_PLANS[plan] || ALL_PLANS["free"];
    return {
      name: planInfo.name,
      price: planInfo.price.display,
    };
  }, [plan]);

  const upgradePlan = useCallback(async (newPlan: PlanType): Promise<boolean> => {
    if (!user?.uid) return false;
    try {
      const planInfo = ALL_PLANS[newPlan];
      if (!planInfo) return false;

      await saveSubscription(user.uid, {
        plan: newPlan,
        planCategory: planInfo.category,
        status: "active",
      });
      return true;
    } catch (error) {
      console.error("Failed to update subscription:", error);
      return false;
    }
  }, [user?.uid]);

  return {
    plan,
    subscription,
    usage,
    loading,
    planStatus,
    planDisplay,
    canUse,
    hasPlan,
    getPlanInfo,
    getLimit,
    checkUsageLimit,
    upgradePlan,
  };
}
