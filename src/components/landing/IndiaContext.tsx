import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

const realityPoints = [
  {
    title: "So many career options, so little guidance",
    description:
      "Software, AI/ML, data, cloud, cybersecurity — the choices multiply every year.",
  },
  {
    title: "Internships and placements feel out of reach",
    description:
      "You need the right skills, projects, and resume — but no one tells you which ones.",
  },
  {
    title: "Your resume gets filtered before it's read",
    description:
      "If it doesn't pass an ATS, it never reaches a recruiter. Most students don't know this until it's too late.",
  },
  {
    title: "Learning outside the classroom",
    description:
      "Your degree covers theory, but the skills employers want come from deliberate practice.",
  },
];

export function IndiaContext() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
              Built for Indian students
            </h2>
            <p className="mt-4 text-navy-700 leading-relaxed">
              Whether you're studying in Chennai, Coimbatore, Madurai, Trichy,
              Salem, Tirunelveli, or anywhere else in India — the platform adapts
              to your college background and timeline.
            </p>
            <p className="mt-4 text-navy-600 leading-relaxed">
              Whether you're in your first year or preparing for placements,
              whether you're in CSE, IT, Data Science, or another degree — you get
              a starting point that matches your situation.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 lg:mt-0 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
            }}
          >
            {realityPoints.map((point, i) => (
              <motion.div
                key={point.title}
                custom={i}
                variants={fadeUp}
                className={cn(
                  "rounded-xl border border-navy-200/20 bg-navy-50/50 p-5",
                  "transition-all duration-300",
                  "hover:shadow-md hover:border-navy-200/40"
                )}
              >
                <h3 className="text-lg font-semibold text-navy-900 mb-1">
                  {point.title}
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
