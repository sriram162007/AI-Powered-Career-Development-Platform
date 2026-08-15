import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-navy-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Your career doesn't need more random advice.
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-xl text-navy-200"
          >
            It needs a plan.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg text-navy-300"
        >
          Start with where you are. Choose where you want to go. We'll help you
          understand what comes next.
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/register">
            <Button size="lg" className="h-12 px-8 text-base font-semibold">
              Start Building Your Career Plan
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base font-semibold border-navy-600 text-navy-200 hover:bg-navy-800"
            onClick={() => {
              const el = document.getElementById("how-it-works");
              if (el) {
                const headerOffset = 80;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition =
                  elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }}
          >
            Explore How It Works
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
