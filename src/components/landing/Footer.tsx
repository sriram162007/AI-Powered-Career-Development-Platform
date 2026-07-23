import { Sparkles, Code2, MessageSquare, Users, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <Sparkles size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Career<span className="text-orange-500">AI</span>
              </span>
            </div>
            <p className="text-sm text-navy-400 max-w-xs leading-relaxed mb-6">
              The most advanced AI-powered career platform. Accelerate your career with intelligent guidance and personalized roadmaps.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-navy-400 hover:text-white transition-colors">
                <Code2 size={20} />
              </a>
              <a href="#" className="text-navy-400 hover:text-white transition-colors">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="text-navy-400 hover:text-white transition-colors">
                <Users size={20} />
              </a>
              <a href="#" className="text-navy-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-navy-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-navy-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-navy-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-navy-500">
            CareerAI Inc. All rights reserved.
          </p>
          <p className="text-xs text-navy-600">
            Built with intelligence. Designed for humans.
          </p>
        </div>
      </div>
    </footer>
  );
}
