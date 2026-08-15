import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import { featuredCareers } from "@/content/landingData";

const difficultyColors: Record<string, string> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
};

export function CareerPaths() {
  return (
    <section id="career-paths" className="py-20 sm:py-28 bg-navy-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight"
          >
            Career paths you can explore
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-navy-600"
          >
            Each path includes a detailed skill map, tools to learn, and a
            roadmap tailored to your starting point.
          </motion.p>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.15 },
            },
          }}
        >
          {featuredCareers.map((career, i) => (
            <motion.div
              key={career.id}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" as const }}
              whileHover={{ y: -2 }}
            >
              <Card
                hover
                padding="lg"
                className={cn(
                  "h-full border border-navy-200/20 bg-white",
                  "flex flex-col",
                  "group"
                )}
              >
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-navy-900">
                    {career.name}
                  </h3>
                  <Badge variant={difficultyColors[career.difficulty] as "success" | "warning" | "danger"} size="sm">
                    {career.difficulty}
                  </Badge>
                </div>

                <p className="text-sm text-navy-600 leading-relaxed flex-1 mb-4">
                  {career.shortDescription}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-navy-500 uppercase tracking-wider mb-2">
                    Foundation skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {career.foundationSkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 bg-navy-100 text-navy-600 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/register"
                  className={cn(
                    "mt-auto text-sm font-medium text-orange-600",
                    "hover:text-orange-700 transition-colors",
                    "flex items-center gap-1 group-hover:gap-2"
                  )}
                >
                  Explore path
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-all"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/register">
            <Button size="lg" variant="outline">
              See All Career Paths
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
