import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Button from '@/components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-navy-700/40 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-navy-200 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              AI-Powered Career Growth
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Accelerate your career with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                intelligent
              </span>{' '}
              guidance
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-6 text-lg text-navy-200 leading-relaxed"
            >
              CareerAI analyzes your skills, identifies gaps, and builds a personalized roadmap to help you land your dream job — faster than ever.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base font-semibold"
                rightIcon={<ArrowRight size={18} />}
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="h-12 px-8 text-base font-semibold bg-white/10 border-white/10 text-white hover:bg-white/20"
                leftIcon={<Play size={18} />}
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-8 flex items-center gap-6 text-sm text-navy-300"
            >
              <span>Trusted by professionals at</span>
              <div className="flex items-center gap-6 opacity-70">
                <span className="font-semibold text-white">Google</span>
                <span className="font-semibold text-white">Microsoft</span>
                <span className="font-semibold text-white">Amazon</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-white/10 bg-navy-800/50 backdrop-blur-xl p-6 shadow-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl blur-xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-orange-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 h-px bg-white/10 rounded-full" />
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-24 bg-white/20 rounded" />
                      <div className="h-2 w-40 bg-white/10 rounded" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-24 rounded-xl border border-white/10 bg-navy-900/50 p-3">
                      <div className="h-2 w-12 bg-orange-400/40 rounded mb-2" />
                      <div className="h-6 w-16 bg-white/10 rounded" />
                    </div>
                    <div className="h-24 rounded-xl border border-white/10 bg-navy-900/50 p-3">
                      <div className="h-2 w-12 bg-navy-300/40 rounded mb-2" />
                      <div className="h-6 w-16 bg-white/10 rounded" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-5/6 bg-white/10 rounded" />
                    <div className="h-2 w-4/6 bg-orange-400/20 rounded" />
                  </div>

                  <div className="flex gap-2">
                    <div className="h-8 flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600" />
                    <div className="h-8 w-8 rounded-lg border border-white/10" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 -top-8 -right-8 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px]" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-72 h-72 bg-navy-600/40 rounded-full blur-[100px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
