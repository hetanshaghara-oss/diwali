import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../contexts/AudioContext";

/* ===== Animation Phase Constants ===== */
const PHASES = {
  WAITING: "waiting",
  UNTYING: "untying",
  OPENING: "opening",
  REVEALING: "revealing",
  REVEALED: "revealed",
};

const PHASE_DELAYS = {
  [PHASES.UNTYING]: 1200,
  [PHASES.OPENING]: 1400,
  [PHASES.REVEALING]: 1200,
  [PHASES.REVEALED]: 800,
};

/* ===== Floating Particle ===== */
function FloatingParticle({ delay, x, size, duration }) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-5%",
        background:
          size > 3
            ? "radial-gradient(circle, #FFD98A 0%, rgba(212,175,55,0.4) 70%, transparent 100%)"
            : "#D4AF37",
        boxShadow: `0 0 ${size}px rgba(212,175,55,0.5)`,
      }}
      animate={{
        y: [0, -800 - Math.random() * 400],
        x: [0, Math.sin(delay * 3) * 40, Math.cos(delay * 2) * -30, 0],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

/* ===== Floating Hearts ===== */
function FloatingHeart({ delay, x, size }) {
  return (
    <motion.div
      className="pointer-events-none absolute text-center"
      style={{
        left: `${x}%`,
        fontSize: size,
        bottom: "30%",
      }}
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -150 - Math.random() * 200],
        x: [0, Math.sin(delay * 5) * 50],
        scale: [0, 1.2, 1, 0.6],
        rotate: [0, Math.random() > 0.5 ? 15 : -15, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        ease: "easeOut",
      }}
    >
      ❤️
    </motion.div>
  );
}

/* ===== Burst Particles (from inside box) ===== */
function BurstParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        angle: (i / 30) * 360,
        distance: 60 + Math.random() * 120,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 0.3,
        color: i % 3 === 0 ? "#FFD98A" : i % 3 === 1 ? "#D4AF37" : "#FFF2D8",
      })),
    []
  );

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance - 80,
            opacity: [1, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.2,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

/* ===== CSS 3D Gift Box ===== */
function GiftBox3D({ phase }) {
  const isUntying = phase === PHASES.UNTYING;
  const isOpening =
    phase === PHASES.OPENING ||
    phase === PHASES.REVEALING ||
    phase === PHASES.REVEALED;
  const isRevealed = phase === PHASES.REVEALING || phase === PHASES.REVEALED;

  return (
    <div
      className="relative mx-auto"
      style={{
        width: 200,
        height: 200,
        perspective: 800,
      }}
    >
      {/* Box shadow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{
          width: 160,
          height: 20,
          background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
        }}
        animate={
          phase === PHASES.WAITING
            ? { scaleX: [1, 1.05, 1], opacity: [0.5, 0.35, 0.5] }
            : isRevealed
            ? { opacity: 0.2 }
            : {}
        }
        transition={
          phase === PHASES.WAITING
            ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
      />

      {/* 3D Box Container */}
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          phase === PHASES.WAITING
            ? {
                rotateY: [0, 5, 0, -5, 0],
                y: [0, -10, 0],
              }
            : isRevealed
            ? { opacity: 0.4, scale: 0.9 }
            : {}
        }
        transition={
          phase === PHASES.WAITING
            ? {
                rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }
            : { duration: 0.8 }
        }
      >
        {/* ===== Box Body (4 sides + bottom) ===== */}
        {/* Front face */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #8B1729 0%, #6B1020 50%, #8B1729 100%)",
            transform: "translateZ(100px)",
            backfaceVisibility: "hidden",
            border: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(212,175,55,0.15) 10px,
                rgba(212,175,55,0.15) 11px
              )`,
            }}
          />
          {/* Vertical ribbon */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{
              width: 24,
              background:
                "linear-gradient(90deg, #B8942E, #D4AF37, #FFD98A, #D4AF37, #B8942E)",
              boxShadow: "0 0 10px rgba(212,175,55,0.3)",
            }}
          />
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #6B1020 0%, #8B1729 100%)",
            transform: "translateZ(-100px) rotateY(180deg)",
            backfaceVisibility: "hidden",
            border: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{
              width: 24,
              background:
                "linear-gradient(90deg, #B8942E, #D4AF37, #FFD98A, #D4AF37, #B8942E)",
            }}
          />
        </div>

        {/* Left face */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #7A1325 0%, #5A0C18 100%)",
            transform: "translateX(-100px) rotateY(-90deg)",
            backfaceVisibility: "hidden",
            border: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{
              width: 24,
              background:
                "linear-gradient(90deg, #B8942E, #D4AF37, #FFD98A, #D4AF37, #B8942E)",
            }}
          />
        </div>

        {/* Right face */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #9B1D30 0%, #7A1325 100%)",
            transform: "translateX(100px) rotateY(90deg)",
            backfaceVisibility: "hidden",
            border: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{
              width: 24,
              background:
                "linear-gradient(90deg, #B8942E, #D4AF37, #FFD98A, #D4AF37, #B8942E)",
            }}
          />
        </div>

        {/* Bottom face */}
        <div
          className="absolute inset-0"
          style={{
            background: "#5A0C18",
            transform: "translateY(100px) rotateX(-90deg)",
            backfaceVisibility: "hidden",
          }}
        />

        {/* ===== Lid (Top face) ===== */}
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
          }}
          animate={
            isOpening
              ? { rotateX: -120, y: -30 }
              : {}
          }
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #9B1D30 0%, #8B1729 50%, #7A1325 100%)",
              transform: "translateY(-100px) rotateX(90deg)",
              backfaceVisibility: "hidden",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            {/* Cross ribbon on lid */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2"
              style={{
                width: 24,
                background:
                  "linear-gradient(90deg, #B8942E, #D4AF37, #FFD98A, #D4AF37, #B8942E)",
              }}
            />
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2"
              style={{
                height: 24,
                background:
                  "linear-gradient(180deg, #B8942E, #D4AF37, #FFD98A, #D4AF37, #B8942E)",
              }}
            />
          </div>
        </motion.div>

        {/* ===== Ribbon strands (untie animation) ===== */}
        <AnimatePresence>
          {phase === PHASES.WAITING && (
            <>
              {/* Bow - left loop */}
              <motion.div
                className="absolute left-1/2 top-0 z-20"
                style={{
                  transform: "translate(-130%, -60%) translateZ(101px)",
                }}
                exit={{
                  x: -60,
                  y: -30,
                  rotate: -45,
                  opacity: 0,
                  transition: { duration: 0.8 },
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 20,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #D4AF37, #FFD98A)",
                    border: "1px solid rgba(255,217,138,0.4)",
                    boxShadow: "0 0 8px rgba(212,175,55,0.4)",
                  }}
                />
              </motion.div>
              {/* Bow - right loop */}
              <motion.div
                className="absolute left-1/2 top-0 z-20"
                style={{
                  transform: "translate(30%, -60%) translateZ(101px)",
                }}
                exit={{
                  x: 60,
                  y: -30,
                  rotate: 45,
                  opacity: 0,
                  transition: { duration: 0.8 },
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 20,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #FFD98A, #D4AF37)",
                    border: "1px solid rgba(255,217,138,0.4)",
                    boxShadow: "0 0 8px rgba(212,175,55,0.4)",
                  }}
                />
              </motion.div>
              {/* Bow - center knot */}
              <motion.div
                className="absolute left-1/2 top-0 z-20"
                style={{
                  transform: "translate(-50%, -55%) translateZ(101px)",
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.6 },
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "3px",
                    background: "#D4AF37",
                    boxShadow: "0 0 6px rgba(212,175,55,0.5)",
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Burst particles on reveal */}
      <AnimatePresence>
        {isRevealed && <BurstParticles />}
      </AnimatePresence>
    </div>
  );
}

/* ===== Main GiftBox Section ===== */
export default function GiftBox() {
  const [phase, setPhase] = useState(PHASES.WAITING);
  const { playSound } = useAudio();

  // Phase state machine: advance to next phase after delays
  useEffect(() => {
    if (phase === PHASES.WAITING || phase === PHASES.REVEALED) return;

    const nextPhase = {
      [PHASES.UNTYING]: PHASES.OPENING,
      [PHASES.OPENING]: PHASES.REVEALING,
      [PHASES.REVEALING]: PHASES.REVEALED,
    }[phase];

    if (!nextPhase) return;

    const timer = setTimeout(() => setPhase(nextPhase), PHASE_DELAYS[phase]);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleOpen = useCallback(() => {
    if (phase !== PHASES.WAITING) return;
    playSound?.("gift");
    setPhase(PHASES.UNTYING);
  }, [phase, playSound]);

  const handleClose = useCallback(() => {
    setPhase(PHASES.WAITING);
  }, []);

  const isRevealed = phase === PHASES.REVEALED;

  // Background floating particles
  const bgParticles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 6,
      })),
    []
  );

  // Hearts that float up on reveal
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: 30 + Math.random() * 40,
        size: 16 + Math.random() * 14,
        delay: 0.2 + i * 0.2,
      })),
    []
  );

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* Background particles */}
      {bgParticles.map((p) => (
        <FloatingParticle
          key={p.id}
          x={p.x}
          size={p.size}
          duration={p.duration}
          delay={p.delay}
        />
      ))}

      {/* Heading */}
      <motion.h2
        className="text-glow-gold mb-8 sm:mb-12 text-center font-playfair text-2xl font-bold text-[#D4AF37] sm:text-4xl md:text-5xl px-3"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Something Special Is Waiting For You.
      </motion.h2>

      {/* 3D Gift Box */}
      <motion.div
        className="relative mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Sparkle particles around box */}
        {phase === PHASES.WAITING && (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute rounded-full"
                style={{
                  width: 3,
                  height: 3,
                  backgroundColor: "#FFD98A",
                  boxShadow: "0 0 6px #D4AF37",
                  left: `${20 + i * 12}%`,
                  top: `${15 + (i % 3) * 25}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}
          </>
        )}

        <GiftBox3D phase={phase} />

        {/* Floating hearts on reveal */}
        <AnimatePresence>
          {(phase === PHASES.REVEALING || isRevealed) &&
            hearts.map((h) => (
              <FloatingHeart
                key={h.id}
                x={h.x}
                size={h.size}
                delay={h.delay}
              />
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Open button */}
      <AnimatePresence mode="wait">
        {phase === PHASES.WAITING && (
          <motion.button
            onClick={handleOpen}
            className="relative cursor-pointer rounded-full border-none px-7 py-3.5 sm:px-10 sm:py-4 font-playfair text-base sm:text-xl font-semibold text-[#100B16] touch-manipulation active:scale-95"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #FFD98A, #D4AF37)",
              boxShadow:
                "0 0 25px rgba(212,175,55,0.4), 0 4px 15px rgba(0,0,0,0.3)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 40px rgba(212,175,55,0.6), 0 6px 20px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.5 }}
          >
            {/* Pulsing glow ring */}
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(212,175,55,0.4)",
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            OPEN YOUR GIFT ❤️
          </motion.button>
        )}
      </AnimatePresence>

      {/* Status text during animation */}
      <AnimatePresence>
        {phase === PHASES.UNTYING && (
          <motion.p
            className="mt-4 text-center text-lg text-[#FFD98A]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Unwrapping...
          </motion.p>
        )}
        {phase === PHASES.OPENING && (
          <motion.p
            className="mt-4 text-center text-lg text-[#FFD98A]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Opening...
          </motion.p>
        )}
      </AnimatePresence>

      {/* Revealed message */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            className="relative z-20 mx-auto mt-6 max-w-xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Warm screen glow overlay */}
            <motion.div
              className="pointer-events-none fixed inset-0 z-10"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.p
              className="relative z-20 font-playfair text-xl leading-relaxed text-[#FFD98A] sm:text-2xl md:text-3xl"
              style={{
                textShadow:
                  "0 0 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.15)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              If I could give you one gift this Diwali, it would be the ability
              to see yourself through my eyes.
            </motion.p>

            <motion.p
              className="relative z-20 mt-5 font-playfair text-lg italic text-[#D4AF37] sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Then you would understand how incredibly special you are to me.
            </motion.p>

            <motion.button
              onClick={handleClose}
              className="relative z-20 mt-10 cursor-pointer rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-8 py-3 font-playfair text-lg text-[#D4AF37] transition-all hover:bg-[#D4AF37]/20 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close Gift 🎁
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
