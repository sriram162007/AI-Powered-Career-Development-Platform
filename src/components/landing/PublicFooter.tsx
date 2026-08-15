import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { label: "Career Discovery", href: "#features" },
    { label: "Skill Gap Analysis", href: "#features" },
    { label: "Career Roadmap", href: "#features" },
    { label: "Resume Builder", href: "#features" },
    { label: "Career Readiness", href: "#features" },
  ],
  resources: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Career Paths", href: "#career-paths" },
    { label: "FAQ", href: "#faq" },
  ],
  pricing: [
    { label: "Individual Plans", href: "/pricing" },
    { label: "Institution Plans", href: "/pricing" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "mailto:support@careerpath.in" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

function FooterLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const isHash = href.startsWith("#");
  if (isHash) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const targetId = href.replace("#", "");
          const element = document.getElementById(targetId);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
          onClick?.();
        }}
        className="text-sm text-navy-500 hover:text-navy-800 transition-colors"
      >
        {label}
      </a>
    );
  }
  return (
    <Link
      to={href}
      onClick={onClick}
      className="text-sm text-navy-500 hover:text-navy-800 transition-colors"
    >
      {label}
    </Link>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-navy-900 border-t border-navy-200/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Career<span className="text-orange-500">Path</span>
              </span>
            </Link>
            <p className="text-sm text-navy-400 leading-relaxed">
              A clear direction for your career journey.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Pricing</h4>
            <ul className="space-y-3">
              {footerLinks.pricing.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">For Colleges</h4>
            <ul className="space-y-3">
              {footerLinks.pricing.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-200/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-navy-500">
            CareerPath Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <FooterLink key={link.label} href={link.href} label={link.label} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
