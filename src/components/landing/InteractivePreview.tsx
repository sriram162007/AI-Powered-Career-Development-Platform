import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { previewStates } from "@/content/landingData";

interface InteractivePreviewProps {
  reducedMotion: boolean;
}

const CYCLE_INTERVAL = 4000;

const tabVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

function AnimatedNumber({
  value,
  suffix = "",
  reducedMotion,
}: {
  value: number;
  suffix?: string;
  reducedMotion: boolean;
}) {
  const [displayed, setDisplayed] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(value);
      return;
    }
    let start: number | null = null;
    const target = value;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * target);
      setDisplayed(currentValue);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, reducedMotion]);

  return (
    <span className="text-navy-900">
      {displayed}
      {suffix}
    </span>
  );
}

function ProgressBar({
  value,
  max,
  color = "navy",
  reducedMotion,
}: {
  value: number;
  max: number;
  color?: string;
  reducedMotion: boolean;
}) {
  const percentage = Math.round((value / max) * 100);
  return (
    <div className="space-y-2">
      <div
        className={cn(
          "h-1.5 w-full rounded-full overflow-hidden",
          "bg-navy-100"
        )}
      >
        <motion.div
          className={cn(
            "h-full rounded-full",
            color === "navy"
              ? "bg-navy-500"
              : "bg-gradient-to-r from-orange-400 to-orange-500"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease: "easeOut" as const,
          }}
        />
      </div>
    </div>
  );
}

const previewContent: Record<string, (props: { reducedMotion: boolean }) => React.ReactNode> = {
  career: ({ reducedMotion }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-navy-400 uppercase tracking-wider">
          Career Match
        </p>
        <span className="text-2xl font-bold">
          <AnimatedNumber value={82} suffix="%" reducedMotion={reducedMotion} />
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-navy-400">Python</span>
          <span className="text-green-500">✓</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-navy-400">AI interest</span>
          <span className="text-green-500">✓</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-navy-400">CSE background</span>
          <span className="text-green-500">✓</span>
        </div>
      </div>
    </div>
  ),
  skills: ({ reducedMotion }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-navy-400 uppercase tracking-wider">
          Skill Coverage
        </p>
        <span className="text-sm text-navy-500">
          5 of 12 covered
        </span>
      </div>
      <ProgressBar value={5} max={12} reducedMotion={reducedMotion} />
      <div className="flex flex-wrap gap-1.5 mt-3">
        {["Statistics", "Machine Learning", "Git", "Deep Learning"].map(
          (skill) => (
            <span
              key={skill}
              className="text-xs px-2.5 py-1 bg-navy-50 text-navy-600 rounded-full"
            >
              {skill}
            </span>
          )
        )}
      </div>
    </div>
  ),
  roadmap: ({ reducedMotion: _reducedMotion }) => (
    <div className="space-y-4">
      <p className="text-xs text-navy-400 uppercase tracking-wider">
        Your next 90 days
      </p>
      <div className="space-y-3">
        {[
          { week: "Weeks 1–4", activity: "Python + Statistics" },
          { week: "Weeks 5–8", activity: "Machine Learning" },
          { week: "Weeks 9–12", activity: "Build an AI Project" },
        ].map((item, idx) => (
          <div key={item.week} className="flex items-start gap-3">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full",
                "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
                "text-xs font-bold"
              )}
            >
              {idx + 1}
            </span>
            <div>
              <p className="text-xs text-navy-400">{item.week}</p>
              <p className="text-sm font-medium text-navy-900">{item.activity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  resume: ({ reducedMotion }) => (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-xs text-navy-400 uppercase tracking-wider">
            Resume Score
          </span>
          <span className="font-semibold text-navy-900">
            <AnimatedNumber value={72} suffix="/100" reducedMotion={reducedMotion} />
          </span>
        </div>
        <ProgressBar value={72} max={100} color="orange" reducedMotion={reducedMotion} />
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <p className="font-medium text-navy-700">3 improvements</p>
        <div className="space-y-1.5 text-navy-600">
          <div className="flex items-start gap-2">
            <span className="text-orange-500">→</span>
            <span>Add technical projects section</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-500">→</span>
            <span>Quantify achievements with numbers</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-500">→</span>
            <span>Use consistent formatting</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

const FloatingBadge = ({
  label,
  value,
  delay,
  align,
}: {
  label: string;
  value: string;
  delay: number;
  align: "top" | "bottom";
}): React.ReactElement => {
  return (
    <motion.div
      className={cn(
        "absolute z-10 px-3 py-2 rounded-lg",
        "border border-navy-200/20 bg-white",
        "text-xs font-medium text-navy-600",
        "shadow-sm",
        align === "top" ? "top-3" : "bottom-3"
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        y: [-2, 2, -2],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        delay,
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="font-semibold text-navy-900">{value}</div>
      <div className="text-navy-400">{label}</div>
    </motion.div>
  );
};

export default function InteractivePreview({ reducedMotion }: InteractivePreviewProps) {
  const [active, setActive] = useState("career");
  const timerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const cycleToNext = useCallback(() => {
    const currentIndex = previewStates.findIndex((s) => s.key === active);
    const nextIndex = (currentIndex + 1) % previewStates.length;
    setActive(previewStates[nextIndex].key);
  }, [active]);

  const startCycle = useCallback(() => {
    if (reducedMotion) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (!pausedRef.current) {
        cycleToNext();
      }
    }, CYCLE_INTERVAL);
  }, [reducedMotion, cycleToNext]);

  useEffect(() => {
    startCycle();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startCycle]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    startCycle();
  };

  const handleSelect = (key: string) => {
    setActive(key);
    pausedRef.current = false;
    startCycle();
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-xl border border-navy-200/30 bg-white p-6",
        "shadow-sm",
        "max-w-md w-full"
      )}
      initial={{ opacity: 0, x: 30, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={reducedMotion ? undefined : handleMouseEnter}
      onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
    >
      {!reducedMotion && (
        <>
          <FloatingBadge
            label="Career Match"
            value="82%"
            delay={0.5}
            align="top"
          />
          <FloatingBadge
            label="Resume"
            value="72"
            delay={1.5}
            align="bottom"
          />
        </>
      )}

      <div className="mb-4">
        <p className="text-xs text-navy-400 uppercase tracking-wider">
          {previewStates.find((s) => s.key === active)?.subtitle}
        </p>
      </div>

      <div className="mb-4 flex gap-1 p-1.5 bg-navy-50 rounded-lg">
        {previewStates.map((state) => (
          <button
            key={state.key}
            type="button"
            onClick={() => handleSelect(state.key)}
            className={cn(
              "flex-1 px-3 py-1.5 rounded-md text-xs font-medium",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-orange-500/50",
              active === state.key
                ? "bg-white text-navy-900 shadow-sm"
                : "text-navy-400 hover:text-navy-700 hover:bg-navy-100/50"
            )}
          >
            {state.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {previewContent[active]({ reducedMotion })}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
