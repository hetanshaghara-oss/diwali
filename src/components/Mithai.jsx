import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, X } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";

const SWEETS = [
  {
    id: "kaju-katli",
    name: "Kaju Katli",
    hindi: "काजू कतली",
    symbol: "💎",
    tagline: "The Royal Diamond",
    quote: "You're more precious than anything in this world. ❤️",
    description: "Rich cashews blended into diamond perfection with edible silver vark.",
    accent: "#E2E8F0",
    bgGradient: "from-slate-200 via-zinc-100 to-amber-100",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        <div className="h-20 w-20 rotate-45 rounded-sm bg-gradient-to-tr from-amber-100 via-stone-200 to-white shadow-[0_4px_20px_rgba(255,255,255,0.4)] border border-amber-200/60 flex items-center justify-center">
          <div className="h-12 w-12 rotate-12 bg-gradient-to-br from-white/80 to-transparent blur-[1px]" />
          <span className="absolute text-xs font-semibold text-amber-800/60 rotate-[-45deg] tracking-widest">
            Kaju
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    hindi: "गुलाब जामुन",
    symbol: "🟤",
    tagline: "Golden Syrup Spheres",
    quote: "Life becomes sweeter whenever you're around.",
    description: "Deep golden fried milk dumplings soaked in fragrant rose and cardamom syrup.",
    accent: "#D97706",
    bgGradient: "from-amber-900 via-amber-800 to-amber-950",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-amber-950 via-amber-800 to-amber-600 shadow-[0_8px_25px_rgba(217,119,6,0.5)] border border-amber-600/40 relative flex items-center justify-center overflow-hidden">
          <div className="absolute top-2 left-3 h-6 w-8 rounded-full bg-white/30 blur-[2px] rotate-[-20deg]" />
          <div className="absolute bottom-2 right-3 h-2 w-2 rounded-full bg-amber-400/50" />
        </div>
      </div>
    ),
  },
  {
    id: "jalebi",
    name: "Crispy Jalebi",
    hindi: "जलेबी",
    symbol: "🟠",
    tagline: "Twisted Golden Spirals",
    quote: "Even my thoughts get twisted around you.",
    description: "Crispy circular pretzels soaked in saffron sugar syrup with glowing orange luster.",
    accent: "#F97316",
    bgGradient: "from-orange-600 via-amber-500 to-yellow-500",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-24 w-24 drop-shadow-[0_4px_15px_rgba(249,115,22,0.6)]">
          <path
            d="M 50,50 m -25,0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0 M 50,50 m -15,0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0 M 50,50 m -5,0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0"
            fill="none"
            stroke="url(#jalebiGrad)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="jalebiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
  },
  {
    id: "motichoor-ladoo",
    name: "Motichoor Ladoo",
    hindi: "मोतीचूर लड्डू",
    symbol: "🟡",
    tagline: "Pearls of Festivity",
    quote: "You make every little moment special.",
    description: "Tiny fried gram flour pearls bound in rich ghee, saffron, and melon seeds.",
    accent: "#EAB308",
    bgGradient: "from-amber-600 via-yellow-500 to-amber-700",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-orange-400 shadow-[0_6px_20px_rgba(234,179,8,0.5)] border border-yellow-300/40 relative flex items-center justify-center">
          <div className="absolute top-3 left-4 h-3 w-3 rounded-full bg-emerald-600/70" />
          <div className="absolute top-6 right-5 h-2 w-3 rounded-full bg-white/70" />
          <div className="absolute bottom-4 left-6 h-2 w-2 rounded-full bg-amber-900/60" />
        </div>
      </div>
    ),
  },
  {
    id: "rasmalai",
    name: "Royal Rasmalai",
    hindi: "रसमलाई",
    symbol: "⚪",
    tagline: "Saffron Cloud Cream",
    quote: "Soft, delicate, and the purest kind of sweet — just like your heart.",
    description: "Velvety cottage cheese discs drenched in thickened cardamom cream and slivered pistachios.",
    accent: "#FEF08A",
    bgGradient: "from-amber-100 via-yellow-100 to-orange-100",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        <div className="h-22 w-22 rounded-full bg-gradient-to-tr from-amber-200 via-yellow-100 to-white shadow-[0_6px_25px_rgba(254,240,138,0.5)] border border-amber-300/50 relative flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-yellow-50/90 shadow-inner flex items-center justify-center">
            <span className="text-emerald-700 text-xs font-bold">✤ ✤</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "chocolate-barfi",
    name: "Chocolate Barfi",
    hindi: "चॉकलेट बर्फी",
    symbol: "🟫",
    tagline: "Modern Sweet Fusion",
    quote: "A perfect blend of modern warmth and timeless love with you.",
    description: "Double layered khoya fudge topped with rich dark cocoa and golden dust.",
    accent: "#78350F",
    bgGradient: "from-amber-950 via-stone-800 to-amber-900",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        <div className="h-20 w-20 rounded-md bg-gradient-to-b from-stone-900 via-amber-950 to-amber-100 shadow-[0_6px_20px_rgba(120,53,15,0.6)] border border-amber-600/30 flex flex-col overflow-hidden">
          <div className="h-1/2 w-full bg-amber-950 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-amber-300/60" />
          </div>
          <div className="h-1/2 w-full bg-amber-100" />
        </div>
      </div>
    ),
  },
  {
    id: "coconut-ladoo",
    name: "Coconut Ladoo",
    hindi: "नारियल लड्डू",
    symbol: "🥥",
    tagline: "Snowy Sweet Delicacy",
    quote: "Pure, comforting, and brings an instant smile to my face, just like you.",
    description: "Grated fresh coconut simmered in condensed milk, rolled into snowy sweetness.",
    accent: "#F8FAFC",
    bgGradient: "from-slate-100 via-white to-amber-50",
    illustration: (
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-stone-200 via-slate-100 to-white shadow-[0_6px_20px_rgba(255,255,255,0.5)] border border-amber-100 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-amber-700/60" />
        </div>
      </div>
    ),
  },
];

export default function Mithai() {
  const { playSound } = useAudio();
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [isOffering, setIsOffering] = useState(false);
  const [offeringComplete, setOfferingComplete] = useState(false);

  const handleSweetClick = (sweet) => {
    playSound("sparkle");
    setSelectedSweet(sweet);
  };

  const handleShareSweetness = () => {
    playSound("sparkle");
    setIsOffering(true);
    setOfferingComplete(false);

    setTimeout(() => {
      playSound("gift");
      setOfferingComplete(true);
    }, 1800);
  };

  return (
    <div className="relative min-h-screen px-4 pt-16 pb-28 md:py-20 max-w-6xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#450D19]/40 px-4 py-1.5 text-xs font-medium text-[#FFD98A] backdrop-blur-md mb-4 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
          <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>Festive Confections Shop</span>
        </div>

        <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD98A] via-[#FFF2D8] to-[#D4AF37] drop-shadow-[0_4px_16px_rgba(212,175,55,0.3)]">
          A Little Sweetness For My Sweetest Person
        </h1>

        <p className="mt-3 sm:mt-4 font-poppins text-xs sm:text-base text-[#FFF2D8]/80 max-w-xl mx-auto leading-relaxed px-2">
          Every Indian festival begins with sweets. Pick any sweet to taste the romantic message hidden inside!
        </p>

        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
          <span className="text-sm text-[#D4AF37]">✦ 🍬 ✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
        </div>
      </motion.div>

      {/* Sweets Grid — 2 columns on mobile for boutique shop feel */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {SWEETS.map((sweet, index) => (
          <motion.div
            key={sweet.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSweetClick(sweet)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#100B16]/90 via-[#450D19]/30 to-[#100B16]/95 p-3.5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] flex flex-col justify-between"
          >
            {/* Top info */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full border border-[#D4AF37]/30 bg-[#100B16]/80 text-[#FFD98A]">
                  {sweet.hindi}
                </span>
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors" />
              </div>

              {/* Sweet visual representation */}
              <div className="my-2 sm:my-4 transform transition-transform duration-300 group-hover:scale-108 scale-90 sm:scale-100">
                {sweet.illustration}
              </div>

              <h3 className="font-playfair text-base sm:text-xl font-bold text-[#FFF2D8] group-hover:text-[#FFD98A] transition-colors text-center">
                {sweet.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#FFF2D8]/60 text-center mt-0.5 sm:mt-1 line-clamp-2">
                {sweet.tagline}
              </p>
            </div>

            {/* Bottom action pill */}
            <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-[#D4AF37]/15 flex items-center justify-center">
              <span className="text-[10px] sm:text-xs text-[#FFD98A] font-medium flex items-center gap-1 sm:gap-1.5">
                <span>Tap to taste</span>
                <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-rose-500 text-rose-500" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Share Some Sweetness Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 sm:mt-14 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.96 }}
          onClick={handleShareSweetness}
          className="group relative inline-flex items-center gap-2 sm:gap-3 overflow-hidden rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#8B1729] via-[#450D19] to-[#8B1729] px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-[#FFF2D8] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer touch-manipulation active:scale-95"
        >
          <span className="text-xl">🍬</span>
          <span>SHARE SOME SWEETNESS</span>
          <Heart className="h-4 w-4 fill-rose-500 text-rose-500 animate-pulse" />
        </motion.button>
      </motion.div>

      {/* Modal for Selected Sweet Message */}
      <AnimatePresence>
        {selectedSweet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setSelectedSweet(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-[#D4AF37] bg-gradient-to-b from-[#100B16] via-[#450D19]/90 to-[#100B16] p-5 sm:p-8 shadow-[0_0_40px_rgba(212,175,55,0.4)] text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSweet(null)}
                className="absolute top-4 right-4 rounded-full p-2 text-[#FFF2D8]/60 hover:text-[#FFF2D8] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/30 shadow-inner">
                  {selectedSweet.illustration}
                </div>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#100B16]/80 text-[#FFD98A] uppercase tracking-wider">
                {selectedSweet.name} • {selectedSweet.hindi}
              </span>

              <div className="my-6">
                <p className="font-playfair text-2xl font-bold text-[#FFF2D8] italic leading-relaxed">
                  "{selectedSweet.quote}"
                </p>
                <p className="mt-4 font-poppins text-xs text-[#FFF2D8]/70 leading-relaxed">
                  {selectedSweet.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-center gap-2">
                <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                <span className="font-playfair text-sm text-[#FFD98A]">
                  Made with pure unconditional love
                </span>
                <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offering Animation Overlay */}
      <AnimatePresence>
        {isOffering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="max-w-lg w-full rounded-3xl border border-[#D4AF37] bg-gradient-to-b from-[#450D19] to-[#100B16] p-8 text-center shadow-[0_0_50px_rgba(212,175,55,0.4)]"
            >
              {!offeringComplete ? (
                <div className="py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mx-auto mb-6 text-6xl"
                  >
                    🍬
                  </motion.div>
                  <h3 className="font-playfair text-2xl font-bold text-[#FFD98A]">
                    Plating The Sweets For You…
                  </h3>
                  <p className="font-poppins text-sm text-[#FFF2D8]/70 mt-2">
                    Wrapping every bite in hugs and Diwali prayers
                  </p>
                </div>
              ) : (
                <div className="py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-4xl shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  >
                    ❤️
                  </motion.div>
                  <h3 className="font-playfair text-3xl font-bold text-[#FFD98A]">
                    Sweets Served With All My Heart!
                  </h3>
                  <p className="font-poppins text-base text-[#FFF2D8]/90 mt-4 leading-relaxed">
                    Even though miles apart tonight, consider this your personal box of festival sweets, fed to you with the biggest smile.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOffering(false)}
                    className="mt-8 rounded-full border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 text-sm font-semibold text-[#100B16] shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer"
                  >
                    Enjoy Sweet Moments ❤️
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}