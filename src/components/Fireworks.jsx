import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Star, X } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";

class Particle {
  constructor(x, y, color, velocity, isHeart = false) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.012;
    this.gravity = isHeart ? 0.02 : 0.06;
    this.friction = 0.96;
    this.history = [];
    this.maxHistory = isHeart ? 6 : 4;
  }

  update() {
    this.history.push({ x: this.x, y: this.y, alpha: this.alpha });
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    // Draw trail
    for (let i = 0; i < this.history.length; i++) {
      const point = this.history[i];
      const trailAlpha = (i / this.history.length) * this.alpha * 0.5;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = trailAlpha;
      ctx.fill();
    }

    // Draw main particle
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

class Rocket {
  constructor(startX, startY, targetX, targetY, color, onExplode, isHeart = false) {
    this.x = startX;
    this.y = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.color = color;
    this.onExplode = onExplode;
    this.isHeart = isHeart;
    this.exploded = false;

    const angle = Math.atan2(targetY - startY, targetX - startX);
    const distance = Math.hypot(targetX - startX, targetY - startY);
    const speed = Math.max(9, distance / 28);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.history = [];
  }

  update() {
    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > 5) this.history.shift();

    this.x += this.vx;
    this.y += this.vy;

    // Check if reached apex or target
    if (this.vy < 0 && this.y <= this.targetY) {
      this.explode();
    } else if (this.vy >= 0 && this.y >= this.targetY) {
      this.explode();
    }
  }

  explode() {
    if (this.exploded) return;
    this.exploded = true;
    this.onExplode(this.targetX, this.targetY, this.color, this.isHeart);
  }

  draw(ctx) {
    ctx.save();
    for (let i = 0; i < this.history.length; i++) {
      const p = this.history[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#FFD98A";
      ctx.globalAlpha = (i / this.history.length) * 0.7;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF2D8";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#D4AF37";
    ctx.fill();
    ctx.restore();
  }
}

const PALETTE = [
  "#D4AF37", // Antique gold
  "#FFD98A", // Warm gold
  "#FF3366", // Rose pink
  "#FF6B6B", // Coral
  "#9B51E0", // Royal purple
  "#48DBFB", // Electric cyan
  "#FFF2D8", // Diamond white
  "#F368E0", // Magenta
];

export default function Fireworks() {
  const canvasRef = useRef(null);
  const { playSound } = useAudio();
  const [showWishModal, setShowWishModal] = useState(false);
  const [wishState, setWishState] = useState(0); // 0: eye close, 1: revealed
  const rocketsRef = useRef([]);
  const particlesRef = useRef([]);

  const createExplosion = useCallback(
    (x, y, color, isHeart = false) => {
      playSound("firework");

      if (isHeart) {
        // Parametric Heart equation: x = 16*sin^3(t), y = -(13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t))
        const heartCount = 75;
        for (let i = 0; i < heartCount; i++) {
          const t = (Math.PI * 2 * i) / heartCount;
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          const scale = 0.16 + Math.random() * 0.04;
          particlesRef.current.push(
            new Particle(
              x,
              y,
              Math.random() > 0.3 ? "#FF3366" : "#FFD98A",
              { x: hx * scale, y: hy * scale },
              true
            )
          );
        }
      } else {
        const particleCount = 65;
        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
          const speed = Math.random() * 5 + 1.5;
          particlesRef.current.push(
            new Particle(
              x,
              y,
              color,
              { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
              false
            )
          );
        }
      }
    },
    [playSound]
  );

  const launchRocket = useCallback(
    (targetX, targetY, isHeart = false, customColor = null) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const startX = canvas.width / 2 + (Math.random() - 0.5) * (canvas.width * 0.6);
      const startY = canvas.height;
      const color = customColor || PALETTE[Math.floor(Math.random() * PALETTE.length)];

      rocketsRef.current.push(
        new Rocket(startX, startY, targetX, targetY, color, createExplosion, isHeart)
      );
    },
    [createExplosion]
  );

  // Handle Canvas click
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    launchRocket(x, y, false);
  };

  // Launch Heart Fireworks
  const handleLaunchHearts = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height * 0.38;

    launchRocket(cx, cy, true, "#FF3366");
    setTimeout(() => {
      launchRocket(cx - 140, cy + 40, true, "#FF6B6B");
    }, 400);
    setTimeout(() => {
      launchRocket(cx + 140, cy + 40, true, "#FFD98A");
    }, 800);
  };

  // Grand Celebration Sequence
  const handleGrandCelebration = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const count = 12;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const tx = canvas.width * 0.15 + Math.random() * canvas.width * 0.7;
        const ty = canvas.height * 0.15 + Math.random() * canvas.height * 0.45;
        launchRocket(tx, ty, i % 3 === 0);
      }, i * 260);
    }
  };

  // Open Wish Modal
  const handleMakeWish = () => {
    setShowWishModal(true);
    setWishState(0);
    playSound("sparkle");

    setTimeout(() => {
      playSound("gift");
      setWishState(1);
    }, 2800);
  };

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Ambient auto firework every 4s
    const ambientInterval = setInterval(() => {
      if (document.hidden) return;
      const tx = canvas.width * 0.2 + Math.random() * canvas.width * 0.6;
      const ty = canvas.height * 0.18 + Math.random() * canvas.height * 0.35;
      launchRocket(tx, ty, Math.random() > 0.6);
    }, 3800);

    const loop = () => {
      ctx.fillStyle = "rgba(16, 11, 22, 0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.update();
        r.draw(ctx);
        if (r.exploded) {
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(ambientInterval);
      cancelAnimationFrame(animId);
    };
  }, [launchRocket]);

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
      {/* Background Interactive Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          if (touch && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            launchRocket(touch.clientX - rect.left, touch.clientY - rect.top, false);
          }
        }}
        className="absolute inset-0 z-0 h-full w-full cursor-crosshair touch-none"
      />

      {/* Top Banner Information */}
      <div className="pointer-events-none relative z-10 pt-16 sm:pt-20 px-3 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#100B16]/80 px-3.5 py-1 text-xs font-medium text-[#FFD98A] backdrop-blur-md mb-2 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Tap Anywhere In The Sky</span>
          </div>

          <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD98A] via-[#FFF2D8] to-[#D4AF37] drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]">
            Fireworks Night In Our Sky 🎆
          </h1>

          <p className="mt-2 font-poppins text-xs sm:text-sm text-[#FFF2D8]/75 max-w-md mx-auto px-2">
            Every spark bursting above carries my love, lighting up the darkness just for you.
          </p>
        </motion.div>
      </div>

      {/* Floating Action Bar at the Bottom */}
      <div className="fixed bottom-4 sm:bottom-8 inset-x-0 z-20 flex justify-center px-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 sm:gap-3 rounded-full border border-[#D4AF37]/40 bg-[#100B16]/90 p-1.5 sm:p-2.5 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.3)] max-w-full overflow-x-auto"
        >
          {/* Heart Fireworks Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLaunchHearts}
            className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-rose-500/40 bg-gradient-to-r from-rose-900/70 to-red-900/70 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-rose-200 backdrop-blur-md transition-all hover:border-rose-400 cursor-pointer shrink-0"
          >
            <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-rose-400 text-rose-400 animate-pulse" />
            <span>Hearts</span>
          </motion.button>

          {/* Big Celebration Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGrandCelebration}
            className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#D4AF37]/50 bg-gradient-to-r from-[#8B1729] to-[#450D19] px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#FFF2D8] backdrop-blur-md transition-all hover:border-[#D4AF37] cursor-pointer shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FFD98A]" />
            <span>Celebration</span>
          </motion.button>

          {/* Make A Wish Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMakeWish}
            className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-amber-200 backdrop-blur-md transition-all hover:border-amber-300 cursor-pointer shrink-0"
          >
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-300 text-amber-300" />
            <span>Make A Wish</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Make A Wish Modal */}
      <AnimatePresence>
        {showWishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setShowWishModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-3xl border border-[#D4AF37] bg-gradient-to-b from-[#100B16] via-[#450D19] to-[#100B16] p-8 sm:p-10 text-center shadow-[0_0_60px_rgba(212,175,55,0.4)]"
            >
              <button
                onClick={() => setShowWishModal(false)}
                className="absolute top-4 right-4 rounded-full p-2 text-[#FFF2D8]/60 hover:text-[#FFF2D8] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {wishState === 0 ? (
                <div className="py-6">
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 border border-amber-400/40 text-4xl shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                  >
                    ✨
                  </motion.div>
                  <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#FFD98A]">
                    Close Your Eyes And Wish…
                  </h3>
                  <p className="font-poppins text-sm text-[#FFF2D8]/70 mt-3 leading-relaxed">
                    Whisper what your heart desires under this festive sky.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="py-4"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/20 border border-rose-500/40 text-3xl">
                    ❤️
                  </div>

                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#FFD98A] mb-4">
                    My Wish For Us
                  </h3>

                  <div className="relative rounded-2xl bg-black/40 border border-[#D4AF37]/30 p-6 shadow-inner">
                    <p className="font-playfair text-lg sm:text-xl text-[#FFF2D8] italic leading-relaxed">
                      "My biggest wish isn't something expensive.
                    </p>
                    <p className="font-playfair text-lg sm:text-xl text-[#FFD98A] font-semibold italic mt-4 leading-relaxed">
                      I just want more beautiful memories, more laughter and countless Diwalis together with you. ❤️"
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowWishModal(false)}
                    className="mt-6 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#FFD98A] px-8 py-2.5 text-sm font-semibold text-[#100B16] shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer"
                  >
                    Keep In My Heart 💖
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}