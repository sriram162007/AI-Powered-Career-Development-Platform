import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Card from '@/components/ui/Card';

const testimonials = [
  {
    initials: 'AK',
    name: 'Amanda K.',
    role: 'Product Manager at Stripe',
    quote: 'CareerAI identified skills I never considered. Within 3 months, I transitioned into a PM role with a 40% raise.',
    stars: 5,
  },
  {
    initials: 'RJ',
    name: 'Ravi J.',
    role: 'Senior Engineer at Meta',
    quote: 'The mentorship matching is unreal. My mentor helped me navigate the staff engineer track with precision.',
    stars: 5,
  },
  {
    initials: 'SL',
    name: 'Sarah L.',
    role: 'UX Designer at Figma',
    quote: 'Finally, a career tool that understands design. The roadmap was tailored to my creative strengths.',
    stars: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Loved by career seekers
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Join thousands of professionals who have accelerated their careers with CareerAI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <Card hover padding="lg" className="border-white/5 bg-navy-800/40 backdrop-blur-sm h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <blockquote className="text-navy-200 text-sm leading-relaxed flex-1 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-semibold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{testimonial.name}</p>
                    <p className="text-xs text-navy-400">{testimonial.role}</p>
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
