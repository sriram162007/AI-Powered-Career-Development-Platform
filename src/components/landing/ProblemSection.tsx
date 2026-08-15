import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { studentProblems } from "@/content/landingData";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export function ProblemSection() {
  return (
    <section className="py-20 sm:py-28 bg-navy-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            Does this sound familiar?
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.15 },
            },
          }}
        >
          {studentProblems.map((item, i) => (
            <motion.div key={item.problem} custom={i} variants={fadeIn}>
              <div
                className={cn(
                  "h-full rounded-xl border border-navy-200/20 bg-white p-6",
                  "shadow-sm transition-all duration-200",
                  "hover:shadow-md hover:border-navy-200/30"
                )}
              >
                <p className="text-base font-semibold text-navy-900 mb-2">
                  {item.problem}
                </p>
                <p className="text-sm text-navy-600 leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
