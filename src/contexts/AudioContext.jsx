import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

const AudioContext = createContext(null);

/**
 * Fallback synthesizer: Generates a soft ambient pad using Web Audio API oscillators.
 * Used if the romantic MP3 audio file is not found or fails to load.
 */
function createAmbientPad(audioCtx) {
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;

  const frequencies = [130.81, 196.0, 261.63, 329.63]; // C3, G3, C4, E4 — Cmaj
  const oscillators = [];

  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;
    osc.detune.value = (i - 1.5) * 4;

    const oscGain = audioCtx.createGain();
    oscGain.gain.value = 0.05 / frequencies.length;

    osc.connect(oscGain);
    oscGain.connect(gainNode);
    oscillators.push(osc);
  });

  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 0.15;
  lfoGain.gain.value = 0.01;
  lfo.connect(lfoGain);
  lfoGain.connect(gainNode.gain);

  gainNode.connect(audioCtx.destination);

  return {
    gainNode,
    start() {
      oscillators.forEach((osc) => osc.start());
      lfo.start();
    },
    fadeIn(duration = 2) {
      gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + duration);
    },
    fadeOut(duration = 1) {
      gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
    },
    stop() {
      oscillators.forEach((osc) => {
        try { osc.stop(); } catch { /* ignore */ }
      });
      try { lfo.stop(); } catch { /* ignore */ }
    },
  };
}

/**
 * Synthesize short festive sound effects using Web Audio API oscillators.
 */
function playSynthSound(audioCtx, type) {
  const now = audioCtx.currentTime;
  const masterGain = audioCtx.createGain();
  masterGain.connect(audioCtx.destination);

  switch (type) {
    case "firework": {
      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);
      masterGain.gain.setValueAtTime(0.12, now);
      masterGain.gain.linearRampToValueAtTime(0.2, now + 0.25);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.55);

      const bufferSize = audioCtx.sampleRate * 0.3;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
      }
      const noiseSource = audioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.1, now + 0.25);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      noiseSource.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noiseSource.start(now + 0.24);
      noiseSource.stop(now + 0.6);
      break;
    }

    case "diya": {
      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 523.25; // C5 bell
      masterGain.gain.setValueAtTime(0.2, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 1.3);

      const osc2 = audioCtx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = 1046.5; // C6 overtone
      const g2 = audioCtx.createGain();
      g2.gain.setValueAtTime(0.06, now);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc2.connect(g2);
      g2.connect(audioCtx.destination);
      osc2.start(now);
      osc2.stop(now + 0.9);
      break;
    }

    case "gift": {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = freq;
        const g = audioCtx.createGain();
        const offset = i * 0.1;
        g.gain.setValueAtTime(0.1, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.5);
        osc.connect(g);
        g.connect(audioCtx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.55);
      });
      break;
    }

    case "whoosh": {
      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
      masterGain.gain.setValueAtTime(0.08, now);
      masterGain.gain.linearRampToValueAtTime(0.15, now + 0.15);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    }

    case "sparkle": {
      const frequencies = [880, 1108.73, 1318.51, 1760];
      for (let i = 0; i < 4; i++) {
        const osc = audioCtx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = frequencies[i];
        const g = audioCtx.createGain();
        const offset = i * 0.05;
        g.gain.setValueAtTime(0.08, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.25);
        osc.connect(g);
        g.connect(audioCtx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.28);
      }
      break;
    }

    default:
      break;
  }
}

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const ambientRef = useRef(null);
  const bgMusicAudioRef = useRef(null);
  const usingHtmlAudioRef = useRef(true);

  // Initialize background music element pointing to /audio/romantic-bgm.mp3
  useEffect(() => {
    const audio = new Audio("/audio/romantic-bgm.mp3");
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = "auto";

    audio.addEventListener("error", () => {
      console.info("Romantic MP3 file not found or failed, falling back to Web Audio ambient pad.");
      usingHtmlAudioRef.current = false;
    });

    bgMusicAudioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  /** Lazily initializes the Web Audio context for SFX on first interaction */
  const ensureAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AC();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const startMusic = useCallback(() => {
    const audio = bgMusicAudioRef.current;
    if (usingHtmlAudioRef.current && audio) {
      audio.muted = isMuted;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback to oscillator pad if HTML audio blocked
        usingHtmlAudioRef.current = false;
        const ctx = ensureAudioCtx();
        if (!ambientRef.current) {
          ambientRef.current = createAmbientPad(ctx);
          ambientRef.current.start();
        }
        ambientRef.current.fadeIn(1.5);
        setIsPlaying(true);
      });
    } else {
      const ctx = ensureAudioCtx();
      if (!ambientRef.current) {
        ambientRef.current = createAmbientPad(ctx);
        ambientRef.current.start();
      }
      ambientRef.current.fadeIn(1.5);
      setIsPlaying(true);
    }
  }, [isMuted, ensureAudioCtx]);

  const pauseMusic = useCallback(() => {
    const audio = bgMusicAudioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
    if (ambientRef.current) {
      ambientRef.current.fadeOut(0.8);
    }
    setIsPlaying(false);
  }, []);

  const toggleMusic = useCallback(() => {
    ensureAudioCtx();
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  }, [isPlaying, ensureAudioCtx, startMusic, pauseMusic]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      const audio = bgMusicAudioRef.current;
      if (audio) {
        audio.muted = next;
      }
      if (ambientRef.current) {
        if (next) {
          ambientRef.current.fadeOut(0.3);
        } else if (isPlaying) {
          ambientRef.current.fadeIn(0.3);
        }
      }
      return next;
    });
  }, [isPlaying]);

  const playSound = useCallback(
    (type) => {
      if (isMuted) return;
      try {
        const ctx = ensureAudioCtx();
        playSynthSound(ctx, type);
      } catch {
        /* audio sfx non-critical */
      }
    },
    [isMuted, ensureAudioCtx]
  );

  // Mobile touch unlock listener
  useEffect(() => {
    const unlockOnTouch = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };
    window.addEventListener("touchstart", unlockOnTouch, { once: true, passive: true });
    window.addEventListener("click", unlockOnTouch, { once: true, passive: true });

    return () => {
      window.removeEventListener("touchstart", unlockOnTouch);
      window.removeEventListener("click", unlockOnTouch);
    };
  }, []);

  const value = {
    isPlaying,
    isMuted,
    toggleMusic,
    startMusic,
    pauseMusic,
    toggleMute,
    playSound,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}