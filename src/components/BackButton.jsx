import { motion, AnimatePresence } from "framer-motion";
import { Home } from "lucide-react";
import { useNavigation } from "../contexts/NavigationContext";

export default function BackButton() {
  const { currentSection, goHome } = useNavigation();

  const isVisible = currentSection !== "intro" && currentSection !== "hub";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="back-button"
          onClick={goHome}
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed top-5 left-5 sm:top-6 sm:left-6 z-[9999] flex h-11 w-11 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#100B16]/80 backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:bg-[#450D19]/60"
          style={{
            boxShadow: "0 0 12px rgba(212,175,55,0.15)",
          }}
          aria-label="Back to home"
        >
          <Home size={20} className="text-[#D4AF37]" strokeWidth={1.8} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
