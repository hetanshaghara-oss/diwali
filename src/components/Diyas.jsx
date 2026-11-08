import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../contexts/AudioContext";

/* ===== Single Diya SVG Component ===== */
function Diya({ isLit, onClick, index, style }) {
  const sparklesRef = useRef([]);

  // Generate stable sparkle positions
  if (sparklesRef.current.length === 0) {
    sparklesRef.current = Array.from({ length: 8 }, () => ({
      angle: Math.random() * 360,
      distance: 30 + Math.random() * 25,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 0.5,
    }));
  }

  return (
    <motion.button
      onClick={onClick}
      className="group relative cursor-pointer border-none bg-transparent outline-none"
      style={style}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.07,
      }}
      aria-label={`Diya ${index + 1} - ${isLit ? "Lit" : "Tap to light"}`}
    >
      {/* Glow behind diya when lit */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(255,217,138,0.15) 40%, transparent 70%)",
                animation: "pulse-glow 2.5s ease-in-out infinite",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Diya */}
      <svg
        viewBox="0 0 80 90"
        className="relative z-10 h-20 w-20 sm:h-24 sm:w-24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Terracotta gradient for diya body */}
          <linearGradient id={`diya-body-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isLit ? "#D4915A" : "#A06030"} />
            <stop offset="50%" stopColor={isLit ? "#C67B4A" : "#8B5535"} />
            <stop offset="100%" stopColor={isLit ? "#A06030" : "#704028"} />
          </linearGradient>
          {/* Inner shadow gradient */}
          <radialGradient id={`diya-inner-${index}`} cx="0.5" cy="0.3" r="0.7">
            <stop offset="0%" stopColor={isLit ? "#E8A060" : "#906040"} />
            <stop offset="100%" stopColor={isLit ? "#8B5535" : "#603520"} />
          </radialGradient>
          {/* Flame gradient */}
          <linearGradient id={`flame-${index}`} x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="30%" stopColor="#FFAA00" />
            <stop offset="60%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFFBE6" />
          </linearGradient>
          {/* Oil glow */}
          <radialGradient id={`oil-glow-${index}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={isLit ? "rgba(255,180,60,0.5)" : "rgba(120,80,30,0.3)"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Diya base - traditional bowl shape */}
        <ellipse cx="40" cy="74" rx="28" ry="5" fill="#704028" opacity="0.5" />
        <path
          d="M12 65 Q14 50 18 45 Q22 40 28 38 L52 38 Q58 40 62 45 Q66 50 68 65 Q60 72 40 72 Q20 72 12 65Z"
          fill={`url(#diya-body-${index})`}
          stroke="#8B5535"
          strokeWidth="0.5"
        />
        {/* Inner rim */}
        <ellipse
          cx="40"
          cy="40"
          rx="22"
          ry="5"
          fill={`url(#diya-inner-${index})`}
          stroke="#A06030"
          strokeWidth="0.5"
        />
        {/* Oil surface */}
        <ellipse cx="40" cy="40" rx="18" ry="3.5" fill={`url(#oil-glow-${index})`} />
        {/* Decorative dots on diya */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={22 + i * 9}
            cy={56}
            r="1.5"
            fill={isLit ? "#D4AF37" : "#8B6B30"}
            opacity={isLit ? 0.8 : 0.4}
          />
        ))}
        {/* Spout / wick holder */}
        <path
          d="M36 38 L32 34 Q30 33 32 32 L36 33 L40 33 L44 33 L48 32 Q50 33 48 34 L44 38"
          fill={`url(#diya-body-${index})`}
          stroke="#A06030"
          strokeWidth="0.3"
        />
        {/* Wick */}
        <line x1="40" y1="36" x2="40" y2="28" stroke="#3A2A1A" strokeWidth="1.2" strokeLinecap="round" />

        {/* Flame (only when lit) */}
        {isLit && (
          <g className="animate-flicker" style={{ transformOrigin: "40px 28px" }}>
            {/* Outer flame glow */}
            <ellipse cx="40" cy="18" rx="10" ry="14" fill="rgba(255,170,0,0.15)" />
            {/* Main flame - teardrop */}
            <path
              d="M40 6 Q45 14 45 20 Q45 26 40 28 Q35 26 35 20 Q35 14 40 6Z"
              fill={`url(#flame-${index})`}
            />
            {/* Inner bright core */}
            <path
              d="M40 14 Q42 18 42 22 Q42 26 40 27 Q38 26 38 22 Q38 18 40 14Z"
              fill="#FFFBE6"
              opacity="0.85"
            />
          </g>
        )}
      </svg>

      {/* Sparkle particles on light-up */}
      <AnimatePresence>
        {isLit &&
          sparklesRef.current.map((s, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: s.size,
                height: s.size,
                backgroundColor: "#FFD98A",
                boxShadow: "0 0 4px #D4AF37",
              }}
              initial={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 0,
              }}
              animate={{
                opacity: [1, 1, 0],
                x: Math.cos((s.angle * Math.PI) / 180) * s.distance,
                y: Math.sin((s.angle * Math.PI) / 180) * s.distance,
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 0.8,
                delay: s.delay,
                ease: "easeOut",
              }}
            />
          ))}
      </AnimatePresence>
    </motion.button>
  );
}

/* ===== Progress Bar ===== */
function ProgressBar({ litCount, total }) {
  const pct = (litCount / total) * 100;

  return (
    <motion.div
      className="mx-auto mt-8 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <p className="mb-3 text-center font-playfair text-lg text-[#FFF2D8]">
        <motion.span
          key={litCount}
          initial={{ scale: 1.6, color: "#FFD98A" }}
          animate={{ scale: 1, color: "#D4AF37" }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block font-bold"
        >
          {litCount}
        </motion.span>{" "}
        / {total} Diyas Illuminated ✨
      </p>
      <div className="relative h-3 overflow-hidden rounded-full bg-[#1A1220] shadow-inner">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #8B1729, #D4AF37, #FFD98A)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
        {/* Glow on progress bar edge */}
        {litCount > 0 && (
          <motion.div
            className="absolute inset-y-0 right-0 w-6 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,217,138,0.6))",
              filter: "blur(3px)",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ===== Celebration Overlay ===== */
function CelebrationOverlay({ onReset }) {
  // Floating golden particles
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <motion.div
      className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Warm overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, rgba(139,23,41,0.08) 50%, rgba(16,11,22,0.85) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Celebration particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.id % 3 === 0 ? "#FFD98A" : "#D4AF37",
            boxShadow: `0 0 ${p.size * 2}px ${p.id % 3 === 0 ? "#FFD98A" : "#D4AF37"}`,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: `-${20 + Math.random() * 80}vh`,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Message */}
      <div className="relative z-10 mx-4 max-w-xl text-center">
        <motion.p
          className="font-playfair text-2xl leading-relaxed text-[#FFD98A] sm:text-3xl md:text-4xl"
          style={{
            textShadow:
              "0 0 20px rgba(212,175,55,0.5), 0 0 40px rgba(212,175,55,0.2)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          Just like these diyas brighten the darkness, you brighten my entire
          world.
        </motion.p>

        <motion.p
          className="mt-6 font-playfair text-xl italic text-[#D4AF37] sm:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
        >
          You are my favourite light. ❤️
        </motion.p>

        <motion.button
          onClick={onReset}
          className="mt-10 cursor-pointer rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-8 py-3 font-playfair text-lg text-[#D4AF37] transition-all hover:bg-[#D4AF37]/20 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Light Them All Again 🔄
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ===== Main Diyas Section ===== */
export default function Diyas() {
  const [litDiyas, setLitDiyas] = useState(Array(12).fill(false));
  const [allLit, setAllLit] = useState(false);
  const { playSound } = useAudio();

  const litCount = litDiyas.filter(Boolean).length;

  useEffect(() => {
    if (litCount === 12 && !allLit) {
      const timer = setTimeout(() => setAllLit(true), 600);
      return () => clearTimeout(timer);
    }
  }, [litCount, allLit]);

  const handleDiyaClick = useCallback(
    (index) => {
      if (litDiyas[index]) return; // Already lit — skip
      playSound?.("diya");
      setLitDiyas((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    },
    [litDiyas, playSound]
  );

  const handleReset = useCallback(() => {
    setAllLit(false);
    setLitDiyas(Array(12).fill(false));
  }, []);

  // Circular positions for desktop (12 diyas)
  const circlePositions = useMemo(() => {
    const positions = [];
    const radius = 200; // radius in pixels
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * 2 * Math.PI - Math.PI / 2; // start from top
      positions.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    }
    return positions;
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Heading */}
      <motion.h2
        className="text-glow-gold mb-2 text-center font-playfair text-3xl font-bold text-[#D4AF37] sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Light Up Our World Together 🪔
      </motion.h2>
      <motion.p
        className="mb-10 text-center text-base text-[#FFF2D8]/70 sm:text-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Tap each diya to light it up
      </motion.p>

      {/* Diya Container */}
      {/* Desktop: circular layout / Mobile: grid */}
      <div className="relative">
        {/* Desktop Circular Layout */}
        <div className="hidden md:block" style={{ width: 480, height: 480 }}>
          <div className="relative h-full w-full">
            {litDiyas.map((isLit, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `calc(50% + ${circlePositions[i].x}px)`,
                  top: `calc(50% + ${circlePositions[i].y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Diya
                  isLit={isLit}
                  onClick={() => handleDiyaClick(i)}
                  index={i}
                />
              </div>
            ))}
            {/* Center mandala decoration */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={
                litCount === 12
                  ? {
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }
                  : { rotate: 0 }
              }
              transition={
                litCount === 12
                  ? { rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }
                  : {}
              }
            >
              <svg viewBox="0 0 80 80" className="h-16 w-16 opacity-40">
                {Array.from({ length: 8 }, (_, i) => (
                  <line
                    key={i}
                    x1="40"
                    y1="40"
                    x2={40 + 30 * Math.cos((i / 8) * Math.PI * 2)}
                    y2={40 + 30 * Math.sin((i / 8) * Math.PI * 2)}
                    stroke="#D4AF37"
                    strokeWidth="0.5"
                    opacity={litCount > i ? 0.8 : 0.2}
                  />
                ))}
                <circle cx="40" cy="40" r="8" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
                <circle cx="40" cy="40" r="20" fill="none" stroke="#D4AF37" strokeWidth="0.3" opacity="0.3" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Mobile Grid Layout */}
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:hidden">
          {litDiyas.map((isLit, i) => (
            <div key={i} className="flex items-center justify-center">
              <Diya
                isLit={isLit}
                onClick={() => handleDiyaClick(i)}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar litCount={litCount} total={12} />

      {/* Celebration Overlay */}
      <AnimatePresence>
        {allLit && <CelebrationOverlay onReset={handleReset} />}
      </AnimatePresence>
    </section>
  );
}
