import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import { INDIVIDUAL_PLANS } from "@/config/pricing";
import type { PricingPlan } from "@/config/pricing";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

function FeatureLabel({ feature }: { feature: string }) {
  return (
    <span>
      {feature
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())}
    </span>
  );
}

export function PricingSection() {
  const individualPlans = Object.values(INDIVIDUAL_PLANS) as PricingPlan[];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-navy-600"
          >
            Start free. Upgrade only when you need more.
          </motion.p>
        </div>

        <motion.div
          className="grid lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.15 },
            },
          }}
        >
          {individualPlans.map((plan, i) => (
            <motion.div key={plan.key} custom={i} variants={fadeIn}>
              <motion.div
                className={cn(
                  "rounded-2xl border bg-white p-8 flex flex-col h-full",
                  "shadow-sm transition-all duration-300",
                  plan.featured
                    ? "border-orange-300 shadow-xl"
                    : "border-navy-200/30"
                )}
                whileHover={{ y: -4, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)" }}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      variant="default"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                    >
                      Recommended
                    </Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-navy-900">{plan.name}</h3>
                  <p className="text-sm text-navy-500 mt-1">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-navy-900">
                    {plan.price.display}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.slice(0, 6).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-navy-600"
                    >
                      <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <FeatureLabel feature={feature} />
                    </li>
                  ))}
                  {plan.features.length > 6 && (
                    <li className="text-xs text-navy-400">
                      +{plan.features.length - 6} more features
                    </li>
                  )}
                </ul>

                <Link to="/pricing" className="mt-auto">
                  <Button
                    variant={plan.key === "free" ? "outline" : "primary"}
                    className="w-full"
                    size="lg"
                  >
                    {plan.key === "free"
                      ? "Start Free"
                      : plan.key === "pro"
                        ? "Get Pro"
                        : "Get Started"}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-navy-500 mb-6">
            <Building2 size={20} />
            <span>Institutional plans for colleges and placement cells</span>
          </div>
          <div className="mt-4">
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="h-11 px-6">
                Request a College Demo
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-xs text-navy-400 max-w-md mx-auto">
            Custom plans for multiple students with batch insights and placement
            cell dashboards. Contact us for details.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
