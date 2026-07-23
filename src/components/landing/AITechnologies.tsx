import { motion } from 'framer-motion';
import { Brain, Cpu, Database, LineChart, MessageSquare, ShieldCheck } from 'lucide-react';
import Card from '@/components/ui/Card';

const technologies = [
  { icon: Brain, name: 'GPT-4o', desc: 'Advanced reasoning and career advice generation' },
  { icon: Cpu, name: 'Claude 4 Sonnet', desc: 'Deep contextual understanding of your goals' },
  { icon: Database, name: 'Vector Databases', desc: 'Semantic search across millions of job descriptions' },
  { icon: LineChart, name: 'Predictive Analytics', desc: 'Forecast skill demand and salary trends' },
  { icon: MessageSquare, name: 'Fine-tuned LLMs', desc: 'Models specialized in career guidance' },
  { icon: ShieldCheck, name: 'Privacy-Preserving ML', desc: 'Training without exposing sensitive user data' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export function AITechnologies() {
  return (
    <section id="technologies" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Powered by cutting-edge AI
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Built on the same foundational models and architectures trusted by the worlds leading technology teams.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <Card hover padding="lg" className="border-white/5 bg-white/[0.02] backdrop-blur-sm group">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 text-orange-400 group-hover:scale-110 transition-transform">
                    <tech.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{tech.name}</h3>
                    <p className="text-sm text-navy-300 mt-1">{tech.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
