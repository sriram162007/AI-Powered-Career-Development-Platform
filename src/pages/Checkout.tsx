import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Tag, CheckCircle2, Clock, Star } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ALL_PLANS } from "@/config/pricing";
import { useSubscription } from "@/hooks/useSubscription";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { upgradePlan } = useSubscription();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPlanKey = location.state?.planKey;
  const selectedPlan = selectedPlanKey ? ALL_PLANS[selectedPlanKey] : null;

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-navy-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card padding="lg" className="text-center">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">
              No plan selected
            </h2>
            <p className="text-navy-500 mb-6">
              Please select a plan from the pricing page.
            </p>
            <Button variant="primary" onClick={() => navigate("/pricing")}>
              View Plans
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setProcessing(true);
    setError(null);

    try {
      if (selectedPlan.key === "enterprise") {
        window.location.href = "mailto:sales@careerai.in";
        return;
      }

      await upgradePlan(selectedPlan.key as "free" | "starter" | "pro");
      navigate("/dashboard");
    } catch {
      setError("Failed to process subscription.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card padding="lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-lg bg-orange-50/50 flex items-center justify-center">
                <Crown size={24} className="text-orange-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">
                  Subscribe to {selectedPlan.name}
                </h1>
                <p className="text-sm text-navy-500 mt-1">
                  {selectedPlan.price.display}
                </p>
              </div>
            </div>

            {selectedPlan.recommended && (
              <Badge variant="default" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white mb-4">
                <Star size={14} className="mr-1" />
                Recommended Plan
              </Badge>
            )}

            <div className="bg-navy-50/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Tag size={18} className="text-navy-400" />
                <span className="text-sm font-medium text-navy-700">
                  Payment processing is coming soon
                </span>
              </div>
              <p className="text-xs text-navy-400">
                We are integrating secure payment processing. Your subscription
                will be activated once payment gateway integration is complete.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-semibold text-navy-700 uppercase tracking-wider">
                Plan details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-navy-600">Plan</span>
                  <span className="text-sm font-medium text-navy-900">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-navy-600">Price</span>
                  <span className="text-sm font-medium text-navy-900">
                    {selectedPlan.price.display}
                    {selectedPlan.minSeats && ` (${selectedPlan.minSeats}+ seats required)`}
                  </span>
                </div>
                {selectedPlan.priceNote && (
                  <div className="flex justify-between">
                    <span className="text-sm text-navy-600">Note</span>
                    <p className="text-xs text-navy-500 text-right max-w-xs">
                      {selectedPlan.priceNote}
                    </p>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-navy-600">Billing</span>
                  <span className="text-sm font-medium text-navy-900">
                    {selectedPlan.category === "institution"
                      ? "Annual (per student)"
                      : selectedPlan.price.interval === "month"
                      ? "Monthly"
                      : "Custom"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-navy-600">Status</span>
                  <span className="text-sm font-medium text-navy-900 flex items-center gap-1">
                    <Clock size={14} className="text-amber-500" />
                    Coming soon
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="border-t border-navy-200 pt-6">
              <div className="flex items-center gap-2 text-sm text-navy-500 mb-4">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>No charges will be made at this time</span>
              </div>

              <Button
                variant="primary"
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={processing}
                leftIcon={processing ? undefined : <Crown size={18} />}
              >
                {processing ? "Processing..." : "Enable Plan (Coming Soon)"}
              </Button>

              <Button
                variant="ghost"
                className="w-full mt-3"
                onClick={() => navigate("/pricing")}
              >
                Back to Plans
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
