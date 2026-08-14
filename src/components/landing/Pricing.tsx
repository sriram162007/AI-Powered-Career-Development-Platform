import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for exploring career paths',
    features: ['5 Skill Analyses per month', 'Basic Roadmaps', 'Community Access', 'Email Support'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: 29, yearly: 24 },
    description: 'For serious job seekers and switchers',
    features: ['Unlimited Skill Analyses', 'Advanced AI Roadmaps', 'Mentorship Matching', 'Priority Support', 'Interview Prep AI'],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: null, yearly: null },
    description: 'For teams and career coaches',
    features: ['Custom AI Models', 'Team Analytics Dashboard', 'SSO & SCIM', 'Dedicated Account Manager', 'SLA Guarantee'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 relative bg-navy-800/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Choose the plan that fits your career stage. Upgrade or cancel anytime.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={!yearly ? 'text-white font-medium' : 'text-navy-400'}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-navy-700 transition-colors focus:outline-none"
          >
            <span
              className={cn(
                'inline-block h-4 w-4 rounded-full bg-white transition-transform',
                yearly ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
          <span className={yearly ? 'text-white font-medium' : 'text-navy-400'}>
            Yearly
            <span className="ml-2 text-xs text-orange-400 font-semibold">Save 20%</span>
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card
                padding="lg"
                className={cn(
                  'h-full border flex flex-col',
                  plan.highlighted
                    ? 'border-orange-500/50 bg-navy-800/60 shadow-2xl shadow-orange-500/10 relative'
                    : 'border-white/5 bg-navy-800/40'
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="text-sm text-navy-300 mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.price.monthly === null ? (
                    <span className="text-4xl font-bold text-white">Custom</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">
                        ${yearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-navy-400">/mo</span>
                    </div>
                  )}
                  {yearly && plan.price.monthly !== null && (
                    <p className="text-sm text-navy-400 mt-1">Billed ${(plan.price.yearly * 12).toLocaleString()} yearly</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-navy-200">
                      <Check size={16} className="text-orange-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    if (plan.name === 'Enterprise') {
                      window.location.href = 'mailto:sales@careerai.in';
                    } else {
                      navigate('/pricing');
                    }
                  }}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
