import { motion } from "framer-motion";

const modules = [
  { label: "Profile", desc: "Skills, education, projects, internships" },
  { label: "Career Discovery", desc: "Find matching career roles" },
  { label: "Skill Gap", desc: "Identify what's missing" },
  { label: "Roadmap", desc: "Your step-by-step plan" },
  { label: "Learning", desc: "Courses and projects" },
  { label: "Resume Builder", desc: "Polished, ATS-ready resume" },
  { label: "Readiness", desc: "Track interview preparedness" },
];

export function PlatformVisual() {
  return (
    <section className="py-20 sm:py-28 bg-navy-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight"
          >
            One connected platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-navy-600"
          >
            Each module feeds into the next. No more scattered tools.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-navy-200/30 hidden sm:block" />

            <div className="space-y-6 sm:space-y-0">
              {modules.map((mod, i) => (
                <motion.div
                  key={mod.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                  className="relative sm:pl-16 pb-6"
                >
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-navy-100 text-navy-700 text-xs font-semibold">
                    {i + 1}
                  </div>
                  <div className="sm:ml-6">
                    <h3 className="font-semibold text-navy-900 mb-1">
                      {mod.label}
                    </h3>
                    <p className="text-sm text-navy-600">{mod.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
