import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const trustItems = [
  {
    label: "Transparent",
    desc: "Skill matching is deterministic — based on your skills, interests, and degree.",
  },
  {
    label: "Real data",
    desc: "Resume analysis runs on the resume you upload. Your data stays yours.",
  },
  {
    label: "Your call",
    desc: "AI suggests. You decide your next steps.",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 bg-white border-y border-navy-200/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-navy-500 uppercase tracking-wider"
          >
            Honest by design
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 text-lg text-navy-600 max-w-3xl mx-auto"
          >
            Career<span className="text-orange-500">Path</span> is a practical
            career platform — not a guarantee.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
        >
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="text-center rounded-lg border border-navy-200/20 bg-navy-50/50 p-5"
            >
              <p className="text-sm font-semibold text-navy-900 mb-1">
                {item.label}
              </p>
              <p className="text-xs text-navy-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Link
            to="/register"
            className="text-sm font-medium text-navy-700 hover:text-navy-900 transition-colors"
          >
            Learn more about how it works →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
