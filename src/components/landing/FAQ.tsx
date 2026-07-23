import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How does CareerAI analyze my skills?',
    answer: 'CareerAI uses state-of-the-art NLP models to parse your resume, portfolio, and professional profiles. It compares your skill graph against millions of job descriptions to identify gaps and opportunities.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Absolutely. We use zero-knowledge encryption and never sell or share your personal data. Your career information is encrypted at rest and in transit.',
  },
  {
    question: 'How long does it take to get a career roadmap?',
    answer: 'Most users receive their personalized roadmap within 2 minutes of completing the initial skill assessment. You can refine it as you progress.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes. You can cancel your Pro or Enterprise subscription at any time with no cancellation fees. You will retain access until the end of your billing period.',
  },
  {
    question: 'Does CareerAI work for non-technical careers?',
    answer: 'Yes! CareerAI serves professionals across all industries, including product, design, marketing, sales, and operations. Our models are trained on diverse career paths.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative bg-navy-800/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Everything you need to know about CareerAI.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="border border-white/5 rounded-xl bg-navy-800/40 backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">{faq.question}</span>
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-navy-300">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-sm text-navy-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
