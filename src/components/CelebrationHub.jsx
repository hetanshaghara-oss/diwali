import { motion } from "framer-motion";
import { Sparkles, Heart, Camera, Mail } from "lucide-react";
import { useNavigation } from "../contexts/NavigationContext";
import { useAudio } from "../contexts/AudioContext";

const MAIN_EXPERIENCES = [
  {
    id: "sweets",
    title: "Sweet Moments",
    subtitle: "A little sweetness for my sweetest person. Traditional festive mithai made with pure love.",
    icon: "🍬",
    accent: "from-amber-500/20 to-orange-500/10",
    badge: "Mithai Shop",
  },
  {
    id: "fireworks",
    title: "Fireworks Night",
    subtitle: "Light up our interactive sky with heart fireworks, colorful sparkles, and secret wishes.",
    icon: "🎆",
    accent: "from-purple-500/20 to-pink-500/10",
    badge: "Sky Canvas",
  },
  {
    id: "diyas",
    title: "Light Up Our World",
    subtitle: "Illuminate 12 traditional diyas in a sacred rangoli mandala and uncover a glowing message.",
    icon: "🪔",
    accent: "from-yellow-500/20 to-amber-500/10",
    badge: "Diya Lighting",
  },
  {
    id: "gift",
    title: "A Surprise For You",
    subtitle: "An interactive 3D gift box wrapped in royal maroon and gold, waiting for you to unwrap it.",
    icon: "🎁",
    accent: "from-rose-500/20 to-red-500/10",
    badge: "Special Gift",
  },
];

const SECONDARY_EXPERIENCES = [
  {
    id: "memories",
    title: "Our Memory Lane",
    desc: "Infinite cherished moments captured together",
    icon: Camera,
    color: "text-amber-300",
  },
  {
    id: "reasons",
    title: "Why You're Special",
    desc: "10 romantic 3D flip cards to discover",
    icon: Heart,
    color: "text-rose-400",
  },
  {
    id: "letter",
    title: "A Love Letter",
    desc: "A heartfelt message sealed just for you",
    icon: Mail,
    color: "text-yellow-300",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CelebrationHub() {
  const { navigateTo } = useNavigation();
  const { playSound } = useAudio();

  const handleSelect = (sectionId) => {
    playSound("whoosh");
    navigateTo(sectionId);
  };

  return (
    <div className="relative min-h-screen px-4 pt-16 pb-28 md:py-20 max-w-6xl mx-auto flex flex-col justify-center">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#450D19]/40 px-4 py-1.5 text-xs font-medium text-[#FFD98A] backdrop-blur-md mb-4 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
          <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>Our Private Sanctuary</span>
          <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
        </div>

        <h1 className="font-playfair text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD98A] via-[#FFF2D8] to-[#D4AF37] drop-shadow-[0_4px_16px_rgba(212,175,55,0.3)]">
          Tonight Is All About US ❤️
        </h1>

        <p className="mt-3 sm:mt-4 font-poppins text-xs sm:text-base md:text-lg text-[#FFF2D8]/80 max-w-2xl mx-auto leading-relaxed px-2">
          Forget everything for a moment. Let's celebrate our little Diwali together,
          filled with warmth, laughter, and romance.
        </p>

        {/* Traditional ornamental separator */}
        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
          <span className="text-sm text-[#D4AF37]">✦ 🪔 ✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
        </div>
      </motion.div>

      {/* 4 Main Interactive Experience Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8"
      >
        {MAIN_EXPERIENCES.map((exp) => (
          <motion.div
            key={exp.id}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(exp.id)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#100B16]/90 via-[#450D19]/40 to-[#100B16]/90 p-5 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] touch-manipulation active:scale-97"
          >
            {/* Background ambient glow on hover */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${exp.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />

            {/* Corner traditional accent */}
            <div className="pointer-events-none absolute top-0 right-0 h-16 w-16 overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-bl from-[#D4AF37]/20 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-4xl sm:text-5xl filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-110 inline-block">
                    {exp.icon}
                  </span>
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#D4AF37]/30 bg-[#100B16]/60 text-[#FFD98A]">
                    {exp.badge}
                  </span>
                </div>

                <h3 className="font-playfair text-xl sm:text-3xl font-semibold text-[#FFF2D8] group-hover:text-[#FFD98A] transition-colors">
                  {exp.title}
                </h3>

                <p className="mt-2 sm:mt-3 font-poppins text-xs sm:text-sm text-[#FFF2D8]/70 leading-relaxed">
                  {exp.subtitle}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#D4AF37]/15">
                <span className="text-xs font-medium text-[#FFD98A]/90 group-hover:text-[#FFD98A] flex items-center gap-1.5">
                  Begin Experience
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
                <Sparkles className="h-4 w-4 text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Secondary Story Sections (Memories, Reasons, Love Letter) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-14 pt-10 border-t border-[#D4AF37]/20"
      >
        <p className="text-center font-playfair text-lg text-[#FFD98A] mb-6">
          More Personal Chapters For You
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SECONDARY_EXPERIENCES.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(item.id)}
                className="group flex items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-[#100B16]/70 p-4 text-left backdrop-blur-md transition-all hover:border-[#D4AF37]/60 hover:bg-[#450D19]/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#450D19]/60 border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-colors">
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div>
                  <h4 className="font-playfair text-base font-semibold text-[#FFF2D8] group-hover:text-[#FFD98A] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#FFF2D8]/60 mt-0.5">{item.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}