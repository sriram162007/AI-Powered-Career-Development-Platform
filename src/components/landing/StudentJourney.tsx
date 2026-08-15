import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { studentJourney } from "@/content/landingData";

export function StudentJourney() {
  return (
    <section id="student-journey" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-navy-500 uppercase tracking-wider"
          >
            Illustrative example
          </motion.span>
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight"
          >
            From confused to career-ready
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-navy-600"
          >
            This is a labeled example, not a real student story or outcome.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-navy-200/30 hidden sm:block" />

          <div className="space-y-8 sm:space-y-0">
            {studentJourney.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                className="relative sm:pl-12 sm:pb-8"
              >
                <motion.div
                  className={cn(
                    "absolute left-0 top-0 flex h-8 w-8 items-center justify-center",
                    "rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white",
                    "text-xs font-bold"
                  )}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.2, duration: 0.4 }}
                >
                  {i + 1}
                </motion.div>

                <div className="mt-2 sm:mt-0">
                  <h3 className="text-lg font-semibold text-navy-900">
                    {step.label}
                  </h3>
                  <p className="mt-1 text-sm text-navy-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {i < studentJourney.length - 1 && (
                  <div className="absolute left-4 top-8 h-full w-px bg-navy-200/20 -z-10 hidden sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
