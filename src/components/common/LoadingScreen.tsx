import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function LoadingScreen() {
  const { theme } = useTheme();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: theme.colors.background }}
    >
      <div className="text-center">
        <motion.div
          className="mx-auto mb-4 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <Loader2
            size={48}
            className="text-orange-500"
            strokeWidth={2.5}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1
            className="text-xl font-semibold"
            style={{ color: theme.colors.textPrimary }}
          >
            Career Platform
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: theme.colors.textSecondary }}
          >
            Loading your dashboard...
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-6 h-1.5 w-48 overflow-hidden rounded-full"
          style={{ background: theme.colors.surfaceAlt }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #ff6b35 0%, #f5b942 100%)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "80%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
