import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function RegisterPage() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Failed to sign up with Google");
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

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="space-y-4">
              <Button
                type="button"
                fullWidth
                size="lg"
                onClick={handleGoogleSignIn}
                loading={isSubmitting}
                leftIcon={
                  !isSubmitting ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  ) : undefined
                }
              >
                Sign up with Google
              </Button>

              {error && (
                <p className="text-xs text-red-400 text-center">{error}</p>
              )}
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
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
