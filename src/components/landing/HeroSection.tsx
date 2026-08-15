import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import InteractivePreview from "@/components/landing/InteractivePreview";

function AnchorLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors inline-flex items-center gap-1 group"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      {label}
      <motion.span
        className="text-navy-400 group-hover:text-navy-700 transition-transform"
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

export function HeroSection() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
      <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy-200/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-navy-200/30 bg-navy-50 px-4 py-1.5 text-sm text-navy-600 mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Real student questions. Practical answers.
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold tracking-tight text-navy-900 leading-[1.03]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              Stop guessing what to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                learn next.
              </span>
            </motion.h1>

            <motion.p
              className="mt-5 text-xl text-navy-600 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              Build the career you're actually aiming for. Discover career paths,
              find your skill gaps, follow a practical roadmap, improve your resume,
              and track your progress — all in one place.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <Link to="/register">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base font-semibold"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Get Started
                </Button>
              </Link>
              <AnchorLink href="#how-it-works" label="See How It Works" />
            </motion.div>

            <motion.div
              className="mt-10 text-sm text-navy-500"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              Designed for college students, fresh graduates, and early-career
              professionals.
            </motion.div>
          </div>

          <InteractivePreview reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
