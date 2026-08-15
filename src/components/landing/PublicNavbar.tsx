import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#career-paths", label: "Career Paths" },
  { href: "#student-journey", label: "Student Stories" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

function handleAnchorScroll(href: string) {
  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
}

function AnchorLink({
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
      <button
        type="button"
        onClick={() => {
          handleAnchorScroll(href);
          onClick?.();
        }}
        className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors"
      >
        {label}
      </button>
    );
  }
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors",
        "relative",
        "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300",
        "hover:after:w-full"
      )}
    >
      {label}
    </Link>
  );
}

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHashPath = location.pathname === "/";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHashPath
          ? "bg-white/80 backdrop-blur-md border-b border-navy-200/30 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
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
            <span className="text-xl font-bold tracking-tight text-navy-900">
              Career<span className="text-orange-500">Path</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <AnchorLink key={item.href} href={item.href} label={item.label} />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" rightIcon={null}>
                Get Started
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-navy-600 hover:text-navy-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                className={cn(
                  "fixed top-0 left-0 h-dvh w-64 bg-white border-r border-navy-200/30 z-50 md:hidden",
                  "flex flex-col pt-16 pb-6 overflow-y-auto"
                )}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              >
                <div className="space-y-2 px-4 pb-6">
                  {navItems.map((item) => (
                    <div key={item.href} className="px-2">
                      <AnchorLink
                        href={item.href}
                        label={item.label}
                        onClick={() => setMobileOpen(false)}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-4 px-4 mt-auto">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="lg" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    <Button size="lg" fullWidth>
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
