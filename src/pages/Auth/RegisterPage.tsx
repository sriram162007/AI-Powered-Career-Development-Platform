import { Link } from "react-router-dom";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function validateName(name: string) {
  if (!name) return "Full name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return "";
}

function validateEmail(email: string) {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address";
  return "";
}

function validatePassword(password: string) {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
}

function validateConfirmPassword(password: string, confirm: string) {
  if (!confirm) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return "";
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(password, confirmPassword);

    setErrors({
      name: nameError || undefined,
      email: emailError || undefined,
      password: passwordError || undefined,
      confirmPassword: confirmError || undefined,
    });

    if (nameError || emailError || passwordError || confirmError) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Register placeholder:", { name, email, password });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-navy-900 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-navy-700/40 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Career<span className="text-orange-500">AI</span>
            </span>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="sm" className="bg-white/10 border-white/10 text-white hover:bg-white/20">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-navy-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 text-orange-400 mb-4"
              >
                <Sparkles size={24} />
              </motion.div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-2xl font-bold text-white"
              >
                Create your account
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="mt-2 text-sm text-navy-300"
              >
                Start your AI-powered career journey today.
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <label className="block text-sm font-medium text-navy-200 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="John Doe"
                    className="h-10 w-full rounded-lg border border-white/10 bg-navy-900/50 pl-10 pr-3 py-2 text-sm text-white placeholder:text-navy-500 outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    style={{ background: "var(--background, #0b1020)", color: "var(--textPrimary, #fff)" }}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                <label className="block text-sm font-medium text-navy-200 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    className="h-10 w-full rounded-lg border border-white/10 bg-navy-900/50 pl-10 pr-3 py-2 text-sm text-white placeholder:text-navy-500 outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    style={{ background: "var(--background, #0b1020)", color: "var(--textPrimary, #fff)" }}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                <label className="block text-sm font-medium text-navy-200 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="••••••••"
                    className="h-10 w-full rounded-lg border border-white/10 bg-navy-900/50 pl-10 pr-10 py-2 text-sm text-white placeholder:text-navy-500 outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    style={{ background: "var(--background, #0b1020)", color: "var(--textPrimary, #fff)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
                )}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                <label className="block text-sm font-medium text-navy-200 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                    }}
                    placeholder="••••••••"
                    className="h-10 w-full rounded-lg border border-white/10 bg-navy-900/50 pl-10 pr-3 py-2 text-sm text-white placeholder:text-navy-500 outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    style={{ background: "var(--background, #0b1020)", color: "var(--textPrimary, #fff)" }}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>
                )}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7}>
                <label className="flex items-center gap-2 text-sm text-navy-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-white/20 bg-navy-900/50 text-orange-500 focus:ring-orange-500/20"
                  />
                  I agree to the{" "}
                  <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
                    Terms & Conditions
                  </a>
                </label>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={8}>
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  className="mt-2"
                >
                  {!isSubmitting && <span className="flex items-center gap-2">
                    Create Account <ArrowRight size={16} />
                  </span>}
                </Button>
              </motion.div>
            </form>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={9}
              className="relative my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-navy-800/50 text-navy-400">Or continue with</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={10}>
              <button
                type="button"
                onClick={() => console.log("Google sign-in placeholder")}
                className="flex w-full items-center justify-center gap-3 h-10 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white transition-colors hover:bg-white/10"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={11}
              className="mt-6 text-center text-sm text-navy-300"
            >
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-orange-400 hover:text-orange-300 transition-colors">
                Sign in
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-xs text-navy-500">
            CareerAI Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
