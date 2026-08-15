import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMobileSidebar } from "@/contexts/MobileSidebarContext";
import { Sidebar } from "@/components/layout/Sidebar";

const drawerVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
  exit: { x: "-100%" },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export function MobileSidebarDrawer() {
  const { isOpen, close } = useMobileSidebar();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={close}
          />
          <motion.div
            className="fixed inset-y-0 left-0 w-64 bg-navy-900 text-white z-60 lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                type="button"
                onClick={close}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-200 hover:bg-navy-800/50 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="pt-16 h-full overflow-y-auto">
              <Sidebar />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
