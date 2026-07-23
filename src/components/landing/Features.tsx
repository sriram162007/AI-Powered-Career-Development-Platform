import { motion } from 'framer-motion';
import {
  Target,
  Zap,
  Shield,
  GitBranch,
  BarChart3,
  Users,
} from 'lucide-react';
import Card from '@/components/ui/Card';

const features = [
  {
    icon: Target,
    title: 'Smart Goal Setting',
    description: 'Define clear career objectives with AI assistance that aligns with your strengths and market demand.',
  },
  {
    icon: Zap,
    title: 'Instant Skill Analysis',
    description: 'Upload your resume or link your profile and get an instant breakdown of your competencies.',
  },
  {
    icon: Shield,
    title: 'Privacy-First Design',
    description: 'Your data stays yours. We use zero-knowledge architecture and never share personal information.',
  },
  {
    icon: GitBranch,
    title: 'Actionable Roadmaps',
    description: 'Receive step-by-step project blueprints tailored to bridge the gap between where you are and where you want to be.',
  },
  {
    icon: BarChart3,
    title: 'Performance Insights',
    description: 'Track progress with rich analytics that show skill growth over time and benchmark against industry standards.',
  },
  {
    icon: Users,
    title: 'Mentorship Matching',
    description: 'Connect with industry veterans who have walked the path you are on, powered by intelligent matching.',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Everything you need to grow
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            CareerAI combines cutting-edge AI with proven career development strategies to give you an unfair advantage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <Card hover padding="lg" className="h-full border-white/5 bg-navy-800/40 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 text-orange-400">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-navy-300 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
