import { AnimatePresence, motion } from "framer-motion";
import { AudioProvider } from "./contexts/AudioContext";
import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";
import MusicControl from "./components/MusicControl";
import BackButton from "./components/BackButton";
import ParticleField from "./components/ParticleField";

import Intro from "./components/Intro";
import CelebrationHub from "./components/CelebrationHub";
import Mithai from "./components/Mithai";
import Fireworks from "./components/Fireworks";
import Diyas from "./components/Diyas";
import GiftBox from "./components/GiftBox";
import Memories from "./components/Memories";
import Reasons from "./components/Reasons";
import LoveLetter from "./components/LoveLetter";

/* ===== Section Map ===== */
const SECTION_COMPONENTS = {
  intro: Intro,
  hub: CelebrationHub,
  sweets: Mithai,
  fireworks: Fireworks,
  diyas: Diyas,
  gift: GiftBox,
  memories: Memories,
  reasons: Reasons,
  letter: LoveLetter,
};

/* ===== Page transition variants ===== */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.99,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ===== App Content (consumes NavigationContext) ===== */
function AppContent() {
  const { currentSection, showIntro } = useNavigation();

  const SectionComponent = SECTION_COMPONENTS[currentSection] || CelebrationHub;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#100B16] text-[#FFF2D8]">
      {/* Background particle layer */}
      <ParticleField particleCount={40} speed={0.35} />

      {/* Subtle radial glow behind content */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_30%,rgba(69,13,25,0.25)_0%,rgba(16,11,22,0.85)_75%)]" />

      {/* Navigation controls — visible after intro */}
      {!showIntro && (
        <>
          <MusicControl />
          <BackButton />
        </>
      )}

      {/* Section content with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentSection}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10"
        >
          <SectionComponent />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

/* ===== Root App with Providers ===== */
export default function App() {
  return (
    <NavigationProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </NavigationProvider>
  );
}