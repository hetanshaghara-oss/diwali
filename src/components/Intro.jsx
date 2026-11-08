import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { useNavigation } from "../contexts/NavigationContext";
import { useAudio } from "../contexts/AudioContext";

export default function Intro() {
  const { completeIntro } = useNavigation();
  const { playSound, toggleMusic, isPlaying } = useAudio();
  const [stage, setStage] = useState(0); // 0: text1, 1: text2, 2: reveal

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(1);
    }, 3200);

    const timer2 = setTimeout(() => {
      setStage(2);
    }, 6800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleEnter = () => {
    playSound("sparkle");
    if (!isPlaying) {
      toggleMusic();
    }
    completeIntro();
  };

  const handleSkip = () => {
    playSound("whoosh");
    if (!isPlaying) {
      toggleMusic();
    }
    completeIntro();
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-8 select-none">
      {/* Decorative Traditional Rangoli Corners */}
      <div className="pointer-events-none absolute top-4 left-4 h-24 w-24 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-3xl">
        <div className="absolute top-2 left-2 h-16 w-16 border-t border-l border-[#FFD98A]/20 rounded-tl-2xl" />
        <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
      </div>
      <div className="pointer-events-none absolute top-4 right-4 h-24 w-24 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-3xl">
        <div className="absolute top-2 right-2 h-16 w-16 border-t border-r border-[#FFD98A]/20 rounded-tr-2xl" />
        <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 h-24 w-24 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-3xl">
        <div className="absolute bottom-2 left-2 h-16 w-16 border-b border-l border-[#FFD98A]/20 rounded-bl-2xl" />
        <div className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 h-24 w-24 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-3xl">
        <div className="absolute bottom-2 right-2 h-16 w-16 border-b border-r border-[#FFD98A]/20 rounded-br-2xl" />
        <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
      </div>

      {/* Skip button in header */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSkip}
        className="absolute top-6 right-8 z-30 flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#100B16]/60 px-4 py-1.5 text-xs text-[#FFD98A] backdrop-blur-md transition-all cursor-pointer hover:border-[#D4AF37]"
      >
        <span>Skip intro</span>
        <Sparkles className="h-3 w-3 text-[#D4AF37]" />
      </motion.button>

      {/* Floating Diyas Background Illustration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating Diya Left */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-8 bottom-24 md:left-24 opacity-60"
        >
          <div className="relative">
            <div className="h-4 w-4 mx-auto rounded-full bg-gradient-to-t from-orange-500 to-yellow-200 blur-[2px] animate-pulse" />
            <div className="h-5 w-14 rounded-b-full bg-gradient-to-r from-amber-800 via-amber-600 to-amber-900 border border-amber-500/40 shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          </div>
        </motion.div>

        {/* Floating Diya Right */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [2, -2, 2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-8 top-32 md:right-28 opacity-60"
        >
          <div className="relative">
            <div className="h-4 w-4 mx-auto rounded-full bg-gradient-to-t from-orange-500 to-yellow-200 blur-[2px] animate-pulse" />
            <div className="h-5 w-14 rounded-b-full bg-gradient-to-r from-amber-800 via-amber-600 to-amber-900 border border-amber-500/40 shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          </div>
        </motion.div>
      </div>

      {/* Main Text & Stage Sequences */}
      <div className="relative z-20 max-w-2xl text-center px-4">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="py-12"
            >
              <p className="font-playfair text-2xl md:text-4xl text-[#FFD98A]/90 italic tracking-wide leading-relaxed">
                "Some celebrations are beautiful…"
              </p>
              <div className="mx-auto mt-6 h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="py-12"
            >
              <p className="font-playfair text-2xl md:text-4xl text-[#FFF2D8] font-medium tracking-wide leading-relaxed">
                "But celebrating with you makes everything magical."
              </p>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-4 flex justify-center text-[#8B1729]"
              >
                <Heart className="h-8 w-8 fill-red-600 stroke-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
              </motion.div>
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Diya Icon with radiating glow */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mb-6"
              >
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#D4AF37]/30 to-[#8B1729]/30 blur-xl animate-pulse" />
                <div className="relative text-6xl select-none filter drop-shadow-[0_0_20px_rgba(255,217,138,0.8)]">
                  🪔
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD98A] via-[#FFF2D8] to-[#D4AF37] drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]"
              >
                Happy Diwali, My Love!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-3 sm:mt-4 font-poppins text-sm sm:text-lg md:text-xl text-[#FFF2D8]/80 max-w-lg leading-relaxed px-2"
              >
                Tonight, I have created a little world just for us.
              </motion.p>

              {/* Glowing CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-8 sm:mt-10"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.6)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleEnter}
                  className="group relative inline-flex items-center gap-2.5 sm:gap-3 overflow-hidden rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#8B1729] via-[#450D19] to-[#8B1729] px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold text-[#FFF2D8] shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all cursor-pointer touch-manipulation active:scale-95"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FFD98A]/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  <span>ENTER OUR DIWALI WORLD</span>
                  <Heart className="h-5 w-5 fill-[#FFD98A] text-[#FFD98A] animate-pulse" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Bottom Greeting */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 text-center text-xs text-[#FFF2D8]/50 tracking-widest uppercase font-poppins"
      >
        A Romantic Festive Celebration • Handcrafted With Love
      </motion.p>
    </div>
  );
}