import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { landingFeatures } from "@/content/landingData";

const iconMap: Record<string, string> = {
  target: "🎯",
  gap: "🔍",
  roadmap: "🗺️",
  "resume-analysis": "📄",
  "resume-builder": "✍️",
  readiness: "📊",
  skills: "🧠",
  projects: "📁",
};

const categoryLabels: Record<string, string> = {
  career: "Career Planning",
  resume: "Resume & Interview",
  learning: "Learning & Projects",
  preparation: "Placement Preparation",
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function FeatureShowcase() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight"
          >
            Everything you need, in one place
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-navy-600"
          >
            From discovering your career direction to landing your first role —
            the platform connects the full journey.
          </motion.p>
        </div>

        <motion.div
          className="space-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.15 },
            },
          }}
        >
          {landingFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon] || "📦";
            const isEven = i % 2 === 0;
            return (
              <motion.div key={feature.id} custom={i} variants={fadeIn}>
                <div
                  className={cn(
                    "grid lg:grid-cols-2 gap-12 items-center",
                    "lg:even:grid-flow-row-reverse"
                  )}
                >
                  <div className="space-y-4">
                    <motion.span
                      className="inline-flex items-center gap-2 text-sm font-semibold text-navy-500 uppercase tracking-wider"
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                    >
                      <span>{Icon}</span>
                      {categoryLabels[feature.category]}
                    </motion.span>
                    <h3 className="text-2xl font-bold text-navy-900">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-navy-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <p className="text-sm text-navy-500 leading-relaxed">
                      {feature.detail}
                    </p>
                  </div>

                  <motion.div
                    className={cn(
                      "rounded-xl border border-navy-200/20 bg-white p-6",
                      "shadow-sm"
                    )}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1 + 0.1,
                      duration: 0.5,
                      ease: "easeOut" as const,
                    }}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.04)",
                      transition: { duration: 0.2, ease: "easeOut" as const },
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{Icon}</span>
                      <h4 className="text-lg font-semibold text-navy-900">
                        {feature.title}
                      </h4>
                    </div>
                    <ul className="space-y-2.5 text-sm text-navy-600">
                      <li className="flex items-start gap-2.5">
                        <span className="text-navy-400 mt-0.5">→</span>
                        <span>{feature.description}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-navy-400 mt-0.5">→</span>
                        <span>{feature.detail}</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
