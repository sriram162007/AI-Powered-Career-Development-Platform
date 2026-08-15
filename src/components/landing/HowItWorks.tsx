import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { journeySteps } from "@/content/landingData";

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight"
          >
            From confused to career-ready
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-navy-600"
          >
            Six steps from where you are to where you want to be.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-20 top-0 bottom-0 w-px hidden lg:block">
            <svg width="2" height="100%" className="text-navy-200/30">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6,6"
              />
            </svg>
          </div>

          <div className="space-y-12 lg:space-y-0">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative lg:pl-24"
              >
                <motion.div
                  className={cn(
                    "absolute left-0 top-0 flex h-10 w-10 items-center justify-center",
                    "rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white",
                    "text-sm font-bold shadow-sm"
                  )}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.15, duration: 0.4, ease: "easeOut" }}
                >
                  {step.step}
                </motion.div>

                <div className="mt-2 lg:mt-0 lg:ml-16 space-y-1">
                  <h3 className="text-xl font-semibold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="text-navy-600 leading-relaxed">
                    {step.description}
                  </p>
                  {step.detail && (
                    <p className="text-sm text-navy-500">{step.detail}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
