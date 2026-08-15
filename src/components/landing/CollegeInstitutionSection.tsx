import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building, Users, BarChart3, FileCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { collegeBenefits, studentBenefits } from "@/content/landingData";

export function CollegeInstitutionSection() {
  return (
    <section className="py-20 sm:py-28 bg-navy-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight"
          >
            Built for colleges and placement cells
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-navy-600"
          >
            One structured platform so students always know what to learn next,
            and placement teams can see where students stand.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600 mb-4">
                <Building size={24} />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                For placement cells
              </h3>
              <p className="text-navy-600 leading-relaxed mb-4">
                Provide your students with a structured career-development
                platform that connects to your placement and training activities.
              </p>
              <ul className="space-y-2.5 text-sm text-navy-600">
                {collegeBenefits.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Students still benefit directly
              </h3>
              <ul className="space-y-2.5 text-sm text-navy-600">
                {studentBenefits.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <Link to="/pricing">
              <Button size="lg" className="h-11 px-6 font-semibold">
                Request a College Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={cn(
                    "rounded-xl border border-navy-200/20 bg-white p-6",
                    "shadow-sm"
                  )}
                >
                  <Users size={20} className="text-blue-500 mb-2" />
                  <p className="text-2xl font-bold text-navy-900">Placement Cells</p>
                  <p className="text-sm text-navy-600 mt-1">
                    Track readiness of your batch, identify skill gaps at scale.
                  </p>
                </div>
                <div
                  className={cn(
                    "rounded-xl border border-navy-200/20 bg-white p-6",
                    "shadow-sm"
                  )}
                >
                  <FileCheck size={20} className="text-green-500 mb-2" />
                  <p className="text-2xl font-bold text-navy-900">Students</p>
                  <p className="text-sm text-navy-600 mt-1">
                    Get a clear roadmap, improve resumes, prepare for interviews.
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "rounded-xl border border-navy-200/20 bg-white p-6",
                  "shadow-sm"
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 size={20} className="text-orange-500" />
                  <span className="text-sm font-semibold text-navy-500 uppercase tracking-wider">
                    Batch Insights
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-navy-600">Average readiness</span>
                      <span className="font-medium text-navy-900">63%</span>
                    </div>
                    <div className="w-full h-2 bg-navy-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-navy-500 to-navy-700 rounded-full"
                        style={{ width: "63%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-navy-600">Skill gap coverage</span>
                      <span className="font-medium text-navy-900">42%</span>
                    </div>
                    <div className="w-full h-2 bg-navy-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                        style={{ width: "42%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
