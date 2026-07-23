import { motion } from 'framer-motion';
import { FileSearch, GitCompare, Map } from 'lucide-react';
import Card from '@/components/ui/Card';

const steps = [
  {
    icon: FileSearch,
    title: 'Analyze',
    description: 'Our AI scans your resume, portfolio, and LinkedIn to build a complete skill profile.',
  },
  {
    icon: GitCompare,
    title: 'Compare',
    description: 'We benchmark your skills against thousands of job descriptions in your target field.',
  },
  {
    icon: Map,
    title: 'Roadmap',
    description: 'Receive a visual career roadmap with prioritized courses, projects, and milestones.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative bg-navy-800/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Three simple steps to transform your career trajectory.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 -z-10">
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="relative"
              >
                <Card hover padding="lg" className="border-white/5 bg-navy-800/40 backdrop-blur-sm text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white mb-4 shadow-lg shadow-orange-500/20">
                    <step.icon size={22} />
                  </div>
                  <div className="text-xs font-semibold text-orange-400 tracking-wider uppercase mb-2">
                    Step {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-navy-300 leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
