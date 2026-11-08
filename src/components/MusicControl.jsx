import { motion } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";

export default function MusicControl() {
  const { isPlaying, isMuted, toggleMusic, toggleMute } = useAudio();

  const Icon = isMuted ? VolumeX : isPlaying ? Volume2 : Music;

  const handleClick = () => {
    if (isPlaying) {
      toggleMute();
    } else {
      toggleMusic();
    }
  };

  const handleDoubleClick = () => {
    if (isPlaying) {
      toggleMusic();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[9999] flex h-11 w-11 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#100B16]/80 backdrop-blur-md transition-colors hover:bg-[#450D19]/60"
      style={{
        boxShadow: isPlaying && !isMuted
          ? "0 0 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.2)"
          : "0 0 10px rgba(212,175,55,0.15)",
      }}
      aria-label={
        isMuted
          ? "Unmute audio"
          : isPlaying
          ? "Toggle mute"
          : "Play music"
      }
      title="Click: play/mute · Double-click: stop"
    >
      {/* Pulsing ring when playing */}
      {isPlaying && !isMuted && (
        <motion.span
          className="absolute inset-0 rounded-full border border-[#D4AF37]/40"
          animate={{
            scale: [1, 1.5, 1.8],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      <Icon
        size={22}
        className="text-[#D4AF37]"
        strokeWidth={1.8}
      />
    </motion.button>
  );
}
