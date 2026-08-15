import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { cn } from "@/utils/cn";

const questions = [
  "I know Python, but what should I learn next?",
  "Which skills are actually required for this role?",
  "Why am I not getting shortlisted?",
  "Should I learn AI, cloud, or web development?",
  "Is my resume good enough for placements?",
  "What should I prepare before an interview?",
];

const questionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
};

export function HumanQuestions() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-navy-500 uppercase tracking-wider"
          >
            Questions students actually ask
          </motion.span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((q, i) => (
            <motion.div
              key={q}
              custom={i}
              variants={questionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card
                padding="md"
                className={cn(
                  "h-full border border-navy-200/30 bg-navy-50/50",
                  "text-center"
                )}
              >
                <p className="text-sm text-navy-700 leading-relaxed">{q}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
